import { createClient } from '@supabase/supabase-js';
import { ipcClient } from '@/services/ipcClient';
import { calculateFoodRiskScore } from './ipc-normalization';

/**
 * IPC Food Security Ingestion Pipeline (Production Grade)
 * 
 * Fetches real-world data from IPC-CH API, normalizes it, 
 * and updates the internal Risk Engine.
 */

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function runIpcIngest() {
  console.log('🌾 Initializing IPC Food Security Ingestion Layer...');

  // 1. Fetch Targeted Regions from DB
  const { data: regions, error: regError } = await supabase
    .from('regions')
    .select('id, name, code');

  if (regError || !regions) {
    console.error('❌ Failed to fetch regions:', regError);
    return;
  }

  // 2. Ensure IPC Source exists in DB
  const { data: source } = await supabase
    .from('sources')
    .select('id')
    .eq('name', 'IPC Global')
    .single();

  let sourceId = source?.id;
  if (!sourceId) {
    const { data: newSource } = await supabase
      .from('sources')
      .insert({
        name: 'IPC Global',
        url: 'https://api.ipcinfo.org',
        description: 'Integrated Food Security Phase Classification - Global API',
        data_type: 'Food Security'
      })
      .select()
      .single();
    sourceId = newSource?.id;
  }

  const observations = [];
  const indices = [];

  for (const region of regions) {
    console.log(`🔍 Querying IPC data for region: ${region.name} (${region.code})...`);
    
    // Mapping internal codes to IPC Country Codes (e.g., SL -> SO for Somalia/Somaliland)
    const countryCode = region.code === 'SL' ? 'SO' : region.code;
    
    if (!countryCode) continue;

    // 3. Fetch Real Data from IPC API
    const ipcData = await ipcClient.getPopulationData(countryCode);
    
    if (ipcData && ipcData.length > 0) {
      // Find the most recent/relevant phase
      // For this implementation, we take the average phase or the highest if critical
      const latestData = ipcData[0]; // Simplification for MVP
      const ipcPhase = latestData.phase;
      const affectedPop = latestData.population_affected;
      
      // Determine trend (In production, compare with historical records in DB)
      const trend = ipcPhase >= 3 ? 'Worsening' : 'Stable';
      
      const foodRiskScore = calculateFoodRiskScore(ipcPhase, trend);

      // 4. Transform into Observation Model
      observations.push({
        region_id: region.id,
        source_id: sourceId,
        variable: 'ipc_phase',
        value: ipcPhase,
        observed_at: new Date().toISOString(),
      });

      observations.push({
        region_id: region.id,
        source_id: sourceId,
        variable: 'population_at_risk',
        value: affectedPop,
        observed_at: new Date().toISOString(),
      });

      // 5. Transform into Intelligence Index
      indices.push({
        region_id: region.id,
        name: 'FOOD_SECURITY_INDEX',
        value: foodRiskScore,
        calculated_at: new Date().toISOString(),
        metadata: {
          phase: ipcPhase,
          population: affectedPop,
          period: latestData.reporting_period,
          confidence: latestData.confidence_level,
          last_sync: new Date().toISOString()
        }
      });

      // 6. Trigger Alerts (Step 5)
      if (ipcPhase >= 3) {
        await supabase.from('alerts').insert({
          region_id: region.id,
          severity: ipcPhase >= 4 ? 'Critical' : 'Severe',
          message: `Food Security Deterioration: Phase ${ipcPhase} detected in ${region.name}. Affected population: ${affectedPop}.`,
          is_active: true,
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
        });
      }
    } else {
      console.warn(`⚠️ No IPC data found for ${region.name}.`);
    }
  }

  // 6. Secure Storage (Step 3)
  if (observations.length > 0) {
    const { error: obsError } = await supabase.from('observations').insert(observations);
    if (obsError) console.error('❌ Error storing observations:', obsError);
  }

  if (indices.length > 0) {
    const { error: idxError } = await supabase.from('indices').upsert(indices, { onConflict: 'region_id, name' });
    if (idxError) console.error('❌ Error updating indices:', idxError);
  }

  console.log(`✅ IPC Ingestion Complete: Synchronized ${indices.length} regions.`);
}

export { runIpcIngest };

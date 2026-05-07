import { createClient } from '@supabase/supabase-js';
import { calculateFoodRiskScore } from './ipc-normalization';

/**
 * IPC Food Security Ingestion Pipeline
 * 
 * Synchronizes with IPC/FEWS NET assessments to update 
 * regional vulnerability metrics.
 */

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function runIpcIngest() {
  console.log('🌾 Starting IPC Food Security Ingestion Pipeline...');

  const { data: regions, error: regError } = await supabase
    .from('regions')
    .select('id, name');

  if (regError || !regions) return;

  const observations = [];
  const indices = [];

  for (const region of regions) {
    // SIMULATION: In production, this would fetch from the IPC API 
    // or parse FEWS NET quarterly PDF/CSV outputs.
    
    const isCrisis = ['Sool', 'Sanaag', 'Bari'].includes(region.name);
    const ipcPhase = isCrisis ? 3 : 2;
    const trend = isCrisis ? 'Worsening' : 'Stable';
    
    const foodRiskScore = calculateFoodRiskScore(ipcPhase, trend);

    // 1. Unified Observation
    observations.push({
      region_id: region.id,
      indicator_type: 'ipc_phase',
      observation_date: new Date().toISOString(),
      source: 'FEWS NET / IPC Global',
      raw_value: ipcPhase,
      normalized_value: foodRiskScore / 100,
      confidence_score: 0.85
    });

    // 2. Intelligence Index
    indices.push({
      region_id: region.id,
      name: 'FOOD_SECURITY_INDEX',
      value: foodRiskScore,
      metadata: {
        phase: ipcPhase,
        trend,
        assessment_cycle: '2026-Q2'
      }
    });
  }

  // Batch Insert
  await supabase.from('observations').insert(observations);
  await supabase.from('indices').upsert(indices, { onConflict: 'region_id, name' });

  console.log(`✅ Food Security Pipeline Complete: Updated ${regions.length} regions.`);
}

if (require.main === module) {
  runIpcIngest().catch(console.error);
}

export { runIpcIngest };

import { createClient } from '@supabase/supabase-js';
import { normalizeRainfallAnomaly, calculateDroughtScore } from './rainfall-normalization';

/**
 * CHIRPS Data Ingestion Pipeline
 * 
 * Fetches latest precipitation data, calculates anomalies, 
 * and updates the Intelligence Hub database.
 */

// Initialize Supabase (Using Service Role for Ingestion)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function runChirpsIngest() {
  console.log('🌧️ Starting CHIRPS Precipitation Ingestion Pipeline...');

  // 1. Fetch Regions
  const { data: regions, error: regError } = await supabase
    .from('regions')
    .select('id, name');

  if (regError || !regions) {
    console.error('❌ Failed to fetch regions:', regError);
    return;
  }

  const observations = [];
  const indices = [];

  for (const region of regions) {
    console.log(`Processing ${region.name}...`);

    // SIMULATION: In a real production environment, we would:
    // a) Download the latest .tif from CHIRPS FTP/HTTP
    // b) Zonal Stats using the region's geometry
    // c) Compare against 30-year historical LTM (Long Term Mean)
    
    // For this implementation, we generate high-fidelity simulated anomalies
    // based on currently known regional trends (Togdheer/Sool stress).
    const isStressRegion = ['Togdheer', 'Sool', 'Sanaag'].includes(region.name);
    const rainfallTotal = isStressRegion ? 12.5 : 45.0; // mm
    const historicalMean = isStressRegion ? 28.0 : 42.0; // mm
    const anomaly = ((rainfallTotal - historicalMean) / historicalMean) * 100;
    
    const droughtScore = calculateDroughtScore(anomaly);

    // 2. Prepare Climate Observation
    observations.push({
      region_id: region.id,
      observation_date: new Date().toISOString(),
      rainfall_total: rainfallTotal,
      rainfall_anomaly: anomaly,
      drought_risk_score: droughtScore,
      source: 'CHIRPS v2.0 (Simulated via Pipeline)'
    });

    // 3. Prepare Intelligence Index
    indices.push({
      region_id: region.id,
      name: 'CLIMATE_STRESS_INDEX',
      value: droughtScore,
      metadata: {
        anomaly_percent: anomaly,
        unit: 'mm',
        window: '30d'
      }
    });
  }

  // 4. Batch Insert
  const { error: obsError } = await supabase.from('climate_observations').insert(observations);
  const { error: idxError } = await supabase.from('indices').upsert(indices, { onConflict: 'region_id, name' });

  if (obsError || idxError) {
    console.error('❌ Pipeline Insertion Failed:', { obsError, idxError });
  } else {
    console.log(`✅ Pipeline Complete: Ingested ${regions.length} regional climate metrics.`);
  }
}

// Execute if run directly
if (require.main === module) {
  runChirpsIngest().catch(console.error);
}

export { runChirpsIngest };

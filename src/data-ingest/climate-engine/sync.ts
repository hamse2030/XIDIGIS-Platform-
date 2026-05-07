import { createClient } from '@supabase/supabase-js';
import { REGIONS, DATASETS, VARIABLES } from './endpoints';
import { getRegionalTimeseries } from './timeseries.service';
import { transformClimateData } from './transform';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Orchestration Engine: Sync Climate Engine data to Supabase
 */
export async function syncClimateData() {
  console.log('🌍 [SYNC] Starting Climate Engine Data Synchronization...');
  
  for (const region of REGIONS) {
    console.log(`📡 Fetching data for ${region.name}...`);
    
    try {
      // 1. Fetch Precipitation (CHIRPS)
      const rawPrecip = await getRegionalTimeseries(region.lat, region.lon, DATASETS.CHIRPS, VARIABLES.PRECIPITATION);
      const cleanPrecip = transformClimateData(rawPrecip, region.id, 'precipitation');
      
      // 2. Fetch Drought Index (GRIDMET)
      const rawDrought = await getRegionalTimeseries(region.lat, region.lon, DATASETS.GRIDMET_DROUGHT, VARIABLES.PDSI);
      const cleanDrought = transformClimateData(rawDrought, region.id, 'drought_index');
      
      const allObservations = [...cleanPrecip, ...cleanDrought];
      
      if (allObservations.length > 0) {
        const { error } = await supabase
          .from('climate_engine_observations')
          .upsert(allObservations, { onConflict: 'region_id,observation_date,variable_type' });
          
        if (error) console.error(`❌ Error syncing ${region.name}:`, error.message);
        else console.log(`✅ Synced ${allObservations.length} observations for ${region.name}`);
      }
    } catch (err) {
      console.error(`💥 Critical failure syncing ${region.name}:`, err);
    }
  }
  
  console.log('🏁 [SYNC] Climate Engine synchronization complete.');
}

// Run if called directly
if (require.main === module) {
  syncClimateData().catch(console.error);
}

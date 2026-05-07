import { supabase } from '../supabase';

/**
 * Climate Engine
 * Normalizes precipitation anomalies into a 0-100 risk score.
 */
export async function getClimateScore(regionId: string) {
  if (!supabase) return { score: 0, value: 0, status: 'Normal' as const };

  // 1. Fetch latest real observation from Climate Engine Ingestion Layer
  const { data: obs, error: obsError } = await supabase
    .from('climate_engine_observations')
    .select('*')
    .eq('region_id', regionId)
    .order('observation_date', { ascending: false })
    .limit(1)
    .single();

  if (!obsError && obs) {
    const obsDate = new Date(obs.observation_date);
    const isStale = (new Date().getTime() - obsDate.getTime()) > (36 * 60 * 60 * 1000);
    
    if (!isStale) {
      return {
        score: Math.round(obs.normalized_risk * 100),
        value: obs.raw_value,
        status: (obs.normalized_risk > 0.6 ? 'Alert' : (obs.normalized_risk > 0.3 ? 'Warning' : 'Normal')) as 'Normal' | 'Warning' | 'Alert'
      };
    }
    console.warn(`Climate Engine: Data for ${regionId} is stale (>36h). Checking for static index fallback.`);
  }

  // 2. Fallback to pre-calculated index if real data is missing or stale
  let { data, error } = await supabase
    .from('indices')
    .select('value, metadata')
    .eq('region_id', regionId)
    .eq('name', 'CLIMATE_STRESS_INDEX')
    .order('calculated_at', { ascending: false })
    .limit(1)
    .single();

  if (error || !data) {
    return { score: 0, value: 0, status: 'Normal' as const };
  }

  const score = Number(data.value);
  const anomaly = Number((data.metadata as any)?.anomaly_percent || 0);
  
  return {
    score: Math.min(100, score),
    value: anomaly,
    status: (score > 60 ? 'Alert' : (score > 30 ? 'Warning' : 'Normal')) as 'Normal' | 'Warning' | 'Alert'
  };
}

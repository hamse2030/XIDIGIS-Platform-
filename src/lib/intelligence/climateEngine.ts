import { supabase } from '../supabase';

/**
 * Climate Engine
 * Normalizes precipitation anomalies into a 0-100 risk score.
 */
export async function getClimateScore(regionId: string) {
  if (!supabase) return { score: 0, value: 0, status: 'Normal' };

  const { data, error } = await supabase
    .from('indices')
    .select('value')
    .eq('region_id', regionId)
    .eq('name', 'CHIRPS_90D_ANOMALY')
    .order('calculated_at', { ascending: false })
    .limit(1)
    .single();

  if (error || !data) {
    console.warn('Climate Engine: No recent index found for region', regionId);
    return { score: 0, value: 0, status: 'Normal' as const };
  }

  const anomaly = Number(data.value);
  
  // Normalization Logic:
  // 0% or positive anomaly (more rain) = 0 risk
  // -100% anomaly (no rain) = 100 risk
  const normalizedScore = Math.abs(Math.min(0, anomaly));
  
  return {
    score: Math.min(100, normalizedScore),
    value: anomaly,
    status: (anomaly < -20 ? 'Alert' : (anomaly < -10 ? 'Warning' : 'Normal')) as 'Normal' | 'Warning' | 'Alert'
  };
}

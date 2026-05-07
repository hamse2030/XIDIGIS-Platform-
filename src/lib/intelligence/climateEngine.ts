import { supabase } from '../supabase';

/**
 * Climate Engine
 * Normalizes precipitation anomalies into a 0-100 risk score.
 */
export async function getClimateScore(regionId: string) {
  if (!supabase) return { score: 0, value: 0, status: 'Normal' };

  // 1. Try to get the latest calculated index
  let { data, error } = await supabase
    .from('indices')
    .select('value, metadata')
    .eq('region_id', regionId)
    .eq('name', 'CLIMATE_STRESS_INDEX')
    .order('calculated_at', { ascending: false })
    .limit(1)
    .single();

  if (error || !data) {
    // 2. Fallback to raw climate observations
    const { data: rawData } = await supabase
      .from('climate_observations')
      .select('drought_risk_score, rainfall_anomaly')
      .eq('region_id', regionId)
      .order('observation_date', { ascending: false })
      .limit(1)
      .single();
    
    if (!rawData) {
      console.warn('Climate Engine: No recent index or observation found for region', regionId);
      return { score: 0, value: 0, status: 'Normal' as const };
    }
    data = { value: rawData.drought_risk_score, metadata: { anomaly_percent: rawData.rainfall_anomaly } };
  }

  const score = Number(data.value);
  const anomaly = Number((data.metadata as any)?.anomaly_percent || 0);
  
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

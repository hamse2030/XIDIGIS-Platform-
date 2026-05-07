import { createClient } from '@supabase/supabase-js';

/**
 * XIDIGIS Risk Projection Engine
 * Analyzes temporal persistence of anomalies to forecast future risk levels.
 */

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface ForecastResult {
  regionId: string;
  horizon: 30 | 60 | 90; // days
  probability: number; // 0-100
  confidence: number; // 0-1
  reasoning: string;
}

export async function projectRegionalRisk(regionId: string, horizon: 30 | 60 | 90 = 60): Promise<ForecastResult> {
  // 1. Fetch historical observations for trend analysis
  const { data: recentClimate } = await supabase
    .from('climate_observations')
    .select('rainfall_anomaly, observation_date')
    .eq('region_id', regionId)
    .order('observation_date', { ascending: false })
    .limit(3); // Last 3 reporting periods

  if (!recentClimate || recentClimate.length < 2) {
    return {
      regionId, horizon, probability: 50, confidence: 0.3,
      reasoning: 'Insufficient historical data for high-confidence forecasting.'
    };
  }

  // 2. Trend Analysis Logic
  const currentAnomaly = Number(recentClimate[0].rainfall_anomaly);
  const previousAnomaly = Number(recentClimate[1].rainfall_anomaly);
  const isWorsening = currentAnomaly < previousAnomaly;
  
  // 3. Probability Calculation
  // Base probability starts at 50%
  let probability = 50;
  
  if (currentAnomaly < -20) probability += 15; // Current stress
  if (isWorsening) probability += 10; // Worsening trend
  if (currentAnomaly < -40) probability += 20; // Severe stress
  
  // Cap probability at 95% (Nothing is 100% certain in forecasting)
  probability = Math.min(95, probability);

  // 4. Institutional Reasoning Generation
  const statusText = currentAnomaly < -20 ? 'persistent rainfall deficits' : 'emerging climate stress';
  const trendText = isWorsening ? 'a deteriorating trend' : 'stabilizing but low precipitation';
  
  const reasoning = `Probability driven by ${statusText} and ${trendText} observed over the last ${recentClimate.length} reporting cycles.`;

  return {
    regionId,
    horizon,
    probability,
    confidence: 0.75,
    reasoning
  };
}

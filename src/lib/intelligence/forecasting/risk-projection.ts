import { createClient } from '@supabase/supabase-js';

/**
 * FALAG Risk Projection Engine
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
  // 1. Fetch Multi-Indicator Historical Data
  const { data: indices } = await supabase
    .from('indices')
    .select('*')
    .eq('region_id', regionId)
    .order('calculated_at', { ascending: false })
    .limit(10);

  if (!indices || indices.length < 3) {
    return {
      regionId, horizon, probability: 50, confidence: 0.3,
      reasoning: 'Insufficient multi-indicator history for dynamic forecasting.'
    };
  }

  // 2. Trend & Persistence Analysis
  const climateIdx = indices.filter(i => i.name === 'CLIMATE_STRESS_INDEX');
  const foodIdx = indices.filter(i => i.name === 'FOOD_SECURITY_INDEX');
  const securityIdx = indices.filter(i => i.name === 'SECURITY_INDEX');

  // Persistence check: are anomalies consistent?
  const climatePersistence = climateIdx.length >= 2 && Number(climateIdx[0].value) > 30 && Number(climateIdx[1].value) > 30;
  const foodDeterioration = foodIdx.length >= 2 && Number(foodIdx[0].value) > Number(foodIdx[1].value);
  const securityEscalation = securityIdx.length >= 2 && Number(securityIdx[0].value) > Number(securityIdx[1].value);

  // 3. Dynamic Probability Calculation
  let probability = 40; // Base baseline
  if (climatePersistence) probability += 25;
  if (foodDeterioration) probability += 20;
  if (securityEscalation) probability += 15;

  // 4. Confidence Engine
  const dataFreshness = (new Date().getTime() - new Date(indices[0].calculated_at).getTime()) / (1000 * 60 * 60); // hours
  let confidence = 0.9;
  if (dataFreshness > 24) confidence -= 0.1;
  if (indices.length < 5) confidence -= 0.2;

  // 5. Institutional Reasoning
  const drivers = [];
  if (climatePersistence) drivers.push('persistent rainfall deficit');
  if (foodDeterioration) drivers.push('deteriorating IPC phases');
  if (securityEscalation) drivers.push('rising incident density');

  const reasoning = probability > 60 
    ? `High escalation probability driven by ${drivers.join(', ')}.`
    : 'Baseline risk levels maintained; no significant trend acceleration detected.';

  return {
    regionId,
    horizon,
    probability: Math.min(95, probability),
    confidence: Math.max(0.1, confidence),
    reasoning
  };
}

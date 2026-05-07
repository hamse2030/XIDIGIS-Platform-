import { getClimateScore } from './climateEngine';
import { getFoodSecurityScore } from './foodSecurityEngine';
import { getSecurityScore } from './securityEngine';
import { getMarketScore } from './marketEngine';
import { supabase } from '../supabase';

export type RiskLevel = 'Low' | 'Moderate' | 'High' | 'Severe' | 'Critical';

export type IndicatorStatus = 'Normal' | 'Warning' | 'Alert';

export interface RiskOutput {
  score: number;
  level: RiskLevel;
  trend: 'Improving' | 'Stable' | 'Worsening';
  indicators: {
    label: string;
    value: number;
    status: IndicatorStatus;
  }[];
}

/**
 * Synchronous Risk Calculation
 * Used for static data or when metrics are already known.
 */
export function calculateRiskFromMetrics(
  climateVal: number, 
  foodVal: number, 
  securityVal: number, 
  marketVal: number = 0
): RiskOutput {
  // Normalize inputs
  const cScore = Math.min(Math.max(Math.abs(climateVal), 0), 100);
  const fScore = (foodVal / 5) * 100;
  const sScore = (securityVal / 10) * 100;

  const totalScore = 
    (cScore * 0.4) + 
    (fScore * 0.4) + 
    (sScore * 0.2);

  let level: RiskLevel = 'Low';
  if (totalScore >= 75) level = 'Critical';
  else if (totalScore >= 55) level = 'Severe';
  else if (totalScore >= 35) level = 'High';
  else if (totalScore >= 15) level = 'Moderate';

  return {
    score: Math.round(totalScore),
    level,
    trend: totalScore > 40 ? 'Worsening' : 'Stable',
    indicators: [
      { label: 'Climate Anomaly', value: climateVal, status: (cScore > 40 ? 'Alert' : (cScore > 20 ? 'Warning' : 'Normal')) as IndicatorStatus },
      { label: 'IPC Phase', value: foodVal, status: (foodVal >= 4 ? 'Alert' : (foodVal >= 3 ? 'Warning' : 'Normal')) as IndicatorStatus },
      { label: 'Security Context', value: securityVal, status: (sScore > 50 ? 'Alert' : (sScore > 25 ? 'Warning' : 'Normal')) as IndicatorStatus },
      { label: 'Market Volatility', value: marketVal, status: (marketVal > 30 ? 'Warning' : 'Normal') as IndicatorStatus }
    ]
  };
}

import { resolveConflict } from './fusion/conflict-resolver';
import { calculateAcceleration, calculatePersistence } from './temporal/trend-engine';

/**
 * Composite Risk Engine (Async) — Early Warning System (EWS) Version
 * Applies the predictive formula: R_final = (BaseRisk) * (1 + A + P)
 */
export async function calculateRegionalRisk(regionId: string): Promise<RiskOutput> {
  const [climate, food, security, market] = await Promise.all([
    getClimateScore(regionId),
    getFoodSecurityScore(regionId),
    getSecurityScore(regionId),
    getMarketScore(regionId)
  ]);

  // 1. Resolve Climate Fusion (Assuming we have a second source or using climate.value as proxy)
  const fusion = resolveConflict(climate.score, climate.score); // Simplified for current data availability
  
  // 2. Fetch History for Temporal Factors
  const { data: historyData } = await supabase
    .from('indices')
    .select('value')
    .eq('region_id', regionId)
    .eq('name', 'COMPOSITE_RISK')
    .order('calculated_at', { ascending: false })
    .limit(10);
    
  const history = (historyData?.map(d => Number(d.value)) || []).reverse();
  
  // 3. Calculate Factors
  const A = calculateAcceleration(history);
  const P = calculatePersistence(history);

  // 4. Predictive Formula: R_final = (0.4C + 0.4F + 0.2S) * (1 + A + P)
  const baseRisk = (fusion.finalRisk * 0.4) + (food.score * 0.4) + (security.score * 0.2);
  const finalRisk = baseRisk * (1 + (A / 100) + P);

  const output = calculateRiskFromMetrics(
    climate.value,
    food.value,
    security.value,
    market.value
  );

  return {
    ...output,
    score: Math.round(finalRisk)
  };
}

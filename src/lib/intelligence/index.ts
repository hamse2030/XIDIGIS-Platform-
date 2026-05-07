import { getClimateScore } from './climateEngine';
import { getFoodSecurityScore } from './foodSecurityEngine';
import { getSecurityScore } from './securityEngine';
import { getMarketScore } from './marketEngine';
import riskConfig from '../../config/risk-weights.json';

export type RiskLevel = 'Low' | 'Moderate' | 'High' | 'Severe' | 'Critical';

export interface RiskOutput {
  score: number;
  level: RiskLevel;
  trend: 'Improving' | 'Stable' | 'Worsening';
  indicators: {
    label: string;
    value: number;
    status: 'Normal' | 'Warning' | 'Alert';
  }[];
}

/**
 * Composite Risk Engine
 * Composes specialized engines and applies institutional weights.
 */
export async function calculateRegionalRisk(regionId: string): Promise<RiskOutput> {
  const { weights, thresholds } = riskConfig;

  // Execute all engines in parallel
  const [climate, food, security, market] = await Promise.all([
    getClimateScore(regionId),
    getFoodSecurityScore(regionId),
    getSecurityScore(regionId),
    getMarketScore(regionId)
  ]);

  // Weighted Score Calculation
  const totalScore = 
    (climate.score * weights.climate) + 
    (food.score * weights.foodSecurity) + 
    (security.score * weights.security) +
    (market.score * weights.market);

  // Determine Risk Level
  let level: RiskLevel = 'Low';
  if (totalScore >= thresholds.critical) level = 'Critical';
  else if (totalScore >= thresholds.severe) level = 'Severe';
  else if (totalScore >= thresholds.high) level = 'High';
  else if (totalScore >= thresholds.moderate) level = 'Moderate';

  return {
    score: Math.round(totalScore),
    level,
    trend: totalScore > 40 ? 'Worsening' : 'Stable',
    indicators: [
      { label: 'Climate Anomaly', value: climate.value, status: climate.status },
      { label: 'IPC Phase', value: food.value, status: food.status },
      { label: 'Security Context', value: security.value, status: security.status },
      { label: 'Market Volatility', value: market.value, status: market.status }
    ]
  };
}

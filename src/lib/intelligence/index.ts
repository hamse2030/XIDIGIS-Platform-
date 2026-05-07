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
 * Synchronous Risk Calculation
 * Used for static data or when metrics are already known.
 */
export function calculateRiskFromMetrics(
  climateVal: number, 
  foodVal: number, 
  securityVal: number, 
  marketVal: number = 0
): RiskOutput {
  const { weights, thresholds } = riskConfig;

  // Normalize inputs (simple linear mapping for now)
  const cScore = Math.min(Math.max(Math.abs(climateVal), 0), 100);
  const fScore = (foodVal / 5) * 100;
  const sScore = (securityVal / 10) * 100;
  const mScore = marketVal;

  const totalScore = 
    (cScore * weights.climate) + 
    (fScore * weights.foodSecurity) + 
    (sScore * weights.security) +
    (mScore * weights.market);

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
      { label: 'Climate Anomaly', value: climateVal, status: cScore > 30 ? 'Warning' : 'Normal' },
      { label: 'IPC Phase', value: foodVal, status: foodVal >= 3 ? 'Alert' : 'Normal' },
      { label: 'Security Context', value: securityVal, status: sScore > 40 ? 'Warning' : 'Normal' },
      { label: 'Market Volatility', value: marketVal, status: marketVal > 15 ? 'Warning' : 'Normal' }
    ]
  };
}

/**
 * Composite Risk Engine (Async)
 * Composes specialized engines and applies institutional weights.
 */
export async function calculateRegionalRisk(regionId: string): Promise<RiskOutput> {
  // Execute all engines in parallel
  const [climate, food, security, market] = await Promise.all([
    getClimateScore(regionId),
    getFoodSecurityScore(regionId),
    getSecurityScore(regionId),
    getMarketScore(regionId)
  ]);

  return calculateRiskFromMetrics(
    climate.value,
    food.value,
    security.value,
    market.value
  );
}

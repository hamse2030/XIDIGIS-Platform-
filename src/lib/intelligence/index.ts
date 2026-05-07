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

  // Normalize inputs
  const cScore = Math.min(Math.max(Math.abs(climateVal), 0), 100);
  const fScore = (foodVal / 5) * 100;
  const sScore = (securityVal / 10) * 100;
  const mScore = marketVal;

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
      { label: 'Climate Anomaly', value: climateVal, status: cScore > 40 ? 'Alert' : (cScore > 20 ? 'Warning' : 'Normal') },
      { label: 'IPC Phase', value: foodVal, status: foodVal >= 4 ? 'Alert' : (foodVal >= 3 ? 'Warning' : 'Normal') },
      { label: 'Security Context', value: securityVal, status: sScore > 50 ? 'Alert' : (sScore > 25 ? 'Warning' : 'Normal') },
      { label: 'Market Volatility', value: marketVal, status: marketVal > 30 ? 'Warning' : 'Normal' }
    ]
  };
}

/**
 * Composite Risk Engine (Async)
 * Composes specialized engines and applies institutional weights.
 */
export async function calculateRegionalRisk(regionId: string): Promise<RiskOutput> {
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

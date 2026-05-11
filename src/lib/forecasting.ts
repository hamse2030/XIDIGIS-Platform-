/**
 * FALAG Forecasting Engine
 * Simplified econometric models for regional food security and economic trends.
 */

export interface ForecastInput {
  rainfallAnomaly: number; // % deviation from long-term mean
  marketConnectivity: number; // 0-1 index
  livestockPrices: number; // current price vs baseline %
}

export interface ForecastResult {
  foodSecurityRisk: "Low" | "Moderate" | "High" | "Critical";
  probabilityScore: number;
  estimatedImpact: string;
}

/**
 * Simplified Linear Weighted Model for Food Security Risk
 */
export const runFoodSecurityForecast = (inputs: ForecastInput): ForecastResult => {
  // Simple heuristic regression weights
  // Risk increases as rainfall decreases and market connectivity drops
  const riskScore = 
    (Math.abs(Math.min(0, inputs.rainfallAnomaly)) * 0.5) + 
    ((1 - inputs.marketConnectivity) * 30) + 
    (Math.abs(Math.min(0, inputs.livestockPrices)) * 0.2);

  let risk: ForecastResult["foodSecurityRisk"] = "Low";
  let impact = "Standard monitoring required.";

  if (riskScore > 40) {
    risk = "Critical";
    impact = "Immediate humanitarian intervention likely required in eastern pastoral zones.";
  } else if (riskScore > 25) {
    risk = "High";
    impact = "Significant livestock depletion and market volatility anticipated.";
  } else if (riskScore > 10) {
    risk = "Moderate";
    impact = "Stress on localized water resources and pastoral livelihoods.";
  }

  return {
    foodSecurityRisk: risk,
    probabilityScore: Math.min(98, Math.round(riskScore * 2)),
    estimatedImpact: impact
  };
};

/**
 * XIDIGIS Risk Engine
 * Combines multi-dimensional indicators to produce institutional risk scores.
 */

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

export const calculateRegionalRisk = (
  rainfallAnomaly: number, // CHIRPS %
  ipcPhase: number,       // 1-5
  securityIncidents: number // count per month
): RiskOutput => {
  // Weighted Risk Algorithm
  // Climate (40%) + Food Security (40%) + Security (20%)
  
  const climateRisk = Math.abs(Math.min(0, rainfallAnomaly)) * 1.0; // 0 to 100
  const foodSecurityRisk = (ipcPhase - 1) * 25; // Phase 1=0, Phase 5=100
  const securityRisk = Math.min(100, securityIncidents * 10);

  const totalScore = (climateRisk * 0.4) + (foodSecurityRisk * 0.4) + (securityRisk * 0.2);

  let level: RiskLevel = 'Low';
  if (totalScore > 75) level = 'Critical';
  else if (totalScore > 55) level = 'Severe';
  else if (totalScore > 35) level = 'High';
  else if (totalScore > 15) level = 'Moderate';

  return {
    score: Math.round(totalScore),
    level,
    trend: totalScore > 40 ? 'Worsening' : 'Stable',
    indicators: [
      { label: 'Climate Anomaly', value: rainfallAnomaly, status: rainfallAnomaly < -20 ? 'Alert' : 'Normal' },
      { label: 'IPC Phase', value: ipcPhase, status: ipcPhase >= 3 ? 'Warning' : 'Normal' },
      { label: 'Security Context', value: securityIncidents, status: securityIncidents > 5 ? 'Warning' : 'Normal' }
    ]
  };
};

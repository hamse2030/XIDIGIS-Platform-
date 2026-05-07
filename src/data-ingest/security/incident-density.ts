/**
 * Security Incident Density Utility
 * Measures regional instability pressure based on conflict event frequency 
 * and severity (fatalities).
 */

export function calculateSecurityRisk(incidentCount: number, fatalities: number): number {
  // Base risk from incident volume (logarithmic scaling to avoid spikes)
  // 0 incidents = 0 risk
  // 10 incidents = ~40 risk
  // 50+ incidents = ~80 risk
  const volumeRisk = Math.min(80, Math.log1p(incidentCount) * 20);
  
  // Lethality multiplier: fatalities add weight to the risk
  const lethalityBonus = Math.min(20, fatalities * 2);
  
  return Math.min(100, Math.round(volumeRisk + lethalityBonus));
}

/**
 * IPC Phase Normalization Utility
 * Translates Integrated Food Security Phase Classification (IPC) levels 
 * into a normalized risk score (0-1).
 */

export const IPC_PHASE_MAP: Record<number, number> = {
  1: 0.1,  // Minimal/Stable
  2: 0.3,  // Stressed
  3: 0.6,  // Crisis
  4: 0.85, // Emergency
  5: 1.0   // Famine
};

/**
 * Normalizes an IPC Phase into a 0-1 risk score.
 */
export function normalizeIPC(phase: number): number {
  return IPC_PHASE_MAP[phase] || 0;
}

/**
 * Calculates a food security risk score (0-100) based on phase and trend.
 */
export function calculateFoodRiskScore(phase: number, trend: 'Improving' | 'Stable' | 'Worsening'): number {
  const baseRisk = normalizeIPC(phase) * 100;
  
  // Trend adjustment: +10% for worsening, -5% for improving
  let adjustment = 0;
  if (trend === 'Worsening') adjustment = 10;
  if (trend === 'Improving') adjustment = -5;
  
  return Math.min(100, Math.max(0, Math.round(baseRisk + adjustment)));
}

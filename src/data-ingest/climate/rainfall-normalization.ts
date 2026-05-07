/**
 * Rainfall Normalization Utility
 * Converts raw precipitation anomalies and totals into normalized risk scores.
 */

/**
 * Normalizes rainfall anomaly (%) into a 0-1 risk score.
 * Anomaly definition: (Current - Historical) / Historical * 100
 * 0% or higher = 0 risk (Normal/Wet)
 * -100% = 1 risk (No rain)
 */
export function normalizeRainfallAnomaly(anomalyPercent: number): number {
  if (anomalyPercent >= 0) return 0;
  // Convert -100 to 0 into 1 to 0
  const normalized = Math.abs(Math.min(0, anomalyPercent)) / 100;
  return Math.min(1, normalized);
}

/**
 * Calculates a drought risk score (0-100) based on anomaly and persistence.
 */
export function calculateDroughtScore(anomaly: number, consecutiveDryDays: number = 0): number {
  const baseRisk = normalizeRainfallAnomaly(anomaly) * 100;
  
  // Apply persistence multiplier
  // Every 10 consecutive dry days adds 5% risk, capped at +30%
  const persistenceBonus = Math.min(30, (consecutiveDryDays / 10) * 5);
  
  return Math.min(100, Math.round(baseRisk + persistenceBonus));
}

import { ClimateVariable } from './types';

/**
 * Normalization Engine
 * Converts raw climate values into a standardized risk scale (0–1).
 */
export function normalizeRisk(value: number, type: ClimateVariable): number {
  switch (type) {
    case 'drought_index':
      // Palmer Drought Severity Index (PDSI) typically ranges -10 to +10
      // Negative is dry. -4 or less is extreme drought.
      if (value >= 0) return 0; // Wet/Normal
      const droughtScore = Math.abs(value) / 5; // Normalize -5 to 1.0
      return Math.min(Math.max(droughtScore, 0), 1);

    case 'precipitation':
      // Standardized Precipitation Anomaly
      // If we get raw mm, we'd need a baseline. 
      // If we get % anomaly (e.g. -30%), normalize it.
      if (value >= 0) return 0;
      const precipDeficit = Math.abs(value) / 100; // -100% deficit = 1.0 risk
      return Math.min(Math.max(precipDeficit, 0), 1);

    default:
      return 0.5;
  }
}

/**
 * Categorize Risk Level based on Normalized Score
 */
export function getRiskLevel(score: number) {
  if (score >= 0.7) return 'Critical';
  if (score >= 0.5) return 'Severe';
  if (score >= 0.3) return 'Moderate';
  return 'Low';
}

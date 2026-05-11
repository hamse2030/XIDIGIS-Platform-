/**
 * FALAG Fusion Layer: Conflict Resolver
 * Resolves differences between CHIRPS and Climate Engine outputs.
 */

export interface FusionResult {
  finalRisk: number;
  confidence: number;
  divergenceScore: number;
  status: 'stable' | 'uncertain' | 'conflicting';
}

export function resolveConflict(chirpsRisk: number, climateEngineRisk: number): FusionResult {
  const divergence = Math.abs(chirpsRisk - climateEngineRisk);
  
  // Weights (can be adjusted by learning loop)
  const chirpsWeight = 0.5;
  const climateWeight = 0.5;

  const weightedRisk = (chirpsRisk * chirpsWeight) + (climateEngineRisk * climateWeight);
  
  let status: FusionResult['status'] = 'stable';
  let confidence = 1.0 - (divergence / 100);

  if (divergence > 40) {
    status = 'conflicting';
    confidence *= 0.5; // High divergence heavily penalizes confidence
  } else if (divergence > 20) {
    status = 'uncertain';
    confidence *= 0.8;
  }

  return {
    finalRisk: weightedRisk,
    confidence: Math.max(0, confidence),
    divergenceScore: divergence,
    status
  };
}

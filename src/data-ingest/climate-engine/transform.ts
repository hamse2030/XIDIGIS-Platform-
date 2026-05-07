import { ClimateEngineResponse, ClimateObservation, ClimateVariable } from './types';
import { normalizeRisk } from './normalize';

/**
 * Transform raw API JSON into structured XIDIGIS observations
 */
export function transformClimateData(
  raw: ClimateEngineResponse[], 
  regionId: string, 
  variableType: ClimateVariable
): ClimateObservation[] {
  return raw
    .filter(item => item.value !== null && item.value !== -9999) // Clean invalid entries
    .map(item => ({
      region_id: regionId,
      observation_date: item.Date,
      variable_type: variableType,
      raw_value: item.value,
      normalized_risk: normalizeRisk(item.value, variableType),
      source: 'climate_engine',
      confidence_score: 0.9 // Default confidence for official data
    }));
}

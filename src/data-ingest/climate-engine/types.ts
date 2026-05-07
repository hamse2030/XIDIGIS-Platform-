export type IndicatorStatus = 'Normal' | 'Warning' | 'Alert';

export type ClimateVariable = 'precipitation' | 'temp' | 'drought_index' | 'soil_moisture';

export interface ClimateObservation {
  id?: string;
  region_id: string;
  observation_date: string;
  variable_type: ClimateVariable;
  raw_value: number;
  normalized_risk: number;
  source: 'climate_engine';
  confidence_score: number;
  created_at?: string;
}

export interface ClimateEngineResponse {
  Date: string;
  value: number;
}

export interface RegionCentroid {
  id: string;
  name: string;
  lat: number;
  lon: number;
}

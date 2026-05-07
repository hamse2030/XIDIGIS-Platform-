import { climateRequest } from './client';
import { ENDPOINTS, DATASETS, VARIABLES } from './endpoints';
import { ClimateEngineResponse } from './types';

/**
 * Fetch Rainfall/Drought Timeseries for a specific coordinate
 */
export async function getRegionalTimeseries(
  lat: number, 
  lon: number, 
  dataset: string = DATASETS.CHIRPS,
  variable: string = VARIABLES.PRECIPITATION
): Promise<ClimateEngineResponse[]> {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));

  const params = {
    dataset,
    variable,
    start_date: thirtyDaysAgo.toISOString().split('T')[0],
    end_date: now.toISOString().split('T')[0],
    lat: lat.toString(),
    lon: lon.toString(),
    area_reducer: 'mean'
  };

  interface TimeseriesResponse {
    timeseries?: ClimateEngineResponse[];
  }

  try {
    const response = await climateRequest<TimeseriesResponse>(ENDPOINTS.TIMESERIES_COORDINATES, params);
    // Climate Engine often returns a nested structure or array depending on the exact dataset
    return response.timeseries || [];
  } catch (error) {
    console.error(`Failed to fetch timeseries for ${lat},${lon}:`, error);
    return [];
  }
}

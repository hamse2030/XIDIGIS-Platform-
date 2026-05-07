/**
 * Climate Engine Dataset and Variable Definitions
 */

export const ENDPOINTS = {
  TIMESERIES_COORDINATES: 'timeseries/native/coordinates',
  ZONAL_STATS: 'zonal/stats'
};

export const DATASETS = {
  GRIDMET_DROUGHT: 'GRIDMET_DROUGHT',
  CHIRPS: 'CHIRPS',
  MODIS_NDVI: 'MODIS_NDVI'
};

export const VARIABLES = {
  PRECIPITATION: 'precipitation',
  PDSI: 'pdsi', // Palmer Drought Severity Index
  SPI_90: 'spi90', // Standardized Precipitation Index (90-day)
  EDDI: 'eddi' // Evaporative Demand Drought Index
};

export const REGIONS = [
  { id: 'region-mj', name: 'Maroodi Jeex', lat: 9.56, lon: 44.06 },
  { id: 'region-to', name: 'Togdheer', lat: 9.52, lon: 45.53 },
  { id: 'region-sa', name: 'Sanaag', lat: 10.61, lon: 47.36 },
  { id: 'region-aw', name: 'Awdal', lat: 9.93, lon: 43.18 },
  { id: 'region-so', name: 'Sool', lat: 8.47, lon: 47.35 }
];

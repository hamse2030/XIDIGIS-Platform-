import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

interface RegionIndex {
  id: string;
  name: string;
  value: number | string;
  calculated_at: string;
  regions: { name: string; code: string };
}

// Mock GeoJSON for Somaliland Regions (Simplified)
const SOMALILAND_GEOJSON = {
  type: "FeatureCollection",
  features: [
    { type: "Feature", properties: { name: "Maroodi Jeex", code: "SL-MJ" }, geometry: { type: "Polygon", coordinates: [[[43.5, 9.2], [44.8, 9.2], [44.8, 10.1], [43.5, 10.1], [43.5, 9.2]]] } },
    { type: "Feature", properties: { name: "Awdal", code: "SL-AW" }, geometry: { type: "Polygon", coordinates: [[[42.7, 10.1], [43.5, 10.1], [43.5, 11.0], [42.7, 11.0], [42.7, 10.1]]] } },
    { type: "Feature", properties: { name: "Sahil", code: "SL-SH" }, geometry: { type: "Polygon", coordinates: [[[44.8, 10.1], [45.5, 10.1], [45.5, 11.0], [44.8, 11.0], [44.8, 10.1]]] } },
    { type: "Feature", properties: { name: "Togdheer", code: "SL-TO" }, geometry: { type: "Polygon", coordinates: [[[44.8, 8.5], [46.5, 8.5], [46.5, 10.1], [44.8, 10.1], [44.8, 8.5]]] } },
    { type: "Feature", properties: { name: "Sool", code: "SL-SO" }, geometry: { type: "Polygon", coordinates: [[[46.5, 8.2], [48.0, 8.2], [48.0, 9.5], [46.5, 9.5], [46.5, 8.2]]] } },
    { type: "Feature", properties: { name: "Sanaag", code: "SL-SA" }, geometry: { type: "Polygon", coordinates: [[[46.5, 9.5], [49.0, 9.5], [49.0, 11.5], [46.5, 11.5], [46.5, 9.5]]] } }
  ]
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const selectedDate = searchParams.get('date') || new Date().toISOString();

  let typedIndices: RegionIndex[] = [];

  // 1. Fetch latest indices for all regions as of the selected date (if Supabase is connected)
  if (supabase) {
    try {
      const { data: indices, error: idxError } = await supabase
        .from('indices')
        .select('*, regions(name, code)')
        .lte('calculated_at', selectedDate)
        .order('calculated_at', { ascending: false });

      if (!idxError && indices) {
        typedIndices = indices as unknown as RegionIndex[];
      }
    } catch (e) {
      console.warn("Supabase fetch failed, falling back to mock data", e);
    }
  }

  // 2. Map indices to GeoJSON layers
  const features = SOMALILAND_GEOJSON.features.map(feature => {
    const regionIndices = typedIndices?.filter((idx) => {
      const regionData = Array.isArray(idx.regions) ? idx.regions[0] : idx.regions;
      return regionData?.name === feature.properties.name;
    });

    const climateIdx = regionIndices?.find((idx) => idx.name === 'CLIMATE_STRESS_INDEX');
    const foodIdx = regionIndices?.find((idx) => idx.name === 'FOOD_SECURITY_INDEX');
    const securityIdx = regionIndices?.find((idx) => idx.name === 'SECURITY_INDEX');
    
    const regionMocks: Record<string, {c: number, f: number, s: number}> = {
      "Maroodi Jeex": { c: 20, f: 30, s: 40 },
      "Awdal": { c: 40, f: 20, s: 15 },
      "Sahil": { c: 60, f: 55, s: 20 },
      "Togdheer": { c: 80, f: 75, s: 60 },
      "Sool": { c: 85, f: 80, s: 90 },
      "Sanaag": { c: 70, f: 85, s: 65 }
    };

    const mock = regionMocks[feature.properties.name as string] || { c: 50, f: 50, s: 50 };
    
    // Calculate a mock composite if indices aren't fully populated yet
    const cVal = climateIdx?.value ? Number(climateIdx.value) : mock.c;
    const fVal = foodIdx?.value ? Number(foodIdx.value) : mock.f;
    const sVal = securityIdx?.value ? Number(securityIdx.value) : mock.s;
    const compositeRisk = Math.round((cVal * 0.4) + (fVal * 0.4) + (sVal * 0.2));

    return {
      ...feature,
      properties: {
        ...feature.properties,
        compositeRisk,
        layers: {
          climate: cVal,
          food: fVal,
          security: sVal,
          forecast: Math.min(100, compositeRisk + 15) // Worsening forecast mock
        }
      }
    };
  });

  return NextResponse.json({
    type: "FeatureCollection",
    features
  });
}

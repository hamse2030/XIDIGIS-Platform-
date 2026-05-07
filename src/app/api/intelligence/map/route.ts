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
    { type: "Feature", properties: { name: "Maroodi Jeex", code: "SL-MJ" }, geometry: { type: "Polygon", coordinates: [[[44, 9], [45, 9], [45, 10], [44, 10], [44, 9]]] } },
    { type: "Feature", properties: { name: "Togdheer", code: "SL-TO" }, geometry: { type: "Polygon", coordinates: [[[45, 9], [46, 9], [46, 10], [45, 10], [45, 9]]] } },
    { type: "Feature", properties: { name: "Sanaag", code: "SL-SA" }, geometry: { type: "Polygon", coordinates: [[[46, 10], [48, 10], [48, 11], [46, 11], [46, 10]]] } },
    { type: "Feature", properties: { name: "Awdal", code: "SL-AW" }, geometry: { type: "Polygon", coordinates: [[[43, 10], [44, 10], [44, 11], [43, 11], [43, 10]]] } },
    { type: "Feature", properties: { name: "Sool", code: "SL-SO" }, geometry: { type: "Polygon", coordinates: [[[46, 8], [48, 8], [48, 9], [46, 9], [46, 8]]] } }
  ]
};

export async function GET() {
  if (!supabase) return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });

  // 1. Fetch latest indices for all regions
  const { data: indices, error: idxError } = await supabase
    .from('indices')
    .select('*, regions(name, code)')
    .order('calculated_at', { ascending: false });

  if (idxError) return NextResponse.json({ error: idxError.message }, { status: 500 });

  // 2. Map indices to GeoJSON layers
  const features = SOMALILAND_GEOJSON.features.map(feature => {
    const regionIndices = (indices as any[])?.filter((idx: any) => {
      const regionData = Array.isArray(idx.regions) ? idx.regions[0] : idx.regions;
      return regionData?.name === feature.properties.name;
    });

    const climateIdx = regionIndices?.find((idx: any) => idx.name === 'CLIMATE_STRESS_INDEX');
    const foodIdx = regionIndices?.find((idx: any) => idx.name === 'FOOD_SECURITY_INDEX');
    const securityIdx = regionIndices?.find((idx: any) => idx.name === 'SECURITY_INDEX');
    
    // Calculate a mock composite if indices aren't fully populated yet
    const cVal = Number(climateIdx?.value || 0);
    const fVal = Number(foodIdx?.value || 0);
    const sVal = Number(securityIdx?.value || 0);
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
          forecast: Math.min(100, compositeRisk + 5) // Mock forecast
        }
      }
    };
  });

  return NextResponse.json({
    type: "FeatureCollection",
    features
  });
}

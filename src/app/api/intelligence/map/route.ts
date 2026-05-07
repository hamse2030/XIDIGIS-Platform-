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
    { 
      type: "Feature", 
      properties: { name: "Awdal", code: "SL-AW" }, 
      geometry: { type: "Polygon", coordinates: [[[42.7, 10.1], [43.5, 10.1], [43.5, 11.0], [42.7, 11.0], [42.7, 10.1]]] } 
    },
    { 
      type: "Feature", 
      properties: { name: "Maroodi Jeex", code: "SL-MJ" }, 
      geometry: { type: "Polygon", coordinates: [[[43.5, 9.2], [44.8, 9.2], [44.8, 10.1], [43.5, 10.1], [43.5, 9.2]]] } 
    },
    { 
      type: "Feature", 
      properties: { name: "Sahil", code: "SL-SH" }, 
      geometry: { type: "Polygon", coordinates: [[[44.8, 10.1], [45.5, 10.1], [45.5, 11.0], [44.8, 11.0], [44.8, 10.1]]] } 
    },
    { 
      type: "Feature", 
      properties: { name: "Togdheer", code: "SL-TO" }, 
      geometry: { type: "Polygon", coordinates: [[[44.8, 8.5], [46.5, 8.5], [46.5, 10.1], [44.8, 10.1], [44.8, 8.5]]] } 
    },
    { 
      type: "Feature", 
      properties: { name: "Sool", code: "SL-SO" }, 
      geometry: { type: "Polygon", coordinates: [[[46.5, 8.2], [48.0, 8.2], [48.0, 9.5], [46.5, 9.5], [46.5, 8.2]]] } 
    },
    { 
      type: "Feature", 
      properties: { name: "Sanaag", code: "SL-SA" }, 
      geometry: { type: "Polygon", coordinates: [[[46.5, 9.5], [49.0, 9.5], [49.0, 11.5], [46.5, 11.5], [46.5, 9.5]]] } 
    }
  ]
};

export async function GET(request: Request) {
  if (!supabase) return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });

  const { searchParams } = new URL(request.url);
  const selectedDate = searchParams.get('date') || new Date().toISOString();

  // 1. Fetch latest indices for all regions as of the selected date
  const { data: indices, error: idxError } = await supabase
    .from('indices')
    .select('*, regions(name, code)')
    .lte('calculated_at', selectedDate)
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

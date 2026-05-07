import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

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

  // 2. Map indices to GeoJSON
  const features = SOMALILAND_GEOJSON.features.map(feature => {
    // Find the latest anomaly for this region
    const regionIndices = indices?.filter(idx => idx.regions.name === feature.properties.name);
    const latestAnomaly = regionIndices?.find(idx => idx.name.includes('ANOMALY'));
    
    return {
      ...feature,
      properties: {
        ...feature.properties,
        score: latestAnomaly ? Math.abs(Math.min(0, Number(latestAnomaly.value))) : 0, // Normalized 0-100
        rawValue: latestAnomaly?.value || 0
      }
    };
  });

  return NextResponse.json({
    type: "FeatureCollection",
    features
  });
}

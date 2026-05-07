"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Play, Pause } from "lucide-react";
import "leaflet/dist/leaflet.css";

// Dynamic imports for Leaflet components
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const GeoJSON = dynamic(() => import("react-leaflet").then((mod) => mod.GeoJSON), { ssr: false });

interface RegionProperties {
  name: string;
  compositeRisk?: number;
  layers?: {
    climate: number;
    food: number;
    security: number;
    forecast: number;
  };
}

interface GeoJSONData {
  type: "FeatureCollection";
  features: Array<{
    type: "Feature";
    properties: RegionProperties;
    geometry: unknown;
  }>;
}

interface DroughtMapProps {
  onRegionSelect?: (region: RegionProperties) => void;
}

export default function DroughtMap({ onRegionSelect }: DroughtMapProps) {
  const [mapData, setMapData] = useState<GeoJSONData | null>(null);
  const [timeStep, setTimeStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeLayer, setActiveLayer] = useState<'compositeRisk' | 'climate' | 'food' | 'security' | 'forecast'>('compositeRisk');

  useEffect(() => {
    let active = true;
    const daysOffset = 100 - timeStep;
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - daysOffset);
    
    async function loadData() {
      try {
        const res = await fetch(`/api/intelligence/map?date=${targetDate.toISOString()}`);
        const data = await res.json();
        if (active) {
          if (data.error) console.error('API Error:', data.error);
          else setMapData(data);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Error fetching map data:', err);
        if (active) setIsLoading(false);
      }
    }

    loadData();
    return () => { active = false; };
  }, [timeStep]);

  // ── Auto-Playback Effect ──
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimeStep(prev => (prev >= 100 ? 0 : prev + 1));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // ── Choropleth Styling (Semantic Brand Colors) ──
  const getStyle = (feature: GeoJSONData['features'][0] | undefined) => {
    if (!feature) return {};
    const props = feature.properties as RegionProperties;
    let score = 0;
    if (activeLayer === 'compositeRisk') score = props.compositeRisk || 0;
    else score = props.layers?.[activeLayer] || 0;

    let color = "#0F9D88"; // brand-teal (Safe)
    if (score >= 75) color = "#B3472A";      // brand-burnt (Critical)
    else if (score >= 55) color = "#D9534F"; // brand-deep-orange (Severe)
    else if (score >= 35) color = "#D19F2B"; // brand-amber (Moderate)
    else if (score >= 15) color = "#9AA03A"; // brand-olive (Watch)

    return {
      fillColor: color,
      weight: 1,
      opacity: 1,
      color: '#FFFFFF',
      fillOpacity: 0.8
    };
  };

  const onEachFeature = (feature: GeoJSONData['features'][0], layer: unknown) => {
    interface LeafletEvent {
      target: {
        setStyle: (style: { fillOpacity: number; weight: number }) => void;
      };
    }

    const leafletLayer = layer as { 
      on: (events: { 
        click: () => void; 
        mouseover: (e: LeafletEvent) => void; 
        mouseout: (e: LeafletEvent) => void; 
      }) => void 
    };

    leafletLayer.on({
      click: () => {
        if (onRegionSelect) onRegionSelect(feature.properties as RegionProperties);
      },
      mouseover: (e) => {
        e.target.setStyle({ fillOpacity: 1, weight: 2 });
      },
      mouseout: (e) => {
        e.target.setStyle({ fillOpacity: 0.8, weight: 1 });
      }
    });
  };

  if (isLoading) return (
    <div className="h-full bg-ivory-50 animate-pulse rounded-lg flex flex-col items-center justify-center text-slate-400 gap-4">
      <div className="w-12 h-12 border-2 border-ivory-500 border-t-brand-primary rounded-full animate-spin" />
      <span className="text-[10px] font-black uppercase tracking-widest">Hydrating GIS Data...</span>
    </div>
  );

  return (
    <div className="relative h-full w-full bg-ivory-50">
      
      {/* 1. MAP ENGINE */}
      <MapContainer 
        center={[9.7, 46.5]} 
        zoom={6} 
        zoomControl={false}
        className="h-full w-full z-0"
        style={{ background: '#FBF9F6' }}
      >
        <TileLayer
          attribution='&copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {mapData && (
          <GeoJSON 
            data={mapData} 
            style={getStyle} 
            onEachFeature={onEachFeature} 
          />
        )}
      </MapContainer>

      {/* 2. LAYER SELECTOR (Strategic Ops style) */}
      <div className="absolute top-6 left-6 z-[1000] flex flex-col gap-2">
        {[
          { id: 'compositeRisk', label: 'Composite Risk' },
          { id: 'climate', label: 'Climate Stress' },
          { id: 'food', label: 'Food Security' },
          { id: 'security', label: 'Security Density' },
          { id: 'forecast', label: '90D Forecast' }
        ].map((layer) => (
          <button
            key={layer.id}
            onClick={() => setActiveLayer(layer.id as 'compositeRisk' | 'climate' | 'food' | 'security' | 'forecast')}
            className={`px-4 py-2 rounded-sm text-[9px] font-black uppercase tracking-widest transition-all text-left border ${
              activeLayer === layer.id 
                ? 'bg-slate-900 text-white border-slate-900 shadow-md translate-x-1' 
                : 'bg-white/90 text-slate-500 border-ivory-200 hover:border-slate-400'
            }`}
          >
            {layer.label}
          </button>
        ))}
      </div>

      {/* 3. TIME SLIDER (Institutional Pattern) */}
      <div className="absolute bottom-6 left-6 right-6 z-[1000]">
        <div className="xi-card bg-white/90 backdrop-blur-md p-4 max-w-xl mx-auto border-ivory-500 shadow-elevated">
          <div className="flex items-center gap-5">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 flex items-center justify-center bg-slate-900 text-white rounded-full hover:bg-slate-700 transition-colors shadow-sm"
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} fill="currentColor" />}
            </button>
            
            <div className="flex-1">
              <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
                <span>01 MAR 2026</span>
                <span className="text-slate-900 font-black">MAY 2026 (LATEST)</span>
                <span>30 JUN 2026</span>
              </div>
              <input 
                type="range" 
                min="0" max="100" 
                value={timeStep}
                onChange={(e) => setTimeStep(parseInt(e.target.value))}
                className="w-full h-1.5 bg-ivory-500 rounded-lg appearance-none cursor-pointer accent-slate-900"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


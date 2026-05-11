"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Play, Pause, Terminal, Layers } from "lucide-react";
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

  // ── Choropleth Styling (FALAG Dark Palette) ──
  const getStyle = (feature: GeoJSONData['features'][0] | undefined) => {
    if (!feature) return {};
    const props = feature.properties as RegionProperties;
    let score = 0;
    if (activeLayer === 'compositeRisk') score = props.compositeRisk || 0;
    else score = props.layers?.[activeLayer] || 0;

    let color = "#38BDF8"; // risk-stable (Sky-400)
    if (score >= 75) color = "#EF4444";      // risk-critical (Red-500)
    else if (score >= 55) color = "#F97316"; // risk-high (Orange-500)
    else if (score >= 35) color = "#FBBF24"; // risk-mod (Amber-400)
    else if (score >= 15) color = "#10B981"; // risk-low (Emerald-500)

    return {
      fillColor: color,
      weight: 1,
      opacity: 0.5,
      color: '#1E293B',
      fillOpacity: 0.6
    };
  };

  const onEachFeature = (feature: GeoJSONData['features'][0], layer: unknown) => {
    interface LeafletEvent {
      target: {
        setStyle: (style: { fillOpacity: number; weight: number; opacity: number }) => void;
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
        e.target.setStyle({ fillOpacity: 0.9, weight: 2, opacity: 1 });
      },
      mouseout: (e) => {
        e.target.setStyle({ fillOpacity: 0.6, weight: 1, opacity: 0.5 });
      }
    });
  };

  if (isLoading) return (
    <div className="h-full bg-navy-950 animate-pulse flex flex-col items-center justify-center text-primary gap-6">
      <div className="w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
      <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em]">Initializing GIS Matrix...</span>
    </div>
  );

  return (
    <div className="relative h-full w-full bg-navy-950">
      
      {/* 1. MAP CORE (Dark Matter) */}
      <MapContainer 
        center={[9.7, 46.5]} 
        zoom={6} 
        zoomControl={false}
        className="h-full w-full z-0"
        style={{ background: '#080C16' }}
      >
        <TileLayer
          attribution='&copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {mapData && (
          <GeoJSON 
            key={`${activeLayer}-${timeStep}`}
            data={mapData} 
            style={getStyle} 
            onEachFeature={onEachFeature} 
          />
        )}
      </MapContainer>

      {/* 2. STRATEGIC LAYER SELECTOR */}
      <div className="absolute top-8 left-8 z-[1000] flex flex-col gap-3">
        <div className="mb-2 flex items-center gap-2 text-[10px] font-mono font-bold text-primary uppercase tracking-[0.3em]">
           <Layers size={14} /> Matrix Layers
        </div>
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
            className={`px-5 py-3 text-[10px] font-mono font-bold uppercase tracking-widest transition-all text-left border ${
              activeLayer === layer.id 
                ? 'bg-primary text-navy-950 border-primary shadow-[0_0_15px_rgba(34,211,238,0.4)] translate-x-2' 
                : 'bg-navy-900/80 text-text-dim border-border-subtle hover:border-primary/50 backdrop-blur-md'
            }`}
          >
            {layer.label}
          </button>
        ))}
      </div>

      {/* 3. TEMPORAL SLIDER (Engineered Aesthetic) */}
      <div className="absolute bottom-10 left-10 right-10 z-[1000]">
        <div className="xi-card bg-navy-900/90 backdrop-blur-xl p-6 max-w-2xl mx-auto border-primary/20 shadow-premium">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className={`w-12 h-12 flex items-center justify-center transition-all ${
                isPlaying ? 'bg-risk-critical text-white' : 'bg-primary text-navy-950'
              } shadow-lg`}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
            </button>
            
            <div className="flex-1">
              <div className="flex justify-between text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-text-dim mb-4">
                <span>01 MAR 2026</span>
                <div className="flex items-center gap-2 text-primary">
                   <Terminal size={12} />
                   <span>SYNC: MAY 2026</span>
                </div>
                <span>30 JUN 2026</span>
              </div>
              <div className="relative h-1.5 w-full bg-navy-800">
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={timeStep}
                  onChange={(e) => setTimeStep(parseInt(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div 
                  className="absolute inset-y-0 left-0 bg-primary shadow-[0_0_10px_rgba(34,211,238,0.5)]" 
                  style={{ width: `${timeStep}%` }} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

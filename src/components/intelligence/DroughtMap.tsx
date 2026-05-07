"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause } from "lucide-react";
import "leaflet/dist/leaflet.css";

// Dynamic imports for Leaflet components
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const GeoJSON = dynamic(() => import("react-leaflet").then((mod) => mod.GeoJSON), { ssr: false });

interface DroughtMapProps {
  onRegionSelect?: (region: any) => void;
}

export default function DroughtMap({ onRegionSelect }: DroughtMapProps) {
  const [mapData, setMapData] = useState<any>(null);
  const [timeStep, setTimeStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/intelligence/map')
      .then(res => res.json())
      .then(data => {
        setMapData(data);
        setIsLoading(false);
      })
      .catch(err => console.error('Error fetching map data:', err));
  }, []);

  // ── Choropleth Styling (Semantic Brand Colors) ──
  const getStyle = (feature: any) => {
    const score = feature.properties.score || 0;
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

  const onEachFeature = (feature: any, layer: any) => {
    layer.on({
      click: (e: any) => {
        if (onRegionSelect) onRegionSelect(feature.properties);
      },
      mouseover: (e: any) => {
        const l = e.target;
        l.setStyle({ fillOpacity: 1, weight: 2 });
      },
      mouseout: (e: any) => {
        const l = e.target;
        l.setStyle({ fillOpacity: 0.8, weight: 1 });
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

      {/* 2. TIME SLIDER (Institutional Pattern) */}
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


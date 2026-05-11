"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default markers
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function DroughtMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return;

    // Initialize map focused on Somaliland/East Africa
    const map = L.map(mapContainer.current, {
      center: [9.5624, 45.3618], // Hargeisa
      zoom: 6,
      zoomControl: false,
      scrollWheelZoom: false,
    });

    // LIGHT MODE TILES (CartoDB Positron)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    // Mock Hotspots (Risk Clusters)
    const hotspots = [
      { coords: [9.56, 45.36], label: "Hargeisa", severity: "Moderate", color: "#FBBF24" },
      { coords: [10.62, 47.36], label: "Sanaag Core", severity: "Critical", color: "#E11D48" },
      { coords: [8.48, 47.33], label: "Sool Plateau", severity: "Severe", color: "#F97316" },
      { coords: [10.28, 43.33], label: "Awdal Coast", severity: "Stable", color: "#0891B2" },
    ];

    hotspots.forEach((point) => {
      L.circle(point.coords as L.LatLngExpression, {
        color: point.color,
        fillColor: point.color,
        fillOpacity: 0.2,
        radius: 35000,
        weight: 1,
      }).addTo(map)
        .bindPopup(`
          <div style="font-family: var(--font-mono); padding: 4px;">
            <div style="font-weight: 800; text-transform: uppercase; font-size: 10px; margin-bottom: 4px;">${point.label}</div>
            <div style="font-size: 9px; text-transform: uppercase; color: ${point.color}">Severity: ${point.severity}</div>
          </div>
        `);
    });

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full z-10" />
      
      {/* Map Overlay Controls (Light Mode) */}
      <div className="absolute top-24 right-8 z-20 flex flex-col gap-3">
        {['SATELLITE', 'TERRAIN', 'HEATMAP', 'MARKETS'].map((layer) => (
          <button 
            key={layer}
            className="px-4 py-2 bg-white/90 backdrop-blur-sm border border-border text-[9px] font-mono font-bold text-navy-950 uppercase tracking-widest hover:border-primary transition-all shadow-sm"
          >
            {layer}
          </button>
        ))}
      </div>

      <div className="absolute bottom-8 right-8 z-20 px-6 py-3 bg-white/90 backdrop-blur-sm border border-border text-[9px] font-mono font-bold text-navy-950 uppercase tracking-[0.3em] shadow-sm flex items-center gap-3">
         <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
         GPS: 9.5624° N, 45.3618° E
      </div>
    </div>
  );
}

"use client";

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export type Territory = "ALL" | "SOMALIA" | "SOMALILAND";

export interface DroughtMapProps {
  territory?: Territory;
  onTerritoryChange?: (territory: Territory) => void;
  onRegionClick?: (region: any) => void;
}

const REGIONS_DATA = [
  // Somaliland Regions
  { id: 'awdal', name: 'Awdal', territory: 'SOMALILAND', riskScore: 45, coords: [[10.5, 42.5], [11.0, 43.0], [10.2, 43.5], [10.0, 42.8]] },
  { id: 'woqooyi', name: 'Woqooyi Galbeed', territory: 'SOMALILAND', riskScore: 65, coords: [[10.0, 43.5], [10.5, 44.0], [9.8, 44.5], [9.5, 43.8]] },
  { id: 'togdheer', name: 'Togdheer', territory: 'SOMALILAND', riskScore: 82, coords: [[9.5, 44.5], [10.0, 45.5], [8.5, 46.0], [8.2, 44.8]] },
  { id: 'sanaag', name: 'Sanaag', territory: 'SOMALILAND', riskScore: 50, coords: [[10.0, 46.0], [11.0, 47.0], [10.5, 48.0], [9.5, 47.5], [9.5, 46.0]] },
  { id: 'sool', name: 'Sool', territory: 'SOMALILAND', riskScore: 58, coords: [[9.5, 47.5], [9.0, 48.5], [8.0, 47.5], [8.5, 46.5]] },
  
  // Federal Somalia Regions
  { id: 'bari', name: 'Bari', territory: 'SOMALIA', riskScore: 30, coords: [[11.0, 49.0], [12.0, 50.0], [10.0, 51.0], [9.0, 49.5]] },
  { id: 'mudug', name: 'Mudug', territory: 'SOMALIA', riskScore: 85, coords: [[6.0, 47.0], [7.0, 48.0], [6.0, 49.0], [5.0, 48.0]] },
  { id: 'banadir', name: 'Banadir', territory: 'SOMALIA', riskScore: 25, coords: [[2.0, 45.0], [2.5, 45.5], [1.5, 45.0]] },
];

function MapController({ territory }: { territory: Territory }) {
  const map = useMap();

  useEffect(() => {
    if (territory === 'ALL') {
      map.flyTo([6.5, 46.5], 6, { duration: 1.2 });
    } else if (territory === 'SOMALIA') {
      map.flyTo([4.0, 45.5], 6.8, { duration: 1.2 });
    } else if (territory === 'SOMALILAND') {
      map.flyTo([10.2, 44.8], 7.5, { duration: 1.2 });
    }
  }, [territory, map]);

  return null;
}

const createTextIcon = (text: string, color: string) => {
  return L.divIcon({
    className: 'custom-territory-label',
    html: `<div style="color: ${color}; font-size: 13px; font-weight: 600; text-transform: uppercase; white-space: nowrap; text-shadow: 0 2px 4px rgba(0,0,0,0.9);">${text}</div>`,
    iconSize: [150, 20],
    iconAnchor: [75, 10],
  });
};

const somalilandIcon = createTextIcon('SOMALILAND', '#f59e0b');
const somaliaIcon = createTextIcon('FEDERAL SOMALIA', '#d1d5db');

export function DroughtMap({ territory = 'ALL', onTerritoryChange, onRegionClick }: DroughtMapProps) {
  
  const getFillColor = (score: number) => {
    if (score >= 75) return '#dc2626';
    if (score >= 55) return '#ea580c';
    if (score >= 35) return '#ca8a04';
    return '#16a34a';
  };

  return (
    <div className="relative w-full h-full bg-[#0d1117] overflow-hidden rounded-lg z-0">
      <MapContainer
        center={[6.5, 46.5]}
        zoom={6}
        minZoom={5.5}
        maxZoom={19}
        scrollWheelZoom={true}
        dragging={true}
        touchZoom={true}
        doubleClickZoom={true}
        className="w-full h-full z-0"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        <MapController territory={territory} />

        {(territory === 'ALL' || territory === 'SOMALILAND') && (
          <Marker position={[11.0, 47.5]} icon={somalilandIcon} interactive={false} />
        )}
        
        {(territory === 'ALL' || territory === 'SOMALIA') && (
          <Marker position={[2.5, 48.0]} icon={somaliaIcon} interactive={false} />
        )}

        {REGIONS_DATA.map((region) => {
          const isSelectedTerritory = territory === 'ALL' || region.territory === territory;
          const fillColor = getFillColor(region.riskScore);
          
          let pathOptions: L.PathOptions;
          
          if (isSelectedTerritory) {
            pathOptions = {
              fillOpacity: 0.65,
              weight: region.territory === 'SOMALILAND' ? 2.5 : 1.5,
              color: region.territory === 'SOMALILAND' ? '#f59e0b' : '#ffffff',
              fillColor: fillColor,
              dashArray: (region.territory === 'SOMALILAND' && territory === 'ALL') ? "5,5" : undefined,
            };
          } else {
            pathOptions = {
              fillOpacity: 0.08,
              opacity: 0.3,
              weight: 1,
              color: '#374151',
              fillColor: '#374151',
            };
          }

          return (
            <Polygon
              key={region.id}
              positions={region.coords as L.LatLngExpression[]}
              pathOptions={pathOptions}
              eventHandlers={{
                click: () => onRegionClick && onRegionClick(region),
                mouseover: (e) => {
                  const layer = e.target;
                  if (isSelectedTerritory) {
                    layer.setStyle({
                      fillOpacity: 0.85,
                      weight: (pathOptions.weight || 1) + 1,
                    });
                  }
                },
                mouseout: (e) => {
                  const layer = e.target;
                  layer.setStyle(pathOptions);
                }
              }}
            >
              <Popup className="min-w-[150px]">
                <div className="p-1">
                  <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-[0.2em] mb-1">
                    {region.territory}
                  </div>
                  <div className="text-sm font-bold text-gray-900 mb-2">{region.name}</div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm shadow-sm" style={{ backgroundColor: fillColor }} />
                    <span className="text-xs font-semibold text-gray-800">Risk Score: {region.riskScore}</span>
                  </div>
                </div>
              </Popup>
            </Polygon>
          );
        })}
      </MapContainer>

      {/* Vignette Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-[1000]" 
        style={{ background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.5) 100%)' }} 
      />

      {/* Legend & Badges */}
      <div className="absolute bottom-6 left-6 z-[1000] flex flex-col gap-3 pointer-events-none">
        
        {/* Legend Box */}
        <div className="bg-[#0d1117]/95 border border-[#1e293b] rounded-lg p-4 backdrop-blur-md shadow-2xl pointer-events-auto">
          <div className="mb-4">
            <div className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-widest mb-3">Territories</div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 border-t-[2.5px] border-[#f59e0b] border-dashed" />
              <span className="text-[11px] font-medium text-[#d1d5db] uppercase tracking-wider">Somaliland</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 border-t-[1.5px] border-[#ffffff] border-solid" />
              <span className="text-[11px] font-medium text-[#d1d5db] uppercase tracking-wider">Federal Somalia</span>
            </div>
          </div>
          
          <div>
            <div className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-widest mb-3">Risk Scale</div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#dc2626] shadow-sm" />
                <span className="text-[11px] font-medium text-[#d1d5db]">Critical (≥75)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#ea580c] shadow-sm" />
                <span className="text-[11px] font-medium text-[#d1d5db]">High (55-74)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#ca8a04] shadow-sm" />
                <span className="text-[11px] font-medium text-[#d1d5db]">Moderate (35-54)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#16a34a] shadow-sm" />
                <span className="text-[11px] font-medium text-[#d1d5db]">Stable (&lt;35)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Badge */}
        <div className="text-[#f59e0b] text-[10px] font-bold tracking-widest flex items-center gap-2 px-2 py-1 bg-black/60 w-max rounded backdrop-blur-sm border border-[#f59e0b]/20">
          <span className="animate-pulse w-2 h-2 bg-[#f59e0b] rounded-full" /> DEMO DATA
        </div>
      </div>
      
    </div>
  );
}

export default DroughtMap;

"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// Dynamic import to avoid SSR issues with Leaflet
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

const hotspots = [
  { id: 1, city: "Hargeisa", position: [9.5624, 44.077], count: 1240, topic: "Economic Reform" },
  { id: 2, city: "Berbera", position: [10.4391, 45.0119], count: 850, topic: "Port Infrastructure" },
  { id: 3, city: "Burao", position: [9.5222, 45.5333], count: 620, topic: "Livestock Export" },
  { id: 4, city: "Boorama", position: [9.9333, 43.1833], count: 430, topic: "Educational Growth" },
];

export default function SomalilandMap() {
  const [isMounted, setIsMounted] = useState(false);
  const [L, setL] = useState<typeof import("leaflet") | null>(null);

  useEffect(() => {
    let active = true;
    import("leaflet").then((leaflet) => {
      if (active) {
        const LeafletNamespace = leaflet.default as unknown as typeof import("leaflet");
        setL(LeafletNamespace);
        // Fix marker icon issue in Next.js
        const DefaultIcon = LeafletNamespace.Icon.Default;
        delete DefaultIcon.prototype._getIconUrl;
        DefaultIcon.mergeOptions({
          iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
          iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        });
        setIsMounted(true);
      }
    });
    return () => { active = false; };
  }, []);

  if (!isMounted || !L) return <div className="h-[500px] bg-slate-100 animate-pulse rounded-xl" />;

  return (
    <section className="py-24 bg-white dark:bg-[#0F172A]">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-serif font-black text-[#8B4513] dark:text-white mb-4 italic">Forum Activity Hotspots</h2>
          <p className="text-[#D2B48C] font-bold uppercase tracking-widest text-sm">Real-time discussion distribution across Somaliland</p>
        </div>
        
        <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-[#D2B48C]/20 h-[600px] z-0">
          <MapContainer 
            center={[9.7, 44.5]} 
            zoom={7} 
            scrollWheelZoom={false} 
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {hotspots.map((spot) => (
              <Marker key={spot.id} position={spot.position as [number, number]}>
                <Popup>
                  <div className="font-sans p-2">
                    <h3 className="font-black text-[#8B4513]">{spot.city}</h3>
                    <p className="text-sm font-bold text-[#D2B48C] mb-2">{spot.count} Discussions</p>
                    <p className="text-xs bg-slate-100 p-1 rounded">Trending: {spot.topic}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
}

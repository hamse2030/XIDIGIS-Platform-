"use client";

import { useState } from "react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell
} from "recharts";
import { CloudRain, AlertTriangle, Info, TrendingUp, Download } from "lucide-react";

// Mock satellite data (CHIRPS Anomaly Simulation)
const satelliteData = [
  { month: "Jan", rainfall: 45, anomaly: -15 },
  { month: "Feb", rainfall: 30, anomaly: -20 },
  { month: "Mar", rainfall: 65, anomaly: -5 },
  { month: "Apr", rainfall: 120, anomaly: 10 },
  { month: "May", rainfall: 85, anomaly: -25 },
  { month: "Jun", rainfall: 40, anomaly: -30 },
];

const ipcStats = [
  { phase: "Phase 1: Minimal", count: 450, color: "#1E3A8A" },
  { phase: "Phase 2: Stressed", count: 320, color: "#D2B48C" },
  { phase: "Phase 3: Crisis", count: 180, color: "#8B4513" },
  { phase: "Phase 4: Emergency", count: 90, color: "#ef4444" },
];

export default function DroughtDashboard() {
  const [activeMetric, setActiveMetric] = useState("rainfall");

  return (
    <div className="space-y-8">
      {/* Realtime Alert Bar */}
      <div className="bg-[#FFFBEB] p-5 flex items-center justify-between border-l-4 border-l-[#F59E0B] rounded shadow-sm">
        <div className="flex items-center gap-4">
          <AlertTriangle className="text-[#F59E0B] animate-pulse" size={20} />
          <span className="text-[10px] font-black uppercase tracking-widest text-primary italic">
            Strategic Warning: Severe Rainfall Deficit in Togdheer & Sanaag Regions (Q2 2026)
          </span>
        </div>
        <button className="text-[10px] font-black text-primary border border-primary/20 px-4 py-2 uppercase tracking-widest hover:bg-primary hover:text-white transition-all rounded-sm">
          Access Intelligence
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Rainfall Anomaly Chart */}
        <div className="bg-white dark:bg-slate-800 p-8 border border-secondary/10 rounded-sm">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <CloudRain className="text-primary" />
              <h3 className="font-serif font-black italic text-xl text-primary">CHIRPS Rainfall Anomaly</h3>
            </div>
            <button className="p-2 hover:bg-accent rounded text-primary/40"><Download size={16} /></button>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={satelliteData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={10} fontWeight="bold" tickLine={false} axisLine={false} />
                <YAxis stroke="#9CA3AF" fontSize={10} fontWeight="bold" tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#8B4513", color: "#FFF", borderRadius: "2px", border: "none", fontSize: "12px", fontFamily: "serif" }}
                  itemStyle={{ color: "#D2B48C", fontWeight: "bold" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="anomaly" 
                  stroke="#8B4513" 
                  strokeWidth={4} 
                  dot={{ fill: "#8B4513", r: 6 }} 
                  activeDot={{ r: 8, stroke: "#D2B48C", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-6 text-[10px] font-bold text-primary/40 italic uppercase tracking-widest text-center">
            *Source: UCSB Climate Hazards Group Infrared Precipitation with Station data (CHIRPS)
          </p>
        </div>

        {/* IPC Classification Breakdown */}
        <div className="bg-white dark:bg-slate-800 p-8 border border-secondary/10 rounded-sm">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <TrendingUp className="text-primary" />
              <h3 className="font-serif font-black italic text-xl text-primary">IPC Food Security Phase (k)</h3>
            </div>
            <div className="flex gap-2">
              <span className="w-3 h-3 bg-secondary rounded-full" />
              <span className="w-3 h-3 bg-primary rounded-full" />
            </div>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ipcStats} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="phase" type="category" stroke="#9CA3AF" fontSize={8} fontWeight="black" width={100} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: "transparent" }} />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {ipcStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-6 text-[10px] font-bold text-primary/40 italic uppercase tracking-widest text-center">
            *Populations in thousands (estimated). Integrated Food Security Phase Classification.
          </p>
        </div>
      </div>
    </div>
  );
}

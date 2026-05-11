"use client";

import { useState, useEffect } from "react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, AreaChart, Area
} from "recharts";
import { CloudRain, AlertTriangle, TrendingUp, Download, Zap, Database } from "lucide-react";

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
  { phase: "PHASE 1", count: 450, color: "#1E293B" },
  { phase: "PHASE 2", count: 320, color: "#334155" },
  { phase: "PHASE 3", count: 180, color: "#F97316" },
  { phase: "PHASE 4", count: 90, color: "#EF4444" },
];

export default function DroughtDashboard() {
  const [data, setData] = useState<unknown[]>([]);

  useEffect(() => {
    async function fetchIntelligence() {
      try {
        const response = await fetch('/api/intelligence');
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        }
      } catch {
        console.error("Failed to synchronize with intelligence stream.");
      }
    }
    fetchIntelligence();
  }, []);

  // Fallback to satelliteData if API is not yet populated or errors
  const chartData = data.length > 0 ? data : satelliteData;

  return (
    <div className="space-y-8">
      {/* Realtime Alert Bar (Intelligence Grade) */}
      <div className="xi-card bg-risk-critical/5 p-6 flex items-center justify-between border-risk-critical/20 border-l-4 border-l-risk-critical">
        <div className="flex items-center gap-6">
          <div className="w-10 h-10 border border-risk-critical/30 flex items-center justify-center text-risk-critical">
             <AlertTriangle className="animate-pulse" size={20} />
          </div>
          <div className="flex flex-col">
             <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-risk-critical">Priority Alert // Climate Anomaly</span>
             <span className="text-sm font-display font-bold text-white uppercase tracking-tight">
               Severe Rainfall Deficit Verified: Regional Persistence Anomaly Detected (Q2 2026)
             </span>
          </div>
        </div>
        <button className="text-[10px] font-mono font-bold text-white border border-white/20 px-6 py-2.5 uppercase tracking-widest hover:bg-white hover:text-navy-950 transition-all">
          Protocol Analysis
        </button>
      </div>

      <div className="grid-12">
        {/* Rainfall Anomaly Chart (Dark Analytical) */}
        <div className="col-span-12 lg:col-span-7 xi-card p-10 bg-surface">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border border-primary/20 flex items-center justify-center text-primary">
                 <CloudRain size={20} />
              </div>
              <div className="flex flex-col">
                 <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest">Hydrological Persistence</span>
                 <h3 className="font-display font-bold text-xl text-white uppercase tracking-tight">CHIRPS Rainfall Anomaly</h3>
              </div>
            </div>
            <div className="flex gap-2">
               <button className="p-2 border border-border-subtle text-text-dim hover:text-primary hover:border-primary transition-all"><Download size={16} /></button>
               <button className="p-2 border border-border-subtle text-text-dim hover:text-primary hover:border-primary transition-all"><Database size={16} /></button>
            </div>
          </div>
          
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorAnomaly" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#22D3EE" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E293B" />
                <XAxis 
                  dataKey="month" 
                  stroke="#334155" 
                  fontSize={10} 
                  fontFamily="var(--font-mono)"
                  fontWeight="bold" 
                  tickLine={false} 
                  axisLine={false} 
                  dy={15}
                />
                <YAxis 
                  stroke="#334155" 
                  fontSize={10} 
                  fontFamily="var(--font-mono)"
                  fontWeight="bold" 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0F172A", color: "#F1F5F9", borderRadius: "0px", border: "1px solid #334155", fontSize: "11px", fontFamily: "var(--font-mono)" }}
                  itemStyle={{ color: "#22D3EE", fontWeight: "bold" }}
                  cursor={{ stroke: '#22D3EE', strokeWidth: 1 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="anomaly" 
                  stroke="#22D3EE" 
                  strokeWidth={2} 
                  fillOpacity={1} 
                  fill="url(#colorAnomaly)"
                  dot={{ fill: "#22D3EE", r: 4, strokeWidth: 0 }} 
                  activeDot={{ r: 6, stroke: "#FFF", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 flex justify-between items-center text-[10px] font-mono font-bold text-text-dim uppercase tracking-[0.2em]">
            <span>System: UCSB CHIRPS v2.0 Matrix</span>
            <span className="text-primary/50 italic">*Simulated Persistence Vectors</span>
          </div>
        </div>

        {/* IPC Classification Breakdown (Engineered Bar) */}
        <div className="col-span-12 lg:col-span-5 xi-card p-10 bg-surface">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                 <TrendingUp size={20} />
              </div>
              <div className="flex flex-col">
                 <span className="text-[10px] font-mono font-bold text-blue-500 uppercase tracking-widest">Food Security Core</span>
                 <h3 className="font-display font-bold text-xl text-white uppercase tracking-tight">IPC Class Index (k)</h3>
              </div>
            </div>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ipcStats} layout="vertical">
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="phase" 
                  type="category" 
                  stroke="#64748B" 
                  fontSize={10} 
                  fontFamily="var(--font-mono)"
                  fontWeight="bold" 
                  width={80} 
                  axisLine={false} 
                  tickLine={false} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0F172A", border: "1px solid #334155", borderRadius: "0px" }}
                  cursor={{ fill: "rgba(255,255,255,0.03)" }} 
                />
                <Bar dataKey="count" radius={[0, 0, 0, 0]} barSize={24}>
                  {ipcStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 border-t border-border-subtle pt-8 grid grid-cols-2 gap-4">
             <div>
                <div className="text-[9px] font-mono font-bold text-text-dim uppercase mb-1">Target Cluster</div>
                <div className="text-sm font-display font-bold text-white uppercase tracking-tight">Pastoral Zone-4</div>
             </div>
             <div>
                <div className="text-[9px] font-mono font-bold text-text-dim uppercase mb-1">Vulnerability</div>
                <div className="text-sm font-display font-bold text-risk-high uppercase tracking-tight">+18.4% Delta</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

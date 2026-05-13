"use client";

import { useEffect, useState } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  Cell, PieChart, Pie, LineChart, Line, CartesianGrid 
} from "recharts";
import { AlertTriangle, TrendingDown, Users, Globe, Info } from "lucide-react";

const PHASE_COLORS: Record<number, string> = {
  1: "#10B981", // Stable
  2: "#F59E0B", // Stressed
  3: "#EF4444", // Crisis
  4: "#B91C1C", // Emergency
  5: "#7F1D1D", // Famine
};

export default function IPCDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchIPCData() {
      try {
        const response = await fetch('/api/intelligence/ipc');
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("❌ Failed to fetch IPC data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchIPCData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Synthesizing IPC Dataset...</span>
      </div>
    );
  }

  if (!data || data.error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-surface/50 border border-border">
        <AlertTriangle size={24} className="text-risk-high mb-2" />
        <span className="text-xs font-bold text-text-main uppercase tracking-widest">IPC API UNREACHABLE</span>
        <span className="text-[10px] text-text-muted mt-1 uppercase">Check environment variables</span>
      </div>
    );
  }

  const distributionData = Object.entries(data.distribution).map(([phase, count]) => ({
    name: `Phase ${phase}`,
    value: count,
    phase: parseInt(phase)
  }));

  return (
    <div className="space-y-8">
      {/* 1. TOP METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="xi-card p-6 bg-background border-border flex items-center justify-between">
          <div>
             <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Avg. Risk Index</div>
             <div className="text-2xl font-bold text-text-main">{data.summary.average_risk.toFixed(1)}<span className="text-xs opacity-50 ml-1">/100</span></div>
          </div>
          <TrendingDown className="text-risk-high" size={20} />
        </div>
        <div className="xi-card p-6 bg-background border-border flex items-center justify-between">
          <div>
             <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Active Regions</div>
             <div className="text-2xl font-bold text-text-main">{data.summary.total_regions}</div>
          </div>
          <Globe className="text-primary" size={20} />
        </div>
        <div className="xi-card p-6 bg-background border-border flex items-center justify-between">
          <div>
             <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Affected Pop.</div>
             <div className="text-2xl font-bold text-text-main">{(data.regions.reduce((a: any, b: any) => a + (b.population || 0), 0) / 1000000).toFixed(1)}M</div>
          </div>
          <Users className="text-risk-high" size={20} />
        </div>
      </div>

      {/* 2. MAIN CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Phase Distribution */}
        <div className="xi-card p-8 bg-background border-border">
          <div className="flex items-center justify-between mb-8">
             <div className="xi-eyebrow mb-0">Phase Distribution</div>
             <Info size={14} className="text-text-muted" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PHASE_COLORS[entry.phase] || "#334155"} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: "#111827", border: "1px solid #1E293B", color: "#F8FAFC" }}
                  itemStyle={{ fontSize: "10px", fontWeight: "bold", textTransform: "uppercase" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
             {distributionData.map((d) => (
               <div key={d.name} className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full" style={{ backgroundColor: PHASE_COLORS[d.phase] }} />
                 <span className="text-[9px] font-bold text-text-secondary uppercase">{d.name}</span>
               </div>
             ))}
          </div>
        </div>

        {/* Regional Comparison */}
        <div className="xi-card p-8 bg-background border-border">
          <div className="flex items-center justify-between mb-8">
             <div className="xi-eyebrow mb-0">Regional Risk Comparison</div>
             <span className="text-[9px] font-bold text-text-muted uppercase">IPC Score</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.regions} layout="vertical" margin={{ left: 20 }}>
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#94A3B8', fontWeight: 'bold' }}
                />
                <Tooltip 
                  cursor={{ fill: "transparent" }}
                  contentStyle={{ backgroundColor: "#111827", border: "1px solid #1E293B", color: "#F8FAFC" }}
                  itemStyle={{ fontSize: "10px", fontWeight: "bold", textTransform: "uppercase" }}
                />
                <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                  {data.regions.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.score > 70 ? "#EF4444" : "#2563EB"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 3. TRENDS / HISTORICAL EVOLUTION */}
      <div className="xi-card p-8 bg-background border-border">
        <div className="flex items-center justify-between mb-8">
           <div className="xi-eyebrow mb-0">Phase Evolution Trend</div>
           <span className="text-[10px] font-bold text-risk-high uppercase tracking-widest flex items-center gap-2">
             <AlertTriangle size={12} /> Deterioration Warning
           </span>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.trends}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E293B" />
              <XAxis 
                dataKey="observed_at" 
                tick={{ fontSize: 9, fill: '#94A3B8' }} 
                tickFormatter={(v) => new Date(v).toLocaleDateString()}
                axisLine={false}
              />
              <YAxis domain={[0, 5]} tick={{ fontSize: 9, fill: '#94A3B8' }} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#111827", border: "1px solid #1E293B", color: "#F8FAFC" }}
                itemStyle={{ fontSize: "10px", fontWeight: "bold", textTransform: "uppercase" }}
              />
              <Line type="monotone" dataKey="value" stroke="#2563EB" strokeWidth={3} dot={{ r: 4, fill: "#2563EB" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. ATTRIBUTION & TIMESTAMP (Step 7) */}
      <div className="flex justify-between items-center pt-8 border-t border-border opacity-50">
         <span className="text-[9px] font-medium text-text-muted uppercase tracking-[0.2em]">
           Source: Integrated Food Security Phase Classification (IPC-CH)
         </span>
         <span className="text-[9px] font-medium text-text-muted uppercase tracking-[0.2em]">
           Last Sync: {data.summary.last_update ? new Date(data.summary.last_update).toLocaleString() : 'N/A'}
         </span>
      </div>
    </div>
  );
}

"use client";

import { 
  CloudRain, ThermometerSun, AlertTriangle, 
  ArrowLeft, Calendar, Download, Info 
} from "lucide-react";
import Link from "next/link";
import { 
  XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';

const MOCK_HISTORICAL_DATA = [
  { month: 'Oct 25', anomaly: -5 },
  { month: 'Nov 25', anomaly: -12 },
  { month: 'Dec 25', anomaly: -20 },
  { month: 'Jan 26', anomaly: -35 },
  { month: 'Feb 26', anomaly: -42 },
  { month: 'Mar 26', anomaly: -18 },
  { month: 'Apr 26', anomaly: -14 },
];

export default function ClimateIntelligence() {
  return (
    <div className="min-h-screen bg-ivory-50 pb-20">
      
      {/* 1. INSTITUTIONAL HEADER */}
      <header className="bg-white border-b border-ivory-200 py-10">
        <div className="max-w-content">
          <Link href="/intelligence" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors mb-6">
            <ArrowLeft size={14} /> Back to Intelligence Hub
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <div className="xi-eyebrow mb-2">Climate Subsystem — CHIRPS v2.0</div>
              <h1 className="text-4xl font-serif font-black italic text-slate-900">Climate Resilience & Drought Monitoring</h1>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-2.5 bg-ivory-200 border border-ivory-500 rounded text-[9px] font-black uppercase tracking-widest hover:bg-ivory-500 transition-all flex items-center gap-2">
                <Download size={14} /> Export Dataset
              </button>
              <div className="px-4 py-2.5 bg-slate-900 text-white rounded text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                <Calendar size={14} /> LAST UPDATE: 07 MAY 2026
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-content py-16 space-y-12">
        
        {/* 2. STRATEGIC METRICS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Rainfall Anomaly', value: '-14%', sub: '30d Percentile', icon: CloudRain, color: 'text-brand-amber' },
            { label: 'Drought Intensity', value: 'Moderate', sub: 'Persistence Score', icon: AlertTriangle, color: 'text-brand-amber' },
            { label: 'Dry Day Persistence', value: '18 Days', sub: 'Consecutive', icon: ThermometerSun, color: 'text-brand-burnt' },
            { label: 'Seasonal Outlook', value: 'Below Avg', sub: '90D Projection', icon: Info, color: 'text-slate-400' }
          ].map((m, i) => (
            <div key={i} className="xi-card p-6 border-l-2 border-l-ivory-500">
              <div className="flex justify-between items-start mb-4">
                <div className="text-[9px] font-black uppercase text-slate-400 tracking-widest">{m.label}</div>
                <m.icon size={16} className={m.color} />
              </div>
              <div className="text-2xl font-serif font-black text-slate-900 italic">{m.value}</div>
              <div className="text-[9px] font-bold text-slate-400 uppercase italic mt-1">{m.sub}</div>
            </div>
          ))}
        </div>

        {/* 3. TEMPORAL ANOMALY TRACKER */}
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8">
            <div className="xi-card p-10 h-full">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h3 className="text-lg font-serif font-black italic text-slate-900">Historical Anomaly Persistence</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase italic">Monthly deviation from 30-year CHIRPS baseline</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-brand-amber" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Anomaly %</span>
                  </div>
                </div>
              </div>
              
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={MOCK_HISTORICAL_DATA}>
                    <defs>
                      <linearGradient id="colorAnomaly" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#D19F2B" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#D19F2B" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0EFEA" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '4px', padding: '12px' }}
                      itemStyle={{ color: '#fff', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase' }}
                      labelStyle={{ color: '#94a3b8', fontSize: '8px', marginBottom: '4px', fontWeight: 900 }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="anomaly" 
                      stroke="#D19F2B" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorAnomaly)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <div className="xi-card p-10 bg-slate-900 text-white h-full border-none">
              <div className="xi-eyebrow text-slate-400 mb-6">Analytical Insight</div>
              <h4 className="text-2xl font-serif font-black italic mb-6">Regional Deterioration Patterns</h4>
              <p className="text-slate-400 text-sm leading-relaxed italic mb-8">
                Current observations suggest that the **Maroodi Jeex** and **Togdheer** administrative units are experiencing 
                consecutive months of below-average precipitation.
              </p>
              <div className="space-y-6">
                {[
                  { label: 'Anomaly Persistence', value: 'High', color: 'text-brand-amber' },
                  { label: 'Forecast Confidence', value: '82%', color: 'text-white' },
                  { label: 'Ingestion Status', value: 'Nominal', color: 'text-emerald-400' }
                ].map((s, i) => (
                  <div key={i} className="flex justify-between items-center py-4 border-t border-white/10">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{s.label}</span>
                    <span className={`text-xs font-black italic ${s.color}`}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

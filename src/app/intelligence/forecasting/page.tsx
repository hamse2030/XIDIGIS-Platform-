"use client";

import { 
  Zap, TrendingUp, AlertTriangle, 
  ArrowLeft, Calendar, Download, 
  Target, BarChart, Percent, ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Radar, RadarChart, 
  PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

const FORECAST_PROJECTION = [
  { month: 'May', current: 68, projected: 68 },
  { month: 'Jun', projected: 72 },
  { month: 'Jul', projected: 78 },
  { month: 'Aug', projected: 82 },
];

const RISK_DRIVERS = [
  { subject: 'Rainfall Persistence', A: 120, fullMark: 150 },
  { subject: 'Market Stress', A: 98, fullMark: 150 },
  { subject: 'Conflict Density', A: 86, fullMark: 150 },
  { subject: 'IPC Deterioration', A: 99, fullMark: 150 },
  { subject: 'Temporal Decay', A: 85, fullMark: 150 },
];

export default function ForecastingDashboard() {
  return (
    <div className="min-h-screen bg-ivory-50 pb-20">
      
      <header className="bg-white border-b border-ivory-200 py-10">
        <div className="max-w-content">
          <Link href="/intelligence" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors mb-6">
            <ArrowLeft size={14} /> Back to Intelligence Hub
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <div className="xi-eyebrow mb-2">Strategic Foresight — Anticipatory Intelligence</div>
              <h1 className="text-4xl font-serif font-black italic text-slate-900">Regional Risk Projection Dashboard</h1>
            </div>
            <div className="flex gap-4">
              <div className="px-4 py-2.5 bg-slate-900 text-white rounded text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                <Target size={14} /> CONFIDENCE: MODERATE (0.75)
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-content py-16 space-y-12">
        
        {/* 1. RISK TRAJECTORY AREA CHART */}
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8">
            <div className="xi-card p-10 h-full">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h3 className="text-xl font-serif font-black italic text-slate-900">90-Day Escalation Projection</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase italic">Composite risk forecast based on multi-indicator persistence</p>
                </div>
              </div>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={FORECAST_PROJECTION}>
                    <defs>
                      <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#D9534F" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#D9534F" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0EFEA" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} />
                    <Tooltip contentStyle={{ borderRadius: '4px', border: 'none', backgroundColor: '#1e293b' }} itemStyle={{ fontSize: '10px', color: '#fff' }} />
                    <Area type="monotone" dataKey="projected" stroke="#D9534F" strokeWidth={4} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorProjected)" />
                    <Area type="monotone" dataKey="current" stroke="#0f172a" strokeWidth={4} fill="transparent" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <div className="xi-card p-10 bg-white shadow-elevated h-full">
              <h3 className="text-lg font-serif font-black italic text-slate-900 mb-8 text-center">Primary Risk Drivers</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={RISK_DRIVERS}>
                    <PolarGrid stroke="#F0EFEA" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 8, fontWeight: 900, fill: '#64748b' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} hide />
                    <Radar
                      name="Intensity"
                      dataKey="A"
                      stroke="#B3472A"
                      fill="#B3472A"
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-8 space-y-4">
                <div className="p-4 bg-ivory-50 border border-ivory-200 rounded">
                  <div className="text-[9px] font-black text-slate-400 uppercase mb-1">Stability Decay Rate</div>
                  <div className="text-xl font-serif font-black text-brand-burnt">+14% / Month</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. HOTSPOT DETECTION LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { region: 'Sool', prob: '82%', confidence: 'High', trend: 'Accelerating' },
            { region: 'Sanaag', prob: '75%', confidence: 'Moderate', trend: 'Worsening' },
            { region: 'Togdheer', prob: '68%', confidence: 'High', trend: 'Stable-High' }
          ].map((h, i) => (
            <div key={i} className="xi-card p-8 border-t-4 border-t-brand-burnt">
              <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">Hotspot Detected</div>
              <h4 className="text-2xl font-serif font-black italic text-slate-900 mb-4">{h.region} Region</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs font-bold italic">
                  <span className="text-slate-500">Escalation Probability</span>
                  <span className="text-brand-burnt">{h.prob}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold italic">
                  <span className="text-slate-500">Forecast Confidence</span>
                  <span className="text-slate-900">{h.confidence}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold italic">
                  <span className="text-slate-500">Trend Trajectory</span>
                  <span className="text-brand-amber">{h.trend}</span>
                </div>
              </div>
              <Link 
                href={`/intelligence/region/${h.region.toLowerCase()}`}
                className="mt-8 w-full py-3 bg-slate-900 text-white rounded text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-700 transition-all"
              >
                Enter Monitoring <ArrowUpRight size={14} />
              </Link>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}

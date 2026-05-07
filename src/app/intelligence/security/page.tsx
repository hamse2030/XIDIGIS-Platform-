"use client";

import { 
  ShieldAlert, Activity, AlertTriangle, 
  ArrowLeft, Calendar, Download, Map as MapIcon,
  Flame, UserMinus, ShieldCheck, Zap
} from "lucide-react";
import Link from "next/link";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis
} from 'recharts';

const INCIDENT_TREND = [
  { day: '01 May', count: 2, fatalities: 0 },
  { day: '02 May', count: 5, fatalities: 1 },
  { day: '03 May', count: 8, fatalities: 4 },
  { day: '04 May', count: 12, fatalities: 2 },
  { day: '05 May', count: 7, fatalities: 0 },
  { day: '06 May', count: 15, fatalities: 6 },
  { day: '07 May', count: 9, fatalities: 2 },
];

const HOTSPOT_CLUSTERS = [
  { x: 10, y: 30, size: 400, name: 'Cluster Alpha' },
  { x: 50, y: 80, size: 200, name: 'Cluster Beta' },
  { x: 80, y: 40, size: 600, name: 'Cluster Gamma' },
  { x: 30, y: 10, size: 100, name: 'Cluster Delta' },
];

export default function SecurityStabilityMonitor() {
  return (
    <div className="min-h-screen bg-ivory-50 pb-20">
      
      <header className="bg-slate-900 text-white py-10">
        <div className="max-w-content">
          <Link href="/intelligence" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors mb-6">
            <ArrowLeft size={14} /> Back to Intelligence Hub
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <div className="xi-eyebrow text-slate-500 mb-2">Regional Stability Subsystem — ACLED</div>
              <h1 className="text-4xl font-serif font-black italic">Security & Stability Monitor</h1>
            </div>
            <div className="flex gap-4">
              <div className="px-4 py-2.5 bg-brand-burnt text-white rounded text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                <Flame size={14} /> ALERt: ESCALATING INSTABILITY
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-content py-16 space-y-12">
        
        {/* 1. INCIDENT TIMELINE */}
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8">
            <div className="xi-card p-10 h-full">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h3 className="text-xl font-serif font-black italic text-slate-900">Incident Density (7d Rolling)</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase italic">Daily conflict events and fatality tracking</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-900" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Events</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-brand-burnt" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Fatalities</span>
                  </div>
                </div>
              </div>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={INCIDENT_TREND}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0EFEA" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} />
                    <Tooltip contentStyle={{ borderRadius: '4px', border: 'none', backgroundColor: '#1e293b' }} itemStyle={{ fontSize: '10px', color: '#fff' }} />
                    <Line type="monotone" dataKey="count" stroke="#0f172a" strokeWidth={3} dot={{ r: 4, fill: '#0f172a' }} />
                    <Line type="monotone" dataKey="fatalities" stroke="#B3472A" strokeWidth={3} dot={{ r: 4, fill: '#B3472A' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <div className="space-y-6 h-full">
              {[
                { label: 'Conflict Index', value: 'High', sub: '9.2 / 10', icon: ShieldAlert, color: 'text-brand-burnt' },
                { label: 'Fatalities (7d)', value: '16', sub: 'Escalating', icon: UserMinus, color: 'text-brand-burnt' },
                { label: 'State Capacity', value: 'Moderate', sub: 'Maintaining Control', icon: ShieldCheck, color: 'text-brand-teal' }
              ].map((s, i) => (
                <div key={i} className="xi-card p-8 bg-white border-l-2 border-l-ivory-500">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-[9px] font-black uppercase text-slate-400 tracking-widest">{s.label}</div>
                    <s.icon size={18} className={s.color} />
                  </div>
                  <div className="text-3xl font-serif font-black text-slate-900 italic">{s.value}</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase italic mt-1">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. GEOSPATIAL HEATMAP PLACEHOLDER */}
        <div className="xi-card p-12 bg-white relative overflow-hidden">
          <div className="grid grid-cols-12 gap-16 items-center">
            <div className="col-span-12 lg:col-span-4">
              <div className="xi-eyebrow text-slate-400 mb-4">Spatial Clusters</div>
              <h2 className="text-4xl font-serif font-black italic text-slate-900 mb-6">Conflict Hotspot Detection</h2>
              <p className="text-slate-500 text-sm leading-relaxed italic mb-10">
                Automated clustering of incident coordinates identifies **three high-pressure zones** along regional borders 
                where instability risk has increased by 14% this week.
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-ivory-50 border border-ivory-200 rounded flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase text-slate-600">Active Hotspots</span>
                  <span className="text-sm font-black text-brand-burnt">03 Detected</span>
                </div>
                <button className="w-full py-4 bg-slate-900 text-white rounded text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3">
                  Analyze Hotspots <Zap size={14} />
                </button>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-8 bg-ivory-50 rounded h-[400px] flex items-center justify-center border border-ivory-200 relative overflow-hidden">
              {/* Simulated Heatmap visualization using Bubble Chart */}
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis type="number" dataKey="x" name="Longitude" hide />
                  <YAxis type="number" dataKey="y" name="Latitude" hide />
                  <ZAxis type="number" dataKey="size" range={[100, 2000]} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="Hotspots" data={HOTSPOT_CLUSTERS} fill="#B3472A" fillOpacity={0.6} />
                </ScatterChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] opacity-10 pointer-events-none" />
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

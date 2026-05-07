"use client";

import { 
  TrendingDown, AlertCircle, 
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Cell, PieChart, Pie
} from 'recharts';

const IPC_DISTRIBUTION = [
  { phase: 'Phase 1', count: 45, color: '#0F9D88' },
  { phase: 'Phase 2', count: 30, color: '#9AA03A' },
  { phase: 'Phase 3', count: 18, color: '#D19F2B' },
  { phase: 'Phase 4', count: 5, color: '#D9534F' },
  { phase: 'Phase 5', count: 2, color: '#B3472A' },
];

const MARKET_TRENDS = [
  { month: 'Jan', price: 120, baseline: 100 },
  { month: 'Feb', price: 135, baseline: 100 },
  { month: 'Mar', price: 158, baseline: 100 },
  { month: 'Apr', price: 142, baseline: 100 },
  { month: 'May', price: 165, baseline: 100 },
];

export default function FoodSecurityIntelligence() {
  return (
    <div className="min-h-screen bg-ivory-50 pb-20">
      
      <header className="bg-white border-b border-ivory-200 py-10">
        <div className="max-w-content">
          <Link href="/intelligence" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors mb-6">
            <ArrowLeft size={14} /> Back to Intelligence Hub
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <div className="xi-eyebrow mb-2">Humanitarian Subsystem — IPC / FEWS NET</div>
              <h1 className="text-4xl font-serif font-black italic text-slate-900">Food Security & Livelihood Analytics</h1>
            </div>
            <div className="flex gap-4">
              <div className="px-4 py-2.5 bg-brand-deep-orange text-white rounded text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                <AlertCircle size={14} /> STATUS: CRITICAL PRESSURE
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-content py-16 space-y-12">
        
        {/* 1. IPC SNAPSHOT */}
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-7">
            <div className="xi-card p-10 h-full">
              <div className="mb-10">
                <h3 className="text-xl font-serif font-black italic text-slate-900">Regional IPC Phase Distribution</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase italic">Aggregation of administrative units by highest IPC Phase</p>
              </div>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={IPC_DISTRIBUTION}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0EFEA" />
                    <XAxis dataKey="phase" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} />
                    <Tooltip cursor={{ fill: '#F8F7F2' }} contentStyle={{ borderRadius: '4px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                      {IPC_DISTRIBUTION.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <div className="xi-card p-10 bg-white h-full flex flex-col">
              <h3 className="text-xl font-serif font-black italic text-slate-900 mb-8 text-center">Population at Risk</h3>
              <div className="flex-1 flex items-center justify-center relative">
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-5xl font-serif font-black text-slate-900">1.2M</span>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Total Impact</span>
                </div>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={IPC_DISTRIBUTION}
                        innerRadius={80}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="count"
                      >
                        {IPC_DISTRIBUTION.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="p-4 bg-ivory-50 rounded border border-ivory-200">
                  <div className="text-[9px] font-black text-slate-400 uppercase mb-1">Phase 3+ (Crisis)</div>
                  <div className="text-xl font-serif font-black text-brand-amber">480,000</div>
                </div>
                <div className="p-4 bg-ivory-50 rounded border border-ivory-200">
                  <div className="text-[9px] font-black text-slate-400 uppercase mb-1">Livelihood Loss</div>
                  <div className="text-xl font-serif font-black text-brand-burnt">High</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. MARKET ANALYTICS */}
        <div className="xi-card p-12 bg-slate-900 text-white">
          <div className="grid grid-cols-12 gap-16 items-center">
            <div className="col-span-12 lg:col-span-4">
              <div className="xi-eyebrow text-slate-400 mb-4">Economic Pressure</div>
              <h2 className="text-4xl font-serif font-black italic mb-6 leading-tight">Sorghum & Maize Price Volatility</h2>
              <p className="text-slate-400 text-sm leading-relaxed italic mb-10">
                Grain prices in major regional markets (Hargeisa, Burao) have increased by **42% above the 5-year average**, 
                severely constraining household purchasing power.
              </p>
              <button className="w-full py-4 bg-white text-slate-900 rounded text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3">
                Full Market Report <TrendingDown size={14} />
              </button>
            </div>
            <div className="col-span-12 lg:col-span-8 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MARKET_TRENDS}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#64748b' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#64748b' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '4px' }}
                    itemStyle={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase' }}
                  />
                  <Bar dataKey="price" fill="#D9534F" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="baseline" fill="rgba(255,255,255,0.1)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

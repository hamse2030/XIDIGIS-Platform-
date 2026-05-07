"use client";

import { useParams } from "next/navigation";
import { 
  ArrowLeft, Map as MapIcon, CloudRain, 
  Wheat, ShieldAlert, Activity, ArrowUpRight 
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function RegionalCommandCenter() {
  const params = useParams();
  const regionName = typeof params.id === 'string' 
    ? params.id.charAt(0).toUpperCase() + params.id.slice(1).replace('-', ' ')
    : "Select Region";

  return (
    <div className="min-h-screen bg-ivory-50 pb-20">
      
      {/* 1. REGIONAL HEADER */}
      <header className="bg-slate-900 text-white pt-16 pb-20">
        <div className="max-w-content">
          <Link href="/intelligence" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors mb-8">
            <ArrowLeft size={14} /> Global Intelligence View
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div>
              <div className="xi-eyebrow text-slate-400 mb-2">Regional Intelligence Profile</div>
              <h1 className="text-6xl font-serif font-black italic">{regionName}</h1>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Composite Risk Score</div>
              <div className="flex items-baseline gap-2">
                <span className="text-7xl font-serif font-black text-brand-amber">72</span>
                <span className="text-xl font-bold text-slate-500">/ 100</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-content -mt-10 space-y-8">
        
        {/* 2. CORE INDICATOR GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Climate Status */}
          <div className="xi-card p-10 bg-white shadow-elevated border-l-4 border-l-brand-amber">
            <div className="flex justify-between items-start mb-8">
              <div className="w-12 h-12 bg-ivory-100 rounded flex items-center justify-center text-brand-amber">
                <CloudRain size={24} />
              </div>
              <span className="text-[10px] font-black uppercase text-brand-amber tracking-widest">Elevated Risk</span>
            </div>
            <h3 className="text-xl font-serif font-black italic text-slate-900 mb-4">Climate Status</h3>
            <div className="space-y-4 text-xs font-bold text-slate-500 uppercase italic">
              <div className="flex justify-between"><span>Rainfall Anomaly</span><span className="text-slate-900">-42%</span></div>
              <div className="flex justify-between"><span>Dry Day Count</span><span className="text-slate-900">22 Days</span></div>
              <div className="flex justify-between"><span>Drought State</span><span className="text-brand-amber">S1 MODERATE</span></div>
            </div>
          </div>

          {/* Food Security Status */}
          <div className="xi-card p-10 bg-white shadow-elevated border-l-4 border-l-brand-deep-orange">
            <div className="flex justify-between items-start mb-8">
              <div className="w-12 h-12 bg-ivory-100 rounded flex items-center justify-center text-brand-deep-orange">
                <Wheat size={24} />
              </div>
              <span className="text-[10px] font-black uppercase text-brand-deep-orange tracking-widest">Severe Stress</span>
            </div>
            <h3 className="text-xl font-serif font-black italic text-slate-900 mb-4">Food Security</h3>
            <div className="space-y-4 text-xs font-bold text-slate-500 uppercase italic">
              <div className="flex justify-between"><span>IPC Phase</span><span className="text-slate-900">3 (Crisis)</span></div>
              <div className="flex justify-between"><span>Market Access</span><span className="text-slate-900">Constrained</span></div>
              <div className="flex justify-between"><span>Livelihood Decay</span><span className="text-brand-deep-orange">Accelerating</span></div>
            </div>
          </div>

          {/* Security & Stability Status */}
          <div className="xi-card p-10 bg-white shadow-elevated border-l-4 border-l-brand-teal">
            <div className="flex justify-between items-start mb-8">
              <div className="w-12 h-12 bg-ivory-100 rounded flex items-center justify-center text-brand-teal">
                <ShieldAlert size={24} />
              </div>
              <span className="text-[10px] font-black uppercase text-brand-teal tracking-widest">Nominal Status</span>
            </div>
            <h3 className="text-xl font-serif font-black italic text-slate-900 mb-4">Stability Monitor</h3>
            <div className="space-y-4 text-xs font-bold text-slate-500 uppercase italic">
              <div className="flex justify-between"><span>Incident Density</span><span className="text-slate-900">Low</span></div>
              <div className="flex justify-between"><span>Conflict Trend</span><span className="text-slate-900">Stable</span></div>
              <div className="flex justify-between"><span>Fatalities (7d)</span><span className="text-brand-teal">0</span></div>
            </div>
          </div>

        </div>

        {/* 3. REGIONAL RISK TRAJECTORY */}
        <div className="xi-card p-12 bg-white shadow-elevated">
          <div className="flex flex-col md:flex-row justify-between gap-12">
            <div className="max-w-md">
              <div className="xi-eyebrow mb-4">Predictive Trajectory</div>
              <h2 className="text-4xl font-serif font-black italic text-slate-900 mb-6">Regional Forecast Outlook</h2>
              <p className="text-slate-500 text-sm italic font-medium leading-relaxed mb-8">
                The persistence of rainfall anomalies suggests a **78% probability** of risk escalation to "Severe" status within the next 45 days. 
                Food security indicators are expected to deteriorate without immediate intervention.
              </p>
              <div className="flex gap-4">
                <button className="btn-primary px-8 py-3 text-[10px] font-black uppercase tracking-widest">Generate Briefing</button>
                <button className="px-8 py-3 bg-ivory-50 border border-ivory-200 rounded text-[10px] font-black uppercase tracking-widest">Share Profile</button>
              </div>
            </div>
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Forecast Period', value: '60 Days', sub: 'Horizon' },
                { label: 'Escalation Prob', value: '78%', sub: 'High Probability' },
                { label: 'Primary Driver', value: 'Climate', sub: 'Persistence Factor' },
                { label: 'Confidence', value: 'Moderate', sub: '0.72 Score' }
              ].map((f, i) => (
                <div key={i} className="p-6 bg-ivory-50 border border-ivory-200 rounded">
                  <div className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">{f.label}</div>
                  <div className="text-2xl font-serif font-black text-slate-900 italic">{f.value}</div>
                  <div className="text-[9px] font-bold text-slate-500 mt-1 uppercase italic">{f.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

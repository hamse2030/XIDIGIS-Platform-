"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Activity, Shield, Globe, TrendingUp, AlertTriangle, 
  Database, Zap, ArrowUpRight, BarChart3, Filter,
  Terminal, Share2, Download, Maximize2
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const DroughtMap = dynamic(() => import("@/components/intelligence/DroughtMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-surface-alt/50">
      <div className="text-[10px] font-mono font-bold text-text-dim uppercase tracking-[0.4em] animate-pulse">
        Initializing GIS Engine...
      </div>
    </div>
  ),
});

import DroughtDashboard from "@/components/intelligence/DroughtDashboard";
import AIBriefing from "@/components/intelligence/AIBriefing";

const INTELLIGENCE_NODES = [
  { id: 'climate', label: 'Climate Stress', icon: Globe, status: 'Critical', color: 'text-risk-critical' },
  { id: 'security', label: 'Security Density', icon: Shield, status: 'Stable', color: 'text-risk-stable' },
  { id: 'economy', label: 'Market Stability', icon: TrendingUp, status: 'Mod', color: 'text-risk-mod' },
  { id: 'forecast', label: 'Forecasting', icon: Activity, status: 'Active', color: 'text-primary' },
];

export default function IntelligenceHub() {
  const [activeNode, setActiveNode] = useState('climate');

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. STRATEGIC HEADER (Light Mode) */}
      <section className="pt-32 pb-16 border-b border-border bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none" />
        <div className="max-w-content relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
            <div>
              <div className="xi-eyebrow flex items-center gap-2">
                 <Terminal size={14} /> Regional Monitoring System
              </div>
              <h1 className="text-6xl font-display font-black text-navy-950 uppercase tracking-tight leading-none mb-4">
                Intelligence <span className="text-primary">Hub</span>.
              </h1>
              <p className="text-lg text-text-dim font-medium tracking-wide max-w-xl leading-relaxed">
                High-fidelity situational awareness through synthesized geospatial data and real-time regional risk indicators.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 border border-border bg-white text-[10px] font-mono font-bold text-navy-950 uppercase tracking-widest hover:border-primary transition-all flex items-center gap-3">
                 <Share2 size={14} /> Share Protocol
              </button>
              <button className="px-6 py-3 border border-border bg-white text-[10px] font-mono font-bold text-navy-950 uppercase tracking-widest hover:border-primary transition-all flex items-center gap-3">
                 <Download size={14} /> Export Dataset
              </button>
              <button className="btn-primary shadow-glow">
                 Initialize Full Scan <Zap size={14} className="ml-2" />
              </button>
            </div>
          </div>

          {/* Node Matrix Tabs */}
          <div className="flex gap-0 mt-16 border-t border-border overflow-x-auto">
            {INTELLIGENCE_NODES.map((node) => (
              <button
                key={node.id}
                onClick={() => setActiveNode(node.id)}
                className={`px-10 py-6 border-b-2 transition-all flex items-center gap-4 whitespace-nowrap ${
                  activeNode === node.id 
                    ? 'border-primary bg-primary/5 text-navy-950' 
                    : 'border-transparent text-text-dim hover:text-navy-950 hover:bg-surface-alt'
                }`}
              >
                <node.icon size={18} className={activeNode === node.id ? 'text-primary' : 'text-text-dim'} />
                <div className="text-left">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em]">{node.label}</div>
                  <div className={`text-[9px] font-mono font-bold uppercase tracking-[0.2em] opacity-60 ${node.color}`}>Status: {node.status}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. OPERATIONAL GRID (Light Mode) */}
      <section className="bg-surface-alt/30 flex-1 relative py-12">
        <div className="max-w-content">
          <div className="grid grid-cols-12 gap-8">
            
            {/* LEFT: GIS VISUALIZATION */}
            <div className="col-span-12 xl:col-span-8 space-y-8">
              <div className="xi-card bg-white border-border relative group overflow-hidden h-[600px]">
                {/* Visual Header */}
                <div className="absolute top-0 left-0 right-0 z-20 p-6 flex justify-between items-center bg-white/90 backdrop-blur-md border-b border-border">
                  <div className="flex items-center gap-4">
                     <div className="w-2 h-2 bg-risk-critical rounded-full animate-pulse shadow-[0_0_8px_rgba(225,29,72,0.6)]" />
                     <span className="text-[10px] font-mono font-bold text-navy-950 uppercase tracking-[0.3em]">GIS ENGINE: LIVE MONITORING</span>
                  </div>
                  <div className="flex gap-3">
                    <button className="p-2 border border-border text-text-dim hover:text-navy-950 transition-all"><Filter size={14} /></button>
                    <button className="p-2 border border-border text-text-dim hover:text-navy-950 transition-all"><Maximize2 size={14} /></button>
                  </div>
                </div>

                <div className="w-full h-full pt-16">
                   <DroughtMap />
                </div>

                {/* Map Legend */}
                <div className="absolute bottom-8 left-8 z-20 p-6 bg-white border border-border shadow-premium max-w-xs">
                  <h4 className="text-[10px] font-mono font-bold text-navy-950 uppercase tracking-[0.2em] mb-4">Risk Legend</h4>
                  <div className="space-y-3">
                    {[
                      { l: 'Severe Deficit', c: 'bg-risk-critical' },
                      { l: 'Moderate Stress', c: 'bg-risk-mod' },
                      { l: 'Stable Patterns', c: 'bg-risk-stable' }
                    ].map((l, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className={`w-3 h-3 ${l.c} rounded-sm`} />
                        <span className="text-[9px] font-mono font-bold text-text-dim uppercase tracking-widest">{l.l}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* SECONDARY METRICS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="xi-card p-10 bg-white border-border h-full">
                  <div className="flex justify-between items-center mb-10">
                    <div className="xi-eyebrow mb-0">Temporal Anomaly</div>
                    <Link href="#" className="text-primary hover:text-navy-950 transition-colors"><ArrowUpRight size={16} /></Link>
                  </div>
                  <DroughtDashboard />
                </div>

                <div className="xi-card p-10 bg-white border-border h-full">
                  <div className="flex justify-between items-center mb-10">
                    <div className="xi-eyebrow mb-0">System Log: Alerts</div>
                    <span className="text-[9px] font-mono font-bold text-risk-critical uppercase tracking-widest">3 New Critical</span>
                  </div>
                  <div className="space-y-6">
                    {[
                      { t: '14:20', m: 'Anomalous thermal spike detected in Guban Corridor.', s: 'Critical' },
                      { t: '11:05', m: 'Precipitation deficit exceeds 5-year baseline.', s: 'Severe' },
                      { t: '08:15', m: 'Satellite feed synchronization optimized.', s: 'System' },
                    ].map((log, i) => (
                      <div key={i} className="flex gap-4 border-b border-border pb-4 last:border-0 last:pb-0">
                        <span className="text-[9px] font-mono font-bold text-text-dim opacity-50">{log.t}</span>
                        <div>
                          <p className="text-[10px] font-bold text-navy-950 uppercase tracking-tight mb-1">{log.m}</p>
                          <span className={`text-[8px] font-mono font-bold uppercase tracking-widest ${log.s === 'Critical' ? 'text-risk-critical' : 'text-primary'}`}>{log.s}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: AI SYNTHESIS & REPORTING */}
            <div className="col-span-12 xl:col-span-4 space-y-8">
              <div className="xi-card p-10 bg-navy-950 text-white border-navy-950 sticky top-32">
                 <AIBriefing />
              </div>

              <div className="xi-card p-10 bg-white border-border">
                <h4 className="text-[10px] font-mono font-bold text-navy-950 uppercase tracking-[0.4em] mb-8 flex items-center gap-2">
                   <Database size={14} className="text-primary" /> Integrated Sources
                </h4>
                <div className="space-y-5">
                   {[
                     { name: 'CHIRPS Satellite Data', freq: 'Every 6h', status: 'Optimal' },
                     { name: 'Regional Market API', freq: 'Daily', status: 'Latent' },
                     { name: 'Ground Force Reports', freq: 'Manual', status: 'Verified' },
                   ].map((src, i) => (
                     <div key={i} className="flex justify-between items-center p-4 bg-surface-alt border border-border">
                       <div>
                         <div className="text-[10px] font-bold text-navy-950 uppercase tracking-tight mb-1">{src.name}</div>
                         <div className="text-[8px] font-mono font-bold text-text-dim uppercase tracking-widest">{src.freq} Updates</div>
                       </div>
                       <div className="text-[8px] font-mono font-bold text-primary uppercase tracking-widest">{src.status}</div>
                     </div>
                   ))}
                </div>
                <button className="btn-outline w-full mt-10">Manage Data Stream</button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. FOOTER CTA (Light Mode) */}
      <section className="py-24 border-t border-border bg-white">
        <div className="max-w-content text-center">
          <BarChart3 size={32} className="mx-auto text-primary mb-8" />
          <h2 className="text-3xl font-display font-black text-navy-950 uppercase tracking-tight mb-6">Need a custom intelligence protocol?</h2>
          <p className="text-text-dim font-medium max-w-xl mx-auto mb-10">Our analysts can synthesize custom situational reports tailored to your institutional requirements.</p>
          <button className="btn-primary">Contact Strategic Ops</button>
        </div>
      </section>
    </div>
  );
}

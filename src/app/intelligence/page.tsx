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
    <div className="w-full h-full flex items-center justify-center bg-surface-elevated">
      <div className="text-xs font-semibold text-text-muted uppercase tracking-[0.2em] animate-pulse">
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
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. STRATEGIC HEADER (Dark Institutional Mode) */}
      <section className="pt-32 pb-16 border-b border-border bg-surface relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.02] pointer-events-none" />
        <div className="max-w-content relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
            <div>
              <div className="xi-eyebrow flex items-center gap-2">
                 <Terminal size={14} /> Regional Monitoring System
              </div>
              <h1 className="text-5xl font-bold text-text-main uppercase tracking-tight leading-none mb-4">
                Intelligence <span className="text-primary">Hub</span>.
              </h1>
              <p className="text-base text-text-secondary font-normal tracking-wide max-w-xl leading-relaxed">
                High-fidelity situational awareness through synthesized geospatial data and real-time regional risk indicators.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 border border-border bg-surface text-xs font-semibold text-text-main uppercase tracking-widest hover:border-primary transition-all flex items-center gap-3">
                 <Share2 size={14} /> Share Protocol
              </button>
              <button className="px-6 py-3 border border-border bg-surface text-xs font-semibold text-text-main uppercase tracking-widest hover:border-primary transition-all flex items-center gap-3">
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
                className={`px-8 py-5 border-b-2 transition-all flex items-center gap-4 whitespace-nowrap ${
                  activeNode === node.id 
                    ? 'border-primary bg-primary/10 text-text-main' 
                    : 'border-transparent text-text-muted hover:text-text-main hover:bg-surface-elevated'
                }`}
              >
                <node.icon size={18} className={activeNode === node.id ? 'text-primary' : 'text-text-muted'} />
                <div className="text-left">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.15em]">{node.label}</div>
                  <div className={`text-[10px] font-medium uppercase tracking-widest mt-1 ${node.color}`}>Status: {node.status}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. OPERATIONAL GRID (Dark Institutional Mode) */}
      <section className="bg-background flex-1 relative py-12">
        <div className="max-w-content">
          <div className="grid grid-cols-12 gap-8">
            
            {/* LEFT: GIS VISUALIZATION */}
            <div className="col-span-12 xl:col-span-8 space-y-8">
              <div className="xi-card relative group overflow-hidden h-[600px] border-border bg-surface-elevated">
                {/* Visual Header */}
                <div className="absolute top-0 left-0 right-0 z-20 p-6 flex justify-between items-center bg-surface/90 backdrop-blur-md border-b border-border">
                  <div className="flex items-center gap-4">
                     <div className="w-2 h-2 bg-risk-critical rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                     <span className="text-xs font-semibold text-text-main uppercase tracking-[0.2em]">GIS ENGINE: LIVE MONITORING</span>
                  </div>
                  <div className="flex gap-3">
                    <button className="p-2 border border-border text-text-muted hover:text-text-main hover:bg-surface-elevated transition-all"><Filter size={14} /></button>
                    <button className="p-2 border border-border text-text-muted hover:text-text-main hover:bg-surface-elevated transition-all"><Maximize2 size={14} /></button>
                  </div>
                </div>

                <div className="w-full h-full pt-16">
                   <DroughtMap />
                </div>

                {/* Map Legend */}
                <div className="absolute bottom-8 left-8 z-20 p-6 bg-surface/95 border border-border shadow-lg max-w-xs backdrop-blur-md">
                  <h4 className="text-xs font-semibold text-text-main uppercase tracking-widest mb-4">Risk Legend</h4>
                  <div className="space-y-3">
                    {[
                      { l: 'Severe Deficit', c: 'bg-risk-critical' },
                      { l: 'Moderate Stress', c: 'bg-risk-mod' },
                      { l: 'Stable Patterns', c: 'bg-risk-stable' }
                    ].map((l, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className={`w-3 h-3 ${l.c} rounded-sm`} />
                        <span className="text-[11px] font-medium text-text-secondary uppercase tracking-widest">{l.l}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* SECONDARY METRICS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="xi-card p-8 h-full">
                  <div className="flex justify-between items-center mb-8">
                    <div className="xi-eyebrow mb-0">Temporal Anomaly</div>
                    <Link href="#" className="text-primary hover:text-primary-hover transition-colors"><ArrowUpRight size={16} /></Link>
                  </div>
                  <DroughtDashboard />
                </div>

                <div className="xi-card p-8 h-full">
                  <div className="flex justify-between items-center mb-8">
                    <div className="xi-eyebrow mb-0">System Log: Alerts</div>
                    <span className="text-[10px] font-semibold text-risk-critical uppercase tracking-widest">3 New Critical</span>
                  </div>
                  <div className="space-y-5">
                    {[
                      { t: '14:20', m: 'Anomalous thermal spike detected in Guban Corridor.', s: 'Critical' },
                      { t: '11:05', m: 'Precipitation deficit exceeds 5-year baseline.', s: 'Severe' },
                      { t: '08:15', m: 'Satellite feed synchronization optimized.', s: 'System' },
                    ].map((log, i) => (
                      <div key={i} className="flex gap-4 border-b border-border pb-4 last:border-0 last:pb-0">
                        <span className="text-[10px] font-medium text-text-muted opacity-70 mt-0.5">{log.t}</span>
                        <div>
                          <p className="text-xs font-medium text-text-main leading-snug mb-1">{log.m}</p>
                          <span className={`text-[10px] font-semibold uppercase tracking-widest ${log.s === 'Critical' ? 'text-risk-critical' : 'text-primary'}`}>{log.s}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: AI SYNTHESIS & REPORTING */}
            <div className="col-span-12 xl:col-span-4 space-y-8">
              <div className="xi-card p-8 bg-surface-elevated border-border sticky top-32">
                 <AIBriefing />
              </div>

              <div className="xi-card p-8">
                <h4 className="text-xs font-semibold text-text-main uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-border pb-4">
                   <Database size={14} className="text-primary" /> Integrated Sources
                </h4>
                <div className="space-y-4">
                   {[
                     { name: 'CHIRPS Satellite Data', freq: 'Every 6h', status: 'Optimal' },
                     { name: 'Regional Market API', freq: 'Daily', status: 'Latent' },
                     { name: 'Ground Force Reports', freq: 'Manual', status: 'Verified' },
                   ].map((src, i) => (
                     <div key={i} className="flex justify-between items-center p-4 bg-background border border-border">
                       <div>
                         <div className="text-xs font-semibold text-text-main mb-1">{src.name}</div>
                         <div className="text-[10px] font-medium text-text-muted uppercase tracking-widest">{src.freq} Updates</div>
                       </div>
                       <div className="text-[10px] font-semibold text-primary uppercase tracking-widest">{src.status}</div>
                     </div>
                   ))}
                </div>
                <button className="btn-outline w-full mt-8">Manage Data Stream</button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

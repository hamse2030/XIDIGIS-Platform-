"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Link from "next/link";
import { 
  ShieldAlert, Activity, Globe, Database,
  ArrowUpRight, ThermometerSun, Wheat, Info,
  Terminal, Zap, Target, Search, Maximize2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface RegionProperties {
  id?: string;
  name: string;
  score?: number;
  level?: string;
}

const DroughtMap = dynamic(() => import("@/components/intelligence/DroughtMap"), { 
  ssr: false,
  loading: () => <div className="h-[600px] bg-surface border border-border-subtle animate-pulse flex items-center justify-center text-primary font-mono text-[10px] uppercase tracking-widest">Hydrating Geospatial Core...</div>
});

const SomalilandMap = dynamic(() => import("@/components/intelligence/SomalilandMap"), { 
  ssr: false,
  loading: () => <div className="h-[600px] bg-surface border border-border-subtle animate-pulse flex items-center justify-center text-primary font-mono text-[10px] uppercase tracking-widest">Mapping Regional Focus...</div>
});

import DroughtDashboard from "@/components/intelligence/DroughtDashboard";
import AIBriefing from "@/components/intelligence/AIBriefing";

interface Briefing {
  date: string;
  headline: string;
  summary: string;
  keyFindings: string[];
  recommendations: string[];
  criticalHotspots: string[];
}

export default function IntelligenceSuite() {
  const [selectedRegion, setSelectedRegion] = useState<RegionProperties | null>(null);
  const [briefing] = useState<Briefing>({
    date: new Date().toISOString().split('T')[0],
    headline: 'Regional Risk Persistence in Eastern Corridors',
    summary: 'Integration of real-time data streams indicates a composite risk score of 72. Persistence of drought anomalies remains the primary driver of regional vulnerability across monitoring zones.',
    keyFindings: [
      'Precipitation anomalies of -42% verified in eastern administrative units.',
      'IPC Phase 3 (Crisis) classifications validated across primary pastoral zones.',
      'Anticipatory models suggest 72% probability of continued stress through Q3.'
    ],
    recommendations: [
      'Activate humanitarian resource prepositioning in detected high-stress corridors.',
      'Initialize high-frequency market monitoring for localized grain price spikes.',
      'Deploy field validation teams to verify remote sensing climate anomalies.'
    ],
    criticalHotspots: ['Sool', 'Sanaag', 'Togdheer']
  });

  const getSeverityColor = (score: number) => {
    if (score >= 75) return 'text-risk-critical border-risk-critical';
    if (score >= 55) return 'text-risk-high border-risk-high';
    if (score >= 35) return 'text-risk-mod border-risk-mod';
    if (score >= 15) return 'text-risk-low border-risk-low';
    return 'text-risk-stable border-risk-stable';
  };

  return (
    <div className="min-h-screen pb-40">
      
      {/* 1. STRATEGIC OVERVIEW (Intelligence Grade) */}
      <section className="relative pt-24 pb-20 border-b border-border-subtle">
        <div className="absolute inset-0 bg-grid opacity-[0.02] pointer-events-none" />
        
        <div className="max-w-content relative z-10">
          <div className="xi-eyebrow mb-6 flex items-center gap-2">
             <Terminal size={14} /> Intelligence Operations Command
          </div>
          
          <div className="grid-12 items-start">
            <div className="col-span-12 lg:col-span-5">
              <h1 className="text-5xl font-display font-black text-white leading-[1.05] mb-8 uppercase tracking-tight">
                Regional <span className="text-primary">Early Warning</span> <br /> 
                Infrastructure.
              </h1>
              <p className="text-text-dim font-medium leading-relaxed mb-12 text-lg max-w-xl">
                The FALAG Intelligence Hub is a mission-critical platform for monitoring 
                emerging environmental anomalies, food security shifts, and regional stability vectors.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="xi-card p-8 bg-surface/40">
                  <div className="text-[10px] font-mono font-bold uppercase text-text-dim tracking-widest mb-3 flex items-center gap-2">
                     <Target size={12} className="text-risk-critical" /> Active Alerts
                  </div>
                  <div className="text-4xl font-display font-black text-white">04</div>
                  <div className="text-[9px] font-mono font-bold text-risk-critical mt-2 uppercase tracking-widest italic">Critical Priority</div>
                </div>
                <div className="xi-card p-8 bg-surface/40">
                  <div className="text-[10px] font-mono font-bold uppercase text-text-dim tracking-widest mb-3 flex items-center gap-2">
                     <Activity size={12} className="text-risk-mod" /> Regional Trend
                  </div>
                  <div className="text-4xl font-display font-black text-white uppercase">Elevated</div>
                  <div className="text-[9px] font-mono font-bold text-risk-mod mt-2 uppercase tracking-widest italic">Persistence Warning</div>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-7">
              <div className="xi-card p-12 bg-surface border-risk-critical/20 shadow-glow relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                  <ShieldAlert size={160} />
                </div>
                
                <div className="flex flex-col md:flex-row gap-16 items-center">
                  <div className="text-center md:text-left">
                    <div className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-text-dim mb-4 flex items-center gap-2">
                       <Zap size={14} className="text-primary" /> Risk Synthesis
                    </div>
                    <div className="flex items-baseline gap-4">
                      <span className="text-9xl font-display font-black text-white tracking-tighter leading-none">72</span>
                      <span className="text-2xl font-bold text-text-dim opacity-30">/ 100</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 w-full">
                    <div className="space-y-8">
                      <div>
                        <div className="flex justify-between text-[11px] font-mono font-bold uppercase tracking-widest mb-3">
                          <span className="text-text-main">Anomaly Intensity</span>
                          <span className="text-risk-critical tracking-[0.2em]">SEVERE PRESSURE</span>
                        </div>
                        <div className="w-full h-1.5 bg-navy-800 overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '72%' }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-full bg-risk-critical shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border-subtle">
                        <div>
                          <div className="text-[9px] font-mono font-bold text-text-dim uppercase tracking-widest mb-2">Climate</div>
                          <div className="text-sm font-display font-bold text-white uppercase tracking-tight">42.4% <span className="text-[8px] text-risk-high block mt-1">HIGH</span></div>
                        </div>
                        <div>
                          <div className="text-[9px] font-mono font-bold text-text-dim uppercase tracking-widest mb-2">Food Sec</div>
                          <div className="text-sm font-display font-bold text-white uppercase tracking-tight">PHASE 3+ <span className="text-[8px] text-risk-high block mt-1">CRITICAL</span></div>
                        </div>
                        <div>
                          <div className="text-[9px] font-mono font-bold text-text-dim uppercase tracking-widest mb-2">Stability</div>
                          <div className="text-sm font-display font-bold text-white uppercase tracking-tight">ELEVATED <span className="text-[8px] text-risk-mod block mt-1">WARNING</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. GEOSPATIAL COMMAND (Engineered Layout) */}
      <div className="max-w-content py-20 relative">
        <div className="flex items-center gap-4 mb-12">
           <div className="xi-eyebrow mb-0">Geospatial Intelligence</div>
           <div className="h-[1px] flex-1 bg-border-subtle opacity-50" />
           <div className="flex gap-2">
              <button className="w-8 h-8 border border-border-subtle flex items-center justify-center text-text-dim hover:text-primary transition-all">
                 <Maximize2 size={14} />
              </button>
              <button className="w-8 h-8 border border-border-subtle flex items-center justify-center text-text-dim hover:text-primary transition-all">
                 <Search size={14} />
              </button>
           </div>
        </div>

        <div className="grid-12">
          {/* Main Map Core */}
          <div className="col-span-12 lg:col-span-8">
            <div className="xi-card border-border-subtle overflow-hidden">
              <div className="relative h-[700px] bg-navy-950">
                <DroughtMap onRegionSelect={setSelectedRegion} />
                
                {/* Overlay Legend (Intelligence Grade) */}
                <div className="absolute top-8 right-8 z-[40] xi-card bg-surface/90 backdrop-blur-xl p-6 border-primary/20 w-56 shadow-premium">
                  <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-primary mb-6">Intensity Legend</h4>
                  <div className="space-y-4">
                    {[
                      { label: 'Critical', color: 'bg-risk-critical shadow-[0_0_8px_rgba(239,68,68,0.5)]' },
                      { label: 'Severe', color: 'bg-risk-high' },
                      { label: 'Moderate', color: 'bg-risk-mod' },
                      { label: 'Watch', color: 'bg-risk-low' },
                      { label: 'Stable', color: 'bg-risk-stable shadow-[0_0_8px_rgba(56,189,248,0.3)]' }
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-4">
                        <div className={`w-3 h-3 ${item.color}`} />
                        <span className="text-[10px] font-mono font-bold text-text-dim uppercase tracking-widest">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-8 bg-surface border-t border-border-subtle grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono font-bold uppercase text-text-dim tracking-widest mb-2 flex items-center gap-2">
                     <div className="w-1.5 h-1.5 bg-risk-low rounded-full animate-pulse" /> Stream Sync
                  </span>
                  <span className="text-xs font-display font-bold text-white uppercase tracking-tight">
                    NOMINAL — 11 MAY 2026 19:10
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono font-bold uppercase text-text-dim tracking-widest mb-2">Projection Confidence</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-display font-bold text-primary uppercase tracking-tight">MODERATE-HIGH (0.84)</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono font-bold uppercase text-text-dim tracking-widest mb-2">Audit Status</span>
                  <span className="text-xs font-display font-bold text-white uppercase tracking-tight flex items-center gap-2">
                    <Database size={14} className="text-primary/40" /> SYSTEM AUDITED — 13 REGIONS
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Strategic Intelligence Panel */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <AnimatePresence mode="wait">
              {selectedRegion ? (
                <motion.div 
                  key="detail"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  className="xi-card h-full flex flex-col border-primary/20 shadow-glow bg-surface"
                >
                  <div className="p-10 border-b border-border-subtle bg-navy-950/30">
                    <div className="flex justify-between items-start mb-8">
                      <span className={`px-4 py-1 border text-[10px] font-mono font-bold uppercase tracking-widest ${getSeverityColor(selectedRegion.score || 0)}`}>
                        {selectedRegion.level || 'ELEVATED'}
                      </span>
                      <button onClick={() => setSelectedRegion(null)} className="text-text-dim hover:text-primary transition-colors p-1">
                        <Info size={18} />
                      </button>
                    </div>
                    <h2 className="text-4xl font-display font-black text-white uppercase tracking-tight mb-3">{selectedRegion.name}</h2>
                    <div className="flex items-center gap-2">
                       <div className="w-1 h-1 bg-primary rounded-full" />
                       <span className="text-[10px] font-mono font-bold text-text-dim uppercase tracking-widest">RAU-1 Administrative Segment</span>
                    </div>
                  </div>
                  <div className="p-10 flex-1 space-y-12 overflow-y-auto max-h-[500px]">
                    <section>
                      <h4 className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-primary mb-6">Indicator Metrics</h4>
                      <div className="space-y-4">
                        {[
                          { label: 'Climate Stress', value: '+14.2%', status: 'Warning', icon: ThermometerSun, color: 'text-risk-mod' },
                          { label: 'Food Security (IPC)', value: 'PHASE 3', status: 'Priority', icon: Wheat, color: 'text-risk-high' },
                          { label: 'Stability Index', value: '0.64', status: 'Warning', icon: Activity, color: 'text-risk-mod' }
                        ].map(i => (
                          <div key={i.label} className="p-5 bg-navy-950/50 border border-border-subtle flex justify-between items-center group hover:border-primary/30 transition-all">
                            <div className="flex items-center gap-4">
                              <i.icon size={18} className="text-text-dim group-hover:text-primary transition-colors" />
                              <span className="text-xs font-mono font-bold text-text-dim uppercase tracking-widest">{i.label}</span>
                            </div>
                            <span className={`text-sm font-display font-bold uppercase tracking-tight ${i.color}`}>{i.value}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                    
                    <Link 
                      href={`/intelligence/region/${selectedRegion.id || selectedRegion.name.toLowerCase().replace(' ', '-')}`}
                      className="btn-primary w-full group"
                    >
                      Open Monitoring Portal <ArrowUpRight size={16} className="ml-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <div className="xi-card p-12 h-full flex flex-col items-center justify-center text-center bg-navy-950/20 border-dashed border-border-subtle">
                  <Globe size={56} className="text-border-subtle mb-8 opacity-40" />
                  <h3 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-tight">Awaiting Input</h3>
                  <p className="text-sm font-medium text-text-dim leading-relaxed tracking-wide px-8">
                    Initialize monitoring by selecting a regional administrative unit on the interactive matrix to view localized intelligence artifacts.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 3. DROUGHT DASHBOARD (Intelligence Core) */}
      <div className="max-w-content pb-24 relative z-10">
         <div className="xi-eyebrow mb-10 flex items-center gap-2">
            <Activity size={14} /> Analytical Time-Series Logic
         </div>
         <DroughtDashboard />
      </div>

      {/* 4. SUBSYSTEMS (Dark Grid) */}
      <section className="max-w-content pt-32 relative">
        <div className="grid-12">
          
          {/* Climate Engine */}
          <div className="col-span-12 lg:col-span-4 xi-card p-10 bg-surface border-b-4 border-b-risk-mod group">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 border border-border-subtle flex items-center justify-center text-risk-mod group-hover:border-risk-mod transition-colors">
                <ThermometerSun size={24} />
              </div>
              <h3 className="text-lg font-display font-bold text-white uppercase tracking-tight">Climate Engine</h3>
            </div>
            <p className="text-sm font-medium text-text-dim leading-relaxed mb-10 tracking-wide">
              Monitoring drought emergence using CHIRPS v2.0 satellite persistence and regional anomaly vectors.
            </p>
            <div className="space-y-6 mb-12">
              <div className="flex justify-between items-center text-[11px] font-mono font-bold tracking-widest uppercase">
                <span className="text-text-dim">Persistence Profile</span>
                <span className="text-white">-14.2% (MOD)</span>
              </div>
              <div className="flex justify-between items-center text-[11px] font-mono font-bold tracking-widest uppercase">
                <span className="text-text-dim">Outlook Confidence</span>
                <span className="text-risk-mod">BELOW AVERAGE</span>
              </div>
            </div>
            <Link href="/intelligence/climate" className="btn-outline w-full text-[10px]">
              Access Engine
            </Link>
          </div>

          {/* Vulnerability System */}
          <div className="col-span-12 lg:col-span-4 xi-card p-10 bg-surface border-b-4 border-b-risk-high group">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 border border-border-subtle flex items-center justify-center text-risk-high group-hover:border-risk-high transition-colors">
                <Wheat size={24} />
              </div>
              <h3 className="text-lg font-display font-bold text-white uppercase tracking-tight">Vulnerability Core</h3>
            </div>
            <p className="text-sm font-medium text-text-dim leading-relaxed mb-10 tracking-wide">
              Translating stress vectors into humanitarian indicators based on IPC Phase 3+ classifications.
            </p>
            <div className="space-y-6 mb-12">
              <div className="flex justify-between items-center text-[11px] font-mono font-bold tracking-widest uppercase">
                <span className="text-text-dim">Peak IPC Status</span>
                <span className="text-white">PHASE 3 (CRISIS)</span>
              </div>
              <div className="flex justify-between items-center text-[11px] font-mono font-bold tracking-widest uppercase">
                <span className="text-text-dim">Vulnerability Delta</span>
                <span className="text-risk-high">+620K EST</span>
              </div>
            </div>
            <Link href="/intelligence/food-security" className="btn-outline w-full text-[10px]">
              Access Subsystem
            </Link>
          </div>

          {/* Stability Hub */}
          <div className="col-span-12 lg:col-span-4 xi-card p-10 bg-surface border-b-4 border-b-risk-critical group">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 border border-border-subtle flex items-center justify-center text-risk-critical group-hover:border-risk-critical transition-colors">
                <ShieldAlert size={24} />
              </div>
              <h3 className="text-lg font-display font-bold text-white uppercase tracking-tight">Stability Hub</h3>
            </div>
            <p className="text-sm font-medium text-text-dim leading-relaxed mb-10 tracking-wide">
              Incident tracking and fatality density mapping utilizing real-time dynamic conflict reporting.
            </p>
            <div className="space-y-6 mb-12">
              <div className="flex justify-between items-center text-[11px] font-mono font-bold tracking-widest uppercase">
                <span className="text-text-dim">Incident Density</span>
                <span className="text-white">HIGH (7D ROLLING)</span>
              </div>
              <div className="flex justify-between items-center text-[11px] font-mono font-bold tracking-widest uppercase">
                <span className="text-text-dim">Escalation Vector</span>
                <span className="text-risk-critical uppercase">Accelerating</span>
              </div>
            </div>
            <Link href="/intelligence/security" className="btn-outline w-full text-[10px]">
              Access Hub
            </Link>
          </div>

        </div>
      </section>

      {/* 5. FORECASTING (Intelligence Grade) */}
      <section className="max-w-content pt-32">
        <div className="xi-card p-16 bg-surface border-primary/10 flex flex-col md:flex-row gap-20 items-center overflow-hidden">
          <div className="max-w-xl relative z-10">
            <div className="text-[11px] font-mono font-bold uppercase tracking-[0.4em] text-primary mb-8 flex items-center gap-3">
               <Zap size={14} className="animate-pulse" /> Anticipatory Modeling
            </div>
            <h2 className="text-5xl font-display font-black text-white leading-tight uppercase mb-8 tracking-tight">Strategic <br /> <span className="text-primary">Foresight</span>.</h2>
            <p className="text-text-dim text-md font-medium leading-relaxed mb-12 tracking-wide">
              FALAG utilizes multi-indicator anomaly persistence logic to project regional risk trajectories 
              up to 90 days in advance, enabling institutional early intervention.
            </p>
            <Link href="/intelligence/forecasting" className="btn-primary group">
              Full Forecast Protocol <ArrowUpRight size={16} className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-6 w-full relative">
            <div className="absolute inset-0 bg-primary/5 blur-[80px] rounded-full" />
            {[
               { label: '30D Probability', val: '42%', color: 'text-risk-mod' },
               { label: '60D Probability', val: '68%', color: 'text-risk-high' },
               { label: '90D Probability', val: '72%', color: 'text-risk-critical' },
               { label: 'System Conf.', val: '0.84', color: 'text-text-dim opacity-50' }
            ].map((stat, i) => (
              <div key={i} className="p-8 bg-navy-950/60 border border-border-subtle relative z-10">
                <div className="text-[10px] font-mono font-bold uppercase text-text-dim tracking-widest mb-4">{stat.label}</div>
                <div className={`text-4xl font-display font-black tracking-tighter ${stat.color}`}>{stat.val}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. AI BRIEFING (Dark Mode) */}
      <section className="max-w-content pt-32">
        <AIBriefing briefing={briefing} />
      </section>

      {/* 7. REGIONAL FOCUS: SOMALILAND (Intelligence Grade) */}
      <section className="max-w-content pt-32 pb-40">
        <div className="flex items-center gap-6 mb-16">
           <h2 className="text-4xl font-display font-black text-white uppercase tracking-tight">Regional focus: <span className="text-primary">Somaliland</span></h2>
           <div className="h-[1px] flex-1 bg-border-subtle opacity-50" />
        </div>
        <div className="h-[700px] w-full border border-border-subtle shadow-premium overflow-hidden bg-navy-950">
          <SomalilandMap />
        </div>
      </section>
    </div>
  );
}

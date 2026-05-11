"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, Activity, 
  Clock, BarChart3, 
  ShieldCheck, Globe,
  ArrowUpRight, Terminal,
  Zap, Database, Server
} from "lucide-react";
import ThemesGrid from "@/components/research/ThemesGrid";
import { publications } from "@/lib/content/publications";
import { calculateRiskFromMetrics, RiskOutput } from "@/lib/intelligence/riskEngine";

export default function Home() {
  const [liveRisk] = useState<RiskOutput>(() => calculateRiskFromMetrics(-25, 3, 8, 0));
  const [currentTime, setCurrentTime] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));

    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-GB', { timeZone: 'Africa/Mogadishu', hour12: false }) + " EAT");
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      
      {/* 1. STRATEGIC HERO (Intelligence Grade) */}
      <section className="relative pt-40 pb-32 border-b border-border-subtle overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.03)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="max-w-content relative z-10">
          <div className="grid grid-cols-12 gap-16 items-center">
            <div className="col-span-12 lg:col-span-7">
              <div className="xi-eyebrow">
                <Terminal size={14} /> System Operational // Node: Horn of Africa
              </div>
              <h1 className="text-6xl font-display font-black text-white leading-[0.95] mb-10 tracking-tight uppercase">
                Strategic <span className="text-primary">Intelligence</span> <br /> 
                & Analytical <span className="text-blue-500">Foresight.</span>
              </h1>
              <p className="text-lg text-text-dim font-medium mb-12 leading-relaxed max-w-2xl">
                FALAG is a high-fidelity intelligence infrastructure that synthesizes geospatial persistence with independent policy analysis to empower strategic decision-making.
              </p>
              <div className="flex flex-wrap gap-6">
                <Link href="/intelligence" className="btn-primary group">
                  Initialize Intelligence Hub <ArrowRight size={16} className="ml-3 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/research" className="btn-outline">
                  Analytical Archive
                </Link>
              </div>
              
              <div className="mt-20 flex gap-12 items-center opacity-50">
                <div className="flex items-center gap-3">
                  <Database size={16} />
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase">Verified Data Streams</span>
                </div>
                <div className="flex items-center gap-3">
                  <Server size={16} />
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase">Distributed Computation</span>
                </div>
              </div>
            </div>
            
            {/* Engineered Visualization Card */}
            <div className="hidden lg:block col-span-5 relative">
              <div className="xi-card p-12 bg-surface border-primary/20 shadow-glow rotate-1">
                <div className="flex justify-between items-center mb-12">
                   <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-risk-critical rounded-full animate-pulse" />
                      <span className="text-[10px] font-mono font-bold text-risk-critical tracking-[0.2em] uppercase">Priority Alert // Alpha</span>
                   </div>
                   <Zap size={14} className="text-primary" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-6 tracking-tight uppercase">
                  Anomaly Detected: <br /> Regional Persistence
                </h3>
                <div className="space-y-6 mb-10">
                   <div className="flex justify-between text-[10px] font-mono font-bold uppercase tracking-widest text-text-dim">
                      <span>Intensity Gradient</span>
                      <span className="text-primary">84.2%</span>
                   </div>
                   <div className="h-1 w-full bg-navy-800 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '84.2%' }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-primary shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                      />
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-6 pt-8 border-t border-border-subtle">
                   <div>
                      <div className="text-[9px] font-mono font-bold uppercase text-text-dim tracking-widest mb-1">Confidence</div>
                      <div className="text-xl font-display font-bold text-white">0.92</div>
                   </div>
                   <div>
                      <div className="text-[9px] font-mono font-bold uppercase text-text-dim tracking-widest mb-1">Status</div>
                      <div className="text-xl font-display font-bold text-risk-critical">ACTIVE</div>
                   </div>
                </div>
              </div>
              
              {/* Floating Tech elements */}
              <div className="absolute -bottom-6 -left-6 xi-card p-4 px-6 bg-navy-950 border-primary/40 flex items-center gap-4 -rotate-2">
                 <Activity size={16} className="text-primary animate-pulse" />
                 <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em]">Live Feed Active</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OPERATIONAL DASHBOARD (Engineered UI) */}
      <section className="py-32 bg-navy-950 relative">
        <div className="max-w-content">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <div className="xi-eyebrow underline decoration-primary/30 decoration-2 underline-offset-8">Core Monitor</div>
              <h2 className="text-4xl font-display font-black text-white tracking-tight uppercase mt-4">Intelligence <span className="text-primary">Core</span> Feed</h2>
            </div>
            <div className="flex items-center gap-4 px-6 py-3 bg-surface border border-border-subtle text-[11px] font-mono font-bold text-primary uppercase tracking-[0.2em] shadow-premium">
              <Clock size={14} />
              <span suppressHydrationWarning>SYNC_TIME: {mounted ? currentTime : "INITIALIZING..."}</span>
            </div>
          </div>

          <div className="grid-12">
            {/* Global Risk Vector */}
            <div className="col-span-12 lg:col-span-5">
              <div className="xi-card h-full p-12 bg-surface/50 backdrop-blur-md flex flex-col justify-between border-b-2 border-b-primary shadow-glow">
                <div>
                  <div className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-text-dim mb-8 flex items-center gap-2">
                     <div className="w-1.5 h-1.5 bg-primary rounded-full" /> Composite Risk Index
                  </div>
                  <div className="flex items-baseline gap-6 mb-12">
                    <span className="text-9xl font-display font-black text-white leading-none tracking-tighter">{liveRisk?.score || "74"}</span>
                    <div className="flex flex-col gap-2">
                      <span className="text-2xl font-bold text-text-dim opacity-30">/ 100</span>
                      <div className={`px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest border ${
                        liveRisk?.level === 'Critical' ? 'border-risk-critical text-risk-critical bg-risk-critical/5' : 'border-risk-high text-risk-high bg-risk-high/5'
                      }`}>
                        {liveRisk?.level || "Elevated"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-12 border-t border-border-subtle">
                  <p className="text-sm font-medium text-text-dim leading-relaxed mb-8">
                    Institutional synthesis of high-resolution climate anomalies, conflict density tracking, and market stability indicators.
                  </p>
                  <Link href="/intelligence" className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-primary hover:tracking-[0.4em] flex items-center gap-3 transition-all">
                    System Detailed Analysis <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Indicator Matrix */}
            <div className="col-span-12 lg:col-span-7 grid grid-cols-2 gap-6">
              {[
                { label: 'Climate Stress', value: '-24%', status: 'Critical', icon: Globe, color: 'text-risk-critical' },
                { label: 'Food Security', value: 'PHASE 3', status: 'Alert', icon: Activity, color: 'text-risk-high' },
                { label: 'Market Volatility', value: '+12%', status: 'Elevated', icon: BarChart3, color: 'text-risk-mod' },
                { label: 'Strategic Stability', value: 'OPERATIONAL', status: 'Optimal', icon: ShieldCheck, color: 'text-risk-low' }
              ].map((ind, i) => (
                <div key={i} className="xi-card p-10 bg-surface group hover:bg-navy-900 transition-all border-border-subtle/50">
                  <div className="flex justify-between items-start mb-10">
                    <div className="w-12 h-12 border border-border-subtle flex items-center justify-center text-text-dim group-hover:border-primary group-hover:text-primary transition-all">
                      <ind.icon size={22} />
                    </div>
                    <span className={`text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 border border-current ${ind.color}`}>{ind.status}</span>
                  </div>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-text-dim mb-2">{ind.label}</div>
                  <div className="text-4xl font-display font-black text-white tracking-tight">{ind.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. RESEARCH REPOSITORY (Clean Institutional) */}
      <section className="py-32 bg-background border-y border-border-subtle relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.02)_0%,transparent_50%)]" />
        
        <div className="max-w-content relative z-10">
          <div className="flex justify-between items-end mb-20">
            <div>
              <div className="xi-eyebrow">Analytical Repository</div>
              <h2 className="text-4xl font-display font-black text-white tracking-tight uppercase mt-4">Institutional <span className="text-blue-500">Research</span></h2>
            </div>
            <Link href="/research" className="btn-outline">
              Browse Repository
            </Link>
          </div>

          <div className="grid-12">
            {publications.slice(0, 3).map((pub, i) => (
              <div key={i} className="col-span-12 lg:col-span-4">
                <Link href={`/research/reports/${pub.slug}`} className="xi-card group block h-full bg-surface">
                  <div className="p-10 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-10">
                       <span className="text-[10px] font-mono font-bold text-primary tracking-widest uppercase border-b border-primary/30 pb-1">{pub.type}</span>
                       <div className="w-1 h-1 bg-border-subtle rounded-full" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-white tracking-tight leading-snug mb-6 group-hover:text-primary transition-colors">
                      {pub.title}
                    </h3>
                    <p className="text-sm text-text-dim font-medium mb-12 line-clamp-3 leading-relaxed">
                      {pub.abstract || pub.summary}
                    </p>
                    <div className="mt-auto pt-8 border-t border-border-subtle flex justify-between items-center text-[10px] font-mono font-bold text-text-dim/60 uppercase tracking-widest">
                       <span>Region: {pub.region}</span>
                       <ArrowUpRight size={16} className="group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THEMATIC HUBS */}
      <div className="bg-navy-950 py-16">
        <ThemesGrid />
      </div>

    </div>
  );
}

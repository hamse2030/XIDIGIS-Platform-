"use client";

import { motion } from "framer-motion";
import { 
  ShieldAlert, Activity, BarChart3, 
  Map as MapIcon, Globe, ArrowRight,
  TrendingUp, Shield, Database, Terminal,
  ExternalLink, Zap
} from "lucide-react";
import Link from "next/link";
import ThemesGrid from "@/components/research/ThemesGrid";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. STRATEGIC HERO (Dark Institutional Mode) */}
      <section className="relative pt-40 pb-32 border-b border-border overflow-hidden bg-background">
        <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none" />
        
        <div className="max-w-content relative z-10">
          <div className="grid grid-cols-12 gap-12 items-center">
            <div className="col-span-12 lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="xi-eyebrow">
                   <Shield size={14} className="text-primary" /> Institutional Intelligence Platform
                </div>
                <h1 className="text-6xl md:text-7xl font-bold text-text-main uppercase tracking-tight leading-[1.1] mb-8">
                  Strategic <span className="text-primary">Foresight</span> <br /> 
                  & Regional <span className="text-text-muted">Analysis.</span>
                </h1>
                <p className="text-lg text-text-secondary leading-relaxed mb-12 font-normal max-w-2xl">
                  Navigating complexity through high-fidelity data economics, strategic security frameworks, and real-time climate monitoring in the Horn of Africa.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/intelligence" className="btn-primary group">
                    Initialize System <Zap size={14} className="ml-3 group-hover:scale-125 transition-transform" />
                  </Link>
                  <Link href="/research" className="btn-outline group">
                    Research Archive <ArrowRight size={14} className="ml-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </div>
            
            {/* System Status Matrix */}
            <div className="hidden lg:col-span-4 lg:block">
              <div className="xi-card p-10 bg-surface-elevated/50 border-border">
                <div className="xi-eyebrow mb-8 flex items-center gap-3">
                   <Terminal size={14} /> Live System Status
                </div>
                <div className="space-y-8">
                  {[
                    { label: "Alert Density", value: "ELEVATED", color: "text-risk-high" },
                    { label: "Data Fidelity", value: "99.8%", color: "text-primary" },
                    { label: "Active Vectors", value: "14", color: "text-text-main" },
                  ].map((stat, i) => (
                    <div key={i} className="flex justify-between items-end border-b border-border pb-4 last:border-0 last:pb-0">
                      <span className="text-xs font-semibold text-text-muted uppercase tracking-widest">{stat.label}</span>
                      <span className={`text-xl font-bold uppercase tracking-tight ${stat.color}`}>{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REAL-TIME MONITORING (Dark Institutional Mode) */}
      <section className="py-32 bg-surface">
        <div className="max-w-content">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <div className="xi-eyebrow">
                 <Activity size={14} /> Operational Intelligence
              </div>
              <h2 className="text-5xl font-bold text-text-main uppercase tracking-tight leading-tight mb-6">
                Critical <span className="text-primary">Risk</span> Index
              </h2>
              <p className="text-text-secondary font-normal tracking-wide">Synthesized regional metrics derived from multi-sensor data and expert validation.</p>
            </div>
            <Link href="/ops/alerts" className="text-xs font-semibold text-primary uppercase tracking-[0.2em] flex items-center gap-3 hover:gap-5 transition-all group">
               Full Alert Feed <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Economic Volatility", val: "MODERATE", color: "bg-risk-mod", icon: TrendingUp, detail: "CPI Fluctuations: +2.4%" },
              { label: "Climate Stress", val: "CRITICAL", color: "bg-risk-critical", icon: Globe, detail: "Precipitation Deficit: -40%" },
              { label: "Security Density", val: "STABLE", color: "bg-risk-stable", icon: Shield, detail: "Maritime Activity: High" },
              { label: "Data Integrity", val: "OPTIMAL", color: "bg-primary", icon: Database, detail: "Source: Multi-Sensor" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -6 }}
                className="xi-card p-8 relative overflow-hidden group border-border bg-surface-elevated/30"
              >
                <div className={`absolute top-0 left-0 w-full h-1 ${item.color}`} />
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-12 h-12 border border-border flex items-center justify-center text-text-muted group-hover:border-primary group-hover:text-primary transition-all">
                      <item.icon size={24} />
                    </div>
                    <span className={`text-[10px] font-bold px-3 py-1 rounded uppercase tracking-widest text-white ${item.color}`}>
                      {item.val}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-text-main uppercase tracking-tight mb-3">{item.label}</h3>
                  <p className="text-xs font-medium text-text-muted uppercase tracking-widest">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THEMATIC RESEARCH (Dark Institutional Mode) */}
      <section className="py-32 bg-background">
        <div className="max-w-content">
          <div className="grid grid-cols-12 gap-16">
            <div className="col-span-12 lg:col-span-4">
              <div className="sticky top-40">
                <div className="xi-eyebrow">
                   <BarChart3 size={14} /> Strategic Pillars
                </div>
                <h2 className="text-5xl font-bold text-text-main uppercase tracking-tight leading-tight mb-8">
                  Pillars of <br /> <span className="text-primary">Inquiry.</span>
                </h2>
                <p className="text-text-secondary font-normal leading-relaxed mb-12">
                  Our research framework is structured around four critical verticals that determine regional stability and institutional development.
                </p>
                <div className="space-y-4">
                  {['Macro-Economics', 'Climate Systems', 'Security Strategy', 'Digital Transformation'].map((theme, i) => (
                    <div key={i} className="flex items-center gap-4 text-xs font-semibold text-text-muted uppercase tracking-[0.2em]">
                       <div className="w-2 h-2 bg-primary/50 rounded-full" /> {theme}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="col-span-12 lg:col-span-8">
              <ThemesGrid />
            </div>
          </div>
        </div>
      </section>

      {/* 4. MISSION STATEMENT (Dark Institutional Mode) */}
      <section className="py-40 bg-surface relative overflow-hidden border-t border-border">
        <div className="absolute inset-0 bg-grid opacity-[0.05] pointer-events-none" />
        <div className="max-w-content relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
             <Terminal size={48} className="mx-auto text-primary mb-10" />
             <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight leading-tight mb-10 text-text-main">
                Elevating regional <span className="text-primary">understanding</span> through data <span className="text-text-muted">integrity.</span>
             </h2>
             <p className="text-lg text-text-secondary leading-relaxed font-normal mb-12 max-w-2xl mx-auto tracking-wide">
                FALAG is committed to providing high-fidelity, independent analytical frameworks to support strategic decision-making and sustainable development in the Horn of Africa.
             </p>
             <button className="btn-primary mx-auto">
                View Institutional Profile
             </button>
          </div>
        </div>
      </section>
    </div>
  );
}

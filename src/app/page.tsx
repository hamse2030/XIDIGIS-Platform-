"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Activity, AlertTriangle, Clock, Database, ChevronRight, BarChart3, ShieldCheck, MapPin } from "lucide-react";
import ThemesGrid from "@/components/research/ThemesGrid";
import { publications } from "@/lib/content/publications";
import { calculateRegionalRisk, RiskOutput } from "@/lib/intelligence/riskEngine";

export default function Home() {
  const [liveRisk, setLiveRisk] = useState<RiskOutput | null>(null);
  const [currentTime, setCurrentTime] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Simulate real-time risk calculation
    // Rainfall Anomaly (-25%), IPC Phase (3), Security Incidents (8)
    const risk = calculateRegionalRisk(-25, 3, 8);
    setLiveRisk(risk);

    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toISOString().split('T')[0] + " " + now.toTimeString().split(' ')[0] + " EAT");
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. HERO (MINIMAL & STRATEGIC) */}
      <section className="section bg-primary text-white pb-16 pt-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl">
            <div className="xi-eyebrow text-secondary-light mb-6">
              <ShieldCheck size={16} /> Independent Research & Intelligence Platform
            </div>
            <h1 className="mb-6 leading-tight">
              Bridging the Information Gap in the Horn of Africa.
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mb-10 italic">
              Evidence-based analysis, real-time risk forecasting, and strategic foresight empowering institutional decision-making.
            </p>
            <div className="flex gap-4">
              <Link href="/intelligence" className="btn btn-primary bg-white text-primary hover:bg-surface-alt">
                View Live Intelligence <Activity size={16} />
              </Link>
              <Link href="/research" className="btn btn-outline border-white/30 text-white hover:bg-white/10">
                Access Research Archive
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LATEST INTELLIGENCE (LIVE DASHBOARD) */}
      <section className="section bg-surface-alt border-y border-border">
        <div className="container mx-auto">
          <div className="section-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="xi-eyebrow"><Activity size={16} /> Live Risk Assessment</div>
              <h2>Regional Intelligence Output</h2>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-text-muted bg-white px-4 py-2 rounded shadow-sm border border-border">
              <Clock size={16} className="text-primary" />
              <span suppressHydrationWarning>Last Updated: {mounted && currentTime ? currentTime : "Loading..."}</span>
            </div>
          </div>

          <div className="grid-12">
            {/* Risk Score Card */}
            <div className="col-span-12 lg:col-span-4">
              <div className="xi-card bg-surface-dark text-white border-none h-full">
                <div className="xi-card__body relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-10">
                    <AlertTriangle size={120} />
                  </div>
                  <h4 className="text-secondary-light mb-2 uppercase tracking-widest text-xs">Composite Risk Score</h4>
                  <div className="text-7xl font-serif font-black mb-4">
                    {liveRisk?.score || "--"}
                    <span className="text-2xl text-white/50 font-sans">/100</span>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <span className={`px-3 py-1 rounded font-bold text-xs uppercase tracking-wider ${
                      liveRisk?.level === 'Severe' || liveRisk?.level === 'Critical' ? 'bg-danger text-white' : 
                      liveRisk?.level === 'High' ? 'bg-warning text-white' : 'bg-success text-white'
                    }`}>
                      {liveRisk?.level} Risk
                    </span>
                    <span className="text-sm font-bold italic text-white/70 flex items-center gap-1">
                      Trend: {liveRisk?.trend} <ArrowRight size={14} className={liveRisk?.trend === 'Worsening' ? '-rotate-45 text-danger' : 'rotate-45 text-success'} />
                    </span>
                  </div>
                  
                  <p className="text-sm text-text-on-dark/70 italic line-clamp-3">
                    Aggregated risk model evaluating climate anomalies, food security indicators, and localized security incidents across the eastern corridor.
                  </p>
                </div>
              </div>
            </div>

            {/* Methodology Panel & Indicators */}
            <div className="col-span-12 lg:col-span-8">
              <div className="xi-card h-full">
                <div className="xi-card__body">
                  <div className="flex items-center gap-2 mb-6 border-b border-border pb-4">
                    <Database size={18} className="text-primary" />
                    <h5 className="mb-0">XIDIGIS Risk Model Data Sources & Methodology</h5>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {liveRisk?.indicators.map((ind, idx) => (
                      <div key={idx} className="bg-surface-alt p-4 rounded border border-border">
                        <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">{ind.label}</div>
                        <div className="text-2xl font-serif font-bold text-primary mb-2">{ind.value}</div>
                        <div className={`text-[10px] font-black uppercase tracking-widest ${ind.status !== 'Normal' ? 'text-danger' : 'text-success'}`}>
                          Status: {ind.status}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-primary/5 p-4 rounded text-sm text-text-muted italic">
                    <span className="font-bold text-primary not-italic">Methodology: </span> 
                    Weighted algorithm synthesizing CHIRPS precipitation deviations (40%), IPC Acute Food Insecurity Phase classifications (40%), and ACLED conflict event densities (20%). Data pipelines are refreshed bi-weekly.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LATEST RESEARCH (STRICT DESIGN SYSTEM) */}
      <section className="section bg-surface">
        <div className="container mx-auto">
          <div className="section-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="xi-eyebrow"><BookOpen size={16} /> Research Engine</div>
              <h2>Latest Publications</h2>
            </div>
            <Link href="/research" className="btn btn-outline">
              View All Research
            </Link>
          </div>

          <div className="grid-12">
            {publications.slice(0, 3).map((pub, i) => (
              <motion.div 
                key={pub.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="col-span-12 md:col-span-4"
              >
                <Link href={`/research/${pub.slug}`} className="xi-card group block cursor-pointer text-left h-full">
                  <div className="xi-card__body">
                    <div className="flex gap-2 mb-4">
                      <span className="xi-badge">{pub.type}</span>
                      <span className="xi-badge xi-badge--blue">{pub.theme}</span>
                    </div>
                    
                    <h3 className="mb-4 group-hover:text-primary transition-colors">{pub.title}</h3>
                    <p className="line-clamp-3 mb-6 flex-grow">{pub.summary}</p>
                    
                    <div className="mt-auto pt-4 border-t border-border flex flex-col gap-2">
                       <div className="flex items-center gap-2 text-xs font-bold text-text-muted">
                        <MapPin size={12} className="text-secondary" /> {pub.region}
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-text-muted">
                        <span>{pub.date} • {pub.author}</span>
                        <ChevronRight size={14} className="text-primary group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. KEY THEMES (COHESION LAYER) */}
      <ThemesGrid />

    </div>
  );
}

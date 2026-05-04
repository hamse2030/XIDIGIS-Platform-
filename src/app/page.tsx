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
      
      {/* 1. HERO (INSTITUTIONAL & CLEAN) */}
      <section className="section bg-surface-alt pt-32 pb-24 border-b border-gray-100">
        <div className="container mx-auto">
          <div className="max-w-4xl">
            <div className="xi-eyebrow">
              <ShieldCheck size={14} /> Official Intelligence & Strategic Research Platform
            </div>
            <h1 className="text-primary">
              Bridging the Information Gap in the Horn of Africa.
            </h1>
            <p className="text-lg text-text-muted mb-10 leading-relaxed">
              We provide evidence-based analysis, real-time risk forecasting, and strategic foresight to empower institutional decision-making and regional stability.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/intelligence" className="btn btn-primary">
                View Live Intelligence <Activity size={14} />
              </Link>
              <Link href="/research" className="btn btn-outline">
                Access Research Hub
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION (STRUCTURED REPORT FEEL) */}
      <section className="section bg-white border-b border-gray-100">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="xi-card group">
              <div className="xi-card__body items-center text-center">
                <span className="text-4xl font-serif font-black text-primary mb-2 italic">142</span>
                <span className="text-xs font-black uppercase tracking-widest text-primary/60">Total Publications</span>
                <p className="text-[10px] text-text-muted mt-2">Aggregated Research Output</p>
              </div>
            </div>
            <div className="xi-card group">
              <div className="xi-card__body items-center text-center">
                <span className="text-4xl font-serif font-black text-primary mb-2 italic">12</span>
                <span className="text-xs font-black uppercase tracking-widest text-primary/60">Policy Briefs</span>
                <p className="text-[10px] text-text-muted mt-2">Direct Government Advisories</p>
              </div>
            </div>
            <div className="xi-card group">
              <div className="xi-card__body items-center text-center">
                <span className="text-4xl font-serif font-black text-primary mb-2 italic">28</span>
                <span className="text-xs font-black uppercase tracking-widest text-primary/60">Research Papers</span>
                <p className="text-[10px] text-text-muted mt-2">Peer-Reviewed Field Studies</p>
              </div>
            </div>
            <div className="xi-card group">
              <div className="xi-card__body items-center text-center">
                <span className="text-4xl font-serif font-black text-primary mb-2 italic">3</span>
                <span className="text-xs font-black uppercase tracking-widest text-primary/60">Regional Hubs</span>
                <p className="text-[10px] text-text-muted mt-2">Active Field Monitoring</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LATEST INTELLIGENCE (STRUCTURED DASHBOARD) */}
      <section className="section bg-surface-alt">
        <div className="container mx-auto">
          <div className="section-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="xi-eyebrow"><Activity size={14} /> Regional Risk Output</div>
              <h2 className="text-primary font-serif italic">Active Intelligence Monitor</h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-text-muted bg-white px-4 py-2 rounded border border-border">
              <Clock size={14} className="text-primary" />
              <span suppressHydrationWarning>Updated: {mounted && currentTime ? currentTime : "Loading..."}</span>
            </div>
          </div>

          <div className="grid-12">
            {/* Risk Score Card (REDESIGNED) */}
            <div className="col-span-12 lg:col-span-4">
              <div className="xi-card border-l-4 border-l-primary h-full">
                <div className="xi-card__body">
                  <span className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-4 block">Composite Risk Index</span>
                  <div className="text-6xl font-serif font-black text-primary mb-6 italic">
                    {liveRisk?.score || "--"}
                    <span className="text-xl text-text-muted font-sans not-italic">/100</span>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-8">
                    <span className={`xi-badge ${
                      liveRisk?.level === 'Severe' || liveRisk?.level === 'Critical' ? 'bg-red-50 text-red-700 border-red-200' : 
                      liveRisk?.level === 'High' ? 'bg-orange-50 text-orange-700 border-orange-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}>
                      {liveRisk?.level} Risk
                    </span>
                    <span className="text-[10px] font-black uppercase text-text-muted">Trend: {liveRisk?.trend}</span>
                  </div>
                  
                  <p className="text-xs text-text-muted italic leading-relaxed border-t border-gray-100 pt-6">
                    A multi-layered calculation synthesizing climate anomalies, market data, and conflict events.
                  </p>
                </div>
              </div>
            </div>

            {/* Methodology & Indicators */}
            <div className="col-span-12 lg:col-span-8">
              <div className="xi-card">
                <div className="xi-card__body">
                  <div className="flex items-center gap-2 mb-8 border-b border-gray-100 pb-4">
                    <Database size={16} className="text-primary" />
                    <h4 className="text-sm font-black uppercase tracking-widest mb-0">Live Indicator Stream</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {liveRisk?.indicators.map((ind, idx) => (
                      <div key={idx} className="p-4 bg-surface-alt border border-border rounded-sm">
                        <div className="text-[9px] font-black text-text-muted uppercase tracking-tighter mb-1">{ind.label}</div>
                        <div className="text-xl font-serif font-black text-primary italic">{ind.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="xi-alert">
                    <AlertTriangle size={16} />
                    <span className="italic text-xs font-medium">
                      <strong>Methodology Note:</strong> Data is aggregated from CHIRPS (Precipitation), IPC (Food Security), and ACLED (Security).
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LATEST RESEARCH (REPORT FEEL) */}
      <section className="section bg-white border-y border-gray-100">
        <div className="container mx-auto">
          <div className="section-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="xi-eyebrow"><BookOpen size={14} /> Research Engine</div>
              <h2 className="text-primary font-serif italic">Latest Publications</h2>
            </div>
            <Link href="/research" className="btn btn-outline border-primary/20 hover:border-primary">
              View Research Archive
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
                <Link href={`/research/${pub.slug}`} className="xi-card group">
                  <div className="xi-card__body">
                    <div className="flex gap-2 mb-6">
                      <span className="xi-badge">{pub.type}</span>
                      <span className="xi-badge xi-badge--blue">{pub.theme}</span>
                    </div>
                    
                    <h3 className="text-lg font-serif font-black mb-4 group-hover:text-primary transition-colors italic leading-tight">{pub.title}</h3>
                    <p className="text-xs text-text-muted line-clamp-3 mb-8 italic">{pub.summary}</p>
                    
                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[10px] font-black text-text-muted uppercase">
                        <MapPin size={10} className="text-primary/40" /> {pub.region}
                      </div>
                      <ChevronRight size={14} className="text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. KEY THEMES */}
      <ThemesGrid />

    </div>
  );
}

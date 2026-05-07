"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, BookOpen, Activity, AlertTriangle, 
  Clock, Database, ChevronRight, BarChart3, 
  ShieldCheck, MapPin, Globe, Database as DbIcon,
  ArrowUpRight
} from "lucide-react";
import ThemesGrid from "@/components/research/ThemesGrid";
import { publications } from "@/lib/content/publications";
import { calculateRegionalRisk, RiskOutput } from "@/lib/intelligence/riskEngine";

export default function Home() {
  const [liveRisk, setLiveRisk] = useState<RiskOutput | null>(null);
  const [currentTime, setCurrentTime] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const risk = calculateRegionalRisk(-25, 3, 8);
    setLiveRisk(risk);

    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-GB', { timeZone: 'Africa/Mogadishu', hour12: false }) + " EAT");
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-ivory-50">
      
      {/* 1. INSTITUTIONAL HERO */}
      <section className="bg-white border-b border-ivory-200 pt-32 pb-24 relative overflow-hidden">
        <div className="max-w-content relative z-10">
          <div className="grid grid-cols-12 gap-12 items-center">
            <div className="col-span-12 lg:col-span-7">
              <div className="xi-eyebrow flex items-center gap-2">
                <ShieldCheck size={14} className="text-slate-900" /> Strategic Intelligence & Foresight
              </div>
              <h1 className="text-6xl font-serif font-black text-slate-900 italic leading-tight mb-8 tracking-tighter">
                Bridging Data Gaps <br /> 
                <span className="text-slate-400">for Regional Stability.</span>
              </h1>
              <p className="text-xl text-slate-500 font-medium italic mb-10 leading-relaxed max-w-2xl">
                The XIDIGIS Intelligence Hub synthesizes real-time geospatial data with field-validated research to empower institutional decision-making across the Horn of Africa.
              </p>
              <div className="flex flex-wrap gap-5">
                <Link href="/intelligence" className="btn-primary flex items-center gap-3 py-4 px-8 text-xs font-black uppercase tracking-widest">
                  Explore Intelligence Hub <ArrowRight size={16} />
                </Link>
                <Link href="/research" className="px-8 py-4 bg-ivory-100 border border-ivory-500 text-slate-900 text-xs font-black uppercase tracking-widest hover:bg-ivory-200 transition-all shadow-sm">
                  Research Archive
                </Link>
              </div>
            </div>
            
            {/* Visual Indicator Overlay */}
            <div className="hidden lg:block col-span-5 relative">
              <div className="xi-card p-10 bg-white border-l-4 border-brand-burnt shadow-elevated rotate-2 translate-y-6">
                <div className="flex justify-between items-start mb-10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-burnt">Critical Monitoring Alert</span>
                  <div className="w-2 h-2 bg-brand-burnt rounded-full animate-pulse" />
                </div>
                <h3 className="text-3xl font-serif font-black italic text-slate-900 mb-4 leading-tight">East Corridor <br /> Rainfall Deficit</h3>
                <div className="h-1.5 w-full bg-ivory-200 rounded-full overflow-hidden mb-6">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '84%' }}
                    className="h-full bg-brand-burnt"
                  />
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 tracking-widest">
                  <span>Anomaly: -28%</span>
                  <span>Trend: Critical</span>
                </div>
              </div>
              <div className="absolute -top-10 -right-6 xi-card p-6 bg-slate-900 text-white shadow-elevated -rotate-3 scale-90">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Live Forecast</span>
                  <span className="text-xl font-serif font-black italic italic">2-8 Week Horizon</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OPERATIONAL DASHBOARD PREVIEW */}
      <section className="py-24 bg-ivory-50">
        <div className="max-w-content">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <div className="xi-eyebrow">Strategic Monitoring</div>
              <h2 className="text-4xl font-serif font-black text-slate-900 italic tracking-tight">Active Intelligence Feed</h2>
            </div>
            <div className="flex items-center gap-3 px-5 py-2.5 bg-white border border-ivory-500 rounded text-[10px] font-black text-slate-500 uppercase tracking-widest shadow-sm">
              <Clock size={14} className="text-slate-400" />
              <span suppressHydrationWarning>Live Sync: {mounted ? currentTime : "Syncing..."}</span>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* Primary Score */}
            <div className="col-span-12 lg:col-span-5">
              <div className="xi-card h-full p-10 flex flex-col justify-between border-t-4 border-t-slate-900 shadow-elevated bg-white">
                <div>
                  <div className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Composite Regional Risk Index</div>
                  <div className="flex items-end gap-5 mb-10">
                    <span className="text-8xl font-serif font-black text-slate-900 italic leading-none tracking-tighter">{liveRisk?.score || "74"}</span>
                    <div className="pb-3">
                      <span className="text-xl font-bold text-slate-300">/ 100</span>
                      <div className={`mt-2 px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest ${
                        liveRisk?.level === 'Critical' ? 'bg-brand-burnt text-white' : 'bg-brand-amber text-slate-900'
                      }`}>
                        {liveRisk?.level || "Elevated"} Risk
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-10 border-t border-ivory-200">
                  <p className="text-xs font-medium italic text-slate-500 leading-relaxed mb-6">
                    Institutional synthesis of CHIRPS precipitation anomalies, IPC phase forecasts, and ACLED incident density.
                  </p>
                  <Link href="/intelligence" className="text-[10px] font-black uppercase tracking-widest text-slate-900 hover:gap-4 flex items-center gap-2 transition-all">
                    Access Detailed Breakdown <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Indicator Stream */}
            <div className="col-span-12 lg:col-span-7 grid grid-cols-2 gap-8">
              {[
                { label: 'Climate Anomaly', value: '-24%', status: 'Severe', icon: Globe },
                { label: 'Food Security', value: 'Phase 3', status: 'Alert', icon: Activity },
                { label: 'Market Volatility', value: '+12%', status: 'Watch', icon: BarChart3 },
                { label: 'Strategic Stability', value: 'Monitoring', status: 'Stable', icon: ShieldCheck }
              ].map((ind, i) => (
                <div key={i} className="xi-card p-8 group hover:border-slate-900 transition-colors bg-white">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-ivory-100 text-slate-900 rounded border border-ivory-200 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                      <ind.icon size={20} />
                    </div>
                    <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">{ind.status}</span>
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{ind.label}</div>
                  <div className="text-3xl font-serif font-black italic text-slate-900">{ind.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. LATEST RESEARCH SECTION */}
      <section className="py-24 bg-white border-y border-ivory-200">
        <div className="max-w-content">
          <div className="flex justify-between items-end mb-16">
            <div>
              <div className="xi-eyebrow">Strategic Research</div>
              <h2 className="text-4xl font-serif font-black text-slate-900 italic tracking-tight">Recent Publications</h2>
            </div>
            <Link href="/research" className="btn-primary py-3 px-6 text-[10px] uppercase tracking-widest font-black">
              Research Hub
            </Link>
          </div>

          <div className="grid grid-cols-12 gap-8">
            {publications.slice(0, 3).map((pub, i) => (
              <div key={i} className="col-span-12 lg:col-span-4">
                <Link href={`/research/reports/${pub.slug}`} className="xi-card group block bg-white h-full">
                  <div className="p-8 flex flex-col h-full">
                    <div className="flex gap-2 mb-8">
                      <span className="px-2.5 py-1 bg-ivory-100 border border-ivory-500 text-slate-500 text-[9px] font-black uppercase tracking-widest italic rounded-sm">{pub.type}</span>
                    </div>
                    <h3 className="text-xl font-serif font-black text-slate-900 italic leading-tight mb-4 group-hover:text-slate-600 transition-colors">
                      {pub.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium italic mb-10 line-clamp-3 leading-relaxed">
                      {pub.abstract || pub.summary}
                    </p>
                    <div className="mt-auto pt-6 border-t border-ivory-200 flex justify-between items-center">
                      <span className="flex items-center gap-2 text-[9px] font-black uppercase text-slate-400 tracking-widest">
                        <MapPin size={12} className="text-ivory-500" /> {pub.region}
                      </span>
                      <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THEMATIC HUBS */}
      <div className="bg-ivory-50">
        <ThemesGrid />
      </div>

    </div>
  );
}


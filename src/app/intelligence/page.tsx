"use client";

import { motion } from "framer-motion";
import { Activity, ShieldAlert, ThermometerSun, Wheat, ChevronRight, ArrowUpRight, Database } from "lucide-react";
import Link from "next/link";
import DroughtDashboard from "@/components/intelligence/DroughtDashboard";

export default function IntelligenceSuite() {
  const systems = [
    {
      id: "climate",
      title: "Climate Intelligence",
      description: "CHIRPS-driven anomaly detection and drought early warning monitoring.",
      status: "Active",
      level: "Warning",
      icon: ThermometerSun,
      link: "/intelligence/climate"
    },
    {
      id: "food",
      title: "Food Security",
      description: "Predictive modeling of IPC phases and market volatility impacts.",
      status: "Active",
      level: "Normal",
      icon: Wheat,
      link: "/intelligence/food-security"
    },
    {
      id: "security",
      title: "Strategic Security",
      description: "Monitoring regional stability and maritime security indicators.",
      status: "Monitoring",
      level: "Normal",
      icon: ShieldAlert,
      link: "/intelligence/security"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[--color-surface-alt]">
      {/* Intelligence Header */}
      <section className="bg-primary text-white py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-8">
                <Activity size={24} className="text-secondary animate-pulse" />
                <span className="text-secondary font-black uppercase tracking-[0.3em] text-xs italic">Live Analysis Suite</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-serif font-black mb-8 italic tracking-tighter leading-tight">Institutional Intelligence</h1>
              <p className="text-xl text-white/70 max-w-2xl font-medium italic leading-relaxed">
                Empowering proactive decision-making through high-fidelity data streams and predictive risk modeling across the Horn of Africa.
              </p>
            </div>
            <div className="flex gap-4 p-8 bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-center px-6 border-r border-white/10">
                <span className="block text-3xl font-serif font-black italic">98.2%</span>
                <span className="text-[10px] font-black uppercase text-white/40 tracking-widest italic">Data Uptime</span>
              </div>
              <div className="text-center px-6">
                <span className="block text-3xl font-serif font-black italic text-secondary">3</span>
                <span className="text-[10px] font-black uppercase text-white/40 tracking-widest italic">Active Engines</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* System Overview Grid */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {systems.map((system, i) => (
            <motion.div
              key={system.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white dark:bg-slate-800 p-10 border border-secondary/10 hover:border-secondary transition-all shadow-sm hover:shadow-2xl relative"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="p-4 bg-primary/5 text-primary rounded-sm group-hover:bg-primary group-hover:text-white transition-colors">
                  <system.icon size={32} />
                </div>
                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest italic ${
                  system.level === 'Warning' ? 'bg-orange-500/10 text-orange-500' : 'bg-emerald-500/10 text-emerald-500'
                }`}>
                  {system.status}: {system.level}
                </span>
              </div>
              <h3 className="text-3xl font-serif font-black text-primary dark:text-white mb-6 italic">{system.title}</h3>
              <p className="text-sm text-primary/60 dark:text-slate-400 mb-10 italic leading-relaxed">{system.description}</p>
              <Link href={system.link} className="inline-flex items-center gap-2 text-xs font-black text-secondary uppercase tracking-widest hover:gap-4 transition-all italic">
                Enter Monitoring System <ArrowUpRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Primary Monitoring Dashboard Preview */}
        <div className="bg-white dark:bg-slate-800 border-t-8 border-primary shadow-2xl overflow-hidden">
          <div className="p-12 border-b border-secondary/10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <h2 className="text-4xl font-serif font-black text-primary dark:text-white italic mb-2">Regional Risk Monitor</h2>
              <p className="text-secondary font-black uppercase tracking-widest text-[10px] italic">Combined climate and food security indicators</p>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-accent text-primary text-[10px] font-black uppercase tracking-widest italic border border-secondary/20 flex items-center gap-2">
                <Database size={14} /> Export Dataset
              </button>
              <button className="px-6 py-3 bg-primary text-white text-[10px] font-black uppercase tracking-widest italic flex items-center gap-2 shadow-xl">
                Global Methodology
              </button>
            </div>
          </div>
          <div className="p-12 bg-accent/10">
             <DroughtDashboard />
          </div>
        </div>
      </section>
    </div>
  );
}

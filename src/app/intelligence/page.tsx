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
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Institutional Header */}
      <section className="section bg-white pt-32 pb-16 border-b border-gray-100">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="max-w-3xl">
              <div className="xi-eyebrow">
                <Activity size={14} className="text-primary" /> Institutional Intelligence Suite
              </div>
              <h1 className="text-primary font-serif italic tracking-tighter">Strategic Monitoring & Forecasting</h1>
              <p className="text-lg text-text-muted leading-relaxed">
                Empowering proactive decision-making through high-fidelity data streams and predictive risk modeling across the Horn of Africa.
              </p>
            </div>
            <div className="flex gap-4 p-6 bg-surface-alt border border-border rounded">
              <div className="text-center px-6 border-r border-border">
                <span className="block text-2xl font-serif font-black italic text-primary">98.2%</span>
                <span className="text-[9px] font-black uppercase text-text-muted tracking-widest">Data Uptime</span>
              </div>
              <div className="text-center px-6">
                <span className="block text-2xl font-serif font-black italic text-secondary">3</span>
                <span className="text-[9px] font-black uppercase text-text-muted tracking-widest">Active Engines</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Active Alerts Section (NEW) */}
      <section className="section bg-white pb-0">
        <div className="container mx-auto">
          <div className="xi-alert mb-12">
            <ShieldAlert size={20} className="text-orange-600" />
            <div className="flex-1">
              <div className="text-[10px] font-black uppercase tracking-widest mb-1 text-orange-800">Active Warning: Rainfall Anomaly Detected</div>
              <p className="text-sm font-medium m-0 opacity-90">Cumulative precipitation in the eastern corridor is 25% below the 30-year average. Drought monitoring systems are currently in **High Alert** status.</p>
            </div>
            <Link href="/intelligence/climate" className="btn btn-primary py-2 text-[10px]">View Detail</Link>
          </div>
        </div>
      </section>

      {/* 3. System Overview Grid */}
      <section className="section bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {systems.map((system, i) => (
              <motion.div
                key={system.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="xi-card group"
              >
                <div className="xi-card__body">
                  <div className="flex justify-between items-start mb-10">
                    <div className="p-3 bg-surface-alt text-primary rounded-sm border border-border transition-colors group-hover:bg-primary group-hover:text-white">
                      <system.icon size={24} />
                    </div>
                    <span className={`xi-badge ${
                      system.level === 'Warning' ? 'bg-orange-50 text-orange-700 border-orange-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}>
                      {system.status}: {system.level}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-black text-primary mb-4 italic leading-tight">{system.title}</h3>
                  <p className="text-xs text-text-muted mb-8 italic leading-relaxed">{system.description}</p>
                  <Link href={system.link} className="mt-auto inline-flex items-center gap-2 text-[10px] font-black text-secondary uppercase tracking-widest hover:gap-4 transition-all italic">
                    Enter Monitoring System <ArrowUpRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 4. Deep Dive Preview */}
          <div className="xi-card border-t-4 border-t-primary overflow-hidden shadow-xl">
            <div className="p-8 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h2 className="text-2xl font-serif font-black text-primary italic mb-1">Regional Risk Composite</h2>
                <p className="text-text-muted font-black uppercase tracking-widest text-[9px]">Real-time aggregation of climate and food security metrics</p>
              </div>
              <div className="flex gap-3">
                <button className="btn btn-outline py-2 text-[10px] border-gray-200">
                  <Database size={12} /> Export Dataset
                </button>
                <button className="btn btn-primary py-2 text-[10px]">
                  View Methodology
                </button>
              </div>
            </div>
            <div className="p-10 bg-surface-alt">
               <DroughtDashboard />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

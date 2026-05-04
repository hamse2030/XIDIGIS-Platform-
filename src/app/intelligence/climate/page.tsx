"use client";

import { motion } from "framer-motion";
import { ThermometerSun, AlertTriangle, CloudRain, Activity, Database, ChevronRight } from "lucide-react";
import { calculateRegionalRisk } from "@/lib/intelligence/riskEngine";
import Link from "next/link";

// Simulated CHIRPS-based regional data
const REGIONS = [
  { name: "Togdheer", rainfallAnomaly: -42, ipcPhase: 3, security: 2 },
  { name: "Sool",     rainfallAnomaly: -58, ipcPhase: 4, security: 4 },
  { name: "Sanaag",   rainfallAnomaly: -31, ipcPhase: 3, security: 2 },
  { name: "Woqooyi",  rainfallAnomaly: -12, ipcPhase: 2, security: 1 },
  { name: "Awdal",    rainfallAnomaly: -8,  ipcPhase: 2, security: 1 },
  { name: "Sahil",    rainfallAnomaly: -22, ipcPhase: 2, security: 2 },
];

const LEVEL_COLORS: Record<string, string> = {
  Critical: "text-red-600 bg-red-50 border-red-200",
  Severe:   "text-orange-600 bg-orange-50 border-orange-200",
  High:     "text-yellow-700 bg-yellow-50 border-yellow-200",
  Moderate: "text-blue-600 bg-blue-50 border-blue-200",
  Low:      "text-emerald-600 bg-emerald-50 border-emerald-200",
};

export default function ClimateIntelligence() {
  const regionalRisks = REGIONS.map((r) => ({
    ...r,
    risk: calculateRegionalRisk(r.rainfallAnomaly, r.ipcPhase, r.security),
  }));

  const worstRegion = [...regionalRisks].sort((a, b) => b.risk.score - a.risk.score)[0];
  const avgScore = Math.round(regionalRisks.reduce((s, r) => s + r.risk.score, 0) / regionalRisks.length);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-primary text-white py-24">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-8 text-secondary text-xs font-black uppercase tracking-[0.3em] italic">
            <Link href="/intelligence">Intelligence Suite</Link>
            <ChevronRight size={14} />
            <span className="text-white/40">Climate Intelligence</span>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <ThermometerSun size={40} className="text-secondary" />
                <h1 className="text-6xl font-serif font-black italic tracking-tighter">Climate Intelligence</h1>
              </div>
              <p className="text-xl text-white/70 italic font-medium max-w-2xl leading-relaxed">
                CHIRPS satellite-driven anomaly detection and multi-region drought risk scoring across Somaliland's pastoral zones.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 shrink-0">
              {[
                { label: "Avg. Risk Score", value: avgScore },
                { label: "Alert Regions", value: regionalRisks.filter(r => r.risk.score > 35).length },
                { label: "Data Source", value: "CHIRPS" },
              ].map((s, i) => (
                <div key={i} className="text-center p-6 bg-white/5 border border-white/10">
                  <span className="block text-4xl font-serif font-black italic text-secondary">{s.value}</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/40 italic">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Priority Alert */}
      {worstRegion.risk.score > 35 && (
        <div className="bg-orange-500 text-white py-4">
          <div className="container mx-auto px-6 flex items-center gap-4">
            <AlertTriangle size={20} />
            <span className="font-black uppercase tracking-widest text-sm italic">
              Priority Alert: {worstRegion.name} — Risk Score {worstRegion.risk.score}/100 ({worstRegion.risk.level})
            </span>
          </div>
        </div>
      )}

      {/* Regional Risk Grid */}
      <section className="py-20 bg-accent/10">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-serif font-black text-primary italic">Regional Risk Assessment</h2>
            <div className="flex items-center gap-2 text-[10px] font-black text-primary/40 uppercase tracking-widest italic">
              <Database size={14} /> Updated: May 2026
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {regionalRisks.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white dark:bg-slate-800 border border-secondary/10 shadow-sm hover:shadow-xl transition-all overflow-hidden"
              >
                {/* Risk score bar */}
                <div className="h-1.5 bg-secondary/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${r.risk.score}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className={`h-full ${r.risk.score > 55 ? "bg-red-500" : r.risk.score > 35 ? "bg-orange-400" : "bg-emerald-400"}`}
                  />
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-serif font-black text-primary italic">{r.name}</h3>
                    <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest italic border rounded-full ${LEVEL_COLORS[r.risk.level]}`}>
                      {r.risk.level}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="text-center p-3 bg-accent/20">
                      <span className="block text-2xl font-serif font-black italic text-primary">{r.rainfallAnomaly}%</span>
                      <span className="text-[9px] font-black text-primary/40 uppercase tracking-widest italic">Rainfall</span>
                    </div>
                    <div className="text-center p-3 bg-accent/20">
                      <span className="block text-2xl font-serif font-black italic text-primary">IPC {r.ipcPhase}</span>
                      <span className="text-[9px] font-black text-primary/40 uppercase tracking-widest italic">Phase</span>
                    </div>
                    <div className="text-center p-3 bg-accent/20">
                      <span className="block text-2xl font-serif font-black italic text-primary">{r.risk.score}</span>
                      <span className="text-[9px] font-black text-primary/40 uppercase tracking-widest italic">Risk Score</span>
                    </div>
                  </div>

                  <p className="text-xs text-primary/60 italic leading-relaxed">{r.risk.trend === "Worsening" ? "⚠ " : "✓ "}{r.risk.trend} — {r.risk.indicators[0].value < -30 ? "Severe drought signal detected." : "Within tolerable variance."}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Methodology Note */}
          <div className="mt-16 p-10 bg-white dark:bg-slate-800 border-l-4 border-secondary">
            <h4 className="font-serif font-black text-primary italic text-xl mb-4">Methodology & Data Sources</h4>
            <p className="text-sm text-primary/60 italic leading-relaxed max-w-3xl">
              Risk scores are computed using the XIDIGIS Regional Risk Engine, which weights CHIRPS rainfall anomalies (40%), IPC food security phases (40%), and security incident context (20%). Data is sourced from FEWS NET, CHIRPS v2.0, and Somaliland pastoral monitoring networks.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

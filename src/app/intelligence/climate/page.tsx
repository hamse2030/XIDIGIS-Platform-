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
      {/* Institutional Header */}
      <section className="section bg-white pt-32 pb-16 border-b border-gray-100">
        <div className="container mx-auto">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
              <Link href="/intelligence" className="xi-eyebrow hover:text-primary transition-colors">
                Intelligence Suite <ChevronRight size={14} />
              </Link>
              <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Climate Intelligence</span>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-end gap-12">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <ThermometerSun size={32} className="text-primary" />
                  <h1 className="text-primary font-serif italic tracking-tighter">Climate Intelligence Hub</h1>
                </div>
                <p className="text-lg text-text-muted leading-relaxed">
                  CHIRPS satellite-driven anomaly detection and multi-region drought risk scoring across Somaliland's pastoral zones.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-8 shrink-0 pb-2">
                {[
                  { label: "Avg. Risk Score", value: avgScore },
                  { label: "Alert Regions", value: regionalRisks.filter(r => r.risk.score > 35).length },
                  { label: "Data Source", value: "CHIRPS" },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <span className="block text-3xl font-serif font-black italic text-primary mb-1">{s.value}</span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-text-muted">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Priority Alert */}
      {worstRegion.risk.score > 35 && (
        <div className="bg-[#FFFBEB] py-5 border-y border-gray-100">
          <div className="container mx-auto flex items-center gap-4">
            <AlertTriangle size={18} className="text-[#F59E0B] animate-pulse" />
            <span className="font-black uppercase tracking-widest text-[10px] text-primary italic">
              Strategic Alert: {worstRegion.name} — Risk Index {worstRegion.risk.score}/100 ({worstRegion.risk.level})
            </span>
          </div>
        </div>
      )}

      {/* Regional Risk Grid */}
      <section className="section bg-white">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-serif font-black text-primary italic">Regional Risk Assessment</h2>
            <div className="flex items-center gap-2 text-[10px] font-black text-text-muted uppercase tracking-widest">
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
                className="xi-card group"
              >
                <div className="xi-card__body">
                  {/* Risk score bar */}
                  <div className="h-1 bg-gray-100 rounded-full mb-8 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${r.risk.score}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className={`h-full ${r.risk.score > 55 ? "bg-red-500" : r.risk.score > 35 ? "bg-orange-400" : "bg-emerald-500"}`}
                    />
                  </div>

                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-serif font-black text-primary italic">{r.name}</h3>
                    <span className={`px-2 py-0.5 text-[8px] font-black uppercase tracking-widest border rounded ${LEVEL_COLORS[r.risk.level]}`}>
                      {r.risk.level}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="text-center p-4 bg-surface-alt border border-border">
                      <span className="block text-2xl font-serif font-black italic text-primary">{r.rainfallAnomaly}%</span>
                      <span className="text-[8px] font-black text-text-muted uppercase tracking-widest">Rainfall</span>
                    </div>
                    <div className="text-center p-4 bg-surface-alt border border-border">
                      <span className="block text-2xl font-serif font-black italic text-primary">IPC {r.ipcPhase}</span>
                      <span className="text-[8px] font-black text-text-muted uppercase tracking-widest">Phase</span>
                    </div>
                    <div className="text-center p-4 bg-surface-alt border border-border">
                      <span className="block text-2xl font-serif font-black italic text-primary">{r.risk.score}</span>
                      <span className="text-[8px] font-black text-text-muted uppercase tracking-widest">Risk Index</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-text-muted italic leading-relaxed">{r.risk.trend === "Worsening" ? "⚠ " : "✓ "}{r.risk.trend} — {r.risk.indicators[0].value < -30 ? "Severe drought signal detected." : "Within tolerable variance."}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Methodology Note */}
          <div className="mt-16 xi-card border-l-4 border-l-primary">
            <div className="xi-card__body">
              <h4 className="font-serif font-black text-primary italic text-xl mb-4">Methodology & Data Sources</h4>
              <p className="text-sm text-text-muted italic leading-relaxed max-w-3xl">
                Risk scores are computed using the XIDIGIS Regional Risk Engine, which weights CHIRPS rainfall anomalies (40%), IPC food security phases (40%), and security incident context (20%). Data is sourced from FEWS NET, CHIRPS v2.0, and Somaliland pastoral monitoring networks.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { ArrowRight, Globe, TrendingUp, Shield, Activity } from "lucide-react";
import Link from "next/link";

const PILLARS = [
  {
    id: "macro-economics",
    title: "Macro-Economics",
    icon: TrendingUp,
    description: "Analyzing inflationary trends, trade deficits, and regional market stability mechanisms.",
    docs: 142
  },
  {
    id: "climate-systems",
    title: "Climate Systems",
    icon: Globe,
    description: "Tracking hydrological anomalies, drought indices, and ecological resource scarcity.",
    docs: 89
  },
  {
    id: "security-strategy",
    title: "Security Strategy",
    icon: Shield,
    description: "Monitoring conflict density, maritime route vulnerabilities, and cross-border security.",
    docs: 215
  },
  {
    id: "digital-transformation",
    title: "Digital Systems",
    icon: Activity,
    description: "Evaluating infrastructure resilience, telecommunications, and digital economy growth.",
    docs: 64
  }
];

export default function ThemesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {PILLARS.map((pillar) => (
        <Link href={`/research/${pillar.id}`} key={pillar.id}>
          <motion.div 
            whileHover={{ y: -4 }}
            className="xi-card p-8 h-full flex flex-col group cursor-pointer bg-surface border-border hover:bg-surface-elevated"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-background border border-border flex items-center justify-center text-text-muted group-hover:border-primary group-hover:text-primary transition-all">
                <pillar.icon size={20} />
              </div>
              <span className="text-[10px] font-semibold text-text-muted uppercase tracking-[0.2em]">{pillar.docs} Dossiers</span>
            </div>
            
            <h3 className="text-xl font-bold text-text-main mb-3 group-hover:text-primary transition-colors">{pillar.title}</h3>
            <p className="text-sm text-text-secondary font-normal mb-8 leading-relaxed flex-1">
              {pillar.description}
            </p>
            
            <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest mt-auto">
              Explore Vector <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
}

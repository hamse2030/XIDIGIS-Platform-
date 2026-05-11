"use client";

import { motion } from "framer-motion";
import { TrendingUp, Globe, Shield, Terminal, ArrowRight, Activity, Zap } from "lucide-react";
import Link from "next/link";

const THEMES = [
  {
    id: "economics",
    title: "Macro-Economics",
    description: "Structural transformation, trade flows, and fiscal stability frameworks.",
    icon: TrendingUp,
    color: "text-primary",
    bg: "bg-primary/5",
    metrics: ["Berbera Corridor", "Inflation Monitor"]
  },
  {
    id: "climate",
    title: "Climate Systems",
    description: "Evidence-based environmental monitoring and adaptation strategies.",
    icon: Globe,
    color: "text-risk-stable",
    bg: "bg-risk-stable/5",
    metrics: ["Rainfall Anomaly", "VCI Matrix"]
  },
  {
    id: "security",
    title: "Strategic Security",
    description: "Regional stability, maritime sovereignty, and conflict dynamics.",
    icon: Shield,
    color: "text-navy-900",
    bg: "bg-navy-900/5",
    metrics: ["Incident Tracking", "Maritime Density"]
  },
  {
    id: "tech",
    title: "Digital Sovereignty",
    description: "Infrastructure development, data policy, and technological resilience.",
    icon: Zap,
    color: "text-risk-high",
    bg: "bg-risk-high/5",
    metrics: ["Connectivity Index", "Policy Framework"]
  }
];

export default function ThemesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {THEMES.map((theme, i) => (
        <motion.div
          key={theme.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="xi-card group bg-white border-border hover:border-primary/40 overflow-hidden"
        >
          <div className="p-10">
            <div className="flex justify-between items-start mb-10">
              <div className={`w-14 h-14 ${theme.bg} flex items-center justify-center border border-border group-hover:border-primary transition-all`}>
                <theme.icon className={`${theme.color} group-hover:scale-110 transition-transform`} size={28} />
              </div>
              <Activity size={16} className="text-text-dim opacity-20" />
            </div>
            
            <h3 className="text-2xl font-display font-bold text-navy-950 uppercase tracking-tight mb-4 group-hover:text-primary transition-colors">
              {theme.title}
            </h3>
            <p className="text-sm text-text-dim leading-relaxed font-medium mb-10 uppercase tracking-wide">
              {theme.description}
            </p>

            <div className="space-y-3 mb-12">
               {theme.metrics.map((metric, j) => (
                 <div key={j} className="flex items-center gap-3 text-[9px] font-mono font-bold text-text-dim uppercase tracking-[0.2em]">
                    <div className="w-1 h-1 bg-primary/40 rounded-full" /> {metric}
                 </div>
               ))}
            </div>

            <Link 
              href={`/themes/${theme.id}`}
              className="inline-flex items-center gap-3 text-[10px] font-mono font-bold text-primary uppercase tracking-[0.3em] hover:gap-5 transition-all"
            >
              Initialize Pillar <ArrowRight size={14} />
            </Link>
          </div>
          
          {/* Subtle Technical Border Decor */}
          <div className="absolute top-0 right-0 p-4 opacity-10">
             <Terminal size={40} strokeWidth={1} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

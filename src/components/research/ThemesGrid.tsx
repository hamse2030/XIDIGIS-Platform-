"use client";

import { motion } from "framer-motion";
import { TrendingUp, CloudRain, Shield, Globe, ArrowUpRight, Cpu } from "lucide-react";
import Link from "next/link";

const themes = [
  {
    title: "Macroeconomics",
    description: "Analyzing structural transformation, fiscal stability, and cross-border trade dynamics.",
    icon: TrendingUp,
    link: "/themes/economics",
    sublinks: ["Trade Policy", "Fiscal Resilience", "Market Flows"]
  },
  {
    title: "Climate Systems",
    description: "Multi-indicator monitoring of regional environmental stress and water security vectors.",
    icon: CloudRain,
    link: "/themes/climate",
    sublinks: ["Drought Persistence", "Resource Security", "Agro-Intelligence"]
  },
  {
    title: "Strategic Security",
    description: "High-fidelity regional stability assessment and intelligence-driven conflict analysis.",
    icon: Shield,
    link: "/themes/security",
    sublinks: ["Maritime Security", "Density Mapping", "Foresight"]
  },
  {
    title: "Digital Sovereignty",
    description: "The intersection of technological infrastructure, governance, and data security.",
    icon: Cpu,
    link: "/themes/technology",
    sublinks: ["Digital Infrastructure", "Fintech Stability", "E-Governance"]
  }
];

export default function ThemesGrid() {
  return (
    <section className="py-32 relative bg-navy-950/50" aria-labelledby="themes-heading">
      <div className="max-w-content relative z-10">
        <div className="mb-20">
          <div className="xi-eyebrow"><Globe size={14} /> Knowledge Infrastructure</div>
          <h2 id="themes-heading" className="text-4xl font-display font-black text-white uppercase tracking-tight">Strategic <span className="text-primary">Thematic</span> Architecture</h2>
          <p className="max-w-2xl text-text-dim text-sm leading-relaxed mt-6 font-medium">
            Deep-tier analysis into critical regional development sectors. All FALAG intelligence outputs and research publications are indexed through this central analytical framework.
          </p>
        </div>

        <div className="grid-12">
          {themes.map((theme, i) => (
            <motion.div
              key={theme.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="col-span-12 md:col-span-6 lg:col-span-3"
            >
              <Link href={theme.link} className="xi-card group block h-full bg-surface border-border-subtle hover:border-primary/50 transition-all">
                <div className="p-8 flex flex-col h-full">
                  <div 
                    className="w-14 h-14 border border-border-subtle flex items-center justify-center mb-8 bg-navy-950 text-text-dim group-hover:text-primary group-hover:border-primary transition-all"
                  >
                    <theme.icon size={26} />
                  </div>
                  <h3 className="text-lg font-display font-bold text-white mb-4 group-hover:text-primary transition-colors tracking-tight uppercase">{theme.title}</h3>
                  <p className="flex-grow text-xs text-text-dim mb-10 leading-relaxed font-medium">{theme.description}</p>
                  
                  <div className="mt-auto pt-8 border-t border-border-subtle">
                    <div className="flex flex-wrap gap-2 mb-8">
                      {theme.sublinks.map(sub => (
                        <span key={sub} className="px-2 py-0.5 border border-border-subtle text-[8px] font-mono font-bold text-text-dim uppercase tracking-widest">{sub}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 text-primary font-mono font-bold text-[10px] uppercase tracking-[0.2em] group-hover:gap-5 transition-all">
                      Access Topic Core <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

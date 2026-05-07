"use client";

import { motion } from "framer-motion";
import { TrendingUp, CloudRain, Shield, Globe, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const themes = [
  {
    title: "Development Economics",
    description: "Focusing on sustainable growth, poverty reduction, and structural transformation.",
    icon: TrendingUp,
    color: "var(--color-primary)",
    link: "/themes/economics",
    sublinks: ["Growth Strategies", "Poverty Reduction", "Trade Policy"]
  },
  {
    title: "Climate & Resilience",
    description: "Analyzing climate impact on livestock and water security in the Horn of Africa.",
    icon: CloudRain,
    color: "var(--color-primary)",
    link: "/themes/climate",
    sublinks: ["Drought Mitigation", "Resource Management", "Food Security"]
  },
  {
    title: "Strategic Security",
    description: "Regional stability and intelligence-driven security analysis for policy makers.",
    icon: Shield,
    color: "var(--color-primary)",
    link: "/themes/security",
    sublinks: ["Maritime Security", "Regional Stability", "Policy Reform"]
  },
  {
    title: "Digital Transformation",
    description: "The role of technology in fostering inclusive economic and social development.",
    icon: Globe,
    color: "var(--color-primary)",
    link: "/themes/technology",
    sublinks: ["Fintech Inclusion", "Digital Governance", "Connectivity"]
  }
];

export default function ThemesGrid() {
  return (
    <section className="section bg-surface-alt" aria-labelledby="themes-heading">
      <div className="container mx-auto">
        <div className="section-header mb-16">
          <div className="xi-eyebrow"><Globe size={14} /> Knowledge Infrastructure</div>
          <h2 id="themes-heading" className="text-primary font-serif italic">Strategic Thematic Architecture</h2>
          <p className="max-w-2xl text-text-muted text-sm leading-relaxed italic">
            Deep-dive analysis into Somaliland&apos;s critical development sectors. All intelligence outputs and research publications are mapped through this central information architecture.
          </p>
        </div>

        <div className="grid-12">
          {themes.map((theme, i) => (
            <motion.div
              key={theme.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="col-span-12 md:col-span-6 lg:col-span-3"
            >
              <Link href={theme.link} className="xi-card group block h-full">
                <div className="xi-card__body">
                  <div 
                    className="w-12 h-12 rounded flex items-center justify-center mb-6 shadow-sm transition-transform group-hover:scale-110 bg-surface text-primary border border-border"
                  >
                    <theme.icon size={24} />
                  </div>
                  <h3 className="text-lg font-serif font-black text-primary mb-4 group-hover:text-primary transition-colors italic leading-tight">{theme.title}</h3>
                  <p className="flex-grow text-xs text-text-muted mb-8 italic leading-relaxed">{theme.description}</p>
                  
                  <div className="mt-auto pt-6 border-t border-border">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {theme.sublinks.map(sub => (
                        <span key={sub} className="xi-badge" style={{ fontSize: '0.6rem' }}>{sub}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                      Access Topic Hub <ArrowUpRight size={14} />
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

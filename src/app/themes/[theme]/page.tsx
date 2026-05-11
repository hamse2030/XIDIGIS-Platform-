"use client";

import { use } from "react";
import { publications } from "@/lib/content/publications";
import PublicationCard from "@/components/research/PublicationCard";
import { ChevronRight, Activity, Terminal, Target, Globe, Shield } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ theme: string }>;
}

export default function TopicHubPage({ params }: PageProps) {
  const { theme } = use(params);
  
  const themeMap: Record<string, { title: string, description: string, indicators: string[] }> = {
    "economics": {
      title: "Macro-Economics",
      description: "Analyzing structural transformation, trade dynamics, and macro-fiscal policy within regional corridors.",
      indicators: ["Throughput Persistence", "Volatility Index", "Export Performance"]
    },
    "climate": {
      title: "Climate Systems",
      description: "Multi-indicator monitoring of environmental stressors and institutional adaptation strategies.",
      indicators: ["Precipitation Anomaly", "Vegetation Matrix", "Hydrological Security"]
    },
    "security": {
      title: "Strategic Security",
      description: "High-fidelity regional stability assessment and intelligence-driven conflict analysis protocols.",
      indicators: ["Maritime Density", "Incident Tracking", "Stability Score"]
    }
  };

  const currentTheme = themeMap[theme] || { 
    title: theme.charAt(0).toUpperCase() + theme.slice(1), 
    description: "Specialized analytical outputs and institutional intelligence.",
    indicators: ["System Metrics"]
  };

  const themePublications = publications.filter(p => p.theme === theme);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. STRATEGIC MASTHEAD (Light Mode) */}
      <section className="pt-40 pb-24 border-b border-border bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none" />
        <div className="max-w-content relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-10">
              <Link href="/research" className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-primary hover:text-navy-950 transition-all flex items-center gap-2">
                Knowledge Core <ChevronRight size={14} />
              </Link>
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-text-dim">Pillar Output</span>
            </div>
            <h1 className="text-6xl font-display font-black text-navy-950 uppercase tracking-tight mb-8 leading-none">{currentTheme.title}</h1>
            <p className="text-lg text-text-dim leading-relaxed font-medium max-w-2xl">
              {currentTheme.description}
            </p>
          </div>
        </div>
      </section>

      <div className="bg-surface-alt/20 relative">
        <div className="max-w-content py-32">
        <div className="grid grid-cols-12 gap-16">
          
          {/* 2. PILLAR INTELLIGENCE SIDEBAR (Light Mode) */}
          <div className="col-span-12 lg:col-span-3 space-y-16">
            <div>
              <div className="xi-eyebrow mb-10 flex items-center gap-3">
                 <Target size={14} /> System Indicators
              </div>
              <div className="space-y-4">
                {currentTheme.indicators.map((indicator, i) => (
                  <div key={i} className="xi-card bg-white border-border p-5 group hover:border-primary/30 transition-all">
                     <span className="block text-[9px] font-mono font-bold text-text-dim uppercase tracking-[0.2em] mb-2">Active Protocol</span>
                     <span className="block text-xs font-display font-bold text-navy-950 uppercase tracking-tight group-hover:text-primary transition-colors">{indicator}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="xi-card bg-white border-l-2 border-l-primary shadow-sm group">
              <div className="p-10">
                <div className="w-12 h-12 border border-border flex items-center justify-center text-primary mb-8 group-hover:border-primary transition-all">
                   <Activity size={24} />
                </div>
                <h4 className="text-xl font-display font-bold text-navy-950 uppercase tracking-tight mb-4">Intelligence Access</h4>
                <p className="text-[11px] text-text-dim font-medium uppercase tracking-[0.1em] leading-relaxed mb-10">Access high-fidelity analytical dashboards and geospatial monitoring related to this strategic pillar.</p>
                <Link href="/intelligence" className="btn-primary w-full group/btn">
                  Launch Suite <ChevronRight size={14} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* 3. RESEARCH OUTPUT CORE (Light Mode) */}
          <div className="col-span-12 lg:col-span-9 space-y-16">
            <div className="flex items-center justify-between border-b border-border pb-8">
              <h2 className="text-4xl font-display font-black text-navy-950 uppercase tracking-tight">Thematic <span className="text-primary">Artifacts</span></h2>
              <div className="flex items-center gap-3 text-[10px] font-mono font-bold text-primary uppercase tracking-[0.3em]">
                 <Terminal size={14} /> {themePublications.length} OBJECTS IDENTIFIED
              </div>
            </div>

            <div className="grid grid-cols-1 gap-12">
              {themePublications.length > 0 ? (
                themePublications.map(pub => (
                  <PublicationCard key={pub.id} publication={pub} />
                ))
              ) : (
                <div className="p-32 border border-dashed border-border bg-white text-center">
                  <Globe size={48} className="mx-auto text-border opacity-20 mb-8" />
                  <p className="text-2xl font-display font-bold text-text-dim uppercase tracking-tight">No active artifacts for this pillar.</p>
                </div>
              )}
            </div>
          </div>

          </div>
        </div>
      </div>
    </div>
  );
}

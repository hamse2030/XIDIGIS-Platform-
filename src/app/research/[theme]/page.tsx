"use client";

import { use } from "react";
import { publications } from "@/lib/content/publications";
import PublicationCard from "@/components/research/PublicationCard";
import { ShieldCheck, Info, ChevronRight, BarChart3, Database, Terminal, Globe, Activity } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ theme: string }>;
}

export default function ResearchThemePage({ params }: PageProps) {
  const { theme } = use(params);
  
  // Map URL-friendly theme back to display name
  const themeMap: Record<string, string> = {
    "economics": "Macro-Economics",
    "climate": "Climate Systems",
    "security": "Strategic Security",
    "tech": "Digital Sovereignty"
  };

  const currentThemeName = themeMap[theme] || theme.charAt(0).toUpperCase() + theme.slice(1);
  const themePublications = publications.filter(p => 
    p.category.toLowerCase().includes(theme.toLowerCase()) || 
    currentThemeName.includes(p.category)
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. INSTITUTIONAL MASTHEAD */}
      <section className="pt-40 pb-24 border-b border-border-subtle relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none" />
        <div className="max-w-content relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-10">
              <Link href="/research" className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-primary hover:text-white transition-all flex items-center gap-2 group">
                Knowledge Core <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-text-dim">Thematic Archive</span>
            </div>
            <h1 className="text-6xl font-display font-black text-white uppercase tracking-tight mb-8 leading-none">{currentThemeName}</h1>
            <p className="text-lg text-text-dim leading-relaxed font-medium max-w-2xl">
              Advancing evidence-based policy frameworks to navigate institutional {currentThemeName.toLowerCase()} challenges through empirical regional analysis.
            </p>
          </div>
        </div>
      </section>

      {/* 2. REPOSITORY INTERFACE */}
      <div className="bg-background relative">
        <div className="max-w-content py-32">
        <div className="grid grid-cols-12 gap-20">
          
          {/* Left: Research Outputs */}
          <div className="col-span-12 lg:col-span-8 space-y-16">
            <div className="flex items-center justify-between border-b border-border-subtle pb-8">
              <h2 className="text-4xl font-display font-black text-white uppercase tracking-tight">Active <span className="text-primary">Research</span> Artifacts</h2>
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
                <div className="p-32 border border-dashed border-border-subtle bg-surface/20 text-center">
                  <Globe size={48} className="mx-auto text-border-subtle opacity-20 mb-8" />
                  <p className="text-2xl font-display font-bold text-text-dim uppercase tracking-tight">No active artifacts for this pillar.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Analytical Rigor & Stats */}
          <div className="col-span-12 lg:col-span-4 space-y-16">
            {/* Rigor Panel */}
            <div className="xi-card bg-surface border-l-2 border-l-primary shadow-glow group">
              <div className="p-10">
                <div className="flex items-center gap-4 mb-8 text-primary">
                  <ShieldCheck size={24} />
                  <h3 className="text-xl font-display font-bold text-white uppercase tracking-tight">Analytical Rigor</h3>
                </div>
                <p className="text-[11px] text-text-dim leading-relaxed font-medium uppercase tracking-[0.1em] mb-10">
                  Our methodology relies on a multi-modal intelligence approach, combining high-fidelity ground data with regional strategic forecasting models.
                </p>
                <ul className="space-y-6">
                  <li className="flex items-center gap-4 text-[10px] font-mono font-bold text-text-main uppercase tracking-widest group-hover:text-primary transition-colors">
                    <Activity size={16} className="text-primary/40 shrink-0" /> Real-time indicators
                  </li>
                  <li className="flex items-center gap-4 text-[10px] font-mono font-bold text-text-main uppercase tracking-widest group-hover:text-primary transition-colors">
                    <Database size={16} className="text-primary/40 shrink-0" /> Proprietary datasets
                  </li>
                  <li className="flex items-center gap-4 text-[10px] font-mono font-bold text-text-main uppercase tracking-widest group-hover:text-primary transition-colors">
                    <Info size={16} className="text-primary/40 shrink-0" /> Strategic Briefs
                  </li>
                </ul>
              </div>
            </div>

            {/* Pillar Impact Sidebar */}
            <div className="border-l border-border-subtle pl-10">
              <div className="xi-eyebrow mb-12 border-b border-border-subtle pb-6 flex items-center gap-3">
                 <Target size={14} /> Pillar Impact
              </div>
              <div className="space-y-12">
                <div>
                  <span className="block text-5xl font-display font-black text-white mb-2 leading-none">42+</span>
                  <span className="text-[9px] font-mono font-bold text-text-dim uppercase tracking-[0.3em]">CITED BY INSTITUTIONS</span>
                </div>
                <div>
                  <span className="block text-5xl font-display font-black text-white mb-2 leading-none">12K</span>
                  <span className="text-[9px] font-mono font-bold text-text-dim uppercase tracking-[0.3em]">ANNUAL ARTIFACT DOWNLOADS</span>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

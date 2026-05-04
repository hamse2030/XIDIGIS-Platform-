"use client";

import { use } from "react";
import { publications } from "@/lib/content/publications";
import PublicationCard from "@/components/research/PublicationCard";
import { ShieldCheck, Info, ChevronRight, BarChart3, Database } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ theme: string }>;
}

export default function ResearchThemePage({ params }: PageProps) {
  const { theme } = use(params);
  
  // Map URL-friendly theme back to display name
  const themeMap: Record<string, string> = {
    "economics": "Development Economics",
    "climate": "Climate & Resilience",
    "security": "Strategic Security",
    "tech": "Digital Transformation"
  };

  const currentThemeName = themeMap[theme] || theme.charAt(0).toUpperCase() + theme.slice(1);
  const themePublications = publications.filter(p => 
    p.category.toLowerCase().includes(theme.toLowerCase()) || 
    currentThemeName.includes(p.category)
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Institutional Header */}
      <section className="section bg-surface-alt pt-32 pb-16 border-b border-gray-100">
        <div className="container mx-auto">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <Link href="/research" className="xi-eyebrow hover:text-primary transition-colors">
                Research Archive <ChevronRight size={14} />
              </Link>
              <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">{currentThemeName}</span>
            </div>
            <h1 className="text-primary font-serif italic tracking-tighter">{currentThemeName}</h1>
            <p className="text-lg text-text-muted leading-relaxed">
              Advancing evidence-based policy frameworks to navigate {currentThemeName.toLowerCase()} challenges in Somaliland and the wider Horn of Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content: 2-Column Grid */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Left: Research Outputs */}
          <div className="lg:col-span-2 space-y-12">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-12">
              <h2 className="text-3xl font-serif font-black text-primary italic">Active Research Outputs</h2>
              <div className="flex gap-3">
                <span className="px-3 py-1 bg-surface-alt border border-border text-[9px] font-black uppercase tracking-widest text-text-muted italic">Sort by Date</span>
                <span className="px-3 py-1 bg-surface-alt border border-border text-[9px] font-black uppercase tracking-widest text-text-muted italic">Type: All</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-12">
              {themePublications.length > 0 ? (
                themePublications.map(pub => (
                  <PublicationCard key={pub.id} publication={pub} />
                ))
              ) : (
                <div className="p-12 border-2 border-dashed border-gray-100 text-center rounded-sm">
                  <p className="font-serif font-bold text-gray-200 italic">No publications currently active for this pillar.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Institutional Intelligence */}
          <div className="space-y-12">
            {/* Methodology Rigor */}
            <div className="xi-card border-l-4 border-l-primary shadow-lg">
              <div className="xi-card__body">
                <div className="flex items-center gap-3 mb-6 text-primary">
                  <ShieldCheck size={20} />
                  <h3 className="font-serif font-black italic text-lg tracking-tight">Analytical Rigor</h3>
                </div>
                <p className="text-[10px] text-text-muted leading-relaxed italic mb-6">
                  Our methodology relies on a multi-modal intelligence approach, combining high-fidelity ground data with regional strategic forecasting models.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-[9px] font-black text-primary uppercase tracking-widest italic">
                    <BarChart3 size={14} className="text-primary/40 shrink-0" /> Real-time indicators
                  </li>
                  <li className="flex items-start gap-3 text-[9px] font-black text-primary uppercase tracking-widest italic">
                    <Database size={14} className="text-primary/40 shrink-0" /> Proprietary datasets
                  </li>
                  <li className="flex items-start gap-3 text-[9px] font-black text-primary uppercase tracking-widest italic">
                    <Info size={14} className="text-primary/40 shrink-0" /> Policy briefs
                  </li>
                </ul>
              </div>
            </div>

            {/* Quick Stats Sidebar */}
            <div className="border-l-2 border-gray-100 pl-8">
              <div className="xi-eyebrow mb-6">Thematic Impact</div>
              <div className="space-y-8">
                <div>
                  <span className="block text-4xl font-serif font-black text-primary italic">42+</span>
                  <span className="text-[9px] font-black text-text-muted uppercase tracking-widest italic">Cited by Policy Makers</span>
                </div>
                <div>
                  <span className="block text-4xl font-serif font-black text-primary italic">12k</span>
                  <span className="text-[9px] font-black text-text-muted uppercase tracking-widest italic">Annual Downloads</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

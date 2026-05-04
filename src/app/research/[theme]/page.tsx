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
      {/* Editorial Header */}
      <section className="bg-primary text-white py-24 border-b-8 border-secondary/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <Link href="/" className="text-secondary hover:text-white transition-colors text-xs font-black uppercase tracking-widest flex items-center gap-1 italic">
                Strategic Intelligence <ChevronRight size={14} />
              </Link>
              <span className="text-white/40 text-xs font-black uppercase tracking-widest italic">{currentThemeName}</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-serif font-black mb-8 italic tracking-tighter leading-none">{currentThemeName}</h1>
            <p className="text-xl text-white/70 max-w-2xl font-medium italic leading-relaxed">
              Advancing evidence-based policy frameworks to navigate {currentThemeName.toLowerCase()} challenges in Somaliland and the wider Horn of Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content: 2-Column Grid */}
      <div className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Left: Research Outputs */}
          <div className="lg:col-span-2 space-y-12">
            <div className="flex items-center justify-between border-b-4 border-primary pb-4 mb-12">
              <h2 className="text-3xl font-serif font-black text-primary italic">Active Research Outputs</h2>
              <div className="flex gap-4">
                <span className="px-3 py-1 bg-accent border border-secondary/20 text-[10px] font-black uppercase tracking-widest text-primary italic">Sort by Date</span>
                <span className="px-3 py-1 bg-accent border border-secondary/20 text-[10px] font-black uppercase tracking-widest text-primary italic">Type: All</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-12">
              {themePublications.length > 0 ? (
                themePublications.map(pub => (
                  <PublicationCard
                    key={pub.id}
                    publication={pub}
                  />
                ))
              ) : (
                <div className="p-12 border-2 border-dashed border-secondary/20 text-center rounded-sm">
                  <p className="font-serif font-bold text-primary/40 italic">No publications currently active for this pillar.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Institutional Intelligence */}
          <div className="space-y-12">
            {/* Methodology Rigor */}
            <div className="bg-accent/40 border border-secondary/10 p-8 rounded-sm">
              <div className="flex items-center gap-3 mb-6 text-primary">
                <ShieldCheck size={24} />
                <h3 className="font-serif font-black italic text-xl uppercase tracking-tight">Analytical Rigor</h3>
              </div>
              <p className="text-xs text-primary/70 leading-relaxed italic mb-6">
                Our methodology relies on a multi-modal intelligence approach, combining high-fidelity ground data with regional strategic forecasting models.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-[10px] font-bold text-primary uppercase tracking-widest italic">
                  <BarChart3 size={14} className="text-secondary shrink-0" /> Real-time regional indicators
                </li>
                <li className="flex items-start gap-3 text-[10px] font-bold text-primary uppercase tracking-widest italic">
                  <Database size={14} className="text-secondary shrink-0" /> Proprietary IPC datasets
                </li>
                <li className="flex items-start gap-3 text-[10px] font-bold text-primary uppercase tracking-widest italic">
                  <Info size={14} className="text-secondary shrink-0" /> Peer-reviewed policy briefs
                </li>
              </ul>
            </div>

            {/* Quick Stats Sidebar */}
            <div className="border-l-4 border-secondary pl-8">
              <h4 className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] mb-4 italic">Thematic Impact</h4>
              <div className="space-y-8">
                <div>
                  <span className="block text-4xl font-serif font-black text-primary italic">42+</span>
                  <span className="text-[10px] font-bold text-primary/40 uppercase tracking-widest italic">Cited by Policy Makers</span>
                </div>
                <div>
                  <span className="block text-4xl font-serif font-black text-primary italic">12k</span>
                  <span className="text-[10px] font-bold text-primary/40 uppercase tracking-widest italic">Annual Downloads</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

"use client";

import { use } from "react";
import { publications } from "@/lib/content/publications";
import PublicationCard from "@/components/research/PublicationCard";
import { ShieldCheck, Info, ChevronRight, BarChart3, Database, Activity, Map as MapIcon } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ theme: string }>;
}

export default function TopicHubPage({ params }: PageProps) {
  const { theme } = use(params);
  
  const themeMap: Record<string, { title: string, description: string, indicators: string[] }> = {
    "economics": {
      title: "Development Economics",
      description: "Analyzing structural transformation, trade dynamics, and macro-fiscal policy in the Horn of Africa.",
      indicators: ["Berbera Throughput Index", "Inflation Variance", "Livestock Export Volume"]
    },
    "climate": {
      title: "Climate Risk & Resilience",
      description: "Evidence-based monitoring of environmental stressors and adaptation strategies for pastoral livelihoods.",
      indicators: ["CHIRPS Rainfall Anomaly", "NDVI Vegetation Index", "Water Point Functionality"]
    },
    "security": {
      title: "Strategic Security",
      description: "Geopolitical analysis and maritime security strategies to ensure regional stability and sovereignty.",
      indicators: ["Maritime Incident Tracking", "Border Trade Flow", "Geopolitical Risk Score"]
    }
  };

  const currentTheme = themeMap[theme] || { 
    title: theme.charAt(0).toUpperCase() + theme.slice(1), 
    description: "Specialized research and intelligence outputs.",
    indicators: ["General Metrics"]
  };

  const themePublications = publications.filter(p => p.theme === theme);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Editorial Hub Header */}
      <section className="bg-primary text-white py-32 border-b-8 border-secondary/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 -skew-x-12 transform translate-x-1/2" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
              <Link href="/research" className="text-secondary hover:text-white transition-colors text-xs font-black uppercase tracking-[0.3em] flex items-center gap-2 italic">
                Research Hub <ChevronRight size={14} />
              </Link>
              <span className="text-white/40 text-xs font-black uppercase tracking-widest italic">Topic Hub</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-serif font-black mb-8 italic tracking-tighter leading-[0.8]">{currentTheme.title}</h1>
            <p className="text-2xl text-white/70 max-w-2xl font-medium italic leading-relaxed">
              {currentTheme.description}
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-20">
          
          {/* Left Column: Topic Intelligence Indicators */}
          <div className="lg:col-span-1 space-y-12">
            <div>
              <h3 className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] mb-8 italic">Pillar Indicators</h3>
              <div className="space-y-6">
                {currentTheme.indicators.map((indicator, i) => (
                  <div key={i} className="p-6 bg-accent/20 border-l-4 border-secondary">
                    <span className="block text-[10px] font-black text-primary/40 uppercase mb-2 italic">Monitoring</span>
                    <span className="block text-sm font-black text-primary italic uppercase tracking-tight">{indicator}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 bg-primary text-white rounded-sm">
              <Activity size={32} className="text-secondary mb-6" />
              <h4 className="font-serif font-black italic text-xl mb-4">Intelligence Access</h4>
              <p className="text-xs text-white/60 mb-8 italic">Access live analytical dashboards related to this pillar.</p>
              <Link href="/intelligence" className="text-[10px] font-black text-secondary uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
                Launch Intelligence Suite <ChevronRight size={14} />
              </Link>
            </div>
          </div>

          {/* Center Column: Research Outputs */}
          <div className="lg:col-span-3 space-y-16">
            <div className="flex items-center justify-between border-b-4 border-primary pb-6">
              <h2 className="text-4xl font-serif font-black text-primary italic">Pillar Publications</h2>
              <span className="text-xs font-black text-secondary uppercase tracking-widest italic">{themePublications.length} Outputs Found</span>
            </div>

            <div className="grid grid-cols-1 gap-12">
              {themePublications.length > 0 ? (
                themePublications.map(pub => (
                  <PublicationCard key={pub.id} publication={pub} />
                ))
              ) : (
                <div className="p-20 border-2 border-dashed border-secondary/20 text-center">
                  <p className="font-serif font-bold text-primary/30 italic text-2xl">No active publications for this pillar.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

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
      {/* Institutional Header */}
      <section className="section bg-surface-alt pt-32 pb-16 border-b border-gray-100">
        <div className="container mx-auto">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
              <Link href="/research" className="xi-eyebrow hover:text-primary transition-colors">
                Research Hub <ChevronRight size={14} />
              </Link>
              <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Topic Hub</span>
            </div>
            <h1 className="text-primary font-serif italic tracking-tighter">{currentTheme.title}</h1>
            <p className="text-lg text-text-muted leading-relaxed">
              {currentTheme.description}
            </p>
          </div>
        </div>
      </section>

      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto py-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-20">
          
          {/* Left Column: Topic Intelligence Indicators */}
          <div className="lg:col-span-1 space-y-12">
            <div>
              <div className="xi-eyebrow mb-8 border-b border-gray-200 w-full pb-4">Pillar Indicators</div>
              <div className="space-y-4">
                {currentTheme.indicators.map((indicator, i) => (
                  <div key={i} className="xi-card">
                    <div className="xi-card__body py-4">
                      <span className="block text-[9px] font-black text-text-muted uppercase tracking-widest italic mb-1">Active Monitoring</span>
                      <span className="block text-xs font-black text-primary uppercase tracking-tight">{indicator}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="xi-card border-l-4 border-l-primary shadow-lg">
              <div className="xi-card__body">
                <Activity size={24} className="text-primary mb-6" />
                <h4 className="font-serif font-black italic text-lg mb-4">Intelligence Access</h4>
                <p className="text-[10px] text-text-muted mb-8 italic">Access live analytical dashboards and geospatial monitoring related to this pillar.</p>
                <Link href="/intelligence" className="btn btn-primary w-full text-[10px]">
                  Launch Intelligence Suite <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          {/* Center Column: Research Outputs */}
          <div className="lg:col-span-3 space-y-12">
            <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-8">
              <h2 className="text-3xl font-serif font-black text-primary italic">Thematic Publications</h2>
              <span className="text-[10px] font-black text-primary/60 uppercase tracking-widest italic">{themePublications.length} Outputs Found</span>
            </div>

            <div className="grid grid-cols-1 gap-12">
              {themePublications.length > 0 ? (
                themePublications.map(pub => (
                  <PublicationCard key={pub.id} publication={pub} />
                ))
              ) : (
                <div className="p-20 border-2 border-dashed border-gray-100 text-center">
                  <p className="font-serif font-bold text-gray-200 italic text-2xl">No active publications for this pillar.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

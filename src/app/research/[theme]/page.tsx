"use client";

import { use } from "react";
import { ArrowLeft, Filter, Download, TrendingUp, Globe, Shield, Activity, Target } from "lucide-react";
import Link from "next/link";
import PublicationCard from "@/components/research/PublicationCard";

const THEMES: Record<string, { title: string; icon: React.ElementType }> = {
  "macro-economics": { title: "Macro-Economics", icon: TrendingUp },
  "climate-systems": { title: "Climate Systems", icon: Globe },
  "security-strategy": { title: "Security Strategy", icon: Shield },
  "digital-transformation": { title: "Digital Systems", icon: Activity },
};

const MOCK_PUBS = [
  {
    id: 'pub-001',
    title: 'The Geopolitics of Red Sea Port Security',
    type: 'Strategic Dossier',
    date: '2026-Q1',
    author: 'FALAG Ops Team',
    theme: 'Security Strategy',
    readTime: '18 min',
    classification: 'UNCLASSIFIED',
    slug: 'geopolitics-red-sea-port-security'
  },
  {
    id: 'pub-002',
    title: 'Climate-Induced Migration Patterns in the Horn',
    type: 'Analytical Brief',
    date: '2025-Q4',
    author: 'Dr. S. Ahmed',
    theme: 'Climate Systems',
    readTime: '12 min',
    classification: 'UNCLASSIFIED',
    slug: 'climate-migration-horn'
  }
];

export default function ThemePage({ params }: { params: Promise<{ theme: string }> }) {
  const resolvedParams = use(params);
  const themeData = THEMES[resolvedParams.theme] || { title: "Research Theme", icon: Target };
  const Icon = themeData.icon;

  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="max-w-content py-12">
        <Link href="/research" className="inline-flex items-center gap-2 text-xs font-semibold text-text-muted hover:text-primary uppercase tracking-widest transition-colors mb-12">
          <ArrowLeft size={14} /> Back to Repository
        </Link>
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16 pb-12 border-b border-border">
          <div>
            <div className="xi-eyebrow flex items-center gap-2 mb-4">
              <Icon size={14} className="text-primary" /> Strategic Pillar
            </div>
            <h1 className="text-5xl font-bold text-text-main uppercase tracking-tight mb-4">{themeData.title}</h1>
            <p className="text-text-secondary font-normal tracking-wide max-w-2xl leading-relaxed">
              Archived dossiers, intelligence briefs, and datasets pertaining to {themeData.title.toLowerCase()}.
            </p>
          </div>
          
          <div className="flex gap-4">
            <button className="btn-outline">
              <Filter size={14} className="mr-2" /> Refine
            </button>
            <button className="btn-primary">
              <Download size={14} className="mr-2" /> Export
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_PUBS.map(pub => (
            <PublicationCard key={pub.id} publication={pub} />
          ))}
          {MOCK_PUBS.map(pub => (
            <PublicationCard key={pub.id + '-dup'} publication={{...pub, id: pub.id + '-dup'}} />
          ))}
        </div>
      </div>
    </div>
  );
}

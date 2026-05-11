"use client";

import { Search, Filter, BookOpen, Download, Terminal } from "lucide-react";
import Link from "next/link";
import PublicationCard from "@/components/research/PublicationCard";
import ThemesGrid from "@/components/research/ThemesGrid";

// MOCK DATA for Research
const PUBLICATIONS = [
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
  },
  {
    id: 'pub-003',
    title: 'Inflationary Pressures on Core Commodities',
    type: 'Economic Assessment',
    date: '2025-Q4',
    author: 'FALAG Economics',
    theme: 'Macro-Economics',
    readTime: '24 min',
    classification: 'INTERNAL',
    slug: 'inflation-core-commodities'
  }
];

export default function ResearchHub() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. STRATEGIC HEADER */}
      <section className="pt-32 pb-16 border-b border-border bg-surface relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.02] pointer-events-none" />
        <div className="max-w-content relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
            <div className="max-w-3xl">
              <div className="xi-eyebrow flex items-center gap-2">
                 <Terminal size={14} /> Knowledge Repository
              </div>
              <h1 className="text-5xl font-bold text-text-main uppercase tracking-tight leading-none mb-6">
                Research <span className="text-primary">Archive</span>.
              </h1>
              <p className="text-base text-text-secondary font-normal tracking-wide leading-relaxed">
                Access peer-reviewed strategic dossiers, open-source intelligence briefs, and quantitative economic models structured for institutional policy design.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex-1 py-16 bg-background">
        <div className="max-w-content">
          <div className="grid grid-cols-12 gap-12">
            
            {/* LEFT: THEMATIC INDEX & FILTERS */}
            <div className="col-span-12 lg:col-span-3 space-y-12">
              {/* Search Console */}
              <div className="xi-card p-6 bg-surface-elevated border-border sticky top-32">
                <div className="flex items-center gap-3 border-b border-border pb-4 mb-6">
                  <Search size={16} className="text-text-muted" />
                  <input 
                    type="text" 
                    placeholder="QUERY DATABASE..." 
                    className="bg-transparent border-none outline-none text-xs font-semibold text-text-main w-full placeholder:text-text-muted tracking-widest uppercase"
                  />
                </div>
                
                <h4 className="text-[10px] font-semibold text-text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Filter size={14} /> Filter Matrices
                </h4>
                
                <div className="space-y-6">
                  <div>
                    <h5 className="text-[11px] font-bold text-text-main uppercase tracking-widest mb-3">Classification</h5>
                    <div className="space-y-2">
                      {['All Documents', 'Unclassified', 'Internal', 'Restricted'].map((level) => (
                        <label key={level} className="flex items-center gap-3 cursor-pointer group">
                          <div className="w-3 h-3 border border-border group-hover:border-primary transition-colors flex items-center justify-center">
                            {level === 'All Documents' && <div className="w-1.5 h-1.5 bg-primary" />}
                          </div>
                          <span className="text-xs font-medium text-text-secondary group-hover:text-text-main transition-colors">{level}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-[11px] font-bold text-text-main uppercase tracking-widest mb-3">Document Type</h5>
                    <div className="space-y-2">
                      {['Strategic Dossiers', 'Analytical Briefs', 'Data Models', 'Field Reports'].map((type) => (
                        <label key={type} className="flex items-center gap-3 cursor-pointer group">
                          <div className="w-3 h-3 border border-border group-hover:border-primary transition-colors" />
                          <span className="text-xs font-medium text-text-secondary group-hover:text-text-main transition-colors">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: PUBLICATION FEED */}
            <div className="col-span-12 lg:col-span-9 space-y-12">
              
              {/* Highlighted/Latest Release */}
              <div className="xi-card p-10 bg-surface border-border flex flex-col md:flex-row gap-10 items-center">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-risk-critical/20 text-risk-critical text-[10px] font-bold uppercase tracking-widest border border-risk-critical/30">
                      Urgent Brief
                    </span>
                    <span className="text-[10px] font-medium text-text-muted uppercase tracking-widest">Released: 24h Ago</span>
                  </div>
                  <h2 className="text-3xl font-bold text-text-main uppercase tracking-tight mb-4">
                    Maritime Supply Chain Vulnerabilities
                  </h2>
                  <p className="text-sm text-text-secondary font-normal leading-relaxed mb-8">
                    An urgent assessment of recent disruptions in the Bab-el-Mandeb strait and their direct inflationary impact on primary commodity markets in the Horn.
                  </p>
                  <div className="flex gap-4">
                    <Link href={`/research/reports/maritime-vulnerabilities`} className="btn-primary">
                      <BookOpen size={14} className="mr-2" /> Read Dossier
                    </Link>
                    <button className="btn-outline">
                      <Download size={14} />
                    </button>
                  </div>
                </div>
                <div className="w-full md:w-64 h-64 bg-surface-elevated border border-border flex items-center justify-center text-text-muted">
                   <span className="text-[10px] font-semibold uppercase tracking-widest">Document Preview</span>
                </div>
              </div>

              {/* Grid of Standard Publications */}
              <div>
                <div className="flex justify-between items-end mb-6 border-b border-border pb-4">
                  <h3 className="text-lg font-bold text-text-main uppercase tracking-widest">Archive Feed</h3>
                  <span className="text-xs font-semibold text-text-muted uppercase tracking-widest">Showing 24 Documents</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {PUBLICATIONS.map((pub) => (
                    <PublicationCard key={pub.id} publication={pub} />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* THEMATIC EXPLORATION */}
      <section className="py-24 border-t border-border bg-surface">
        <div className="max-w-content">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text-main uppercase tracking-tight mb-4">Explore by Strategic Pillar</h2>
            <p className="text-sm text-text-secondary font-normal">Navigate the repository through our core analytical vectors.</p>
          </div>
          <ThemesGrid />
        </div>
      </section>

    </div>
  );
}

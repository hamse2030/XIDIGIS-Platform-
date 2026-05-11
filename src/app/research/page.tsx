"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { publications, type ContentMetadata } from "@/lib/content/publications";
import PublicationCard from "@/components/research/PublicationCard";
import { BookOpen, FileText, Newspaper, ChevronRight, Search, SlidersHorizontal, Terminal, Database, Globe } from "lucide-react";
import Link from "next/link";
import Fuse from "fuse.js";

const THEMES = [
  { key: "all", label: "All Repositories" },
  { key: "economics", label: "Macro-Economics" },
  { key: "climate", label: "Climate Systems" },
  { key: "security", label: "Strategic Security" },
  { key: "technology", label: "Digital Sovereignty" },
];

const TYPES = ["All", "Paper", "Brief", "Report"];

export default function ResearchHub() {
  const [activeTheme, setActiveTheme] = useState("all");
  const [activeType, setActiveType] = useState("All");
  const [query, setQuery] = useState("");
  const [dynamicPublications, setDynamicPublications] = useState<ContentMetadata[]>([]);

  useEffect(() => {
    async function fetchDocs() {
      try {
        const response = await fetch('/api/publications');
        const result = await response.json();
        if (result.success) {
          setDynamicPublications(result.data);
        }
      } catch {
        console.error("Failed to synchronize with research stream.");
      }
    }
    fetchDocs();
  }, []);

  const displayPublications = dynamicPublications.length > 0 ? dynamicPublications : publications;

  const fuse = new Fuse(displayPublications, {
    keys: ["title", "abstract", "summary", "tags"],
    threshold: 0.35,
    distance: 100,
    ignoreLocation: true
  });

  const filtered = displayPublications.filter((p) => {
    const matchTheme = activeTheme === "all" || p.theme === activeTheme;
    const matchType = activeType === "All" || p.type === activeType;
    
    if (query.trim() === "") {
      return matchTheme && matchType;
    }

    const searchResults = fuse.search(query);
    const matchQuery = searchResults.some(result => result.item.id === p.id);
    
    return matchTheme && matchType && matchQuery;
  });

  const stats = [
    { label: "INDEXED OUTPUTS", value: displayPublications.length, icon: Database },
    { label: "STRATEGIC BRIEFS", value: displayPublications.filter((p) => p.type === "Brief").length, icon: Terminal },
    { label: "EMPIRICAL PAPERS", value: displayPublications.filter((p) => p.type === "Paper").length, icon: FileText },
    { label: "SYSTEM REPORTS", value: displayPublications.filter((p) => p.type === "Report").length, icon: BookOpen },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. STRATEGIC HERO (Light Mode) */}
      <section className="pt-40 pb-24 border-b border-border bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none" />
        <div className="max-w-content relative z-10">
          <div className="max-w-4xl">
            <div className="xi-eyebrow">
              <BookOpen size={14} className="text-primary" /> Institutional Knowledge Core
            </div>
            <h1 className="text-6xl font-display font-black text-navy-950 uppercase tracking-tight leading-none mb-10">
              Analytical <span className="text-primary">Repository</span> & <br /> 
              Strategic <span className="text-navy-700/40">Analysis.</span>
            </h1>
            <p className="text-lg text-text-dim leading-relaxed mb-16 font-medium max-w-2xl">
              A high-fidelity archive of FALAG analytical outputs, policy frameworks, and regional system reports — all synthesized from empirical field data and institutional expertise.
            </p>
            
            {/* System Stats Matrix */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-12 border-t border-border">
              {stats.map((s, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-4xl font-display font-black text-navy-950 mb-2">{s.value}</span>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-text-dim flex items-center gap-2">
                     <s.icon size={10} className="text-primary/50" /> {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. FILTER & SEARCH INTERFACE (Light Mode) */}
      <section className="sticky top-20 z-40 bg-white/90 backdrop-blur-xl border-b border-border shadow-sm">
        <div className="max-w-content py-6 flex flex-col md:flex-row items-center gap-8">
          {/* Search Module */}
          <div className="relative flex-1 w-full">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" />
            <input
              type="text"
              placeholder="SEARCH BY TITLE, THEME, OR IDENTIFIER..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-surface-alt border border-border text-[11px] font-mono font-bold text-navy-950 uppercase tracking-widest focus:outline-none focus:border-primary transition-all"
            />
          </div>

          {/* Type Selector */}
          <div className="flex items-center gap-3">
            <SlidersHorizontal size={14} className="text-text-dim mr-2" />
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setActiveType(t)}
                className={`px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-widest transition-all border ${
                  activeType === t
                    ? "bg-navy-950 text-white border-navy-950 shadow-sm"
                    : "bg-transparent text-text-dim border-border hover:border-primary/50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Theme Matrix Tabs */}
        <div className="max-w-content flex gap-0 overflow-x-auto border-t border-border">
          {THEMES.map((th) => (
            <button
              key={th.key}
              onClick={() => setActiveTheme(th.key)}
              className={`px-8 py-4 text-[10px] font-mono font-bold uppercase tracking-[0.2em] border-b-2 transition-all whitespace-nowrap ${
                activeTheme === th.key
                  ? "border-primary text-primary bg-primary/5"
                  : "border-transparent text-text-dim hover:text-navy-950"
              }`}
            >
              {th.label}
            </button>
          ))}
        </div>
      </section>

      {/* 3. REPOSITORY OUTPUTS (Light Mode) */}
      <section className="py-24 bg-surface-alt/20 flex-1 relative">
        <div className="max-w-content relative z-10">
          <div className="flex justify-between items-center mb-16">
            <div className="flex items-center gap-3 text-[10px] font-mono font-bold text-primary uppercase tracking-[0.3em]">
               <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
               QUERY RESULTS: {filtered.length} OBJECT{filtered.length !== 1 ? "S" : ""} IDENTIFIED
            </div>
            <div className="flex gap-8">
              {THEMES.slice(1).map((th) => (
                <Link
                  key={th.key}
                  href={`/themes/${th.key}`}
                  className="text-[10px] font-mono font-bold text-text-dim uppercase tracking-widest hover:text-primary flex items-center gap-2 transition-all group"
                >
                  {th.label} <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filtered.map((pub, i) => (
                <motion.div
                  key={pub.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <PublicationCard publication={pub} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-40 text-center border border-dashed border-border bg-white">
              <Globe size={56} className="mx-auto text-border mb-8 opacity-30" />
              <h3 className="text-3xl font-display font-black text-navy-950 uppercase tracking-tight mb-6">No Matching Artifacts</h3>
              <p className="text-text-dim font-medium max-w-sm mx-auto mb-10">Adjust your system filters or query parameters to locate strategic outputs.</p>
              <button 
                onClick={() => { setQuery(""); setActiveTheme("all"); setActiveType("All"); }}
                className="btn-outline text-[10px]"
              >
                Reset System Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

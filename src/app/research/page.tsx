"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { publications, type ContentMetadata } from "@/lib/content/publications";
import PublicationCard from "@/components/research/PublicationCard";
import { BookOpen, FileText, Newspaper, ChevronRight, Search, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

const THEMES = [
  { key: "all", label: "All Outputs" },
  { key: "economics", label: "Development Economics" },
  { key: "climate", label: "Climate Risk" },
  { key: "security", label: "Security" },
  { key: "technology", label: "Technology" },
];

const TYPES = ["All", "Paper", "Brief", "Report"];

export default function ResearchHub() {
  const [activeTheme, setActiveTheme] = useState("all");
  const [activeType, setActiveType] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = publications.filter((p) => {
    const matchTheme = activeTheme === "all" || p.theme === activeTheme;
    const matchType = activeType === "All" || p.type === activeType;
    const matchQuery =
      !query ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.abstract.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
    return matchTheme && matchType && matchQuery;
  });

  const stats = [
    { label: "Total Outputs", value: publications.length, icon: BookOpen },
    { label: "Policy Briefs", value: publications.filter((p) => p.type === "Brief").length, icon: Newspaper },
    { label: "Research Papers", value: publications.filter((p) => p.type === "Paper").length, icon: FileText },
    { label: "Full Reports", value: publications.filter((p) => p.type === "Report").length, icon: BookOpen },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="bg-primary text-white py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-[2px] bg-secondary" />
              <span className="text-secondary font-black uppercase tracking-[0.3em] text-xs italic">Knowledge Repository</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-serif font-black mb-8 italic tracking-tighter leading-[0.85]">
              Research<br />Hub
            </h1>
            <p className="text-xl text-white/70 max-w-2xl font-medium italic leading-relaxed">
              Comprehensive archive of XIDIGIS policy papers, strategic briefs, and analytical reports — all grounded in empirical data.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-12 border-t border-white/10">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <span className="block text-5xl font-serif font-black italic text-white mb-2">{s.value}</span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 italic">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="sticky top-20 z-40 bg-white dark:bg-slate-900 border-b border-secondary/10 shadow-sm">
        <div className="container mx-auto px-6 py-5 flex flex-col md:flex-row items-center gap-6">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" />
            <input
              type="text"
              placeholder="Search by title, topic, or tag..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-accent/30 border border-secondary/10 text-sm text-primary font-medium italic placeholder-primary/30 focus:outline-none focus:border-secondary"
            />
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={14} className="text-primary/40" />
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setActiveType(t)}
                className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest italic transition-all ${
                  activeType === t
                    ? "bg-primary text-white"
                    : "bg-accent/30 text-primary/60 hover:text-primary"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Theme Tabs */}
        <div className="container mx-auto px-6 flex gap-0 overflow-x-auto border-t border-secondary/10">
          {THEMES.map((th) => (
            <button
              key={th.key}
              onClick={() => setActiveTheme(th.key)}
              className={`px-6 py-4 text-[10px] font-black uppercase tracking-widest italic whitespace-nowrap border-b-2 transition-all ${
                activeTheme === th.key
                  ? "border-secondary text-primary"
                  : "border-transparent text-primary/40 hover:text-primary"
              }`}
            >
              {th.label}
            </button>
          ))}
        </div>
      </section>

      {/* Results */}
      <section className="py-20 bg-accent/10 flex-1">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <span className="text-xs font-black text-secondary uppercase tracking-widest italic">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""} found
            </span>
            <div className="flex gap-3">
              {THEMES.slice(1).map((th) => (
                <Link
                  key={th.key}
                  href={`/themes/${th.key}`}
                  className="text-[10px] font-black text-primary/40 uppercase tracking-widest italic hover:text-secondary flex items-center gap-1 transition-colors"
                >
                  {th.label} <ChevronRight size={10} />
                </Link>
              ))}
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
              {filtered.map((pub, i) => (
                <motion.div
                  key={pub.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <PublicationCard publication={pub} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-32 text-center border-2 border-dashed border-secondary/20">
              <BookOpen size={48} className="mx-auto text-primary/20 mb-6" />
              <p className="font-serif font-black text-primary/30 italic text-3xl">No results match your search.</p>
              <button onClick={() => { setQuery(""); setActiveTheme("all"); setActiveType("All"); }}
                className="mt-8 text-xs font-black text-secondary uppercase tracking-widest italic hover:underline">
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { publications, type ContentMetadata } from "@/lib/content/publications";
import PublicationCard from "@/components/research/PublicationCard";
import { BookOpen, FileText, Newspaper, ChevronRight, Search, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import Fuse from "fuse.js";

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

  const fuse = new Fuse(publications, {
    keys: ["title", "abstract", "summary", "tags"],
    threshold: 0.35,
    distance: 100,
    ignoreLocation: true
  });

  const filtered = publications.filter((p) => {
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
    { label: "Total Outputs", value: publications.length, icon: BookOpen },
    { label: "Policy Briefs", value: publications.filter((p) => p.type === "Brief").length, icon: Newspaper },
    { label: "Research Papers", value: publications.filter((p) => p.type === "Paper").length, icon: FileText },
    { label: "Full Reports", value: publications.filter((p) => p.type === "Report").length, icon: BookOpen },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="section bg-surface-alt pt-32 pb-16 border-b border-gray-100">
        <div className="container mx-auto">
          <div className="max-w-4xl">
            <div className="xi-eyebrow">
              <BookOpen size={14} className="text-primary" /> Institutional Research Repository
            </div>
            <h1 className="text-primary font-serif italic tracking-tighter">Publications & Strategic Analysis</h1>
            <p className="text-lg text-text-muted leading-relaxed mb-12">
              Comprehensive archive of XIDIGIS policy papers, strategic briefs, and analytical reports — all grounded in empirical data and regional expertise.
            </p>
            
            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-gray-100">
              {stats.map((s, i) => (
                <div key={i}>
                  <span className="block text-4xl font-serif font-black italic text-primary mb-1">{s.value}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto py-4 flex flex-col md:flex-row items-center gap-6">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search by title, topic, or tag..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-border text-sm text-primary font-medium focus:outline-none focus:border-primary rounded-sm"
            />
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={12} className="text-text-muted" />
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setActiveType(t)}
                className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest transition-all rounded-sm ${
                  activeType === t
                    ? "bg-primary text-white"
                    : "bg-surface-alt text-text-muted hover:text-primary border border-border"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Theme Tabs */}
        <div className="container mx-auto flex gap-0 overflow-x-auto border-t border-gray-100">
          {THEMES.map((th) => (
            <button
              key={th.key}
              onClick={() => setActiveTheme(th.key)}
              className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest border-b-2 transition-all whitespace-nowrap ${
                activeTheme === th.key
                  ? "border-primary text-primary"
                  : "border-transparent text-text-muted hover:text-primary"
              }`}
            >
              {th.label}
            </button>
          ))}
        </div>
      </section>

      {/* Results */}
      <section className="section bg-white flex-1">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-12">
            <span className="text-[10px] font-black text-primary/60 uppercase tracking-widest italic">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""} found
            </span>
            <div className="flex gap-4">
              {THEMES.slice(1).map((th) => (
                <Link
                  key={th.key}
                  href={`/themes/${th.key}`}
                  className="text-[10px] font-black text-text-muted uppercase tracking-widest hover:text-primary flex items-center gap-1 transition-colors"
                >
                  {th.label} <ChevronRight size={10} />
                </Link>
              ))}
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
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
            <div className="py-32 text-center border-2 border-dashed border-gray-100 rounded">
              <BookOpen size={48} className="mx-auto text-gray-200 mb-6" />
              <p className="font-serif font-black text-gray-300 italic text-3xl">No results match your search.</p>
              <button onClick={() => { setQuery(""); setActiveTheme("all"); setActiveType("All"); }}
                className="mt-8 text-xs font-black text-primary uppercase tracking-widest hover:underline">
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

"use client";

import { use } from "react";
import { publications } from "@/lib/content/publications";
import { ChevronLeft, Download, Share2, BookOpen, Clock, Tag, User, MapPin, Terminal, Database, Shield } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ReportDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const report = publications.find(p => p.slug === slug);

  if (!report) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <Terminal className="mx-auto text-primary mb-6" size={48} />
          <p className="text-xl font-display font-bold text-white uppercase tracking-tight">Artifact Not Found in Archive.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. STRATEGIC NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-950/80 backdrop-blur-xl border-b border-border-subtle">
        <div className="max-w-content h-20 flex items-center justify-between">
          <Link href="/research" className="flex items-center gap-3 text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-text-dim hover:text-primary transition-all group">
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Core
          </Link>
          <div className="flex gap-4">
             <button className="px-5 py-2.5 border border-border-subtle text-[10px] font-mono font-bold text-text-dim uppercase tracking-widest hover:border-primary/40 hover:text-white transition-all">
               <Share2 size={14} className="mr-2 inline" /> Share
             </button>
             <button className="btn-primary py-2.5 px-6">
               <Download size={14} className="mr-2 inline" /> Download Protocol (PDF)
             </button>
          </div>
        </div>
      </nav>

      {/* 2. INSTITUTIONAL MASTHEAD */}
      <header className="pt-48 pb-24 border-b border-border-subtle relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none" />
        <div className="max-w-content relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex gap-4 mb-10">
               <span className="px-3 py-1 border border-primary text-primary text-[9px] font-mono font-bold uppercase tracking-widest bg-primary/5">{report.type}</span>
               <span className="px-3 py-1 border border-border-subtle text-text-dim text-[9px] font-mono font-bold uppercase tracking-widest">{report.category}</span>
            </div>
            
            <h1 className="text-6xl font-display font-black text-white uppercase tracking-tight mb-12 leading-[1.1] max-w-5xl">
              {report.title}
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-10 border-y border-border-subtle">
              <div className="space-y-3">
                <span className="text-[10px] font-mono font-bold uppercase text-text-dim tracking-[0.3em] block">Principal Author</span>
                <span className="text-sm font-display font-bold text-white flex items-center gap-3 uppercase tracking-tight"><User size={16} className="text-primary/40" /> {report.author}</span>
              </div>
              <div className="space-y-3">
                <span className="text-[10px] font-mono font-bold uppercase text-text-dim tracking-[0.3em] block">Release Date</span>
                <span className="text-sm font-display font-bold text-white flex items-center gap-3 uppercase tracking-tight"><Clock size={16} className="text-primary/40" /> {report.date}</span>
              </div>
              <div className="space-y-3">
                <span className="text-[10px] font-mono font-bold uppercase text-text-dim tracking-[0.3em] block">Regional Vector</span>
                <span className="text-sm font-display font-bold text-white flex items-center gap-3 uppercase tracking-tight"><MapPin size={16} className="text-primary/40" /> {report.region}</span>
              </div>
              <div className="space-y-3">
                <span className="text-[10px] font-mono font-bold uppercase text-text-dim tracking-[0.3em] block">Data Fidelity</span>
                <span className="text-sm font-display font-bold text-white flex items-center gap-3 uppercase tracking-tight"><Database size={16} className="text-primary/40" /> {report.dataSources.length} SOURCES</span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* 3. EXECUTIVE ANALYSIS */}
      <main className="py-32 bg-background relative">
        <div className="max-w-content grid grid-cols-12 gap-20">
          
          <div className="col-span-12 lg:col-span-8 space-y-24">
            <section>
              <h2 className="text-3xl font-display font-bold text-white uppercase tracking-tight mb-8">Executive Summary</h2>
              <p className="text-2xl font-medium text-text-dim leading-relaxed tracking-wide border-l-2 border-l-primary pl-10 py-6 bg-surface/30">
                {report.summary}
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-display font-bold text-white uppercase tracking-tight mb-8">Strategic Abstract</h2>
              <div className="space-y-8">
                <p className="text-md text-text-dim leading-relaxed font-medium tracking-wide">
                  {report.abstract}
                </p>
                <p className="text-md text-text-dim leading-relaxed font-medium tracking-wide opacity-80">
                  The primary objective of this institutional study is to address the multifaceted challenges within the {report.category.toLowerCase()} framework. By leveraging proprietary datasets and high-fidelity regional monitoring, our analytical team identifies critical inflection points that will shape {report.region} over the next strategic cycle.
                </p>
              </div>
            </section>

            <section className="p-10 bg-surface border border-border-subtle group hover:border-primary/20 transition-all">
               <h3 className="text-[11px] font-mono font-bold uppercase tracking-[0.4em] text-primary mb-8 flex items-center gap-3">
                  <Terminal size={14} /> Methodological Framework
               </h3>
               <p className="text-sm text-text-dim leading-relaxed font-medium tracking-wide">
                 {report.methodology}
               </p>
            </section>
          </div>

          <aside className="col-span-12 lg:col-span-4 space-y-16">
            <div>
              <h3 className="text-[11px] font-mono font-bold uppercase tracking-[0.4em] text-white mb-10 border-b border-border-subtle pb-6 flex items-center gap-3">
                 <Database size={14} className="text-primary/40" /> System Inputs
              </h3>
              <div className="flex flex-wrap gap-3">
                {report.dataSources.map((source, i) => (
                  <span key={i} className="px-4 py-2 border border-border-subtle text-[10px] font-mono font-bold text-text-dim uppercase tracking-widest hover:border-primary/30 transition-all">
                    {source}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-mono font-bold uppercase tracking-[0.4em] text-white mb-10 border-b border-border-subtle pb-6 flex items-center gap-3">
                 <Tag size={14} className="text-primary/40" /> Taxonomy
              </h3>
              <div className="flex flex-wrap gap-3">
                {report.tags.map((tag, i) => (
                  <span key={i} className="flex items-center gap-2 px-4 py-2 bg-navy-950 border border-border-subtle text-[10px] font-mono font-bold text-primary uppercase tracking-widest transition-all hover:bg-primary/5">
                    <Tag size={12} className="opacity-50" /> {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-10 bg-surface border-l-2 border-l-primary shadow-glow">
               <div className="flex items-center gap-4 mb-6">
                  <Shield size={20} className="text-primary" />
                  <h3 className="text-xl font-display font-bold text-white uppercase tracking-tight">Institutional Access</h3>
               </div>
               <p className="text-sm text-text-dim font-medium leading-relaxed mb-10 tracking-wide">Full datasets and econometric models used in this report are available for authenticated institutional partners.</p>
               <button className="btn-primary w-full shadow-glow">Request Access Protocol</button>
            </div>
          </aside>

        </div>
      </main>

      {/* 4. FOOTER (Intelligence Grade) */}
      <footer className="py-20 border-t border-border-subtle bg-navy-950/50 text-center">
         <div className="max-w-content">
            <p className="text-[10px] font-mono font-bold text-text-dim uppercase tracking-[0.4em]">© 2026 FALAG STRATEGIC RESEARCH SERIES // INTERNAL USE ONLY</p>
         </div>
      </footer>
    </div>
  );
}

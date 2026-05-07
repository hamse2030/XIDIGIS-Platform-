"use client";

import { use, useState, useEffect } from "react";
import { publications } from "@/lib/content/publications";
import { ChevronLeft, Download, Share2, BookOpen, Clock, Tag, User, MapPin } from "lucide-react";
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
      <div className="flex items-center justify-center min-h-screen">
        <p className="font-serif italic text-primary">Report not found in archive.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Header Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/research" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-primary transition-colors">
            <ChevronLeft size={14} /> Back to Repository
          </Link>
          <div className="flex gap-4">
             <button className="btn btn-outline py-2 px-4 text-[10px] border-gray-100">
               <Share2 size={12} /> Share Analysis
             </button>
             <button className="btn btn-primary py-2 px-4 text-[10px]">
               <Download size={12} /> Download PDF
             </button>
          </div>
        </div>
      </nav>

      {/* 2. Institutional Masthead */}
      <header className="pt-40 pb-24 bg-surface-alt border-b border-gray-100">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex gap-3 mb-8">
               <span className="xi-badge">{report.type}</span>
               <span className="xi-badge xi-badge--blue">{report.category}</span>
            </div>
            
            <h1 className="text-primary font-serif italic tracking-tighter mb-8 leading-tight">
              {report.title}
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-gray-200/50">
              <div className="space-y-1">
                <span className="text-[9px] font-black uppercase text-text-muted tracking-widest block">Principal Author</span>
                <span className="text-xs font-bold text-primary flex items-center gap-2 italic"><User size={12} className="text-primary/40" /> {report.author}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-black uppercase text-text-muted tracking-widest block">Publication Date</span>
                <span className="text-xs font-bold text-primary flex items-center gap-2 italic"><Clock size={12} className="text-primary/40" /> {report.date}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-black uppercase text-text-muted tracking-widest block">Regional Focus</span>
                <span className="text-xs font-bold text-primary flex items-center gap-2 italic"><MapPin size={12} className="text-primary/40" /> {report.region}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-black uppercase text-text-muted tracking-widest block">Data Rigor</span>
                <span className="text-xs font-bold text-primary flex items-center gap-2 italic"><BookOpen size={12} className="text-primary/40" /> {report.dataSources.length} Sources</span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* 3. Executive Summary & Analysis */}
      <main className="py-24">
        <div className="container mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-serif font-black text-primary italic mb-6">Executive Summary</h2>
              <p className="text-lg text-text-muted leading-relaxed italic border-l-4 border-l-primary pl-8 py-4 bg-surface-alt">
                {report.summary}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-black text-primary italic mb-6">Strategic Abstract</h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-text-muted text-sm leading-loose">
                  {report.abstract}
                </p>
                <p className="text-text-muted text-sm leading-loose mt-4">
                  The primary objective of this institutional study is to address the multifaceted challenges within the {report.category.toLowerCase()} framework. By leveraging proprietary datasets and high-fidelity regional monitoring, our research team identifies critical inflection points that will shape {report.region} over the next strategic cycle.
                </p>
              </div>
            </section>

            <section className="p-8 bg-surface-alt border border-border rounded-sm">
               <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-6">Methodological Framework</h3>
               <p className="text-xs text-text-muted leading-relaxed italic">
                 {report.methodology}
               </p>
            </section>
          </div>

          <aside className="space-y-12">
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-6 border-b border-gray-100 pb-4">Data Sources</h3>
              <div className="flex flex-wrap gap-2">
                {report.dataSources.map((source, i) => (
                  <span key={i} className="px-3 py-1 bg-white border border-border text-[9px] font-bold text-text-muted uppercase tracking-widest">
                    {source}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-6 border-b border-gray-100 pb-4">Taxonomy</h3>
              <div className="flex flex-wrap gap-2">
                {report.tags.map((tag, i) => (
                  <span key={i} className="flex items-center gap-1 px-3 py-1 bg-surface-alt text-[9px] font-black text-primary uppercase tracking-widest italic">
                    <Tag size={10} /> {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 bg-primary text-white rounded shadow-xl">
               <h3 className="text-sm font-serif italic font-black mb-4">Institutional Access</h3>
               <p className="text-[10px] opacity-80 leading-relaxed mb-6">Full datasets and econometric models used in this report are available for registered institutional partners.</p>
               <button className="w-full py-3 bg-white text-primary text-[10px] font-black uppercase tracking-widest rounded-sm">Request Dataset Access</button>
            </div>
          </aside>

        </div>
      </main>

      {/* 4. Footer Placeholder */}
      <footer className="py-12 border-t border-gray-100 bg-surface-alt text-center">
         <div className="container mx-auto">
            <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">© 2026 XIDIGIS Strategic Research Series — Institutional Copy</p>
         </div>
      </footer>
    </div>
  );
}

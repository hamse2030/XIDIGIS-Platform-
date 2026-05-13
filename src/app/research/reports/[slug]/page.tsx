"use client";


import { ArrowLeft, Download, Share2, Clock, ShieldAlert, Bookmark } from "lucide-react";
import Link from "next/link";

export default function ReportDetail() {
  
  return (
    <div className="min-h-screen bg-background pt-24 pb-32">
      {/* HEADER */}
      <section className="bg-surface border-b border-border py-16 relative overflow-hidden">
         <div className="absolute inset-0 bg-grid opacity-[0.02] pointer-events-none" />
         <div className="max-w-4xl mx-auto px-6 relative z-10">
            <Link href="/research" className="inline-flex items-center gap-2 text-xs font-semibold text-text-muted hover:text-primary uppercase tracking-widest transition-colors mb-10">
               <ArrowLeft size={14} /> Back to Archive
            </Link>
            
            <div className="flex items-center gap-4 mb-6">
               <span className="px-3 py-1 bg-risk-critical/10 text-risk-critical text-[10px] font-bold uppercase tracking-widest border border-risk-critical/30">
                 UNCLASSIFIED
               </span>
               <span className="text-[10px] font-medium text-text-muted uppercase tracking-widest">Dossier // 2026-Q1</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-text-main uppercase tracking-tight leading-tight mb-8">
               Maritime Supply Chain Vulnerabilities in the Red Sea
            </h1>

            <div className="flex flex-wrap items-center gap-8 border-t border-border pt-8">
               <div>
                  <p className="text-[10px] font-medium text-text-muted uppercase tracking-widest mb-1">Author</p>
                  <p className="text-xs font-bold text-text-main uppercase tracking-widest">FALAG Ops Team</p>
               </div>
               <div>
                  <p className="text-[10px] font-medium text-text-muted uppercase tracking-widest mb-1">Vector</p>
                  <p className="text-xs font-bold text-text-main uppercase tracking-widest">Security Strategy</p>
               </div>
               <div>
                  <p className="text-[10px] font-medium text-text-muted uppercase tracking-widest mb-1">Read Time</p>
                  <p className="text-xs font-bold text-text-main uppercase tracking-widest flex items-center gap-2"><Clock size={12}/> 18 Min</p>
               </div>
               <div className="flex-1 flex justify-end gap-3">
                  <button className="p-3 border border-border text-text-muted hover:text-text-main hover:bg-surface-elevated transition-colors">
                     <Bookmark size={16} />
                  </button>
                  <button className="p-3 border border-border text-text-muted hover:text-text-main hover:bg-surface-elevated transition-colors">
                     <Share2 size={16} />
                  </button>
                  <button className="btn-primary flex items-center gap-2">
                     <Download size={14} /> Download PDF
                  </button>
               </div>
            </div>
         </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-4xl mx-auto px-6 py-16">
         <div className="prose prose-invert prose-slate max-w-none prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
            <h2 className="text-2xl font-bold text-text-main uppercase tracking-tight mb-6">Executive Summary</h2>
            <p className="text-base text-text-secondary font-normal leading-relaxed mb-8">
               The recent escalation of asymmetric naval operations in the Bab-el-Mandeb strait has fundamentally altered the risk calculus for maritime logistics routing through the Suez Canal. This dossier synthesizes quantitative trade flow data with qualitative regional security assessments to project the medium-term inflationary impacts on primary commodities within the Horn of Africa.
            </p>
            <div className="p-6 bg-surface-elevated border-l-2 border-primary mb-10">
               <h4 className="text-xs font-bold text-text-main uppercase tracking-widest mb-2 flex items-center gap-2">
                  <ShieldAlert size={14} className="text-primary"/> Key Finding
               </h4>
               <p className="text-sm text-text-secondary font-normal m-0">
                  Container freight rates to regional ports have increased by an average of 42% over the baseline, directly translating to a projected 3.5% localized CPI increase by Q3.
               </p>
            </div>
            
            <h3 className="text-xl font-bold text-text-main uppercase tracking-tight mb-6 mt-12">1. Methodology & Data Sources</h3>
            <p className="text-base text-text-secondary font-normal leading-relaxed mb-8">
               Our analysis relies on a multi-sensor approach, integrating AIS (Automatic Identification System) tracking data, regional port authority logs, and macroeconomic indicators from central banks across the region.
            </p>
            <p className="text-base text-text-secondary font-normal leading-relaxed mb-8">
               *End of Preview. Authenticate to view full report.*
            </p>
         </div>

         <div className="mt-16 pt-12 border-t border-border flex justify-center">
            <button className="btn-outline">
               Load Full Document Structure
            </button>
         </div>
      </section>
    </div>
  );
}

"use client";

import { use } from "react";
import { ArrowLeft, Target, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function GeneralThemePage({ params }: { params: Promise<{ theme: string }> }) {
  const resolvedParams = use(params);

  return (
    <div className="min-h-screen bg-background pt-24 pb-32">
      <div className="max-w-content py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-text-muted hover:text-primary uppercase tracking-widest transition-colors mb-12">
          <ArrowLeft size={14} /> Back to Base
        </Link>
        
        <div className="max-w-3xl mb-16">
          <div className="xi-eyebrow flex items-center gap-2 mb-4">
             <Target size={14} className="text-primary" /> Strategic Vertical
          </div>
          <h1 className="text-5xl font-bold text-text-main uppercase tracking-tight mb-6 capitalize">{resolvedParams.theme.replace('-', ' ')}</h1>
          <p className="text-base text-text-secondary font-normal tracking-wide leading-relaxed">
            Comprehensive analytical coverage and historical data sets pertaining to {resolvedParams.theme.replace('-', ' ')}. 
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-border pt-12">
           <div className="xi-card p-8 bg-surface hover:bg-surface-elevated border-border transition-colors cursor-pointer group">
              <h3 className="text-lg font-bold text-text-main uppercase tracking-tight mb-3">Intelligence Feed</h3>
              <p className="text-sm text-text-secondary font-normal mb-6">Real-time alerts and monitoring data.</p>
              <div className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                 Access Protocol <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform"/>
              </div>
           </div>
           <div className="xi-card p-8 bg-surface hover:bg-surface-elevated border-border transition-colors cursor-pointer group">
              <h3 className="text-lg font-bold text-text-main uppercase tracking-tight mb-3">Research Archive</h3>
              <p className="text-sm text-text-secondary font-normal mb-6">Long-form dossiers and analytical models.</p>
              <div className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                 Access Protocol <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform"/>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

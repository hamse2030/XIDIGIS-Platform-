"use client";

import { motion } from "framer-motion";
import { Sparkles, ChevronRight, FileText, Download, Share2, Terminal, Cpu, Database } from "lucide-react";

interface AIBriefingProps {
  briefing: {
    date: string;
    headline: string;
    summary: string;
    keyFindings: string[];
    recommendations: string[];
    criticalHotspots: string[];
  };
}

export default function AIBriefing({ briefing }: AIBriefingProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="xi-card bg-surface border-primary/20 shadow-glow overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="p-12">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 mb-16">
          <div>
            <div className="flex items-center gap-3 text-primary text-[10px] font-mono font-bold uppercase tracking-[0.4em] mb-4">
              <Terminal size={14} /> AI Intelligence Synthesis Core
            </div>
            <h2 className="text-4xl font-display font-black text-white uppercase tracking-tight leading-none">{briefing.headline}</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="p-3 border border-border-subtle text-text-dim hover:text-primary hover:border-primary transition-all">
              <Download size={18} />
            </button>
            <button className="p-3 border border-border-subtle text-text-dim hover:text-primary hover:border-primary transition-all">
              <Share2 size={18} />
            </button>
            <button className="btn-primary">
              Full Briefing Protocol
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-16">
          <div className="col-span-12 lg:col-span-8">
            <div className="mb-16">
              <h4 className="text-[10px] font-mono font-bold uppercase text-primary tracking-[0.3em] mb-6 flex items-center gap-2">
                 <Cpu size={12} /> Situational Summary
              </h4>
              <p className="text-xl font-medium text-text-dim leading-relaxed tracking-wide">
                {briefing.summary}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <section>
                <h4 className="text-[10px] font-mono font-bold uppercase text-white tracking-[0.3em] mb-8 flex items-center gap-3">
                  <Database size={14} className="text-primary/50" /> Strategic Findings
                </h4>
                <ul className="space-y-6">
                  {briefing.keyFindings.map((finding, i) => (
                    <li key={i} className="flex gap-4 items-start text-xs font-medium text-text-dim leading-relaxed group">
                      <div className="w-1.5 h-1.5 border border-primary/40 bg-primary/10 mt-1.5 shrink-0 group-hover:bg-primary transition-colors" />
                      {finding}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h4 className="text-[10px] font-mono font-bold uppercase text-white tracking-[0.3em] mb-8 flex items-center gap-3">
                  <Sparkles size={14} className="text-primary/50" /> Protocol Actions
                </h4>
                <ul className="space-y-6">
                  {briefing.recommendations.map((rec, i) => (
                    <li key={i} className="flex gap-4 items-start text-xs font-medium text-text-dim leading-relaxed group">
                      <ChevronRight size={16} className="text-primary/40 group-hover:text-primary shrink-0 transition-colors" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <div className="p-10 bg-navy-950/40 border border-border-subtle h-full">
              <h4 className="text-[11px] font-mono font-bold uppercase text-white tracking-[0.3em] mb-10 flex items-center gap-3">
                 <div className="w-1.5 h-1.5 bg-risk-critical rounded-full" /> Critical Vectors
              </h4>
              <div className="space-y-4">
                {briefing.criticalHotspots.map(spot => (
                  <div key={spot} className="flex justify-between items-center p-4 bg-surface border border-border-subtle group hover:border-risk-critical/30 transition-all">
                    <span className="text-xs font-mono font-bold text-text-main uppercase tracking-widest">{spot}</span>
                    <span className="text-[9px] font-mono font-bold uppercase text-risk-critical border border-risk-critical/20 px-2 py-0.5">Critical</span>
                  </div>
                ))}
              </div>
              <div className="mt-16 pt-10 border-t border-border-subtle">
                <div className="text-[9px] font-mono font-bold text-text-dim uppercase tracking-[0.2em] mb-4">Synthesis Integrity</div>
                <div className="flex items-center gap-6">
                  <div className="flex-1 h-1 bg-navy-800 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '88%' }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-primary" 
                    />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-primary tracking-widest">0.88</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

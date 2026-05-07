"use client";

import { motion } from "framer-motion";
import { Sparkles, ChevronRight, FileText, Download, Share2 } from "lucide-react";

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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="xi-card bg-white border-l-4 border-l-slate-900 shadow-elevated"
    >
      <div className="p-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-3">
              <Sparkles size={12} className="text-slate-900" /> AI Intelligence Synthesis
            </div>
            <h2 className="text-3xl font-serif font-black italic text-slate-900">{briefing.headline}</h2>
          </div>
          <div className="flex gap-2">
            <button className="p-3 bg-ivory-50 border border-ivory-200 rounded-sm hover:bg-ivory-200 transition-colors text-slate-700">
              <Download size={16} />
            </button>
            <button className="p-3 bg-ivory-50 border border-ivory-200 rounded-sm hover:bg-ivory-200 transition-colors text-slate-700">
              <Share2 size={16} />
            </button>
            <button className="btn-primary text-[10px] font-black uppercase tracking-widest px-8">
              Open Full Briefing
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-16">
          <div className="col-span-12 lg:col-span-8">
            <div className="mb-12">
              <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-6">Situational Summary</h4>
              <p className="text-lg font-medium italic text-slate-600 leading-relaxed">
                {briefing.summary}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <section>
                <h4 className="text-[10px] font-black uppercase text-slate-900 tracking-widest mb-6 flex items-center gap-2">
                  <FileText size={12} /> Key Intelligence Findings
                </h4>
                <ul className="space-y-4">
                  {briefing.keyFindings.map((finding, i) => (
                    <li key={i} className="flex gap-4 items-start text-xs font-bold text-slate-500 italic leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                      {finding}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h4 className="text-[10px] font-black uppercase text-slate-900 tracking-widest mb-6 flex items-center gap-2">
                  <Sparkles size={12} /> Institutional Recommendations
                </h4>
                <ul className="space-y-4">
                  {briefing.recommendations.map((rec, i) => (
                    <li key={i} className="flex gap-4 items-start text-xs font-bold text-slate-500 italic leading-relaxed">
                      <ChevronRight size={14} className="text-slate-300 shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <div className="p-8 bg-ivory-50 border border-ivory-200 rounded-sm">
              <h4 className="text-[10px] font-black uppercase text-slate-900 tracking-widest mb-6">Critical Monitoring Zones</h4>
              <div className="space-y-3">
                {briefing.criticalHotspots.map(spot => (
                  <div key={spot} className="flex justify-between items-center p-3 bg-white border border-ivory-200 rounded shadow-sm">
                    <span className="text-xs font-black italic text-slate-700">{spot}</span>
                    <span className="text-[9px] font-black uppercase text-brand-burnt">Critical</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-ivory-200">
                <div className="text-[9px] font-black text-slate-400 uppercase mb-2">Synthesis Confidence</div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-1.5 bg-ivory-200 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-900 w-[88%]" />
                  </div>
                  <span className="text-[10px] font-black text-slate-900 tracking-widest">88%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

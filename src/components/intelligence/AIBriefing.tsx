"use client";

import { motion } from "framer-motion";
import { Terminal, ShieldAlert, Zap, ArrowRight, Activity, Database } from "lucide-react";

export default function AIBriefing() {
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-primary">
          <Terminal size={20} />
          <h3 className="text-[11px] font-mono font-bold uppercase tracking-[0.4em] text-white">System Synthesis</h3>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
           <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
           <span className="text-[8px] font-mono font-bold text-primary uppercase tracking-widest">Optimized</span>
        </div>
      </div>

      <div className="space-y-8">
        <div className="p-6 bg-navy-900 border-l-2 border-l-risk-critical">
          <div className="flex items-center gap-3 mb-4">
             <ShieldAlert size={14} className="text-risk-critical" />
             <span className="text-[9px] font-mono font-bold text-risk-critical uppercase tracking-widest">Immediate Risk Vector</span>
          </div>
          <p className="text-[11px] leading-relaxed font-mono font-bold text-white uppercase tracking-widest opacity-90 mb-4">
            Precipitation deficit in Sanaag Region has exceeded critical thresholds. Regional market volatility expected to increase by 14% within 72 hours.
          </p>
          <div className="flex items-center gap-4 text-[8px] font-mono font-bold text-text-dim uppercase tracking-widest">
             <span className="flex items-center gap-1"><Database size={10} /> Source: CHIRPS</span>
             <span className="flex items-center gap-1"><Zap size={10} /> Confidence: 94%</span>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-[10px] font-mono font-bold text-text-dim uppercase tracking-[0.3em]">Protocol Recommendations</h4>
          {[
            "Initialize humanitarian corridor assessment.",
            "Activate market stability monitoring protocols.",
            "Escalate regional risk status to SEVERE."
          ].map((rec, i) => (
            <div key={i} className="flex items-start gap-4 group cursor-pointer">
              <div className="mt-1 w-2 h-2 border border-primary/30 group-hover:bg-primary transition-all" />
              <span className="text-[10px] font-mono font-bold text-text-dim uppercase tracking-widest group-hover:text-white transition-colors">
                {rec}
              </span>
            </div>
          ))}
        </div>
      </div>

      <button className="w-full py-4 bg-primary text-navy-950 text-[10px] font-mono font-bold uppercase tracking-[0.4em] hover:bg-white transition-all flex items-center justify-center gap-3">
         Generate Detailed Report <ArrowRight size={14} />
      </button>

      <div className="pt-8 border-t border-white/5 flex items-center justify-between opacity-30">
         <span className="text-[8px] font-mono font-bold uppercase tracking-widest text-white">FALAG INTELLIGENCE ENGINE v2.0</span>
         <Activity size={14} className="text-white" />
      </div>
    </div>
  );
}

"use client";

import { Sparkles, ArrowRight, ShieldAlert, Cpu } from "lucide-react";
import { useState, useEffect } from "react";

export default function AIBriefing() {
  const [typedText, setTypedText] = useState("");
  const fullText = "Synthesis Complete. Critical precipitation deficit observed in the eastern corridor. High probability of resource-based localized conflict within 45 days. Recommended action: Pre-position humanitarian logistics and escalate local mediation protocols.";

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      setTypedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(typing);
    }, 20);
    return () => clearInterval(typing);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-8 border-b border-border pb-4">
        <div className="flex items-center gap-2">
          <Cpu size={16} className="text-primary" />
          <h3 className="text-xs font-bold text-text-main uppercase tracking-[0.2em]">FALAG AI Engine</h3>
        </div>
        <span className="px-2 py-1 bg-primary/20 text-primary text-[9px] font-bold uppercase tracking-widest border border-primary/30">
          v2.0 Active
        </span>
      </div>

      <div className="flex-1 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={14} className="text-primary" />
          <span className="text-[10px] font-semibold text-text-muted uppercase tracking-[0.2em]">Generated Synthesis</span>
        </div>
        <p className="text-sm font-normal text-text-secondary leading-relaxed tracking-wide min-h-[120px]">
          {typedText}
          <span className="inline-block w-1.5 h-3 ml-1 bg-primary animate-pulse" />
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-background border border-border border-l-2 border-l-risk-critical">
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert size={14} className="text-risk-critical" />
            <span className="text-[10px] font-bold text-risk-critical uppercase tracking-widest">Primary Threat Vector</span>
          </div>
          <p className="text-xs font-semibold text-text-main uppercase tracking-widest">Pastoralist Displacement</p>
        </div>
        
        <button className="w-full py-4 bg-primary text-white text-xs font-bold uppercase tracking-widest hover:bg-primary-hover transition-colors flex items-center justify-center gap-2">
          Generate Full PDF Report <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

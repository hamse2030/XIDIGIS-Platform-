"use client";

import { useState } from "react";
import { Upload, FileText, Sparkles, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ResearchHub() {
  const [isUploading, setIsUploading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);

  const handleUpload = () => {
    setIsUploading(true);
    // Simulate Supabase Storage + Grok API AI Summarization
    setTimeout(() => {
      setIsUploading(false);
      setSummary("This policy report analyzes the structural transformation of the Somaliland labor market. Key findings include a 22% increase in TVET graduation rates and a growing demand in the telecommunications sector. Recommendations focus on aligning curriculum with private sector needs.");
    }, 2500);
  };

  return (
    <section className="py-24 bg-[#F5F5DC]/50 dark:bg-slate-900/50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-black text-[#8B4513] dark:text-white mb-4 italic">Intelligence Engine</h2>
            <p className="text-[#D2B48C] font-bold uppercase tracking-widest text-sm italic">AI-Powered Research Summarization</p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-[#D2B48C]/20">
            {!summary ? (
              <div 
                className="border-4 border-dashed border-[#D2B48C]/30 rounded-2xl p-12 text-center flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all"
                onClick={handleUpload}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-16 h-16 text-[#8B4513] animate-spin mb-4" />
                    <p className="text-xl font-bold text-[#8B4513] dark:text-white">Analyzing via Grok AI...</p>
                  </>
                ) : (
                  <>
                    <Upload className="w-16 h-16 text-[#D2B48C] mb-4" />
                    <h3 className="text-2xl font-serif font-bold text-[#8B4513] dark:text-white mb-2 italic">Upload Research PDF</h3>
                    <p className="text-[#8B4513]/60 dark:text-slate-400">Share your analysis with the institute for auto-summarization</p>
                  </>
                )}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 text-[#D2B48C]">
                  <Sparkles size={24} />
                  <span className="font-black uppercase tracking-widest text-sm italic">Grok AI Intelligence Summary</span>
                </div>
                <div className="bg-[#F5F5DC]/30 dark:bg-slate-900/30 p-8 rounded-xl border-l-8 border-[#8B4513]">
                  <p className="text-lg text-[#8B4513] dark:text-white leading-relaxed italic">
                    &quot;{summary}&quot;
                  </p>
                </div>
                <div className="flex gap-4">
                  <button className="px-6 py-2 bg-[#8B4513] text-white font-bold rounded hover:bg-[#6D360F] transition-all italic">Publish to Forum</button>
                  <button 
                    onClick={() => setSummary(null)}
                    className="px-6 py-2 border-2 border-[#D2B48C] text-[#8B4513] dark:text-white font-bold rounded transition-all italic"
                  >
                    Upload Another
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

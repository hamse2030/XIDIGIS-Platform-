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
    <section className="py-24 bg-surface-alt" border-b border-gray-100>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-black text-primary mb-4 italic">Intelligence Engine</h2>
            <p className="text-text-muted font-black uppercase tracking-widest text-sm italic">AI-Powered Research Summarization</p>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-border">
            {!summary ? (
              <div 
                className="border-4 border-dashed border-border rounded-2xl p-12 text-center flex flex-col items-center justify-center cursor-pointer hover:bg-surface-alt transition-all"
                onClick={handleUpload}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-16 h-16 text-primary animate-spin mb-4" />
                    <p className="text-xl font-bold text-primary">Analyzing via Grok AI...</p>
                  </>
                ) : (
                  <>
                    <Upload className="w-16 h-16 text-text-muted mb-4" />
                    <h3 className="text-2xl font-serif font-bold text-primary mb-2 italic">Upload Research PDF</h3>
                    <p className="text-text-muted">Share your analysis with the institute for auto-summarization</p>
                  </>
                )}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 text-primary">
                  <Sparkles size={24} />
                  <span className="font-black uppercase tracking-widest text-sm italic">Grok AI Intelligence Summary</span>
                </div>
                <div className="bg-surface-alt p-8 rounded-xl border-l-8 border-primary">
                  <p className="text-lg text-primary leading-relaxed italic">
                    &quot;{summary}&quot;
                  </p>
                </div>
                <div className="flex gap-4">
                  <button className="btn btn-primary px-10 py-4 text-xs italic">Publish to Forum</button>
                  <button 
                    onClick={() => setSummary(null)}
                    className="btn btn-outline px-10 py-4 text-xs italic"
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

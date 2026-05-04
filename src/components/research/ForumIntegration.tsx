"use client";

import { motion } from "framer-motion";
import { MessageSquare, Users, ShieldCheck, Zap, ArrowUpRight, TrendingUp } from "lucide-react";

const forumCategories = [
  { theme: "Development Economics", topics: 156, active: 12, latest: "Trade barriers in Berbera" },
  { theme: "Climate Resilience", topics: 89, active: 5, latest: "Togdheer water management" },
  { theme: "Strategic Security", topics: 42, active: 8, latest: "Maritime protocol updates" },
  { theme: "Digital Transformation", topics: 67, active: 15, latest: "Mobile money in rural zones" }
];

export default function ForumIntegration() {
  return (
    <div className="space-y-12">
      {/* Forum Signal Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 border border-secondary/10 rounded-sm">
          <div className="flex items-center gap-3 text-primary mb-4">
            <Users size={20} />
            <span className="text-[10px] font-black uppercase tracking-widest italic">Regional Experts</span>
          </div>
          <span className="text-4xl font-serif font-black text-primary italic">1,240+</span>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 border border-secondary/10 rounded-sm">
          <div className="flex items-center gap-3 text-primary mb-4">
            <MessageSquare size={20} />
            <span className="text-[10px] font-black uppercase tracking-widest italic">Daily Submissions</span>
          </div>
          <span className="text-4xl font-serif font-black text-primary italic">45</span>
        </div>
        <div className="xi-card border-l-4 border-l-secondary">
          <div className="xi-card__body">
            <div className="flex items-center gap-3 text-primary mb-4">
              <ShieldCheck size={20} className="text-secondary" />
              <span className="text-[10px] font-black uppercase tracking-widest italic">AI Moderated</span>
            </div>
            <span className="text-xs font-medium italic text-text-muted leading-relaxed block">
              Bias detection & source verification active across all discussions.
            </span>
          </div>
        </div>
      </div>

      {/* Thematic Categories */}
      <div className="bg-white dark:bg-slate-800 border border-secondary/10 rounded-sm overflow-hidden">
        <div className="bg-white px-8 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-serif font-black text-primary italic tracking-tight uppercase text-[9px] tracking-widest">Research Pillar Discussions</h3>
          <TrendingUp size={14} className="text-secondary" />
        </div>
        
        <div className="divide-y divide-secondary/5">
          {forumCategories.map((cat, i) => (
            <motion.div 
              key={cat.theme}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 hover:bg-accent/10 transition-all cursor-pointer group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="max-w-md">
                  <h4 className="text-xl font-serif font-black text-primary mb-2 italic group-hover:text-secondary transition-colors">{cat.theme}</h4>
                  <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest italic">Latest Intel: {cat.latest}</p>
                </div>
                
                <div className="flex items-center gap-12">
                  <div className="text-center">
                    <span className="block text-xl font-serif font-black text-primary">{cat.topics}</span>
                    <span className="text-[8px] font-black uppercase tracking-widest text-secondary italic">Analyses</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-xl font-serif font-black text-secondary">{cat.active}</span>
                    <span className="text-[8px] font-black uppercase tracking-widest text-primary/40 italic">Active Now</span>
                  </div>
                  <button className="p-3 bg-primary/5 text-primary rounded-full hover:bg-primary hover:text-white transition-all">
                    <Zap size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="p-8 bg-surface-alt text-center border-t border-gray-100">
          <button className="btn btn-primary px-10 py-4 text-xs italic mx-auto">
            Enter Collaborative Forum <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

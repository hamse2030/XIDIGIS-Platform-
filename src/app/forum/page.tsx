"use client";

import { Mail, Calendar, ArrowRight, Users, Briefcase, Award, Globe, Terminal, Shield } from "lucide-react";
import ForumIntegration from "@/components/research/ForumIntegration";

export default function ForumPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Institutional Header */}
      <section className="pt-40 pb-24 border-b border-border-subtle relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none" />
        <div className="max-w-content relative z-10">
          <div className="max-w-4xl">
            <div className="xi-eyebrow">
              <Users size={14} className="text-primary" /> Institutional Insights & Collaborative Discourse
            </div>
            <h1 className="text-6xl font-display font-black text-white uppercase tracking-tight leading-none mb-10">
              Collaborative <span className="text-primary">Intelligence</span> <br /> 
              Network.
            </h1>
            <p className="text-lg text-text-dim leading-relaxed font-medium max-w-2xl">
              Where regional experts, strategic researchers, and institutional observers converge to synthesize foresight and bridge the information gap in the Horn of Africa.
            </p>
          </div>
        </div>
      </section>

      <div className="bg-background relative">
        <div className="max-w-content py-32">
        <div className="grid grid-cols-12 gap-16">
          
          {/* Main Discourse Column */}
          <div className="col-span-12 xl:col-span-8 space-y-32">
            <ForumIntegration />

            {/* Strategic Dispatch & Events Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Strategic Dispatch */}
              <div className="xi-card bg-surface border-border-subtle group hover:border-primary/50">
                <div className="p-10">
                  <div className="w-12 h-12 border border-border-subtle flex items-center justify-center text-primary mb-8 group-hover:border-primary transition-all">
                     <Mail size={24} />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white uppercase tracking-tight mb-4">Strategic Dispatch</h3>
                  <p className="text-xs text-text-dim font-medium leading-relaxed mb-10 uppercase tracking-widest">Weekly analytical briefs on regional economy, security, and climate resilience delivered to your inbox.</p>
                  <form className="space-y-4">
                    <input 
                      type="email" 
                      placeholder="ENTER ANALYST EMAIL" 
                      className="w-full px-5 py-3.5 bg-navy-950 border border-border-subtle text-[11px] font-mono font-bold text-white uppercase tracking-widest outline-none focus:border-primary transition-all"
                    />
                    <button className="btn-primary w-full">Initialize Subscription</button>
                  </form>
                </div>
              </div>

              {/* Regional Summits */}
              <div className="xi-card bg-surface border-border-subtle group hover:border-primary/50">
                <div className="p-10">
                  <div className="w-12 h-12 border border-border-subtle flex items-center justify-center text-primary mb-8 group-hover:border-primary transition-all">
                     <Calendar size={24} />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white uppercase tracking-tight mb-6">Regional Summits</h3>
                  <div className="space-y-6">
                    {[
                      { date: "15 MAY", event: "Q2 ECONOMIC OUTLOOK PROTOCOL" },
                      { date: "02 JUN", event: "MARITIME SECURITY ROUNDTABLE" }
                    ].map((ev, i) => (
                      <div key={i} className="flex gap-6 border-b border-border-subtle pb-6 last:border-0 last:pb-0">
                        <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-[0.2em]">{ev.date}</span>
                        <span className="text-[10px] font-mono font-bold text-text-main uppercase tracking-widest leading-snug">{ev.event}</span>
                      </div>
                    ))}
                  </div>
                  <button className="mt-12 text-[10px] font-mono font-bold text-primary uppercase tracking-[0.3em] flex items-center gap-3 hover:gap-6 transition-all">
                    SYSTEM CALENDAR <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Institutional Intelligence Sidebar */}
          <div className="col-span-12 xl:col-span-4 space-y-16">
            {/* Director Profile */}
            <div>
              <div className="xi-eyebrow mb-10 flex items-center gap-3">
                 <Terminal size={14} /> Intelligence Director
              </div>
              <div className="xi-card bg-surface border-primary/20 shadow-glow">
                <div className="p-10 text-center">
                  <div className="w-24 h-24 border border-primary/30 mx-auto mb-8 flex items-center justify-center overflow-hidden bg-navy-950 relative">
                    <div className="absolute inset-0 bg-primary/5" />
                    <Users className="text-primary relative z-10" size={32} />
                  </div>
                  <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight mb-2">Hamse Aden</h3>
                  <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-[0.4em] block mb-8">Foresight & Strategy</span>
                  <p className="text-sm text-text-dim leading-relaxed font-medium tracking-wide">Strategic lead dedicated to advancing high-fidelity data economics and regional security frameworks within complex institutional environments.</p>
                </div>
              </div>
            </div>

            {/* Advisory Council */}
            <div className="xi-card bg-surface border-l-2 border-l-primary group hover:border-primary transition-all">
              <div className="p-10">
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-10 h-10 border border-border-subtle flex items-center justify-center text-primary group-hover:border-primary transition-colors">
                      <Shield size={20} />
                   </div>
                   <h3 className="text-xl font-display font-bold text-white uppercase tracking-tight">Advisory Council</h3>
                </div>
                <p className="text-[11px] text-text-dim leading-relaxed font-medium uppercase tracking-[0.1em] mb-10">Seeking institutional stakeholders interested in contributing to our policy repository or strategic advisory protocols.</p>
                <button className="btn-outline w-full group/btn">
                  System Engagement <Award size={16} className="ml-3 group-hover/btn:scale-125 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          </div>
        </div>
      </div>
    </div>
  );
}

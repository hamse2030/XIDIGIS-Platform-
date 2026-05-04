"use client";

import { motion } from "framer-motion";
import { Mail, Calendar, ArrowRight, Users, Briefcase, Award } from "lucide-react";
import ForumIntegration from "@/components/research/ForumIntegration";
import Image from "next/image";

export default function ForumPage() {
  return (
    <div className="flex flex-col min-h-screen bg-accent/20">
      {/* Dynamic Header */}
      <section className="bg-primary text-white py-24 border-b-8 border-secondary/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-serif font-black mb-8 italic tracking-tighter leading-none">Collaborative Intelligence</h1>
            <p className="text-xl text-white/70 max-w-2xl font-medium italic leading-relaxed">
              Where regional experts, policy makers, and strategic researchers converge to bridge the information gap in the Horn of Africa.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-24">
          
          {/* Main Forum Column */}
          <div className="xl:col-span-2 space-y-24">
            <ForumIntegration />

            {/* Newsletter & Events Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Newsletter */}
              <div className="bg-white dark:bg-slate-800 p-10 border border-secondary/10 rounded-sm">
                <Mail className="text-secondary mb-6" size={32} />
                <h3 className="text-2xl font-serif font-black text-primary italic mb-4">Strategic Dispatch</h3>
                <p className="text-xs text-primary/60 italic leading-relaxed mb-8">Weekly briefs on regional economy, security, and climate resilience delivered to your inbox.</p>
                <form className="space-y-4">
                  <input 
                    type="email" 
                    placeholder="Expert Email Address" 
                    className="w-full px-6 py-4 bg-accent/20 border border-secondary/10 rounded-sm text-xs font-bold uppercase tracking-widest italic outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <button className="w-full py-4 bg-primary text-white font-black uppercase tracking-widest text-[10px] hover:bg-secondary transition-all italic">Subscribe via Buttondown</button>
                </form>
              </div>

              {/* Events */}
              <div className="bg-white dark:bg-slate-800 p-10 border border-secondary/10 rounded-sm">
                <Calendar className="text-secondary mb-6" size={32} />
                <h3 className="text-2xl font-serif font-black text-primary italic mb-4">Regional Summits</h3>
                <div className="space-y-6">
                  {[
                    { date: "May 15", event: "Q2 Economic Outlook Webinar" },
                    { date: "June 02", event: "Maritime Security Roundtable" }
                  ].map((ev, i) => (
                    <div key={i} className="flex gap-4 border-b border-secondary/5 pb-4">
                      <span className="text-[10px] font-black text-secondary uppercase tracking-widest italic">{ev.date}</span>
                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest italic">{ev.event}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-8 text-[10px] font-black text-primary uppercase tracking-widest italic flex items-center gap-2 hover:gap-4 transition-all">
                  Full Calendar <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>

          {/* Institutional Sidebar: Team & Advisory */}
          <div className="space-y-16">
            {/* Team Bio - User Profile */}
            <div>
              <h4 className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] mb-12 italic border-b-2 border-secondary pb-4">Lead Researcher</h4>
              <div className="bg-white dark:bg-slate-800 p-8 border border-secondary/10 rounded-sm text-center">
                <div className="w-32 h-32 bg-primary/10 rounded-full mx-auto mb-8 flex items-center justify-center overflow-hidden border-4 border-accent shadow-xl">
                  {/* Placeholder for User Image */}
                  <Users className="text-primary opacity-20" size={48} />
                </div>
                <h3 className="text-2xl font-serif font-black text-primary italic mb-2">Hamse Aden</h3>
                <span className="text-[10px] font-black text-secondary uppercase tracking-widest italic block mb-6">Founder & Strategic Lead</span>
                <p className="text-xs text-primary/60 italic leading-relaxed mb-8">Dedicated to advancing data-driven development economics and regional security frameworks in Somaliland.</p>
                <div className="flex justify-center gap-4 text-primary/40">
                  
                  
                  
                </div>
              </div>
            </div>

            {/* Advisory Form */}
            <div className="bg-primary p-10 rounded-sm text-white shadow-2xl relative overflow-hidden">
              <div className="absolute bottom-0 right-0 opacity-10 -mr-8 -mb-8">
                <Briefcase size={120} />
              </div>
              <h3 className="text-xl font-serif font-black italic mb-4">Advisory Council</h3>
              <p className="text-[10px] opacity-70 italic leading-relaxed mb-8">Interested in contributing to our policy research or joining our advisory board?</p>
              <button className="w-full py-4 bg-white text-primary font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-secondary transition-all italic">
                Application Portal <Award size={14} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


"use client";

import { motion } from "framer-motion";
import { Mail, Calendar, ArrowRight, Users, Briefcase, Award } from "lucide-react";
import ForumIntegration from "@/components/research/ForumIntegration";
import Image from "next/image";

export default function ForumPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Institutional Header */}
      <section className="section bg-white pt-32 pb-16 border-b border-gray-100">
        <div className="container mx-auto">
          <div className="max-w-4xl">
            <div className="xi-eyebrow">
              <Users size={14} className="text-primary" /> Institutional Insights & Collaborative Discourse
            </div>
            <h1 className="text-primary font-serif italic tracking-tighter">Collaborative Intelligence Hub</h1>
            <p className="text-lg text-text-muted leading-relaxed">
              Where regional experts, policy makers, and strategic researchers converge to bridge the information gap in the Horn of Africa.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto py-24">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-16">
          
          {/* Main Forum Column */}
          <div className="xl:col-span-2 space-y-24">
            <ForumIntegration />

            {/* Newsletter & Events Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Newsletter */}
              <div className="xi-card">
                <div className="xi-card__body">
                  <Mail className="text-primary mb-6" size={24} />
                  <h3 className="text-xl font-serif font-black text-primary italic mb-4">Strategic Dispatch</h3>
                  <p className="text-xs text-text-muted italic leading-relaxed mb-8">Weekly briefs on regional economy, security, and climate resilience delivered to your inbox.</p>
                  <form className="space-y-4">
                    <input 
                      type="email" 
                      placeholder="Expert Email Address" 
                      className="w-full px-4 py-3 bg-surface-alt border border-border rounded text-[10px] font-black uppercase tracking-widest outline-none focus:ring-1 focus:ring-primary/20"
                    />
                    <button className="btn btn-primary w-full text-[10px]">Subscribe to Reports</button>
                  </form>
                </div>
              </div>

              {/* Events */}
              <div className="xi-card">
                <div className="xi-card__body">
                  <Calendar className="text-primary mb-6" size={24} />
                  <h3 className="text-xl font-serif font-black text-primary italic mb-4">Regional Summits</h3>
                  <div className="space-y-6">
                    {[
                      { date: "May 15", event: "Q2 Economic Outlook Webinar" },
                      { date: "June 02", event: "Maritime Security Roundtable" }
                    ].map((ev, i) => (
                      <div key={i} className="flex gap-4 border-b border-gray-100 pb-4">
                        <span className="text-[10px] font-black text-secondary uppercase tracking-widest italic">{ev.date}</span>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{ev.event}</span>
                      </div>
                    ))}
                  </div>
                  <button className="mt-8 text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
                    Full Calendar <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Institutional Sidebar: Team & Advisory */}
          <div className="space-y-12">
            {/* Team Bio - User Profile */}
            <div>
              <div className="xi-eyebrow mb-8 border-b border-gray-200 w-full pb-4">Lead Researcher</div>
              <div className="xi-card text-center">
                <div className="xi-card__body">
                  <div className="w-24 h-24 bg-surface-alt rounded-full mx-auto mb-6 flex items-center justify-center overflow-hidden border border-border shadow-sm">
                    <Users className="text-primary opacity-20" size={32} />
                  </div>
                  <h3 className="text-xl font-serif font-black text-primary italic mb-2">Hamse Aden</h3>
                  <span className="text-[9px] font-black text-secondary uppercase tracking-widest italic block mb-6">Founder & Strategic Lead</span>
                  <p className="text-xs text-text-muted italic leading-relaxed">Dedicated to advancing data-driven development economics and regional security frameworks in Somaliland.</p>
                </div>
              </div>
            </div>

            {/* Advisory Form */}
            <div className="xi-card bg-primary text-white border-none shadow-xl">
              <div className="xi-card__body">
                <Briefcase size={24} className="text-secondary-light mb-6" />
                <h3 className="text-lg font-serif font-black italic mb-4">Advisory Council</h3>
                <p className="text-[10px] opacity-70 italic leading-relaxed mb-8">Interested in contributing to our policy research or joining our advisory board?</p>
                <button className="btn btn-primary bg-white text-primary w-full text-[10px]">
                  Application Portal <Award size={14} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


"use client";

import { motion } from "framer-motion";
import { MessageSquare, Users, Globe, Shield, Terminal, ArrowRight, Lock, Activity } from "lucide-react";
import Link from "next/link";

const DISCUSSIONS = [
  {
    id: 1,
    title: "Evaluating the impact of Red Sea disruptions on local inflation",
    author: "Dr. A. Hassan",
    role: "Senior Economist",
    replies: 24,
    category: "Macro-Economics",
    status: "Active",
    time: "2h ago"
  },
  {
    id: 2,
    title: "Forecast: Seasonal precipitation deficits in the Sool plateau",
    author: "ClimateOps Desk",
    role: "System Protocol",
    replies: 8,
    category: "Climate Systems",
    status: "Critical",
    time: "5h ago"
  },
  {
    id: 3,
    title: "Methodology review: Standardizing cross-border trade metrics",
    author: "Policy Team Alpha",
    role: "Internal Governance",
    replies: 12,
    category: "Data Integrity",
    status: "Resolved",
    time: "1d ago"
  }
];

export default function ForumLanding() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. SECURE GATEWAY HEADER */}
      <section className="pt-32 pb-16 border-b border-border bg-surface relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.02] pointer-events-none" />
        <div className="max-w-content relative z-10 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-surface-elevated border border-border mb-8">
             <Lock size={24} className="text-primary" />
          </div>
          <h1 className="text-5xl font-bold text-text-main uppercase tracking-tight leading-none mb-6">
            Discourse <span className="text-primary">Network</span>.
          </h1>
          <p className="text-base text-text-secondary font-normal tracking-wide leading-relaxed max-w-2xl mx-auto mb-10">
            A secure, authenticated environment for institutional partners, regional analysts, and policymakers to debate findings and validate intelligence.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="btn-primary">
              Authenticate Identity
            </button>
            <button className="btn-outline">
              Request Clearances
            </button>
          </div>
        </div>
      </section>

      {/* 2. LIVE DISCOURSE FEED */}
      <section className="flex-1 py-20 bg-background">
        <div className="max-w-content">
          <div className="grid grid-cols-12 gap-12">
            
            {/* LEFT: NETWORK METRICS */}
            <div className="col-span-12 lg:col-span-4 space-y-8">
              <div className="xi-card p-8 bg-surface border-border">
                <h3 className="text-xs font-bold text-text-main uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-border pb-4">
                  <Activity size={14} className="text-primary" /> Network Status
                </h3>
                <div className="space-y-6">
                  {[
                    { label: "Active Nodes", val: "142", icon: Users },
                    { label: "Encrypted Threads", val: "1,048", icon: Shield },
                    { label: "Global Relays", val: "12", icon: Globe }
                  ].map((stat, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <stat.icon size={16} className="text-text-muted" />
                        <span className="text-xs font-medium text-text-secondary uppercase tracking-widest">{stat.label}</span>
                      </div>
                      <span className="text-sm font-bold text-text-main">{stat.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="xi-card p-8 bg-surface border-border">
                <h3 className="text-xs font-bold text-text-main uppercase tracking-widest mb-6 border-b border-border pb-4">
                  Security Protocols
                </h3>
                <p className="text-xs text-text-secondary font-normal leading-relaxed mb-6">
                  All communications within the FALAG Discourse Network are end-to-end encrypted. Anonymous participation is strictly prohibited to maintain analytical integrity.
                </p>
                <Link href="#" className="text-[10px] font-semibold text-primary uppercase tracking-[0.2em] flex items-center gap-2 hover:gap-3 transition-all">
                  View Protocol Document <ArrowRight size={12} />
                </Link>
              </div>
            </div>

            {/* RIGHT: RECENT THREADS */}
            <div className="col-span-12 lg:col-span-8">
              <div className="flex justify-between items-center mb-8 border-b border-border pb-4">
                <h2 className="text-lg font-bold text-text-main uppercase tracking-tight">Intercepted Transmissions</h2>
                <span className="text-[10px] font-semibold text-primary uppercase tracking-[0.2em] animate-pulse">Live Feed</span>
              </div>
              
              <div className="space-y-4">
                {DISCUSSIONS.map((thread) => (
                  <div key={thread.id} className="xi-card p-6 bg-surface hover:bg-surface-elevated transition-colors border-border group cursor-pointer">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 text-[9px] font-bold uppercase tracking-widest border ${
                          thread.status === 'Critical' ? 'border-risk-critical text-risk-critical bg-risk-critical/10' :
                          thread.status === 'Resolved' ? 'border-risk-low text-risk-low bg-risk-low/10' :
                          'border-primary text-primary bg-primary/10'
                        }`}>
                          {thread.status}
                        </span>
                        <span className="text-[10px] font-medium text-text-muted uppercase tracking-widest">{thread.category}</span>
                      </div>
                      <span className="text-[10px] font-medium text-text-muted">{thread.time}</span>
                    </div>
                    
                    <h3 className="text-base font-bold text-text-main leading-snug mb-4 group-hover:text-primary transition-colors">
                      {thread.title}
                    </h3>
                    
                    <div className="flex justify-between items-center border-t border-border pt-4">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-surface-elevated border border-border flex items-center justify-center">
                          <UserIcon size={12} className="text-text-muted" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-text-main">{thread.author}</div>
                          <div className="text-[9px] font-medium text-text-muted uppercase tracking-widest">{thread.role}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-text-muted">
                        <MessageSquare size={14} />
                        <span className="text-[11px] font-bold">{thread.replies}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <button className="btn-outline mx-auto">
                  Load Historical Logs
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

// Temporary internal component to avoid missing import
function UserIcon({ size, className }: { size: number, className?: string }) {
  return <Users size={size} className={className} />;
}

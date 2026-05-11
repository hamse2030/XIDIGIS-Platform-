"use client";

import { motion } from "framer-motion";
import { AlertTriangle, ShieldAlert, Activity, CheckCircle, Clock, Filter, ChevronDown, Map, Plus } from "lucide-react";
import Link from "next/link";

// Mock Data for Alerts
const LIVE_ALERTS = [
  {
    id: "ALT-992",
    level: "CRITICAL",
    category: "Climate Infrastructure",
    timestamp: "10 min ago",
    location: "Guban Corridor",
    summary: "Flash flood warnings issued for ephemeral river beds. High probability of infrastructure disruption along major trade routes.",
    status: "Active",
    color: "risk-critical"
  },
  {
    id: "ALT-991",
    level: "SEVERE",
    category: "Market Volatility",
    timestamp: "45 min ago",
    location: "Hargeisa Central",
    summary: "Unprecedented spike in imported fuel prices detected (+14% in 24h). Indicative of port supply chain bottlenecks.",
    status: "Monitoring",
    color: "risk-high"
  },
  {
    id: "ALT-990",
    level: "MODERATE",
    category: "Security Density",
    timestamp: "3h ago",
    location: "Sool Plateau",
    summary: "Irregular mass movement detected via satellite imagery. Correlates with recent localized resource scarcity patterns.",
    status: "Investigating",
    color: "risk-mod"
  },
  {
    id: "ALT-989",
    level: "STABLE",
    category: "System Integrity",
    timestamp: "12h ago",
    location: "FALAG Core Server",
    summary: "Routine synchronization of geospatial data nodes completed successfully. All data streams verified.",
    status: "Resolved",
    color: "risk-stable"
  }
];

export default function OpsAlerts() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. COMMAND HEADER */}
      <section className="pt-32 pb-12 border-b border-border bg-surface relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.02] pointer-events-none" />
        <div className="max-w-content relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
            <div>
              <div className="xi-eyebrow flex items-center gap-2 mb-4">
                 <AlertTriangle size={14} className="text-risk-critical" /> Strategic Operations
              </div>
              <h1 className="text-4xl font-bold text-text-main uppercase tracking-tight leading-none mb-4">
                Alert <span className="text-primary">Console</span>.
              </h1>
              <p className="text-sm text-text-secondary font-normal tracking-wide max-w-xl leading-relaxed">
                Real-time threat matrix and operational anomalies detected by the FALAG Intelligence Hub.
              </p>
            </div>

            <div className="flex flex-col items-end gap-4">
               <div className="flex items-center gap-3 bg-surface-elevated px-4 py-2 border border-border">
                  <div className="w-2 h-2 rounded-full bg-risk-critical animate-pulse" />
                  <span className="text-[10px] font-semibold text-text-main uppercase tracking-widest">System DEFCON: 3</span>
               </div>
               <button className="btn-primary py-2 px-6">
                 <Plus size={14} className="mr-2" /> Manually Inject Alert
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OPS DASHBOARD */}
      <section className="flex-1 py-12 bg-background">
        <div className="max-w-content">
          <div className="grid grid-cols-12 gap-8">
            
            {/* LEFT FILTERS & METRICS */}
            <div className="col-span-12 lg:col-span-3 space-y-8">
              <div className="xi-card p-6 bg-surface-elevated border-border">
                <h3 className="text-[11px] font-bold text-text-main uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-border pb-4">
                  <Activity size={14} /> Triage Metrics
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-risk-critical uppercase tracking-widest">Critical</span>
                    <span className="text-sm font-bold text-text-main">04</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-risk-high uppercase tracking-widest">Severe</span>
                    <span className="text-sm font-bold text-text-main">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-risk-mod uppercase tracking-widest">Moderate</span>
                    <span className="text-sm font-bold text-text-main">38</span>
                  </div>
                </div>
              </div>

              <div className="xi-card p-6 bg-surface border-border">
                <h3 className="text-[11px] font-bold text-text-main uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-border pb-4">
                  <Filter size={14} /> Stream Filters
                </h3>
                <div className="space-y-3">
                  {['All Vectors', 'Climate Stress', 'Market Volatility', 'Security Density'].map((filter, i) => (
                    <label key={i} className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-3 h-3 border border-border group-hover:border-primary transition-colors flex items-center justify-center">
                        {i === 0 && <div className="w-1.5 h-1.5 bg-primary" />}
                      </div>
                      <span className="text-xs font-medium text-text-secondary group-hover:text-text-main transition-colors">{filter}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT ALERT FEED */}
            <div className="col-span-12 lg:col-span-9 space-y-6">
              <div className="flex justify-between items-center bg-surface p-4 border border-border">
                <span className="text-[10px] font-semibold text-text-muted uppercase tracking-widest">Showing Live Stream (Last 24 Hours)</span>
                <button className="flex items-center gap-2 text-[10px] font-semibold text-text-main uppercase tracking-widest hover:text-primary transition-colors">
                  Sort by Severity <ChevronDown size={14} />
                </button>
              </div>

              <div className="space-y-4">
                {LIVE_ALERTS.map((alert) => (
                  <div key={alert.id} className="xi-card bg-surface hover:bg-surface-elevated border-border transition-all flex flex-col md:flex-row overflow-hidden group">
                    {/* Severity Marker */}
                    <div className={`w-full md:w-2 bg-${alert.color}`} />
                    
                    <div className="p-6 flex-1 flex flex-col md:flex-row gap-6">
                      {/* Alert Meta */}
                      <div className="md:w-48 flex-shrink-0 flex flex-col justify-between">
                        <div>
                          <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 text-${alert.color}`}>
                            {alert.level}
                          </div>
                          <div className="text-xs font-semibold text-text-main mb-4">{alert.id}</div>
                        </div>
                        <div className="text-[10px] font-medium text-text-muted uppercase tracking-widest flex items-center gap-2">
                           <Clock size={12} /> {alert.timestamp}
                        </div>
                      </div>

                      {/* Alert Body */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-2 py-1 bg-background border border-border text-[9px] font-bold text-text-secondary uppercase tracking-widest">
                            {alert.category}
                          </span>
                          <span className="text-[10px] font-semibold text-text-muted uppercase tracking-widest flex items-center gap-1">
                             <Map size={12} /> {alert.location}
                          </span>
                        </div>
                        <p className="text-sm font-normal text-text-main leading-relaxed mb-4">
                          {alert.summary}
                        </p>
                        
                        <div className="flex items-center gap-4 border-t border-border pt-4">
                           <span className="text-[10px] font-medium text-text-muted uppercase tracking-widest">Status:</span>
                           <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{alert.status}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="md:w-32 flex-shrink-0 flex md:flex-col gap-2 justify-center border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
                        <button className="flex-1 w-full py-2 bg-background border border-border text-[10px] font-semibold text-text-main uppercase tracking-widest hover:border-primary transition-colors text-center">
                          Investigate
                        </button>
                        <button className="flex-1 w-full py-2 bg-background border border-border text-[10px] font-semibold text-text-main uppercase tracking-widest hover:bg-surface-elevated transition-colors text-center">
                          Acknowledge
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

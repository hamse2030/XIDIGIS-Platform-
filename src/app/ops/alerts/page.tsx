"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldAlert, Filter, Search, ChevronRight, 
  CheckCircle2, FileText, 
  MessageSquare, History, Database,
  Terminal, Zap, Target, Activity
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Alert {
  id: string;
  severity: string;
  created_at: string;
  message: string;
  region_id: string;
  regions: {
    name: string;
  };
}

export default function AnalystConsole() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function fetchAlerts() {
      if (!supabase) {
        setIsLoading(false);
        return;
      }
      
      const { data } = await supabase
        .from('alerts')
        .select('*, regions(name)')
        .order('created_at', { ascending: false });
      
      if (data) setAlerts(data as unknown as Alert[]);
      setIsLoading(false);
    }

    fetchAlerts();
  }, []);

  const getSeverityBorder = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'border-l-risk-critical';
      case 'Severe': return 'border-l-risk-high';
      case 'High': return 'border-l-risk-high';
      case 'Moderate': return 'border-l-risk-mod';
      default: return 'border-l-risk-stable';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-risk-critical/10 text-risk-critical border-risk-critical/30';
      case 'Severe': return 'bg-risk-high/10 text-risk-high border-risk-high/30';
      case 'High': return 'bg-risk-high/10 text-risk-high border-risk-high/30';
      case 'Moderate': return 'bg-risk-mod/10 text-risk-mod border-risk-mod/30';
      default: return 'bg-primary/10 text-primary border-primary/30';
    }
  };

  return (
    <div className="min-h-screen pb-40">
      {/* 1. Dashboard Header (Light Mode) */}
      <section className="pt-32 pb-16 border-b border-border bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none" />
        <div className="max-w-content relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10">
            <div>
              <div className="xi-eyebrow flex items-center gap-2">
                 <Terminal size={14} /> Strategic Ops Monitoring
              </div>
              <h1 className="text-5xl font-display font-black text-navy-950 uppercase tracking-tight leading-none mb-4">
                Intelligence <span className="text-primary">Console</span>.
              </h1>
              <p className="text-text-dim font-medium tracking-wide">Institutional validation and escalation of regional risk vectors.</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-3 px-6 py-3 bg-surface-alt border border-border text-[10px] font-mono font-bold text-text-dim uppercase tracking-[0.2em] shadow-sm">
                <Database size={14} className="text-primary" /> SOURCE: PRIMARY ENGINE
              </div>
              <div className="flex items-center gap-3 px-6 py-3 bg-primary/5 border border-primary/20 text-[10px] font-mono font-bold text-primary uppercase tracking-[0.2em]">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.4)]" /> 
                LIVE FEED ACTIVE
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-content py-20 relative z-10">
        <div className="grid grid-cols-12 gap-12">
          
          {/* 2. Main Alert Feed (Light Mode) */}
          <div className="col-span-12 lg:col-span-8 space-y-10">
            {/* Control Bar */}
            <div className="xi-card p-6 bg-white flex flex-wrap items-center justify-between gap-8 border-border">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-3 text-[10px] font-mono font-bold uppercase text-primary tracking-[0.3em]">
                  <Filter size={16} /> CLUSTER:
                </div>
                {['all', 'critical', 'pending', 'resolved'].map((f) => (
                  <button 
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`text-[10px] font-mono font-bold uppercase tracking-[0.2em] px-5 py-2.5 transition-all border ${
                      filter === f 
                        ? 'bg-navy-950 text-white border-navy-950 shadow-sm' 
                        : 'bg-white text-text-dim border-border hover:border-primary/50 hover:text-navy-950'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" size={14} />
                <input 
                  type="text" 
                  placeholder="QUERY ACTIVE ALERTS..." 
                  className="w-full pl-12 pr-4 py-3 bg-surface-alt border border-border text-[11px] font-mono font-bold text-navy-950 uppercase tracking-widest focus:outline-none focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* Live Feed Container */}
            <div className="space-y-6">
              {isLoading ? (
                [1,2,3].map(i => <div key={i} className="h-32 xi-card bg-surface-alt/50 border-border animate-pulse" />)
              ) : (
                alerts.map((alert) => (
                  <motion.div 
                    key={alert.id}
                    onClick={() => setSelectedAlert(alert)}
                    whileHover={{ x: 6 }}
                    className={`xi-card group cursor-pointer border-l-4 transition-all bg-white hover:bg-surface-alt/50 ${getSeverityBorder(alert.severity)} ${
                      selectedAlert?.id === alert.id ? 'border-primary shadow-sm bg-surface-alt/50' : 'border-border'
                    }`}
                  >
                    <div className="p-10 flex items-center justify-between">
                      <div className="flex items-center gap-10">
                        <div className={`p-6 border flex items-center justify-center ${getSeverityBadge(alert.severity)}`}>
                          <ShieldAlert size={32} />
                        </div>
                        <div>
                          <div className="flex items-center gap-4 mb-4">
                            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-primary">{alert.regions.name}</span>
                            <span className="w-1 h-1 bg-border rounded-full" />
                            <span className="text-[11px] font-mono font-bold text-text-dim tracking-widest">{new Date(alert.created_at).toLocaleString('en-GB', { hour12: false })}</span>
                          </div>
                          <h3 className="text-3xl font-display font-bold text-navy-950 uppercase tracking-tight leading-none mb-5 group-hover:text-primary transition-colors">{alert.message}</h3>
                          <div className="flex gap-10">
                            <span className="flex items-center gap-2.5 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-text-dim">
                              <History size={14} className="text-primary/40" /> 02 OVERRIDES
                            </span>
                            <span className="flex items-center gap-2.5 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-text-dim">
                              <FileText size={14} className="text-primary/40" /> 01 DOSSIER
                            </span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className={`text-text-dim transition-transform duration-300 ${selectedAlert?.id === alert.id ? 'rotate-90 text-primary scale-125' : ''}`} />
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* 3. Operational Analysis Panel (Light Mode) */}
          <div className="col-span-12 lg:col-span-4">
            <AnimatePresence mode="wait">
              {selectedAlert ? (
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  className="xi-card bg-white border-primary/20 shadow-premium sticky top-32 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                  
                  <div className="p-12 border-b border-border bg-surface-alt/50">
                    <div className="flex justify-between items-start mb-10">
                      <span className={`px-4 py-1.5 border text-[10px] font-mono font-bold uppercase tracking-[0.3em] ${getSeverityBadge(selectedAlert.severity)} shadow-sm`}>
                        {selectedAlert.severity} PRIORITY
                      </span>
                      <button onClick={() => setSelectedAlert(null)} className="text-[10px] font-mono font-bold text-text-dim hover:text-navy-950 transition-all tracking-widest">
                        DISMISS
                      </button>
                    </div>
                    <h2 className="text-4xl font-display font-black text-navy-950 uppercase tracking-tight mb-5 leading-none">{selectedAlert.regions.name}</h2>
                    <p className="text-sm text-text-dim font-medium tracking-wide leading-relaxed">{selectedAlert.message}</p>
                  </div>

                  <div className="p-12 space-y-16">
                    {/* Governance Override */}
                    <section>
                      <h4 className="text-[11px] font-mono font-bold uppercase tracking-[0.4em] text-primary mb-8 flex items-center gap-3">
                        <Zap size={16} /> Governance Override
                      </h4>
                      <div className="space-y-6">
                        <select className="w-full bg-surface-alt border border-border p-4 text-[10px] font-mono font-bold text-navy-950 uppercase tracking-[0.2em] focus:border-primary transition-all outline-none">
                          <option>LEVEL: MINIMAL</option>
                          <option>LEVEL: MODERATE</option>
                          <option>LEVEL: ELEVATED</option>
                          <option>LEVEL: SEVERE</option>
                          <option>LEVEL: CRITICAL</option>
                        </select>
                        <textarea 
                          placeholder="INPUT INSTITUTIONAL RATIONALE FOR PROTOCOL OVERRIDE..." 
                          className="w-full bg-surface-alt border border-border p-6 text-[11px] font-mono font-bold text-navy-950 uppercase tracking-widest h-40 focus:border-primary transition-all outline-none placeholder:opacity-40"
                        />
                        <button className="btn-primary w-full shadow-sm">Initialize Escalation</button>
                      </div>
                    </section>

                    {/* Briefing Feed */}
                    <section>
                      <h4 className="text-[11px] font-mono font-bold uppercase tracking-[0.4em] text-text-dim mb-8 flex items-center gap-3">
                        <MessageSquare size={16} className="text-primary/60" /> Internal Protocol Notes
                      </h4>
                      <div className="space-y-6 mb-10">
                        <div className="p-6 bg-surface-alt border-l-2 border-l-primary">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-[10px] font-mono font-bold text-navy-950 uppercase tracking-widest">Lead Analyst</span>
                            <span className="text-[10px] font-mono font-bold text-text-dim">19:20 EAT</span>
                          </div>
                          <p className="text-[11px] leading-relaxed font-mono font-bold text-text-dim uppercase tracking-widest opacity-80">Initial multi-sensor analysis suggests prolonged precipitation deficit. Protocol: Maintain SEVERE status until market volatility stabilizes.</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <input type="text" placeholder="APPEND PROTOCOL NOTE..." className="flex-1 bg-surface-alt border border-border px-4 py-3 text-[10px] font-mono font-bold text-navy-950 uppercase tracking-widest" />
                        <button className="w-12 h-12 bg-primary text-white flex items-center justify-center shadow-sm transition-transform hover:scale-110"><CheckCircle2 size={20} /></button>
                      </div>
                    </section>

                    {/* Artifact Upload */}
                    <section>
                      <h4 className="text-[11px] font-mono font-bold uppercase tracking-[0.4em] text-text-dim mb-8 flex items-center gap-3">
                        <Target size={16} className="text-primary/60" /> Evidence Dossier
                      </h4>
                      <div className="border border-dashed border-border p-12 text-center group hover:border-primary/50 transition-all cursor-pointer bg-surface-alt/30">
                        <span className="text-[10px] font-mono font-bold uppercase text-text-dim tracking-[0.3em] group-hover:text-primary transition-colors">UPLOAD PDF / SENSOR DATA</span>
                      </div>
                    </section>
                  </div>
                </motion.div>
              ) : (
                <div className="xi-card p-20 h-[700px] flex flex-col items-center justify-center text-center bg-white border-dashed border-border">
                  <Activity size={64} className="text-primary/30 mb-10 animate-pulse" />
                  <h3 className="text-3xl font-display font-black text-navy-950 uppercase tracking-tight mb-6">Awaiting Protocol</h3>
                  <p className="text-sm font-medium text-text-dim leading-relaxed tracking-wide px-10">
                    Initialize monitoring by selecting an operational alert from the live feed to begin institutional review and override workflows.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

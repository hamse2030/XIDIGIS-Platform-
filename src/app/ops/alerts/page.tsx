"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldAlert, Filter, Search, ChevronRight, 
  CheckCircle2, FileText, 
  MessageSquare, History, Database
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
      case 'Critical': return 'border-l-brand-burnt';
      case 'Severe': return 'border-l-brand-deep-orange';
      case 'High': return 'border-l-brand-amber';
      case 'Moderate': return 'border-l-brand-olive';
      default: return 'border-l-brand-teal';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-brand-burnt text-white';
      case 'Severe': return 'bg-brand-deep-orange text-white';
      case 'High': return 'bg-brand-amber text-slate-900';
      case 'Moderate': return 'bg-brand-olive text-white';
      default: return 'bg-brand-teal text-white';
    }
  };

  return (
    <div className="min-h-screen bg-ivory-50 pb-20">
      {/* 1. Dashboard Header */}
      <div className="bg-white border-b border-ivory-200 pt-12 pb-12">
        <div className="max-w-content flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <div className="xi-eyebrow">Institutional Operations</div>
            <h1 className="text-4xl font-serif font-black text-slate-900 italic leading-tight mb-2">Analyst Intelligence Console</h1>
            <p className="text-slate-500 font-medium italic">Review, validate, and escalate regional risk indicators.</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-ivory-200 border border-ivory-500 rounded text-[10px] font-black text-slate-700 uppercase tracking-widest">
              <Database size={12} className="text-slate-400" /> Source: Primary Engine
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-brand-teal/10 border border-brand-teal/20 rounded text-[10px] font-black text-brand-teal uppercase tracking-widest">
              <div className="w-1.5 h-1.5 bg-brand-teal rounded-full animate-pulse" /> Live Monitoring Active
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-content py-12">
        <div className="grid grid-cols-12 gap-8">
          
          {/* 2. Main Alert List */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Filters Bar */}
            <div className="xi-card p-4 flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                  <Filter size={14} /> Filter By:
                </div>
                {['all', 'critical', 'pending', 'resolved'].map((f) => (
                  <button 
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded transition-all ${
                      filter === f ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:text-slate-900 hover:bg-ivory-200'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input 
                  type="text" 
                  placeholder="SEARCH RELEVANT ALERTS..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-ivory-50 border border-ivory-200 text-[10px] font-black uppercase tracking-widest rounded focus:ring-1 focus:ring-slate-900 outline-none"
                />
              </div>
            </div>

            {/* List */}
            <div className="space-y-4">
              {isLoading ? (
                [1,2,3].map(i => <div key={i} className="h-32 xi-card animate-pulse" />)
              ) : (
                alerts.map((alert) => (
                  <motion.div 
                    key={alert.id}
                    onClick={() => setSelectedAlert(alert)}
                    whileHover={{ x: 4 }}
                    className={`xi-card group cursor-pointer border-l-4 transition-all ${getSeverityBorder(alert.severity)} ${
                      selectedAlert?.id === alert.id ? 'ring-2 ring-slate-900/10 scale-[1.01]' : ''
                    }`}
                  >
                    <div className="p-8 flex items-center justify-between">
                      <div className="flex items-center gap-8">
                        <div className={`p-5 rounded border ${getSeverityBadge(alert.severity)} shadow-sm`}>
                          <ShieldAlert size={28} />
                        </div>
                        <div>
                          <div className="flex items-center gap-4 mb-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{alert.regions.name}</span>
                            <span className="w-1 h-1 bg-ivory-500 rounded-full" />
                            <span className="text-[10px] font-bold text-slate-400 italic">{new Date(alert.created_at).toLocaleString('en-GB')}</span>
                          </div>
                          <h3 className="text-2xl font-serif font-black text-slate-900 italic leading-tight mb-3">{alert.message}</h3>
                          <div className="flex gap-6">
                            <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-slate-400">
                              <History size={12} className="text-slate-300" /> 02 OVERRIDES
                            </span>
                            <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-slate-400">
                              <FileText size={12} className="text-slate-300" /> 01 ATTACHMENT
                            </span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className={`text-ivory-500 transition-transform ${selectedAlert?.id === alert.id ? 'rotate-90 text-slate-900' : ''}`} />
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* 3. Detail & Actions Panel */}
          <div className="col-span-12 lg:col-span-4">
            <AnimatePresence mode="wait">
              {selectedAlert ? (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="xi-card shadow-elevated sticky top-24"
                >
                  <div className="p-10 border-b border-ivory-200 bg-ivory-50">
                    <div className="flex justify-between items-start mb-8">
                      <span className={`px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest ${getSeverityBadge(selectedAlert.severity)} shadow-sm`}>
                        {selectedAlert.severity} PRIORITY
                      </span>
                      <button onClick={() => setSelectedAlert(null)} className="text-slate-400 hover:text-slate-900 transition-colors">
                        CLOSE
                      </button>
                    </div>
                    <h2 className="text-3xl font-serif font-black text-slate-900 italic leading-tight mb-3">{selectedAlert.regions.name}</h2>
                    <p className="text-xs text-slate-500 font-medium italic leading-relaxed">{selectedAlert.message}</p>
                  </div>

                  <div className="p-10 space-y-10">
                    <section>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 mb-6 flex items-center gap-2">
                        <ShieldAlert size={14} className="text-slate-400" /> Adjust Governance Level
                      </h4>
                      <div className="space-y-5">
                        <select className="w-full bg-ivory-50 border border-ivory-200 p-4 text-[10px] font-black uppercase tracking-widest rounded focus:ring-1 focus:ring-slate-900 outline-none">
                          <option>Low</option>
                          <option>Moderate</option>
                          <option>High</option>
                          <option>Severe</option>
                          <option>Critical</option>
                        </select>
                        <textarea 
                          placeholder="PROVIDE INSTITUTIONAL RATIONALE FOR THIS OVERRIDE..." 
                          className="w-full bg-ivory-50 border border-ivory-200 p-5 text-xs font-medium rounded h-32 outline-none focus:ring-1 focus:ring-slate-900 italic leading-relaxed"
                        />
                        <button className="btn-primary w-full py-4 text-[10px] uppercase tracking-[0.2em] font-black shadow-lg">Submit for Peer Review</button>
                      </div>
                    </section>

                    <section>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                        <MessageSquare size={14} className="text-slate-300" /> Internal Briefing Notes
                      </h4>
                      <div className="space-y-4 mb-8">
                        <div className="p-5 bg-ivory-50 rounded border-l-4 border-l-slate-900">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-[9px] font-black uppercase text-slate-900 tracking-widest">Principal Analyst</span>
                            <span className="text-[9px] font-bold text-slate-400">14:20 EAT</span>
                          </div>
                          <p className="text-[11px] leading-relaxed font-medium italic text-slate-600">Initial CHIRPS analysis suggests prolonged deficit. Recommending maintainance of High status until market price updates stabilize.</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <input type="text" placeholder="ADD BRIEFING NOTE..." className="flex-1 bg-ivory-50 border border-ivory-200 p-3 text-[9px] font-black uppercase tracking-widest rounded" />
                        <button className="p-3 bg-slate-900 text-white rounded hover:bg-slate-700 transition-colors shadow-md"><CheckCircle2 size={16} /></button>
                      </div>
                    </section>

                    <section>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                        <FileText size={14} className="text-slate-300" /> Evidence Dossier
                      </h4>
                      <div className="border-2 border-dashed border-ivory-500 rounded p-10 text-center hover:border-slate-900/30 transition-all cursor-pointer group bg-ivory-50/50">
                        <span className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] group-hover:text-slate-900">Upload PDF/FIELD REPORTS</span>
                      </div>
                    </section>
                  </div>
                </motion.div>
              ) : (
                <div className="xi-card p-16 h-[600px] flex flex-col items-center justify-center text-center bg-ivory-50/50 border-dashed border-2 border-ivory-500 rounded-lg">
                  <Database size={48} className="text-ivory-500 mb-8" />
                  <h3 className="text-2xl font-serif font-black text-slate-900 mb-4 italic">No Alert Selected</h3>
                  <p className="text-xs font-medium text-slate-400 leading-relaxed italic max-w-[240px]">Select an operational alert from the live feed to initiate the institutional review and override workflow.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}


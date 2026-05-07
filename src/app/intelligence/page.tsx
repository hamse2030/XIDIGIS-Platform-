"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { 
  ShieldAlert, Activity, Filter, Info, 
  ChevronRight, Calendar, Globe, Database,
  ArrowUpRight, ThermometerSun, Wheat
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DroughtMap = dynamic(() => import("@/components/intelligence/DroughtMap"), { 
  ssr: false,
  loading: () => <div className="h-[600px] bg-ivory-200 animate-pulse rounded-lg flex items-center justify-center text-slate-500 font-bold uppercase tracking-widest text-xs">Initializing GIS Engine...</div>
});

export default function IntelligenceSuite() {
  const [selectedRegion, setSelectedRegion] = useState<any>(null);
  const [compositeScore, setCompositeScore] = useState(68);

  const getSeverityColor = (score: number) => {
    if (score >= 75) return 'bg-brand-burnt';
    if (score >= 55) return 'bg-brand-deep-orange';
    if (score >= 35) return 'bg-brand-amber';
    if (score >= 15) return 'bg-brand-olive';
    return 'bg-brand-teal';
  };

  return (
    <div className="min-h-screen bg-ivory-50 pb-20">
      
      {/* 1. INSTITUTIONAL RISK BANNER */}
      <section className="bg-white border-b border-ivory-200 pt-12 pb-12">
        <div className="max-w-content grid grid-cols-12 gap-8 items-center">
          <div className="col-span-12 lg:col-span-5">
            <div className="xi-eyebrow">Strategic Intelligence Feed</div>
            <h1 className="text-4xl font-serif font-black text-slate-900 italic leading-tight mb-4">Regional Risk Monitoring</h1>
            <p className="text-slate-500 font-medium italic max-w-md">Bridging data gaps through high-fidelity multi-indicator forecasting and real-time geospatial analysis.</p>
          </div>
          <div className="col-span-12 lg:col-span-7 flex justify-end">
            <div className="xi-card p-8 flex items-center gap-12 border-l-4 border-l-brand-amber min-w-[500px]">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Composite Risk Index</div>
                <div className="flex items-end gap-3">
                  <span className="text-6xl font-serif font-black text-slate-900 leading-none">{compositeScore}</span>
                  <span className="text-sm font-bold text-slate-400 mb-1 uppercase tracking-tighter">/ 100</span>
                </div>
              </div>
              <div className="h-16 w-px bg-ivory-200" />
              <div className="flex-1">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-black uppercase text-brand-amber tracking-widest">Status: Elevated</span>
                  <span className="text-[10px] font-bold text-slate-400">TREND: WORSENING</span>
                </div>
                <div className="w-full h-2 bg-ivory-200 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${compositeScore}%` }}
                    className={`h-full ${getSeverityColor(compositeScore)}`}
                  />
                </div>
                <div className="mt-3 text-[9px] font-bold text-slate-400 uppercase flex gap-4">
                  <span className="flex items-center gap-1"><Database size={10} /> CHIRPS v2.0</span>
                  <span className="flex items-center gap-1"><Activity size={10} /> IPC PHASE 3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. GEOSPATIAL COMMAND CENTER */}
      <div className="max-w-content py-12">
        <div className="grid grid-cols-12 gap-8">
          
          {/* Main Map Card */}
          <div className="col-span-12 lg:col-span-8">
            <div className="xi-card overflow-hidden shadow-elevated">
              <div className="relative h-[650px]">
                <DroughtMap onRegionSelect={setSelectedRegion} />
                
                {/* Overlay Legend */}
                <div className="absolute top-6 right-6 z-[40] xi-card bg-white/90 backdrop-blur-md p-5 border-ivory-500 w-48 shadow-lg">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900 mb-4">Risk Legend</h4>
                  <div className="space-y-3">
                    {[
                      { label: 'Critical', color: 'bg-brand-burnt' },
                      { label: 'Severe', color: 'bg-brand-deep-orange' },
                      { label: 'Moderate', color: 'bg-brand-amber' },
                      { label: 'Watch', color: 'bg-brand-olive' },
                      { label: 'Stable', color: 'bg-brand-teal' }
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-sm ${item.color}`} />
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6 bg-white border-t border-ivory-200 flex items-center justify-between">
                <div className="flex gap-8">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Last Pipeline Sync</span>
                    <span className="text-xs font-bold text-slate-700">2026-05-07 12:45 EAT</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Layer Visibility</span>
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1"><Globe size={12} className="text-brand-primary" /> Multi-Indicator Composite</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-ivory-200 hover:bg-ivory-500 rounded text-[10px] font-black uppercase transition-colors">Export GeoJSON</button>
                  <button className="btn-primary text-[10px] uppercase tracking-widest font-black">Full Analytics</button>
                </div>
              </div>
            </div>
          </div>

          {/* Lateral Intelligence Panel */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <AnimatePresence mode="wait">
              {selectedRegion ? (
                <motion.div 
                  key="detail"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="xi-card h-full flex flex-col shadow-elevated"
                >
                  <div className="p-8 border-b border-ivory-200 bg-ivory-50">
                    <div className="flex justify-between items-start mb-6">
                      <span className={`px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest text-white ${getSeverityColor(selectedRegion.score || 0)}`}>
                        {selectedRegion.level || 'ELEVATED'}
                      </span>
                      <button onClick={() => setSelectedRegion(null)} className="text-slate-400 hover:text-slate-900 transition-colors">
                        <Info size={16} />
                      </button>
                    </div>
                    <h2 className="text-3xl font-serif font-black text-slate-900 italic leading-tight mb-2">{selectedRegion.name}</h2>
                    <div className="flex gap-2 mb-4">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Regional Admin Unit 1</span>
                    </div>
                  </div>
                  <div className="p-8 flex-1 space-y-8 overflow-y-auto max-h-[500px]">
                    <section>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900 mb-4">Indicator Breakdown</h4>
                      <div className="space-y-4">
                        {[
                          { label: 'Climate Anomaly', value: '+14%', status: 'Warning', icon: ThermometerSun },
                          { label: 'Food Security (IPC)', value: 'Phase 3', status: 'Alert', icon: Wheat },
                          { label: 'Market Volatility', value: '22%', status: 'Warning', icon: Activity }
                        ].map(i => (
                          <div key={i.label} className="p-4 bg-white border border-ivory-200 rounded-lg flex justify-between items-center shadow-sm">
                            <div className="flex items-center gap-3">
                              <i.icon size={16} className="text-slate-400" />
                              <span className="text-xs font-bold text-slate-600">{i.label}</span>
                            </div>
                            <span className={`text-xs font-black uppercase ${i.status === 'Alert' ? 'text-brand-burnt' : 'text-brand-amber'}`}>{i.value}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                    
                    <button className="w-full py-3 bg-slate-900 text-white rounded text-[10px] font-black uppercase tracking-widest hover:bg-slate-700 transition-all flex items-center justify-center gap-2">
                      Enter Monitoring System <ArrowUpRight size={14} />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="xi-card p-10 h-full flex flex-col items-center justify-center text-center bg-ivory-50 border-dashed border-2 border-ivory-500">
                  <Globe size={48} className="text-ivory-500 mb-6" />
                  <h3 className="text-xl font-serif font-black text-slate-900 mb-4 italic">No Region Selected</h3>
                  <p className="text-xs font-medium text-slate-400 leading-relaxed italic">Select a regional administrative unit on the interactive map to view localized risk indicators and intelligence artifacts.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

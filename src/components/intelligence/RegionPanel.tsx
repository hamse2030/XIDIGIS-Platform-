import React, { useEffect } from 'react';
import { X, Calendar, Database, AlertCircle } from 'lucide-react';

export interface RegionData {
  name: string;
  territory: "SOMALIA" | "SOMALILAND";
  ipcPhase: 1 | 2 | 3 | 4 | 5;
  riskLevel: "Critical" | "High" | "Moderate" | "Stable";
  stats: {
    conflictRisk: number;
    rainfallAnomaly: number;
    foodInsecure: number;
    populationAffected: number;
  };
  narrative: string;
  sources: string[];
  lastUpdated: string;
}

export interface RegionPanelProps {
  region?: RegionData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function RegionPanel({ region, isOpen, onClose }: RegionPanelProps) {
  // Lock body scroll when the panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Handle escape key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const getConflictColor = (val: number) => {
    if (val > 50) return 'text-risk-critical';
    if (val >= 20) return 'text-risk-moderate';
    return 'text-risk-stable';
  };

  const getRainfallColor = (val: number) => {
    if (val <= -40 || val > 40) return 'text-risk-critical';
    if (val < 0 || val > 15) return 'text-risk-moderate';
    return 'text-risk-stable';
  };

  const getFoodColor = (val: number) => {
    if (val > 40) return 'text-risk-critical';
    if (val >= 20) return 'text-risk-moderate';
    return 'text-risk-stable';
  };

  const getRiskBadgeClasses = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Critical': return 'bg-risk-critical/10 text-risk-critical border-risk-critical/50';
      case 'High': return 'bg-risk-high/10 text-risk-high border-risk-high/50';
      case 'Moderate': return 'bg-risk-moderate/10 text-risk-moderate border-risk-moderate/50';
      case 'Stable': return 'bg-risk-stable/10 text-risk-stable border-risk-stable/50';
      default: return 'bg-surface-elevated text-text-muted border-border';
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-[100] bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in Panel */}
      <div 
        className={`fixed right-0 top-0 bottom-0 z-[110] w-full md:w-96 bg-surface border-l border-border shadow-2xl transform transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
      >
        {region ? (
          <>
            {/* Header (Sticky) */}
            <div className="sticky top-0 z-10 bg-surface/95 backdrop-blur border-b border-border p-6 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-semibold text-text-muted uppercase tracking-[0.2em] block mb-1">
                    Administrative Level 1
                  </span>
                  <h2 className="text-2xl font-heading font-bold text-text-main">
                    {region.name}
                  </h2>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 text-text-muted hover:text-text-main hover:bg-surface-elevated rounded transition-colors"
                  aria-label="Close panel"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-1 border rounded-sm ${
                  region.territory === 'SOMALILAND' ? 'text-somaliland border-somaliland' : 'text-text-muted border-border'
                }`}>
                  {region.territory === 'SOMALILAND' ? 'SOMALILAND' : 'FEDERAL SOMALIA'}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 border border-border bg-surface-elevated text-text-secondary rounded-sm">
                  IPC Phase {region.ipcPhase}
                </span>
                <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-1 border rounded-sm ${getRiskBadgeClasses(region.riskLevel)}`}>
                  {region.riskLevel}
                </span>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto relative">
              <div className="p-6 space-y-8">
                
                {/* Stats Grid */}
                <div>
                  <h3 className="text-[10px] font-semibold text-text-muted uppercase tracking-[0.2em] mb-4">
                    Key Indicators
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Conflict Risk */}
                    <div className="p-4 bg-surface-elevated border border-border rounded xi-card">
                      <div className="text-[10px] font-medium text-text-muted uppercase tracking-wider mb-2">Conflict Risk</div>
                      <div className={`text-2xl font-mono font-semibold tracking-tight ${getConflictColor(region.stats.conflictRisk)}`}>
                        {region.stats.conflictRisk}%
                      </div>
                    </div>
                    {/* Rainfall Anomaly */}
                    <div className="p-4 bg-surface-elevated border border-border rounded xi-card">
                      <div className="text-[10px] font-medium text-text-muted uppercase tracking-wider mb-2">Rainfall Anomaly</div>
                      <div className={`text-2xl font-mono font-semibold tracking-tight ${getRainfallColor(region.stats.rainfallAnomaly)}`}>
                        {region.stats.rainfallAnomaly > 0 ? '+' : ''}{region.stats.rainfallAnomaly} <span className="text-xs">mm</span>
                      </div>
                    </div>
                    {/* Food Insecure */}
                    <div className="p-4 bg-surface-elevated border border-border rounded xi-card">
                      <div className="text-[10px] font-medium text-text-muted uppercase tracking-wider mb-2">Food Insecure</div>
                      <div className={`text-2xl font-mono font-semibold tracking-tight ${getFoodColor(region.stats.foodInsecure)}`}>
                        {region.stats.foodInsecure}%
                      </div>
                    </div>
                    {/* Population Affected */}
                    <div className="p-4 bg-surface-elevated border border-border rounded xi-card">
                      <div className="text-[10px] font-medium text-text-muted uppercase tracking-wider mb-2">Pop. Affected</div>
                      <div className="text-xl sm:text-2xl font-mono font-semibold tracking-tight text-text-main">
                        {(region.stats.populationAffected / 1000000).toFixed(1)}<span className="text-xs">M</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Narrative Section */}
                <div>
                  <h3 className="text-[10px] font-semibold text-text-muted uppercase tracking-[0.2em] mb-4">
                    Situation Summary
                  </h3>
                  <div className="pl-4 border-l-2 border-primary/50">
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {region.narrative}
                    </p>
                  </div>
                </div>

                {/* Sources Section */}
                <div>
                  <h3 className="text-[10px] font-semibold text-text-muted uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <Database size={12} /> Data Sources
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {region.sources.map((source, index) => (
                      <span key={index} className="text-[10px] font-medium text-text-muted bg-background border border-border px-2 py-1 rounded-sm uppercase tracking-wider">
                        {source}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-medium text-text-muted uppercase tracking-wider">
                    <Calendar size={12} />
                    Updated: {new Date(region.lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </div>
                </div>
                
                {/* Spacer to ensure bottom gradient doesn't cover content */}
                <div className="h-6" />
              </div>

              {/* Bottom Scroll Gradient */}
              <div className="sticky bottom-0 h-12 bg-gradient-to-t from-surface to-transparent pointer-events-none" />
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-text-muted p-6 text-center">
            <AlertCircle size={32} className="mb-4 opacity-50" />
            <p className="text-sm">No region selected.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default RegionPanel;

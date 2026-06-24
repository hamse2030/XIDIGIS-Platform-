import React from 'react';

export interface RegionStatus {
  name: string;
  riskLevel: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'STABLE';
  value?: number;
}

const DEFAULT_REGIONS: RegionStatus[] = [
  { name: 'Bakool', riskLevel: 'CRITICAL' },
  { name: 'Bay', riskLevel: 'HIGH' },
  { name: 'Jubbada Hoose', riskLevel: 'HIGH' },
  { name: 'Hiiraan', riskLevel: 'MODERATE' },
  { name: 'Galguduud', riskLevel: 'MODERATE' },
  { name: 'Mudug', riskLevel: 'MODERATE' },
  { name: 'Banadir', riskLevel: 'STABLE' },
  { name: 'Togdheer', riskLevel: 'HIGH' },
];

export interface RegionalStatusStripProps {
  regions?: RegionStatus[];
}

export function RegionalStatusStrip({ regions = DEFAULT_REGIONS }: RegionalStatusStripProps) {
  const criticalCount = regions.filter((r) => r.riskLevel === 'CRITICAL').length;
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const getRiskColors = (riskLevel: RegionStatus['riskLevel']) => {
    switch (riskLevel) {
      case 'CRITICAL':
        return { bg: 'bg-risk-critical', text: 'text-risk-critical' };
      case 'HIGH':
        return { bg: 'bg-risk-high', text: 'text-risk-high' };
      case 'MODERATE':
        return { bg: 'bg-risk-moderate', text: 'text-risk-moderate' };
      case 'STABLE':
        return { bg: 'bg-risk-stable', text: 'text-risk-stable' };
      default:
        return { bg: 'bg-text-muted', text: 'text-text-muted' };
    }
  };

  return (
    <div className="sticky top-0 z-40 w-full bg-surface border-b border-border">
      <div className="max-w-content py-3 flex flex-col md:flex-row items-start md:items-center gap-4">
        {/* Header Row */}
        <div className="flex items-center gap-4 shrink-0">
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted">
            Regional Status
          </span>
          {criticalCount > 0 && (
            <span className="text-[10px] font-semibold uppercase tracking-wider text-risk-critical flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-risk-critical animate-pulse" />
              {criticalCount} Critical
            </span>
          )}
          <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
            {timestamp}
          </span>
        </div>

        {/* Scrollable Region Pills */}
        <div className="w-full overflow-x-auto pb-1 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex items-center gap-3">
            {regions.map((region, index) => {
              const { bg, text } = getRiskColors(region.riskLevel);
              return (
                <div
                  key={`${region.name}-${index}`}
                  className="flex items-center gap-2 border border-border rounded-full px-3 py-1.5 whitespace-nowrap transition-colors duration-300 hover:border-primary/50 hover:bg-surface-elevated cursor-default"
                >
                  <div className={`w-2 h-2 rounded-full ${bg}`} />
                  <span className="text-[11px] font-medium text-text-secondary">
                    {region.name}
                  </span>
                  <span className={`text-[10px] font-semibold uppercase tracking-wider ${text}`}>
                    {region.riskLevel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegionalStatusStrip;

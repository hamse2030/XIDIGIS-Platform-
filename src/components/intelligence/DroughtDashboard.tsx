"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from "recharts";

const data = [
  { region: "Guban", current: 15, historical: 45 },
  { region: "Sool", current: 22, historical: 50 },
  { region: "Hawd", current: 30, historical: 60 },
  { region: "Ogo", current: 40, historical: 55 },
  { region: "Sanag", current: 18, historical: 42 },
];

export default function DroughtDashboard() {
  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="text-xl font-bold text-text-main uppercase tracking-tight mb-1">Precipitation Deficit</h3>
          <p className="text-[10px] font-semibold text-text-muted uppercase tracking-widest">30-Day Moving Average vs 5-Year Baseline (mm)</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary" />
            <span className="text-[9px] font-semibold text-text-secondary uppercase tracking-widest">Current</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-border" />
            <span className="text-[9px] font-semibold text-text-secondary uppercase tracking-widest">Historical</span>
          </div>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }} barGap={2}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E293B" />
            <XAxis 
              dataKey="region" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#94A3B8', fontFamily: 'var(--font-sans)', fontWeight: 600 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#94A3B8', fontFamily: 'var(--font-sans)', fontWeight: 600 }} 
            />
            <Tooltip
              cursor={{ fill: '#1F2937' }}
              contentStyle={{ 
                backgroundColor: '#111827', 
                border: '1px solid #1E293B',
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: '11px',
                textTransform: 'uppercase',
                color: '#F8FAFC'
              }}
            />
            <ReferenceLine y={40} stroke="#EF4444" strokeDasharray="3 3" opacity={0.5} />
            <Bar dataKey="current" fill="#2563EB" radius={[2, 2, 0, 0]} />
            <Bar dataKey="historical" fill="#1E293B" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

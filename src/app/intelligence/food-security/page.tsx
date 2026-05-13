"use client";

import { 
  TrendingDown, AlertCircle, 
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Cell, PieChart, Pie
} from 'recharts';

import IPCDashboard from "@/components/intelligence/IPCDashboard";

export default function FoodSecurityIntelligence() {
  return (
    <div className="min-h-screen bg-background pb-20">
      
      <header className="bg-surface border-b border-border py-10">
        <div className="max-w-content">
          <Link href="/intelligence" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-text-main transition-colors mb-6">
            <ArrowLeft size={14} /> Back to Intelligence Hub
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <div className="xi-eyebrow mb-2">Humanitarian Subsystem — IPC / FEWS NET</div>
              <h1 className="text-4xl font-bold text-text-main uppercase tracking-tight">Food Security & Livelihood Analytics</h1>
            </div>
            <div className="flex gap-4">
              <div className="px-4 py-2.5 bg-risk-high text-white text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                <AlertCircle size={14} /> STATUS: CRITICAL PRESSURE
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-content py-16">
        <IPCDashboard />
      </main>
    </div>
  );
}

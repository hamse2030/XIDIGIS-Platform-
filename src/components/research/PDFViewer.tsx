"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Download, Share2, ZoomIn, ZoomOut, 
  ChevronLeft, ChevronRight, FileText, Printer,
  Maximize2, Minimize2
} from "lucide-react";

interface PDFViewerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
  author?: string;
  date?: string;
}

export default function PDFViewer({ isOpen, onClose, title, url, author, date }: PDFViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[5000] flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4 md:p-10"
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className={`bg-ivory-50 w-full max-w-6xl h-full flex flex-col shadow-elevated rounded-sm overflow-hidden border border-ivory-500 ${
              isFullscreen ? 'fixed inset-0 max-w-none rounded-none' : ''
            }`}
          >
            {/* 1. PREMIUM HEADER */}
            <header className="bg-white border-b border-ivory-200 p-6 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-5">
                <div className="p-3 bg-ivory-100 text-slate-900 rounded border border-ivory-500">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-black text-slate-900 italic leading-tight">{title}</h3>
                  <div className="flex gap-3 mt-1">
                    <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">{author || "XIDIGIS RESEARCH"}</span>
                    <span className="w-1 h-1 bg-ivory-500 rounded-full mt-1.5" />
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{date || "MAY 2026"}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* PDF Toolbar */}
                <div className="flex bg-ivory-100 border border-ivory-500 rounded p-1 mr-4">
                  <button className="p-2 hover:bg-white text-slate-500 hover:text-slate-900 transition-colors rounded"><ZoomOut size={16} /></button>
                  <span className="px-3 py-1.5 text-[10px] font-black text-slate-900 flex items-center">100%</span>
                  <button className="p-2 hover:bg-white text-slate-500 hover:text-slate-900 transition-colors rounded"><ZoomIn size={16} /></button>
                </div>
                
                <div className="flex gap-2">
                  <button className="p-3 bg-white border border-ivory-500 text-slate-500 hover:text-slate-900 transition-colors rounded shadow-sm">
                    <Download size={18} />
                  </button>
                  <button className="p-3 bg-white border border-ivory-500 text-slate-500 hover:text-slate-900 transition-colors rounded shadow-sm">
                    <Printer size={18} />
                  </button>
                  <button 
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="p-3 bg-white border border-ivory-500 text-slate-500 hover:text-slate-900 transition-colors rounded shadow-sm"
                  >
                    {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                  </button>
                  <div className="w-px h-10 bg-ivory-200 mx-2" />
                  <button 
                    onClick={onClose}
                    className="p-3 bg-slate-900 text-white hover:bg-slate-700 transition-colors rounded shadow-lg"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            </header>

            {/* 2. PDF VIEWING AREA */}
            <main className="flex-1 bg-slate-800 p-8 overflow-y-auto flex justify-center">
              <div className="w-full max-w-4xl bg-white shadow-2xl min-h-[1100px] flex items-center justify-center border border-slate-700">
                {/* Embed PDF or Iframe */}
                <iframe 
                  src={`${url}#toolbar=0`} 
                  className="w-full h-full border-none"
                  title="PDF Viewer"
                />
              </div>
            </main>

            {/* 3. PREMIUM FOOTER / PAGINATION */}
            <footer className="bg-white border-t border-ivory-200 p-4 flex justify-between items-center px-10">
              <div className="flex items-center gap-4">
                <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors"><ChevronLeft size={20} /></button>
                <span className="text-[10px] font-black text-slate-900 tracking-[0.2em] uppercase">Page 1 of 24</span>
                <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors"><ChevronRight size={20} /></button>
              </div>
              <div className="flex gap-6">
                <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                  <Share2 size={12} /> Institutional Access Only
                </span>
              </div>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

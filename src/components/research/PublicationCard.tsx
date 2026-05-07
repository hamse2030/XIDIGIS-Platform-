"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Download, ExternalLink, Calendar, User, Eye } from "lucide-react";
import { ContentMetadata } from "@/lib/content/publications";
import PDFViewer from "./PDFViewer";

interface PublicationCardProps {
  publication: ContentMetadata;
  showPreview?: boolean;
}

export default function PublicationCard({ publication, showPreview = false }: PublicationCardProps) {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ y: -4 }}
        className="xi-card group shadow-elevated bg-white"
      >
        <div className="p-8">
          <div className="flex justify-between items-start mb-8">
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest italic rounded-sm">{publication.type}</span>
              <span className="px-3 py-1 bg-ivory-200 border border-ivory-500 text-slate-500 text-[9px] font-black uppercase tracking-widest italic rounded-sm">{publication.category}</span>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setIsViewerOpen(true)}
                className="p-2.5 bg-ivory-100 hover:bg-slate-900 hover:text-white rounded transition-all text-slate-400 shadow-sm border border-ivory-200" 
                title="View Document"
              >
                <Eye size={14} />
              </button>
              <button className="p-2.5 bg-ivory-100 hover:bg-slate-900 hover:text-white rounded transition-all text-slate-400 shadow-sm border border-ivory-200" title="Download PDF">
                <Download size={14} />
              </button>
            </div>
          </div>

          <h3 className="text-2xl font-serif font-black text-slate-900 mb-4 italic leading-tight group-hover:text-slate-700 transition-colors">
            {publication.title}
          </h3>

          <p className="text-[11px] text-slate-500 mb-10 leading-relaxed italic line-clamp-3">
            {publication.abstract}
          </p>

          <div className="flex justify-between items-center pt-8 border-t border-ivory-200">
            <div className="flex items-center gap-2.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <User size={12} className="text-ivory-500" /> {publication.author}
            </div>
            <div className="flex items-center gap-2.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <Calendar size={12} className="text-ivory-500" /> {publication.date}
            </div>
          </div>

          {showPreview && (
            <div 
              onClick={() => setIsViewerOpen(true)}
              className="mt-10 relative aspect-[16/10] bg-ivory-100 border border-ivory-500 rounded-sm overflow-hidden group/preview cursor-pointer"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center text-ivory-500 transition-transform group-hover/preview:scale-110">
                <FileText size={48} strokeWidth={1} />
                <span className="text-[10px] font-black uppercase mt-4 tracking-[0.2em]">Institutional Preview</span>
              </div>
              <div className="absolute inset-0 bg-slate-900/0 group-hover/preview:bg-slate-900/40 transition-all flex items-center justify-center opacity-0 group-hover/preview:opacity-100">
                <button className="px-6 py-3 bg-white text-slate-900 text-[10px] font-black uppercase tracking-widest italic shadow-elevated flex items-center gap-3 rounded-sm">
                  Launch Interactive Viewer <ExternalLink size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <PDFViewer 
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        title={publication.title}
        url={publication.pdfUrl || "#"}
        author={publication.author}
        date={publication.date}
      />
    </>
  );
}



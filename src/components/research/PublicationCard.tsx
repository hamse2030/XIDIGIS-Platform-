"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Download, ExternalLink, Calendar, User, Eye, Terminal, Database } from "lucide-react";
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
        whileHover={{ y: -5 }}
        className="xi-card group bg-surface border-border-subtle h-full transition-all"
      >
        <div className="p-8">
          <div className="flex justify-between items-start mb-10">
            <div className="flex gap-3">
              <span className="px-3 py-1 border border-primary text-primary text-[9px] font-mono font-bold uppercase tracking-widest bg-primary/5">{publication.type}</span>
              <span className="px-3 py-1 border border-border-subtle text-text-dim text-[9px] font-mono font-bold uppercase tracking-widest">{publication.category}</span>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setIsViewerOpen(true)}
                className="w-10 h-10 border border-border-subtle hover:border-primary hover:text-primary transition-all text-text-dim flex items-center justify-center bg-navy-950/50" 
                title="View Document"
              >
                <Eye size={16} />
              </button>
              <button className="w-10 h-10 border border-border-subtle hover:border-primary hover:text-primary transition-all text-text-dim flex items-center justify-center bg-navy-950/50" title="Download PDF">
                <Download size={16} />
              </button>
            </div>
          </div>

          <h3 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-tight leading-tight group-hover:text-primary transition-colors">
            {publication.title}
          </h3>

          <p className="text-sm text-text-dim mb-12 leading-relaxed font-medium line-clamp-3">
            {publication.abstract}
          </p>

          <div className="flex justify-between items-center pt-8 border-t border-border-subtle text-[10px] font-mono font-bold text-text-dim uppercase tracking-widest">
            <div className="flex items-center gap-3">
              <User size={14} className="text-primary/40" /> {publication.author}
            </div>
            <div className="flex items-center gap-3">
              <Calendar size={14} className="text-primary/40" /> {publication.date}
            </div>
          </div>

          {showPreview && (
            <div 
              onClick={() => setIsViewerOpen(true)}
              className="mt-12 relative aspect-[16/10] bg-navy-950 border border-border-subtle overflow-hidden group/preview cursor-pointer"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center text-text-dim/20 transition-transform group-hover/preview:scale-110">
                <Terminal size={64} strokeWidth={1} />
                <span className="text-[10px] font-mono font-bold uppercase mt-6 tracking-[0.4em]">Initialize Preview Protocol</span>
              </div>
              <div className="absolute inset-0 bg-primary/5 group-hover/preview:bg-primary/20 transition-all flex items-center justify-center opacity-0 group-hover/preview:opacity-100">
                <button className="btn-primary flex items-center gap-3 shadow-glow">
                  Initialize Viewer <ExternalLink size={14} />
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

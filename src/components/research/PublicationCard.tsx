"use client";

import { motion } from "framer-motion";
import { FileText, Download, Share2, ExternalLink, Calendar, User } from "lucide-react";
import { ContentMetadata } from "@/lib/content/publications";

interface PublicationCardProps {
  publication: ContentMetadata;
  showPreview?: boolean;
}

export default function PublicationCard({ publication, showPreview = false }: PublicationCardProps) {
  const generateCitation = () => {
    return `XIDIGIS (${publication.date.split(' ').pop()}). "${publication.title}." XIDIGIS Strategic Research Series.`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="xi-card group"
    >
      <div className="xi-card__body">
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-2">
            <span className="px-2 py-0.5 border border-primary text-primary text-[8px] font-black uppercase tracking-widest italic rounded-sm">{publication.type}</span>
            <span className="px-2 py-0.5 bg-surface-alt border border-border text-text-muted text-[8px] font-black uppercase tracking-widest italic rounded-sm">{publication.category}</span>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => {
                navigator.clipboard.writeText(generateCitation());
                alert("Citation copied to clipboard!");
              }}
              className="p-2 hover:bg-surface-alt rounded-full transition-colors text-text-muted hover:text-primary" 
              title="Copy Citation"
            >
              <Share2 size={14} />
            </button>
            <a href={`/research/${publication.slug}`} className="p-2 hover:bg-surface-alt rounded-full transition-colors text-text-muted hover:text-primary" title="Download PDF">
              <Download size={14} />
            </a>
          </div>
        </div>

        <h3 className="text-xl font-serif font-black text-primary mb-4 italic leading-tight group-hover:text-secondary transition-colors">
          {publication.title}
        </h3>

        <p className="text-[10px] text-text-muted mb-8 leading-relaxed italic">
          {publication.abstract}
        </p>

        <div className="flex justify-between items-center pt-6 border-t border-gray-100">
          <div className="flex items-center gap-2 text-[9px] font-black text-text-muted uppercase tracking-widest italic">
            <User size={12} /> {publication.author}
          </div>
          <div className="flex items-center gap-2 text-[9px] font-black text-text-muted uppercase tracking-widest italic">
            <Calendar size={12} /> {publication.date}
          </div>
        </div>

        {showPreview && (
          <div className="mt-8 relative aspect-[4/3] bg-surface-alt border border-border rounded overflow-hidden">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-200">
              <FileText size={48} />
              <span className="text-[10px] font-black uppercase mt-2 tracking-widest italic">Institutional Preview</span>
            </div>
            <div className="absolute inset-0 bg-primary/0 hover:bg-primary/5 transition-colors flex items-center justify-center opacity-0 hover:opacity-100 cursor-pointer">
              <button className="px-4 py-2 bg-white text-primary text-[10px] font-black uppercase tracking-widest italic shadow-xl flex items-center gap-2 rounded-sm border border-border">
                Open Full Viewer <ExternalLink size={12} />
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}


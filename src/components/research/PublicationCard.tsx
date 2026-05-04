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
      className="bg-white dark:bg-slate-800 border border-secondary/10 hover:border-primary/30 transition-all shadow-sm hover:shadow-xl rounded-sm overflow-hidden"
    >
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-2">
            <span className="px-2 py-0.5 bg-primary text-white text-[9px] font-black uppercase tracking-widest italic">{publication.type}</span>
            <span className="px-2 py-0.5 bg-secondary/20 text-primary text-[9px] font-black uppercase tracking-widest italic">{publication.category}</span>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => {
                navigator.clipboard.writeText(generateCitation());
                alert("Citation copied to clipboard!");
              }}
              className="p-2 hover:bg-accent rounded-full transition-colors text-primary" 
              title="Copy Citation"
            >
              <Share2 size={16} />
            </button>
            <a href={`/research/${publication.slug}`} className="p-2 hover:bg-accent rounded-full transition-colors text-primary" title="Download PDF">
              <Download size={16} />
            </a>
          </div>
        </div>

        <h3 className="text-2xl font-serif font-black text-primary dark:text-white mb-4 italic leading-tight group-hover:text-secondary transition-colors">
          {publication.title}
        </h3>

        <p className="text-sm text-primary/70 dark:text-slate-400 mb-8 leading-relaxed italic">
          {publication.abstract}
        </p>

        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-secondary/5">
          <div className="flex items-center gap-2 text-[10px] font-bold text-primary/50 uppercase tracking-widest italic">
            <User size={12} /> {publication.author}
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-primary/50 uppercase tracking-widest italic justify-end">
            <Calendar size={12} /> {publication.date}
          </div>
        </div>

        {showPreview && (
          <div className="mt-8 relative aspect-[4/3] bg-accent/20 border border-secondary/10 rounded overflow-hidden group">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-primary/20">
              <FileText size={48} />
              <span className="text-[10px] font-black uppercase mt-2 tracking-widest italic">Institutional Preview</span>
            </div>
            {/* React-PDF would render here in a real implementation */}
            <div className="absolute inset-0 bg-primary/0 hover:bg-primary/5 transition-colors flex items-center justify-center opacity-0 hover:opacity-100 cursor-pointer">
              <button className="px-4 py-2 bg-white text-primary text-[10px] font-black uppercase tracking-widest italic shadow-xl flex items-center gap-2">
                Open Full Viewer <ExternalLink size={12} />
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}


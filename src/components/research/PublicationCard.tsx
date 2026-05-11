import Link from "next/link";
import { BookOpen, Download } from "lucide-react";

interface Publication {
  id: string;
  title: string;
  type: string;
  date: string;
  author: string;
  theme: string;
  readTime: string;
  classification: string;
  slug: string;
}

export default function PublicationCard({ publication }: { publication: Publication }) {
  return (
    <div className="xi-card bg-surface hover:bg-surface-elevated border-border flex flex-col h-full group">
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <span className={`px-2 py-1 text-[9px] font-bold uppercase tracking-widest border ${
            publication.classification === 'UNCLASSIFIED' ? 'border-risk-stable text-risk-stable' :
            publication.classification === 'INTERNAL' ? 'border-risk-mod text-risk-mod' :
            'border-risk-critical text-risk-critical'
          }`}>
            {publication.classification}
          </span>
          <span className="text-[10px] font-medium text-text-muted uppercase tracking-widest">{publication.date}</span>
        </div>
        
        <h3 className="text-lg font-bold text-text-main leading-snug mb-3 group-hover:text-primary transition-colors">
          {publication.title}
        </h3>
        
        <div className="text-[10px] font-semibold text-text-secondary uppercase tracking-widest mb-6">
          <span className="opacity-60">Authored by:</span> {publication.author}
        </div>
        
        <div className="mt-auto pt-6 border-t border-border flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[9px] font-medium text-text-muted uppercase tracking-widest mb-1">Type</span>
            <span className="text-[10px] font-bold text-text-main uppercase tracking-widest">{publication.type}</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-[9px] font-medium text-text-muted uppercase tracking-widest mb-1">Read Time</span>
            <span className="text-[10px] font-bold text-text-main uppercase tracking-widest">{publication.readTime}</span>
          </div>
        </div>
      </div>
      
      <div className="border-t border-border flex bg-background">
        <Link href={`/research/reports/${publication.slug}`} className="flex-1 py-3 text-center text-[10px] font-bold text-text-main uppercase tracking-widest hover:text-primary transition-colors border-r border-border flex items-center justify-center gap-2">
          <BookOpen size={14} /> View Dossier
        </Link>
        <button className="px-6 hover:bg-surface-elevated transition-colors text-text-muted hover:text-text-main">
          <Download size={14} />
        </button>
      </div>
    </div>
  );
}

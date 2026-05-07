import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Link from "next/link";
import { Globe, ShieldCheck, User, LayoutDashboard } from "lucide-react";
import type { Metadata } from "next";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "XIDIGIS | Strategic Intelligence & Policy Research Institute",
  description: "XIDIGIS is the authoritative regional platform for strategic foresight, multi-indicator risk intelligence, and independent policy research in the Horn of Africa.",
  keywords: ["Somaliland", "Intelligence", "Research", "Foresight", "Strategic Policy", "Risk Monitoring", "Climate Resilience"],
  openGraph: {
    title: "XIDIGIS | Institutional Intelligence Hub",
    description: "Bridging the information gap through high-fidelity data and expert analysis.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-ivory-50 text-slate-700`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          
          {/* 1. TOP NAV (Institutional Wordmark) */}
          <header className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-md border-b border-ivory-200 shadow-sm">
            <div className="max-w-content h-16 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-4 group">
                <div className="w-8 h-8 bg-slate-900 rounded flex items-center justify-center text-white font-serif font-black text-lg italic transition-transform group-hover:scale-105">X</div>
                <div className="flex flex-col leading-none">
                  <span className="font-serif font-black text-xl text-slate-900 italic tracking-tighter">XIDIGIS</span>
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 italic">Institute</span>
                </div>
              </Link>
              
              <nav className="hidden lg:flex items-center gap-10">
                <Link href="/" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest text-[11px]">Home</Link>
                <Link href="/research" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest text-[11px]">Research Hub</Link>
                <Link href="/intelligence" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest text-[11px]">Intelligence Hub</Link>
                <Link href="/ops/alerts" className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest text-[11px]">
                  <LayoutDashboard size={12} className="text-slate-400" /> Strategic Ops
                </Link>
                <Link href="/forum" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest text-[11px]">Public Discourse</Link>
              </nav>

              <div className="flex items-center gap-6">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-ivory-200 border border-ivory-500 rounded text-[10px] font-black text-slate-700 uppercase tracking-widest">
                  <Globe size={12} /> EN | SO
                </div>
                <button className="btn-primary text-[10px] uppercase tracking-widest font-black py-2.5 px-6 shadow-lg">Analyst Login</button>
              </div>
            </div>
          </header>

          <main className="pt-16 min-h-screen">
            {children}
          </main>

          {/* 2. INSTITUTIONAL FOOTER */}
          <footer className="bg-white border-t border-ivory-200 pt-20 pb-12 mt-20">
            <div className="max-w-content">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-slate-900 text-white rounded flex items-center justify-center font-serif font-black text-xl italic">X</div>
                    <div className="flex flex-col leading-none">
                      <span className="font-serif font-black text-2xl italic tracking-tighter text-slate-900">XIDIGIS</span>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 italic">Policy Research Forum</span>
                    </div>
                  </div>
                  <p className="text-slate-500 max-w-md mb-10 leading-relaxed font-medium italic">
                    XIDIGIS is an independent strategic intelligence platform dedicated to bridging the information gap in Somaliland through evidence-based analysis and high-level collaborative discourse.
                  </p>
                  <div className="flex gap-4">
                    {[Globe, ShieldCheck, User].map((Icon, i) => (
                      <div key={i} className="w-10 h-10 rounded-full border border-ivory-200 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all cursor-pointer text-slate-700">
                        <Icon size={18} />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-sans font-black text-slate-900 mb-8 uppercase tracking-widest text-[10px]">Strategic Verticals</h4>
                  <ul className="space-y-4 text-xs font-bold text-slate-500 italic">
                    <li className="hover:text-slate-900 transition-colors cursor-pointer">Climate Resilience</li>
                    <li className="hover:text-slate-900 transition-colors cursor-pointer">Maritime Security</li>
                    <li className="hover:text-slate-900 transition-colors cursor-pointer">Economic Forecasting</li>
                    <li className="hover:text-slate-900 transition-colors cursor-pointer">Digital Sovereignty</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-sans font-black text-slate-900 mb-8 uppercase tracking-widest text-[10px]">Institutional</h4>
                  <ul className="space-y-4 text-xs font-bold text-slate-500 italic">
                    <li className="hover:text-slate-900 transition-colors cursor-pointer">About the Institute</li>
                    <li className="hover:text-slate-900 transition-colors cursor-pointer">Research Methodology</li>
                    <li className="hover:text-slate-900 transition-colors cursor-pointer">Advisory Board</li>
                    <li className="hover:text-slate-900 transition-colors cursor-pointer">Contact Operations</li>
                  </ul>
                </div>
              </div>

              <div className="pt-8 border-t border-ivory-200 flex flex-col md:flex-row justify-between gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500 italic">
                <span>© 2026 XIDIGIS INSTITUTE FOR STRATEGIC RESEARCH. AUTHORITATIVE & INDEPENDENT.</span>
                <div className="flex gap-8">
                  <span className="hover:text-slate-900 cursor-pointer">Privacy Protocol</span>
                  <span className="hover:text-slate-900 cursor-pointer">Terms of Engagement</span>
                </div>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}


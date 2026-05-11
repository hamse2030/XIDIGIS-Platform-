import { Outfit, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Link from "next/link";
import { Globe, ShieldCheck, User, LayoutDashboard, Terminal } from "lucide-react";
import type { Metadata } from "next";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "FALAG | Strategic Intelligence & Analytical Research System",
  description: "FALAG is a high-credibility regional platform for strategic intelligence, real-time risk monitoring, and independent analytical research.",
  keywords: ["FALAG", "Intelligence System", "Regional Research", "Strategic Foresight", "Risk Monitoring", "Data-Driven Analysis"],
  openGraph: {
    title: "FALAG | Institutional Intelligence Platform",
    description: "Modern analytical environment for strategic regional monitoring and foresight.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.variable} ${outfit.variable} ${mono.variable} font-sans antialiased bg-background text-text-main`}>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem>
          
          {/* 1. STRATEGIC NAVIGATION (Intelligence Grade) */}
          <header className="fixed top-0 left-0 right-0 z-[100] bg-background/80 backdrop-blur-xl border-b border-border-subtle">
            <div className="max-w-content h-20 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-6 group">
                <div className="w-10 h-10 border border-primary/30 flex items-center justify-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors" />
                   <Terminal size={20} className="text-primary relative z-10" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-display font-black text-2xl tracking-tighter uppercase">FALAG</span>
                  <span className="text-[10px] font-mono font-bold tracking-[0.4em] text-primary/70 uppercase">Intelligence</span>
                </div>
              </Link>
              
              <nav className="hidden lg:flex items-center gap-12">
                {[
                  { label: 'Intelligence Hub', href: '/intelligence' },
                  { label: 'Research Hub', href: '/research' },
                  { label: 'Strategic Ops', href: '/ops/alerts', icon: LayoutDashboard },
                  { label: 'Discourse', href: '/forum' }
                ].map((item) => (
                  <Link 
                    key={item.label}
                    href={item.href} 
                    className="text-[11px] font-mono font-bold text-text-dim hover:text-primary transition-all uppercase tracking-widest flex items-center gap-2"
                  >
                    {item.icon && <item.icon size={14} className="opacity-50" />}
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-8">
                <div className="hidden sm:flex items-center gap-3 text-[10px] font-mono font-bold text-text-dim uppercase tracking-widest">
                  <Globe size={14} className="text-primary/50" />
                  <span className="text-primary">EN</span>
                  <span className="opacity-30">|</span>
                  <span>SO</span>
                </div>
                <button className="btn-primary">
                  Access Portal
                </button>
              </div>
            </div>
          </header>

          <main className="pt-20 min-h-screen relative overflow-hidden">
            {/* Background Aesthetics */}
            <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none -translate-x-1/2 translate-y-1/2" />
            
            <div className="relative z-10">
              {children}
            </div>
          </main>

          {/* 2. ANALYTICAL FOOTER */}
          <footer className="bg-surface border-t border-border-subtle pt-32 pb-16 relative z-20">
            <div className="max-w-content">
              <div className="grid grid-cols-12 gap-12 mb-24">
                <div className="col-span-12 lg:col-span-5">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 border border-primary/30 flex items-center justify-center">
                       <Terminal size={20} className="text-primary" />
                    </div>
                    <div className="flex flex-col leading-none">
                      <span className="font-display font-black text-2xl tracking-tighter uppercase">FALAG</span>
                      <span className="text-[10px] font-mono font-bold tracking-[0.4em] text-primary/70 uppercase italic">Analytical Research System</span>
                    </div>
                  </div>
                  <p className="text-text-dim max-w-md mb-12 text-sm leading-relaxed font-medium">
                    FALAG is a modern institutional intelligence platform dedicated to high-fidelity risk monitoring, strategic regional forecasting, and independent policy analysis within complex environments.
                  </p>
                  <div className="flex gap-6">
                    {[Globe, ShieldCheck, User].map((Icon, i) => (
                      <div key={i} className="w-12 h-12 border border-border-subtle flex items-center justify-center hover:border-primary hover:text-primary transition-all cursor-pointer text-text-dim group">
                        <Icon size={20} className="group-hover:scale-110 transition-transform" />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="col-span-6 lg:col-span-3 lg:col-start-8">
                  <h4 className="font-mono font-bold text-primary mb-10 uppercase tracking-[0.3em] text-[10px]">Intelligence Verticals</h4>
                  <ul className="space-y-5 text-[11px] font-bold text-text-dim uppercase tracking-widest">
                    <li className="hover:text-primary transition-colors cursor-pointer flex items-center gap-2">
                       <div className="w-1 h-1 bg-primary/30 rounded-full" /> Climate Stress
                    </li>
                    <li className="hover:text-primary transition-colors cursor-pointer flex items-center gap-2">
                       <div className="w-1 h-1 bg-primary/30 rounded-full" /> Security Density
                    </li>
                    <li className="hover:text-primary transition-colors cursor-pointer flex items-center gap-2">
                       <div className="w-1 h-1 bg-primary/30 rounded-full" /> Market Stability
                    </li>
                    <li className="hover:text-primary transition-colors cursor-pointer flex items-center gap-2">
                       <div className="w-1 h-1 bg-primary/30 rounded-full" /> Conflict Dynamics
                    </li>
                  </ul>
                </div>

                <div className="col-span-6 lg:col-span-2">
                  <h4 className="font-mono font-bold text-primary mb-10 uppercase tracking-[0.3em] text-[10px]">Institutional</h4>
                  <ul className="space-y-5 text-[11px] font-bold text-text-dim uppercase tracking-widest">
                    <li className="hover:text-primary transition-colors cursor-pointer">Operations</li>
                    <li className="hover:text-primary transition-colors cursor-pointer">Methodology</li>
                    <li className="hover:text-primary transition-colors cursor-pointer">Advisory</li>
                    <li className="hover:text-primary transition-colors cursor-pointer">Governance</li>
                  </ul>
                </div>
              </div>

              <div className="pt-10 border-t border-border-subtle flex flex-col md:flex-row justify-between gap-8 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-text-dim/60">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-low animate-pulse" />
                  <span>SYSTEM OPERATIONAL // FALAG DATA CORE v1.4.0</span>
                </div>
                <div className="flex gap-12">
                  <span className="hover:text-primary cursor-pointer transition-colors">Security Protocol</span>
                  <span className="hover:text-primary cursor-pointer transition-colors">© 2026 FALAG SYSTEM</span>
                </div>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}

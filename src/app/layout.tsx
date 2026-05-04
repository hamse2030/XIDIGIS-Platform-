import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MessageSquare, Globe, ShieldCheck, User, Search, Activity } from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "XIDIGIS | Strategic Intelligence & Policy Research",
  description: "Bridging Somaliland's Information Gap with high-fidelity research and collaborative discourse.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-[--color-surface] dark:bg-[#0F172A]`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          
          {/* Institutional Navigation */}
          <header className="fixed top-0 left-0 right-0 z-[100] bg-white border-b border-gray-200">
            <div className="container mx-auto h-16 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-serif font-black text-lg italic transition-transform group-hover:scale-105">X</div>
                <div className="flex flex-col leading-none">
                  <span className="font-serif font-black text-xl text-primary italic tracking-tighter">XIDIGIS</span>
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary italic">Institute</span>
                </div>
              </Link>
              
              <nav className="hidden lg:flex items-center gap-8">
                <Link href="/" className="nav-link">Home</Link>
                <Link href="/research" className="nav-link">Research Hub</Link>
                <Link href="/intelligence" className="nav-link flex items-center gap-2">
                   Intelligence
                </Link>
                <Link href="/about" className="nav-link">About</Link>
                <Link href="/forum" className="nav-link text-primary font-black">Insights</Link>
              </nav>

              <div className="flex items-center gap-6">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-surface-alt border border-border rounded text-[10px] font-black text-primary uppercase tracking-widest">
                  <Globe size={12} /> EN | SO
                </div>
                <ThemeToggle />
                <button className="hidden md:block btn btn-primary">Sign In</button>
              </div>
            </div>
          </header>

          <main className="pt-16 min-h-screen">
            {children}
          </main>

          {/* Institutional Footer */}
          <footer className="xi-footer section pb-12">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-white text-primary rounded flex items-center justify-center font-[--font-heading] font-black text-2xl italic">X</div>
                    <div className="flex flex-col leading-none">
                      <span className="font-[--font-heading] font-black text-3xl italic tracking-tighter">XIDIGIS</span>
                      <span className="text-xs font-black uppercase tracking-[0.3em] text-[--color-secondary-light] italic">Policy Research Forum</span>
                    </div>
                  </div>
                  <p className="text-[--color-text-on-dark] opacity-80 max-w-md mb-10 leading-relaxed font-medium italic">
                    XIDIGIS is an independent strategic intelligence platform dedicated to bridging the information gap in Somaliland through evidence-based analysis and high-level collaborative discourse.
                  </p>
                  <div className="flex gap-4">
                    {[Globe, ShieldCheck, User].map((Icon, i) => (
                      <div key={i} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-primary transition-all cursor-pointer">
                        <Icon size={18} />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-[--font-heading] font-black text-[--color-secondary-light] mb-8 uppercase tracking-widest text-xs">Core Values</h4>
                  <ul className="space-y-4 text-sm font-bold text-[--color-text-muted-dark] italic">
                    <li className="hover:text-[--color-text-on-dark] transition-colors">Radical Independence</li>
                    <li className="hover:text-[--color-text-on-dark] transition-colors">Methodological Rigor</li>
                    <li className="hover:text-[--color-text-on-dark] transition-colors">Regional Sovereignty</li>
                    <li className="hover:text-[--color-text-on-dark] transition-colors">Digital Accessibility</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-[--font-heading] font-black text-[--color-secondary-light] mb-8 uppercase tracking-widest text-xs">Our Mission</h4>
                  <ul className="space-y-4 text-sm font-bold text-[--color-text-muted-dark] italic">
                    <li className="hover:text-[--color-text-on-dark] transition-colors">Policy Optimization</li>
                    <li className="hover:text-[--color-text-on-dark] transition-colors">Strategic Foresight</li>
                    <li className="hover:text-[--color-text-on-dark] transition-colors">Knowledge Transfer</li>
                    <li className="hover:text-[--color-text-on-dark] transition-colors">Forum Moderation</li>
                  </ul>
                </div>
              </div>

              <div className="pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between gap-6 text-[10px] font-black uppercase tracking-widest text-text-muted-dark italic">
                <span>© 2026 XIDIGIS INSTITUTE FOR STRATEGIC RESEARCH. AUTHORITATIVE &amp; INDEPENDENT.</span>
                <div className="flex gap-8">
                  <span className="hover:text-[--color-secondary-light] cursor-pointer">Privacy Protocol</span>
                  <span className="hover:text-[--color-secondary-light] cursor-pointer">Terms of Engagement</span>
                  <span className="hover:text-[--color-secondary-light] cursor-pointer">Academic Integrity</span>
                </div>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}

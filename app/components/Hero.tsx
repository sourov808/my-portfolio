'use client';

import { useEffect, useState } from 'react';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen mesh-gradient pt-24 overflow-hidden">
      <div className="absolute inset-0 simulation-grid opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-300">System Online</span>
            </div>

            <h1 className="font-display font-black text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-none mb-4">
              <span className="text-cyber-lime font-mono text-3xl md:text-4xl block mb-2">$ ./init_sourov.sh</span>
              --interactive
            </h1>

            <div className="border-l-4 border-cyber-lime bg-black/40 p-4 rounded-r-lg mb-8">
              <p className="font-mono text-cyber-lime text-sm">
                <span className="text-green-500">✓</span> System ready.<br />
                <span className="text-green-500">✓</span> Specializing in Next.js, React, and scalable application architecture.<br />
                <span className="text-green-500">✓</span> Status: Actively building production-ready systems.<br />
                <span className="text-primary animate-blink">▋</span>
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="bg-primary hover:bg-primary/90 text-white text-lg font-bold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(139,92,246,0.6)]">
                EXPLORE_PROJECTS
              </button>
              <button className="border border-primary/30 bg-primary/5 hover:bg-primary/10 text-primary text-lg font-bold px-8 py-4 rounded-xl transition-all duration-200">
                DOWNLOAD_RESUME
              </button>
            </div>
          </div>

          <div className={`relative transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="glass rounded-2xl overflow-hidden relative">
              <div className="bg-[#1e1b2e]/90 border-b border-primary/20 px-4 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                <span className="ml-4 font-mono text-xs uppercase tracking-widest text-slate-400">portfolio.exe</span>
              </div>
              
              <div className="relative h-80 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 orbit-ring animate-spin-slow"></div>
                  <div className="w-36 h-36 orbit-ring animate-spin-reverse" style={{ animationDuration: '10s' }}></div>
                  <div className="w-24 h-24 orbit-ring animate-spin-slow" style={{ animationDuration: '15s' }}></div>
                </div>
                
                <div className="relative z-10 w-32 h-32 rounded-2xl bg-gradient-to-br from-primary to-electric-blue flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.5)]">
                  <span className="material-symbols-outlined text-white text-5xl">code</span>
                </div>
              </div>

              <div className="p-4 border-t border-white/5 space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-slate-400">ARCHITECTURE</span>
                    <span className="text-cyber-lime">85%</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-gradient-to-r from-primary to-cyber-lime rounded-full shadow-[0_0_10px_rgba(139,92,246,0.6)]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-slate-400">LATENCY</span>
                    <span className="text-green-500">12ms</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full w-[88%] bg-gradient-to-r from-green-500 to-cyber-lime rounded-full shadow-[0_0_10px_rgba(34,197,94,0.6)]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

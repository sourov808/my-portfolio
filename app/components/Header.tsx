'use client';

import { useState, useEffect } from 'react';

const navLinks = [
  { href: '#hero', label: '01. /boot' },
  { href: '#stats', label: '02. /stats' },
  { href: '#timeline', label: '03. /timeline' },
  { href: '#skills', label: '04. /modules' },
  { href: '#playground', label: '05. /system' },
  { href: '#testimonials', label: '06. /feedback' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = navLinks.map(link => link.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 100) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#0a0812]/90 backdrop-blur-md border-b border-primary/20' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-4 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2 group">
          <span className="material-symbols-outlined text-primary text-2xl">terminal</span>
          <span className="font-display font-bold text-white text-lg">DEV<span className="text-cyber-lime">_PORTFOLIO</span></span>
          <span className="text-cyber-lime font-mono text-xs ml-1">v2.4.1</span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                activeSection === link.href.slice(1)
                  ? 'bg-primary/10 text-primary'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center bg-black/40 border border-primary/40 rounded-lg px-3 py-2">
            <span className="text-cyber-lime font-mono text-sm mr-2">$</span>
            <input
              type="text"
              placeholder="search..."
              className="bg-transparent border-none outline-none text-cyber-lime font-mono text-sm w-24 placeholder:text-slate-600"
            />
            <span className="animate-blink text-cyber-lime ml-1">_</span>
          </div>
          <button className="bg-primary hover:bg-primary/90 text-white text-sm font-bold px-5 py-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(139,92,246,0.6)]">
            HIRE_EXPERT
          </button>
        </div>
      </div>
    </header>
  );
}

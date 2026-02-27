'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const typingTexts = [
  'Full-Stack Developer',
  'Available for Work',
  'React Developer',
  'Next.js Expert',
  'TypeScript Developer',
];

export default function Hero() {
  const { isLight } = useTheme();
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const currentText = typingTexts[textIndex];

    if (!isDeleting) {
      if (charIndex < currentText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentText.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        const delay = currentText === 'Available for Work' ? 3000 : 1500;
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, delay);
        return () => clearTimeout(timeout);
      }
    } else {
      if (charIndex > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(currentText.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setIsDeleting(false);
        setTextIndex((textIndex + 1) % typingTexts.length);
      }
    }
  }, [charIndex, isDeleting, textIndex]);

  return (
    <section id="hero" className={`relative min-h-screen pt-9 overflow-hidden ${isLight ? 'bg-white' : 'mesh-gradient'}`}>
      <div className={`absolute inset-0 simulation-grid ${isLight ? 'opacity-10' : 'opacity-30'}`}></div>

      <div className="max-w-7xl mx-auto px-6 md:px-20 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className={`border rounded-full px-4 py-2 mb-6 inline-flex items-center gap-2 ${isLight ? 'bg-gray-100 border-gray-200' : 'bg-black/40 border-primary/30'}`}>
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className={`font-mono text-xs ${isLight ? 'text-gray-700' : 'text-cyber-lime'}`}>$</span>
              <span className={`font-mono text-xs ${isLight ? 'text-gray-900' : 'text-cyber-lime'}`}>{displayText}</span>
              <span className={`animate-blink ${isLight ? 'text-gray-700' : 'text-cyber-lime'}`}>▋</span>
            </div>

            <h1 className={`font-display font-black text-5xl md:text-6xl lg:text-7xl tracking-tight leading-none mb-6 ${isLight ? 'text-gray-900' : 'text-white'}`}>
              Full-Stack Developer<br />
              <span className={isLight ? 'text-primary' : 'text-primary'}>Specializing in Scalable</span><br />
              Web Applications
            </h1>

            <p className={`text-lg mb-8 max-w-xl ${isLight ? 'text-gray-600' : 'text-slate-300'}`}>
              I design and build high-performance web systems using modern frontend and backend technologies, with a strong focus on clean architecture and maintainability.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection('#projects')}
                className="bg-primary hover:bg-primary/90 text-white text-lg font-bold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(139,92,246,0.6)]"
              >
                View Projects
              </button>
              <button
                onClick={() => scrollToSection('#contact')}
                className="border border-primary/30 bg-primary/5 hover:bg-primary/10 text-primary text-lg font-bold px-8 py-4 rounded-xl transition-all duration-200"
              >
                Contact Me
              </button>
            </div>
          </div>

          <div className={`rounded-2xl overflow-hidden relative ${isLight ? 'bg-white border border-gray-200 shadow-sm' : 'glass'}`}>
            <div className={`border-b px-4 py-3 ${isLight ? 'bg-gray-50 border-gray-200' : 'bg-[#1e1b2e]/90 border-primary/20'}`}>
              <span className={`font-mono text-xs uppercase tracking-widest ${isLight ? 'text-gray-500' : 'text-slate-400'}`}>portfolio.exe</span>
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

            <div className={`p-4 space-y-3 ${isLight ? 'border-t border-gray-200' : 'border-t border-white/5'}`}>
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className={isLight ? 'text-gray-500' : 'text-slate-400'}>ARCHITECTURE</span>
                  <span className="text-cyber-lime">85%</span>
                </div>
                <div className={`h-1.5 rounded-full overflow-hidden ${isLight ? 'bg-gray-200' : 'bg-slate-800'}`}>
                  <div
                    className="h-full bg-gradient-to-r from-primary to-cyber-lime rounded-full shadow-[0_0_10px_rgba(139,92,246,0.6)]"
                    style={{ width: '85%' }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className={isLight ? 'text-gray-500' : 'text-slate-400'}>LATENCY</span>
                  <span className="text-green-500">12ms</span>
                </div>
                <div className={`h-1.5 rounded-full overflow-hidden ${isLight ? 'bg-gray-200' : 'bg-slate-800'}`}>
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-cyber-lime rounded-full shadow-[0_0_10px_rgba(34,197,94,0.6)]"
                    style={{ width: '88%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

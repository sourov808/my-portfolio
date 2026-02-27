'use client';

import { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const typingTexts = [
  'Full-Stack Developer',
  'Available for Work',
  'React Developer',
  'Next.js Expert',
  'TypeScript Developer',
  'UI/UX Enthusiast',
  'Scalable Systems Builder',
  'Clean Code Advocate',
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const leftInView = useInView(leftRef, { once: true });
  const rightInView = useInView(rightRef, { once: true });

  useEffect(() => {
    setMounted(true);
  }, []);

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
    <section id="hero" className="relative min-h-screen mesh-gradient pt-9 overflow-hidden">
      <div className="absolute inset-0 simulation-grid opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, x: -80 }}
            animate={leftInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.div 
              className="bg-black/40 border border-primary/30 rounded-full px-4 py-2 mb-6 inline-flex items-center gap-2"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={leftInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="font-mono text-cyber-lime text-xs">$</span>
              <span className="font-mono text-cyber-lime text-xs">{displayText}</span>
              <span className="animate-blink text-cyber-lime">▋</span>
            </motion.div>

            <motion.h1 
              className="font-display font-black text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-none mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Full-Stack Developer<br />
              <span className="text-primary">Specializing in Scalable</span><br />
              Web Applications
            </motion.h1>

            <motion.p 
              className="text-slate-300 text-lg mb-8 max-w-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              I design and build high-performance web systems using modern frontend and backend technologies, with a strong focus on clean architecture and maintainability.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <button className="bg-primary hover:bg-primary/90 text-white text-lg font-bold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(139,92,246,0.6)]">
                View Projects
              </button>
              <button className="border border-primary/30 bg-primary/5 hover:bg-primary/10 text-primary text-lg font-bold px-8 py-4 rounded-xl transition-all duration-200">
                Contact Me
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            ref={rightRef}
            initial={{ opacity: 0, x: 80, rotate: 5 }}
            animate={rightInView ? { opacity: 1, x: 0, rotate: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
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
                
                <motion.div 
                  className="relative z-10 w-32 h-32 rounded-2xl bg-gradient-to-br from-primary to-electric-blue flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.5)]"
                  animate={{ 
                    boxShadow: [
                      '0 0 30px rgba(139,92,246,0.5)',
                      '0 0 50px rgba(139,92,246,0.8)',
                      '0 0 30px rgba(139,92,246,0.5)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="material-symbols-outlined text-white text-5xl">code</span>
                </motion.div>
              </div>

              <div className="p-4 border-t border-white/5 space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-slate-400">ARCHITECTURE</span>
                    <span className="text-cyber-lime">85%</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-primary to-cyber-lime rounded-full shadow-[0_0_10px_rgba(139,92,246,0.6)]"
                      initial={{ width: 0 }}
                      animate={rightInView ? { width: '85%' } : {}}
                      transition={{ delay: 0.8, duration: 1 }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-slate-400">LATENCY</span>
                    <span className="text-green-500">12ms</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-green-500 to-cyber-lime rounded-full shadow-[0_0_10px_rgba(34,197,94,0.6)]"
                      initial={{ width: 0 }}
                      animate={rightInView ? { width: '88%' } : {}}
                      transition={{ delay: 1, duration: 1 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

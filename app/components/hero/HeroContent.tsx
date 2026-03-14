'use client';

import { motion } from 'framer-motion';

interface HeroContentProps {
  hasLoaded: boolean;
  isLight: boolean;
  displayText: string;
}

export default function HeroContent({ hasLoaded, isLight, displayText }: HeroContentProps) {
  return (
    <div className="flex flex-col items-center text-center lg:items-start lg:text-left max-w-2xl lg:flex-1">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={hasLoaded ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`border rounded-full px-4 py-1.5 mb-8 inline-flex items-center gap-2 ${isLight ? 'bg-gray-100 border-gray-200' : 'bg-black/40 border-primary/30'}`}
      >
        <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
        <span className={`font-mono text-sm ${isLight ? 'text-gray-700' : 'text-primary-highlight'}`}>$</span>
        <span className={`font-mono text-sm ${isLight ? 'text-gray-900' : 'text-primary-highlight'}`}>{displayText}</span>
        <span className={`animate-blink ${isLight ? 'text-gray-700' : 'text-primary-highlight'}`}>▋</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={hasLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`font-display font-black text-6xl md:text-8xl lg:text-8xl tracking-tight leading-none mb-6 ${isLight ? 'text-gray-900' : 'text-white'}`}
      >
        Sourov Das
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={hasLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`text-2xl md:text-3xl lg:text-3xl font-display mb-8 transition-colors duration-500 font-bold ${isLight ? 'text-primary' : 'text-primary-highlight'}`}
      >
        Full-Stack Developer  
        
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={hasLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`text-xl md:text-2xl mb-12 max-w-2xl leading-relaxed transition-colors duration-500 font-body ${isLight ? 'text-slate-600' : 'text-slate-400'}`}
      >
        Building high-performance web applications with React and modern tools. Focus on scalable frontend architecture and intuitive user experiences.
      </motion.p>
    </div>
  );
}

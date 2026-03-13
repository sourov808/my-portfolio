'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const principles = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path d="M12 16a4 4 0 100-8 4 4 0 000 8z" />
        <path d="M12 8a2 2 0 100-4 2 2 0 000 4z" />
      </svg>
    ),
    title: 'Product-First Thinking',
    description: 'I design solutions around real user needs and business goals.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 3v18h18" />
        <path d="M7 16l4-8 4 6 5-10" />
      </svg>
    ),
    title: 'Scalable System Design',
    description: 'I build architectures that grow with users and data.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: 'Performance Optimization',
    description: 'Speed, efficiency, and responsiveness are core priorities.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 18l6-6-6-6" />
        <path d="M8 6l-6 6 6 6" />
      </svg>
    ),
    title: 'Clean & Maintainable Code',
    description: 'Structured, readable, and future-proof implementation.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Reliable Deployment',
    description: 'Stable infrastructure with continuous integration and monitoring.',
  },
];

export default function Playground() {
  const { isLight } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="how-i-build" className={`py-24 md:py-28 relative ${isLight ? 'bg-white' : 'bg-bg-primary'}`}>
      <div className={`absolute inset-0 ${isLight ? 'bg-[radial-gradient(circle_at_1px_1px,rgba(79,70,229,0.12)_1px,transparent_0)] bg-[position:20px_20px]' : 'bg-[radial-gradient(circle_at_1px_1px,rgba(79,70,229,0.25)_1px,transparent_0)] bg-[position:25px_25px]'}`}></div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-12"
        >
          <h2 className={`font-display font-black text-4xl md:text-5xl uppercase tracking-tight mb-3 ${isLight ? 'text-gray-900' : 'text-white'}`}>
            How I Build
          </h2>
          <p className={`text-base md:text-lg max-w-2xl mx-auto ${isLight ? 'text-gray-600' : 'text-slate-400'}`}>
            A structured approach to designing and delivering scalable digital products.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={`group p-6 rounded-xl transition-all duration-300 hover:-translate-y-1 ${
                isLight
                  ? 'bg-white border border-gray-200 hover:shadow-lg hover:border-primary/30'
                  : 'bg-bg-secondary/60 border border-white/10 hover:bg-bg-secondary/80 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10'
              }`}
            >
              <motion.div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                  isLight
                    ? 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white'
                    : 'bg-primary/20 text-primary group-hover:bg-primary group-hover:text-white'
                }`}
                initial={{ scale: 0.8, rotate: -10 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {principle.icon}
              </motion.div>
              <h3 className={`font-display font-bold text-lg mb-2 transition-colors ${
                isLight ? 'text-gray-900 group-hover:text-primary' : 'text-white group-hover:text-primary'
              }`}>
                {principle.title}
              </h3>
              <p className={`text-sm leading-relaxed ${isLight ? 'text-gray-600' : 'text-slate-400'}`}>
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

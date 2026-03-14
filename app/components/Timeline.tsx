'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';

const experiences = [
  {
    icon: 'javascript',
    title: 'JavaScript Fundamentals',
    description: 'Started with core JavaScript concepts, DOM manipulation, and ES6+ features.',
    year: '2024',
  },
  {
    icon: 'react',
    title: 'React Development',
    description: 'Learned React hooks, state management, component architecture, and modern patterns.',
    year: '2024',
  },
  {
    icon: 'web',
    title: 'Modern Web Development',
    description: 'Developed high-performance applications with Next.js and Supabase, implementing complex state patterns and design systems.',
    year: '2025',
  },
  {
    icon: 'deployment',
    title: 'Building Real-World Projects',
    description: 'Focusing on scalable architectures and product-driven development while pursuing a BCA degree.',
    year: 'Current',
  },
];

const IconMap: Record<string, React.ReactNode> = {
  javascript: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#F7DF1E">
      <path d="M3 3h18v18H3V3zm9.5 14.5v-4h1v4h1.5v-6h-5v2h1.5zm1-3.5v-1h2v1h-2zm7.5 5.5h-2v-6h2v1.5h1v1h-1v1h-1v1h1v1.5zm-12.5-5h2v-2h-2v-1h3v3h-3v-1z"/>
    </svg>
  ),
  react: (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <circle cx="12" cy="12" r="2" fill="#61DAFB"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1" transform="rotate(30 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1" transform="rotate(-30 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1" transform="rotate(90 12 12)"/>
    </svg>
  ),
  web: (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="#8b5cf6"/>
    </svg>
  ),
  deployment: (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <path d="M19 12h2a9 9 0 11-9-9v2a7 7 0 107 7h2zM12 7V2l5 5-5 5V7H5V5h7z" fill="#10b981"/>
    </svg>
  ),
};

export default function Timeline() {
  const { isLight } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className={`py-24 md:py-28 relative z-20 ${isLight ? 'bg-white' : 'bg-bg-primary'}`}>
      <div className={`absolute inset-0 ${isLight ? 'bg-[linear-gradient(rgba(79,70,229,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(79,70,229,0.04)_1px,transparent_1px)] bg-size-[30px_30px]' : 'simulation-grid'}`}></div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <h2 className={`font-display font-black text-4xl uppercase tracking-tight mb-2 flex items-center justify-center gap-3 ${isLight ? 'text-gray-900' : 'text-white'}`}>
            <span className="material-symbols-outlined text-primary">history</span>
            Learning Journey
          </h2>
          <p className={isLight ? 'text-gray-600' : 'text-slate-400'}>My path to becoming a developer</p>
        </motion.div>

        <div className="space-y-6">
          {experiences.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 20 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={`${isLight ? 'bg-white border border-gray-200 shadow-sm' : 'bg-bg-secondary/60 border border-white/10'} group ${isLight ? 'hover:border-primary/40' : 'hover:border-primary/30'} ${isLight ? 'hover:shadow-lg' : 'hover:shadow-[0_0_20px_rgba(79,70,229,0.2)]'} transition-all duration-300 cursor-pointer rounded-xl`}
            >
              <div className="p-6 flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isLight ? 'bg-primary/10 group-hover:bg-primary/15' : 'bg-primary/15 group-hover:bg-primary/20'}`}>
                  {IconMap[item.icon] || <span className="material-symbols-outlined text-primary group-hover:text-primary-hover transition-colors">{item.icon}</span>}
                </div>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className={`text-lg md:text-xl font-bold transition-colors ${isLight ? 'text-gray-900' : 'text-white'} group-hover:text-primary`}>{item.title}</h3>
                    <span className="text-primary-highlight font-mono text-sm">{item.year}</span>
                  </div>
                  <p className={`text-sm leading-relaxed ${isLight ? 'text-gray-600' : 'text-slate-400'}`}>{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`mt-8 rounded-xl p-6 ${isLight ? 'bg-white border border-gray-200 shadow-sm' : 'bg-bg-secondary/60 border border-white/10'}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/>
              <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/>
              <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
              <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
            </svg>
            <h3 className={`font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>What&apos;s Next?</h3>
          </div>
          <p className={`max-w-lg mx-auto text-base md:text-lg mb-8 ${isLight ? 'text-gray-600' : 'text-slate-400'}`}>
            Interested in collaborating, discussing a project, or just connecting? Feel free to reach out.
          </p>
          <div className="text-center">
            <Link
              href="/#contact"
              className={`inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm transition-all duration-300 ${isLight ? 'text-white bg-primary hover:bg-primary-hover' : 'text-white bg-primary hover:bg-primary-hover'}`}
            >
              Get in Touch
              <span className="material-symbols-outlined ml-2 text-white">
                <ArrowRightIcon />
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

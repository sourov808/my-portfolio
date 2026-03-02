'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const experiences = [
  {
    icon: 'javascript',
    title: 'JavaScript Fundamentals',
    description: 'Started with core JavaScript concepts, DOM manipulation, and ES6+ features.',
    year: '2023',
  },
  {
    icon: 'react',
    title: 'React Development',
    description: 'Learned React hooks, state management, component architecture, and modern patterns.',
    year: '2023',
  },
  {
    icon: 'web',
    title: 'Full-Stack Development',
    description: 'Expanded to Next.js, backend APIs, database integration, and authentication.',
    year: '2024',
  },
  {
    icon: 'deployment',
    title: 'Building Projects',
    description: 'Creating real-world applications to solve problems and learn best practices.',
    year: '2024',
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
    <section id="experience" className={`py-32 relative z-20 ${isLight ? 'bg-gray-50' : 'bg-[#0a0812]'}`}>
      <div className={`absolute inset-0 micro-graph ${isLight ? 'opacity-10' : 'opacity-30'}`}></div>

      <div className="max-w-4xl mx-auto px-6 md:px-20 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
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
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className={`${isLight ? 'bg-white border border-gray-200 shadow-sm' : 'glass-high-contrast'} group ${isLight ? 'hover:border-primary' : 'hover:border-cyber-lime'} ${isLight ? 'hover:shadow-lg' : 'hover:shadow-[0_0_20px_rgba(173,255,47,0.3)]'} transition-all duration-300 cursor-pointer`}
            >
              <div className="p-6 flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${isLight ? 'bg-primary/10 group-hover:bg-cyber-lime/10' : 'bg-primary/10 group-hover:bg-cyber-lime/10'}`}>
                  {IconMap[item.icon] || <span className="material-symbols-outlined text-primary group-hover:text-cyber-lime transition-colors">{item.icon}</span>}
                </div>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className={`font-display font-bold text-xl uppercase ${isLight ? 'text-gray-900' : 'text-white'}`}>{item.title}</h3>
                    <span className="text-cyber-lime font-mono text-sm">{item.year}</span>
                  </div>
                  <p className={`text-sm leading-relaxed ${isLight ? 'text-gray-600' : 'text-slate-400'}`}>{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={`mt-8 rounded-xl p-6 ${isLight ? 'bg-white border border-gray-200 shadow-sm' : 'glass-panel'}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-primary">lightbulb</span>
            <h3 className={`font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>What's Next?</h3>
          </div>
          <p className={`text-sm leading-relaxed ${isLight ? 'text-gray-600' : 'text-slate-400'}`}>
            I'm actively building projects, learning new technologies, and looking for opportunities to contribute to real-world applications.
            My focus is on writing clean, maintainable code and building scalable solutions.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

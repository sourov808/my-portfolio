'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const stats = [
  { label: 'YEARS_BUILDING', value: '2+', suffix: 'YEARS', color: 'primary' },
  { label: 'PROJECTS_COMPLETED', value: '15+', suffix: 'BUILT', color: 'cyber-lime' },
  { label: 'CORE_STACK', value: 'Next.js', suffix: 'REACT', color: 'electric-blue' },
  { label: 'ARCHITECTURE', value: 'Clean', suffix: 'MODULAR', color: 'primary' },
];

export default function Stats() {
  const { isLight } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="stats" className={`py-16 ${isLight ? 'bg-white' : 'bg-[#101622]/30'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className={`${isLight ? 'bg-white border border-gray-200 shadow-sm' : 'glass'} hover:-translate-y-1 transition-all duration-300 ${isLight ? 'hover:bg-gray-50' : 'hover:bg-white/10'} group border-l-4 ${
                stat.color === 'primary' ? 'border-l-primary' :
                stat.color === 'cyber-lime' ? 'border-l-cyber-lime' : 'border-l-electric-blue'
              }`}
            >
              <div className="p-6">
                <p className={`text-xs font-bold uppercase tracking-[0.2em] mb-2 ${isLight ? 'text-gray-500' : 'text-slate-400'}`}>
                  {stat.label}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className={`text-3xl font-bold ${
                    stat.color === 'cyber-lime' ? 'text-cyber-lime' : isLight ? 'text-gray-900' : 'text-white'
                  }`}>
                    {stat.value}
                  </span>
                  <span className={`text-xs font-bold px-2 py-1 rounded ${isLight ? 'bg-gray-100 text-gray-600' : 'bg-white/10 text-slate-300'}`}>
                    {stat.suffix}
                  </span>
                </div>
                <div className={`mt-4 h-0.5 rounded-full overflow-hidden ${isLight ? 'bg-gray-200' : 'bg-slate-800'}`}>
                  <motion.div
                    className={`h-full rounded-full ${
                      stat.color === 'cyber-lime' ? 'bg-cyber-lime' : 'bg-primary'
                    }`}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${60 + index * 10}%` } : {}}
                    transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

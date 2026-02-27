'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { label: 'YEARS_BUILDING', value: '2+', suffix: 'YEARS', color: 'primary' },
  { label: 'PROJECTS_COMPLETED', value: '15+', suffix: 'BUILT', color: 'cyber-lime' },
  { label: 'CORE_STACK', value: 'Next.js', suffix: 'REACT', color: 'electric-blue' },
  { label: 'ARCHITECTURE', value: 'Clean', suffix: 'MODULAR', color: 'primary' },
];

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 0.5, type: "spring", stiffness: 120 }
    }
  };
  return (
    <section id="stats" className="py-16 bg-[#101622]/30">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <motion.div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={statVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`glass hover:-translate-y-1 transition-all duration-300 hover:bg-white/10 group border-l-4 ${
                stat.color === 'primary' ? 'border-l-primary' :
                stat.color === 'cyber-lime' ? 'border-l-cyber-lime' : 'border-l-electric-blue'
              }`}
            >
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">
                  {stat.label}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className={`text-3xl font-bold ${
                    stat.color === 'cyber-lime' ? 'text-cyber-lime' : 'text-white'
                  }`}>
                    {stat.value}
                  </span>
                  <span className="text-xs font-bold bg-white/10 px-2 py-1 rounded text-slate-300">
                    {stat.suffix}
                  </span>
                </div>
                <div className="mt-4 h-0.5 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${
                      stat.color === 'cyber-lime' ? 'bg-cyber-lime' : 'bg-primary'
                    }`}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${Math.random() * 40 + 60}%` } : {}}
                    transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

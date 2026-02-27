'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const skills = [
  { name: 'Frontend', value: 85, icon: 'web' },
  { name: 'Backend', value: 75, icon: 'dns' },
  { name: 'Database', value: 70, icon: 'storage' },
  { name: 'DevOps', value: 60, icon: 'cloud' },
];

export default function About() {
  const { isLight } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className={`py-24 ${isLight ? 'bg-gray-50' : 'bg-[#101622]/30'}`}>
      <div className="max-w-4xl mx-auto px-6 md:px-20">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className={`font-display font-black text-4xl uppercase tracking-tight mb-2 flex items-center justify-center gap-3 ${isLight ? 'text-gray-900' : 'text-white'}`}>
            <span className="material-symbols-outlined text-primary">person</span>
            About Me
          </h2>
          <p className={isLight ? 'text-gray-600' : 'text-slate-400'}>Professional background and focus</p>
        </motion.div>

        <motion.div
          className={`rounded-2xl p-8 ${isLight ? 'bg-white border border-gray-200 shadow-sm' : 'glass-panel'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className={`font-display font-bold text-2xl mb-4 flex items-center gap-2 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                <span className="material-symbols-outlined text-primary">code</span>
                Full-Stack Developer
              </h3>
              <p className={`leading-relaxed mb-4 ${isLight ? 'text-gray-600' : 'text-slate-300'}`}>
                I am a Full-Stack Developer specializing in building scalable web applications with modern technologies. With strong expertise in Next.js, React, and backend integration, I focus on creating clean, modular, and maintainable code.
              </p>
              <p className={`leading-relaxed ${isLight ? 'text-gray-600' : 'text-slate-300'}`}>
                My approach combines technical precision with practical solutions, ensuring every project delivers real value and scales effectively.
              </p>
            </div>

            <div className="space-y-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className={`flex items-center gap-3 p-4 rounded-lg ${isLight ? 'bg-gray-50' : 'bg-black/40'}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                >
                  <span className="material-symbols-outlined text-primary">{skill.icon}</span>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-sm ${isLight ? 'text-gray-600' : 'text-slate-400'}`}>{skill.name}</span>
                      <span className="text-cyber-lime font-mono text-sm">{skill.value}%</span>
                    </div>
                    <div className={`h-1.5 rounded-full overflow-hidden ${isLight ? 'bg-gray-200' : 'bg-slate-800'}`}>
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-cyber-lime rounded-full"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.value}%` } : {}}
                        transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const skills = [
  { name: 'Frontend', value: 85, icon: 'frontend' },
  { name: 'Backend', value: 75, icon: 'backend' },
  { name: 'Database', value: 70, icon: 'database' },
  // { name: 'DevOps', value: 40, icon: 'devops' },
];

const IconMap: Record<string, React.ReactNode> = {
  frontend: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#8b5cf6" strokeWidth="1.5">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <path d="M8 21h8M12 17v4"/>
    </svg>
  ),
  backend: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#8b5cf6" strokeWidth="1.5">
      <rect x="4" y="2" width="16" height="6" rx="1"/>
      <rect x="4" y="10" width="16" height="6" rx="1"/>
      <rect x="4" y="18" width="16" height="6" rx="1"/>
    </svg>
  ),
  database: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#8b5cf6" strokeWidth="1.5">
      <ellipse cx="12" cy="5" rx="8" ry="3"/>
      <path d="M4 5v7c0 1.66 3.58 3 8 3s8-1.34 8-3V5"/>
      <path d="M4 12v7c0 1.66 3.58 3 8 3s8-1.34 8-3v-7"/>
    </svg>
  ),
  devops: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#8b5cf6" strokeWidth="1.5">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5"/>
      <path d="M2 12l10 5 10-5"/>
    </svg>
  ),
};

export default function About() {
  const { isLight } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-10 relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(139,92,246,0.1)_1px,transparent_0)] bg-[18px_18px]"></div>
      <div className="max-w-4xl mx-auto px-6 md:px-20 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className={`font-display font-black text-4xl uppercase tracking-tight mb-2 flex items-center justify-center gap-3 ${isLight ? 'text-gray-900' : 'text-white'}`}>
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
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className={`w-56 h-56 md:w-64 md:h-64 rounded-3xl overflow-hidden shadow-lg ${isLight ? 'shadow-gray-200/50' : 'shadow-purple-900/30'} ring-4 ${isLight ? 'ring-gray-100' : 'ring-purple-500/20'}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/pic.jpeg"
                    alt="Sourov - Full Stack Developer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className={`absolute  w-full h-12 -bottom-3.5 border-none rounded-b-2xl  flex items-center justify-center ${isLight ? 'bg-black shadow-md' : 'bg-bg-secondary shadow-lg'} ring-2 ${isLight ? 'ring-gray-100' : 'ring-purple-500/30'}`}>
                  <span className={`text-lg ${isLight ? 'text-primary' : 'text-primary'}`}>
                    Hi, I am Sourov
                  </span>
                </div>
              </div>
            </motion.div>

            <div>
              <h3 className={`font-display font-bold text-2xl mb-4 flex items-center gap-2 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                Full-Stack Developer
              </h3>
              <p className={`leading-relaxed mb-4 ${isLight ? 'text-gray-600' : 'text-slate-300'}`}>
                I am a Full-Stack Developer specializing in building scalable web applications with modern technologies. With strong expertise in Next.js, React, and backend integration, I focus on creating clean, modular, and maintainable code.
              </p>
              <p className={`leading-relaxed mb-6 ${isLight ? 'text-gray-600' : 'text-slate-300'}`}>
                My approach combines technical precision with practical solutions, ensuring every project delivers real value and scales effectively.
              </p>

              <div className="space-y-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className={`flex items-center gap-3 p-4 rounded-lg ${isLight ? 'bg-gray-50' : 'bg-black/40'}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                >
                  {IconMap[skill.icon]}
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-sm ${isLight ? 'text-gray-600' : 'text-slate-400'}`}>{skill.name}</span>
                      <span className="text-cyber-lime font-mono text-sm">{skill.value}%</span>
                    </div>
                    <div className={`h-1.5 rounded-full overflow-hidden ${isLight ? 'bg-gray-200' : 'bg-slate-800'}`}>
                      <motion.div
                        className="h-full bg-linear-to-r from-primary to-cyber-lime rounded-full"
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
            
          </div>
        </motion.div>
      </div>
    </section>
  );
}

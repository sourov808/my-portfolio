'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skills = [
  { name: 'Frontend', value: 85, icon: 'web' },
  { name: 'Backend', value: 75, icon: 'dns' },
  { name: 'Database', value: 70, icon: 'storage' },
  { name: 'DevOps', value: 60, icon: 'cloud' },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.2 } }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.3 } }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="about" className="py-24 bg-[#101622]/30">
      <div className="max-w-4xl mx-auto px-6 md:px-20">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <h2 className="font-display font-black text-4xl text-white uppercase tracking-tight mb-2 flex items-center justify-center gap-3">
            <span className="material-symbols-outlined text-primary">person</span>
            About Me
          </h2>
          <p className="text-slate-400">Professional background and focus</p>
        </motion.div>

        <motion.div
          className="glass-panel rounded-2xl p-8"
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <h3 className="font-display font-bold text-2xl text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">code</span>
                Full-Stack Developer
              </h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                I am a Full-Stack Developer specializing in building scalable web applications with modern technologies. With strong expertise in Next.js, React, and backend integration, I focus on creating clean, modular, and maintainable code.
              </p>
              <p className="text-slate-300 leading-relaxed">
                My approach combines technical precision with practical solutions, ensuring every project delivers real value and scales effectively.
              </p>
            </motion.div>

            <div className="space-y-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="flex items-center gap-3 p-4 bg-black/40 rounded-lg"
                  variants={slideInRight}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <span className="material-symbols-outlined text-primary">{skill.icon}</span>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-slate-400 text-sm">{skill.name}</span>
                      <span className="text-cyber-lime font-mono text-sm">{skill.value}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-cyber-lime rounded-full"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.value}%` } : {}}
                        transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
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

'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const skillCategories = [
  {
    title: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Redux'],
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Supabase', 'Prisma'],
  },
  {
    title: 'Tools & Others',
    skills: ['Git', 'GitHub', 'Docker', 'Redis', 'Vercel', 'Figma'],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { isLight } = useTheme();

  return (
    <section
      id="skills"
      ref={ref}
      className={`py-20 md:py-28 relative ${isLight ? 'bg-white' : 'bg-bg-primary'}`}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <h2 className={`font-display font-black text-4xl md:text-5xl uppercase tracking-tight mb-4 ${isLight ? 'text-gray-900' : 'text-white'}`}>
            Skills & Technologies
          </h2>
          <p className={`text-lg md:text-xl max-w-2xl mx-auto ${isLight ? 'text-gray-600' : 'text-slate-400'}`}>
            The tools and technologies I use to build modern web applications
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + categoryIndex * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={`p-8 rounded-2xl ${
                isLight
                  ? 'bg-gray-50 border border-gray-100'
                  : 'bg-bg-secondary/50 border border-white/5'
              }`}
            >
              <h3 className={`font-display font-bold text-xl mb-6 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + categoryIndex * 0.1 + skillIndex * 0.05 }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isLight
                        ? 'bg-white border border-gray-200 text-gray-700 hover:border-primary hover:text-primary'
                        : 'bg-white/5 border border-white/10 text-slate-300 hover:border-primary hover:text-primary'
                    }`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

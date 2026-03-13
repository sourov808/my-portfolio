'use client';

import { motion, Variants } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const stats = [
  { label: 'Projects Built', value: '5+', icon: '🚀' },
  { label: 'Technologies Used', value: '10+', icon: '🛠️' },
  { label: 'GitHub Repositories', value: '15+', icon: '📦' },
];

const skillGroups = [
  {
    title: 'Frontend',
    skills: ['React', 'Next.js', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Responsive Design'],
  },
  {
    title: 'State Management',
    skills: ['Redux Toolkit', 'Zustand', 'Context API'],
  },
  {
    title: 'Backend & Data',
    skills: ['Node.js', 'Express', 'REST APIs', 'MongoDB'],
  },
  {
    title: 'Tools & Platforms',
    skills: ['Git', 'GitHub', 'Vercel', 'Modern Workflows'],
  },
];

const focusAreas = [
  'Building scalable web applications',
  'Designing clean UI and responsive layouts',
  'Creating modular React architectures',
  'Implementing efficient state management',
  'Developing full-stack applications with modern tooling',
];

export default function About() {
  const { isLight } = useTheme();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section id="about" className={`py-24 md:py-32 relative overflow-hidden ${isLight ? 'bg-white' : 'bg-bg-primary'}`}>
      <div className={`absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,${isLight ? 'rgba(79,70,229,0.05)' : 'rgba(79,70,229,0.08)'}_1px,transparent_0)] bg-position-[18px_18px]`}></div>
      
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`font-display font-black text-4xl md:text-5xl uppercase tracking-tighter mb-4 ${isLight ? 'text-gray-900' : 'text-white'}`}>
            About Me
          </h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mb-6"></div>
          <p className={`max-w-2xl mx-auto text-lg ${isLight ? 'text-gray-600' : 'text-slate-400'}`}>
            Professional background, core competencies, and development approach.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Intro & Stats */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`p-8 rounded-3xl border ${isLight ? 'bg-white/50 border-gray-100 shadow-sm' : 'bg-slate-900/50 border-white/5'}`}
            >
              <motion.h3 variants={itemVariants} className={`text-2xl font-bold mb-6 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                Developer Introduction
              </motion.h3>
              <motion.p variants={itemVariants} className={`text-lg leading-relaxed mb-8 ${isLight ? 'text-gray-700' : 'text-slate-300'}`}>
                I am Sourov Das, a Full-Stack Web Developer focused on building modern, scalable web applications. I specialize in JavaScript technologies including React, Next.js, and modern frontend architecture. My development approach emphasizes modular design, maintainable code, and real-world problem solving.
              </motion.p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className={`p-6 rounded-2xl text-center border transition-colors ${
                      isLight 
                        ? 'bg-gray-50 border-gray-100 hover:border-primary/30' 
                        : 'bg-white/5 border-white/5 hover:border-primary/30'
                    }`}
                  >
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <div className={`text-2xl font-black mb-1 ${isLight ? 'text-gray-900' : 'text-white'}`}>{stat.value}</div>
                    <div className={`text-xs uppercase tracking-wider font-semibold ${isLight ? 'text-gray-500' : 'text-slate-500'}`}>{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Development Philosophy & Experience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`p-8 rounded-3xl border ${isLight ? 'bg-white/50 border-gray-100 shadow-sm' : 'bg-slate-900/50 border-white/5'}`}
              >
                <h3 className={`text-xl font-bold mb-4 ${isLight ? 'text-gray-900' : 'text-white'}`}>Development Philosophy</h3>
                <p className={`leading-relaxed ${isLight ? 'text-gray-600' : 'text-slate-400'}`}>
                  I focus on writing clean, reusable, and scalable code. I value modular architecture, clear state management, and maintainable project structures that make applications easier to scale and collaborate on.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`p-8 rounded-3xl border ${isLight ? 'bg-white/50 border-gray-100 shadow-sm' : 'bg-slate-900/50 border-white/5'}`}
              >
                <h3 className={`text-xl font-bold mb-4 ${isLight ? 'text-gray-900' : 'text-white'}`}>Project Experience</h3>
                <p className={`leading-relaxed ${isLight ? 'text-gray-600' : 'text-slate-400'}`}>
                  I have built multiple practical projects including a full-stack e-commerce platform with product search, filtering, and modern UI architecture. My projects focus on solving real-world problems while following modern frontend development practices.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Skills & Focus */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`p-8 rounded-3xl border ${isLight ? 'bg-white/50 border-gray-100 shadow-sm' : 'bg-slate-900/50 border-white/5'}`}
            >
              <h3 className={`text-xl font-bold mb-6 ${isLight ? 'text-gray-900' : 'text-white'}`}>Professional Focus</h3>
              <ul className="space-y-4">
                {focusAreas.map((area, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className={`text-sm md:text-base ${isLight ? 'text-gray-600' : 'text-slate-400'}`}>{area}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`p-8 rounded-3xl border ${isLight ? 'bg-primary border-primary/20 shadow-lg' : 'bg-primary/10 border-primary/20 shadow-xl shadow-primary/5'}`}
            >
              <h3 className={`text-xl font-bold mb-4 ${isLight ? 'text-white' : 'text-primary-highlight'}`}>Current Learning Focus</h3>
              <ul className={`space-y-2 text-sm ${isLight ? 'text-white/80' : 'text-slate-400'}`}>
                <li className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                   Advanced React architecture
                </li>
                <li className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                   Scalable full-stack system design
                </li>
                <li className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                   Performance optimization
                </li>
                <li className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                   Production-ready projects
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Technical Skills Grid - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className={`p-8 md:p-12 rounded-[2.5rem] border ${isLight ? 'bg-gray-50/50 border-gray-100 shadow-sm' : 'bg-slate-900/30 border-white/5'}`}>
            <h3 className={`text-2xl font-bold mb-10 text-center ${isLight ? 'text-gray-900' : 'text-white'}`}>Technical Skills</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {skillGroups.map((group) => (
                <div key={group.title}>
                  <h4 className={`text-xs uppercase tracking-widest font-black mb-5 ${isLight ? 'text-primary' : 'text-primary-highlight'}`}>
                    {group.title}
                  </h4>
                  <ul className="space-y-3">
                    {group.skills.map((skill) => (
                      <li key={skill} className={`flex items-center gap-2 text-sm md:text-base font-medium ${isLight ? 'text-gray-700' : 'text-slate-300'}`}>
                        <div className={`w-1 h-3 rounded-full ${isLight ? 'bg-gray-300' : 'bg-slate-700'}`}></div>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

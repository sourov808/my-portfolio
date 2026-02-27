'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const projects = [
  {
    name: 'E-Commerce Admin System',
    stack: 'Next.js, Prisma, Tailwind, Authentication',
    description: 'Full-featured admin dashboard with product, order, and media management capabilities.',
    icon: 'shopping_cart',
  },
  {
    name: 'Blog Platform',
    stack: 'React, Redux Toolkit, Image Upload',
    description: 'Modular blog application with scalable state architecture and content management.',
    icon: 'article',
  },
  {
    name: 'Recipe Search App',
    stack: 'React, Zustand, Filters & Sorting',
    description: 'Search-driven UI with reusable components and modular filtering logic.',
    icon: 'restaurant_menu',
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-electric-blue/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-black text-4xl text-white uppercase tracking-tight mb-2">
            Projects
          </h2>
          <p className="text-slate-400">Featured work and applications</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300 rounded-xl p-6 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined text-primary text-2xl">{project.icon}</span>
              </div>

              <h4 className="font-bold text-white text-lg mb-2">{project.name}</h4>
              <p className="text-primary text-xs font-mono mb-3">{project.stack}</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                {project.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { projectsData } from '../../data/projects';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const { isLight } = useTheme();

  return (
    <section id="projects" className={`py-24 md:py-32 relative overflow-hidden ${isLight ? 'bg-white' : 'bg-bg-primary'}`}>
      {/* Background grid pattern */}
      <div className={`absolute inset-0 ${isLight ? 'bg-[linear-gradient(rgba(79,70,229,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(79,70,229,0.04)_1px,transparent_1px)] bg-size-[30px_30px]' : 'simulation-grid'}`}></div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <span className={`text-xs font-black uppercase tracking-[0.3em] ${isLight ? 'text-primary' : 'text-primary-highlight'}`}>Selected Work</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`font-display font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-tighter ${isLight ? 'text-gray-900' : 'text-white'}`}
          >
            Projects
          </motion.h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mt-6 mb-8"></div>
          <p className={`max-w-2xl mx-auto text-lg ${isLight ? 'text-gray-600' : 'text-slate-400'}`}>
            A collection of high-performance applications built with modern tools and scalable architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {projectsData.map((project) => (
            <ProjectCard key={project.name} project={project} isLight={isLight} />
          ))}
        </div>

        <div className="mt-20 text-center">
             <Link 
                href="/projects" 
                className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-all duration-300 ${
                  isLight 
                  ? 'bg-gray-900 text-white hover:bg-gray-800 hover:scale-105' 
                  : 'bg-white text-gray-900 hover:bg-slate-200 hover:scale-105 shadow-xl shadow-white/5'
                }`}
              >
                View All Projects <ExternalLink size={18} />
              </Link>
        </div>
      </div>
    </section>
  );
}

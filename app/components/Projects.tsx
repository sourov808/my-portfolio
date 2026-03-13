'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import Link from 'next/link';
import Image from 'next/image';
import { Project, projectsData } from '../data/projects';
import { Github, ExternalLink } from 'lucide-react';

function ProjectCard({ project, isLight }: { project: Project; isLight: boolean }) {
  const cardBg = isLight ? 'bg-white border-gray-100 shadow-sm hover:shadow-xl' : 'bg-slate-900/50 border-white/5 shadow-2xl hover:shadow-primary/10';
  
  return (
    <Link href="/projects" className="block h-full">
      <motion.div
        initial={{ 
          opacity: 0, 
          y: 40,
          scale: 0.8,
          rotateX: 15,
          rotateY: -5
        }}
        whileInView={{ 
          opacity: 1, 
          y: 0,
          scale: 1,
          rotateX: 0,
          rotateY: 0
        }}
        viewport={{ once: true, margin: "-50px" }}
        whileHover={{ 
          y: -12, 
          scale: 1.02,
          rotateX: 2,
          transition: { duration: 0.3 }
        }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 20,
          opacity: { duration: 0.5 }
        }}
        style={{ perspective: 1000 }}
        className={`group relative flex flex-col h-full rounded-4xl border overflow-hidden transition-all duration-300 ${cardBg} ${project.isFeatured ? 'md:col-span-2 lg:col-span-1' : ''}`}
      >
        {/* Visual Header / Image Container */}
        <div className="relative h-48 overflow-hidden bg-slate-800">
          {project.image ? (
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
              <Image 
                src={project.image} 
                alt={project.name}
                fill
                className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 to-transparent"></div>
            </div>
          ) : (
            <div 
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
              style={{ background: `linear-gradient(135deg, ${project.color}40 0%, ${project.color}60 100%)` }}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50">
                 <div className={`w-32 h-32 rounded-full blur-3xl`} style={{ backgroundColor: project.color }}></div>
              </div>
            </div>
          )}
          
          <div className="absolute top-6 left-6 z-10">
             <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${isLight ? 'bg-white/90 text-gray-900 shadow-sm' : 'bg-black/60 text-white backdrop-blur-md'}`}>
               {project.isFeatured ? 'Featured Project' : 'Web App'}
             </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-8">
          <h3 className={`text-2xl font-display font-bold mb-4 group-hover:text-primary transition-colors duration-300 ${isLight ? 'text-gray-900' : 'text-white'}`}>
            {project.name}
          </h3>
          
          <div className="space-y-4 mb-8 flex-1">
            <div>
              <h4 className={`text-[10px] uppercase tracking-wider font-extrabold mb-1 ${isLight ? 'text-primary' : 'text-primary-highlight'}`}>Problem</h4>
              <p className={`text-sm leading-relaxed ${isLight ? 'text-gray-600' : 'text-slate-400'}`}>
                {project.problem}
              </p>
            </div>
            <div>
              <h4 className={`text-[10px] uppercase tracking-wider font-extrabold mb-1 ${isLight ? 'text-primary' : 'text-primary-highlight'}`}>Solution</h4>
              <p className={`text-sm leading-relaxed ${isLight ? 'text-gray-600' : 'text-slate-400'}`}>
                {project.solution}
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.stack.map(tech => (
              <span
                key={tech}
                className={`px-3 py-1 text-[10px] font-bold uppercase rounded-md transition-colors ${
                  isLight 
                    ? 'bg-gray-100 text-gray-600 border border-gray-200' 
                    : 'bg-white/5 text-slate-400 border border-white/5'
                }`}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links Overlay (Stopping event propagation if necessary, but Link is parent) */}
          <div className="flex items-center gap-4 pt-4 border-t border-dashed border-gray-200 dark:border-white/5 relative z-10">
            {project.githubLink && (
              <span className={`flex items-center gap-2 text-xs font-bold transition-colors ${isLight ? 'text-gray-600' : 'text-slate-400'}`}>
                <Github size={16} /> Code
              </span>
            )}
            {project.liveLink && (
              <span className={`flex items-center gap-2 text-xs font-bold transition-colors ${isLight ? 'text-gray-600' : 'text-slate-400'}`}>
                <ExternalLink size={16} /> Live Demo
              </span>
            )}
            <span className="ml-auto text-[10px] font-bold uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              View Details ↗
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function Projects() {
  const { isLight } = useTheme();

  return (
    <section id="projects" className={`py-24 md:py-32 relative ${isLight ? 'bg-white' : 'bg-bg-primary'}`}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
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

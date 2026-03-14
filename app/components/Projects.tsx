'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import Link from 'next/link';
import Image from 'next/image';
import { Project, projectsData } from '../data/projects';
import { Github, ExternalLink } from 'lucide-react';

function ProjectCard({ project, isLight }: { project: Project; isLight: boolean }) {
  return (
    <Link href="/projects" className="block h-full group">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`relative h-full rounded-lg overflow-hidden transition-all duration-500 ${
          isLight 
            ? 'bg-white border border-gray-100 shadow-lg hover:shadow-2xl hover:shadow-primary/10' 
            : 'bg-slate-900/80 border border-white/10 shadow-2xl hover:shadow-primary/20'
        } backdrop-blur-sm`}
      >
        {/* Visual Header / Image Container */}
        <div className="relative h-64 p-2 flex items-center justify-center">
          {project.image ? (
            <div className="relative w-full h-full overflow-hidden rounded-md">
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ) : (
            <div
              className="absolute inset-2 rounded-lg"
              style={{ background: `linear-gradient(135deg, ${project.color}30 0%, ${project.color}50 100%)` }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="w-40 h-40 rounded-full blur-3xl opacity-40"
                  style={{ backgroundColor: project.color }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-6">
          {/* Title */}
          <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
            isLight ? 'text-gray-900' : 'text-white'
          } group-hover:text-primary`}>
            {project.name}
          </h3>

          {/* Problem & Solution */}
          <div className="space-y-3 mb-5 flex-1">
            <div className={`p-3 rounded-xl ${isLight ? 'bg-gray-50' : 'bg-white/5'}`}>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                <span className={`text-[10px] uppercase tracking-wider font-bold ${isLight ? 'text-gray-500' : 'text-slate-400'}`}>Problem</span>
              </div>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-gray-600' : 'text-slate-300'}`}>
                {project.problem}
              </p>
            </div>
            <div className={`p-3 rounded-xl ${isLight ? 'bg-gray-50' : 'bg-white/5'}`}>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                <span className={`text-[10px] uppercase tracking-wider font-bold ${isLight ? 'text-gray-500' : 'text-slate-400'}`}>Solution</span>
              </div>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-gray-600' : 'text-slate-300'}`}>
                {project.solution}
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.stack.slice(0, 5).map(tech => (
              <span
                key={tech}
                className={`px-2.5 py-1 text-[10px] font-semibold rounded-lg transition-all ${
                  isLight
                    ? 'bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary'
                    : 'bg-white/5 text-slate-400 hover:bg-primary/20 hover:text-primary-highlight border border-white/5'
                }`}
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 5 && (
              <span className={`px-2.5 py-1 text-[10px] font-semibold rounded-lg ${
                isLight ? 'bg-gray-100 text-gray-500' : 'bg-white/5 text-slate-500'
              }`}>
                +{project.stack.length - 5}
              </span>
            )}
          </div>

          {/* Action Bar */}
          <div className={`flex items-center gap-3 pt-4 border-t ${
            isLight ? 'border-gray-100' : 'border-white/5'
          }`}>
            {project.githubLink && (
              <span className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                isLight ? 'text-gray-500 hover:text-gray-900' : 'text-slate-400 hover:text-white'
              }`}>
                <Github size={14} /> Code
              </span>
            )}
            {project.liveLink && (
              <span className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                isLight ? 'text-gray-500 hover:text-gray-900' : 'text-slate-400 hover:text-white'
              }`}>
                <ExternalLink size={14} /> Live
              </span>
            )}
            <span className="ml-auto text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1">
              Explore <ExternalLink size={12} />
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

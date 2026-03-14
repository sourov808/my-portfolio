'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Github, ExternalLink } from 'lucide-react';
import { Project } from '../../data/projects';

interface ProjectCardProps {
  project: Project;
  isLight: boolean;
}

export default function ProjectCard({ project, isLight }: ProjectCardProps) {
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
          <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${isLight ? 'text-gray-900' : 'text-white'} group-hover:text-primary`}>
            {project.name}
          </h3>

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
              <span className={`px-2.5 py-1 text-[10px] font-semibold rounded-lg ${isLight ? 'bg-gray-100 text-gray-500' : 'bg-white/5 text-slate-500'}`}>
                +{project.stack.length - 5}
              </span>
            )}
          </div>

          <div className={`flex items-center gap-3 pt-4 border-t ${isLight ? 'border-gray-100' : 'border-white/5'}`}>
            {project.githubLink && (
              <span className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${isLight ? 'text-gray-500 hover:text-gray-900' : 'text-slate-400 hover:text-white'}`}>
                <Github size={14} /> Code
              </span>
            )}
            {project.liveLink && (
              <span className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${isLight ? 'text-gray-500 hover:text-gray-900' : 'text-slate-400 hover:text-white'}`}>
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

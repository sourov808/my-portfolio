'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

import { Project, projectsData } from '../data/projects';

export default function AllProjects() {
  const { isLight } = useTheme();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Helper to get image URL safely since image can be string or StaticImageData
  const getImageUrl = (image: Project['image']) => {
    if (!image) return '';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return typeof image === 'string' ? image : (image as any).src;
  };

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  return (
    <div className={`min-h-screen pt-10 pb-20 px-6 md:px-12 transition-colors duration-700 relative ${isLight ? 'bg-[#f7f7f9] text-gray-900' : 'bg-[#0f0f14] text-white'}`}>
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-20">
          <Link 
            href="/#projects" 
            className={`inline-flex items-center text-sm font-medium mb-8 transition-colors ${
              isLight ? 'text-gray-500 hover:text-gray-900' : 'text-gray-400 hover:text-white'
            }`}
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6">All Projects</h1>
          <p className={`text-lg md:text-xl max-w-2xl leading-relaxed ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
            A complete collection of my creative technical work. Each project focuses on solving specific problems with clean, scalable solutions.
          </p>
        </div>
        
        {/* Premium Spacious Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {projectsData.map((project, i) => (
            <div
              key={i}
              onClick={() => setSelectedProject(project)}
              className={`group flex flex-col rounded-lg overflow-hidden cursor-pointer transition-all duration-500 transform hover:scale-[1.02] ${
                isLight
                  ? 'bg-white border border-gray-100 shadow-lg hover:shadow-2xl hover:shadow-primary/10'
                  : 'bg-slate-900/80 border border-white/10 shadow-2xl hover:shadow-primary/20'
              } backdrop-blur-sm`}
            >
              {/* Card Image Banner */}
              <div className="relative h-64 p-2 flex items-center justify-center">
                {project.image ? (
                  <div className="relative w-full h-full overflow-hidden rounded-md">
                    <div
                      className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${getImageUrl(project.image)})` }}
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

              {/* Card Content Segment */}
              <div className="flex flex-col flex-1 p-6">
                <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                  isLight ? 'text-gray-900' : 'text-white'
                } group-hover:text-primary`}>
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
                    <span className={`px-2.5 py-1 text-[10px] font-semibold rounded-lg ${
                      isLight ? 'bg-gray-100 text-gray-500' : 'bg-white/5 text-slate-500'
                    }`}>
                      +{project.stack.length - 5}
                    </span>
                  )}
                </div>

                <div className={`flex items-center gap-3 pt-4 border-t ${
                  isLight ? 'border-gray-100' : 'border-white/5'
                }`}>
                  {project.githubLink && (
                    <span className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                      isLight ? 'text-gray-500 hover:text-gray-900' : 'text-slate-400 hover:text-white'
                    }`}>
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                      </svg> Code
                    </span>
                  )}
                  {project.liveLink && (
                    <span className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                      isLight ? 'text-gray-500 hover:text-gray-900' : 'text-slate-400 hover:text-white'
                    }`}>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg> Live
                    </span>
                  )}
                  <span className="ml-auto text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1">
                    Explore 
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
            {/* Cinematic Background Dim */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 30, stiffness: 150 }}
              className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto z-10 flex flex-col shadow-2xl scrollbar-hide ${
                isLight 
                  ? 'bg-white shadow-[0_40px_100px_rgba(0,0,0,0.2)]' 
                  : 'bg-slate-900 shadow-[0_40px_100px_rgba(0,0,0,0.5)] border border-white/10'
              }`}
            >
              {/* Floating Close Button Top Right */}
              <button
                onClick={() => setSelectedProject(null)}
                className={`absolute top-4 right-4 z-20 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 ${
                  isLight 
                    ? 'bg-white/80 hover:bg-white text-gray-700 shadow-md' 
                    : 'bg-slate-800/80 hover:bg-slate-800 text-white shadow-lg'
                }`}
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Large Product Image at Top */}
              <div className="relative w-full h-[280px] md:h-[400px] shrink-0 overflow-hidden">
                {selectedProject.image ? (
                   <motion.div
                      initial={{ scale: 1.05, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${getImageUrl(selectedProject.image)})` }}
                   />
                ) : (
                   <div
                     className="absolute inset-0"
                     style={{
                       background: `linear-gradient(135deg, ${selectedProject.color}30 0%, ${selectedProject.color}50 100%)`
                     }}
                   >
                     <div className="absolute inset-0 flex items-center justify-center">
                       <div 
                         className="w-48 h-48 rounded-full blur-3xl opacity-40"
                         style={{ backgroundColor: selectedProject.color }}
                       />
                     </div>
                   </div>
                )}
                {/* Gradient fade at bottom */}
                <div className={`absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t ${isLight ? 'from-white via-white/80' : 'from-slate-900 via-slate-900/80'} to-transparent`} />
              </div>

              {/* Modal Content Structure */}
              <div className="px-6 pb-8 md:px-10 md:pb-10 -mt-8 relative z-10 flex flex-col grow">
                {/* Title & Tech Stack */}
                <div className="mb-8">
                  <h2 className={`text-3xl md:text-4xl font-bold tracking-tight mb-4 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                    {selectedProject.name}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.stack.map(tech => (
                      <span
                        key={tech}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${
                          isLight 
                            ? 'bg-gray-100 text-gray-700' 
                            : 'bg-white/5 text-slate-300 border border-white/5'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Overview Section */}
                <div className="mb-10">
                  <h4 className={`text-sm font-bold uppercase tracking-wider mb-4 ${isLight ? 'text-gray-500' : 'text-slate-400'}`}>
                    Overview
                  </h4>
                  <p className={`text-base leading-relaxed ${isLight ? 'text-gray-600' : 'text-slate-300'}`}>
                    {selectedProject.longDescription || selectedProject.description}
                  </p>
                </div>

                {/* Actions */}
                <div className={`flex flex-wrap gap-4 pt-6 border-t ${isLight ? 'border-gray-100' : 'border-white/5'}`}>
                  {selectedProject.liveLink ? (
                    <a
                      href={selectedProject.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        isLight
                          ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg shadow-gray-900/20 hover:shadow-xl hover:shadow-gray-900/30 hover:-translate-y-0.5'
                          : 'bg-white text-gray-900 hover:bg-gray-100 shadow-lg shadow-white/10 hover:shadow-xl hover:shadow-white/20 hover:-translate-y-0.5'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live Demo
                    </a>
                  ) : null}

                  {selectedProject.githubLink ? (
                    <a
                      href={selectedProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        isLight
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:-translate-y-0.5'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5 hover:-translate-y-0.5'
                      }`}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                      View Source
                    </a>
                  ) : null}

                  {!selectedProject.liveLink && !selectedProject.githubLink && (
                    <span className={`inline-flex items-center text-sm ${isLight ? 'text-gray-500' : 'text-slate-400'}`}>
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Private internal project
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

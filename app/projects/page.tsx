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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {projectsData.map((project, i) => (
            <div 
              key={i} 
              onClick={() => setSelectedProject(project)}
              className={`group flex flex-col rounded-[24px] overflow-hidden cursor-pointer transition-all duration-500 transform hover:scale-[1.02] ${
                isLight 
                  ? 'bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]' 
                  : 'bg-[#15151e] shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-white/5'
              }`}
            >
              {/* Card Image Banner */}
              <div className="w-full aspect-4/3  relative overflow-hidden bg-gray-100 dark:bg-[#1c1c24]">
                {project.image ? (
                   <div 
                      className="absolute inset-0   w-full h-full bg-cover bg-center transition-transform duration-700 ease-out"
                      style={{ backgroundImage: `url(${getImageUrl(project.image)})` }}
                   />
                ) : (
                   <div 
                     className="absolute inset-0 w-full h-full opacity-50"
                     style={{
                       background: `radial-gradient(circle at center, ${project.color}30, transparent 70%)`
                     }}
                   />
                )}
              </div>

              {/* Card Content Segment */}
              <div className="p-8 flex flex-col grow relative z-10 transition-colors duration-500">
                <h3 className={`text-xl md:text-2xl font-semibold tracking-tight mb-3 ${isLight ? 'text-gray-900 group-hover:text-gray-600' : 'text-white group-hover:text-gray-300'}`}>
                  {project.name}
                </h3>
                <p className={`mb-8 grow text-sm md:text-base leading-relaxed ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                  {project.description}
                </p>
              
              <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                {project.stack.map(tech => (
                  <span 
                    key={tech} 
                    className={`px-3 py-1 text-xs font-semibold tracking-wide uppercase rounded-full ${
                      isLight 
                        ? 'bg-gray-100/80 text-gray-700' 
                        : 'bg-white/5 text-gray-300'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 xl:p-12 shadow-2xl">
            {/* Cinematic Background Dim */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
              className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[24px] z-10 flex flex-col ${
                isLight ? 'bg-white shadow-[0_40px_100px_rgba(0,0,0,0.15)]' : 'bg-[#15151e] shadow-[0_40px_100px_rgba(0,0,0,0.6)] border border-white/5'
              }`}
            >
              {/* Floating Close Button Top Right */}
              <button 
                onClick={() => setSelectedProject(null)}
                className={`absolute top-4 right-4 md:top-6 md:right-6 z-20 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-105 ${
                  isLight ? 'bg-white/90 shadow-sm text-gray-900 hover:bg-white' : 'bg-black/50 text-white hover:bg-black/80'
                }`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Large Product Image at Top */}
              <div className="relative w-full h-[30vh] min-h-[250px] md:h-[45vh] md:min-h-[400px] shrink-0 bg-gray-100 dark:bg-[#1c1c24] overflow-hidden">
                {selectedProject.image ? (
                   <motion.div 
                      initial={{ scale: 1.05, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${getImageUrl(selectedProject.image)})` }}
                   />
                ) : (
                   <div 
                     className="absolute inset-0 w-full h-full opacity-50"
                     style={{
                       background: `radial-gradient(circle at center, ${selectedProject.color}40, transparent 70%)`
                     }}
                   />
                )}
                {/* Subtle soft gradient fade into the content area */}
                <div className={`absolute bottom-0 left-0 w-full h-24 bg-linear-to-t ${isLight ? 'from-white' : 'from-[#15151e]'} to-transparent`} />
              </div>

              {/* Modal Content Structure */}
              <div className="px-6 pb-8 md:px-12 md:pb-12 pt-4 relative z-10 flex flex-col grow">
                <h2 className={`text-3xl md:text-5xl font-display font-bold tracking-tight mb-4 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                  {selectedProject.name}
                </h2>
                <div className="flex flex-wrap gap-2 mb-10">
                  {selectedProject.stack.map(tech => (
                    <span 
                      key={tech} 
                      className={`px-3 py-1 text-xs font-semibold tracking-wide uppercase rounded-full ${
                        isLight ? 'bg-gray-100 text-gray-700' : 'bg-white/10 text-gray-300'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <h4 className={`text-lg font-semibold mb-3 tracking-tight ${isLight ? 'text-gray-900' : 'text-gray-100'}`}>Overview</h4>
                <p className={`text-base md:text-lg leading-relaxed mb-10 ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                  {selectedProject.longDescription || selectedProject.description}
                </p>

                {/* Actions */}
                <div className="flex flex-wrap gap-4 mt-auto pt-8 border-t border-gray-100 dark:border-white/5">
                  {selectedProject.liveLink ? (
                    <a 
                      href={selectedProject.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex flex-1 sm:flex-none items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                        isLight 
                          ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-sm hover:shadow-md hover:scale-[1.02]' 
                          : 'bg-white text-gray-900 hover:bg-gray-200 shadow-sm hover:shadow-md hover:scale-[1.02]'
                      }`}
                    >
                      Live Demo
                      <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : null}

                  {selectedProject.githubLink ? (
                    <a 
                      href={selectedProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex flex-1 sm:flex-none items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border transition-all duration-300 ${
                        isLight 
                          ? 'border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300' 
                          : 'border-white/10 text-gray-300 hover:bg-white/5 hover:border-white/30'
                      }`}
                    >
                      View Source
                      <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                    </a>
                  ) : null}
                  
                  {!selectedProject.liveLink && !selectedProject.githubLink && (
                    <span className={`inline-flex items-center text-sm italic ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
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

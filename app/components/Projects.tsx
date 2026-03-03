'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import Link from 'next/link';

import { Project, projectsData } from '../data/projects';

function ProjectCard({ project, isLight, index, progress }: { project: Project; isLight: boolean; index: number; progress: MotionValue<number> }) {
  const smoothProgress = useSpring(progress, { damping: 30, stiffness: 100, mass: 0.5 });

  // Center points:
  // Card 0: 0.15
  // Card 1: 0.50
  // Card 2: 0.85
  const centers = [0.15, 0.50, 0.85];
  const center = centers[index];

  // Map around the center:
  const scale = useTransform(
    smoothProgress, 
    [center - 0.3, center - 0.1, center, center + 0.1, center + 0.3], 
    [0.85, 0.95, 1, 0.95, 0.85],
    { clamp: true }
  );

  const imageOpacity = useTransform(
    smoothProgress, 
    [center - 0.3, center - 0.1, center, center + 0.1, center + 0.3], 
    [0.3, 0.6, 1, 0.6, 0.3],
    { clamp: true }
  );

  // Text fades exactly the same curve as image around the center to fix the requested timing issue 
  // No overlap whatsoever because adjacent cards cross at exactly 0 opacity.
  const contentOpacity = useTransform(
    smoothProgress, 
    [center - 0.2, center - 0.05, center, center + 0.05, center + 0.2], 
    [0, 1, 1, 1, 0], 
    { clamp: true }
  );
  
  // Disable pointer events when content is invisible 
  const pointerEvents = useTransform(contentOpacity, (val: number) => val > 0.5 ? "auto" : "none");

  // Dynamically set z-index so the active moving project sits on top.
  const zIndexRaw = useTransform(smoothProgress, [center - 0.5, center, center + 0.5], [0, 50, 0]);
  const zIndex = useTransform(zIndexRaw, Math.round);

  // Helper to get image URL safely 
  const getImageUrl = (image: Project['image']) => {
    if (!image) return '';
    return typeof image === 'string' ? image : (image as { src: string }).src;
  };

  return (
    <motion.div 
      style={{ zIndex, opacity: useTransform(smoothProgress, [center - 0.3, center, center + 0.3], [0, 1, 0], { clamp: true }) }}
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center px-6 md:px-12 pointer-events-none"
    >
      <motion.div
        style={{ scale }}
        className="w-full max-w-5xl flex flex-col group origin-center pointer-events-auto"
      >
          <motion.div 
            style={{ opacity: imageOpacity }}
            className={`relative w-full aspect-21/9 md:aspect-video rounded-[24px] overflow-hidden mb-8 md:mb-12 shadow-lg ${
              isLight ? 'bg-gray-100 border border-gray-100' : 'bg-[#15151e] border border-white/5'
            }`}
          >
            {project.image ? (
              <div 
                 className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 ease-out"
                 style={{ backgroundImage: `url(${getImageUrl(project.image)})` }}
              />
            ) : (
              <div 
                 className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out"
                 style={{
                   background: `radial-gradient(circle at center, ${project.color}30, transparent 70%)`
                 }}
              />
            )}
          </motion.div>

          {/* Content Below Image - Strictly Clamped */}
          <motion.div 
            style={{ opacity: contentOpacity, pointerEvents }}
            className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 w-full max-w-4xl px-2"
          >
            {/* Left Column: Title & Description */}
            <div className="flex-1 max-w-2xl">
              <h3 className={`text-3xl md:text-5xl font-display font-semibold tracking-tight mb-4 transition-colors ${isLight ? 'text-gray-900' : 'text-white'}`}>
                {project.name}
              </h3>
              <p className={`text-lg md:text-xl leading-relaxed mb-6 transition-colors ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map(tech => (
                  <span
                    key={tech}
                    className={`px-3 py-1 text-xs md:text-sm font-medium rounded-full transition-colors ${
                      isLight 
                        ? 'bg-gray-100 text-gray-700' 
                        : 'bg-white/5 text-gray-300'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: CTA */}
            <div className="shrink-0 pt-2">
              <Link 
                href="/projects" 
                className={`inline-flex items-center group text-base font-semibold transition-colors duration-300 ${
                  isLight ? 'text-gray-900 hover:text-gray-600' : 'text-white hover:text-gray-300'
                }`}
              >
                View Project 
                <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
  );
}

export default function Projects() {
  const { isLight } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);

  // Background gradient shift based on overall scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const sectionProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 100 });
  
  // Creates a subtle background tint shift corresponding to the number of projects scrolling by
  const bgShift = useTransform(sectionProgress, [0, 0.5, 1], 
    isLight 
      ? ['rgba(255, 255, 255, 1)', 'rgba(247, 247, 249, 1)', 'rgba(255, 255, 255, 1)']
      : ['rgba(0, 0, 0, 1)', 'rgba(8, 8, 12, 1)', 'rgba(0, 0, 0, 1)']
  );

  return (
    <motion.section 
       ref={sectionRef}
       id="projects" 
       className={`relative w-full pb-16 transition-colors duration-700`}
       style={{ backgroundColor: bgShift }}
    >
      <div className="max-w-[1400px] mx-auto relative z-10 text-center pt-32 pb-4 px-6 md:sticky md:top-0">
        <h2 className={`font-display font-medium text-4xl md:text-5xl tracking-tight transition-colors duration-700 ${isLight ? 'text-gray-900' : 'text-white'}`}>
          Selected Projects
        </h2>
        <p className={`text-base md:text-lg max-w-2xl mx-auto leading-relaxed mt-6 transition-colors ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
          A curated collection of product-focused applications built with performance, scalability, and thoughtful design in mind.
        </p>
      </div>

      {/* Render 3 projects in a 400vh scrollable container */}
      <div className="w-full relative z-20 mt-[10vh]" style={{ height: "400vh" }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {projectsData.slice(0, 3).map((project, index) => (
            <ProjectCard key={project.name} project={project} isLight={isLight} index={index} progress={scrollYProgress} />
          ))}
        </div>
      </div>

      {/* Clean Transition Section */}
      <div className="w-full h-[50vh] flex flex-col items-center justify-center px-6 relative z-10 border-t border-gray-100 dark:border-white/5">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
        
          <Link
            href="/projects"
            className={`inline-flex items-center justify-center px-8 py-3 rounded-full text-sm font-medium transition-all duration-500 ease-out ${
              isLight 
                ? 'bg-gray-900 text-white hover:bg-gray-800 hover:scale-[1.02]' 
                : 'bg-white text-gray-900 hover:bg-gray-100 hover:scale-[1.02]'
            }`}
          >
            View All Projects
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}

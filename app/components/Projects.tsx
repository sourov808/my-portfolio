'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import Link from 'next/link';

import { Project, projectsData } from '../data/projects';

function ProjectCard({ project, isLight, index, progress }: { project: Project; isLight: boolean; index: number; progress: MotionValue<number> }) {
  const smoothProgress = useSpring(progress, { damping: 35, stiffness: 80, mass: 0.8 });

  const centers = [0.15, 0.50, 0.85];
  const center = centers[index];
  const range = 0.36;

  const scale = useTransform(
    smoothProgress, 
    [center - range, center - range * 0.4, center, center + range * 0.4, center + range], 
    [0.85, 0.95, 1, 0.95, 0.85],
    { clamp: true }
  );

  const imageOpacity = useTransform(
    smoothProgress, 
    [center - range, center - range * 0.3, center, center + range * 0.3, center + range], 
    [0.2, 0.5, 1, 0.5, 0.2],
    { clamp: true }
  );

  const contentOpacity = useTransform(
    smoothProgress, 
    [center - range * 0.5, center - range * 0.15, center, center + range * 0.15, center + range * 0.5], 
    [0, 0.8, 1, 0.8, 0], 
    { clamp: true }
  );
  
  const pointerEvents = useTransform(contentOpacity, (val: number) => val > 0.3 ? "auto" : "none");

  const zIndexRaw = useTransform(smoothProgress, [center - 0.5, center, center + 0.5], [0, 50, 0]);
  const zIndex = useTransform(zIndexRaw, Math.round);

  const getImageUrl = (image: Project['image']) => {
    if (!image) return '';
    return typeof image === 'string' ? image : (image as { src: string }).src;
  };

  return (
    <motion.div 
      style={{ 
        zIndex, 
        opacity: useTransform(smoothProgress, [center - range, center, center + range], [0, 1, 0], { clamp: true })
      }}
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center px-4 md:px-12 pointer-events-none"
    >
      <motion.div
        style={{ scale }}
        className="w-full max-w-5xl flex flex-col group origin-center pointer-events-auto"
      >
          <motion.div 
            style={{ opacity: imageOpacity }}
            className={`relative w-full aspect-video rounded-2xl md:rounded-[28px] overflow-hidden mb-6 md:mb-10 shadow-lg ${
              isLight ? 'bg-gray-100 border border-gray-200' : 'bg-[#15151e] border border-white/5'
            }`}
          >
            {project.image ? (
              <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${getImageUrl(project.image)})` }}
              />
            ) : (
              <div 
                className="absolute inset-0 w-full h-full"
                style={{
                  background: `radial-gradient(circle at center, ${project.color}30, transparent 70%)`
                }}
              />
            )}
          </motion.div>

          <motion.div 
            style={{ opacity: contentOpacity, pointerEvents }}
            className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-8 w-full max-w-4xl px-2"
          >
            <div className="flex-1 max-w-2xl">
              <h3 className={`text-2xl md:text-4xl font-display font-semibold tracking-tight mb-3 transition-colors ${isLight ? 'text-gray-900' : 'text-white'}`}>
                {project.name}
              </h3>
              <p className={`text-base md:text-lg leading-relaxed mb-4 transition-colors ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
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

            <div className="shrink-0 pt-1 md:pt-2">
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

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const sectionProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 100 });

  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.10, 0.18],
    [1, 0.5, 0],
    { clamp: true }
  );

  const titlePointerEvents = useTransform(titleOpacity, (val: number) => val > 0.3 ? "auto" : "none");

  const bgShift = useTransform(sectionProgress, [0, 0.5, 1],
    isLight
      ? ['rgba(255, 255, 255, 1)', 'rgba(249, 250, 251, 1)', 'rgba(255, 255, 255, 1)']
      : ['rgba(10, 8, 18, 1)', 'rgba(15, 15, 25, 1)', 'rgba(10, 8, 18, 1)']
  );

  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    setHasLoaded(true);
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      id="projects"
      className={`relative w-full pb-16 md:py-10 transition-colors duration-700`}
      style={{ backgroundColor: bgShift }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={hasLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="max-w-[1400px] mx-auto px-5 md:px-12 text-center pt-10 md:pt-32 pb-4 md:sticky md:top-0"
        style={{ opacity: titleOpacity, pointerEvents: titlePointerEvents }}
      >
         <h2 className={`font-display font-medium text-3xl md:text-5xl tracking-tight transition-colors duration-700 ${isLight ? 'text-gray-900' : 'text-white'}`}>
           Projects
        </h2>
        <p className={`text-base md:text-lg max-w-2xl mx-auto leading-relaxed mt-4 md:mt-6 transition-colors ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
          A curated collection of product-focused applications built with performance, scalability, and thoughtful design in mind.
        </p>
      </motion.div>

      <div className="w-full relative z-20 mt-[5vh] md:mt-[10vh]" style={{ height: isMobile ? "300vh" : "400vh" }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {projectsData.slice(0, 3).map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              isLight={isLight}
              index={index}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>

      <div className="w-full h-[30vh] md:h-[50vh] flex flex-col items-center justify-center px-6 relative z-10 border-t border-gray-100 dark:border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <Link
            href="/projects"
            className={`inline-flex items-center justify-center px-8 py-4 md:py-3 rounded-full text-base font-medium transition-all duration-500 ease-out group ${
              isLight
                ? 'bg-gray-900 text-white hover:bg-gray-800 hover:scale-[1.02]'
                : 'bg-white text-gray-900 hover:bg-gray-100 hover:scale-[1.02]'
            }`}
          >
            View All Projects

            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300"> {"->"} </span>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}

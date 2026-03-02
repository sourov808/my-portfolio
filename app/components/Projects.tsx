'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface Project {
  name: string;
  stack: string[];
  description: string;
  color: string;
}

const projects: Project[] = [
  {
    name: 'E-Commerce Platform',
    stack: ['Next.js', 'Prisma', 'Stripe'],
    description: 'Full-featured admin dashboard with product, order, and media management.',
    color: '#8b5cf6',
  },
  {
    name: 'Blog Platform',
    stack: ['React', 'Redux Toolkit', 'Node.js'],
    description: 'Modular blog application with scalable state architecture.',
    color: '#adff2f',
  },
  {
    name: 'Recipe Search',
    stack: ['React', 'Zustand', 'MongoDB'],
    description: 'Search-driven UI with reusable components and modular filtering.',
    color: '#135bec',
  },
  {
    name: 'Task Manager',
    stack: ['Next.js', 'Supabase', 'Tailwind'],
    description: 'Collaborative task management with real-time updates.',
    color: '#f43f5e',
  },
  {
    name: 'Portfolio v1',
    stack: ['React', 'Framer Motion', 'CSS'],
    description: 'Animated portfolio with scroll-driven interactions.',
    color: '#06b6d4',
  },
  {
    name: 'API Gateway',
    stack: ['Node.js', 'Express', 'Redis'],
    description: 'High-performance API gateway with rate limiting.',
    color: '#f59e0b',
  },
];

function CodeBlock({ stack, color, progress, isLight }: { stack: string[]; color: string; progress: MotionValue<number>; isLight: boolean }) {
  const opacity = useTransform(progress, [0, 0.3, 0.7, 1], [1, 1, 0.5, 0.2]);
  const y = useTransform(progress, [0, 0.3, 0.7, 1], [0, 0, 10, 20]);

  return (
    <motion.div 
      style={{ opacity, y }}
      className="font-mono text-xs md:text-sm leading-relaxed"
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="w-3 h-3 rounded-full bg-red-500/60" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
        <div className="w-3 h-3 rounded-full bg-green-500/60" />
      </div>
      <div className="space-y-1">
        <div>
          <span className={isLight ? "text-purple-600" : "text-purple-400"}>const</span>
          <span className={isLight ? "text-slate-900" : "text-white"}> project </span>
          <span className={isLight ? "text-pink-600" : "text-pink-400"}>=</span>
          <span className={isLight ? "text-slate-900" : "text-white"}> {'{'}</span>
        </div>
        <div className="pl-4">
          <span className={isLight ? "text-blue-600" : "text-cyan-400"}>name</span>
          <span className={isLight ? "text-slate-900" : "text-white"}>: </span>
          <span className={isLight ? "text-green-600" : "text-green-400"}>"project"</span>
          <span className={isLight ? "text-slate-900" : "text-white"}>,</span>
        </div>
        <div className="pl-4">
          <span className={isLight ? "text-blue-600" : "text-cyan-400"}>stack</span>
          <span className={isLight ? "text-slate-900" : "text-white"}>: [</span>
          {stack.map((tech, i) => (
            <span key={i}>
              <span className={isLight ? "text-green-600" : "text-green-400"}>"{tech}"</span>
              {i < stack.length - 1 && <span className={isLight ? "text-slate-900" : "text-white"}>, </span>}
            </span>
          ))}
          <span className={isLight ? "text-slate-900" : "text-white"}>],</span>
        </div>
        <div>
          <span className={isLight ? "text-slate-900" : "text-white"}>{'}'}</span>
          <span className={isLight ? "text-slate-900" : "text-white"}>;</span>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectContent({ project, isHovered, isLight }: { project: Project; isHovered: boolean; isLight: boolean }) {
  return (
    <div className="relative z-10 p-6 flex flex-col h-full">
      <motion.div
        animate={{ 
          y: isHovered ? 0 : 15,
          opacity: isHovered ? 1 : 0
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex-1"
      >
        <h3 className={`text-xl font-bold mb-2 transition-colors duration-500 ${isLight ? 'text-slate-900' : 'text-white'}`}>
          {project.name}
        </h3>
        <motion.p 
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className={`text-sm mb-4 transition-colors duration-500 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}
        >
          {project.description}
        </motion.p>
      </motion.div>

      <motion.div className="flex flex-wrap gap-2">
        {project.stack.map((tech, i) => (
          <motion.span
            key={tech}
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              y: isHovered ? 0 : 10 
            }}
            transition={{ 
              duration: 0.3, 
              delay: isHovered ? 0.1 + i * 0.06 : 0,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{
              background: `${project.color}20`,
              color: project.color,
              border: `1px solid ${project.color}30`,
            }}
          >
            {tech}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

function ProjectCard({ project, index, isLight }: { project: Project; index: number; isLight: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 300 };
  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);

  const scrollProgress = useMotionValue(0.5);
  const smoothProgress = useSpring(scrollProgress, { damping: 25, stiffness: 150 });

  const opacity = useTransform(smoothProgress, [0, 0.3, 0.5, 0.7, 1], [0.6, 0.8, 1, 0.9, 0.7]);
  const blur = useTransform(smoothProgress, [0, 0.3, 0.5, 0.7, 1], [4, 2, 0, 1, 2]);
  const scale = useTransform(smoothProgress, [0, 0.3, 0.5, 0.7, 1], [0.98, 0.99, 1.02, 1, 0.98]);
  
  const imageMask = useTransform(smoothProgress, [0, 0.3, 1], ['inset(0 0 20% 0)', 'inset(0 0 5% 0)', 'inset(0 0 0% 0)']);
  const imageParallax = useTransform(smoothProgress, [0, 1], [15, -15]);
  const shadowDepth = useTransform(smoothProgress, [0, 0.5, 1], [10, 40, 10]);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateProgress = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const cardCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      
      const rawProgress = 1 - (cardCenter - viewportCenter) / (viewportHeight * 0.6);
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));
      scrollProgress.set(clampedProgress);
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, [scrollProgress]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
    rotateX.set(y * 3);
    rotateY.set(-x * 3);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div ref={containerRef} className="h-full">
      <motion.div
        ref={cardRef}
        style={{ 
          opacity, 
          scale, 
          filter: useTransform(blur, v => `blur(${v}px)`),
          rotateX, 
          rotateY,
          perspective: 1000
        }}
        className="h-full"
      >
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            handleMouseLeave();
          }}
          className="relative h-full rounded-2xl overflow-hidden cursor-pointer"
        >
          <div 
            className="absolute inset-0 transition-opacity duration-500 z-20"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${project.color}${isLight ? '30' : '15'} 0%, transparent 70%)`,
              opacity: isHovered ? 1 : 0,
            }}
          />

          <motion.div 
            className="absolute inset-0 z-10"
            style={{
              boxShadow: useTransform(shadowDepth, v => 
                `0 ${v / 2}px ${v}px ${project.color}10, 0 ${v}px ${v * 2}px rgba(0,0,0,0.3)`
              )
            }}
          />
 
          <motion.div 
            className="relative h-full p-[1px] rounded-2xl"
            style={{
              background: isHovered 
                ? `linear-gradient(135deg, ${project.color}${isLight ? '50' : '40'}, transparent)`
                : (isLight ? 'linear-gradient(135deg, rgba(0,0,0,0.05), rgba(0,0,0,0.01))' : 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))'),
            }}
          >
            <motion.div 
              className="relative h-full rounded-[14px] overflow-hidden transition-colors duration-500"
              style={{
                background: isHovered 
                  ? (isLight ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 15, 20, 0.95)')
                  : (isLight ? 'rgba(255, 255, 255, 0.7)' : 'rgba(15, 15, 20, 0.8)'),
                border: isHovered 
                  ? `1px solid ${project.color}${isLight ? '80' : '50'}`
                  : `1px dashed ${isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.1)'}`,
                boxShadow: useTransform(shadowDepth, v => 
                  `0 ${v / 2}px ${v}px ${project.color}08, 0 ${v}px ${v * 2}px rgba(0,0,0,0.15)`
                )
              }}
            >
              <motion.div style={{ clipPath: imageMask }} className="absolute inset-0">
                <motion.div
                  style={{ y: imageParallax }}
                  className="absolute inset-0 w-[120%] -ml-[10%] h-[120%] -mt-[10%]"
                >
                  <motion.div
                    animate={{ scale: isHovered ? 1.04 : 1 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${project.color}15 0%, transparent 50%, ${project.color}10 100%)`,
                      filter: isHovered ? 'brightness(1.05)' : 'brightness(1)',
                    }}
                  />
                </motion.div>
              </motion.div>

              <div className="relative z-10">
                <motion.div
                  animate={{ opacity: isHovered ? 0 : 1 }}
                  transition={{ duration: 0.4 }}
                  className="h-full p-6"
                >
                  <CodeBlock stack={project.stack} color={project.color} progress={smoothProgress} isLight={isLight} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <ProjectContent project={project} isHovered={isHovered} isLight={isLight} />
                </motion.div>
              </div>

              <motion.div
                animate={{ y: isHovered ? 0 : [0, -5, 0] }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: 'easeInOut',
                  repeatType: 'reverse'
                }}
                className="absolute inset-0 pointer-events-none"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { isLight } = useTheme();

  return (
    <section id="projects" className="py-32 relative overflow-hidden transition-colors duration-500" style={{ background: isLight ? '#f8fafc' : '#0f0f14' }}>
      <div className={`absolute inset-0 simulation-grid transition-opacity duration-500 ${isLight ? 'opacity-10 invert' : 'opacity-20'}`} />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-20"
        >
          <h2 className={`font-display font-black text-4xl md:text-5xl uppercase tracking-tight mb-3 transition-colors duration-500 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Projects
          </h2>
          <p className={`font-mono text-sm transition-colors duration-500 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            Selected Work
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={project.name} className="h-80">
              <ProjectCard project={project} index={index} isLight={isLight} />
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-500 text-sm">
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyber-lime animate-pulse"></span>
              {projects.length} Projects
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useSpring, useScroll, useVelocity, useAnimationFrame, AnimatePresence, useMotionValue } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const technologies = [
  // Frontend
  { name: 'React', logo: '/logos/react.svg' },
  { name: 'Next.js', logo: '/logos/nextjs.svg' },
  { name: 'TypeScript', logo: '/logos/typescript.svg' },
  { name: 'JavaScript', logo: '/logos/javascript.svg' },
  { name: 'Tailwind CSS', logo: '/logos/tailwindcss.svg' },
  { name: 'Redux', logo: '/logos/redux.svg' },

  // Backend / Infra
  { name: 'Node.js', logo: '/logos/nodejs.svg' },
  { name: 'Express', logo: '/logos/express.svg' },
  { name: 'PostgreSQL', logo: '/logos/postgresql.svg' },
  { name: 'MongoDB', logo: '/logos/mongodb.svg' },
  { name: 'Supabase', logo: '/logos/supabase.svg' },
  { name: 'Prisma', logo: '/logos/prisma.svg' },
  { name: 'Redis', logo: '/logos/redis.svg' },
  { name: 'Docker', logo: '/logos/docker.svg' },
  { name: 'WebSockets', logo: '/logos/websockets.svg' },

  // Dev Tools
  { name: 'Git', logo: '/logos/git.svg' },
  { name: 'GitHub', logo: '/logos/github.svg' },
  { name: 'Vercel', logo: '/logos/vercel.svg' },
  { name: 'Postman', logo: '/logos/postman.svg' },
  { name: 'Figma', logo: '/logos/figma.svg' },
];

function TechItem({
  tech,
  index,
  isHovered,
  isDimmed,
  onHoverStart,
  onHoverEnd,
  isMobile,
  isLight,
}: {
  tech: typeof technologies[0];
  index: number;
  isHovered: boolean;
  isDimmed: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  isMobile: boolean;
  isLight: boolean;
}) {
  const scale = useSpring(isHovered ? (isMobile ? 1.03 : 1.05) : 1, { stiffness: 400, damping: 25 });
  const opacity = useSpring(isHovered ? 1 : isDimmed ? 0.65 : 0.85, { stiffness: 300, damping: 30 });
  const z = useSpring(isHovered ? (isMobile ? 10 : 30) : 0, { stiffness: 400, damping: 25 });

  const floatDuration = isMobile ? 0 : 3 + (index % 4) * 0.5;
  const floatDelay = isMobile ? 0 : (index % 5) * 0.2;
  const floatOffset = isMobile ? 0 : (index % 2 === 0) ? -4 : 4;

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center p-8 h-44 w-full cursor-default isolate"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      style={{ opacity, scale, z, transformStyle: 'preserve-3d' }}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-full z-0 pointer-events-none"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: isMobile ? 1.2 : 1.5 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              background: `radial-gradient(circle at center, ${isLight ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.08)'} 0%, transparent 60%)`,
            }}
          />
        )}
      </AnimatePresence>

      <motion.div
        className="relative z-10 flex items-center justify-center w-16 h-16"
        animate={isHovered ? { y: 0 } : { y: [0, floatOffset, 0, -floatOffset, 0] }}
        transition={isMobile ? {} : { duration: floatDuration, repeat: Infinity, ease: 'easeInOut', delay: floatDelay }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={tech.logo}
          alt={tech.name}
          className="max-h-[48px] max-w-[48px] object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
          loading="lazy"
        />
      </motion.div>

      <div className="absolute top-[80%] left-0 right-0 flex pointer-events-none overflow-hidden h-8">
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col items-center justify-start pt-1 w-full"
            >
              <span className={`text-[11px] md:text-xs font-semibold tracking-wide drop-shadow-md whitespace-nowrap transition-colors duration-500 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {tech.name}
              </span>
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '80%', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.05 }}
                className={`h-px mt-1 transition-colors duration-500 ${isLight ? 'bg-slate-400' : 'bg-slate-300'}`}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function ScrollColumn({
  techs,
  speed,
  hoveredTech,
  setHoveredTech,
  isMobile,
  isLight,
  className,
}: {
  techs: typeof technologies;
  speed: number;
  hoveredTech: string | null;
  setHoveredTech: (t: string | null) => void;
  isMobile: boolean;
  isLight: boolean;
  className?: string;
}) {
  const baseY = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  const isHoveredColumn = hoveredTech && techs.some((t) => t.name === hoveredTech);
  const pauseSpring = useSpring(1, { damping: 40, stiffness: 300 });

  useEffect(() => {
    pauseSpring.set(isHoveredColumn ? 0 : 1);
  }, [isHoveredColumn, pauseSpring]);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContentHeight(entry.contentRect.height / 2);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useAnimationFrame((time, delta) => {
    let moveBy = speed * (delta / 1000);
    // Accelerate drift when scrolling down (positive velocity), decelerate when scrolling up
    let addedVelocity = smoothVelocity.get() * -0.008;
    
    // Reduce motion intensity heavily on mobile
    if (isMobile) {
      moveBy *= 0.5;
      addedVelocity *= 0.1;
    }
    
    moveBy += addedVelocity;
    moveBy *= pauseSpring.get(); // smooth pause on hover

    let newY = baseY.get() + moveBy;

    if (contentHeight > 0) {
      if (newY <= -contentHeight) {
        newY += contentHeight;
      } else if (newY > 0) {
        newY -= contentHeight;
      }
    }
    baseY.set(newY);
  });

  return (
    <div className={`flex flex-col items-center flex-1 ${className || ''}`} style={{ minWidth: isMobile ? '70px' : '140px' }}>
      <motion.div
        ref={containerRef}
        style={{ y: baseY, transformStyle: 'preserve-3d' }}
        className="flex flex-col gap-8 md:gap-12 w-full items-center"
      >
        {/* Render twice for seamless loop */}
        {[...techs, ...techs].map((tech, i) => (
          <TechItem
            key={`${tech.name}-${i}`}
            tech={tech}
            index={i}
            isHovered={hoveredTech === tech.name}
            isDimmed={hoveredTech !== null && hoveredTech !== tech.name}
            onHoverStart={() => setHoveredTech(tech.name)}
            onHoverEnd={() => setHoveredTech(null)}
            isMobile={isMobile}
            isLight={isLight}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { isLight } = useTheme();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Split items into 4 vertical columns robustly
  const columns = [
    technologies.filter((_, i) => i % 4 === 0),
    technologies.filter((_, i) => i % 4 === 1),
    technologies.filter((_, i) => i % 4 === 2),
    technologies.filter((_, i) => i % 4 === 3),
  ];

  // Base drifting speeds: each column slightly different
  const columnSpeeds = [-12, -18, -10, -15];

  return (
    <section
      id="skills"
      className="py-40 relative min-h-[700px] h-screen overflow-hidden flex flex-col items-center justify-center isolate transition-colors duration-500"
      style={{ background: isLight ? '#f8fafc' : '#0f0f14', perspective: '1200px' }}
    >
      {/* Top/Bottom Fade Gradients */}
      <div 
        className="absolute inset-x-0 top-0 h-40 z-40 pointer-events-none transition-colors duration-500" 
        style={{
          background: isLight 
            ? 'linear-gradient(to bottom, #f8fafc, rgba(248,250,252,0.9), transparent)' 
            : 'linear-gradient(to bottom, #0f0f14, rgba(15,15,20,0.9), transparent)'
        }}
      />
      <div 
        className="absolute inset-x-0 bottom-0 h-40 z-40 pointer-events-none transition-colors duration-500" 
        style={{
          background: isLight 
            ? 'linear-gradient(to top, #f8fafc, rgba(248,250,252,0.9), transparent)' 
            : 'linear-gradient(to top, #0f0f14, rgba(15,15,20,0.9), transparent)'
        }}
      />

      {/* Static Header Elements */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="absolute top-24 md:top-36 left-0 right-0 z-30 flex flex-col items-center text-center px-6 pointer-events-none"
      >
        <h2 className={`font-display font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight mb-4 drop-shadow-lg transition-colors duration-500 ${isLight ? 'text-slate-900' : 'text-white'}`}>
          TECH STACK
        </h2>
        <p className={`font-mono text-xs md:text-sm tracking-widest uppercase drop-shadow-md transition-colors duration-500 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
          Technologies I Work With
        </p>
      </motion.div>

      {/* Drifting System */}
      <div 
        className="w-full max-w-7xl mx-auto flex justify-center gap-0 md:gap-4 lg:gap-8 h-[140%] -mt-[15%] pt-32 px-2 md:px-8 opacity-95 transition-transform duration-1000 ease-out z-10"
        style={{
          transform: isMobile ? 'none' : 'rotateX(8deg) scale(1.05)',
          transformStyle: 'preserve-3d',
        }}
      >
        {columns.map((techs, i) => (
          <ScrollColumn
            key={i}
            techs={techs}
            speed={columnSpeeds[i]}
            hoveredTech={hoveredTech}
            setHoveredTech={setHoveredTech}
            isMobile={isMobile}
            isLight={isLight}
          />
        ))}
      </div>
    </section>
  );
}

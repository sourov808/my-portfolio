'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView, useSpring, useAnimationFrame, useScroll, useVelocity, MotionValue } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const technologies = [
  { name: 'React', logo: '/logos/react.svg' },
  { name: 'Next.js', logo: '/logos/nextjs.svg' },
  { name: 'TypeScript', logo: '/logos/typescript.svg' },
  { name: 'JavaScript', logo: '/logos/javascript.svg' },
  { name: 'Tailwind CSS', logo: '/logos/tailwindcss.svg' },
  { name: 'Redux', logo: '/logos/redux.svg' },
  { name: 'Node.js', logo: '/logos/nodejs.svg' },
  { name: 'Express', logo: '/logos/express.svg' },
  { name: 'PostgreSQL', logo: '/logos/postgresql.svg' },
  { name: 'MongoDB', logo: '/logos/mongodb.svg' },
  { name: 'Supabase', logo: '/logos/supabase.svg' },
  { name: 'Prisma', logo: '/logos/prisma.svg' },
  { name: 'Redis', logo: '/logos/redis.svg' },
  { name: 'Docker', logo: '/logos/docker.svg' },
  { name: 'WebSockets', logo: '/logos/websockets.svg' },
  { name: 'Git', logo: '/logos/git.svg' },
  { name: 'GitHub', logo: '/logos/github.svg' },
  { name: 'Vercel', logo: '/logos/vercel.svg' },
  { name: 'Postman', logo: '/logos/postman.svg' },
  { name: 'Figma', logo: '/logos/figma.svg' },
];

function OrbitingIcon({
  tech,
  orbitRadius,
  angle,
  speed,
  hoveredTech,
  setHoveredTech,
  isLight,
  scrollVelocity,
}: {
  tech: typeof technologies[0];
  orbitRadius: number;
  angle: number;
  speed: number;
  hoveredTech: string | null;
  setHoveredTech: (t: string | null) => void;
  isLight: boolean;
  scrollVelocity: MotionValue<number>;
}) {
  const angleRef = useRef(angle);
  const [currentAngle, setCurrentAngle] = useState(angle);
  const [isHovered, setIsHovered] = useState(false);

  const isHoveredThis = hoveredTech === tech.name || isHovered;
  const scale = useSpring(isHoveredThis ? 1.4 : 1, { stiffness: 400, damping: 25 });

  useAnimationFrame((_, delta) => {
    if (!isHoveredThis) {
      const velocity = scrollVelocity.get();
      angleRef.current += (speed + velocity * 0.0004) * (delta / 1000);
      setCurrentAngle(angleRef.current);
    }
  });

  const x = Math.cos(currentAngle) * orbitRadius;
  const y = Math.sin(currentAngle) * orbitRadius;
  const z = Math.sin(currentAngle) * orbitRadius;
  const isInFront = z > 0;
  const opacity = isInFront ? 1 : 0.65;

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        x,
        y,
        z,
        scale,
        zIndex: isHoveredThis ? 100 : 1,
        transformStyle: 'preserve-3d',
        opacity,
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        setHoveredTech(tech.name);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoveredTech(null);
      }}
      suppressHydrationWarning
    >
      <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center ${
        isLight ? 'bg-white/40 backdrop-blur-sm' : 'bg-white/5'
      }`}>
        <Image
          src={tech.logo}
          alt={tech.name}
          width={36}
          height={36}
          className="object-contain"
          unoptimized
        />
      </div>
      {isHoveredThis && (
        <motion.span
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-xs font-semibold whitespace-nowrap px-2 py-0.5 rounded-full absolute -bottom-6 ${
            isLight ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
          }`}
        >
          {tech.name}
        </motion.span>
      )}
    </motion.div>
  );
}

function OrbitRing({
  radius,
  technologies: techs,
  speed,
  hoveredTech,
  setHoveredTech,
  isLight,
  scrollVelocity,
}: {
  radius: number;
  technologies: typeof technologies;
  speed: number;
  hoveredTech: string | null;
  setHoveredTech: (t: string | null) => void;
  isLight: boolean;
  scrollVelocity: MotionValue<number>;
}) {
  return (
    <div className="absolute" style={{ transform: `translateZ(0px)` }}>
      {techs.map((tech, i) => (
        <OrbitingIcon
          key={tech.name}
          tech={tech}
          orbitRadius={radius}
          angle={(i / techs.length) * Math.PI * 2}
          speed={speed}
          hoveredTech={hoveredTech}
          setHoveredTech={setHoveredTech}
          isLight={isLight}
          scrollVelocity={scrollVelocity}
        />
      ))}
    </div>
  );
}

export default function Skills() {
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true, margin: '-100px' });
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.innerWidth >= 768;
  });
  const { isLight } = useTheme();

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 300 });

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const innerTechs = technologies.slice(0, 6);
  const middleTechs = technologies.slice(6, 13);
  const outerTechs = technologies.slice(13);

  const innerRadius = isDesktop ? 90 : 50;
  const middleRadius = isDesktop ? 170 : 90;
  const outerRadius = isDesktop ? 250 : 130;

  return (
    <section
      id="skills"
      className="py-16 relative min-h-screen h-screen overflow-hidden flex flex-col items-center justify-center isolate"
      style={{ 
        background: isLight 
          ? 'radial-gradient(circle at 30% 20%, #ffffff 0%, #f8fafc 100%)'
          : '#0f172a',
        perspective: '1000px',
      }}
    >
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="absolute top-12 md:top-24 left-0 right-0 z-30 flex flex-col items-center text-center px-6"
      >
        <h2 className={`font-display font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight mb-2 drop-shadow-lg transition-colors duration-500 ${
          isLight ? 'text-slate-900' : 'text-white'
        }`}>
          TECH STACK
        </h2>
        <p className={`font-mono text-xs md:text-sm tracking-widest uppercase drop-shadow-md transition-colors duration-500 ${
          isLight ? 'text-slate-500' : 'text-slate-400'
        }`}>
          Technologies I Work With
        </p>
      </motion.div>

      <div className="absolute inset-0 mt-16 md:mt-24 flex items-center justify-center">
        <div className="relative" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
          <OrbitRing
            radius={innerRadius}
            technologies={innerTechs}
            speed={0.35}
            hoveredTech={hoveredTech}
            setHoveredTech={setHoveredTech}
            isLight={isLight}
            scrollVelocity={smoothVelocity}
          />
          <OrbitRing
            radius={middleRadius}
            technologies={middleTechs}
            speed={-0.28}
            hoveredTech={hoveredTech}
            setHoveredTech={setHoveredTech}
            isLight={isLight}
            scrollVelocity={smoothVelocity}
          />
          <OrbitRing
            radius={outerRadius}
            technologies={outerTechs}
            speed={0.22}
            hoveredTech={hoveredTech}
            setHoveredTech={setHoveredTech}
            isLight={isLight}
            scrollVelocity={smoothVelocity}
          />
        </div>
      </div>

      <div 
        className="absolute inset-x-0 top-0 h-32 z-20 pointer-events-none" 
        style={{
          background: isLight 
            ? 'linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,0.8), transparent)' 
            : 'linear-gradient(to bottom, #0f172a, rgba(15,23,42,0.9), transparent)'
        }}
      />
      <div 
        className="absolute inset-x-0 bottom-0 h-32 z-20 pointer-events-none" 
        style={{
          background: isLight 
            ? 'linear-gradient(to top, #f8fafc, rgba(248,250,252,0.8), transparent)' 
            : 'linear-gradient(to top, #0f172a, rgba(15,23,42,0.9), transparent)'
        }}
      />
    </section>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimationFrame, useScroll, useVelocity, useSpring, MotionValue } from 'framer-motion';

import { useTheme } from '../context/ThemeContext';
import { typingTexts } from '../constants/typingTexts';
import { socialLinks } from '../constants/socialLinks';

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
        translateX: '-50%',
        translateY: '-50%',
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
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center" style={{ transform: `translateZ(0px)` }}>
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

export default function Hero() {
  const { isLight } = useTheme();
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.innerWidth >= 768;
  });

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 300 });

  useEffect(() => {
    const timer = setTimeout(() => setHasLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

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

  useEffect(() => {
    const currentText = typingTexts[textIndex];

    if (!isDeleting) {
      if (charIndex < currentText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentText.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        const delay = currentText === 'Available for Work' ? 3000 : 1500;
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, delay);
        return () => clearTimeout(timeout);
      }
    } else {
      if (charIndex > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(currentText.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsDeleting(false);
          setTextIndex((textIndex + 1) % typingTexts.length);
        }, 50);
        return () => clearTimeout(timeout);
      }
    }
  }, [charIndex, isDeleting, textIndex]);

  return (
    <section id="hero" className={`relative flex flex-col items-center mt-10 justify-center min-h-[60vh] overflow-hidden ${isLight ? 'bg-white' : 'bg-bg-primary'} ${isLight ? '' : 'mesh-gradient'}`}>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-16 lg:py-20 flex flex-col items-center text-center relative z-10 lg:flex-row lg:text-left lg:justify-between gap-10 lg:items-center">

       
           {/* Hero Content */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left max-w-2xl lg:max-w-none lg:flex-1">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={hasLoaded ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`border rounded-full px-3 py-1.5 mb-4 inline-flex items-center gap-2 ${isLight ? 'bg-gray-100 border-gray-200' : 'bg-black/40 border-primary/30'}`}
        >
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className={`font-mono text-xs ${isLight ? 'text-gray-700' : 'text-primary-highlight'}`}>$</span>
          <span className={`font-mono text-xs ${isLight ? 'text-gray-900' : 'text-primary-highlight'}`}>{displayText}</span>
          <span className={`animate-blink ${isLight ? 'text-gray-700' : 'text-primary-highlight'}`}>▋</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={hasLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`font-display font-black text-4xl md:text-5xl lg:text-6xl tracking-tight leading-none mb-4 ${isLight ? 'text-gray-900' : 'text-white'}`}
        >
          Full-Stack Developer<br />
          <span className="text-primary">Specializing in Scalable</span><br />
          Web Applications
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={hasLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`text-base md:text-lg mb-6 max-w-xl ${isLight ? 'text-gray-600' : 'text-slate-300'}`}
        >
          I design and build high-performance web systems using modern frontend and backend technologies, with a strong focus on clean architecture and maintainability.
        </motion.p>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={hasLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex items-center justify-center gap-4 mt-2"
        >
          <a
            href={socialLinks.x}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center justify-center w-12 h-12 rounded-full border transition-all hover:scale-110 ${
              isLight
                ? 'bg-gray-100 border-gray-200 hover:bg-black hover:border-black'
                : 'bg-white/5 border-white/10 hover:bg-black hover:border-black'
            }`}
            aria-label="X (Twitter)"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-black group-hover:text-white transition-colors" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center justify-center w-12 h-12 rounded-full border transition-all hover:scale-110 ${
              isLight
                ? 'bg-gray-100 border-gray-200 hover:bg-[#24292e] hover:border-[#24292e]'
                : 'bg-white/5 border-white/10 hover:bg-[#24292e] hover:border-[#24292e]'
            }`}
            aria-label="GitHub"
          >
            <svg viewBox="0 0 24 24" className={`w-5 h-5 transition-colors ${isLight ? 'text-[#24292e]' : 'text-gray-300'} group-hover:text-white`} fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center justify-center w-12 h-12 rounded-full border transition-all hover:scale-110 ${
              isLight
                ? 'bg-gray-100 border-gray-200 hover:bg-[#0A66C2] hover:border-[#0A66C2]'
                : 'bg-white/5 border-white/10 hover:bg-[#0A66C2] hover:border-[#0A66C2]'
            }`}
            aria-label="LinkedIn"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0A66C2] group-hover:text-white transition-colors" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </motion.div>
        </div>

        {/* Tech Stack Orbit - Desktop Only */}
        <div className="hidden lg:flex relative w-[400px] h-[400px] mt-16 lg:flex-1 shrink-0 items-center justify-center" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
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

    </section>
  );
}

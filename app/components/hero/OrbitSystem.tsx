'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimationFrame, useSpring, MotionValue } from 'framer-motion';
import { technologies } from '../../constants/technologies';

interface OrbitingIconProps {
  tech: typeof technologies[0];
  orbitRadius: number;
  angle: number;
  speed: number;
  hoveredTech: string | null;
  setHoveredTech: (t: string | null) => void;
  isLight: boolean;
  scrollVelocity: MotionValue<number>;
}

function OrbitingIcon({
  tech,
  orbitRadius,
  angle,
  speed,
  hoveredTech,
  setHoveredTech,
  isLight,
  scrollVelocity,
}: OrbitingIconProps) {
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

interface OrbitRingProps {
  radius: number;
  technologies: typeof technologies;
  speed: number;
  hoveredTech: string | null;
  setHoveredTech: (t: string | null) => void;
  isLight: boolean;
  scrollVelocity: MotionValue<number>;
}

function OrbitRing({
  radius,
  technologies: techs,
  speed,
  hoveredTech,
  setHoveredTech,
  isLight,
  scrollVelocity,
}: OrbitRingProps) {
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

interface OrbitSystemProps {
  innerRadius: number;
  middleRadius: number;
  outerRadius: number;
  hoveredTech: string | null;
  setHoveredTech: (t: string | null) => void;
  isLight: boolean;
  smoothVelocity: MotionValue<number>;
}

export default function OrbitSystem({
  innerRadius,
  middleRadius,
  outerRadius,
  hoveredTech,
  setHoveredTech,
  isLight,
  smoothVelocity,
}: OrbitSystemProps) {
  const innerTechs = technologies.slice(0, 6);
  const middleTechs = technologies.slice(6, 13);
  const outerTechs = technologies.slice(13);

  return (
    <div className="relative w-full max-w-[450px] aspect-square lg:flex-1 shrink-0 flex items-center justify-center mx-auto mt-12 lg:mt-16" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
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
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useScroll, useVelocity, useSpring } from 'framer-motion';

import { useTheme } from '../../context/ThemeContext';
import { typingTexts } from '../../constants/typingTexts';
import { useTypingEffect } from '../../hooks/useTypingEffect';

import OrbitSystem from './OrbitSystem';
import HeroContent from './HeroContent';
import HeroSocialLinks from './HeroSocialLinks';

export default function Hero() {
  const { isLight } = useTheme();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.innerWidth >= 768;
  });

  const displayText = useTypingEffect(typingTexts);

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

  const innerRadius = isDesktop ? 90 : 50;
  const middleRadius = isDesktop ? 170 : 90;
  const outerRadius = isDesktop ? 250 : 130;

  return (
    <section id="hero" className={`relative min-h-screen pt-20 md:pt-24 pb-16 ${isLight ? 'bg-white' : 'bg-bg-primary'} ${isLight ? '' : 'mesh-gradient'}`}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12 flex flex-col items-center text-center lg:flex-row lg:text-left lg:justify-between gap-12 lg:gap-32 lg:items-center" style={{ position: 'relative', zIndex: 10 }}>
        
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left max-w-2xl lg:flex-1">
          <HeroContent hasLoaded={hasLoaded} isLight={isLight} displayText={displayText} />
          <HeroSocialLinks isLight={isLight} hasLoaded={hasLoaded} />
        </div>

        <OrbitSystem
          innerRadius={innerRadius}
          middleRadius={middleRadius}
          outerRadius={outerRadius}
          hoveredTech={hoveredTech}
          setHoveredTech={setHoveredTech}
          isLight={isLight}
          smoothVelocity={smoothVelocity}
        />
      </div>
    </section>
  );
}

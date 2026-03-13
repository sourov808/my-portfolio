'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInSectionProps {
  children: ReactNode;
  delay?: number;
  variant?: 'fade-up' | 'fade-in' | 'scale-in' | 'slide-left' | 'slide-right';
}

const variants = {
  'fade-up': {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
  },
  'fade-in': {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  'scale-in': {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
  },
  'slide-left': {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
  },
  'slide-right': {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
  },
};

export default function FadeInSection({
  children,
  delay = 0,
  variant = 'fade-up',
}: FadeInSectionProps) {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    setHasLoaded(true);
  }, []);

  const selectedVariant = variants[variant];

  return (
    <motion.div
      initial={hasLoaded ? selectedVariant.initial : { opacity: 1, y: 0, scale: 1, x: 0 }}
      whileInView={selectedVariant.animate}
      viewport={{ once: true, margin: '-80px' }}
      onViewportEnter={() => setIsInViewport(true)}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}

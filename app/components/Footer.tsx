'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { isLight } = useTheme();

  return (
    <footer className={`py-16 md:py-20 ${isLight ? 'bg-gray-50' : 'bg-[#0F172A]'}`}>
      <div className={`max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12 text-center border-t pt-12 md:pt-16 ${isLight ? 'border-gray-200' : 'border-white/5'}`}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`text-sm italic mb-8 ${isLight ? 'text-gray-500' : 'text-slate-500'}`}
        >
          Available for freelance and product collaborations.
        </motion.p>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`text-2xl font-display font-bold mb-1 tracking-tight ${isLight ? 'text-gray-900' : 'text-white'}`}
        >
          Sourov Das
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-sm font-mono text-[#4F46E5] mb-5"
        >
          Full-Stack Developer
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`text-sm md:text-base max-w-md mx-auto leading-relaxed mb-12 ${isLight ? 'text-gray-600' : 'text-slate-400'}`}
        >
          Building scalable, performance-focused web applications with clarity and intention.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`text-xs ${isLight ? 'text-gray-400' : 'text-slate-600'}`}
        >
          © {new Date().getFullYear()} Sourov Das. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
}

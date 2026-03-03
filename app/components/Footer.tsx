'use client';

import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { isLight } = useTheme();

  return (
    <footer className={`py-12 md:py-16 ${isLight ? 'bg-gray-50' : 'bg-bg-primary'}`}>
      <div className={`max-w-4xl mx-auto px-6 text-center border-t pt-12 md:pt-16 ${isLight ? 'border-gray-200' : 'border-white/5'}`}>
        <p className={`text-sm italic mb-8 ${isLight ? 'text-gray-500' : 'text-slate-500'}`}>
          Available for freelance and product collaborations.
        </p>

        <h3 className={`text-2xl font-display font-bold mb-1 tracking-tight ${isLight ? 'text-gray-900' : 'text-white'}`}>
          Sourov Das
        </h3>
        
        <p className="text-sm font-mono text-primary mb-5">
          Full-Stack Developer
        </p>

        <p className={`text-sm md:text-base max-w-md mx-auto leading-relaxed mb-12 ${isLight ? 'text-gray-600' : 'text-slate-400'}`}>
          Building scalable, performance-focused web applications with clarity and intention.
        </p>

        <p className={`text-xs ${isLight ? 'text-gray-400' : 'text-slate-600'}`}>
          © {new Date().getFullYear()} Sourov Das. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

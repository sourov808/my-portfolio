'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const coreTechs = [
  { name: 'JavaScript', icon: 'javascript' },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'React', icon: 'react' },
  { name: 'Next.js', icon: 'next' },
];

const frameworks = [
  { name: 'Tailwind CSS', icon: 'tailwind' },
  { name: 'Redux Toolkit', icon: 'redux' },
  { name: 'Zustand', icon: 'zustand' },
  { name: 'Prisma', icon: 'prisma' },
  { name: 'Supabase', icon: 'supabase' },
  { name: 'Node.js', icon: 'node' },
  { name: 'PostgreSQL', icon: 'postgresql' },
  { name: 'Git', icon: 'git' },
];

const IconMap: Record<string, React.ReactNode> = {
  javascript: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#F7DF1E"><path d="M3 3h18v18H3V3zm9.5 14.5v-4h1v4h1.5v-6h-5v2h1.5zm1-3.5v-1h2v1h-2zm7.5 5.5h-2v-6h2v1.5h1v1h-1v1h-1v1h1v1.5zm-12.5-5h2v-2h-2v-1h3v3h-3v-1z"/></svg>,
  next: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="white"><path d="M22 13.5v5.77l-2.87.98-1.95-5.75h-2.17l-2.14 5.75-2.19.01-2.86-5.75H6.96l-2.9 7.75h2.07l2.17-5.75h2.16l2.14 5.75 2.19-.01 2.14-5.75h2.16l1.95 5.75-2.87-.99z"/></svg>,
  react: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#61DAFB"><circle cx="12" cy="12" r="4"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="#61DAFB" strokeWidth="1.5" fill="none"/></svg>,
  tailwind: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#38BDF8"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#38BDF8" strokeWidth="1.5" fill="none"/></svg>,
  typescript: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#3178C6"><path d="M3 3h18v18H3V3zm4.73 15.04c.4.85 1.19 1.55 2.54 1.55 1.5 0 2.53-.8 2.53-2.55v-5.78h-1.7V17c0 .86-.35 1.08-.9 1.08-.58 0-.82-.4-1.09-.87l-1.38.83z"/></svg>,
  redux: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#764ABC"><circle cx="12" cy="12" r="10" fill="none" stroke="#764ABC" strokeWidth="1.5"/><path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6" stroke="#764ABC" strokeWidth="2" fill="none"/></svg>,
  zustand: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#764ABC"><circle cx="12" cy="12" r="10" fill="none" stroke="#764ABC" strokeWidth="2"/><circle cx="12" cy="12" r="4" fill="#764ABC"/></svg>,
  prisma: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#2D3748"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#2D3748" strokeWidth="1.5" fill="none"/></svg>,
  supabase: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#3ECF8E"><path d="M12 2L2 7v10l10 5 10-5V7L12 2z" fill="none" stroke="#3ECF8E" strokeWidth="1.5"/><path d="M8 12l2 2 4-4" stroke="#3ECF8E" strokeWidth="2" fill="none"/></svg>,
  node: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#339933"><circle cx="12" cy="12" r="10" fill="none" stroke="#339933" strokeWidth="1.5"/><path d="M8 9l4-2 4 2v6l-4 2-4-2V9z" fill="#339933"/></svg>,
  postgresql: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#336791"><ellipse cx="12" cy="8" rx="8" ry="4" fill="none" stroke="#336791" strokeWidth="1.5"/><path d="M4 8v8c0 2.2 3.6 4 8 4s8-1.8 8-4V8" fill="none" stroke="#336791" strokeWidth="1.5"/></svg>,
  git: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#F05032"><circle cx="12" cy="12" r="10" fill="none" stroke="#F05032" strokeWidth="1.5"/><circle cx="12" cy="12" r="3"/></svg>,
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isLight, setIsLight] = useState(false);

  return (
    <section id="skills" className={`py-24 transition-colors duration-300 ${isLight ? 'bg-gray-50' : 'bg-[#101622]/30'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <div className="flex items-center justify-between mb-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className={`font-display font-black text-4xl uppercase tracking-tight mb-2 ${isLight ? 'text-gray-900' : 'text-white'}`}>
              Technical Skills
            </h2>
            <p className={isLight ? 'text-gray-600' : 'text-slate-400'}>Technologies and tools I work with</p>
          </motion.div>

          <button
            onClick={() => setIsLight(!isLight)}
            className={`p-3 rounded-lg border transition-all duration-200 ${
              isLight
                ? 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'
                : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
            }`}
            aria-label="Toggle theme"
          >
            {isLight ? (
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 000-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
              </svg>
            )}
          </button>
        </div>

        <div className="mb-10">
          <h3 className={`text-lg font-bold text-center mb-4 ${isLight ? 'text-gray-800' : 'text-white'}`}>Core Technologies</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {coreTechs.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all cursor-default ${
                  isLight
                    ? 'bg-white border-gray-200 shadow-sm hover:shadow-md hover:border-primary/50'
                    : 'glass border-white/10 hover:border-primary/50'
                }`}
              >
                {IconMap[tech.icon]}
                <span className={`font-medium text-sm ${isLight ? 'text-gray-800' : 'text-white'}`}>{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className={`text-lg font-bold text-center mb-4 ${isLight ? 'text-gray-800' : 'text-white'}`}>Frameworks & Tools</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {frameworks.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all cursor-default ${
                  isLight
                    ? 'bg-white border-gray-200 shadow-sm hover:shadow-md hover:border-cyber-lime/50'
                    : 'glass border-white/10 hover:border-cyber-lime/50'
                }`}
              >
                {IconMap[tech.icon]}
                <span className={`font-medium text-sm ${isLight ? 'text-gray-800' : 'text-white'}`}>{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

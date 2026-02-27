'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const allTechs = [
  { name: 'JavaScript', icon: 'javascript', category: 'core' },
  { name: 'TypeScript', icon: 'typescript', category: 'core' },
  { name: 'React', icon: 'react', category: 'core' },
  { name: 'Next.js', icon: 'next', category: 'core' },
  { name: 'Tailwind CSS', icon: 'tailwind', category: 'framework' },
  { name: 'Redux Toolkit', icon: 'redux', category: 'framework' },
  { name: 'Zustand', icon: 'zustand', category: 'framework' },
  { name: 'Prisma', icon: 'prisma', category: 'framework' },
  { name: 'Supabase', icon: 'supabase', category: 'framework' },
  { name: 'Node.js', icon: 'node', category: 'framework' },
  { name: 'PostgreSQL', icon: 'postgresql', category: 'framework' },
  { name: 'Git', icon: 'git', category: 'framework' },
];

const IconMap: Record<string, React.ReactNode> = {
  javascript: <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#F7DF1E"><path d="M3 3h18v18H3V3zm9.5 14.5v-4h1v4h1.5v-6h-5v2h1.5zm1-3.5v-1h2v1h-2zm7.5 5.5h-2v-6h2v1.5h1v1h-1v1h-1v1h1v1.5zm-12.5-5h2v-2h-2v-1h3v3h-3v-1z"/></svg>,
  next: <svg viewBox="0 0 24 24" className="w-8 h-8" fill="white"><path d="M22 13.5v5.77l-2.87.98-1.95-5.75h-2.17l-2.14 5.75-2.19.01-2.86-5.75H6.96l-2.9 7.75h2.07l2.17-5.75h2.16l2.14 5.75 2.19-.01 2.14-5.75h2.16l1.95 5.75-2.87-.99z"/></svg>,
  react: <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#61DAFB"><circle cx="12" cy="12" r="4"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="#61DAFB" strokeWidth="1.5" fill="none"/></svg>,
  tailwind: <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#38BDF8"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#38BDF8" strokeWidth="1.5" fill="none"/></svg>,
  typescript: <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#3178C6"><path d="M3 3h18v18H3V3zm4.73 15.04c.4.85 1.19 1.55 2.54 1.55 1.5 0 2.53-.8 2.53-2.55v-5.78h-1.7V17c0 .86-.35 1.08-.9 1.08-.58 0-.82-.4-1.09-.87l-1.38.83z"/></svg>,
  redux: <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#764ABC"><circle cx="12" cy="12" r="10" fill="none" stroke="#764ABC" strokeWidth="1.5"/><path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6" stroke="#764ABC" strokeWidth="2" fill="none"/></svg>,
  zustand: <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#764ABC"><circle cx="12" cy="12" r="10" fill="none" stroke="#764ABC" strokeWidth="2"/><circle cx="12" cy="12" r="4" fill="#764ABC"/></svg>,
  prisma: <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#2D3748"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#2D3748" strokeWidth="1.5" fill="none"/></svg>,
  supabase: <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#3ECF8E"><path d="M12 2L2 7v10l10 5 10-5V7L12 2z" fill="none" stroke="#3ECF8E" strokeWidth="1.5"/><path d="M8 12l2 2 4-4" stroke="#3ECF8E" strokeWidth="2" fill="none"/></svg>,
  node: <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#339933"><circle cx="12" cy="12" r="10" fill="none" stroke="#339933" strokeWidth="1.5"/><path d="M8 9l4-2 4 2v6l-4 2-4-2V9z" fill="#339933"/></svg>,
  postgresql: <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#336791"><ellipse cx="12" cy="8" rx="8" ry="4" fill="none" stroke="#336791" strokeWidth="1.5"/><path d="M4 8v8c0 2.2 3.6 4 8 4s8-1.8 8-4V8" fill="none" stroke="#336791" strokeWidth="1.5"/></svg>,
  git: <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#F05032"><circle cx="12" cy="12" r="10" fill="none" stroke="#F05032" strokeWidth="1.5"/><circle cx="12" cy="12" r="3"/></svg>,
};

export default function Skills() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const radius = 160;
  const step = (2 * Math.PI) / allTechs.length;

  return (
    <section id="skills" className="py-24 bg-[#101622]/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-black text-4xl text-white uppercase tracking-tight mb-2">
            Technical Skills
          </h2>
          <p className="text-slate-400">Technologies and tools I work with</p>
        </motion.div>

        <motion.div 
          className="relative flex items-center justify-center"
          style={{ height: '450px' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-80 h-80 rounded-full border-2 border-primary/20 flex items-center justify-center animate-spin-slow">
              <div className="w-72 h-72 rounded-full border border-dashed border-cyber-lime/30 animate-spin-reverse"></div>
            </div>
            <div className="absolute w-96 h-96 rounded-full border border-primary/10 flex items-center justify-center animate-spin-reverse">
              <div className="w-80 h-80 rounded-full border border-dashed border-primary/20 animate-spin-slow"></div>
            </div>
          </div>

          {allTechs.map((tech, index) => {
            const angle = step * index - Math.PI / 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            return (
              <motion.div
                key={tech.name}
                className="absolute transition-all duration-300 flex items-center justify-center"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                  opacity: mounted ? 1 : 0,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
              >
                <div 
                  className={`glass rounded-full p-3 cursor-pointer transition-all duration-300 hover:scale-125 ${
                    tech.category === 'core' 
                      ? 'hover:bg-primary/40' 
                      : 'hover:bg-cyber-lime/20'
                  }`}
                  onMouseEnter={() => setHoveredTech(tech.name)}
                  onMouseLeave={() => setHoveredTech(null)}
                >
                  {IconMap[tech.icon] || <span className="material-symbols-outlined text-white text-2xl">{tech.icon}</span>}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-white">Core Technologies</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {allTechs.filter(t => t.category === 'core').map((tech) => (
              <motion.div 
                key={tech.name}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg border transition-all duration-300 ${
                  hoveredTech === tech.name 
                    ? 'bg-primary/20 border-primary shadow-[0_0_15px_rgba(139,92,246,0.4)]' 
                    : 'glass border-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {IconMap[tech.icon]}
                <span className="text-white font-medium">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-white">Frameworks & Tools</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {allTechs.filter(t => t.category === 'framework').map((tech) => (
              <motion.div 
                key={tech.name}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg border transition-all duration-300 ${
                  hoveredTech === tech.name 
                    ? 'bg-cyber-lime/20 border-cyber-lime shadow-[0_0_15px_rgba(173,255,47,0.4)]' 
                    : 'glass border-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {IconMap[tech.icon]}
                <span className="text-white font-medium">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

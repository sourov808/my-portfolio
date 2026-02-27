'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const homeNode = { name: 'React', icon: 'react' };

const places = [
  { name: 'Next.js', icon: 'next' },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'Node.js', icon: 'node' },
  { name: 'PostgreSQL', icon: 'postgresql' },
  { name: 'Supabase', icon: 'supabase' },
  { name: 'Tailwind CSS', icon: 'tailwind' },
  { name: 'Git', icon: 'git' },
];

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
  javascript: <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#F7DF1E"><path d="M3 3h18v18H3V3zm9.5 14.5v-4h1v4h1.5v-6h-5v2h1.5zm1-3.5v-1h2v1h-2zm7.5 5.5h-2v-6h2v1.5h1v1h-1v1h-1v1h1v1.5zm-12.5-5h2v-2h-2v-1h3v3h-3v-1z"/></svg>,
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
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [activePlace, setActivePlace] = useState<number | null>(null);
  const [visitedPlaces, setVisitedPlaces] = useState<number[]>([]);

  useEffect(() => {
    const runAnimation = async () => {
      for (let i = 0; i < places.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1200));
        setActivePlace(i);
        setVisitedPlaces(prev => [...prev, i]);
      }
      await new Promise(resolve => setTimeout(resolve, 2000));
      setActivePlace(null);
      setVisitedPlaces([]);
      setTimeout(runAnimation, 1000);
    };
    runAnimation();
  }, []);

  const centerX = 200;
  const centerY = 120;
  const radius = 100;

  return (
    <section id="skills" className="py-16 bg-[#101622]/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <div className="text-center mb-4">
          <h2 className="font-display font-black text-4xl text-white uppercase tracking-tight mb-2">
            Technical Skills
          </h2>
          <p className="text-slate-400">Technologies and tools I work with</p>
        </div>

        <div className="w-full max-w-lg mx-auto mb-6">
          <svg viewBox="0 0 400 280" className="w-full h-auto overflow-visible">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#adff2f" stopOpacity="0.8" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {places.map((place, index) => {
              const angle = (index * (360 / places.length) - 90) * (Math.PI / 180);
              const x = centerX + radius * Math.cos(angle);
              const y = centerY + radius * Math.sin(angle);
              const isVisited = visitedPlaces.includes(index);
              const isActive = activePlace === index;

              return (
                <g key={place.name}>
                  <motion.line
                    x1={centerX}
                    y1={centerY}
                    x2={x}
                    y2={y}
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0 }}
                    animate={{ 
                      pathLength: isVisited ? 1 : 0,
                      opacity: isVisited ? 1 : 0.3
                    }}
                    transition={{ duration: 0.8 }}
                  />
                  <motion.circle
                    cx={x}
                    cy={y}
                    r={isActive ? 22 : 18}
                    fill={isActive ? '#adff2f' : isVisited ? '#8b5cf6' : '#1e1b2e'}
                    stroke={isActive ? '#adff2f' : '#8b5cf6'}
                    strokeWidth="2"
                    filter={isActive ? 'url(#glow)' : ''}
                    animate={{
                      scale: isActive ? 1.3 : 1,
                      opacity: isActive ? 1 : isVisited ? 0.8 : 0.5
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <foreignObject x={x - 16} y={y - 16} width="32" height="32">
                    <div className="flex items-center justify-center w-full h-full">
                      {IconMap[place.icon]}
                    </div>
                  </foreignObject>
                  <motion.text
                    x={x}
                    y={y + 28}
                    textAnchor="middle"
                    fill="white"
                    fontSize="9"
                    fontWeight="500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isVisited ? 1 : 0 }}
                  >
                    {place.name}
                  </motion.text>
                </g>
              );
            })}

            <motion.circle
              cx={centerX}
              cy={centerY}
              r={28}
              fill="#1e1b2e"
              stroke="#61DAFB"
              strokeWidth="3"
              filter="url(#glow)"
            />
            <foreignObject x={centerX - 16} y={centerY - 16} width="32" height="32">
              <div className="flex items-center justify-center w-full h-full">
                {IconMap[homeNode.icon]}
              </div>
            </foreignObject>
            <text
              x={centerX}
              y={centerY + 48}
              textAnchor="middle"
              fill="#61DAFB"
              fontSize="11"
              fontWeight="bold"
            >
              React
            </text>
          </svg>
        </div>

        <div className="mt-6">
          <div className="text-center mb-3">
            <h3 className="text-lg font-bold text-white">Core Technologies</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {coreTechs.map((tech) => (
              <motion.div
                key={tech.name}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
                  hoveredTech === tech.name
                    ? 'bg-primary/20 border-primary shadow-[0_0_15px_rgba(139,92,246,0.4)]'
                    : 'glass border-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {IconMap[tech.icon]}
                <span className="text-white font-medium text-sm">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <div className="text-center mb-3">
            <h3 className="text-lg font-bold text-white">Frameworks & Tools</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {frameworks.map((tech) => (
              <motion.div
                key={tech.name}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
                  hoveredTech === tech.name
                    ? 'bg-cyber-lime/20 border-cyber-lime shadow-[0_0_15px_rgba(173,255,47,0.4)]'
                    : 'glass border-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {IconMap[tech.icon]}
                <span className="text-white font-medium text-sm">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

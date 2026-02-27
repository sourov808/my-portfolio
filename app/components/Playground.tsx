'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const nodes = [
  { id: 1, label: 'Next.js', icon: 'next', x: 50, y: 10 },
  { id: 2, label: 'React', icon: 'react', x: 25, y: 30 },
  { id: 3, label: 'TypeScript', icon: 'typescript', x: 75, y: 30 },
  { id: 4, label: 'Tailwind', icon: 'tailwind', x: 15, y: 50 },
  { id: 5, label: 'Redux', icon: 'redux', x: 40, y: 50 },
  { id: 6, label: 'Zustand', icon: 'zustand', x: 60, y: 50 },
  { id: 7, label: 'Node.js', icon: 'node', x: 85, y: 50 },
  { id: 8, label: 'Prisma', icon: 'prisma', x: 25, y: 75 },
  { id: 9, label: 'Supabase', icon: 'supabase', x: 50, y: 75 },
  { id: 10, label: 'PostgreSQL', icon: 'postgresql', x: 75, y: 75 },
];

// Sequential flow path: Next.js → React → TypeScript → Tailwind → Redux → Zustand → Node.js → Prisma → Supabase → PostgreSQL
const flowPath = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const IconMap: Record<string, React.ReactNode> = {
  next: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="white">
      <path d="M22 13.5v5.77l-2.87.98-1.95-5.75h-2.17l-2.14 5.75-2.19.01-2.86-5.75H6.96l-2.9 7.75h2.07l2.17-5.75h2.16l2.14 5.75 2.19-.01 2.14-5.75h2.16l1.95 5.75-2.87-.99z"/>
    </svg>
  ),
  react: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#61DAFB">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="#61DAFB" strokeWidth="1.5" fill="none"/>
    </svg>
  ),
  tailwind: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#38BDF8">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#38BDF8" strokeWidth="1.5" fill="none"/>
    </svg>
  ),
  typescript: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#3178C6">
      <path d="M3 3h18v18H3V3zm4.73 15.04c.4.85 1.19 1.55 2.54 1.55 1.5 0 2.53-.8 2.53-2.55v-5.78h-1.7V17c0 .86-.35 1.08-.9 1.08-.58 0-.82-.4-1.09-.87l-1.38.83z"/>
    </svg>
  ),
  redux: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#764ABC">
      <circle cx="12" cy="12" r="10" fill="none" stroke="#764ABC" strokeWidth="1.5"/>
      <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6" stroke="#764ABC" strokeWidth="2" fill="none"/>
    </svg>
  ),
  zustand: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#764ABC">
      <circle cx="12" cy="12" r="10" fill="none" stroke="#764ABC" strokeWidth="2"/>
      <circle cx="12" cy="12" r="4" fill="#764ABC"/>
    </svg>
  ),
  prisma: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#2D3748">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#2D3748" strokeWidth="1.5" fill="none"/>
    </svg>
  ),
  supabase: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#3ECF8E">
      <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.5L19 8l-7 3.5L5 8l7-3.5zM4 9.5l7 3.5v7l-7-3.5v-7zm16 0v7l-7 3.5v-7l7-3.5z" fill="none" stroke="#3ECF8E" strokeWidth="1.5"/>
    </svg>
  ),
  node: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#339933">
      <circle cx="12" cy="12" r="10" fill="none" stroke="#339933" strokeWidth="1.5"/>
      <path d="M8 9l4-2 4 2v6l-4 2-4-2V9z" fill="#339933"/>
    </svg>
  ),
  postgresql: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#336791">
      <ellipse cx="12" cy="8" rx="8" ry="4" fill="none" stroke="#336791" strokeWidth="1.5"/>
      <path d="M4 8v8c0 2.2 3.6 4 8 4s8-1.8 8-4V8" fill="none" stroke="#336791" strokeWidth="1.5"/>
      <path d="M4 8c0 2.2 3.6 4 8 4s8-1.8 8-4" fill="none" stroke="#336791" strokeWidth="1.5"/>
    </svg>
  ),
};

const cableConnections = [
  { from: 0, to: 1 },
  { from: 0, to: 2 },
  { from: 1, to: 3 },
  { from: 1, to: 4 },
  { from: 2, to: 5 },
  { from: 2, to: 6 },
  { from: 3, to: 7 },
  { from: 4, to: 7 },
  { from: 5, to: 8 },
  { from: 6, to: 9 },
  { from: 7, to: 8 },
  { from: 8, to: 9 },
];

export default function Playground() {
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [activeFlowIndex, setActiveFlowIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFlowIndex((prev) => (prev + 1) % flowPath.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const getFlowProgress = (index: number) => {
    if (index <= activeFlowIndex) return 1;
    if (index === activeFlowIndex + 1) return 0.5;
    return 0;
  };

  return (
    <section id="architecture" className="py-24 relative min-h-screen simulation-grid">
      <div className="absolute inset-0 bg-[#0a0812]/80"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-display font-black text-4xl text-white uppercase tracking-tight mb-2">
            Architecture
          </h2>
          <p className="text-slate-400">Technology stack visualization</p>
        </div>

        <div className="glass-panel rounded-2xl p-6 min-h-[500px] relative overflow-hidden">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.6 }}>
            {/* Static connection lines */}
            {cableConnections.map((cable, i) => (
              <line
                key={`line-${i}`}
                x1={`${nodes[cable.from].x}%`}
                y1={`${nodes[cable.from].y}%`}
                x2={`${nodes[cable.to].x}%`}
                y2={`${nodes[cable.to].y}%`}
                stroke="rgba(139,92,246,0.3)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            ))}

            {/* Sequential flow lines - highlight path as data flows */}
            {flowPath.slice(0, -1).map((fromIdx, i) => {
              const toIdx = flowPath[i + 1];
              const progress = getFlowProgress(i);
              if (progress === 0) return null;

              const fromNode = nodes[fromIdx];
              const toNode = nodes[toIdx];

              return (
                <motion.line
                  key={`flow-${i}`}
                  x1={`${fromNode.x}%`}
                  y1={`${fromNode.y}%`}
                  x2={`${toNode.x}%`}
                  y2={`${toNode.y}%`}
                  stroke={progress === 1 ? '#adff2f' : '#8b5cf6'}
                  strokeWidth="3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: progress,
                    opacity: progress > 0 ? 1 : 0,
                    stroke: progress === 1 ? 'rgba(173,255,47,0.8)' : 'rgba(139,92,246,0.8)'
                  }}
                  transition={{ duration: 0.4 }}
                />
              );
            })}

            {/* Animated data packet traveling along the flow */}
            <circle r="5" fill="#adff2f" filter="url(#glow)">
              <animateMotion
                dur="8s"
                repeatCount="indefinite"
                path={`M${nodes[0].x * 5},${nodes[0].y * 4} L${nodes[1].x * 5},${nodes[1].y * 4} L${nodes[2].x * 5},${nodes[2].y * 4} L${nodes[3].x * 5},${nodes[3].y * 4} L${nodes[4].x * 5},${nodes[4].y * 4} L${nodes[5].x * 5},${nodes[5].y * 4} L${nodes[6].x * 5},${nodes[6].y * 4} L${nodes[7].x * 5},${nodes[7].y * 4} L${nodes[8].x * 5},${nodes[8].y * 4} L${nodes[9].x * 5},${nodes[9].y * 4}`}
              />
            </circle>
          </svg>

          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-xs text-slate-400 font-mono">Live Data Transfer</span>
          </div>

          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="text-xs text-slate-500 font-mono">Level 1</span>
            <span className="text-xs text-slate-600">→</span>
            <span className="text-xs text-slate-500 font-mono">Level 2</span>
            <span className="text-xs text-slate-600">→</span>
            <span className="text-xs text-slate-500 font-mono">Level 3</span>
          </div>

          {nodes.map((node, index) => {
            const isActive = index === activeFlowIndex;
            const hasBeenActive = index < activeFlowIndex;

            return (
              <motion.div
                key={node.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                animate={{
                  scale: isActive ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className={`w-14 h-14 rounded-xl glass border transition-all duration-300 flex items-center justify-center ${
                  selectedNode === node.id
                    ? 'border-cyber-lime shadow-[0_0_25px_rgba(173,255,47,0.7)]'
                    : isActive
                    ? 'border-cyber-lime shadow-[0_0_20px_rgba(173,255,47,0.5)]'
                    : hasBeenActive
                    ? 'border-primary/60 shadow-[0_0_10px_rgba(139,92,246,0.3)]'
                    : 'border-primary/30 group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]'
                }`}>
                  {IconMap[node.icon] || <span className="material-symbols-outlined text-white text-xl">{node.icon}</span>}
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-medium transition-all ${
                    selectedNode === node.id ? 'bg-cyber-lime text-black' :
                    isActive ? 'bg-cyber-lime text-black' :
                    hasBeenActive ? 'bg-primary/40 text-white' :
                    'bg-white/10 text-slate-300'
                  }`}>
                    {node.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="glass p-3 rounded-lg text-center">
            <span className="text-xs text-primary font-bold">LEVEL 1</span>
            <p className="text-[10px] text-slate-400 mt-1">Frameworks</p>
          </div>
          <div className="glass p-3 rounded-lg text-center">
            <span className="text-xs text-cyber-lime font-bold">LEVEL 2</span>
            <p className="text-[10px] text-slate-400 mt-1">State & Tools</p>
          </div>
          <div className="glass p-3 rounded-lg text-center">
            <span className="text-xs text-green-500 font-bold">LEVEL 3</span>
            <p className="text-[10px] text-slate-400 mt-1">Database</p>
          </div>
        </div>
      </div>
    </section>
  );
}

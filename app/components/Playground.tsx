'use client';

import { useTheme } from '../context/ThemeContext';

interface TechNode {
  id: string;
  label: string;
  x: number;
  y: number;
  layer: number;
  color: string;
}

const techNodes: TechNode[] = [
  { id: 'nextjs', label: 'Next.js', x: 50, y: 15, layer: 1, color: '#ffffff' },
  { id: 'react', label: 'React', x: 25, y: 35, layer: 1, color: '#61DAFB' },
  { id: 'typescript', label: 'TypeScript', x: 75, y: 35, layer: 1, color: '#3178C6' },
  { id: 'tailwind', label: 'Tailwind', x: 15, y: 55, layer: 2, color: '#38BDF8' },
  { id: 'redux', label: 'Redux', x: 40, y: 55, layer: 2, color: '#764ABC' },
  { id: 'zustand', label: 'Zustand', x: 60, y: 55, layer: 2, color: '#764ABC' },
  { id: 'node', label: 'Node.js', x: 85, y: 55, layer: 2, color: '#339933' },
  { id: 'prisma', label: 'Prisma', x: 25, y: 80, layer: 3, color: '#58B6BE' },
  { id: 'supabase', label: 'Supabase', x: 50, y: 80, layer: 3, color: '#3ECF8E' },
  { id: 'postgresql', label: 'PostgreSQL', x: 75, y: 80, layer: 3, color: '#336791' },
];

const connections = [
  { from: 'nextjs', to: 'react' },
  { from: 'nextjs', to: 'typescript' },
  { from: 'react', to: 'tailwind' },
  { from: 'react', to: 'redux' },
  { from: 'typescript', to: 'zustand' },
  { from: 'typescript', to: 'node' },
  { from: 'tailwind', to: 'prisma' },
  { from: 'redux', to: 'prisma' },
  { from: 'zustand', to: 'supabase' },
  { from: 'node', to: 'postgresql' },
  { from: 'prisma', to: 'supabase' },
  { from: 'supabase', to: 'postgresql' },
];

function AnimatedConnection({ start, end, color }: { start: TechNode; end: TechNode; color: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" style={{ zIndex: 0 }}>
      <defs>
        <linearGradient id={`grad-${start.id}-${end.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={start.color} stopOpacity="0.6" />
          <stop offset="100%" stopColor={end.color} stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <line
        x1={`${start.x}%`}
        y1={`${start.y}%`}
        x2={`${end.x}%`}
        y2={`${end.y}%`}
        stroke={`url(#grad-${start.id}-${end.id})`}
        strokeWidth="2"
        strokeDasharray="8 4"
        className="animate-pulse"
      />
      <circle r="4" fill={color} opacity="0.8">
        <animateMotion
          dur="2s"
          repeatCount="indefinite"
          path={`M${start.x},${start.y} L${end.x},${end.y}`}
        />
      </circle>
    </svg>
  );
}

function TechNodeComponent({ node }: { node: TechNode }) {
  const { isLight } = useTheme();
  
  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group"
      style={{
        left: `${node.x}%`,
        top: `${node.y}%`,
        zIndex: 10,
      }}
    >
      <div 
        className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110`}
        style={{
          background: isLight 
            ? `linear-gradient(135deg, ${node.color}20, ${node.color}10)`
            : `radial-gradient(circle at 30% 30%, ${node.color}30, ${node.color}10)`,
          border: `2px solid ${isLight ? '#e5e7eb' : `${node.color}50`}`,
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
        }}
      >
        <span 
          className="text-xs md:text-sm font-bold"
          style={{ color: isLight ? '#374151' : '#e5e7eb' }}
        >
          {node.label.split(' ')[0]}
        </span>
        
        <div 
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at center, ${node.color}20 0%, transparent 70%)`,
          }}
        />
      </div>
      
      <div 
        className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium transition-all duration-300 opacity-0 group-hover:opacity-100 ${
          isLight ? 'text-gray-700' : 'text-white'
        }`}
      >
        {node.label}
      </div>
    </div>
  );
}

function ConnectionStats() {
  const { isLight } = useTheme();
  
  return (
    <div className={`mt-8 p-6 rounded-2xl border ${
      isLight ? 'bg-white border-gray-200 shadow-lg' : 'glass border-white/10'
    }`}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center">
          <div className="text-2xl font-black text-primary">3</div>
          <div className={`text-xs font-mono mt-1 ${isLight ? 'text-gray-500' : 'text-slate-400'}`}>LAYERS</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-black text-cyber-lime">10</div>
          <div className={`text-xs font-mono mt-1 ${isLight ? 'text-gray-500' : 'text-slate-400'}`}>TECHNOLOGIES</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-black text-electric-blue">12</div>
          <div className={`text-xs font-mono mt-1 ${isLight ? 'text-gray-500' : 'text-slate-400'}`}>CONNECTIONS</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-black text-green-500">100%</div>
          <div className={`text-xs font-mono mt-1 ${isLight ? 'text-gray-500' : 'text-slate-400'}`}>TYPE SAFE</div>
        </div>
      </div>
      
      <div className={`mt-4 pt-4 border-t ${isLight ? 'border-gray-200' : 'border-white/10'}`}>
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyber-lime animate-pulse"></div>
            <span className={`font-mono text-sm ${isLight ? 'text-green-600' : 'text-cyber-lime'}`}>
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Playground() {
  const { isLight } = useTheme();

  return (
    <section id="architecture" className={`py-24 relative min-h-screen overflow-hidden ${isLight ? 'bg-gray-50' : 'bg-[#0a0812]'}`}>
      <div className={`absolute inset-0 ${isLight ? '' : 'simulation-grid'}`}></div>

      <div className="max-w-6xl mx-auto px-6 md:px-20 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className={`h-px w-12 ${isLight ? 'bg-gray-300' : 'bg-primary/50'}`}></div>
            <span className={`text-xs font-mono uppercase tracking-widest ${isLight ? 'text-gray-500' : 'text-primary/70'}`}>System Design</span>
            <div className={`h-px w-12 ${isLight ? 'bg-gray-300' : 'bg-primary/50'}`}></div>
          </div>
          <h2 className={`font-display font-black text-5xl md:text-6xl uppercase tracking-tight mb-2 ${isLight ? 'text-gray-900' : 'text-white'}`}>
            Architecture
          </h2>
          <p className={`text-sm font-mono mt-2 ${isLight ? 'text-gray-500' : 'text-slate-400'}`}>
            Full-stack technology ecosystem visualization
          </p>
        </div>

        <div className="relative" style={{ height: '450px' }}>
          {!isLight && connections.map((conn, i) => {
            const start = techNodes.find(n => n.id === conn.from);
            const end = techNodes.find(n => n.id === conn.to);
            if (!start || !end) return null;
            return (
              <AnimatedConnection 
                key={i} 
                start={start} 
                end={end} 
                color={start.color}
              />
            );
          })}

          {techNodes.map((node) => (
            <TechNodeComponent
              key={node.id}
              node={node}
            />
          ))}
        </div>

        <ConnectionStats />
      </div>
    </section>
  );
}

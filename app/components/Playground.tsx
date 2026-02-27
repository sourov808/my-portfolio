'use client';

const nodes = [
  { id: 1, label: 'API Gateway', icon: 'alt_route', status: 'healthy', x: 20, y: 30 },
  { id: 2, label: 'Auth Service', icon: 'lock', status: 'healthy', x: 50, y: 20 },
  { id: 3, label: 'Database', icon: 'database', status: 'healthy', x: 80, y: 30 },
  { id: 4, label: 'Cache', icon: 'memory', status: 'healthy', x: 35, y: 60 },
  { id: 5, label: 'Queue', icon: 'sync', status: 'healthy', x: 65, y: 60 },
  { id: 6, label: 'CDN', icon: 'public', status: 'healthy', x: 50, y: 85 },
];

export default function Playground() {
  return (
    <section id="playground" className="py-24 relative min-h-screen simulation-grid">
      <div className="absolute inset-0 bg-[#0a0812]/80"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-display font-black text-4xl text-white uppercase tracking-tight mb-2">
            System Playground
          </h2>
          <p className="text-slate-400">Interactive architecture visualization</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 glass-panel rounded-2xl p-6 min-h-[500px] relative">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.3 }}>
              {nodes.map((node, i) => 
                nodes.slice(i + 1).map((other, j) => (
                  <line
                    key={`${i}-${j}`}
                    x1={`${node.x}%`}
                    y1={`${node.y}%`}
                    x2={`${other.x}%`}
                    y2={`${other.y}%`}
                    stroke="rgba(139,92,246,0.3)"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                  />
                ))
              )}
            </svg>

            {nodes.map((node) => (
              <div
                key={node.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <div className="w-20 h-20 rounded-xl glass border border-primary/30 flex items-center justify-center node-pulse group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-white text-3xl">{node.icon}</span>
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-300">
                    {node.label}
                  </span>
                </div>
              </div>
            ))}

            <div className="absolute bottom-4 right-4 glass rounded-lg p-3 flex gap-2">
              <button className="w-8 h-8 bg-white/10 rounded flex items-center justify-center hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined text-white text-sm">add</span>
              </button>
              <button className="w-8 h-8 bg-white/10 rounded flex items-center justify-center hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined text-white text-sm">remove</span>
              </button>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="font-mono text-sm text-slate-300">API Gateway</span>
            </div>
            
            <div className="flex gap-2 mb-4">
              <span className="bg-green-500/20 text-green-500 text-xs font-bold px-2 py-1 rounded">HEALTHY</span>
              <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded">v2.4.1</span>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Latency</span>
                <span className="text-cyber-lime font-mono">12ms</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Throughput</span>
                <span className="text-white font-mono">2.4k/s</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">CPU</span>
                <span className="text-white font-mono">23%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Error Rate</span>
                <span className="text-green-500 font-mono">0.01%</span>
              </div>
            </div>

            <div className="h-20 flex gap-1 items-end mb-4">
              {[40, 60, 35, 70, 45, 55, 30, 65, 50, 75].map((h, i) => (
                <div key={i} className="flex-1 bg-primary/40 rounded-t" style={{ height: `${h}%` }}></div>
              ))}
            </div>

            <button className="w-full bg-primary hover:bg-primary/90 text-white text-sm font-bold py-3 rounded-lg transition-all hover:shadow-[0_0_20px_rgba(139,92,246,0.6)]">
              VIEW_SOURCE_CODE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

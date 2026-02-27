const socialLinks = [
  { label: 'github.sh', icon: 'code', href: '#' },
  { label: 'linkedin.sys', icon: 'link', href: '#' },
  { label: 'connect.cli', icon: 'person_add', href: '#' },
];

const systemLogs = [
  '[INFO] Next.js server started on port 3000',
  '[INFO] Database connected: postgresql://localhost:5432',
  '[INFO] Redis cache initialized',
  '[INFO] Session middleware loaded',
  '[INFO] API routes registered: 24 endpoints',
  '[INFO] Static assets optimized',
  '[INFO] Build completed in 2.3s',
  '[INFO] Memory usage: 128MB / 512MB',
  '[INFO] Uptime: 99.9%',
  '[INFO] All systems operational',
  '[WARN] Rate limiter: 80% threshold',
  '[INFO] Request/response logging enabled',
];

export default function Footer() {
  return (
    <footer className="border-t border-primary/20">
      <div className="overflow-hidden bg-black/40 py-2 border-b border-white/5">
        <div className="animate-ticker whitespace-nowrap">
          {systemLogs.map((log, index) => (
            <span key={index} className="font-mono text-[10px] text-cyber-lime mx-8">
              {log} <span className="text-primary">|</span>
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-20 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-slate-400 text-sm">
              © 2026 Sourov Das. All Rights Reserved.
            </p>
            <p className="font-mono text-xs text-slate-600 mt-1">
              System Status: Production | Architecture: Modular & Scalable
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-lg">{link.icon}</span>
                <span className="font-mono text-sm">{link.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-white/5">
          <div className="flex justify-center gap-8">
            <button className="text-sm font-bold text-primary border-b-2 border-primary pb-1">STDOUT</button>
            <button className="text-sm font-bold text-slate-600 hover:text-slate-400 pb-1 transition-colors">STDERR</button>
            <button className="text-sm font-bold text-slate-600 hover:text-slate-400 pb-1 transition-colors">PROCESS_LOGS</button>
            <button className="text-sm font-bold text-slate-600 hover:text-slate-400 pb-1 transition-colors">CONFIG.YAML</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

'use client';

const stats = [
  { label: 'YEARS_EXPERIENCE', value: '5+', suffix: 'EXP', color: 'primary' },
  { label: 'PROJECTS_COMPLETED', value: '50+', suffix: 'DONE', color: 'cyber-lime' },
  { label: 'CLIENTS_SERVED', value: '30+', suffix: 'ACTIVE', color: 'electric-blue' },
  { label: 'CODE_COMMITS', value: '1K+', suffix: 'PUSH', color: 'primary' },
];

export default function Stats() {
  return (
    <section id="stats" className="py-16 bg-[#101622]/30">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`glass hover:-translate-y-1 transition-all duration-300 hover:bg-white/10 group border-l-4 ${
                stat.color === 'primary' ? 'border-l-primary' : 
                stat.color === 'cyber-lime' ? 'border-l-cyber-lime' : 'border-l-electric-blue'
              }`}
            >
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">
                  {stat.label}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className={`text-3xl font-bold ${
                    stat.color === 'cyber-lime' ? 'text-cyber-lime' : 'text-white'
                  }`}>
                    {stat.value}
                  </span>
                  <span className="text-xs font-bold bg-white/10 px-2 py-1 rounded text-slate-300">
                    {stat.suffix}
                  </span>
                </div>
                <div className="mt-4 h-0.5 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      stat.color === 'cyber-lime' ? 'bg-cyber-lime' : 'bg-primary'
                    }`}
                    style={{ width: `${Math.random() * 40 + 60}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

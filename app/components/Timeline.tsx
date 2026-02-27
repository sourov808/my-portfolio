'use client';

const milestones = [
  {
    icon: 'school',
    title: 'Computer Science Degree',
    description: 'Foundation in algorithms, data structures, and software engineering principles.',
    year: '2020',
    binary: '01110100 01101000',
  },
  {
    icon: 'work',
    title: 'Junior Developer',
    description: 'Started professional journey building responsive web applications.',
    year: '2021',
    binary: '01101000 01110100',
  },
  {
    icon: 'trending_up',
    title: 'Full Stack Engineer',
    description: 'Led development of enterprise SaaS products and microservices.',
    year: '2023',
    binary: '01100100 01100101',
  },
  {
    icon: 'rocket_launch',
    title: 'Senior Developer',
    description: 'Architecting scalable solutions and mentoring junior developers.',
    year: '2024',
    binary: '01110110 00110101',
  },
];

export default function Timeline() {
  return (
    <section id="timeline" className="py-24 relative">
      <div className="absolute inset-0 micro-graph opacity-30"></div>
      
      <div className="max-w-4xl mx-auto px-6 md:px-20 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display font-black text-4xl text-white uppercase tracking-tight mb-2">
            Milestones <span className="text-cyber-lime font-mono text-2xl">_decrypted</span>
          </h2>
          <p className="text-slate-400">My journey through the digital realm</p>
        </div>

        <div className="space-y-6">
          {milestones.map((item, index) => (
            <div
              key={index}
              className="glass-high-contrast group hover:border-cyber-lime hover:shadow-[0_0_20px_rgba(173,255,47,0.3)] transition-all duration-300 cursor-pointer"
            >
              <div className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-cyber-lime/10 transition-colors">
                  <span className="material-symbols-outlined text-primary group-hover:text-cyber-lime transition-colors">
                    {item.icon}
                  </span>
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="font-display font-bold text-xl text-white uppercase">{item.title}</h3>
                    <span className="text-cyber-lime font-mono text-sm">{item.year}</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                  <p className="font-mono text-xs text-primary/60 mt-2 group-hover:text-cyber-lime transition-colors">
                    {item.binary}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

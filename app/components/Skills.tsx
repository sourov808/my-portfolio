'use client';

const skills = [
  {
    icon: 'web',
    title: 'Frontend Architecture',
    description: 'Building responsive, accessible interfaces using React, Next.js, Tailwind CSS, and modern state management.',
    progress: [90, 85, 80, 75],
    borderColor: 'primary',
  },
  {
    icon: 'storage',
    title: 'State & Data Systems',
    description: 'Redux Toolkit, Zustand, Server Actions, Prisma ORM, and API integrations.',
    progress: [85, 80, 75, 70],
    borderColor: 'cyber-lime',
  },
  {
    icon: 'cloud',
    title: 'Backend Integration',
    description: 'Authentication, database modeling, Supabase, REST APIs, and scalable admin systems.',
    progress: [75, 70, 65, 60],
    borderColor: 'electric-blue',
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-[#101622]/30">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <div className="text-center mb-16">
          <h2 className="font-display font-black text-4xl text-white uppercase tracking-tight mb-2">
            Core Modules
          </h2>
          <p className="text-slate-400">Technical competencies loaded</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className={`glass group hover:border-${skill.borderColor}/50 transition-all duration-300`}
              style={{ borderColor: skill.borderColor === 'primary' ? 'rgba(139,92,246,0.2)' : skill.borderColor === 'cyber-lime' ? 'rgba(173,255,47,0.2)' : 'rgba(19,91,236,0.2)' }}
            >
              <div className="p-6">
                <div className={`w-16 h-16 rounded-xl bg-${skill.borderColor}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <span className={`material-symbols-outlined text-${skill.borderColor} text-3xl`}>
                    {skill.icon}
                  </span>
                </div>
                
                <h3 className="font-display font-bold text-2xl text-white uppercase mb-3">{skill.title}</h3>
                
                <div className="bg-black/40 border border-white/5 rounded-lg p-3 mb-4">
                  <p className="font-mono text-xs text-slate-400">
                    // {skill.description}
                  </p>
                </div>

                <div className="flex gap-1 h-16 items-end">
                  {skill.progress.map((p, i) => (
                    <div
                      key={i}
                      className={`flex-1 bg-${skill.borderColor}/40 group-hover:bg-${skill.borderColor} transition-all duration-300 bar-animate rounded-t`}
                      style={{ 
                        height: `${p}%`,
                        animationDelay: `${i * 0.1}s`,
                        backgroundColor: skill.borderColor === 'primary' ? 'rgba(139,92,246,0.4)' : skill.borderColor === 'cyber-lime' ? 'rgba(173,255,47,0.4)' : 'rgba(19,91,236,0.4)'
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

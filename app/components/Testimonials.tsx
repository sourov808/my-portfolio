'use client';

const testimonials = [
  {
    name: 'Sarah Chen',
    title: 'CTO @ TechCorp',
    quote: 'Exceptional developer who transformed our legacy system into a modern, scalable platform. The attention to detail and code quality is outstanding.',
    avatar: 'SC',
  },
  {
    name: 'Marcus Johnson',
    title: 'Product Manager @ StartupX',
    quote: 'Delivered our MVP 2 weeks ahead of schedule. Creative problem-solving and excellent communication throughout the project.',
    avatar: 'MJ',
  },
  {
    name: 'Emily Rodriguez',
    title: 'Engineering Lead @ InnovateCo',
    quote: 'A true full-stack developer who can handle everything from database design to polished UI. Highly recommend for any project.',
    avatar: 'ER',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-electric-blue/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display font-black text-4xl text-white uppercase tracking-tight mb-2">
            Testimonials
          </h2>
          <p className="text-slate-400">Colleague endorsements</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass-panel hover:-translate-y-1 transition-all duration-300 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-electric-blue flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{testimonial.avatar}</span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-slate-400">{testimonial.title}</p>
                </div>
                <span className="ml-auto material-symbols-outlined text-green-500 text-sm">verified</span>
              </div>
              
              <p className="text-slate-300 text-sm italic leading-relaxed">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

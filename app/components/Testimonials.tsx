'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const testimonials = [
  {
    name: 'Alex Rivera',
    title: 'Senior Developer @ CodeLabs',
    quote: 'Cleanest code I have seen in years. Modular architecture and attention to UI precision make every project a success.',
    avatar: 'AR',
  },
  {
    name: 'Jordan Park',
    title: 'Tech Lead @ DevHouse',
    quote: 'Exceptional problem-solving skills with a strong architecture mindset. Delivers scalable solutions consistently.',
    avatar: 'JP',
  },
  {
    name: 'Sam Taylor',
    title: 'Engineering Manager @ BuildFast',
    quote: 'Brings creative ideas to the table while maintaining clean, maintainable code. A pleasure to collaborate with.',
    avatar: 'ST',
  },
];

export default function Testimonials() {
  const { isLight } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className={`py-24 relative overflow-hidden ${isLight ? 'bg-white' : ''}`}>
      <div className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl ${isLight ? 'bg-primary/10' : 'bg-primary/20'}`}></div>
      <div className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl ${isLight ? 'bg-electric-blue/10' : 'bg-electric-blue/20'}`}></div>

      <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className={`font-display font-black text-4xl uppercase tracking-tight mb-2 ${isLight ? 'text-gray-900' : 'text-white'}`}>
            Testimonials
          </h2>
          <p className={isLight ? 'text-gray-600' : 'text-slate-400'}>Colleague endorsements</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${isLight ? 'bg-gray-50 border border-gray-200 shadow-sm' : 'glass-panel'} hover:-translate-y-1 transition-all duration-300 rounded-xl p-6`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-electric-blue flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{testimonial.avatar}</span>
                </div>
                <div>
                  <h4 className={`font-bold text-sm ${isLight ? 'text-gray-900' : 'text-white'}`}>{testimonial.name}</h4>
                  <p className={`text-xs ${isLight ? 'text-gray-600' : 'text-slate-400'}`}>{testimonial.title}</p>
                </div>
                <span className="ml-auto material-symbols-outlined text-green-500 text-sm">verified</span>
              </div>

              <p className={`text-sm italic leading-relaxed ${isLight ? 'text-gray-700' : 'text-slate-300'}`}>
                "{testimonial.quote}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

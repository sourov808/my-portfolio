'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

interface AboutProfileProps {
  isLight: boolean;
}

export default function AboutProfile({ isLight }: AboutProfileProps) {
  return (
    <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
      <div className="relative mb-8 group">
        <div className="absolute -inset-1 bg-linear-to-r from-primary to-primary-highlight rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className={`relative w-40 h-40 md:w-48 md:h-48 rounded-full border-4 ${isLight ? 'border-white shadow-xl' : 'border-slate-800 shadow-2xl'} overflow-hidden`}>
          <Image 
            src="/pic.jpeg" 
            alt="Sourov Das" 
            fill 
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </div>
      
      <h1 className={`font-display font-black text-4xl md:text-6xl uppercase tracking-tighter mb-4 ${isLight ? 'text-gray-900' : 'text-white'}`}>
        Sourov Das
      </h1>
      <div className="w-20 h-1.5 bg-primary rounded-full mb-8"></div>
      
      <div className={`max-w-[700px] mx-auto text-center space-y-6 ${isLight ? 'text-gray-700' : 'text-slate-300'}`}>
        <p className="text-xl md:text-2xl leading-relaxed font-medium">
           I am Sourov Das, a developer focused on building modern and scalable digital products. I work across frontend, backend, and application development, using technologies like React and JavaScript to create fast, interactive, and user-friendly experiences. <br />I enjoy designing scalable architectures, reusable components, and clean system structures, while solving real-world problems through software. My work involves developing full-stack web applications, managing application state, integrating APIs, and building maintainable UI systems.
        </p>
        <p className="text-lg md:text-xl leading-relaxed">
          Currently, I am pursuing a Bachelor of Computer Applications (BCA) while actively building projects that strengthen my skills in modern web technologies, backend development, and software architecture.
        </p>
        
        <div className="text-left max-w-[500px] mx-auto space-y-2 py-4">
          <p className="font-bold text-primary uppercase tracking-widest text-sm mb-4">My main focus areas include:</p>
          {[
            'Full-stack web application development',
            'React and modern JavaScript ecosystems',
            'Building clean and maintainable UI systems',
            'State management using Redux Toolkit, Zustand, and Context API',
            'Backend logic and API integration',
            'Scalable architecture and clean system structures',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-primary mt-1">•</span>
              <span className="text-base md:text-lg">{item}</span>
            </div>
          ))}
        </div>

        <p className="text-lg md:text-xl leading-relaxed">
           I am passionate about continuously learning new technologies and building products that solve meaningful problems in the real world.
        </p>
      </div>
    </motion.div>
  );
}

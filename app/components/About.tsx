'use client';

import { motion, Variants } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import Image from 'next/image';
import { Suspense } from 'react';
import { socialLinks } from '../constants/socialLinks';
import GithubActivity from './GithubActivity';

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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function About() {
  const { isLight } = useTheme();

  return (
    <section id="about" className={`min-h-screen py-24 md:py-32 relative overflow-hidden ${isLight ? 'bg-white' : 'bg-bg-primary'}`}>
      {/* Background patterns */}
      <div className={`absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,${isLight ? 'rgba(79,70,229,0.05)' : 'rgba(79,70,229,0.08)'}_1px,transparent_0)] bg-position-[18px_18px]`}></div>
      
      <div className="max-w-[1000px] mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        <motion.div
           variants={containerVariants}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: "-100px" }}
           className="space-y-20"
        >
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
                   I am Sourov Das, a developer focused on building modern web applications using React and JavaScript. I enjoy creating scalable user interfaces, designing reusable components, and solving real-world problems through software.
                </p>
                <p className="text-lg md:text-xl leading-relaxed">
                   Currently, I am pursuing a Bachelor of Computer Applications (BCA) while actively developing projects that strengthen my skills in frontend development and modern web technologies.
                </p>
                
                <div className="text-left max-w-[500px] mx-auto space-y-2 py-4">
                   <p className="font-bold text-primary uppercase tracking-widest text-sm mb-4">My main focus areas include:</p>
                   {[
                      'React application development',
                      'Scalable component architecture',
                      'State management using Redux Toolkit, Zustand, and Context API',
                      'Building clean and maintainable UI systems'
                   ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                         <span className="text-primary mt-1">•</span>
                         <span className="text-base md:text-lg">{item}</span>
                      </div>
                   ))}
                </div>

                <p className="text-lg md:text-xl leading-relaxed">
                   I am passionate about continuously learning new technologies and improving the way modern web applications are built.
                </p>
                
                <p className={`text-base md:text-lg font-semibold pt-4 italic ${isLight ? 'text-primary' : 'text-primary-highlight'}`}>
                   Focused on building scalable frontend systems and modern web experiences.
                </p>
             </div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Suspense
              fallback={
                <div className="w-full py-20 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className={`text-sm ${isLight ? 'text-gray-500' : 'text-slate-400'}`}>Loading GitHub activity...</p>
                  </div>
                </div>
              }
            >
              <GithubActivity />
            </Suspense>
          </motion.div>

          {/* Find Me On Section */}
          <motion.div
            variants={itemVariants}
            className="pt-16 border-t border-dashed border-gray-200 dark:border-white/5"
          >
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="space-y-2">
                <h3 className={`text-2xl font-display font-bold uppercase tracking-tight ${isLight ? 'text-gray-900' : 'text-white'}`}>
                  Find me on
                </h3>
                <p className={`text-sm font-medium ${isLight ? 'text-gray-500' : 'text-slate-400'}`}>
                  Let&apos;s connect and build something amazing together
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                {[
                  { name: 'X (Twitter)', icon: 'x', href: socialLinks.x, color: '#000000' },
                  { name: 'GitHub', icon: 'github', href: socialLinks.github, color: '#24292e' },
                  { name: 'LinkedIn', icon: 'linkedin', href: socialLinks.linkedin, color: '#0A66C2' }
                ].map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                      isLight
                        ? 'bg-white border-gray-100 hover:border-black shadow-sm'
                        : 'bg-white/5 border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      isLight ? 'bg-gray-100 group-hover:bg-black group-hover:text-white' : 'bg-white/10 group-hover:bg-white group-hover:text-black'
                    }`}>
                      {link.icon === 'x' && (
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      )}
                      {link.icon === 'github' && (
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                      )}
                      {link.icon === 'linkedin' && (
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-sm font-bold ${isLight ? 'text-gray-700' : 'text-slate-300'}`}>
                      {link.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

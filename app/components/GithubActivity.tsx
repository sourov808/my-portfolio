'use client';

import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import { useTheme } from '../context/ThemeContext';
import { Github } from 'lucide-react';

export default function GithubActivity() {
  const { isLight } = useTheme();

  return (
    <section id="github" className={`py-24 md:py-32 relative overflow-hidden ${isLight ? 'bg-[#f8fafc]' : 'bg-[#0f172a]'}`}>
      <div className="max-w-[1000px] mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: '-100px' }}
           transition={{ duration: 0.8 }}
           className="space-y-12"
        >
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 text-primary mb-4">
              <Github size={32} />
            </div>
            <h2 className={`font-display font-black text-4xl md:text-5xl uppercase tracking-tighter ${isLight ? 'text-gray-900' : 'text-white'}`}>
               GitHub Activity
            </h2>
            <p className={`text-lg md:text-xl font-medium ${isLight ? 'text-gray-600' : 'text-slate-400'}`}>
               Daily coding activity and open-source contributions
            </p>
          </div>

          <div className={`p-8 md:p-12 rounded-3xl border ${isLight ? 'bg-white shadow-sm border-gray-100' : 'bg-slate-900/50 border-white/5 shadow-2xl'} flex flex-col items-center overflow-x-auto`}>
             <div className="min-w-[800px] lg:min-w-0 w-full flex justify-center">
                <GitHubCalendar 
                   username="sourov808" 
                   blockSize={12}
                   blockMargin={4}
                   fontSize={14}
                   colorScheme={isLight ? 'light' : 'dark'}
                   theme={{
                      light: ['#ebedf0', '#c7d2fe', '#818cf8', '#4f46e5', '#3730a3'],
                      dark: ['#161b22', '#312e81', '#3e38e1', '#4f46e5', '#818cf8'],
                   }}
                />
             </div>
             
             <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs font-mono uppercase tracking-widest text-slate-500">
                <div className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-sm bg-primary/20"></div>
                   <span>Consistent Commits</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-sm bg-primary/60"></div>
                   <span>Active Development</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-sm bg-primary"></div>
                   <span>Peak Performance</span>
                </div>
             </div>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative background element */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10`}></div>
    </section>
  );
}

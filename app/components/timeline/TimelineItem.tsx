'use client';

import { motion } from 'framer-motion';

interface TimelineItemProps {
  item: {
    icon: string;
    title: string;
    description: string;
    year: string;
  };
  index: number;
  isLight: boolean;
  isInView: boolean;
  iconMap: Record<string, React.ReactNode>;
}

export default function TimelineItem({ item, index, isLight, isInView, iconMap }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 20 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15 + index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`${isLight ? 'bg-white border border-gray-200 shadow-sm' : 'bg-bg-secondary/60 border border-white/10'} group ${isLight ? 'hover:border-primary/40' : 'hover:border-primary/30'} ${isLight ? 'hover:shadow-lg' : 'hover:shadow-[0_0_20px_rgba(79,70,229,0.2)]'} transition-all duration-300 cursor-pointer rounded-xl`}
    >
      <div className="p-6 flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isLight ? 'bg-primary/10 group-hover:bg-primary/15' : 'bg-primary/15 group-hover:bg-primary/20'}`}>
          {iconMap[item.icon] || <span className="material-symbols-outlined text-primary group-hover:text-primary-hover transition-colors">{item.icon}</span>}
        </div>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
            <h3 className={`text-lg md:text-xl font-bold transition-colors ${isLight ? 'text-gray-900' : 'text-white'} group-hover:text-primary`}>
              {item.title}
            </h3>
            <span className="text-primary-highlight font-mono text-sm">{item.year}</span>
          </div>
          <p className={`text-sm leading-relaxed ${isLight ? 'text-gray-600' : 'text-slate-400'}`}>
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

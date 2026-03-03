import { MotionValue, useTransform, motion } from 'framer-motion';
import { StaticImageData } from 'next/image';

export interface Project {
  name: string;
  stack: string[];
  description: string;
  color: string;
  longDescription?: string;
  liveLink?: string;
  githubLink?: string;
  image?: string | StaticImageData;
}

export const projectsData: Project[] = [
  {
    name: 'E-Commerce Platform',
    stack: ['Next.js', 'Prisma', 'Stripe', "Better Auth", "shadcn/ui", "Tailwind CSS"],
    description: 'High-conversion storefront and complete admin infrastructure built for scalability.',
    longDescription: 'A comprehensive e-commerce solution featuring a modern admin dashboard, seamless Stripe payments integration, and robust media management. Built for scalability and performance.',
    color: '#8b5cf6',
    liveLink: 'https://e-shopping-lemon.vercel.app/',
    githubLink: 'https://github.com/example/ecommerce',
    image: '/e-commerce-ss.png'
  }, {
    name: "LMS-Platform",
    stack: ["Next.js", "Supabase", "shadcn/ui", "Tailwind CSS"],
    description: "Robust learning management system enabling course creation and student progress tracking.",
    longDescription: "A comprehensive learning management solution featuring a modern admin dashboard, seamless video integration, and robust content management. Built for scalability and performance.",
    color: '#8b5cf6',
    liveLink: "https://fullstack-lms-omega.vercel.app/",
    githubLink: "",
    image: "/lms-ss.png"
  },
  {
    name: 'Blog Platform',
    stack: ['React', 'Redux Toolkit', 'Node.js'],
    description: 'High-performance publishing platform with dynamic routing and rich text editing.',
    longDescription: 'A fully responsive blog platform equipped with a custom rich text editor, comment system, and scalable Redux state management for optimal data flow.',
    color: '#adff2f',
    liveLink: 'https://demo-blog.example.com'
  },
  {
    name: 'Task Manager',
    stack: ['Next.js', 'Supabase', 'Tailwind'],
    description: 'Collaborative task management with real-time updates.',
    longDescription: 'A real-time collaborative task manager. Users can create workflows, assign tasks, and track project completion with live updates powered by Supabase Realtime.',
    color: '#f43f5e',
    githubLink: 'https://github.com/example/task-manager'
  },
  {
    name: 'Recipe Search',
    stack: ['React', 'Zustand', 'MongoDB'],
    description: 'Search-driven UI with reusable components and modular filtering.',
    longDescription: 'An interactive recipe discovery tool allowing complex dietary filtering, saving favorites, and calculating nutritional macros instantly using Zustand for state.',
    color: '#135bec',
    liveLink: 'https://demo-recipe.example.com'
  },
  {
    name: 'Portfolio v1',
    stack: ['React', 'Framer Motion', 'CSS'],
    description: 'Animated portfolio with scroll-driven interactions.',
    longDescription: 'The previous iteration of my personal portfolio featuring complex scroll-driven animations and a custom CSS framework for unique visual aesthetic.',
    color: '#06b6d4',
  },
  {
    name: 'API Gateway',
    stack: ['Node.js', 'Express', 'Redis'],
    description: 'High-performance API gateway with rate limiting.',
    longDescription: 'A high-throughput API gateway service capable of intelligent load balancing, Redis-based rate limiting, and centralized authentication for microservices.',
    color: '#f59e0b',
    githubLink: 'https://github.com/example/api-gateway'
  },
];

import { useMotionValue } from 'framer-motion';

export function CodeBlock({ stack, progress, isLight }: { stack: string[]; progress?: MotionValue<number>; isLight: boolean }) {
  const defaultProgress = useMotionValue(0);
  const activeProgress = progress || defaultProgress;
  
  // Always call useTransform to obey React Hook rules
  const opacityTransform = useTransform(activeProgress, [0, 0.3, 0.7, 1], [1, 1, 0.5, 0.2]);
  const yTransform = useTransform(activeProgress, [0, 0.3, 0.7, 1], [0, 0, 10, 20]);
  
  const opacity = progress ? opacityTransform : 1;
  const y = progress ? yTransform : 0;

  return (
    <motion.div 
      style={{ opacity, y }}
      className="font-mono text-xs md:text-sm leading-relaxed"
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="w-3 h-3 rounded-full bg-red-500/60" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
        <div className="w-3 h-3 rounded-full bg-green-500/60" />
      </div>
      <div className="space-y-1">
        <div>
          <span className={isLight ? "text-purple-600" : "text-purple-400"}>const</span>
          <span className={isLight ? "text-slate-900" : "text-white"}> project </span>
          <span className={isLight ? "text-pink-600" : "text-pink-400"}>=</span>
          <span className={isLight ? "text-slate-900" : "text-white"}> {'{'}</span>
        </div>
        <div className="pl-4">
          <span className={isLight ? "text-blue-600" : "text-cyan-400"}>name</span>
          <span className={isLight ? "text-slate-900" : "text-white"}>: </span>
          <span className={isLight ? "text-green-600" : "text-green-400"}>&quot;{stack.length > 0 ? stack[0].toLowerCase().replace('.', '') : 'project'}&quot;</span>
          <span className={isLight ? "text-slate-900" : "text-white"}>,</span>
        </div>
        <div className="pl-4">
          <span className={isLight ? "text-blue-600" : "text-cyan-400"}>stack</span>
          <span className={isLight ? "text-slate-900" : "text-white"}>: [</span>
          {stack.map((tech, i) => (
            <span key={i}>
              <span className={isLight ? "text-green-600" : "text-green-400"}>&quot;{tech}&quot;</span>
              {i < stack.length - 1 && <span className={isLight ? "text-slate-900" : "text-white"}>, </span>}
            </span>
          ))}
          <span className={isLight ? "text-slate-900" : "text-white"}>],</span>
        </div>
        <div>
          <span className={isLight ? "text-slate-900" : "text-white"}>{'}'}</span>
          <span className={isLight ? "text-slate-900" : "text-white"}>;</span>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectContent({ project, isHovered, isLight }: { project: Project; isHovered: boolean; isLight: boolean }) {
  return (
    <div className="relative z-10 p-6 flex flex-col h-full justify-between">
      <motion.div
        animate={{ 
          y: isHovered ? 0 : 15,
          opacity: isHovered ? 1 : 0
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <h3 className={`text-xl font-bold mb-2 transition-colors duration-500 ${isLight ? 'text-slate-900' : 'text-white'}`}>
          {project.name}
        </h3>
        <motion.p 
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className={`text-sm mb-4 transition-colors duration-500 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}
        >
          {project.description}
        </motion.p>
      </motion.div>
      <motion.div className="flex flex-wrap gap-2">
        {project.stack.map((tech, i) => (
          <motion.span
            key={tech}
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              y: isHovered ? 0 : 10 
            }}
            transition={{ 
              duration: 0.3, 
              delay: isHovered ? 0.1 + i * 0.06 : 0,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{
              background: `${project.color}20`,
              color: project.color,
              border: `1px solid ${project.color}30`,
            }}
          >
            {tech}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

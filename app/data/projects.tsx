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


import { StaticImageData } from 'next/image';

export interface Project {
  name: string;
  stack: string[];
  description: string;
  problem: string;
  solution: string;
  color: string;
  liveLink?: string;
  githubLink?: string;
  image?: string | StaticImageData;
  isFeatured?: boolean;
  longDescription?: string;
}

export const projectsData: Project[] = [
  {
    name: 'E-Commerce Platform',
    stack: ['React', 'JavaScript', 'REST API', 'Next.js', 'Prisma', 'Tailwind CSS'],
    description: 'High-conversion storefront and complete admin infrastructure built for scalability.',
    problem: 'Users need a fast way to browse and filter products online with a seamless checkout experience.',
    solution: 'Built a React-based e-commerce platform with dynamic filtering, API integration, and responsive UI components.',
    color: '#8b5cf6',
    liveLink: 'https://e-shopping-lemon.vercel.app/',
    githubLink: 'https://github.com/example/ecommerce',
    image: '/e-commerce-ss.png',
    isFeatured: true,
  },
  {
    name: 'LMS Platform',
    stack: ['Next.js', 'Supabase', 'shadcn/ui', 'Tailwind CSS'],
    description: 'Robust learning management system enabling course creation and student progress tracking.',
    problem: 'Educational content delivery often lacks engagement and easy progress tracking for students.',
    solution: 'Developed a comprehensive learning management system with video integration and real-time student profiling.',
    color: '#3b82f6',
    liveLink: 'https://fullstack-lms-omega.vercel.app/',
    githubLink: '',
    image: '/lms-ss.png',
  },
  {
    name: 'SaaS Dashboard',
    stack: ['React', 'Redux Toolkit', 'Node.js', 'PostgreSQL'],
    description: 'Data-driven analytics dashboard for monitoring SaaS business metrics.',
    problem: 'Business owners struggle to visualize complex subscription and revenue data in real-time.',
    solution: 'Created a modular dashboard with interactive charts and automated reporting systems.',
    color: '#10b981',
    githubLink: 'https://github.com/example/saas-dashboard',
  }
];

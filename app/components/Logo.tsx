'use client';

import Link from 'next/link';
import { useTheme } from '../context/ThemeContext';

interface LogoProps {
  className?: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function Logo({ className = '', href = '/', onClick }: LogoProps) {
  const { isLight } = useTheme();

  return (
    <Link 
      href={href} 
      onClick={onClick} 
      className={`inline-flex items-center group ${className}`}
    >
      <span className={`font-display font-bold text-xl md:text-2xl tracking-tight transition-colors duration-300 ${isLight ? 'text-gray-900 group-hover:text-primary' : 'text-white group-hover:text-primary/90'}`}>
        Sourov
      </span>
    </Link>
  );
}

'use client';

import Link from 'next/link';
import localFont from 'next/font/local';
import { useTheme } from '../context/ThemeContext';

const vastrexFont = localFont({ 
  src: '../fonts/vastrex-demo.regular.otf',
  variable: '--font-vastrex'
});

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function Logo({ className = '', href = '/', onClick, width, height }: LogoProps) {
  const { isLight } = useTheme();


  return (
    <Link 
      href={href} 
      onClick={onClick} 
     
      className={`inline-block ${className} ${vastrexFont.className} text-3xl md:text-4xl font-bold tracking-tight uppercase flex items-center`}
    >
      <span className={isLight ? 'text-[#0F0F14]' : 'text-[#F3F4F6]'}>sourov</span>
      
    </Link>
  );
}

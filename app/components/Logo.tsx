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

  const sizeStyle = (() => {
    if (width && height) return { width, height };
    if (height) return { height };
    return { fontSize: '32px' };
  })();

  return (
    <Link 
      href={href} 
      onClick={onClick} 
      style={sizeStyle}
      className={`inline-block ${className} ${vastrexFont.className} font-bold tracking-tight lowercase flex items-center`}
    >
      <span className={isLight ? 'text-[#0F0F14]' : 'text-[#F3F4F6]'}>sourov</span>
      <span className="text-primary">.</span>
    </Link>
  );
}

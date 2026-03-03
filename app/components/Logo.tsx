'use client';

import Link from 'next/link';
import localFont from 'next/font/local';
import { useTheme } from '../context/ThemeContext';

const fontogradFont = localFont({ 
  src: '../fonts/fontograd.ttf',
  variable: '--font-fontograd'
});

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function Logo({ className = '', href = '/', onClick }: LogoProps) {
  const { isLight } = useTheme();

  return (
    <Link href={href} onClick={onClick} className={`inline-block ${className} ${fontogradFont.className} text-3xl tracking-wide lowercase`}>
      <span className={isLight ? 'text-black' : 'text-white'}>sourov</span>
    </Link>
  );
}

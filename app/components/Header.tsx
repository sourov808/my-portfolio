'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import Logo from './Logo';
import { navigationLinks } from '../constants/navigation';

const navLinks = navigationLinks;

export default function Header() {
  const { isLight, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['hero', 'about', 'skills', 'projects'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? (isLight ? 'bg-white/90 shadow-sm' : 'bg-bg-primary/90 shadow-lg border-b border-white/5') : 'bg-transparent'} backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto px-5 md:px-20 py-3 md:py-4 flex items-center justify-between">
        <Logo 
          href="#hero"
          height={36}
          onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
        />

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
              className={`px-3 py-2 text-sm font-medium transition-all duration-200 ${
                activeSection === link.href.slice(1)
                  ? 'text-primary border-b-2 border-primary'
                  : isLight
                    ? 'text-gray-600 hover:text-gray-900'
                    : 'text-slate-400 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg border transition-all duration-200 ${
              isLight
                ? 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200'
                : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
            }`}
            aria-label="Toggle theme"
          >
            {isLight ? (
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 000-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
              </svg>
            )}
          </button>

          <button
            onClick={() => scrollToSection('#contact')}
            className={`text-sm font-bold px-4 md:px-5 py-2.5 md:py-2 rounded-lg transition-all duration-200 ${
              activeSection === 'contact'
                ? 'bg-primary text-white shadow-[0_0_20px_rgba(139,92,246,0.6)]'
                : 'bg-primary hover:bg-primary/90 text-white hover:scale-105'
            }`}
          >
            Contact
          </button>
        </div>
      </div>
    </header>
  );
}

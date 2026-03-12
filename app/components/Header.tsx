'use client';

import { useState, useEffect } from 'react';
import Logo from './Logo';
import { navigationLinks } from '../constants/navigation';

const navLinks = navigationLinks;

export default function Header() {
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 shadow-sm' : 'bg-transparent'} backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto px-5 md:px-20 py-3 md:py-4 flex items-center justify-between">
        <Logo 
          href="#hero"
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
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

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
    </header>
  );
}

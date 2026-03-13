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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 shadow-md' : 'bg-transparent'} backdrop-blur-md`}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12 py-3 md:py-4 flex items-center justify-between">
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
              className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                activeSection === link.href.slice(1)
                  ? 'text-[#4F46E5] bg-[#4F46E5]/10'
                  : 'text-gray-600 hover:text-[#4F46E5] hover:bg-gray-100/50'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          onClick={() => scrollToSection('#contact')}
          className={`text-sm font-semibold px-5 md:px-6 py-2.5 md:py-2.5 rounded-xl transition-all duration-300 ${
            activeSection === 'contact'
              ? 'bg-[#4F46E5] text-white shadow-lg shadow-[#4F46E5]/30'
              : 'bg-[#4F46E5] hover:bg-[#6366F1] text-white hover:shadow-lg hover:shadow-[#4F46E5]/25 hover:-translate-y-0.5'
          }`}
        >
          Contact
        </button>
      </div>
    </header>
  );
}

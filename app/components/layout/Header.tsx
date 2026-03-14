'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../../context/ThemeContext';
import Logo from '../layout/Logo';
import { navigationLinks } from '../../constants/navigation';

const navLinks = navigationLinks;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['hero', 'skills', 'projects', 'timeline', 'contact'];
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
    if (pathname === '/' && href.startsWith('/#')) {
      const element = document.querySelector(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    // If we are already on home and click Home link
    if (pathname === '/' && href === '/') {
       window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const { isLight } = useTheme();
  const isHomePage = pathname === '/';
  
  // Scrolled or not on Home Page, and always show background on sub-pages
  const shouldShowBg = scrolled || !isHomePage;
  
  const headerBg = shouldShowBg
    ? (isLight ? 'bg-white/80 shadow-sm' : 'bg-[#0F172A]/80 shadow-lg shadow-black/20')
    : 'bg-transparent';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg} backdrop-blur-md`}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12 py-3 md:py-4 flex items-center justify-between">
        <Logo
          href="/"
          onClick={(e) => {
            if (pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        />

        <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isHashLink = link.href.includes('#');
              const sectionId = isHashLink ? link.href.split('#')[1] : null;
              const isActive = (pathname === link.href && !isHashLink && (pathname !== '/' || activeSection === 'hero')) ||
                               (pathname === '/' && isHashLink && activeSection === sectionId);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                    isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-gray-600 hover:text-primary hover:bg-gray-100/50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors ${
            isLight ? 'hover:bg-gray-100' : 'hover:bg-white/10'
          }`}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <Link
          href="/#contact"
          onClick={() => scrollToSection('/#contact')}
          className={`hidden md:inline-flex text-sm font-semibold px-5 md:px-6 py-2.5 md:py-2.5 rounded-xl transition-all duration-300 ${
            activeSection === 'contact'
              ? 'bg-primary text-white shadow-lg shadow-primary/30'
              : 'bg-primary hover:bg-primary-hover text-white hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5'
          }`}
        >
          Contact
        </Link>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className={`md:hidden border-t ${isLight ? 'border-gray-200' : 'border-white/10'}`}>
          <div className="px-6 py-4 space-y-2">
            {navLinks.map((link) => {
              const isHashLink = link.href.includes('#');
              const sectionId = isHashLink ? link.href.split('#')[1] : null;
              const isActive = (pathname === link.href && !isHashLink && (pathname !== '/' || activeSection === 'hero')) ||
                               (pathname === '/' && isHashLink && activeSection === sectionId);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    scrollToSection(link.href);
                    setMobileMenuOpen(false);
                  }}
                  className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-primary bg-primary/10'
                      : isLight
                        ? 'text-gray-600 hover:bg-gray-100'
                        : 'text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/#contact"
              onClick={() => {
                scrollToSection('/#contact');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-center text-sm font-semibold px-4 py-3 mt-4 rounded-xl bg-primary text-white"
            >
              Contact
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

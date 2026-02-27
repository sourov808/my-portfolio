'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map(link => link.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 100) {
          setActiveSection(section);
          break;
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

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, type: "spring", stiffness: 120 }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, type: "spring", stiffness: 100 }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, type: "spring", stiffness: 120 }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 20px rgba(139,92,246,0.6)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#0a0812]/90 backdrop-blur-md border-b border-primary/20' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-4 flex items-center justify-between">
        <motion.a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
          className="flex flex-col group"
          variants={logoVariants}
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
        >
          <span className="font-display font-bold text-white text-lg">Sourov Das</span>
        </motion.a>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
              variants={linkVariants}
              initial="hidden"
              animate={mounted ? "visible" : "hidden"}
              whileHover={{
                y: -2,
                color: "rgba(255,255,255,1)",
                transition: { duration: 0.2 }
              }}
              className={`px-3 py-2 text-sm font-medium transition-all duration-200 ${
                activeSection === link.href.slice(1)
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        <motion.button
          onClick={() => scrollToSection('#contact')}
          variants={buttonVariants}
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
          whileHover="hover"
          className={`text-sm font-bold px-5 py-2 rounded-lg transition-all duration-200 ${
            activeSection === 'contact'
              ? 'bg-primary text-white shadow-[0_0_20px_rgba(139,92,246,0.6)]'
              : 'bg-primary hover:bg-primary/90 text-white'
          }`}
        >
          Hire Me
        </motion.button>
      </div>
    </header>
  );
}

'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
  isLight: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isLight, setIsLight] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Avoids synchronous setState warning causing cascading renders
    const timer = setTimeout(() => {
      setMounted(true);
      const saved = localStorage.getItem('theme');
      if (saved) {
        setIsLight(saved === 'light');
      }
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isLight;
    setIsLight(newTheme);
    localStorage.setItem('theme', newTheme ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ isLight, toggleTheme }}>
      <div className={mounted ? (isLight ? 'light-theme' : 'dark-theme') : ''}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

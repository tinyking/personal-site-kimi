import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    // 检查本地存储或系统偏好
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('light');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    
    if (theme === 'light') {
      document.documentElement.style.setProperty('--background', '0 0% 100%');
      document.documentElement.style.setProperty('--foreground', '222 47% 11%');
      document.documentElement.style.setProperty('--card', '0 0% 98%');
      document.documentElement.style.setProperty('--card-foreground', '222 47% 11%');
      document.documentElement.style.setProperty('--muted', '210 20% 96%');
      document.documentElement.style.setProperty('--muted-foreground', '215 20% 45%');
    } else {
      document.documentElement.style.setProperty('--background', '222 47% 11%');
      document.documentElement.style.setProperty('--foreground', '0 0% 100%');
      document.documentElement.style.setProperty('--card', '217 33% 17%');
      document.documentElement.style.setProperty('--card-foreground', '0 0% 100%');
      document.documentElement.style.setProperty('--muted', '217 33% 22%');
      document.documentElement.style.setProperty('--muted-foreground', '215 20% 65%');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
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

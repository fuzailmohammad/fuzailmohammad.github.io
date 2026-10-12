import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export type Theme = 'light' | 'dark' | 'darkest';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  cycleTheme: () => void;
  isBatmanMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

const STORAGE_KEY = 'portfolio-theme';

// Detect system preference (strictly 'light' or 'dark', never 'darkest')
const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark';
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (saved && (saved === 'light' || saved === 'dark' || saved === 'darkest')) {
        return saved;
      }
    } catch {
      // Ignore localStorage errors (e.g. private browsing)
    }
    // Default to system configuration: 'light' or 'dark'
    return getSystemTheme();
  });

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const cycleTheme = useCallback(() => {
    setThemeState((current) => {
      const next: Theme =
        current === 'light' ? 'dark' : current === 'dark' ? 'darkest' : 'light';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Ignore
      }
      return next;
    });
  }, []);

  // Listen for system color-scheme changes if no explicit user override exists
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e: MediaQueryListEvent) => {
      const saved = localStorage.getItem(STORAGE_KEY);
      // If user hasn't chosen 'darkest', sync with OS changes
      if (!saved || (saved !== 'darkest' && saved !== 'light' && saved !== 'dark')) {
        setThemeState(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, []);

  // Sync data-theme attribute and dark class on html element
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    // Dark class active for both dark and darkest (Batman) modes
    root.classList.toggle('dark', theme === 'dark' || theme === 'darkest');
  }, [theme]);

  const value = {
    theme,
    setTheme,
    cycleTheme,
    isBatmanMode: theme === 'darkest',
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
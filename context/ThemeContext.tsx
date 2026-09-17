'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: ThemeMode;
  effectiveTheme: 'light' | 'dark';
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'delightprep_theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>('light');
  const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Apply theme to document
  const applyTheme = useCallback((mode: ThemeMode) => {
    if (typeof window === 'undefined') return;

    let targetIsDark = false;
    if (mode === 'dark') {
      targetIsDark = true;
    } else if (mode === 'light') {
      targetIsDark = false;
    } else if (mode === 'system') {
      targetIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    const root = document.documentElement;
    if (targetIsDark) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
      setEffectiveTheme('dark');
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
      setEffectiveTheme('light');
    }
  }, []);

  // Initialize theme on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
      const initialMode: ThemeMode = stored && ['light', 'dark', 'system'].includes(stored) 
        ? stored 
        : 'light';

      setThemeState(initialMode);
      applyTheme(initialMode);
    } catch {
      applyTheme('light');
    }
    setMounted(true);
  }, [applyTheme]);

  // Listen to system preference changes when mode is 'system'
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, applyTheme]);

  const setTheme = useCallback((newTheme: ThemeMode) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch {
      // Ignore localStorage errors
    }
  }, [applyTheme]);

  const toggleTheme = useCallback(() => {
    const nextTheme: ThemeMode = effectiveTheme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  }, [effectiveTheme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, effectiveTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    // Return a safe fallback during SSR or if used outside provider
    return {
      theme: 'light',
      effectiveTheme: 'light',
      setTheme: () => {},
      toggleTheme: () => {}
    };
  }
  return context;
};

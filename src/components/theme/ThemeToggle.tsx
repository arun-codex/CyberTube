'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Laptop } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`w-9 h-9 rounded-[4px] border border-[#e4e4ed] dark:border-[#2e2e42] bg-[#f4f4f9] dark:bg-[#1c1c2c] ${className}`}
        aria-hidden="true"
      />
    );
  }

  const cycleTheme = () => {
    // If currently dark or resolved as dark, switch to light
    // If currently light or resolved as light, switch to dark
    if (theme === 'dark' || (theme === 'system' && resolvedTheme === 'dark')) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label={`Toggle theme. Currently ${isDark ? 'dark' : 'light'} theme`}
      title={`Toggle theme (current: ${theme || 'system'})`}
      className={`min-w-[36px] min-h-[36px] p-2 flex items-center justify-center rounded-[4px] border border-[#e4e4ed] dark:border-[#2e2e42] bg-[#f4f4f9] dark:bg-[#1c1c2c] hover:bg-[#e8e8f2] dark:hover:bg-[#252538] text-[#303055] dark:text-[#e8e8f2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#303055] dark:focus:ring-[#6366f1] ${className}`}
    >
      {isDark ? (
        <Moon className="w-4 h-4 text-[#a0a0b8]" />
      ) : (
        <Sun className="w-4 h-4 text-[#303055]" />
      )}
    </button>
  );
}

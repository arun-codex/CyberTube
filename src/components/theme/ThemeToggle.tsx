'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Laptop } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`w-8 h-8 rounded-[4px] border border-[#e4e4ed] dark:border-[#2e2e42] bg-[#f4f4f9] dark:bg-[#1c1c2c] ${className}`}
        aria-hidden="true"
      />
    );
  }

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  const getIcon = () => {
    if (theme === 'dark') return <Moon className="w-4 h-4 text-[#a0a0b8]" />;
    if (theme === 'light') return <Sun className="w-4 h-4 text-[#303055]" />;
    return <Laptop className="w-4 h-4 text-[#6b6b7b] dark:text-[#a0a0b8]" />;
  };

  const getLabel = () => {
    if (theme === 'dark') return 'Dark Theme (Click for System)';
    if (theme === 'light') return 'Light Theme (Click for Dark)';
    return 'System Theme (Click for Light)';
  };

  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label={`Toggle theme. Current: ${getLabel()}`}
      title={getLabel()}
      className={`min-w-[36px] min-h-[36px] p-2 flex items-center justify-center rounded-[4px] border border-[#e4e4ed] dark:border-[#2e2e42] bg-[#f4f4f9] dark:bg-[#1c1c2c] hover:bg-[#e8e8f2] dark:hover:bg-[#252538] text-[#303055] dark:text-[#e8e8f2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#303055] dark:focus:ring-[#6366f1] ${className}`}
    >
      {getIcon()}
    </button>
  );
}


/**
 * CyberTube — Theme Management Service
 *
 * Defaults to Dark theme, with accessible Light theme toggle.
 */

export type Theme = 'dark' | 'light';

const THEME_KEY = 'cybertube_theme_v1';
const THEME_EVENT = 'cybertube:theme-changed';

export function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  try {
    const saved = localStorage.getItem(THEME_KEY) as Theme | null;
    if (saved === 'dark' || saved === 'light') return saved;
  } catch (e) {}
  return 'dark'; // Dark default
}

export function setTheme(theme: Theme): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(THEME_KEY, theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
    window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: theme }));
  } catch (e) {}
}

export function toggleTheme(): Theme {
  const current = getInitialTheme();
  const next: Theme = current === 'dark' ? 'light' : 'dark';
  setTheme(next);
  return next;
}

export function onThemeChange(callback: (theme: Theme) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = (e: Event) => {
    const custom = e as CustomEvent<Theme>;
    callback(custom.detail);
  };
  window.addEventListener(THEME_EVENT, handler);
  return () => {
    window.removeEventListener(THEME_EVENT, handler);
  };
}


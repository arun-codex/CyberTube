import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--canvas)',
        surface: {
          DEFAULT: 'var(--surface)',
          subtle: 'var(--surface-subtle)',
          elevated: 'var(--surface-elevated)',
        },
        card: {
          DEFAULT: 'var(--card-bg)',
          bg: 'var(--card-bg)',
        },
        border: {
          DEFAULT: 'var(--border)',
          subtle: 'var(--border)',
          strong: 'var(--border-strong)',
        },
        text: {
          DEFAULT: 'var(--text-primary)',
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        accent: {
          cyan: 'var(--accent-cyan)',
          'cyan-hover': 'var(--accent-cyan-hover)',
          'cyan-subtle': 'var(--accent-cyan-subtle)',
          emerald: 'var(--accent-emerald)',
          amber: 'var(--accent-amber)',
          rose: 'var(--accent-rose)',
        },
      },
      fontFamily: {
        sans: ['var(--font-rubik)', 'Rubik', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-ibm-plex-mono)', 'IBM Plex Mono', 'monospace'],
        orbitron: ['var(--font-orbitron)', 'Orbitron', 'system-ui', 'sans-serif'],
        rajdhani: ['var(--font-rajdhani)', 'Rajdhani', 'system-ui', 'sans-serif'],
        'space-grotesk': ['var(--font-rubik)', 'Space Grotesk', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        button: '6px',
        card: '12px',
      },
      maxWidth: {
        content: '1280px',
      },
    },
  },
  plugins: [],
};

export default config;

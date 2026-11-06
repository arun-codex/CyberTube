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
          elevated: 'var(--card-bg)',
        },
        border: {
          DEFAULT: 'var(--border)',
          subtle: 'var(--border)',
          strong: 'var(--border-strong)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        syntax: {
          purple: '#8844ae',
          blue: '#3b61b0',
          teal: '#096e72',
          red: '#984e4d',
        },
        cyber: {
          50: '#f5f5fa',
          100: '#e8e8f2',
          200: '#d5d5e2',
          300: '#b0b0c6',
          400: '#76769a',
          500: '#403f53',
          600: '#303055',
          700: '#252542',
          800: '#1c1c32',
          900: '#141424',
          dark: '#ffffff',
          surface: '#f4f4f9',
          card: '#ffffff',
          border: '#e4e4ed',
          hover: '#e8e8f2',
        },
      },
      fontFamily: {
        sans: ['var(--font-rubik)', 'Rubik', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-ibm-plex-mono)', 'IBM Plex Mono', 'monospace'],
        orbitron: ['var(--font-orbitron)', 'Orbitron', 'system-ui', 'sans-serif'],
        rajdhani: ['var(--font-rajdhani)', 'Rajdhani', 'system-ui', 'sans-serif'],
        cyberpunk: ['var(--font-orbitron)', 'Orbitron', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        button: '4px',
        card: '8px',
      },
      maxWidth: {
        content: '1200px',
      },
    },
  },
  plugins: [],
};

export default config;

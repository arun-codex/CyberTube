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
        canvas: '#ffffff',
        surface: {
          DEFAULT: '#e8e8f2',
          subtle: '#f4f4f9',
          elevated: '#ffffff',
        },
        border: {
          DEFAULT: '#e4e4ed',
          subtle: '#ebebef',
          strong: '#d2d2dc',
        },
        text: {
          primary: '#303055',
          secondary: '#403f53',
          muted: '#767682',
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

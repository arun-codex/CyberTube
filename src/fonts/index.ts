import localFont from 'next/font/local';

/**
 * 1. Orbitron (Self-hosted WOFF2)
 * Applied to: Brand wordmark, homepage hero title and selected major headings.
 * Optimization: Self-hosted WOFF2, display swap, strictly necessary weights (600, 700).
 * Prevents CI/CD network build failures and Google Fonts API parsing flakes.
 */
export const orbitron = localFont({
  src: [
    {
      path: './orbitron-600.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './orbitron-700.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-orbitron',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: 'Arial',
});

/**
 * 2. Rajdhani (Self-hosted WOFF2)
 * Applied to: Course titles, domain headings, dashboard metrics, technical labels and compact section headings.
 * Optimization: Self-hosted WOFF2, display swap, strictly necessary weights (600, 700).
 */
export const rajdhani = localFont({
  src: [
    {
      path: './rajdhani-600.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './rajdhani-700.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-rajdhani',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: 'Arial',
});

/**
 * 3. Rubik (Self-hosted WOFF2)
 * Applied to: All body text, navigation, buttons, forms, descriptions and standard UI.
 * Optimization: Self-hosted WOFF2, primary UI font, display swap, essential weights (400, 500, 600).
 */
export const rubik = localFont({
  src: [
    {
      path: './rubik-400.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './rubik-500.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './rubik-600.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-rubik',
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
  adjustFontFallback: 'Arial',
});

/**
 * 4. IBM Plex Mono (Self-hosted WOFF2)
 * Applied to: Terminal blocks, source code, commands, network addresses, hashes, logs and technical identifiers.
 * Optimization: Self-hosted WOFF2, display swap, developer telemetry weights (400, 500).
 */
export const ibmPlexMono = localFont({
  src: [
    {
      path: './ibm-plex-mono-400.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './ibm-plex-mono-500.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
  fallback: ['monospace'],
  adjustFontFallback: false,
});

/**
 * 5. Optional / Local: Cyberpunk-Regular
 * Optimization: Canonical location src/fonts/Cyberpunk-Regular.ttf (16.6 KB).
 * Lazy loaded without blocking root LCP, display swap with Orbitron fallback.
 */
export const cyberpunk = localFont({
  src: './Cyberpunk-Regular.ttf',
  variable: '--font-cyberpunk',
  display: 'swap',
  weight: '400',
  fallback: ['var(--font-orbitron)', 'system-ui', 'sans-serif'],
});

export const fontClassNames = [
  rubik.variable,
  ibmPlexMono.variable,
  orbitron.variable,
  rajdhani.variable,
  cyberpunk.variable,
].join(' ');

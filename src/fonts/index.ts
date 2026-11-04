import { Rubik, IBM_Plex_Mono, Orbitron, Rajdhani } from 'next/font/google';
import localFont from 'next/font/local';

/**
 * 1. Orbitron (Google Font)
 * Applied to: Brand wordmark, homepage hero title and selected major headings.
 * Optimization: Explicit Latin subset, preload enabled, display swap, strictly necessary weights (600, 700).
 */
export const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
  weight: ['600', '700'],
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: true,
});

/**
 * 2. Rajdhani (Google Font)
 * Applied to: Course titles, domain headings, dashboard metrics, technical labels and compact section headings.
 * Optimization: Explicit Latin subset, preload enabled, display swap, strictly necessary weights (600, 700).
 */
export const rajdhani = Rajdhani({
  subsets: ['latin'],
  variable: '--font-rajdhani',
  display: 'swap',
  weight: ['600', '700'],
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: true,
});

/**
 * 3. Rubik (Google Font)
 * Applied to: All body text, navigation, buttons, forms, descriptions and standard UI.
 * Optimization: Explicit Latin subset, primary UI font preloaded, display swap, essential weights (400, 500, 600).
 */
export const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
  display: 'swap',
  weight: ['400', '500', '600'],
  preload: true,
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
  adjustFontFallback: true,
});

/**
 * 4. IBM Plex Mono (Google Font)
 * Applied to: Terminal blocks, source code, commands, network addresses, hashes, logs and technical identifiers.
 * Optimization: Explicit Latin subset, display swap, developer telemetry weights (400, 500).
 */
export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
  weight: ['400', '500'],
  preload: false, // Lazy loaded on pages requiring code/terminal blocks to save initial LCP bandwidth
  fallback: ['monospace'],
  adjustFontFallback: true,
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
  preload: false,
  fallback: ['var(--font-orbitron)', 'system-ui', 'sans-serif'],
});

export const fontClassNames = [
  rubik.variable,
  ibmPlexMono.variable,
  orbitron.variable,
  rajdhani.variable,
  cyberpunk.variable,
].join(' ');

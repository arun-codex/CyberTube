import type { Metadata } from 'next';
import './globals.css';
import { fontClassNames } from '../src/fonts';
import { Header } from '../src/components/Header';
import { Footer } from '../src/components/Footer';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';
import { AuthProvider } from '../src/lib/auth';
import { ProgressProvider } from '../src/lib/progress';

const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL('https://cybertube-mu.vercel.app'),
  title: 'CyberTube — Cybersecurity Learning Platform',
  description:
    'Study cybersecurity with video courses, guided learning paths, reference materials and practice labs.',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  ...(googleSiteVerification
    ? {
        verification: {
          google: googleSiteVerification,
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontClassNames} suppressHydrationWarning>
      <body className="bg-canvas text-text-secondary min-h-screen flex flex-col font-sans selection:bg-surface selection:text-text-primary transition-colors duration-150">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <AuthProvider>
            <ProgressProvider>
              <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-white focus:px-4 focus:py-3 focus:text-slate-900">Skip to content</a>
              <Header />
              <main id="main-content" tabIndex={-1} className="flex-1 w-full flex flex-col">{children}</main>
              <Footer />
            </ProgressProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

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
    'A premium, structured developer and researcher learning platform for cybersecurity. Structured video courses, hands-on packet analysis, hardware security, and protocol breakdowns.',
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
              <Header />
              <main className="flex-1 w-full flex flex-col">{children}</main>
              <Footer />
            </ProgressProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import './globals.css';
import { fontClassNames } from '../src/fonts';
import { Header } from '../src/components/Header';
import { Footer } from '../src/components/Footer';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';

export const metadata: Metadata = {
  title: 'CyberTube — Cybersecurity Learning Platform',
  description:
    'A premium, structured developer and researcher learning platform for cybersecurity. Structured video courses, hands-on packet analysis, hardware security, and protocol breakdowns.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontClassNames} suppressHydrationWarning>
      <body className="bg-canvas text-text-secondary min-h-screen flex flex-col font-sans selection:bg-[#e8e8f2] dark:selection:bg-[#1e1e30] selection:text-[#303055] dark:selection:text-[#f0f0f8] transition-colors duration-150">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <Header />
          <main className="flex-1 w-full flex flex-col">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

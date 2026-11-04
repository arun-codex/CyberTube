import type { Metadata } from 'next';
import './globals.css';
import { Header } from '../src/components/Header';
import { Footer } from '../src/components/Footer';

export const metadata: Metadata = {
  title: 'CyberTube — Discover. Learn. Practice. Secure.',
  description:
    'A centralized discovery and learning ecosystem for cybersecurity students, researchers, and practitioners. Explore videos, labs, CTFs, papers, tools, and courses.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const savedTheme = localStorage.getItem('cybertube_theme_v1');
                if (savedTheme === 'light') {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                } else {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="bg-slate-50 dark:bg-[#0b0f17] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col antialiased selection:bg-cyan-500/20 selection:text-cyan-400">
        <Header />
        <main className="flex-1 w-full flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}


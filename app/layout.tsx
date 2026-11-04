import type { Metadata } from 'next';
import { Rubik, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '../src/components/Header';
import { Footer } from '../src/components/Footer';

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
});

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
    <html lang="en" className={`${rubik.variable} ${ibmPlexMono.variable}`}>
      <body className="bg-white text-[#403f53] min-h-screen flex flex-col font-sans selection:bg-[#e8e8f2] selection:text-[#303055]">
        <Header />
        <main className="flex-1 w-full flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

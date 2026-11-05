import React from 'react';
import type { Metadata } from 'next';
import { getAllAuthoritativeGlossary } from '@/lib/authoritativeCatalog';
import GlossaryClientView from '@/components/glossary/GlossaryClientView';

export const metadata: Metadata = {
  title: 'Cybersecurity Glossary & Core Terminology | CyberTube',
  description:
    'Clear, plain-English definitions and analogies for 40+ fundamental cybersecurity concepts including the CIA triad, XSS, SSRF, SIEM, and Public Key Infrastructure.',
};

export default function GlossaryPage() {
  const terms = getAllAuthoritativeGlossary();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0F17] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono text-xs uppercase tracking-widest mb-2">
            <span>[ VOCABULARY & ANALOGIES ]</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Cybersecurity Glossary
          </h1>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400 max-w-3xl">
            Jargon-free definitions of key concepts. Each entry includes both formal definitions and real-world analogies to make mental models stick.
          </p>
        </div>

        <GlossaryClientView terms={terms} />
      </div>
    </div>
  );
}


import React from 'react';
import type { Metadata } from 'next';
import { getAuthoritativeCheatSheets } from '@/lib/authoritativeCatalog';
import CheatSheetClientView from '@/components/cheatsheets/CheatSheetClientView';

export const metadata: Metadata = {
  title: 'Cybersecurity Cheat Sheets: Linux Commands & Common Ports | CyberTube',
  description:
    'Instant reference sheets for essential Linux command-line security triage, text processing, SUID hunting, and TCP/UDP port security implications.',
};

export default function CheatSheetsPage() {
  const data = getAuthoritativeCheatSheets();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0F17] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono text-xs uppercase tracking-widest mb-2">
            <span>[ REFERENCE MATERIAL ]</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Security Cheat Sheets
          </h1>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400 max-w-3xl">
            Quick-reference lookups for high-frequency commands, flags, and network protocol port numbers with their associated security implications.
          </p>
        </div>

        <CheatSheetClientView data={data} />
      </div>
    </div>
  );
}


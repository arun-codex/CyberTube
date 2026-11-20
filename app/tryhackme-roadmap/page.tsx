import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { TryHackMeRoadmapExplorer } from '@/components/tryhackme/TryHackMeRoadmapExplorer';

export const metadata: Metadata = {
  title: 'TryHackMe Roadmap - 502 Rooms | CyberTube',
  description: 'Explore 502 TryHackMe room entries in 28 source sections with suggested beginner-to-expert levels, search, and browser-saved progress.',
};

export default function TryHackMeRoadmapPage() {
  return (
    <div className="container-max py-8 sm:py-10 space-y-6">
      <Link href="/labs" className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--accent-cyan)]">
        <ArrowLeft className="w-4 h-4" />
        Back to Practice Labs
      </Link>
      <Suspense fallback={<div className="rounded-xl border border-[var(--border)] p-8 text-sm text-[var(--text-secondary)]">Loading TryHackMe roadmap...</div>}>
        <TryHackMeRoadmapExplorer />
      </Suspense>
    </div>
  );
}

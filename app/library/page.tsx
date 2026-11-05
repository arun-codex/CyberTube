import React from 'react';
import { Metadata } from 'next';
import { getAllAuthoritativeResources } from '@/lib/authoritativeCatalog';
import { LibraryClientView } from '@/components/library/LibraryClientView';
import { BookOpen, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Course & Lab Library | CyberTube',
  description: 'Authoritative index of 21 verified free cybersecurity courses, video walkthroughs, and legal lab environments.',
};

export default function LibraryPage() {
  const resources = getAllAuthoritativeResources();

  return (
    <div className="container-max py-10 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#0E7490] dark:text-[#22D3EE]">
          <BookOpen className="w-4 h-4" />
          <span>Curated Resource Index</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
          Cybersecurity Course & Lab Library
        </h1>
        <p className="text-sm sm:text-base text-[#475569] dark:text-[#9BA8B7] max-w-2xl leading-relaxed">
          Explore all {resources.length} hand-picked free YouTube courses, certified training playlists, and hands-on practice labs. Filter by track, difficulty level, or pricing model.
        </p>
      </div>

      {/* Freshness Disclaimer Notice */}
      <div className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-[#F8FAFC] dark:bg-[#121A26] p-4 flex items-start gap-3 text-xs text-[#475569] dark:text-[#9BA8B7]">
        <ShieldCheck className="w-5 h-5 text-[#34D399] shrink-0 mt-0.5" />
        <div>
          <strong className="text-[#0F172A] dark:text-[#E6EDF3]">Content Integrity Guarantee:</strong> All YouTube courses and lab platforms are attributed directly to their original creators. Videos are embedded with privacy protection (no tracking cookies before user interaction) and remain hosted on their original platforms.
        </div>
      </div>

      {/* Client-side search, sort & filters */}
      <LibraryClientView initialResources={resources} />
    </div>
  );
}

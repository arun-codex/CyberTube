import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { SearchResultsPage } from './SearchResultsPage';

export const metadata: Metadata = {
  title: 'Search CyberTube | Pages, Courses, Labs & Resources',
  description: 'Search CyberTube pages, TryHackMe rooms, courses, lessons, security skills, certifications, and published study materials.',
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container-max py-16 text-sm text-[var(--text-secondary)]">Loading site search...</div>}>
      <SearchResultsPage />
    </Suspense>
  );
}

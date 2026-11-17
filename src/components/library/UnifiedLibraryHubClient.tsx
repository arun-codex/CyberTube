'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { BookOpen, Sparkles, Shield, Layers, AlertCircle, ArrowRight } from 'lucide-react';
import { StudyDashboardClient, StudyDoc, CategoryItem, UserProg, UserBm } from './StudyDashboardClient';
import { LibraryClientView } from './LibraryClientView';
import { Resource } from '@/types/catalog';
import { BugBountyLogo } from '@/components/ui/BugBountyLogo';

interface UnifiedLibraryHubClientProps {
  documents: StudyDoc[];
  categories: CategoryItem[];
  progressList: UserProg[];
  bookmarks: UserBm[];
  courseResources: Resource[];
  isUserLoggedIn: boolean;
}

export function UnifiedLibraryHubClient({
  documents,
  categories,
  progressList,
  bookmarks,
  courseResources,
  isUserLoggedIn,
}: UnifiedLibraryHubClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<'study' | 'courses'>(
    tabParam === 'courses' ? 'courses' : 'study'
  );

  useEffect(() => {
    if (tabParam === 'courses' || tabParam === 'study') {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (newTab: 'study' | 'courses') => {
    setActiveTab(newTab);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', newTab);
    window.history.replaceState({}, '', url.toString());
  };

  return (
    <div className="container-max py-8 space-y-8">
      {/* Central Hub Eyebrow & Title */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--accent-cyan)] font-semibold">
          <BookOpen className="w-4 h-4" />
          <span>Central Library Hub</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold font-space-grotesk tracking-tight text-[var(--text-primary)]">
              Cybersecurity Knowledge & Study Library
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mt-1 leading-relaxed">
              Explore 34 authenticated Bug Bounty study guides and methodologies with cross-device cloud sync, full-text PDF search, and legal lab environments.
            </p>
          </div>
        </div>
      </div>

      {/* Unified Tab Switcher */}
      <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border)] max-w-xl">
        <button
          type="button"
          onClick={() => handleTabChange('study')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-medium transition-all ${
            activeTab === 'study'
              ? 'bg-[var(--card-bg)] text-[var(--text-primary)] font-bold shadow-xs border border-[var(--border)]'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          <BugBountyLogo size={18} />
          <span>Bug Bounty Study Library</span>
          <span className="hidden sm:inline-flex px-1.5 py-0.2 rounded text-[10px] font-mono bg-[var(--accent-cyan)]/15 text-[var(--accent-cyan)] font-semibold">
            {documents.length || 34}
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('courses')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-medium transition-all ${
            activeTab === 'courses'
              ? 'bg-[var(--card-bg)] text-[var(--text-primary)] font-bold shadow-xs border border-[var(--border)]'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          <Layers className="w-4 h-4 text-amber-500" />
          <span>Course & Lab Library</span>
          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono uppercase bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/30">
            Coming Soon
          </span>
        </button>
      </div>

      {/* Tab 1: Bug Bounty Study Library */}
      {activeTab === 'study' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <StudyDashboardClient
            categories={categories}
            documents={documents}
            progressList={progressList}
            bookmarks={bookmarks}
          />
        </div>
      )}

      {/* Tab 2: Course & Lab Library (Coming Soon) */}
      {activeTab === 'courses' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Coming Soon Notice */}
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-5 flex items-start gap-3.5 text-xs text-amber-800 dark:text-amber-300">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
            <div className="space-y-1">
              <strong className="text-sm font-bold text-amber-900 dark:text-amber-200">
                Cybersecurity Course & Lab Library — Coming Soon
              </strong>
              <p className="leading-relaxed">
                The curated course and practice lab catalog is currently undergoing verification and syllabus alignment. You can preview the catalog below or explore our active 34-document Bug Bounty Study Library.
              </p>
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => handleTabChange('study')}
                  className="inline-flex items-center gap-1 font-semibold text-[var(--accent-cyan)] hover:underline"
                >
                  <span>Switch to Bug Bounty Study Library (34 Active Guides)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Freshness Disclaimer Notice */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] p-4 flex items-start gap-3 text-xs text-[var(--text-secondary)]">
            <Shield className="w-5 h-5 text-[var(--accent-emerald)] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[var(--text-primary)]">Content Integrity Guarantee:</strong> All YouTube courses and lab platforms are attributed directly to their original creators. Videos are embedded with privacy protection and remain hosted on their original platforms.
            </div>
          </div>

          <LibraryClientView initialResources={courseResources} />
        </div>
      )}
    </div>
  );
}

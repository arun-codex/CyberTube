'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Sparkles,
  Shield,
  Layers,
  AlertCircle,
  ArrowRight,
  Compass,
  Bookmark,
  Cloud,
  CheckCircle2,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { StudyDashboardClient, StudyDoc, CategoryItem, UserProg, UserBm } from './StudyDashboardClient';
import { LibraryClientView } from './LibraryClientView';
import { Resource, LearningPathDefinition } from '@/types/catalog';
import { BugBountyLogo } from '@/components/ui/BugBountyLogo';

export type LibraryTab = 'study' | 'courses' | 'paths' | 'saved';

interface UnifiedLibraryHubClientProps {
  documents: StudyDoc[];
  categories: CategoryItem[];
  progressList: UserProg[];
  bookmarks: UserBm[];
  courseResources: Resource[];
  learningPaths?: LearningPathDefinition[];
  isUserLoggedIn: boolean;
}

export function UnifiedLibraryHubClient({
  documents,
  categories,
  progressList,
  bookmarks,
  courseResources,
  learningPaths = [],
  isUserLoggedIn,
}: UnifiedLibraryHubClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabParam = searchParams.get('tab') as LibraryTab | null;
  const initialTab: LibraryTab =
    tabParam === 'courses' || tabParam === 'paths' || tabParam === 'saved'
      ? tabParam
      : 'study';

  const [activeTab, setActiveTab] = useState<LibraryTab>(initialTab);

  useEffect(() => {
    if (tabParam === 'courses' || tabParam === 'paths' || tabParam === 'saved' || tabParam === 'study') {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (newTab: LibraryTab) => {
    setActiveTab(newTab);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', newTab);
    router.push(`${url.pathname}${url.search}`, { scroll: false });
  };

  const inProgressList = progressList.filter((p) => !p.is_completed && p.completion_percent > 0);
  const completedList = progressList.filter((p) => p.is_completed);

  return (
    <div className="container-max py-8 space-y-8">
      {/* Central Hub Eyebrow & Title */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold font-space-grotesk tracking-tight text-[var(--text-primary)]">
              Study library
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mt-1 leading-relaxed">
              Browse reference material by section. Sign in to read study guides and save your place across devices.
            </p>
          </div>
        </div>
      </div>

      {/* Unified 4-Tab Switcher */}
      <div
        role="group"
        aria-label="Library sections"
        className="flex flex-wrap items-stretch gap-1.5 p-1.5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border)] max-w-3xl"
      >
        <button
          type="button"
          onClick={() => handleTabChange('study')}
          aria-pressed={activeTab === 'study'}
          className={`flex-1 min-w-[150px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-medium transition-all ${
            activeTab === 'study'
              ? 'bg-[var(--card-bg)] text-[var(--text-primary)] font-bold shadow-xs border border-[var(--border)]'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          <BugBountyLogo size={16} showText={false} />
          <span>Bug Bounty Library</span>
          <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-[var(--accent-cyan)]/15 text-[var(--accent-cyan)] font-semibold">
            {isUserLoggedIn ? documents.length : 'Sign in'}
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('courses')}
          aria-pressed={activeTab === 'courses'}
          className={`flex-1 min-w-[150px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-medium transition-all ${
            activeTab === 'courses'
              ? 'bg-[var(--card-bg)] text-[var(--text-primary)] font-bold shadow-xs border border-[var(--border)]'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-amber-500" />
          <span>Course & Lab Library</span>
          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono uppercase bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/30">
            Coming Soon
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('paths')}
          aria-pressed={activeTab === 'paths'}
          className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-medium transition-all ${
            activeTab === 'paths'
              ? 'bg-[var(--card-bg)] text-[var(--text-primary)] font-bold shadow-xs border border-[var(--border)]'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          <Compass className="w-3.5 h-3.5 text-indigo-400" />
          <span>Learning Paths</span>
          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono uppercase bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-500/30">
            Coming Soon
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('saved')}
          aria-pressed={activeTab === 'saved'}
          className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-medium transition-all ${
            activeTab === 'saved'
              ? 'bg-[var(--card-bg)] text-[var(--text-primary)] font-bold shadow-xs border border-[var(--border)]'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />
          <span>My Learning / Saved</span>
          {bookmarks.length > 0 && (
            <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-[var(--accent-cyan)] text-[#090D14] font-bold">
              {bookmarks.length}
            </span>
          )}
        </button>
      </div>

      {/* Tab 1: A guest must not mistake RLS-hidden documents for missing content. */}
      {activeTab === 'study' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {isUserLoggedIn ? (
            <StudyDashboardClient
              categories={categories}
              documents={documents}
              progressList={progressList}
              bookmarks={bookmarks}
            />
          ) : (
            <section
              aria-labelledby="study-library-signin-title"
              className="mx-auto max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6 text-center sm:p-10"
            >
              <Shield className="mx-auto mb-4 h-10 w-10 text-[var(--accent-cyan)]" aria-hidden="true" />
              <h2 id="study-library-signin-title" className="text-xl font-bold text-[var(--text-primary)]">
                Sign in to access study materials
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[var(--text-secondary)]">
                Bug Bounty study documents are available to signed-in learners.
                Sign in to browse the guides, search PDF content, and sync reading progress.
              </p>
              <Link
                href="/login?redirect=%2Flibrary"
                className="mt-6 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[var(--accent-cyan)] px-5 py-2.5 text-sm font-semibold text-[#07121B] hover:opacity-90"
              >
                Sign in to open the library <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </section>
          )}
        </div>
      )}

      {/* Tab 2: Course & Lab Library (Coming Soon) */}
      {activeTab === 'courses' && (
        <div className="space-y-6 animate-in fade-in duration-200">
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

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] p-4 flex items-start gap-3 text-xs text-[var(--text-secondary)]">
            <Shield className="w-5 h-5 text-[var(--accent-emerald)] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[var(--text-primary)]">Content Integrity Guarantee:</strong> All YouTube courses and lab platforms are attributed directly to their original creators. Videos are embedded with privacy protection and remain hosted on their original platforms.
            </div>
          </div>

          <LibraryClientView initialResources={courseResources} />
        </div>
      )}

      {/* Tab 3: Learning Paths (Coming Soon) */}
      {activeTab === 'paths' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-5 flex items-start gap-3.5 text-xs text-indigo-900 dark:text-indigo-200">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-indigo-600 dark:text-indigo-400" />
            <div className="space-y-1">
              <strong className="text-sm font-bold text-indigo-950 dark:text-indigo-100">
                Learning Paths A–E — Coming Soon
              </strong>
              <p className="leading-relaxed">
                Structured step-by-step tracks connecting verified free YouTube courses with hands-on practice labs. We are finalizing interactive progress tracking for these 5 comprehensive roadmaps.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {learningPaths.map((p) => (
              <div
                key={p.id}
                className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-5 flex flex-col justify-between hover:border-[var(--accent-cyan)] transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 text-[11px] font-mono uppercase tracking-wider rounded bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/30 font-semibold">
                      {p.level}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 font-bold">
                      Coming Soon
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[var(--text-primary)]">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] line-clamp-3 leading-relaxed">
                    {p.description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[var(--border)] flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
                  <span>{p.duration}</span>
                  <Link
                    href={`/learning-paths/${p.id}`}
                    className="inline-flex items-center gap-1 font-semibold text-[var(--accent-cyan)] hover:underline"
                  >
                    <span>Preview Roadmap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: My Learning / Saved (Cloud-Synced Personal State) */}
      {activeTab === 'saved' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="rounded-xl border border-[var(--accent-cyan)]/30 bg-[var(--accent-cyan-subtle)] p-5 flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-start gap-3">
              <Cloud className="w-5 h-5 text-[var(--accent-cyan)] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  Cloud Synchronized Learning
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  {isUserLoggedIn
                    ? 'All your bookmarks, reading progress, and saved courses are automatically backed up to Supabase cloud.'
                    : 'Sign in to sync your bookmarks, reading progress, and completed modules across multiple devices and browsers.'}
                </p>
              </div>
            </div>
            <Link
              href="/saved"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--card-bg)] border border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--accent-cyan)] transition-colors shadow-xs"
            >
              <span>Manage All Saved Items</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Bookmarked Pages */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-amber-500" />
              <span>Bookmarked PDF Pages ({bookmarks.length})</span>
            </h3>
            {bookmarks.length === 0 ? (
              <div className="p-8 rounded-xl border border-dashed border-[var(--border)] text-center text-xs text-[var(--text-muted)] bg-[var(--card-bg)]">
                No bookmarked PDF pages yet. Click the bookmark icon inside any PDF guide to save pages here.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {bookmarks.map((bm, idx) => (
                  <Link
                    key={idx}
                    href={`/study-materials/bug-bounty/${bm.document_id}?page=${bm.page_number}`}
                    className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] hover:border-amber-500/50 transition-colors flex items-center justify-between gap-3 group"
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-[var(--text-primary)] truncate group-hover:text-[var(--accent-cyan)]">
                        {bm.study_documents?.title || 'Study Guide'}
                      </div>
                      <div className="text-[11px] font-mono text-amber-500 font-bold mt-0.5">
                        Page {bm.page_number}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent-cyan)] shrink-0 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Reading In Progress */}
          <div className="space-y-4 pt-4 border-t border-[var(--border)]">
            <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[var(--accent-cyan)]" />
              <span>Continue Reading ({inProgressList.length})</span>
            </h3>
            {inProgressList.length === 0 ? (
              <div className="p-8 rounded-xl border border-dashed border-[var(--border)] text-center text-xs text-[var(--text-muted)] bg-[var(--card-bg)]">
                No guides in progress. Choose a guide from the Bug Bounty Library tab to begin reading.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {inProgressList.map((prog) => {
                  const doc = documents.find((d) => d.id === prog.document_id);
                  if (!doc) return null;
                  return (
                    <div
                      key={prog.document_id}
                      className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] flex flex-col justify-between space-y-3"
                    >
                      <div>
                        <div className="text-xs font-bold text-[var(--text-primary)] line-clamp-1">
                          {doc.title}
                        </div>
                        <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] mt-2">
                          <span>Page {prog.last_page} of {doc.page_count}</span>
                          <span className="text-[var(--accent-cyan)] font-bold">{prog.completion_percent}%</span>
                        </div>
                        <div className="w-full bg-[var(--border)] h-1 rounded-full overflow-hidden mt-1.5">
                          <div
                            className="bg-[var(--accent-cyan)] h-full"
                            style={{ width: `${prog.completion_percent}%` }}
                          />
                        </div>
                      </div>
                      <Link
                        href={`/study-materials/bug-bounty/${doc.id}?page=${prog.last_page}`}
                        className="inline-flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-[var(--accent-cyan)] hover:bg-[var(--accent-cyan-hover)] text-[#090D14] text-xs font-bold transition-colors"
                      >
                        <span>Resume Page {prog.last_page}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

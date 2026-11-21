/* eslint-disable @next/next/no-img-element */
'use client';

import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Clock3,
  Compass,
  Cpu,
  FileText,
  Filter,
  FlaskConical,
  History,
  LayoutGrid,
  Loader2,
  Newspaper,
  Play,
  RotateCcw,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Video,
  Wrench,
  X,
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { getAllResources, filterResources, getFacetCounts } from '@/lib/catalog';
import { FilterSidebar } from '@/components/FilterSidebar';
import { ResourceCard } from '@/components/ResourceCard';
import InterestSelector from '@/components/discovery/InterestSelector';
import { DiscoverVideoPlayer, type PlayingVideo, type VideoWatchProgress } from '@/components/discovery/DiscoverVideoPlayer';
import { FeedCardDispatcher } from '@/components/discovery/FeedCardDispatcher';
import { DiscoverFiltersPanel, type DiscoverFilterState } from '@/components/discovery/DiscoverFiltersPanel';
import type { ResourceFilterOptions } from '@/types/resource';
import type { ClassifiedItem } from '@/lib/discovery/live-feed';
import { TOPIC_NAV_ITEMS, type Subject } from '@/lib/discovery/content-taxonomy';

type FeedData = {
  items: ClassifiedItem[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
  personalized: boolean;
  liveSources: number;
  liveItemCount: number;
  progress: Record<string, { percent: number; updatedAt: string }>;
};

type HistoryData = { items: VideoWatchProgress[]; userId: string; count: number };

export type Tab =
  | 'for-you'
  | 'all'
  | 'videos'
  | 'articles'
  | 'news'
  | 'security-alerts'
  | 'research'
  | 'tools'
  | 'career'
  | 'growth'
  | 'tech-updates'
  | 'history'
  | 'catalog';

const primaryTabs: Array<{ id: Tab; title: string; icon: React.ComponentType<{ className?: string }> }> = [
  { id: 'for-you', title: 'For You', icon: Sparkles },
  { id: 'all', title: 'Latest / All Content', icon: LayoutGrid },
  { id: 'videos', title: 'Videos', icon: Video },
  { id: 'articles', title: 'Articles', icon: FileText },
  { id: 'news', title: 'Cyber News', icon: ShieldCheck },
  { id: 'security-alerts', title: 'Security Alerts', icon: ShieldAlert },
  { id: 'research', title: 'Research', icon: FlaskConical },
  { id: 'tools', title: 'Tools & Resources', icon: Wrench },
  { id: 'tech-updates', title: 'Technology Updates', icon: TrendingUp },
  { id: 'career', title: 'Careers & Internships', icon: BriefcaseBusiness },
  { id: 'history', title: 'Watch History', icon: History },
  { id: 'catalog', title: 'Resource Directory', icon: BookOpen },
];

const emptyCatalogFilters: ResourceFilterOptions = {
  query: '',
  types: [],
  domains: [],
  difficulty: [],
  pricing: [],
  durationRanges: [],
  sortBy: 'relevance',
};

function validTab(value: string | null): Tab {
  if (!value) return 'for-you';
  const v = value.toLowerCase().trim();
  if (v === 'popular') return 'for-you';
  if (v === 'latest') return 'all';
  if (v === 'open-source') return 'all';
  if (v === 'cyber-news') return 'news';
  if (v === 'tech-updates') return 'tech-updates';
  if (v === 'growth') return 'growth';
  const found = primaryTabs.find((t) => t.id === v);
  return found ? found.id : 'for-you';
}

function DiscoverContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { userId, isAuthLoading } = useAuth();

  const activeTab = validTab(searchParams.get('tab'));
  const selectedSubject = (searchParams.get('subject') || searchParams.get('category') || '') as Subject | '';
  const initialQuery = searchParams.get('q') || '';
  const initialType = searchParams.get('type') || '';
  const initialKind = searchParams.get('kind') || '';
  const initialSort = searchParams.get('sort') || '';

  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [items, setItems] = useState<ClassifiedItem[]>([]);
  const [feedData, setFeedData] = useState<FeedData | null>(null);
  const [history, setHistory] = useState<VideoWatchProgress[]>([]);
  const [historyError, setHistoryError] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [preferencesVersion, setPreferencesVersion] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<PlayingVideo | null>(null);
  const [mobileCatalogFilters, setMobileCatalogFilters] = useState(false);
  const [catalogFilters, setCatalogFilters] = useState<ResourceFilterOptions>(emptyCatalogFilters);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const [advancedFilters, setAdvancedFilters] = useState<DiscoverFilterState>({
    type: initialType,
    kind: initialKind,
    subject: selectedSubject,
    sort: initialSort,
  });

  const playRef = useRef<HTMLDivElement | null>(null);
  const onInterestsChange = useCallback(() => setPreferencesVersion((version) => version + 1), []);
  const catalog = useMemo(() => getAllResources(), []);
  const catalogMatches = useMemo(() => filterResources(catalog, catalogFilters), [catalog, catalogFilters]);
  const facets = useMemo(() => getFacetCounts(catalog), [catalog]);

  useEffect(() => {
    setQuery(initialQuery);
    setDebouncedQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(query.trim()), 350);
    return () => window.clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    setPage(1);
    setItems([]);
  }, [
    activeTab,
    selectedSubject,
    debouncedQuery,
    preferencesVersion,
    userId,
    advancedFilters.type,
    advancedFilters.kind,
    advancedFilters.sort,
  ]);

  const refreshHistory = useCallback(
    async (signal?: AbortSignal) => {
      if (!userId) {
        setHistory([]);
        setHistoryError('');
        return;
      }
      try {
        const response = await fetch('/api/discover/history', {
          signal,
          cache: 'no-store',
          credentials: 'same-origin',
        });
        if (!response.ok) throw Error('Watch history could not be loaded');
        const data: HistoryData = await response.json();
        if (signal?.aborted) return;
        if (data.userId === userId) {
          setHistory(data.items || []);
          setHistoryError('');
        }
      } catch {
        if (!signal?.aborted) setHistoryError('Watch history is temporarily unavailable.');
      }
    },
    [userId]
  );

  useEffect(() => {
    if (isAuthLoading) return;
    const controller = new AbortController();
    void refreshHistory(controller.signal);
    return () => controller.abort();
  }, [refreshHistory, isAuthLoading]);

  // Main Feed Data Fetching
  useEffect(() => {
    if (activeTab === 'catalog' || activeTab === 'history') return;

    const controller = new AbortController();
    const currentPage = page;
    if (currentPage === 1) {
      setLoading(true);
      setError('');
    } else {
      setLoadMore(true);
    }

    const params = new URLSearchParams({
      tab: activeTab,
      page: String(page),
      pageSize: '24',
    });

    if (selectedSubject) {
      params.set('subject', selectedSubject);
      params.set('category', selectedSubject);
    }
    if (advancedFilters.type) params.set('type', advancedFilters.type);
    if (advancedFilters.kind) params.set('kind', advancedFilters.kind);
    if (advancedFilters.sort) params.set('sort', advancedFilters.sort);
    if (debouncedQuery.length >= 2) params.set('q', debouncedQuery);

    fetch('/api/discover/feed?' + params.toString(), {
      signal: controller.signal,
      credentials: 'same-origin',
      cache: 'no-store',
    })
      .then((res) => {
        if (!res.ok) throw Error('Discover is currently unavailable.');
        return res.json() as Promise<FeedData>;
      })
      .then((result) => {
        if (controller.signal.aborted) return;
        setItems((previous) =>
          currentPage === 1
            ? result.items
            : [...previous, ...result.items.filter((item) => !previous.some((old) => old.id === item.id))]
        );
        setFeedData(result);
        setError('');
      })
      .catch((e) => {
        if (!controller.signal.aborted) {
          setError(e instanceof Error ? e.message : 'Could not load feed');
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
          setLoadMore(false);
        }
      });

    return () => controller.abort();
  }, [
    activeTab,
    selectedSubject,
    debouncedQuery,
    preferencesVersion,
    userId,
    page,
    advancedFilters.type,
    advancedFilters.kind,
    advancedFilters.sort,
  ]);

  // Sync selected video from URL param
  useEffect(() => {
    const id = searchParams.get('video');
    if (!id || !/^[A-Za-z0-9_-]{11}$/.test(id)) return;
    const feedMatch = items.find((item) => item.video_id === id);
    const historyMatch = history.find((item) => item.video_id === id);
    if (feedMatch) {
      setSelectedVideo({
        video_id: id,
        title: feedMatch.title,
        source_name: feedMatch.source_name || 'YouTube',
        category_slug: feedMatch.category_slug || 'cybersecurity',
      });
    } else if (historyMatch) {
      setSelectedVideo({
        video_id: id,
        title: historyMatch.title,
        source_name: historyMatch.channel_name,
        category_slug: historyMatch.category,
      });
    }
  }, [searchParams, items, history]);

  function navigate(nextTab: Tab, subject = selectedSubject) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', nextTab);
    if (subject) {
      params.set('subject', subject);
      params.set('category', subject);
    } else {
      params.delete('subject');
      params.delete('category');
    }
    params.delete('video');
    if (query.trim()) params.set('q', query.trim());
    else params.delete('q');

    if (advancedFilters.type) params.set('type', advancedFilters.type);
    else params.delete('type');
    if (advancedFilters.kind) params.set('kind', advancedFilters.kind);
    else params.delete('kind');
    if (advancedFilters.sort) params.set('sort', advancedFilters.sort);
    else params.delete('sort');

    router.replace('/discover?' + params.toString(), { scroll: false });
    setPage(1);
  }

  function chooseSubject(subject: Subject | '') {
    const next = selectedSubject === subject ? '' : subject;
    navigate(activeTab, next);
  }

  function playVideo(item: ClassifiedItem | VideoWatchProgress) {
    const isHistory = 'video_id' in item && !('content_type' in item);
    const id = item.video_id;
    if (!id) return;
    const meta: PlayingVideo = isHistory
      ? {
          video_id: id,
          title: item.title,
          source_name: (item as VideoWatchProgress).channel_name,
          category_slug: (item as VideoWatchProgress).category,
        }
      : {
          video_id: id,
          title: item.title,
          source_name: (item as ClassifiedItem).source_name || 'YouTube',
          category_slug: (item as ClassifiedItem).category_slug || 'cybersecurity',
        };
    setSelectedVideo(meta);
    const params = new URLSearchParams(searchParams.toString());
    params.set('video', id);
    router.replace('/discover?' + params.toString(), { scroll: false });
    window.requestAnimationFrame(() => playRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }

  function onWatchSaved(row: VideoWatchProgress) {
    setHistory((previous) =>
      [{ ...row, origin: 'discover' }, ...previous.filter((old) => old.video_id !== row.video_id)].sort(
        (a, b) => Date.parse(b.last_watched_at) - Date.parse(a.last_watched_at)
      )
    );
  }

  async function forgetVideo(videoId: string) {
    if (!window.confirm('Remove this video from your Discover watch history?')) return;
    const response = await fetch('/api/discover/history', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ videoId }),
    });
    if (response.ok) {
      setHistory((previous) => previous.filter((row) => row.video_id !== videoId));
      if (selectedVideo?.video_id === videoId) setSelectedVideo(null);
    } else {
      setHistoryError('Could not remove the video. Please retry.');
    }
  }

  const progressById = useMemo(() => new Map(history.map((row) => [row.video_id, row])), [history]);
  const playerSaved = selectedVideo ? progressById.get(selectedVideo.video_id) : undefined;

  // Continue watching row
  const continueWatching = useMemo(
    () => history.find((row) => !row.is_completed && row.progress_percent >= 3),
    [history]
  );

  return (
    <div className="container-max py-6 sm:py-9 space-y-6">
      {/* ---------------------------------------------------- */}
      {/* 1. DISCOVER HEADER SECTION */}
      {/* ---------------------------------------------------- */}
      <header className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-5 sm:p-7 space-y-5 shadow-xs">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-[var(--accent-cyan)]">
              <Compass className="h-4 w-4" />
              <span>CyberTube Discovery V3</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
              Discover Cybersecurity Knowledge & Media Hub
            </h1>
            <p className="max-w-2xl text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
              Playable tutorials, verified CVE advisories, technical news, industry research, tools, and career pathways — categorized and curated for cybersecurity practitioners.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {userId ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-subtle)] px-3 py-1.5 text-xs font-mono text-[var(--accent-emerald)]">
                <Check className="h-3.5 w-3.5" /> Cloud Sync Active
              </span>
            ) : (
              <Link
                href="/login?redirect=/discover"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-subtle)] px-3 py-1.5 text-xs font-mono text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]"
              >
                <span>Sign in for personalized feed</span>
              </Link>
            )}
          </div>
        </div>

        {/* Unified Search Bar */}
        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            navigate(activeTab);
          }}
          className="relative"
        >
          <label htmlFor="discover-search" className="sr-only">
            Search videos, advisories, news and tools
          </label>
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-[var(--text-muted)]" />
          <input
            id="discover-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search CVEs, Wireshark, SOC Analyst, Linux, Ghidra, Ransomware..."
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] pl-10 pr-24 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)]"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1.5 rounded-lg bg-[var(--accent-cyan)] px-4 py-1.5 text-xs font-semibold text-[#090D14] hover:opacity-95"
          >
            Search
          </button>
        </form>

        {/* Primary Content Navigation (Horizontal scrollable with icons) */}
        <nav
          aria-label="Discover primary content categories"
          className="flex gap-2 overflow-x-auto pb-1 scrollbar-none"
        >
          {primaryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => navigate(tab.id, '')}
                className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-mono font-medium transition-all border ${
                  isActive
                    ? 'bg-[var(--accent-cyan)] text-[#090D14] border-[var(--accent-cyan)] font-semibold shadow-xs'
                    : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent-cyan)] bg-[var(--surface-subtle)]'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.title}</span>
              </button>
            );
          })}
        </nav>
      </header>

      {/* ---------------------------------------------------- */}
      {/* 2. SECONDARY TOPIC NAVIGATION & ADVANCED FILTERS */}
      {/* ---------------------------------------------------- */}
      {activeTab !== 'catalog' && activeTab !== 'history' && (
        <div className="space-y-3">
          {/* Secondary Topic Pills */}
          <div
            className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none"
            role="group"
            aria-label="Filter discovery content by topic"
          >
            {TOPIC_NAV_ITEMS.map((cat) => {
              const isSelected = selectedSubject === cat.id;
              return (
                <button
                  key={cat.id || 'all'}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => chooseSubject(cat.id)}
                  className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-mono transition-all ${
                    isSelected
                      ? 'bg-[var(--accent-cyan-subtle)] text-[var(--accent-cyan)] border-[var(--accent-cyan)] font-semibold shadow-xs'
                      : 'border-[var(--border)] text-[var(--text-secondary)] bg-[var(--card-bg)] hover:border-[var(--accent-cyan)]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Advanced Filter Drawer Component */}
          <DiscoverFiltersPanel
            filters={advancedFilters}
            isOpen={showAdvancedFilters}
            onToggle={() => setShowAdvancedFilters((v) => !v)}
            onChange={(updated) => {
              setAdvancedFilters((prev) => ({ ...prev, ...updated }));
              const params = new URLSearchParams(searchParams.toString());
              if (updated.type !== undefined) {
                if (updated.type) params.set('type', updated.type);
                else params.delete('type');
              }
              if (updated.kind !== undefined) {
                if (updated.kind) params.set('kind', updated.kind);
                else params.delete('kind');
              }
              if (updated.sort !== undefined) {
                if (updated.sort) params.set('sort', updated.sort);
                else params.delete('sort');
              }
              router.replace('/discover?' + params.toString(), { scroll: false });
            }}
            onReset={() => {
              setAdvancedFilters({ type: '', kind: '', subject: '', sort: '' });
              const params = new URLSearchParams(searchParams.toString());
              params.delete('type');
              params.delete('kind');
              params.delete('sort');
              router.replace('/discover?' + params.toString(), { scroll: false });
            }}
          />

          {/* Customize Interests Section */}
          <details open className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] shadow-xs">
            <summary className="cursor-pointer select-none px-4 py-3 text-xs font-mono font-medium text-[var(--text-secondary)] hover:text-[var(--accent-cyan)]">
              <span className="inline-flex items-center gap-2">
                <Filter className="h-3.5 w-3.5 text-[var(--accent-cyan)]" />
                <span>Customize followed topics for personalized feed</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </span>
            </summary>
            <div className="px-4 pb-4">
              <InterestSelector onInterestsChange={onInterestsChange} />
            </div>
          </details>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 3. ACTIVE VIDEO PLAYER */}
      {/* ---------------------------------------------------- */}
      {selectedVideo && activeTab !== 'catalog' && (
        <div ref={playRef} className="scroll-mt-24 space-y-2">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                setSelectedVideo(null);
                const params = new URLSearchParams(searchParams.toString());
                params.delete('video');
                router.replace('/discover?' + params.toString(), { scroll: false });
              }}
              className="inline-flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--accent-cyan)]"
            >
              <X className="h-4 w-4" /> Close player
            </button>
          </div>
          <DiscoverVideoPlayer
            key={selectedVideo.video_id}
            video={selectedVideo}
            saved={playerSaved}
            signedIn={Boolean(userId)}
            onSaved={onWatchSaved}
          />
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 4. WATCH HISTORY VIEW */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'history' ? (
        <section className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">Your Watch History</h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                Synced to your CyberTube account, including recorded course video activity.
              </p>
            </div>
            <Link
              href="/profile"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[var(--accent-cyan)] hover:underline"
            >
              <span>View in profile</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {isAuthLoading ? (
            <div className="py-16 text-center text-sm text-[var(--text-secondary)]">Loading your account…</div>
          ) : !userId ? (
            <div className="rounded-2xl border border-[var(--border)] p-8 text-center space-y-3 bg-[var(--card-bg)]">
              <History className="mx-auto h-8 w-8 text-[var(--text-muted)]" />
              <p className="font-semibold text-[var(--text-primary)]">Sign in to view cloud watch history</p>
              <p className="text-xs text-[var(--text-secondary)]">
                Video progress is preserved across devices for authenticated accounts.
              </p>
              <Link
                href="/login?redirect=/discover?tab=history"
                className="inline-block rounded-xl bg-[var(--accent-cyan)] px-4 py-2 text-xs font-semibold text-[#090D14]"
              >
                Sign In
              </Link>
            </div>
          ) : historyError ? (
            <p role="alert" className="text-sm text-amber-600">
              {historyError}
            </p>
          ) : history.length === 0 ? (
            <div className="rounded-2xl border border-[var(--border)] p-12 text-center bg-[var(--card-bg)] space-y-2">
              <History className="mx-auto h-8 w-8 text-[var(--text-muted)] mb-2" />
              <p className="font-semibold text-[var(--text-primary)]">No watched videos yet</p>
              <p className="text-xs text-[var(--text-secondary)]">
                Play any video in Discover or from courses to begin tracking your watch history.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {history.map((row) => (
                <article
                  key={row.video_id}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] overflow-hidden motion-safe:transition-all motion-safe:hover:-translate-y-0.5 hover:shadow-md"
                >
                  <button
                    type="button"
                    className="relative aspect-video w-full bg-[#0B1018]"
                    onClick={() => playVideo(row)}
                  >
                    <img
                      src={`https://i.ytimg.com/vi/${row.video_id}/hqdefault.jpg`}
                      loading="lazy"
                      alt=""
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute bottom-0 left-0 h-1.5 w-full bg-black/70">
                      <span
                        className="block h-full bg-[var(--accent-cyan)]"
                        style={{ width: `${row.progress_percent}%` }}
                      />
                    </span>
                  </button>
                  <div className="p-4 space-y-2">
                    <h3 className="text-sm font-semibold line-clamp-2 text-[var(--text-primary)]">
                      {row.title}
                    </h3>
                    <div className="text-xs text-[var(--text-secondary)] font-mono">
                      {row.is_completed ? 'Watched' : `${row.progress_percent}% watched`} · {row.channel_name}
                    </div>
                    <div className="flex justify-between gap-2 pt-2 border-t border-[var(--border)]">
                      <button
                        type="button"
                        onClick={() => playVideo(row)}
                        className="text-xs font-semibold text-[var(--accent-cyan)] hover:underline"
                      >
                        {row.is_completed ? 'Watch again' : 'Continue watching'}
                      </button>
                      {row.origin !== 'course' && (
                        <button
                          type="button"
                          onClick={() => void forgetVideo(row.video_id)}
                          className="text-xs text-[var(--text-muted)] hover:text-red-500"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      ) : activeTab === 'catalog' ? (
        /* ---------------------------------------------------- */
        /* 5. RESOURCE DIRECTORY VIEW                           */
        /* ---------------------------------------------------- */
        <div className="space-y-4">
          <button
            type="button"
            className="lg:hidden rounded-lg border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-secondary)]"
            onClick={() => setMobileCatalogFilters((v) => !v)}
          >
            <Filter className="mr-2 inline h-4 w-4" /> Filters
          </button>
          <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
            <aside
              className={`${
                mobileCatalogFilters ? '' : 'hidden lg:block'
              } rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-4`}
            >
              <FilterSidebar
                filters={catalogFilters}
                onFilterChange={setCatalogFilters}
                onReset={() => setCatalogFilters(emptyCatalogFilters)}
                facetCounts={facets}
              />
            </aside>
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Resource Directory</h2>
              {catalogMatches.length === 0 ? (
                <p className="rounded-xl border border-[var(--border)] p-10 text-sm text-[var(--text-secondary)]">
                  No matching resources. Clear the filters to see the directory.
                </p>
              ) : (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {catalogMatches.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* ---------------------------------------------------- */
        /* 6. PRIMARY DISCOVERY CONTENT FEED                    */
        /* ---------------------------------------------------- */
        <section className="space-y-5">
          {/* Section Header */}
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="space-y-0.5">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                {primaryTabs.find((t) => t.id === activeTab)?.title || 'Discover Feed'}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                {activeTab === 'for-you'
                  ? userId
                    ? 'Ranked using your followed interests, source diversity, and CyberTube watch activity.'
                    : 'Explore a balanced cybersecurity feed. Sign in for tailored recommendations.'
                  : activeTab === 'videos'
                  ? 'High-quality cybersecurity tutorials, walkthroughs, and practical lessons.'
                  : activeTab === 'security-alerts'
                  ? 'Official CVEs, GitHub security advisories, and CISA vulnerability bulletins.'
                  : activeTab === 'news'
                  ? 'Verified cybersecurity news, breach disclosures, and industry reporting.'
                  : 'Fresh updates, verified technical tools, and practitioner resources.'}
              </p>
            </div>
            {feedData && !loading && (
              <span className="text-[11px] font-mono text-[var(--text-muted)]">
                {feedData.liveSources > 0
                  ? `${feedData.liveSources} live sources refreshed · ${feedData.total} items total`
                  : 'Curated verified library'}
              </span>
            )}
          </div>

          {/* Continue Watching Compact Banner */}
          {continueWatching && activeTab === 'for-you' && (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--accent-cyan)]/30 bg-[var(--accent-cyan-subtle)] p-4 shadow-xs">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent-cyan)] text-[#090D14]">
                  <Play className="ml-0.5 h-4 w-4 fill-current" />
                </span>
                <div>
                  <p className="text-xs font-mono font-semibold text-[var(--text-primary)]">
                    Continue Watching
                  </p>
                  <p className="text-xs text-[var(--text-secondary)] line-clamp-1">
                    {continueWatching.title} ({continueWatching.progress_percent}% watched)
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="rounded-lg bg-[var(--accent-cyan)] px-3.5 py-1.5 text-xs font-semibold text-[#090D14] hover:opacity-95"
                onClick={() => playVideo(continueWatching)}
              >
                Resume
              </button>
            </div>
          )}

          {/* Feed States: Loading, Error, Empty, or Cards Grid */}
          {loading && items.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5" aria-label="Loading feed items">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <div
                  key={index}
                  className="h-72 rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)] animate-pulse"
                />
              ))}
            </div>
          ) : error ? (
            <div role="alert" className="rounded-2xl border border-amber-600/30 bg-[var(--card-bg)] p-7 space-y-2">
              <p className="font-semibold text-[var(--text-primary)]">Unable to load Discover feed</p>
              <p className="text-xs text-[var(--text-secondary)]">{error}</p>
              <button
                type="button"
                className="text-xs font-semibold text-[var(--accent-cyan)] underline"
                onClick={() => setPreferencesVersion((v) => v + 1)}
              >
                Retry
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-12 text-center space-y-3">
              <Compass className="mx-auto h-9 w-9 text-[var(--text-muted)]" />
              <h3 className="font-semibold text-[var(--text-primary)]">No items match your selected filters</h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Try switching topics, clearing filters, or entering a different search term.
              </p>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-subtle)] px-3.5 py-1.5 text-xs font-mono font-medium text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]"
                onClick={() => {
                  setQuery('');
                  setDebouncedQuery('');
                  setAdvancedFilters({ type: '', kind: '', subject: '', sort: '' });
                  navigate('for-you', '');
                }}
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset Filters</span>
              </button>
            </div>
          ) : (
            <>
              {/* Dynamic Grid of Specialized Content Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {items.map((item) => (
                  <FeedCardDispatcher
                    key={item.id}
                    item={item}
                    progress={item.video_id ? progressById.get(item.video_id) : undefined}
                    onPlay={playVideo}
                  />
                ))}
              </div>

              {/* Load More Pagination */}
              {feedData?.hasMore && (
                <div className="pt-4 flex justify-center">
                  <button
                    type="button"
                    disabled={loadMore}
                    onClick={() => setPage((n) => n + 1)}
                    className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] px-6 py-2.5 text-xs font-mono font-semibold text-[var(--text-primary)] hover:border-[var(--accent-cyan)] disabled:opacity-50"
                  >
                    {loadMore ? (
                      <>
                        <Loader2 className="mr-2 inline h-4 w-4 animate-spin text-[var(--accent-cyan)]" />
                        Loading more...
                      </>
                    ) : (
                      'Load more'
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      )}

      {/* ---------------------------------------------------- */}
      {/* 7. ATTRIBUTION & ETHICAL FOOTER                      */}
      {/* ---------------------------------------------------- */}
      <footer className="border-t border-[var(--border)] pt-5 text-[11px] text-[var(--text-muted)] space-y-1 font-mono">
        <p>
          CyberTube Discover V3 indexes verified public RSS feeds, NIST / CISA advisories, GitHub Security Advisories, and CyberTube course lessons.
        </p>
        <p>
          All video playback uses the official YouTube IFrame API. External articles link safely to their original publishers.
        </p>
      </footer>
    </div>
  );
}

export default function DiscoverPage() {
  return (
    <Suspense
      fallback={
        <div className="container-max py-16 text-center text-xs font-mono text-[var(--text-secondary)]">
          <Loader2 className="mx-auto h-5 w-5 animate-spin text-[var(--accent-cyan)] mb-2" />
          <span>Loading CyberTube Discover V3...</span>
        </div>
      }
    >
      <DiscoverContent />
    </Suspense>
  );
}

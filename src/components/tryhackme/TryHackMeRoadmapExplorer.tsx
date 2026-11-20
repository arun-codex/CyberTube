'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { BookOpen, CheckCircle2, ExternalLink, Filter, Search, ShieldCheck } from 'lucide-react';
import roadmap from '@/data/tryhackme-roadmap.json';
import { useAuth } from '@/lib/auth';
import Link from 'next/link';
import { Cloud, Loader2 } from 'lucide-react';

type RoadmapRoom = {
  id: string;
  title: string;
  url: string;
  accessNote?: string;
};

type RoadmapSection = {
  id: string;
  title: string;
  suggestedLevel: string;
  rooms: RoadmapRoom[];
};

// This is a source-curated free-labs view, not an assertion that TryHackMe has
// verified every room as free today. Exclude the three source-flagged paid rooms.
const sections: RoadmapSection[] = roadmap.sections.map(section => ({
  ...section,
  rooms: section.rooms.filter(room => !room.accessNote),
}));
const levels = ['All levels', 'Beginner', 'Intermediate', 'Advanced', 'Expert', 'Mixed'];
const storageKey = 'cybertube:tryhackme-roadmap:completed:v1';
const uniqueRoomIds = new Set(sections.flatMap((section) => section.rooms.map((room) => room.id)));
const allRoomCount = sections.reduce((total, section) => total + section.rooms.length, 0);

export function TryHackMeRoadmapExplorer() {
  const { userId, isAuthLoading } = useAuth();
  const requestOwnerRef = useRef<string | null>(null);
  const pendingRef = useRef(0);
  // Reject stale refresh responses that began before a completion update.
  const mutationVersionRef = useRef(0);
  const searchParams = useSearchParams();
  const requestedQuery = searchParams.get('q') || '';
  const requestedSection = searchParams.get('section') || '';
  const [level, setLevel] = useState('All levels');
  const [activeSection, setActiveSection] = useState('intro-rooms');
  const [query, setQuery] = useState('');
  const [incompleteOnly, setIncompleteOnly] = useState(false);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [storageReady, setStorageReady] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'loading' | 'guest' | 'saving' | 'synced' | 'error'>('loading');
  const [syncError, setSyncError] = useState('');
  const [pendingIds, setPendingIds] = useState<string[]>([]);

  // Search result links can deep-link into a specific room or entire section.
  useEffect(() => {
    if (requestedQuery) {
      setQuery(requestedQuery);
      setActiveSection('all');
      setLevel('All levels');
    } else if (requestedSection && sections.some(section => section.id === requestedSection)) {
      setQuery('');
      setLevel('All levels');
      setActiveSection(requestedSection);
    }
  }, [requestedQuery, requestedSection]);

  // Load cloud progress for authenticated users. Local state is only used for guests
  // and for one-time migration of progress from the old browser-only tracker.
  useEffect(() => {
    if (isAuthLoading) return;
    const owner = userId || 'guest';
    requestOwnerRef.current = owner;
    let disposed = false;

    setStorageReady(false);
    setCompletedIds([]);
    setPendingIds([]);
    setSyncError('');
    setSyncStatus('loading');
    mutationVersionRef.current += 1;

    function getLegacyIds(): string[] {
      try {
        const saved: unknown = JSON.parse(window.localStorage.getItem(storageKey) || '[]');
        if (!Array.isArray(saved)) return [];
        return [...new Set(saved.filter((id): id is string => typeof id === 'string' && uniqueRoomIds.has(id)))];
      } catch {
        return [];
      }
    }

    if (!userId) {
      setCompletedIds(getLegacyIds());
      setSyncStatus('guest');
      setStorageReady(true);
      return () => { disposed = true; };
    }

    const ownerId = userId;
    const fetchProgress = async () => {
      if (pendingRef.current > 0) return;
      const startMutationVersion = mutationVersionRef.current;
      try {
        const response = await fetch('/api/labs/tryhackme-progress', {
          cache: 'no-store', credentials: 'same-origin',
        });
        if (!response.ok) throw new Error('Could not load account progress');
        let data: { userId: string; completedIds: string[] } = await response.json();
        if (data.userId !== ownerId) throw new Error('Account changed while loading progress');

        const legacy = getLegacyIds();
        if (legacy.length) {
          const migration = await fetch('/api/labs/tryhackme-progress', {
            method: 'PUT',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completedIds: legacy }),
          });
          if (!migration.ok) throw new Error('Unable to move previous browser progress to your account');
          data = await migration.json();
          if (data.userId !== ownerId) throw new Error('Account changed during import');
          try {
            window.localStorage.removeItem(storageKey);
          } catch {
            // Successful cloud sync remains authoritative if storage is unavailable.
          }
        }
        if (disposed || requestOwnerRef.current !== ownerId ||
            mutationVersionRef.current !== startMutationVersion) return;
        setCompletedIds((data.completedIds || []).filter(id => uniqueRoomIds.has(id)));
        setSyncStatus('synced');
        setSyncError('');
      } catch (error) {
        if (disposed || requestOwnerRef.current !== ownerId ||
            mutationVersionRef.current !== startMutationVersion) return;
        setSyncStatus('error');
        setSyncError(error instanceof Error ? error.message : 'Unable to sync account progress');
      } finally {
        if (!disposed && requestOwnerRef.current === ownerId) setStorageReady(true);
      }
    };

    void fetchProgress();
    const refresh = () => {
      if (document.visibilityState !== 'hidden') void fetchProgress();
    };
    window.addEventListener('focus', refresh);
    window.addEventListener('online', refresh);
    document.addEventListener('visibilitychange', refresh);
    return () => {
      disposed = true;
      window.removeEventListener('focus', refresh);
      window.removeEventListener('online', refresh);
      document.removeEventListener('visibilitychange', refresh);
    };
  }, [userId, isAuthLoading]);

  const completedSet = useMemo(() => new Set(completedIds), [completedIds]);
  const completedCount = useMemo(
    () => [...uniqueRoomIds].filter(id => completedSet.has(id)).length,
    [completedSet]
  );

  async function toggleCompleted(id: string) {
    if (!uniqueRoomIds.has(id) || !storageReady || isAuthLoading ||
        pendingIds.includes(id) || (userId && syncStatus === 'error')) return;
    const completed = !completedSet.has(id);

    if (!userId) {
      const next = completed ? [...completedIds, id] : completedIds.filter(item => item !== id);
      setCompletedIds(next);
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        setSyncError('Browser storage is disabled; your guest progress may not persist.');
      }
      return;
    }

    const ownerId = userId;
    setPendingIds(previous => [...previous, id]);
    pendingRef.current += 1;
    mutationVersionRef.current += 1;
    setSyncStatus('saving');
    setSyncError('');

    try {
      const response = await fetch('/api/labs/tryhackme-progress', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId: id, completed }),
      });
      if (!response.ok) throw new Error('Unable to save lab completion to your account');
      const result: { userId: string; roomId: string; completed: boolean; saved: boolean } = await response.json();
      if (!result.saved || result.userId !== ownerId || result.roomId !== id) {
        throw new Error('Account changed while saving; please reload progress');
      }
      if (requestOwnerRef.current !== ownerId) return;
      setCompletedIds(previous => completed
        ? [...new Set([...previous, id])]
        : previous.filter(item => item !== id));
      setSyncStatus(current => current === 'error' ? 'error'
        : pendingRef.current > 1 ? 'saving' : 'synced');
    } catch (error) {
      if (requestOwnerRef.current !== ownerId) return;
      setSyncError(error instanceof Error ? error.message : 'Saving failed');
      setSyncStatus('error');
    } finally {
      pendingRef.current = Math.max(0, pendingRef.current - 1);
      if (requestOwnerRef.current === ownerId) {
        setPendingIds(previous => previous.filter(item => item !== id));
      }
    }
  }

  const normalizedQuery = query.trim().toLowerCase();
  const filteredSections = useMemo(() => {
    return sections
      .filter((section) => level === 'All levels' || section.suggestedLevel === level)
      .filter((section) => activeSection === 'all' || section.id === activeSection)
      .map((section) => ({
        ...section,
        visibleRooms: section.rooms.filter((room) => {
          if (incompleteOnly && completedSet.has(room.id)) return false;
          return !normalizedQuery
            || room.title.toLowerCase().includes(normalizedQuery)
            || room.id.toLowerCase().includes(normalizedQuery)
            || section.title.toLowerCase().includes(normalizedQuery);
        }),
      }))
      .filter((section) => section.visibleRooms.length > 0);
  }, [level, activeSection, incompleteOnly, completedSet, normalizedQuery]);

  const navSections = sections.filter(
    (section) => level === 'All levels' || section.suggestedLevel === level
  );

  return (
    <div className="space-y-7">
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-5 sm:p-7 space-y-5">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--accent-cyan)]">
            <ShieldCheck className="w-4 h-4" />
            Practical Labs · TryHackMe Free Rooms
          </div>
        </div>
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold font-space-grotesk text-[var(--text-primary)]">
            TryHackMe Free Labs (Free)
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--text-secondary)]">
            Explore source-listed free TryHackMe rooms by topic and suggested skill level.
            Open each lab on TryHackMe and mark it complete after finishing it.
            These levels are CyberTube suggestions, not official difficulty ratings.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="rounded-lg bg-[var(--surface-subtle)] border border-[var(--border)] p-3">
            <p className="text-2xl font-bold text-[var(--text-primary)]">{allRoomCount}</p>
            <p className="text-xs text-[var(--text-secondary)]">Section entries</p>
          </div>
          <div className="rounded-lg bg-[var(--surface-subtle)] border border-[var(--border)] p-3">
            <p className="text-2xl font-bold text-[var(--text-primary)]">{sections.length}</p>
            <p className="text-xs text-[var(--text-secondary)]">Topic sections</p>
          </div>
          <div className="rounded-lg bg-[var(--surface-subtle)] border border-[var(--border)] p-3">
            <p className="text-2xl font-bold text-[var(--text-primary)]">{uniqueRoomIds.size}</p>
            <p className="text-xs text-[var(--text-secondary)]">Unique rooms</p>
          </div>
          <div className="rounded-lg bg-[var(--surface-subtle)] border border-[var(--border)] p-3">
            <p className="text-2xl font-bold text-[var(--accent-emerald)]">{completedCount}</p>
            <p className="text-xs text-[var(--text-secondary)]">You marked complete</p>
          </div>
        </div>
        <div className="h-2 rounded-full overflow-hidden bg-[var(--surface-elevated)]" role="progressbar"
          aria-label="Roadmap completion" aria-valuenow={completedCount}
          aria-valuemin={0} aria-valuemax={uniqueRoomIds.size}>
          <div className="h-full bg-[var(--accent-emerald)] transition-all"
            style={{ width: (100 * completedCount / uniqueRoomIds.size) + '%' }} />
        </div>
        <p className="text-xs text-[var(--text-muted)]">
          {isAuthLoading || !storageReady || syncStatus === 'loading'
            ? 'Loading lab progress…'
            : syncStatus === 'guest'
              ? 'Guest mode: progress is saved in this browser. Sign in to synchronize across your devices.'
              : syncStatus === 'saving'
                ? 'Saving progress to your account…'
                : syncStatus === 'synced'
                  ? 'Account progress synced to CyberTube server (not to TryHackMe).'
                  : 'Server sync is unavailable. Completion changes are paused until reloaded.'}
          {' '}Free status is based on the source list and can change; check access on TryHackMe.
        </p>
        <div className="flex flex-wrap items-center gap-3 text-xs" role="status" aria-live="polite">
          {syncStatus === 'synced' && <span className="inline-flex items-center gap-1.5 text-[var(--accent-emerald)]"><Cloud className="w-4 h-4" /> Server synced</span>}
          {syncStatus === 'saving' && <span className="inline-flex items-center gap-1.5 text-[var(--accent-cyan)]"><Loader2 className="w-4 h-4 animate-spin" /> Saving…</span>}
          {syncStatus === 'guest' && <Link href="/login?redirect=/labs" className="font-semibold text-[var(--accent-cyan)] underline">Sign in to sync lab completion</Link>}
          {syncStatus === 'error' && <button type="button" className="font-semibold text-[var(--accent-cyan)] underline" onClick={() => window.location.reload()}>Retry sync</button>}
          {syncError && <span className="text-[var(--accent-rose)]" role="alert">{syncError}</span>}
        </div>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-4 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-secondary)]">
          <Filter className="w-4 h-4" />
          Suggested learning level
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by suggested level">
          {levels.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={level === option}
              onClick={() => {
                setLevel(option);
                setActiveSection('all');
              }}
              className={
                'px-3 py-2 rounded-lg text-xs font-semibold transition-colors border ' +
                (level === option
                  ? 'bg-[var(--accent-cyan)] text-[#090D14] border-[var(--accent-cyan)]'
                  : 'bg-[var(--surface-subtle)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--accent-cyan)]')
              }
            >
              {option}
            </button>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search all TryHackMe rooms</span>
            <Search className="absolute w-4 h-4 left-3 top-3 text-[var(--text-muted)]" />
            <input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveSection('all');
              }}
              placeholder="Search room title, topic, or room URL ID..."
              className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-[var(--surface-subtle)] border border-[var(--border)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)]"
            />
          </label>
          <label className="inline-flex items-center gap-2 text-xs text-[var(--text-secondary)] cursor-pointer">
            <input
              type="checkbox"
              checked={incompleteOnly}
              onChange={(event) => setIncompleteOnly(event.target.checked)}
              className="w-4 h-4 accent-cyan-500"
            />
            Incomplete only
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[250px_minmax(0,1fr)] gap-5 items-start">
        <nav className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-3 lg:sticky lg:top-20 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto"
          aria-label="TryHackMe free lab sections">
          <p className="px-2 py-2 text-xs uppercase font-mono font-semibold tracking-wide text-[var(--text-muted)]">
            Sections ({navSections.length})
          </p>
          <div className="space-y-1 max-h-[18rem] lg:max-h-none overflow-y-auto lg:overflow-visible">
            <button
              type="button"
              aria-current={activeSection === 'all' ? 'true' : undefined}
              onClick={() => setActiveSection('all')}
              className={'w-full text-left rounded-lg px-3 py-2.5 text-xs font-semibold transition-colors ' +
                (activeSection === 'all' ? 'bg-[var(--accent-cyan-subtle)] text-[var(--accent-cyan)]' : 'text-[var(--text-secondary)] hover:bg-[var(--surface-subtle)]')}
            >
              All sections
            </button>
            {navSections.map((section, index) => (
              <button
                key={section.id}
                type="button"
                aria-current={activeSection === section.id ? 'true' : undefined}
                onClick={() => setActiveSection(section.id)}
                className={
                  'w-full text-left flex gap-2 justify-between items-center rounded-lg px-3 py-2 text-xs transition-colors ' +
                  (activeSection === section.id
                    ? 'bg-[var(--accent-cyan-subtle)] text-[var(--accent-cyan)] font-semibold'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--surface-subtle)]')
                }
              >
                <span className="min-w-0">
                  <span className="opacity-60 mr-1">{String(index + 1).padStart(2, '0')}.</span>
                  {section.title}
                </span>
                <span className="font-mono shrink-0 opacity-70">{section.rooms.length}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="space-y-5 min-w-0">
          <p className="text-xs font-mono text-[var(--text-muted)]">
            Showing {filteredSections.reduce((count, section) => count + section.visibleRooms.length, 0)}
            {' '}entries in {filteredSections.length} sections
          </p>

          {filteredSections.length === 0 && (
            <div className="rounded-xl border border-dashed border-[var(--border)] p-10 text-center text-sm text-[var(--text-secondary)]">
              No matching rooms. Try a different level, section, or search term.
            </div>
          )}

          {filteredSections.map((section) => {
            const sectionCompleted = section.rooms.filter((room) => completedSet.has(room.id)).length;
            return (
              <section key={section.id} id={section.id}
                className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] overflow-hidden">
                <div className="p-4 sm:p-5 border-b border-[var(--border)] bg-[var(--surface-subtle)]">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] font-space-grotesk">
                      {section.title}
                    </h2>
                    <span className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[11px] font-mono text-[var(--accent-cyan)]">
                      {section.suggestedLevel} · suggested
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mt-2 text-xs text-[var(--text-muted)]">
                    <span>{section.rooms.length} entries · {sectionCompleted} marked complete</span>
                    {section.visibleRooms.length !== section.rooms.length && (
                      <span>{section.visibleRooms.length} match current filters</span>
                    )}
                  </div>
                </div>
                <ul className="divide-y divide-[var(--border)]">
                  {section.visibleRooms.map((room, index) => (
                    <li key={room.id + '-' + index} className="flex items-start gap-3 px-4 sm:px-5 py-3 hover:bg-[var(--surface-subtle)]">
                      <label className="shrink-0 pt-0.5 cursor-pointer" title="Mark room complete">
                        <input
                          type="checkbox"
                          checked={completedSet.has(room.id)}
                          disabled={!storageReady || isAuthLoading || pendingIds.includes(room.id) || (Boolean(userId) && syncStatus === 'error')}
                          onChange={() => { void toggleCompleted(room.id); }}
                          aria-label={'Mark ' + room.title + ' as completed'}
                          className="w-4 h-4 accent-cyan-500"
                        />
                      </label>
                      <div className="flex-1 min-w-0">
                        <a
                          href={room.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex gap-2 items-center text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent-cyan)] hover:underline break-words"
                        >
                          {room.title}
                          <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-60" />
                        </a>
                        {room.accessNote && (
                          <p className="mt-1 text-xs text-amber-600 dark:text-amber-400">
                            {room.accessNote}
                          </p>
                        )}
                        {completedSet.has(room.id) && (
                          <span className="flex items-center gap-1 mt-1 text-[11px] text-[var(--accent-emerald)]">
                            <CheckCircle2 className="w-3 h-3" /> {userId ? 'Completed · server saved' : 'Completed · browser only'}
                          </span>
                        )}
                      </div>
                      <span className="shrink-0 text-[10px] font-mono text-[var(--text-muted)]" aria-hidden="true">
                        {String(section.rooms.findIndex((original) => original.id === room.id) + 1).padStart(2, '0')}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-[var(--border)] p-5 text-xs text-[var(--text-secondary)] space-y-2">
        <p className="flex items-center gap-2 font-semibold text-[var(--text-primary)]">
          <BookOpen className="w-4 h-4 text-[var(--accent-cyan)]" /> Source & responsible practice
        </p>
        <p>
          Room names and links are curated from Hunterdii&apos;s CC0-1.0-licensed
          {' '}<a href={roadmap.source.repository} target="_blank" rel="noopener noreferrer"
            className="underline hover:text-[var(--accent-cyan)]">TryHackMe-Roadmap</a>.
          Maintainer checkboxes were intentionally not imported as your own progress.
          Rooms appear in multiple sections but share one completion state.
          Three source-flagged non-free rooms are excluded from this free-labs view.
          Remaining rooms were described as free by the source, but are not individually live-verified.
          Room content and access are provided by TryHackMe; CyberTube is independent of TryHackMe.
        </p>
        <p>Only practise on explicitly authorized labs and environments.</p>
      </div>
    </div>
  );
}

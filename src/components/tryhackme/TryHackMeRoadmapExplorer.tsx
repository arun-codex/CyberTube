'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { BookOpen, CheckCircle2, ExternalLink, Filter, Search, ShieldCheck } from 'lucide-react';
import roadmap from '@/data/tryhackme-roadmap.json';

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

const sections: RoadmapSection[] = roadmap.sections;
const levels = ['All levels', 'Beginner', 'Intermediate', 'Advanced', 'Expert', 'Mixed'];
const storageKey = 'cybertube:tryhackme-roadmap:completed:v1';
const uniqueRoomIds = new Set(sections.flatMap((section) => section.rooms.map((room) => room.id)));
const allRoomCount = sections.reduce((total, section) => total + section.rooms.length, 0);

export function TryHackMeRoadmapExplorer() {
  const [level, setLevel] = useState('All levels');
  const [activeSection, setActiveSection] = useState('intro-rooms');
  const [query, setQuery] = useState('');
  const [incompleteOnly, setIncompleteOnly] = useState(false);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      const saved: unknown = raw ? JSON.parse(raw) : [];
      if (Array.isArray(saved)) {
        setCompletedIds(
          saved.filter((id): id is string => typeof id === 'string' && uniqueRoomIds.has(id))
        );
      }
    } catch {
      // Private browsing or storage restrictions should never block the roadmap.
    } finally {
      setStorageReady(true);
    }
  }, []);

  const completedSet = useMemo(() => new Set(completedIds), [completedIds]);
  const completedCount = useMemo(
    () => [...uniqueRoomIds].filter((id) => completedSet.has(id)).length,
    [completedSet]
  );

  function toggleCompleted(id: string) {
    const next = completedSet.has(id)
      ? completedIds.filter((savedId) => savedId !== id)
      : [...completedIds, id];
    setCompletedIds(next);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      // Completion still works for the current tab when storage is unavailable.
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
            Independent TryHackMe room roadmap
          </div>
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold font-space-grotesk text-[var(--text-primary)]">
            TryHackMe Roadmap: Zero to Advanced
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--text-secondary)]">
            Browse every room in the source roadmap, topic by topic, with suggested learning
            levels. Open each lab on TryHackMe and mark it completed here when you finish.
            These levels are CyberTube suggestions, not official TryHackMe difficulty ratings.
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
          {storageReady ? 'Completion is saved on this browser only; it does not sync with TryHackMe or other devices.'
            : 'Loading your browser-saved progress...'}
          {' '}Some source-listed rooms may now require a subscription; check access on TryHackMe.
        </p>
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
          aria-label="TryHackMe roadmap sections">
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
                          onChange={() => toggleCompleted(room.id)}
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
                            <CheckCircle2 className="w-3 h-3" /> Completed on this browser
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
          Some rooms appear in multiple sections, but share one completion state.
          Room content and access are provided by TryHackMe; CyberTube is independent of TryHackMe.
        </p>
        <p>Only practise on explicitly authorized labs and environments.</p>
      </div>
    </div>
  );
}

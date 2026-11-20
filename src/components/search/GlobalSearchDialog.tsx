'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight, BookOpen, CornerDownLeft, ExternalLink, FileText,
  GraduationCap, Layers, Loader2, Search, ShieldCheck, X,
} from 'lucide-react';
import type { SearchResultItem } from '../../lib/search';

interface GlobalSearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

type SearchResponse = {
  results: SearchResultItem[];
  total: number;
};

const suggestions = ['TryHackMe', 'Linux', 'SOC', 'Wireshark'];

function ResultIcon({ type }: { type: SearchResultItem['type'] }) {
  if (type === 'course' || type === 'lesson') return <GraduationCap className="w-4 h-4" />;
  if (type === 'tryhackme-room' || type === 'tryhackme-section') return <ShieldCheck className="w-4 h-4" />;
  if (type === 'study-document' || type === 'resource') return <FileText className="w-4 h-4" />;
  if (type === 'learning-path') return <BookOpen className="w-4 h-4" />;
  return <Layers className="w-4 h-4" />;
}

export function GlobalSearchDialog({ isOpen, onClose }: GlobalSearchDialogProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [total, setTotal] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    setQuery('');
    setResults([]);
    setTotal(0);
    setError('');
    setSelectedIndex(0);
    setIsLoading(false);
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.body.style.overflow = oldOverflow;
      window.cancelAnimationFrame(frame);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || query.trim().length < 2) {
      setResults([]);
      setTotal(0);
      setIsLoading(false);
      setError('');
      return;
    }

    const controller = new AbortController();
    setIsLoading(true);
    setError('');
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch('/api/search?q=' + encodeURIComponent(query.trim()) + '&pageSize=8', {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error('Search is temporarily unavailable');
        const data: SearchResponse = await response.json();
        if (controller.signal.aborted) return;
        setResults(data.results);
        setTotal(data.total);
        setSelectedIndex(0);
        setIsLoading(false);
      } catch (err) {
        if (controller.signal.aborted) return;
        setIsLoading(false);
        setResults([]);
        setTotal(0);
        setError(err instanceof Error ? err.message : 'Search is temporarily unavailable');
      }
    }, 200);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [isOpen, query]);

  function openResult(url: string) {
    onClose();
    router.push(url);
  }

  function handleKeys(event: React.KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      onClose();
    } else if (event.key === 'ArrowDown' && results.length) {
      event.preventDefault();
      setSelectedIndex(index => (index + 1) % results.length);
    } else if (event.key === 'ArrowUp' && results.length) {
      event.preventDefault();
      setSelectedIndex(index => (index + results.length - 1) % results.length);
    } else if (event.key === 'Enter' && query.trim()) {
      event.preventDefault();
      if (results[selectedIndex] && !isLoading) openResult(results[selectedIndex].url);
      else openResult('/search?q=' + encodeURIComponent(query.trim()));
    }
  }

  if (!isOpen) return null;
  const allResultsUrl = '/search?q=' + encodeURIComponent(query.trim());

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search CyberTube"
      className="fixed inset-0 z-[70] flex items-start justify-center bg-slate-950/70 sm:pt-[min(11vh,90px)] sm:px-4 backdrop-blur-[3px]"
      onMouseDown={event => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="flex w-full sm:max-w-2xl h-[100dvh] sm:h-auto sm:max-h-[min(80vh,720px)] flex-col overflow-hidden bg-[var(--card-bg)] border border-[var(--border)] shadow-2xl sm:rounded-2xl"
        onKeyDown={handleKeys}
      >
        <div className="shrink-0 flex items-center gap-3 px-4 sm:px-5 py-3.5 border-b border-[var(--border)] bg-[var(--surface-subtle)]">
          <Search className="w-5 h-5 shrink-0 text-[var(--accent-cyan)]" />
          <input
            ref={inputRef}
            type="text"
            inputMode="search"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={Boolean(query.trim().length >= 2 && results.length)}
            aria-controls="cybertube-global-search-results"
            aria-label="Search site pages, courses, labs and resources"
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Search pages, courses, labs, skills..."
            className="min-w-0 flex-1 bg-transparent text-base text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none"
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search query"
              onClick={() => { setQuery(''); inputRef.current?.focus(); }}
              className="shrink-0 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] px-2 py-2 rounded-md hover:bg-[var(--surface-elevated)]"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            aria-label="Close search dialog"
            onClick={onClose}
            className="shrink-0 w-9 h-9 rounded-lg inline-flex items-center justify-center border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div id="cybertube-global-search-results" role="listbox"
          aria-label="Site search results" className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-4">
          {isLoading ? (
            <div className="flex items-center justify-center gap-3 py-12 text-sm text-[var(--text-secondary)]" role="status">
              <Loader2 className="w-4 h-4 animate-spin text-[var(--accent-cyan)]" />
              Searching CyberTube...
            </div>
          ) : error ? (
            <div className="py-10 text-center space-y-3" role="alert">
              <p className="text-sm text-[var(--accent-rose)]">{error}</p>
              <button type="button" onClick={() => setQuery(query.trim() + ' ')}
                className="text-xs underline text-[var(--accent-cyan)]">
                Retry search
              </button>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-1">
              <div className="px-2 pb-2 flex items-center justify-between gap-2 text-xs text-[var(--text-muted)]">
                <span>{total} matching items · Top {results.length} shown</span>
                <span className="hidden sm:inline">↑ ↓ to navigate · Enter to open</span>
              </div>
              {results.map((item, index) => (
                <Link
                  key={item.id}
                  href={item.url}
                  role="option"
                  aria-selected={index === selectedIndex}
                  onClick={onClose}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={'group w-full flex items-start gap-3 p-3 rounded-xl border transition-colors outline-offset-2 focus-visible:outline-2 focus-visible:outline-[var(--accent-cyan)] ' +
                    (index === selectedIndex
                      ? 'border-[var(--accent-cyan)]/40 bg-[var(--accent-cyan-subtle)]'
                      : 'border-transparent hover:bg-[var(--surface-subtle)]')}
                >
                  <div className="shrink-0 w-9 h-9 rounded-lg bg-[var(--surface-subtle)] flex items-center justify-center text-[var(--accent-cyan)]">
                    <ResultIcon type={item.type} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-[var(--text-primary)] break-words">{item.title}</span>
                      <span className="shrink-0 rounded px-1.5 py-0.5 text-[10px] font-mono bg-[var(--surface-elevated)] text-[var(--text-muted)] border border-[var(--border)]">
                        {item.badge}
                      </span>
                    </p>
                    <p className="mt-1 text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">{item.description}</p>
                  </div>
                  {index === selectedIndex ? (
                    <CornerDownLeft className="shrink-0 mt-2 w-4 h-4 text-[var(--accent-cyan)]" />
                  ) : (
                    <ArrowRight className="shrink-0 mt-2 w-4 h-4 text-[var(--text-muted)] opacity-0 group-hover:opacity-100" />
                  )}
                </Link>
              ))}
            </div>
          ) : query.trim().length >= 2 ? (
            <div className="py-10 text-center space-y-3">
              <Search className="w-7 h-7 mx-auto text-[var(--text-muted)]" />
              <h2 className="text-base font-semibold text-[var(--text-primary)]">
                No results for &ldquo;{query.trim()}&rdquo;
              </h2>
              <p className="text-xs text-[var(--text-secondary)]">
                Try a different spelling or shorter keyword.
              </p>
            </div>
          ) : (
            <div className="py-4 sm:py-7 space-y-4">
              <p className="text-sm font-medium text-[var(--text-primary)]">Find anything on CyberTube</p>
              <p className="text-xs text-[var(--text-secondary)]">
                Search site pages, published courses and lessons, TryHackMe rooms, labs, skills, and certifications.
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map(suggestion => (
                  <button key={suggestion} type="button" onClick={() => setQuery(suggestion)}
                    className="px-3 py-2 text-xs rounded-full border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)] transition-colors">
                    {suggestion}
                  </button>
                ))}
              </div>
              <p className="hidden sm:block pt-2 text-xs text-[var(--text-muted)]">Press Esc to close search.</p>
            </div>
          )}
        </div>

        <div className="shrink-0 border-t border-[var(--border)] bg-[var(--surface-subtle)] px-4 sm:px-5 py-3 flex items-center justify-between gap-3">
          <span className="hidden sm:inline text-[11px] text-[var(--text-muted)]">Search across CyberTube</span>
          <Link href={query.trim() ? allResultsUrl : '/search'} onClick={onClose}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--accent-cyan)] hover:underline">
            View all search results <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

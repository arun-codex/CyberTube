'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, BookOpen, ChevronLeft, ChevronRight, Loader2, Search, X } from 'lucide-react';
import type { SearchResultItem, SearchPage } from '@/lib/search';

type ApiResponse = SearchPage & { query: string };

const labels: Record<string, string> = {
  all: 'All',
  page: 'Pages',
  course: 'Courses',
  lesson: 'Lessons',
  'learning-path': 'Learning Paths',
  resource: 'Resources',
  domain: 'Domains',
  'tryhackme-section': 'TryHackMe Sections',
  'tryhackme-room': 'TryHackMe Rooms',
  skill: 'Skills',
  certification: 'Certifications',
  career: 'Careers',
  glossary: 'Glossary',
  'cheat-sheet': 'Cheat Sheets',
  'study-document': 'Study Documents',
};

export function SearchResultsPage() {
  const router = useRouter();
  const params = useSearchParams();
  const query = params.get('q')?.trim() || '';
  const type = params.get('type') || 'all';
  const pageNumber = Math.max(1, Math.min(500, Number(params.get('page')) || 1));
  const [input, setInput] = useState(query);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => setInput(query), [query]);

  useEffect(() => {
    if (query.length < 2) {
      setData(null);
      setLoading(false);
      setError('');
      return;
    }
    const controller = new AbortController();
    setData(null);
    setLoading(true);
    setError('');
    const search = new URLSearchParams({ q: query, pageSize: '24', page: String(pageNumber) });
    if (type !== 'all') search.set('type', type);
    fetch('/api/search?' + search.toString(), { signal: controller.signal })
      .then(response => {
        if (!response.ok) throw new Error('Could not load search results');
        return response.json() as Promise<ApiResponse>;
      })
      .then(result => {
        if (controller.signal.aborted) return;
        setData(result);
        setLoading(false);
      })
      .catch(err => {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : 'Search is unavailable');
        setLoading(false);
      });
    return () => controller.abort();
  }, [query, type, pageNumber]);

  function navigate(next: { q?: string; type?: string; page?: number }) {
    const targetQuery = next.q === undefined ? query : next.q;
    const targetType = next.type === undefined ? type : next.type;
    const targetPage = next.page || 1;
    const url = new URLSearchParams();
    if (targetQuery.trim()) url.set('q', targetQuery.trim());
    if (targetType !== 'all') url.set('type', targetType);
    if (targetPage > 1) url.set('page', String(targetPage));
    router.push('/search' + (url.toString() ? '?' + url.toString() : ''));
  }

  return (
    <div className="container-max py-8 sm:py-12 space-y-7">
      <div className="space-y-3">
        <Link href="/" className="inline-flex items-center gap-2 text-xs text-[var(--text-secondary)] hover:text-[var(--accent-cyan)]">
          <ArrowLeft className="w-4 h-4" /> Home
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">Search CyberTube</h1>
        <p className="text-sm text-[var(--text-secondary)] max-w-3xl">
          Find site pages, TryHackMe rooms, published courses, individual lessons, study materials, careers and tools.
        </p>
      </div>

      <form
        role="search"
        className="flex flex-col sm:flex-row gap-3"
        onSubmit={event => { event.preventDefault(); navigate({ q: input, type: 'all', page: 1 }); }}
      >
        <label className="flex-1 flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] px-4 focus-within:ring-2 focus-within:ring-[var(--accent-cyan)]">
          <Search className="shrink-0 w-5 h-5 text-[var(--accent-cyan)]" />
          <span className="sr-only">Search across CyberTube</span>
          <input
            value={input} onChange={event => setInput(event.target.value)} type="text" inputMode="search"
            placeholder="Try TryHackMe, SIEM, Linux, Wireshark..."
            className="flex-1 min-w-0 py-3.5 bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none"
          />
          {input && <button type="button" onClick={() => setInput('')} aria-label="Clear search">
            <X className="w-4 h-4 text-[var(--text-secondary)]" />
          </button>}
        </label>
        <button type="submit" className="rounded-xl px-6 py-3.5 bg-[var(--accent-cyan)] text-[#090D14] text-sm font-semibold hover:opacity-90">
          Search
        </button>
      </form>

      {!query && (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-6 space-y-3">
          <p className="font-semibold text-[var(--text-primary)]">Suggested searches</p>
          <div className="flex flex-wrap gap-2">
            {['TryHackMe', 'SOC Analyst', 'Linux', 'Networking', 'CTF', 'Security+'].map(term => (
              <button key={term} type="button" onClick={() => { setInput(term); navigate({ q: term, type: 'all' }); }}
                className="rounded-full border border-[var(--border)] px-3 py-2 text-xs hover:border-[var(--accent-cyan)] text-[var(--text-secondary)]">
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {query && (
        <>
          {data && (
            <div className="space-y-3">
              <p className="text-sm text-[var(--text-secondary)]">
                {data.total} {data.total === 1 ? 'result' : 'results'} for <strong className="text-[var(--text-primary)]">{query}</strong>
                {type !== 'all' && <span> · {labels[type] || type}</span>}
              </p>
              <div role="group" aria-label="Search by result type" className="flex flex-wrap gap-2">
                {Object.entries({ all: Object.values(data.typeCounts).reduce((a, b) => a + b, 0), ...data.typeCounts })
                  .filter(([, count]) => count > 0)
                  .map(([kind, count]) => (
                    <button type="button" key={kind} aria-pressed={type === kind}
                      onClick={() => navigate({ type: kind, page: 1 })}
                      className={'rounded-full border px-3 py-2 text-xs font-semibold transition-colors ' +
                        (type === kind
                          ? 'bg-[var(--accent-cyan)] border-[var(--accent-cyan)] text-[#090D14]'
                          : 'bg-[var(--card-bg)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--accent-cyan)]')}>
                      {labels[kind] || kind} <span className="opacity-70">{count}</span>
                    </button>
                  ))}
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center gap-3 py-16 text-[var(--text-secondary)]" role="status">
              <Loader2 className="w-5 h-5 animate-spin text-[var(--accent-cyan)]" /> Searching...
            </div>
          ) : error ? (
            <div className="rounded-xl border border-[var(--border)] p-8 text-sm text-[var(--accent-rose)]" role="alert">
              {error}. Please try again.
            </div>
          ) : data?.results.length ? (
            <div className="space-y-3">
              {data.results.map((item: SearchResultItem) => (
                <Link key={item.id} href={item.url}
                  className="flex items-start gap-4 p-4 sm:p-5 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] hover:border-[var(--accent-cyan)] hover:bg-[var(--surface-subtle)] transition-colors">
                  <span className="shrink-0 w-10 h-10 rounded-lg bg-[var(--accent-cyan-subtle)] text-[var(--accent-cyan)] flex items-center justify-center">
                    <BookOpen className="w-5 h-5" />
                  </span>
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <div className="flex items-start gap-2 flex-wrap">
                      <h2 className="font-semibold text-base text-[var(--text-primary)] break-words">{item.title}</h2>
                      <span className="text-[10px] rounded border border-[var(--border)] px-2 py-0.5 font-mono text-[var(--text-muted)]">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] line-clamp-2">{item.description}</p>
                    <p className="text-xs text-[var(--accent-cyan)] truncate">{item.url}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 shrink-0 mt-2 text-[var(--accent-cyan)]" />
                </Link>
              ))}

              {data.pageCount > 1 && (
                <div className="flex justify-between items-center gap-4 pt-5">
                  <button type="button" disabled={pageNumber <= 1} onClick={() => navigate({ page: pageNumber - 1 })}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-[var(--border)] text-sm text-[var(--text-primary)] disabled:opacity-40">
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </button>
                  <span className="text-xs text-[var(--text-secondary)]">Page {data.page} of {data.pageCount}</span>
                  <button type="button" disabled={pageNumber >= data.pageCount} onClick={() => navigate({ page: pageNumber + 1 })}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-[var(--border)] text-sm text-[var(--text-primary)] disabled:opacity-40">
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : data ? (
            <div className="rounded-xl border border-dashed border-[var(--border)] p-10 text-center space-y-2">
              <Search className="w-7 h-7 mx-auto text-[var(--text-muted)]" />
              <p className="text-base font-semibold text-[var(--text-primary)]">No matching content</p>
              <p className="text-sm text-[var(--text-secondary)]">Try a shorter keyword or select All categories.</p>
              {type !== 'all' && <button type="button" onClick={() => navigate({ type: 'all' })}
                className="text-sm font-medium text-[var(--accent-cyan)] underline">Show all categories</button>}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}

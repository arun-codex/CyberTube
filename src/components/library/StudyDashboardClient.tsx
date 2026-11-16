'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Search,
  CheckCircle,
  Clock,
  Bookmark,
  Layers,
  ArrowRight,
  TrendingUp,
  Sparkles,
  FileText,
  Shield,
  Filter,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export interface StudyDoc {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category_id: string | null;
  difficulty: string | null;
  page_count: number;
  is_published: boolean;
  study_categories?: { title: string; slug: string } | null;
}

export interface UserProg {
  document_id: string;
  last_page: number;
  highest_page: number;
  completion_percent: number;
  is_completed: boolean;
  last_read_at: string;
}

export interface UserBm {
  document_id: string;
  page_number: number;
  title: string | null;
  created_at: string;
  study_documents?: { title: string } | null;
}

export interface CategoryItem {
  id: string;
  title: string;
  slug: string;
  description: string | null;
}

interface StudyDashboardClientProps {
  documents: StudyDoc[];
  categories: CategoryItem[];
  progressList: UserProg[];
  bookmarks: UserBm[];
}

export function StudyDashboardClient({
  documents,
  categories,
  progressList,
  bookmarks,
}: StudyDashboardClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'in-progress' | 'completed' | 'bookmarked'>('all');

  const progressMap = useMemo(() => {
    const map = new Map<string, UserProg>();
    for (const p of progressList) {
      map.set(p.document_id, p);
    }
    return map;
  }, [progressList]);

  const bookmarksMap = useMemo(() => {
    const map = new Map<string, UserBm[]>();
    for (const b of bookmarks) {
      const list = map.get(b.document_id) || [];
      list.push(b);
      map.set(b.document_id, list);
    }
    return map;
  }, [bookmarks]);

  // Real Database Statistics
  const totalDocuments = documents.length;
  const totalPages = useMemo(() => documents.reduce((sum, d) => sum + (d.page_count || 0), 0), [documents]);

  const inProgressCount = useMemo(
    () => progressList.filter((p) => !p.is_completed && p.completion_percent > 0).length,
    [progressList]
  );

  const completedCount = useMemo(
    () => progressList.filter((p) => p.is_completed).length,
    [progressList]
  );

  // Most recently opened / Continue Reading document
  const continueReadingDoc = useMemo(() => {
    if (progressList.length === 0) return null;
    const sorted = [...progressList].sort(
      (a, b) => new Date(b.last_read_at || 0).getTime() - new Date(a.last_read_at || 0).getTime()
    );
    const mostRecent = sorted[0];
    const doc = documents.find((d) => d.id === mostRecent.document_id);
    return doc ? { doc, progress: mostRecent } : null;
  }, [progressList, documents]);

  // Filtered documents
  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      // Category filter
      if (selectedCategory !== 'all') {
        const cat = categories.find((c) => c.slug === selectedCategory);
        if (cat && doc.category_id !== cat.id) return false;
      }

      // Status filter
      const prog = progressMap.get(doc.id);
      if (statusFilter === 'in-progress') {
        if (!prog || prog.is_completed || prog.completion_percent === 0) return false;
      } else if (statusFilter === 'completed') {
        if (!prog || !prog.is_completed) return false;
      } else if (statusFilter === 'bookmarked') {
        if (!bookmarksMap.has(doc.id)) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const titleMatch = doc.title.toLowerCase().includes(q);
        const descMatch = (doc.description || '').toLowerCase().includes(q);
        const catMatch = (doc.study_categories?.title || '').toLowerCase().includes(q);
        if (!titleMatch && !descMatch && !catMatch) return false;
      }

      return true;
    });
  }, [documents, selectedCategory, statusFilter, searchQuery, categories, progressMap, bookmarksMap]);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent-cyan)] flex items-center justify-center text-[#090D14] shadow-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
                Bug Bounty Study Library
              </h1>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-0.5">
                Login-protected study materials, checklists, and methodologies with cloud-synced progress.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Real Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 bg-[var(--card-bg)] border-[var(--border)]">
          <div className="flex items-center gap-2 text-xs font-medium text-[var(--text-muted)]">
            <FileText className="w-4 h-4 text-[var(--accent-cyan)]" />
            Total Documents
          </div>
          <div className="mt-2 text-2xl font-bold text-[var(--text-primary)] font-mono">{totalDocuments}</div>
        </Card>

        <Card className="p-4 bg-[var(--card-bg)] border-[var(--border)]">
          <div className="flex items-center gap-2 text-xs font-medium text-[var(--text-muted)]">
            <Layers className="w-4 h-4 text-indigo-400" />
            Total Pages
          </div>
          <div className="mt-2 text-2xl font-bold text-[var(--text-primary)] font-mono">{totalPages}</div>
        </Card>

        <Card className="p-4 bg-[var(--card-bg)] border-[var(--border)]">
          <div className="flex items-center gap-2 text-xs font-medium text-[var(--text-muted)]">
            <Clock className="w-4 h-4 text-amber-400" />
            In Progress
          </div>
          <div className="mt-2 text-2xl font-bold text-[var(--text-primary)] font-mono">{inProgressCount}</div>
        </Card>

        <Card className="p-4 bg-[var(--card-bg)] border-[var(--border)]">
          <div className="flex items-center gap-2 text-xs font-medium text-[var(--text-muted)]">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            Completed
          </div>
          <div className="mt-2 text-2xl font-bold text-[var(--text-primary)] font-mono">{completedCount}</div>
        </Card>
      </div>

      {/* Continue Reading Section (if user has active reading session) */}
      {continueReadingDoc && (
        <Card className="p-6 bg-gradient-to-r from-[var(--surface-subtle)] to-[var(--card-bg)] border border-[var(--accent-cyan)]/30 shadow-sm relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[var(--accent-cyan)]">
                  <Sparkles className="w-3.5 h-3.5" /> Continue Reading
                </span>
                <span className="text-[11px] text-[var(--text-muted)]">• Page {continueReadingDoc.progress.last_page} of {continueReadingDoc.doc.page_count}</span>
              </div>
              <h2 className="text-lg font-bold text-[var(--text-primary)]">
                {continueReadingDoc.doc.title}
              </h2>
              <div className="w-full bg-[var(--border)] h-1.5 rounded-full overflow-hidden max-w-md">
                <div
                  className="bg-[var(--accent-cyan)] h-full transition-all duration-300"
                  style={{ width: `${continueReadingDoc.progress.completion_percent}%` }}
                />
              </div>
            </div>

            <Link
              href={`/study-materials/bug-bounty/${continueReadingDoc.doc.id}?page=${continueReadingDoc.progress.last_page}`}
            >
              <Button size="sm" className="bg-[var(--accent-cyan)] hover:bg-[var(--accent-cyan-hover)] text-[#090D14] font-semibold gap-2 shadow-sm">
                <span>Resume Page {continueReadingDoc.progress.last_page}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </Card>
      )}

      {/* Bookmarks Section (if user has saved bookmarks) */}
      {bookmarks.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-amber-500 fill-amber-500/20" /> Your Bookmarked Pages ({bookmarks.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {bookmarks.slice(0, 8).map((bm, idx) => (
              <Link
                key={idx}
                href={`/study-materials/bug-bounty/${bm.document_id}?page=${bm.page_number}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] hover:border-amber-500/50 hover:bg-[var(--surface-subtle)] text-xs text-[var(--text-primary)] transition-colors"
              >
                <Bookmark className="w-3.5 h-3.5 text-amber-500" />
                <span className="truncate max-w-[150px]">{bm.study_documents?.title || 'Document'}</span>
                <span className="font-mono text-amber-400 font-semibold">p.{bm.page_number}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Search & Filters Toolbar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search study guides, tags, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface-subtle)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-cyan)]"
            />
          </div>

          {/* Status Filter Buttons */}
          <div className="flex items-center gap-1 bg-[var(--surface-subtle)] p-1 rounded-lg border border-[var(--border)] self-start sm:self-auto overflow-x-auto">
            <button
              type="button"
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                statusFilter === 'all'
                  ? 'bg-[var(--card-bg)] text-[var(--text-primary)] shadow-xs font-semibold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('in-progress')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                statusFilter === 'in-progress'
                  ? 'bg-[var(--card-bg)] text-[var(--text-primary)] shadow-xs font-semibold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              In Progress
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('completed')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                statusFilter === 'completed'
                  ? 'bg-[var(--card-bg)] text-[var(--text-primary)] shadow-xs font-semibold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Completed
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('bookmarked')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                statusFilter === 'bookmarked'
                  ? 'bg-[var(--card-bg)] text-[var(--text-primary)] shadow-xs font-semibold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Bookmarked
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[var(--accent-cyan)] text-[#090D14] font-semibold'
                : 'bg-[var(--surface-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)]'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.slug
                  ? 'bg-[var(--accent-cyan)] text-[#090D14] font-semibold'
                  : 'bg-[var(--surface-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)]'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      {filteredDocuments.length === 0 ? (
        <Card className="p-12 text-center border-dashed bg-[var(--card-bg)]">
          <BookOpen className="mx-auto h-12 w-12 text-[var(--text-muted)] mb-3 opacity-40" />
          <h3 className="text-base font-bold text-[var(--text-primary)]">No study materials match your search</h3>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">
            Try adjusting your search query, status filters, or selected category.
          </p>
        </Card>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDocuments.map((doc) => {
            const prog = progressMap.get(doc.id);
            const isCompleted = prog?.is_completed ?? false;
            const completionPercent = prog?.completion_percent ?? 0;
            const lastPage = prog?.last_page ?? 1;
            const categoryName = doc.study_categories?.title || 'Study Guide';

            return (
              <Card
                key={doc.id}
                className="group flex flex-col justify-between p-5 bg-[var(--card-bg)] border-[var(--border)] hover:border-[var(--accent-cyan)] transition-all hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-semibold text-[var(--accent-cyan)] truncate max-w-[160px]">
                      {categoryName}
                    </span>
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-500">
                        <CheckCircle className="w-3.5 h-3.5" /> Completed
                      </span>
                    ) : completionPercent > 0 ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-400 font-semibold">
                        <Clock className="w-3 h-3" /> {completionPercent}%
                      </span>
                    ) : (
                      <Badge variant="outline" className="text-[10px]">
                        {doc.difficulty || 'Guide'}
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors line-clamp-2">
                    {doc.title}
                  </h3>

                  {doc.description && (
                    <p className="mt-2 text-xs text-[var(--text-secondary)] line-clamp-3">
                      {doc.description}
                    </p>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-[var(--border)] space-y-3">
                  {/* Progress Bar */}
                  {completionPercent > 0 && (
                    <div className="w-full bg-[var(--border)] h-1 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          isCompleted ? 'bg-emerald-500' : 'bg-[var(--accent-cyan)]'
                        }`}
                        style={{ width: `${completionPercent}%` }}
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-[var(--text-muted)] font-mono">
                      {doc.page_count} {doc.page_count === 1 ? 'page' : 'pages'}
                    </span>

                    <Link href={`/study-materials/bug-bounty/${doc.id}?page=${lastPage}`}>
                      <Button size="sm" variant="outline" className="h-7 text-xs px-2.5 group-hover:bg-[var(--accent-cyan)] group-hover:text-[#090D14] group-hover:border-[var(--accent-cyan)] transition-all">
                        {completionPercent > 0 ? 'Continue' : 'Read Now'} →
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

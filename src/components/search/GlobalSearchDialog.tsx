'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, BookOpen, Layers, ExternalLink, ArrowRight, CornerDownLeft } from 'lucide-react';
import { searchGlobalCatalog, SearchResultItem } from '../../lib/search';

interface GlobalSearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearchDialog({ isOpen, onClose }: GlobalSearchDialogProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const handler = setTimeout(() => {
      const hits = searchGlobalCatalog(query);
      setResults(hits);
      setSelectedIndex(0);
      setIsLoading(false);
    }, 150);

    return () => clearTimeout(handler);
  }, [query]);

  // Global keydown listeners for escape & arrows
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (results.length > 0) {
        setSelectedIndex((prev) => (prev + 1) % results.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (results.length > 0) {
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results.length > 0 && results[selectedIndex]) {
        router.push(results[selectedIndex].url);
        onClose();
      } else if (query.trim()) {
        router.push(`/discover?q=${encodeURIComponent(query.trim())}`);
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-label="Global search catalog"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-[#141422] rounded-[8px] border border-[#e4e4ed] dark:border-[#2e2e42] shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Box */}
        <div className="flex items-center px-4 py-3 border-b border-[#e4e4ed] dark:border-[#2e2e42] bg-[#f4f4f9] dark:bg-[#1c1c2c]">
          <Search className="w-5 h-5 text-[#6b6b7b] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tracks, tools, packet analysis, CVEs, protocols..."
            className="w-full bg-transparent text-sm sm:text-base font-mono text-[#303055] dark:text-[#f0f0f8] placeholder:text-[#6b6b7b] focus:outline-none"
            aria-label="Search term input"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#6b6b7b] hover:text-[#303055] dark:hover:text-[#f0f0f8]"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono rounded bg-white dark:bg-[#252538] text-[#6b6b7b] border border-[#e4e4ed] dark:border-[#383850]">
              ESC
            </kbd>
          )}
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-[#f4f4f9] dark:divide-[#1e1e30]">
          {isLoading ? (
            <div className="py-12 text-center text-xs font-mono text-[#6b6b7b] animate-pulse">
              Scanning security catalog and index...
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-1">
              <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-[#6b6b7b] flex justify-between">
                <span>Matching Results ({results.length})</span>
                <span className="hidden sm:inline">Use ↑↓ keys to navigate</span>
              </div>
              {results.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <Link
                    key={item.id}
                    href={item.url}
                    onClick={onClose}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex items-start gap-3 p-3 rounded-[6px] transition-colors ${
                      isSelected
                        ? 'bg-[#e8e8f2] dark:bg-[#222238] border border-[#d2d2dc] dark:border-[#383850]'
                        : 'hover:bg-[#f4f4f9] dark:hover:bg-[#1a1a2b] border border-transparent'
                    }`}
                  >
                    <div className="p-2 rounded-[4px] bg-white dark:bg-[#141422] border border-[#e4e4ed] dark:border-[#2e2e42] text-[#303055] dark:text-[#a0a0c0] shrink-0 mt-0.5">
                      {item.type === 'course' ? (
                        <BookOpen className="w-4 h-4" />
                      ) : (
                        <Layers className="w-4 h-4" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded-[3px] bg-[#303055] text-white">
                          {item.badge}
                        </span>
                        <h4 className="text-xs sm:text-sm font-semibold text-[#303055] dark:text-[#f0f0f8] truncate">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-xs text-[#6b6b7b] dark:text-[#a0a0b8] line-clamp-1 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                    {isSelected && (
                      <CornerDownLeft className="w-4 h-4 text-[#303055] dark:text-[#f0f0f8] shrink-0 mt-2" />
                    )}
                  </Link>
                );
              })}
            </div>
          ) : query.trim() ? (
            <div className="py-12 px-4 text-center space-y-3">
              <p className="text-xs font-mono text-[#6b6b7b]">
                No direct matches for &ldquo;{query}&rdquo;
              </p>
              <button
                onClick={() => {
                  router.push(`/discover?q=${encodeURIComponent(query.trim())}`);
                  onClose();
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-[4px] bg-[#303055] dark:bg-[#6366f1] text-white text-xs font-medium"
              >
                Search catalog with filters
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="py-10 px-6 text-center space-y-2">
              <p className="text-xs font-mono text-[#6b6b7b]">
                Type keywords like <span className="text-[#303055] dark:text-[#f0f0f8] font-medium">&quot;wireshark&quot;</span>,{' '}
                <span className="text-[#303055] dark:text-[#f0f0f8] font-medium">&quot;hardware&quot;</span>, or{' '}
                <span className="text-[#303055] dark:text-[#f0f0f8] font-medium">&quot;sql injection&quot;</span>.
              </p>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        {query.trim() && results.length > 0 && (
          <div className="px-4 py-2.5 bg-[#f4f4f9] dark:bg-[#1c1c2c] border-t border-[#e4e4ed] dark:border-[#2e2e42] flex items-center justify-between text-[11px] font-mono text-[#6b6b7b]">
            <Link
              href={`/discover?q=${encodeURIComponent(query.trim())}`}
              onClick={onClose}
              className="text-[#303055] dark:text-[#f0f0f8] hover:underline flex items-center gap-1 font-medium"
            >
              View all results on Discover page
              <ArrowRight className="w-3 h-3" />
            </Link>
            <span className="hidden sm:inline">Press Enter to select</span>
          </div>
        )}
      </div>
    </div>
  );
}


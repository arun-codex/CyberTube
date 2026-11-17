/**
 * Pure type definitions and utilities for authenticated server-side study search.
 * Private PDF content must NEVER be bundled into client JavaScript or static JSON.
 */
import { findTextMatches } from './search';

export interface PageMatch {
  pageNumber: number;
  snippet: string;
  matchCount: number;
}

export interface DocumentSearchResult {
  documentId: string;
  title: string;
  slug: string;
  originalFilename?: string;
  categoryId?: string | null;
  pageCount?: number;
  totalMatches: number;
  matchingPages: PageMatch[];
}

export interface LibrarySearchResponse {
  query: string;
  totalMatchingDocuments: number;
  totalMatchingPages: number;
  results: DocumentSearchResult[];
}

/**
 * Generate a clean snippet around the first occurrence of match in text.
 */
export function createSnippet(text: string, query: string, maxLength = 130): string {
  if (!text || !query) return '';
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const idx = lowerText.indexOf(lowerQuery);
  if (idx === -1) {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }

  const start = Math.max(0, idx - 45);
  const end = Math.min(text.length, idx + query.length + 65);

  let snippet = text.slice(start, end).trim();
  if (start > 0) snippet = '...' + snippet;
  if (end < text.length) snippet = snippet + '...';

  return snippet;
}

/**
 * In-memory / mock search executor for server-side testing and staging.
 */
export function searchDocumentPagesInMemory(
  documents: Array<{
    documentId: string;
    title: string;
    slug: string;
    categoryId?: string | null;
    pageCount?: number;
    pages: Array<{ pageNumber: number; text: string }>;
  }>,
  query: string,
  limit = 20
): LibrarySearchResponse {
  const trimmed = (query || '').trim();
  if (!trimmed || trimmed.length < 2) {
    return {
      query: trimmed,
      totalMatchingDocuments: 0,
      totalMatchingPages: 0,
      results: [],
    };
  }

  const results: DocumentSearchResult[] = [];
  let totalMatchingPages = 0;

  for (const doc of documents) {
    const matchingPages: PageMatch[] = [];
    let docMatchCount = 0;

    for (const page of doc.pages) {
      const matches = findTextMatches(page.text, trimmed);
      if (matches.length > 0) {
        docMatchCount += matches.length;
        matchingPages.push({
          pageNumber: page.pageNumber,
          snippet: createSnippet(page.text, trimmed),
          matchCount: matches.length,
        });
      }
    }

    if (matchingPages.length > 0) {
      totalMatchingPages += matchingPages.length;
      results.push({
        documentId: doc.documentId,
        title: doc.title,
        slug: doc.slug,
        categoryId: doc.categoryId || null,
        pageCount: doc.pageCount || doc.pages.length,
        totalMatches: docMatchCount,
        matchingPages: matchingPages.slice(0, 5),
      });
    }

    if (results.length >= limit) break;
  }

  // Sort by highest matches first
  results.sort((a, b) => b.totalMatches - a.totalMatches);

  return {
    query: trimmed,
    totalMatchingDocuments: results.length,
    totalMatchingPages,
    results: results.slice(0, limit),
  };
}

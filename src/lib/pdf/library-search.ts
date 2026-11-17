import rawIndex from '../../data/study-pdf-index.json';
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
  originalFilename: string;
  categoryId: string | null;
  pageCount: number;
  totalMatches: number;
  matchingPages: PageMatch[];
}

export interface LibrarySearchResponse {
  query: string;
  totalMatchingDocuments: number;
  totalMatchingPages: number;
  results: DocumentSearchResult[];
}

interface IndexedPage {
  pageNumber: number;
  text: string;
}

interface IndexedDocument {
  documentId: string;
  title: string;
  slug: string;
  originalFilename: string;
  categoryId: string | null;
  pageCount: number;
  pages: IndexedPage[];
}

const studyIndex: IndexedDocument[] = rawIndex as IndexedDocument[];

/**
 * Generate a clean snippet around the first occurrence of match in text.
 */
function createSnippet(text: string, query: string, maxLength = 130): string {
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
 * Searches across all 34 indexed PDF documents for the query text.
 */
export function searchStudyDocuments(query: string, limit = 20): LibrarySearchResponse {
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

  for (const doc of studyIndex) {
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
        originalFilename: doc.originalFilename,
        categoryId: doc.categoryId,
        pageCount: doc.pageCount,
        totalMatches: docMatchCount,
        matchingPages: matchingPages.slice(0, 5), // top 5 pages per document in overview
      });
    }
  }

  // Sort by highest match count first
  results.sort((a, b) => b.totalMatches - a.totalMatches);

  return {
    query: trimmed,
    totalMatchingDocuments: results.length,
    totalMatchingPages,
    results: results.slice(0, limit),
  };
}

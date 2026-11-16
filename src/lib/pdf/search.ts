export interface TextMatch { start: number; end: number }

/** Offsets refer to concatenated PDF.js text spans, never HTML. */
export function findTextMatches(text: string, query: string): TextMatch[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];
  const haystack = text.toLowerCase();
  const result: TextMatch[] = [];
  for (let offset = 0; offset <= haystack.length - needle.length;) {
    const start = haystack.indexOf(needle, offset);
    if (start < 0) break;
    result.push({ start, end: start + needle.length });
    offset = start + needle.length;
  }
  return result;
}

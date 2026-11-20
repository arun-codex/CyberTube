import { NextRequest, NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';
import { createClient } from '@supabase/supabase-js';
import { searchCatalogPage, type SearchResultItem } from '@/lib/search';

export const dynamic = 'force-dynamic';

// Only PUBLIC, published metadata is indexed. Never use service-role credentials
// for a public search endpoint or return user-specific content from this cache.
async function readPublishedMetadata(): Promise<SearchResultItem[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || url.includes('YOUR_PROJECT_ID')) return [];

  const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const extra: SearchResultItem[] = [];

  try {
    const { data: rows, error } = await db
      .from('courses')
      .select('id,slug,title,description,short_description,domains,tags,status')
      .eq('status', 'published')
      .limit(500);

    if (error) {
      console.warn('[site-search] Public course index unavailable:', error.message);
    } else {
      const courses = rows || [];
      for (const course of courses) {
        if (!course.id || !course.slug || !course.title) continue;
        extra.push({
          id: 'course:' + course.slug,
          type: 'course',
          title: course.title,
          description: course.short_description || course.description || '',
          url: '/courses/' + encodeURIComponent(course.slug),
          badge: 'COURSE',
          tags: [...(Array.isArray(course.tags) ? course.tags : []), ...(Array.isArray(course.domains) ? course.domains : [])],
        });
      }

      const ids = courses.map(course => course.id).filter(Boolean);
      if (ids.length) {
        const { data: lessons, error: lessonError } = await db
          .from('lessons')
          .select('id,course_id,slug,title,description')
          .in('course_id', ids)
          .limit(2000);
        if (lessonError) {
          console.warn('[site-search] Published lesson index unavailable:', lessonError.message);
        } else {
          const courseById = new Map(courses.map(course => [course.id, course]));
          for (const lesson of lessons || []) {
            const course = courseById.get(lesson.course_id);
            if (!course || !lesson.slug || !lesson.title) continue;
            extra.push({
              id: 'lesson:' + course.slug + ':' + lesson.slug,
              type: 'lesson',
              title: lesson.title,
              description: (lesson.description || '') + ' · ' + course.title,
              url: '/courses/' + encodeURIComponent(course.slug) + '?lesson=' + encodeURIComponent(lesson.slug),
              badge: 'LESSON',
              category: course.title,
              tags: [course.title],
            });
          }
        }
      }
    }
  } catch (error) {
    console.warn('[site-search] Could not load public course metadata:', error);
  }

  try {
    const { data: documents, error } = await db
      .from('study_documents')
      .select('id,title,description')
      .eq('is_published', true)
      .eq('collection_slug', 'bug-bounty')
      .is('retired_at', null)
      .limit(200);

    if (!error) {
      for (const document of documents || []) {
        if (!document.id || !document.title) continue;
        extra.push({
          id: 'study-document:' + document.id,
          type: 'study-document',
          title: document.title,
          description: document.description || 'Published cybersecurity study material',
          url: '/study-materials/bug-bounty/' + encodeURIComponent(document.id),
          badge: 'STUDY DOCUMENT',
          tags: ['PDF', 'bug bounty', 'study library'],
        });
      }
    }
  } catch (error) {
    console.warn('[site-search] Could not load public study document metadata:', error);
  }

  return extra;
}

const getPublishedMetadata = unstable_cache(
  readPublishedMetadata,
  ['cybertube-global-search-public-metadata-v1'],
  { revalidate: 300 },
);

function safeInt(value: string | null, fallback: number, maximum: number): number {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.max(1, Math.min(maximum, Math.floor(parsed))) : fallback;
}

export async function GET(request: NextRequest) {
  const q = (request.nextUrl.searchParams.get('q') || '').replace(/[\x00-\x1F\x7F]/g, '').trim();
  if (q.length > 100) {
    return NextResponse.json({ error: 'Search is limited to 100 characters.' }, { status: 400 });
  }

  const page = safeInt(request.nextUrl.searchParams.get('page'), 1, 500);
  const pageSize = safeInt(request.nextUrl.searchParams.get('pageSize'), 10, 50);
  const type = request.nextUrl.searchParams.get('type') || 'all';
  const allowedTypes = new Set([
    'all', 'page', 'course', 'lesson', 'learning-path', 'resource', 'domain',
    'tryhackme-section', 'tryhackme-room', 'skill', 'certification', 'career',
    'glossary', 'cheat-sheet', 'study-document',
  ]);

  if (!allowedTypes.has(type)) {
    return NextResponse.json({ error: 'Unknown search category.' }, { status: 400 });
  }

  const extra = q.length >= 2 ? await getPublishedMetadata().catch(() => []) : [];
  const result = searchCatalogPage(q, { page, pageSize, type, extra });
  return NextResponse.json(
    { query: q, ...result },
    { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } },
  );
}

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { FeedItem, FeedResponse } from '@/lib/discovery/discovery-types';
import { DISCOVERY_CONFIG } from '@/lib/discovery/config';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = (searchParams.get('q') || '').trim();
    const category = searchParams.get('category');
    const topic = searchParams.get('topic');

    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const rawPageSize = parseInt(searchParams.get('pageSize') || String(DISCOVERY_CONFIG.defaultPageSize), 10);
    const pageSize = Math.min(Math.max(1, rawPageSize), DISCOVERY_CONFIG.maxPageSize);

    // Validation: enforce minimum query length
    if (!q || q.length < 2) {
      return NextResponse.json({
        error: 'Search query must be at least 2 characters long.',
        items: [],
        total: 0,
        page,
        pageSize,
        hasMore: false,
      }, { status: 400 });
    }

    const supabase = await createClient();

    if (!supabase) {
      return NextResponse.json<FeedResponse>({
        items: [],
        total: 0,
        page,
        pageSize,
        hasMore: false,
      });
    }

    let query = supabase
      .from('discovery_items')
      .select(`
        id,
        title,
        description,
        url,
        thumbnail_url,
        published_at,
        author,
        content_type,
        discovery_categories ( slug, name ),
        discovery_topics ( slug, name ),
        discovery_sources ( name )
      `, { count: 'exact' })
      .eq('published', true)
      .or(`title.ilike.%${q}%,description.ilike.%${q}%`);

    if (category) {
      query = query.or(`category_id.eq.${category},discovery_categories.slug.eq.${category}`);
    }

    if (topic) {
      query = query.or(`topic_id.eq.${topic},discovery_topics.slug.eq.${topic}`);
    }

    query = query.order('published_at', { ascending: false });

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);

    const { data, count, error } = await query;

    if (error) {
      return NextResponse.json<FeedResponse>({
        items: [],
        total: 0,
        page,
        pageSize,
        hasMore: false,
      });
    }

    const items: FeedItem[] = (data || []).map((row: any) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      url: row.url,
      thumbnail_url: row.thumbnail_url,
      published_at: row.published_at,
      category_slug: row.discovery_categories?.slug || null,
      category_name: row.discovery_categories?.name || null,
      topic_slug: row.discovery_topics?.slug || null,
      topic_name: row.discovery_topics?.name || null,
      author: row.author,
      content_type: row.content_type,
      source_name: row.discovery_sources?.name || null,
    }));

    const total = count || 0;
    const hasMore = from + items.length < total;

    return NextResponse.json<FeedResponse>({
      items,
      total,
      page,
      pageSize,
      hasMore,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}


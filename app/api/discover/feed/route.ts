import { NextRequest, NextResponse } from 'next/server';
import { createClient, getAuthenticatedUser } from '@/lib/supabase/server';
import { FeedItem, FeedResponse, ContentType } from '@/lib/discovery/discovery-types';
import { DISCOVERY_CONFIG } from '@/lib/discovery/config';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const topic = searchParams.get('topic');
    const type = searchParams.get('type') as ContentType | null;
    const tab = searchParams.get('tab') || 'latest';

    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const rawPageSize = parseInt(searchParams.get('pageSize') || String(DISCOVERY_CONFIG.defaultPageSize), 10);
    const pageSize = Math.min(Math.max(1, rawPageSize), DISCOVERY_CONFIG.maxPageSize);

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

    // For You tab: Filter by authenticated user's followed topics
    let userFollowedTopicIds: string[] = [];
    if (tab === 'for-you') {
      const user = await getAuthenticatedUser();
      if (!user) {
        // Guest user viewing For You tab: return empty set prompting authentication/topic following
        return NextResponse.json<FeedResponse>({
          items: [],
          total: 0,
          page,
          pageSize,
          hasMore: false,
        });
      }

      const { data: interestRows } = await supabase
        .from('user_interests')
        .select('topic_id')
        .eq('user_id', user.id);

      if (interestRows && interestRows.length > 0) {
        userFollowedTopicIds = interestRows.map((r: any) => r.topic_id);
      } else {
        // User has not followed any topics yet
        return NextResponse.json<FeedResponse>({
          items: [],
          total: 0,
          page,
          pageSize,
          hasMore: false,
        });
      }
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
      .eq('published', true);

    if (category) {
      // Allow filtering by category slug or UUID
      query = query.or(`category_id.eq.${category},discovery_categories.slug.eq.${category}`);
    }

    if (topic) {
      query = query.or(`topic_id.eq.${topic},discovery_topics.slug.eq.${topic}`);
    }

    if (type) {
      query = query.eq('content_type', type);
    }

    if (tab === 'for-you' && userFollowedTopicIds.length > 0) {
      query = query.in('topic_id', userFollowedTopicIds);
    }

    // Sorting
    query = query.order('published_at', { ascending: false });

    // Pagination
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
    return NextResponse.json({ error: 'Failed to retrieve feed' }, { status: 500 });
  }
}


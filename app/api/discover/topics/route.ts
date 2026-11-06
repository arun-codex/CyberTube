import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { DISCOVERY_TOPICS } from '@/config/discovery-topics';
import { TopicSummary } from '@/lib/discovery/discovery-types';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryFilter = searchParams.get('category');

    const supabase = await createClient();

    if (supabase) {
      let query = supabase
        .from('discovery_topics')
        .select(`
          id,
          slug,
          name,
          description,
          keywords,
          priority,
          enabled,
          category_id,
          discovery_categories ( id, slug )
        `)
        .eq('enabled', true)
        .order('priority', { ascending: true })
        .order('name', { ascending: true });

      const { data, error } = await query;

      if (!error && data && data.length > 0) {
        let topics: TopicSummary[] = data.map((t: any) => ({
          id: t.id,
          category_id: t.category_id,
          category_slug: t.discovery_categories?.slug || '',
          slug: t.slug,
          name: t.name,
          description: t.description,
          keywords: t.keywords || [],
          priority: t.priority,
          enabled: t.enabled,
        }));

        if (categoryFilter) {
          topics = topics.filter(
            (t) => t.category_slug === categoryFilter || t.category_id === categoryFilter
          );
        }

        return NextResponse.json({ topics });
      }
    }

    // Static fallback
    let filteredFallback = DISCOVERY_TOPICS.filter((t) => t.enabled);
    if (categoryFilter) {
      filteredFallback = filteredFallback.filter(
        (t) => t.categoryId === categoryFilter || t.slug === categoryFilter
      );
    }

    const topics: TopicSummary[] = filteredFallback.map((t) => ({
      id: t.id,
      category_id: t.categoryId,
      category_slug: t.categoryId,
      slug: t.slug,
      name: t.name,
      description: t.description,
      keywords: t.keywords,
      priority: t.priority,
      enabled: t.enabled,
    }));

    return NextResponse.json({ topics });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to retrieve topics' }, { status: 500 });
  }
}


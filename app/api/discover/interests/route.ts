import { NextRequest, NextResponse } from 'next/server';
import { createClient, getAuthenticatedUser } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json({ interests: [] });
    }

    const { data, error } = await (supabase as any)
      .from('user_interests')
      .select('topic_id')
      .eq('user_id', user.id);

    if (error) {
      return NextResponse.json({ interests: [] });
    }

    const interests = (data || []).map((row: any) => row.topic_id);
    return NextResponse.json({ interests });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to retrieve interests' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Authentication required to update interests' }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const { interests } = body;

    if (!Array.isArray(interests)) {
      return NextResponse.json({ error: 'Invalid payload: interests must be an array of topic IDs' }, { status: 400 });
    }

    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Database service unavailable' }, { status: 503 });
    }

    // Deduplicate and filter non-string items
    const rawIds = Array.from(new Set(interests.filter((id) => typeof id === 'string' && id.trim().length > 0)));

    // Validate that requested topics exist in discovery_topics (either by UUID id or by slug)
    let validTopicIds: string[] = [];
    if (rawIds.length > 0) {
      const { data: topicRows, error: topicQueryError } = await (supabase as any)
        .from('discovery_topics')
        .select('id, slug')
        .eq('enabled', true);

      if (!topicQueryError && topicRows) {
        const idMap = new Map<string, string>();
        topicRows.forEach((row: any) => {
          idMap.set(row.id, row.id);
          idMap.set(row.slug, row.id);
        });

        rawIds.forEach((rawId) => {
          const resolvedUuid = idMap.get(rawId);
          if (resolvedUuid) {
            validTopicIds.push(resolvedUuid);
          }
        });
        validTopicIds = Array.from(new Set(validTopicIds));
      }
    }

    // Atomic replace: Delete existing user interests for this user, then insert valid ones
    const { error: deleteError } = await (supabase as any)
      .from('user_interests')
      .delete()
      .eq('user_id', user.id);

    if (deleteError) {
      return NextResponse.json({ error: 'Failed to update preferences' }, { status: 500 });
    }

    if (validTopicIds.length > 0) {
      const recordsToInsert = validTopicIds.map((topicId) => ({
        user_id: user.id,
        topic_id: topicId,
      }));

      const { error: insertError } = await (supabase as any)
        .from('user_interests')
        .insert(recordsToInsert);

      if (insertError) {
        return NextResponse.json({ error: 'Failed to save updated interests' }, { status: 500 });
      }
    }

    return NextResponse.json({
      success: true,
      savedCount: validTopicIds.length,
      interests: validTopicIds,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update interests' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { createClient, getAuthenticatedUser } from '@/lib/supabase/server';
import { loadDiscoverSources, personalizeFeed, type FeedPreferences, type WatchSignal } from '@/lib/discovery/live-feed';

export const dynamic = 'force-dynamic';

const tabs = new Set([
  'for-you',
  'latest',
  'all',
  'videos',
  'articles',
  'news',
  'cyber-news',
  'tech-updates',
  'career',
  'growth',
  'research',
  'security-alerts',
  'tools',
  'open-source',
  'popular',
]);

const allowedCategories = new Set([
  '',
  'all',
  'cybersecurity',
  'technology',
  'career',
  'growth',
  'networking',
  'cloud',
  'research',
]);

const allowedMediaFormats = new Set([
  '',
  'all',
  'video',
  'article',
  'resource',
  'job',
  'podcast',
  'event',
]);

const allowedEditorialKinds = new Set([
  '',
  'all',
  'news',
  'security_advisory',
  'tutorial',
  'research',
  'opinion',
  'career_guide',
  'internship',
  'documentation',
  'tool',
  'learning_resource',
]);

const allowedSubjects = new Set([
  '',
  'all',
  'cybersecurity',
  'ethical_hacking',
  'soc_blue_team',
  'digital_forensics',
  'malware_analysis',
  'threat_intelligence',
  'networking',
  'linux',
  'ai_ml',
  'cloud_devops',
  'programming',
  'certifications',
  'career_development',
  'communication_growth',
  'technology',
  'research',
  'uncategorized',
]);

function safeNumber(value: string | null, fallback: number, maximum: number): number {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? Math.min(maximum, Math.floor(number)) : fallback;
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const tab = params.get('tab') || 'for-you';
  const category = (params.get('category') || '').toLowerCase().trim();
  const type = (params.get('type') || params.get('media_format') || '').toLowerCase().trim();
  const kind = (params.get('kind') || params.get('editorial_kind') || '').toLowerCase().trim();
  const subject = (params.get('subject') || params.get('topic') || '').toLowerCase().trim();
  const sort = (params.get('sort') || '').toLowerCase().trim();
  const query = (params.get('q') || '').trim().slice(0, 100);
  const page = safeNumber(params.get('page'), 1, 100);
  const pageSize = safeNumber(params.get('pageSize'), 24, 50);

  // Validate filters
  if (!tabs.has(tab)) {
    return NextResponse.json({ error: 'Invalid discovery tab filter' }, { status: 400 });
  }

  if (category && !allowedCategories.has(category)) {
    return NextResponse.json({ error: 'Invalid discovery category filter' }, { status: 400 });
  }

  if (type && !allowedMediaFormats.has(type)) {
    return NextResponse.json({ error: 'Invalid discovery media format filter' }, { status: 400 });
  }

  if (kind) {
    // Kind can be comma-separated e.g. "tool,documentation"
    const kinds = kind.split(',').map((k) => k.trim());
    for (const k of kinds) {
      if (k && !allowedEditorialKinds.has(k)) {
        return NextResponse.json({ error: 'Invalid discovery editorial kind filter' }, { status: 400 });
      }
    }
  }

  if (subject && !allowedSubjects.has(subject)) {
    return NextResponse.json({ error: 'Invalid discovery subject filter' }, { status: 400 });
  }

  const prefs: FeedPreferences = { interests: [], watchHistory: [] };
  const user = await getAuthenticatedUser();
  if (user) {
    const db = await createClient();
    if (db) {
      const [interests, history] = await Promise.all([
        (db.from('user_interests') as any)
          .select('topic_id,discovery_topics(name,slug,keywords)')
          .eq('user_id', user.id)
          .limit(80),
        (db.from('user_discover_video_progress') as any)
          .select('video_id,category,progress_percent,last_watched_at')
          .eq('user_id', user.id)
          .order('last_watched_at', { ascending: false })
          .limit(250),
      ]);
      if (!interests.error) {
        prefs.interests = (interests.data || []).flatMap((row: any) => {
          const t = row.discovery_topics;
          return t ? [t.slug, ...(t.keywords || [])] : [];
        });
      }
      if (!history.error) {
        prefs.watchHistory = (history.data || []) as WatchSignal[];
      }
    }
  }

  try {
    const source = await loadDiscoverSources();
    const ranked = personalizeFeed(
      source.items,
      {
        tab: tab === 'popular' ? 'for-you' : tab,
        category,
        type,
        kind,
        subject,
        sort,
        query,
        page,
        pageSize,
      },
      prefs
    );

    return NextResponse.json(
      {
        ...ranked,
        tab,
        personalized: Boolean(user) && tab === 'for-you',
        liveSources: source.sourceCount,
        liveItemCount: source.liveCount,
        progress: Object.fromEntries(
          prefs.watchHistory.map((entry) => [
            entry.video_id,
            {
              percent: entry.progress_percent,
              updatedAt: entry.last_watched_at,
            },
          ])
        ),
      },
      {
        headers: { 'Cache-Control': 'private, no-store', Vary: 'Cookie' },
      }
    );
  } catch {
    return NextResponse.json(
      { error: 'Discover feed temporarily unavailable', items: [] },
      { status: 503 }
    );
  }
}

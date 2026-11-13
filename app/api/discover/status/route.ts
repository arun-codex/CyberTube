import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { DISCOVERY_CONFIG } from '@/lib/discovery/config';
import { DISCOVERY_CATEGORIES, DISCOVERY_TOPICS } from '@/config/discovery-topics';
import { DiscoveryStatus } from '@/lib/discovery/discovery-types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = await createClient();

    let totalCategories = DISCOVERY_CATEGORIES.length;
    let totalTopics = DISCOVERY_TOPICS.length;
    let totalItems = 0;
    let lastRefreshAt: string | undefined = undefined;

    if (supabase) {
      // Safe public item count
      const { count: itemsCount } = await supabase
        .from('discovery_items')
        .select('*', { count: 'exact', head: true })
        .eq('published', true);

      if (typeof itemsCount === 'number') {
        totalItems = itemsCount;
      }

      // Safe categories count from DB
      const { count: catCount } = await supabase
        .from('discovery_categories')
        .select('*', { count: 'exact', head: true })
        .eq('enabled', true);

      if (typeof catCount === 'number' && catCount > 0) {
        totalCategories = catCount;
      }

      // Safe topics count from DB
      const { count: topCount } = await supabase
        .from('discovery_topics')
        .select('*', { count: 'exact', head: true })
        .eq('enabled', true);

      if (typeof topCount === 'number' && topCount > 0) {
        totalTopics = topCount;
      }
    }

    const status: DiscoveryStatus = {
      enabled: DISCOVERY_CONFIG.enabled,
      automatedRefreshEnabled: DISCOVERY_CONFIG.automatedRefreshEnabled,
      automatedYouTubeDiscoveryEnabled: DISCOVERY_CONFIG.automatedYouTubeDiscoveryEnabled,
      allowPaidServices: DISCOVERY_CONFIG.allowPaidServices,
      lastRefreshAt,
      totalCategories,
      totalTopics,
      totalItems,
    };

    return NextResponse.json(status);
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to retrieve discovery status' }, { status: 500 });
  }
}


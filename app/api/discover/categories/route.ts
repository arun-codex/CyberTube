import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { DISCOVERY_CATEGORIES } from '@/config/discovery-topics';
import { CategorySummary } from '@/lib/discovery/discovery-types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = await createClient();

    if (supabase) {
      const { data, error } = await supabase
        .from('discovery_categories')
        .select('id, slug, name, description, icon, enabled')
        .eq('enabled', true)
        .order('name', { ascending: true });

      if (!error && data && data.length > 0) {
        const categories: CategorySummary[] = data.map((c: any) => ({
          id: c.id,
          slug: c.slug,
          name: c.name,
          description: c.description,
          icon: c.icon,
          enabled: c.enabled,
        }));

        return NextResponse.json({ categories });
      }
    }

    // Static fallback if database table not yet populated or offline
    const fallbackCategories: CategorySummary[] = DISCOVERY_CATEGORIES.filter((c) => c.enabled).map((c) => ({
      id: c.id,
      slug: c.slug,
      name: c.name,
      description: c.description,
      icon: c.icon,
      enabled: c.enabled,
    }));

    return NextResponse.json({ categories: fallbackCategories });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to retrieve discovery categories' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { DISCOVERY_CATEGORIES } from '@/config/discovery-topics';

export async function GET() {
  // In a real implementation this would query Supabase, but for Phase 22 we return the static config.
  const enabled = DISCOVERY_CATEGORIES.filter(c => c.enabled);
  return NextResponse.json({ categories: enabled });
}


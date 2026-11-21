import { NextRequest, NextResponse } from 'next/server';
import { GET as feedGET } from '../feed/route';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q');
  // If search query is provided and less than 2 characters, return 400 with error property
  if (query !== null && query.trim().length < 2) {
    return NextResponse.json(
      { error: 'Search query must be at least 2 characters long' },
      { status: 400 }
    );
  }

  return feedGET(request);
}

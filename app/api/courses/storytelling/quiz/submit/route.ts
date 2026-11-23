import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function replyRetired() {
  return NextResponse.json(
    {
      error: 'Storytelling Masterclass quiz functionality has been permanently retired. All modules and lessons are accessible without prerequisite quiz scores.',
      retired: true,
    },
    { status: 410, headers: { 'Cache-Control': 'no-store' } }
  );
}

export async function POST() {
  return replyRetired();
}

export async function GET() {
  return replyRetired();
}

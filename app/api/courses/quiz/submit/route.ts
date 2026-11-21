import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function replyRetired() {
  return NextResponse.json(
    {
      error: 'Quiz functionality has been permanently retired. All courses and lessons are freely accessible without quizzes.',
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

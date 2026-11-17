import { NextRequest, NextResponse } from 'next/server';
import { searchStudyDocuments } from '@/lib/pdf/library-search';

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') || '';
  const limitParam = req.nextUrl.searchParams.get('limit');
  const limit = limitParam ? Math.min(50, Math.max(1, parseInt(limitParam, 10))) : 20;

  const result = searchStudyDocuments(q, limit);
  return NextResponse.json(result);
}

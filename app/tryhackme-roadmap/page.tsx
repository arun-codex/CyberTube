import { redirect } from 'next/navigation';

interface Props {
  searchParams: Promise<{ q?: string; section?: string }>;
}

// Keep old links and bookmarks working; the explorer now lives in Practical Labs.
export default async function LegacyTryHackMeRoadmap({ searchParams }: Props) {
  const query = await searchParams;
  const params = new URLSearchParams();
  if (query.q) params.set('q', query.q);
  if (query.section) params.set('section', query.section);
  redirect('/labs' + (params.size ? '?' + params.toString() : '#tryhackme'));
}

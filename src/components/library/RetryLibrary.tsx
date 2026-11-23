'use client';

import { useRouter } from 'next/navigation';

export function RetryLibrary() {
  const router = useRouter();
  return <button type="button" className="underline" onClick={() => router.refresh()}>Retry library</button>;
}

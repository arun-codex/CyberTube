'use client';

export default function ErrorView({ reset }: { reset: () => void }) {
  return <section className="container-max space-y-4 py-10"><h1 className="text-3xl font-bold">Study library</h1>
    <p role="alert">This page could not load.</p><button className="underline" onClick={reset}>Try again</button></section>;
}

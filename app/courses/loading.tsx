export default function Loading() {
  return (
    <div className="container-max py-10 space-y-8 animate-pulse" aria-busy="true" aria-label="Loading course catalog">
      <div className="h-32 rounded-lg border border-[var(--border)] bg-[var(--surface-subtle)]" />
      <div className="flex gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-9 w-28 rounded-lg bg-[var(--surface-subtle)]" />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-80 rounded-lg border border-[var(--border)] bg-[var(--surface-subtle)]" />
        ))}
      </div>
    </div>
  );
}

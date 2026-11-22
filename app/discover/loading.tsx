export default function Loading() {
  return (
    <div className="container-max py-8 space-y-6 animate-pulse" aria-busy="true" aria-label="Loading discovery feed">
      <div className="h-28 rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)]" />
      <div className="flex gap-2 overflow-x-auto pb-1">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-9 w-24 shrink-0 rounded-lg bg-[var(--surface-subtle)]" />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-64 rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)]" />
        ))}
      </div>
    </div>
  );
}

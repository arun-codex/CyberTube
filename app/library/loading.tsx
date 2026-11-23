export default function Loading() {
  return (
    <div className="container-max py-8 space-y-8 animate-pulse" aria-busy="true" aria-label="Loading study library">
      <div className="h-28 rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)]" />
      <div className="flex gap-2 max-w-xl">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-10 flex-1 rounded-lg bg-[var(--surface-subtle)]" />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-48 rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)]" />
        ))}
      </div>
    </div>
  );
}

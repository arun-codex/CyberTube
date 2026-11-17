const { performance } = require('perf_hooks');
const { searchStudyDocuments } = require('../src/lib/pdf/library-search');

console.log('================================================================');
console.log('CYBERTUBE PERFORMANCE BENCHMARK RECORD');
console.log('PDF Search & Loading Engine');
console.log('================================================================\n');

// 1. Full-Text Search across all 34 PDFs Benchmark
const queries = [
  'bypass',
  'authentication',
  'vulnerability',
  'SQL injection',
  'idor',
  'privilege escalation',
  'cross-site',
  'reconnaissance',
  'subdomain',
  'token',
];

console.log('--- 1. Library-Wide PDF Full-Text Search Performance (34 Documents, 138 Pages) ---');
console.log('Query                       | Matching Docs | Matching Pages | Total Hits | Exec Time (ms)');
console.log('----------------------------|---------------|----------------|------------|---------------');

const latencies = [];
for (const q of queries) {
  // Warmup run
  searchStudyDocuments(q);

  const start = performance.now();
  const res = searchStudyDocuments(q);
  const elapsed = performance.now() - start;
  latencies.push(elapsed);

  console.log(
    `${q.padEnd(28)}| ${String(res.totalMatchingDocuments).padStart(13)} | ${String(res.totalMatchingPages).padStart(14)} | ${String(res.results.reduce((s, r) => s + r.totalMatches, 0)).padStart(10)} | ${elapsed.toFixed(3).padStart(13)} ms`
  );
}

const avgLatency = latencies.reduce((a, b) => a + b, 0) / latencies.length;
const minLatency = Math.min(...latencies);
const maxLatency = Math.max(...latencies);

console.log('----------------------------------------------------------------');
console.log(`Summary: Min: ${minLatency.toFixed(3)} ms | Max: ${maxLatency.toFixed(3)} ms | Avg: ${avgLatency.toFixed(3)} ms\n`);

// 2. High-Throughput Search Benchmark (1,000 queries)
console.log('--- 2. High-Throughput Stress Test (1,000 consecutive searches) ---');
const stressStart = performance.now();
const ITERATIONS = 1000;
for (let i = 0; i < ITERATIONS; i++) {
  const q = queries[i % queries.length];
  searchStudyDocuments(q);
}
const stressElapsed = performance.now() - stressStart;
const qps = (ITERATIONS / (stressElapsed / 1000)).toFixed(0);
console.log(`Executed ${ITERATIONS} multi-document searches in ${stressElapsed.toFixed(2)} ms (${(stressElapsed / ITERATIONS).toFixed(4)} ms/op)`);
console.log(`Throughput: ${qps} searches / second\n`);

// Browser loading and cloud latency must be measured against a running app.
console.log('PDF loading, Continue Reading, and cloud sync latency: NOT MEASURED by this search benchmark.');

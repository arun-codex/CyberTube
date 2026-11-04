const fs = require('fs');
const data = JSON.parse(fs.readFileSync('reports/lighthouse-audit-summary.json', 'utf8'));

console.log('=== DESKTOP MEDIANS ===');
for (const [route, res] of Object.entries(data.desktop)) {
  const m = res.median;
  console.log(`${route.padEnd(16)} | Perf: ${String(m.performance).padStart(3)} | A11y: ${String(m.accessibility).padStart(3)} | BP: ${String(m.bestPractices).padStart(3)} | SEO: ${String(m.seo).padStart(3)} | FCP: ${String(m.fcp).padStart(4)}ms | LCP: ${String(m.lcp).padStart(4)}ms | CLS: ${m.cls} | TBT: ${String(m.tbt).padStart(3)}ms | Size: ${String(m.transferSizeKb).padStart(4)}KB`);
}

console.log('\n=== MOBILE MEDIANS ===');
for (const [route, res] of Object.entries(data.mobile)) {
  const m = res.median;
  console.log(`${route.padEnd(16)} | Perf: ${String(m.performance).padStart(3)} | A11y: ${String(m.accessibility).padStart(3)} | BP: ${String(m.bestPractices).padStart(3)} | SEO: ${String(m.seo).padStart(3)} | FCP: ${String(m.fcp).padStart(4)}ms | LCP: ${String(m.lcp).padStart(4)}ms | CLS: ${m.cls} | TBT: ${String(m.tbt).padStart(3)}ms | Size: ${String(m.transferSizeKb).padStart(4)}KB`);
}


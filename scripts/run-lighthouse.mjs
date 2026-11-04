import fs from 'fs';
import path from 'path';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const ROUTES = [
  { name: 'Home', path: '/' },
  { name: 'Courses', path: '/courses' },
  { name: 'Course Detail', path: '/courses/network-packet-analysis-masterclass' },
  { name: 'Discover', path: '/discover' },
  { name: 'Resource Detail', path: '/resources/portswigger-sql-injection-lab' },
  { name: 'Login', path: '/login' },
  { name: 'Account', path: '/account' }
];

const BASE_URL = 'http://localhost:3000';
const RUNS_PER_ROUTE = 3;

function median(values) {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

async function runAudit() {
  console.log('Starting automated Lighthouse audit runs (3 runs per route for Desktop & Mobile)...');
  
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox']
  });

  const allResults = {
    timestamp: new Date().toISOString(),
    desktop: {},
    mobile: {}
  };

  try {
    for (const route of ROUTES) {
      console.log(`\n========================================`);
      console.log(`Auditing Route: ${route.name} (${route.path})`);
      console.log(`========================================`);

      // 1. Desktop Runs
      const desktopRuns = [];
      for (let i = 1; i <= RUNS_PER_ROUTE; i++) {
        console.log(`  [Desktop] Run ${i}/${RUNS_PER_ROUTE}...`);
        const runnerResult = await lighthouse(`${BASE_URL}${route.path}`, {
          port: chrome.port,
          output: 'json',
          logLevel: 'error',
          onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
          formFactor: 'desktop',
          screenEmulation: {
            mobile: false,
            width: 1350,
            height: 940,
            deviceScaleFactor: 1,
            disabled: false,
          },
          throttling: {
            rttMs: 40,
            throughputKbps: 10240,
            cpuSlowdownMultiplier: 1,
            requestLatencyMs: 0,
            downloadThroughputKbps: 0,
            uploadThroughputKbps: 0
          }
        });

        const lhr = runnerResult.lhr;
        desktopRuns.push({
          performance: Math.round((lhr.categories.performance?.score || 0) * 100),
          accessibility: Math.round((lhr.categories.accessibility?.score || 0) * 100),
          bestPractices: Math.round((lhr.categories['best-practices']?.score || 0) * 100),
          seo: Math.round((lhr.categories.seo?.score || 0) * 100),
          fcp: Math.round(lhr.audits['first-contentful-paint']?.numericValue || 0),
          lcp: Math.round(lhr.audits['largest-contentful-paint']?.numericValue || 0),
          cls: parseFloat((lhr.audits['cumulative-layout-shift']?.numericValue || 0).toFixed(3)),
          tbt: Math.round(lhr.audits['total-blocking-time']?.numericValue || 0),
          transferSize: Math.round((lhr.audits['total-byte-weight']?.numericValue || 0) / 1024) // KB
        });
      }

      allResults.desktop[route.name] = {
        runs: desktopRuns,
        median: {
          performance: median(desktopRuns.map(r => r.performance)),
          accessibility: median(desktopRuns.map(r => r.accessibility)),
          bestPractices: median(desktopRuns.map(r => r.bestPractices)),
          seo: median(desktopRuns.map(r => r.seo)),
          fcp: median(desktopRuns.map(r => r.fcp)),
          lcp: median(desktopRuns.map(r => r.lcp)),
          cls: median(desktopRuns.map(r => r.cls)),
          tbt: median(desktopRuns.map(r => r.tbt)),
          transferSizeKb: median(desktopRuns.map(r => r.transferSize))
        }
      };

      // 2. Mobile Runs
      const mobileRuns = [];
      for (let i = 1; i <= RUNS_PER_ROUTE; i++) {
        console.log(`  [Mobile] Run ${i}/${RUNS_PER_ROUTE}...`);
        const runnerResult = await lighthouse(`${BASE_URL}${route.path}`, {
          port: chrome.port,
          output: 'json',
          logLevel: 'error',
          onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
          formFactor: 'mobile',
          screenEmulation: {
            mobile: true,
            width: 412,
            height: 823,
            deviceScaleFactor: 1.75,
            disabled: false,
          }
        });

        const lhr = runnerResult.lhr;
        mobileRuns.push({
          performance: Math.round((lhr.categories.performance?.score || 0) * 100),
          accessibility: Math.round((lhr.categories.accessibility?.score || 0) * 100),
          bestPractices: Math.round((lhr.categories['best-practices']?.score || 0) * 100),
          seo: Math.round((lhr.categories.seo?.score || 0) * 100),
          fcp: Math.round(lhr.audits['first-contentful-paint']?.numericValue || 0),
          lcp: Math.round(lhr.audits['largest-contentful-paint']?.numericValue || 0),
          cls: parseFloat((lhr.audits['cumulative-layout-shift']?.numericValue || 0).toFixed(3)),
          tbt: Math.round(lhr.audits['total-blocking-time']?.numericValue || 0),
          transferSize: Math.round((lhr.audits['total-byte-weight']?.numericValue || 0) / 1024)
        });
      }

      allResults.mobile[route.name] = {
        runs: mobileRuns,
        median: {
          performance: median(mobileRuns.map(r => r.performance)),
          accessibility: median(mobileRuns.map(r => r.accessibility)),
          bestPractices: median(mobileRuns.map(r => r.bestPractices)),
          seo: median(mobileRuns.map(r => r.seo)),
          fcp: median(mobileRuns.map(r => r.fcp)),
          lcp: median(mobileRuns.map(r => r.lcp)),
          cls: median(mobileRuns.map(r => r.cls)),
          tbt: median(mobileRuns.map(r => r.tbt)),
          transferSizeKb: median(mobileRuns.map(r => r.transferSize))
        }
      };
    }

    const outDir = path.resolve('reports');
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }
    const outFile = path.join(outDir, 'lighthouse-audit-summary.json');
    fs.writeFileSync(outFile, JSON.stringify(allResults, null, 2), 'utf8');
    console.log(`\nAudit completed successfully! Results written to ${outFile}`);
  } finally {
    await chrome.kill();
  }
}

runAudit().catch(err => {
  console.error('Lighthouse audit runner failed:', err);
  process.exit(1);
});


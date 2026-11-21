import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { NextRequest } from 'next/server';

let getPrivatePdf: typeof import('../app/api/study-materials/[docId]/pdf/route').GET;
let preflightPrivatePdf: typeof import('../app/api/study-materials/[docId]/pdf/route').OPTIONS;
let getVersion: typeof import('../app/api/version/route').GET;

test.before(async () => {
  // The server-only import guard is for Next.js's client/server module graph.
  // Isolate it in this server-side Node regression suite as the existing
  // study-library tests do, without mocking auth or storage behavior.
  try {
    const modulePath = require.resolve('server-only');
    require.cache[modulePath] = {
      exports: {}, id: modulePath, filename: modulePath,
      loaded: true, children: [], paths: [],
    } as any;
  } catch {}
  const pdf = await import('../app/api/study-materials/[docId]/pdf/route');
  getPrivatePdf = pdf.GET;
  preflightPrivatePdf = pdf.OPTIONS;
  getVersion = (await import('../app/api/version/route')).GET;
});

const read = (path: string) => readFileSync(path, 'utf8');

test('F02: foreign Origin is rejected without credentialed CORS', async () => {
  const request = new NextRequest('https://cybertube-mu.vercel.app/api/study-materials/123/pdf', {
    headers: { Origin: 'https://untrusted.example' },
  });
  const options = await preflightPrivatePdf(request);
  assert.equal(options.status, 405);
  assert.equal(options.headers.get('allow'), 'GET');
  assert.equal(options.headers.get('access-control-allow-origin'), null);
  assert.equal(options.headers.get('access-control-allow-credentials'), null);

  const get = await getPrivatePdf(request, { params: Promise.resolve({ docId: '123' }) });
  assert.equal(get.status, 403);
  assert.equal(get.headers.get('access-control-allow-origin'), null);
  assert.equal(get.headers.get('access-control-allow-credentials'), null);
  assert.equal(get.headers.get('cache-control'), 'no-store');
});

test('F02: same-origin preflight has no cross-origin exposure', async () => {
  const req = new NextRequest('https://cybertube-mu.vercel.app/api/study-materials/123/pdf', {
    headers: { Origin: 'https://cybertube-mu.vercel.app' },
  });
  const response = await preflightPrivatePdf(req);
  assert.equal(response.status, 405);
  assert.equal(response.headers.get('allow'), 'GET');
  assert.equal(response.headers.get('access-control-allow-origin'), null);
  assert.equal(response.headers.get('access-control-allow-credentials'), null);
});

test('F03: version endpoint is read-only and only emits public release metadata', async () => {
  const response = await getVersion();
  assert.equal(response.status, 200);
  assert.match(response.headers.get('cache-control') || '', /(?:^|[,\s])no-store(?:$|[,\s])/);
  const payload = await response.json();
  assert.equal(payload.application, 'CyberTube');
  assert.ok(Object.prototype.hasOwnProperty.call(payload, 'commitSha'));
  assert.ok(Object.prototype.hasOwnProperty.call(payload, 'buildTimestamp'));
  assert.ok(Object.prototype.hasOwnProperty.call(payload, 'deploymentEnvironment'));
  assert.ok(!('secrets' in payload));
  assert.ok(!('supabaseKey' in payload));
});

test('F04: admin actions target implemented routes and have no fabricated fallback', () => {
  const page = read('app/admin/page.tsx');
  assert.ok(page.includes('href="/admin/study-materials"'));
  // Both destinations were implemented after the initial audit.
  assert.ok(page.includes('href="/admin/resources/new"'));
  assert.ok(page.includes('href="/admin/submissions"'));
  assert.ok(read('app/admin/resources/new/page.tsx').includes('isAuthorizedAdminEmail'));
  assert.ok(read('app/admin/submissions/page.tsx').includes('isAuthorizedAdminEmail'));
  assert.ok(!page.includes('length || 22'));
});

test('F05/F12: discover iframe sizing and empty curriculum module handling', () => {
  const player = read('src/components/discovery/DiscoverVideoPlayer.tsx');
  assert.ok(player.includes("width:'100%'"));
  assert.ok(player.includes("height:'100%'"));
  assert.ok(player.includes('data-testid="discover-player-viewport"'));
  const courses = read('src/lib/courses.ts');
  assert.ok(courses.includes('m.lessons.length > 0 || Boolean(m.quiz || m.practicalLab || m.capstoneAssessment)'));
});

test('F06/F10/F11/F17: truthful status, copy, canonical robots and noindex preview', () => {
  const feedStatus = read('app/api/discover/status/route.ts');
  assert.ok(feedStatus.includes("feedSource: 'runtime'"));
  assert.ok(feedStatus.includes('totalItemsIncludesRuntimeFeed: false'));
  const robots = read('public/robots.txt');
  assert.ok(robots.includes('Sitemap: https://cybertube-mu.vercel.app/sitemap.xml'));
  const footer = read('src/components/Footer.tsx');
  assert.ok(!footer.includes('WCAG 2.2 AA'));
  assert.ok(!footer.includes('Content verified November 2026.'));
  assert.ok(read('app/typography-preview/page.tsx').includes('robots: { index: false, follow: false }'));
});

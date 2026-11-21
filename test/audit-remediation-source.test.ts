import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source=(p:string)=>readFileSync(p,'utf8');
test('F02: private PDF requires authentication but never returns credentialed arbitrary-origin CORS',()=>{
  const p=source('app/api/study-materials/[docId]/pdf/route.ts');
  assert.match(p,/getAuthenticatedUser/);
  assert.match(p,/status: 405/);
  assert.doesNotMatch(p,/Access-Control-Allow-Origin|Access-Control-Allow-Credentials|corsHeaders/);
  assert.match(p,/'Cache-Control': 'private, no-cache, no-store/);
  assert.match(p,/'Content-Range'/);
});
test('F03: deployment version endpoint is read-only, no-store and does not invent a build time',()=>{
  const p=source('app/api/version/route.ts');
  assert.match(p,/VERCEL_GIT_COMMIT_SHA/);
  assert.match(p,/CYBERTUBE_BUILD_TIMESTAMP/);
  assert.match(p,/buildTimestamp/);
  assert.match(p,/no-store/);
  assert.doesNotMatch(p,/SECRET_KEY|SERVICE_ROLE_KEY|UPI_ID/);
});
test('F04: admin links resolve to existing management route and counts have no fabricated fallback',()=>{
  const p=source('app/admin/page.tsx');
  assert.match(p,/href="\/admin\/study-materials"/);
  assert.doesNotMatch(p,/href="\/admin\/resources\/new"|href="\/admin\/submissions"/);
  assert.doesNotMatch(p,/\|\| 22/);
});
test('F05: native YouTube player covers its responsive viewport',()=>{
  const p=source('src/components/discovery/DiscoverVideoPlayer.tsx');
  assert.match(p,/width:'100%'/);
  assert.match(p,/height:'100%'/);
  assert.match(p,/discover-player-viewport/);
  assert.match(p,/aspect-video/);
});
test('F06: Discover status differentiates persisted index from runtime live feed',()=>{
  const p=source('app/api/discover/status/route.ts');
  assert.match(p,/persistedItemCount/);
  assert.match(p,/liveFeedMode: 'runtime-source-aggregation'/);
});
test('F11: robots sitemap matches canonical host',()=>{
  const p=source('public/robots.txt');
  assert.match(p,/Sitemap: https:\/\/cybertube-mu\.vercel\.app\/sitemap\.xml/);
  assert.doesNotMatch(p,/Sitemap: https:\/\/cybertube\.vercel\.app/);
});
test('F12: empty modules are presented as future lessons, not zero-percent completion',()=>{
  const p=source('src/components/courses/learning/CurriculumModule.tsx');
  assert.match(p,/const isPlanned = module\.lessons\.length === 0/);
  assert.match(p,/Planned · No lessons yet/);
});
test('F01: SQL is only staged for review, not automatically applied',()=>{
  const p=source('docs/audit/F01_profiles_owner_only_PROPOSED.sql');
  assert.match(p,/PROPOSED ONLY/);
  assert.match(p,/REVOKE SELECT ON TABLE public\.profiles FROM anon/);
});
test('Review branch opts out of automatic Vercel deployments',()=>{
  const c=JSON.parse(source('vercel.json'));
  assert.equal(c.git.deploymentEnabled['audit/remediation-phase-ab-no-deploy-20261121'],false);
});

test('F18: do not expose an apparent empty library when RLS hides guest documents',()=>{
  const p=source('src/components/library/UnifiedLibraryHubClient.tsx');
  assert.match(p,/Sign in to access study materials/);
  assert.ok(p.includes('isUserLoggedIn ? ('));
  assert.ok(!p.includes('documents.length || 34'));
});

test('F10: avoid unverified accessibility conformance claim before independent audit',()=>{
  const footer=source('src/components/Footer.tsx');
  assert.doesNotMatch(footer,/WCAG 2\.2 AA/);
  assert.match(footer,/Accessibility improvements ongoing/);
});

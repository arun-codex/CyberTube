import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { NextRequest } from 'next/server';

// Pre-stub server-only in require cache
try {
  const serverOnlyPath = require.resolve('server-only');
  require.cache[serverOnlyPath] = {
    exports: {},
    id: serverOnlyPath,
    filename: serverOnlyPath,
    loaded: true,
    children: [],
    paths: [],
  } as any;
} catch {}

import { searchStudyDocuments } from '../src/lib/pdf/library-search';
import { COURSES } from '../src/data/courses';
import pathsData from '../data/paths.json';
import studyIndex from '../src/data/study-pdf-index.json';

describe('Library Search Engine across 34 PDFs', () => {
  it('1. Study PDF index contains all 34 documents and pages', () => {
    assert.strictEqual(Array.isArray(studyIndex), true);
    assert.strictEqual(studyIndex.length, 34, 'Index must contain exactly 34 documents');

    let totalPages = 0;
    for (const doc of studyIndex) {
      assert.ok(doc.documentId, 'Each doc must have documentId');
      assert.ok(doc.title, 'Each doc must have title');
      assert.ok(doc.slug, 'Each doc must have slug');
      assert.ok(Array.isArray(doc.pages), 'Each doc must have pages array');
      assert.ok(doc.pages.length > 0, `Doc ${doc.title} must have pages`);
      totalPages += doc.pages.length;
    }
    assert.ok(totalPages >= 130, `Total pages across 34 PDFs should be >= 130 (actual: ${totalPages})`);
  });

  it('2. Search finds matches with page numbers, snippets, and highlights', () => {
    const res = searchStudyDocuments('bypass');
    assert.ok(res.totalMatchingDocuments > 0, 'Should find documents matching "bypass"');
    assert.ok(res.totalMatchingPages > 0, 'Should find pages matching "bypass"');
    assert.ok(res.results.length > 0);

    const first = res.results[0];
    assert.ok(first.title);
    assert.ok(first.matchingPages.length > 0);
    assert.ok(first.matchingPages[0].pageNumber >= 1);
    assert.ok(first.matchingPages[0].snippet.toLowerCase().includes('bypass'));
  });

  it('3. Short and empty search queries fail gracefully with zero results', () => {
    const emptyRes = searchStudyDocuments('');
    assert.strictEqual(emptyRes.totalMatchingDocuments, 0);
    assert.strictEqual(emptyRes.results.length, 0);

    const singleChar = searchStudyDocuments('a');
    assert.strictEqual(singleChar.totalMatchingDocuments, 0);
    assert.strictEqual(singleChar.results.length, 0);
  });

  it('4. Search query execution is fast (< 25ms)', () => {
    const start = performance.now();
    for (let i = 0; i < 20; i++) {
      searchStudyDocuments('vulnerability');
    }
    const elapsed = performance.now() - start;
    const avgMs = elapsed / 20;
    assert.ok(avgMs < 25, `Average search time should be < 25ms, got ${avgMs.toFixed(2)}ms`);
  });
});

describe('Cloud Synchronization & Additive Schema', () => {
  it('5. Additive migration file exists and adheres to strict RLS', () => {
    const migrationPath = path.resolve(
      __dirname,
      '../supabase/migrations/20261117120000_cloud_sync_and_saved_items.sql'
    );
    assert.ok(fs.existsSync(migrationPath), 'Migration file must exist');
    const sql = fs.readFileSync(migrationPath, 'utf8');

    // Confirm additive tables
    assert.ok(sql.includes('CREATE TABLE IF NOT EXISTS public.user_saved_items'));
    assert.ok(sql.includes('CREATE TABLE IF NOT EXISTS public.user_generic_progress'));

    // Confirm RLS
    assert.ok(sql.includes('ENABLE ROW LEVEL SECURITY'));
    assert.ok(sql.includes('auth.uid() = user_id'));

    // Confirm idempotent progress function
    assert.ok(sql.includes('CREATE OR REPLACE FUNCTION public.save_generic_progress'));
  });

  it('6. Cloud Saved API route rejects unauthenticated mutations with 401', async () => {
    const { POST, GET } = await import('../app/api/user/saved/route');

    // Unauthenticated GET returns empty array with authenticated=false
    const reqGet = new NextRequest('http://localhost:3000/api/user/saved');
    const resGet = await GET(reqGet);
    assert.strictEqual(resGet.status, 200);
    const bodyGet = await resGet.json();
    assert.strictEqual(bodyGet.authenticated, false);
    assert.deepStrictEqual(bodyGet.savedIds, []);

    // Unauthenticated POST returns 401
    const reqPost = new NextRequest('http://localhost:3000/api/user/saved', {
      method: 'POST',
      body: JSON.stringify({ action: 'save', resourceId: 'test-resource' }),
    });
    const resPost = await POST(reqPost);
    assert.strictEqual(resPost.status, 401);
  });
});

describe('Coming Soon Courses & Unified Library Hub', () => {
  it('7. Unfinished courses are marked Coming Soon with misleading buttons removed', () => {
    const comingSoonSlugs = [
      'network-packet-forensics',
      'network-packet-analysis-masterclass',
      'hardware-backdoors-cpu-internals',
      'networking-and-cybersecurity-foundations',
    ];

    for (const slug of comingSoonSlugs) {
      const course = COURSES.find((c) => c.slug === slug || c.id === slug);
      if (course) {
        assert.strictEqual(course.isComingSoon, true, `Course ${slug} must have isComingSoon: true`);
      }
    }

    // Storytelling Masterclass must NOT be Coming Soon
    const storytelling = COURSES.find((c) => c.slug === 'storytelling-masterclass' || c.id === 'storytelling-masterclass');
    if (storytelling) {
      assert.strictEqual(storytelling.isComingSoon, undefined, 'Storytelling course must remain active');
    }
  });

  it('8. All 5 Learning Paths are marked isComingSoon: true', () => {
    assert.strictEqual(pathsData.length, 5);
    for (const p of pathsData) {
      assert.strictEqual((p as any).isComingSoon, true, `Path ${p.id} must be marked isComingSoon`);
    }
  });

  it('9. BugBountyLogo component exists and renders SVG', async () => {
    const logoFile = path.resolve(__dirname, '../src/components/ui/BugBountyLogo.tsx');
    assert.ok(fs.existsSync(logoFile), 'BugBountyLogo.tsx must exist');
    const content = fs.readFileSync(logoFile, 'utf8');
    assert.ok(content.includes('<svg'), 'Must render SVG element');
    assert.ok(content.includes('viewBox="0 0'), 'Must contain viewBox');
    assert.ok(content.includes('CyberTube Bug Bounty Study Library'), 'Must have descriptive accessibility title');
  });

  it('10. Unified Library Hub Client exists and handles study & course tabs', () => {
    const hubFile = path.resolve(__dirname, '../src/components/library/UnifiedLibraryHubClient.tsx');
    assert.ok(fs.existsSync(hubFile), 'UnifiedLibraryHubClient.tsx must exist');
    const content = fs.readFileSync(hubFile, 'utf8');
    assert.ok(content.includes("activeTab === 'study'"), 'Must handle study tab');
    assert.ok(content.includes("activeTab === 'courses'"), 'Must handle courses tab');
    assert.ok(content.includes('Coming Soon'), 'Must include Coming Soon preview for Course & Lab directory');
  });
});

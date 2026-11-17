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

import { searchDocumentPagesInMemory, createSnippet } from '../src/lib/pdf/library-search';
import { COURSES } from '../src/data/courses';
import pathsData from '../data/paths.json';

describe('Authenticated Server-Side Study Search Security', () => {
  it('1. Raw private PDF index JSON does NOT exist in public repository', () => {
    const rawIndexPath = path.resolve(__dirname, '../src/data/study-pdf-index.json');
    assert.strictEqual(
      fs.existsSync(rawIndexPath),
      false,
      'src/data/study-pdf-index.json must NOT exist in the repository'
    );

    const gitignorePath = path.resolve(__dirname, '../.gitignore');
    const gitignore = fs.readFileSync(gitignorePath, 'utf8');
    assert.ok(gitignore.includes('study-pdf-index'), '.gitignore must prevent committing PDF search index JSON');
  });

  it('2. Search helper performs safe in-memory search and snippet extraction', () => {
    const mockDocs = [
      {
        documentId: 'doc-1',
        title: 'Authentication & Session Security',
        slug: 'auth-security',
        categoryId: 'cat-1',
        pageCount: 3,
        pages: [
          { pageNumber: 1, text: 'Introduction to cookie security and SameSite attributes.' },
          { pageNumber: 2, text: 'JWT signature bypass techniques and token verification flaws.' },
          { pageNumber: 3, text: 'Session fixation and remediation recommendations.' },
        ],
      },
    ];

    const res = searchDocumentPagesInMemory(mockDocs, 'bypass');
    assert.strictEqual(res.totalMatchingDocuments, 1);
    assert.strictEqual(res.totalMatchingPages, 1);
    assert.strictEqual(res.results.length, 1);

    const first = res.results[0];
    assert.strictEqual(first.documentId, 'doc-1');
    assert.strictEqual(first.matchingPages[0].pageNumber, 2);
    assert.ok(first.matchingPages[0].snippet.toLowerCase().includes('bypass'));
  });

  it('3. Short and empty search queries return zero results cleanly', () => {
    const emptyRes = searchDocumentPagesInMemory([], '');
    assert.strictEqual(emptyRes.totalMatchingDocuments, 0);
    assert.strictEqual(emptyRes.results.length, 0);

    const singleChar = searchDocumentPagesInMemory([], 'a');
    assert.strictEqual(singleChar.totalMatchingDocuments, 0);
    assert.strictEqual(singleChar.results.length, 0);
  });

  it('4. Authenticated search route rejects unauthenticated requests with HTTP 401', async () => {
    const { GET } = await import('../app/api/study-materials/search/route');

    const reqUnauth = new NextRequest('http://localhost:3000/api/study-materials/search?q=bypass');
    const resUnauth = await GET(reqUnauth);

    assert.strictEqual(resUnauth.status, 401, 'Unauthenticated search must return 401 Unauthorized');
    const body = await resUnauth.json();
    assert.ok(body.error?.includes('Unauthorized'), 'Error message must reflect authentication requirement');
  });

  it('5. Authenticated search migration enforces Row-Level Security on page text', () => {
    const migrationPath = path.resolve(
      __dirname,
      '../supabase/migrations/20261117130000_authenticated_study_search.sql'
    );
    assert.ok(fs.existsSync(migrationPath), 'Migration 20261117130000_authenticated_study_search.sql must exist');
    const sql = fs.readFileSync(migrationPath, 'utf8');

    assert.ok(sql.includes('CREATE TABLE IF NOT EXISTS public.study_document_page_text'));
    assert.ok(sql.includes('ALTER TABLE public.study_document_page_text ENABLE ROW LEVEL SECURITY'));
    assert.ok(sql.includes('REVOKE ALL ON public.study_document_page_text FROM anon, PUBLIC'));
    assert.ok(sql.includes('GRANT SELECT ON public.study_document_page_text TO authenticated'));
    assert.ok(sql.includes('CREATE OR REPLACE FUNCTION public.search_study_page_text'));
  });
});

describe('Cloud Synchronization Architecture & Assessment Protection', () => {
  it('6. Additive migration file exists and adheres to strict RLS', () => {
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

  it('7. save_generic_progress strictly protects assessments from client self-reporting', () => {
    const migrationPath = path.resolve(
      __dirname,
      '../supabase/migrations/20261117120000_cloud_sync_and_saved_items.sql'
    );
    const sql = fs.readFileSync(migrationPath, 'utf8');

    // Confirm entity_type CHECK constraint does NOT include assessment
    assert.ok(
      sql.includes("CHECK (entity_type IN ('course', 'module', 'lesson', 'lab'))"),
      'entity_type CHECK constraint must not allow assessment self-reporting'
    );

    // Confirm explicit guard in save_generic_progress
    assert.ok(
      sql.includes("IF p_entity_type IN ('assessment', 'quiz', 'capstone', 'certification') THEN"),
      'Function must explicitly raise exception for assessments and quizzes'
    );
  });

  it('8. Cloud Saved API route rejects unauthenticated mutations with 401', async () => {
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
  it('9. Unfinished courses are marked Coming Soon with misleading buttons removed', () => {
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

  it('10. All 5 Learning Paths are marked isComingSoon: true', () => {
    assert.strictEqual(pathsData.length, 5);
    for (const p of pathsData) {
      assert.strictEqual((p as any).isComingSoon, true, `Path ${p.id} must be marked isComingSoon`);
    }
  });

  it('11. BugBountyLogo component exists and renders SVG', async () => {
    const logoFile = path.resolve(__dirname, '../src/components/ui/BugBountyLogo.tsx');
    assert.ok(fs.existsSync(logoFile), 'BugBountyLogo.tsx must exist');
    const content = fs.readFileSync(logoFile, 'utf8');
    assert.ok(content.includes('<svg'), 'Must render SVG element');
    assert.ok(content.includes('viewBox="0 0'), 'Must contain viewBox');
    assert.ok(content.includes('CyberTube Bug Bounty Study Library'), 'Must have descriptive accessibility title');
  });

  it('12. Unified Library Hub Client exists and handles study & course tabs', () => {
    const hubFile = path.resolve(__dirname, '../src/components/library/UnifiedLibraryHubClient.tsx');
    assert.ok(fs.existsSync(hubFile), 'UnifiedLibraryHubClient.tsx must exist');
    const content = fs.readFileSync(hubFile, 'utf8');
    assert.ok(content.includes("activeTab === 'study'"), 'Must handle study tab');
    assert.ok(content.includes("activeTab === 'courses'"), 'Must handle courses tab');
    assert.ok(content.includes('Coming Soon'), 'Must include Coming Soon preview for Course & Lab directory');
  });
});

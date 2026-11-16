import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { getPdfPageCount } from '../src/lib/pdf/metadata';

let setAuthenticatedUserForTesting: any;
let setAdminClientForTesting: any;

test.before(async () => {
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

  const serverMod = await import('../src/lib/supabase/server');
  const adminMod = await import('../src/lib/supabase/admin');
  setAuthenticatedUserForTesting = serverMod.setAuthenticatedUserForTesting;
  setAdminClientForTesting = adminMod.setAdminClientForTesting;
});

test('1. Pure JavaScript PDF Page Count Extraction', async () => {
  const samplePdfPath = path.resolve(
    'C:/Users/dutch/.gemini/antigravity/brain/0f83e2d2-eb4c-4413-9630-667d43335fff/temp_pdf/Bug_bounty_materials/2FA_BYPASS_SECURED.pdf'
  );
  assert.ok(fs.existsSync(samplePdfPath), 'Sample PDF exists');

  const buffer = fs.readFileSync(samplePdfPath);
  const pageCount = await getPdfPageCount(buffer);

  assert.equal(typeof pageCount, 'number');
  assert.equal(pageCount, 5, 'Sample 2FA_BYPASS_SECURED.pdf must have exactly 5 pages');
});

test('2. Study Materials PDF Endpoint — Unauthorized Access Blocked', async () => {
  // Ensure no user is authenticated
  setAuthenticatedUserForTesting(null);

  const { GET } = await import('../app/api/study-materials/[docId]/pdf/route');

  const req = new Request('http://localhost:3000/api/study-materials/doc-123/pdf');
  const res = await GET(req as any, {
    params: Promise.resolve({ docId: 'doc-123' }),
  });

  assert.equal(res.status, 401, 'Logged out request must return 401 Unauthorized');
  const text = await res.text();
  assert.match(text, /Unauthorized/i);
});

test('3. Study Materials PDF Endpoint — Authenticated User & Range Requests', async () => {
  // Mock authenticated user
  const mockUser = {
    id: 'user-study-test-123',
    email: 'researcher@cybertube.test',
  };
  setAuthenticatedUserForTesting(mockUser);

  // Mock admin client with published document
  const mockDoc = {
    id: 'doc-auth-test',
    storage_key: 'test.pdf',
    is_published: true,
    original_filename: '2FA_BYPASS_SECURED.pdf',
  };

  const samplePdfPath = path.resolve(
    'C:/Users/dutch/.gemini/antigravity/brain/0f83e2d2-eb4c-4413-9630-667d43335fff/temp_pdf/Bug_bounty_materials/2FA_BYPASS_SECURED.pdf'
  );
  const pdfBytes = fs.readFileSync(samplePdfPath);

  const mockAdmin = {
    from: (table: string) => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: mockDoc, error: null }),
          maybeSingle: async () => ({ data: mockDoc, error: null }),
        }),
      }),
    }),
    storage: {
      from: () => ({
        download: async () => ({ data: new Blob([pdfBytes]), error: null }),
      }),
    },
  };
  setAdminClientForTesting(mockAdmin);

  const { GET } = await import('../app/api/study-materials/[docId]/pdf/route');

  // Test standard full download
  const reqFull = new Request('http://localhost:3000/api/study-materials/doc-auth-test/pdf');
  const resFull = await GET(reqFull as any, {
    params: Promise.resolve({ docId: 'doc-auth-test' }),
  });

  assert.equal(resFull.status, 200);
  assert.equal(resFull.headers.get('Content-Type'), 'application/pdf');
  assert.equal(resFull.headers.get('Accept-Ranges'), 'bytes');
  assert.equal(resFull.headers.get('Content-Length'), String(pdfBytes.length));

  // Test Range request (e.g. bytes=0-1023)
  const reqRange = new Request('http://localhost:3000/api/study-materials/doc-auth-test/pdf', {
    headers: { Range: 'bytes=0-1023' },
  });
  const resRange = await GET(reqRange as any, {
    params: Promise.resolve({ docId: 'doc-auth-test' }),
  });

  assert.equal(resRange.status, 206, 'Must return 206 Partial Content');
  assert.equal(resRange.headers.get('Content-Range'), `bytes 0-1023/${pdfBytes.length}`);
  assert.equal(resRange.headers.get('Content-Length'), '1024');

  setAuthenticatedUserForTesting(null);
  setAdminClientForTesting(null);
});

test('4. Study Progress API — Track and Cloud Sync Progress', async () => {
  const mockUser = { id: 'user-prog-777', email: 'student@cybertube.test' };
  setAuthenticatedUserForTesting(mockUser);

  let upsertedProgress: any = null;
  let loggedPageView: any = null;

  const mockAdmin = {
    from: (table: string) => ({
      upsert: async (data: any) => {
        if (table === 'user_study_progress') upsertedProgress = data;
        if (table === 'user_study_page_views') loggedPageView = data;
        return { error: null };
      },
      select: () => ({
        eq: () => ({
          eq: () => ({
            single: async () => ({ data: null, error: null }),
            maybeSingle: async () => ({ data: null, error: null }),
          }),
          single: async () => ({ data: { page_count: 10 }, error: null }),
          maybeSingle: async () => ({ data: { page_count: 10 }, error: null }),
        }),
      }),
    }),
  };
  setAdminClientForTesting(mockAdmin);

  const { POST } = await import('../app/api/study-progress/route');

  const req = new Request('http://localhost:3000/api/study-progress', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ documentId: 'doc-xyz', page: 4 }),
  });

  const res = await POST(req as any);
  assert.equal(res.status, 200);

  assert.ok(upsertedProgress, 'Progress record must be upserted');
  assert.equal(upsertedProgress.last_page, 4);
  assert.equal(upsertedProgress.highest_page, 4);
  assert.equal(upsertedProgress.completion_percent, 40);
  assert.equal(upsertedProgress.is_completed, false);

  assert.ok(loggedPageView, 'Page view must be logged');
  assert.equal(loggedPageView.page_number, 4);

  setAuthenticatedUserForTesting(null);
  setAdminClientForTesting(null);
});

test('5. Study Bookmarks API — Toggle Bookmarks on Current Page', async () => {
  const mockUser = { id: 'user-bm-999', email: 'analyst@cybertube.test' };
  setAuthenticatedUserForTesting(mockUser);

  let existingBookmark: any = null;
  let insertedBookmark: any = null;
  let deletedId: string | null = null;

  const mockAdmin = {
    from: (table: string) => ({
      select: () => ({
        eq: () => ({
          eq: () => ({
            eq: () => ({
              maybeSingle: async () => ({ data: existingBookmark, error: null }),
            }),
          }),
        }),
      }),
      insert: async (data: any) => {
        insertedBookmark = data;
        return { error: null };
      },
      delete: () => ({
        eq: (col: string, val: string) => {
          deletedId = val;
          return { error: null };
        },
      }),
    }),
  };
  setAdminClientForTesting(mockAdmin);

  const { POST } = await import('../app/api/study-bookmarks/route');

  // Case 1: Bookmark does not exist -> Insert
  const req1 = new Request('http://localhost:3000/api/study-bookmarks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ documentId: 'doc-bm', pageNumber: 3, title: 'Key Takeaway' }),
  });
  const res1 = await POST(req1 as any);
  const json1 = await res1.json();
  assert.equal(json1.bookmarked, true);
  assert.equal(insertedBookmark?.page_number, 3);

  // Case 2: Bookmark exists -> Toggle off (Delete)
  existingBookmark = { id: 'bm-id-123', page_number: 3 };
  const req2 = new Request('http://localhost:3000/api/study-bookmarks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ documentId: 'doc-bm', pageNumber: 3 }),
  });
  const res2 = await POST(req2 as any);
  const json2 = await res2.json();
  assert.equal(json2.bookmarked, false);
  assert.equal(deletedId, 'bm-id-123');

  setAuthenticatedUserForTesting(null);
  setAdminClientForTesting(null);
});

test('6. Admin Upload Endpoint — Blocks Unauthorized Learners', async () => {
  const regularUser = { id: 'regular-user-123', email: 'learner@cybertube.test' };
  setAuthenticatedUserForTesting(regularUser);

  // Mock admin row returning null (not an admin)
  const mockAdmin = {
    from: () => ({
      select: () => ({
        eq: () => ({
          maybeSingle: async () => ({ data: null, error: null }),
        }),
      }),
    }),
  };
  setAdminClientForTesting(mockAdmin);

  const { POST } = await import('../app/api/admin/study-materials/upload/route');

  const formData = new FormData();
  formData.append('file', new Blob(['test'], { type: 'application/pdf' }), 'test.pdf');

  const req = new Request('http://localhost:3000/api/admin/study-materials/upload', {
    method: 'POST',
    body: formData,
  });

  const res = await POST(req as any);
  assert.equal(res.status, 403, 'Regular logged-in users must be forbidden from admin upload');

  setAuthenticatedUserForTesting(null);
  setAdminClientForTesting(null);
});

import { studyPdf } from './helpers/study-pdf';
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
  const buffer = studyPdf();
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

  const pdfBytes = studyPdf();

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
        download: async () => ({ data: new Blob([new Uint8Array(pdfBytes)]), error: null }),
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
    from: () => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: { page_count:10,is_published:true,retired_at:null }, error:null }) }) }) }),
    rpc: async (name: string, args: any) => {
      assert.equal(name, 'save_study_progress');
      assert.equal(args.reader_id, mockUser.id);
      loggedPageView = { page_number: args.page };
      upsertedProgress = { last_page:args.page, highest_page:args.page, completion_percent:40, is_completed:false };
      return { data:upsertedProgress,error:null };
    },
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
    from: () => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: { page_count:10,is_published:true,retired_at:null }, error:null }) }) }) }),
    rpc: async (name: string, args: any) => {
      assert.equal(name, 'toggle_study_bookmark');
      assert.equal(args.reader_id, mockUser.id);
      if (existingBookmark) { deletedId=existingBookmark.id; existingBookmark=null; return {data:false,error:null}; }
      insertedBookmark={page_number:args.page}; return {data:true,error:null};
    },
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

test('7. Unknown, retired and missing storage objects never fall back to another PDF', async () => {
  setAuthenticatedUserForTesting({ id:'reader' });
  const { GET } = await import('../app/api/study-materials/[docId]/pdf/route');
  for (const [doc, expected] of [[null,404],[{retired_at:'2026-01-01',is_published:true},404],
    [{retired_at:null,is_published:true,storage_key:'missing'},502]] as const) {
    setAdminClientForTesting({from:()=>({select:()=>({eq:()=>({single:async()=>({data:doc,error:null})})})}),
      storage:{from:()=>({download:async()=>({data:null,error:{message:'missing'}})})}});
    const response=await GET(new Request('http://localhost/api/study-materials/missing/pdf') as any,{params:Promise.resolve({docId:'missing'})});
    assert.equal(response.status,expected);
  }
  setAuthenticatedUserForTesting(null);setAdminClientForTesting(null);
});

test('8. Fractional, out-of-bounds and retired-document progress writes are rejected', async () => {
  setAuthenticatedUserForTesting({id:'reader'});
  const { POST } = await import('../app/api/study-progress/route');
  for (const [page,retired,expected] of [[1.5,false,400],[99,false,400],[1,true,404]] as const) {
    setAdminClientForTesting({from:()=>({select:()=>({eq:()=>({maybeSingle:async()=>({data:{page_count:5,is_published:true,retired_at:retired?'date':null},error:null})})})}),rpc:()=>assert.fail('Rejected write reached database RPC')});
    const response=await POST(new Request('http://localhost/api/study-progress',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({documentId:'doc',page})}) as any);
    assert.equal(response.status,expected);
  }
  setAuthenticatedUserForTesting(null);setAdminClientForTesting(null);
});

test('9. Study Materials PDF Endpoint — same-origin-only OPTIONS and multi-bucket fallback', async () => {
  const { GET, OPTIONS } = await import('../app/api/study-materials/[docId]/pdf/route');

  // Cross-origin preflight must not grant permission to fetch private PDF bytes.
  const optRes = OPTIONS();
  assert.equal(optRes.status, 405);
  assert.equal(optRes.headers.get('Allow'), 'GET');
  assert.equal(optRes.headers.get('Access-Control-Allow-Origin'), null);
  assert.equal(optRes.headers.get('Access-Control-Allow-Credentials'), null);

  // Test multi-bucket fallback: 'study-materials' succeeds
  const mockUser = { id: 'user-bucket-test', email: 'reader@test.com' };
  setAuthenticatedUserForTesting(mockUser);

  const pdfBytes = studyPdf();
  const mockDoc = {
    id: 'doc-bucket-test',
    storage_key: 'study-materials/025e6c870a21bd16893fa59d9877328bf13f3cbf57081f25e8e78e2f57e14525.pdf',
    is_published: true,
  };

  let triedBuckets: string[] = [];
  setAdminClientForTesting({
    from: () => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: mockDoc, error: null }),
        }),
      }),
    }),
    storage: {
      from: (bucket: string) => {
        triedBuckets.push(bucket);
        return {
          download: async (key: string) => {
            if (bucket === 'study-materials') {
              return { data: new Blob([new Uint8Array(pdfBytes)]), error: null };
            }
            return { data: null, error: { message: 'Bucket not found' } };
          },
        };
      },
    },
  });

  const getReq = new Request('http://localhost:3000/api/study-materials/doc-bucket-test/pdf', {
    headers: { origin: 'https://cybertube-mu.vercel.app' },
  });
  const getRes = await GET(getReq as any, {
    params: Promise.resolve({ docId: 'doc-bucket-test' }),
  });

  assert.equal(getRes.status, 200);
  assert.ok(triedBuckets.includes('study-materials'), 'Must try study-materials bucket');
  // Even when an Origin header is sent, the server must never reflect it.
  assert.equal(getRes.headers.get('Access-Control-Allow-Origin'), null);
  assert.equal(getRes.headers.get('Access-Control-Allow-Credentials'), null);
  assert.equal(getRes.headers.get('Vary'), null);

  // Test request without origin: should NOT set Access-Control-Allow-Origin: * when credentials could be present
  const noOriginReq = new Request('http://localhost:3000/api/study-materials/doc-bucket-test/pdf');
  const noOriginRes = await GET(noOriginReq as any, {
    params: Promise.resolve({ docId: 'doc-bucket-test' }),
  });
  assert.equal(noOriginRes.status, 200);
  assert.equal(noOriginRes.headers.get('Access-Control-Allow-Origin'), null);
  assert.equal(noOriginRes.headers.get('Access-Control-Allow-Credentials'), null);

  // Test slug lookup fallback
  const mockSlugDoc = {
    id: 'doc-slug-uuid',
    storage_key: '025e6c870a21bd16893fa59d9877328bf13f3cbf57081f25e8e78e2f57e14525.pdf',
    is_published: true,
  };
  let triedKeys: string[] = [];
  setAdminClientForTesting({
    from: () => ({
      select: () => ({
        eq: (col: string, val: string) => ({
          single: async () => {
            if (col === 'id') return { data: null, error: { message: 'Not found by id' } };
            if (col === 'slug' && val === '2fa-bypass') return { data: mockSlugDoc, error: null };
            return { data: null, error: { message: 'Not found' } };
          },
        }),
      }),
    }),
    storage: {
      from: () => ({
        download: async (key: string) => {
          triedKeys.push(key);
          if (key.includes('bug-bounty/025e6c870a21bd16893fa59d9877328bf13f3cbf57081f25e8e78e2f57e14525.pdf')) {
            return { data: new Blob([new Uint8Array(pdfBytes)]), error: null };
          }
          return { data: null, error: { message: 'File not found' } };
        },
      }),
    },
  });

  const slugReq = new Request('http://localhost:3000/api/study-materials/2fa-bypass/pdf');
  const slugRes = await GET(slugReq as any, {
    params: Promise.resolve({ docId: '2fa-bypass' }),
  });
  assert.equal(slugRes.status, 200);
  assert.ok(triedKeys.some((k) => k.startsWith('bug-bounty/')), 'Must try prefixed candidate keys for bare storage key');

  setAuthenticatedUserForTesting(null);
  setAdminClientForTesting(null);
});

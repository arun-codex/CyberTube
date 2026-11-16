import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';

describe('Simplified Bug Bounty Study Library Suite', () => {
  it('1. Schema migration defines clean tables and strict RLS policies', () => {
    const migrationPath = path.resolve(__dirname, '../supabase/migrations/20231117000000_study_library.sql');
    assert.ok(fs.existsSync(migrationPath), 'Migration file must exist');
    const sql = fs.readFileSync(migrationPath, 'utf8');

    // Confirm essential simplified tables exist
    assert.ok(sql.includes('CREATE TABLE IF NOT EXISTS public.study_categories'), 'Must define study_categories');
    assert.ok(sql.includes('CREATE TABLE IF NOT EXISTS public.study_documents'), 'Must define study_documents');
    assert.ok(sql.includes('CREATE TABLE IF NOT EXISTS public.user_study_progress'), 'Must define user_study_progress');
    assert.ok(sql.includes('CREATE TABLE IF NOT EXISTS public.user_study_page_views'), 'Must define user_study_page_views');
    assert.ok(sql.includes('CREATE TABLE IF NOT EXISTS public.user_study_bookmarks'), 'Must define user_study_bookmarks');
    assert.ok(sql.includes('CREATE TABLE IF NOT EXISTS public.admin_users'), 'Must define admin_users');

    // Confirm heavy image processing table has been dropped / omitted
    assert.ok(!sql.includes('CREATE TABLE IF NOT EXISTS public.study_document_pages'), 'Must NOT define study_document_pages table');

    // Confirm strict RLS
    assert.ok(sql.includes('ENABLE ROW LEVEL SECURITY;'), 'RLS must be enabled');
    assert.ok(sql.includes('auth.uid() = user_id'), 'Progress and bookmarks must be scoped to authenticated user');
  });

  it('2. Client-side PDF worker asset exists in public folder', () => {
    const workerPath = path.resolve(__dirname, '../public/pdf.worker.min.mjs');
    assert.ok(fs.existsSync(workerPath), 'public/pdf.worker.min.mjs must exist');
    const stat = fs.statSync(workerPath);
    assert.ok(stat.size > 500000, 'Worker file must be valid bundle (>500KB)');
  });

  it('3. Pure JS PDF page count metadata extractor functions without native binaries', async () => {
    const { getPdfPageCount } = await import('../src/lib/pdf/metadata.js');
    assert.strictEqual(typeof getPdfPageCount, 'function', 'getPdfPageCount must be an exported function');
  });

  it('4. Navigation headers link to the Study Library', () => {
    const headerPath = path.resolve(__dirname, '../src/components/Header.tsx');
    const headerCode = fs.readFileSync(headerPath, 'utf8');
    assert.ok(headerCode.includes('/study-materials'), 'Header must contain link to /study-materials');
  });
});

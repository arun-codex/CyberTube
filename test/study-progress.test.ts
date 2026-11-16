import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';

/**
 * Tests for the distinct-page completion tracking logic.
 *
 * These tests verify the SQL migration and the progress API route
 * implement completion based on distinct pages viewed, not highest_page.
 */
describe('Distinct-Page Completion Tracking', () => {
  const migrationPath = path.resolve(
    __dirname,
    '../supabase/migrations/20261116095238_atomic_study_reader_state.sql',
  );
  let sql: string;

  it('migration file exists and is readable', () => {
    assert.ok(fs.existsSync(migrationPath), 'Migration file must exist');
    sql = fs.readFileSync(migrationPath, 'utf8');
    assert.ok(sql.length > 100, 'Migration must contain meaningful SQL');
  });

  it('save_study_progress function counts distinct pages via user_study_page_views', () => {
    sql = sql || fs.readFileSync(migrationPath, 'utf8');
    // Must query user_study_page_views for the count
    assert.ok(
      sql.includes('select count(*) into viewed_count from public.user_study_page_views'),
      'Must count distinct pages from user_study_page_views table',
    );
  });

  it('completion_percent is derived from viewed_count, not highest_page', () => {
    sql = sql || fs.readFileSync(migrationPath, 'utf8');
    // The completion formula must use viewed_count, not highest_page or page
    assert.ok(
      sql.includes('round(viewed_count*100.0/doc.page_count,2)'),
      'completion_percent must use viewed_count formula',
    );
    // Must NOT use highest_page for completion calculation
    assert.ok(
      !sql.includes('round(greatest(public.user_study_progress.highest_page'),
      'Must NOT compute completion from highest_page',
    );
    // Must NOT use raw page number for completion
    assert.ok(
      !sql.includes('round(page*100.0/doc.page_count'),
      'Must NOT compute completion from raw page number',
    );
  });

  it('is_completed is true only when all pages are viewed', () => {
    sql = sql || fs.readFileSync(migrationPath, 'utf8');
    assert.ok(
      sql.includes('is_completed=viewed_count>=doc.page_count'),
      'is_completed must compare viewed_count to total page_count',
    );
  });

  it('page view insert uses ON CONFLICT DO NOTHING for idempotency', () => {
    sql = sql || fs.readFileSync(migrationPath, 'utf8');
    assert.ok(
      sql.includes('insert into public.user_study_page_views') && sql.includes('on conflict do nothing'),
      'Page view insert must be idempotent via ON CONFLICT DO NOTHING',
    );
  });

  it('highest_page is still tracked for resume functionality', () => {
    sql = sql || fs.readFileSync(migrationPath, 'utf8');
    assert.ok(
      sql.includes('highest_page=greatest(public.user_study_progress.highest_page,page)'),
      'highest_page must still be tracked as MAX(current, new) for resume',
    );
  });

  it('last_page is updated for continue-reading functionality', () => {
    sql = sql || fs.readFileSync(migrationPath, 'utf8');
    assert.ok(
      sql.includes('last_page=page'),
      'last_page must be set to current page for resume',
    );
  });
});

describe('Distinct-Page Completion — Scenario Verification', () => {
  /**
   * These tests simulate the logical behavior of the SQL function by
   * replicating its algorithm in TypeScript. They verify the expected
   * progress values for various reading patterns.
   */

  // Simulates the save_study_progress logic
  function simulateProgress(totalPages: number, viewedPages: number[]): {
    last_page: number;
    highest_page: number;
    completion_percent: number;
    is_completed: boolean;
    distinct_count: number;
  } {
    const viewed = new Set<number>();
    let highest = 0;
    let last = 0;

    for (const page of viewedPages) {
      if (page < 1 || page > totalPages) throw new Error(`Invalid page ${page}`);
      viewed.add(page);
      highest = Math.max(highest, page);
      last = page;
    }

    const distinctCount = viewed.size;
    const completionPercent = Math.round((distinctCount * 100.0 / totalPages) * 100) / 100;
    const isCompleted = distinctCount >= totalPages;

    return {
      last_page: last,
      highest_page: highest,
      completion_percent: completionPercent,
      is_completed: isCompleted,
      distinct_count: distinctCount,
    };
  }

  it('jumping to final page does NOT yield 100% completion', () => {
    // 10-page document, user jumps directly to page 10
    const result = simulateProgress(10, [10]);
    assert.strictEqual(result.completion_percent, 10.00, 'Viewing 1 of 10 pages = 10%');
    assert.strictEqual(result.is_completed, false, 'Not completed with only 1 page viewed');
    assert.strictEqual(result.highest_page, 10, 'highest_page should be 10');
    assert.strictEqual(result.last_page, 10, 'last_page should be 10');
  });

  it('reading pages out of order increments distinct count correctly', () => {
    const result = simulateProgress(5, [3, 1, 5, 2, 4]);
    assert.strictEqual(result.distinct_count, 5, 'All 5 pages viewed');
    assert.strictEqual(result.completion_percent, 100.00, '100% when all pages viewed');
    assert.strictEqual(result.is_completed, true, 'Completed');
  });

  it('revisiting the same page does not change the count', () => {
    const r1 = simulateProgress(4, [1, 2]);
    assert.strictEqual(r1.distinct_count, 2, 'Two distinct pages after first session');

    const r2 = simulateProgress(4, [1, 2, 1, 2, 1]);
    assert.strictEqual(r2.distinct_count, 2, 'Still two distinct pages after revisits');
    assert.strictEqual(r2.completion_percent, 50.00, '2/4 = 50%');
  });

  it('merging progress from two sessions correctly unions page sets', () => {
    // Session 1: pages 1, 3, 5
    // Session 2: pages 2, 3, 4 (3 already visited)
    const combined = simulateProgress(5, [1, 3, 5, 2, 3, 4]);
    assert.strictEqual(combined.distinct_count, 5, 'Union of both sessions = 5 pages');
    assert.strictEqual(combined.is_completed, true, 'All pages viewed');
  });

  it('single-page document completes on first view', () => {
    const result = simulateProgress(1, [1]);
    assert.strictEqual(result.completion_percent, 100.00, '1/1 = 100%');
    assert.strictEqual(result.is_completed, true, 'Completed');
  });

  it('partial reading yields correct fractional percentage', () => {
    // 11-page document, user views pages 1, 2, 3
    const result = simulateProgress(11, [1, 2, 3]);
    assert.strictEqual(result.distinct_count, 3);
    // 3/11 * 100 = 27.272727... → rounded to 27.27
    assert.strictEqual(result.completion_percent, 27.27, '3/11 pages = 27.27%');
    assert.strictEqual(result.is_completed, false);
  });

  it('last_page reflects most recent page, not highest', () => {
    const result = simulateProgress(10, [5, 8, 3]);
    assert.strictEqual(result.last_page, 3, 'last_page = most recent page');
    assert.strictEqual(result.highest_page, 8, 'highest_page = max ever reached');
  });
});

describe('Progress API Route Structure', () => {
  it('POST route calls save_study_progress RPC', () => {
    const routePath = path.resolve(__dirname, '../app/api/study-progress/route.ts');
    assert.ok(fs.existsSync(routePath), 'Progress API route must exist');
    const code = fs.readFileSync(routePath, 'utf8');
    assert.ok(
      code.includes("admin.rpc('save_study_progress'"),
      'POST handler must invoke save_study_progress RPC',
    );
  });

  it('GET route returns viewedPages from user_study_page_views', () => {
    const routePath = path.resolve(__dirname, '../app/api/study-progress/route.ts');
    const code = fs.readFileSync(routePath, 'utf8');
    assert.ok(
      code.includes("from('user_study_page_views')"),
      'GET handler must query user_study_page_views',
    );
    assert.ok(
      code.includes('viewedPages'),
      'GET response must include viewedPages array',
    );
  });
});

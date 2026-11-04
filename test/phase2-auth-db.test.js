const test = require('node:test');
const assert = require('node:assert');

// 1. Test Admin Email Allowlist Authorization Logic
const { isAuthorizedAdminEmail } = require('../src/lib/supabase/admin');

test('Admin Authorization — Email Allowlist Verification', () => {
  // Save original env
  const orig = process.env.CYBERTUBE_ADMIN_EMAILS;
  process.env.CYBERTUBE_ADMIN_EMAILS = 'admin@cybertube.local,secops@cybertube.org';

  assert.strictEqual(isAuthorizedAdminEmail('admin@cybertube.local'), true);
  assert.strictEqual(isAuthorizedAdminEmail('SECOPS@cybertube.org'), true); // Case-insensitive
  assert.strictEqual(isAuthorizedAdminEmail('attacker@evil.com'), false);
  assert.strictEqual(isAuthorizedAdminEmail(null), false);
  assert.strictEqual(isAuthorizedAdminEmail(undefined), false);

  process.env.CYBERTUBE_ADMIN_EMAILS = orig;
});

// 2. Test Local to Cloud Bookmark Sync Logic
test('Bookmark Synchronization — Deduplication and Payload Building', () => {
  const localSavedIds = ['res-portswigger-sqli', 'res-mitre-attack', 'res-nmap-book'];
  const existingCloudBookmarks = [{ resource_id: 'res-portswigger-sqli' }];

  const existingSet = new Set(existingCloudBookmarks.map(b => b.resource_id));
  const toSync = localSavedIds.filter(id => !existingSet.has(id));

  assert.strictEqual(toSync.length, 2);
  assert.deepStrictEqual(toSync, ['res-mitre-attack', 'res-nmap-book']);
});

// 3. Test RLS Ownership Invariants (Model logic)
test('Database RLS Specifications — Ownership Invariants', () => {
  const mockUserA = 'user-uuid-1111';
  const mockUserB = 'user-uuid-2222';

  const bookmark = {
    id: 'b-1',
    user_id: mockUserA,
    resource_id: 'res-portswigger-sqli'
  };

  // Policy: auth.uid() = user_id
  const canUserAAccess = (authUid) => authUid === bookmark.user_id;

  assert.strictEqual(canUserAAccess(mockUserA), true);
  assert.strictEqual(canUserAAccess(mockUserB), false);
  assert.strictEqual(canUserAAccess(null), false);
});


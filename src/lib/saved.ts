/** Account-scoped cache with durable, retry-safe desired-state operations. */
const LEGACY_KEY = 'cybertube_saved_v1';
const PREFIX = 'cybertube_saved_v2:';
const EVENT_NAME = 'cybertube:saved-changed';
let owner: string | null = null;
let inFlight: Promise<SavedSyncResult> | null = null;
let syncingOwner: string | null = null;
let syncState: SavedSyncResult | null = null;
interface Pending { id: string; saved: boolean; token: string }
export interface SavedSyncResult {
  authenticated: boolean;
  synced: boolean;
  savedIds: string[];
  syncedCount: number;
  error?: string;
}
export interface SavedResourceService {
  getSavedIds(): string[];
  isSaved(id: string): boolean;
  save(id: string): void;
  remove(id: string): void;
  toggle(id: string): boolean;
  clearAll?(): void;
}
const scopeKey = (user = owner) => `${PREFIX}${user || 'guest'}`;
const pendingPrefix = (user = owner) => `${scopeKey(user)}:pending:`;
function readIds(key: string): string[] {
  try {
    const value = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(value) ? [...new Set(value.filter((id): id is string => typeof id === 'string'))] : [];
  } catch { return []; }
}
function pending(user = owner): Pending[] {
  const prefix = pendingPrefix(user);
  const result: Pending[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key?.startsWith(prefix)) continue;
    try {
      const item = JSON.parse(localStorage.getItem(key) || 'null');
      if (typeof item?.id === 'string' && typeof item.saved === 'boolean' && typeof item.token === 'string') result.push(item);
    } catch { /* Preserve malformed entries for recovery, but do not send them. */ }
  }
  return result;
}
function overlay(ids: string[], operations: Pending[]): string[] {
  const result = new Set(ids);
  for (const operation of operations) {
    if (operation.saved) result.add(operation.id);
    else result.delete(operation.id);
  }
  return [...result];
}
function emit() {
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: getStoredIds() }));
}
function getAllIds(): string[] {
  if (typeof window === 'undefined') return [];
  return overlay(readIds(scopeKey()), pending());
}
export function getStoredIds(): string[] {
  return getAllIds().filter(id => !id.startsWith('study:'));
}
export function getStudySavedItems(): { documentId: string; pageNumber: number; title: string | null; createdAt: string }[] {
  let metadata: Record<string, { title?: string; createdAt?: string }> = {};
  if (typeof window !== 'undefined') {
    try { metadata = JSON.parse(localStorage.getItem(`${scopeKey()}:study-metadata`) || '{}') || {}; } catch {}
  }
  return getAllIds().filter(id => id.startsWith('study:')).map(id => {
    const [, documentId, page] = id.split(':');
    return { documentId, pageNumber: Number(page), title: metadata[id]?.title || null, createdAt: metadata[id]?.createdAt || '' };
  });
}
export function getSavedSyncState(): SavedSyncResult {
  return { authenticated: Boolean(owner), synced: false, syncedCount: 0, ...syncState, savedIds: getStoredIds() };
}
export function saveStudyBookmark(documentId: string, page: number, saved: boolean): void {
  change(`study:${documentId}:${page}`, saved);
}
export function setStoredIds(ids: string[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(scopeKey(), JSON.stringify([...new Set(ids)]));
  emit();
}
function enqueue(id: string, saved: boolean) {
  const operation: Pending = { id, saved, token: crypto.randomUUID() };
  // One record per resource means acknowledging an old request cannot erase a newer edit.
  localStorage.setItem(`${pendingPrefix()}${encodeURIComponent(id)}`, JSON.stringify(operation));
}
export function setSavedUser(userId: string | null): void {
  if (typeof window === 'undefined') return;
  owner = userId;
  syncState = null;
  // Preserve and import the old single-device list once. Keep its original copy as backup.
  if (localStorage.getItem(`${PREFIX}legacy-imported`) === null) {
    const oldIds = readIds(LEGACY_KEY);
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const match = key?.match(/^study_bm_([0-9a-f-]{36})_(\d+)$/i);
      if (match && localStorage.getItem(key!) === '1') oldIds.push(`study:${match[1]}:${match[2]}`);
    }
    localStorage.setItem(scopeKey(null), JSON.stringify(oldIds));
    localStorage.setItem(`${PREFIX}legacy-imported`, '1');
  }
  if (userId && localStorage.getItem(`${PREFIX}guest-imported`) === null) {
    const guestIds = overlay(readIds(scopeKey(null)), pending(null));
    for (const id of guestIds) enqueue(id, true);
    localStorage.setItem(`${PREFIX}guest-imported`, userId);
  }
  emit();
}
function change(id: string, saved: boolean) {
  if (typeof window === 'undefined') return;
  enqueue(id, saved);
  syncState = null;
  emit();
  void syncSavedWithCloud();
}
export const localSavedService: SavedResourceService = {
  getSavedIds: getStoredIds,
  isSaved: id => getStoredIds().includes(id),
  save: id => change(id, true),
  remove: id => change(id, false),
  toggle(id) {
    const saved = !getStoredIds().includes(id);
    change(id, saved);
    return saved;
  },
  clearAll() {
    syncState = null;
    // Delete the observed list only, preserving concurrent additions on another device.
    for (const id of getStoredIds()) enqueue(id, false);
    emit();
    void syncSavedWithCloud();
  },
};
async function synchronize(): Promise<SavedSyncResult> {
  const user = owner;
  const base = { authenticated: Boolean(user), synced: false, savedIds: getStoredIds(), syncedCount: 0 };
  if (!user || typeof window === 'undefined') return base;
  let syncedCount = 0;
  try {
    // Serial replay preserves edits made while a request was in flight.
    while (owner === user) {
      const operations = pending(user);
      if (!operations.length) break;
      for (const operation of operations) {
        if (owner !== user) return base;
        const response = await fetch('/api/user/saved', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user, resourceId: operation.id, action: operation.saved ? 'save' : 'remove' }),
        });
        if (!response.ok) throw new Error('Changes are saved on this device. Cloud sync needs a retry.');
        const key = `${pendingPrefix(user)}${encodeURIComponent(operation.id)}`;
        // Commit the acknowledged state before removing its durable operation.
        localStorage.setItem(scopeKey(user), JSON.stringify(overlay(readIds(scopeKey(user)), [operation])));
        const latest = JSON.parse(localStorage.getItem(key) || 'null');
        if (latest?.token === operation.token) localStorage.removeItem(key);
        syncedCount++;
      }
    }
    const response = await fetch('/api/user/saved', { cache: 'no-store' });
    if (!response.ok) throw new Error('Unable to refresh cloud bookmarks. Please retry.');
    const data = await response.json();
    if (owner !== user || data.userId !== user || !data.authenticated || !Array.isArray(data.savedIds)) {
      return { ...base, savedIds: getStoredIds(), error: 'Session changed. Please sign in again to sync.' };
    }
    // Replace the old cloud snapshot: union would resurrect another device's deletions.
    const studyIds = (data.studyBookmarks || []).map((b: { document_id: string; page_number: number }) =>
      `study:${b.document_id}:${b.page_number}`);
    const metadata = Object.fromEntries((data.studyBookmarks || []).map((b: {
      document_id: string; page_number: number; title: string | null; created_at: string;
    }) => [`study:${b.document_id}:${b.page_number}`, { title: b.title, createdAt: b.created_at }]));
    localStorage.setItem(`${scopeKey(user)}:study-metadata`, JSON.stringify(metadata));
    setStoredIds([...data.savedIds, ...studyIds]);
    return { authenticated: true, synced: pending(user).length === 0, savedIds: getStoredIds(), syncedCount };
  } catch (error) {
    return { ...base, savedIds: getStoredIds(), syncedCount,
      error: error instanceof Error ? error.message : 'Cloud sync unavailable. Please retry.' };
  }
}
export function syncSavedWithCloud(): Promise<SavedSyncResult> {
  if (inFlight) {
    if (syncingOwner !== owner) return inFlight.then(() => syncSavedWithCloud());
    return inFlight;
  }
  syncingOwner = owner;
  const requestedOwner = owner;
  const run = () => synchronize();
  // Coordinate tabs on the same origin where Web Locks are supported.
  inFlight = (typeof navigator !== 'undefined' && navigator.locks
    ? navigator.locks.request('cybertube-saved-sync', run) : run())
    .then((result: any) => {
      const resolved = result as SavedSyncResult;
      if (owner === requestedOwner) {
        syncState = resolved;
        if (typeof window !== 'undefined') emit();
      }
      return resolved;
    })
    .finally(() => { inFlight = null; });
  return inFlight;
}
export function onSavedChange(callback: (ids: string[]) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = () => callback(getStoredIds());
  window.addEventListener(EVENT_NAME, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(EVENT_NAME, handler);
    window.removeEventListener('storage', handler);
  };
}

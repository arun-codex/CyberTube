/**
 * CyberTube — Local Saved Resources Service
 *
 * Implements a clean client-side interface for device-specific bookmarking.
 * Stores resource IDs in browser localStorage and dispatches custom events
 * for reactive multi-component synchronization.
 */

const STORAGE_KEY = 'cybertube_saved_v1';
const EVENT_NAME = 'cybertube:saved-changed';

export interface SavedResourceService {
  getSavedIds(): string[];
  isSaved(id: string): boolean;
  save(id: string): void;
  remove(id: string): void;
  toggle(id: string): boolean;
}

function getStoredIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to read saved resources from localStorage:', err);
    return [];
  }
}

function setStoredIds(ids: string[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: ids }));
  } catch (err) {
    console.error('Failed to persist saved resources to localStorage:', err);
  }
}

export const localSavedService: SavedResourceService = {
  getSavedIds(): string[] {
    return getStoredIds();
  },

  isSaved(id: string): boolean {
    return getStoredIds().includes(id);
  },

  save(id: string): void {
    const current = getStoredIds();
    if (!current.includes(id)) {
      setStoredIds([...current, id]);
    }
  },

  remove(id: string): void {
    const current = getStoredIds();
    setStoredIds(current.filter((item) => item !== id));
  },

  toggle(id: string): boolean {
    const current = getStoredIds();
    if (current.includes(id)) {
      setStoredIds(current.filter((item) => item !== id));
      return false;
    } else {
      setStoredIds([...current, id]);
      return true;
    }
  },
};

/**
 * React hook helper: listener for saved changes
 */
export function onSavedChange(callback: (ids: string[]) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = (e: Event) => {
    const customEvent = e as CustomEvent<string[]>;
    callback(customEvent.detail || getStoredIds());
  };
  window.addEventListener(EVENT_NAME, handler);
  window.addEventListener('storage', () => callback(getStoredIds()));
  return () => {
    window.removeEventListener(EVENT_NAME, handler);
  };
}


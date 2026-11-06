'use client';

const STORAGE_PREFIX = 'cybertube_progress_';

export function getCompletedItems(key: string): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn(`Could not read localStorage for key ${key}:`, err);
    return [];
  }
}

export function toggleCompletedItem(key: string, itemId: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const current = getCompletedItems(key);
    let updated: string[];
    let isCompleted = false;

    if (current.includes(itemId)) {
      updated = current.filter((id) => id !== itemId);
      isCompleted = false;
    } else {
      updated = [...current, itemId];
      isCompleted = true;
    }

    localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('cybertube-progress-update', { detail: { key, updated } }));
    return isCompleted;
  } catch (err) {
    console.warn(`Could not update localStorage for key ${key}:`, err);
    return false;
  }
}

export function isItemCompleted(key: string, itemId: string): boolean {
  const current = getCompletedItems(key);
  return current.includes(itemId);
}


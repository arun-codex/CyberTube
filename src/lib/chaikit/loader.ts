/**
 * Safe, idempotent ChaiKit bundle loader for Next.js App Router.
 * Prevents multiple script injections and guarantees single registration of <chai-support>.
 */

let loadPromise: Promise<void> | null = null;

export const CHAIKIT_SCRIPT_SRC = '/vendor/chaikit/chaikit.iife.js';

export function isChaiKitLoaded(): boolean {
  if (typeof window === 'undefined') return false;
  return Boolean(window.customElements && window.customElements.get('chai-support'));
}

export function loadChaiKitScript(): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.resolve();
  }

  // If the custom element is already registered, resolve immediately.
  if (window.customElements && window.customElements.get('chai-support')) {
    return Promise.resolve();
  }

  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = new Promise<void>((resolve, reject) => {
    // Check if script tag is already in DOM
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${CHAIKIT_SCRIPT_SRC}"]`);
    if (existing) {
      if (window.customElements && window.customElements.get('chai-support')) {
        resolve();
        return;
      }
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => {
        loadPromise = null;
        reject(new Error(`Failed to load ChaiKit vendor bundle from ${CHAIKIT_SCRIPT_SRC}`));
      }, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = CHAIKIT_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.setAttribute('data-chaikit-vendor', 'true');

    script.onload = () => {
      resolve();
    };

    script.onerror = () => {
      loadPromise = null; // Allow retry on failure
      reject(new Error(`Failed to load ChaiKit script from ${CHAIKIT_SCRIPT_SRC}`));
    };

    document.body.appendChild(script);
  });

  return loadPromise;
}

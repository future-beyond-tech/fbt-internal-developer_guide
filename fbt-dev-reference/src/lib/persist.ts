/**
 * Tiny typed localStorage helper with SSR safety and JSON serialization.
 * Used by the prompt tools to auto-save form state across refreshes.
 */

const NS = 'fbt:prompt-tools:v1';

function key(slot: string): string {
  return `${NS}:${slot}`;
}

export function loadState<T>(slot: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key(slot));
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as T;
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

export function saveState<T>(slot: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key(slot), JSON.stringify(value));
  } catch {
    // Quota exceeded or private-mode — silently ignore
  }
}

export function clearState(slot: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(key(slot));
  } catch {
    // ignore
  }
}

/**
 * Encode state into a URL-safe base64 hash fragment for sharing.
 * Pair with `decodeShareHash` on load.
 */
export function encodeShareHash<T>(value: T): string {
  if (typeof window === 'undefined') return '';
  try {
    const json = JSON.stringify(value);
    const b64 = btoa(unescape(encodeURIComponent(json)));
    return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  } catch {
    return '';
  }
}

export function decodeShareHash<T>(hash: string, fallback: T): T {
  if (typeof window === 'undefined' || !hash) return fallback;
  try {
    const normalized = hash.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized + '==='.slice((normalized.length + 3) % 4);
    const json = decodeURIComponent(escape(atob(padded)));
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

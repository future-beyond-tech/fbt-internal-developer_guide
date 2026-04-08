/**
 * Shared helpers for prompt tools: clipboard, download, token estimation.
 * Keeps clipboard/Blob usage consistent and failure-safe across all tools.
 *
 * All helpers are client-side only — guard with typeof window check.
 */

/** Copy text to clipboard with graceful fallback. Returns true on success. */
export async function safeCopy(text: string): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Legacy fallback for non-HTTPS / permission-denied contexts
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '-1000px';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch (err) {
    console.error('safeCopy failed:', err);
    return false;
  }
}

/** Trigger a browser download of `text` as a file with the given name. */
export function downloadText(text: string, filename: string, mime = 'text/markdown'): void {
  if (typeof window === 'undefined') return;
  try {
    const blob = new Blob([text], { type: `${mime};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('downloadText failed:', err);
  }
}

/**
 * Rough token estimate. Based on OpenAI-family heuristic of ~0.75 words/token
 * or ~4 chars/token. We take the larger of the two to bias slightly high so
 * budgets are conservative.
 */
export function estimateTokens(text: string): number {
  if (!text) return 0;
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const chars = text.length;
  return Math.max(Math.ceil(words / 0.75), Math.ceil(chars / 4));
}

/** Format a token count for display: 1234 -> "1.2k". */
export function formatTokens(n: number): string {
  if (n < 1000) return String(n);
  return `${(n / 1000).toFixed(1)}k`;
}

/** Safe truncate that preserves box-drawing layouts. */
export function truncate(text: string, max: number, ellipsis = '…'): string {
  if (text.length <= max) return text;
  return text.slice(0, max - ellipsis.length) + ellipsis;
}

/** Pad and truncate to fit a fixed column width (for ASCII boxes). */
export function fit(text: string, width: number): string {
  return truncate(text, width).padEnd(width);
}

/** Slugify a project name into a filesystem-safe slug. */
export function slugify(text: string, fallback = 'project'): string {
  const s = (text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return s || fallback;
}

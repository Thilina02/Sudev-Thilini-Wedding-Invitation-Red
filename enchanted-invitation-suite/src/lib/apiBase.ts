const normalizePath = (path: string) => (path.startsWith("/") ? path : `/${path}`);

/**
 * Base URL for API calls. Prefer unset in dev so requests go through Vite's `/api` proxy
 * (same origin → session cookies work). Set `VITE_API_BASE_URL` when the API is on another host.
 */
export function apiUrl(path: string): string {
  const p = normalizePath(path);
  const base = (import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
  if (!base) return p;
  return `${base}${p}`;
}

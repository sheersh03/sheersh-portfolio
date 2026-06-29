/**
 * Prefix a public asset path with the deploy base path so static-export assets
 * resolve correctly when the site is served from a sub-path (e.g. GitHub Pages
 * project site at /sheersh-portfolio). Set NEXT_PUBLIC_BASE_PATH at build time;
 * empty = served from root (custom domain / user page / local dev).
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string): string =>
  path.startsWith("/") ? `${BASE}${path}` : path;

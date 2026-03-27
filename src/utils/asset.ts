/**
 * Prepend the Astro base URL to a public asset path.
 * Handles both local dev (base = "/") and GitHub Pages (base = "/hey-beauty-page/").
 *
 * Usage: assetPath("/images/hero-salon.jpeg")
 */
export function assetPath(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}${path}`;
}

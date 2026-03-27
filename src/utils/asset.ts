/**
 * Prepend the Astro base URL to any internal path (images or pages).
 * Handles both local dev (base = "/") and GitHub Pages (base = "/hey-beauty-page/").
 *
 * Usage:
 *   assetPath("/images/hero-salon.jpeg")  → image src
 *   url("/salony/")                        → internal link href
 */
const base = (): string => import.meta.env.BASE_URL.replace(/\/$/, "");

export const assetPath = (path: string): string => `${base()}${path}`;
export const url = (path: string): string => `${base()}${path}`;

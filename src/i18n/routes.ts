/**
 * URL slug translations per locale.
 *
 * Polish is the canonical (source) language. All internal links are built
 * from PL slugs and translated here for EN/UK routes.
 *
 * To add a new page:
 *   1. Add its PL slug → translated slug in both maps below.
 *   2. Create the translated page file (e.g. src/pages/en/services/new-page.astro).
 *   3. The localizePath() and hreflangUrls() functions do the rest automatically.
 */

export const slugMap: Record<"en" | "uk", Record<string, string>> = {
  en: {
    "uslugi":  "services",
    "salony":  "salons",
    "wlosy":   "hair",
    "o-nas":   "about",
    "kontakt": "contact",
    "faq":     "faq",
  },
  uk: {
    "uslugi":  "posluhy",
    "salony":  "salony",    // same word in Ukrainian
    "wlosy":   "volossia",
    "o-nas":   "pro-nas",
    "kontakt": "kontakt",   // same word in Ukrainian
    "faq":     "faq",
  },
};

/** Reverse map: translated slug → PL slug (auto-built, don't edit manually). */
export const reverseSlugMap: Record<"en" | "uk", Record<string, string>> = {
  en: Object.fromEntries(Object.entries(slugMap.en).map(([pl, tr]) => [tr, pl])),
  uk: Object.fromEntries(Object.entries(slugMap.uk).map(([pl, tr]) => [tr, pl])),
};

/** Translate every segment of a PL path to the given locale. */
export function translatePath(plPath: string, lang: "en" | "uk"): string {
  const map = slugMap[lang];
  return plPath
    .split("/")
    .map((seg) => map[seg] ?? seg)
    .join("/");
}

/** Reverse-translate a locale path back to a PL path. */
export function toPlPath(localizedPath: string, lang: "en" | "uk"): string {
  const map = reverseSlugMap[lang];
  return localizedPath
    .split("/")
    .map((seg) => map[seg] ?? seg)
    .join("/");
}

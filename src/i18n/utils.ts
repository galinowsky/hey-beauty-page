import { ui, type Lang, type UIKey } from "./ui";
import { translatePath, toPlPath } from "./routes";

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui["pl"][key] ?? key;
  };
}

/**
 * Build a locale-aware href from a canonical Polish path.
 * Translates every path segment using the slug map in routes.ts.
 *
 * localizePath("/uslugi/wlosy/", "en") → "/en/services/hair/"
 * localizePath("/uslugi/wlosy/", "uk") → "/uk/posluhy/volossia/"
 * localizePath("/uslugi/wlosy/", "pl") → "/uslugi/wlosy/"
 */
export function localizePath(plPath: string, lang: Lang): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  if (lang === "pl") return `${base}${plPath}`;
  const translatedPath = translatePath(plPath, lang);
  return `${base}/${lang}${translatedPath}`;
}

/**
 * Convert the raw current URL pathname (any locale) back to the canonical
 * Polish path. Used by the language switcher in Header and Footer.
 *
 * "/en/services/hair/" → "/uslugi/wlosy/"
 * "/uk/posluhy/"       → "/uslugi/"
 * "/uslugi/"           → "/uslugi/"
 */
export function toCanonicalPlPath(rawPath: string, lang: Lang): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  // Strip base URL prefix
  const withoutBase = rawPath.startsWith(base)
    ? rawPath.slice(base.length) || "/"
    : rawPath;
  if (lang === "pl") return withoutBase;
  // Strip locale prefix (/en/, /uk/)
  const withoutLocale = withoutBase.replace(new RegExp(`^/${lang}`), "") || "/";
  return toPlPath(withoutLocale, lang);
}

/**
 * Returns all locale href variants of a canonical Polish path.
 * Used for <link rel="alternate" hreflang> tags in <head>.
 *
 * hreflangUrls("/uslugi/wlosy/", site) → [
 *   { lang: "pl", href: "https://heybeauty.pl/uslugi/wlosy/" },
 *   { lang: "en", href: "https://heybeauty.pl/en/services/hair/" },
 *   { lang: "uk", href: "https://heybeauty.pl/uk/posluhy/volossia/" },
 *   { lang: "x-default", href: "https://heybeauty.pl/uslugi/wlosy/" },
 * ]
 */
export function hreflangUrls(
  plPath: string,
  site: URL | undefined,
): { lang: string; href: string }[] {
  const origin = site ? site.origin : "";
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return [
    { lang: "pl",       href: `${origin}${base}${plPath}` },
    { lang: "en",       href: `${origin}${base}/en${translatePath(plPath, "en")}` },
    { lang: "uk",       href: `${origin}${base}/uk${translatePath(plPath, "uk")}` },
    { lang: "x-default", href: `${origin}${base}${plPath}` },
  ];
}

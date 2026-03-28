import { ui, type Lang, type UIKey } from "./ui";

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui["pl"][key] ?? key;
  };
}

/** Prefix a path with the locale segment (skips prefix for default Polish). */
export function localizePath(path: string, lang: Lang): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  if (lang === "pl") return `${base}${path}`;
  return `${base}/${lang}${path}`;
}

/** Returns all locale variants of a given path for hreflang tags. */
export function hreflangUrls(
  path: string,
  site: URL | undefined,
): { lang: string; href: string }[] {
  const origin = site ? site.origin : "";
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return [
    { lang: "pl", href: `${origin}${base}${path}` },
    { lang: "en", href: `${origin}${base}/en${path}` },
    { lang: "uk", href: `${origin}${base}/uk${path}` },
    { lang: "x-default", href: `${origin}${base}${path}` },
  ];
}

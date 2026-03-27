interface BreadcrumbItem {
  name: string;
  url: string;
}

export function buildBreadcrumbList(
  items: BreadcrumbItem[],
  siteUrl?: URL,
) {
  const base = siteUrl?.origin || "https://heybeauty.pl";
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${base}${item.url}`,
    })),
  };
}

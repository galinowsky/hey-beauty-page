import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async () => {
  const locations = await getCollection("locations");
  const services = await getCollection("services");

  const sortedLocations = locations.sort(
    (a, b) => a.data.sortOrder - b.data.sortOrder,
  );
  const sortedServices = services.sort(
    (a, b) => (a.data.sortOrder ?? 0) - (b.data.sortOrder ?? 0) || a.data.name.localeCompare(b.data.name, "pl"),
  );

  const text = `# Hey Beauty
> Sieć salonów kosmetycznych w Krakowie

Hey Beauty to 4 salony kosmetyczne w Krakowie oferujące profesjonalne zabiegi:
stylizacja brwi, lifting rzęs, pedicure, zabiegi na twarz i ciało.

## Lokalizacje

${sortedLocations
  .map(
    (l) =>
      `- ${l.data.name}: ${l.data.address.street}, ${l.data.address.postalCode} ${l.data.address.city}${l.data.rating ? ` (${l.data.rating.value}/5, ${l.data.rating.count} opinii)` : ""}`,
  )
  .join("\n")}

## Usługi

${sortedServices
  .map(
    (s) =>
      `- ${s.data.name}: ${s.data.description} (${s.data.priceRange.min !== null ? `od ${s.data.priceRange.min} zł` : "cena indyw."}, ${s.data.duration.min} min)`,
  )
  .join("\n")}

## Rezerwacja

Wizyty rezerwuj przez Booksy: https://booksy.com — wyszukaj "Hey Beauty Kraków"

## Kontakt

- Instagram: @heybeauty_krk
- Strona: https://heybeauty.pl
`;

  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};

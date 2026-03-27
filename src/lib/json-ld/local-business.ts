interface LocationData {
  name: string;
  slug: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  coordinates: { lat: number; lng: number };
  phone?: string;
  openingHours: Array<{ dayOfWeek: string; opens: string; closes: string }>;
  rating?: { value: number; count: number };
}

export function buildBeautySalon(location: LocationData) {
  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: location.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address.street,
      addressLocality: location.address.city,
      postalCode: location.address.postalCode,
      addressCountry: location.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.coordinates.lat,
      longitude: location.coordinates.lng,
    },
    ...(location.phone && { telephone: location.phone }),
    url: `https://heybeauty.pl/salony/${location.slug}/`,
    openingHoursSpecification: location.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${h.dayOfWeek}`,
      opens: h.opens,
      closes: h.closes,
    })),
    ...(location.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: location.rating.value,
        reviewCount: location.rating.count,
      },
    }),
  };
}

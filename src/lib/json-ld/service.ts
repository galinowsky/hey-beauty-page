interface ServiceData {
  name: string;
  description: string;
}

interface ServiceLocationData {
  priceMin: number | null;
  priceMax?: number | null;
}

interface LocationData {
  name: string;
}

export function buildService(
  service: ServiceData,
  serviceLocation: ServiceLocationData,
  location: LocationData,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "BeautySalon",
      name: location.name,
    },
    areaServed: {
      "@type": "City",
      name: "Kraków",
    },
    ...(serviceLocation.priceMin !== null
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "PLN",
            availability: "https://schema.org/InStock",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: serviceLocation.priceMin,
              ...(serviceLocation.priceMax ? { maxPrice: serviceLocation.priceMax } : {}),
              priceCurrency: "PLN",
            },
          },
        }
      : {}),
  };
}

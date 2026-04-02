interface ServiceData {
  name: string;
  description: string;
}

interface ServiceLocationData {
  priceMin: number;
  priceMax?: number;
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
  };
}

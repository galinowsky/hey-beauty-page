interface ServiceData {
  name: string;
  description: string;
}

interface ServiceLocationData {
  price: number;
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
      price: serviceLocation.price,
      priceCurrency: "PLN",
      availability: "https://schema.org/InStock",
    },
  };
}

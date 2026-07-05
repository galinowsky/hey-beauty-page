import type { Loader } from "astro/loaders";

// ── Airtable config ──────────────────────────────────────
const BASE_ID = "appxLApX6BHtnXE4h";
const SERVICES_TABLE = "tblEx5r6lgbKKrdJl";
const SALONS_TABLE = "tblLXo7SbbaSkGzQj";

// Field names as returned by Airtable API
const F = {
  serviceName: "Service Name",
  salon: "Salon",
  category: "Category",
  duration: "Duration (min)",
  price: "Price (PLN)",
  description: "Description",
} as const;

// Salon record ID → site location slug
const SALON_MAP: Record<string, string> = {
  recscqnfsLghkfaj8: "hey-beauty-1-0",
  rechRsJGsBw034bZ3: "hey-beauty-2-0",
  rec6zcjyMN5tk9qlT: "hey-beauty-3-0",
  recCZGwuPJzeYZw7M: "hey-beauty-zablocie",
};

// ── Types ────────────────────────────────────────────────
interface AirtableRecord {
  id: string;
  fields: Record<string, unknown>;
}

interface AirtableResponse {
  records: AirtableRecord[];
  offset?: string;
}

interface RawService {
  airtableId: string;
  name: string;
  locationSlug: string;
  category: string;
  duration: number | null;
  price: number | null;
  description: string;
}

interface FetchResult {
  services: RawService[];
}

// ── Slugify ──────────────────────────────────────────────
function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\u0142/g, "l") // ł → l
    .replace(/\u0141/g, "L") // Ł → L
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// ── Module-level cache ───────────────────────────────────
let cached: FetchResult | null = null;

async function fetchAirtableData(): Promise<FetchResult> {
  if (cached) return cached;

  const apiKey = import.meta.env.AIRTABLE_API_KEY;
  if (!apiKey) {
    throw new Error(
      "AIRTABLE_API_KEY is not set. Add it to .env (see .env.example).",
    );
  }

  const headers = { Authorization: `Bearer ${apiKey}` };

  // Fetch all pages from a table
  async function fetchAllRecords(tableId: string): Promise<AirtableRecord[]> {
    const all: AirtableRecord[] = [];
    let offset: string | undefined;

    do {
      const url = `https://api.airtable.com/v0/${BASE_ID}/${tableId}?pageSize=100${offset ? `&offset=${offset}` : ""}`;
      const res = await fetch(url, { headers });

      if (!res.ok) {
        throw new Error(
          `Airtable API error (${res.status}): ${await res.text()}`,
        );
      }

      const data: AirtableResponse = await res.json();
      all.push(...data.records);
      offset = data.offset;
    } while (offset);

    return all;
  }

  // 1. Fetch salons to build record ID → slug map (validation)
  const salonRecords = await fetchAllRecords(SALONS_TABLE);
  const knownSalonIds = new Set(salonRecords.map((r) => r.id));

  // 2. Fetch all services
  const serviceRecords = await fetchAllRecords(SERVICES_TABLE);

  // 3. Transform to RawService[]
  const services: RawService[] = [];

  for (const rec of serviceRecords) {
    const fields = rec.fields;
    const name = fields[F.serviceName] as string | undefined;
    if (!name?.trim()) continue;

    // Resolve salon link (array of record IDs)
    const salonIds = fields[F.salon] as string[] | undefined;
    if (!salonIds?.length) continue;

    const salonId = salonIds[0];
    const locationSlug = SALON_MAP[salonId];
    if (!locationSlug) {
      console.warn(
        `[airtable] Unknown salon ID "${salonId}" for service "${name}" — skipping. Add it to SALON_MAP.`,
      );
      continue;
    }

    // Category from singleSelect (Airtable returns plain string for singleSelect)
    const categoryRaw = fields[F.category] as string | { id: string; name: string } | undefined;
    const categoryName = typeof categoryRaw === "string" ? categoryRaw : categoryRaw?.name;
    const category = categoryName ? slugify(categoryName) : "inne";

    services.push({
      airtableId: rec.id,
      name: name.trim(),
      locationSlug,
      category,
      duration: (fields[F.duration] as number) ?? null,
      price: (fields[F.price] as number) ?? null,
      description: ((fields[F.description] as string) ?? "").trim(),
    });
  }

  cached = { services };
  console.log(
    `[airtable] Fetched ${serviceRecords.length} records → ${services.length} valid services`,
  );
  return cached;
}

// ── Services Loader ──────────────────────────────────────
export function airtableServicesLoader(): Loader {
  return {
    name: "airtable-services",
    async load({ store }) {
      const { services } = await fetchAirtableData();

      // Group by exact service name → deduplicate
      const groups = new Map<string, RawService[]>();
      for (const svc of services) {
        const existing = groups.get(svc.name);
        if (existing) {
          existing.push(svc);
        } else {
          groups.set(svc.name, [svc]);
        }
      }

      store.clear();

      for (const [name, records] of groups) {
        const slug = slugify(name);

        // Check for slug collisions
        const prices = records.map((r) => r.price).filter((p): p is number => p !== null);
        const durations = records.map((r) => r.duration).filter((d): d is number => d !== null);

        const priceMin = prices.length > 0 ? Math.min(...prices) : null;
        const priceMax = prices.length > 0 ? Math.max(...prices) : null;
        const durMin = durations.length > 0 ? Math.min(...durations) : 0;
        const durMax = durations.length > 0 ? Math.max(...durations) : 0;

        // Use first record for shared fields
        const first = records[0];

        store.set({
          id: slug,
          data: {
            name,
            slug,
            category: first.category,
            description: first.description,
            duration: { min: durMin, max: durMax },
            priceRange: { min: priceMin, max: priceMax },
          },
        });
      }

      console.log(
        `[airtable] Services: ${groups.size} unique services from ${services.length} records`,
      );
    },
  };
}

// ── ServiceLocations Loader ──────────────────────────────
export function airtableServiceLocationsLoader(): Loader {
  return {
    name: "airtable-service-locations",
    async load({ store }) {
      const { services } = await fetchAirtableData();

      store.clear();

      for (const svc of services) {
        const serviceSlug = slugify(svc.name);
        const id = `${svc.locationSlug}--${serviceSlug}`;

        store.set({
          id,
          data: {
            locationSlug: svc.locationSlug,
            serviceSlug,
            priceMin: svc.price,
            priceMax: null, // Airtable has single price per location
            duration: svc.duration ?? 0,
            available: true,
          },
        });
      }

      console.log(
        `[airtable] ServiceLocations: ${services.length} entries`,
      );
    },
  };
}

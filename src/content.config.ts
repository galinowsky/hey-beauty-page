import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// ── Locations ──────────────────────────────────────────
const locations = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/data/locations" }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    shortName: z.string(),
    booksyId: z.string(),
    booksyUrl: z.string().url(),
    address: z.object({
      street: z.string(),
      city: z.string().default("Kraków"),
      postalCode: z.string(),
      country: z.string().default("PL"),
      district: z.string().optional(),
    }),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
    phone: z.string().optional(),
    openingHours: z
      .array(
        z.object({
          dayOfWeek: z.string(),
          opens: z.string(),
          closes: z.string(),
        }),
      )
      .default([]),
    rating: z
      .object({
        value: z.number(),
        count: z.number(),
      })
      .optional(),
    images: z.array(z.string()).default([]),
    sortOrder: z.number().default(0),
  }),
});

// ── Services ───────────────────────────────────────────
const services = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/data/services" }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    category: z.string(),
    description: z.string(),
    longDescription: z.string().optional(),
    duration: z.object({
      min: z.number(),
      max: z.number(),
    }),
    priceRange: z.object({
      min: z.number(),
      max: z.number(),
    }),
    booksySlug: z.string(),
    image: z.string().optional(),
    sortOrder: z.number().default(0),
  }),
});

// ── Service-Location Cross-References ──────────────────
const serviceLocations = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/data/service-locations" }),
  schema: z.object({
    locationSlug: z.string(),
    serviceSlug: z.string(),
    priceMin: z.number(),
    priceMax: z.number().optional(),
    priceNote: z.string().optional(),
    duration: z.number(),
    available: z.boolean().default(true),
    booksyDirectUrl: z.string().url().optional(),
  }),
});

// ── Specialists ────────────────────────────────────────
const specialists = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/data/specialists" }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    photo: z.string().optional(),
    bio: z.string().optional(),
    locationSlug: z.string(),
    services: z.array(z.string()).default([]),
    instagram: z.string().url().optional(),
    sortOrder: z.number().default(0),
  }),
});

// ── FAQ ────────────────────────────────────────────────
const faq = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/data/faq" }),
  schema: z.object({
    items: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      }),
    ),
    scope: z.enum(["global", "service", "location"]),
    scopeSlug: z.string().optional(),
  }),
});

export const collections = { locations, services, serviceLocations, specialists, faq };

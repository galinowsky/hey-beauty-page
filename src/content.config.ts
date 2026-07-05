import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import {
  airtableServicesLoader,
  airtableServiceLocationsLoader,
} from "./loaders/airtable";

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

// ── Services (from Airtable) ──────────────────────────────
const services = defineCollection({
  loader: airtableServicesLoader(),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    category: z.enum(["kosmetologia", "kosmetyka", "wlosy", "inne"]),
    description: z.string().default(""),
    duration: z.object({
      min: z.number(),
      max: z.number(),
    }),
    priceRange: z.object({
      min: z.number().nullable(),
      max: z.number().nullable(),
    }),
    image: z.string().optional(),
    sortOrder: z.number().optional(),
  }),
});

// ── Service-Location Cross-References (from Airtable) ─────
const serviceLocations = defineCollection({
  loader: airtableServiceLocationsLoader(),
  schema: z.object({
    locationSlug: z.string(),
    serviceSlug: z.string(),
    priceMin: z.number().nullable(),
    priceMax: z.number().nullable(),
    duration: z.number(),
    available: z.boolean().default(true),
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
    specialty: z.string().optional(),
    specialtyUrl: z.string().optional(),
    locationSlug: z.string(),
    services: z.array(z.string()).default([]),
    instagram: z.string().url().optional(),
    booksyStafferUrl: z.string().url().optional(),
    videoUrl: z.string().optional(),
    featured: z.boolean().default(false),
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

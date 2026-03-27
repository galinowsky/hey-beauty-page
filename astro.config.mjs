// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://heybeauty.pl",
  output: "static",
  server: {
    host: true, // Expose to local network
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "pl",
        locales: {
          pl: "pl-PL",
          en: "en-US",
          uk: "uk-UA",
        },
      },
    }),
  ],
});

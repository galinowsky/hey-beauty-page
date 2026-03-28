// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

// https://astro.build/config
export default defineConfig({
  site: isGitHubPages ? "https://galinowsky.github.io" : "http://localhost:4321",
  base: isGitHubPages ? "/hey-beauty-page" : "/",
  output: "static",
  i18n: {
    defaultLocale: "pl",
    locales: ["pl", "en", "uk"],
    routing: {
      prefixDefaultLocale: false, // Polish stays at /uslugi/, not /pl/uslugi/
    },
  },
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

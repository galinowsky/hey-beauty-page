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

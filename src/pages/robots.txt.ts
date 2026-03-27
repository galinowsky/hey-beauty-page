import type { APIRoute } from "astro";

export const GET: APIRoute = () => {
  const robotsTxt = `# Hey Beauty — heybeauty.pl
User-agent: *
Allow: /

# AI Crawlers — welcome
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Bingbot
Allow: /

Sitemap: https://heybeauty.pl/sitemap-index.xml
`;

  return new Response(robotsTxt, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};

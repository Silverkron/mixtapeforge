import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { locales, route, absolute } from "../lib/site";
import { pageKeys } from "../data/pages";
const xml = (s: string) =>
  s.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
export const GET: APIRoute = async ({ site }) => {
  const entries = await getCollection("articles");
  const paths = ["", ...pageKeys, "articles"];
  const articleIds = [...new Set(entries.map((e) => e.data.id))];
  const rows = site
    ? [...paths, ...articleIds.map((id) => `articles/${id}`)].flatMap((path) =>
        locales.map(
          (lang) =>
            `<url><loc>${xml(absolute(route(lang, path), site)!)}</loc>${locales.map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${xml(absolute(route(l, path), site)!)}"/>`).join("")}</url>`,
        ),
      )
    : [];
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${rows.join("")}</urlset>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
};

import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import {
  brand,
  locales,
  route,
  absolute,
  type Locale,
  ui,
} from "../../lib/site";
export function getStaticPaths() {
  return locales.map((lang) => ({ params: { lang } }));
}
const escape = (s: string) =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
export const GET: APIRoute = async ({ params, site }) => {
  const lang = params.lang as Locale,
    entries = await getCollection("articles", (e) => e.data.lang === lang);
  const base = site || new URL("http://localhost:4321");
  const items = entries
    .sort((a, b) => b.data.updated.getTime() - a.data.updated.getTime())
    .map(
      (e) =>
        `<item><title>${escape(e.data.title)}</title><link>${escape(absolute(route(lang, `articles/${e.data.id}`), base)!)}</link><guid>${escape(absolute(route(lang, `articles/${e.data.id}`), base)!)}</guid><description>${escape(e.data.description)}</description></item>`,
    );
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${escape(brand)} · ${escape(ui[lang].allArticles)}</title><link>${escape(absolute(route(lang, "articles"), base)!)}</link><description>${escape(ui[lang].articleIntro)}</description><language>${lang}</language>${items.join("")}</channel></rss>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
};

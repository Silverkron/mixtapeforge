import type { APIRoute } from "astro";
import { asset, absolute } from "../lib/site";
export const GET: APIRoute = ({ site }) =>
  new Response(
    site
      ? `User-agent: *\nAllow: /\nSitemap: ${absolute(asset("sitemap.xml"), site)}\n`
      : "User-agent: *\nDisallow: /\n",
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );

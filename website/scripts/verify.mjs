import { readdir, readFile, stat } from "node:fs/promises";
import { resolve, join } from "node:path";
import { load } from "cheerio";
import { deployment } from "./deployment.mjs";
const root = resolve("dist"),
  { site, base } = deployment(process.env),
  origin = site || "http://localhost:4321";
const errors = [];
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((e) =>
        e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
      ),
    )
  ).flat();
}
const files = await walk(root),
  html = files.filter((f) => f.endsWith(".html"));
const cache = new Map();
async function document(file) {
  if (!cache.has(file)) cache.set(file, load(await readFile(file, "utf8")));
  return cache.get(file);
}
async function checkTarget(raw, from, attribute) {
  if (!raw || /^(mailto:|tel:|data:|javascript:)/.test(raw)) return;
  const relative = from.slice(root.length).replaceAll("\\", "/");
  const fromPath = relative.endsWith("/index.html")
    ? relative.slice(0, -10)
    : relative;
  const url = new URL(
    raw,
    new URL(`${base.replace(/\/$/, "")}${fromPath}`, origin),
  );
  if (url.origin !== origin) return;
  if (!url.pathname.startsWith(base)) {
    errors.push(`${relative}: ${attribute} escapes base ${raw}`);
    return;
  }
  const local = decodeURIComponent(url.pathname.slice(base.length));
  let file = resolve(root, local);
  if (!file.startsWith(root)) {
    errors.push(`${relative}: invalid path ${raw}`);
    return;
  }
  if (url.pathname.endsWith("/")) file = join(file, "index.html");
  try {
    const s = await stat(file);
    if (s.isDirectory()) file = join(file, "index.html");
    await stat(file);
  } catch {
    errors.push(`${relative}: broken ${attribute} ${raw}`);
    return;
  }
  if (url.hash && file.endsWith(".html")) {
    const $ = await document(file);
    const id = decodeURIComponent(url.hash.slice(1));
    if (
      !$("[id]")
        .toArray()
        .some((e) => $(e).attr("id") === id)
    )
      errors.push(`${relative}: missing anchor ${raw}`);
  }
}
const titles = new Map();
for (const file of html) {
  const $ = await document(file),
    relative = file.slice(root.length);
  if ($("h1").length !== 1) errors.push(`${relative}: expected one h1`);
  if (!$("html").attr("lang")) errors.push(`${relative}: missing lang`);
  if (!$('meta[name="description"]').attr("content"))
    errors.push(`${relative}: missing description`);
  if (!$("a.skip-link").length) errors.push(`${relative}: missing skip link`);
  if (site && !relative.endsWith("/404.html") && relative !== "/index.html") {
    const expected = new URL(
      `${base.replace(/\/$/, "")}${relative.replace(/index\.html$/, "")}`,
      site,
    ).href;
    if ($('link[rel="canonical"]').attr("href") !== expected)
      errors.push(`${relative}: canonical mismatch`);
    if ($("link[hreflang]").length !== 6)
      errors.push(`${relative}: incomplete alternates`);
    if ($('meta[name="robots"]').attr("content")?.includes("noindex"))
      errors.push(`${relative}: public page noindex`);
  }
  const title = $("title").text();
  if (titles.has(title) && relative !== "/index.html")
    errors.push(`${relative}: duplicate title ${title}`);
  titles.set(title, relative);
  const ids = $("[id]")
    .toArray()
    .map((e) => $(e).attr("id"));
  if (new Set(ids).size !== ids.length)
    errors.push(`${relative}: duplicate element IDs`);
  for (const el of $("img").toArray()) {
    if (!$(el).attr("alt")?.trim())
      errors.push(`${relative}: image without alt`);
  }
  for (const el of $('script[type="application/ld+json"]').toArray()) {
    try {
      JSON.parse($(el).text());
    } catch {
      errors.push(`${relative}: invalid structured data`);
    }
  }
  const articleLocale = relative.match(
    /^\/(en|it|fr|de|es)\/articles\/[^/]+\/index\.html$/,
  )?.[1];
  if (articleLocale) {
    const fromUrl = new URL(
      `${base.replace(/\/$/, "")}${relative.replace(/index\.html$/, "")}`,
      origin,
    );
    for (const el of $(
      ".prose a[href], .guide-prerequisites a[href], .guide-next a[href]",
    ).toArray()) {
      const destination = new URL($(el).attr("href"), fromUrl);
      if (destination.origin !== origin) continue;
      const targetLocale = destination.pathname
        .slice(base.length)
        .match(/^(en|it|fr|de|es)\/articles\//)?.[1];
      if (targetLocale && targetLocale !== articleLocale)
        errors.push(
          `${relative}: guide link changes language ${destination.pathname}`,
        );
    }
  }
  for (const el of $("[href],[src]").toArray()) {
    for (const attr of ["href", "src"])
      if ($(el).attr(attr)) await checkTarget($(el).attr(attr), file, attr);
  }
}
const articleCount = html.filter((f) =>
  /[\\/](en|it|fr|de|es)[\\/]articles[\\/][^\\/]+[\\/]index.html$/.test(f),
).length;
const expectedArticles =
  (await readdir(resolve("src/content/articles/en"))).filter((name) =>
    name.endsWith(".md"),
  ).length * 5;
if (articleCount !== expectedArticles)
  errors.push(
    `Expected ${expectedArticles} localized article pages, found ${articleCount}`,
  );
if (site) {
  const sitemap = await readFile(join(root, "sitemap.xml"), "utf8");
  if (!sitemap.includes(site)) errors.push("Sitemap missing public origin");
}
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else
  console.log(
    `Verified ${html.length} HTML pages, ${articleCount} localized articles, internal links, anchors, assets, metadata and language alternates${site ? " for " + site + base : ""}.`,
  );

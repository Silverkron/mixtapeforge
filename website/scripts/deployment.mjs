/** Resolve user pages, repository pages and custom domains without a hardcoded owner. */
export function deployment(env) {
  let site = env.SITE_URL || undefined;
  let base = env.BASE_PATH || "/";
  if (!site && env.GITHUB_REPOSITORY && env.GITHUB_REPOSITORY_OWNER) {
    site = `https://${env.GITHUB_REPOSITORY_OWNER.toLowerCase()}.github.io`;
    const repo = env.GITHUB_REPOSITORY.split("/")[1];
    if (!env.BASE_PATH)
      base = repo.toLowerCase().endsWith(".github.io") ? "/" : `/${repo}/`;
  }
  if (site) {
    const url = new URL(site);
    if (url.protocol !== "https:" && url.hostname !== "localhost")
      throw new Error("SITE_URL must use HTTPS");
    if (url.pathname !== "/")
      throw new Error("Use BASE_PATH for the path and SITE_URL for the origin");
    site = url.origin;
  }
  base = `/${base.split("/").filter(Boolean).join("/")}${base.split("/").filter(Boolean).length ? "/" : ""}`;
  return { site, base };
}

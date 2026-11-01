import { defineConfig } from "astro/config";
import { deployment } from "./scripts/deployment.mjs";

const { site, base } = deployment(process.env);
export default defineConfig({
  site,
  base,
  output: "static",
  trailingSlash: "always",
  build: { format: "directory" },
  devToolbar: { enabled: false },
  vite: {
    define: {
      __PUBLIC_SITE__: JSON.stringify(Boolean(site)),
      __REPOSITORY_URL__: JSON.stringify(
        process.env.PUBLIC_REPOSITORY_URL ||
          (process.env.GITHUB_REPOSITORY
            ? `https://github.com/${process.env.GITHUB_REPOSITORY}`
            : ""),
      ),
    },
  },
});

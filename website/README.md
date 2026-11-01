# MixtapeForge website

Static Astro site, independently built from the desktop application. Sources live here; generated HTML belongs on the `gh-pages` branch. Original code follows the root GPL-3.0-only license. Font licenses are included in `public/fonts/`.

## Local development

Use Node.js **24 LTS** (minimum 22.23.4) and npm. From this folder:

```sh
npm ci
npm run dev
```

The preview is at `http://127.0.0.1:4321/en/`; replace `en` with `it`, `fr`, `de` or `es`. This server is separate from the desktop app on port 1420. The CLI wrapper disables Astro telemetry without writing user preferences.

```sh
npm run format:check
npm run check
npm test
npm run build
npm run verify
npm run preview
```

Tests check the complete multilingual content catalog and deployment path rules. The output verifier checks every generated page, asset, local link, anchor, language alternate and public canonical URL. For a production-like repository-path check, set `SITE_URL=https://example.org` and `BASE_PATH=/cassette-maker/` for both build and verify. Local builds omit public canonical URLs and prohibit indexing rather than inventing a domain.

## Structure

- `src/content/articles/{en,it,fr,de,es}`: complete localized Markdown guides with stable IDs.
- `src/content.config.ts`: validated content schema.
- `src/lib/site.ts`: navigation, localized interface strings and base-aware paths.
- `src/data/pages.ts`, `localized-pages.ts`: product and support page copy.
- `src/layouts`, `src/components`, `src/styles`: shared rendering and visual system.
- `scripts`: development wrapper, deployment configuration and validation.

Each article has the same ID in every language and localized text, title, description, answer, search intent, primary and secondary keywords, and source titles. The language picker preserves the current article. The reading layout adds a direct answer, contents, explicit prerequisites, contextual links, next steps, sources and curated related articles. The library offers four short learning paths. Product pages and the first-session walkthrough link directly to the relevant guides. Search and topic filtering use visible titles, descriptions and keyword fields locally; all articles remain available with JavaScript disabled.

The product website uses six text-free navy, lavender and cyan illustrations; article pages omit decorative header artwork. Selected connection procedures use compact, localized HTML signal diagrams with documented references. Astro generates responsive WebP images from the originals in `src/assets/illustrations/`; each scene has a descriptive alternative in all five languages. Full-width workflow decorations, duplicate product illustrations and explanatory captions have been removed. See [art direction and generation prompts](ILLUSTRATIONS.md). The root README includes a labelled screenshot of the application’s visual browser preview. No hardware test or native-language editorial review is implied by an article's presence.

## Deployment

1. Push this project to its GitHub repository with `main` or `master` as the default branch.
2. In Settings → Pages choose **GitHub Actions** as the publishing source.
3. Allow the workflow to deploy to the `github-pages` environment.
4. Run the Website workflow, or push a change in `website/`.

The production origin is `https://mixtapeforge.lucasciacca.com` and the site is served from the root path (`/`). The deployment workflow supplies these settings explicitly:

- `SITE_URL=https://mixtapeforge.lucasciacca.com`
- `BASE_PATH=/`

The workflow validates before deploying, updates `gh-pages` with static files, and deploys the checked Pages artifact directly. Pull requests only validate. The generated branch should not be edited manually. The generated artifact contains a `CNAME` file for the production host.

Configure this DNS record at the domain provider:

```text
mixtapeforge.lucasciacca.com  CNAME  silverkron.github.io
```

In GitHub repository settings, set the Pages custom domain to `mixtapeforge.lucasciacca.com` and enable **Enforce HTTPS** after GitHub has issued the certificate. The apex domain and `www` configuration are separate and are not used by this site.

The default site links to the current GitHub repository when built in Actions. For another build environment set `PUBLIC_REPOSITORY_URL`. Without it, download pages honestly show source-build instructions and a pending repository link; they do not invent release assets or installer URLs.

## Content standard

Each section should answer a real question, explain a supported feature or limit, give a practical step, or help readers reach a relevant guide. Avoid repeated illustrations, labels that describe the page design, filler paragraphs and captions that merely identify an image as an illustration. Keep useful accessibility alternatives and factual measurement limits.

The full guide editing rules and connection-diagram provenance are in [EDITORIAL.md](EDITORIAL.md). Topic-level source reviews are recorded in `editorial-review-*.md`. Guide tests also check contextual destinations, locale-consistent navigation, prerequisite cycles and incoming links.

The content architecture, SEO/GEO research, editorial templates, link model and per-topic strategy for all 76 subjects are documented in [ARTICLE_STRATEGY.md](ARTICLE_STRATEGY.md). Its final table is generated from the same fields used by the site, so the editorial plan and published metadata do not drift apart.

# calkeep-docs — agent instructions

CI: ldrcoach/.github — https://github.com/ldrcoach/.github

## What this is

The public documentation site for CalKeep, the calendar synchronization and scheduling platform, live at `https://docs.calkeep.com`. This repository is public.
It is a Docusaurus 3 site (classic preset, TypeScript config, `@docusaurus/*` 3.10.1). Pages are Markdown or MDX in `docs/`, the sidebar order is in `sidebars.ts`, brand colors and global styles are in `src/css/custom.css`, and `static/` holds the `CNAME`, images, and `robots.txt`.
Search is Algolia DocSearch, configured in `docusaurus.config.ts` under `themeConfig.algolia`. See `README.md`.

## Build and test

- Install: `npm install` locally; CI uses `npm ci` (npm, `package-lock.json`). Node `>=20.0` per `engines`; CI builds on Node 24.
- Run locally: `npm start` (http://localhost:3000 with hot reload).
- Build: `npm run build` (output in `build/`); preview it with `npm run serve`.
- Type check: `npm run typecheck`.
- There is no test suite; a clean `npm run build` is the check. <!-- inferred -->

## Release and deploy

Merging deploys: every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages (`docs.calkeep.com`) through the `github-pages` environment, so a merge to `main` is a public production change.
- `deploy.yml` uses its own steps (`actions/upload-pages-artifact`, `actions/deploy-pages`), not the shared `ldrcoach/.github` workflows. It can also be run by hand (`workflow_dispatch`).
- `algolia-keepalive.yml` runs one search a week (Mondays 09:17 UTC, and by hand) against the live index with the public search-only key, so Algolia does not pause the application; it fails if the search returns no hits.
- Algolia DocSearch recrawls on its own schedule, so search results can lag behind newly merged content.
- Publishing model (`README.md`): `main` matches the current CalKeep V2 production application lane. Drafts, unreleased features, and larger edits stay on feature branches; promote only production-accurate changes into `main`.
- Roll back by reverting the commit on `main`, which redeploys the previous content. <!-- inferred -->

## Production tier

production — public, customer-facing documentation for CalKeep, a flagship app live in Microsoft's marketplace. <!-- inferred: no .ldrc.yml -->
A wrong page is publicly visible the moment it merges. <!-- inferred -->

## Never

- Never approve a production environment gate, dispatch a production deploy, or roll a container app by hand without the Owner's explicit instruction for that deploy in the current session.
- Never commit secrets, tokens, or credential values; secrets come from Key Vault references or GitHub secrets.
- Never commit Algolia admin keys, write keys, crawler secrets, or dashboard credentials. The committed key is the public, read-only DocSearch key and is meant to be there.
- Never merge drafts or unreleased features into `main`; it publishes to `docs.calkeep.com` immediately.
- Never merge to `main` (or run `deploy.yml` by hand) without the Owner's go-ahead, since that is a production deploy. <!-- inferred -->
- Never delete or change `static/CNAME`. <!-- inferred -->

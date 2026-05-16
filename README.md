# CalKeep Docs

Public documentation for [CalKeep](https://calkeep.com), the calendar synchronization and scheduling platform.

Live site: **[docs.calkeep.com](https://docs.calkeep.com)**

## Edit a page

The fastest path is the **Edit this page** link at the bottom of any doc on the live site — it opens a GitHub PR flow.

Or locally:

```bash
git clone https://github.com/ldrcoach/calkeep-docs.git
cd calkeep-docs
npm install
npm start          # http://localhost:3000 with hot reload
```

Pages live in `docs/` as plain Markdown (with optional MDX). The sidebar order is defined in `sidebars.ts`. Brand colors and global styles are in `src/css/custom.css`.

## Stack

- [Docusaurus 3](https://docusaurus.io/) on the classic preset
- Algolia DocSearch for live docs search at `docs.calkeep.com`
- TypeScript config
- Hosted on GitHub Pages with a custom domain via CNAME
- Deployed by GitHub Actions on every push to `main`

## Publishing model

Production docs are published from `main`, matching the current CalKeep V2
production application lane. Keep that branch aligned with live customer-facing
behavior.

Use feature branches for future documentation work, including drafts,
unreleased features, and larger edits that should not appear on
`docs.calkeep.com` yet. Promote only production-accurate changes into `main`.

## Search

Search is configured in `docusaurus.config.ts` under `themeConfig.algolia` and
is live on `docs.calkeep.com`. The committed key is the public, read-only
DocSearch key for browser queries. Do not commit Algolia admin keys, write keys,
crawler secrets, or dashboard credentials.

Docs publish from `main` immediately, but Algolia DocSearch recrawls on its own
schedule. Search results can lag behind newly merged content until the next
crawl completes.

## License

Documentation content is © CalKeep. Code in this repo (config + workflows) is MIT.

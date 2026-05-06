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
- TypeScript config
- Hosted on GitHub Pages with a custom domain via CNAME
- Deployed by GitHub Actions on every push to `main`

## License

Documentation content is © CalKeep. Code in this repo (config + workflows) is MIT.

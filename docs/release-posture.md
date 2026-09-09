---
title: Current release posture
sidebar_position: 99
description: How CalKeep keeps public docs aligned with the current public product release.
---

# Current release posture

`docs.calkeep.com` documents the current public CalKeep release. It is not a
permanent V1.2, V2.0, or V2.1 archive.

When CalKeep increments, the docs-site `main` branch should move with the
product release. Update customer-facing setup, admin, API, integration,
support, and FAQ pages as part of release closeout. Historical release notes,
handoffs, and implementation plans stay in the main CalKeep repository unless
they become customer-facing guidance.

## Release closeout checklist

Before a public release is considered complete:

1. Update public docs for buyer-visible and admin-visible behavior.
2. Regenerate and review the app sitemap in the CalKeep app repository.
3. Build the docs site locally.
4. Verify `docs.calkeep.com` after the GitHub Pages deploy.
5. Confirm approval-gated topics, private routes, tokenized URLs, secrets, and
   internal operator surfaces were not published.

Google-specific marketing or workflow documentation remains gated until Google
approval is received, even when the rest of the release docs move forward.

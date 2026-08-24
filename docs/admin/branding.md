---
title: Branding
sidebar_position: 3
description: Customize CalKeep with your logo, colors, and copy.
---

# Branding

Your CalKeep workspace can be themed end-to-end so customers and teammates see your brand, not ours. This page covers what you can customize and where it shows up.

## Where your branding shows up

- Public **booking pages** (`calkeep.com/book/your-slug`)
- **Confirmation emails**, reminders, and reschedule notifications sent to your customers
- **Invitation emails** to teammates
- The **branded login page** (`calkeep.com/login?ws=your-slug`)
- **In-app surfaces** for your workspace's users

CalKeep's own brand never appears on customer-facing surfaces if you customize. There's a "Powered by CalKeep" footer toggle on PRO/BUSINESS — turn it off for fully white-labeled output.

## Configure

Go to **Admin Hub → Workspace management → Branding**.

| Field | What it does |
|---|---|
| **Display name** | The product name shown to your customers (defaults to "CalKeep") |
| **App name** | Label used in transactional email subjects |
| **Tagline** | Optional one-liner on booking pages |
| **Primary color** | Buttons, links, brand accents |
| **Secondary color** | Subdued accents |
| **Accent color** | Highlights and chips |
| **Background color** | Page background — light or dark |
| **Font family** | Pick from a curated list of web fonts |
| **Logo (light + dark)** | Upload PNG/SVG/WebP up to 5 MB |
| **Favicon** | The little square icon in browser tabs |
| **Email header image** | Banner at the top of branded emails |
| **Copyright text** | Footer line on emails and booking pages |
| **Custom CSS** | Up to 10 KB of overrides — sanitized to block XSS vectors |

## Contrast checking

CalKeep validates that your primary color meets **WCAG AA contrast** against your background color before letting you save. If it doesn't, CalKeep suggests adjusted shades. (Secondary and accent colors are validated permissively — CalKeep checks they're usable somewhere on the page, not against every surface.)

## Custom CSS

If you want fine-grained control, drop CSS into the **Custom CSS** field. CalKeep strips a defined set of dangerous patterns (`@import`, `expression()`, `vbscript:`, `javascript:`, inline event handlers, `behavior:`, `-moz-binding`) before applying. You can rewrite CSS variables, add font-faces (with caution), or override specific selectors.

## Logo library

Upload multiple logos to **Admin Hub → Workspace management → Branding → Logo library** and pick which one is active. Useful if you maintain seasonal variants or A/B testing.

## Booking-page-level overrides

A specific booking page can override the workspace defaults — useful if one event type needs different colors. Open the booking page editor and use the **Branding** tab.

## Resetting

Click **Reset to defaults** on the Branding page to wipe your customizations and revert to CalKeep's default theme. This doesn't delete your logo library, just unsets the active selection.

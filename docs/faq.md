---
title: FAQ
sidebar_position: 99
description: Frequently asked questions about CalKeep.
---

# Frequently asked questions

## Billing & plans

### How does billing work?

CalKeep bills through **Azure Marketplace**. Your CalKeep subscription appears on your Azure invoice — there's no separate credit card to enter in CalKeep itself. Microsoft is the merchant of record; we handle product, they handle billing.

### Can I switch plans?

Yes. In Azure Marketplace, find your CalKeep subscription and update the plan or seat quantity. CalKeep receives a webhook from Microsoft and your workspace flips to the new plan within a minute. Past usage stays intact across plan changes.

### What happens when I cancel?

Your workspace plan reverts to **CalKeep FREE** immediately. **All your data is preserved** — calendar connections, contacts, tasks, booking pages. Features that require a paid plan become inaccessible, but the data behind them is still there if you reinstate.

### Can I try CalKeep before paying?

Yes — the **FREE plan** is permanently free for 1 user with 1 booking page and 1 event type. It's the easiest way to feel the product. If you need more seats or PRO/BUSINESS features, upgrade through Azure Marketplace.

---

## Calendar sync

### Which calendar providers does CalKeep support?

- **Google Calendar** (any Google or Google Workspace account)
- **Microsoft Outlook** (Outlook.com, Microsoft 365, Exchange Online)
- **iCloud** (via app-specific password)
- **Yahoo Calendar** (via app-specific password)

You can connect any combination — CalKeep syncs them all into one unified view.

### How fast does sync happen?

- **Google and Microsoft:** push notifications when events change, plus a poll every 2 minutes as a safety net. Typically you see updates within seconds.
- **iCloud and Yahoo (CalDAV):** poll every 2 minutes. Updates land within ~2 minutes.

### Does CalKeep modify my calendars?

Only when you ask it to. Creating an event in CalKeep writes to whichever calendar you targeted, and can mirror to other connected calendars based on rules you control.

---

## Bookings

### How do customers book a meeting?

You share your booking page link (e.g., `calkeep.com/book/your-slug`). Customers see your real-time availability across all connected calendars, pick a time, and confirm. The event lands on your calendar; they get a confirmation email.

### Does CalKeep work with my time zone?

Yes — CalKeep is timezone-aware. Booking pages display availability in the customer's local time. Recurring events handle DST correctly.

### Can I charge for bookings?

Stripe Connect support is in active development for direct charges at booking time. SaaS subscription billing already runs through Azure Marketplace.

---

## Security

### What auth methods does CalKeep support?

- **Email + password** with optional **TOTP MFA**
- **Sign in with Microsoft** (OIDC)
- **Passkeys / WebAuthn** (any FIDO2-compliant authenticator including YubiKey, Windows Hello, Touch ID)
- **Magic-link email login** (single-use, 15 minutes)
- **SAML 2.0 SSO** (Enterprise tier — Microsoft Entra ID, Okta, etc.)
- **SCIM 2.0 auto-provisioning** (Enterprise tier)

### Where is my data hosted?

US-based Azure regions (currently `West US 3`). All data is encrypted at rest and in transit.

### Is CalKeep SOC 2 / HIPAA / ISO 27001 compliant?

Compliance attestations are on the roadmap as we scale. If your organization needs a specific attestation before adopting CalKeep, please [contact sales](mailto:sales@calkeep.com) — that signal helps us prioritize.

---

## Support

### How do I reach support?

- **In-product:** the help icon in the sidebar opens a ticket form.
- **Email:** [support@calkeep.com](mailto:support@calkeep.com)
- **Status:** [calkeep.com/support](https://calkeep.com/support)

We're a small team and we read every ticket. If something doesn't work, tell us — that's how we fix it.

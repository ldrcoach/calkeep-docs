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

- **Google** (personal or Google Workspace): current reviewed account setup for
  Calendars, Contacts, and Tasks.
- **Microsoft** (Outlook.com, Microsoft 365, Exchange Online): current reviewed
  account setup for Calendars, Contacts, and Tasks.
- **iCloud and Yahoo:** existing legacy CalDAV connections may remain usable,
  but new app-password onboarding is temporarily paused. Read-only calendar
  links and ICS snapshots are the current alternatives.

For Google and Microsoft, requested access, provider-granted access, discovery,
and activation are separate steps. New collections remain off until you review
and enable them; connecting an account never enables every source or provider
writeback automatically.

### How fast does sync happen?

- **Google and Microsoft:** push notifications when events change, plus a poll every 2 minutes as a safety net. Typically you see updates within seconds.
- **Existing legacy iCloud and Yahoo CalDAV connections:** poll every 2
  minutes. Approved read-only links and imported snapshots follow their own
  refresh/import cadence and never receive writes from CalKeep.

### Does CalKeep modify my calendars?

Only when you ask it to and the exact target collection has effective provider-
write authority. Mirroring requires the same authority on every destination.
Subscribed read-only links and imported snapshots never receive writes.

### Can managers see private calendar event details?

Not by default. CalKeep can use connected calendars for availability blocking
and conflict checks without making every private event title, note, attendee
list, or location manager-visible. For setup guidance, see
[Team calendar visibility and privacy](/admin/team-calendar-visibility).

### Can a sales team use Outlook and Google calendars together?

Yes. Current reviewed Google and Microsoft accounts can coexist with existing
legacy iCloud/Yahoo CalDAV connections and approved read-only calendar links or
snapshots. New iCloud/Yahoo app-password onboarding remains paused. This lets
teams coordinate availability without implying that every source has the same
sync or write capabilities.

---

## Bookings

### How do customers book a meeting?

You share your booking page link (e.g., `calkeep.com/book/your-slug`). Customers
see availability computed from the enabled calendars you selected for
availability, pick a time, and confirm. The event lands on the configured
calendar when that exact target has effective write authority; they get a
confirmation email.

### Does CalKeep work with my time zone?

Yes — CalKeep is timezone-aware. Booking pages display availability in the customer's local time. Recurring events handle DST correctly.

### Can I charge for bookings?

Paid checkout uses a two-stage readiness check. CalKeep's platform integration
must be available **and** your workspace's Stripe or PayPal merchant account
must be connected, fully set up, and accepting charges. The Payments screen may
report unavailable here, status unavailable, not connected, setup incomplete,
connected, accepting charges, recovery, or manual review. If current status
cannot be verified, connection and paid-checkout controls remain unavailable.

CalKeep workspace subscription billing remains separate and runs through Azure
Marketplace.

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

## Marketplace activation and ownership

### What if my activation link expired or was already used?

Return to Azure Portal -> Marketplace -> SaaS subscriptions, open the CalKeep subscription, and choose **Configure account** to restart the activation handoff. If the activation page still reports an expired, already-used, or invalid token, email [support@calkeep.com](mailto:support@calkeep.com) with the purchaser email and approximate purchase time.

### Who controls billing versus workspace administration?

The **Azure billing owner** controls the Marketplace subscription, plan, cancellation, and seat quantity in Azure. A **CalKeep workspace admin** controls product setup inside CalKeep: team members, connected calendars, branding, security settings, and day-to-day workspace configuration. The same person can hold both roles, but they do not have to.

If a workspace admin needs more seats, the billing owner updates the quantity in Azure Marketplace. CalKeep then receives the change and updates the workspace seat ceiling.

### What if my Azure subscription is suspended or canceled?

If Azure reports a suspended or canceled subscription, CalKeep restricts paid-plan features according to the subscription state. Your workspace data is preserved. If you reinstate or update the Marketplace subscription, CalKeep restores the matching entitlement after the Microsoft webhook arrives.

---

## Data and automation

### Does CalKeep have an API or webhooks?

Business and Enterprise workspaces can use existing scoped API tokens with the
versioned API, and signed webhooks currently cover booking lifecycle plus public
API V1 contact create/patch events. New API-token issuance in the current
Integration Center is temporarily paused, and other webhook labels are not yet
a delivery contract. See [Platform automation](/admin/platform-automation).

### Can I export my data?

Yes. Calendar data can be exported in ICS format, contacts can be exported in CSV or vCard format, and Business/Enterprise workspaces have CSV export coverage for supported operational data. Email [support@calkeep.com](mailto:support@calkeep.com) if you need help with a larger portability or compliance request.

### How do I delete a workspace or close an account?

Full workspace deletion and account closure are currently support-assisted.
Email [support@calkeep.com](mailto:support@calkeep.com) from a workspace admin
or owner address and include the workspace name. Support will confirm
authority, explain retention and backups, and coordinate the deletion.

### How do I report a security issue?

Email [security@calkeep.com](mailto:security@calkeep.com). PGP key is available on request.

---

## Support

### How do I reach support?

- **In-product:** **Help & Support** in the sidebar opens recovery guidance,
  FAQ, and a reviewed support request.
- **Email:** [support@calkeep.com](mailto:support@calkeep.com)
- **Status:** [calkeep.com/support](https://calkeep.com/support)

We're a small team and we read every ticket. If something doesn't work, tell us — that's how we fix it.

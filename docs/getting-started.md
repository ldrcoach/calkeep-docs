---
title: Getting started
sidebar_position: 2
description: What to do in your first 10 minutes after activating CalKeep.
---

# Getting started

If you're reading this, you just signed up for CalKeep — likely through Azure Marketplace. Here's what to do next, in order.

## What just happened

You signed up for CalKeep through Microsoft Azure Marketplace. Your subscription appears on your Azure invoice — CalKeep's billing runs entirely through Microsoft. You won't need to enter a credit card anywhere in CalKeep itself.

Before anyone on your team can use the product, you need to complete one quick activation step. It takes about two minutes.

---

## Step 1: Activate your workspace

After you completed the purchase, Microsoft showed you a "Configure your new software plan" button. Clicking that sent you to `https://calkeep.com/activate` with a special token in the URL.

**If you're already there:** you'll see your plan details (plan name, number of seats, the email used to purchase). Click **Sign in with Microsoft** — since you bought through Azure, you already have a Microsoft account, and that's the fastest path. After you sign in, click **Activate CalKeep**. You'll land on your calendar.

**If you closed that tab:** go back to the Azure Portal → Marketplace → SaaS subscriptions, find your CalKeep subscription, and click "Configure account." That will take you back to the activation page.

**If something goes wrong:** the activation page shows a clear error if the token is expired or already used. Drop us a line at [support@calkeep.com](mailto:support@calkeep.com) and we'll sort it out.

---

## Step 2: Orient your account

The first-visit **Screen Guide** explains the current screen and its primary
actions. You can reopen it later from **Screen Guide** without losing your
place.

Open **Personal Settings** for the account-readiness guide. It links directly
to profile details, calendar setup, appearance and notifications, reminders,
and password/security work. Multi-factor enrollment is under **Personal
Settings → Multi-Factor Authentication**. Each section loads independently, so
an unavailable read is not shown as a saved default.

---

## Step 3: Connect the sources you want

Open **Calendar Connections**, choose Google or Microsoft, and select the
source types you want CalKeep to request **before** leaving for provider
authorization:

- Calendars
- Contacts
- Tasks

Any requestable non-empty combination is valid; you do not have to select a
calendar. CalKeep then shows a separate access review. Requested, provider-
granted, discovered, and enabled are different states: a provider denial stays
“requested but not granted,” and a capability this deployment cannot request
is “unavailable,” not a choice you made.

After authorization, review the discovered calendars, contact books, and task
lists. New calendars are inactive until you decide how to use them. Contact
books and task lists start with sync and writeback off. Provider permission or
discovery alone never enables synchronization, writeback, or delete-at-source.

New iCloud and Yahoo app-password onboarding is currently paused. See
[iCloud and Yahoo](/integrations/icloud-and-yahoo) for the read-only link and
file-snapshot alternatives.

---

## Step 4: Set up workspace branding (optional, but nice)

CalKeep lets you put your company name, logo, and colors on booking pages,
confirmation emails, and invite links. Go to **Admin Hub → Workspace
management → Branding** to upload a logo, choose colors, and set identity copy.

Draft changes update the local preview. Customer-facing pages change only after
**Save** succeeds. See [Branding](/admin/branding) for the full reference.

---

## Step 5: Onboard your team

You bought seats for your team — let's fill them. A person joins the intended
workspace through an invitation, an invite link, or a verified domain
auto-join policy. Direct Microsoft sign-in is suitable for an existing member
or someone covered by verified domain auto-join; a workspace-branded login link
does not by itself grant membership.

### Option A: Domain auto-join (best for onboarding everyone with `@yourcompany.com`)

If your whole team has the same email domain, you can set things up so anyone who signs in with a `@yourcompany.com` Microsoft account automatically joins your workspace.

Go to **Admin Hub → Workspace management → Team members → Domain auto-join**:

1. Type your company domain (e.g., `yourcompany.com`) and click **Add domain**.
2. CalKeep generates a DNS TXT record challenge — it looks like `calkeep-domain-verify=abc123`. Add that TXT record at the apex of your domain (`yourcompany.com`, not a subdomain). Your DNS provider (GoDaddy, Cloudflare, Route 53, etc.) is where you do this.
3. Once the record is live (usually a few minutes, sometimes up to an hour for propagation), click **Verify** in CalKeep.
4. Choose the auto-join role. We recommend **user** unless every new person at
   the verified domain should administer the workspace. After verification, a
   new Microsoft sign-in from `@yourcompany.com` joins with that configured
   role.

People who registered at your domain before you enabled auto-join are not retroactively pulled into your workspace — auto-join only catches new sign-ins after verification.

### Option B: M365 directory picker (for admins who want to select specific people)

If you want to hand-pick teammates from your Microsoft 365 tenant, go to
**Admin Hub → Workspace management → Team members**, find **Invite from Microsoft
365**, and click **Connect Microsoft 365 Directory**.

You'll be asked to authorize CalKeep to read your tenant's user list (just read-only, just names and email addresses — no calendar data, no messages). Once you authorize:

1. A searchable list of your Microsoft 365 users appears.
2. Select the people you want to invite.
3. Click **Send invitations**. Each person gets an email with a link to join your workspace.

You only need to authorize once. The connection stays active so you can come back and invite more people later.

### Option C: Invite link, magic-link login, or CSV paste (fallback options)

If the Microsoft-based paths don't work for your situation:

**Invite link:** Go to **Admin Hub → Workspace management → Team members → Invite
Links**. Generate a shareable link you can drop in Slack, Teams, or email. You
can set an expiry date, a max number of uses, or restrict it to a specific email
domain.

**Magic-link login:** After a person has joined through an invitation, invite
link, or verified auto-join policy, they can enter their work email at
`https://calkeep.com/login` and choose **Email me a sign-in link**. The
single-use link authenticates that member without a password; it does not place
an unknown email into a workspace.

**CSV bulk invite:** Go to **Admin Hub → Workspace management → Team members** and
use **Bulk invite**. Paste a CSV (or list) of email addresses, assign roles, and
send. Each person gets a standard invitation email.

For more on managing the team after onboarding, see [Team management](/admin/team-management).

---

## Step 6: Use the Admin Hub

As the person who activated the subscription, you're the workspace admin. That means:

- **Manage team members** — invite, remove, and set roles from **Admin Hub → Workspace management → Team members**.
- **See seat usage** — the Team settings page shows how many of your purchased seats are in use. If you need more seats, go back to your Azure Marketplace subscription and update the quantity there.
- **Review source setup** — return to **Calendar Connections** to distinguish provider access, discovery, activation, synchronization, and writeback.
- **Create booking pages** — go to Booking Pages to set up a publicly shareable scheduling link. Useful for sales calls, interviews, or anything where you want someone to pick a time without the back-and-forth.
- **Set up branding** — use **Admin Hub → Workspace management → Branding**.
- **Configure workspace security** — use **Admin Hub → Security & identity**. Personal MFA and passkeys remain in **Personal Settings**.

The Admin Hub groups **Workspace management**, **Security & identity**, and
**Integrations & services**. An available control is not proof that its service
is configured or healthy. [Read the Admin Hub guide](/admin/admin-hub) before
turning on identity or integration controls.

---

## Step 7: What happens if you cancel

If you cancel your CalKeep subscription through Azure Marketplace:

- Your workspace plan reverts to **CalKeep FREE** immediately when the cancellation webhook arrives.
- All your data is preserved — calendar connections, booking pages, contacts, tasks, everything. Nothing is deleted.
- Features that require a paid plan become inaccessible, but the data behind them is still there.
- If you reinstate the subscription through Azure Marketplace, the plan is restored and you're back to full access.

If you ever need help with data export or account closure, contact us at [support@calkeep.com](mailto:support@calkeep.com). Full workspace deletion is currently handled through support rather than an in-app button.

---

## Getting help

- **Help & Support:** use the sidebar for recovery-first guidance, FAQ, and
  support contact. Calendar, sync, and account problems link back to their exact
  review screens without silently changing a connection.
- **Diagnostic preview:** when support needs context, you can assemble a
  redacted diagnostic summary and review it before submitting. Secrets,
  provider payloads, private event details, and unnecessary personal data are
  excluded; previewing does not store or send it.
- **Email:** [support@calkeep.com](mailto:support@calkeep.com)
- **Privacy policy:** [calkeep.com/privacy](https://calkeep.com/privacy)
- **Terms:** [calkeep.com/terms](https://calkeep.com/terms)

We're a small team and we read the support inbox. If something isn't working or something in this guide is confusing, tell us — it helps us fix it for the next person.

Welcome to CalKeep.

---
title: Getting started
sidebar_position: 2
description: What to do in your first 10 minutes after activating CalKeep.
---

# Getting started

If you're reading this, you just signed up for CalKeep — likely through Azure Marketplace. Here's what to do next, in order.

## What just happened

You bought seats of CalKeep PRO or BUSINESS through Microsoft Azure Marketplace. That purchase will show up on your Azure invoice — CalKeep's billing runs entirely through Microsoft. You won't need to enter a credit card anywhere in CalKeep itself.

Before anyone on your team can use the product, you need to complete one quick activation step. It takes about two minutes.

---

## Step 1: Activate your workspace

After you completed the purchase, Microsoft showed you a "Configure your new software plan" button. Clicking that sent you to `https://calkeep.com/activate` with a special token in the URL.

**If you're already there:** you'll see your plan details (plan name, number of seats, the email used to purchase). Click **Sign in with Microsoft** — since you bought through Azure, you already have a Microsoft account, and that's the fastest path. After you sign in, click **Activate CalKeep**. You'll land on your calendar.

**If you closed that tab:** go back to the Azure Portal → Marketplace → SaaS subscriptions, find your CalKeep subscription, and click "Configure account." That will take you back to the activation page.

**If something goes wrong:** the activation page shows a clear error if the token is expired or already used. Drop us a line at [support@calkeep.com](mailto:support@calkeep.com) and we'll sort it out.

---

## Step 2: Set up your workspace branding (optional, but nice)

CalKeep lets you put your company name, logo, and colors on booking pages, confirmation emails, and invite links. Your customers and teammates see your branding, not ours.

Go to **Settings → Branding** (in the left sidebar). You can:

- Upload your logo
- Set a primary color
- Add a display name and tagline

Changes show up immediately on any booking page you share externally. We'd suggest doing this before you invite the team, so when they land on your booking page it already looks like yours.

See [Branding](/admin/branding) for the full feature reference.

---

## Step 3: Onboard your team

You bought seats for your team — let's fill them. There are four ways to bring people in. We recommend them in this order:

### Option A: Sign in with Microsoft (fastest for most teams)

Your colleagues don't need an invitation. Just send them this link:

```
https://calkeep.com/login?ws=YOUR-WORKSPACE-SLUG
```

Replace `YOUR-WORKSPACE-SLUG` with your workspace's slug — you can find it in **Settings → Workspace**. They click **Sign in with Microsoft**, use their work Microsoft account, and land inside your workspace.

This is the fastest path for anyone who already has Microsoft 365. There's nothing to pre-approve on your end.

### Option B: Domain auto-join (best for onboarding everyone with `@yourcompany.com`)

If your whole team has the same email domain, you can set things up so anyone who signs in with a `@yourcompany.com` Microsoft account automatically joins your workspace.

Go to **Settings → Team → Domain auto-join**:

1. Type your company domain (e.g., `yourcompany.com`) and click **Add domain**.
2. CalKeep generates a DNS TXT record challenge — it looks like `calkeep-domain-verify=abc123`. Add that TXT record at the apex of your domain (`yourcompany.com`, not a subdomain). Your DNS provider (GoDaddy, Cloudflare, Route 53, etc.) is where you do this.
3. Once the record is live (usually a few minutes, sometimes up to an hour for propagation), click **Verify** in CalKeep.
4. After verification, any new Microsoft signin from `@yourcompany.com` will auto-join as a regular user.

People who registered at your domain before you enabled auto-join are not retroactively pulled into your workspace — auto-join only catches new sign-ins after verification.

### Option C: M365 directory picker (for admins who want to select specific people)

If you want to hand-pick teammates from your Microsoft 365 tenant, go to **Settings → Team**, scroll to the **Invite from Microsoft 365** section, and click **Connect Microsoft 365 Directory**.

You'll be asked to authorize CalKeep to read your tenant's user list (just read-only, just names and email addresses — no calendar data, no messages). Once you authorize:

1. A searchable list of your Microsoft 365 users appears.
2. Select the people you want to invite.
3. Click **Send invitations**. Each person gets an email with a link to join your workspace.

You only need to authorize once. The connection stays active so you can come back and invite more people later.

### Option D: Invite link, magic-link login, or CSV paste (fallback options)

If the Microsoft-based paths don't work for your situation:

**Invite link:** Go to **Settings → Team → Invite Links**. Generate a shareable link you can drop in Slack, Teams, or email. Anyone who clicks it and signs in will join your workspace. You can set an expiry date, a max number of uses, or restrict it to a specific email domain.

**Magic-link login:** Anyone can go to `https://calkeep.com/login`, enter their work email, and click "Email me a sign-in link." They get a single-use link in their inbox — no password needed. Works for people who don't use Microsoft 365.

**CSV bulk invite:** Go to **Settings → Team** and use the **Bulk invite** option. Paste a CSV (or list) of email addresses, assign roles, and send. Each person gets a standard invitation email.

For more on managing the team after onboarding, see [Team management](/admin/team-management).

---

## Step 4: What you can do as the workspace owner

As the person who activated the subscription, you're the workspace admin. That means:

- **Manage team members** — invite, remove, and set roles (user or admin) from Settings → Team
- **See seat usage** — the Team settings page shows how many of your purchased seats are in use. If you need more seats, go back to your Azure Marketplace subscription and update the quantity there.
- **Connect your calendar** — go to Settings → Connected Accounts to link your Google, Outlook, iCloud, or Yahoo calendar. CalKeep syncs events across all of them.
- **Create booking pages** — go to Booking Pages to set up a publicly shareable scheduling link. Useful for sales calls, interviews, or anything where you want someone to pick a time without the back-and-forth.
- **Set up branding** — Settings → Branding (already covered above).
- **Configure security** — Settings → Security to manage MFA, passkeys, and trusted devices.

---

## Step 5: What happens if you cancel

If you cancel your CalKeep subscription through Azure Marketplace:

- Your workspace plan reverts to **CalKeep FREE** immediately when the cancellation webhook arrives.
- All your data is preserved — calendar connections, booking pages, contacts, tasks, everything. Nothing is deleted.
- Features that require PRO or BUSINESS become inaccessible, but the data behind them is still there.
- If you reinstate the subscription through Azure Marketplace, the plan is restored and you're back to full access.

If you ever need help with data export or account closure, contact us at [support@calkeep.com](mailto:support@calkeep.com). Full workspace deletion is currently handled through support rather than an in-app button.

---

## Getting help

- **In-product help center:** click the question mark icon in the sidebar for the FAQ and a contact form that routes to our team.
- **Email:** [support@calkeep.com](mailto:support@calkeep.com)
- **Privacy policy:** [calkeep.com/privacy](https://calkeep.com/privacy)
- **Terms:** [calkeep.com/terms](https://calkeep.com/terms)

We're a small team and we read the support inbox. If something isn't working or something in this guide is confusing, tell us — it helps us fix it for the next person.

Welcome to CalKeep.

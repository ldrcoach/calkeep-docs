---
title: CRM and pipeline
sidebar_position: 6
description: Track sales opportunities, deal value, and pipeline movement directly in your scheduling workspace.
---

# CRM and pipeline

CalKeep's CRM layer adds **opportunities** on top of contacts so you can
track deals, stages, and pipeline value without buying a separate CRM.

Find it at **Pipeline** in the sidebar.

## Plan tier

The CRM / Opportunities surface is gated to **Business** and **Enterprise**.

Free, Pro, and lower tiers have full access to **Contacts** (see
[Contacts](/contacts)) — opportunities is the layer that adds stages,
deal value, and forecast.

## What an opportunity adds over a contact

A contact is a person or organization. An opportunity is a deal:

- **Stage** — where the opportunity is in your pipeline (e.g., discovery,
  proposal, negotiation, closed-won, closed-lost).
- **Deal value** — what the opportunity is worth.
- **Probability / weighted forecast** — derived from stage.
- **Linked contacts** — the people involved.
- **Linked bookings** — the meetings that moved this opportunity along.
- **Linked tasks** — the next steps the team owes the customer.

This is the difference between "I know this person exists" and "we expect
to close this account in Q2 for $X with these next-steps."

## How opportunities connect to the rest of CalKeep

CalKeep is a scheduling workspace first, so opportunities are tightly
linked to bookings and contacts:

- A booking from a prospect can be promoted to an opportunity in one click.
- Tasks can attach to an opportunity, so the next-step owed to the
  customer rolls up to the deal.
- Process runs (see [Processes](/tasks#processes)) can drive a sales motion
  — discovery → proposal → close — with each step assigned and due.
- Reminders on opportunities ensure no deal sits stale.

## Workflow

A typical pattern:

1. A prospect books a discovery call through one of your booking pages.
2. CalKeep auto-creates a contact.
3. After the call, promote the contact to an opportunity, set the stage
   to "discovery", and pick a value estimate.
4. As the deal advances, move it through stages; CalKeep recomputes the
   weighted forecast.
5. Attach next-step tasks (proposal due, follow-up call, contract sent).
6. When the deal closes, mark the opportunity `closed-won` or
   `closed-lost`. The booking, contact, and task history stay intact for
   reference.

## Why this isn't HubSpot or Salesforce

CalKeep's CRM is intentionally lightweight. If your sales motion needs
custom objects, complex automations, multi-step approval flows,
account-based marketing, or deep MAP/MAS integrations, a dedicated CRM
will fit better.

What CalKeep's CRM does that the heavyweights don't:

- It's already where your booking, contact, and task data live — no
  syncing, no duplicate entry.
- It's priced as part of your scheduling workspace, not as a separate
  product.
- It scales with the team you actually have (typically under 50 people).

## Plan upgrade

Workspaces on Free or Pro see a plan-upgrade prompt when they navigate
to the Pipeline section. The contacts and tasks they've been using stay
intact — upgrading flips the opportunity surface on; downgrading does
not delete opportunity data, but the surface becomes read-only until the
plan is restored.

## Programmatic access

Business and Enterprise integrations can read opportunities through the
documented read-only `/api/v2/opportunities` family. Opportunity webhook labels
are not part of the current production delivery contract, so integrations must
reconcile this projection. See [API tokens](/admin/api) and
[Webhooks](/admin/webhooks).

For workspaces that need full CRM data export, the contact CSV export
and booking CSV (planned) are the workspace-portable artifacts.

## Buyer-facing positioning

For the public-facing description of how the pipeline tier fits into a
small-team sales motion, see
[Track sales opportunities and pipeline value, not just a contact list](https://calkeep.com/solutions/sales-pipeline-with-opportunities).

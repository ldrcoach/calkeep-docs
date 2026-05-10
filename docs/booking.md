---
title: Booking pages
sidebar_position: 1
description: Publicly-shareable scheduling links with event types, intake fields, recurring options, and reschedule controls.
---

# Booking pages

A **booking page** is a public scheduling link your customers, prospects, or
teammates use to grab time on your calendar. CalKeep's booking pages pull from
real availability across every connected calendar and feed every booked
meeting into your workspace as a contact + task for follow-up.

Public URL shape:

```
https://calkeep.com/book/<your-slug>
```

The slug is set when you create the page.

## How booking pages work

Each booking page is composed of one or more **event types**. An event type is
a specific kind of meeting — "30-min discovery call", "annual review",
"office hours" — with its own duration, availability rules, and intake
questions.

You can run several event types off one booking page (visitors pick which one
they want), or run separate pages for separate audiences.

## Plan limits

| Plan | Booking pages per user | Event types per user |
|---|---|---|
| **Free** | 1 | 1 |
| **Pro** | Unlimited | Unlimited |
| **Business** | Unlimited | Unlimited |
| **Enterprise** | Unlimited | Unlimited |

If you need multiple advisors each publishing their own pages, that's a Pro+
workspace.

## Create a booking page

1. Go to **Booking Pages** in the sidebar.
2. Click **New booking page**.
3. Set a **slug** (this becomes the public URL), display name, and optional
   description.
4. Pick one or more event types to include. (You can create event types from
   the same flow or under **Event Types**.)
5. Save and click **Copy link** to share.

## Event types

Each event type controls:

- **Duration** — 15, 30, 60 minutes, or custom.
- **Availability profile** — which working-hours profile applies. See
  [Availability profiles](/availability) for how to set those up.
- **Intake fields** — what you want visitors to tell you when they book.
- **Recurring options** — whether the visitor can book a recurring series.
- **Confirmation copy** — what they see after booking.
- **Reminders** — channels and offsets for booker and host.

The event type is reusable across booking pages, so a "30-min discovery call"
event can appear on a public sales page, an internal hand-off page, and a
partner page without duplication.

## Intake fields

Add custom questions to each event type at **Event Types → [type] → Intake
fields**. Common patterns:

- "What's the goal of this call?"
- "Company size?"
- "How did you hear about us?"

Answers land on the booking record and on the auto-created contact, so your
follow-up tasks have context without manual data entry.

## Recurring bookings

Visitors can book a recurring series — weekly, biweekly, every-third-week —
when the event type allows it. The host configures:

- Whether recurring is permitted at all (off by default).
- Allowed frequencies (e.g., weekly + biweekly only, no monthly).
- Maximum occurrences in the series.
- Maximum weeks-out window (so a series doesn't run forever).

Each occurrence is generated using an iCalendar `RRULE` and an exception model:
cancelling or rescheduling one instance keeps the rest of the series intact.
See [Recurrence](/recurrence) for the full edit/cancel-scope behavior.

## Cancellation and reschedule

Confirmation emails include reschedule and cancel links. Visitors don't need a
CalKeep account.

For recurring series, both cancel and reschedule offer three scopes:

- **This event only** — exception is created; rest of the series unaffected.
- **All events** — series cancelled or moved.
- **This and future** — series is trimmed (cancel) or split (reschedule) at
  this occurrence.

Cancellation tokens are single-use and rotate on every action, so a forwarded
old link can't be reused after a reschedule.

## Paid bookings (optional)

Event types can require payment at booking time. CalKeep integrates
with **Stripe Connect** and **PayPal Commerce**. On a paid event type:

- Visitors enter payment after picking a slot, before the booking is
  confirmed.
- Pricing is set per event type (price in cents, currency, supported
  providers).
- Cancellation policy is configurable: full refund, partial refund (with
  a percentage), or no refund — with a refund window in hours before
  the event start (default 24 hours).
- Connect Stripe or PayPal at **Settings → Workspace Admin → Payments**.

If you don't configure payments, all event types are free — no payment
prompt appears in the booking flow.

## Branding

Booking pages inherit your workspace branding — logo, colors, font, copyright
text. See [Branding](/admin/branding) for the full configuration surface,
including custom CSS for fine-grained overrides.

A specific booking page can override the workspace defaults under **Booking
Pages → [page] → Branding** if one event type needs different colors.

## What happens after a booking

When a visitor books:

1. The event lands on the host's connected calendar (the calendar the host
   selected for that event type).
2. CalKeep auto-creates a contact record (or matches an existing one) so
   follow-up has a home.
3. Confirmation, reminder, and (where applicable) reschedule emails are sent
   to both visitor and host using your branded templates.
4. The `booking.created` webhook fires for any subscribed integrations. See
   [Webhooks](/admin/webhooks).

For follow-up workflows after the meeting ends, see [Tasks, projects, and
processes](/tasks) and [Contacts](/contacts).

## Round-robin and team booking

A booking page can pool availability across several team members so prospects
land with whichever rep is actually free. Configure under **Booking Pages →
[page] → Hosts**.

Each rep maintains their own calendars and availability profile. The booking
page checks free/busy across the pool and assigns the meeting; the booked
meeting flows into that rep's contacts and tasks.

## Buyer-facing positioning

For the public-facing overview of how booking pages fit into a client-service
practice's workflow, see
[Booking pages for client-service teams](https://calkeep.com/solutions/booking-pages-for-client-teams).

## Troubleshooting

- **Visitor sees no available times:** the event type's availability profile
  may be too narrow, or every connected calendar is fully booked. Check at
  **Event Types → [type] → Availability**.
- **A booking didn't appear on my calendar:** check **Sync History** in the
  sidebar for sync errors on the host's connected account.
- **Customers got a "link expired" page:** cancellation/reschedule links are
  single-use and rotate on every action. If a customer needs a fresh link,
  resend the confirmation from the booking record.

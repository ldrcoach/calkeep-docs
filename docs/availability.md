---
title: Availability profiles
sidebar_position: 2
description: Define when you're bookable, with timezone-aware rules per event type.
---

# Availability profiles

An **availability profile** is a named set of bookable hours and rules. You
can have several — "client work hours", "deep-focus mornings", "office
hours" — and tie different event types to different profiles.

Manage profiles at **Availability** in the sidebar.

## Why profiles instead of one calendar

Most calendar apps let you set "working hours" once and apply them
everywhere. That's fine until you want:

- Coaching sessions only on Tuesday and Thursday afternoons.
- Discovery calls open weekdays 9–5, but renewal conversations Tuesday
  mornings only.
- Office hours one Wednesday a month with a 3-bookings-per-window cap.
- Different timezones for different audiences.

Profiles solve that by letting you name, configure, and reuse availability
rule sets independently from event types.

## Default profile

Every user has one **default availability profile**, created when the user is
provisioned. If no event type overrides it, this is the profile applied to
that event type.

You can edit the default at **Availability → Default** or reassign which
profile is the default.

## Per-event-type override

At **Event Types → [type] → Availability**, choose:

- **Use my default profile** (most common).
- **Use a different profile** (e.g., "Office hours" for a specific page).

Different event types on the same booking page can use different profiles —
useful when one page hosts both "30-min intro call" (open weekdays) and
"weekly retainer" (Tuesdays only).

## Timezone

Each profile has its own timezone. Visitors to a booking page see times in
their local timezone (auto-detected, with a manual override). The host's
profile timezone determines what "9 AM" means.

For traveling consultants, you can leave the profile timezone as your home
timezone — CalKeep does the conversion for the visitor.

## How busy time is merged

When CalKeep checks whether a slot is bookable, it merges:

- The availability profile's allowed hours.
- Free/busy from every calendar the host has connected for availability —
  Google, Outlook, iCloud, Yahoo. See [Connect calendars](/integrations/google-calendar)
  for setup.
- Any event-type-level constraints (max bookings per day/week, buffer time
  before or after, minimum notice, maximum days out).

A slot needs to clear all three checks to be offered to the visitor. Private
event titles, attendees, and notes never leave the host's calendar — only
the busy/free signal contributes to the merge.

## Buffers and constraints

Each event type can add:

- **Buffer before** — minutes of clear time before the booking
  (defaults to 15).
- **Buffer after** — minutes of clear time after (defaults to 0).
- **Minimum notice** — how soon a visitor can book, in minutes (default
  120, i.e., 2 hours).
- **Rolling days** — how far in advance a visitor can book (default 60
  days).
- **Per-day cap** — at most N bookings per calendar day on this event
  type.
- **Min / max attendees** — for events with multiple participants.
- **Allow / disallow rescheduling and cancellation** — per event type.

Configure under **Event Types → [type]**.

## Multiple calendars per host

A host can connect any number of calendars. CalKeep treats each connected
calendar as a busy-time source. Common patterns:

- Personal Google + work Outlook on the same person — both block
  availability without exposing private titles to the booking page visitor.
- A consultant invited as a guest into a client's tenant — add the guest
  calendar so client commitments block booking conflicts.

For privacy boundaries when multiple calendars are connected, see
[Team calendar visibility and privacy](/admin/team-calendar-visibility).

## Round-robin pools

A team booking page (see [Booking pages](/booking#round-robin-and-team-booking))
honors each member's availability profile independently. The page checks
every member's profile + connected-calendar busy time, then offers slots
where at least one member is free.

## Troubleshooting

- **Visitor sees no slots even though I think I'm free:** confirm the event
  type is using the right availability profile, and that the profile
  timezone matches your expectations. Also check connected calendars at
  **Sync History** in case a sync error has flagged a swath of fake busy
  time.
- **Slots appear in the wrong timezone:** check the profile's timezone
  setting; visitors see their own local time but the underlying slot is
  computed against the profile's zone.

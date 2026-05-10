---
title: Recurring events and bookings
sidebar_position: 3
description: How CalKeep handles recurring calendar events and recurring bookings — RRULE, exceptions, and edit scopes.
---

# Recurring events and bookings

CalKeep handles recurrence the same way Google, Outlook, and CalDAV do —
with a **master event** plus an exception model. This page explains how the
model behaves so cancelling or rescheduling one occurrence does what you
expect.

## Master + exceptions

A recurring series is stored as one **master** record with an iCalendar
`RRULE` describing the cadence (e.g., "every Tuesday 2 PM"). Individual
occurrences are computed at read time from the rule.

When you change a single occurrence — move it to Wednesday, attach different
attendees, cancel just that week — CalKeep creates an **exception** record
linked to the master by its `recurrenceId` and `originalStartTime`. The
master keeps running; the exception overrides one slot.

This matches how Google and Microsoft Graph store recurrence, so two-way
sync stays clean.

## Edit and cancel scopes

When you edit or cancel a recurring item, CalKeep asks which scope you
intend:

| Scope | What happens |
|---|---|
| **This event only** | An exception is created or updated for this single occurrence. Rest of the series is untouched. |
| **All events** | The master is changed. Existing exceptions remain unless the change conflicts with them. |
| **This and future** | The series is trimmed (for cancellation) or split (for reschedule) at this occurrence. |

The same three scopes apply to recurring **calendar events** and recurring
**bookings**.

### Trim vs split

There's a subtle distinction in "this and future":

- **Cancel "this and future"** is a **trim**. The original series's `RRULE`
  is capped with an `UNTIL` boundary at this occurrence; future exceptions
  are marked trimmed. No new master is created.
- **Reschedule "this and future"** is a genuine **split**. A new future
  master is created with the new time, and any existing exceptions on or
  after this occurrence are reparented to the new master.

This matters because a trim is reversible (just lift the UNTIL); a split
creates a real new series record.

## Recurring bookings

Recurring bookings build on the same model. When a visitor books a recurring
slot:

1. Both a master and the first occurrence are committed in one transaction.
2. Provider-side calendar events are provisioned for each occurrence.
3. If a provider provisioning step fails, a background retry worker handles
   it; the booking is durable in CalKeep regardless.

Recurring bookings are gated per event type. Hosts control:

- Whether recurring is allowed at all (default off).
- Allowed frequencies (weekly, biweekly, monthly subset).
- Maximum occurrences in the series.
- Maximum weeks-out window.

See [Booking pages → Recurring bookings](/booking#recurring-bookings) for
how visitors experience recurring booking flows.

## How sync handles recurrence

Each provider has its own recurrence convention:

- **Google Calendar** stores master events with the `RRULE` intact and emits
  exceptions as separate event records linked by `recurringEventId`.
- **Microsoft Outlook** uses a similar master + exceptions pattern via
  Microsoft Graph.
- **CalDAV (iCloud, Yahoo)** stores recurrences inline in the calendar
  collection.

CalKeep normalizes all three into the same internal model. When you edit a
single occurrence in CalKeep and the change propagates to the provider,
each provider gets the change in its native shape.

## Troubleshooting

- **An occurrence I thought I cancelled came back:** check whether the
  cancellation was made before the master changed in a way that
  invalidated the exception. CalKeep stores each exception against the
  master at the time of creation; rare master-shape changes can orphan
  exceptions.
- **A recurring event from a third party looks misaligned:** Google and
  CalKeep handle recurrence-with-exceptions slightly differently in edge
  cases. If you spot a misalignment, [tell us](mailto:support@calkeep.com)
  — these get fixed quickly when reported.
- **A recurring booking series stopped after one cancellation:** confirm
  the cancel was scoped to "this event only", not "this and future". The
  trim model can look identical from the visitor side until you check the
  scope.

For the full booking-side flow, see [Booking pages](/booking).

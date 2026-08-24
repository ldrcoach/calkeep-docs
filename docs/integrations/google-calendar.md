---
title: Google Calendar
sidebar_position: 1
description: Choose and review Google Calendars, Contacts, and Tasks before enabling any source in CalKeep.
---

# Google Calendar

CalKeep connects to personal Google and Google Workspace accounts through
Google authorization. Connecting an account establishes provider access; it
does not automatically enable every source or any provider writeback.

## Connect

1. Open **Calendar Connections** and choose **Google**.
2. Choose any non-empty combination of the requestable source types:
   **Calendars**, **Contacts**, and **Tasks**. A calendar is not mandatory.
3. Review what each requested permission enables, then continue to Google.
4. Sign in with the exact Google account you intend to connect and review
   Google's consent screen.
5. Return to CalKeep and review the discovered collections before enabling
   any source.

Requested, provider-granted, discovered, and enabled are separate facts. If
Google denies a requested capability, CalKeep reports **requested but not
granted**. If this deployment cannot offer a capability, it reports
**unavailable** rather than treating that as your choice.

## What can be enabled

- **Calendars:** primary, secondary, and shared calendars that Google makes
  available to the connected account. New calendar collections start inactive
  until you review and enable them.
- **Contacts:** discovered contact books can feed People and follow-up work only
  after you explicitly enable contact sync for that book.
- **Tasks:** discovered task lists can participate in task sync only after you
  explicitly enable the list.

New contact books and task lists start with sync and writeback off. Provider
permission and discovery alone never enable synchronization, provider
writeback, or delete-at-source.

## Refresh provider access

Use **Refresh provider access** when a password, administrator policy, consent,
or provider-account change invalidates the current grant. That flow reviews the
requested source types and refreshes provider permission. It is different from
**Sync now**, which retries synchronization for an already enabled collection.

## Disconnect

Open the Google account in **Calendar Connections**, review the impact, and
choose **Disconnect**. Disconnecting removes CalKeep's stored credential,
stops CalKeep access, and removes that provider's stored calendar events from
CalKeep. Copied contacts and tasks remain in the workspace, but their provider
links are removed. The operation does not delete provider data or revoke the
broader OAuth grant in your Google Account; use Google's account-security
controls if you also want to revoke that grant.

## Troubleshooting

- **A requested source says not granted:** use **Refresh provider access** and
  review Google's consent screen. Do not use **Sync now** as a permission fix.
- **A discovered source is not syncing:** confirm that the exact calendar,
  contact book, or task list is enabled; discovery by itself leaves it off.
- **An event is missing:** use **Sync now** on the enabled calendar and review
  Sync History for a source-specific error.
- **A recurring event looks wrong:** Google and CalKeep handle some recurrence
  exceptions differently. [Contact support](mailto:support@calkeep.com) with a
  redacted example.

For multiple Google accounts, connect and review each account separately.
CalKeep keeps their source inventories independent while rendering enabled
calendars in one view.

---
title: Microsoft Outlook
sidebar_position: 2
description: Choose and review Microsoft Calendars, Contacts, and Tasks before enabling any source in CalKeep.
---

# Microsoft Outlook

CalKeep connects to Outlook.com, Microsoft 365 work or school accounts, and
Exchange Online through Microsoft authorization. Connecting an account grants
access; it does not automatically enable every discovered source or any
provider writeback.

## Connect

1. Open **Calendar Connections** and choose **Microsoft**.
2. Choose any non-empty combination of the requestable source types:
   **Calendars**, **Contacts**, and **Tasks**. A calendar is not mandatory.
3. Review what each requested permission enables, then continue to Microsoft.
4. Sign in with the exact Microsoft account you intend to connect and review
   Microsoft's consent screen.
5. Return to CalKeep and review the discovered collections before enabling
   any source.

Requested, provider-granted, discovered, and enabled are separate facts. A
requested capability Microsoft denies remains **requested but not granted**.
A capability this deployment cannot offer is **unavailable**, not a choice you
made.

If your tenant requires administrator consent, an Entra administrator must
approve the CalKeep application for the requested capabilities before they can
be granted. CalKeep continues to report the ungranted state until that provider
approval exists.

## What can be enabled

- **Calendars:** personal, shared, and group calendars Microsoft makes
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

Use **Refresh provider access** after a password, administrator-policy, consent,
or account change invalidates the current grant. It reviews and refreshes the
requested source access. It is different from **Sync now**, which retries an
already enabled collection.

## Disconnect

Open the Microsoft account in **Calendar Connections**, review the impact, and
choose **Disconnect**. Disconnecting removes CalKeep's stored credential,
stops CalKeep access, and removes that provider's stored calendar events from
CalKeep. Copied contacts and tasks remain in the workspace, but their provider
links are removed. The operation does not delete provider data or revoke the
broader Microsoft OAuth grant; use your Microsoft account or Entra consent
controls if you also want to revoke it.

## Troubleshooting

- **Microsoft says administrator approval is required:** ask the appropriate
  Entra administrator to review the CalKeep application and the source types
  your workspace needs.
- **A requested source says not granted:** use **Refresh provider access** after
  administrator approval. Do not use **Sync now** as a permission fix.
- **A discovered source is not syncing:** confirm that the exact calendar,
  contact book, or task list is enabled; discovery by itself leaves it off.
- **An event is missing:** use **Sync now** on the enabled calendar and review
  Sync History for a source-specific error.
- **Teams meeting links do not appear immediately:** Microsoft may add the link
  after accepting a newly created event; refresh after the provider update.

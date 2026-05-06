---
title: Microsoft Outlook
sidebar_position: 2
description: Connect Microsoft Outlook (Outlook.com, Microsoft 365, Exchange Online) to CalKeep.
---

# Microsoft Outlook

CalKeep connects to any Microsoft account — personal Outlook.com, Microsoft 365 work/school, or Exchange Online — via OAuth and syncs your calendars two-way.

## Connect

1. Go to **Settings → Connected Accounts**.
2. Click **Connect Outlook**.
3. Sign in with the Microsoft account.
4. Grant the requested permissions (Calendars.ReadWrite, Contacts.Read).
5. CalKeep imports your calendars and starts a two-way sync.

If your tenant requires admin consent, your IT admin needs to approve the CalKeep app once for the whole organization. After that, individual users can connect without a separate consent prompt.

## What's synced

- All calendars on the account, including shared calendars and group calendars you have access to.
- Events with full metadata: title, body, location, attendees, recurrence rules, Teams conferencing links.
- Contacts (if you grant Contacts scope).

## Disconnect

**Settings → Connected Accounts → [your account] → Disconnect.** This revokes the OAuth grant on Microsoft's side. Events that already synced into CalKeep stay until you delete them.

## Troubleshooting

- **"Need admin approval" error on first connect:** your tenant has admin-consent-required enabled. Forward the consent URL to your IT admin, or have them approve the CalKeep app from the Entra admin center → Enterprise applications.
- **Sync stopped after a password change:** reconnect the account. Microsoft invalidates tokens on certain account events.
- **Teams meeting links not appearing:** Teams links generate at event-creation time. If you create an event in CalKeep that's mirrored to Outlook, the Teams link is added by Microsoft after CalKeep posts the event.

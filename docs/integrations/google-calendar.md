---
title: Google Calendar
sidebar_position: 1
description: Connect Google Calendar (personal or Workspace) to CalKeep with two-way sync.
---

# Google Calendar

CalKeep connects to any Google or Google Workspace account via OAuth and syncs your calendars two-way.

## Connect

1. Go to **Settings → Connected Accounts**.
2. Click **Connect Google Calendar**.
3. Sign in with the Google account whose calendars you want to sync.
4. Grant the requested permissions (Calendar read/write, Contacts read).
5. CalKeep imports your calendars within ~30 seconds and starts a two-way sync.

## What's synced

- All calendars on the account, including secondary calendars and ones shared with you.
- Events with full metadata: title, description, location, attendees, recurrence rules, attachments, conferencing links.
- Contacts (if you grant Contacts scope) — used for the CRM and follow-up reminders features.

## Disconnect

**Settings → Connected Accounts → [your account] → Disconnect.** This revokes the OAuth grant on Google's side and removes the calendar from your unified view. Events that already synced into CalKeep stay until you delete them; nothing is force-deleted from your Google calendar.

## Troubleshooting

- **Sync stopped after a password change:** reconnect the account. Google invalidates OAuth tokens on certain account events (password change, MFA enrollment changes). CalKeep surfaces a "reconnect" prompt at **Settings → Connected Accounts** when this happens.
- **An event is missing:** wait 2 minutes for the next poll cycle, or click **Sync now** on the connected account row.
- **A recurring event looks wrong:** Google and CalKeep handle recurrence-with-exceptions slightly differently. If you spot a misalignment, [tell us](mailto:support@calkeep.com) — these edge cases get fixed quickly when reported.

For multiple Google accounts (personal + work), connect them separately. CalKeep treats them as distinct sources but renders them in one calendar view.

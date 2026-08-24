---
title: iCloud and Yahoo
sidebar_position: 3
description: Current read-only options while new iCloud and Yahoo app-password onboarding is paused.
---

# iCloud and Yahoo

New iCloud and Yahoo app-password connections are temporarily paused. CalKeep
does not currently ask new users to hand an app-specific password to a flow
that cannot complete the same reviewed source setup and recovery contract as
Google and Microsoft.

## Current options

### Approved read-only calendar link

If your provider or organization gives you a private ICS or `webcal` calendar
link, add it as a read-only subscribed calendar. Review the exact source before
saving it and protect the URL like a password: anyone who has a private feed
URL may be able to read its calendar snapshot.

An administrator-controlled workplace may require this route when OAuth or
third-party applications are restricted. A subscribed link is read-only;
CalKeep does not write changes back through it.

### File snapshot

You can import an ICS calendar snapshot. File import copies the reviewed events
into CalKeep; it is not a live provider connection and does not create a
background writeback path.

## Existing legacy connections

An iCloud or Yahoo connection created before the pause may continue its current
CalDAV polling behavior while its stored credential remains valid. Existing
connections do not use the Google/Microsoft **Refresh provider access** flow.
If a legacy app-specific password expires or is revoked, CalKeep may be unable
to refresh that connection until current onboarding is re-enabled.

## What is not available during the pause

- New iCloud or Yahoo app-password onboarding.
- A promise of immediate two-way synchronization for a new account.
- Google/Microsoft-style independent Contacts or Tasks discovery.

Use **Help & Support** if you need help choosing between a read-only link and an
ICS snapshot. Do not send an app-specific password, private feed URL, or export
file to support.

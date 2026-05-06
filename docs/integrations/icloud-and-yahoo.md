---
title: iCloud and Yahoo
sidebar_position: 3
description: Connect Apple iCloud or Yahoo calendars to CalKeep using app-specific passwords.
---

# iCloud and Yahoo

iCloud and Yahoo don't offer OAuth for third-party calendar apps. CalKeep connects via **CalDAV** with an **app-specific password** — a one-time-generated credential that's separate from your main account password.

## iCloud setup

### Generate an app-specific password

1. Sign in to [appleid.apple.com](https://appleid.apple.com).
2. Under **Sign-In and Security**, click **App-Specific Passwords**.
3. Click **Generate an app-specific password**.
4. Label it `CalKeep` and click **Create**.
5. Copy the 16-character password (looks like `abcd-efgh-ijkl-mnop`). You won't see it again.

### Connect in CalKeep

1. Go to **Settings → Connected Accounts**.
2. Click **Connect iCloud**.
3. Enter your Apple ID email and the app-specific password.
4. CalKeep validates the credentials and imports your calendars.

## Yahoo setup

### Generate an app password

1. Sign in to [Yahoo Account Security](https://login.yahoo.com/account/security).
2. Click **Generate app password**.
3. Pick **Other app** and label it `CalKeep`.
4. Copy the password Yahoo generates.

### Connect in CalKeep

1. Go to **Settings → Connected Accounts**.
2. Click **Connect Yahoo**.
3. Enter your Yahoo email and the app password.
4. CalKeep validates and imports.

## What's synced

- All calendars on the account.
- Events with title, description, location, attendees, and recurrence rules.

CalDAV doesn't expose contacts the way Google and Microsoft do, so the CRM features stay calendar-driven for these accounts.

## Sync cadence

CalDAV is poll-only (no push). CalKeep polls every 2 minutes, so updates appear within ~2 minutes of a change on the provider side.

## Updating credentials

If you regenerate your app-specific password, update it in CalKeep at **Settings → Connected Accounts → [your account] → Update credentials**. CalKeep won't sync until the new password lands.

## Troubleshooting

- **Connection fails immediately:** double-check that you used the **app-specific password**, not your main account password. iCloud and Yahoo block main-password CalDAV access.
- **Two-factor enabled but you don't see the app-password screen:** make sure 2FA is fully enabled on your account. Some account states show a different settings UI.

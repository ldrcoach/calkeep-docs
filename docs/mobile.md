---
title: Mobile and desktop apps
sidebar_position: 7
description: CalKeep on iOS, Android, Windows, and macOS — same workspace, designed mobile-first.
---

# Mobile and desktop apps

CalKeep ships as a web app at [calkeep.com](https://calkeep.com), a native
iOS and Android app, and a desktop wrapper for Windows and macOS. All four
share one workspace and one auth surface.

This page covers what's included on each, how the auth/security policies
behave on mobile, and which surfaces are intentionally web-only.

## What's available

| Platform | Status |
|---|---|
| **Web** (calkeep.com) | Mobile-first responsive — works fully on phone or tablet browsers |
| **iOS** | Native app (React Native + Expo) |
| **Android** | Native app (React Native + Expo) |
| **Windows desktop** | Electron wrapper |
| **macOS desktop** | Electron wrapper |

For current download links, contact [support@calkeep.com](mailto:support@calkeep.com).
Marketplace and store listings are confirmed only after release validation.

## Mobile-first by design

The web app is mobile-first, not a shrunken desktop layout:

- **Bottom tab bar** for primary navigation on phones.
- **Swipeable drawers** for secondary surfaces (filters, sort options).
- **Full-screen dialogs** instead of cramped modals.
- **Mobile agenda view** for the calendar — the day view is readable on a
  phone screen.
- **Drag-to-schedule** is desktop-only; on mobile, schedule a task by
  tapping **Schedule** on the task editor.

The native apps share most of this UI but get platform-native push
notifications and a lighter shell.

## Auth on mobile

Mobile devices respect the same auth model as web:

- **MFA** — TOTP, WebAuthn / passkeys, recovery codes. WebAuthn on mobile
  uses the platform authenticator (Touch ID, Face ID, Android biometric)
  or a paired hardware key.
- **Trusted devices** — a 30-day trusted-device token can be issued per
  device. Revoke any device at **Settings → Security → Trusted devices**.
- **IP allowlist** (Enterprise) — applies to mobile too. If you're on a
  cellular network outside an allowed range, the app blocks API calls
  with a clear error.
- **Session timeout** (Enterprise) — applies. Custom 5-min-to-24-hour
  windows lock the app the same way they lock the web session.
- **Magic-link login** — works fine; the link opens in your browser, mints
  a session, and you switch back to the app already signed in.

## Push notifications

- **Web** — VAPID-based browser push. Grant permission once per browser.
- **iOS / Android native** — APNS / FCM via Expo. Grant permission on
  first launch.
- **Desktop** — system notifications via Electron.

Push is used for:

- Booking confirmations (host side).
- Task and contact reminders (when the channel is set to push).
- Sync errors (so you can reconnect without checking the web).

You can mute channels at **Settings → Notifications**.

## What's web-only

Some admin and configuration surfaces are intentionally web-only because
they're rarely-used and benefit from a wider screen:

- **Branding configuration** (logo upload, color pickers, custom CSS).
- **SAML SSO setup** ([SAML 2.0 SSO](/admin/saml)).
- **SCIM token issuance** ([SCIM provisioning](/admin/scim)).
- **Audit log review** with filters and CSV export.
- **Compliance exports** ([Compliance and audit exports](/admin/compliance)).
- **API token issuance** ([API tokens](/admin/api)).
- **Webhook subscription management** ([Webhooks](/admin/webhooks)).

You can still view audit summaries and notification settings on mobile;
the multi-step admin flows are web-only.

## Offline behavior

CalKeep mobile reads cached data while offline (calendar, contact list,
recent tasks) and queues changes for sync when connectivity returns.
Bookings and webhook-driven actions require network — they aren't
queued, since they have side effects on a customer's calendar.

If you're in poor connectivity and a booking action fails, the app shows
a clear retry prompt rather than silently dropping the action.

## Buyer-facing positioning

For how mobile fits into a real field-professional workflow, see
[Manage bookings and follow-ups from your phone](https://calkeep.com/solutions/mobile-field-professional-scheduling).

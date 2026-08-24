---
title: Security and authentication
sidebar_position: 2
description: MFA, passkeys, SSO, IP allowlist, and audit-log policies.
---

# Security and authentication

CalKeep ships with multiple auth paths and an Enterprise tier of security policies. This page is the admin-side reference.

## Authentication options

CalKeep supports any combination of these per user:

| Method | Available to | Notes |
|---|---|---|
| **Email + password** | All users | Optional TOTP MFA on top |
| **Sign in with Microsoft** (OIDC) | All users | Recommended for Microsoft 365 customers |
| **Magic-link email login** | All users | Single-use 15-minute link, no password |
| **Passkeys / WebAuthn** | All users | YubiKey, Windows Hello, Touch ID, browser passkeys — any FIDO2 authenticator |
| **SAML 2.0 SSO** | Enterprise tier | Microsoft Entra ID, Okta, OneLogin, etc. |
| **SCIM 2.0 auto-provisioning** | Enterprise tier | Add/remove users from your IdP, mirrored into CalKeep |

Users manage their own auth methods in **Personal Settings → Password &
security**.

## Multi-factor authentication (MFA)

### TOTP

Any authenticator app — Authy, Google Authenticator, 1Password, Microsoft Authenticator. Enroll at **Personal Settings → Multi-Factor Authentication**. CalKeep displays a QR code; scan it with your app and enter the 6-digit code to confirm.

10 single-use **recovery codes** are shown once at enrollment. Save them somewhere safe — they're your backup if you lose access to your authenticator app.

### WebAuthn / passkeys

Add a passkey in **Personal Settings → Password & security**. Each
authenticator gets a friendly label (e.g., "YubiKey 5 — desk drawer") so you
can tell them apart later.

### Workspace policy

Admins can require MFA for all admins through **Admin Hub → Security &
identity → Authentication Policy**. Before a stricter policy is applied,
CalKeep shows the exact affected users and their enrollment state for review.
Unenrolled admins must enroll before the policy can take effect.

## Step-up reauthentication

Sensitive admin actions — IP allowlist edits, force-reenroll, revoking another user's MFA — require a recent MFA verification (default: within the last 5 minutes). If your last verification is older, CalKeep prompts for TOTP or WebAuthn before letting the action proceed.

## Trusted devices (adaptive MFA)

After completing MFA on a device, CalKeep can issue a 30-day **trusted-device token** that skips the second factor on subsequent logins from the same device. You can review and revoke trusted devices in **Personal Settings → Password & security**.

Workspace admins can disable trusted-device issuance entirely (e.g., for
regulated environments) through **Admin Hub → Security & identity →
Authentication Policy**.

## Enterprise tier policies

Available on the ENTERPRISE plan:

- **Enforce SSO for all users.** Requires non-owners to use SAML and blocks their other primary sign-in paths. The workspace owner retains an emergency-access path.
- **Custom session timeout.** Override the default 7-day JWT lifetime — e.g., set to 60 minutes for sensitive workspaces. Range: 5 minutes to 24 hours.
- **IP allowlist.** Restrict workspace access to specified CIDR ranges. CalKeep prevents self-lockout by detecting your current IP before saving.
- **Audit log retention.** Enterprise defaults to 1 year and can select 1, 3,
  or 7 years. Free, Pro, and Business retain 90 days.
- **WebAuthn attestation policy.** Require attestation (`direct` or `enterprise` mode) so only trusted authenticator models are accepted.
- **Force re-enrollment.** Review the exact affected users and credentials,
  then revoke WebAuthn credentials older than X days or below an attestation
  floor with one operation. Affected users sign in once and re-enroll a fresh
  credential.

Configure these through **Admin Hub → Security & identity → Authentication
Policy** (admin-only, requires recent MFA).

## Audit log

Every security-relevant action writes to the audit log (login, MFA enrollment,
policy changes, admin actions). Read it through **Admin Hub → Security &
identity → Audit Log** and download the current filtered view as JSON on any
plan. Enterprise **Authentication Policy → Compliance** separately offers
credentials CSV and audit CSV downloads.

## Reporting a vulnerability

[security@calkeep.com](mailto:security@calkeep.com). PGP key on request.

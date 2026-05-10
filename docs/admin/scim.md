---
title: SCIM 2.0 provisioning
sidebar_position: 5
description: Auto-provision and deprovision users from your IdP into CalKeep using SCIM 2.0. Enterprise tier.
---

# SCIM 2.0 provisioning

CalKeep supports SCIM 2.0 auto-provisioning on the **Enterprise** plan.
Add a user to the right group in Microsoft Entra ID or Okta, and CalKeep
provisions the account. Remove the user from the group, and CalKeep
deactivates them — sessions revoked, devices cleared, audit history
preserved.

For the buyer-facing overview, see
[Enterprise SSO + SCIM + access controls](https://calkeep.com/solutions/enterprise-sso-scim-controls).

## Plan tier

| Plan | SCIM provisioning |
|---|---|
| Free / Pro / Business | Not available |
| **Enterprise** | Available |

## How it differs from SAML

- **SAML** authenticates a user that already exists (or is being
  JIT-created on first sign-in).
- **SCIM** keeps the workspace's user list in sync with your IdP without
  any user having to sign in first. Add/remove a user in your IdP →
  CalKeep mirrors it.

You can run SAML alone, SCIM alone, or both. Most Enterprise customers
run both: SCIM keeps the roster current, SAML handles the actual login.

## CalKeep's SCIM endpoint

```
https://calkeep.com/scim/v2
```

Note: this is **not** under `/api/*` — SCIM clients hard-code the
canonical `/scim/v2` path.

Standard SCIM 2.0 surface:

| Endpoint | Purpose |
|---|---|
| `GET /ServiceProviderConfig` | Discovery |
| `GET /ResourceTypes` | Resource type list |
| `GET /Schemas` | Schema list |
| `GET /Users` | List users (with filters) |
| `GET /Users/:id` | Read one |
| `POST /Users` | Provision a new user |
| `PUT /Users/:id` | Replace |
| `PATCH /Users/:id` | Modify (including the deprovision `active=false` signal) |
| `DELETE /Users/:id` | Hard delete |

## Authentication

Per-workspace bearer tokens of the shape `scim_<base64url>`.

The token is shown to the admin **once** at issuance. CalKeep stores only
its SHA-256 hash and a 12-character display prefix — there's no way to
re-show the token after the dialog closes. Save it in your IdP's
SCIM-connector configuration immediately.

## Issue a token

**Settings → Workspace Admin → SCIM Provisioning → Generate token.**
(Admin role + recent MFA required.)

You'll get:

- The full bearer token (one-time reveal).
- A friendly label (e.g., "Entra ID prod connector").
- Your tenant URL: `https://calkeep.com/scim/v2`.

The active-tokens list shows the prefix + last-used timestamp so you can
spot orphaned tokens.

## Revoke a token

**Settings → Workspace Admin → SCIM Provisioning → [token] → Revoke.**

Revocation is immediate. The token row is preserved (soft-deleted) for
audit, but no further requests authenticate.

## User mapping

SCIM attribute → CalKeep field:

| SCIM | CalKeep |
|---|---|
| `userName` | `User.email` (case-insensitive uniqueness within the workspace) |
| `name.givenName + name.familyName` | `User.name` (concatenated; falls back to `name.formatted`, then to email-local-part) |
| `emails[primary=true].value` | `User.email` |
| `active` | `User.deactivatedAt` (true → null, false → now) |
| `externalId` | `User.scimExternalId` |

## Provisioning behavior

- **POST** creates a User row inside your workspace. CalKeep stamps
  `emailVerifiedAt = now()` (the IdP is identity-of-truth — no email
  round-trip needed). Workspace seat ceiling is respected — if your
  Marketplace plan caps seats, SCIM `POST` past the cap returns 409.
- **PATCH `active=false`** is the deprovision signal. CalKeep:
  - Sets `User.deactivatedAt = now()` (soft-delete preserves audit).
  - Bumps `tokenVersion` to invalidate every outstanding session JWT.
  - Cascade-revokes the user's `TrustedDevice` rows, pending
    invitations, and active WebAuthn credentials.
- **DELETE** hard-deletes (use sparingly — soft-delete via `active=false`
  is preferred).

## Filter support

CalKeep supports a deliberately-narrow filter subset that covers what
Microsoft Entra ID and Okta SCIM clients actually emit:

| Filter | Example |
|---|---|
| `userName eq "..."` | `?filter=userName eq "alice@example.com"` |
| `externalId eq "..."` | `?filter=externalId eq "abc123"` |
| `id eq "<uuid>"` | `?filter=id eq "..."` |
| `active eq true|false` | `?filter=active eq true` |

Other filter operators (`co`, `sw`, `gt`, AND/OR/NOT compositions) return
`400 invalidFilter` with a clear `detail`. This is documented in the
SchemaProvider response so IdP admins can correlate.

## IdP setup

### Microsoft Entra ID

1. Enterprise applications → CalKeep → Provisioning.
2. Provisioning Mode: Automatic.
3. Tenant URL: `https://calkeep.com/scim/v2`.
4. Secret token: paste the bearer from CalKeep's generate-token dialog.
5. Click **Test Connection**.
6. Once green, configure the user-attribute mapping (Entra ID's
   defaults work). Map `userName → emails[type eq "work"].value`.
7. Set scoping to the groups you want CalKeep to receive.
8. Turn provisioning **On**.

### Okta

1. Applications → CalKeep → Provisioning → To App.
2. Configure API Integration → Enable.
3. Base URL: `https://calkeep.com/scim/v2`.
4. API Token: paste the bearer.
5. Click **Test API Credentials**.
6. Enable Create / Update / Deactivate Users.
7. Configure the right Push Groups.

For step-by-step IdP setup beyond the basics, see
[the SCIM token rotation runbook](https://github.com/ldrcoach/calkeep/blob/main/docs/runbooks/scim-token-rotation.md).

## Workspace isolation

SCIM tokens are workspace-scoped. A SCIM client authenticated against
workspace A cannot read or write users in workspace B. The token row
records its own `workspaceId`, and every SCIM controller scopes its
query against that.

## Audit

SCIM activity writes to the audit log:

- `SCIM_TOKEN_ISSUED` / `SCIM_TOKEN_REVOKED`.
- `SCIM_USER_PROVISIONED` / `SCIM_USER_UPDATED` / `SCIM_USER_DEPROVISIONED` /
  `SCIM_USER_DELETED`.

Review at **Settings → Audit Log**.

## Token rotation

Best practice: rotate SCIM tokens annually or after any IdP admin
change.

1. Generate a new token in CalKeep.
2. Update your IdP's SCIM connector with the new token.
3. Verify provisioning is still working (test with a user add/remove).
4. Revoke the old token.

The runbook at [scim-token-rotation.md](https://github.com/ldrcoach/calkeep/blob/main/docs/runbooks/scim-token-rotation.md)
walks through this in detail.

## Out of scope (today)

The following are not in the v1 SCIM surface and are tracked for v2:

- SCIM Groups (`/scim/v2/Groups`) — group-based provisioning is via the
  IdP's group-scoping; CalKeep doesn't model groups as first-class SCIM
  objects yet.
- Bulk operations.
- Custom CalKeep schema extensions.
- Multi-tenant tokens (one token spanning workspaces).
- SCIM event webhooks (CalKeep is a read target, not a SCIM event source).

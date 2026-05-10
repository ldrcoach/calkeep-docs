---
title: Audit log
sidebar_position: 9
description: What's logged, how to read it, and how retention works across plans.
---

# Audit log

Every security-relevant and admin action in your workspace writes to the
audit log. This page covers what's captured, how to read it, and how
retention scales by plan.

For machine-readable exports for SIEM ingestion, see
[Compliance and audit exports](/admin/compliance).

## Where to read it

**Settings → Workspace Admin → Audit Log.** (Admin only.) The page
lives at `/audit-log` in your workspace.

The list view is paginated, sortable by time, and filterable by:

- Action type (e.g., `INVITATION_SENT`, `MFA_ADMIN_RESET`).
- Actor user.
- Affected resource.
- Date range.

Click any entry to see the full event payload.

## What's captured

The audit log records actions that affect security, identity, billing, or
team membership. Categories include:

| Category | Sample actions |
|---|---|
| **Authentication** | `MFA_*`, `WEBAUTHN_*`, `SAML_LOGIN[_FAILED]`, `MAGIC_LINK_*`, `TRUSTED_DEVICE_*` |
| **Team / users** | `INVITATION_SENT`, `INVITATION_ACCEPTED`, `BULK_INVITATIONS_SENT`, `USER_DEACTIVATED`, role changes |
| **Workspace policy** | `WORKSPACE_MFA_POLICY_CHANGED`, `WORKSPACE_SSO_POLICY_CHANGED`, `WORKSPACE_IP_ALLOWLIST_CHANGED`, `WORKSPACE_AUDIT_RETENTION_CHANGED`, `WORKSPACE_SESSION_POLICY_CHANGED` |
| **SAML / SCIM** | `SAML_CONFIG_UPDATED`, `SCIM_TOKEN_ISSUED`, `SCIM_USER_PROVISIONED`, `SCIM_USER_DEPROVISIONED` |
| **Marketplace** | `MARKETPLACE_PLAN_UPDATED`, `MARKETPLACE_APPROVAL_REQUESTED`, `MARKETPLACE_APPROVAL_GRANTED`, `MARKETPLACE_APPROVAL_DENIED` |
| **Auto-join domains** | `AUTO_JOIN_DOMAIN`, `AUTO_JOIN_POLICY_UPDATED`, `AUTO_JOIN_DOMAIN_VERIFIED` |
| **Invite links** | `INVITE_LINK_CREATED`, `INVITE_LINK_REVOKED`, `INVITE_LINK_ACCEPTED` |
| **Force re-enrollment** | `FORCE_REENROLL` |
| **Force MFA admin reset** | `MFA_ADMIN_RESET` |
| **Compliance exports** | (action varies — included in compliance JSON export) |
| **Contact import** | `CONTACT_IMPORT` (with row counts) |

Each row records the actor, target, timestamp, IP address (where
relevant), and an event-specific payload.

## Retention

Audit storage in CalKeep is unbounded — events are kept forever in the
database. **Read access** is scoped to a retention window per plan:

| Plan | Audit-log read window |
|---|---|
| Free / Pro / Business | 90 days |
| **Enterprise** | Configurable: 1 year (default), 3 years, or 7 years |

Enterprise admins change the retention window via the workspace
audit-retention setting (admin-only, requires recent MFA). Allowed
values are 1, 3, or 7 years.

The change is itself audited (`WORKSPACE_AUDIT_RETENTION_CHANGED`).

Lower tiers can't reach beyond 90 days even if events older than that
exist in storage. This is a deliberate floor — Enterprise is the tier
that needs longer recall for compliance purposes.

## Data privacy in audit entries

The audit log records what happened, not what was said:

- **Booking and meeting content** — title, attendee list, notes — is
  never captured in the audit log. It lives on the calendar event /
  booking record itself, with the workspace's normal access controls.
- **Personal calendar event detail** stays where it is. Audit entries
  reference resources by id, not by content.
- **Authentication entries** record the action (success/failure, method)
  and the actor. They do not capture passwords, TOTP codes, or
  WebAuthn assertion payloads.

System-level events that have no `workspaceId` (e.g., platform-wide
configuration) are intentionally excluded from workspace audit reads
and exports — only events scoped to your workspace leave the tenant
boundary.

## Programmatic export

The audit-log read endpoint is available to admins on every plan:

```
GET /api/audit
```

Lookback is clamped to the plan's retention window. Lightweight JSON
export of audit entries from this endpoint is included on every plan
within the retention window.

For richer exports (CSV with stable column order for SIEM ingest, action
filter, longer time windows on Enterprise), see [Compliance and audit
exports](/admin/compliance) — that surface is gated to Enterprise.

## Common review patterns

- **Quarterly access review** — filter by `INVITATION_*`, `USER_DEACTIVATED`,
  and role changes over the quarter. Confirms team roster movement.
- **MFA hygiene** — filter by `MFA_*` and `WEBAUTHN_*`. Surfaces users
  who haven't enrolled.
- **SAML or SCIM debugging** — filter by `SAML_*` and `SCIM_*` to follow
  a specific login attempt or provisioning event.
- **Plan-source / billing** — filter by `MARKETPLACE_*` to see plan
  transitions tied to your Azure Marketplace subscription.

## Troubleshooting

- **An action I expected to see isn't logged** — confirm the action type
  is in the captured-categories list above. Some app-level actions
  (creating a contact, completing a task) are not security-audited; if
  you need that visibility, the [Webhooks](/admin/webhooks) surface
  emits real-time events for those.
- **I see entries for system actors I don't recognize** — system actors
  (e.g., the SCIM connector running on a token) appear with a clear
  marker so you can distinguish them from human users.

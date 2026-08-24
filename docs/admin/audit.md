---
title: Audit log
sidebar_position: 9
description: What's logged, how to read it, and how retention works across plans.
---

# Audit log

Supported security, identity, integration, billing, and administrative actions
in your workspace write to the audit log. This page covers the audited surface,
how to read it, and how retention scales by plan.

The Audit Log can download its current filtered view as JSON. Enterprise
workspaces also have two control-evidence CSV downloads under Authentication
Policy; see [Compliance and audit exports](/admin/compliance).

## Where to read it

Open **Admin Hub → Security & identity → Audit Log** (admin only).

The list view is paginated newest-first and filterable by:

- Action type (for example, `LOGIN_SUCCESS`).
- Entity type.
- Date range.

Click an entry to see its sanitized response projection. Fields vary by action;
known secret-bearing metadata and capability-bearing URL segments are masked.

## What's captured

The audit log records actions that affect security, identity, billing, or
team membership. Categories include:

| Category | Sample actions |
|---|---|
| **Authentication** | `LOGIN_SUCCESS`, `LOGIN_FAILED`, `MFA_ADMIN_RESET`, `webauthn_policy_changed`, `saml_login`, `saml_login_failed` |
| **Team / users** | `INVITATION_SENT`, `INVITATION_ACCEPTED`, `bulk_invitations_sent`, `workspace_user_deactivated` |
| **Workspace policy** | `WORKSPACE_MFA_POLICY_CHANGED`, `workspace_sso_policy_changed`, `workspace_ip_allowlist_changed`, `workspace_audit_retention_changed`, `workspace_session_policy_changed` |
| **SAML / SCIM** | `saml_config_updated`, `saml_login`, `saml_login_failed`, `scim_token_issued`, `scim_user_provisioned`, `scim_user_deprovisioned` |
| **Marketplace billing** | `MARKETPLACE_PLAN_UPDATED` |
| **Auto-join domains** | `AUTO_JOIN_DOMAIN`, `AUTO_JOIN_POLICY_UPDATED`, `AUTO_JOIN_DOMAIN_VERIFIED` |
| **Invite links** | `INVITE_LINK_CREATED`, `INVITE_LINK_REVOKED`, `INVITE_LINK_ACCEPTED` |
| **Force re-enrollment** | `force_reenroll` |
| **Force MFA admin reset** | `MFA_ADMIN_RESET` |
| **Compliance exports** | `compliance_export` |
| **Contact import** | `CONTACT_IMPORT` (with row counts) |

Each row records the actor, target, timestamp, IP address (where
relevant), and an event-specific payload.

## Retention

Audit rows are physically removed according to the workspace's retention
policy:

| Plan | Audit-log read window |
|---|---|
| Free / Pro / Business | 90 days |
| **Enterprise** | Configurable: 1 year (default), 3 years, or 7 years |

Enterprise admins change the retention window via the workspace
audit-retention setting (admin-only, requires recent MFA). Allowed
values are 1, 3, or 7 years.

The change is itself audited (`workspace_audit_retention_changed`).

Lower tiers retain 90 days. Enterprise defaults to one year and can select
three or seven years. The main Audit Log list and JSON download clamp their
queries immediately to the configured window. Physical deletion runs at startup
and daily in bounded batches, so shortening retention is asynchronous and can
take additional purge runs to finish. Ancillary summaries/detail lookups and
the separate compliance export are not yet a universal hard read-time boundary
during that purge interval.

## Data privacy in audit entries

The audit log records what happened, not what was said:

- Response projections sanitize metadata and mask known capability-bearing
  path segments before presenting audit details.
- Audit producers are expected to record operational identifiers and outcomes,
  not passwords, bearer credentials, TOTP codes, or WebAuthn assertions.
- Fields vary by action; review the sanitized projection rather than assuming
  every producer records the same metadata.

System-level events that have no `workspaceId` (e.g., platform-wide
configuration) are intentionally excluded from workspace audit reads
and exports — only events scoped to your workspace leave the tenant
boundary.

## Export

The Audit Log page can download up to the 100 newest rows matching the currently
reviewed action, entity-type, and date filters as workspace-scoped JSON on every
plan. The download is clamped to the plan's retention window and requires a
verified email, an enrolled factor, and recent MFA.

Enterprise workspaces have a separate **Compliance** section under
**Authentication Policy**. It downloads credential metadata as CSV and audit
events as CSV for a selected 30-, 90-, or 365-day lookback. See
[Compliance and audit exports](/admin/compliance).

## Common review patterns

- **Quarterly access review** — review invitation and
  `workspace_user_deactivated` rows over the quarter.
- **MFA hygiene** — review the relevant MFA and WebAuthn rows or download JSON
  for the current date/entity filters. The current fixed action picker exposes
  only its listed legacy values, not every exact action emitted by newer
  workflows and not wildcard families.
- **SAML or SCIM debugging** — review exact SAML or SCIM rows for the affected
  period; the UI does not expand `SAML_*` or `SCIM_*` patterns.
- **Plan-source / billing** — review `MARKETPLACE_PLAN_UPDATED` rows for plan
  transitions tied to your Azure Marketplace subscription.

## Troubleshooting

- **An action I expected to see isn't logged** — confirm the action type
  is in the captured-categories list above. The current webhook contract covers
  booking lifecycle and API V1 contact create/patch events, not every product
  mutation; see [Webhooks](/admin/webhooks).
- **I see entries for system actors I don't recognize** — system actors
  (e.g., the SCIM connector running on a token) appear with a clear
  marker so you can distinguish them from human users.

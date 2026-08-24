---
title: API tokens
sidebar_position: 7
description: Use workspace-scoped API tokens with CalKeep's versioned public API. Business and Enterprise tiers.
---

# API tokens

CalKeep exposes versioned public `/api/v1` and `/api/v2` routes for
server-to-server integrations. Existing workspace-scoped tokens remain usable
on **Business** and **Enterprise** plans. New token issuance in the current
Integration Center is temporarily paused while its request contract is aligned
with the server validator.

For the buyer-facing positioning, see
[Wire CalKeep into the rest of your stack](https://calkeep.com/solutions/scheduling-automation-platform).

Companion surface: [Webhooks](/admin/webhooks).

## Plan tier

| Plan | API tokens | Rate limits |
|---|---|---|
| Free / Pro | Not available | — |
| **Business** | Existing-token access; new UI issuance temporarily paused | Shared runtime limits |
| **Enterprise** | Existing-token access; new UI issuance temporarily paused | Shared runtime limits |

## Versioning

Use `/api/v1` for the validated contact write workflow and the existing V1
workspace, contact, and booking reads. Use the documented `/api/v2` object
families for read-only projections across the wider workspace object graph.
Routes outside the documented versioned public API back CalKeep's own clients
and do not carry a public stability guarantee.

## Authentication

Bearer-token authentication applies to documented `/api/v1/*` and `/api/v2/*`
requests:

```
Authorization: Bearer <token>
```

Tokens are workspace-scoped: a token issued in workspace A cannot read
or write data in workspace B. CalKeep enforces this at the auth boundary
**and** re-checks at the repository layer.

## Issuance status

The current **Admin Hub → Integrations & services → Integration Center → API
tokens** screen can inventory and revoke existing tokens, but its **Create
token** request is temporarily unavailable. Do not repeatedly submit the create
dialog. Existing valid tokens continue to authenticate normally; contact
[support](mailto:support@calkeep.com) if an urgent credential replacement is
required before the repaired flow is released.

The repaired one-time issuance flow will ask for a name, purpose, integration
owner, optional human owner, and scope set. The bearer is displayed only in the
acknowledged issuance/recovery flow. Routine inventory exposes metadata and a
short prefix, never the bearer value.

## Scopes

When issuance is restored, a new token can carry one or more of these supported
scopes:

| Scope | Permits |
|---|---|
| `contacts:read` | List and read contacts. |
| `contacts:write` | Create and patch contacts through the validated V1 workflow. |
| `accounts:read` | Read CRM account projections. |
| `opportunities:read` | Read opportunity projections. |
| `bookings:read` | List and read bookings. |
| `calendar_events:read` | Read calendar-event projections. |
| `tasks:read` | List and read tasks. |
| `projects:read` | Read project projections. |
| `processes:read` | Read process and process-run projections. |
| `webhooks:read` | Read webhook-subscription projections. |
| `integrations:read` | Read workspace metadata and provider-integration projections. |

Scope checks happen at request time. Except for the validated V1 contact
create/patch routes, the generic V2 families are read-only even if an older
persisted token contains a historical write-scope name. Tokens are
workspace-scoped on top of scopes.

## Rotate a token

Token rotation is create-new, verify-new, then revoke-old; it is not a distinct
rotation endpoint. Because new UI issuance is temporarily paused, do not revoke
a working token until a replacement is available. Contact support for an
urgent security rotation.

Once issuance is restored:

1. Create a new token.
2. Update your integration's stored credential.
3. Verify the integration is healthy (most integrations have a
   self-test / ping).
4. Revoke the old token.

If the new-token response is interrupted, retry that exact command before
starting another rotation. The one-time recovery flow can return the same
replacement credential instead of silently adding another active token.

## Revoke a token

**Admin Hub → Integrations & services → Integration Center → API tokens → [token] →
Revoke.**

Revocation is immediate. CalKeep stamps who revoked the token and when, keeps
the record for audit, and omits it from the default active inventory. Further
requests with that token fail authentication.

## Resource coverage

### V1 routes

| Resource | Endpoint | Scope |
|---|---|---|
| **Workspace** | `GET /api/v1/workspace` | `integrations:read` |
| **Contacts (list / one)** | `GET /api/v1/contacts`, `GET /api/v1/contacts/:id` | `contacts:read` |
| **Contacts (create / patch)** | `POST /api/v1/contacts`, `PATCH /api/v1/contacts/:id` | `contacts:write` |
| **Bookings (list / one)** | `GET /api/v1/bookings`, `GET /api/v1/bookings/:id` | `bookings:read` |

### V2 read-only object families

`GET /api/v2/<family>` returns a workspace-scoped projection. Current
families and their scopes are:

| Family | Scope |
|---|---|
| `accounts` | `accounts:read` |
| `contacts` | `contacts:read` |
| `opportunities` | `opportunities:read` |
| `bookings` | `bookings:read` |
| `calendar-events` | `calendar_events:read` |
| `tasks` | `tasks:read` |
| `projects` | `projects:read` |
| `processes`, `process-runs` | `processes:read` |
| `webhook-subscriptions` | `webhooks:read` |
| `integrations` | `integrations:read` |

Generic V2 `POST` requests are rejected. Additional mutations must use a
documented, purpose-built public workflow rather than guessing an internal
route.

## Response shape

Versioned public responses carry a `success` flag plus a `meta` block with the
actual `apiVersion` (`v1` or `v2`) and request id:

```json
// Success
{
  "success": true,
  "data": { ... },
  "meta": { "apiVersion": "v1", "requestId": "req_..." }
}

// Error
{
  "success": false,
  "error": { "code": "invalid_token", "message": "...", "requestId": "req_..." }
}
```

The request id is also returned in the `X-CalKeep-Request-Id` response
header. A safe `X-Request-Id: <your-id>` request value can be reflected in that
response identifier; it is not an audit-log correlation contract.

## Rate limits

The current runtime uses shared limits rather than a plan-specific Enterprise
bucket: a global limit of 1,000 requests per 15 minutes and an additional V1
limit of 120 requests per minute. CalKeep returns HTTP 429 when a limit is
reached; response details vary between the global and V1-specific limiter.
Honor `Retry-After` when present and use exponential backoff.

For sustained-throughput integrations, prefer webhooks over polling. See
[Webhooks](/admin/webhooks).

## Tenant isolation

Every API request is workspace-scoped:

1. Bearer token resolves to a workspace.
2. Every read query is scoped by that workspace's id.
3. Every write validates the target resource belongs to that workspace
   before accepting.

Cross-workspace access is rejected at the auth boundary (`401`) and
again at the repository (`404` or `403` depending on context).

## Audit

Token actions write to the audit log:

- `api_token_created`
- `api_token_secret_recovered`
- `api_token_revoked`
- `api_token_used` (attempted after each successful verification)
- `api_token_auth_failed`

Review at **Admin Hub → Security & identity → Audit Log**.

## Step-up reauthentication

Issuing or revoking a token requires an enrolled factor and **recent MFA**. If
the verification is stale, CalKeep prompts for TOTP or WebAuthn before the
operation proceeds.

## Pagination

V1 contact and booking lists paginate by page number:

```
GET /api/v1/contacts?page=1&limit=50
```

Default page size is 50; max is 200. The list response shape:

```json
{
  "success": true,
  "data": {
    "contacts": [ ... ],
    "pagination": { "page": 1, "limit": 50, "total": 1234 }
  },
  "meta": { "apiVersion": "v1", "requestId": "req_..." }
}
```

The resource-named key inside `data` (`contacts`, `bookings`, etc.)
varies by endpoint.

V2 object lists use `limit` (default 50, maximum 100) and `offset` (default 0)
and return `items` plus `pagination.limit`, `offset`, `total`, and `hasMore`.

## Sample request

```bash
curl https://calkeep.com/api/v1/contacts \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

## Out of scope (today)

- OAuth-based delegated access (instead of admin-issued tokens) — V2
  candidate.
- Generic V2 mutations beyond the validated V1 contact slice.
- Streaming/long-poll endpoints — use [webhooks](/admin/webhooks)
  instead.
- Custom scope granularity beyond the current resource-level choices.

For the integration-strategy overview, see
[Platform automation](/admin/platform-automation).

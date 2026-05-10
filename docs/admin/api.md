---
title: API tokens
sidebar_position: 7
description: Issue scoped API tokens against CalKeep's versioned public API. Business and Enterprise tiers.
---

# API tokens

CalKeep exposes a versioned public API at `/api/v1` for server-to-server
integrations. Workspace admins on **Business** and **Enterprise** plans can
issue scoped API tokens.

For the buyer-facing positioning, see
[Wire CalKeep into the rest of your stack](https://calkeep.com/solutions/scheduling-automation-platform).

Companion surface: [Webhooks](/admin/webhooks).

## Plan tier

| Plan | API tokens | Rate limits |
|---|---|---|
| Free / Pro | Not available | — |
| **Business** | Available | Standard |
| **Enterprise** | Available | Higher limits |

## Versioning

The public API is versioned at `/api/v1`. Earlier app routes
(everything not under `/api/v1`) are internal — they back the web/mobile
UI and don't carry stability guarantees. Build integrations against
`/api/v1` only.

## Authentication

Bearer-token authentication on every `/api/v1/*` request:

```
Authorization: Bearer <token>
```

Tokens are workspace-scoped: a token issued in workspace A cannot read
or write data in workspace B. CalKeep enforces this at the auth boundary
**and** re-checks at the repository layer.

## Issue a token

**Settings → Workspace Admin → Integrations → API tokens → Generate token.**
(Admin role + recent MFA required.)

You'll be asked for:

- A friendly **label** (e.g., "RevOps Zapier integration").
- A scope set (see below).
- Optional **expiration** (no expiration means the token lives until
  revoked).

After saving, CalKeep shows the token **once**. Save it immediately —
there's no way to read it back later. CalKeep stores only a hash plus a
short display prefix.

## Scopes

A token carries one or more scopes. The available scopes are:

| Scope | Permits |
|---|---|
| `workspace:read` | Read workspace metadata. |
| `contacts:read` | List and read contacts. |
| `contacts:write` | Create and patch contacts. |
| `bookings:read` | List and read bookings. |
| `tasks:read` | List and read tasks. |
| `tasks:write` | Create and update tasks. |
| `reminders:read` | List reminders. |
| `reminders:write` | Create reminders. |
| `calendar_health:read` | Read connected-account sync health. |

Scope checks happen at request time — a `contacts:read` token cannot
hit `POST /contacts`. Tokens are workspace-scoped on top of scopes.

## Rotate a token

Best practice: rotate annually or after any team-membership change for
the user who owns the integration.

1. Generate a new token.
2. Update your integration's stored credential.
3. Verify the integration is healthy (most integrations have a
   self-test / ping).
4. Revoke the old token.

## Revoke a token

**Settings → Workspace Admin → Integrations → API tokens → [token] →
Revoke.**

Revocation is immediate. The token row is preserved (soft-deleted) for
audit; further requests with that token authenticate fail.

## Resource coverage

### Available today

| Resource | Endpoint | Scope |
|---|---|---|
| **Workspace** | `GET /api/v1/workspace` | `workspace:read` |
| **Contacts (list)** | `GET /api/v1/contacts` | `contacts:read` |
| **Contacts (one)** | `GET /api/v1/contacts/:id` | `contacts:read` |
| **Contacts (create)** | `POST /api/v1/contacts` | `contacts:write` |
| **Contacts (patch)** | `PATCH /api/v1/contacts/:id` | `contacts:write` |
| **Bookings (list)** | `GET /api/v1/bookings` | `bookings:read` |
| **Bookings (one)** | `GET /api/v1/bookings/:id` | `bookings:read` |

### Planned

The token scopes for these resources are already defined so you can
issue tokens that will work the moment endpoints land:

- **Tasks** — list, read, create, status update.
- **Reminders** — list and create.
- **Calendar-account sync health** — read.

These ship as the underlying V1.2 platform work completes. Watch the
[handoff queue](https://github.com/ldrcoach/calkeep) for updates.

Public mutations are intentionally narrow today. Additional verbs ship
as the underlying object semantics stabilize.

## Response shape

Every `/api/v1/*` response carries a `success` flag plus a `meta` block
with `apiVersion` and the request id:

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
header. Pass `X-Request-Id: <your-id>` on the request to thread your own
identifier through the response and audit log.

## Rate limits

Standard limits on Business; higher on Enterprise. CalKeep returns:

- HTTP 429 when limited.
- `Retry-After` header in seconds.
- A clear `error.code` distinguishing rate limit (`rate_limited`) from
  resource exhaustion (e.g., AI quota, marketplace seat ceiling).

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

- `API_TOKEN_ISSUED`
- `API_TOKEN_ROTATED`
- `API_TOKEN_REVOKED`
- `API_TOKEN_USED` (sampled, not per-request — for spotting orphan
  tokens still in active use)

Review at **Settings → Audit Log**.

## Step-up reauthentication

Issuing or rotating a token requires **recent MFA** (within the past 5
minutes). If it's stale, CalKeep prompts for TOTP or WebAuthn before
letting the token surface a value.

## Pagination

List endpoints paginate via page number:

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

## Sample request

```bash
curl https://calkeep.com/api/v1/contacts \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

## Out of scope (today)

- OAuth-based delegated access (instead of admin-issued tokens) — V2
  candidate.
- Public mutations beyond the slice above — we're letting object
  semantics stabilize first.
- Streaming/long-poll endpoints — use [webhooks](/admin/webhooks)
  instead.
- Custom scope-per-token granularity beyond resource-level — V2
  candidate.

For the integration-strategy overview, see
[Platform automation](/admin/platform-automation).

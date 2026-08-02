---
title: Webhooks
sidebar_position: 8
description: Subscribe to real-time CalKeep events with HMAC-signed delivery, retries, and dead-letter handling. Business and Enterprise tiers.
---

# Webhooks

Signed outbound webhooks notify your systems when supported CalKeep events
occur. Use webhooks for real-time integrations — the moment a booking is
created, the moment a contact updates — instead of polling the API.

Companion surface: [API tokens](/admin/api).

For the buyer-facing positioning, see
[Wire CalKeep into the rest of your stack](https://calkeep.com/solutions/scheduling-automation-platform).

## Plan tier

| Plan | Webhooks |
|---|---|
| Free / Pro | Not available |
| **Business** | Available with standard delivery-log retention |
| **Enterprise** | Available with higher rate limits and longer log retention |

## Manage at

**Settings → Workspace Admin → Integrations → Webhooks.** (Admin role +
recent MFA.) Webhooks live in the Integration Center alongside API
tokens, provider health, and exports.

Each subscription has:

- **Destination URL** — where deliveries POST to.
- **Selected events** — which event types fire.
- **Signing secret** — for verification on your side. Rotate any time.
- **Enabled / disabled** — toggle without losing the subscription.

## Event catalog

The first stable event set:

| Event | When it fires |
|---|---|
| `booking.created` | A new booking is committed. |
| `booking.rescheduled` | An existing booking moves to a new time. |
| `booking.cancelled` | A booking is cancelled (single instance, all events, or this-and-future scope is included in the payload). |
| `contact.created` | A new contact is created — via booking auto-create, manual, import, or API. |
| `contact.updated` | An existing contact's fields change. |
| `task.created` | A new task is created — Inbox, project, or process run. |
| `task.completed` | A task transitions to `done`. |
| `reminder.due` | A reminder fires (matches whichever channel was configured). |
| `calendar.sync_failed` | A connected calendar account hits an unrecoverable sync error (auth_expired, credentials_invalid, etc.). |

Additional events ship as the underlying object semantics stabilize.

## Payload shape

Every event payload includes:

```json
{
  "eventId": "evt_...",
  "eventType": "booking.created",
  "eventVersion": 1,
  "workspaceId": "...",
  "occurredAt": "2026-05-10T16:00:00Z",
  "object": {
    // The full object snapshot at commit time.
    // Stable identifiers and useful fields — not raw OAuth tokens or secrets.
  },
  "links": {
    "self": "https://calkeep.com/api/v1/bookings/...",
    // Other useful links to related resources.
  }
}
```

Payloads carry stable identifiers and minimal useful snapshots.
**Sensitive fields** — provider OAuth tokens, secrets, payment
instruments — are never included.

## Signature

Three headers identify and authenticate the request:

| Header | Value |
|---|---|
| `X-CalKeep-Webhook-Id` | The `eventId` (use as your idempotency key). |
| `X-CalKeep-Webhook-Timestamp` | Unix seconds when the event fired. |
| `X-CalKeep-Webhook-Signature` | `v1=<hex>` where `<hex>` is HMAC-SHA256 of `${timestamp}.${rawBody}` using the subscription's signing secret. |

### Verification (Node.js)

```javascript
const crypto = require('crypto');

function verify(req, secret) {
  const timestamp = req.headers['x-calkeep-webhook-timestamp'];
  const signature = req.headers['x-calkeep-webhook-signature']; // 'v1=<hex>'
  const rawBody = req.rawBody;  // requires raw-body middleware

  // Reject if older than 5 minutes (replay protection)
  if (Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) {
    return false;
  }

  const expected = 'v1=' + crypto
    .createHmac('sha256', secret)
    .update(`${timestamp}.${rawBody}`)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(expected),
    Buffer.from(signature)
  );
}
```

### Verification (Python)

```python
import hmac, hashlib, time

def verify(headers, raw_body, secret):
    timestamp = headers['X-CalKeep-Webhook-Timestamp']
    signature = headers['X-CalKeep-Webhook-Signature']  # 'v1=<hex>'

    if abs(time.time() - int(timestamp)) > 300:
        return False

    expected = 'v1=' + hmac.new(
        secret.encode(),
        f"{timestamp}.{raw_body}".encode(),
        hashlib.sha256,
    ).hexdigest()

    return hmac.compare_digest(expected, signature)
```

Critical points:

- **Verify the raw body**, not a re-serialized JSON payload — minor
  whitespace differences will break the signature.
- **Use a constant-time comparison** (`timingSafeEqual` /
  `compare_digest`) to avoid timing-attack leaks.
- **Reject requests older than 5 minutes** (or your chosen window) —
  replay protection.
- **Idempotency-key on `eventId`** — CalKeep guarantees at-least-once
  delivery; your handler should be idempotent.

## Delivery semantics

CalKeep uses an **outbox pattern**:

1. Source-of-truth transaction commits.
2. A delivery row is persisted to the outbox.
3. The delivery worker picks it up and POSTs to your destination.

This guarantees a webhook is sent only after the underlying change
committed — no false positives.

### Retries

If your endpoint returns non-2xx (or the request times out), CalKeep
retries with exponential backoff:

- 1 minute, 5 minutes, 30 minutes, 2 hours, 12 hours.
- After 5 failed attempts, the delivery is moved to **dead-letter** state.

### Dead-letter handling

Failed deliveries past the retry budget appear at **Settings →
Workspace Admin → Integrations → Webhooks → [subscription] → Dead-letter**.
From there:

- **Replay** — re-attempt delivery now (useful after fixing your
  endpoint).
- **Discard** — drop the failed delivery permanently.

Delivery logs (status code, attempt count, response body truncated to
prevent cookie/token bleed) are kept per subscription.

## Secret rotation

**Settings → Workspace Admin → Integrations → Webhooks → [subscription]
→ Rotate secret.**

Rotation is non-disruptive — CalKeep accepts both the old and new secret
during a grace window so your receiver can be updated without dropping
deliveries.

## Workspace boundary

Webhook subscriptions are workspace-scoped. Events from workspace A
never reach a subscription in workspace B. The signing secret is
per-subscription, so a leaked secret only affects that one
subscription.

## Audit

Webhook actions write to the audit log:

- `WEBHOOK_SUBSCRIPTION_CREATED`
- `WEBHOOK_SUBSCRIPTION_DISABLED`
- `WEBHOOK_SECRET_ROTATED`
- `WEBHOOK_DELIVERY_FAILURE_THRESHOLD_REACHED`

Review at **Settings → Audit Log**.

## Patterns

- **Booking → CRM** — subscribe to `booking.created` and create the
  matching record in your CRM. Use the booking's contact link to match
  or create the customer.
- **Reminder fan-out** — subscribe to `reminder.due` to forward
  reminders into your team's Slack/Teams channel.
- **Sync-error alerting** — subscribe to `calendar.sync_failed` and
  page on-call when a critical user's calendar disconnects.
- **Pipeline updates** — subscribe to `task.completed` and progress a
  related opportunity stage in your CRM.

## Out of scope (today)

- Webhook signature versioning beyond `v1` — additional algorithms ship
  if industry practice shifts.
- Custom event types from app-defined triggers.
- Per-event filtering (e.g., "only `booking.created` for booking pages
  matching X").
- Bulk batch deliveries — events fire individually today.

For the integration overview, see
[Platform automation](/admin/platform-automation).

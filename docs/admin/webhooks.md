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
| **Business** | Available for the delivered events below |
| **Enterprise** | Available for the delivered events below |

The Integration Center shows recent delivery records, but CalKeep does not yet
publish a plan-specific webhook delivery-log retention duration or a separate
Enterprise webhook-rate bucket.

## Manage at

**Admin Hub → Integrations & services → Integration Center → Webhooks.** (Admin role +
recent MFA.) Webhooks live in the Integration Center alongside API
tokens, provider health, and exports.

Each subscription has:

- **Destination URL** — where deliveries POST to.
- **Selected events** — which event types fire.
- **Signing secret** — for verification on your side. Rotate any time.
- **Enabled state** — a subscription starts enabled and can be disabled. The
  current UI does not re-enable a disabled subscription; create a reviewed
  replacement when service must resume.

When you create a subscription, CalKeep shows its signing secret once and keeps
the secret dialog open until you confirm that you stored it. If the response is
interrupted or ambiguous, retry the same create action: CalKeep recovers the
same subscription and secret instead of creating a second subscription.

## Delivered event catalog

The current production delivery contract is intentionally narrower than some
planned labels that may appear in the Integration Center. Select only these
events in v4.5.0:

| Family | Event types |
|---|---|
| **Bookings** | `booking.created`, `booking.rescheduled`, `booking.cancelled` |
| **API V1 contacts** | `contact.created`, `contact.updated` |

Contact events are emitted only by successful public API V1 contact create and
patch operations. Manual edits, imports, booking-created contacts, and other
contact changes do not currently promise these events. Planned task, reminder,
sync, CRM, project, process, delegation, routing, account, and Marketplace
labels are not a production delivery contract yet.

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
    "type": "booking",
    "id": "..."
  },
  "data": {
    "...": "event-specific fields"
  },
  "links": {
    "api": "/api/v1/bookings/..."
  }
}
```

`links.api` is a relative public-API link for contact and booking events and is
`null` for event families without a matching public V1 object route. Payloads
carry stable identifiers and a scrubbed, event-specific `data` object.
**Sensitive fields** — provider OAuth tokens, secrets, payment
instruments — are never included.

## Signature

Four CalKeep headers identify and authenticate the request:

| Header | Value |
|---|---|
| `X-CalKeep-Webhook-Id` | The `eventId`. |
| `X-CalKeep-Webhook-Idempotency-Key` | `wh_<eventId>`; persist this before applying side effects. |
| `X-CalKeep-Webhook-Timestamp` | Unix seconds when CalKeep signed this delivery attempt. |
| `X-CalKeep-Webhook-Signature` | `v1=<hex>` where `<hex>` is HMAC-SHA256 of `${timestamp}.${rawBody}` using the subscription's signing secret. |

### Verification (Node.js)

```javascript
const crypto = require('crypto');

function verify(req, secret) {
  const timestamp = req.headers['x-calkeep-webhook-timestamp'];
  const signature = req.headers['x-calkeep-webhook-signature']; // 'v1=<hex>'
  const rawBody = req.rawBody;  // requires raw-body middleware

  if (typeof timestamp !== 'string' ||
      typeof signature !== 'string' ||
      !/^v1=[0-9a-f]{64}$/i.test(signature) ||
      !Buffer.isBuffer(rawBody)) {
    return false;
  }

  // Reject if older than 5 minutes (replay protection)
  if (Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) {
    return false;
  }

  const expected = 'v1=' + crypto
    .createHmac('sha256', secret)
    .update(`${timestamp}.${rawBody}`)
    .digest('hex');

  const expectedBytes = Buffer.from(expected);
  const receivedBytes = Buffer.from(signature || '');
  return expectedBytes.length === receivedBytes.length &&
    crypto.timingSafeEqual(expectedBytes, receivedBytes);
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

    signed_bytes = str(timestamp).encode() + b'.' + raw_body
    expected = 'v1=' + hmac.new(
        secret.encode(), signed_bytes, hashlib.sha256
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
- **Use `X-CalKeep-Webhook-Idempotency-Key`** — CalKeep delivers at least
  once, so persist that key and make your handler idempotent.

## Delivery semantics

Once an event has been enqueued, CalKeep uses a durable delivery outbox:

1. Source-of-truth transaction commits.
2. A delivery row is persisted to the outbox.
3. The delivery worker picks it up and POSTs to your destination.

Queued deliveries are attempted only after the underlying change commits and
are delivered at least once. The API V1 contact enqueue is post-commit rather
than atomically coupled to the contact transaction, so consumers should also
reconcile through the versioned API instead of treating the webhook stream as a
complete change ledger.

### Retries

If your endpoint returns non-2xx, times out, or cannot be reached safely,
CalKeep performs six total attempts: the original attempt, an immediately
eligible retry, then retries scheduled after approximately 1 minute, 5 minutes,
15 minutes, and 1 hour. Worker cadence can add delay. After the sixth failed
attempt, the row becomes **dead-lettered**.

### Dead-letter handling

Failed deliveries appear in **Admin Hub → Integrations & services →
Integration Center → Recent webhook deliveries**. After fixing the receiving
endpoint, use **Retry** on a dead-lettered row to place that exact delivery
back in the retry queue. There is no discard action in the current UI.

The log shows scrubbed status, attempt count, last-attempt time, and a truncated
response/error preview. It never displays the signing secret or raw sensitive
provider data.

## Secret rotation

**Admin Hub → Integrations & services → Integration Center → Webhooks → [subscription]
→ Rotate secret.**

Rotation immediately replaces the subscription's sole active secret; there is
no dual-secret grace period. Coordinate a short maintenance window, rotate,
store the replacement, and update the receiver before expecting later
deliveries to verify successfully. Failed attempts remain visible and can be
retried after the receiver is updated.

The replacement secret is a one-time reveal and stays open until you
acknowledge that it was stored securely. If the response is interrupted,
retry the exact rotation command: CalKeep may recover the same replacement
secret rather than creating another rotation. After acknowledgement, the
secret cannot be displayed again.

## Workspace boundary

Webhook subscriptions are workspace-scoped. Events from workspace A
never reach a subscription in workspace B. The signing secret is
per-subscription, so a leaked secret only affects that one
subscription.

## Audit

Webhook actions write to the audit log:

- `webhook_subscription_created`
- `webhook_subscription_disabled`
- `webhook_subscription_secret_rotated`
- `webhook_subscription_secret_recovered`
- `webhook_event_enqueued`
- `webhook_delivery_dead_lettered`
- `webhook_delivery_retried`

Review at **Admin Hub → Security & identity → Audit Log**.

## Patterns

- **Booking → CRM** — subscribe to `booking.created` and create the
  matching record in your CRM. Use the booking's contact link to match
  or create the customer.
- **API contact mirror** — subscribe to `contact.created` and
  `contact.updated` when your integration also writes contacts through API V1.
  Reconcile periodically because the webhook is not a complete log of manual,
  import, or booking-created contact changes.

## Out of scope (today)

- Webhook signature versioning beyond `v1` — additional algorithms ship
  if industry practice shifts.
- Custom event types from app-defined triggers — V2 candidate.
- Per-event filtering (e.g., "only `booking.created` for booking pages
  matching X") — V2 candidate.
- Bulk batch deliveries — events fire individually today.

For the integration overview, see
[Platform automation](/admin/platform-automation).

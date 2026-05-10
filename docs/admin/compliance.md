---
title: Compliance and audit exports
sidebar_position: 10
description: SIEM-friendly CSV and JSON exports of credentials and audit events. Enterprise tier.
---

# Compliance and audit exports

Compliance exports give your security team a stable, machine-parseable
copy of CalKeep's credential inventory and audit log — designed for SIEM
ingestion, vendor risk reviews, and audit prep.

For the lighter day-to-day audit-log read view, see
[Audit log](/admin/audit). For the buyer-facing overview, see
[Compliance and audit exports](https://calkeep.com/solutions/audit-and-compliance-exports).

## Plan tier

| Plan | Compliance exports |
|---|---|
| Free / Pro / Business | Not available |
| **Enterprise** | Available |

The 90-day audit-log read view is available on every plan; Enterprise
adds the export surface plus longer audit retention (1, 3, or 7 years).

## Where to find it

Compliance exports live inside **Settings → Workspace Admin →
Authentication Policy**, in the **Compliance** section near the bottom
of the page. (Admin only + recent MFA.) The same page hosts the
WebAuthn attestation policy and the force re-enrollment flow — the
three are kept together because they're driven by the same SOC 2 / ISO
27001 evidence-collection workflow.

You'll see:

- A **Credentials export** action — current WebAuthn credentials by user
  and state, as CSV or JSON.
- An **Audit export** action — audit events over a chosen lookback
  window (30, 90, or 365 days from the UI; longer via API), as CSV.
- The audit-log id of recent compliance actions for traceability.

Both surfaces support CSV; the underlying API (below) also supports
JSON output for richer ingestion.

## Credentials export

Pulls the current WebAuthn credential roster — who has a credential,
what type, and its state. Useful for:

- Confirming all admins are MFA-enrolled.
- Verifying force-reenroll campaigns took effect.
- Auditor-friendly proof of credential coverage.

```
GET /api/admin/compliance/credentials.csv
GET /api/admin/compliance/credentials.json
```

Columns are stable across releases — auditors and SIEM pipelines may
parse by position. New columns are appended; existing columns don't
move.

## Audit export

Pulls audit-log entries within a time window with optional action
filtering. Designed for SIEM ingestion.

```
GET /api/admin/compliance/audit.csv
GET /api/admin/compliance/audit.json
```

### Time-range query

| Parameter | Behavior |
|---|---|
| `?days=N` | Default 90. Pulls entries from the past N days. |
| `?since=ISO-8601` | Pulls entries since the given timestamp. |

The time window is clamped to your workspace's audit retention setting
(default 1 year on Enterprise; configurable to 3 or 7).

### Action filter

```
?actions=A,B,C
```

Comma-separated action types. Useful when you want only `MFA_*`,
`SAML_*`, `INVITATION_*`, etc.

### Output shape

CSV uses a stable column order via `csv-stringify`. The JSON shape:

```json
{
  "generatedAt": "2026-05-10T16:00:00Z",
  "workspaceSlug": "your-slug",
  "count": 142,
  "entries": [
    {
      "id": "...",
      "action": "MFA_ENROLLMENT_COMPLETED",
      "actor": { "id": "...", "email": "..." },
      "target": { ... },
      "timestamp": "...",
      "ip": "...",
      "metadata": { ... }
    }
  ]
}
```

`generatedAt` is the export-time stamp, not the entry-time stamp.
`workspaceSlug` confirms the export's tenant boundary.

## Workspace boundary

System-level audit rows (events without a `workspaceId`) are
**intentionally excluded** from workspace exports. Only events scoped
to your workspace leave the tenant boundary.

If you need cross-tenant or platform-wide audit reporting, contact
[support@calkeep.com](mailto:support@calkeep.com) — that's a
support-mediated request, not a self-serve export.

## Step-up reauthentication

Compliance exports require **recent MFA** — your last MFA verification
must be within the past 5 minutes. If it's older, CalKeep prompts for
TOTP or WebAuthn before letting the export run.

This is consistent with other sensitive admin actions (IP allowlist
edits, force re-enrollment, revoking another user's MFA).

## Telemetry

Each export emits a telemetry event:

- `auth.compliance.credentials-export` (with format + count).
- `auth.compliance.audit-export` (with format + count + filters).

This appears in the audit log itself as well, so an export of audit
entries always includes the export action that ran.

## SIEM ingestion patterns

Common patterns customers use:

- **Splunk** — pull `audit.csv` daily on a cron, drop into a forwarder
  watch directory.
- **Sumo Logic** — `audit.json` daily, ingested via the HTTP source.
- **Datadog Cloud SIEM** — `audit.json` via custom log pipeline.
- **Microsoft Sentinel** — `audit.csv` into a storage account, read by
  the Log Analytics agent.

The stable column order is the contract; if you build automation against
specific column positions, that's supported. New columns will be
appended after existing ones, never inserted.

## Force re-enrollment

If you mass-revoke WebAuthn credentials (because a model is being
deprecated, or because the credential roster needs a reset under a
stricter policy), the [force re-enrollment](/admin/security#enterprise-tier-policies)
flow under **Settings → Workspace Admin → Authentication Policy →
Force re-enrollment** drives that.

After force re-enrollment, a fresh credentials export confirms the new
roster. Useful as proof for an auditor that the campaign closed.

## Out of scope (today)

- Aggregated cross-workspace exports (would require platform-superadmin
  authority — not exposed to customers).
- Real-time event streaming via SCIM-event-style webhooks. Use
  [webhooks](/admin/webhooks) for real-time business events; compliance
  exports remain pull-based.

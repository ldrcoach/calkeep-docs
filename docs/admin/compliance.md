---
title: Compliance and audit exports
sidebar_position: 10
description: SIEM-friendly CSV exports of credential metadata and audit events. Enterprise tier.
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

The 90-day Audit Log list and JSON download are available on every plan;
Enterprise adds the two compliance CSV downloads plus longer audit retention
(1, 3, or 7 years).

## Where to find it

Compliance exports live inside **Admin Hub → Security & identity →
Authentication Policy**, in the **Compliance** section near the bottom of
the page (admin only + recent MFA). The same page hosts the
WebAuthn attestation policy and the force re-enrollment flow — the
three are kept together because they're driven by the same SOC 2 / ISO
27001 evidence-collection workflow.

You'll see:

- **Download credentials (CSV)** — current WebAuthn credential metadata by
  user and state.
- **Download audit log (CSV)** — workspace audit events over a 30-, 90-, or
  365-day lookback selected in the UI.

The current customer UI exports CSV. It does not expose a scheduled pull or a
customer-facing JSON endpoint.

## Credentials export

Pulls current WebAuthn credential records, including disabled records. Users
with no WebAuthn credential do not appear, and roles and TOTP state are not part
of this file. It is useful for:

- Reviewing the WebAuthn credentials that exist in the workspace.
- Verifying force-reenroll campaigns took effect.
- Auditor-friendly proof of credential coverage.

The stable columns are `userEmail`, `name`, `aaguid`, `attestationFormat`,
`isDiscoverable`, `transports`, `createdAt`, `lastUsedAt`, and `disabledAt`.
Formula-like cells are neutralized for spreadsheet safety.

## Audit export

Downloads workspace audit-log entries within the selected time window for
review or downstream ingestion.

### Time range

Choose 30, 90, or 365 days in the export controls. The default is 90 days.

The selector requests that lookback, while available rows also depend on the
workspace's physical retention policy (default 1 year on Enterprise;
configurable to 3 or 7). Physical purge runs asynchronously in bounded daily
batches, and this compliance export does not yet add a separate hard read-time
clamp during a retention-reduction purge interval.

The CSV includes stable workspace-scoped fields suitable for a compliance
packet or import into a SIEM, is newest-first, and returns at most 50,000
matching rows. Review the downloaded header row before wiring a downstream
parser, and retain the file according to your own evidence policy.

## Workspace boundary

System-level audit rows (events without a `workspaceId`) are
**intentionally excluded** from workspace exports. Only events scoped
to your workspace leave the tenant boundary.

Cross-workspace and platform-wide exports are not available to workspace
customers.

## Step-up reauthentication

Compliance exports require a verified email, an enrolled factor, and **recent
MFA**. If the verification is stale, CalKeep prompts for TOTP or WebAuthn before
letting the export run.

This is consistent with other sensitive admin actions (IP allowlist
edits, force re-enrollment, revoking another user's MFA).

## SIEM ingestion patterns

The current UI is a deliberate download surface rather than a scheduled feed.
After an authorized admin downloads a CSV, common internal handling patterns
include:

- place the audit CSV in a controlled Splunk forwarder directory;
- import the CSV through a Sumo Logic or Datadog ingestion workflow; or
- store the CSV in an approved Azure Storage location for Microsoft Sentinel.

CalKeep does not upload the export or configure those systems for you. These
are interactive admin-session downloads, not unattended API-token or cron
exports. Successful authorized downloads write the audit action
`compliance_export`.

## Force re-enrollment

If you mass-revoke WebAuthn credentials (because a model is being
deprecated, or because the credential roster needs a reset under a
stricter policy), the [force re-enrollment](/admin/security#enterprise-tier-policies)
flow under **Admin Hub → Security & identity → Authentication Policy → Force
re-enrollment** drives that. Before applying it, CalKeep shows the exact users
and credentials that the chosen policy would revoke so the admin can review
the affected population.

After force re-enrollment, a fresh credentials export confirms the new
roster. Useful as proof for an auditor that the campaign closed.

## Out of scope (today)

- Aggregated cross-workspace exports.
- Real-time event streaming via SCIM-event-style webhooks. Use
  [webhooks](/admin/webhooks) for real-time business events; compliance
  exports remain pull-based.

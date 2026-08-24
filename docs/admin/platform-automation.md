---
title: Platform automation
sidebar_position: 4
description: API tokens, signed webhooks, CSV exports, task import, and data movement in CalKeep.
---

# Platform automation

CalKeep's platform automation tools help Business and Enterprise workspaces move scheduling and operations data into the rest of their workflow. Use this page as the public reference for API, webhook, export, and import terms while the detailed developer reference is still expanding.

## API access

Existing Business and Enterprise API tokens are workspace-scoped and should be
treated like passwords. New token issuance in the current Integration Center is
temporarily paused while its request validator is repaired; existing tokens
remain usable and revocable.

Current public API coverage includes documented `/api/v1` endpoints and
read-only `/api/v2` resource families. API tokens are designed for
server-to-server workflows, not browser embeds or public client-side code.

## Webhooks

Signed outbound webhooks currently cover booking lifecycle events and public
API V1 contact create/patch events. Delivery logs help admins troubleshoot
failures and retry dead-lettered deliveries. Other labels visible in the
Integration Center are planned rather than a current delivery contract.

Webhook receivers should verify the signature before trusting the payload. Keep endpoint URLs private where possible and rotate secrets if a receiving system is compromised.

## CSV exports

CSV export is available for operational reporting and portability. Use exports when you need a point-in-time copy of supported workspace data for analysis, compliance review, or migration planning.

Calendar data can also be exported in ICS format, and contacts can be exported in CSV or vCard format from the product.

## Task import

Task-import **preview** validates the target workspace, assignees, reviewers,
and container membership without writing tasks. Import commit is temporarily
paused while CalKeep completes crash-safe, idempotent recovery for the
publication step; the UI will say when commit becomes available.

## Availability by plan

| Capability | Availability |
|---|---|
| Existing API tokens and documented `/api/v1` plus read-only `/api/v2` access | Business and Enterprise; new UI issuance temporarily paused |
| Signed booking/API-contact webhooks and recent delivery records | Business and Enterprise |
| CSV exports | Business and Enterprise |
| Task-import preview | Business and Enterprise; commit temporarily paused |

For help planning an integration, contact [support@calkeep.com](mailto:support@calkeep.com).

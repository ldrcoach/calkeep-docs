---
title: Platform automation
sidebar_position: 4
description: API tokens, signed webhooks, CSV exports, task import, and data movement in CalKeep.
---

# Platform automation

CalKeep's platform automation tools help Business and Enterprise workspaces move scheduling and operations data into the rest of their workflow. Use this page as the public reference for API, webhook, export, and import terms while the detailed developer reference is still expanding.

## API access

Business and Enterprise admins can create scoped API tokens from the Integration Center. Tokens are workspace-scoped and should be treated like passwords.

Current public API coverage starts with versioned workspace endpoints. API tokens are designed for server-to-server workflows, not browser embeds or public client-side code.

## Webhooks

Signed outbound webhooks notify your systems when supported CalKeep events occur. Delivery logs help admins troubleshoot failures and replay recent deliveries when needed.

Webhook receivers should verify the signature before trusting the payload. Keep endpoint URLs private where possible and rotate secrets if a receiving system is compromised.

## CSV exports

CSV export is available for operational reporting and portability. Use exports when you need a point-in-time copy of supported workspace data for analysis, compliance review, or migration planning.

Calendar data can also be exported in ICS format, and contacts can be exported in CSV or vCard format from the product.

## Task import

Guarded task import helps teams bring work into CalKeep without bypassing workspace access rules. Imports validate the target workspace, assignees, reviewers, and container membership before writing tasks.

## Availability by plan

| Capability | Availability |
|---|---|
| API tokens and `/api/v1` access | Business and Enterprise |
| Signed webhooks and delivery logs | Business and Enterprise |
| CSV exports | Business and Enterprise |
| Guarded task import | Business and Enterprise |
| Higher API and webhook limits | Enterprise |
| Longer webhook delivery-log retention | Enterprise |

For help planning an integration, contact [support@calkeep.com](mailto:support@calkeep.com).

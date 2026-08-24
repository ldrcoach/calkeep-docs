---
title: AI provider settings
sidebar_position: 11
description: Configure CalKeep's AI cleanup features — platform default or bring-your-own-key (BYOK).
---

# AI provider settings

CalKeep's AI features (contact deduplication, pattern discovery, junk
cleanup) call a large language model behind the scenes. By default, these
calls go through CalKeep's **platform provider** at no extra cost. On
**Business** and **Enterprise** plans, you can switch to **bring-your-own-key
(BYOK)** to use your own LLM account and bypass platform quotas.

For the buyer-facing positioning, see
[AI calendar and contact cleanup](https://calkeep.com/solutions/ai-calendar-cleanup).

Configure at **Admin Hub → Integrations & services → AI Provider**. (Admin only.)

## Plan tier

| Plan | AI features | BYOK |
|---|---|---|
| **Free** | Blocked | Blocked |
| **Pro** | 500 ops/mo + 2M tokens/mo on platform | Blocked |
| **Business** | 5,000 ops/mo + 20M tokens/mo on platform | Available |
| **Enterprise** | Unlimited on platform | Available |

When you switch a workspace to BYOK, the platform-side quota no longer
applies to that workspace — your usage is billed by your AI provider
directly.

## Saved source and effective runtime

The provider saved for the workspace and the provider that can serve a
request right now are related, but they are not the same piece of state.
CalKeep shows both:

- **Saved source** — the platform or BYOK choice last saved by an admin.
- **Effective runtime** — the provider that is currently available to
  execute AI work. A saved managed-provider choice can be unavailable if
  the deployment is not configured or the provider is unhealthy.
- **Unsaved draft** — changes currently being reviewed in the form. A draft
  does not affect live AI work until **Save** succeeds.

**CalKeep Recommended** selects from provider routes that are currently
configured, qualified for the workload, and allowed for the workspace. The
specific provider or model can change after evaluation, so the displayed
effective route is authoritative. If no managed or workspace provider is
available, AI remains unavailable rather than pretending a route exists. An
explicitly saved BYOK source that is broken or unavailable does not silently
fall back to the managed provider.

You do not need to supply a key to select the platform default. The plan-tier
monthly quotas (operations and tokens) apply, but selection alone is not a
health guarantee: use the effective-runtime status shown on the page.

## Personal model preference

Each user can open **Personal Settings → AI model preference**:

- **Pro** uses **CalKeep Recommended**.
- **Business** and **Enterprise** can choose from specific models that the
  server currently marks configured, approved, and selectable for that
  workspace.
- Evaluation candidates may be visible for transparency but cannot be selected
  until a matching endpoint is configured and the candidate passes review.
- If a saved preference is no longer available under the current plan or
  workspace configuration, CalKeep visibly uses Recommended for now. The
  displayed effective route remains the source of runtime truth.

Workspace administrators manage provider credentials and deployments
separately from each user's model preference.

## Bring-your-own-key (BYOK)

BYOK is for workspaces that want:

- Their own LLM billing relationship (so AI costs sit on their cloud bill).
- A specific provider (e.g., Azure OpenAI to comply with a Microsoft-only
  vendor policy).
- A specific model not on CalKeep's default.

Available on Business and Enterprise.

### Supported providers

| Provider | What you need |
|---|---|
| **Anthropic** | API key from console.anthropic.com |
| **OpenAI** | API key from platform.openai.com |
| **Azure OpenAI** | Endpoint URL, API key, and deployment name from your Azure OpenAI resource |

### Configure

1. **Admin Hub → Integrations & services → AI Provider → Bring your own key.**
2. Select provider (Anthropic, OpenAI, or Azure OpenAI).
3. Paste API key (Azure also requires endpoint URL and deployment name).
4. Optional: pick a specific model (defaults are sensible for each
   provider).
5. Click **Test connection**. CalKeep makes a minimal probe call against
   the draft credentials. Testing does not save or activate the draft.
6. **Save**.

### Security

- The API key is **encrypted at rest**.
- The key is shown to you only at paste time. After you save, the UI reports
  only whether a key is stored; it never returns the raw key.
- Rotation: paste a new key and save; the old encrypted value is
  overwritten.
- Clearing: click **Clear key** to remove the stored key and revert to
  the platform default.

## Quota and budget mechanics

On platform mode, every AI feature does a **plan-gate preflight**:

- Counts the operations and tokens the request will spend.
- Checks against your plan's monthly budget.
- For batch jobs (like contact cleanup), the full batch is preflighted
  ahead of time so it fails fast with HTTP 429 — no half-finished runs.

On BYOK, the preflight is skipped — your provider handles the billing
relationship. CalKeep still records operation counts for audit and
display purposes (so you can see what was spent in your workspace), but
it does not enforce a budget on your behalf.

## Live usage meter

The AI Provider settings page shows:

- This-month operation count and token count.
- Progress bars against your plan's monthly budget (platform mode).
- The currently active/effective provider.

For BYOK, the meter shows operation/token counts for your reference, but
no budget bar — your provider's portal is the billing source of truth.

## Test connection

The **Test connection** button on BYOK sends a minimal probe call using the
current draft:

- Anthropic: a single short message to the chosen model.
- OpenAI: same.
- Azure OpenAI: a probe against the configured endpoint + deployment.

Success or failure never saves the draft. Failures surface a clear error
(invalid key, unreachable endpoint, unsupported model) without persisting the
broken configuration.

## Telemetry and audit

Successful saved workspace-provider changes write the audit action
`ai_settings_updated`, covering source changes and key set, clear, or
replacement. **Test connection** sends a diagnostic probe against the draft but
does not save the draft and does not create that settings-change audit row.
Monthly usage totals appear on the AI Provider page; they are not documented as
individual audit events.

## Troubleshooting

- **AI cleanup job failed with HTTP 429** — your platform-mode budget for
  the month is exhausted, or BYOK provider is rate-limiting. Pause the
  job; resume after the budget resets or the provider's rate window
  passes.
- **Test connection times out** — for Azure OpenAI, the endpoint URL
  needs to include the full base path; double-check the format Azure
  expects in your Azure OpenAI resource overview.
- **The UI says a key is stored, but cleanup runs fail with an authentication
  error** — the stored key has been revoked or rotated upstream. Paste a fresh
  key and save.
- **You want to know which provider is active** — use the displayed effective
  runtime on the AI Provider page or the effective route in Personal Settings;
  do not infer it from the saved source alone.

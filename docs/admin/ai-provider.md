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

Configure at **Settings → AI Provider**. (Admin only.)

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

## Platform default

The default `Anthropic` platform provider:

- **Per-contact cleanup** uses Claude Haiku.
- **Pattern discovery** uses Claude Sonnet.
- **Ephemeral prompt caching** is enabled — repeated system prompts
  across N per-contact calls become one billed read + N cheap cache
  hits.

Fallbacks (when an admin has set workspace-level overrides, or platform
keys are misconfigured) include OpenAI and Azure OpenAI.

You don't need to configure anything to use the platform default — it's
the out-of-the-box behavior. The plan-tier monthly quotas (operations and
tokens) apply.

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

1. **Settings → AI Provider → Bring your own key.**
2. Select provider (Anthropic, OpenAI, or Azure OpenAI).
3. Paste API key (Azure also requires endpoint URL and deployment name).
4. Optional: pick a specific model (defaults are sensible for each
   provider).
5. Click **Test connection**. CalKeep makes a minimal probe call against
   the credentials.
6. **Save**.

### Security

- The API key is **encrypted at rest** using the same AES key that
  protects OAuth tokens.
- The key is shown to you only at paste time. After you save, the
  GET-settings response returns `hasKey: true` instead of the raw key
  — there's no way to read it back through the UI.
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
- Last-N-runs activity per AI feature (cleanup job, pattern discovery,
  per-contact decisions).

For BYOK, the meter shows operation/token counts for your reference, but
no budget bar — your provider's portal is the billing source of truth.

## Test connection

The **Test connection** button on BYOK saves a minimal probe call:

- Anthropic: a single short message to the chosen model.
- OpenAI: same.
- Azure OpenAI: a probe against the configured endpoint + deployment.

Failures surface a clear error (invalid key, unreachable endpoint,
unsupported model) without persisting the broken configuration.

## Telemetry and audit

AI provider configuration changes are audited:

- Switching modes (platform ↔ BYOK).
- Key set/cleared/rotated.
- Test-connection runs (success/failure).
- Per-feature usage counts (operation totals — not message contents).

Find at **Settings → Audit Log** filtered by AI-related actions.

## Troubleshooting

- **AI cleanup job failed with HTTP 429** — your platform-mode budget for
  the month is exhausted, or BYOK provider is rate-limiting. Pause the
  job; resume after the budget resets or the provider's rate window
  passes.
- **Test connection times out** — for Azure OpenAI, the endpoint URL
  needs to include the full base path; double-check the format Azure
  expects in your Azure OpenAI resource overview.
- **Key field shows `hasKey: true` but cleanup runs fail with auth
  error** — the stored key has been revoked or rotated upstream. Paste
  a fresh key and save.
- **You want to know which model an operation actually used** — the
  cleanup operation history page shows the provider and model per
  operation, useful when comparing platform vs BYOK behavior.

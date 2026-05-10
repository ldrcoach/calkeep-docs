---
title: Contacts
sidebar_position: 4
description: Workspace contacts, import/export, AI cleanup, sharing, and follow-up reminders.
---

# Contacts

Contacts are CalKeep's lightweight CRM. Every booking auto-creates or
matches a contact, every connected calendar provider's contacts can sync
in, and every follow-up task can attach to a contact.

Manage at **People** in the sidebar.

## Where contacts come from

| Source | Behavior |
|---|---|
| **Bookings** | Each booking auto-creates a contact (or matches an existing one by email) so follow-up has a home. |
| **Provider sync** | Google and Microsoft contacts sync in if you grant the contacts scope when connecting the account. iCloud and Yahoo (CalDAV) don't expose contacts the same way. |
| **Manual create** | Add a contact directly from **People → New contact**. |
| **CSV / vCard import** | Bulk-import from a file. See [Import](#import). |
| **Public API** | `POST /api/v1/contacts` (Business+ tier). See [API tokens](/admin/api). |

## Contact fields

Each contact carries the standard set — name, organization, emails, phone
numbers (with type labels: business, mobile, home), addresses, notes, tags
— plus a few CalKeep-specific fields:

- **Owner** — the user who created or imported the contact.
- **Reminders** — outstanding follow-up reminders.
- **Linked tasks** — tasks attached to this contact.
- **Linked bookings** — bookings tied to this contact.
- **Shared with** — workspace teammates who have access via a share.

## Import

Go to **People → Import**.

CalKeep auto-detects:

- Google Contacts CSV
- Outlook CSV
- iCloud CSV
- vCard (single or multi-card)
- Generic CSV (with an explicit column-mapping step)

Two-step flow:

1. **Dry run** — upload the file. CalKeep shows row count, duplicate
   matches, validation errors, and a per-row preview before any write.
2. **Commit** — pick a duplicate strategy and click **Import**:
   - **Skip duplicates** — rows that match an existing contact are
     skipped.
   - **Merge duplicates** — non-empty incoming fields win; arrays
     concatenate; the existing contact id is preserved.
   - **Overwrite duplicates** — replace matched contact's fields,
     preserving id, workspaceId, createdAt.

A 10 MB file cap applies. Files larger than that should be split.

## Export

**People → Export** produces:

- **CSV** — Excel-ready, with a stable column order.
- **vCard** — standard contacts format for restoring elsewhere.

Exports are workspace-scoped — only contacts in your workspace are included.

## AI cleanup

Years of provider sync, CSV imports, and manual edits create duplicates and
junk. CalKeep's **AI cleanup** runs in two phases:

### Phase 0 — Bulk pattern rules (deterministic)

These run before any AI is invoked:

- **Strip Outlook notes boilerplate** — remove repeated `.\n\n` accumulations
  the Outlook directory adds.
- **Dedupe phone variants** — country-code-aware (e.g., `1-555-...` vs
  `+15555...`).
- **Relabel mis-classified phones** — business vs home vs mobile.
- **Split business names** — extract organization from a "Name (Company)"
  pattern.
- **Dedupe duplicate notes paragraphs** — strip repeated boilerplate blocks.

Preview match counts at **People → AI Cleanup → Bulk rules** before
applying.

### Phase 1 — Per-contact AI cleanup

For genuinely-ambiguous cases, an LLM proposes specific changes per contact.
By default this uses the platform Anthropic Claude provider; Business+
workspaces can bring their own key. See [AI provider](/admin/ai-provider).

Every operation creates a `DedupOperation` record. **Every change is
reversible per record** — one click to revert.

The job runs in the background in chunks. You can pause, resume, or
retry-failed contacts at any time.

For the buyer-facing positioning, see
[AI calendar and contact cleanup](https://calkeep.com/solutions/ai-calendar-cleanup).

## Junk contact handling

Contacts with **no email AND no phone** (typically Outlook directory
stubs that synced in by mistake) are deleted from the provider during
sync — not just hidden in CalKeep. This stops them from re-importing on
the next poll cycle.

If you want to preserve a contact that has neither email nor phone, add at
least one of those fields manually before the next sync.

## Sharing

Contacts are workspace-scoped, so all admins can see them by default. For
finer-grained sharing of individual contacts:

1. Open a contact and click **Share**.
2. Pick teammates and a permission level — **VIEW** or **EDIT**.
3. The shared user sees the contact in their list and can view (or edit)
   the shared fields.

Edit-permission shares use a **conflict-detection** system: if two users
edit the same contact at once, the second save shows a diff and asks the
user to resolve. Edits are scoped to a whitelist of editable fields —
some fields (owner, audit metadata) are never editable through a share.

Share contact at: **People → [contact] → Share**.

Sharing requires the **Pro** plan or higher.

## Follow-up reminders

Each contact can have follow-up reminders. Channels:

- **In-app** — a notification in the CalKeep notification inbox.
- **Email** — branded reminder email.
- **SMS** — text message (number on file required).
- **WhatsApp** — Pro+ tier with explicit per-user opt-in. See
  [Notification settings] for the WhatsApp opt-in flow inside the app.

Reminders fire from a background worker. Overdue reminders (>24h) fall
back to in-app only to avoid spamming.

Snooze and dismiss are per-channel.

## Programmatic access

Workspace admins on Business+ can read and (in the first slice) create
contacts via the API:

```http
GET    /api/v1/contacts
GET    /api/v1/contacts/:id
POST   /api/v1/contacts
PATCH  /api/v1/contacts/:id
```

See [API tokens](/admin/api) for authentication and the full resource
list.

The `contact.created` and `contact.updated` webhooks fire on commit so
your CRM, support tool, or marketing automation system can stay in sync.
See [Webhooks](/admin/webhooks).

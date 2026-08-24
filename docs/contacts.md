---
title: Contacts
sidebar_position: 4
description: Workspace contacts, import/export, AI cleanup, sharing, and follow-up reminders.
---

# Contacts

Contacts are CalKeep's lightweight CRM. Every booking auto-creates or matches a
contact, reviewed Google and Microsoft contact books can sync after Contacts
access is requested, provider-granted, discovered, and explicitly enabled, and
every follow-up task can attach to a contact.

Manage at **People** in the sidebar.

## Where contacts come from

| Source | Behavior |
|---|---|
| **Bookings** | Each booking auto-creates a contact (or matches an existing one by email) so follow-up has a home. |
| **Provider contact book** | Google and Microsoft contact books become reviewable only when Contacts was requested, the provider granted access, and discovery succeeded. Every newly discovered book starts with sync, writeback, and delete-at-source off. |
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

For genuinely ambiguous cases, the workspace's current effective AI runtime
proposes specific changes per contact. The saved source and effective runtime
can differ when a provider is unavailable. Business+ workspaces can configure
their own provider credentials. See [AI provider](/admin/ai-provider).

Every operation creates a `DedupOperation` record. **Every change is
reversible per record** — one click to revert.

The job runs in the background in chunks. You can pause, resume, or
retry-failed contacts at any time.

For the buyer-facing positioning, see
[AI calendar and contact cleanup](https://calkeep.com/solutions/ai-calendar-cleanup).

## Junk contact handling and provider safety

CalKeep can flag low-information contacts, including records with no email and
no phone, for cleanup. Cleanup removes the **CalKeep copy by default**. Provider
discovery alone never enables contact sync, writeback, or deletion.

Deleting the backing provider contact is possible only when the exact contact
book supports provider writes, the provider currently grants the required
contact-write access, the source owner or a workspace administrator has
explicitly enabled writeback for that book, and **delete at source** is
separately enabled. The reviewed delete still offers a local-only choice even
when source deletion is armed.

If those conditions are not all true, deletion remains local to CalKeep. This
read-only-by-default boundary prevents a cleanup rule, import, or ordinary
workspace edit from silently deleting a Google or Microsoft contact.

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

The `contact.created` and `contact.updated` webhooks are emitted after
successful public API V1 contact create and patch operations. They are not a
complete stream of manual, imported, or booking-created contact changes. See
[Webhooks](/admin/webhooks).

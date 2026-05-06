---
title: Team management
sidebar_position: 1
description: Invite teammates, set roles, manage seats, and remove users.
---

# Team management

This page is for **workspace admins** managing who can access the workspace.

## Invite a teammate

Go to **Settings → Team**. There are several invite paths — pick what fits:

- **Single invitation:** enter an email + role (user or admin), click Send. They get an email with a join link valid for 7 days.
- **Bulk CSV invitation:** paste a list of `email,role` lines and send them all at once.
- **Invite link:** generate a shareable URL with an optional expiry, max uses, or domain restriction.
- **M365 directory picker:** authorize CalKeep to read your tenant's user list, then hand-pick who to invite.
- **Domain auto-join:** any new sign-in from your verified company domain joins automatically.

For the full setup walkthrough, see [Getting started → Step 3](/getting-started#step-3-onboard-your-team).

## Roles

CalKeep has two workspace roles:

| Role | Can do |
|---|---|
| **User** | Use all product features — calendar, bookings, contacts, tasks. Edit their own profile, MFA, and connected accounts. |
| **Admin** | Everything a user can, plus: invite/remove members, change roles, configure branding, configure security policies, manage billing seats, view audit logs. |

The first user (workspace creator or activator) is automatically an admin. There's no fixed limit on the number of admins.

## Seats and the Marketplace ceiling

The number of users you can invite is the smaller of:

- **Plan tier limit** — FREE = 1 user, PRO/BUSINESS/ENTERPRISE = unlimited.
- **Marketplace seat count** — if you bought through Azure Marketplace, the seat count you purchased.

When you hit the Marketplace seat ceiling, the invite form shows a banner with a link to update the seat quantity in your Azure Marketplace subscription. The plan in CalKeep doesn't change — only the seat budget does.

## Remove a teammate

**Settings → Team → [user] → Remove.** This:

- Soft-deletes the user account (data preserved for audit).
- Invalidates every session token they had — they're signed out immediately.
- Revokes their trusted-device entries, pending invitations, and WebAuthn credentials.

Removing the workspace owner (the oldest admin) is blocked. Promote another admin first if you need to deactivate the current owner.

Removing yourself is blocked — ask another admin to do it.

## Audit trail

Every team management action writes to the **audit log** at **Settings → Audit Log** (admin-only). Visible: invites sent, invites resent, invites revoked, invites accepted, role changes, removals. The retention window is 90 days on FREE/PRO/BUSINESS and configurable up to 7 years on ENTERPRISE.

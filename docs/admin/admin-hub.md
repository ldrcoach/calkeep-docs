---
title: Admin Hub
sidebar_position: 1
description: Start and verify workspace administration without confusing an available control with a configured service.
---

# Admin Hub

The **Admin Hub** is the workspace administrator's starting point. It groups
administration by outcome while keeping each detailed screen directly
reachable.

## Three administration groups

### Workspace management

Use **Workspace management** for members, branding, and structured use-case
requests. Team membership, invitations, seats, and branding load as separate
facts, so a failed read is not presented as an empty workspace or a saved
default.

### Security & identity

Use **Security & identity** for authentication policy, SAML configuration,
SCIM provisioning, and the workspace audit log. Enterprise availability means
your plan permits a control; it does **not** prove SSO or SCIM is configured,
enabled, enforced, or healthy. Sensitive changes require a currently enrolled
factor and recent MFA verification.

### Integrations & services

Use **Integrations & services** for the Integration Center, payment readiness,
the AI provider, and meeting-notetaker configuration. API tokens, webhooks,
provider connections, payment rails, and AI runtime each report their own
verified state. An unavailable status is not converted into “not connected” or
“zero configured.”

## Guided administration

The hub highlights the next reviewable outcome while preserving direct access
to every detailed screen. **Ask CalKeep** can explain a state and propose a
plan, but it cannot enable a service, change policy, issue a secret, submit a
payment action, or claim that an unavailable integration is healthy.

## Scheduling delegation

Scheduling Delegation is a **Team** destination rather than one of the three
Admin Hub groups. Workspace administrators can use **Team → Scheduling
Delegation** to grant one verified teammate narrowly scoped scheduling
authority for another teammate. CalKeep presents the reviewed envelope:

- principal and assistant;
- availability, booking, and event scopes;
- private-event visibility;
- booking-page, event-type, and calendar allowlists;
- allowed actions and actions that require approval; and
- effective and expiry dates.

Pending, active, future, expired, and revoked delegations stay distinct.
Administrator create, change, and revoke commands are bound to the reviewed
revision and require an enrolled, recently verified factor. A principal's own
accept/decline decision is revision-bound and caller-scoped but is not an admin
MFA action; a principal may also revoke their own delegation directly.
Revocation removes authority while retaining the evidence trail.

## Safe interpretation

- **Available** means the control is permitted by the current plan and role.
- **Configured** means saved configuration exists.
- **Enabled or enforced** is a separate setting.
- **Healthy** requires a successful current status check.
- **Unavailable** means CalKeep could not verify the state; retry before taking
  action.

This vocabulary is intentional across the Admin Hub. Never infer one state from
another.

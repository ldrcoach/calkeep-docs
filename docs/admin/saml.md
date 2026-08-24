---
title: SAML 2.0 SSO
sidebar_position: 4
description: Configure SAML 2.0 single sign-on against Microsoft Entra ID, Okta, OneLogin, or any SAML-compliant IdP. Enterprise tier.
---

# SAML 2.0 SSO

CalKeep supports SAML 2.0 single sign-on on the **Enterprise** plan. Tested
against Microsoft Entra ID, Okta, and OneLogin; any SAML-compliant IdP
should work.

This page is the admin reference. For the buyer-facing overview, see
[Enterprise SSO + SCIM + access controls](https://calkeep.com/solutions/enterprise-sso-scim-controls).

## Plan tier

| Plan | SAML SSO |
|---|---|
| Free / Pro / Business | Not available |
| **Enterprise** | Available with optional enforce-SSO policy |

## What SAML gives you

- Single sign-on from your IdP into CalKeep — users don't need a second
  password.
- **JIT (just-in-time) provisioning** — new users matched by email are
  created automatically (configurable).
- **Group-to-role mapping** — IdP groups translate to CalKeep `user` or
  `admin` roles.
- **Optional enforce-SSO policy** — the password field is hidden on the
  branded login page; only the SSO button is shown. The workspace owner
  retains an emergency password path so a misconfiguration can never lock
  you out completely.

## Configure

Go to **Admin Hub → Security & identity → SSO Configuration**. (Admin role +
recent MFA required.)

### Step 1: Exchange metadata

CalKeep needs your IdP's metadata; your IdP needs CalKeep's metadata.

**CalKeep's SP metadata URL:**

```
https://calkeep.com/api/auth/saml/metadata/<your-workspace-slug>
```

This XML document contains the entityId, ACS URL, certificate, and
signature requirements your IdP needs.

**Loading the IdP's metadata into CalKeep:** upload the IdP metadata XML
file at **Admin Hub → Security & identity → SSO Configuration → Upload IdP
metadata**. CalKeep parses the file and shows you the parsed fields
(entityId, SSO URL, SLO URL, certificate) for review before saving.
You can also enter the fields by hand if you don't have a metadata
file.

### Step 2: Validate the IdP certificate

Before saving, CalKeep runs a self-test against the certificate (using
Node's `crypto.X509Certificate`). Common admin paste mistakes — extra
whitespace, missing `-----BEGIN CERTIFICATE-----` headers, the wrong
certificate from a multi-cert chain — fail fast with a clear error
rather than after the first sign-in attempt.

### Step 3: Configure provisioning

Decide who gets created on first sign-in:

| Setting | Behavior |
|---|---|
| **`allowJit`** | If on, users that match by email but don't exist in the workspace are created on first sign-in. Off means only pre-invited users can sign in. |
| **`allowJitAdmin`** | If off, JIT-provisioned admin-mapped users are demoted to `user` role. Useful when you want strict admin gating. |
| **`defaultRole`** | The role assigned to provisioned users when no group-mapping rule matches. |
| **`groupAttributeName`** | The IdP attribute carrying the user's groups. Default: `http://schemas.xmlsoap.org/claims/Group`. |
| **`groupRoleMap`** | Ordered map from group name to CalKeep role. Declared-order evaluation, first match wins. |

### Step 4: Choose enforcement

| Option | Behavior |
|---|---|
| **Disabled** | SAML is paused. The saved configuration remains available to re-enable later; clearing the configuration is a separate action. |
| **Enabled, not enforced** | SAML is available, and the workspace's other primary sign-in methods remain available. |
| **Enabled and enforced** | Non-owners must use SAML. Password, magic-link, calendar-provider/OIDC, and passkey primary sign-in are blocked. The workspace owner retains the emergency-access bypass. |

The owner-bypass is intentional: if SAML breaks (expired cert,
misconfigured IdP, IdP outage), the workspace owner can still sign in
to fix it.

## Login flow

Once configured:

1. User goes to your branded login URL: `https://calkeep.com/login?ws=<your-slug>`.
2. They click **Sign in with SSO**.
3. CalKeep posts an AuthnRequest to your IdP's SSO URL.
4. IdP authenticates, posts a signed SAMLResponse back to CalKeep's ACS
   URL: `/api/auth/saml/acs/<your-slug>`.
5. CalKeep verifies the signature, JIT-provisions if needed, mints a
   session JWT, and redirects to the app.

If enforcement is on, only the SSO path is available to non-owners. Turning
SAML off pauses it without erasing the saved metadata, certificates, mappings,
or enforcement draft; **Clear configuration** is the distinct destructive
action for removing those saved values.

## Single Logout (SLO)

If your IdP supports IdP-initiated SLO and you've configured the SLO URL,
CalKeep accepts SLO requests at `/api/auth/saml/slo/<your-slug>` and
invalidates every outstanding session JWT for the user (by bumping
their token version).

This means a logout from the IdP propagates to CalKeep within seconds.

## Audit and telemetry

Every SAML event writes to the audit log:

- `saml_login` — successful sign-in (with `provisioned: true|false`,
  resolved role, matched groups).
- `saml_login_failed` — with a reason code (`signature`, `replay`,
  `claim`, `unknown`).
- `saml_config_updated` — the change set, plus previous and next
  enabled state.

Review at **Admin Hub → Security & identity → Audit Log**.

## Compatibility

Tested IdPs (and example metadata-export instructions):

- **Microsoft Entra ID** — Enterprise applications → Add a non-gallery
  application → Single sign-on → SAML.
- **Okta** — Applications → Browse App Catalog → Create new SAML
  integration.
- **OneLogin** — Applications → Add app → SAML Custom Connector
  (Advanced).

Other SAML 2.0-compliant IdPs (PingFederate, JumpCloud, Auth0, Keycloak,
Google Workspace) should work the same way; the metadata-exchange shape
is standard.

## Troubleshooting

- **`invalid_idp_certificate` on save** — paste the certificate
  including the `-----BEGIN CERTIFICATE-----` and `-----END
  CERTIFICATE-----` lines; check there's no trailing whitespace.
- **AuthnRequest goes out, IdP errors with "Invalid issuer"** — the IdP's
  copy of CalKeep's entityId is stale. Re-import the SP metadata from
  the URL above.
- **Users sign in but land as `user` when they should be `admin`** —
  check the IdP attribute named in `groupAttributeName` is actually
  emitted on the SAML assertion, and that the group name matches a key
  in `groupRoleMap` (case-sensitive).
- **Owner can sign in but no one else can** — confirm `allowJit` is on if
  you expect new users to be auto-created. If off, pre-invite each user
  via [Team management](/admin/team-management).

For Enterprise-tier security policies that compose with SAML — IP
allowlist, custom session timeout, force re-enrollment — see
[Security and authentication](/admin/security#enterprise-tier-policies).

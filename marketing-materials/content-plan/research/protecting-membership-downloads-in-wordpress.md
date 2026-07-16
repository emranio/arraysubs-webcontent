# Research: Protecting Membership Downloads in WordPress

## Research record

- Brief: `articles/050-protecting-membership-downloads-in-wordpress.md`
- Researched: 2026-07-16
- Intent: security-led implementation guidance
- Primary query: `protect membership downloads WordPress`
- Product scope inspected: ArraySubs core Members Access `1.8.11`; WooCommerce download infrastructure and WordPress nonce behavior
- Evidence: source inspection, read-only mirror inspection, official WooCommerce/WordPress/OWASP documentation
- Caveat: current source has some legacy backend keys for limits, but the inspected Downloads UI exposes files, conditions, and schedules—not a configurable download-limit/expiry interface. Do not market UI controls that are not present.

## Direct answer for the opening

> Protecting a membership download requires authorization when the file is requested, not merely hiding its link. ArraySubs checks login, nonce, current membership conditions, and schedule before serving or redirecting a file. But a public Media Library URL or exposed CDN object can bypass that endpoint, so sensitive assets also need private storage or server/CDN enforcement.

The article should lead with this layered answer, not with “install a plugin.”

## Key takeaways

1. A hidden button is not file protection; the raw file path is the real security boundary.
2. ArraySubs re-evaluates the current member’s rule at click time and adds eligible files to WooCommerce My Account → Downloads.
3. The generated link contains a WordPress nonce, which is an anti-CSRF token—not a single-use, short-lived signed download URL and not authentication by itself.
4. Local files streamed through PHP can be protected only if their raw URL is not independently public. External/CDN files are redirected to their final URL in the inspected implementation.
5. Test expired/cancelled access, copied links, direct raw URLs, cache/CDN behavior, logs, backups, and account sharing.

## Verified ArraySubs behavior

### Member experience

Qualifying downloads are appended to WooCommerce’s normal **My Account → Downloads** table for logged-in users. ArraySubs does not replace native WooCommerce downloadable-product files; it adds rule-based files alongside them.

Each rule contains:

- one or more files;
- access conditions;
- optional schedule/drip settings;
- an enabled state and administrative metadata.

Current UI evidence:

- `arraysubs/src/Features/MembersAccess/resources/components/DownloadsRulesTab.jsx`
- related rule/file/condition builder components under the same resources directory

### Request-time checks

At its download endpoint, the inspected `DownloadManager`:

1. validates the WordPress nonce;
2. requires a logged-in user;
3. resolves rule and file indexes;
4. confirms the rule and file are still enabled/valid;
5. re-evaluates the current user’s access conditions;
6. applies the configured schedule/drip gate;
7. checks legacy limit state if the relevant stored values exist;
8. serves a local file through PHP or redirects to an external URL.

Evidence:

- `arraysubs/src/Features/MembersAccess/Services/DownloadManager.php`
- `arraysubs/src/Features/MembersAccess/Services/ConditionEvaluator.php`

This is stronger than a static “members only” page because entitlement is rechecked at request time. State changes such as cancellation or expiration can therefore deny the endpoint—subject to cache and any independently public raw URL.

### Local files versus external files

- A recognized local upload URL is converted to a filesystem path and streamed with attachment headers.
- A non-local/external URL is redirected to the configured address.

Critical caveat: the endpoint cannot make a public Media Library URL private. If `/wp-content/uploads/.../file.pdf` is directly reachable, a copied raw URL bypasses the ArraySubs request checks. Likewise, an external/CDN redirect reveals the destination unless that destination has its own expiring signed URL or authorization policy.

### Nonce accuracy

Do not call the current link a one-time signed URL. WordPress nonces are time-windowed values tied to an action and user session context; by default they can remain valid across a 12–24-hour window and are not consumed after one use. WordPress explicitly says nonces must not be relied on for authentication or authorization. ArraySubs supplements the nonce with login and entitlement checks, which is the correct distinction to explain.

## Threat model table

Use this as an original, extractable artifact.

| Leak/bypass path | What can go wrong | Required control | ArraySubs role | Separate infrastructure role |
|---|---|---|---|---|
| Raw uploads URL | Anyone with URL downloads file | Non-public storage or web-server deny/controlled delivery | Endpoint checks do not protect a separate public URL | Required |
| Copied ArraySubs endpoint URL | Another user reuses link | Login, nonce, current entitlement | Rechecked at request time | Session security still matters |
| External/CDN redirect | Final URL is visible/shareable | Private object + expiring signed URL/cookie | Redirects in current code | Required for sensitive files |
| Stale cache | Member response reaches guest or revoked member | Never publicly cache authorized download responses; vary page state correctly | Dynamic check at endpoint | CDN/page cache configuration |
| Account sharing | Multiple people use one valid account | Account controls, anomaly monitoring, device/session policy | Not a DRM system | Identity/session policy |
| Logs, analytics, referrers | Sensitive URLs are retained | Redaction and URL design | Avoid secrets in filenames/query logs | Logging/analytics configuration |
| Backups/origin access | Protected files exposed elsewhere | Backup encryption and access control | Out of scope | Required |

## Storage/delivery decision guide

| Sensitivity | Recommended delivery | Why |
|---|---|---|
| Low-risk worksheet/marketing bonus | PHP-controlled endpoint can be adequate if raw uploads URL is blocked | Simple; entitlement rechecked |
| Paid course asset or valuable report | Protected local directory + X-Accel/X-Sendfile/Force Downloads where supported | Origin prevents direct public access and app authorizes request |
| Large video/archive | Private object storage/CDN with short-lived signed URLs or cookies | Efficient delivery without exposing permanent public object |
| Regulated/highly confidential material | Dedicated document platform, strong identity, auditing, revocation, legal/security review | WordPress membership gating alone is not a complete controls program |

Do not imply “Force Downloads” universally works on every host. WooCommerce notes server compatibility and performance tradeoffs; approved download directories and NGINX/Apache configuration matter.

## Recommended article outline

1. Direct answer: authorization plus private storage
2. Define protected page, protected link, protected object, and DRM
3. How ArraySubs membership downloads appear and are validated
4. Why a nonce is not a single-use signed URL
5. Public Media Library/raw URL bypass
6. Local protected delivery options
7. Private CDN/object-storage pattern
8. Schedules/drip behavior and current UI limitations
9. Threat model: copied links, accounts, cache, logs, backups
10. Configuration walkthrough in ArraySubs
11. Revocation and direct-link test plan
12. When WordPress is not the right security boundary
13. FAQ

## ArraySubs configuration walkthrough

1. Open ArraySubs → Member Access → Downloads.
2. Add an unsaved/new rule and name it by member outcome, not a vague plan label.
3. Add the file and verify whether the URL is local or external.
4. Add the exact active-subscription/product/role/feature condition.
5. Add a schedule only if the business requires delayed release.
6. Save only after verifying storage protection for the underlying object.
7. Test the My Account table as an entitled customer.
8. Copy the endpoint URL, log out, use another user, cancel/expire the entitlement, and retry.
9. Test the raw file URL separately. If it works, the asset itself is not private.

## Product/version caveats

- The current React rule builder exposes files, condition groups, and scheduling.
- The backend contains legacy keys such as `allow_download`, `download_limit`, `limit_period`, and `reset_on_renewal`, plus default `download_settings` values. The inspected UI does not expose a complete limits/expiry configuration, and the defaults are not sufficient evidence of a supported public feature.
- Do not claim per-user one-time links, DRM, IP/device binding, watermarking, audit-grade logs, or signed CDN URLs.
- Current external delivery is a redirect. Explain that the destination needs its own security.

## Original validation checklist

- [ ] File is not reachable by raw Media Library/uploads URL.
- [ ] Logged-out request is denied.
- [ ] Different logged-in user cannot reuse the link.
- [ ] Active member can download.
- [ ] Cancelled/expired/non-qualifying member is denied immediately enough for policy.
- [ ] Drip schedule boundaries use the intended site timezone and subscription date basis.
- [ ] Browser back/refresh and repeated link use match the stated policy.
- [ ] CDN does not cache the authorized response publicly.
- [ ] External storage object is private and its signed URL is short-lived, if used.
- [ ] Filenames and URLs contain no secrets or personal data.
- [ ] Access and error logs do not retain reusable secrets longer than necessary.
- [ ] Backup/origin access is reviewed.
- [ ] Admin and support recovery path is documented.

## Official sources and claim map

- [WordPress Nonces](https://developer.wordpress.org/apis/security/nonces/) — nonces are not authentication/authorization; default tick/lifetime behavior and user/action context.
- [WooCommerce: Digital/Downloadable Product Handling](https://woocommerce.com/document/digital-downloadable-product-handling/) — download methods, login requirements, file paths, and security cautions.
- [WooCommerce: Approved Download Directories](https://woocommerce.com/document/approved-download-directories/) — approved directories and migration/validation behavior.
- [WooCommerce Product Settings](https://woocommerce.com/document/configuring-woocommerce-settings/products/) — downloadable-product settings and delivery options.
- [WooCommerce developer guide: Using NGINX to protect uploads](https://developer.woocommerce.com/docs/code-snippets/using_nginx_server_to_protect_your_uploads_directory) — server-level origin protection example; present as NGINX-specific, not universal.
- [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html) — validate permissions on every request, least privilege, deny by default, and authorization testing.

## Internal-link plan

Verify final routes:

- Feature: `/features/members-access/`
- Recipe: `/recipes/membership-downloads/` or closest implemented download rule recipe
- Pillar: `/guides/woocommerce-memberships/`
- Sibling A047: membership-site architecture
- Sibling A049: SEO for gated content
- Sibling A051: roles, levels, and entitlements
- Sibling A053: partial content restriction, with an explicit reminder that HTML gating does not protect media

## Mirror screenshot opportunities

Route: `https://mirror-help.arrayhash.com/wp-admin/admin.php?page=arraysubs-mainadmin#/members-access/downloads-rules`

Read-only capture plan:

1. Open Downloads and click **Add New Rule** without saving.
2. Capture the unsaved builder.
3. Annotate **Add File**, **Add Condition**, **Add Group**, the condition mode, schedule area, and save control.
4. If a preexisting test member has a safe file, capture My Account → Downloads with the file name anonymized if necessary. Never create a live rule solely for a screenshot.
5. A browser network/devtools view can illustrate the controlled endpoint versus raw file URL only if tokens/nonces are fully obscured.

Caption: “The rule grants a file through conditions and timing; storage configuration determines whether the raw object is also private.”

## Varied visual concepts

1. **Real app screenshot:** annotated Downloads rule builder.
2. **Security scene:** a librarian checks a member card at the desk while an unguarded side door represents a public raw URL.
3. **Layered shield concept:** login, nonce, current entitlement, schedule, and private storage as independent rings.
4. **Object-flow shapes:** My Account link → ArraySubs authorization → protected origin/CDN → download.
5. **Real member screenshot:** WooCommerce Downloads table with marker on the membership file.
6. **Red-team vignette:** copied endpoint, copied raw URL, expired member, and second account attempting access.

Use at most one matrix-style graphic; the article should feel like security education, not an analytics report.

## Review and update triggers

- Name a technical reviewer who understands WordPress authorization and the actual web-server/CDN stack.
- Include dates and an update log.
- Recheck when ArraySubs download endpoints/UI, WordPress nonce behavior, WooCommerce approved directories, or hosting delivery methods change.
- State that no web delivery system prevents an authorized user from saving and resharing content; this is access control, not DRM.


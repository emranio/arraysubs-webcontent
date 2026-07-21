# Research brief: WooCommerce Content Restriction Strategy

## Research record

- **Article:** A045 — WooCommerce Content Restriction Strategy
- **Research date / last verified:** 2026-07-16
- **Focus keyword:** `content restriction strategy WooCommerce`
- **Long-tail intent:** `WooCommerce gated content best practices`, `restrict content by subscription plan strategy`, `membership access control architecture`
- **Search intent:** Informational. The reader needs to decide what to gate, at what scope, with what condition/priority/denied experience, and how to keep the policy testable.
- **Evidence scope:** A045 brief; SEO/GEO standard; current ArraySubs Members Access, Elementor/Gutenberg/shortcode, URL, CPT, shop, download, discount, role, and conflict source; official WooCommerce Memberships, Google Search, WordPress, and MemberPress documentation.
- **Test limitation:** No live rules were saved or tested against caching on mirror-help. The final article must capture real before/after behavior in isolated guest/member sessions and disclose exact rule/test data.

## 40–60-word direct answer

> A sound WooCommerce content restriction strategy classifies content before creating rules: public discovery, preview, member access, tier access, account recovery, and staff-only. For each protected item, define one authoritative condition, the narrowest target scope, rule priority, denied experience, schedule, and test cases. Never gate login, payment recovery, password reset, checkout, or support accidentally.

This is 54 words.

## Answer-first thesis

Content restriction is authorization policy, not visual hiding. A complete rule has six fields:

```text
Rule = target + qualifying condition + denied action + priority + schedule + owner/test evidence
```

The article should teach a “public first, protect deliberately” inventory and then map each content class to the narrowest reliable ArraySubs surface. It must not repeat the URL-prefix or inline-gating recipe steps.

## Key takeaways

- Protect the response/data source, not only the button, menu link, or CSS.
- Use whole-content rules for whole resources and partial gates only for genuinely mixed public/member pages.
- Broad URL rules need exclusions for login, account, payment recovery, checkout, webhooks, privacy, and support routes.
- First-match/priority behavior and per-post overrides can create conflicts; maintain a rule inventory.
- Access-denied UX is part of the rule: distinguish logged out, wrong tier, not yet available, expired, and payment problem.

## Verified primary-source claims

All sources accessed 2026-07-16.

| Verified claim | Primary source | Editorial use |
| --- | --- | --- |
| WooCommerce Memberships supports restriction from membership plans, content edit screens, Gutenberg blocks, and shortcodes. | [WooCommerce Memberships Restrict Content](https://woocommerce.com/document/woocommerce-memberships-restrict-content/) | Establish scope choices and partial-content precedent. |
| Woo Memberships rules can overlap; more specific content rules can differ from broader category rules. | [WooCommerce Memberships Restrict Content](https://woocommerce.com/document/woocommerce-memberships-restrict-content/) | Support explicit precedence/conflict governance. |
| Woo Memberships restriction modes include hiding, excerpts, and redirects with configurable messages. | [WooCommerce Memberships Settings](https://woocommerce.com/document/woocommerce-memberships-settings/) | Build denied-experience decision framework. |
| Woo Memberships can restrict viewing or purchasing products and can drip product access. | [WooCommerce Memberships Plans](https://woocommerce.com/document/woocommerce-memberships-plans/) | Distinguish catalog visibility from purchase authorization. |
| MemberPress warns against protecting the Account page because expired users may need it to update payment details. | [MemberPress Rules Overview](https://memberpress.com/docs/rules-overview/) | Support recovery-route exclusions. |
| Google paywall guidance applies to paywalled content intended for crawl/index and explains markup to distinguish it from cloaking. | [Google: Paywalled content markup](https://developers.google.com/search/docs/appearance/structured-data/paywalled-content) | Keep SEO/index policy tied to rendering/markup, without promising outcomes. |
| WordPress roles are capability collections. | [WordPress Roles and Capabilities](https://developer.wordpress.org/plugins/users/roles-and-capabilities/) | Explain why role-only gates can be overly coarse or stale. |

## Content classification inventory

| Class | Default stance | Examples | Notes |
| --- | --- | --- | --- |
| Public discovery | open/indexable | homepage, topic pages, full public articles | earns trust/search/discovery |
| Preview/teaser | partially open | article intro, sample lesson, product overview | must deliver real value, not deceptive truncation |
| Member baseline | gated | core library, community instructions | one clear membership condition |
| Tier/entitlement | gated by product/variation/feature | advanced course, team templates | avoid role-only shortcuts |
| Scheduled/dripped | gated until time | lesson sequence, release archive | show availability message/date where possible |
| Purchased/earned | purchase condition | one-time course/download | decide refund/expiry behavior |
| Account/recovery | always reachable to intended user | My Account, Pay Now, update payment, reset password | exclude from broad restrictions |
| Staff/private | capability/admin protection | editorial/admin resources | use WordPress capabilities/admin controls, not commercial membership rules alone |

## Current ArraySubs restriction surfaces

### Per-post and post-type rules

- Per-post metadata can enable a condition tree and custom message.
- CPT rules target an entire post type, taxonomy/terms, or selected posts.
- CPT denied actions: redirect, message, or 403; archive behavior: hide, show lock, or show normally/restrict content.
- CPT rules support schedule delay.
- Per-post conditions do not expose/use the same rule schedule fields in the inspected per-post path.

### URL rules

- exact, prefix, contains, or regex pattern;
- prefix-style exclusions;
- lower numeric priority runs first;
- first matching rule returns after allow/deny decision;
- denied actions: redirect URL, message, 403, or login;
- query strings are removed before matching;
- rules support schedule delay.

### Partial content

- Gutenberg Restricted Content block;
- Elementor container restrictions;
- `[arraysubs_restrict]` shortcode;
- PHP helpers/shortcode contract.

Current partial gates support conditions such as status, subscription product/variation, purchases, role, lifetime spend, and feature values. Page-builder/shortcode behavior should be tested to ensure denied content is not present in delivered HTML or embedded data for unauthorized users.

### Downloads

- qualifying files appear in WooCommerce My Account Downloads;
- signed nonce links and re-checks for login, rule conditions, schedule, file, and configured limits;
- current code can track limits by period and reset on renewal-related paths;
- protect the underlying file/storage path appropriately and test direct URL behavior; a UI link disappearing is not sufficient evidence.

### Shop access and discounts

- shop targets: all products, specific products, or categories with exclusions;
- first stored matching rule wins;
- actions: show but block purchase, 404/hide, login redirect, or page redirect;
- current code covers classic queries, add-to-cart/cart validation, Store API, REST product responses, related/upsell/cross-sell widgets, and common sitemaps for the 404 case;
- administrators and shop managers bypass current shop restrictions;
- discount rules target products/categories/tags and support percentage/fixed behavior plus schedule.

### Roles and entitlements

- conditions can use roles, but roles are best treated as compatibility/capability state.
- Pro Feature Manager product/variation values can drive granular access.
- feature names act as keys; governance is required before renaming/deleting them.

## Current precedence and conflict model

The current conflict UI documents this general specificity order:

1. per-post restriction;
2. specific URL rule;
3. URL pattern rule;
4. post-type rule;
5. taxonomy rule.

Operational behavior is implemented in separate surfaces, so do not describe it as one universal centralized resolver without testing. Important observations:

- per-post restriction is checked before CPT rules in `ContentGating`;
- URL rules sort by numeric priority and stop after the first match;
- shop rules use stored order and first target match;
- the conflict endpoint detects a published per-post rule overlapped by URL rules and labels the per-post rule the winner;
- broad archives may hide scheduled/denied content, with current collection limits that deserve large-site testing.

## Rule design decision tree

```text
Is the entire resource restricted?
├─ Yes → Is it a WordPress content object?
│  ├─ Yes → per-post/CPT/taxonomy rule
│  └─ No → URL rule or specialized product/download rule
└─ No → partial gate
   ├─ Gutenberg → Restricted Content block
   ├─ Elementor → container restriction
   ├─ mixed editor/builder → shortcode
   └─ custom template → PHP helper/shortcode contract
```

Then decide public listing behavior, denial action, login handling, priority, schedule, and recovery exclusions.

## Denied-experience matrix

| Visitor state | Message/action | Avoid |
| --- | --- | --- |
| Logged out | explain that login may restore access; preserve return URL | generic “forbidden” if login is the likely fix |
| Logged in, no plan | show what grants access and a truthful comparison/CTA | ambiguous “not authorized” |
| Wrong tier | name the required benefit/tier and switching path | forcing repurchase without explaining current plan |
| Drip not reached | show what is locked and when/why it opens | same message as non-member |
| Payment recovery/on hold | link to Pay Now/update method/account/support | redirecting away from recovery page |
| Expired/cancelled | explain rejoin/renew policy and retained assets | claiming they never purchased |
| Staff/admin | verify bypass is intentional and test non-admin sessions | using admin preview as customer QA |

## Governance checklist

For every live rule record:

- unique name and business owner;
- target scope and exclusions;
- condition tree in plain language;
- denial action/message/redirect;
- priority/stored order;
- schedule basis;
- affected plan/product/variation/feature keys;
- approved account/recovery exceptions;
- test users and expected results;
- cache/CDN exclusions;
- creation/change date, reason, reviewer, rollback;
- related content owner and retirement date.

## Test matrix

1. guest via direct URL and archive/listing;
2. non-member logged-in user;
3. correct active/trial member;
4. wrong tier/product/variation;
5. on-hold/grace/pending-cancel/expired user;
6. scheduled content before and after unlock;
7. administrator versus a real customer session;
8. cache warmed as guest then viewed as member, and reverse;
9. HTML/source/network response for hidden partial content;
10. REST/Store API/product blocks/add-to-cart for shop rules;
11. direct download URL and expired/changed nonce;
12. overlapping per-post/CPT/URL rules;
13. account/login/password reset/Pay Now/checkout/support routes;
14. mobile, incognito, and no-cookie/login transition;
15. sitemap and internal links for intentionally hidden 404 products.

## Product fit and limitations

ArraySubs fits WordPress/WooCommerce-based entitlement rules across many surfaces. It is not automatically sufficient for:

- DRM or prevention of authorized users copying/screenshooting content;
- secure video streaming, license key enforcement, or remote SaaS authorization without integration;
- native newsroom-style view-count meters;
- high-assurance document rights management;
- a CDN/cache setup that cannot vary/avoid caching protected responses safely;
- policy requiring a durable independent membership record.

## Unsupported claims and caveats

- Do not call CSS hiding or menu removal secure access control.
- Do not promise that a paywall improves SEO.
- Do not claim all protected content should be removed from search; choose by intent.
- Do not say URL rules universally override per-post rules.
- Do not say all ArraySubs rule surfaces share identical actions or schedules.
- Do not claim regex is safer/better; it is more expressive and easier to misconfigure.
- Do not claim a nonce alone is permanent download protection.
- Do not imply admins seeing content proves customer access works.
- Do not duplicate the recipe steps.

## FAQ questions

- What WooCommerce content should be restricted?
- Should I gate a whole page or only part of it?
- How do URL prefix and post-type rules differ?
- Which rule wins when WooCommerce access rules overlap?
- Should restricted content appear in search results?
- How do I keep My Account and payment recovery accessible?
- Can I hide products but still allow purchase links?
- How do I protect downloadable files?
- Do WordPress roles make good membership levels?
- How do I test content restrictions with caching?

## Internal-link plan

- **Commercial pillar:** `/deals/arraysubs/features/woocommerce-membership/`
- **Recipes:** combined conditions, URL prefix lockdown, inline content gating.
- **Siblings:** A044 levels, A046 paywall models, A047 dripping.
- **Supporting:** A049 SEO for gated content, A050 protected downloads, A052 URL rules, A053 partial restriction, A054 AND/OR rules, A190 caching failures.
- **CTA after rule inventory/test matrix:** `/deals/arraysubs/pricing/`

## Long-form SEO/GEO outline (target 2,700–3,400 words)

1. Direct answer and key takeaways.
2. What should remain public and what should be gated?
3. Six parts of a complete restriction rule.
4. Content, URL, section, download, product, and discount scopes.
5. Conditions: status, plan, purchase, role, and entitlement.
6. Precedence, overlap, and conflict governance.
7. Access-denied and recovery UX.
8. SEO/crawl/rendering considerations without outcome promises.
9. Rule inventory and fifteen-case test matrix.
10. Current ArraySubs implementation, core/Pro truth, limitations.
11. FAQ, conclusion, CTA, trust/update elements.

## Mirror screenshot opportunities with marker plan

1. **Post Types rule expanded** — `wp-admin/admin.php?page=arraysubs-mainadmin#/members-access/cpt-rules`
   - markers: Target Type, post/taxonomy selection, Archive Behavior, IF, Action when denied, SCHEDULE.
2. **URL rule expanded** — `#/members-access/url-rules`
   - markers: Pattern Type, URL Pattern, Priority, Exclusions, Action when denied.
3. **Content Gate guide** — `#/members-access/content-gate`
   - markers: Gutenberg, Elementor, Shortcode, Programmatic.
4. **Shop Access rule** — `#/members-access/ecommerce-rules`
   - markers: target products/categories, exclusions, 404 versus block purchase, schedule.
5. **Downloads rule** — `#/members-access/downloads-rules`
   - markers: files, limits, condition, schedule; hide file URLs if sensitive.
6. **Conflicts page** — `#/members-access/conflicts` with safe synthetic overlapping rules.
   - markers: overlapping target, winner, reason, remediation action.
7. **Frontend state triptych** — guest, wrong-tier member, allowed member on same test page.
   - markers: login CTA, upgrade requirement, protected content; keep screenshots aligned.

## Varied non-chart visual ideas

1. **Museum floor plan:** public lobby, preview gallery, member wing, tier vault, recovery desk.
2. **Security checkpoint scene:** visitor presents subscription/product/role/entitlement tokens; gate chooses an action.
3. **Russian-doll content scopes:** site → URL branch → post type → page → section → download, illustrated as physical rooms/boxes.
4. **Rule collision traffic scene:** broad URL road and specific post lane meet at a priority sign.
5. **Recovery-route lifeboat:** account, Pay Now, password reset, checkout, and support remain outside a locked content island.
6. **Direct-download scene:** guarded My Account doorway contrasted with an exposed raw file path.
7. **Real annotated rule builder screenshot:** markers on Target/IF/Then/Schedule, using actual ArraySubs UI instead of numeric charts.

## Refresh triggers

- Any change to Members Access surfaces, precedence, conflict detection, schedule, Store API/REST enforcement, downloads, or page-builder integrations.
- Cache/CDN or WordPress/WooCommerce changes affecting personalized rendering.
- Google paywall/indexing guidance changes.
- Mirror packaged UI differs from source.
- Quarterly screenshot and rule-behavior verification.

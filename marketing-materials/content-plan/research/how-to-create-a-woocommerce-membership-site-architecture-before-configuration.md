# Research brief: How to Create a WooCommerce Membership Site — Architecture Before Configuration

## Research record

- **Article:** A041 — How to Create a WooCommerce Membership Site: Architecture Before Configuration
- **Research date / last verified:** 2026-07-16
- **Focus keyword:** `how to create a WooCommerce membership site`
- **Long-tail intent:** `WooCommerce membership site planning guide`, `build a paid membership with WooCommerce`, `subscription membership architecture`
- **Search intent:** Informational. The reader needs a build sequence and an architecture they can defend before choosing plugins or clicking settings.
- **Evidence scope:** A041 brief; `plan/07-seo-geo-publishing-standard.md`; current ArraySubs 1.8.11 and ArraySubs Pro 1.1.2 source; current official WooCommerce Memberships, WooCommerce Subscriptions, WordPress, Google Search, and MemberPress documentation.
- **Test limitation:** No live membership, customer, product, or restriction was created on `mirror-help.arrayhash.com`. The screenshot plan below identifies current shipped screens from source and should be executed against the mirror site with non-sensitive test records before publication.

## 40–60-word direct answer

> To create a WooCommerce membership site, define the member promise first, then separate six jobs: payment collection, the subscription or purchase record, access conditions, protected-content scope, lifecycle policy, and the customer portal. Choose the plugin stack only after mapping how signup, payment failure, cancellation, expiration, and re-entry change access.

This is 53 words. Place it inside the first 150 words and name WordPress, WooCommerce, membership, subscription, entitlement, and ArraySubs immediately afterward.

## Answer-first editorial thesis

A membership site is not “a paywall plus recurring billing.” It is a policy system that converts a commercial event into an access decision and keeps that decision correct through the full customer lifecycle.

Use this original six-layer model:

1. **Promise:** what ongoing outcome or privilege does the member receive?
2. **Commerce:** what product, price, trial, term, tax, refund, and renewal rules collect money?
3. **Record:** which order, subscription, purchase, role, or entitlement is the source of truth?
4. **Access:** which conditions grant which content, product, download, section, or feature?
5. **Lifecycle:** what happens during trial, active, on-hold, pending cancellation, cancelled, expired, refunded, upgraded, and downgraded states?
6. **Experience and operations:** what members see, how support diagnoses access, and how the team tests and audits changes.

Configuration begins only after the policy table is complete. This differentiates A041 from narrow ArraySubs recipes, which own the click-by-click setup.

## Key takeaways for the article

- A subscription is a billing/lifecycle record; membership access is a separate decision even when one system evaluates both.
- Start with the member promise and lifecycle table, not with plugin settings or the number of tiers.
- Use the narrowest reliable access condition and scope; WordPress roles alone are too coarse for most commercial entitlement logic.
- Keep account, payment-recovery, login, privacy, and support routes reachable when premium content is denied.
- Launch with a role/status/content test matrix and a rule inventory; every access change needs an owner and rollback plan.

## Verified primary-source claims

All web sources accessed 2026-07-16.

| Verified claim | Primary authoritative source | Editorial use |
| --- | --- | --- |
| WooCommerce Memberships can grant access by registration, manual assignment, or product purchase; membership length can be unlimited, a set duration, or fixed dates. | [WooCommerce Memberships Plans](https://woocommerce.com/document/woocommerce-memberships-plans/) | Show that “membership” does not inherently mean recurring payment. |
| WooCommerce Memberships can restrict posts, pages, custom post types, and products, and can delay access. | [WooCommerce Memberships overview](https://woocommerce.com/document/woocommerce-memberships/) | Establish access scope and dripping as separate design choices. |
| WooCommerce Memberships plus Woo Subscriptions enables recurring memberships, trials, customer switching, and status-linked access behavior. | [WooCommerce Memberships Subscriptions Integration](https://woocommerce.com/document/woocommerce-memberships-subscriptions-integration/) | Support the billing/access separation and stack decision. |
| WooCommerce subscription statuses describe lifecycle state; active may grant special access, while on-hold, cancelled, and expired may remove it through integrations. | [WooCommerce Subscriptions Status Guide](https://woocommerce.com/document/subscriptions/statuses/) | Build the lifecycle matrix; do not copy Woo status behavior onto ArraySubs without labeling. |
| WordPress roles are collections of capabilities that control what users can see and do. | [WordPress Roles and Capabilities](https://developer.wordpress.org/plugins/users/roles-and-capabilities/) | Explain why roles are platform permissions, not a full commercial membership ledger. |
| WooCommerce recommends keeping renewal/account access workable; over-restricting account pages can block expired users from fixing payment details. | [WooCommerce Memberships FAQ](https://woocommerce.com/document/woocommerce-memberships-faq/) and [MemberPress Rules Overview](https://memberpress.com/docs/rules-overview/) | Support the recovery-route exclusion checklist. |
| Google documents paywalled-content markup for content intended to be crawled and indexed and says the markup helps distinguish paywalls from cloaking. | [Google: Subscription and paywalled content markup](https://developers.google.com/search/docs/appearance/structured-data/paywalled-content) | Keep protected-content SEO as an architecture decision, not an afterthought or ranking promise. |
| MemberPress defines dripping as staged release and supports rule-based drip/expiration triggers. | [MemberPress: Dripping and Expiring Protected Content](https://memberpress.com/docs/dripping-and-expiring-content/) | Provide a neutral example of a membership-first architecture; do not imply identical ArraySubs triggers. |

## Definitions to establish on first use

- **Member promise:** the continuing value or privilege that justifies joining and remaining.
- **Subscription:** a billing/lifecycle agreement that may renew, expire, pause, fail, or cancel.
- **Membership:** an access relationship granting content, products, community, discounts, downloads, or services.
- **Entitlement:** a machine-evaluable right such as “access Course Pro” or “five team seats.”
- **Access rule:** the conditions, target scope, denied action, priority, and schedule that determine access.
- **WordPress role:** a bundle of capabilities; useful for platform compatibility, but not automatically equivalent to a paid tier.
- **System of record:** the authoritative record used to decide billing or access. A stack can have separate billing and membership systems of record.
- **Drip:** delaying access to content until a defined event plus time has elapsed.

## Current ArraySubs core/Pro truth check

### Current core membership architecture

ArraySubs 1.8.11 does not create a separate “membership plan” or “user membership” custom post type. Its free core evaluates access dynamically from existing WordPress/WooCommerce/ArraySubs data. Current condition types include:

- subscription status;
- any active/trial subscription, optionally for selected products;
- active/trial subscription variation;
- purchased product or variation;
- purchased product category/tag;
- customer lifetime spend;
- WordPress role;
- nested AND/OR condition groups;
- product feature value when Pro Feature Manager data exists.

Current target/action surfaces include:

- per-post restrictions;
- all content in a post type, taxonomy content, or selected posts;
- exact, prefix, contains, or regular-expression URL paths with exclusions and priority;
- partial content via Gutenberg Restricted Content block, Elementor container controls, shortcode, or PHP helpers;
- protected downloads in WooCommerce My Account;
- shop/product targets with purchase blocking, 404 hiding, login redirect, or page redirect;
- member discounts;
- WordPress role mapping.

This integrated architecture is different from the official WooCommerce Memberships + Subscriptions stack, which maintains a separate user-membership record linked to a subscription. Explain both neutrally.

### Schedule behavior

Current ArraySubs rule scheduling is available on post-type, URL, download, shop-access, and discount rules. The UI offers days, weeks, or months after subscription start. The evaluator:

- defaults qualifying subscriptions to active and trial;
- uses the earliest qualifying subscription start date;
- treats a “month” as exactly 30 days in current source;
- grants access when `now >= start + delay`;
- does not expose a fixed-calendar-date trigger in the inspected rule UI;
- does not itself send an “unlocked” email.

Do not repeat the broader readme phrase “by date or member timing” as current rule-UI behavior without a live test. Pro Fixed Period Membership has calendar end dates, but that is a membership-term feature, not the same as fixed-date content dripping.

### Role and lifecycle behavior

- Active and trial are the default “active subscription” states for content conditions.
- Role mapping can add/remove roles when a subscription becomes active, keep or remove mapped roles on hold, and remove them on ended states when no other qualifying active subscription grants the same role.
- Access rules can explicitly target other subscription statuses, so access during on-hold is policy/configuration—not a universal automatic outcome.
- Per-post restrictions win over broader rule classes in the conflict UI; URL rules are processed by ascending numeric priority, and the first matching rule ends evaluation.
- Rule changes are live policy changes. Editing a shared rule can change access for existing members immediately.

### Pro responsibilities relevant to this article

- **Feature Manager:** product/variation feature rows that can be evaluated as sum, max, or any entitlement; the feature name is the current key.
- **Fixed Period Membership:** absolute end date or recurring annual cutoff, enrollment windows, expiry/renewal behavior, and product/cart/checkout disclosure.
- **Automatic gateways:** Stripe, PayPal, and Paddle recurring collection; free core uses manual renewal invoices.
- Pro is not required for basic content restriction, role mapping, URL gating, downloads, shop access, partial content, or timed rules in current core.

## Architecture worksheet for the article

| Decision | Required answer before configuration | Failure if omitted |
| --- | --- | --- |
| Member promise | What changes for the member every week/month/term? | A recurring charge with no recurring value |
| Commerce model | Free, one-time, lifetime, fixed-term, or recurring? | Access duration accidentally follows billing |
| Access source | Status, product, variation, purchase, role, or feature? | Ambiguous or conflicting eligibility |
| Scope | Entire post, taxonomy, URL branch, section, download, or product? | Content leaks or recovery pages are blocked |
| Lifecycle | Access for trial, on-hold, cancellation, grace, refund, expiration? | Surprise lockout or unpaid access |
| Upgrade/downgrade | Immediate or next renewal; which entitlements change? | Double access or entitlement gaps |
| Denied UX | Message, login, pricing redirect, 403, or 404? | Dead end without a recovery path |
| Operations | Who owns rules, QA, support, and rollback? | Untraceable access incidents |

## Recommended planning sequence

1. Write a one-sentence member promise and list the recurring proof of value.
2. Select one primary commerce model and state the access duration independently.
3. Draw billing and access systems of record; name every sync or status dependency.
4. Create the status-to-access table before defining content rules.
5. Build a content inventory: public, preview, member, tier-specific, recovery/account, staff-only.
6. Choose the narrowest condition and target for each inventory group.
7. Design denied, not-yet-available, expired, and payment-recovery experiences.
8. Define upgrade, downgrade, refund, cancellation, rejoin, and grandfathering behavior.
9. Configure one end-to-end “thin slice,” then test guest/allowed/denied/lifecycle states.
10. Expand rules only after the thin slice passes and has an owner.

## Worked example: premium resource library

Use an illustrative, non-benchmark example:

- Promise: two expert resources plus one member workshop each month.
- Commerce: monthly or annual subscription variations.
- Access source: active/trial subscription to either variation; Pro-only resource can additionally require `Research Library = Yes` feature.
- Scope: public article introductions, gated resource sections, protected `/library/` branch, downloadable templates.
- Trial: public previews and onboarding resources accessible; high-cost workshop archive withheld until active if that is the disclosed policy.
- On-hold/grace: keep account and Pay Now routes reachable; decide explicitly whether resource access remains.
- Cancellation: if cancel-at-period-end remains active, preserve access through the paid-through date; verify actual ArraySubs state handling in live tests.
- Rejoin: use the new qualifying start date policy deliberately because drip timing can use the earliest qualifying subscription start.

The example teaches architecture and links to recipes for configuration.

## Required launch test matrix

Test every protected scope with at least:

1. logged-out visitor;
2. logged-in customer with no subscription;
3. trialing qualifying customer;
4. active qualifying customer;
5. active customer on the wrong plan/variation;
6. on-hold customer;
7. pending-cancellation customer before paid-through date;
8. cancelled and expired customers;
9. upgraded and downgraded customer;
10. customer with two qualifying subscriptions;
11. administrator/shop manager bypass expectations;
12. cached page in a fresh guest and member session.

For each, verify page body, archive/listing, direct URL, REST/Store API if relevant, downloads, product purchase, account/recovery route, and the denied message.

## Product fit and limitations

### ArraySubs is a fit when

- WooCommerce products/subscriptions should directly drive access without a separate membership ledger;
- the site needs multiple gate surfaces and nested conditions in one plugin;
- manual renewal invoices are acceptable in free, or Pro gateways fit automatic billing;
- the team can test rules and lifecycle paths in the real cache/theme/page-builder stack.

### ArraySubs is not automatically the best fit when

- the business requires a first-class independent membership record with its own notes, manual status, and dates separate from subscriptions;
- a native view-count/metered paywall is required;
- a learning management system must enforce prerequisites, quizzes, grading, or certificates;
- community authorization lives in a remote SaaS that needs its own real-time entitlement sync;
- regulations or contracts require bespoke access continuity and notice controls beyond generic plugin behavior.

## Unsupported claims and caveats to avoid

- Do not say WooCommerce core alone provides subscriptions or memberships.
- Do not use membership and subscription as synonyms.
- Do not imply ArraySubs maintains the same membership record model as WooCommerce Memberships.
- Do not say roles are the source of truth for payment or a complete entitlement model.
- Do not promise SEO performance from excerpts, markup, or paywall type.
- Do not claim ArraySubs has native fixed-date drip triggers or an unlock email based on current source.
- Do not call Pro necessary for basic Members Access; distinguish automatic billing, Feature Manager, and Fixed Period Membership.
- Do not block My Account, Pay Now, password reset, login/logout, webhooks, checkout, or support without a tested exception plan.
- Do not repeat recipe configuration steps; link to the recipe.

## FAQ / People Also Ask questions

- Can WooCommerce create a membership site by itself?
- What is the difference between a WooCommerce subscription and membership?
- Do I need both recurring billing and content restriction?
- Can a membership be free, one-time, fixed-term, or lifetime?
- Should WordPress roles represent membership levels?
- What happens to access when a subscription payment fails?
- Should cancelled members keep access until the period ends?
- How do I protect only part of a WooCommerce page?
- Can member-only downloads be protected from direct access?
- How should I test a membership site before launch?
- Is ArraySubs free enough for a membership launch?
- When is ArraySubs not the best fit?

## Internal-link plan

- **Commercial pillar:** `/deals/arraysubs/features/#member-experience`
- **Implementation recipes:**
  - `/deals/arraysubs/use-cases/recipes/combined-conditions/`
  - `/deals/arraysubs/use-cases/recipes/url-prefix-lockdown/`
  - `/deals/arraysubs/use-cases/recipes/inline-content-gating/`
- **Sibling articles:** A042 membership vs subscription, A043 combined architecture, A044 membership level strategy.
- **Useful later cluster links:** A045 content restriction strategy, A047 dripping strategy, A049 SEO for gated content, A051 roles vs levels vs entitlements.
- **CTA after the architecture and launch checklist:** `/deals/arraysubs/pricing/`

Use anchors such as “separate billing from access,” “design combined subscription and membership architecture,” and “build tier policy before configuration.”

## Long-form SEO/GEO outline (target 3,800–4,500 words)

1. **How to Create a WooCommerce Membership Site: Architecture Before Configuration**
   - direct answer; 4–5 key takeaways.
2. **What are the six systems inside a membership site?**
   - six-layer architecture and definitions.
3. **What member promise and business model are you selling?**
   - free, one-time, fixed-term, recurring, lifetime; ongoing value test.
4. **How should billing, subscription, membership, roles, and entitlements relate?**
   - compare official Woo two-product stack and integrated ArraySubs model.
5. **Which content and commerce surfaces should be public or gated?**
   - content inventory and recovery-route exclusions.
6. **How should status changes affect access?**
   - extractable lifecycle policy table; grace and paid-through behavior.
7. **How should tiers, dripping, downloads, and the portal fit?**
   - strategy, not steps; links to sibling/recipes.
8. **What should a denied member see?**
   - message/login/upgrade/recovery pathways.
9. **How do you launch without access leaks or lockouts?**
   - thin-slice method and test matrix.
10. **What does current ArraySubs implement?**
    - versioned core/Pro truth and limitations.
11. **FAQ**
12. **Conclusion and CTA**
13. **Trust elements**
    - author/reviewer, dates, current test environment, disclosure, limitations, update log.

## Mirror screenshot opportunities with marker plan

Use real screenshots later from `https://mirror-help.arrayhash.com`. Capture at 1440px or wider, crop out browser chrome/secrets, and annotate only the teaching controls.

1. **Member Access navigation map** — `wp-admin/admin.php?page=arraysubs-mainadmin#/members-access`
   - markers: `Role Mapping`, `Content Gate`, `Shop Access`, `URL`, `Post Types`, `Downloads`, `Conflicts`.
   - use in architecture section as the map of access surfaces.
2. **Post Types rule, expanded** — `#/members-access/cpt-rules`
   - create/use a harmless test rule; markers: `TARGET`, `IF`, `THEN`, `SCHEDULE`, archive behavior, Save Rules.
   - strongest general screenshot for A041.
3. **Content Gate guide** — `#/members-access/content-gate`
   - markers: Elementor, Gutenberg, Shortcode, Programmatic; no rule data required.
4. **Role Mapping expanded rule** — `#/members-access`
   - markers: conditions, Add Roles, On Hold Behavior, Fallback Role.
5. **Member/denied frontend pair** — a mirror test page configured for the article.
   - markers: premium content for allowed session; denied message plus login/upgrade recovery action for guest session.
6. **Subscription detail lifecycle proof** — `#/subscriptions/{test-id}` after choosing a non-sensitive test record.
   - markers: status, product/variation, customer, dates, related order; blur email/order notes if needed.

Do not capture real customer names, email addresses, payment details, tokens, webhook secrets, or unrelated admin notices. Label screenshots “First-party ArraySubs observation, mirror-help, ArraySubs 1.8.11 / Pro 1.1.2, verified 2026-07-16.”

## Varied non-chart visual ideas

Avoid repeating dashboard cards, funnels, numbered circles, or line charts.

1. **Membership house cutaway:** foundation = promise; rooms = billing, record, access, lifecycle, portal, operations; editorial architectural illustration.
2. **Two-key scene:** a shop owner holds a payment key and an access key at two different doors; communicates separation without a diagram.
3. **Member journey storyboard:** four scenes—discover, join, use, recover/renew—with different environments and people.
4. **Content library landscape:** public lobby, preview shelf, member stacks, tier vault, account help desk; isometric conceptual scene.
5. **Entitlement keyring:** icons for course, download, discount, community, and support attached to a product/plan tag.
6. **Policy clipboard still life:** status table, red/green access stamps, calendar, and customer portal on a desk.
7. **Access-denied UX concept:** forked hallway showing dead-end lockout versus a well-signed login/pay/upgrade route.
8. **Real screenshot with hand-drawn marker overlay:** the expanded ArraySubs TARGET/IF/THEN/SCHEDULE rule replaces a synthetic chart.

## Refresh triggers

- Any ArraySubs/Pro release changing Members Access conditions, rule surfaces, precedence, schedules, roles, downloads, shop rules, or Feature Manager.
- A live mirror test reveals packaged behavior different from inspected source.
- WooCommerce changes Memberships/Subscriptions integration semantics or status behavior.
- Google changes paywalled-content/indexing guidance.
- WordPress/WooCommerce changes blocks, Store API, roles, or cache behavior relevant to gates.
- Quarterly screenshot and UI-route verification; otherwise after every relevant release.

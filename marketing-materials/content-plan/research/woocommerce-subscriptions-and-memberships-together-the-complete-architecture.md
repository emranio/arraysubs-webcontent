# Research brief: WooCommerce Subscriptions and Memberships Together — The Complete Architecture

## Research record

- **Article:** A043 — WooCommerce Subscriptions and Memberships Together: The Complete Architecture
- **Research date / last verified:** 2026-07-16
- **Focus keyword:** `WooCommerce subscriptions and memberships together`
- **Long-tail intent:** `recurring membership WooCommerce architecture`, `connect subscription billing to content access`, `subscription status controls membership access`
- **Search intent:** Informational/implementation architecture. The reader already expects recurring billing plus access and needs to understand records, ownership, status mapping, failure cases, and test coverage.
- **Evidence scope:** A043 brief; SEO/GEO standard; current ArraySubs 1.8.11 / Pro 1.1.2 code; official WooCommerce Memberships and Subscriptions documentation; WordPress roles documentation.
- **Test limitation:** No live status transition or rule mutation was performed on the mirror. Treat the ArraySubs findings as first-party source observations until the final article captures a versioned test with non-sensitive records.

## 40–60-word direct answer

> To run WooCommerce subscriptions and memberships together, choose separate systems of record for money and access, then define an explicit status-to-access contract between them. Every checkout, renewal, failure, grace period, pause, cancellation, expiration, refund, and plan switch must update or re-evaluate the member’s entitlements without blocking payment recovery or creating duplicate access.

This is 54 words.

## Answer-first thesis

The complete architecture is a state machine connected to an authorization decision:

```text
Product/plan → checkout order → subscription/billing state
                                  ↓ policy
Member identity → access conditions → content/product/download/feature entitlement
```

The official WooCommerce Memberships + Woo Subscriptions stack normally has two linked records: a subscription and a user membership. Current ArraySubs uses an integrated alternative: the subscription/purchase/product data remains the record, and Members Access evaluates entitlement directly rather than maintaining a second membership CPT. The article should compare those architectures neutrally.

## Key takeaways

- Billing state and access state are related but not identical; write the contract before configuring the integration.
- Decide which record owns cancellation, pause, fixed end dates, switching, manual grants, and history.
- Preserve account, login, Pay Now, update-payment, password reset, checkout, webhook, and support paths outside broad gates.
- Multiple subscriptions, missed webhooks, grace periods, and plan switches are mandatory test cases.
- A separate membership record improves independent administration; direct entitlement evaluation removes one synchronization layer. Neither is universally superior.

## Verified primary-source claims

All sources accessed 2026-07-16.

| Verified claim | Primary source | Editorial use |
| --- | --- | --- |
| WooCommerce Memberships can work alone for set-length access and integrates with Woo Subscriptions for recurring memberships. | [WooCommerce Memberships Subscriptions Integration](https://woocommerce.com/document/woocommerce-memberships-subscriptions-integration/) | Define official two-product architecture. |
| A subscription-tied membership can follow subscription status; unlimited, set-length, and fixed-date choices can behave differently after payments complete. | [WooCommerce Memberships Subscriptions Integration](https://woocommerce.com/document/woocommerce-memberships-subscriptions-integration/) | Prove status mapping is a configurable contract, not a universal rule. |
| Pending cancellation keeps special access until the prepaid term ends in the documented Woo subscription lifecycle. | [WooCommerce Subscriptions Status Guide](https://woocommerce.com/document/subscriptions/statuses/) | Support paid-through access discussion; label as official Woo behavior. |
| Woo Memberships lets customers manage tied lifecycle through the subscription; pausing/cancellation/switching can affect the membership. | [WooCommerce Memberships Subscriptions Integration](https://woocommerce.com/document/woocommerce-memberships-subscriptions-integration/) | Establish lifecycle ownership. |
| Woo Memberships plans can grant access from products, restrict content/products, drip access, and add discounts. | [WooCommerce Memberships Plans](https://woocommerce.com/document/woocommerce-memberships-plans/) | Define the membership side of the architecture. |
| Active, on-hold, pending-cancellation, cancelled, and expired subscriptions have different lifecycle semantics. | [WooCommerce Subscriptions Status Guide](https://woocommerce.com/document/subscriptions/statuses/) | Build an extractable mapping table. |
| WordPress roles are capability bundles rather than billing records. | [WordPress Roles and Capabilities](https://developer.wordpress.org/plugins/users/roles-and-capabilities/) | Put role mapping in the compatibility layer, not at the center of commerce state. |

## System-of-record map

| Responsibility | Candidate authoritative record | Questions to settle |
| --- | --- | --- |
| Customer identity | WordPress user/Woo customer | Can guests buy; how are duplicate accounts merged? |
| Product promise | Woo product/variation | Does a variation represent a tier or billing cadence? |
| Initial payment | Checkout order/gateway payment | What activates access and after which verified status? |
| Recurring obligation | Subscription | Who schedules/collects; manual or automatic; local or gateway-owned? |
| Renewal proof | Renewal order + gateway transaction | What happens after webhook delay or missed event? |
| Access eligibility | User-membership record or evaluated conditions | Is access stored or calculated dynamically? |
| Platform permissions | WordPress roles/capabilities | Which third-party plugins require roles? |
| Plan features | Product/variation entitlements | How are numeric/toggle entitlements compared and displayed? |
| Protected resources | Rule inventory | What scope, priority, denied action, and schedule apply? |
| History/audit | Notes, orders, subscription events, rule-change log | Can support reconstruct why access changed? |

## Official Woo stack versus current ArraySubs

| Architecture | Official WooCommerce Memberships + Subscriptions | Current ArraySubs |
| --- | --- | --- |
| Billing record | Woo subscription | ArraySubs subscription (`WP_Post`) |
| Access record | Separate user membership linked to plan/subscription | Conditions evaluated from subscription, purchase, role, feature data |
| Membership plan | First-class Memberships plan | Access rules plus Woo/ArraySubs products and optional feature data |
| State sync | Integration changes membership state from subscription events | Rule evaluation reads current data; role mapping is event-driven where used |
| Manual independent membership | Supported by membership record/plan model | Can model role/purchase/manual subscription cases, but no equivalent independent membership CPT |
| Sync risk | Two records can drift | Fewer records, but rule changes can immediately affect all matching users |
| Best fit | Independent membership administration and official integration semantics | Integrated Woo access surfaces without a separate membership ledger |

Do not turn this into a “winner” table. Tie verdicts to operational requirements.

## Current ArraySubs source truth

### Billing layer

- Core supports subscription products, trials, signup fees, manual renewal invoices, lifecycle statuses, portal actions, notes, emails, and renewal orders.
- Pro adds automatic Stripe, PayPal, and Paddle workflows. Stripe is locally processed; PayPal/Paddle have remote subscription ownership/sync characteristics.
- The access architecture must never assume every gateway update is synchronous with local state.

### Access layer

Members Access conditions include explicit subscription statuses, active/trial subscription product/variation, purchase history, category/tag purchase, lifetime spend, role, nested AND/OR, and Feature Manager values when present.

Targets include posts/CPT/taxonomies, URLs, partial content, downloads, products/shop, discounts, and mapped roles. Rule-level timing exists on CPT, URL, download, shop, and discount rules.

### Status semantics

- `has_active_subscription` and variation checks include `arraysubs-active` and `arraysubs-trial`.
- explicit status rules can target on-hold, cancelled, expired, or pending too.
- role mapping recognizes active/trial; on-hold behavior is configurable `keep` or `remove`; ended states remove mapped roles only if no other active subscription still grants them.
- therefore the article must say “your configured status-to-access policy,” not “ArraySubs always revokes on hold.”

### Precedence and conflicts

- per-post restriction has higher specificity than a URL pattern in the conflict detector;
- URL rules sort by lower numeric priority first and stop after the first matching rule;
- shop rules are processed in stored order and the first product-target match wins;
- broader rule changes can have immediate reach; duplicate/overlapping rules require governance.

### Schedule caveats

- delays are days, weeks, or exact 30-day “months” after the earliest qualifying subscription start;
- no fixed-date rule trigger is exposed in inspected UI;
- no drip-unlock notification job is visible;
- rejoin/multiple-subscription behavior must be tested because “earliest qualifying start” can unlock sooner than a naive “latest purchase” expectation.

## Status-to-access contract template

The article should present this as a fill-in policy, not fixed product behavior.

| Billing/lifecycle state | Default access decision to choose | Operational checks |
| --- | --- | --- |
| Pending checkout | Usually deny | prevent unpaid access; handle async gateway completion |
| Trial | Full, preview-only, or tier-specific | disclose trial access; test delayed rules |
| Active | Grant plan entitlements | verify product/variation and multiple subscriptions |
| Renewal failed but inside grace | Continue, reduce, or suspend | align dunning, on-hold, fulfillment, and notices |
| On hold | Keep or remove | avoid blocking Pay Now/update-payment/account |
| Pending cancellation | Often keep through paid-through date | verify actual status/flag and scheduled end |
| Cancelled | Remove or preserve purchased/lifetime entitlements | define refund and rejoin behavior |
| Expired/fixed end | Remove term access; maybe keep earned assets | distinguish recurring access from permanent downloads/certificates |
| Refunded/chargeback | revoke, review, or retain per policy | avoid automatic irreversible action without fraud/refund policy |
| Upgrade/downgrade | switch now or at renewal | prevent overlap/gap; decide proration separately |

## State transition verification chain

Every transition should reconcile:

```text
gateway truth
→ order state
→ subscription state/dates
→ access condition or user-membership state
→ WordPress role if used
→ content/product/download/feature visibility
→ customer portal/message
→ future scheduled jobs
→ audit note
```

If any link fails, the customer can be charged without access or retain access without intended payment.

## Required edge cases

1. initial checkout succeeds but redirect is interrupted;
2. gateway succeeds but webhook/local order update is delayed;
3. trial starts and ends;
4. renewal fails inside grace and then recovers;
5. on-hold keep/remove policy;
6. cancel-at-period-end before end date;
7. immediate admin cancellation;
8. fixed end date before/after billing end;
9. pause then resume;
10. upgrade/downgrade with old and new variation;
11. customer owns two subscriptions granting the same role/resource;
12. refund and chargeback;
13. manual grant/revocation;
14. deleted/renamed product or feature key;
15. cached member page served to a guest or vice versa;
16. account/payment recovery routes under a broad URL rule.

## Product fit and limitations

### Current ArraySubs is a fit when

- direct evaluation from Woo/ArraySubs records is sufficient;
- membership resources live in WordPress/WooCommerce;
- rule-based content, URL, shop, discount, download, and role access can share conditions;
- a separate user-membership ledger is not required.

### Consider a separate membership/LMS/identity layer when

- staff need independent manual membership records, cohorts, credentials, or association history;
- a remote community/LMS is authoritative;
- prerequisites, progress, certificates, seat assignment, or organization memberships are core;
- there is a complex metered paywall or identity federation requirement.

## Unsupported claims and caveats

- Do not say the official Woo two-plugin architecture is the only valid approach.
- Do not imply ArraySubs mirrors official Woo membership statuses.
- Do not claim on-hold, cancellation, or expiry universally grants/revokes access.
- Do not say a WordPress role proves current payment.
- Do not claim every gateway is locally billed or updated synchronously.
- Do not claim rule schedules use calendar months.
- Do not imply a separate membership record can never drift or that dynamic evaluation cannot fail.
- Do not market upcoming/undocumented features as shipped.

## FAQ questions

- How do WooCommerce subscriptions and memberships work together?
- Which plugin should own access status?
- Should membership access follow subscription status exactly?
- What happens to access during a failed-payment grace period?
- Does pending cancellation keep membership access?
- How do upgrades and downgrades change membership tiers?
- What if a customer has two subscriptions?
- Should WordPress roles be assigned automatically?
- Does ArraySubs maintain a separate membership record?
- How do I test billing-to-access synchronization?

## Internal-link plan

- **Commercial pillar:** `/deals/arraysubs/features/#member-experience`
- **Recipes:** combined conditions, URL prefix lockdown, inline content gating.
- **Siblings:** A042 definitions, A044 levels, A045 content restriction.
- **Supporting:** A035 grace periods, A051 roles vs levels vs entitlements, A118 lifecycle statuses, A124 plan switching.
- **CTA:** `/deals/arraysubs/pricing/` after architecture, status table, and test matrix.

## Long-form SEO/GEO outline (target 2,800–3,400 words)

1. Direct answer and key takeaways.
2. System-of-record map: identity, payment, subscription, membership, role, entitlement.
3. Official Woo two-record architecture versus integrated ArraySubs architecture.
4. Status-to-access contract with extractable table.
5. Product, plan, variation, role, and entitlement relationships.
6. Failure, grace, pause, pending cancellation, cancellation, and expiration.
7. Plan switching, multiple subscriptions, and fixed periods.
8. Reconciliation chain and operational ownership.
9. Sixteen-case test matrix.
10. Current ArraySubs core/Pro behavior and limitations.
11. FAQ, conclusion, CTA, trust/update elements.

## Mirror screenshot opportunities with marker plan

1. **Billing-to-access diptych:** subscription detail `#/subscriptions/{test-id}` plus `#/members-access/cpt-rules`.
   - subscription markers: state, product/variation, dates, related order.
   - access-rule markers: target, status/product condition, action, schedule.
2. **Expanded Role Mapping rule** — `#/members-access`
   - markers: IF, Add Roles, On Hold Behavior, Fallback Role.
3. **Conflicts page** — `#/members-access/conflicts`
   - markers: overlapping URL/post target, winning rule, reason, disable action; only if a safe test conflict is created.
4. **Customer portal lifecycle** — mirror My Account subscription detail.
   - markers: current status, next date, Pay Now/cancel/pause/switch actions that are actually available.
5. **Allowed/denied state pair** — same protected page in member and guest sessions.
   - markers: entitlement evidence and recovery action.

## Varied non-chart visual ideas

1. **Two-ledger bridge:** billing ledger on one bank, membership/access ledger on the other, state-policy bridge between them.
2. **Control-room scene:** operator watches gateway, order, subscription, access, and portal lights; one red mismatch light illustrates drift.
3. **Membership passport:** stamps for trial, active, grace, pending cancellation, expired, with access door reactions.
4. **Multiple-key problem:** one member holds two plan keys; role remains while one subscription ends.
5. **Gateway messenger scene:** remote payment signal traveling through order and subscription to a library door.
6. **Real UI annotated pair:** actual subscription detail beside actual rule builder, with minimal markers and no synthetic dashboard.

## Refresh triggers

- Any change to ArraySubs statuses, cancellation/paid-through behavior, plan switching, role mapping, rule evaluation, or gateway reconciliation.
- Any Woo Memberships/Subscriptions integration update.
- Addition of a separate membership record or external entitlement service.
- Live test results that differ from source assumptions.
- Quarterly source/screenshot review.

# Research brief: WooCommerce Membership vs Subscription — What Is the Difference?

## Research record

- **Article:** A042 — WooCommerce Membership vs Subscription: What Is the Difference?
- **Research date / last verified:** 2026-07-16
- **Focus keyword:** `WooCommerce membership vs subscription`
- **Long-tail intent:** `subscription vs membership difference WooCommerce`, `do I need WooCommerce subscriptions and memberships`, `recurring billing vs content access`
- **Search intent:** Informational comparison. The reader wants a crisp definition, examples, and a decision about whether the business needs billing, access, or both.
- **Evidence scope:** A042 brief; SEO/GEO standard; current ArraySubs 1.8.11 / Pro 1.1.2 source; official WooCommerce Memberships, WooCommerce Subscriptions, and WordPress documentation.
- **Test limitation:** Source observations were not validated by creating live membership records or transactions on the mirror. Final screenshots should use isolated test accounts and disclose the product/version/date.

## 40–60-word direct answer

> In WooCommerce, a subscription is a billing and lifecycle agreement; a membership is an access entitlement. A subscription can sell recurring products without protected content, and a membership can be free, one-time, fixed-term, or lifetime. Use both when recurring payment status should control content, products, discounts, downloads, community, or services.

This is 51 words.

## Answer-first editorial thesis

The cleanest comparison is not “Plugin A versus Plugin B.” It is **time-based payment versus permission**:

```text
Subscription answers: What is charged, when, and what is the billing state?
Membership answers: Who may access what, when, and under which conditions?
```

They overlap only when a billing state is used as an access condition. The article should explicitly cover four valid architectures:

1. subscription only;
2. membership only;
3. separate subscription + membership records with synchronization;
4. integrated access evaluation directly from subscription/product/role/feature data, as current ArraySubs does.

## Key takeaways

- Recurring payment does not automatically create a membership, and membership does not require recurring billing.
- Use a subscription-only model for replenishment, service billing, or software invoices when no protected experience is required.
- Use a membership-only model for free registration, manual cohorts, one-time/lifetime access, or non-recurring member groups.
- Use both when payment state must grant/revoke access, but define lifecycle mapping before launch.
- Compare system-of-record behavior, not just feature checklists: the official Woo stack and ArraySubs represent access differently.

## Verified primary-source claims

All web sources accessed 2026-07-16.

| Claim | Primary source | Editorial use |
| --- | --- | --- |
| WooCommerce Memberships grants access through registration, manual assignment, or purchase, and membership can be unlimited, fixed length, or fixed dates. | [WooCommerce Memberships Plans](https://woocommerce.com/document/woocommerce-memberships-plans/) | Prove membership does not require recurrence. |
| WooCommerce Memberships becomes recurring when used with Woo Subscriptions. | [WooCommerce Memberships overview](https://woocommerce.com/document/woocommerce-memberships/) | Establish that official Woo uses separate extensions for the combined model. |
| Tying a membership to a subscription can make membership status/expiration follow subscription state; other length choices can decouple access after payments finish. | [WooCommerce Memberships Subscriptions Integration](https://woocommerce.com/document/woocommerce-memberships-subscriptions-integration/) | Show there is no single universal “subscription controls access” rule. |
| Active, on-hold, pending-cancellation, cancelled, and expired subscription states have distinct lifecycle meanings. | [WooCommerce Subscriptions Status Guide](https://woocommerce.com/document/subscriptions/statuses/) | Build a status/access comparison and avoid binary paid/unpaid language. |
| Membership plans define content rules and member discounts and apply them to active members. | [WooCommerce Memberships Plans](https://woocommerce.com/document/woocommerce-memberships-plans/) | Explain membership as more than a login or role. |
| WordPress roles are bundles of capabilities. | [WordPress Roles and Capabilities](https://developer.wordpress.org/plugins/users/roles-and-capabilities/) | Clarify why a role is neither a subscription nor a membership ledger. |
| WooCommerce Memberships can restrict content, products, custom post types, and use content dripping. | [WooCommerce Memberships documentation](https://woocommerce.com/document/woocommerce-memberships/) | Supply concrete membership examples. |

## Definitions and comparison table

| Dimension | Subscription | Membership |
| --- | --- | --- |
| Primary job | Billing schedule and lifecycle | Access and privileges |
| Typical source record | Subscription plus orders/renewals | User-membership record or evaluated entitlement |
| Requires recurring charge | Usually, but fixed/lifetime constructs may exist by product | No |
| Can exist without gated content | Yes | Usually access/perks are the purpose |
| Typical states | Trial, active, on hold, cancelled, expired | Active, delayed, paused, expired, revoked, tier/entitlement state |
| Typical targets | Product/service delivery and renewal | Content, community, products, discounts, downloads, features |
| Key risk | Incorrect charges or renewal state | Access leak or wrongful lockout |
| Success test | Correct charge/order/schedule | Correct person sees the correct resource at the correct time |

State that implementations vary. This table describes concepts, not identical database schemas across plugins.

## Current ArraySubs truth check

### Subscription record

ArraySubs core stores subscriptions as WordPress posts with customer, product/variation, status, billing period, dates, related orders, and lifecycle metadata. Core creates manual renewal invoices; Pro adds supported automatic Stripe, PayPal, and Paddle collection.

### Membership/access model

Current ArraySubs does **not** create a separate membership-plan or user-membership record. Members Access evaluates conditions against the current user and current data. Access can depend on subscription status/product/variation, purchase history, product groups, lifetime spend, WordPress role, nested conditions, and Pro feature data.

This matters operationally:

- there is no second membership record to synchronize for the common integrated path;
- changing an access rule changes the decision for everyone it covers;
- access history is not automatically the same thing as a durable independent membership ledger;
- roles can be mapped from subscription changes, but direct access conditions can avoid making the role the only source of truth.

### Current active access semantics

- `has_active_subscription` and `has_subscription_variation` inspect active and trial subscriptions.
- explicit `subscription_status` conditions can include active, trial, on-hold, cancelled, expired, or pending.
- therefore the site owner can configure unusual access policies; “on hold always loses access” is not a universal ArraySubs statement.
- Role Mapping treats active/trial as active, has configurable keep/remove behavior for on hold, and removes mapped roles at ended states when another active subscription does not still justify them.

### Pro-specific overlap

- Feature Manager stores product/variation entitlements that Members Access can evaluate.
- Fixed Period Membership can define absolute or annual membership end dates and enrollment windows.
- automatic payment gateways change billing automation, not the conceptual distinction between billing and access.

## Architecture examples

### Subscription without membership

- coffee delivery every month;
- website care invoice every month;
- replenishment consumables;
- a software plan where authorization is enforced entirely in an external SaaS.

The customer has a recurring billing relationship, but WooCommerce content may remain public.

### Membership without subscription

- free registered resource library;
- alumni access granted manually;
- one-time lifetime community purchase;
- six-month cohort paid once;
- staff/partner access based on role.

### Both together

- paid newsletter archive while subscription is active;
- course library plus monthly coaching;
- member-only catalog and discount;
- SaaS plan where WooCommerce billing grants feature entitlements;
- recurring community with tier-specific rooms/downloads.

## Decision tree

```text
Do you need repeating charges?
├─ No → Do you need protected access/perks?
│  ├─ No → ordinary WooCommerce/account model
│  └─ Yes → membership/access model only
└─ Yes → Do you need protected access/perks?
   ├─ No → subscription model only
   └─ Yes → combined model
      ├─ Need an independent membership ledger? → separate billing + membership records
      └─ Direct Woo/product/status evaluation fits? → integrated entitlement model
```

Add follow-up checks for fixed access after payments finish, free trial access, grace/on-hold, paid-through cancellation, multiple subscriptions, switching, refund, and manual grants.

## Status-to-access policy questions

For a combined model, answer every row explicitly:

| Event/state | Billing question | Access question |
| --- | --- | --- |
| Trial | Is payment due later? | Which previews/full resources are available? |
| Active | When is next charge? | Which tier entitlements are granted? |
| Renewal failed/on hold | Is recovery running? | Does grace continue access? |
| Cancel at period end | Will another charge occur? | Does access continue to paid-through date? |
| Immediate cancel | Is refund involved? | Does access end immediately? |
| Expired/fixed end | Is billing complete? | Is access removed or decoupled? |
| Upgrade/downgrade | When/what is charged or credited? | When do old/new entitlements switch? |
| Refund/chargeback | What financial record changes? | Is access revoked, reviewed, or retained? |

Do not use the official Woo integration’s answer as the presumed ArraySubs answer; each needs a versioned test.

## Product fit and limitations

### Integrated ArraySubs model is a fit when

- subscription/product/purchase data is an acceptable access source;
- the business values one rule engine across WordPress content, URLs, products, downloads, discounts, and roles;
- an independent membership CPT is unnecessary;
- the site can test lifecycle states and caches.

### A separate membership system may fit better when

- staff must manually manage a durable membership record independent of billing;
- membership start/end dates, notes, cohorts, or certifications must persist after product/subscription changes;
- access is granted by external association/CRM records;
- advanced LMS/community records are the authoritative source;
- view-count metering or newsroom subscription tooling is required.

## Unsupported claims and caveats

- Do not say “subscriptions are memberships.”
- Do not say every membership needs Woo Subscriptions.
- Do not imply official WooCommerce Memberships is the only way to add access control.
- Do not claim ArraySubs creates a separate user-membership record.
- Do not claim active subscription status is the only ArraySubs access condition.
- Do not state that on-hold/cancelled always grants or revokes access; it depends on the chosen condition and lifecycle design.
- Do not confuse WordPress role with entitlement, tier, or payment status.
- Do not claim lifetime access is universally irrevocable; refunds, fraud, terms, account closure, and policy still need rules.
- Do not reproduce recipe steps.

## FAQ / People Also Ask questions

- Is a WooCommerce membership the same as a subscription?
- Can I create a membership without recurring payments?
- Can I sell subscriptions without restricting content?
- Do I need WooCommerce Memberships and Woo Subscriptions together?
- Can one subscription grant several membership benefits?
- What happens to membership access when a payment fails?
- Can a cancelled subscription keep access until the renewal date?
- Is a WordPress role a membership level?
- Does ArraySubs create a separate membership record?
- Which architecture is simpler to operate?

## Internal-link plan

- **Commercial pillar:** `/deals/arraysubs/features/#member-experience`
- **Recipes:** combined conditions, URL prefix lockdown, inline content gating.
- **Siblings:** A041 architecture pillar, A043 combined architecture, A044 membership level strategy.
- **Supporting concepts:** A045 content restriction, A047 content dripping, A051 roles vs membership levels vs entitlements.
- **CTA after decision tree:** `/deals/arraysubs/pricing/`

## Long-form SEO/GEO outline (target 3,200–4,000 words)

1. **WooCommerce Membership vs Subscription: What Is the Difference?**
   - direct answer and key takeaways.
2. **What is a WooCommerce subscription?**
   - billing, orders, status, renewal, examples.
3. **What is a WooCommerce membership?**
   - access, privileges, duration, examples.
4. **How do subscriptions and memberships overlap?**
   - four architecture patterns.
5. **Comparison table: billing, records, states, risks, and best fit**
6. **Do you need one or both?**
   - decision tree and worked use cases.
7. **How should subscription status affect membership access?**
   - policy matrix and edge cases.
8. **How does current ArraySubs model the difference?**
   - versioned integrated architecture, core/Pro split, no separate membership record.
9. **When should you use a separate membership system?**
10. **FAQ**
11. **Conclusion and CTA**

## Mirror screenshot opportunities with marker plan

1. **Subscription detail as billing record** — `wp-admin/admin.php?page=arraysubs-mainadmin#/subscriptions/{test-id}`
   - markers: Status, billing period/price, next payment, related orders, product/variation.
   - caption: “Billing/lifecycle record—not the access rule itself.”
2. **Members Access rule as access decision** — `#/members-access/cpt-rules`
   - markers: target content, active subscription condition, denied action, schedule.
   - pair with screenshot 1 for the strongest visual comparison.
3. **Role Mapping** — `#/members-access`
   - markers: IF condition, Add Roles, On Hold Behavior, Fallback Role.
   - caption should say roles are a downstream compatibility mechanism.
4. **Content Gate guide** — `#/members-access/content-gate`
   - markers: Gutenberg/Elementor/Shortcode/Programmatic.
5. **Frontend allowed/denied pair** — test member and guest on the same mirror page.
   - markers: protected benefit versus recovery/upgrade message.

## Varied non-chart visual ideas

1. **Split-screen concept:** a renewal invoice/calendar on the left, a key opening a library/community on the right.
2. **Two-record desk scene:** subscription dossier and membership pass connected by a policy ribbon.
3. **Four architecture diorama:** four small storefront rooms for subscription-only, membership-only, separate stack, integrated stack.
4. **Access badge collection:** free, fixed-term, recurring, and lifetime badges around one member profile.
5. **Failure scene:** payment clock pauses while a separate access door shows grace/locked policy choices.
6. **Real UI diptych:** subscription detail screenshot beside expanded Members Access rule with colored marker arrows.
7. **Role vs entitlement concept:** a staff lanyard (role) next to tier-specific keys (entitlements).

## Refresh triggers

- Changes to ArraySubs subscription statuses, Members Access conditions, role mapping, or addition of a first-class membership record.
- Changes to WooCommerce Memberships/Subscriptions integration semantics.
- ArraySubs Pro Feature Manager or Fixed Period Membership changes.
- Any updated live test showing different trial/on-hold/cancel behavior.
- Quarterly screenshot and primary-source review.

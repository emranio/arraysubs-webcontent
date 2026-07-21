# Research brief: Membership Level Strategy — Free, Paid, Lifetime, and Tiered Access

## Research record

- **Article:** A044 — Membership Level Strategy: Free, Paid, Lifetime, and Tiered Access
- **Research date / last verified:** 2026-07-16
- **Focus keyword:** `membership level strategy`
- **Long-tail intent:** `how many membership tiers should I offer`, `free vs paid membership levels`, `lifetime membership vs recurring membership`
- **Search intent:** Informational/consideration. The reader needs an offer architecture, not product-configuration instructions or an invented “best number” of tiers.
- **Evidence scope:** A044 brief; SEO/GEO standard; ArraySubs 1.8.11 / Pro 1.1.2 product, access, Feature Manager, Fixed Period Membership, and plan-switching source; official WooCommerce Memberships/Subs and WordPress documentation.
- **Research limitation:** No pricing conversion, churn, tier mix, or willingness-to-pay dataset was supplied. Do not manufacture benchmarks. Worked numbers must be clearly illustrative arithmetic.

## 40–60-word direct answer

> A strong membership level strategy gives each tier a distinct member outcome, not merely more features. Start with one clear paid level, add free access only when it creates a deliberate acquisition path, add tiers when segments need meaningfully different value or service cost, and offer lifetime access only when future obligations remain economically supportable.

This is 55 words.

## Answer-first thesis

Tier design is a promise-and-cost architecture:

```text
Tier value = member outcome + access + service level + identity/status
Tier sustainability = expected revenue − variable delivery/support cost − ongoing content/community obligation
```

The article should reject folklore such as “always offer three tiers.” A tier is justified only if it changes at least one of these in a way the target segment understands:

- outcome or use case;
- access scope;
- quantity/usage entitlement;
- speed or service level;
- human support/coaching;
- term/commitment;
- organization size or seats;
- commercial rights.

## Key takeaways

- Begin with segments and promises; tiers are packaging, not database labels.
- Free, recurring, fixed-term, and lifetime describe different economics and lifecycle obligations.
- The simplest viable structure is usually the best starting hypothesis, but no universal tier count should be claimed.
- Upgrades, downgrades, grandfathering, refunds, and overlapping subscriptions must be designed before launch.
- Preserve old plan identifiers/rules when grandfathering; editing one shared live rule can silently change legacy access.

## Verified primary-source claims

All sources accessed 2026-07-16.

| Verified claim | Primary source | Editorial use |
| --- | --- | --- |
| WooCommerce Memberships can grant free access on registration, access on product purchase, or manual access. | [WooCommerce Memberships Plans](https://woocommerce.com/document/woocommerce-memberships-plans/) | Establish valid free and manually granted levels. |
| Membership length can be unlimited, a set number of days/weeks/months/years, or fixed dates. | [WooCommerce Memberships Plans](https://woocommerce.com/document/woocommerce-memberships-plans/) | Compare lifetime/unlimited, fixed-term, and recurring access. |
| Recurring memberships and switching/proration become available through Woo Subscriptions integration. | [WooCommerce Memberships Subscriptions Integration](https://woocommerce.com/document/woocommerce-memberships-subscriptions-integration/) | Separate offer design from payment/access implementation. |
| Multiple products can grant access to one Woo membership, and one selected qualifying product is sufficient in that plan model. | [WooCommerce Memberships Plans](https://woocommerce.com/document/woocommerce-memberships-plans/) | Show cadence options can map to one benefit set; do not generalize to every plugin. |
| WordPress roles are capability bundles and can be custom. | [WordPress Roles and Capabilities](https://developer.wordpress.org/plugins/users/roles-and-capabilities/) | Explain that tier ≠ role; role mapping is an implementation tool. |
| Woo Memberships member discounts can target products/categories. | [WooCommerce Memberships Plans](https://woocommerce.com/document/woocommerce-memberships-plans/) | Include discount perks, while warning against margin-blind packaging. |

## Membership model definitions

- **Free membership:** no required payment; may be registration-, invitation-, role-, or manual-grant based.
- **Paid one-time/fixed-term membership:** one payment grants access for a defined period.
- **Recurring membership:** access/value continues while a repeating billing relationship satisfies the access policy.
- **Lifetime/unlimited membership:** no planned time-based expiry; it does not mean the business can ignore fraud, refunds, account closure, terms, or future service cost.
- **Tier:** a package aimed at a distinct need/segment, often combining access, limits, service, and identity.
- **Grandfathering:** preserving prior price, benefits, or rules for an existing cohort after an offer changes.
- **Entitlement:** the machine-readable benefit value a tier grants.

## Model comparison

| Model | Best-fit hypothesis | Main advantage | Main risk | Required policy |
| --- | --- | --- | --- | --- |
| Free | acquisition, community seeding, product education | lowers entry friction | support/content cost without revenue | conversion path, limits, inactive-user policy |
| Paid fixed-term | cohorts, seasons, certifications, annual access paid upfront | clear end and obligation | renewal cliff/late joiners | end date, renewal/rejoin, earned assets |
| Recurring | continuing content/service/community | aligns revenue with ongoing value | churn and failed payment | grace, cancellation, ongoing cadence |
| Lifetime | bounded digital asset or strategic launch offer | upfront cash and simple billing | indefinite future obligation and cohort complexity | scope, support horizon, exclusions, migration |
| Tiered | materially different segments/cost-to-serve | better fit and expansion path | choice overload, entitlement drift | comparison, switching, downgrade, grandfathering |

## Tier justification test

A proposed tier should pass all five:

1. **Segment:** a named audience has a distinct job/constraint.
2. **Promise:** the tier outcome can be stated without “more.”
3. **Entitlement:** access/limit/service differences are enforceable.
4. **Economics:** price and term can support delivery/support cost.
5. **Journey:** upgrade, downgrade, cancellation, and legacy treatment are defined.

If two levels differ only by cosmetic wording or a weak bonus, merge them.

## Current ArraySubs truth check

### Ways to model levels

- Simple subscription products can represent distinct levels.
- Variable subscription variations can represent tiers or monthly/annual cadences within one product.
- Members Access can gate by active subscription product, active subscription variation, purchase, role, or nested rules.
- Core supports lifetime billing period products according to current helpers/readme, with one payment and no recurring renewal invoices.
- Pro Feature Manager can attach toggle, numeric, or text features to products/variations; Members Access can compare numeric values and aggregate sum/max/any.
- Pro Fixed Period Membership can set an absolute end date or recurring annual cutoff plus an enrollment window and renewal behavior.

### Critical implementation distinctions

- A product/variation is not automatically a durable tier contract; access rules determine what it unlocks.
- A WordPress role is not a full tier. Use it for compatibility/capabilities, not as the only commercial history.
- Product Feature names act as keys in current access evaluation. Renaming a feature can break a gate unless rules are updated.
- Feature values from purchased products plus active subscription products can aggregate; multiple holdings can therefore increase a numeric `sum` entitlement. Test whether that is desired.
- Rule edits apply to existing users immediately. Preserve a legacy product/variation or separate legacy rule when grandfathering benefits.

### Current fixed/lifetime caveats

- Lifetime billing and Pro Fixed Period Membership are different constructs.
- Fixed Period Membership uses site-local calendar dates converted to UTC; absolute periods end at 23:59:59 site local.
- Recurring annual cutoffs choose the next future cutoff and can renew into the next annual period.
- Enrollment windows affect purchasability.
- The final article must verify the packaged UI and a test subscription before describing customer-facing behavior.

## Good-better-best design without mythology

“Good/better/best” can be a useful presentation only when the tiers correspond to real jobs:

- **Core/individual:** self-service resources for one person.
- **Professional:** deeper library, workflow tools, or higher limits.
- **Team/concierge:** seats, shared assets, priority support, or human service.

Do not recommend three by default. A single paid plan may be clearer; two plans may separate self-service from assisted; four or more may be justified for roles/organization sizes only when navigation remains understandable.

## Free-to-paid architecture questions

- What meaningful result does free deliver without substituting for paid?
- Is free a permanent level, a trial, a preview, or an email/account gate?
- Which content stays indexable/public versus account-only?
- What event signals upgrade intent?
- What data/support burden does free create?
- Can a free user recover login and compare plans without hitting a paywall loop?

Do not call a free trial a free membership; the term, payment expectation, and lifecycle differ.

## Lifetime decision framework

Consider lifetime only if the obligation is bounded or funded:

```text
Illustrative lifetime coverage horizon
= net lifetime price ÷ expected annual variable delivery/support cost
```

Example only: if net proceeds are `$600` and ongoing variable cost is `$60/year`, the simple coverage horizon is 10 years before overhead, inflation, taxes, platform cost, or opportunity cost. This is not a recommendation or benchmark.

Questions:

- Does “lifetime” mean the customer’s life, product life, company life, or an access license under terms?
- Are future live events/support included?
- Can the promise survive migrations and technology changes?
- Will lifetime users receive every future premium tier?
- How are refunds, abuse, transfers, and account closure handled?

Obtain legal/accounting review for offer wording and deferred obligations.

## Upgrade, downgrade, and grandfathering policy

Define:

- switch timing: immediate or next renewal;
- money: charge, credit, defer, or no proration;
- access: when new entitlements start and old ones stop;
- usage: what happens above the lower plan limit;
- content: whether previously downloaded/earned assets remain;
- drip: whether start date resets or earliest qualifying date continues;
- legacy: price only, benefits only, or both are grandfathered;
- multiple plans: replace, stack, or prohibit overlaps.

For ArraySubs, link to plan-switching material rather than duplicating setup.

## Measurement without invented benchmarks

Track by closed cohorts and plan version:

```text
Free-to-paid conversion = free members who start paid ÷ eligible free cohort
Tier mix = active customers in tier ÷ all active paid customers
Upgrade rate = customers upgrading in period ÷ customers eligible to upgrade
Downgrade rate = customers downgrading in period ÷ customers eligible to downgrade
Gross contribution by tier = collected revenue − refunds − variable delivery/support cost
```

Also review support contacts, feature use, cancellation reasons, failed-payment recovery, and retained access after tier changes. Do not optimize only average revenue.

## Product fit and limitations

ArraySubs fits product/variation-driven tiers with WordPress/Woo content access. It is not automatically the best fit for:

- complex organization accounts and seat assignment;
- consumption-based billing requiring authoritative external meters;
- LMS credentials/prerequisites;
- highly bespoke contract entitlements;
- an independent association membership ledger;
- lifetime offers needing trust/escrow/legal structures beyond plugin access controls.

## Unsupported claims and caveats

- Do not state an optimal number of tiers without first-party testing.
- Do not invent conversion/churn benchmarks.
- Do not present a free trial as the same as a permanent free level.
- Do not imply lifetime means limitless support or every future product.
- Do not claim WordPress roles are membership levels.
- Do not claim Feature Manager is core/free; it is Pro.
- Do not claim Fixed Period Membership and lifetime billing are the same.
- Do not recommend price points without market research and economics.
- Do not promise grandfathering merely because existing prices are locked; access rules and feature keys also matter.

## FAQ questions

- How many membership levels should I offer?
- Should I have a free membership tier?
- Is a free trial better than a free membership?
- Should membership access be monthly, annual, fixed-term, or lifetime?
- What should differ between membership tiers?
- Is a WordPress role the same as a membership level?
- How should I grandfather existing members?
- What happens when members downgrade below current usage?
- Can one WooCommerce product have monthly and annual membership options?
- How does ArraySubs enforce tier benefits?

## Internal-link plan

- **Commercial pillar:** `/deals/arraysubs/features/woocommerce-membership/`
- **Recipes:** combined conditions and inline content gating where relevant.
- **Siblings:** A043 combined architecture, A045 content restriction, A046 paywall models.
- **Supporting:** A008 monthly/annual packaging, A012 lifetime deals vs recurring, A021 proration, A022 switch timing, A051 roles vs levels vs entitlements.
- **CTA after strategy and limitations:** `/deals/arraysubs/pricing/`

## Long-form SEO/GEO outline (target 2,500–3,200 words)

1. Direct answer and key takeaways.
2. Member promise and segmentation before tiers.
3. Free, paid fixed-term, recurring, and lifetime comparison.
4. When one, two, three, or more levels are justified.
5. Entitlement architecture: product, variation, role, feature.
6. Upgrade, downgrade, overlap, and grandfathering.
7. Lifetime sustainability worked formula.
8. Measurement and simplification checklist.
9. Current ArraySubs core/Pro implementation and limitations.
10. FAQ, conclusion, CTA, trust/update elements.

## Mirror screenshot opportunities with marker plan

1. **Variable subscription product tiers** — WooCommerce product edit on a safe test variable subscription.
   - markers: variation name, price/cadence, subscription length, trial/term fields actually shown.
2. **Feature Manager on product/variation (Pro)** — same safe product.
   - markers: feature name/key, type, value, enabled state; avoid exposing commercial live data.
3. **Members Access condition by variation/feature** — `#/members-access/cpt-rules`.
   - markers: subscription variation, Feature Value, AND/OR logic, target.
4. **Fixed Period Membership fields (Pro)** — safe test subscription product.
   - markers: enable, absolute/annual type, end date, enrollment window, renewal behavior.
5. **Plan-switch customer portal** — mirror My Account safe test subscription if switch is enabled.
   - markers: current plan, available action, effective timing disclosure.
6. **Frontend plan comparison/product page** — only if current mirror test plans have intentional non-sensitive copy.
   - markers: distinct promise, cadence, entitlement—not just price.

## Varied non-chart visual ideas

1. **Membership wardrobe scene:** free pass, recurring badge, fixed-term wristband, lifetime key—four tangible access objects.
2. **Tier ladder as environments:** reading nook, professional studio, team workspace; each depicts a different outcome.
3. **Lifetime obligation balance:** upfront coin stack balancing years of content, support, hosting, and community.
4. **Grandfather tree:** old plan branch remains intact while new tiers grow beside it.
5. **Downgrade packing scene:** member moves from a large locker to a smaller one, deciding what happens to excess usage/assets.
6. **Feature keyring:** real product/variation tags connected to icons for seats, downloads, coaching, and support.
7. **Annotated real Feature Manager screenshot:** markers on feature key/type/value instead of a synthetic comparison chart.

## Refresh triggers

- ArraySubs changes lifetime product semantics, variation access, price locking, switching, Feature Manager, or Fixed Period Membership.
- The live UI differs from inspected source.
- Woo Memberships changes plan duration or integration behavior.
- New original plan/tier performance data becomes available.
- Quarterly primary-source and screenshot review.

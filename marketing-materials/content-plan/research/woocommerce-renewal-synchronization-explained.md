# Research dossier: WooCommerce Renewal Synchronization Explained (A020)

**Research completed:** 2026-07-13  
**Article brief:** `web-content/content-plan/articles/020-woocommerce-renewal-synchronization-explained.md`  
**Primary keyword:** `WooCommerce renewal synchronization`  
**Evidence policy:** official WooCommerce Subscriptions billing-alignment documentation for shared concepts and that extension’s behavior; current ArraySubs code and manual for ArraySubs dates, formulas, tier, eligibility, and gateway rules.

## Direct-answer conclusion (40–60 words)

> Renewal synchronization moves new subscriptions onto shared billing boundaries—such as every Monday, the first of the month, or January 1—instead of renewing each customer on their signup anniversary. The first charge must bridge signup to that boundary through full charging, proration, or a defined covered period. Existing subscriptions and unsupported gateways need separate handling.

## Key takeaways

1. Synchronization changes the billing boundary, not automatically the shipping, access, support, or contract-end schedule.
2. The first-charge rule is the customer and cash-flow tradeoff: full now, prorated now, or a covered/deferred period depending on the engine.
3. Date math must use the store timezone and real calendar boundaries; DST and month length make simple seconds-based formulas unsafe.
4. Existing subscriptions are generally not retroactively moved by enabling synchronization; migration requires a separate tested process.
5. Current ArraySubs tier boundary is **global Renewal Sync in Free/core** and **product-level Flexible Renewal Sync in Pro**. Automatic gateway coverage is manual/offline and Stripe for current synced checkout; PayPal/Paddle automatic options are excluded.

## Definition and business purpose

Without synchronization, each subscriber normally renews relative to their signup/start schedule:

```text
Customer A joins Jul 3  → renews Aug 3
Customer B joins Jul 19 → renews Aug 19
Customer C joins Jul 28 → renews Aug 28
```

With monthly synchronization to the first:

```text
Customer A joins Jul 3  ─┐
Customer B joins Jul 19 ─┼→ first full shared renewal Aug 1
Customer C joins Jul 28 ─┘
```

Potential benefits:

- batch fulfillment, access cohorts, invoicing, and reconciliation;
- a predictable customer-facing billing day;
- fewer distinct operational renewal dates;
- easier planning of renewal communication and staffing.

Potential costs:

- a more complex first invoice and disclosure;
- concentrated charge, webhook, email, order, and support volume;
- near-boundary small charges or a full charge for a short initial window;
- migration and gateway constraints;
- customer confusion if shipping/access does not follow the same date.

Do not claim synchronization reduces churn or raises revenue without store data.

## Weekly, monthly, and annual examples

The exact boundary rules are engine-specific. Current ArraySubs core 1.8.9 calculates in the WordPress site timezone and stores UTC schedule values:

| Period | Current global ArraySubs boundary |
| --- | --- |
| Day | site-local midnight plus the configured interval |
| Week | store `start_of_week` boundary plus interval weeks |
| Month | first day of the current cycle month plus interval months |
| Year | January 1 plus interval years |

Examples for interval 1:

- join Tuesday on a Monday-start weekly plan → next boundary is the following Monday;
- join July 13 on monthly → next boundary August 1;
- join July 13 on yearly → next boundary January 1, 2027.

For ArraySubs interval 3/month, the next date is calculated from the current month’s first day plus three months, then incremented again if that result is not future. This differs from WooCommerce Subscriptions’ documented longer-interval alignment behavior, which can use the next alignment day independent of interval. Name the engine in examples.

## First-charge models

### Full first recurring amount

Customer pays the normal recurring amount at signup and reaches the synchronized renewal on the shared boundary. This improves initial cash but can charge the full amount for a shortened first span. The page must explain what the initial payment covers.

### Prorated first recurring amount

Customer pays for the remaining fraction until the shared boundary, then the full recurring amount on the boundary. This can feel proportional but creates small charges, rounding, tax/coupon complexity, and gateway minimum issues.

### No recurring charge until boundary / covered next cycle

Some engines can defer the first recurring charge or let a full signup charge cover through the next cycle so the first later full renewal is one boundary farther out. WooCommerce Subscriptions documents a `$0 until first renewal` option. Current ArraySubs **global** sync supports `prorate` or `full`; ArraySubs Pro **Flexible Renewal Sync** adds product-level segment choices including a full amount that covers the next cycle.

Do not present all three as global ArraySubs settings.

## Current ArraySubs global synchronization (Free/core)

Verified settings and behavior:

- enable via `renewals.sync_to_billing_cycle`;
- first-charge mode is `prorate` or `full`;
- applies to newly created eligible subscriptions, not existing subscriptions;
- excludes lifetime products and products with a trial;
- calculates site-local boundary then converts/stores UTC;
- supports current manual/offline gateways and Stripe;
- explicitly excludes current PayPal/Paddle automatic checkout unless behavior is changed by a deliberate extension/filter;
- stores the full recurring amount and synchronization metadata while the checkout line can use the adjusted initial amount;
- sets the first full `_next_payment_date` to the boundary.

### Core proration formula

Current code normalizes the cycle start, next boundary, and signup to site-local midnight and uses calendar-day differences:

```text
cycle days = calendar days from cycle start to next boundary
remaining days = max(1, calendar days from signup to next boundary − 1)
ratio = min(1, remaining days ÷ cycle days)
raw prorated amount = full recurring amount × ratio
display amount = currency-rounded raw amount
```

If the nonzero rounded amount becomes zero, code raises it to the smallest currency unit. For supported Stripe checkout, current code can also raise the initial line amount to satisfy a gateway minimum when the full amount plus fee can meet that minimum.

### Worked monthly example

Hypothetical ArraySubs core calculation: $31 monthly, cycle July 1 to August 1, signup July 20, no tax/fee/shipping.

```text
cycle days = 31
days from Jul 20 to Aug 1 = 12
remaining days = 12 − 1 = 11
ratio = 11 ÷ 31 = 0.354838...
prorated first amount = $31 × 11 ÷ 31 = $11.00
first full renewal = $31 on Aug 1
```

The current formula excludes the signup calendar day and the boundary from remaining days, with a minimum of one remaining day inside the cycle. State this ArraySubs-specific rule; do not substitute Woo’s examples or a generic seconds formula.

### Worked annual example

Hypothetical annual plan: $365, current cycle Jan 1, 2026 to Jan 1, 2027, signup Oct 1, 2026. Under current code’s date convention:

```text
cycle days = 365
days Oct 1 to Jan 1 = 92
remaining days = 91
prorated amount = $365 × 91 ÷ 365 = $91.00
first full renewal = $365 on Jan 1, 2027
```

Leap years, timezone, tax, shipping, discounts, fees, and gateway minimums can change the customer total.

## Current ArraySubs Flexible Renewal Sync (Pro)

The Pro product-level feature builds a segment plan for each product/variation. Current documented segment choices:

1. **Full amount now:** normal full charge; next renewal at the normal next boundary.
2. **Prorate to boundary:** first charge is proportional to the upcoming boundary.
3. **Full amount covering next cycle:** full charge now; first later full renewal is one cycle after the upcoming boundary.

Implementation notes:

- segments can be enabled/disabled, with at least one active choice;
- nominal cycle sizes are day 1, week `7 × interval`, month `30 × interval`, year `365 × interval` for segment planning; extra real-calendar days fall into the final active segment;
- the selected product-level plan overrides the global first-charge mode when applicable;
- flexible sync is mutually exclusive with current different-renewal-price, trial, and lifetime modes;
- current product/variation configuration and checkout must be tested together.

Guardrail: older internal research that called all Renewal Sync “Free” is incomplete. Global sync is Free; product-level Flexible Renewal Sync is Pro.

## Gateway and billing ownership

Current sync support matrix from code/manuals:

| Checkout/renewal mode | Current synced signup support |
| --- | --- |
| Manual/offline gateway | Yes, subject to normal checkout eligibility |
| Stripe automatic path | Yes, with minimum-charge handling where relevant |
| PayPal automatic path | No; hidden/excluded for a synced subscription cart |
| Paddle automatic path | No; hidden/excluded for a synced subscription cart |
| Custom gateway | Only if it explicitly opts in and the entire renewal path is tested |

Reason: a provider-managed billing schedule can conflict with local synchronized boundary/proration. Do not simply unhide a method without proving remote product/schedule creation, first charge, webhook mapping, cancellation, migration, refund, and duplicate prevention.

## Operational and cash-flow analysis

### Concentration metric

```text
renewal concentration for day D = renewal amount due on D ÷ total renewal amount due in period
```

Use actual due amounts, not counts alone. A synchronized monthly cohort can concentrate payment attempts, orders, webhooks, email, shipping labels, failures, and support on one day.

### Hypothetical bar-chart dataset

Ten $40 monthly subscriptions:

- unsynchronized: $80 due in each of five weekly buckets (illustrative spread);
- synchronized: $400 due in the first bucket, $0 in the remaining four.

This demonstrates timing concentration only. It does not predict collections, revenue, churn, or provider capacity.

### Capacity checklist

- Action Scheduler throughput and overdue monitoring;
- hosting/PHP/database capacity at the boundary;
- gateway/provider rate limits and webhook delivery;
- email and support volume;
- inventory and batch fulfillment;
- tax/shipping calculation performance;
- retry staggering versus repeating the same spike;
- reconciliation and exception queues.

## Customer disclosure checklist

Before payment show:

- amount due today and why it differs from the normal amount;
- recurring amount after synchronization;
- first full renewal date and cadence;
- what access/delivery the first payment covers;
- sign-up fee, tax, shipping, coupons, and gateway minimum adjustment if relevant;
- cancellation/refund and reminder rules;
- whether the shared billing date differs from shipping or access dates.

At checkout, order confirmation, email, and My Account, the same amounts/dates must remain coherent.

## Edge cases to test

- signup just before/after site-local midnight or the boundary;
- DST transition and non-UTC store timezone;
- February, leap year, 30/31-day months, annual Jan 1;
- interval greater than one;
- quantity, tax-inclusive/exclusive display, shipping, coupon, sign-up fee;
- near-zero prorated charge and Stripe/provider minimum;
- trial, different renewal price, lifetime, and Pro flexible exclusions;
- variable products and mixed carts;
- manual pay delay after a synchronized due date;
- cancellation before first full renewal;
- refunds and access/fulfillment for the partial first span;
- enabling sync after existing subscriptions already have dates;
- cloning/staging and queued boundary actions;
- bulk load at the boundary and retry surge.

## What synchronization does not do

- It does not automatically align shipping or service delivery.
- It does not retroactively migrate existing subscriptions merely because a setting is enabled.
- It does not guarantee successful automatic payment.
- It does not remove the need for cron/Action Scheduler, webhooks, notices, retries, or support.
- It does not make proration legally/tax correct for every jurisdiction.
- It does not equal a fixed end date; fixed-date/cohort expiry is a separate product decision.
- It does not imply every gateway can express the same provider schedule.

## Limitations and unknowns

- No live sync signup or boundary renewal was executed for this dossier.
- WooCommerce Subscriptions billing-alignment docs describe that extension; ArraySubs formulas and intervals differ in important places.
- The current ArraySubs proration formula’s exclusion of signup day/boundary should be validated against intended customer policy before marketing it as “pay for every day.”
- Taxes, shipping, discounts, refunds, currency rounding, and gateway minimums can alter totals.
- The Pro nominal segment-day allocation and core real-calendar proration serve different steps; do not combine their formulas.
- Existing-subscription migration requires separate research/testing.
- Legal/accounting treatment of partial periods requires qualified review.
- Gateway support is time-sensitive and must be revalidated before publication.

## Five FAQ answers

### What is WooCommerce renewal synchronization?

It aligns new subscriptions to a shared billing boundary—such as Monday, the first of the month, or January 1—instead of renewing each customer on their individual signup anniversary.

### How is the first synchronized payment calculated?

The engine chooses a first-charge policy: full amount, prorated amount until the boundary, or a defined deferred/covered period. Current ArraySubs global sync supports full or prorated; Pro Flexible Sync adds product-level segment choices.

### Does enabling renewal sync change existing subscriptions?

Current ArraySubs behavior applies to new eligible subscriptions; it does not automatically move existing dates. Treat migration as a separate audited operation with customer, gateway, order, and access implications.

### Which gateways work with ArraySubs renewal sync?

As verified on 2026-07-13, current code/manuals support manual/offline gateways and Stripe. PayPal and Paddle automatic checkout are excluded for synced carts. Custom opt-in requires full testing.

### Is ArraySubs renewal synchronization Free or Pro?

Global store-wide Renewal Sync is in ArraySubs Free/core. Product- or variation-level Flexible Renewal Sync with selectable first-cycle segments is Pro. Automatic gateway capability is also a separate Pro boundary.

## Visual plan

Flat ArraySubs palette (#873EFF purple, green, orange, pale lavender, dark ink); no gradients, neon, glow, glass, or 3D.

1. Hero: three customer calendars converging on one shared boundary.
2. Unsynchronized versus synchronized timeline.
3. Weekly/monthly/annual boundary cards.
4. First-charge three-path flow: full, prorated, full-cover-next-cycle.
5. Proration formula diagram with July 20 → August 1 day blocks.
6. Hypothetical concentration bar chart: five spread buckets versus one $400 bucket.
7. Global Free versus Flexible Pro feature split.
8. Gateway eligibility flowchart with manual/Stripe yes and PayPal/Paddle no.
9. Billing versus shipping/access swimlane.
10. Edge-case calendar (DST, February, leap year, boundary signup).
11. Dated screenshots: global settings, Pro product settings, checkout summary.

## Internal links

- Commercial overview: `/deals/arraysubs/`
- Billing operations: `/deals/arraysubs/features/#subscription-operations`
- Recipes: `/deals/arraysubs/use-cases/recipes/switch-at-renewal/`, `/deals/arraysubs/use-cases/recipes/downgrade-with-credit/`, `/deals/arraysubs/use-cases/recipes/subscription-notes-timeline/`
- Siblings: A019 record types, A021 proration, A022 immediate versus next-renewal changes.

## Primary sources (accessed 2026-07-13)

1. WooCommerce, “Guide to Billing Date Alignment”: https://woocommerce.com/document/subscriptions/billing-date-alignment/
2. WooCommerce, “Creating an Aligned Subscription Product”: https://woocommerce.com/document/subscriptions/billing-date-alignment/creating-an-aligned-subscription-product/
3. WooCommerce, “Understanding the Subscription Renewal Process”: https://woocommerce.com/document/subscriptions/renewal-process/
4. ArraySubs renewal sync helpers and formulas: `arraysubs/src/functions/renewal-sync-helpers.php`
5. ArraySubs Pro segment plan: `arraysubspro/src/Features/FlexibleRenewalSync/Services/SegmentPlan.php`
6. ArraySubs Pro flexible-sync hooks: `arraysubspro/src/Features/FlexibleRenewalSync/Services/Hooks.php`
7. ArraySubs renewal-sync manual: `user-manual/markdowns/billing-and-renewals/renewal-sync.md`
8. ArraySubs checkout manual: `user-manual/markdowns/checkout-and-payments/subscription-checkout.md`


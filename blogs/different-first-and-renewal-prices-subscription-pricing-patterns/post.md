---
title: "Different First and Renewal Prices: Subscription Pricing Patterns"
meta_description: "Design a different first and renewal price in WooCommerce with explicit payment counting, contribution modeling, disclosure, coupons, and test cases."
focus_keyword: "different first and renewal price WooCommerce"
published: "2026-07-13"
updated: "2026-07-13"
last_verified: "2026-07-13"
author: "Emran"
author_affiliation: "ArrayHash"
reviewer: "ArraySubs Engineering Team"
---

# Different First and Renewal Prices: Subscription Pricing Patterns

Use a different first and renewal price when the same subscription should charge a clearly disclosed introductory amount for a fixed number of successful paid payments, then one stable recurring amount. Model contribution through the transition, state exactly which payment changes, and prefer a coupon when eligibility, redemption limits, or promotion portability are required.

> **Key takeaways**
>
> - ArraySubs Free supports one introductory price followed by one later price.
> - The threshold counts successful payments with totals above zero, including paid checkout.
> - “First three payments” means checkout plus two paid renewals before the later price.
> - The schedule is captured on each subscription for cohort consistency.
> - It is not a multi-step price ladder, and plan-switch transfer needs testing.

## Choose the right pricing pattern

![Price step over time — a focused timeline for Price the first period and steady state separately.](/blogs/different-first-and-renewal-prices-subscription-pricing-patterns/decision-visual.png)

| Pattern | Best use | Transition |
| --- | --- | --- |
| Different renewal price | Universal one-step sequence for one product | After a count of successful paid payments |
| Trial | Access/evaluation before ordinary paid cycle | Time or date boundary |
| Signup fee | One-time onboarding amount | Initial checkout only |
| Finite coupon | Campaign or segment with restrictions | Coupon cycle/eligibility |
| Permanent discount | Stable lower price | No transition |
| Multi-step ladder | Several planned prices | Not supported by this ArraySubs feature |

## How ArraySubs counts the transition

Current ArraySubs copies the product’s introductory price, later price, and threshold to the subscription. Later product edits do not automatically rewrite existing subscribers.

The counter increments after a successful order only when its total is greater than zero. Initial paid checkout is payment one. For an introductory phase of three successful paid payments:

| Order | Count after payment | Charged price |
| --- | ---: | ---: |
| Initial paid checkout | 1 | Introductory |
| First paid renewal | 2 | Introductory |
| Second paid renewal | 3 | Introductory |
| Third paid renewal | 4 | Later price |

A free trial or coupon/credit that makes the order total zero does not advance this counter. Use “successful paid payments,” not “months.”

## Model the economics

Assume $20 for the first three paid payments, then $35, with $8 variable cost each period and $40 acquisition/onboarding allocation:

```text
six-payment gross = (3 × $20) + (3 × $35) = $165
variable cost = 6 × $8 = $48
illustrative contribution = $165 − $48 − $40 = $77
modeled payback = fourth successful paid payment
```

![First and later payments — an illustrative bars for Price the first period and steady state separately.](/blogs/different-first-and-renewal-prices-subscription-pricing-patterns/model-visual.png)

*Illustrative arithmetic excludes tax, fees, shipping, coupons, failures, refunds, and overhead. It does not predict retention.*

## Price schedule or coupon?

Use a price schedule when every eligible buyer receives the same captured one-step sequence and no campaign code is needed. Use a coupon when expiry, email/product restrictions, usage limits, attribution, or code-based eligibility matters.

Avoid stacking both until tested. A zero-total coupon can delay the successful-payment counter, so customer-observed timing may differ from “three months.” For coupon economics and controls, read [Recurring Subscription Coupons](/deals/arraysubs/resources/billing-strategy/recurring-subscription-coupons-economics-and-abuse-controls/).

## Write unambiguous customer copy

Prefer:

> Payments 1–3: $20 each, including today’s payment. Payment 4 onward: $35 monthly. Your next payment is shown at checkout.

Avoid “starting at $20,” “$20 for three months,” or a crossed-out price without the transition. Near purchase, also show signup fee, tax, shipping, trial, cancellation method, and material terms.

Online negative-option obligations vary. ROSCA’s statutory summary addresses material disclosure, consent, and a simple stopping mechanism for covered online transactions ([ROSCA](https://www.congress.gov/bill/111th-congress/senate-bill/3386)). The FTC’s 2024 amended rule was vacated; revalidate current law and use qualified counsel.

## Operating and reporting model

![Disclosure to reporting — a focused layers for Price the first period and steady state separately.](/blogs/different-first-and-renewal-prices-subscription-pricing-patterns/operating-visual.png)

Track:

```text
intro-to-full-price reach = subscriptions reaching later price ÷ subscriptions started
transition payment success = paid first later-price orders ÷ attempted first later-price orders
realized contribution = collected payments − discounts − variable costs − fees − refunds − acquisition allocation
```

Use closed cohorts and label whether checkout counts. Do not claim causation without a credible comparison.

## Important limitations

- One price transition only; no arbitrary ladder or indexation.
- Zero-total orders delay the counter.
- Refund or chargeback counter reversal is not universally established.
- Existing subscriptions retain captured values after product edits.
- Target pricing phases do not reliably transfer through every plan-switch path.
- Tax, shipping, coupons, retries, and authentication need end-to-end tests.
- Lifetime products do not have a recurring sequence.

## Final recommendation

Use a different renewal price for a simple, universal, one-step schedule. State the exact successful-payment sequence and test every zero-total and switch interaction before launch. [Compare ArraySubs plans](/deals/arraysubs/pricing/).

## Frequently asked questions

### Does initial checkout count toward the first three payments?

Yes when it succeeds and the total is greater than zero. With a three-payment introductory phase, checkout and the next two paid renewals use the introductory price; the following renewal uses the later price.

### Does a free trial count as an introductory payment?

Not when its order total is zero. Current ArraySubs increments the relevant completed-payment counter only for successful orders above zero.

### Should I use a product price schedule or a coupon?

Use the schedule for a universal captured one-step sequence. Use a coupon when campaign eligibility, restrictions, expiry, limits, or attribution matter.

### Do later product edits change existing subscribers?

No automatic rewrite is expected. Current ArraySubs captures the price schedule on each subscription, so a cohort migration requires a separate policy and implementation.

### Can ArraySubs create three planned price stages?

Not through this feature. It supports one introductory price for a payment count followed by one later recurring price.

## Disclosure, verification, and update log

- **July 2026:** Verified against current ArraySubs renewal-price and completed-payment logic plus current federal source context. Examples are arithmetic only.

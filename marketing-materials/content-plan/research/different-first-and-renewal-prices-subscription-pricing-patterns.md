# Research brief: Different First and Renewal Prices: Subscription Pricing Patterns

## Research record

- **Article:** A025
- **Research date / last verified:** 2026-07-13
- **Focus keyword:** `different first and renewal price WooCommerce`
- **Intent:** Help operators decide when a deterministic introductory payment sequence and later renewal price is preferable to a coupon, trial, signup fee, or permanent discount.
- **Evidence scope:** ArraySubs 1.8.9 recurring-billing source, current manual and annotated screenshot, official WooCommerce subscription/coupon documentation, and current FTC/ROSCA primary materials. No live checkout, tax, gateway, or plan-switch test was run.
- **No invented benchmarks:** Pricing and payback numbers below are arithmetic scenarios only.
- **Product guardrail:** Different Renewal Price is in ArraySubs Free. It supports one introductory recurring price followed by one later price after a stated number of **successful paid payments**; it is not an arbitrary multi-step price ladder.
- **Legal guardrail:** Price-disclosure and negative-option obligations depend on channel and jurisdiction. The FTC's 2024 Negative Option Rule was vacated; current federal sources still identify Section 5, ROSCA, TSR, and the older prenotification rule as relevant. Obtain qualified legal advice.

## Direct-answer conclusion

> Use a different first and renewal price when the same subscription should charge a clearly disclosed introductory amount for a fixed number of successful paid payments, then one stable recurring amount. Model contribution through the transition, state exactly which payment changes, and prefer a coupon only when eligibility, redemption limits, or promotion portability are required.

## Editorial thesis

Introductory pricing is a schedule, not a crossed-out price. A defensible offer defines the exact sequence of successful payments, the full renewal amount, what counts toward the transition, and what happens around trials, $0 orders, failed payments, plan switches, coupons, refunds, tax, and cancellation.

## Key facts

- ArraySubs Free supports one introductory recurring amount followed by one later recurring amount.
- The threshold counts successful orders with a total greater than zero, including paid initial checkout.
- “First three payments” means checkout plus two paid renewals; the next paid renewal uses the later price.
- The schedule is copied to each subscription, so later product edits do not automatically rewrite existing cohorts.
- Lifetime subscriptions are excluded, and the feature is not a multi-step price ladder.
- A coupon that makes an order total zero can delay the completed-payment counter and therefore the price transition.

## Pattern comparison

| Pattern | Best use | Transition/eligibility | Main ambiguity to prevent |
| --- | --- | --- | --- |
| Different renewal price | Same product, deterministic step from intro price to full price | After `k` successful paid payments | Whether initial checkout counts |
| Free/discounted trial | Access before ordinary paid cycle | Time/date boundary | First charge date and amount |
| Signup fee | One-time onboarding/setup amount plus recurring price | Initial checkout only | Confusing fee with first recurring payment |
| Finite recurring coupon | Promotion tied to code, eligibility, and cycle rules | Coupon counter | Whether checkout counts; stacking/restrictions |
| Permanent discount | Same reduced amount indefinitely | No price step | “Introductory” copy that never expires |
| Multi-step ladder | Several planned price phases | Multiple thresholds | Not supported by current ArraySubs different-price feature |

## Verified ArraySubs behavior

### Product and subscription data

Product settings use:

- `_enable_renewal_price`
- `_renewal_price`
- `_renewal_price_after`

At subscription creation, the schedule is copied to subscription-specific metadata:

- `_different_renewal_price`
- `_different_renewal_price_after`
- `_completed_payments`

Existing subscribers therefore keep their captured schedule when the source product changes. This is important for cohort disclosure and grandfathering.

The product/checkout description can present the offer as, for example, “$19.99 per month for first 3 payments, then $29.99 per month.” The article should preserve that explicit count and never reduce it to “starting at $19.99.”

### What counts toward the transition

Current code increments `_completed_payments` after a successful order only when the order total is greater than zero. The initial paid checkout counts as payment one. A free trial or a coupon/credit that reduces the order total to zero does not increment the counter.

If the threshold is three successful paid payments:

| Order | Successful paid-payment count after order | Price |
| --- | ---: | ---: |
| Initial paid checkout | 1 | Introductory price |
| First paid renewal | 2 | Introductory price |
| Second paid renewal | 3 | Introductory price |
| Third paid renewal | 4 | Later renewal price |

Once the threshold has been reached, the later price is used for the subsequent renewal and the subscription's recurring amount is updated after successful processing. This is payment-count semantics, not “after three calendar months” when failures, pauses, $0 orders, or delayed payment can intervene.

Lifetime subscriptions are excluded because they have no recurring renewal sequence.

### One transition, not a ladder

The current feature represents:

```text
introductory price P0 for k successful paid payments
then recurring price P1
```

It does not natively represent `P0 → P1 → P2`, annual step-ups, CPI/indexation, cohort-wide price-change notices, or a percentage uplift. Those need another contract or custom implementation.

## Financial formulas

Let:

- `P0` = introductory price;
- `P1` = later renewal price;
- `k` = number of successful paid payments at `P0`;
- `N` = successful payments modeled;
- `F` = signup fee;
- `V_t` = variable service/product cost at payment `t`;
- `G_t` = payment/gateway cost at payment `t`;
- `A` = acquisition/onboarding allocation.

```text
scheduled gross through N successful payments
= [min(N, k) × P0] + [max(0, N − k) × P1] + F

cumulative contribution through N successful payments
= Σ(price_t − V_t − G_t) + F − A − refunds/chargebacks

payback payment
= smallest successful payment n where cumulative contribution_n ≥ 0
```

Use successful payments rather than elapsed periods. A future renewal is not collected revenue, and a collected payment may later be refunded.

## Worked arithmetic scenario — not a benchmark

Assume:

- $20 for the first three successful paid payments;
- $35 for each later successful payment;
- $8 variable cost per fulfilled period;
- $40 acquisition/onboarding allocation;
- no tax, gateway fee, coupon, failure, refund, shipping, or fixed overhead.

| Successful payment | Price | Period contribution before acquisition | Cumulative contribution after $40 acquisition |
| ---: | ---: | ---: | ---: |
| 1 | $20 | $12 | -$28 |
| 2 | $20 | $12 | -$16 |
| 3 | $20 | $12 | -$4 |
| 4 | $35 | $27 | $23 |
| 5 | $35 | $27 | $50 |
| 6 | $35 | $27 | $77 |

```text
six-payment gross = (3 × $20) + (3 × $35) = $165
six-payment variable cost = 6 × $8 = $48
modeled contribution = $165 − $48 − $40 = $77
modeled payback = fourth successful paid payment
```

This does not predict retention. It says only that if six successful payments occur under these assumptions, the arithmetic produces the shown amounts.

## When to use a price schedule versus a coupon

Choose a **different renewal price** when:

- every eligible buyer of that product should receive the same schedule;
- the schedule should be captured on the subscription;
- no code/redemption campaign is needed;
- one deterministic transition is enough;
- checkout can describe the complete sequence plainly.

Choose a **coupon** when:

- only a campaign, partner, customer segment, or code-holder qualifies;
- expiry, usage limits, email restrictions, products/categories, or individual-use rules matter;
- promotion attribution is required;
- the discount should be revoked by an eligibility rule;
- the discount is a percent/fixed reduction rather than a new canonical later price.

Avoid stacking both unless the combined sequence has been calculated and tested. A coupon that makes a payment total zero can delay the ArraySubs successful-payment counter, shifting the later-price transition beyond the copy a customer assumed.

## Disclosure checklist

Place near the purchase action:

1. amount due today, including signup fee, tax, and shipping where determinable;
2. number of successful paid payments at the introductory price;
3. later renewal amount and cadence;
4. a concrete sequence such as “payments 1–3: $20; payment 4 onward: $35”;
5. first renewal date or schedule method;
6. how trials and $0 orders affect the count;
7. cancellation method and when future charges stop;
8. material product, fulfillment, refund, and price-change terms.

ROSCA's statutory summary requires clear disclosure of material terms before billing, express informed consent, and a simple mechanism to stop recurring charges for covered online negative-option transactions. The article should not claim a single disclosure block satisfies every federal, state, or international requirement.

## Metrics without invented targets

```text
intro-to-full-price reach = subscriptions reaching P1 ÷ subscriptions started on P0
payback reach = subscriptions reaching modeled payback payment ÷ subscriptions started
transition payment success = successful first P1 orders ÷ attempted first P1 orders
transition cancellation rate = cancellations in a defined window around first P1 attempt ÷ subscriptions reaching that window
realized contribution = collected payments − discounts − variable costs − fees − refunds − allocated acquisition
support contact rate = price-transition contacts ÷ subscriptions reaching the transition
```

Define windows and cohorts in every report. Avoid attributing causation without a controlled design.

## Limitations and unknowns

1. **Plan switches:** current immediate switching updates product/price but does not clearly copy the target product's different-price schedule; deferred application clears old schedule metadata without clearly copying target values. Do not promote switching into/out of step-up products until tested/fixed.
2. **Zero-total orders:** successful orders with total `0` do not increment `_completed_payments`; coupons, credits, trials, or full refunds can make copy based on “months” inaccurate.
3. **Refund/counter reversal:** source inspection did not establish a universal reversal of completed-payment count after refund/chargeback. Test and document policy.
4. **One price step only:** no multi-stage ladder, annual uplift, or indexation.
5. **Existing cohorts:** product edits do not rewrite captured subscription schedules; cohort migration requires a separate, consent-aware plan.
6. **Tax and shipping:** displayed totals and price-transition consequences require representative live tests and qualified review.
7. **Gateway and retries:** authentication, failed renewals, manual payment, grace periods, and duplicate webhook processing can change elapsed timing even though successful-payment count remains the intended basis.
8. **Current federal regulatory context is evolving:** FTC began a new negative-option rulemaking process in March 2026 after the 2024 rule was vacated. Revalidate before publication and use counsel.

## Five FAQ answers

### 1. Does the initial checkout count toward “first three payments” in ArraySubs?

Yes, when the initial order succeeds and its total is greater than zero. It becomes payment one. With a three-payment introductory phase, the first two paid renewals remain introductory and the third paid renewal is the first later-price order.

### 2. Does a free trial count as an introductory payment?

Not when its order total is zero. Current ArraySubs increments the completed-payment counter only for successful orders whose total is greater than zero. Copy should say “successful paid payments,” not merely “months” or “billing cycles.”

### 3. Should introductory pricing be implemented with a product price or a coupon?

Use the product's different-renewal-price schedule for a universal, deterministic one-step sequence. Use a coupon when campaign eligibility, code usage, product/category restrictions, expiry, attribution, or redemption limits matter. Test combined use because a zero-total coupon can delay the price-transition counter.

### 4. Do later product edits change existing subscribers' renewal schedule?

Current ArraySubs copies the different-price values to the subscription at creation, so later source-product edits do not automatically rewrite existing subscriptions. This supports cohort consistency but means a migration needs a separate policy, communication, and implementation.

### 5. Can ArraySubs create three or more planned price stages?

Not through the current different-renewal-price feature. It supports one introductory price for a count of successful paid payments, followed by one stable later price. A multi-step ladder needs custom lifecycle logic and especially clear disclosure.

## Visual ideas

1. **Price staircase:** three $20 payment blocks followed by $35 blocks; flat colors and exact payment numbers.
2. **Contribution bar chart:** payments 1–6 from the worked example, with cumulative line crossing zero at payment four; label as illustrative.
3. **Pie chart:** six-payment gross $165 split into $60 introductory revenue and $105 later-price revenue; no gradient.
4. **Flowchart:** checkout disclosure → paid payment counter → threshold reached → later renewal price → recurring amount update.
5. **Pattern comparison cards:** trial, signup fee, price schedule, coupon, permanent discount.
6. **Human illustration:** shopper reviewing “due today” and “payment 4 onward” beside a transparent timeline.
7. **Disclosure anatomy:** callouts around a clean checkout price sentence.

## Internal-link suggestions

- Primary CTA: `/deals/arraysubs/pricing/`
- Different Renewal Price on the feature hub: `/deals/arraysubs/features/#products-checkout`
- Intro-pricing step-up recipe: `/deals/arraysubs/use-cases/recipes/intro-pricing-step-up/`
- Free-first-month coupon recipe: `/deals/arraysubs/use-cases/recipes/free-first-month-coupon/`
- Signup-fee strategy/article or recipe where canonical
- Recurring coupon strategy: `/billing-strategy/recurring-subscription-coupons-economics-and-abuse-controls/`
- Trial strategy: use the canonical A006 URL from the article registry
- Plan-switch timing: `/billing-strategy/immediate-vs-next-renewal-plan-changes/`

Verify canonical generated routes before publication and leave configuration steps in the recipe.

## Primary and first-party sources

All sources accessed 2026-07-13.

- ArraySubs manual, Renewal Operations: `../../user-manual/markdowns/billing-and-renewals/renewal-operations.md`
- ArraySubs annotated renewal-pricing screenshot: `../../user-manual/markdowns/billing-and-renewals/renewal-operations.ASSETS/07-product-renewal-pricing-settings-annotated.png`
- ArraySubs renewal order creation: `../../arraysubs/src/Features/RecurringBilling/Services/OrderCreation.php`
- ArraySubs completed-payment integration: `../../arraysubs/src/Features/Subscriptions/Services/OrderIntegration.php`
- WooCommerce, Creating a Subscription Product: https://woocommerce.com/document/subscriptions/creating-subscription-products/
- WooCommerce, Subscriptions Coupons: https://woocommerce.com/document/subscriptions/subscriptions-coupons/
- FTC, Negative Option Rule: https://www.ftc.gov/legal-library/browse/rules/negative-option-rule
- FTC, March 2026 negative-option ANPRM business guidance: https://www.ftc.gov/business-guidance/blog/2026/03/do-you-have-thoughts-negative-option-related-regulations-share-them-ftc
- FTC, March 2026 ANPRM announcement: https://www.ftc.gov/news-events/news/press-releases/2026/03/ftc-seeks-public-comment-response-advance-notice-proposed-rulemaking-regarding-negative-option
- U.S. Congress, Restore Online Shoppers' Confidence Act, S.3386 summary/text: https://www.congress.gov/bill/111th-congress/senate-bill/3386

## Drafting cautions

- Describe the threshold as successful paid payments and show whether initial checkout counts.
- Do not use the vacated 2024 FTC Negative Option Rule as current law.
- Keep economics conditional on successful payments and actual merchant costs.
- Do not imply arbitrary price ladders or reliable transfer through plan switches.
- Use real author/reviewer identities and qualified legal review where legal claims remain.

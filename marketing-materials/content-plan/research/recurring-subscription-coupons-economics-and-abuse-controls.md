# Research brief: Recurring Subscription Coupons: Economics and Abuse Controls

## Research record

- **Article:** A027
- **Research date / last verified:** 2026-07-13
- **Focus keyword:** `WooCommerce recurring coupon strategy`
- **Intent:** Help operators design a finite or ongoing subscription promotion whose economics, counter semantics, eligibility, and abuse controls are explicit.
- **Evidence scope:** ArraySubs 1.8.9 Coupon Tracking source, current manual and annotated screenshot, and official WooCommerce coupon/subscription-coupon documentation. No live gateway, tax, deletion, refund, or multi-coupon test was run.
- **No invented benchmarks:** The promotion example is arithmetic only; no conversion, churn, payback, abuse, or retention target is asserted.
- **Product guardrail:** ArraySubs recurring-coupon support is in Free. It captures one eligible subscription coupon per subscription, stores its value/type, applies renewals as a negative non-tax fee, and retains live product/category/expiry restriction checks.

## Direct-answer conclusion

> Use a recurring coupon only when the promotion's incremental contribution and retention value can justify its total discount cost. Define whether checkout counts, the exact successful-payment limit, eligible products/customers, stacking rules, expiry, and stop conditions. In ArraySubs, test zero-total renewals, live restrictions, plan switches, gateway behavior, tax reporting, and coupon deletion before launch.

## Editorial thesis

A subscription coupon is a multi-period liability. “25% off” is incomplete until the merchant knows the eligible base, number of discounted successful payments, whether initial checkout counts, discount cap, restrictions checked later, combination with other discounts, and contribution after fulfillment, gateway, support, refund, and acquisition costs.

## Key facts

- ArraySubs Free captures the first eligible coupon marked for subscriptions on each subscription.
- Coupon value/type are stored on the subscription, while product/category/sale/expiry restrictions remain live checks.
- `0` recurring cycles means unlimited; a finite counter can optionally include paid initial checkout.
- Renewal discounts are negative non-tax fee lines and are capped so an order does not fall below zero.
- Finite cycles decrement after successful qualifying payments, but zero-total orders can stall separate payment-count lifecycle counters.
- Gateway scope, deleted-coupon behavior, tax/reporting, plan-switch transfer, and refund counter reversal require live tests.

## Verified ArraySubs coupon semantics

### Capture requirements and fields

A WooCommerce coupon must be flagged **Apply to subscriptions**. ArraySubs adds:

- duration: `one-time` or `recurring`;
- recurring cycles: `0` means unlimited;
- **count initial checkout**: available for a finite recurring-cycle promotion.

At checkout, current code captures the first applicable subscription coupon for each subscription. It stores coupon ID/code, WooCommerce discount type, amount/percentage, cycle count, initial-count choice, and capture date. It does not capture a stack of multiple recurring subscription coupons.

### Locked value, live restrictions

The captured percentage/fixed value and type are stored on the subscription, so later edits to the coupon amount/type do not rewrite active subscriptions. However, renewal application still evaluates live coupon restrictions such as product/category eligibility, excluded sale items, and expiry.

This is a hybrid contract:

```text
discount value/type = captured snapshot
continued eligibility restrictions = checked from live coupon state
```

Do not write that the promotion is either fully immutable or fully live.

### Renewal application and counting

On renewal, ArraySubs adds the discount as a negative fee line with tax status `none`, rather than a native WooCommerce coupon order item.

```text
percent renewal discount = min(order subtotal × stored percent, order total before discount)
fixed renewal discount = min(stored fixed amount, order total before discount)
```

The discount cannot reduce the order below zero. A finite renewal cycle decrements only after a successful renewal payment on an order where the discount fee exists. If **count initial checkout** is enabled, the initial cycle decrements only after the initial order is paid.

### Counting example

For “25% off 3 payments”:

- with **count initial checkout on**: initial payment + next two successful discounted renewals;
- with it **off**: initial checkout may receive the checkout coupon, while three successful renewal discounts remain—potentially four discounted payments in the customer-observed sequence.

Copy must name the sequence, not only “3 cycles.”

### Interactions

- A finite counter decrements only on successful qualifying payments, not merely order creation.
- Retention discounts and the recurring coupon can both apply; current calculations cap total deductions at the order total.
- Coupon metadata is not cleared during ordinary plan-switch product updates, so the promotion can persist, but live product/category restrictions are re-evaluated against the target. Test both immediate and deferred switches.
- ArraySubs `_completed_payments` increments only when a successful order total is greater than zero. A coupon that reduces a renewal to zero can delay different-renewal-price and finite-payment-length counters.

## Economics formulas

Let:

- `R_t` = pre-discount recurring revenue at successful payment `t`;
- `p` = percent discount;
- `d` = fixed discount;
- `D_t` = applied discount;
- `V_t` = variable product/service/fulfillment cost;
- `G_t` = payment fee;
- `A` = acquisition/onboarding allocation;
- `S_t` = incremental support/abuse/refund cost;
- `n` = successful discounted payments.

```text
percent D_t = min(R_t × p, order total before discount)
fixed D_t = min(d, order total before discount)

promotion discount cost through n = Σ D_t

realized contribution through N successful payments
= Σ(R_t − D_t − V_t − G_t − S_t)
− A − refunds/chargebacks

payback payment
= smallest successful payment n where cumulative contribution_n ≥ 0
```

Incremental profit analysis also needs a control or credible counterfactual:

```text
incremental promotion contribution
= contribution from customers/orders caused by promotion
− contribution cannibalized from customers who would have paid full price
− added abuse/support/refund cost
```

Without a control or cohort design, gross coupon-attributed sales do not prove incrementality.

## Worked arithmetic scenario — not a benchmark

Assume:

- $40 monthly price;
- 25% off the first three total successful paid payments, including initial checkout;
- $12 variable cost per fulfilled month;
- $30 acquisition/onboarding allocation;
- no tax, gateway fee, shipping, failure, refund, support, or fixed overhead.

```text
discount per eligible payment = $40 × 25% = $10
discounted price = $30
discounted-period contribution before acquisition = $30 − $12 = $18
promotion discount cost = 3 × $10 = $30
```

| Successful payment | Customer pays | Variable cost | Cumulative contribution after $30 acquisition |
| ---: | ---: | ---: | ---: |
| 1 | $30 | $12 | -$12 |
| 2 | $30 | $12 | $6 |
| 3 | $30 | $12 | $24 |
| 4, full price | $40 | $12 | $52 |

If “3 recurring cycles” does **not** count initial checkout and checkout itself is also discounted, the customer may receive four $10 discounts, so total discount cost becomes $40 rather than $30. This is why the initial-count toggle must be reflected in customer copy and campaign forecasts.

## Promotion design checklist

### Define the offer

1. code and audience;
2. percent/fixed discount and eligible price base;
3. one-time, finite recurring, or unlimited duration;
4. whether initial checkout counts;
5. exact successful-payment sequence;
6. expiry and product/category restrictions;
7. usage limits per coupon/customer/item;
8. individual-use and stacking policy;
9. interaction with trials, signup fees, shipping, tax, retention discounts, credits, and step-up prices;
10. cancellation, refund, chargeback, plan-switch, and deleted-coupon behavior.

### WooCommerce abuse controls

Official WooCommerce coupon management supports controls including:

- individual use only;
- expiry date;
- minimum/maximum spend;
- included/excluded products and categories;
- exclude sale items;
- allowed emails;
- total usage limit;
- usage limit per user;
- usage limit per item.

ArraySubs adds subscription-specific duration, finite cycles, and initial-checkout counting. Verify how ordinary Woo usage counters and recurring applications appear in reports; renewal discounts are fee lines in current ArraySubs code.

### Operational abuse controls beyond fields

- normalize/verify email and account ownership under privacy rules;
- rate-limit coupon validation and checkout attempts;
- detect repeated refunds/chargebacks and duplicate identities using proportionate, disclosed signals;
- require authentication for customer-specific offers;
- separate employee/affiliate/partner codes and attribution;
- review anomalous zero-total, high-quantity, rapid-repurchase, or cross-region patterns;
- provide manual review and appeal paths rather than irreversible automated accusations;
- keep audit records of code capture, restrictions, cycle decrement, order, and actor.

Avoid fingerprinting or personal-data practices without a lawful, disclosed basis and retention policy.

## Stop rules and experiment design

Define an observation window before launch and compare eligible cohorts where lawful/ethical. Stop or revise when:

- realized contribution remains below the merchant's explicit floor;
- discount redemptions are primarily cannibalized full-price buyers;
- refunds/chargebacks, support cost, or duplicate-account activity exceed the predeclared tolerance;
- first full-price renewal success is materially worse than the comparable control;
- technical exceptions appear in cycle count, tax, reporting, plan switching, or zero-total lifecycle;
- customer copy does not match the observed number of discounted payments.

The research does not supply numeric thresholds. The merchant must set them from margin, risk, and cohort data.

## Metrics without invented targets

```text
discount cost = Σ applied recurring discount
redemption-to-paid rate = subscriptions with a paid captured coupon ÷ eligible coupon checkouts
full-price transition rate = subscriptions paying first undiscounted renewal ÷ subscriptions reaching that attempt
incremental contribution = test-cohort contribution − comparable control-cohort contribution
cycle-count exception rate = subscriptions whose observed discounts differ from rule ÷ coupon subscriptions
zero-total interaction rate = successful zero-total coupon renewals ÷ coupon renewals
suspected duplicate-account rate = reviewed duplicate cases ÷ coupon customers
refund/chargeback rate = refunded or charged-back coupon orders ÷ paid coupon orders
```

Always state cohort, time window, product, gateway, and whether checkout counts.

## Limitations and truth-gate issues

1. **Gateway scope is unresolved:** code comments/UI help say manual and Stripe automatic only, with other automatic gateways skipped safely, but no obvious Pro filter enforcing that rule was found in the inspected path. Live-test Stripe, PayPal, Paddle, manual renewal, and authentication before stating support.
2. **Coupon deletion is ambiguous:** current application constructs a coupon from stored ID and then uses stored value. Manual wording suggests deletion may stop the discount, but source inspection does not make that safe to promise. Test deletion, trash, expiry, and disabled states.
3. **Tax/reporting:** renewal discount is a negative non-tax fee, not a native coupon item. Verify tax bases, invoices, analytics, refunds, exports, and accounting integrations.
4. **Only one captured subscription coupon:** do not advertise multiple recurring-coupon stacking.
5. **Zero-total lifecycle interaction:** different-renewal-price and payment-length counters do not advance when successful order total is zero.
6. **Live restrictions versus captured value:** product/category/sale/expiry changes can stop a discount while amount edits do not update it; customer terms and support tooling must explain this.
7. **Plan switching:** coupon metadata appears to persist, but target restrictions and deferred/immediate order construction need live testing.
8. **Refund/chargeback counter reversal:** no universal finite-cycle restoration behavior was confirmed.
9. **WooCommerce Subscriptions differs:** official Woo docs say its recurring coupons do not automatically transfer through switching. Do not attribute that external extension behavior to ArraySubs, whose current metadata path differs.

## Five FAQ answers

### 1. How many subscription coupons does ArraySubs capture?

Current checkout code captures the first eligible coupon marked for subscriptions on each subscription. It does not store multiple recurring subscription coupons as a stack. Ordinary coupons and retention discounts can still affect totals, so combined checkout/renewal behavior needs testing.

### 2. What does “count initial checkout” mean?

For a finite recurring coupon, enabling it consumes one cycle after the paid initial order. With three cycles, checkout plus two renewals are discounted. If disabled, the recurring counter applies to three renewals, and checkout may still be discounted—potentially four discounted payments in total.

### 3. Do coupon edits change existing subscription discounts?

Amount/type are captured on the subscription, so changing those fields later does not rewrite the stored discount. Current renewal processing still checks live product/category, excluded-sale, and expiry restrictions. Treat the offer as a captured value with live eligibility gates.

### 4. What happens when a coupon makes a renewal total zero?

The order can be successfully completed without a positive payment, but current ArraySubs `_completed_payments` logic increments only when order total is greater than zero. That can delay payment-count-based length or different-renewal-price transitions even while the coupon cycle follows its own qualifying-success rule.

### 5. Does deleting a coupon stop its recurring discount?

Do not promise that result from the current manual alone. The inspected code stores coupon ID/value and later constructs coupon state in a way that makes deletion behavior ambiguous. Test trash/deletion/expiry on a staging subscription and document the verified revocation method before campaign launch.

## Visual ideas

1. **Coupon-cycle flowchart:** checkout capture → initial-count decision → renewal eligibility → discount fee → successful payment → decrement/stop.
2. **Contribution bar chart:** four worked-example payments with cumulative contribution crossing zero at payment two; label arithmetic scenario.
3. **Pie chart:** $120 gross list value across three discounted payments split into $90 collected and $30 discount; no gradients.
4. **Offer-sequence strip:** “Payment 1–3: $30; payment 4 onward: $40” with initial-count toggle variants.
5. **Controls shield:** Woo fields around a central coupon—expiry, email, products, usage, individual-use—flat iconography.
6. **Hybrid truth graphic:** captured value/type on left, live restriction checks on right.
7. **Human illustration:** merchant reviewing contribution and abuse-control dashboard with restrained blue, ochre, cream, and green.
8. **Interaction matrix:** coupon × trial × price step × plan switch × zero total × refund, with “test” cells highlighted.

## Internal-link suggestions

- Primary CTA: `/deals/arraysubs/pricing/`
- Coupons on the feature hub: `/deals/arraysubs/features/#products-checkout`
- Free-first-month coupon recipe: `/deals/arraysubs/use-cases/recipes/free-first-month-coupon/`
- Coupon promotion insights recipe: `/deals/arraysubs/use-cases/recipes/coupon-promo-insights/`
- Canonical retention-discount recipe, after route verification
- Different first and renewal prices: `/billing-strategy/different-first-and-renewal-prices-subscription-pricing-patterns/`
- Proration methods: `/billing-strategy/subscription-proration-methods-compared-charge-credit-or-defer/`
- Plan-change timing: `/billing-strategy/immediate-vs-next-renewal-plan-changes/`

Verify generated routes. The article should own economics and controls; recipes should own configuration.

## Primary and first-party sources

All sources accessed 2026-07-13.

- ArraySubs manual, Coupons: `../../user-manual/markdowns/coupons/README.md`
- ArraySubs annotated coupon screenshot: `../../user-manual/markdowns/coupons/README.ASSETS/01-recurring-coupon-edit-settings-annotated.png`
- ArraySubs Coupon Tracking hooks: `../../arraysubs/src/Features/CouponTracking/Services/Hooks.php`
- ArraySubs coupon edit UI: `../../arraysubs/src/resources/couponEditPage.js`
- ArraySubs different-price/payment counter interaction: `../../arraysubs/src/Features/Subscriptions/Services/OrderIntegration.php`
- WooCommerce, Managing Coupons: https://woocommerce.com/document/coupon-management/
- WooCommerce, Subscriptions Coupons: https://woocommerce.com/document/subscriptions/subscriptions-coupons/
- WooCommerce, Limited Subscription Payment Coupons: https://woocommerce.com/document/subscriptions/subscriptions-coupons/limited-payment-coupon-guide/
- WooCommerce, Subscription Switching with Coupons: https://woocommerce.com/document/subscriptions/switching-guide/subscription-switching-with-coupons/
- WooCommerce, Creating a Subscription Product: https://woocommerce.com/document/subscriptions/creating-subscription-products/

## Drafting cautions

- State exactly whether checkout counts and show the payment sequence.
- Distinguish captured discount value from live restriction checks.
- Do not promise unsupported gateways, deletion revocation, tax behavior, multiple recurring-coupon stacking, or native-coupon reporting.
- Treat WooCommerce Subscriptions behavior as an external example when it differs from ArraySubs.
- Use measured merchant costs and real author/reviewer identities; never invent benchmarks or credentials.

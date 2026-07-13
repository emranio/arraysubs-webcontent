# Research brief: Subscription Proration Methods Compared: Charge, Credit, or Defer

## Research record

- **Article:** A021
- **Research date / last verified:** 2026-07-13
- **Focus keyword:** `subscription proration methods`
- **Intent:** Help subscription operators choose what happens financially and operationally when a customer changes plans mid-cycle.
- **Evidence scope:** ArraySubs 1.8.9 source, current ArraySubs manual, and official WooCommerce Subscriptions documentation. No live checkout, tax, gateway, or coupon interaction test was run.
- **No invented benchmarks:** Numeric examples are arithmetic scenarios, not observed conversion, refund, or retention results.
- **Product guardrail:** ArraySubs currently exposes three global modes—**Prorate Immediately**, **Apply at Next Renewal**, and **No Proration**. Timing is global, not configurable separately for upgrades and downgrades.

## Direct-answer conclusion

> Use immediate proration when access should change now and the customer can settle the unused-value difference. Defer the switch when the current paid entitlement should remain intact through renewal. Use no proration only when charging the full replacement plan now is intentional. Define credits, failed payments, taxes, fees, and effective dates before launch.

## Editorial thesis

Proration is not merely a discount calculation. It decides four things that must stay aligned: the amount charged or credited, the date the new plan becomes effective, the next billing anchor, and what happens if payment fails. The article should compare complete state transitions, not only formulas.

## Key facts

- ArraySubs currently provides three global switch methods: immediate proration, apply at renewal, and no proration.
- Immediate switches are payment-gated: the plan changes only after the switch order is paid.
- A deferred request preserves the current product/access and applies the target after the target renewal succeeds.
- No proration currently means a full target-price charge now plus a new billing anchor, not a free mid-cycle switch.
- Downgrade surplus becomes internal subscription credit in current code; it is not automatically a cash refund.
- Current minimum-charge and rounding settings do not fully control the inspected plan-switch calculation.

## Definitions and comparison

| Method | Cash event at request | Entitlement timing | Billing anchor in current ArraySubs implementation | Main risk |
| --- | --- | --- | --- | --- |
| Prorate immediately | Net remaining-period charge; a downgrade difference can become an internal subscription credit | After the plan-switch order is paid | Same-cycle switch keeps the existing next date; cycle change resets it | Credit/refund language, tax and gateway behavior |
| Apply at next renewal | None at request; target price and any switch fee go on the next renewal | Only after the target renewal is paid | Existing renewal date | Customer expects new access too early or pending switch conflicts |
| No proration | Full target price plus any configured switch fee now | After the plan-switch order is paid | Resets to a new target-plan cycle from the switch | Customer may pay twice for overlapping service |

**Terminology:**

- **Credit:** unused value from the current plan used to reduce another charge. It is not automatically a cash refund.
- **Charge:** the new plan value due for the remaining service period or the full replacement plan, depending on policy.
- **Defer:** record a pending change and apply it at the next successful renewal rather than changing access now.
- **Billing anchor:** the date from which future renewals are scheduled.
- **Effective date:** the moment product, quantity, price, cadence, and related entitlement actually change.

## Verified ArraySubs behavior

### Current settings and classification

The admin UI labels are:

- `Prorate Immediately` (`prorate_immediately`)
- `Apply at Next Renewal` (`apply_at_renewal`)
- `No Proration` (`no_proration`)

The saved global setting is authoritative; a client cannot select another method in the request payload. Switching is available only for active or trial subscriptions. A pending cancellation blocks a switch. Upgrade, downgrade, and crossgrade permissions can be enabled separately.

ArraySubs classifies direction using normalized daily prices. Its current calculation approximates cycles as day `1`, week `7`, month `30`, and year `365`. Rates within 5% are classified as crossgrades. That classification controls permission and fee direction, but an immediate global proration setting still calculates a net amount for a crossgrade; do not state that all crossgrades are automatically free.

### Immediate proration formulas

For a same-cadence switch:

```text
current daily rate = current recurring price ÷ current cycle days
new daily rate = target recurring price ÷ target cycle days
unused current value = current daily rate × days remaining
remaining target value = new daily rate × days remaining
net due now = max(0, remaining target value − unused current value)
credit candidate = max(0, unused current value − remaining target value)
```

For a cadence change, current code charges the full target price, subtracts unused current value, and moves the next payment date forward by the target cadence.

The plan switch is not final at calculation time. Core creates a WooCommerce `plan_switch` order and expects the customer to complete the ordinary WooCommerce payment flow. Product/access changes after payment succeeds.

For a downgrade whose credit exceeds the new remaining-period charge, the calculator returns a `refund_amount`; the current plan manager stores that value in subscription meta `_store_credit` and reduces the immediate total to zero. This should be described as an **internal subscription credit**, not automatically as a gateway refund or the Pro store-wallet feature.

### Deferred switch behavior

ArraySubs stores one `_pending_switch`, including target product/variation, quantity, price, cadence, fee, and effective date. The current product and access stay unchanged. At the next invoice, the target product/price and the stored fee are used. Only after that invoice is paid does the subscription product and entitlement change.

An existing pending switch requires explicit replacement confirmation. Cancellation clears the pending switch. A failed or unpaid target renewal therefore leaves the old entitlement in place until normal lifecycle handling changes the subscription.

### No-proration behavior

Current code charges the full target price immediately, adds the applicable switch fee, sets the next payment to one target cycle from now, and changes the plan after the switch order succeeds. This is not “change now for free.” The article should use the full label **full-price replacement with a new anchor** when explaining the practical effect.

## Worked arithmetic scenario — not a benchmark

Assume a 30-day month, 15 days remaining, quantity one, no fee, tax, coupon, shipping, refund, gateway fee, or rounding complication.

### Upgrade from $30 to $60 per month

```text
unused current value = ($30 ÷ 30) × 15 = $15
remaining target value = ($60 ÷ 30) × 15 = $30
immediate net due = $30 − $15 = $15
```

| Method | Due now | Plan/access now | Next scheduled plan charge |
| --- | ---: | --- | ---: |
| Prorate immediately | $15 | Target after payment succeeds | $60 on existing renewal date |
| Apply at renewal | $0 | Current remains | $60 on existing renewal date; switch after payment |
| No proration | $60 | Target after payment succeeds | $60 one target cycle from switch |

### Downgrade from $60 to $30 per month

```text
unused current value = ($60 ÷ 30) × 15 = $30
remaining target value = ($30 ÷ 30) × 15 = $15
credit candidate = $30 − $15 = $15
immediate amount due = $0
```

The immediate method records a $15 internal credit in current code. The deferred method keeps the $60-plan access until renewal and then bills $30. No proration bills the full $30 now and starts a new month. None of these arithmetic results determines whether local law or merchant terms require a cash refund.

## Decision framework

Choose **immediate proration** when all are true:

- the new entitlement should begin now;
- the gateway/payment flow can settle the switch reliably;
- credit and refund wording is explicit;
- tax, fee, shipping, coupon, and rounding behavior has been tested;
- support can explain both the amount and the next renewal date.

Choose **apply at renewal** when:

- the buyer should use the service already paid for;
- access tiers should not overlap;
- a downgrade should not create a refund or internal balance now;
- operational simplicity matters more than instant access;
- failed-renewal behavior is understood.

Choose **no proration** only when:

- the target plan is a clean replacement beginning now;
- the customer sees and accepts the full amount before payment;
- moving the billing anchor is intentional;
- double-payment/overlap complaints are addressed by policy.

## Limitations, unknowns, and truth-gate issues

1. **Configured minimum charge is not enforced by the current calculator.** The settings UI saves `proration.minimum_charge`, but `ProrationCalculator` does not read it. Do not claim the control protects small switch orders until code or live behavior changes.
2. **Configured rounding does not currently drive plan-switch math.** The UI exposes a rounding choice, but the switch calculator hardcodes two-decimal rounding. The setting is used elsewhere for cancellation refund calculations.
3. **Cycle lengths are approximations.** Month is 30 days and year 365 days; actual calendar-day allocation is not used.
4. **Elapsed-time basis deserves disclosure.** Current calculation derives remaining days from its stored-payment/date path and approximate cycle, so end-of-month and irregular histories need live tests.
5. **Tax and shipping are not concluded here.** The switch fee/order implementation does not make every jurisdictional or tax-class result obvious. Test representative products and tax configurations.
6. **Coupon interaction is not explicitly modeled in the immediate proration calculator.** Test fixed/percent recurring coupons and zero-total results.
7. **Target product pricing phases may not transfer consistently.** Immediate product update does not clearly copy a target product's trial, signup fee, or different-renewal-price schedule. Deferred application explicitly clears old different-renewal-price metadata but does not copy the target schedule. Treat this as unsupported until fixed/tested.
8. **Global timing cannot express “upgrades now, downgrades later.”** That common policy needs customization or an implementation change today.
9. **No live gateway matrix was run.** Manual payment, Stripe, PayPal, Paddle, 3-D Secure, and failed-payment recovery should not be generalized from source inspection.

## Five FAQ answers

### 1. What is subscription proration?

Subscription proration allocates old-plan and new-plan value across the remaining portion of a billing period. A complete proration policy also defines when access changes, what happens to the next renewal date, whether excess value is a credit or refund, and what happens if the adjustment payment fails.

### 2. Should an upgrade be immediate or deferred?

Immediate is usually easier to justify when the buyer needs higher-tier access now and can see the net charge before paying. Deferred is safer when entitlements should change only at a clean billing boundary. ArraySubs currently uses one global timing mode, so it cannot natively make upgrades immediate and downgrades deferred.

### 3. Does a downgrade credit have to be refunded in cash?

The calculation does not decide the legal or policy answer. Current ArraySubs code can store the excess as an internal subscription credit. Whether a merchant must issue a gateway refund depends on disclosed terms, consumer law, product delivery, jurisdiction, and the merchant's refund policy; obtain qualified advice.

### 4. Does “no proration” mean no immediate payment?

No. In current ArraySubs plan switching, no proration charges the full target recurring price now, applies the switch after payment, resets the next payment from the switch date, and can add a switch fee. Use “full-price replacement” in customer copy to avoid ambiguity.

### 5. What happens when a deferred switch renewal fails?

The target product is placed on the next invoice, but the actual subscription product and access switch only after that order is paid. An unpaid renewal therefore does not grant the target entitlement. Normal retry, on-hold, cancellation, and access rules still need to be defined and tested.

## Visual ideas

1. **Three-lane flat flowchart:** request → quote/record → payment boundary → entitlement change → next billing anchor for immediate, deferred, and no-proration paths. Use neutral blue, slate, cream, and muted green; no gradients.
2. **100% stacked bar:** 15 used days and 15 remaining days, with old unused value and target remaining value labeled in dollars.
3. **Comparison table graphic:** due now, effective date, next charge, credit handling, failed-payment result.
4. **Decision tree:** “Need new access now?” → “Can customer settle adjustment?” → “Preserve anchor?” → recommended method.
5. **Human-support illustration:** customer and support operator reviewing a plain invoice timeline, with labeled charge/credit chips.
6. **Formula card:** old unused value, target remaining value, net due; explicitly stamp “illustrative arithmetic.”

## Internal-link suggestions

- Primary CTA: `/deals/arraysubs/pricing/`
- Switch at renewal recipe: `/deals/arraysubs/use-cases/recipes/switch-at-renewal/`
- Downgrade with credit recipe: `/deals/arraysubs/use-cases/recipes/downgrade-with-credit/`
- Subscription notes/timeline recipe: `/deals/arraysubs/use-cases/recipes/subscription-notes-timeline/`
- Upgrade tiers recipe: `/deals/arraysubs/use-cases/recipes/upgrade-path-tiers/`
- Crossgrade recipe: `/deals/arraysubs/use-cases/recipes/crossgrade-lateral/`
- Companion strategy article: `/deals/arraysubs/resources/billing-strategy/immediate-vs-next-renewal-plan-changes/`
- Cancellation comparison: `/deals/arraysubs/resources/billing-strategy/immediate-cancellation-vs-cancel-at-period-end/`

Do not reproduce the recipe's click-by-click setup. The article owns decision policy and arithmetic; recipes own configuration.

## Primary and first-party sources

All sources accessed 2026-07-13.

- ArraySubs manual, Plan Switching and Relationships: `../../user-manual/markdowns/subscription-products/plan-switching-and-relationships.md`
- ArraySubs annotated settings screenshot: `../../user-manual/markdowns/subscription-products/plan-switching.ASSETS/05-plan-switching-settings-annotated.png`
- ArraySubs current calculation: `../../arraysubs/src/Features/PlanSwitching/Services/ProrationCalculator.php`
- ArraySubs switch REST contract: `../../arraysubs/src/Features/PlanSwitching/REST/SwitchController.php`
- ArraySubs switch application: `../../arraysubs/src/Features/PlanSwitching/Services/PlanManager.php`
- ArraySubs pending-switch helpers: `../../arraysubs/src/functions/pending-switch-helpers.php`
- ArraySubs settings UI: `../../arraysubs/src/resources/pages/Settings/PlanSwitchingSettings.jsx`
- WooCommerce, Switching Process and Costs: https://woocommerce.com/document/subscriptions/switching-guide/switching-process-and-costs/
- WooCommerce, Subscription Switching Guide: https://woocommerce.com/document/subscriptions/switching-guide/
- WooCommerce, Subscription Renewal Process: https://woocommerce.com/document/subscriptions/renewal-process/
- WooCommerce, Subscription Switching with Coupons: https://woocommerce.com/document/subscriptions/switching-guide/subscription-switching-with-coupons/

## Drafting cautions

- Attribute ArraySubs-specific formulas and state transitions to current ArraySubs behavior; do not imply they are universal WooCommerce rules.
- Do not equate an internal credit with cash, a wallet balance, or a legally sufficient refund.
- Do not promise configured minimum-charge or rounding behavior until the implementation matches the UI.
- Name the author and reviewer only from real publication records; do not invent credentials.
- Include published/updated dates and cite the product manual plus official WooCommerce sources near factual claims.

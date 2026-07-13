# Research brief: How Taxes and Shipping Behave on Subscription Renewals

## Research record

- **Article:** A028
- **Research date / last verified:** 2026-07-13
- **Focus keyword:** `WooCommerce subscription renewal tax shipping`
- **Intent:** Practical guide for merchants reconciling an initial checkout with later renewal orders.
- **Evidence scope:** Current official WooCommerce documentation; ArraySubs 1.8.9 and ArraySubs Pro 1.1.0 source; current ArraySubs user-manual copy and screenshots.
- **Legal guardrail:** This can explain software behavior and reconciliation controls, but it is not tax, VAT, GST, accounting, or legal advice. The published article must tell merchants to confirm obligations with a qualified adviser.
- **No live checkout was run.** ArraySubs findings below come from current local source/manual inspection, not end-to-end browser verification.

## Direct-answer conclusion

> A subscription renewal is a new order, not a copy of the original checkout total. Its charge can combine the subscription's stored recurring price, recurring shipping policy, current subscription address, discounts or switch fees, and WooCommerce tax calculation. Reconcile each component separately, and test automatic and manual renewals before changing live tax or shipping rules.

This is 57 words. It answers the behavior question without claiming that every subscriptions plugin recalculates the same components.

## Editorial thesis

The article should teach readers to separate five values that are commonly collapsed into “the renewal price”:

1. locked recurring product amount;
2. renewal shipping amount and shipping type;
3. taxable address and tax configuration;
4. renewal-specific discounts or fees;
5. the final order total recorded for that cycle.

It must distinguish **WooCommerce Subscriptions' documented behavior** from **current ArraySubs behavior**. Woo's documentation says automatic renewals reuse recurring tax line items from the subscription and manual renewal checkout recalculates tax; current ArraySubs builds a WooCommerce order from stored subscription data and calls `calculate_totals()`. Those are different engines and should not be presented as interchangeable.

## Initial order versus ArraySubs renewal order

| Component | Initial checkout | Current ArraySubs renewal | Reconciliation question |
| --- | --- | --- | --- |
| Product price | Checkout price plus any signup fee or first-charge logic | Stored `_recurring_amount × quantity`; a configured different-renewal price can take over after its threshold | Was the amount intentionally locked or changed by a plan switch? |
| Signup fee | Can apply at signup | Not copied into the renewal order | Is a supposed “difference” merely the one-time signup fee? |
| Product catalog price | Used to establish the subscription at checkout | Existing subscription is insulated from later catalog price changes; current product price is only a last-resort fallback | Did someone expect a catalog price edit to reprice existing subscribers? |
| Shipping | WooCommerce checkout shipping, possibly replaced by a product initial-shipping override | No line for one-time shipping; otherwise stored renewal shipping, falling back to stored initial shipping | Is the product marked recurring or one-time shipping, and what amount was stored? |
| Address | Checkout billing/shipping address | Current JSON address stored on the subscription is copied to the renewal order | Was the subscription address updated before its cutoff? |
| Tax | WooCommerce checkout calculation | WooCommerce `calculate_totals()` runs after product, address, shipping, and fee lines are added | Which address basis, rate table, product tax class, and shipping tax class were active? |
| Ordinary checkout coupon | Can discount the initial order | Current `OrderCreation` does not copy checkout coupon lines | Was a coupon promised as recurring, or only applied at signup? |
| Retention discount | Not normally present at signup | Active ArraySubs retention discount is added as a non-taxable negative fee and totals are recalculated | How many discounted renewal cycles remain? |
| Pending plan switch fee | Not applicable | A captured one-time switch fee can be added to the renewal using the target plan price | Was a deferred switch scheduled for this renewal? |
| Refund | May reduce the historical initial order | Does not rewrite the next renewal by itself | Was a refund intended as a past-order adjustment, credit, cancellation, or future-price change? |

### Current ArraySubs renewal formula

For a normal renewal with one product line:

```text
Product subtotal = effective stored unit price × subscription quantity

Pre-tax renewal amount
= product subtotal
+ recurring shipping, if applicable
+ one-time switch fee, if a deferred switch is applied
− active retention discount

Renewal total
= pre-tax renewal amount
+ product tax calculated by WooCommerce
+ shipping/fee tax calculated by WooCommerce where those lines are taxable
```

Important source-level qualifications:

- ArraySubs locks the recurring product price at subscription creation. A later catalog price change does not automatically change an existing subscription.
- A pending switch replaces the product/variation and effective recurring price for that renewal order; the subscription itself is finalized only after payment.
- The retention discount fee has `tax_status = none`, so do not assume it reduces taxable value in every jurisdiction or tax configuration. The article should tell merchants to validate the actual order tax lines and obtain tax advice.
- The standard renewal builder does not copy coupon items from the original order. Do not promise that an ordinary WooCommerce coupon will continue unless a current, tested recurring-discount path explicitly does so.

## Worked reconciliation example

This is an arithmetic illustration, not observed store data or tax advice.

Assume an existing monthly subscription has:

- stored recurring unit price: `$40.00`;
- quantity: `2`;
- recurring renewal shipping: `$8.00`;
- active 10% ArraySubs retention discount, calculated on product subtotal;
- illustrative 7.5% product tax and 7.5% shipping tax;
- no switch fee.

```text
Product subtotal = $40.00 × 2 = $80.00
Retention discount = $80.00 × 10% = $8.00
Shipping = $8.00
Illustrative taxable base = $80.00 + $8.00 = $88.00
Illustrative tax = $88.00 × 7.5% = $6.60
Renewal total = $80.00 + $8.00 − $8.00 + $6.60 = $86.60
```

Because the current retention discount is a non-taxable negative fee added after the first totals calculation, the real WooCommerce tax result may not match a jurisdiction that expects the discount to reduce taxable consideration. The example is useful specifically to teach readers to inspect line taxes rather than reverse-engineer the total with one percentage.

### Difference decomposition

Use this extractable reconciliation formula:

```text
Renewal − initial total
= removed signup fee
+ recurring-price change or locked-price difference
+ renewal-shipping change
+ address/rate/tax-class change
+ renewal-only fees
− renewal-only discounts
− initial-only coupons
```

Do not include historical refunds in this arithmetic unless they were explicitly converted into a credit or future-order adjustment.

## Tax behavior: facts and guardrails

### WooCommerce tax configuration

WooCommerce can calculate tax based on the customer shipping address, customer billing address, or shop base address. It also has a separate shipping tax-class setting. Tax results therefore depend on at least:

- the configured address basis;
- complete billing/shipping location fields;
- the product's tax status and class;
- matching tax-table rows, priorities, compound flags, and shipping eligibility;
- whether prices are entered inclusive or exclusive of tax;
- rounding and display settings;
- external tax extensions or Merchant-of-Record behavior.

Woo's official tax guide explicitly limits itself to software configuration, not the legal question of when tax must be charged. The article should preserve that disclaimer.

### ArraySubs-specific path

Current `OrderCreation`:

1. creates a pending WooCommerce order;
2. creates the product item at the stored recurring amount;
3. copies current subscription billing and shipping addresses;
4. adds eligible stored renewal shipping;
5. calls `$order->calculate_totals()`;
6. applies an active retention discount and recalculates, if relevant;
7. stores renewal metadata and payment context.

This supports the inference that current WooCommerce tax configuration and the copied subscription address participate in calculation. It does **not** prove every third-party automated-tax extension or Merchant-of-Record gateway behaves identically; test the installed stack.

### Address changes

ArraySubs Pro lets the customer or admin update the address stored on the subscription. The current default customer cutoff is three days before renewal; admins use a separate admin endpoint without that customer cutoff check. The next renewal order copies the then-current subscription address.

An address update does not recalculate the stored renewal shipping amount. This is an important limitation: a new address can affect tax calculation while the recurring shipping line remains the captured amount unless another workflow updates that shipping data.

## Shipping behavior: current ArraySubs truth

| Shipping setting/state | Renewal result |
| --- | --- |
| Product does not need shipping / subscription `_arraysubs_needs_shipping` is not `yes` | No renewal shipping line |
| Shipping type `one-time` | Shipping applies only to the initial order; renewal builder returns without adding a shipping line |
| Shipping type `recurring` | Renewal builder adds stored renewal shipping when the amount is greater than zero |
| Renewal override supplied | Captured as the stored renewal shipping total |
| No renewal override | Captured initial checkout shipping becomes the renewal amount |
| Missing renewal total later | Renewal builder falls back to stored initial shipping total |
| Amount is zero | No renewal shipping line is added |
| Deferred plan switch | Pro can filter the shipping context so the target plan's shipping policy/amount applies |

The current implementation stores a renewal shipping amount at subscription creation. It does not ask WooCommerce to quote a fresh shipping rate for every automatic renewal. This must be stated clearly because “leave the override blank” means “capture the initial WooCommerce shipping result for future renewal use,” not “live-recalculate every future rate.”

## Coupons, refunds, and product changes

### Coupons

- WooCommerce Subscriptions documentation distinguishes manual renewal checkout coupons from recurring coupons on automatic renewals.
- Current ArraySubs renewal creation has no general original-coupon-copy step.
- ArraySubs does have its own active retention-discount state, applied as a negative fee for a limited number of renewal cycles.
- Therefore, the article should say: verify the exact coupon/discount mechanism, eligibility window, tax treatment, and renewal-order line item. Never infer recurrence from the initial order's discount.

### Refunds and credits

A refund changes a past order. It should not be described as automatically reducing a future renewal. If a merchant wants future relief, they need an explicit supported mechanism: a retention discount, store credit, a plan/price change, or cancellation/refund policy. Reconcile the refund order and renewal order separately.

### Product and price changes

- Later catalog price edits do not reprice current ArraySubs subscriptions.
- Direct subscription product/amount edits can change future behavior, but must be audited and tested.
- A deferred plan switch intentionally uses the target plan and captured target price on the next renewal order, then updates the subscription after payment.
- Physical-product changes may also change shipping eligibility/context. Test a full renewal, not only the admin display.

## Test and reconciliation checklist

1. Clone the product and use a test customer/gateway; do not experiment on a live subscriber first.
2. Record the subscription ID, parent order, current recurring price, quantity, next payment date, address, tax class, shipping type, stored initial shipping, and stored renewal shipping.
3. Confirm the WooCommerce tax basis and relevant tax/shipping classes.
4. Generate a renewal and open the actual WooCommerce order.
5. Compare product subtotal, shipping line, fee/discount lines, item tax, shipping tax, and grand total individually.
6. Run both automatic and manual renewal paths when the store supports both.
7. Change the subscription address in a second test, outside the cutoff, and verify both the copied address and tax result.
8. Test a one-time-shipping product and confirm the renewal contains no shipping line.
9. Test an active retention discount or deferred switch separately; do not change multiple variables in one run.
10. Review ArraySubs subscription notes, related order history, and scheduled-job logs.
11. Reconcile gateway transaction amount to the WooCommerce renewal order.
12. Save evidence and get tax/accounting sign-off before changing production rules.

## Limitations and unknowns

- No browser test confirmed the current UI or a live tax-provider response.
- WooCommerce core tax calculation is extensible. Installed tax, currency, checkout, and Merchant-of-Record integrations can alter outcomes.
- Current ArraySubs Pro address changes do not visibly recalculate stored renewal shipping in the inspected path.
- Tax treatment of the non-taxable retention-discount fee requires jurisdiction-specific review.
- The inspected renewal builder does not provide a generic recurring-coupon copy mechanism.
- ArraySubs shipping is Pro; core can still create renewal orders, but the Pro shipping capture/address tooling described here requires Pro.
- Source comments are not treated as proof where executable behavior differs; current executable paths are the product-truth basis.

## FAQ answers

### Are taxes always the same on every renewal?

No. The result depends on the subscription engine and tax stack. Current ArraySubs builds a new WooCommerce order, copies current subscription addresses, and calculates totals. A changed address, tax configuration, product tax class, or extension can change tax. WooCommerce Subscriptions documents different automatic-versus-manual tax behavior, so do not generalize between plugins.

### Does changing the shipping address update the renewal shipping price?

Not in the current ArraySubs path inspected. The new subscription address is copied to the renewal order and can affect tax, but renewal shipping is a stored amount captured from the initial checkout or an override. Test and explicitly update the shipping policy/amount when a new zone should cost differently.

### What is the difference between one-time and recurring shipping?

One-time shipping is charged only on the initial order. Recurring shipping is stored on the subscription and added to every eligible renewal order. In ArraySubs Pro, if no renewal override is configured, the captured initial shipping amount becomes the renewal amount.

### Will a checkout coupon automatically discount ArraySubs renewals?

Do not assume so. Current renewal creation does not copy ordinary coupon items from the original order. ArraySubs retention discounts are a separate limited-cycle mechanism. Confirm the actual renewal order line and tax treatment for any discount promise.

### Does refunding the last order lower the next renewal?

Not by itself. A refund adjusts a historical order. A future renewal changes only through a supported future-facing mechanism such as a discount, credit, product/plan update, or cancellation policy.

## Visual ideas

1. **Flowchart:** subscription record → renewal order builder → address/shipping lines → Woo tax calculation → discounts/fees → gateway charge → order reconciliation.
2. **Stacked-bar comparison:** initial checkout versus renewal, with product, signup fee, shipping, discount, and tax segments. Label values as a worked illustration.
3. **Decision tree:** Does it need shipping? → one-time/recurring → stored amount available? → add/omit renewal shipping.
4. **Reconciliation table:** original component, renewal component, expected reason, evidence location.
5. **Annotated product screenshot:** `user-manual/markdowns/subscription-shipping/README.ASSETS/01-product-shipping-settings-annotated.png`.
6. **Annotated renewal/admin screenshot:** `user-manual/markdowns/subscription-shipping/README.ASSETS/03-admin-subscription-shipping-card-annotated.png`.
7. **Annotated customer address screenshot:** `user-manual/markdowns/subscription-shipping/README.ASSETS/05-shipping-address-modal-annotated.png`.

Keep graphics flat, restrained, and data-led. Do not invent performance statistics.

## Internal-link suggestions

- Commercial hub: `/deals/arraysubs/features/#subscription-operations`
- Recipe: `/recipes/arraysubs/switch-at-renewal/`
- Recipe: `/recipes/arraysubs/downgrade-with-credit/`
- Recipe: `/recipes/arraysubs/subscription-notes-timeline/`
- Related article A027: link to the published slug from the content plan after it exists.
- Related article A029: `/blogs/changing-a-subscription-renewal-date-safely/`
- Related article A030: `/blogs/multiple-subscriptions-per-customer-policy-cart-and-billing-tradeoffs/`
- User-manual contextual link: subscription shipping overview when a public manual URL exists.

## Product-truth files inspected

- `arraysubs/src/Features/RecurringBilling/Services/OrderCreation.php`
- `arraysubs/src/Features/SubscriptionCheckout/Services/Traits/SubscriptionCreationTrait.php`
- `arraysubs/src/Features/CancellationFlow/Services/RetentionOfferProcessor.php`
- `arraysubspro/src/Features/SubscriptionShipping/Services/ShippingCalculator.php`
- `arraysubspro/src/Features/SubscriptionShipping/Services/AddressManager.php`
- `arraysubspro/src/Features/SubscriptionShipping/Services/Hooks.php`
- `user-manual/markdowns/subscription-shipping/README.md`
- `user-manual/markdowns/subscription-shipping/README.ASSETS/01-product-shipping-settings-annotated.png`
- `user-manual/markdowns/subscription-shipping/README.ASSETS/03-admin-subscription-shipping-card-annotated.png`
- `user-manual/markdowns/subscription-shipping/README.ASSETS/05-shipping-address-modal-annotated.png`

## Official external sources

All URLs accessed 2026-07-13.

- WooCommerce, **Subscription Renewal Process**: https://woocommerce.com/document/subscriptions/renewal-process/
- WooCommerce, **Creating a Subscription Product**: https://woocommerce.com/document/subscriptions/creating-subscription-products/
- WooCommerce, **Setting up taxes in WooCommerce**: https://woocommerce.com/document/setting-up-taxes-in-woocommerce/
- WooCommerce, **Manually Add or Import a Subscription**: https://woocommerce.com/document/subscriptions/add-or-modify-a-subscription/
- WooCommerce, **Edit an Existing Subscription**: https://woocommerce.com/document/subscriptions/add-or-modify-a-subscription/update-an-existing-subscription/
- WooCommerce, **Subscriptions data structures and storage**: https://woocommerce.com/document/subscriptions/develop/data-structure/

## Drafting guardrails

- Lead with the direct answer, then immediately separate ArraySubs from WooCommerce Subscriptions behavior.
- Use “stored renewal shipping amount,” not “live shipping quote,” for current ArraySubs.
- Do not claim tax correctness or legal compliance; explain software inputs and recommend professional review.
- Do not promise recurring ordinary coupons.
- Keep the formula labeled as a reconciliation model, not an invoice engine specification for every store.

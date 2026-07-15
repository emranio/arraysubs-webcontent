# Research brief: Subscription Terms Customers Must See Before They Pay (A013)

**Research date:** 2026-07-13  
**Focus keyword:** `subscription terms on product page`  
**Scope:** Current primary regulator, card-network, accessibility, WooCommerce, and ArraySubs evidence. General information only; not legal advice.

## Direct answer

Before payment, show the complete recurring promise in plain language: the amount due today, recurring amount and cadence, first and later charge timing, trial or introductory terms, minimum or fixed term, automatic-renewal rule, cancellation method and timing, refunds, shipping, tax, and what access or fulfillment changes after cancellation. Obtain an affirmative action and preserve evidence of the terms accepted.

## Current US federal status

Do **not** publish the 2024 FTC Click-to-Cancel amendment as current law. The FTC's March 2026 Advance Notice of Proposed Rulemaking states that the Eighth Circuit vacated the amended rule on July 8, 2025. The prior 1973 Negative Option Rule was reinstated and directly covers prenotification plans, while the FTC is considering new provisions.

For online negative-option offers, current FTC ROSCA guidance—updated December 2, 2025—states three baseline duties: clearly disclose all material terms before obtaining billing information, obtain express informed consent before charging, and provide simple mechanisms to stop recurring charges. The FTC Act, ROSCA, state rules, product-specific law, card-network rules, and orders can all apply. Require jurisdiction-specific counsel.

Primary sources:

- FTC 2026 ANPRM and vacatur history: https://www.ftc.gov/system/files/ftc_gov/pdf/p064202negativeoptionruleanprm.pdf
- FTC ROSCA recap, updated December 2, 2025: https://www.ftc.gov/business-guidance/blog/2018/07/time-rosca-recap-ftc-says-risk-free-trial-was-risky-not-free
- FTC dark-pattern staff report: https://www.ftc.gov/system/files/ftc_gov/pdf/P214800%20Dark%20Patterns%20Report%209.14.2022%20-%20FINAL.pdf

## Card-network boundary

Visa's published subscription/trial material requires clear enrollment and ongoing-transaction information and an easy cancellation mechanism for relevant merchants. It also discusses evidence that the cardholder expressly agreed to future transactions and was notified before post-trial charges. This is Visa material, not universal law; confirm current network/acquirer/gateway rules.

- Visa subscription merchant policy: https://usa.visa.com/dam/VCOM/global/support-legal/documents/subscription-merchants-visa-public.pdf

## The pre-payment checklist

| Term | What the customer needs to know |
| --- | --- |
| Product and entitlement | Exact goods, service, access, quantity, seats/sites/devices, and exclusions |
| Due today | Product, first recurring amount, sign-up fee, shipping, tax, deposit, and discount |
| Recurring amount | Exact future price or a clear variable-price rule |
| Cadence and next charge | Billing interval, first future charge date or calculation rule, and renewal timing |
| Trial/intro period | What is free/discounted, card requirement, end, next price, reminder, missing-payment outcome |
| Duration/end | Evergreen, payment count, fixed date, prepaid term, or lifetime scope |
| Automatic renewal | That charges continue unless stopped and what action prevents the next charge |
| Cancellation | Method, deadline, effective date, paid-through access/fulfillment, and any valid fee |
| Refund/return | Eligibility, timing, method, partial/full treatment, and effect on access/subscription |
| Shipping/fulfillment | Initial versus recurring shipping, delivery cadence, stockout/substitution, address changes |
| Tax/currency | Tax display, currency, and variable location-based charges |
| Changes | Price/term-change notice, customer choice, and grandfathered scope |
| Proof/account | Receipt, confirmation email, My Account terms/status, and support contact |

## Placement chain

1. **Product/plan page:** value, complete price/cadence, trial, duration, automatic renewal, and a short cancellation/refund summary.
2. **Cart:** selected product/variation, quantity, due-today lines, recurring schedule, shipping, discounts, fee, and term.
3. **Checkout near the order action:** complete renewal promise and required affirmative consent. Do not rely only on a footer link.
4. **Confirmation/receipt:** timestamped commercial summary, next charge, cancellation route, and policy links.
5. **Customer account:** current status, next payment, price/cadence, end/paid-through date, payment method, and available actions.
6. **Email/reminders:** trial end, material price/term changes, upcoming annual/required renewal notices, payment failures, cancellation, and expiration as applicable.

The same facts should remain consistent across every surface. A concise summary can link to full terms, but a link must not hide the material recurring promise.

## Consent and evidence model

Use a non-preselected checkbox or other affirmative control when appropriate for the applicable rules. The label should summarize the recurring feature next to the control. Keep it keyboard operable, programmatically labeled, readable at zoom, and error-described in text.

Evidence should preserve:

- customer/user and order/subscription identifiers;
- product/variation and selected plan;
- due-today and future amount/cadence;
- trial, fee, duration, shipping, cancellation, and refund summary;
- accepted policy/version identifier or immutable content hash/snapshot;
- timestamp, locale/currency, and relevant request/session evidence;
- confirmation sent and later term-change notices.

Do not log full payment credentials. Data retention and privacy require their own review.

W3C form guidance recommends explicit labels, grouped controls, instructions, validation, and notifications; detected errors must be identified in text.

- W3C Forms Tutorial: https://www.w3.org/WAI/tutorials/forms/
- WCAG Error Identification: https://www.w3.org/WAI/WCAG22/Understanding/error-identification

## WooCommerce and ArraySubs truth

WooCommerce product, subscription, refund, shipping, tax, and gateway behavior is configuration-sensitive. Use current official product and refund documentation and test the actual classic/block checkout, gateway, currency, tax, coupon, trial, and renewal path.

- Woo subscription products: https://woocommerce.com/document/subscriptions/creating-subscription-products/
- Woo refunds: https://woocommerce.com/document/woocommerce-refunds/
- Woo subscriptions status: https://woocommerce.com/document/subscriptions/statuses/

ArraySubs currently displays product/variation schedule, sign-up fee, trial, duration, due-today, and renewal summaries and copies commercial fields into the managed subscription. Current checkout validates/locks billing data server-side rather than trusting the browser.

However, core 1.8.9 has no dedicated immutable subscription-consent/policy-version record. ArraySubs Pro Checkout Builder can require a checkout checkbox and stores a boolean result, but that is not an immutable snapshot of the exact policy or commercial summary accepted. Stores with a legal/audit requirement for versioned consent evidence need an additional records design and qualified review. Do not claim ArraySubs alone proves legal compliance.

## Five FAQ answers

### What subscription terms should appear before checkout?

At minimum: due-today amount, future amount and cadence, first renewal timing, trial/intro terms, duration or automatic renewal, cancellation, refunds, shipping, tax, and the exact entitlement.

### Is a Terms and Conditions link enough?

Not by itself for material recurring terms. Put the commercial summary where the customer makes the purchase decision and keep the full policy accessible through a clearly named link.

### Should the subscription consent checkbox be preselected?

Avoid preselection when affirmative recurring consent is required or appropriate. Use a clear label next to the control and verify the applicable jurisdiction, network, and product rules.

### What consent evidence should a WooCommerce store keep?

Preserve the order/subscription, commercial summary, selected plan, policy version or immutable snapshot/hash, timestamp, locale/currency, and confirmation record under a reviewed retention policy.

### Does ArraySubs store a complete legal consent record?

Not by itself in the current reviewed source. It stores subscription commercial fields and can store a required Pro checkout-checkbox boolean, but no dedicated immutable policy snapshot/version was verified.

## Limitations and editorial guardrails

- General information, not legal advice.
- The 2024 FTC Click-to-Cancel amendment was vacated; do not present it as current settled law.
- Federal, state, international, card-network, gateway, tax, and product rules change.
- A checkbox is not a substitute for clear and conspicuous terms or a working cancellation flow.
- No plugin or schema markup certifies compliance.
- ArraySubs source was reviewed; no legal audit or complete live gateway/consent-record test was run.
- Publish a last-verified date and refresh after regulatory, card-network, WooCommerce, or ArraySubs changes.

## Visual plan

1. Hero: product → cart → consent → confirmation → account evidence chain.
2. Deterministic five-stage disclosure flowchart.
3. Checklist score bars based on count of required term groups, clearly labeled as a template rather than performance.
4. Three-card model: understandable, prominent, provable.
5. Consent-record anatomy diagram with policy version/hash, timestamp, plan, price, and order identifiers.
6. Cross-surface consistency matrix for product, cart, checkout, email, and account.


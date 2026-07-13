---
title: "Subscription Terms Customers Must See Before They Pay"
meta_description: "Use this WooCommerce subscription disclosure checklist for price, renewal, trial, cancellation, refunds, shipping, tax, consent, and evidence."
focus_keyword: "subscription terms on product page"
published: "2026-07-13"
updated: "2026-07-13"
last_verified: "2026-07-13"
author: "Emran"
author_affiliation: "ArrayHash"
reviewer: "ArraySubs Engineering Team"
---

# Subscription Terms Customers Must See Before They Pay

Before payment, show the complete recurring promise in plain language: amount due today, recurring amount and cadence, charge timing, trial or introductory terms, duration, automatic renewal, cancellation method and timing, refunds, shipping, tax, and what access or fulfillment changes after cancellation. Obtain an affirmative action and preserve evidence of the terms accepted.

The customer should not need to assemble the commercial promise from a price badge, tooltip, footer link, and policy page. Use one consistent evidence chain from product page through account area.

> **Key takeaways**
>
> - Put material recurring terms before billing information and beside the purchase decision.
> - Show due today and future charges separately, including fees, shipping, and tax treatment.
> - A Terms and Conditions link supports the summary; it should not hide it.
> - Consent needs a clear affirmative action and an accessible error path.
> - Preserve the exact commercial summary or policy version accepted—not only a boolean checkbox.
> - The FTC's 2024 Click-to-Cancel amendment was vacated in July 2025; verify current law by jurisdiction.

## The complete pre-payment checklist

| Term | What the customer needs to know |
| --- | --- |
| Product and entitlement | Exact goods, service, access, quantity, seats/sites/devices, and exclusions |
| Due today | Product, first period, sign-up fee, shipping, tax, deposit, and discount |
| Recurring amount | Exact future price or a clear variable-price rule |
| Cadence and next charge | Interval, first future charge date or rule, and renewal timing |
| Trial or introduction | What is free/discounted, card rule, end, next price, and missing-payment outcome |
| Duration or end | Evergreen, payment count, fixed date, prepaid term, or lifetime scope |
| Automatic renewal | That charges continue unless stopped and what prevents the next charge |
| Cancellation | Method, deadline, effective date, paid-through access, and any valid fee |
| Refund or return | Eligibility, timing, method, partial/full treatment, and subscription/access effect |
| Shipping or fulfillment | Initial versus recurring shipping, delivery cadence, stockout, substitution, address changes |
| Tax and currency | Currency, tax display, and charges that vary by location |
| Changes | Price/term-change notice, customer choice, and grandfathered scope |
| Proof and account | Receipt, confirmation, account status/terms, and support contact |

This is a checklist, not a universal legal form. The exact material terms depend on product, payment method, country/state, customer type, and contract.

![Disclosure flow from product offer through customer account.](/blogs/subscription-terms-customers-must-see-before-they-pay/decision-flow.svg)

## Plain-language billing disclosure

Use an order summary that answers three different questions:

1. **What is charged now?** Include the first recurring amount, one-time fee, shipping, tax, and discounts.
2. **What can be charged later?** Include amount, cadence, first date or calculation rule, and any variable-price basis.
3. **What action stops it?** Include the method, deadline relative to renewal, and paid-through effect.

Example:

> **$40 due today. Renews at $40 every month, with the next charge on August 13, 2026. Cancel future renewals from My Account before the next charge. Access continues through the paid-through date. Refunds follow the linked policy. Tax and recurring shipping are shown in the order review.**

When a price changes after an introductory period, show both phases. When annual pricing is displayed as “$25/month,” keep “$300 billed annually” more prominent. When a free trial has a $20 setup fee, say “$20 due today,” not simply “free.”

![Illustrative completeness bars for term groups that need review.](/blogs/subscription-terms-customers-must-see-before-they-pay/worked-model-bars.svg)

*Template counts, not compliance scores or observed customer data.*

## Trials and introductory prices

State:

- evaluation start and end date or calculation;
- what is free and what remains payable;
- whether payment details are collected;
- exact post-trial amount and cadence;
- what happens without a payment method;
- cancellation deadline and method;
- confirmation/reminder timing;
- refund, return, and access-revocation rules.

Paid trial, discounted first period, sign-up fee, deposit, and money-back guarantee are different promises. Use the [trial decision framework](/deals/arraysubs/resources/subscription-foundations/free-trial-paid-trial-or-no-trial-a-subscription-decision-framework/) and [sign-up fee guide](/deals/arraysubs/resources/subscription-foundations/subscription-sign-up-fees-unit-economics-ux-and-examples/) for those strategy decisions.

Visa's subscription merchant material discusses clear enrollment terms, evidence that a cardholder agreed to future transactions, post-trial notification, and easy online cancellation for relevant merchants ([Visa policy](https://usa.visa.com/dam/VCOM/global/support-legal/documents/subscription-merchants-visa-public.pdf)). Confirm current network, gateway, and acquirer requirements; Visa guidance is not universal law.

## Cancellation, refund, and access are separate

Cancellation can stop future charges immediately or at another disclosed effective point. A refund reverses money already paid. Access or fulfillment may continue through a paid-through term, stop with status, or follow a separate entitlement end.

For each scenario, state all three outcomes:

| Scenario | Money already paid | Future charges | Access or fulfillment |
| --- | --- | --- | --- |
| Customer cancels before renewal | Usually retained unless policy/law says otherwise | Stop according to disclosed deadline | Continue or end on stated date |
| First order is fully refunded | Refund method and timing | Confirm whether subscription is also cancelled | Confirm revocation/return |
| One renewal is partially refunded | Amount and tax/shipping treatment | Subscription may remain active | Confirm next date and remaining value |
| Merchant cannot deliver | Refund/credit under policy and law | Stop or reschedule | Explain replacement/end |

WooCommerce distinguishes automatic gateway refunds from manual refund records; a manual record does not itself send money through the processor ([WooCommerce refunds](https://woocommerce.com/document/woocommerce-refunds/)). Test the exact store workflow.

## Put terms on every relevant surface

### Product or plan page

Show complete price/cadence, trial, fee, duration, renewal, and a short cancellation/refund summary. Link deeper terms by a descriptive label.

### Cart

Restate the selected variation, quantity, amount today, recurring schedule, shipping, discount, fee, and duration. Recalculate after quantity, coupon, address, or plan changes.

### Checkout beside the purchase action

Put the recurring summary and affirmative control near the final action. Do not rely only on a footer link. A separate checkbox is useful only when its text is understandable and the implementation actually records it.

### Confirmation and email

Keep a timestamped summary, next charge, cancellation route, and policy links. Send relevant reminders for trials, material changes, annual renewals where required, failures, cancellation, and expiration.

### Customer account

Show status, price/cadence, next payment, end or paid-through date, payment method, current entitlement, and available cancellation or payment actions.

The values must agree. A product page promising one date while the account or email shows another is not solved by better policy copy.

## Accessible consent

Use a non-preselected checkbox or another affirmative control when appropriate for the applicable rules. Give it a visible, programmatic label summarizing the recurring feature. Keep it keyboard operable, readable at zoom, and close to the relevant terms.

If the customer omits consent, identify the control and describe the error in text. W3C form guidance recommends labels, grouped controls, instructions, validation, and user notifications; color alone is not enough ([Forms Tutorial](https://www.w3.org/WAI/tutorials/forms/), [Error Identification](https://www.w3.org/WAI/WCAG22/Understanding/error-identification)).

![Three-part operating model for understandable, prominent, and provable subscription terms.](/blogs/subscription-terms-customers-must-see-before-they-pay/operating-model.svg)

## Preserve proof of the promise

Store evidence appropriate to the risk and reviewed retention policy:

- customer/user, order, and subscription identifiers;
- product, variation, selected plan, quantity, and gateway;
- due-today and future amount/cadence;
- trial, fee, duration, shipping, cancellation, and refund summary;
- policy/version identifier or immutable content snapshot/hash;
- acceptance timestamp, locale, and currency;
- confirmation sent and later material-change notices.

Do not store full payment credentials. Privacy, security, and data-retention obligations need their own design.

A checkbox boolean proves very little by itself if nobody can reconstruct the wording, price, or policy shown at that moment. Use versioned, immutable evidence when legal, dispute, or audit risk requires it.

## Current FTC status: avoid stale click-to-cancel claims

The FTC's March 2026 Advance Notice of Proposed Rulemaking states that the Eighth Circuit vacated the 2024 amended Negative Option Rule on July 8, 2025; the prior rule was reinstated while the FTC considers alternatives ([FTC 2026 ANPRM](https://www.ftc.gov/system/files/ftc_gov/pdf/p064202negativeoptionruleanprm.pdf)).

For US online negative-option offers, FTC ROSCA guidance updated December 2, 2025 describes three baseline duties: disclose material terms before obtaining billing information, obtain express informed consent before charging, and provide a simple way to stop recurring charges ([FTC ROSCA recap](https://www.ftc.gov/business-guidance/blog/2018/07/time-rosca-recap-ftc-says-risk-free-trial-was-risky-not-free)).

Do not interpret that paragraph as a complete US or global rule summary. FTC Act enforcement, ROSCA, state laws, specific contracts/products, card-network rules, gateway/acquirer requirements, and other jurisdictions can apply. Get qualified, current legal review.

## Current ArraySubs truth

ArraySubs 1.8.9 shows product/variation schedule, sign-up fee, trial, duration, due-today, and renewal summaries and copies commercial fields into the managed subscription. Its checkout validates billing data on the server rather than trusting browser-submitted price and schedule values.

Current core has no dedicated immutable consent/policy-version record. ArraySubs Pro Checkout Builder can require a checkbox and store a boolean result, but that is not a snapshot of the exact policy or recurring summary accepted. Stores needing versioned legal or dispute evidence require an additional records design and qualified review.

ArraySubs alone does not certify compliance. It may also be a poor fit without extension when the business requires immutable policy snapshots, specialized consent retention, or a jurisdiction-specific cancellation/notice workflow it cannot currently prove.

Review the [products and checkout feature map](/deals/arraysubs/features/#products-checkout), then use the [monthly/annual](/deals/arraysubs/use-cases/recipes/monthly-vs-annual-variable/), [fixed-cycle](/deals/arraysubs/use-cases/recipes/prepaid-fixed-cycles/), or [lifetime](/deals/arraysubs/use-cases/recipes/lifetime-deal-one-time/) recipe only after the commercial promise is settled.

## Prelaunch content test

Before launch, ask a reviewer who did not build the product to state, without opening the admin:

1. what is due today;
2. what is charged later and when;
3. whether the plan ends or renews;
4. how to stop future charges;
5. what is refundable;
6. what happens to access or deliveries;
7. what proof the store retains.

Then test the same answers on product, cart, checkout, receipt, account, and email at mobile width, keyboard-only, and zoomed text. Run trial, fee, coupon, tax, recurring shipping, failure, cancellation, refund, and renewal paths with the selected gateway.

## Final recommendation

Write the recurring promise once as structured commercial data, render it consistently on every surface, obtain a clear affirmative action, and preserve the accepted version. Treat legal, network, and gateway review as a launch dependency—not something schema markup or a plugin can certify.

[Compare ArraySubs plans](/deals/arraysubs/pricing/) after the required checkout, gateway, consent-evidence, and cancellation workflows are defined.

## Frequently asked questions

### What subscription terms should appear before checkout?

Show due today, future amount and cadence, first renewal timing, trial/intro terms, duration or automatic renewal, cancellation, refunds, shipping, tax, and the exact entitlement.

### Is a Terms and Conditions link enough?

Not by itself for material recurring terms. Put the commercial summary where the customer decides and keep the full policy accessible through a clearly named link.

### Should a subscription consent checkbox be preselected?

Avoid preselection when affirmative recurring consent is required or appropriate. Use a clear label and verify the applicable jurisdiction, network, and product rules.

### What consent evidence should a WooCommerce store keep?

Preserve the order/subscription, commercial summary, selected plan, policy version or immutable snapshot/hash, timestamp, locale/currency, and confirmation record under a reviewed retention policy.

### Does ArraySubs store a complete legal consent record?

Not by itself in the current reviewed source. It stores commercial fields and can store a required Pro checkout-checkbox boolean, but no dedicated immutable policy snapshot/version was verified.

## Disclosure, verification, and update log

ArraySubs is the product discussed by this site. Current FTC, Visa, W3C, WooCommerce, and ArraySubs source material was reviewed July 13, 2026. This is general information, not legal advice. No legal audit or complete live gateway/consent-evidence test was performed.

- **July 2026:** Initial publication; FTC vacatur/current ROSCA baseline and current ArraySubs consent-record boundary verified.

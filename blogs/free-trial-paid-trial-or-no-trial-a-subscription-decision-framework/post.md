---
title: "Free Trial, Paid Trial, or No Trial?"
meta_description: "Choose a subscription free trial, paid evaluation, or no trial using time-to-value, cost, fraud, card timing, disclosure, and contribution economics."
focus_keyword: "subscription free trial vs paid trial"
published: "2026-06-05"
updated: "2026-06-17"
last_verified: "2026-07-13"
author: "Emran"
author_affiliation: "ArrayHash"
reviewer: "ArraySubs Engineering Team"
---

# Free Trial, Paid Trial, or No Trial? A Subscription Decision Framework

Choose a free trial when customers can reach meaningful value quickly and trial cost and abuse risk are low. Use a paid evaluation or reduced first period when delivery or support needs commitment. Skip the trial when value is immediate or expensive to reverse. Decide card timing separately, then test retained contribution—not signup rate alone.

“Free or paid” is only one axis. A complete trial design also decides when payment details are collected, what value can be consumed, and what happens when the evaluation ends.

> **Key takeaways**
>
> - Evaluation price and payment-method timing are separate choices.
> - A free trial can still have a sign-up fee, shipping, tax, or deposit due today.
> - Paid trial, introductory first period, and sign-up fee are different lifecycle models.
> - Measure retained contribution per eligible visitor, including fraud, support, refunds, and fulfillment.
> - ArraySubs ships free trials and introductory pricing, not a dedicated paid-trial lifecycle.

## Define the models precisely

| Model | Evaluation amount | Payment method | Main exposure | Useful starting metric |
| --- | ---: | --- | --- | --- |
| Card-required free trial | $0 recurring price | Collected at signup | Consent, reminder, failed first charge | Contribution per eligible visitor |
| No-card free trial | $0 recurring price | Added later | Spam, abuse, second conversion step | Activated and first-paid per eligible visitor |
| Paid evaluation | Reduced real charge | Collected at signup | Refunds, disputes, price-step clarity | Contribution after fees and refunds |
| No trial | Normal price | Collected at signup | Evaluation moves after purchase | Retained contribution |

A **free trial** delays the recurring price for a defined evaluation period. It may require a card or not. A **paid trial** is a reduced real charge for a time-limited evaluation followed by standard pricing. A **no-trial** plan charges the normal amount at signup or the normal contractual start.

A sign-up fee is a separate one-time amount. WooCommerce and ArraySubs both document that it may remain due during a free trial, so a “free trial” checkout is not necessarily $0 ([Woo subscription products](https://woocommerce.com/document/subscriptions/creating-subscription-products/), [ArraySubs product configuration](https://support.arrayhash.com/arraysubs/subscription-products/create-and-configure.html)).

![Choose the trial — a focused split for Choose a trial by proof, cost, and abuse risk.](/blogs/free-trial-paid-trial-or-no-trial-a-subscription-decision-framework/decision-visual.png)

## Decide card timing separately

### Card-required free trial

A card-required trial collects and may authenticate a payment method without charging the normal recurring amount. Stripe documents SetupIntents for this deferred-payment purpose ([Stripe deferred payments](https://docs.stripe.com/billing/subscriptions/deferred-payment)).

This can prepare later automatic collection, but it does not guarantee payment success or product activation. Expired cards, authentication, mandates, customer consent, and failure recovery still matter.

Start with card-required when trial delivery has real variable cost, abuse can cause loss, onboarding uses human time, or off-session collection is essential.

### No-card free trial

A no-card trial creates a second conversion event: the customer must add payment details later. Stripe warns that cardless trials can attract spam or fake accounts and recommends controls such as accounts and CAPTCHA; configurable end states can include pause, cancel, or invoice ([Stripe trial periods](https://docs.stripe.com/billing/subscriptions/trials?locale=en-GB)).

Start with no-card when marginal cost is low, activation is self-service and measurable, abuse can be capped, and the payment workflow will be surfaced reliably before the trial ends.

Neither approach is a universal conversion winner.

## Use cost and reversibility to choose

Free trials fit experiences that are inexpensive to provide and easy to revoke: bounded software access, a non-downloadable community preview, or a self-service tool with measurable activation.

Paid evaluation or no trial is safer when value is costly or irreversible:

- compute/API usage that can be harvested;
- coaching, migration, or custom setup that consumes staff time;
- physical goods with product, shipping, return, and fraud costs;
- downloadable libraries, datasets, reports, or certificates that can be copied;
- professional services whose outcome is substantially delivered during evaluation.

Alternatives include a demo, sample, restricted sandbox, paid pilot, staged access, redacted output, or a clearly scoped refund policy. Do not relabel a normal paid first month as “free.”

## Measure contribution, not signup rate

Use one eligibility denominator and a horizon that includes the trial, first standard-price payment, refund window, and a meaningful retention checkpoint.

> **Net contribution at horizon H = collected revenue − COGS − payment fees − refunds and chargebacks − trial fulfillment − onboarding and support − abuse loss**

> **Contribution per eligible visitor = net contribution at H ÷ eligible visitors assigned to that model**

This prevents a no-card trial from looking successful merely because it generates many low-quality starts, and prevents a card-required trial from looking successful merely because it filters people before the denominator begins.

![Friction and exposure — an illustrative numbers for Choose a trial by proof, cost, and abuse risk.](/blogs/free-trial-paid-trial-or-no-trial-a-subscription-decision-framework/model-visual.png)

*The visual is a decision aid, not observed conversion data.*

Track product COGS, shipping, staff minutes, tickets, abuse, gateway fees, refunds, disputes, payment failures, and retained revenue by cohort.

## A product-risk recommendation matrix

| Product profile | Starting hypothesis | Guardrail |
| --- | --- | --- |
| Low-cost self-serve SaaS | Bounded free trial | Account verification, quota, activation event |
| Costly API or AI usage | Card-required trial or paid first period | Credits, rate limits, duplicate detection |
| Ongoing community | Free trial if value is not extractable | Limit archives/downloads, clear reminder |
| Static download library | Paid first period or no trial | Preview, staged access, download limits |
| Coaching or managed service | Paid evaluation or no trial | Fixed scope, qualification, refund terms |
| Physical subscription box | Paid first shipment or no trial | Address verification, quantity limits, shipping disclosure |

![Proof of value — a focused triangle for Choose a trial by proof, cost, and abuse risk.](/blogs/free-trial-paid-trial-or-no-trial-a-subscription-decision-framework/operating-visual.png)

## Run a defensible experiment

Predefine the question, eligible audience, variants, activation event, primary metric, guardrails, analysis horizon, sample-size assumptions, and stop rules. Change one dimension at a time where practical—for example card-required versus no-card, not card rule, price, and length simultaneously.

Use this event chain:

> Eligible visitor → enrollment → trial start → activation → payment method present → first standard-price attempt → successful payment → refund window passed → retained contribution at H

NIST recommends planning objectives, factors, and responses before an experiment and using randomized allocation where appropriate. It also explains why sample size depends on explicit effect, variance, significance, and power assumptions rather than one universal number ([experimental design](https://itl.nist.gov/div898/handbook/pri/section1/pri11.htm), [randomized designs](https://www.itl.nist.gov/div898/handbook/pri/section3/pri331.htm)).

There is no defensible universal “best” 7-, 14-, or 30-day trial. Use the shortest duration that lets a typical customer reach representative value under the product's natural cadence.

## Disclosure, consent, and cancellation

Before payment information is collected, show what is free or discounted, every amount due today, the evaluation end, the post-trial amount and frequency, whether a card is collected, the missing-payment-method outcome, cancellation path, refund/access rules, and reminder timing.

For US online negative-option offers, the FTC's current ROSCA guidance emphasizes clear material terms, express informed consent, and a simple way to stop recurring charges ([FTC ROSCA recap](https://www.ftc.gov/business-guidance/blog/2018/07/time-rosca-recap-ftc-says-risk-free-trial-was-risky-not-free)). Visa also publishes trial-specific disclosure and reminder requirements; confirm current application with the gateway and acquirer ([Visa subscription policy](https://usa.visa.com/dam/VCOM/global/support-legal/documents/subscription-policy-vbn-visa-public.pdf)).

This is general information, not legal advice. Requirements vary by jurisdiction, payment method, network, and product.

## Current ArraySubs capability boundary

ArraySubs 1.8.9 ships Trial Length and Trial Period controls, optional payment-method collection, and a one-trial-per-customer setting. A sign-up fee can remain due during the free recurring trial. Automatic Stripe, PayPal, and Paddle billing is part of Pro; core uses manual renewal flows.

ArraySubs does **not** currently expose a dedicated paid-trial price or lifecycle. Different Renewal Price can create a reduced first paid period, but the subscription is active and paid from day one; call it introductory pricing.

Current code and public copy are not fully aligned on the exact first post-trial charge timing. Do not promise an immediate charge at the trial boundary without end-to-end verification for the selected gateway. Test the entire path before publishing customer-facing dates.

See the [ArraySubs products and checkout feature map](/deals/arraysubs/features/#products-checkout) and [Subscription Sign-Up Fees](/deals/arraysubs/resources/subscription-foundations/subscription-sign-up-fees-unit-economics-ux-and-examples/) for the adjacent one-time charge decision.

## Final recommendation

Use a free trial only when customers need time to prove value and the loss ceiling is controlled. Use a paid evaluation or introductory period when delivery has meaningful cost. Use no trial when value is immediate, already demonstrable, or expensive to reverse. Then test the card rule as its own decision.

[Compare ArraySubs plans](/deals/arraysubs/pricing/) after the required trial, gateway, and automation paths are clear.

## Frequently asked questions

### Is a paid trial the same as a sign-up fee?

No. A paid trial charges for a limited evaluation. A sign-up fee is a separate one-time enrollment amount and can coexist with a free recurring trial.

### Should a free trial require a credit card?

There is no universal winner. Choose a starting hypothesis from cost, trust, and abuse risk, then test retained contribution per eligible visitor.

### What is the best subscription trial length?

Use the shortest period that lets a typical customer reach representative value. Test a predefined alternative through the first standard payment and retention horizon.

### Does ArraySubs support paid trials?

Not as a dedicated trial lifecycle. It ships free trials and introductory pricing through Different Renewal Price; the latter is an active paid subscription from signup.

### What happens when a no-card free trial ends?

It depends on the engine and configuration. The outcome may be pause, on-hold, cancellation, invoice, or downgrade. Test ArraySubs with the selected gateway before promising exact timing or status.

## Disclosure, verification, and update log

ArraySubs is the product discussed by this site. Current ArraySubs source, public documentation, official payment-platform guidance, and regulator/network material were reviewed on July 13, 2026. No universal benchmark dataset was used, and the exact post-trial ArraySubs gateway timing remains a stated test limitation.

- **July 2026:** Initial publication; free-trial capability, paid-trial boundary, and current disclosure sources verified.

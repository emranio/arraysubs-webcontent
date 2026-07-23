---
title: "Recurring vs Fixed-Term Subscriptions"
meta_description: "Compare ongoing, fixed-cycle, fixed-date, and prepaid subscriptions by cash timing, access, renewal, cancellation, and WooCommerce setup."
focus_keyword: "recurring vs fixed term subscriptions"
published: "2026-01-05"
updated: "2026-05-22"
last_verified: "2026-05-22"
author: "Emran"
author_affiliation: "ArrayHash"
---

# Recurring vs Fixed-Term Subscriptions: Choose the Right Billing Model

Choose an ongoing recurring subscription when value continues indefinitely and the customer should keep paying until cancellation. Choose a fixed-term model when delivery or access has a defined finish. Then distinguish rolling fixed cycles, which end after each customer's payment count, from fixed dates, where everyone reaches the same calendar cutoff.

The phrase “recurring versus fixed-term” hides a category error: recurring describes **when money is collected**, while fixed-term describes **when the agreement ends**. A plan can be both recurring and fixed-term.

> **Key takeaways**
>
> - Duration and collection are separate decisions.
> - Fixed-cycle means a count from each customer's start; fixed-date means a shared calendar cutoff.
> - Prepaid means the term is funded upfront, not merely that recurring payments eventually stop.
> - A cancel-anytime fixed-cycle plan is not automatically an installment obligation.
> - Design access, cancellation, fulfillment, and final status before configuring the product.

## Four practical models, not two

| Model | Duration | Collection | Plain-language promise |
| --- | --- | --- | --- |
| Evergreen recurring | No preset end | Periodic | Pay each period while the service continues |
| Fixed-cycle recurring | Preset payment count | Periodic | Pay for up to N cycles, then expire |
| Prepaid fixed-term | Preset term or delivery count | Mainly upfront | Fund the term now, receive it over time |
| Fixed-date term | Shared calendar cutoff | Periodic or upfront | Everyone reaches the same end date |

![What ends the agreement? — a focused split for Choose what ends the agreement.](/blogs/recurring-vs-fixed-term-subscriptions-choose-the-right-billing-model/decision-visual.png)

*First decide what ends the agreement; then decide how cash is collected.*

## Ongoing recurring subscriptions

An evergreen subscription renews on its configured cadence until cancellation or another terminal event. It fits replenishment, hosted software, website maintenance, continuing support, communities, and publications—offers whose value has no natural completion point.

WooCommerce's current plan documentation says subscriptions renew indefinitely by default until cancelled ([Creating a Subscription Product](https://woocommerce.com/document/subscriptions/creating-subscription-products/)). The agreement still needs clear rules for payment failure, pauses, cancellation timing, paid-through access, and refunds.

Do not use evergreen billing when the merchant stops delivering meaningful value at a known milestone.

## Fixed-cycle recurring subscriptions

A fixed-cycle plan charges periodically but expires after a configured number of payments or cycles. In WooCommerce's current plan model, total payments include the initial purchase: six total monthly payments means one checkout payment plus five renewals.

This model is relative to each customer's start. A March buyer and a May buyer normally finish on different dates. It fits rolling coaching packages, limited box series, and programs where every customer receives the same number of paid periods.

Fixed-cycle does not guarantee the scheduled total. Woo documents that customers can cancel an expiring subscription before its planned end. If the buyer legally owes a remaining balance, the business needs a genuine installment or credit workflow, appropriate terms, and qualified review—not just a subscription-length field.

## Fixed-date subscriptions

A fixed-date term ends on a shared calendar date. A January and March joiner might both finish on August 31. It fits cohorts, seasons, school years, associations, and enrollment windows.

Fixed date is not billing-date alignment. Alignment controls when renewals occur; it does not by itself create a shared access end, and Woo says enabling alignment does not retroactively realign existing subscriptions ([Billing Date Alignment](https://woocommerce.com/document/subscriptions/billing-date-alignment/)).

Late enrollment creates a policy choice: charge full price for less time, prorate, delay entry, add bonus access, or close enrollment. A010 covers the detailed [fixed-date WooCommerce subscription model](/subscription-foundations/fixed-date-woocommerce-subscriptions-for-cohorts-seasons-and-enrollment-windows/).

## Prepaid fixed-term subscriptions

Prepaid means the customer funds a defined term in advance. One payment may cover six months of access or six later shipments. The store must still deliver what was purchased even if the payment schedule does not create later paid orders.

Woo documents both sign-up-fee/$0-renewal patterns and a dedicated prepaid extension, while warning that cancellation or suspension can interfere with later fulfillment in a naive setup ([Subscriptions FAQ](https://woocommerce.com/document/subscriptions/faq/), [Prepaid for WooCommerce Subscriptions](https://woocommerce.com/document/prepaid-for-woocommerce-subscriptions/)).

The ArraySubs [fixed-cycle recipe](/deals/arraysubs/use-cases/recipes/prepaid-fixed-cycles/) currently uses recurring charges. Treat it as fixed-cycle, not proof that the full term is prepaid.

## Same stated total, different cash timing

Assume a six-month program with a stated $240 price. Ignore tax, payment fees, discounts, failures, refunds, and time value of money.

| Model | Checkout cash | Later cash | Scheduled total | Ending |
| --- | ---: | ---: | ---: | --- |
| Evergreen at $40/month | $40 | $40 until cancellation | Unknown at signup | Cancelled |
| Six fixed cycles | $40 | Five scheduled $40 renewals | $240 if all succeed | Expired |
| Prepaid six months | $240 | $0 for covered term | $240 upfront | Term ends |
| Fixed-date cohort | Policy-dependent | Policy-dependent | Must be disclosed per entry date | Shared cutoff |

![Cash timing — an illustrative bars for Choose what ends the agreement.](/blogs/recurring-vs-fixed-term-subscriptions-choose-the-right-billing-model/model-visual.png)

*Illustrative arithmetic only; replace the inputs with your own price and policy.*

The same nominal total creates different collection risk, refund exposure, fulfillment liability, and customer expectations.

## Design billing and access separately

Billing status does not fully define entitlement. Write explicit answers to these questions:

1. When do future charges stop?
2. Does the customer keep already-paid access through a paid-through date?
3. What happens to scheduled deliveries after prepaid cancellation?
4. Does expiration remove access immediately or at a separate entitlement end?
5. Does payment failure pause access, retry collection, or create a grace period?

WooCommerce Memberships' official integration demonstrates that subscription billing and access duration can be connected or independently defined ([Memberships + Subscriptions](https://woocommerce.com/document/woocommerce-memberships-subscriptions-integration/)).

![Three term models — a focused balance for Choose what ends the agreement.](/blogs/recurring-vs-fixed-term-subscriptions-choose-the-right-billing-model/operating-visual.png)

## A seven-question decision framework

1. Does customer value continue indefinitely? Start with evergreen recurring.
2. Is there a defined completion milestone, quantity, or term? Choose fixed-term.
3. Should each customer receive N cycles from their own start? Choose fixed-cycle.
4. Should everyone stop on one date? Choose fixed-date.
5. Should the whole term be funded upfront? Choose a genuine prepaid design.
6. Does the customer owe a balance after cancellation? Use an installment/credit workflow, not ordinary subscription length.
7. What happens on failure, pause, refund, switch, final payment, and expiration? Define those states before launch.

For catalog structure, read [Simple vs Variable WooCommerce Subscriptions](/subscription-foundations/simple-vs-variable-woocommerce-subscriptions-which-product-type-fits/).

## Current ArraySubs model boundaries

ArraySubs core 1.8.9 provides a Subscription Length measured in billing cycles; zero means no planned expiration. Current lifecycle code expires a subscription after its configured paid count. ArraySubs Pro provides fixed-date subscriptions with absolute or recurring-annual cutoffs, optional enrollment windows, and expire-or-renew behavior.

Current ArraySubs materials mark Installment / Split Payments as **coming soon**. Do not sell a fixed-cycle subscription as a shipped fixed-balance installment feature. ArraySubs does ship a one-charge Lifetime Deal mode; see the [lifetime recipe](/deals/arraysubs/use-cases/recipes/lifetime-deal-one-time/) when the commercial promise is one-time rather than recurring.

## Limitations and not-fit cases

- Evergreen is a poor fit when value ends at a known milestone.
- Fixed-cycle is a poor fit when everyone must share one term date.
- Fixed-date is a poor fit when each joiner deserves the same rolling duration.
- Prepaid is risky when the merchant cannot manage refunds, accounting, or future-delivery obligations.
- Trials, pauses, zero-total orders, failures, and switches can affect counts differently across engines.
- Gateway support, product tiers, and lifecycle behavior are version-sensitive and must be rechecked.

This is general operational information, not legal or accounting advice about non-cancellable obligations, refunds, credit, or revenue recognition.

## Final recommendation

Choose the finish first: no planned end, a cycle count, or a shared date. Then choose periodic or upfront collection. Keep “fixed-cycle,” “fixed-date,” “billing alignment,” “prepaid,” and “installment” as separate controls in product copy, configuration, and reporting.

[Compare ArraySubs plans](/deals/arraysubs/pricing/) after the required duration, gateway, and access policies are clear.

## Frequently asked questions

### What is the difference between recurring and fixed-term subscriptions?

Recurring describes repeated collection; fixed-term describes a planned end. One subscription can be both recurring and fixed-term.

### Is a fixed-term subscription the same as prepaid?

No. A fixed-term plan may collect periodically. Prepaid means the covered term is funded in advance.

### Is a fixed number of cycles the same as a fixed end date?

No. Cycle counts normally roll from each customer's start; a fixed date is a shared calendar cutoff.

### Can a customer cancel before a fixed-cycle plan ends?

Often yes. WooCommerce's current documentation allows cancellation before scheduled expiration. Do not present ordinary fixed-cycle configuration as a guaranteed balance.

### What happens to access after the final payment?

The subscription may expire, but access follows the entitlement design. It can end with billing or continue to a separately defined date.

## Disclosure, verification, and update log

ArraySubs is the product discussed by this site. Current official WooCommerce documentation and ArraySubs 1.8.9/ArraySubs Pro 1.1.0 source were reviewed on July 13, 2026. No live renewal, cancellation, or expiration sequence was run for every gateway.

- **July 2026:** Initial publication; cycle-length and Pro fixed-date behavior verified in current source.

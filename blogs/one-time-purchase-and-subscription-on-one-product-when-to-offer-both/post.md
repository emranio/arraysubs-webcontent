---
title: "One-Time Purchase and Subscription on One Product"
meta_description: "Decide when to offer buy once or subscribe on one WooCommerce product using repeat demand, margin, stock, consent, analytics, and platform fit."
focus_keyword: "one time purchase and subscription same product"
published: "2026-07-05"
updated: "2026-07-16"
last_verified: "2026-07-13"
author: "Emran"
author_affiliation: "ArrayHash"
reviewer: "ArraySubs Engineering Team"
---

# One-Time Purchase and Subscription on One Product: When to Offer Both

Offer one-time and subscription choices together when customers repeatedly need the same product on a predictable schedule and the recurring price still clears your contribution floor. Show both prices, delivery cadence, savings basis, renewal terms, and cancellation path clearly. Current ArraySubs requires separate regular and subscription products; it does not provide a verified same-product chooser.

“Same product” can mean one product ID with two purchase modes, or two linked product records presented as one decision. Those implementations have different stock, analytics, cart, and plugin consequences.

> **Key takeaways**
>
> - Start from observed repeat demand, not a desire for recurring revenue.
> - Calculate subscription contribution per completed delivery after discount and recurring costs.
> - Make buy once versus subscribe an explicit, accessible choice.
> - Reserve inventory for promised renewals and define stockout behavior.
> - A return or refunded shipment and a subscription cancellation are separate workflows.
> - WooCommerce Subscriptions 9.0 documents a same-product plan model; current ArraySubs does not.

## Define the two implementation models

**One product, two purchase modes** uses one product identity and lets the shopper choose Buy once or Subscribe. Current WooCommerce Subscriptions documentation describes this through plans on standard product types and a “Customers can buy this product without subscribing” option ([Creating a Subscription Product](https://woocommerce.com/document/subscriptions/creating-subscription-products/)).

**Two linked products** uses one ordinary product and a separate subscription product, compared on a landing page or linked from each other. That can solve the shopper's task, but it needs deliberate stock synchronization, canonical URLs, review/feed handling, analytics attribution, and price updates.

![Earn the second option — a focused split for Buy once or subscribe: earn the second option.](/blogs/one-time-purchase-and-subscription-on-one-product-when-to-offer-both/decision-visual.png)

## Pass seven gates before offering both

1. **Recurring value:** Is the item consumed, depleted, renewed, or used repeatedly?
2. **Cadence evidence:** Does first-party reorder history show meaningful timing clusters?
3. **Contribution:** Does every completed recurring delivery clear a defined floor?
4. **Fulfillment:** Can the store protect inventory and handle delay or substitution?
5. **Consent and cancellation:** Are price, cadence, future charges, and stopping rules visible?
6. **Data separation:** Can the store attribute selections, orders, renewals, failures, returns, and cancellations by mode?
7. **Implementation truth:** Does the selected engine actually support the promised selector?

Good candidates include replenishable consumables, routine supplies, filters, recurring services, or access customers already continue using. Poor candidates include durable goods, rare repair parts, highly seasonal gifts, unstable inventory, fit-sensitive products with high returns, or products whose consumption interval varies too widely.

Use median and distribution of same-SKU reorder gaps rather than only the average. If timing is dispersed, offer a small cadence set, allow supported skips/changes, or keep buy once primary.

## Price the subscription from contribution

Let Pₒ be one-time price, Pₛ recurring price per delivery, V direct product and fulfillment cost, and O the incremental operations, payment, refund, and support cost:

```text
One-time contribution = Pₒ − V − Oₒ
Subscription contribution per delivery = Pₛ − V − Oₛ
Minimum recurring price = V + Oₛ + required contribution floor
Maximum discount = Pₒ − minimum recurring price
```

### Worked example

Assume a hypothetical replenishment item:

| Input | Buy once | Subscribe per completed delivery |
| --- | ---: | ---: |
| Selling price | $45 | $40 |
| Product + fulfillment | $25 | $25 |
| Incremental recurring reserve | $0 | $2 |
| Direct contribution | $20 | $13 |

The subscription discount is 11.1%. One completed subscribed delivery contributes $13; two contribute $26; three contribute $39 on $120 revenue. That does not prove the subscription is better: it excludes acquisition cost, renewal probability, timing, failures, refunds, tax, and organic full-price reorders.

![Revenue is not contribution — an illustrative bars for Buy once or subscribe: earn the second option.](/blogs/one-time-purchase-and-subscription-on-one-product-when-to-offer-both/model-visual.png)

*Illustrative arithmetic; the bars are not profit or retention data.*

Compare the dual offer against a buy-once-only cohort using net contribution per eligible product-page visitor. Existing repeat buyers may simply take the subscription discount, so not every recurring order is incremental.

## Design an explicit product-page choice

Use a real mutually exclusive control group with a short legend such as **Choose how to buy**. W3C guidance recommends grouping related radio controls programmatically and visually, with self-explanatory labels ([Grouping Controls](https://www.w3.org/WAI/tutorials/forms/grouping/)).

The choice should show:

| Buy once | Subscribe |
| --- | --- |
| Buy once — $45 | Subscribe — $40 every 30 days |
| One delivery | Save $5 per scheduled delivery (11.1%) |
| No future renewal | Next charge and shipping rule shown |

Show keyboard focus, selected, disabled, and error states without color alone. Restate the selected mode, price now, recurring cadence, shipping, trial, fee, minimum charges, and cancellation summary in cart and checkout.

There is no universal default. Neutral selection creates the clearest explicit choice. If a default is necessary for broad catalog traffic, one-time is the conservative recurring-billing choice. Subscription emphasis can fit a campaign that already expresses subscription intent, while terms and consent remain prominent.

## Protect inventory and fulfillment

WooCommerce Subscriptions says renewal orders reduce stock by default and automatic renewals can continue even after stock reaches zero ([Stock Management](https://woocommerce.com/document/subscriptions/creating-subscription-products/stock-management/)). One-time demand can therefore consume units subscribers expect.

Define:

- protected subscriber inventory and safety stock;
- delay, substitute, skip, refund, pause, or cancel behavior;
- advance communication and approval for substitutions;
- quantity/cadence changes;
- how promotions affect committed renewal stock.

![Keep the choice clear — a focused triangle for Buy once or subscribe: earn the second option.](/blogs/one-time-purchase-and-subscription-on-one-product-when-to-offer-both/operating-visual.png)

With an ArraySubs two-product workaround, the records normally have separate stock. Similar names or SKUs do not create shared inventory. Any synchronization must be tested for simultaneous orders, renewals, refunds/restocks, manual edits, feeds, and failures.

## Separate returns from future billing

Treat these as distinct actions:

1. return or refund an already delivered order;
2. cancel a particular renewal order;
3. cancel the subscription's future charges and deliveries.

WooCommerce Subscriptions states that cancelling a renewal order does not automatically cancel the related subscription ([Subscriptions FAQ](https://woocommerce.com/document/subscriptions/faq/)). After a damaged renewal is refunded, confirm whether the subscription remains active and show the next renewal date.

## Measure the complete outcome

Track eligible view, purchase-mode selection, add to cart, initial purchase, renewal due/completed/failed, skip, pause, cancellation, refund, return, support contact, stockout, and dispatch delay. Use stable experiment and paired-product identifiers.

Primary metric:

> **Net contribution per eligible visitor through H = (cash − refunds − product/fulfillment cost − payment cost − support/operations cost) ÷ eligible visitors**

Guardrails include completed purchase, first and second renewal, early cancellation, returns, failures, support, stockouts, delays, and unexpected-charge complaints. Subscription selection rate alone can reward an interface that hides buy once.

## WooCommerce and ArraySubs implementation truth

WooCommerce Subscriptions 9.0 documents subscription plans on ordinary products with a one-time purchase option. An optional Buy Once or Subscribe add-on provides extra controls in documented cases, but do not assume it is universally required or compatible without testing.

ArraySubs 1.8.9 treats a product as subscription or regular through a binary flag. A variable parent applies subscription status to all variations, so a buy-once variation plus subscription variation is not a supported workaround.

ArraySubs can power a separate subscription product beside a regular product. Its mixed-cart setting concerns separate items; it does not create same-product modes. Current Pro capabilities declare mixed cart for Stripe and Paddle, but not PayPal. The two-product presentation also needs explicit stock, review, feed, canonical, reporting, and navigation design.

If one SKU with both modes is non-negotiable, use a system that documents and passes that model. See [ArraySubs product and checkout features](/deals/arraysubs/features/#products-checkout) for current boundaries.

## Final recommendation

Offer both only after repeat demand, cadence, contribution, inventory, consent, and attribution pass their gates. Use the smallest recurring discount that communicates real value and clears the floor. If current ArraySubs is selected, present two products honestly rather than claiming a native same-product selector.

Read [Monthly and Annual Subscription Plans](/deals/arraysubs/resources/subscription-foundations/monthly-and-annual-subscription-plans-packaging-without-cannibalization/) when the choice is between recurring cadences, not buy once versus recurring.

[Compare ArraySubs plans](/deals/arraysubs/pricing/) after the product-mode and gateway requirements are clear.

## Frequently asked questions

### Can WooCommerce sell one product as both one-time and subscription?

Yes. Current WooCommerce Subscriptions documentation describes plans on ordinary product types with an option to let customers buy without subscribing. Test the actual theme, cart, checkout, and gateway.

### Does ArraySubs support buy once or subscribe on the same product?

Not currently. Use separate regular and subscription products, or choose a system with a documented one-product selector when shared identity is mandatory.

### How much should a subscribe-and-save discount be?

Calculate it from product, fulfillment, payment, return, and support costs plus a required contribution floor. There is no universal percentage.

### Which option should be selected by default?

There is no universal winner. Neutral is clearest; one-time is conservative for broad traffic; subscription emphasis fits clearly subscription-intent contexts with explicit consent.

### Does refunding a renewal stop the subscription?

Do not assume so. Treat the order refund and the future-renewal status as separate actions and confirm both to the customer.

## Disclosure, verification, and update log

ArraySubs is the product discussed by this site. Official WooCommerce guidance and ArraySubs 1.8.9/Pro 1.1.0 source were reviewed July 13, 2026. No live selector, stockout, mixed-cart, renewal, or refund test was run, and no performance benchmark was used.

- **July 2026:** Initial publication; Woo plan model and current ArraySubs same-product limitation verified.

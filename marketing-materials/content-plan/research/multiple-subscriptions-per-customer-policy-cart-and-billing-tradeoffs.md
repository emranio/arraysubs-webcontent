# Research brief: Multiple Subscriptions per Customer: Policy, Cart, and Billing Tradeoffs

## Research record

- **Article:** A030
- **Research date / last verified:** 2026-07-13
- **Focus keyword:** `multiple WooCommerce subscriptions per customer`
- **Intent:** Decision guide for whether a store should allow, restrict, migrate, or route duplicate subscription purchases.
- **Evidence scope:** Current official WooCommerce documentation; ArraySubs 1.8.9 and ArraySubs Pro 1.1.0 source; current ArraySubs settings/manual.
- **No invented benchmarks:** No universal conversion, duplicate-purchase, failed-payment, or support-cost threshold is asserted. Metrics below are definitions merchants can calculate from their own data.
- **No live cart/checkout was run.** Product behavior is based on current source/manual inspection.

## Direct-answer conclusion

> Allow multiple subscriptions when customers genuinely need independent products, quantities, recipients, or billing schedules. Restrict them when a second purchase is usually an accidental duplicate or should be an upgrade. Decide separately at cart, product, customer, billing-cycle, mixed-checkout, and gateway levels; then route blocked buyers to plan switching or account management instead of a dead end.

This is 57 words.

## Editorial thesis

“Can a customer have multiple subscriptions?” is not one switch. It is a policy stack:

1. multiple distinct subscription products in one cart;
2. multiple units of the same subscription product;
3. more than one live subscription on the customer account/email;
4. subscription and regular products in one checkout;
5. different billing cycles in one checkout;
6. gateway capability for the selected cart;
7. upgrade/downgrade versus duplicate purchase;
8. operational ability to support separate renewals, shipping, failures, cancellations, and access.

The strongest article gives a decision tree and a current ArraySubs behavior matrix rather than a blanket yes/no recommendation.

## Current ArraySubs policy controls

Default settings in ArraySubs 1.8.9:

| Setting | Default | Actual scope |
| --- | ---: | --- |
| Allow Multiple Subscriptions in Cart | On | Allows more than one **distinct** subscription product in a cart, subject to other rules and gateway capabilities |
| One Subscription per Customer | Off | When enabled, blocks another live subscription for the account or matching checkout email; live statuses include active, trial, on-hold, and pending |
| Auto Migrate on Checkout | Off | Only relevant when one-per-customer is on; can route one eligible existing subscription into a supported plan migration rather than create another |
| One Subscription per Product | Off | Limits cart quantity for a subscription product to one; it is not the same as scanning all historical account subscriptions for that product |
| Allow Mixed Cart | On | Allows subscription and regular items together, subject to gateway support |
| Allow Different Billing Cycles | On | Allows, for example, monthly and annual subscription products together, subject to gateway support |

Important terminology: the current “One Subscription per Product” executable path is primarily a **quantity/cart** restriction. Do not describe it as a full “one active subscription of this SKU per customer across all time” rule.

## What ArraySubs creates from a multi-subscription order

Current `SubscriptionCreationTrait` creates one ArraySubs subscription per subscription order line item. It does not group line items with the same schedule into one subscription object.

Example checkout:

| Cart line | Quantity | Resulting ArraySubs records |
| --- | ---: | --- |
| Monthly Coffee | 2 | One subscription record for Monthly Coffee with quantity 2 |
| Annual Membership | 1 | One independent subscription record for Annual Membership |
| Regular Mug | 1 | No subscription record; remains an ordinary order line |

Result: two subscriptions, each with its own next payment date, status, renewal order history, shipping context, cancellation state, failure recovery, notes, and potentially gateway context.

This differs from WooCommerce Subscriptions' documented multiple-subscription grouping, where products with the same billing schedule can be grouped into one subscription object. The article must identify which engine it is describing.

## Gateway capability matrix

ArraySubs Pro applies a “most restrictive enabled gateway wins” filter to cart composition, then validates the selected gateway at checkout. Current declared capabilities are:

| Gateway | Mixed cart | Multiple subscription lines | Different billing cycles | Schedule owner / implication |
| --- | ---: | ---: | ---: | --- |
| Stripe delegate | Yes | Yes | Yes | ArraySubs owns renewal schedule; separate subscription records can be charged independently |
| Paddle | Yes | Yes | No | Paddle owns remote schedules; carts with different cycles are blocked |
| PayPal | No | No | No | One subscription plan per checkout; mixed and different-cycle carts are blocked |
| Manual/offline | Core settings | Core settings | Core settings | Customer pays renewal invoices manually; each subscription has its own order/payment workflow |

Because the global filter checks enabled gateways, enabling a restrictive gateway can narrow cart behavior before the buyer selects a payment method. Do not tell merchants that turning on the core setting guarantees the cart will allow it.

## Policy levels and their tradeoffs

### 1. Per-cart policy

Use “Allow Multiple Subscriptions in Cart” when one transaction should contain several distinct plans. Benefits:

- fewer checkout sessions;
- a single initial order/receipt;
- cross-sell of complementary subscription products.

Costs:

- ArraySubs creates separate subscription records and future renewal orders;
- failures can occur independently;
- customer/account UI must make each plan clear;
- a gateway can block the composition;
- support must explain why an initial combined checkout becomes separate future charges.

### 2. Per-product quantity policy

“One Subscription per Product” is useful when quantity above one has no valid meaning or trials/entitlements must not multiply. Leave it off when a single subscription quantity represents two boxes, seats, or units delivered every cycle.

If different recipients, addresses, or cancellation dates are required, quantity on one subscription may be the wrong model; separate subscription records may be clearer.

### 3. Per-customer policy

Enable one-per-customer when a customer should have one live contractual plan at a time. Current validation checks logged-in accounts and, at checkout, matching billing email for guests/returning customers. That closes a common “guest uses same email” gap.

But one-per-customer is too restrictive when customers legitimately need:

- independent subscriptions for multiple family members;
- several sites/teams/workspaces;
- separate delivery addresses;
- different products with separate cancellation dates;
- concurrent base plan and add-on subscriptions.

### 4. Upgrade/migration policy

When a second purchase usually means “change my existing plan,” block duplicate creation and route to plan switching. Current ArraySubs checkout auto-migration is conditional; the current subscription and target must be eligible. A blocked migration should explain why and show the correct management path.

### 5. Mixed-cart policy

Mixed checkout simplifies the initial purchase but can create different future handling:

- regular products never renew;
- subscription lines create independent subscriptions;
- shipping and taxes can differ on future renewal orders;
- some gateways reject mixed carts.

The checkout summary should distinguish “charged today” from each future recurring commitment.

### 6. Different-cycle policy

Monthly and annual plans in one checkout can be convenient, but ArraySubs creates separate subscriptions. That means separate reminders, charges, orders, failures, shipping, and support timelines. Gateway capability—not the admin switch alone—determines whether the checkout is valid.

## Decision tree

```text
Does the buyer need another independent entitlement, shipment, recipient, or schedule?
├─ No → Is the new product a permitted upgrade/downgrade?
│  ├─ Yes → Route to plan switching / checkout migration
│  └─ No → Block duplicate; link to Manage Subscription or support
└─ Yes → Can operations support separate records, renewals, failures, and cancellations?
   ├─ No → Use quantity, seats, add-ons, or a configured bundle instead
   └─ Yes → Does the chosen gateway support this cart composition?
      ├─ No → Split checkout or offer a compatible gateway
      └─ Yes → Allow and disclose each recurring schedule separately
```

## Recommended policy patterns

| Store model | Suggested starting policy | Reason | Watch item |
| --- | --- | --- | --- |
| One membership tier per person | One per customer; migration/switching on where eligible | Second purchase is normally an upgrade or mistake | Email/account matching, pending/on-hold subscriptions |
| Subscription box with quantity | Multiple cart off or limited; one-per-product depends on whether quantity is valid | One record with quantity may be simpler | Shipping quantity and inventory per renewal |
| Marketplace/add-on catalog | Multiple in cart on; mixed/different cycles as supported | Customers need independent products | Gateway restrictions and many separate renewals |
| Team/site licenses | Multiple allowed if each site/team is a distinct record | Independent renewal/cancellation can be desirable | Clear naming and ownership in My Account |
| Free-trial-led SaaS | One trial per customer/product plus switch path | Reduces duplicate trial abuse without blocking paid add-ons | Identity matching and household/business exceptions |
| PayPal-heavy store | One subscription per checkout; no mixed/different-cycle cart | Matches current PayPal capability declaration | Extra checkout friction |
| Paddle store | Multiple/mixed can be allowed; different cycles separated | Matches current Paddle capability declaration | Remote schedule and webhook reconciliation |

These are starting patterns, not universal rules.

## Billing and shipping tradeoffs

### Independent renewal load

If one checkout creates `S` independent subscriptions and each renews `R_i` times during the observation period:

```text
Expected renewal-order opportunities = Σ R_i for i = 1…S
```

This is not a cost estimate; it simply shows that a combined initial checkout does not imply one combined renewal.

### Worked example

One customer buys:

- monthly box at `$30`, quantity 2, recurring shipping `$8`;
- annual membership at `$120`, no shipping.

ArraySubs creates two subscriptions:

```text
Monthly renewal before tax = ($30 × 2) + $8 = $68
Annual renewal before tax = $120
```

Those orders have separate dates, payment attempts, failure states, and cancellation controls. The initial order can still contain both lines. If the customer cancels the annual membership, the monthly box is not automatically cancelled.

### Shipping

Separate subscription records are useful when addresses or shipping policies differ. A single subscription quantity is simpler when all units share one schedule and address. Current ArraySubs Pro stores shipping per subscription, so future operations should be designed around that object boundary.

### Failed payments

One subscription can fail while another remains active. Do not suspend all customer access unless the access rules explicitly depend on the failed subscription. Support views should show the affected subscription and renewal order, not merely “customer payment failed.”

## Metrics to monitor

Define observation windows before comparing policy changes.

```text
Duplicate-block rate
= blocked attempts caused by an existing live subscription
÷ checkout attempts containing a subscription

Migration completion rate
= completed plan migrations
÷ eligible duplicate-block or migration starts

Multi-subscription attach rate
= customers with 2+ live subscriptions
÷ customers with at least 1 live subscription

Multi-subscription failure incidence
= customers with at least one failed renewal in a closed period
÷ customers with 2+ renewal opportunities in that period

Support contacts per 100 multi-subscription customers
= multi-subscription policy/billing tickets
÷ multi-subscription customers × 100
```

Segment by gateway, product combination, same/different cadence, first-time/returning customer, and whether auto-migration was offered. Do not label one policy “better” from conversion alone; include refunds, failures, retained subscriptions, and support burden.

## Implementation and test checklist

1. Write the business rule in plain language before changing settings.
2. Decide separately: distinct products, same-product quantity, account-level live subscriptions, mixed cart, and different cycles.
3. List all enabled gateways and their actual capabilities.
4. Define the upgrade/migration path and blocked-state message.
5. Test logged-in and guest/same-email checkout.
6. Test active, trial, pending, and on-hold existing subscriptions.
7. Test two distinct subscription products and quantity two of one product.
8. Test monthly + annual, subscription + regular product, and each enabled gateway.
9. Place the order and confirm the number of ArraySubs records created.
10. Verify each record's product, quantity, next date, shipping, payment context, and parent order.
11. Simulate one failure/cancellation and confirm other subscriptions remain correct.
12. Review customer account labels and support instructions.

## Limitations and unknowns

- No browser checkout verified the latest built UI or exact notices.
- Gateway capability declarations are current source truth but still require sandbox testing with the installed gateway versions.
- “Most restrictive enabled gateway wins” can make global behavior stricter than selected-gateway capability; merchants need to test the exact enabled set.
- Current auto-migration eligibility is more specific than “a customer already has one subscription”; drafting should not promise every duplicate becomes a switch.
- The per-product setting does not provide the same historical/account constraint as WooCommerce Subscriptions' official Limit Subscription feature.
- Third-party cart, bundle, membership, multi-currency, and checkout-block extensions can alter composition and presentation.

## FAQ answers

### Can one ArraySubs checkout create multiple subscriptions?

Yes, when settings and gateway capabilities allow multiple distinct subscription products. Current ArraySubs creates one subscription per subscription order line, while quantity stays on that line's subscription.

### Does “One Subscription per Product” stop a customer buying the same product again later?

Do not describe it that way. The current executable rule primarily limits cart quantity for a subscription product to one. Use the customer-level policy and product/business logic for account-wide duplicate control.

### What happens when a customer buys monthly and annual plans together?

ArraySubs creates independent subscriptions with separate schedules. Stripe currently declares support for different cycles; Paddle and PayPal do not. The cart must pass both store settings and gateway capability checks.

### Should an upgrade create a second subscription?

Usually not when it replaces the same entitlement. Route eligible customers to plan switching or checkout migration so pricing, schedule, access, and audit history remain coherent.

### If one subscription fails, do all of the customer's subscriptions stop?

Not automatically. Each ArraySubs subscription has independent status, renewal order, and recovery state. Access logic should be tied to the affected product/subscription and tested for multi-subscription customers.

## Visual ideas

1. **Policy-stack diagram:** cart → product quantity → customer identity → mixed/different cycles → gateway capability → creation model.
2. **Gateway capability table:** Stripe/PayPal/Paddle with simple check/cross icons and a footnote that capabilities require testing.
3. **Object flowchart:** one initial order with three lines → two independent subscription records + one regular line.
4. **Decision tree:** duplicate versus independent need → switch/block/allow.
5. **Stacked bar:** illustrative annual renewal-order opportunities for one versus three subscriptions; clearly label as arithmetic, not benchmark.
6. **Annotated settings screenshot:** use the current General Settings multiple-subscriptions panel asset if present; otherwise generate a neutral setting matrix, not a fake UI screenshot.

## Internal-link suggestions

- Commercial hub: `/deals/arraysubs/features/#subscription-operations`
- Recipe: `/recipes/arraysubs/switch-at-renewal/`
- Recipe: `/recipes/arraysubs/downgrade-with-credit/`
- Recipe: `/recipes/arraysubs/subscription-notes-timeline/`
- Related A017, A018, A019 using their published content-plan slugs.
- Related A028: `/blogs/how-taxes-and-shipping-behave-on-subscription-renewals/`
- Related A029: `/blogs/changing-a-subscription-renewal-date-safely/`

## Product-truth files inspected

- `arraysubs/src/functions/settings-helpers.php`
- `arraysubs/src/Features/SubscriptionCheckout/Services/CartValidation.php`
- `arraysubs/src/Features/SubscriptionCheckout/Services/Traits/CartValidationTrait.php`
- `arraysubs/src/Features/SubscriptionCheckout/Services/Traits/SubscriptionCreationTrait.php`
- `arraysubs/src/Features/SubscriptionCheckout/Services/Traits/CheckoutMigrationTrait.php`
- `arraysubs/src/resources/pages/Settings/GeneralSettings.jsx`
- `arraysubspro/src/Features/AutomaticPayments/Services/CartRestrictions.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Stripe/StripeDelegate.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleGateway.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/PayPal/PayPalGateway.php`
- `user-manual/markdowns/settings/general-settings.md`

## Official external sources

All URLs accessed 2026-07-13.

- WooCommerce, **Subscriptions General Settings**: https://woocommerce.com/document/subscriptions/store-manager-guide/
- WooCommerce, **Creating a Subscription Product**: https://woocommerce.com/document/subscriptions/creating-subscription-products/
- WooCommerce, **Developer Guide to Multiple Subscriptions**: https://woocommerce.com/document/subscriptions/develop/multiple-subscriptions/
- WooCommerce, **Subscription Renewal Process**: https://woocommerce.com/document/subscriptions/renewal-process/
- WooCommerce, **Edit an Existing Subscription**: https://woocommerce.com/document/subscriptions/add-or-modify-a-subscription/update-an-existing-subscription/

## Drafting guardrails

- Do not equate ArraySubs “One Subscription per Product” with Woo Subscriptions “Limit Subscription.”
- State that current ArraySubs creates one subscription per subscription order line; do not use Woo's grouping model as ArraySubs truth.
- Mention gateway capability before recommending multiple/different-cycle carts.
- Do not use a conversion-rate-only recommendation; include renewals, failures, support, refunds, and operational clarity.
- Blocked customers need an actionable switch/manage path, not only an error.

# Research dossier: Can WooCommerce Do Subscriptions Without a Plugin? (A016)

**Research completed:** 2026-07-13  
**Article brief:** `web-content/content-plan/articles/016-can-woocommerce-do-subscriptions-without-a-plugin.md`  
**Primary keyword:** `WooCommerce subscriptions without a plugin`  
**Evidence policy:** current WooCommerce core documentation, official Stripe documentation, and current ArraySubs code/manuals. “Without a plugin” is separated from “without a paid plugin.”

## Direct-answer conclusion (40–60 words)

> WooCommerce core does not provide a complete subscription lifecycle by itself. You can ask customers to repurchase, create repeated manual invoices, use a payment provider’s hosted subscription link, or build custom code, but each moves subscription records, renewals, customer controls, fulfillment, or recovery outside native WooCommerce. A plugin is optional only if those tradeoffs are acceptable.

## Search intent and thesis

The searcher may mean one of three different things:

1. “Can free WooCommerce core automatically bill recurring orders?”
2. “Can I avoid paying for a subscription extension?”
3. “Can I take recurring money without installing WordPress code?”

The article must answer each. The strongest thesis is: **recurring collection is not the same as a WooCommerce subscription operation**. A provider can charge periodically without creating Woo renewal orders, updating inventory/access, exposing Woo account controls, or giving support one linked timeline.

## Key facts

1. Current WooCommerce core product documentation lists simple, grouped, external/affiliate, variable, virtual, and downloadable products; it does not document a core subscription product/agreement/lifecycle.
2. WooCommerce’s official Subscriptions extension is described as a premium extension that adds products/services with recurring payments and the surrounding management system.
3. Core WooCommerce can create manual orders and email payment links, but repeatedly doing so is invoicing—not an automatic recurring agreement with scheduled renewal state.
4. Stripe Payment Links can sell a subscription on a Stripe-hosted page without code. That is a Stripe subscription; Woo-native products, orders, stock, access, tax, shipping, portal, and reporting require an integration if they must stay synchronized.
5. Custom code is technically possible, but then the merchant owns schedules, payment credentials/tokens, webhooks, idempotency, SCA/3DS recovery, renewal orders, state, dunning, portal controls, migrations, logs, security, and maintenance.

## What WooCommerce core can and cannot do

| Capability | WooCommerce core alone | Clarification |
| --- | --- | --- |
| Sell a one-time simple/variable product | Yes | Core catalog and checkout behavior |
| Create/edit an order manually | Yes | Admin can add items and email an invoice/payment link |
| Let a customer repurchase | Yes | Each purchase is independent |
| Store normal order/customer/product data | Yes | Not an ongoing subscription agreement |
| Define next renewal date and recurring lifecycle | No documented core feature | Requires extension/integration/custom code |
| Generate scheduled renewal orders | No documented core feature | Manual repetition is not scheduled lifecycle management |
| Automatic off-session recurring collection | No general core engine | Depends on provider and integration |
| Subscription-specific account controls | No core subscription record | Cancel/pause/switch/payment update need implementation |
| Retry/grace/dunning and renewal notices | No complete core system | Must be provided elsewhere |

Safe wording: “WooCommerce core does not document a native subscription agreement and renewal engine.” Avoid the overbroad claim that a plugin is legally or technically required for every recurring-payment workaround.

## Five viable approaches

### 1. Customer manually repurchases

Workflow:

```text
one-time Woo product → order → customer returns later → another independent order
```

Best when demand is irregular, no continuing entitlement is promised, and the customer should decide each time. It is not a subscription because there is no future-payment agreement, next renewal, or lifecycle state.

### 2. Repeated WooCommerce manual invoices

WooCommerce supports manual order creation and an emailed payment link. An operator or external automation can create a new order every period and ask the customer to pay.

Tradeoffs:

- customer action is required every cycle;
- the team must decide who creates, checks, chases, and reconciles invoices;
- orders are not automatically joined by a core subscription agreement;
- expiry, access, shipping, failure, and cancellation logic must be operated separately;
- missed or duplicated invoices are an operational risk.

Good fit: a small number of high-touch B2B retainers where invoice review is intentional. Poor fit: high-frequency consumer replenishment that depends on automatic collection.

### 3. Provider-hosted recurring payment link

Stripe officially documents Payment Links as no-code, Stripe-hosted pages that can sell products or subscriptions. This can collect recurring payments without a Woo subscription plugin.

However, the resulting subscription is managed in Stripe. The following are not automatic consequences unless an integration implements them:

- WooCommerce renewal orders;
- Woo stock and recurring fulfillment;
- Woo tax/shipping semantics;
- WordPress membership/access updates;
- Woo My Account subscription actions;
- Woo-native coupons and product/variation rules;
- a single Woo support/audit timeline.

That list is an inference from the separation of systems, not a claim that Stripe lacks its own invoicing, tax, customer portal, or fulfillment tools.

### 4. Custom subscription integration

Minimum architecture:

```text
Woo checkout/product
  → payment customer/method/mandate
  → local agreement + next event
  → reliable scheduler or provider schedule
  → renewal order + idempotent payment/webhook
  → status/retry/grace/email/access/portal
  → reconciliation, migration, logs, deletion/privacy controls
```

The build is not finished when the first charge succeeds. It must safely handle duplicates, delayed/out-of-order webhooks, price/tax/address changes, zero totals, gateway downtime, customer authentication, cancellations, refunds, and upgrades.

### 5. Subscription plugin/extension

A plugin keeps the agreement and renewal workflow close to Woo products, orders, accounts, and operations. It still requires gateway compatibility, cron, updates, monitoring, policy, and testing; “plugin” does not mean “maintenance-free.”

This includes free plugins. Therefore **“without a paid plugin” and “without a plugin” are different questions**. ArraySubs Free is still a WordPress plugin; its no-license-cost core currently provides product and manual-renewal functionality. ArraySubs Pro adds the current automatic Stripe, PayPal, and Paddle paths.

## Decision tree

```text
Do you need a future payment or continuing agreement?
├─ No → sell a normal WooCommerce product; ask for repurchase later
└─ Yes
   ├─ Must renewals appear as Woo orders and drive Woo stock/access/account state?
   │  ├─ Yes
   │  │  ├─ Standard product/lifecycle → use a verified subscription plugin
   │  │  └─ Unique model at scale → evaluate a custom integration with full ownership
   │  └─ No
   │     ├─ Specific customers can approve each cycle → manual invoices may fit
   │     └─ Provider-hosted management is acceptable → hosted subscription link may fit
   └─ Is automatic collection required?
      ├─ Yes → verify exact gateway/method/country/version and recovery path
      └─ No → price the recurring manual collection and support workload
```

## Total-cost framework

Compare ownership, not only license price:

```text
annual total cost of ownership =
  software/license
  + build and integration
  + payment operations and reconciliation
  + support and manual collection
  + failure recovery and customer remediation
  + testing, monitoring, upgrades, security, compliance, and migration
```

Hypothetical manual-invoice workload:

```text
monthly labor hours = active customers × invoices per month × minutes per invoice ÷ 60
annual labor cost = monthly labor hours × 12 × loaded hourly cost
```

Example only: 80 customers × 1 monthly invoice × 4 minutes ÷ 60 = 5.33 hours/month. At a hypothetical $35 loaded hourly cost, annual labor is about $2,240 before payment chasing, reconciliation, errors, or growth. Do not present this as a benchmark; replace inputs with the merchant’s observed data.

## ArraySubs-specific current truth

Code/manual inspection on 2026-07-13 found:

- versions: core 1.8.9; Pro 1.1.0;
- core subscription product fields and subscription records;
- core scheduled invoice/payment hooks and manual pay-URL fallback;
- core customer/account and lifecycle systems;
- Pro automatic payment systems for Stripe, PayPal, and Paddle;
- automatic gateway behavior and features vary; test the exact checkout and renewal path;
- the article should disclose that ArraySubs is the first-party product discussed on this site.

Useful evidence:

- `arraysubs/src/Features/RecurringBilling/Services/PaymentProcessor.php` returns a Woo order payment URL when automatic handling is unavailable.
- `arraysubs/src/Features/RecurringBilling/Services/RenewalScheduler.php` schedules invoice and due-time renewal actions.
- `arraysubspro/src/Features/AutomaticPayments/` contains the current automatic-payment implementation.

Do not say “WooCommerce subscriptions are free with no plugin.” Accurate wording is “ArraySubs has a free plugin tier for subscription products and manual renewals; automatic ArraySubs gateway paths are Pro as verified on 2026-07-13.”

## Limitations and unknowns

- WooCommerce and provider capabilities change; confirm the installed version and current documentation.
- A hosted payment link can be the right solution when Woo-native order/account/fulfillment integration is not required.
- Manual invoices can be a deliberate workflow, not inherently inferior.
- Custom-code scope depends on region, payment method, product, volume, and provider ownership.
- This is not legal, tax, security, accounting, or PCI advice.
- No cost benchmark or failure rate was researched; all arithmetic is hypothetical.
- The article should not compare plugin prices frozen on a single date. Link to current pricing pages if commercial evaluation is needed.
- Avoid implying that the official WooCommerce Subscriptions extension is the only subscription plugin.

## Five FAQ answers

### Does free WooCommerce include subscriptions?

WooCommerce core includes one-time product and order features, but its current product documentation does not include a native subscription agreement and renewal engine. Add an extension/integration, use a provider-hosted subscription, or operate manual repurchases/invoices.

### Can I create a recurring invoice in WooCommerce without a subscription plugin?

You can manually create an order and email a payment link each period. Core WooCommerce does not turn those repeated orders into a complete scheduled subscription lifecycle with next dates, renewal state, customer controls, and dunning.

### Can Stripe Payment Links replace a WooCommerce subscription plugin?

Yes when a Stripe-hosted subscription and Stripe-managed customer journey meet the business need. No when Woo renewal orders, inventory, access, shipping/tax rules, My Account controls, or Woo-native reporting must stay synchronized without additional integration.

### Is custom code cheaper than a subscription plugin?

Not necessarily. Compare license cost with engineering, testing, monitoring, webhook/payment operations, security, support, reconciliation, migrations, and failure remediation. Use the merchant’s actual labor and risk inputs.

### Can I offer WooCommerce subscriptions without paying for a plugin?

Potentially, by installing a free subscription plugin or using a provider-hosted/manual approach. That is different from using no plugin. Verify which renewal modes and gateways the free tier actually supports.

## Visual plan

Use flat ArraySubs colors and simple shapes; no gradients, neon, glow, 3D, or fabricated UI.

1. Hero: Woo storefront at a crossroads—repurchase, invoice, provider link, custom code, plugin.
2. Core capability table as accessible HTML.
3. Five-option horizontal stage/ownership diagram.
4. Decision tree authored as SVG with exact text.
5. Ownership stack: who owns product, agreement, charge, order, access, portal for each approach.
6. Hypothetical labor bar chart: invoice preparation only versus invoice + chase/reconciliation using disclosed inputs.
7. TCO donut should be avoided unless real inputs exist; use blank worksheet blocks instead.
8. Provider-hosted flow with human customer leaving Woo and returning only if an integration syncs state.
9. Custom architecture flowchart.
10. ArraySubs Free/Pro boundary card, explicitly dated.

## Internal links

- Commercial disclosure/overview: `/deals/arraysubs/`
- Product and checkout feature map: `/deals/arraysubs/features/#products-checkout`
- Practical product recipes: `/deals/arraysubs/use-cases/recipes/monthly-vs-annual-variable/`, `/deals/arraysubs/use-cases/recipes/prepaid-fixed-cycles/`, `/deals/arraysubs/use-cases/recipes/lifetime-deal-one-time/`
- Siblings: A013 visible terms, A014 product-page anatomy, A015 launch readiness.

## Primary sources (accessed 2026-07-13)

1. WooCommerce, “Adding and Managing Products”: https://woocommerce.com/document/managing-products/
2. WooCommerce, “Introduction to WooCommerce Subscriptions”: https://woocommerce.com/document/subscriptions/
3. WooCommerce Subscriptions product page: https://woocommerce.com/products/woocommerce-subscriptions/
4. WooCommerce, “Single Order Page and Manually Adding an Order”: https://woocommerce.com/document/managing-orders/view-edit-or-add-an-order/
5. Stripe, “Payment Links”: https://docs.stripe.com/payment-links
6. Stripe, “Create a payment link”: https://docs.stripe.com/payment-links/create?pricing-model=standard
7. Stripe, “Recurring payments”: https://docs.stripe.com/recurring-payments
8. ArraySubs payment fallback: `arraysubs/src/Features/RecurringBilling/Services/PaymentProcessor.php`
9. ArraySubs scheduler: `arraysubs/src/Features/RecurringBilling/Services/RenewalScheduler.php`
10. ArraySubs Pro automatic payments: `arraysubspro/src/Features/AutomaticPayments/`


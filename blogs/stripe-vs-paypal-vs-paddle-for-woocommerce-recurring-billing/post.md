---
title: "Stripe vs PayPal vs Paddle for WooCommerce Recurring Billing"
meta_description: "Compare Stripe, PayPal, and Paddle for WooCommerce recurring billing by control, carts, SCA, recovery, tax ownership, webhooks, refunds, and total cost."
focus_keyword: "Stripe vs PayPal vs Paddle for WooCommerce recurring billing"
published: "2026-03-18"
updated: "2026-07-11"
last_verified: "2026-07-11"
author: "Emran"
author_affiliation: "ArrayHash"
---

# Stripe vs PayPal vs Paddle for WooCommerce Recurring Billing

Choose **Stripe** when you want WooCommerce to control renewals and need the most flexible carts, saved-payment recovery, and direct payment operations. Add **PayPal** when buyer preference justifies its one-plan checkout constraints. Choose **Paddle** for eligible software or digital subscriptions when Merchant-of-Record tax and compliance ownership matters more than Woo-native control. There is no universal winner.

In ArraySubs Pro, Stripe renewals are initiated by the WordPress store, while PayPal and Paddle run remote subscription schedules and report payments back by webhook. Paddle is the only one of these three ArraySubs integrations that acts as Merchant of Record for covered eligible sales.

> **Key takeaways**
>
> - Stripe makes ArraySubs/WooCommerce the billing control plane. That supports flexible carts and local recovery, but the merchant must operate scheduling, tax, webhooks, refunds, and disputes.
> - PayPal makes a remote buyer-approved subscription the control plane. It suits simple one-plan checkout with strong PayPal demand, but the current ArraySubs adapter rejects mixed carts, multiple subscriptions, and different cycles.
> - Paddle makes its remote catalog, checkout, subscription, and Merchant-of-Record service the commerce control plane. It fits eligible software/digital goods, supports same-cycle mixed carts, and shifts major tax/payment duties—but it is usually wrong for physical goods and human services.
> - When several automatic gateways are enabled, ArraySubs Pro currently applies a “most restrictive enabled gateway wins” cart policy before it also validates the buyer’s selected gateway. Test the combined configuration, not each provider in isolation.
> - Compare annual total operating cost and responsibility, not only transaction fees.

## Quick verdict by business model

| Business model | Primary choice | Optional second path | Why |
| --- | --- | --- | --- |
| Physical subscription box, replenishment, apparel, consumables | **Stripe** | PayPal for a deliberately simple isolated plan | Stripe supports mixed carts, multiple subscriptions, and different cycles; Paddle normally fails product eligibility |
| Global SaaS or downloadable software | **Stripe or Paddle** | PayPal if buyer demand is measurable | Choose between merchant control and Paddle’s Merchant-of-Record responsibility |
| Membership, community, course, digital publication | **Stripe** | PayPal | Flexible site-controlled billing plus a wallet option for customers who prefer approval through PayPal |
| Agency retainer, coaching, consulting, human service | **Stripe or manual invoice** | PayPal when suitable | Paddle says businesses primarily selling human services are not a fit |
| Complex WooCommerce catalog with add-ons and several cycles | **Stripe** | Usually none in the same open cart model | It is the only current ArraySubs adapter of the three with all three cart-flexibility flags |
| One simple subscription with unusually high PayPal preference | **PayPal can be primary** | Stripe for future flexibility | The remote agreement is defensible when the one-plan constraint matches the offer |
| Lean software company wanting global tax/invoice/chargeback operations outsourced | **Paddle** | Stripe if a separate direct-processing route is strategically justified | MoR responsibility may matter more than checkout control |

For a wider shortlist that also covers manual renewal and regional-gateway scenarios, read [Best Payment Gateways for WooCommerce Subscriptions](/payments-and-compliance/best-payment-gateways-for-woocommerce-subscriptions/). This guide goes deeper on the architectural choice among ArraySubs Pro’s three automatic integrations.

## Compare control planes, not payment logos

Stripe, PayPal, and Paddle can all produce recurring revenue, but they do not do so from the same place. The system that owns the clock, reusable payment authority, renewal transaction, and authoritative status is the **billing control plane**. That choice predicts what your team does when the thirteenth renewal fails at 2:00 a.m.

![Three billing control rooms show a WooCommerce-operated renewal lever, a remote wallet agreement clock, and a Merchant-of-Record operations team.](/blogs/stripe-vs-paypal-vs-paddle-for-woocommerce-recurring-billing/three-billing-control-planes.png)

### Stripe: ArraySubs and WooCommerce control billing

The official WooCommerce Stripe Gateway owns the initial card/payment UI, tokenization, and first payment. ArraySubs Pro stores the Stripe customer and payment-method context with the subscription. At renewal time, WordPress creates a WooCommerce renewal order and confirms an off-session Stripe PaymentIntent using the stored customer and method.

That means the site determines when the renewal is due, what the renewal order contains, which retry policy applies, and how a customer returns when authentication is required. Stripe moves money and returns authoritative transaction states, while webhooks reconcile asynchronous events.

The benefit is control: the local subscription model can support mixed carts, multiple subscription products, and different billing cycles. The cost is responsibility: your WordPress runtime, Action Scheduler, credentials, tokens, taxes, customer recovery, webhooks, refunds, disputes, and reconciliation must remain healthy.

### PayPal: the remote subscription agreement controls billing

ArraySubs Pro creates or reuses a PayPal Catalog Product and Billing Plan, then creates a PayPal Subscription. The buyer leaves WooCommerce for the provider’s approval experience. PayPal owns the recurring schedule and charges the approved agreement. ArraySubs does not make an off-session PayPal charge when WordPress reaches a local due timestamp.

The store instead creates or holds the local renewal context and waits for signed PayPal events such as `PAYMENT.SALE.COMPLETED`. The initial return path is also idempotent so a settled sale can complete correctly even if the webhook is slow. Approval alone is not treated as settled money on a nonzero order.

This architecture is useful when customers actively want PayPal, but the current adapter is intentionally narrow: one ArraySubs subscription per checkout, no regular-and-subscription mixed cart, and no different billing cycles together.

### Paddle: the remote provider controls recurring commerce

ArraySubs Pro synchronizes WooCommerce subscription products with Paddle Products and Prices. Paddle.js opens the provider checkout, Paddle creates the remote subscription, and Paddle schedules future renewal transactions. ArraySubs waits for `transaction.completed` to confirm money movement rather than charging Paddle at the local due time.

Paddle is also Merchant of Record for covered eligible sales. Its responsibility model includes payment processing, indirect-tax calculation/collection/remittance, invoicing, refunds, chargeback operations, and parts of consumer compliance. That is a much larger scope than ordinary processing.

The trade is structural. The remote catalog, pricing objects, checkout, customer portal, transactions, subscription schedule, tax evidence, and invoices become first-class operational dependencies. Paddle supports same-cycle multiple subscriptions and mixed one-time items in the current adapter, but it rejects different cycles and customer-defined terms through the synchronized-product path unless a reviewed developer override changes that behavior.

## What the customer sees can look deceptively similar

WooCommerce lists all three methods as payment providers, as the staged admin screen below shows. From a buyer’s perspective, each is a way to start a subscription. Behind the button, however, the lifecycle ownership is entirely different.

![Annotated WooCommerce payment-method list identifying the Stripe, PayPal, and Paddle recurring options available with ArraySubs Pro.](/blogs/stripe-vs-paypal-vs-paddle-for-woocommerce-recurring-billing/woocommerce-recurring-gateways.png)

The rule to remember is simple:

```text
same visible outcome at signup
≠ same renewal initiator
≠ same reusable payment authority
≠ same cart capability
≠ same tax seller
≠ same failure and migration path
```

[Automatic payment gateway capabilities in ArraySubs](/deals/arraysubs/features/#payment-gateways) connect these provider-specific control planes to the shared local subscription, renewal-order, customer-portal, and lifecycle system. Do not infer automatic support from a generic WooCommerce gateway being enabled. ArraySubs Free can create manual renewal invoices for other compatible methods; unattended billing requires an explicit automatic integration.

## First-party ArraySubs comparison matrix

The following matrix was reverified against ArraySubs 1.8.11 and ArraySubs Pro 1.1.2 on July 22, 2026. It describes the current adapters—not every feature the provider platforms advertise.

| Criterion | Stripe + ArraySubs Pro | PayPal + ArraySubs Pro | Paddle + ArraySubs Pro |
| --- | --- | --- | --- |
| Billing architecture | Site-initiated automatic renewal | PayPal-managed remote subscription | Paddle-managed remote subscription/transaction |
| Renewal initiator | ArraySubs confirms an off-session PaymentIntent | PayPal charges its Billing Plan schedule | Paddle creates and collects the renewal transaction |
| Initial checkout | Official WooCommerce Stripe Gateway | Redirect to PayPal subscription approval | Paddle.js overlay transaction |
| Local order confirmation | Immediate when succeeded; processing can await webhook | Return-side settled-sale confirmation or completed-sale webhook | `transaction.completed` webhook |
| Stored recurring context | Stripe Customer and PaymentMethod IDs; mandate where applicable | PayPal Product, Plan, and Subscription IDs | Paddle customer, Product/Price, Transaction, and Subscription IDs |
| Payment update | Stripe Billing Portal session | New authorization and agreement migration | Paddle customer portal session |
| ArraySubs-controlled SCA path | Yes, including `requires_action` recovery | No; buyer/provider approval owns authentication | No; Paddle Checkout/provider owns 3DS |
| Mixed regular + subscription cart | Supported by adapter | Not supported | Supported by adapter |
| Multiple subscription products | Supported by adapter | Not supported | Supported when cycles match |
| Different billing cycles in one checkout | Supported by adapter | Not supported | Not supported |
| Customer-defined/flexible terms | Possible with local terms; test exact product workflow | Not exposed and constrained by remote plan | Rejected by product sync unless deliberately overridden |
| Remote product/catalog dependency | No ArraySubs product sync | Remote Product/Plan created and cached | Required Product/Price sync |
| Existing recurring-amount update | Capability enabled; renewal uses current local order total | Capability disabled | Capability disabled |
| Remote pause/resume | Not applicable; no remote Stripe subscription | Not exposed by adapter | Supported by adapter |
| Scheduled cancellation reversal | Local lifecycle only | Not exposed | Supported by clearing remote scheduled change |
| Refund path | Official Woo Stripe route with renewal-ID normalization | PayPal sale refund using transaction ID | Paddle Adjustment; may remain pending approval |
| Dispute signals in ArraySubs | Created/closed events mapped | Created/resolved events mapped | No ArraySubs dispute workflow; Paddle handles as MoR |
| Tax/seller model | Merchant remains seller/MoR in normal direct processing | Merchant remains seller and tax owner | Paddle is MoR for covered eligible sales |
| Strongest fit | Flexible Woo-first physical/digital/membership/SaaS | Simple subscription with strong wallet preference | Eligible software/digital business prioritizing MoR |

Do not read this as a scorecard where the provider with the most “supported” cells wins. A remote pause feature does not help a physical-goods merchant that cannot use Paddle. Flexible carts do not help an entity Stripe cannot onboard. A Merchant-of-Record service can be either a strategic advantage or the wrong legal/commercial relationship.

## The cross-gateway cart rule most comparisons miss

The current ArraySubs Pro `CartRestrictions` service first applies a **most restrictive enabled gateway wins** policy to its site-wide cart permissions. If any enabled automatic gateway lacks mixed-cart, multiple-subscription, or different-cycle support, the corresponding global ArraySubs cart permission can become false. It then performs a second checkout validation against the gateway the buyer selected.

![A cart-composition workbench shows flexible, one-plan, and same-clock gateway lanes connected by shared restriction mechanisms.](/blogs/stripe-vs-paypal-vs-paddle-for-woocommerce-recurring-billing/cart-compatibility-workbench.png)

Practical examples:

- Stripe alone supports a one-time add-on plus multiple subscription items with different cycles in the adapter.
- Enabling PayPal alongside Stripe can narrow the shared ArraySubs cart because PayPal supports none of those three shapes.
- Enabling Paddle can allow mixed items and multiple subscriptions but still remove different-cycle carts.
- A developer filter can change the policy, but that is a reviewed integration decision—not a safe assumption for merchants.

This does **not** mean WooCommerce cannot offer multiple processors. It means the exact subscription plugin must maintain a cart that every enabled automatic route can represent, unless checkout architecture isolates routes or code deliberately changes the shared rule.

Test these configurations separately:

1. Stripe enabled alone.
2. PayPal enabled alone.
3. Paddle enabled alone.
4. Stripe + PayPal.
5. Stripe + Paddle.
6. All three.
7. Every product/cart shape customers can construct.

A merchant that publishes “mix any plan in one basket” based on Stripe-only QA can create a regression simply by enabling PayPal later.

## Hard gates before comparison scores

Remove any option that fails a hard gate. A weighted average cannot rescue legal ineligibility or a broken cart.

1. **Entity eligibility:** Can the provider onboard the merchant’s legal entity, country, industry, and risk category?
2. **Product eligibility:** Are physical goods, software, content, membership, services, or regulated categories accepted?
3. **Cart compatibility:** Can the exact adapter represent the intended one-time items, subscription count, billing cycles, trials, signup fees, tax, shipping, and customer-defined terms?
4. **Recurring method support:** Can the desired card, bank debit, wallet, or local method actually be saved/approved for unattended renewal? First-checkout display is not proof.
5. **Seller/tax model:** Must the business remain Merchant of Record, or does it deliberately want Paddle to be the legal seller for covered transactions?
6. **Runtime reliability:** Can WordPress run scheduled actions, and can the public HTTPS site receive signed webhooks without CDN/firewall damage?
7. **Recovery path:** Can the customer authenticate, replace a payment source, and restore the subscription after failure?
8. **Finance reconciliation:** Can the team match Woo order, ArraySubs subscription, provider transaction, fee, tax, payout, refund, dispute, and currency conversion?
9. **Migration tolerance:** Can old agreements be retired only after new authority is proven, without a duplicate payment?

Examples of immediate elimination:

- Physical subscription box: remove Paddle based on its [acceptable-use guidance](https://www.paddle.com/help/start/intro-to-paddle/what-am-i-not-allowed-to-sell-on-paddle).
- Cart must combine several cycles: remove PayPal and Paddle under the current adapter matrix.
- Merchant country is not supported for a Stripe account: remove Stripe unless an eligible legal/settlement structure actually exists ([Stripe global availability](https://stripe.com/global)).
- Site has no reliable public HTTPS webhooks: do not launch PayPal or Paddle automatic billing; repair infrastructure first.

## Geographic reach, currency, and recurring-method reality

Provider reach changes, so this section was verified July 20, 2026 and should be rechecked before launch.

### Stripe

Stripe account availability depends on merchant country. Its currency documentation describes card presentment in more than 135 currencies, but settlement currencies, minimums, conversion, local methods, and account capabilities vary ([Stripe currencies](https://docs.stripe.com/currencies)). A method displayed at initial checkout may not support future off-session use; Stripe publishes a method-level [future-use support matrix](https://docs.stripe.com/payments/payment-methods/payment-method-support).

The ArraySubs Stripe adapter’s cart flexibility comes from local renewal architecture. It does not magically make every Stripe method reusable. Test cards, bank debits, wallets, and local methods separately.

### PayPal

PayPal operates across many countries, but receiving, withdrawals, card features, subscription products, and merchant capabilities are not identical. Its [REST currency reference](https://developer.paypal.com/api/rest/reference/currency-codes/) says support depends on payment type and country/account settings. A currency the merchant does not hold can also require an acceptance preference or remain pending.

The current ArraySubs adapter is a direct PayPal Subscriptions integration; do not attribute the official WooCommerce PayPal Payments extension’s full capability set to it.

### Paddle

Paddle publishes seller-country exclusions and operates subject to underwriting, sanctions, and product policy. Paddle Billing documents more than 30 payment currencies, with a narrower balance/payout set ([Paddle supported currencies](https://developer.paddle.com/concepts/sell/supported-currencies/)). Available customer methods are selected by location, currency, and device.

Broad country reach does not override product eligibility. Verify the business and catalog before building a synchronized Paddle checkout.

### Why this guide does not publish a fee table

Headline rates are not comparable without merchant country, payment method, cross-border routing, currency conversion, refund treatment, disputes, tax tooling, payout model, MoR scope, contract, and volume. Prices also change. Obtain current account-specific terms and compare annual operating cost instead.

## Stripe in depth: maximum WooCommerce control

Stripe is usually the strongest choice when the subscription catalog is complex or the merchant wants WordPress/WooCommerce to remain the operational ledger.

### Checkout and stored authority

The official WooCommerce Stripe extension renders the payment flow and stores reusable payment context without putting raw card numbers in WordPress. WooCommerce documents [saved payment information](https://woocommerce.com/document/stripe/customer-experience/saved-payment-information/) and [3D Secure at checkout and Pay for Order](https://woocommerce.com/document/stripe/customer-experience/3d-secure/).

ArraySubs stores the Stripe customer and PaymentMethod IDs, plus mandate context where applicable. Renewal requests set `off_session=true` and `confirm=true`. Stripe’s SetupIntent documentation explains the need for customer permission and correct future-use setup; a later issuer challenge can still occur ([Stripe SetupIntents](https://docs.stripe.com/payments/setup-intents)).

### Renewal states are not binary

The current adapter handles:

- `succeeded`: complete the renewal;
- `processing`: keep the local order pending for asynchronous confirmation;
- `requires_action`: store the PaymentIntent and a Pay-for-Order recovery URL;
- hard failure: return the failed result to the shared retry/lifecycle engine.

It also searches recent subscription-tagged PaymentIntents during reconciliation, reducing the risk of blindly recharging after an ambiguous response. The adapter advertises three attempts separated by a day, but stores should verify how that interacts with current core retry, grace, email, and access settings.

![Annotated expanded Stripe Gateway Health card distinguishing the official WooCommerce Stripe webhook and ArraySubs secondary endpoint.](/blogs/stripe-vs-paypal-vs-paddle-for-woocommerce-recurring-billing/stripe-webhook-status.png)

Stripe has two relevant event paths here: hooks from the official WooCommerce Stripe webhook and an ArraySubs secondary REST endpoint for subscription-specific reconciliation. A green checkout is not proof both paths are correct. The [Stripe automatic billing and SCA recipe](/deals/arraysubs/use-cases/recipes/stripe-automatic-billing-sca/) covers configuration; this article owns the architectural decision.

### Refunds and disputes

ArraySubs delegates refunds to the official WooCommerce Stripe gateway. It can normalize an older renewal PaymentIntent reference to the underlying charge before the official gateway processes a refund. WooCommerce documents the admin path in [refunding Stripe orders](https://woocommerce.com/document/stripe/admin-experience/refunding-orders/).

The adapter maps refund and dispute events and uses a sync guard to avoid echo loops when an external refund is reflected locally. Finance still needs to reconcile gross amount, Stripe fee, refunded amount, exchange, dispute, and payout rather than treating Woo order status as the complete financial record.

### Stripe non-fit cases

- Entity/product cannot be onboarded.
- Team cannot keep WordPress jobs and two-way webhook operations reliable.
- Business specifically wants a Merchant of Record.
- Tax, disputes, refunds, and compliance operations exceed internal capacity.
- Fully provider-managed schedule is a strategic requirement.

Read [Stripe Recurring Payments for WooCommerce: How They Work and What to Test](/payments-and-compliance/stripe-recurring-payments-for-woocommerce-how-they-work-and-what-to-test/) for the complete lifecycle once that focused guide is the next implementation question.

## PayPal in depth: buyer preference with a narrower agreement

PayPal should win because the audience wants it and the offer fits—not because a familiar wallet logo seems obligatory.

### Product, plan, approval, subscription

PayPal’s official model is Product → Billing Plan → Subscription → buyer approval ([PayPal integration model](https://developer.paypal.com/subscriptions/integrate)). ArraySubs Pro creates/caches the remote objects by a pricing signature that includes currency, amount, signup fee, interval, trial, and an effective tax percentage.

The buyer follows PayPal’s approval URL. ArraySubs records the remote subscription ID and waits for a settled sale before completing a nonzero order. At renewal, PayPal executes its schedule; ArraySubs waits for a completed-sale webhook and attaches the sale transaction to the local renewal order.

### Cart and tax constraints

The adapter uses the first subscription in checkout and explicitly disallows mixed items, multiple subscriptions, and different cycles. Its flow also sets `shipping_preference` to `NO_SHIPPING`, reinforcing that this specific adapter is not a universal PayPal physical-goods checkout.

The remote plan includes a WooCommerce-derived effective tax percentage based on the initial order location and product tax class. Different tax signatures can create different cached plans. Do not claim that PayPal recalculates WooCommerce tax on every renewal or remits the merchant’s tax. Existing agreements also do not expose seamless recurring-amount updates through the current capability map.

### Failures and payment changes

The plan enables outstanding-balance billing and a failure threshold. PayPal documents [subscription failure retries](https://developer.paypal.com/docs/multiparty/subscriptions/customize/payment-failure-retry/), while ArraySubs consumes completed, denied, failed, suspended, cancelled, and expired events. A suspended agreement is not automatically the same as a cancelled one.

Updating a PayPal payment source is reauthorization/migration, not a local card edit. A replacement agreement must not leave the old one collecting. The article’s staged settings screen intentionally shows sandbox mode and blank credentials:

![Annotated ArraySubs PayPal sandbox settings screen with safe blank credential fields.](/blogs/stripe-vs-paypal-vs-paddle-for-woocommerce-recurring-billing/paypal-sandbox-credentials.png)

### Refund nuance

The adapter refunds a PayPal **sale transaction**, not a remote subscription ID. A legacy order containing only an `I-...` subscription ID fails safely and needs provider-dashboard handling. The current code uses PayPal’s v1 sale-refund context, which PayPal labels deprecated for broader new integrations ([PayPal v1 payments reference](https://developer.paypal.com/docs/api/payments/v1/)). Treat this as a mandatory current sandbox test and engineering-review item, not evidence that every PayPal refund is broken.

### PayPal non-fit cases

- Mixed or multi-subscription cart is central to conversion.
- Several billing cycles must share checkout.
- Existing subscribers need frequent price/cycle changes.
- Business wants a seamless embedded card editor rather than buyer reauthorization.
- Operations cannot reconcile remote agreement, sale transaction, signed events, and local orders.

Use the focused [PayPal recurring payments guide](/payments-and-compliance/paypal-recurring-payments-for-woocommerce-agreements-renewals-and-limits/) when the agreement lifecycle is the main implementation question.

## Paddle in depth: Merchant of Record and remote catalog

Paddle is not “Stripe with taxes included.” It changes who sells the product to the customer and which system owns the commerce records.

### Responsibility transfer

Paddle describes itself as Merchant of Record and says it handles covered payment processing, indirect-tax calculation/collection/remittance, invoicing, refunds, fraud, and chargeback operations ([Paddle MoR guide](https://www.paddle.com/resources/how-to-evaluate-a-merchant-of-record)).

![A split responsibility ledger shows direct processors leaving the merchant with operating duties while an MoR receives some responsibilities and the seller retains others.](/blogs/stripe-vs-paypal-vs-paddle-for-woocommerce-recurring-billing/merchant-responsibility-ledger.png)

This does not remove every obligation. The software seller still owns accurate product classification, product and fulfillment, privacy/data handling, contracts, revenue recognition/accounting, sanctions and customer questions within its scope, plus professional advice. Paddle may reject a product or business.

### Catalog and checkout

ArraySubs synchronizes Woo subscription products/variations to Paddle Products and recurring Prices. A price/term change creates a new remote Price and archives the old because existing subscriptions retain their referenced objects. One-time cart items can receive cached one-time Prices. The Paddle.js overlay creates a transaction, and the Woo order remains pending until completion arrives by webhook.

This supports same-cycle multiple subscriptions and mixed items. Different billing cycles and customer-selected terms are rejected through the product-sync path by default.

![Annotated ArraySubs Paddle sandbox settings screen emphasizing a safe test-mode configuration without exposing credentials.](/blogs/stripe-vs-paypal-vs-paddle-for-woocommerce-recurring-billing/paddle-sandbox-credentials.png)

Paddle also requires the account/domain and Default Payment Link setup associated with its checkout. Blank fields in a screenshot are not a functioning integration; configure in sandbox and prove the full event chain before live use.

### Renewal, portal, lifecycle, and refunds

Paddle schedules subscription renewal transactions. ArraySubs confirms them through `transaction.completed` and handles failed/past-due events. The adapter supports remote pause, resume, immediate/end-of-period cancellation, undo scheduled cancellation, and a Paddle customer-portal session for payment updates.

Refunds create Paddle Adjustments. Paddle documents that a live refund can start `pending_approval`; “refund requested” must not be communicated as “refund settled” ([Paddle adjustment workflow](https://developer.paddle.com/build/transactions/create-transaction-adjustments/)). Disputes are handled within Paddle’s MoR operation; the current ArraySubs capability map does not expose a Paddle dispute workflow.

### Paddle non-fit cases

- Physical goods or a business primarily selling human services.
- Unsupported seller country, product category, or risk model.
- Merchant must remain contractual seller/MoR.
- Several billing cycles must share one checkout.
- Business refuses a remote catalog, hosted checkout/portal, or external invoice/tax record.
- Easy provider exit and Woo-native object ownership outrank MoR operations.

For a dedicated responsibility and implementation analysis, continue to [Paddle Merchant of Record for WooCommerce Subscriptions](/payments-and-compliance/paddle-merchant-of-record-for-woocommerce-subscriptions/).

## Payment-source updates reveal the real architecture

![Three lifecycle ribbons compare a local token recovery page, wallet reauthorization, and hosted Merchant-of-Record payment portal.](/blogs/stripe-vs-paypal-vs-paddle-for-woocommerce-recurring-billing/payment-source-lifecycle.png)

| Question | Stripe | PayPal | Paddle |
| --- | --- | --- | --- |
| What is reusable? | Stripe PaymentMethod attached to customer | Remote PayPal subscription agreement | Payment source held in Paddle subscription/customer context |
| Where does update start? | ArraySubs flow opens Stripe Billing Portal | New buyer authorization | ArraySubs flow opens Paddle customer portal |
| What changes locally? | Stored/display method context and next charge source | Replacement agreement and IDs | Synced remote method display/context |
| Biggest risk | Updated method not used by next local renewal | Old and replacement agreements both remain active | Temporary portal/session mishandled or remote update not synchronized |

Use the [member payment-update recipe](/deals/arraysubs/use-cases/recipes/member-update-payment/) to test the product-specific path. Support copy must name the actual experience. “Update your card in WooCommerce” is misleading when the customer must reauthorize through PayPal or use Paddle’s hosted portal.

## Webhooks are not optional on any of the three

Even site-initiated Stripe renewals need events for asynchronous processing, refunds, disputes, and reconciliation. PayPal and Paddle depend on signed provider events to confirm remote renewal money and lifecycle changes.

ArraySubs Pro’s shared webhook router:

1. resolves the gateway;
2. verifies the provider signature;
3. parses and normalizes the event;
4. rejects a stored duplicate event ID;
5. resolves local subscription, order, and customer;
6. dispatches the normalized event;
7. records the successful event ID and log outcome.

Provider details still matter:

- Stripe events can arrive through official Woo Stripe hooks and the secondary ArraySubs endpoint.
- PayPal verification sends the transmission headers, body, and configured Webhook ID to PayPal; a wrong REST app or missing ID rejects delivery.
- Paddle documents at-least-once delivery and possible out-of-order events. Verify the `Paddle-Signature` over the unmodified raw body and reconcile by authoritative state/timestamp ([Paddle webhook behavior](https://developer.paddle.com/webhooks/about/how-webhooks-work/)).

![Annotated ArraySubs Gateway Health overview comparing configuration and event visibility for Stripe, PayPal, and Paddle.](/blogs/stripe-vs-paypal-vs-paddle-for-woocommerce-recurring-billing/gateway-health-comparison.png)

Gateway Health surfaces provider cards, modes, subscription counts, last-webhook evidence, and recent events. It can show readiness signals; it cannot guarantee a future payment. Use the [Gateway Health monitoring recipe](/deals/arraysubs/use-cases/recipes/gateway-health-monitor/) and assign an incident owner.

## Compare total annual operating cost, not a fee percentage

![A total-cost workbench surrounds a small payment tag with tax, scheduler, webhook, support, recovery, refund, reconciliation, and migration tools.](/blogs/stripe-vs-paypal-vs-paddle-for-woocommerce-recurring-billing/recurring-billing-total-cost.png)

Use a formula that includes the work your team actually performs:

```text
annual recurring-billing TCO
= provider and FX fees
+ tax tools and filings
+ engineering and hosting
+ scheduler and webhook operations
+ failed-payment recovery
+ payment-support labor
+ refund and dispute labor
+ finance reconciliation
+ migration risk reserve
```

Stripe may have the strongest direct-processing economics for a team that already operates tax and payments well. Paddle may be cheaper overall for a small eligible software company if the MoR service truly replaces substantial work. PayPal may raise conversion among a wallet-preferring audience enough to justify its separate support and lifecycle path. None of those conclusions can be derived from a universal fee table.

## A weighted total-stack decision model

After hard gates, score each remaining option from 1–5 using evidence from your account and staging tests.

| Criterion | Suggested weight | Evidence behind a high score |
| --- | ---: | --- |
| Renewal reliability and recovery | 20% | Clear initiator, signed events, idempotency, failure recovery, diagnostics |
| Checkout/cart fit | 15% | Required items, cycles, trials, tax, shipping, discounts all work |
| Customer payment preference | 10% | Target audience wants and can use supported recurring methods |
| Tax/compliance responsibility fit | 15% | Seller/MoR model matches team capacity and strategy |
| Customer self-service | 10% | Payment update, invoice, cancellation, authentication recovery are clear |
| Finance/refund/dispute operations | 10% | Transactions, fees, tax, payouts, adjustments, disputes reconcile |
| Engineering/WordPress operations | 10% | Team can maintain scheduler, endpoints, logs, upgrades, incidents |
| Migration/exit flexibility | 5% | Agreements can transition with controlled consent and cutover |
| Total cost of ownership | 5% | Full cost—not only provider rate—is acceptable |

```text
weighted fit
= sum of each criterion's
  rating times its weight
```

### Worked scenario: monthly subscription box with add-ons

- Paddle fails product eligibility.
- PayPal fails the required mixed-cart/multiple-cycle shape.
- Stripe passes and becomes the primary automatic gateway.
- PayPal can be considered only for a deliberately isolated simple subscription path after combined-gateway cart QA.

### Worked scenario: two-person global SaaS team

- Stripe and Paddle pass product eligibility.
- Increase tax/compliance responsibility to 30%; reduce cart flexibility to 5%.
- Paddle may outrank Stripe because MoR replaces meaningful registrations, filings, invoice, chargeback, and payment-support work.
- Stripe still wins if the company has that capacity and prioritizes checkout, pricing, customer-data, billing, and migration control.

### Worked scenario: paid community with strong PayPal demand

- Stripe remains the flexible primary route.
- PayPal is added for a measured customer segment.
- The team tests combined cart restrictions, approval/return, signed events, agreement suspension, payment-source reauthorization, and sale-ID refunds.
- Paddle is considered only if the eligible digital product and MoR relationship independently fit.

After the decision is evidence-backed, [view ArraySubs Pro pricing](/deals/arraysubs/pricing/) for the gateway and operations features. Keep provider terms and eligibility as a separate evaluation.

## Migration risk: changing a setting does not move authority

Switching the default method changes future checkout. It does not transform a Stripe PaymentMethod into a PayPal agreement or a Paddle subscription.

### Stripe exit

Stripe customer and PaymentMethod IDs belong to Stripe. A new provider needs compliant authority and usually customer action or an approved migration program. Local scheduling makes the due date easier to reason about, but it does not reveal reusable card numbers.

### PayPal exit

The remote PayPal subscription continues until it is cancelled or suspended. A new provider requires new authorization. Flipping a WooCommerce option while leaving the agreement active can produce two collectors.

### Paddle exit

Paddle is customer-facing Merchant of Record. Subscription status, remote catalog/prices, invoices, tax evidence, portal experience, refunds, and customer communications are more deeply tied to the provider. Exit is a commercial and data-record project as well as a payment cutover.

### Duplicate-charge guardrails

1. Export every active, trial, paused, past-due, scheduled-cancel, and pending subscription.
2. Record old agreement/token ID, next date, last transaction, currency, tax treatment, and local IDs.
3. Declare one source of renewal truth during each cutover cohort.
4. Suppress one scheduler before activating another.
5. Prove the new authorization and next billing date.
6. Reconcile all open renewals and delayed webhooks.
7. Cancel the old agreement only after the new path is verified.
8. Monitor both systems for at least a full billing cycle.

Never perform a bulk database edit that merely replaces gateway slugs. That changes labels, not legal payment authority.

## Launch checklist

### Common preflight

- [ ] Confirm entity country, payout currency, product category, risk, and provider acceptance.
- [ ] Confirm the exact method supports recurring/off-session use.
- [ ] Separate test/live credentials, modes, webhook IDs, and secrets.
- [ ] Verify WordPress cron/Action Scheduler, HTTPS, DNS, TLS, CDN/firewall, and site time zone.
- [ ] Test classic and block checkout if both are enabled.
- [ ] Test ordinary signup, free trial, signup fee, coupon, tax, shipping, and add-on where supported.
- [ ] Verify Woo order, ArraySubs subscription, gateway slug, remote object, and transaction IDs.
- [ ] Trigger a renewal and observe local state before/after remote confirmation.
- [ ] Cause a failure and prove retry, grace, email, access, and payment update.
- [ ] Test immediate/end-of-period cancellation where supported.
- [ ] Test initial and renewal full/partial refunds.
- [ ] Redeliver a webhook and prove one business effect.
- [ ] Simulate out-of-order events and reconcile authoritative state.
- [ ] Reconcile gross, fee, tax, net, conversion, payout, refund, and dispute.

### Stripe-specific

- [ ] Check official and secondary webhook health in both modes.
- [ ] Confirm customer/PaymentMethod IDs after signup.
- [ ] Test succeeded, processing, hard-decline, and `requires_action` renewal outcomes.
- [ ] Test 3DS at checkout and Pay for Order.
- [ ] Test mixed items, multiple subscriptions, and different cycles.
- [ ] Update a method in Stripe Billing Portal, then run the next renewal.
- [ ] Refund initial and renewal orders and verify charge/intent mapping.

### PayPal-specific

- [ ] Configure Client ID, secret, Webhook ID, sandbox, and correct endpoint.
- [ ] Prove Product/Plan/Subscription creation and buyer approval/return.
- [ ] Verify approval without settled sale does not mark money paid.
- [ ] Confirm completed-sale events store sale transaction IDs.
- [ ] Prove incompatible carts are rejected with clear messages.
- [ ] Test trial, setup fee, tax-plan signature, failure retries, suspension, and cancellation.
- [ ] Reauthorize without leaving duplicate active agreements.
- [ ] Refund a real renewal sale ID; verify legacy subscription-ID-only failure is safe.

### Paddle-specific

- [ ] Obtain product/business eligibility before integration investment.
- [ ] Configure API/client credentials, seller, notification secret, Default Payment Link, and domain.
- [ ] Sync every intended product/variation and verify tax category.
- [ ] Prove overlay → pending order → completed transaction → remote subscription → entitlement.
- [ ] Test same-cycle multiple subscriptions and one-time items; reject different cycles.
- [ ] Change a Woo price and verify new/archived remote Price behavior.
- [ ] Test portal payment update, pause/resume, cancellation, and undo scheduled cancellation.
- [ ] Test failed/past-due, duplicate, and out-of-order events.
- [ ] Distinguish refund request from approved/completed adjustment.

## When ArraySubs is not the best fit

ArraySubs Pro exposes these three automatic architectures; Free provides manual renewal. Consider a custom integration or another subscription stack when:

- automatic billing through a different gateway is non-negotiable;
- product/business is Paddle-ineligible but MoR is mandatory;
- site cannot run reliable scheduled actions or public HTTPS webhooks;
- usage/metered billing, marketplace splits, or complex enterprise amendments dominate;
- PayPal must support mixed carts and frequent existing-plan changes;
- fully embedded payment editing is required instead of portals/reauthorization;
- remote product/catalog and MoR customer relationships are unacceptable;
- migration is expected to preserve credentials/agreements without consent;
- the shared most-restrictive cart policy cannot match the store’s checkout architecture.

The honest non-fit is better than a payment system that starts subscriptions successfully but cannot operate their renewals.

## Final recommendation

Choose on three axes:

1. **Control:** Stripe keeps renewal timing and amount close to WooCommerce; PayPal and Paddle own remote schedules.
2. **Responsibility:** Stripe and PayPal leave the merchant as seller and tax operator; Paddle becomes MoR for covered eligible sales.
3. **Catalog reality:** Stripe is the flexible cart route; PayPal is the simple one-plan route; Paddle is the eligible digital same-cycle route.

Then test the combined enabled-gateway policy, customer payment updates, failure recovery, signed event delivery, refunds, cancellation, finance reconciliation, and migration guardrails. The winner is the system whose limitations your store can deliberately accept and operate.

## Frequently asked questions

### Is Stripe or PayPal better for WooCommerce subscriptions?

Stripe is generally better for flexible carts and site-controlled renewals. PayPal can be better for a simple subscription when the audience strongly prefers PayPal approval. In the current ArraySubs adapter, enabling PayPal introduces one-subscription, no-mixed-cart, and no-different-cycle constraints that must be tested with Stripe enabled.

### Is Paddle better than Stripe for SaaS?

Paddle may be better for eligible SaaS when Merchant-of-Record tax, invoice, refund, and chargeback operations outweigh Woo-native control. Stripe may be better when the business wants to remain the seller, control checkout/billing, retain local pricing flexibility, and preserve easier provider independence.

### Can all three gateways be enabled together?

Yes, but the current ArraySubs cart policy can apply the most restrictive enabled gateway’s capabilities globally before selected-gateway validation. All three together can therefore restrict carts to shapes the narrowest adapter supports. Test every combined configuration and product mix.

### Does PayPal recalculate tax on every renewal?

Do not assume so. The current adapter builds the remote plan with a checkout-time WooCommerce-derived effective tax percentage and caches plans by a pricing/tax signature. Address, rate, taxable product, and existing-agreement changes require deliberate testing and professional tax review.

### Does Paddle remove every tax and compliance duty?

No. Paddle acts as Merchant of Record for covered eligible sales and assumes significant payment, indirect-tax, invoice, refund, and dispute responsibilities. The software seller still owns product classification, fulfillment, privacy, accounting/revenue recognition, contracts, and other obligations. Obtain qualified advice.

### Which gateway supports the easiest payment-method update?

They are different rather than universally easier. Stripe opens Billing Portal for a stored method, PayPal requires a new buyer authorization/agreement migration, and Paddle opens its customer portal. Test whether the next renewal uses the updated authority and whether any old agreement remains active.

### Do webhooks create duplicate renewals?

Well-designed handlers use signatures, event IDs, transaction reconciliation, and idempotent transitions. ArraySubs records processed event IDs, but providers can deliver duplicates and out of order. Test repeated events and confirm there is only one charge, renewal order, entitlement change, and customer message.

### Can I switch existing subscribers from PayPal to Stripe by changing their gateway field?

No. A PayPal agreement does not become a Stripe PaymentMethod. The customer needs new authority or an approved migration program, and the old remote agreement must remain controlled until the new path and next date are proven.

## Test scope, limitations, and update log

- **Verified:** July 22, 2026 against ArraySubs 1.8.11, ArraySubs Pro 1.1.2, WooCommerce 10.9.4, and official WooCommerce Stripe Gateway 10.8.4. Provider-reach documentation was last checked July 20, 2026 and remains a pre-launch recheck item.
- **Evidence:** Current plugin source, official current provider documentation, and safe staging UI with sandbox/blank credential states.
- **Not claimed:** No live or sandbox charge, 3DS challenge, retry, refund, dispute, remote portal action, catalog mutation, remote cancellation, or signed provider-to-staging webhook delivery was represented as completed.
- **Availability:** Countries, currencies, methods, prices, underwriting, product policy, and legal/tax responsibility can change; recheck provider terms and obtain qualified legal, tax, accounting, and payment-compliance advice.
- **Scope:** Provider documentation may describe features the current ArraySubs adapter does not expose. This article uses the inspected adapter matrix for product claims.
- **Authorship and verification:** Written and fact-checked by Emran for ArrayHash.

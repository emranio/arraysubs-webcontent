# Research: Stripe vs PayPal vs Paddle for WooCommerce Recurring Billing

## Research record

- Brief: `articles/057-stripe-vs-paypal-vs-paddle-for-woocommerce-recurring-billing.md`
- Recommended URL: `/deals/arraysubs/resources/payments-and-compliance/stripe-vs-paypal-vs-paddle-for-woocommerce-recurring-billing/`
- Content cluster: C05 — Payment gateways, SCA, tax, and Merchant of Record
- Search intent: commercial investigation
- Focus query: `Stripe vs PayPal vs Paddle for WooCommerce recurring billing`
- Researched and source-verified: 2026-07-20
- Product source inspected: ArraySubs core `1.8.11` and ArraySubs Pro `1.1.2`
- Confirmed staging context supplied for the publishing workflow: WooCommerce `10.9.4`, official WooCommerce Stripe Gateway `10.8.4`, ArraySubs `1.8.11`, and ArraySubs Pro `1.1.2`
- Evidence base: current ArraySubs/ArraySubs Pro source plus current official WooCommerce, Stripe, PayPal, and Paddle documentation
- Test boundary: this research includes source-code inspection and documentation verification. It does not claim a successful live or sandbox charge, 3DS challenge, refund, dispute, remote plan change, remote cancellation, provider-to-site webhook delivery, or country-specific account approval. Those require configured provider accounts, public HTTPS endpoints, and test buyers.
- Product boundary: this is an **ArraySubs implementation comparison**, not a generic comparison of everything Stripe, PayPal, or Paddle can do. ArraySubs Pro ships automatic integrations for Stripe, PayPal, and Paddle. ArraySubs Free creates manual renewal invoices and does not make arbitrary WooCommerce gateways automatic.

## Direct answer for the first 150 words

Use a 40–60 word answer like this before any table or CTA:

> Choose Stripe when you want WooCommerce to control renewals and need the most flexible carts, saved-payment recovery, and direct payment operations. Add PayPal when buyer preference justifies its one-plan checkout constraints. Choose Paddle for eligible software or digital subscriptions when Merchant-of-Record tax and compliance ownership matters more than Woo-native control. There is no universal winner.

The next sentence should make the ArraySubs architecture explicit:

> In ArraySubs Pro, Stripe renewals are initiated by the WordPress store, while PayPal and Paddle run remote subscription schedules and report payments back by webhook; Paddle is the only one of these three integrations that is a Merchant of Record.

Do not interrupt this opening with the pricing CTA. The reader should receive the verdict, scope, and first comparison table first.

## Core thesis: compare control planes, not logos

The article should organize the comparison around three control planes. This is more useful than a feature-count roundup because it predicts what happens during the 13th renewal, not just the first checkout.

### 1. Stripe + ArraySubs Pro: WooCommerce/ArraySubs is the billing control plane

- The official WooCommerce Stripe Gateway owns the initial Stripe checkout UI, tokenization, first-payment processing, and standard WooCommerce refund integration.
- ArraySubs Pro stores the Stripe customer and payment-method context on the subscription.
- At renewal time, ArraySubs creates the WooCommerce renewal order and sends a confirmed, off-session Stripe PaymentIntent using the stored customer and payment method.
- A succeeded intent completes the renewal immediately. A processing intent remains pending for webhook confirmation. A `requires_action` or authentication-required result creates a customer recovery context rather than pretending the renewal succeeded.
- The site therefore owns scheduling, renewal-order creation, retry policy, customer recovery messaging, and most reconciliation decisions.

Operational implication: Stripe gives the store the most direct control and cart flexibility, but the merchant also owns the WordPress runtime, scheduled actions, tax/compliance model, webhook operations, dispute workflow, and recovery experience.

### 2. PayPal + ArraySubs Pro: PayPal is the recurring-agreement control plane

- ArraySubs creates or reuses a PayPal Catalog Product and a Billing Plan, then creates a PayPal Subscription.
- The buyer leaves the WooCommerce checkout for PayPal’s approval URL.
- PayPal owns the recurring schedule and charges the approved subscription. ArraySubs does not create an off-session PayPal charge at the WooCommerce renewal due time.
- ArraySubs creates/keeps a local renewal order pending and waits for `PAYMENT.SALE.COMPLETED` or other signed PayPal subscription webhooks. The initial order also has an idempotent return-side confirmation path so a slow webhook is not the only possible completion signal.
- The current adapter supports a single ArraySubs subscription per checkout, rejects mixed subscription/regular carts, and rejects different billing cycles in the same checkout.

Operational implication: PayPal is valuable when customer trust and demand justify the approval handoff, but its ArraySubs implementation is a narrower, provider-owned agreement model. Do not attribute the full capability set of the PayPal Subscriptions API or the official WooCommerce PayPal Payments extension to this adapter.

### 3. Paddle + ArraySubs Pro: Paddle is the recurring and commerce control plane

- ArraySubs syncs WooCommerce subscription products to Paddle Products and Prices, and uses Paddle catalog prices in a Paddle.js overlay transaction.
- Paddle creates and schedules the remote subscription. At renewal, ArraySubs does not charge Paddle; it waits for the provider’s `transaction.completed` event to confirm money movement.
- Paddle is the legal Merchant of Record for covered transactions and takes responsibility for payment processing, tax calculation/collection/remittance, invoicing, and much of the dispute/compliance operation.
- The adapter exposes pause, resume, cancel-at-period-end, reversal of scheduled cancellation, customer-portal payment updates, refunds through Adjustments, mixed carts, and multiple subscriptions. It does not support different billing cycles in one checkout.
- Product/price synchronization is a structural dependency. Price or billing-term changes create a new remote price and archive the old price because existing remote subscriptions still reference it.

Operational implication: Paddle can remove a large tax and payment-operations burden for an eligible software or digital business, but the merchant trades away some Woo-native control, accepts a remote catalog and hosted customer experience, and must fit Paddle’s product policy.

## Quick verdict by business type

### Physical subscription box, consumables, apparel, or replenishment commerce

**Verdict: Stripe first; PayPal may be an additional option; Paddle is normally disqualified.**

- Stripe’s current ArraySubs capability map supports mixed carts, multiple subscriptions, and different billing cycles.
- PayPal is reasonable only if the store can isolate it to simple single-plan checkouts and buyer demand is strong.
- Paddle says physical goods are not a good fit under its Acceptable Use Policy. Treat eligibility as a hard gate, not a low score.

Primary Paddle eligibility source, verified 2026-07-20: https://www.paddle.com/help/start/intro-to-paddle/what-am-i-not-allowed-to-sell-on-paddle

### Global SaaS, downloadable software, app, game, or eligible digital product

**Verdict: decide between Stripe control and Paddle responsibility; add PayPal only for measured buyer demand.**

- Stripe is the better default when the company wants to remain the seller/Merchant of Record, keep WooCommerce as the operational ledger, customize recovery, and preserve easier exit/migration options.
- Paddle may be the better total-stack choice for a lean team that values global tax, invoicing, chargeback, and compliance operations more than a Woo-native payment control plane.
- PayPal can increase choice, but its one-subscription/no-mixed-cart constraints should be accepted deliberately.

### Membership, course, community, or digital publication

**Verdict: Stripe is usually the primary; PayPal is often the most rational complement.**

- Stripe supports a direct saved-payment and authentication-recovery path.
- PayPal can serve an audience that strongly prefers wallet approval and does not need multi-plan checkout.
- Paddle is viable only when the product and business model are accepted as eligible digital/software commerce and the team wants the MoR model.

### Agency retainer, consulting, coaching, or human services

**Verdict: Stripe or manual invoices; do not assume Paddle eligibility.**

- Paddle explicitly says a business whose primary offering is human services is not a good fit.
- Stripe supports site-controlled recurring charges when the merchant can operate them.
- ArraySubs Free/manual renewal is defensible for high-value invoices, bank transfer, purchase orders, or customer approval at each cycle.

### Complex WooCommerce catalog with bundles, one-time add-ons, and several cycles

**Verdict: Stripe.**

- Stripe’s shipped capability map is the only one of the three that supports mixed carts, multiple subscriptions, and different billing cycles together.
- Paddle supports mixed carts and multiple subscriptions but not different billing cycles.
- PayPal supports none of those three cart-shape capabilities in the current adapter.

### A simple one-plan product with unusually strong PayPal demand

**Verdict: PayPal can be primary, provided the remote-schedule and reauthorization tradeoffs are acceptable.**

- The business should test approval returns, webhooks, failed-payment behavior, refund transaction IDs, and a customer payment-source change before launch.
- If the store expects to introduce add-ons, multiple plans, or mixed carts soon, use Stripe as the main path and PayPal as a constrained secondary option.

## Hard gates before any weighted score

The writer should present these as yes/no eliminators. A high average cannot rescue a failed hard gate.

1. **Merchant account eligibility:** Can the legal entity onboard and receive payouts in the required country?
2. **Product eligibility:** Does the provider accept the product, service, and risk category?
3. **Cart compatibility:** Does the exact ArraySubs adapter support the store’s mixed items, number of subscription products, billing cycles, and customer-defined terms?
4. **Recurring payment-method support:** Can the customer’s preferred method be saved or approved for unattended renewals? One-time checkout support is not enough.
5. **Tax operating model:** Does the business want to remain the seller/Merchant of Record, or is it willing and eligible to use a provider that becomes the legal seller?
6. **Webhook and scheduler reliability:** Can the site receive signed HTTPS webhooks and run WordPress scheduled actions reliably?
7. **Recovery path:** Is there a tested path for declines, SCA/customer action, expired or changed payment sources, and past-due subscriptions?
8. **Migration tolerance:** Can the business preserve or reauthorize active agreements without a billing gap or duplicate charge?
9. **Finance reconciliation:** Can finance reconcile the WooCommerce order, ArraySubs subscription, remote transaction, fees, tax, refund, dispute, payout, and exchange rate?

## Comparison matrix: ArraySubs 1.8.11 / Pro 1.1.2

Caption this as first-party product behavior inspected on 2026-07-20. Do not present it as a universal provider matrix.

| Criterion | Stripe + ArraySubs Pro | PayPal + ArraySubs Pro | Paddle + ArraySubs Pro |
|---|---|---|---|
| Billing architecture | Site-initiated automatic renewal | PayPal-managed remote subscription | Paddle-managed remote subscription and transaction |
| Renewal initiator | ArraySubs confirms an off-session PaymentIntent | PayPal charges on its Billing Plan schedule | Paddle creates/collects the renewal transaction |
| Initial checkout | Official WooCommerce Stripe Gateway | Redirect to PayPal subscription approval | Paddle.js overlay transaction |
| Local order confirmation | Immediate on succeeded intent; processing can await webhook | Return-side confirmation or `PAYMENT.SALE.COMPLETED` webhook | `transaction.completed` webhook |
| Stored recurring context | Stripe Customer + PaymentMethod IDs, mandate where applicable | PayPal Product/Plan/Subscription IDs; subscription is the agreement | Paddle customer, product/price, transaction, and subscription IDs |
| Payment-method update | Stripe Billing Portal session | New PayPal authorization; existing agreement migration is disruptive | Paddle customer portal session |
| ArraySubs-controlled SCA path | Yes: off-session `requires_action` recovery | No ArraySubs SCA capability; buyer/provider approval applies | No ArraySubs SCA capability; Paddle Checkout/provider handles 3DS where required |
| Mixed regular + subscription cart | Supported by adapter | Not supported | Supported by adapter |
| Multiple subscription products | Supported by adapter | Not supported | Supported by adapter when cycles match |
| Different billing cycles in one checkout | Supported by adapter | Not supported | Not supported |
| Customer-defined/flexible billing terms | Possible because site initiates from local terms; test exact product workflow | Not an exposed capability and constrained by remote plan | Rejected for product-sync gateway unless a developer override is deliberately added |
| Remote product/catalog dependency | None for ArraySubs product sync | Product and price/tax-specific Billing Plan created/cached for checkout | Required Paddle Product + Price sync; changed price creates a new price |
| Existing recurring-amount update | Capability flag true; renewal uses current Woo order total | Capability flag false | Capability flag false |
| Pause/resume | No remote Stripe subscription exists; adapter flags both false | Adapter flags both false, although PayPal’s wider API has operations ArraySubs does not expose | Supported remotely by adapter |
| Scheduled cancellation reversal | Not a remote Stripe schedule feature | Not exposed | Supported by clearing Paddle scheduled change |
| Refund path | Official Woo Stripe refund path, with ArraySubs normalization for renewal transactions | PayPal sale refund; requires a sale transaction ID | Paddle Adjustment API; request may be pending approval |
| Dispute signals in ArraySubs | Stripe charge-dispute created/closed events mapped | PayPal dispute created/resolved events mapped | Capability flag false; Paddle as MoR handles disputes outside an ArraySubs dispute workflow |
| Webhook dependence | High for reconciliation and lifecycle events, but site initiates renewals | Critical for remote renewal confirmation and lifecycle sync | Critical for remote renewal confirmation and lifecycle sync |
| Tax/seller model | Merchant remains seller/MoR in normal Stripe Payments integration | Merchant remains seller and owns tax obligations in the relevant agreement/jurisdiction | Paddle is MoR for covered eligible sales |
| Best fit | Flexible WooCommerce-first physical/digital/membership/SaaS stores | Simple subscription checkout with strong PayPal preference | Eligible SaaS/software/digital commerce prioritizing MoR operations |
| Main non-fit | Merchant cannot onboard, cannot operate scheduling/webhooks, or wants MoR responsibility transfer | Mixed/multiple/different-cycle carts or seamless method/plan changes | Physical goods, human services, unsupported business/country, or need for Woo-native catalog/billing control |

### Critical cart nuance when more than one gateway is enabled

The article should surface this first-party finding because a generic provider comparison will miss it:

- `CartRestrictions.php` first applies a **“most restrictive enabled gateway wins”** policy to ArraySubs’ site-wide cart filters.
- If any enabled automatic gateway lacks mixed-cart, multiple-subscription, or different-cycle support, the corresponding global ArraySubs cart permission can become false, unless a gateway-specific developer filter overrides it.
- The same service then performs a second checkout-time validation against the gateway the buyer actually selected.

Practical result: enabling PayPal alongside Stripe can narrow the store’s global ArraySubs cart composition even though Stripe itself supports the flexible cart. Enabling Paddle can similarly remove different-cycle carts. The merchant must test the combined enabled-gateway configuration; reading the Stripe column in isolation is not enough.

Code: `arraysubspro/src/Features/AutomaticPayments/Services/CartRestrictions.php:19-305`, paired with core cart filters in `arraysubs/src/Features/SubscriptionCheckout/Services/CartValidation.php:98-177`.

Do not turn this into a blanket warning that multiple gateways are impossible. WooCommerce supports offering more than one payment processor, but the exact plugin’s compatibility rules still govern cart composition. Official WooCommerce context: https://woocommerce.com/document/subscriptions/payment-gateways/

## Geographic reach and currencies

Keep this section architecture-first and date-stamped. Availability changes; direct the reader to recheck provider pages before launch.

### Stripe

- Stripe account availability is limited to its current supported merchant countries/regions. A merchant should not infer account eligibility from the ability to show Stripe to buyers elsewhere.
- Stripe’s currency documentation says card charges can be presented in more than 135 currencies, but local payment methods, settlement currencies, minimums, and country availability vary.
- A method appearing in Stripe Checkout does not prove it can be saved for future off-session renewals. Stripe explicitly notes that some methods cannot be set up for future usage, and methods have currency/region limits.

Sources verified 2026-07-20:

- https://stripe.com/global
- https://docs.stripe.com/currencies
- https://docs.stripe.com/payments/payment-methods/payment-method-support
- https://docs.stripe.com/payments/payment-methods/dynamic-payment-methods

### PayPal

- PayPal’s REST APIs support many countries for PayPal-account payments, but country-specific receiving, withdrawal, card processing, merchant features, and subscription eligibility vary.
- PayPal’s REST currency reference lists supported currencies and warns that support depends on payment type and merchant country/account settings.
- A payment in a currency the merchant does not hold can remain pending until manually accepted unless receiving preferences are configured.

Sources verified 2026-07-20:

- https://developer.paypal.com/reference/country-codes/
- https://developer.paypal.com/api/rest/reference/currency-codes/
- https://developer.paypal.com/api/rest/troubleshooting/rest_unsupported_payee_currency/

### Paddle

- Paddle says it works with software businesses globally except its published unsupported countries/regions and subject to sanctions, underwriting, and product policy.
- Paddle Billing supports 30+ payment currencies and a smaller set of balance/payout currencies; actual payment methods are selected dynamically by customer location, transaction currency, and device.
- Country reach does not override product eligibility. Physical goods and businesses primarily selling human services remain explicit non-fit cases.

Sources verified 2026-07-20:

- https://www.paddle.com/help/start/intro-to-paddle/which-countries-are-supported-by-paddle
- https://developer.paddle.com/concepts/sell/supported-currencies/
- https://developer.paddle.com/concepts/payment-methods/
- https://www.paddle.com/help/start/intro-to-paddle/what-am-i-not-allowed-to-sell-on-paddle

### Wording rule for counts and fees

- It is acceptable to say “Stripe documents 135+ presentment currencies” or “Paddle documents 30+ payment currencies” only with the 2026-07-20 verification date and a nearby link.
- Do not give a universal country count for PayPal or claim that listed REST countries all have identical receiving/subscription functionality.
- Do not embed a provider fee table. Pricing, cross-border surcharges, currency conversion, refund treatment, MoR fees, tax-product fees, negotiated rates, and payout costs vary by country and plan.

## Checkout experience and cart behavior

### Stripe checkout

- The official WooCommerce Stripe extension supplies the customer-facing checkout and secure tokenization layer.
- WooCommerce documents cards, wallets/express checkout, and local methods, but the methods usable for automatic renewal are a narrower subset. WooCommerce’s subscriptions gateway page specifically notes normal cards and additional methods that tokenize through SEPA for automatic renewal in the official extension.
- The ArraySubs Stripe adapter’s broad cart capability comes from its local renewal architecture, not from every Stripe payment method being reusable off-session.
- The official Woo Stripe extension supports 3DS on checkout and Pay for Order, which matters when bringing a customer back for an authenticated recovery.

Sources:

- https://woocommerce.com/document/stripe/
- https://woocommerce.com/document/stripe/customer-experience/saved-payment-information/
- https://woocommerce.com/document/stripe/customer-experience/3d-secure/
- https://woocommerce.com/document/subscriptions/payment-gateways/

### PayPal checkout

- The current ArraySubs adapter creates the PayPal subscription server-side, extracts the `approve` link, and redirects the buyer to PayPal.
- It sets `shipping_preference` to `NO_SHIPPING`, reinforcing that this specific flow is not a general mixed physical-goods PayPal checkout.
- The adapter only uses the first local subscription ID and the cart restriction explicitly states one subscription, no mixed items, and no different billing cycles.
- On return, an `APPROVED` agreement is not treated as a settled charge. The adapter waits for an active agreement plus a completed transaction/sale ID before marking a nonzero initial order paid.

PayPal’s official integration model is Product → Plan → Subscription → buyer approval: https://developer.paypal.com/subscriptions/integrate

### Paddle checkout

- The adapter uses a Paddle.js overlay and creates a Paddle transaction containing Paddle price IDs for the WooCommerce order’s line items.
- Subscription products use the synced recurring Price. Regular products in a mixed cart get a cached one-time Paddle Price based on the line-unit amount and currency.
- The order stays pending until Paddle’s completed transaction event confirms payment.
- Paddle requires a Default Payment Link/domain configuration. The current settings screen explains the sandbox and live setup separately.
- Paddle supports multiple subscriptions only when the billing cycles match. Product-sync gateways reject customer-selected billing terms that diverge from the stored synced price unless a deliberate developer override is applied.

Paddle checkout source: https://developer.paddle.com/concepts/sell/self-serve-checkout/

## Tax and Merchant-of-Record responsibility

This is the most consequential Stripe/Paddle distinction. Keep the section educational, date-stamped, and explicitly not legal or tax advice.

### Stripe and PayPal: payment processing does not automatically transfer seller responsibility

- Stripe’s own MoR explainer says that in regular direct Stripe Payments transactions, the business remains the Merchant of Record; Stripe Managed Payments is a distinct MoR product and is not what the inspected ArraySubs adapter integrates.
- Stripe Tax can calculate/collect tax and provide reporting/filing partner workflows, but Stripe’s documentation still instructs the merchant to determine obligations, register, report, file, and remit unless using a separate responsibility model.
- The inspected ArraySubs PayPal adapter creates the merchant’s PayPal Product, Billing Plan, and Subscription. It is not a Merchant-of-Record integration.
- PayPal’s U.S. Platform Seller Account Agreement states that the seller is responsible for determining, assessing, collecting, reporting, and remitting applicable tax. Do not generalize one jurisdiction’s agreement globally; use it as evidence that PayPal processing should not be described as a universal MoR service.

Sources:

- https://stripe.com/resources/more/merchant-of-record
- https://docs.stripe.com/tax/how-tax-works
- https://docs.stripe.com/tax/filing
- https://www.paypal.com/us/legalhub/paypal/pp-pos-ps?country.x=US&locale.x=en_US

### PayPal’s ArraySubs tax-plan nuance

The current adapter calculates an effective WooCommerce tax percentage using the initial order location and product tax class, puts that tax percentage into the remote PayPal Billing Plan, and includes the tax signature in the plan-cache key.

This means:

- two buyers with different effective tax rates can produce/reuse different remote plans;
- the remote PayPal agreement is based on the checkout-time plan configuration;
- tax-rate, address, product-taxability, and recurring-total changes must be tested carefully because the adapter does not expose retention amount updates or a seamless existing-agreement mutation path.

Do not say “PayPal recalculates WooCommerce tax on every renewal” or “PayPal remits the merchant’s tax.” The code does not support either claim.

Code: `arraysubspro/src/Features/AutomaticPayments/Gateways/PayPal/PayPalGateway.php:1403-1742`.

### Paddle: Merchant of Record for eligible covered transactions

- Paddle describes itself as the legal seller/Merchant of Record for covered transactions and says it handles payment processing, tax calculation/collection/remittance, invoicing, and chargeback/dispute operations.
- Paddle’s current documentation says Paddle Billing handles sales-tax liability for supported countries/currencies.
- The inspected ArraySubs integration uses Paddle’s remote Products, Prices, Transactions, Subscriptions, Adjustments, webhooks, and customer portal, consistent with the MoR architecture.

However, avoid “Paddle removes every legal/tax obligation.” The seller still needs correct product classification, contracts, privacy/data practices, revenue recognition/accounting, fulfillment, sanctions checks, and professional advice. Paddle can also reject a business or product.

Sources:

- https://www.paddle.com/resources/how-to-evaluate-a-merchant-of-record
- https://developer.paddle.com/concepts/sell/supported-currencies/
- https://developer.paddle.com/migrate/learn/feature-comparison/
- https://www.paddle.com/help/start/intro-to-paddle/what-am-i-not-allowed-to-sell-on-paddle

## Tokens, payment-source updates, and SCA

### Stripe

- Initial checkout tokenization happens through the official Woo Stripe extension; raw card numbers are not stored in WordPress.
- ArraySubs stores a Stripe customer ID and payment-method ID and forwards a stored mandate for supported bank-debit types where applicable.
- The renewal request sets `off_session=true` and `confirm=true`.
- Stripe says off-session credentials should be saved with customer permission and configured for future usage. Proper setup can allow merchant-initiated treatment, but issuer exemptions are not guaranteed.
- If Stripe returns `requires_action`, the adapter stores the PaymentIntent and a Pay-for-Order action URL and returns a specific `requires_action` status.
- The customer payment update path creates a Stripe Billing Portal session in the current adapter.

Sources:

- https://docs.stripe.com/payments/setup-intents
- https://docs.stripe.com/strong-customer-authentication?locale=en-GB
- https://woocommerce.com/document/stripe/customer-experience/3d-secure/
- https://woocommerce.com/document/stripe/customer-experience/saved-payment-information/

### PayPal

- The stored remote recurring object is the PayPal subscription/agreement, not a WooCommerce card token that ArraySubs can freely charge.
- The buyer’s approval creates authority for PayPal’s remote schedule.
- The current payment-method update mechanism is `reauthorize`: a new PayPal authorization and migration to a new payment source. The code calls this disruptive because the old agreement must be replaced/cancelled.
- The adapter’s `sca` capability is false because ArraySubs does not run a Stripe-style SCA workflow. Do not translate that into “PayPal has no authentication” or “PayPal is exempt from SCA.” The buyer approval/provider experience owns authentication.
- PayPal does not send the card-update-style webhook the adapter expects from a direct card vault; the current handler explicitly treats payment updates differently.

### Paddle

- Paddle Checkout collects and stores the payment source in Paddle’s environment. The ArraySubs subscription stores display/context IDs, not raw credentials.
- The update path creates a Paddle customer-portal session. Paddle documents payment updates, invoices, and subscription management in the hosted portal.
- Paddle Checkout documents 3DS2 support and provider-side authentication. The ArraySubs `sca=false` capability means ArraySubs does not expose its own SCA workflow; it does not mean Paddle ignores SCA.
- The adapter maps `subscription.updated` into payment-method update handling and can refresh stored method display details.

Sources:

- https://developer.paddle.com/concepts/sell/customer-portal/
- https://developer.paddle.com/build/subscriptions/update-payment-details/
- https://developer.paddle.com/concepts/sell/self-serve-checkout/

## Renewal, failure recovery, and schedule ownership

### Stripe failure model

- ArraySubs creates and charges the renewal order locally.
- The Stripe adapter publishes a retry configuration of three attempts at one-day intervals for Stripe subscriptions.
- A hard failure returns failed; a customer-authentication requirement returns `requires_action`; a processing result remains pending.
- The adapter can search recent PaymentIntents for the subscription/order to reconcile whether a charge happened before retrying.
- The adapter resets retry attempts after a successful webhook-confirmed payment.

The article should tell operators to test their exact core retry/grace-period configuration rather than promising one universal dunning schedule.

### PayPal failure model

- PayPal runs the payment attempts according to its plan. The current plan payload sets `auto_bill_outstanding=true` and `payment_failure_threshold=3`.
- PayPal’s official documentation says it retries failed subscription payments and can accumulate outstanding balances; exact behavior depends on the plan and PayPal platform rules.
- ArraySubs consumes `BILLING.SUBSCRIPTION.PAYMENT.FAILED`, sale denied, suspension, cancellation, expiration, and successful-sale webhooks.
- A suspended PayPal subscription is recorded as a paused gateway context in ArraySubs; it should not be conflated automatically with cancellation.

Source: https://developer.paypal.com/docs/multiparty/subscriptions/customize/payment-failure-retry/

### Paddle failure model

- Paddle creates subscription renewal transactions automatically. ArraySubs waits for `transaction.completed` to confirm a successful renewal and handles `transaction.payment_failed` for failures.
- Paddle documents that automatically collected renewal transactions become past due after a payment attempt fails.
- Paddle may layer its own recovery products/workflows on top of Billing, but the article must not imply that every Paddle Retain feature is configured by the ArraySubs adapter.

Sources:

- https://developer.paddle.com/build/transactions/create-transaction/
- https://developer.paddle.com/webhooks/simulator/subscription-renewed/
- https://developer.paddle.com/webhooks/transactions/transaction-payment-failed/
- https://developer.paddle.com/webhooks/transactions/transaction-past-due/

## Webhook operations and idempotency

### Shared ArraySubs pipeline

`WebhookRouter.php` performs the following sequence for ArraySubs REST webhook endpoints:

1. Resolve the gateway.
2. Verify the provider signature.
3. Parse and normalize the event.
4. Check the stored event ID for duplicates.
5. Resolve the local subscription, order, and customer.
6. Dispatch the normalized event to a gateway-specific handler.
7. Store the event ID after successful handling and log the outcome.

Code: `arraysubspro/src/Features/AutomaticPayments/Services/WebhookRouter.php:1-263`.

### Stripe has two webhook paths in this integration

- The Stripe delegate listens to the official WooCommerce Stripe webhook hooks for events handled by the official extension.
- It also supports an ArraySubs secondary Stripe REST endpoint for subscription-specific reconciliation/events not exposed in the needed form by the official plugin.
- Gateway Health reports official and secondary endpoint configuration separately, combines `stripe` and `arraysubs_stripe` event-log slugs, and shows the most recent webhook time.
- WooCommerce says current official Stripe versions provision their endpoint on connection and shows separate Test/Live configured states.

Sources:

- https://woocommerce.com/document/stripe/setup-and-configuration/stripe-webhooks/
- https://docs.stripe.com/webhooks

### PayPal

- The adapter requires the configured PayPal Webhook ID and posts PayPal’s transmission headers, raw body, and Webhook ID back to PayPal’s verification API.
- Missing Webhook ID or a failed verification rejects the event.
- PayPal documents retrying non-2xx webhook deliveries and requires a reachable HTTPS endpoint tied to the correct REST app.

Sources:

- https://developer.paypal.com/api/rest/webhooks/
- https://developer.paypal.com/docs/subscriptions/reference/webhooks/

### Paddle

- The adapter verifies `Paddle-Signature` against the configured notification secret.
- Paddle documents at-least-once delivery, possible out-of-order arrival, deduplication by `event_id`, and signature verification over the unmodified raw body.
- ArraySubs performs event-ID deduplication, but the article’s test checklist should still include duplicate and out-of-order scenarios because status reconciliation can fail even when duplicate charges are prevented.

Sources:

- https://developer.paddle.com/webhooks/about/how-webhooks-work/
- https://developer.paddle.com/webhooks/about/signature-verification/
- https://developer.paddle.com/webhooks/about/respond-to-webhooks/

## Refunds and disputes

### Stripe

- ArraySubs delegates refunds to the official WooCommerce Stripe Gateway.
- Before WooCommerce processes a renewal refund, the adapter normalizes an older PaymentIntent-style transaction reference to the backing Stripe charge when necessary.
- Stripe supports full and partial refunds, but pending/failed behavior depends on balance and payment method.
- The event map includes refund and dispute events; external Stripe refunds can be mirrored into WooCommerce while a two-way sync guard prevents echo loops.

Sources:

- https://woocommerce.com/document/stripe/admin-experience/refunding-orders/
- https://docs.stripe.com/refunds

### PayPal

- The adapter refunds a PayPal sale transaction, not the PayPal subscription ID.
- A legacy order that contains only an `I-...` subscription ID is explicitly rejected for automatic refund and must be handled in the PayPal dashboard.
- The current adapter uses the PayPal v1 sale-refund model because PayPal Subscriptions sale events supply that transaction context. PayPal labels the wider `/v1/payments` API deprecated. This is a product engineering review item and a mandatory sandbox-test case, not a reason to claim all PayPal refunds are broken.
- The event map includes sale refunds/reversals and dispute created/resolved events.

Source: https://developer.paypal.com/docs/api/payments/v1/

### Paddle

- The adapter creates a Paddle Adjustment with `action=refund` and the remote transaction ID.
- Paddle says billed/completed transaction records are not mutated; Adjustments sit alongside them.
- Paddle supports full and partial refunds, but most live refund requests may begin `pending_approval` and later move to approved or rejected. “Refund request created” therefore must not be reported as “money returned.”
- Paddle’s MoR team handles chargebacks, while the ArraySubs capability map does not expose a Paddle dispute workflow.

Sources:

- https://developer.paddle.com/build/transactions/create-transaction-adjustments/
- https://developer.paddle.com/api-reference/adjustments/

## Remote catalog, plan changes, and retention changes

### Stripe

- ArraySubs does not create Stripe Billing Subscriptions or sync Woo products to Stripe Products/Prices for this integration.
- Renewal amount comes from the current WooCommerce renewal order, so the adapter advertises retention amount updates.
- This preserves local pricing control but places responsibility on the store to keep WooCommerce subscription/order totals, taxes, coupons, and entitlement state aligned.

### PayPal

- ArraySubs creates a Catalog Product once and caches Billing Plans by a signature containing currency, amount, signup fee, interval, trial, and tax configuration.
- A new price/tax configuration can create a different plan for future checkouts, but the current adapter does not advertise retention amount updates for an already active PayPal subscription.
- PayPal’s broader API can patch or revise some plan/subscription fields, often with constraints or buyer consent, but those capabilities are not automatically present in the ArraySubs adapter.

Provider API context: https://developer.paypal.com/docs/api/subscriptions/v1/

### Paddle

- Product/Price sync is required. The product name/description and a recurring Price are stored remotely.
- When a Woo price or billing term changes, the sync service creates a new remote Price and archives the old one because Paddle prices cannot simply be rewritten for existing references.
- Existing subscriptions keep their referenced remote price until a supported remote subscription change is performed. The current capability map does not expose retention amount updates.
- The adapter gives synced products a `standard` Paddle tax category. Product teams must verify that classification is correct for what they sell; do not imply that a generic category guarantees correct tax treatment.

Code: `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleProductSync.php:1-370`.

## Migration and exit risk

The article should be explicit that changing the enabled default gateway affects new checkout, not necessarily the stored agreements of existing subscribers.

### Stripe → another provider

- Stripe PaymentMethod IDs and customer IDs belong to Stripe and cannot simply become PayPal or Paddle agreements.
- The store should freeze duplicate renewal creation, reconcile every open renewal, collect fresh customer consent where required, and validate the new schedule before cancelling the old path.
- Stripe’s site-owned schedule can make the timing easier to reason about, but credentials still do not port as generic card numbers.

### PayPal → another provider

- The PayPal remote subscription continues until cancelled/suspended at PayPal.
- A new provider requires customer authorization or a compliant migration program; flipping the WooCommerce gateway setting is not sufficient.
- The ArraySubs payment-update mechanism itself describes PayPal source changes as reauthorization and migration.

### Paddle → another provider

- Paddle is the customer-facing Merchant of Record for covered transactions, so invoices, tax records, remote catalog, portal, subscription status, and customer communication are tied more deeply to Paddle.
- Leaving Paddle is therefore a commercial, tax-record, customer-consent, data-export, entitlement, and billing-cutover project.
- Existing remote Prices and subscriptions cannot be treated as Woo-native objects that another processor can charge.

### Duplicate-charge guardrails

For any migration:

1. Export an inventory of every active, trial, paused, past-due, scheduled-cancel, and pending subscription.
2. Record old provider agreement ID, next billing time, last paid transaction, payment-method state, currency, tax treatment, and local subscription/order IDs.
3. Decide the single source of renewal truth during the cutover window.
4. Stop or suppress one scheduler before activating another.
5. Require an idempotency/reconciliation check before every migrated charge.
6. Prove the new customer authorization and payment method.
7. Cancel the old remote agreement only after the new path and next date are verified.
8. Monitor both providers through at least one full billing cycle.

## Total-stack decision framework

Do not reduce the article to transaction fees. Use a two-stage model.

### Stage 1: pass every hard gate

Remove ineligible options first. Examples:

- Physical subscription box: remove Paddle.
- Store that requires mixed cart plus several billing cycles: remove PayPal and Paddle.
- Merchant outside Stripe account availability: remove Stripe unless the business has an eligible legal entity/settlement setup.
- Site without public HTTPS webhooks: do not launch PayPal/Paddle automatic billing; fix infrastructure first.

### Stage 2: score total operating fit

Suggested weights for a typical global WooCommerce subscription business:

| Criterion | Weight | What a 5 means |
|---|---:|---|
| Product and merchant eligibility | Gate | Provider accepts the entity, country, category, and risk model |
| Renewal reliability and recovery | 20% | Clear initiator, signed events, idempotency, failure recovery, and actionable diagnostics |
| Checkout/cart fit | 15% | Required mixed items, subscription count, cycles, trials, coupons, tax, and shipping work |
| Customer payment preference | 10% | Target audience can and wants to pay with the supported recurring methods |
| Tax/compliance responsibility fit | 15% | Seller/MoR model matches the team’s expertise and risk appetite |
| Customer self-service | 10% | Payment update, invoices, cancellation, and authentication recovery are clear |
| Finance/refund/dispute operations | 10% | Orders, transactions, fees, tax, payouts, refunds, and disputes reconcile cleanly |
| Engineering/WordPress operations | 10% | Team can maintain jobs, webhooks, logs, upgrades, and incident response |
| Migration and exit flexibility | 5% | Agreements and schedules can be moved without hidden lock-in or duplicate billing |
| Total cost of ownership | 5% | Provider fees plus tooling, tax, support, failures, and engineering are acceptable |

Formula:

`weighted fit = sum(score from 1–5 × criterion weight)`

Total cost formula to show without unstable fee figures:

`annual billing TCO = provider/FX fees + tax tools and filings + engineering/hosting + failed-payment/support labor + refund/dispute labor + reconciliation labor + migration risk reserve`

### Worked scenario 1: physical subscription box with monthly add-ons

- Paddle fails product eligibility.
- PayPal fails mixed-cart/multiple-cycle requirements.
- Stripe passes and becomes the primary automatic gateway.
- PayPal may be offered only if the catalog/checkout can isolate a compatible simple plan and the store accepts the global cart restriction behavior.

### Worked scenario 2: two-person global SaaS team

- Both Stripe and Paddle pass product eligibility.
- Increase tax/compliance responsibility to 30% and reduce cart flexibility to 5%.
- Paddle may outrank Stripe because the MoR operating model replaces tax registrations, filings, invoicing, chargeback operations, and some buyer support.
- Stripe can still win if the company wants full checkout, billing, data, pricing, and migration control and already has finance/compliance capacity.

### Worked scenario 3: membership with high PayPal preference

- Stripe remains the reliable primary for flexible local billing.
- PayPal is added for measured customer preference.
- The team tests the most-restrictive enabled-gateway cart policy, approval return, signed webhooks, reauthorization, and refund IDs.
- Paddle is excluded unless its MoR/product model provides a separate strategic advantage.

## Exact ArraySubs code observations

Treat every item in this section as first-party product observation verified 2026-07-20.

### Core/free manual renewal boundary

- `arraysubs/src/Features/RecurringBilling/Services/PaymentProcessor.php:25-108` — automatic billing is filter-driven. If no automatic integration handles the subscription, core creates a `manual_required` result with the WooCommerce checkout payment URL.
- `arraysubs/src/Features/RecurringBilling/Services/PaymentProcessor.php:111-160` — automatic results normalize to paid, pending, requires-action, or failed; a truthy “success” does not necessarily mean the order is paid.
- This code supports the public claim that ArraySubs Free/manual renewal is a valid fallback, not that every installed gateway can auto-renew.

### Stripe adapter

- `arraysubspro/src/Features/AutomaticPayments/Gateways/Stripe/StripeDelegate.php:64-83` — capability map: automatic payments, trials, retention amount update, payment method update, card updates/expiry, disputes, SCA, refunds, portal, mixed carts, multiple subscriptions, different cycles, and sync. Remote pause/resume and product sync are false.
- `StripeDelegate.php:104-118` — uses official Woo Stripe webhook hooks plus refund normalization.
- `StripeDelegate.php:189-309` — constructs and confirms an off-session PaymentIntent from stored customer/payment method; handles succeeded, processing, requires-action, and failure states.
- `StripeDelegate.php:335-367` — cancellation is a local billing-context action; there is no Stripe remote subscription to pause/resume/schedule-cancel.
- `StripeDelegate.php:386-411` — prepares older renewal orders so official Woo Stripe can refund the backing charge.
- `StripeDelegate.php:400-404` and `369-376` — publishes three one-day retry attempts for Stripe subscriptions.
- `StripeDelegate.php:479-588` — pulls Stripe customer, payment method, and recent subscription-tagged PaymentIntents for reconciliation.
- `StripeDelegate.php:592-620` — creates a Stripe Billing Portal session for customer payment updates.
- `StripeDelegate.php:622-645` — verifies the secondary webhook signature with the ArraySubs Stripe endpoint secret.
- `StripeDelegate.php:1534-1605` — builds a `requires_action` result and stores the customer recovery URL/context.

### PayPal adapter

- `arraysubspro/src/Features/AutomaticPayments/Gateways/PayPal/PayPalGateway.php:82-113` — automatic/trials/payment update/refunds/disputes/sync are true; pause/resume, retention amount update, card updater/expiry, portal, mixed carts, multiple subscriptions, and different cycles are false.
- `PayPalGateway.php:132-198` — settings require Client ID, Client Secret, Webhook ID, sandbox mode, and publish the one-subscription/no-mixed/no-different-cycle restriction.
- `PayPalGateway.php:254-372` — creates/reuses a Billing Plan, creates a PayPal Subscription, stores its ID, and redirects to the buyer approval link.
- `PayPalGateway.php:389-504` — return-side confirmation is idempotent and waits for an active/approved remote subscription plus a settled sale before completing a nonzero order.
- `PayPalGateway.php:531-598` — refund requires a sale transaction ID; a remote subscription ID alone is not refundable.
- `PayPalGateway.php:609-633` — renewal method does not charge; it waits for `PAYMENT.SALE.COMPLETED`.
- `PayPalGateway.php:739-776` — cancellation calls PayPal and marks the local gateway context inactive.
- `PayPalGateway.php:782-852` — sync retrieves remote status, next billing time, and available method display details.
- `PayPalGateway.php:879-899` — method update is a new authorization/migration flow.
- `PayPalGateway.php:903-937` — signature verification posts the PayPal transmission headers, Webhook ID, and raw body to PayPal.
- `PayPalGateway.php:1403-1578` — remote plan includes trial/regular cycles, setup fee, tax, auto-bill outstanding, and failure threshold; plan IDs are cached by pricing signature.
- `PayPalGateway.php:1752-1793` — creates/caches the remote PayPal Catalog Product.

### Paddle adapter

- `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleGateway.php:68-111` — automatic, trials, pause/resume, cancel-at-period-end, reversal, product sync, payment update, refunds, portal, mixed carts, multiple subscriptions, and sync are true; different cycles and ArraySubs-controlled SCA/disputes are false.
- `PaddleGateway.php:134-206` — settings require API key, client token, seller ID, notification secret, Default Payment Link, sandbox/live mode, and publish the same-cycle restriction.
- `PaddleGateway.php:363-454` — creates a Paddle transaction, stores its session/transaction ID, and leaves the Woo order pending for the overlay/webhook flow.
- `PaddleGateway.php:528-579` — refunds through Paddle Adjustments.
- `PaddleGateway.php:593-621` — renewal method does not charge; it waits for Paddle automatic billing/webhook confirmation.
- `PaddleGateway.php:743-1003` — remote cancellation, state sync, scheduled-cancel reversal, pause, and resume.
- `PaddleGateway.php:1101-1138` — creates a Paddle customer-portal session for payment updates.
- `PaddleGateway.php:1141-1173` — verifies the notification signature against the configured secret.
- `PaddleGateway.php:1762-1990` — builds checkout items from synced recurring prices and cached one-time prices, enabling same-cycle mixed transactions.
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleProductSync.php:86-284` — creates/updates remote products, creates recurring prices, and archives/replaces prices on change.

### Shared operations

- `arraysubspro/src/Features/AutomaticPayments/Services/CartRestrictions.php:18-305` — most-restrictive enabled gateway policy plus selected-gateway checkout validation.
- `arraysubspro/src/Features/AutomaticPayments/Services/PaymentMethodCoordinator.php:22-145` — exposes method updates only when the gateway supports them and the subscription is active/on-hold/trial without pending cancellation.
- `arraysubspro/src/Features/AutomaticPayments/Services/WebhookRouter.php:20-263` — signature, parse, duplicate-event, entity-resolution, dispatch, remember-event, and logging sequence.
- `arraysubspro/src/Features/AutomaticPayments/REST/GatewayHealthController.php:1-477` — admin-only status, subscription counts, last webhook, filters, event log, Stripe dual-endpoint detail, and detach-to-manual action.
- `arraysubspro/src/Features/AutomaticPayments/Services/StripeWebhookProvisioner.php:1-220` — creates/checks/repairs the secondary Stripe webhook using the official Woo Stripe API connection.

## Implementation and launch test checklist

The published article should include a compact extractable version of this checklist.

### Common preflight

- [ ] Confirm merchant legal-entity country, payout/settlement currency, product category, and account eligibility with the provider.
- [ ] Confirm the exact payment method supports recurring/off-session use, not only first checkout.
- [ ] Use separate test and live credentials, webhook IDs/secrets, and provider modes.
- [ ] Verify WordPress cron/Action Scheduler health, HTTPS, DNS, TLS, firewall/CDN rules, and time zone.
- [ ] Test classic checkout and Checkout Block if both are enabled on the store.
- [ ] Test a normal paid start, zero-total trial, signup fee, coupon, tax, shipping, and one-time add-on where the gateway supports them.
- [ ] Verify the Woo order, ArraySubs subscription, remote customer/agreement, gateway slug, and transaction IDs are attached correctly.
- [ ] Trigger a renewal and observe local order status before and after remote confirmation.
- [ ] Intentionally fail a payment and confirm retry/past-due/grace-period/email/access behavior.
- [ ] Update the customer’s payment source, then prove the next renewal uses the new source/agreement.
- [ ] Test immediate cancellation and end-of-period cancellation where supported; compare local and remote states.
- [ ] Test full and partial refunds for an initial order and a renewal order.
- [ ] Deliver a duplicate webhook and confirm there is no duplicate payment, order, access grant, or lifecycle transition.
- [ ] Simulate out-of-order events and reconcile by authoritative remote state/timestamp.
- [ ] Reconcile gross amount, fee, tax, net amount, currency conversion, payout, refund, and dispute records.
- [ ] Disable or detach the gateway in test and verify the documented manual-payment fallback.

### Stripe-specific

- [ ] Install and connect the official WooCommerce Stripe Gateway version supported by ArraySubs.
- [ ] Check both official Woo Stripe webhook status and the ArraySubs secondary Stripe endpoint in Test and Live modes.
- [ ] Confirm saved customer/payment method IDs are captured after initial checkout.
- [ ] Test a normal off-session success, processing result, hard decline, and `requires_action` recovery.
- [ ] Use a 3DS test card at checkout and on the Pay-for-Order recovery page.
- [ ] Test cards plus any enabled bank debit/local method separately; do not infer recurring support from one-time display.
- [ ] Test mixed cart, multiple subscription products, and different billing cycles.
- [ ] Open the Stripe Billing Portal from the ArraySubs customer flow, update a method, and run the next renewal.
- [ ] Refund the initial order and a renewal order from WooCommerce; verify PaymentIntent/charge IDs and webhook echo prevention.

### PayPal-specific

- [ ] Configure Client ID, Client Secret, Webhook ID, sandbox mode, and the exact ArraySubs webhook URL.
- [ ] Test Product/Plan/Subscription creation and the buyer approval/return flow.
- [ ] Confirm that `APPROVED` without a settled sale does not mark a paid order complete.
- [ ] Verify `PAYMENT.SALE.COMPLETED` stores a sale transaction ID on both initial and renewal orders.
- [ ] Confirm mixed cart, multiple subscriptions, and different cycles are rejected with clear messages.
- [ ] Test free trial, setup fee, tax percentage, and a second buyer with a different tax rate/plan signature.
- [ ] Test PayPal’s failed-payment retries, outstanding balance, suspension, reactivation, cancellation, and local state sync.
- [ ] Test the new-authorization payment-source update without leaving duplicate active agreements.
- [ ] Test a full and partial refund using a real renewal sale ID; confirm the legacy subscription-ID-only case fails safely.
- [ ] Confirm PayPal’s signed webhook verification rejects an event sent under the wrong REST app or Webhook ID.

### Paddle-specific

- [ ] Confirm Paddle accepts the product/business before committing engineering or customer migration work.
- [ ] Configure API key, client-side token, seller ID, notification secret, Default Payment Link, and approved live domain.
- [ ] Sync each subscription product/variation to a Paddle Product and recurring Price.
- [ ] Verify the Paddle tax category applied to each product is correct for what is sold.
- [ ] Test the Paddle.js overlay, pending Woo order, `transaction.completed`, subscription creation, and provisioning.
- [ ] Test same-cycle multiple subscriptions and a mixed one-time item; confirm different cycles and customer-defined terms are rejected.
- [ ] Change a Woo price/term, verify a new Paddle Price is created, and confirm existing subscriptions still reference the intended old/new price.
- [ ] Test portal payment update, pause, resume, immediate cancel, end-of-period cancel, and undo scheduled cancel.
- [ ] Test payment failure/past due and an out-of-order/duplicate webhook sequence.
- [ ] Create a refund Adjustment and verify pending-approval, approved, or rejected status rather than reporting request creation as completion.

## When ArraySubs is not the best fit

Include a visible, candid section:

- A merchant that requires unattended automatic billing through a gateway other than Stripe, PayPal, or Paddle needs manual renewal, a custom integration, or a different subscription stack.
- A Paddle-ineligible physical-goods or human-services business should not select Paddle merely to outsource tax operations.
- A store unable to expose reliable HTTPS webhooks or run scheduled actions should fix infrastructure before selling automatic renewals.
- A store with complex usage/metered billing, marketplace split payments, enterprise contract amendments, or provider-native invoicing needs separate scope validation.
- A PayPal-heavy store with mixed carts, multiple plans, or frequent amount/cycle changes may need PayPal as a secondary constrained option, not the only gateway.
- A business that requires a fully embedded payment-method editor may dislike Stripe/Paddle portals or PayPal reauthorization.
- A business unwilling to accept a remote product/catalog and Merchant-of-Record customer relationship may prefer Stripe even if Paddle lowers compliance workload.
- A merchant expecting gateway migration to preserve tokens/agreements without customer consent should pause; this is a migration project, not a settings switch.
- A site that enables multiple gateways but cannot accept the most-restrictive cart policy should redesign checkout architecture or obtain reviewed developer customization before launch.

## Confirmed/appropriate staging screenshot targets (choose 3–6)

Use only the confirmed staging WordPress admin. Do not expose credentials, API keys, Client IDs, secrets, webhook IDs, full signed URLs, real customer data, or identifiable order details. Use synthetic/demo data where subscription detail is necessary.

### Screenshot 1 — WooCommerce payment providers list

- Route: WooCommerce → Settings → Payments.
- Show: Stripe, PayPal (ArraySubs), and Paddle (ArraySubs) together, with safe enabled/setup labels.
- Marker targets: “Mark the Stripe provider row,” “Mark the PayPal (ArraySubs) provider row,” and “Mark the Paddle (ArraySubs) provider row.”
- Article use: establish that the buyer sees gateway choices in WooCommerce, while their renewal architectures differ.

### Screenshot 2 — ArraySubs Gateway Health overview

- Route: ArraySubs admin → Settings → Payment Gateways; React route `#/settings/gateways`.
- Show: all three gateway cards, status, test/sandbox badge, subscription count, and last webhook where present.
- Marker targets: “Mark the enabled/needs-setup status,” “Mark the test-mode badge,” and “Mark the last webhook evidence.”
- Article use: operational readiness is part of the gateway decision, not a post-launch afterthought.

### Screenshot 3 — Expanded Stripe dual-webhook health

- Route: Gateway Health → expand Stripe.
- Show: official Woo Stripe endpoint state and ArraySubs secondary endpoint state. Crop full environment URLs if they reveal unnecessary details.
- Marker targets: “Mark the official WooCommerce Stripe webhook status” and “Mark the ArraySubs secondary Stripe webhook status.”
- Article use: explain why Stripe’s site-initiated model still needs two-way event health.

### Screenshot 4 — PayPal sandbox settings and checkout restriction

- Route: WooCommerce → Settings → Payments → PayPal (ArraySubs).
- Show: sandbox toggle, Webhook URL label only if safe, and the visible one-subscription/no-mixed/no-different-cycle explanation. Keep credential fields blank/cropped.
- Marker targets: “Mark the PayPal sandbox toggle,” “Mark the webhook configuration label,” and “Mark the checkout restriction text.”
- Article use: connect the comparison matrix to a real implementation constraint.

### Screenshot 5 — Paddle sandbox settings, Default Payment Link, and restriction

- Route: WooCommerce → Settings → Payments → Paddle (ArraySubs).
- Show: sandbox toggle, Default Payment Link requirement, notification/Webhook URL label if safe, and same-cycle restriction. Keep credentials blank/cropped.
- Marker targets: “Mark the Paddle sandbox toggle,” “Mark the Default Payment Link requirement,” and “Mark the same-billing-cycle restriction.”
- Article use: demonstrate the remote checkout/catalog prerequisites behind the MoR model.

### Screenshot 6 — Synthetic subscription payment context

- Route: ArraySubs → Subscriptions → a synthetic/demo subscription detail.
- Show: attached gateway, safe payment-method summary, next renewal, sync/update action, or detach-to-manual action without personal data.
- Marker targets: “Mark the attached payment gateway,” “Mark the customer payment-update action,” and “Mark the detach/revert-to-manual action.”
- Article use: make migration and method-update differences concrete.

If one target cannot be captured safely, replace it with a contextual generated visual. Do not manufacture provider success, webhook delivery, or customer data to make a screenshot look complete.

## Context-specific inner visual ideas (use 4–8 with varied forms)

1. **Three billing control rooms — process scene.** A WooCommerce/WordPress control room directly turns the Stripe renewal lever; a PayPal remote clock sends a signed completed-sale envelope back; a Paddle MoR operations room controls renewal, tax, invoice, and dispute folders. No logos or text labels are necessary beyond recognizable abstract cues.
2. **Business-model storefront triptych — editorial montage.** A physical subscription box and complex membership catalog align with the flexible direct-processing route; a simple one-plan checkout offers a wallet approval lane; a global SaaS dashboard enters the MoR lane. Make the product-eligibility boundary visually obvious.
3. **Responsibility ledger handoff — split-scene illustration.** On the processor side, the merchant desk holds tax registration, filing, refunds, disputes, fraud, and customer support folders. On the MoR side, the provider desk receives many of those folders while the software seller retains product, fulfillment, privacy, and accounting responsibilities.
4. **Cart-composition workbench — tangible object scene.** One basket contains a one-time item, two subscription plans, and two billing clocks. Stripe accepts the full arrangement; PayPal accepts one plan only; Paddle accepts multiple recurring/one-time items only when the clocks match. Avoid a conventional table graphic.
5. **Payment-source lifecycle ribbon — sequential visual.** Customer checkout/authentication → stored token or remote agreement → unattended renewal → failure/customer recovery → updated method. The Stripe ribbon loops back to Woo Pay-for-Order, PayPal branches to reauthorization, and Paddle branches to a hosted portal.
6. **Gateway migration bridge — operational environment.** Active subscribers cross from one provider island to another through checkpoints for consent, next date, transaction reconciliation, old agreement cancellation, and duplicate-charge guards.
7. **Total-cost workbench — still-life illustration.** A small provider-fee tag sits beside tax filings, engineering tools, webhook monitor, support queue, refund ledger, and migration reserve; a boxed MoR service bundles several tools but adds external-platform dependence. Use no fake numbers.

Avoid making every visual a dashboard, flowchart, or comparison card. Use at least one real plugin screenshot, one process scene, one customer-lifecycle illustration, one business-model scene, and one operational/migration environment.

## Internal-link plan

### Required commercial and recipe destinations

- Payment gateways feature pillar: `/deals/arraysubs/features/#payment-gateways`
  - Anchor near the first ArraySubs-specific comparison: “automatic payment gateway capabilities in ArraySubs.”
- Stripe automatic billing/SCA recipe: `/deals/arraysubs/use-cases/recipes/stripe-automatic-billing-sca/`
  - Link after the Stripe decision section; do not duplicate its setup instructions.
- Member payment-update recipe: `/deals/arraysubs/use-cases/recipes/member-update-payment/`
  - Link from the tokens/payment-source section.
- Gateway Health recipe: `/deals/arraysubs/use-cases/recipes/gateway-health-monitor/`
  - Link from the webhook/operations section.
- Primary CTA after the verdict and decision framework: `/deals/arraysubs/pricing/` with anchor “View Pro Pricing.”

### Sibling article links

- A056 — `/deals/arraysubs/resources/payments-and-compliance/best-payment-gateways-for-woocommerce-subscriptions/`
  - Use once as the broader gateway shortlist: “compare the best WooCommerce subscription gateways.”
- A058 — `/deals/arraysubs/resources/payments-and-compliance/stripe-recurring-payments-for-woocommerce-how-they-work-and-what-to-test/`
  - Use from Stripe renewal/SCA detail.
- A059 — `/deals/arraysubs/resources/payments-and-compliance/paypal-recurring-payments-for-woocommerce-agreements-renewals-and-limits/`
  - Use from PayPal agreement limitations.
- A060 — `/deals/arraysubs/resources/payments-and-compliance/paddle-merchant-of-record-for-woocommerce-subscriptions/`
  - Use from the MoR responsibility section if published by article time.

The cluster rule requires this article to link back to the commercial pillar and to 2–3 contextually adjacent siblings. Do not list every sibling merely for link count.

## Recommended long-form outline

The user asked for genuinely long articles. The brief estimates 3,000–4,200 words, but the draft can responsibly run roughly 5,500–7,000 words if each section adds decision value instead of repetition.

1. 40–60 word direct answer
2. Key takeaways box with three provider verdicts and the “no universal winner” qualifier
3. Visible tested-scope/version/last-verified disclosure
4. Compare control planes before brands
5. Quick verdict by business model
6. Hard gates before scoring
7. Extractable ArraySubs comparison matrix
8. Geographic reach, currency, and checkout experience
9. Stripe: site-controlled renewal, tokens, SCA, recovery, and non-fit cases
10. PayPal: remote agreement, approval, cart constraints, recovery, and non-fit cases
11. Paddle: MoR, remote catalog, portal, product policy, and non-fit cases
12. Tax and seller-responsibility comparison
13. Refund, dispute, webhook, and reconciliation operations
14. Most-restrictive enabled-gateway cart nuance
15. Total-stack scoring framework and three worked scenarios
16. Migration risks and duplicate-charge guardrails
17. Implementation/test checklist
18. Limitations and when ArraySubs is not the best fit
19. Conclusion: three takeaways maximum
20. CTA: View Pro Pricing, plus relevant recipes/siblings

## Limitations section to publish visibly

- Verified against ArraySubs `1.8.11`, ArraySubs Pro `1.1.2`, confirmed staging WooCommerce `10.9.4`, and official WooCommerce Stripe Gateway `10.8.4` on 2026-07-20.
- Product behavior is based on source inspection and safe staging UI observation; no configured provider credentials or live money movement were used for this research.
- No successful charge, 3DS challenge, failed-payment retry, refund, dispute, provider portal, remote product mutation, or signed external webhook delivery is claimed.
- Geographic eligibility, supported currencies/payment methods, pricing, and legal/tax responsibility can change and must be rechecked with each provider and a qualified adviser.
- WooCommerce Subscriptions documentation supplies ecosystem definitions and gateway principles; it is not proof that ArraySubs implements every WooCommerce Subscriptions extension capability.
- Provider platform documentation can describe features the current ArraySubs adapter does not expose. The article must use the inspected adapter matrix for ArraySubs claims.
- Paddle’s MoR performance/benefit material is vendor-authored. Use it for the responsibility model, not as independent proof of uplift, conversion, or cost savings.
- This article is educational and is not legal, tax, accounting, or payment-compliance advice.

## Official source and claim map

Every page below was checked on 2026-07-20.

### WooCommerce

- https://woocommerce.com/document/subscriptions/payment-gateways/ — automatic vs manual gateway concepts; features vary by exact extension; all installed methods can pay manual renewal orders; multiple payment processors are possible.
- https://woocommerce.com/document/subscriptions/renewal-process/ — automatic renewals need no customer action; manual renewals require checkout; same payment method normally persists; deactivated automatic gateway becomes manual.
- https://woocommerce.com/document/subscriptions/testing-subscription-renewal-payments/ — testing a full renewal workflow.
- https://woocommerce.com/document/stripe/ — official Woo Stripe extension checkout/payment-method overview.
- https://woocommerce.com/document/stripe/customer-experience/saved-payment-information/ — official tokenization and customer saved-method management.
- https://woocommerce.com/document/stripe/customer-experience/3d-secure/ — 3DS support on checkout and Pay for Order.
- https://woocommerce.com/document/stripe/setup-and-configuration/stripe-webhooks/ — official test/live webhook status and reconfiguration.
- https://woocommerce.com/document/stripe/admin-experience/refunding-orders/ — Stripe refunds inside WooCommerce.

### Stripe

- https://stripe.com/global — current merchant account availability by country/region.
- https://docs.stripe.com/currencies — 135+ presentment currencies and settlement/FX caveats.
- https://docs.stripe.com/payments/payment-methods/payment-method-support — future-use/off-session support varies by method/region.
- https://docs.stripe.com/payments/payment-methods/dynamic-payment-methods — methods can be filtered when future usage is required.
- https://docs.stripe.com/payments/setup-intents — customer permission, mandate, off-session setup, MIT treatment, and later authentication recovery.
- https://docs.stripe.com/strong-customer-authentication?locale=en-GB — exemptions are not guaranteed; off-session payments can still require customer action.
- https://docs.stripe.com/webhooks — signature verification, duplicate events, and asynchronous handling.
- https://docs.stripe.com/refunds — full/partial refund mechanics, pending balance, and failed refunds.
- https://stripe.com/resources/more/merchant-of-record — normal direct Stripe Payments leaves the business as MoR; Stripe Managed Payments is separate.
- https://docs.stripe.com/tax/how-tax-works — registration, calculation, collection, reporting, filing, and remittance steps.
- https://docs.stripe.com/tax/filing — merchant filing/remittance responsibilities and filing partners.

### PayPal

- https://developer.paypal.com/subscriptions/integrate — Product, Plan, Subscription, JavaScript/approval integration model.
- https://developer.paypal.com/docs/api/subscriptions/v1/ — plan/subscription status, update, revise, suspend, activate, cancel, and transaction APIs; broader than the ArraySubs adapter.
- https://developer.paypal.com/docs/subscriptions/reference/webhooks/ — completed sales, failures, refunds, reversals, activation, cancellation, expiration, and suspension events.
- https://developer.paypal.com/docs/multiparty/subscriptions/customize/payment-failure-retry/ — retry, threshold, suspension, and outstanding-balance behavior.
- https://developer.paypal.com/api/rest/webhooks/ — HTTPS delivery, retries, app/Webhook ID scope, and signature verification.
- https://developer.paypal.com/reference/country-codes/ — country support and country-specific caveat.
- https://developer.paypal.com/api/rest/reference/currency-codes/ — currencies depend on payment type, region, and merchant receiving preferences.
- https://developer.paypal.com/docs/api/payments/v1/ — deprecated v1 payment/sale refund context used by the inspected current adapter; technical-review caveat.
- https://www.paypal.com/us/legalhub/paypal/pp-pos-ps?country.x=US&locale.x=en_US — U.S. seller tax responsibility; do not generalize globally without local review.

### Paddle

- https://www.paddle.com/resources/how-to-evaluate-a-merchant-of-record — MoR responsibility model; vendor-authored.
- https://www.paddle.com/help/start/intro-to-paddle/what-am-i-not-allowed-to-sell-on-paddle — physical goods/human services non-fit and prohibited categories.
- https://www.paddle.com/help/start/intro-to-paddle/which-countries-are-supported-by-paddle — seller-country availability/exclusions and change caveat.
- https://developer.paddle.com/concepts/sell/supported-currencies/ — payment/balance currency model and tax responsibility statement.
- https://developer.paddle.com/concepts/payment-methods/ — dynamic method availability by country, currency, and device.
- https://developer.paddle.com/concepts/sell/self-serve-checkout/ — overlay/inline checkout, 3DS2, remote catalog, subscription creation.
- https://developer.paddle.com/concepts/sell/customer-portal/ — payments, invoices, method updates, subscription management/cancellation.
- https://developer.paddle.com/build/subscriptions/update-payment-details/ — portal/session method-update path.
- https://developer.paddle.com/build/transactions/create-transaction/ — remote transaction and automatic subscription-renewal creation.
- https://developer.paddle.com/webhooks/simulator/subscription-renewed/ — renewal event sequence.
- https://developer.paddle.com/webhooks/transactions/transaction-completed/ — completed money-movement confirmation.
- https://developer.paddle.com/webhooks/transactions/transaction-payment-failed/ — failed transaction event.
- https://developer.paddle.com/webhooks/transactions/transaction-past-due/ — renewal transaction past-due state.
- https://developer.paddle.com/build/transactions/create-transaction-adjustments/ — refunds/credits, record preservation, and pending approval.
- https://developer.paddle.com/webhooks/about/how-webhooks-work/ — at-least-once/out-of-order delivery and event-ID idempotency.
- https://developer.paddle.com/webhooks/about/signature-verification/ — `Paddle-Signature` verification over raw body.

## Claims to avoid

- “Stripe is always the best subscription gateway.”
- “PayPal is just Stripe with a wallet button.”
- “Paddle is merely another WooCommerce payment processor.”
- “Any WooCommerce gateway automatically renews ArraySubs subscriptions.”
- “Every payment method displayed by Stripe can be reused off-session.”
- “Stripe renewals never require 3DS or customer authentication.”
- “PayPal or Paddle does not support SCA.”
- “PayPal’s full Subscriptions API capability is exposed by the current ArraySubs adapter.”
- “The ArraySubs PayPal adapter uses the official WooCommerce PayPal Payments extension.”
- “Paddle is suitable for physical subscription boxes or businesses primarily selling human services.”
- “Paddle removes every legal, tax, accounting, privacy, and compliance responsibility.”
- “Stripe Tax or ordinary PayPal processing automatically registers, files, and remits all merchant taxes.”
- “Changing the default gateway migrates active payment tokens and remote agreements.”
- “A successful webhook means there can never be a duplicate order or state race.”
- “Gateway Health guarantees future payments.”
- “Refund requested” means “refund settled,” especially for Paddle.
- Any universal fee, refund timing, country count, approval rate, conversion lift, or cost-savings claim not verified beside the claim on publication day.

## Refresh triggers

Review quarterly and immediately after any of these changes:

- ArraySubs or ArraySubs Pro changes the capability map, cart restriction policy, automatic gateway list, retry logic, payment-method update path, Gateway Health, or webhook routing.
- The official WooCommerce Stripe Gateway changes token capture, webhook hooks, refund metadata, 3DS recovery, or supported recurring methods.
- PayPal changes Subscriptions sale events, plan mutation, retries, webhook verification, or the v1 sale-refund path used by the adapter.
- Paddle changes Acceptable Use Policy, MoR coverage, seller-country availability, currency/payment-method support, catalog/Price rules, portal, or refund approval.
- SCA/3DS, card-network credential-on-file, tax, consumer renewal, or cancellation regulations change.
- Provider prices or cross-border/FX/refund/dispute terms change.


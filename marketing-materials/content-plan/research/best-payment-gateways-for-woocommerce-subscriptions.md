# Research: Best Payment Gateways for WooCommerce Subscriptions in 2026

## Research record

- Brief: `articles/056-best-payment-gateways-for-woocommerce-subscriptions-in-2026.md`
- Recommended URL: `/deals/arraysubs/resources/payments-and-compliance/best-payment-gateways-for-woocommerce-subscriptions/`
- Researched and source-verified: 2026-07-20
- Search intent: commercial investigation
- Focus query: `best payment gateways for WooCommerce subscriptions`
- Product scope inspected: ArraySubs core `1.8.11` and ArraySubs Pro `1.1.2`
- Evidence base: current ArraySubs/ArraySubs Pro source, current official WooCommerce, Stripe, PayPal, and Paddle documentation
- Test-scope disclosure: this note is based on code inspection and official documentation. It does not claim a successful live charge, refund, SCA challenge, or provider-to-site webhook delivery. Those require configured sandbox accounts and a publicly reachable HTTPS endpoint.
- Important product boundary: ArraySubs Free creates manual renewal invoices. ArraySubs Pro adds the shipped automatic integrations for Stripe, PayPal, and Paddle. Do not imply that every WooCommerce gateway can automatically renew an ArraySubs subscription.

## Direct answer for the opening

> For most ArraySubs stores in 2026, Stripe is the best all-round automatic-renewal gateway because it offers the most flexible cart and billing model, saved-payment updates, explicit SCA handling, and direct WooCommerce control. PayPal is strongest as a familiar additional wallet but has stricter checkout and update constraints. Paddle is the best fit for eligible global software and digital-product sellers who want a Merchant of Record to own tax and compliance. ArraySubs Free remains a defensible choice for manual invoices, bank transfer, or a gateway outside the three automatic integrations.

Keep the opening verdict compact and immediately qualify it with “best depends on merchant country, product model, checkout composition, tax ownership, payment-method demand, and migration tolerance.”

## Core decision: choose the billing architecture before the brand

The comparison should distinguish three architectures. Gateway logos alone hide the most important operational difference.

1. **Site-initiated automatic renewal — Stripe with ArraySubs Pro.** ArraySubs creates the renewal order and confirms an off-session Stripe PaymentIntent against the saved customer and payment method. The WordPress site owns the renewal schedule and initiates the charge.
2. **Gateway-managed automatic renewal — PayPal or Paddle with ArraySubs Pro.** PayPal/Paddle own the remote subscription schedule. ArraySubs creates or locates a pending renewal order, then waits for signed webhook confirmation of the provider-side charge.
3. **Customer-initiated manual renewal — ArraySubs Free or a deliberate fallback.** ArraySubs creates a pending WooCommerce renewal order and payment URL. The customer visits checkout and pays with an available gateway.

This architecture determines failure recovery, webhook criticality, schedule flexibility, payment-method updates, tax ownership, and migration effort.

Official WooCommerce corroboration: WooCommerce describes automatic payments as renewals charged without customer involvement and manual payments as pending renewal orders paid through normal checkout. Its payment-gateway guide also states that all WooCommerce payment methods can be used for manual subscription payments, while automatic renewal requires gateway-specific integration. Verified 2026-07-20:

- https://woocommerce.com/document/subscriptions/renewal-process/
- https://woocommerce.com/document/subscriptions/payment-gateways/

## Recommended verdicts by use case

### Best overall for a typical WooCommerce subscription store: Stripe

Recommend Stripe first when all of the following are broadly true:

- the merchant can open and operate a Stripe account in a supported country;
- the business wants WooCommerce/ArraySubs to remain the renewal system of record;
- carts may combine regular and subscription products;
- a checkout may include multiple subscriptions or different billing cycles;
- customers need a straightforward saved-card update path;
- the team can operate webhooks, scheduled actions, retries, disputes, tax configuration, and finance reconciliation.

Why this verdict is defensible in the shipped product:

- ArraySubs Pro delegates the first-purchase UI and refunds to the official WooCommerce Stripe Gateway, but handles ArraySubs renewal and lifecycle automation.
- The inspected Stripe adapter declares automatic payments, trials, SCA, refunds, disputes, payment-method updates, card auto-update, card-expiry notices, mixed carts, multiple subscriptions, different billing cycles, and gateway synchronization.
- ArraySubs sends an off-session confirmed PaymentIntent with the saved Stripe customer and payment method for renewals.
- The customer payment-method update path creates a Stripe Billing Portal session.
- The adapter listens to the official WooCommerce Stripe webhook hooks and an ArraySubs secondary endpoint for events the official extension does not internally map to ArraySubs.

Not a fit when the merchant cannot get Stripe account support, when customers overwhelmingly demand another method, when the business wants a provider to assume Merchant-of-Record liability, or when the store cannot reliably run WordPress scheduling and public HTTPS webhooks.

Official context:

- Stripe account availability varies by merchant country/region: https://stripe.com/global
- The official WooCommerce Stripe extension supports tokenization and lets customers manage saved methods: https://woocommerce.com/document/stripe/customer-experience/saved-payment-information/
- WooCommerce says its Stripe extension supports 3D Secure on checkout and Pay for Order: https://woocommerce.com/document/stripe/customer-experience/3d-secure/
- Stripe SetupIntents explain off-session mandates, MIT treatment, and later authentication recovery: https://docs.stripe.com/payments/setup-intents
- Stripe payment-method support and `setup_future_usage` vary by method and region: https://docs.stripe.com/payments/payment-methods/payment-method-support
- Stripe global currency documentation says card presentment supports more than 135 currencies, but payment-method and settlement availability remains country-specific: https://docs.stripe.com/currencies

### Best additional option for PayPal-led customer demand: PayPal

Recommend PayPal as a complementary option when the audience already trusts or prefers PayPal and the store can accept the gateway’s stricter remote-agreement model.

ArraySubs-specific constraints that must be prominent:

- The ArraySubs PayPal gateway creates a PayPal Product, Billing Plan, and remote Subscription, then redirects the buyer for approval.
- The inspected implementation supports one ArraySubs subscription per checkout, no mixed regular/subscription cart, and no different billing cycles in one checkout.
- PayPal, not ArraySubs, runs the renewal charge. ArraySubs waits for `PAYMENT.SALE.COMPLETED` and other signed webhook events.
- The ArraySubs capability map does not expose pause/resume, card updater, customer portal, hosted payment page, retention amount update, or SCA as ArraySubs-controlled capabilities.
- Changing the payment source is a reauthorization flow: the code explicitly describes cancelling the existing billing agreement and creating a new one as disruptive.
- Refunds require a payment sale transaction ID. A legacy order containing only a PayPal subscription ID cannot be automatically refunded by the inspected adapter.

Do not generalize PayPal platform capabilities into ArraySubs capabilities. PayPal’s API can support more sophisticated plan changes, recovery, or quantity models, but the article must describe what the current ArraySubs adapter exposes.

Not a fit as the only method when carts often contain physical one-time items plus a subscription, when customers buy multiple plans together, when pricing/cycle changes must be frictionless, or when the business needs an in-site saved-card editor.

Official context:

- PayPal’s subscription model is product → plan → buyer approval → subscription: https://developer.paypal.com/platforms/subscriptions
- PayPal subscription webhooks include completed sales, failures, refunds, reversals, cancellations, expirations, and suspensions: https://developer.paypal.com/docs/subscriptions/reference/webhooks/
- PayPal documents plan-level recovery and failed-payment behavior: https://developer.paypal.com/docs/multiparty/subscriptions/customize/payment-failure-retry/
- PayPal’s REST currencies and merchant capabilities vary by country and payment type: https://developer.paypal.com/api/rest/reference/currency-codes/
- PayPal’s public global page says availability is broad, but the article should still tell merchants to verify local receiving, withdrawal, and subscription eligibility: https://www.paypal.com/c2/webapps/mpp/country-worldwide?locale.x=en_C2

### Best for eligible global SaaS and digital products that need a Merchant of Record: Paddle

Recommend Paddle when the business sells eligible software, SaaS, apps, or digital products and wants to trade a higher all-in provider cost and greater external platform dependence for a Merchant-of-Record operating model.

Why the model differs:

- Paddle is the legal seller/merchant of record for covered transactions and takes responsibility for payment processing, tax calculation/collection/remittance, invoicing, and much compliance work.
- The inspected ArraySubs Paddle integration uses Paddle.js overlay checkout, remote products/prices, remote subscriptions, transactions, the Adjustment API for refunds, signed webhooks, and the Paddle customer portal for payment-method updates.
- Paddle runs renewals and ArraySubs waits for `transaction.completed` webhook confirmation.
- The current capability map supports pause, resume, cancel at period end and reversal of scheduled cancel, trials, customer portal, mixed cart, and multiple subscriptions. It does not support different billing cycles in the same checkout.
- Product/price synchronization is a real architectural constraint. The inspected sync service creates remote Paddle Product and Price objects and archives/replaces the price when amount or billing terms change.
- ArraySubs rejects customer-defined flexible billing terms for a product-sync gateway because those terms could diverge from the remote price.

Critical not-fit case: Paddle says businesses primarily selling physical goods or human services are not a good fit. That makes it unsuitable as the default recommendation for subscription boxes, food, apparel, physical replenishment, or agency retainers without separate confirmation from Paddle.

Official context:

- Paddle’s Merchant-of-Record evaluation framework and self-described responsibility: https://www.paddle.com/resources/how-to-evaluate-a-merchant-of-record
- Paddle’s acceptable-use guidance says physical goods and human services are generally not a fit: https://www.paddle.com/help/start/intro-to-paddle/what-am-i-not-allowed-to-sell-on-paddle
- Paddle customer portal can show payments/invoices, update methods, and manage/cancel subscriptions: https://developer.paddle.com/concepts/sell/customer-portal/
- Paddle recommends the portal for payment-method updates and says temporary management URLs should not be stored: https://developer.paddle.com/build/subscriptions/update-payment-details/
- Paddle creates subscription renewal transactions automatically: https://developer.paddle.com/build/transactions/create-transaction/
- Paddle refunds are Adjustment records; most live refunds may begin pending approval: https://developer.paddle.com/build/transactions/create-transaction-adjustments/
- Paddle webhook overview and signature verification: https://developer.paddle.com/webhooks/ and https://developer.paddle.com/webhooks/about/signature-verification/

### Best for local/offline methods, B2B invoices, or a gateway outside Pro’s automatic list: manual renewals

Recommend ArraySubs Free/manual invoices when:

- customers pay by bank transfer, invoice, cash/offline workflow, or a regional gateway;
- the business values gateway breadth more than unattended renewal conversion;
- high-value B2B customers expect approval or procurement on each invoice;
- automatic token storage is not available or desirable;
- the merchant is validating the model before adding automatic billing.

The tradeoff is customer action at every renewal. The article should state plainly that manual renewal is operationally valid, but usually creates more payment friction and follow-up work than a working automatic method.

ArraySubs code behavior: if Pro does not mark the subscription automatic, if the gateway is missing/disabled, if auto-renew is turned off, or if the automatic context is unusable, core returns a `manual_required` result with the WooCommerce order payment URL. This is a fallback, not an automatic charge through every installed gateway.

## Comparison table: claim-ready product matrix

Use a compact version of this table in the article. Prefix the caption with “ArraySubs 1.8.11 / Pro 1.1.2 behavior verified 2026-07-20.”

| Criterion | Stripe + Pro | PayPal + Pro | Paddle + Pro | Manual renewals / Free |
|---|---|---|---|---|
| Renewal initiator | ArraySubs/WooCommerce creates and confirms an off-session PaymentIntent | PayPal remote subscription | Paddle remote subscription/transaction | Customer pays a pending renewal order |
| Saved payment context | Stripe customer + PaymentMethod IDs | PayPal remote subscription/billing agreement ID | Paddle customer + subscription/payment context | Depends on gateway chosen for each invoice |
| Customer update path | Stripe Billing Portal session | New PayPal authorization; disruptive migration | Paddle customer portal session | Customer chooses a method at renewal checkout |
| ArraySubs SCA handling | Explicit capability; `requires_action` path; official Stripe 3DS checkout/pay-for-order | Provider approval flow; no ArraySubs SCA capability flag | Provider/MoR handles authentication; no ArraySubs SCA capability flag | Depends on gateway during interactive checkout |
| Mixed regular + subscription cart | Supported by current capability map | Not supported | Supported by current capability map | Standard checkout compatibility must be tested |
| Multiple subscription items | Supported | Not supported | Supported | Depends on store/cart rules and gateway |
| Different billing cycles in one checkout | Supported | Not supported | Not supported | Depends on store/cart rules; renewal invoices remain separate |
| Remote product/plan coupling | No ArraySubs product sync | Product/plan created for PayPal agreement | Paddle Product + Price sync required | None for automatic billing |
| Refund path | Official WooCommerce Stripe gateway; ArraySubs normalizes renewal transaction context | PayPal sale refund; needs sale transaction ID | Paddle Adjustment API; approval can be asynchronous | Depends on selected WooCommerce gateway |
| Webhook dependence | High for reconciliation, lifecycle, card/dispute events; site still initiates renewals | Critical because PayPal confirms remote renewals | Critical because Paddle confirms remote renewals | Low for the subscription billing decision; gateway may still use webhooks for order state |
| Tax/compliance ownership | Merchant remains seller/MoR in a normal Stripe payment integration | Merchant remains seller/MoR | Paddle is MoR for covered sales | Merchant remains seller/MoR |
| Best fit | Flexible physical/digital/membership/SaaS stores that can operate the stack | PayPal-demand audiences with simple one-plan checkouts | Eligible global SaaS/software/digital products prioritizing MoR | B2B invoice, bank transfer, regional/offline gateways, early-stage validation |
| Main limitation | Merchant owns tax/compliance and WordPress operations | Checkout rigidity, provider-owned schedule, reauthorization friction | Product eligibility, remote catalog coupling, no mixed billing cycles | Renewal friction and lower unattended collection |

### Important wording for SCA

Do not put a blunt “No SCA” in the PayPal/Paddle cells. The ArraySubs capability flags are false because ArraySubs does not expose or drive an SCA workflow for those provider-managed checkouts. That is different from saying the payment is exempt from authentication or the provider ignores SCA.

For Stripe, use this precise explanation:

- the official WooCommerce Stripe checkout can collect/securely tokenize the method and perform 3DS when required;
- the ArraySubs renewal adapter confirms off-session;
- properly stored off-session credentials can be treated as merchant-initiated, but an issuer can still require customer action;
- the system therefore needs a `requires_action` recovery path rather than promising every renewal is frictionless.

Sources:

- https://docs.stripe.com/payments/setup-intents
- https://docs.stripe.com/strong-customer-authentication?locale=en-GB
- https://docs.stripe.com/payments/3d-secure/strong-customer-authentication-exemptions?locale=en-GB
- https://woocommerce.com/document/stripe/customer-experience/3d-secure/

## A practical scoring framework

The article needs original analysis beyond a generic roundup. Use a weighted scorecard and tell readers to change the weights, not blindly accept a universal ranking.

### Suggested weights for a typical direct-to-consumer subscription store

| Criterion | Weight | What a “5” means |
|---|---:|---|
| Automatic-renewal reliability | 25% | Clear initiator, idempotent confirmation, retry/recovery, usable failure diagnostics |
| Checkout and billing flexibility | 20% | Mixed cart, multiple subscriptions, different cycles, trials, changes |
| Customer recovery experience | 15% | Easy method update, actionable authentication/failure flow, clear invoices |
| Merchant-country and payment-method fit | 15% | The merchant can onboard and the target customers can pay with preferred methods |
| Tax/compliance operating model | 10% | Responsibility matches the team’s appetite and product eligibility |
| Refund/dispute operations | 5% | Clear, auditable, supported admin path |
| Migration and exit cost | 5% | Customers can move without silent billing gaps or duplicate agreements |
| Total cost of ownership | 5% | Provider fees plus tax tools, finance time, development, failures, and support |

Formula:

`weighted score = sum(gateway score from 1–5 × criterion weight)`

Worked example for an eligible global SaaS vendor with a two-person operations team: raise tax/compliance to 30%, reduce cart flexibility to 10%, and Paddle may outrank Stripe even if its headline processing cost is higher. For a physical subscription-box store, set product eligibility as a hard gate; Paddle is removed before scoring, and Stripe normally becomes the leading automatic option.

### Hard gates before scoring

1. Can the merchant legally onboard in its country and settle in the required currency?
2. Does the provider accept the product/business category?
3. Does the exact ArraySubs integration support the cart shape and billing terms?
4. Can the site receive signed webhooks over public HTTPS?
5. Is there a tested customer recovery path for failed or authenticated renewals?
6. Can the finance team reconcile fees, refunds, taxes, payouts, and remote/local status?

If any answer is no, do not average it away with a high feature score.

## Shipped ArraySubs behavior: exact code observations

All observations below were inspected on 2026-07-20. Treat them as first-party product observations, not vendor documentation.

### Free/manual billing engine

- `arraysubs/src/Features/RecurringBilling/Services/PaymentProcessor.php:70-108` — automatic billing is filter-driven; otherwise the processor adds an “awaiting manual payment” order note and returns the WooCommerce checkout payment URL.
- `arraysubs/src/Features/RecurringBilling/Services/RenewalProcessor.php:34-94` — creates a pending renewal order only for eligible active/trial subscriptions, blocks pending cancellation, prevents duplicate pending invoices, stores `_pending_renewal_order_id`, and fires the renewal-invoice action.
- `arraysubs/src/Features/RecurringBilling/Services/RenewalScheduler.php` — schedules both renewal invoice generation and due-time renewal processing with centralized Action Scheduler hooks.
- `arraysubs/src/Features/Emails/Emails/RenewalInvoiceEmail.php` — customer email includes the order payment URL.
- `arraysubs/src/functions/gateway-helpers.php` — when Pro is inactive, automatic-gateway filters default safely to manual behavior.

### Shared recovery and duplicate-charge safeguards

- `arraysubs/src/Features/RecurringBilling/Services/RenewalProcessor.php:274-310` — before a retry, a gateway can confirm that an apparently missed webhook actually represented a successful charge; if found, the renewal order is reconciled without charging again.
- `arraysubs/src/Features/RecurringBilling/Services/RenewalProcessor.php:322-330` — `manual_required`, `pending`, and `requires_action` remain pending flows; other results enter failure handling.
- `arraysubs/src/Features/RecurringBilling/Services/RenewalProcessor.php:435-515` — failure metadata is classified, notes are added, and subsequent attempts are scheduled subject to retry config.
- `arraysubspro/src/Features/AutomaticPayments/Services/WebhookRouter.php:32-109` — verifies gateway signatures, parses events, checks duplicate IDs, resolves local entities, dispatches normalized handlers, and remembers successful events.
- `arraysubspro/src/Features/AutomaticPayments/Services/DatabaseMigration.php:152-167` — webhook event IDs are protected by a unique `(gateway_slug, event_id)` database key.

### Stripe adapter

- `arraysubspro/src/Features/AutomaticPayments/Gateways/Stripe/StripeDelegate.php:64-83` — current capability map.
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Stripe/StripeDelegate.php:141-166` — explicitly delegates payments to the official WooCommerce Stripe Gateway and requires that integration/credentials.
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Stripe/StripeDelegate.php:189-229` — renewal PaymentIntent uses stored customer/method IDs, `off_session=true`, and `confirm=true`.
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Stripe/StripeDelegate.php:90-117` — maps payment success/failure/action, refunds, disputes, setup/payment-method changes, and card-expiry/automatic-update events.
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Stripe/StripeDelegate.php:592-619` — creates a Stripe Billing Portal session for payment-method management.
- `arraysubspro/src/Features/AutomaticPayments/Services/StripeSettingsTab.php` and `StripeWebhookProvisioner.php` — maintain a secondary ArraySubs webhook, separate live/test secrets, endpoint health, and refresh/repair behavior in addition to the official Woo Stripe endpoint.

### PayPal adapter

- `arraysubspro/src/Features/AutomaticPayments/Gateways/PayPal/PayPalGateway.php:94-129` — capability map and normalized webhook events.
- `arraysubspro/src/Features/AutomaticPayments/Gateways/PayPal/PayPalGateway.php:247-371` — creates/gets a remote billing plan, creates a PayPal subscription, and redirects the customer to the approval URL.
- `arraysubspro/src/Features/AutomaticPayments/Gateways/PayPal/PayPalGateway.php:609-633` — renewal is provider-managed and the local order waits for `PAYMENT.SALE.COMPLETED`.
- `arraysubspro/src/Features/AutomaticPayments/Gateways/PayPal/PayPalGateway.php:531-590` — refunds the captured sale transaction and refuses a legacy `I-...` subscription ID as a refundable transaction.
- `arraysubspro/src/Features/AutomaticPayments/Gateways/PayPal/PayPalGateway.php:878-897` — payment method changes require reauthorization and migration to a new payment source.
- `arraysubspro/src/Features/AutomaticPayments/Gateways/PayPal/PayPalGateway.php:908-930` — uses PayPal’s API to verify webhook signatures; missing webhook ID fails verification.

### Paddle adapter

- `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleGateway.php:88-122` — current capability map and event map.
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleProductSync.php:1-125` — Paddle Product/Price objects are required and stored against WooCommerce products.
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleProductSync.php:248-260` — price/billing-term change creates a new remote price and archives the old one rather than editing amount in place.
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleGateway.php:353-452` — prepares the Paddle.js transaction/overlay and stores pending remote context.
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleGateway.php:593-623` — renewal is provider-managed and the local order waits for webhook confirmation.
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleGateway.php:528-577` — refund uses a Paddle Adjustment request.
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleGateway.php:1101-1135` — creates a Paddle customer portal session for payment-method changes.

### Cart and lifecycle constraints

- `arraysubspro/src/Features/AutomaticPayments/Services/CartRestrictions.php` — validates mixed carts, multiple subscriptions, different cycles, and customer-defined billing terms against the selected gateway; product-sync gateways reject flexible per-item schedules by default.
- The same service also applies a “most restrictive enabled gateway wins” global filter before selected-gateway validation. Article recommendation: test the site with every enabled automatic gateway, because enabling PayPal can narrow global cart settings even if Stripe alone supports a broader cart.
- `arraysubspro/src/Features/AutomaticPayments/Services/PaymentMethodCoordinator.php:67-108` — allows customer updates only for active, on-hold, or trial subscriptions that are not waiting cancellation.
- `arraysubspro/src/Features/AutomaticPayments/REST/GatewayHealthController.php:283-340` — admin detach clears automatic context and explicitly reverts the subscription to manual payment.
- No inspected current UI/service provides a one-click cross-gateway migration of an active remote agreement. Payment-method updates remain gateway-specific. Present cross-gateway moves as a planned migration requiring customer authorization, duplicate-billing safeguards, schedule reconciliation, and rollback.

## Gateway Health as an operational differentiator

ArraySubs Pro’s Gateway Health screen is relevant evidence, but it should not be used to imply that a green card proves future renewals will never fail.

The current dashboard exposes:

- enabled, needs-setup, available, and test/live status;
- subscription count per gateway;
- last webhook timestamp and webhook URL;
- capability tags;
- Stripe official webhook and secondary ArraySubs endpoint status/URLs;
- a filterable webhook event log with event ID, type, gateway, and processed time;
- a link to the relevant WooCommerce gateway settings.

Evidence:

- `arraysubspro/src/Features/AutomaticPayments/REST/GatewayHealthController.php`
- `arraysubs/src/resources/pages/Settings/GatewayHealthDashboard.jsx`
- `arraysubs/src/resources/Main.jsx` route `/settings/gateways`

Recommended wording: “Gateway Health reduces diagnostic time by showing configuration and recent event evidence in one admin view; it does not replace sandbox renewal tests, payment-provider dashboards, or alerting.”

## Tax, VAT, and Merchant-of-Record precision

This article sits in Payments & Compliance, so it must avoid the common claim that choosing Stripe or PayPal automatically solves sales tax/VAT.

- In a normal direct Stripe payment setup, the merchant remains Merchant of Record and owns transactional compliance, tax obligations, refunds, and disputes. Stripe states this directly: https://stripe.com/resources/more/merchant-of-record
- Stripe Tax can calculate/collect and offers registration/filing workflows, but Stripe’s documentation says merchants must register where required and file/remit collected tax unless using a distinct MoR product/partner workflow: https://docs.stripe.com/tax/how-tax-works and https://docs.stripe.com/tax/filing
- In the ArraySubs Paddle path, Paddle is the Merchant of Record for covered sales. Paddle describes the MoR as taking operational/regulatory responsibility for payments, taxes, refunds/chargebacks, fraud, and consumer compliance: https://www.paddle.com/resources/how-to-evaluate-a-merchant-of-record
- MoR does not mean “no responsibility.” Merchants still need correct product classification, contracts, accounting for payouts/fees, data handling, refund policy alignment, and product eligibility. Do not give tax or legal advice.

Avoid fee tables with exact percentages. Provider pricing, cross-border fees, currency conversion, refund handling, and tax products are country- and plan-dependent and can change. A decision checklist linking to each provider’s current pricing page is safer than embedding unstable figures.

## Refund and dispute nuances

### Stripe

- ArraySubs uses the official WooCommerce Stripe extension for refunds and normalizes old renewal PaymentIntent/charge metadata before WooCommerce calls the gateway.
- WooCommerce says the Stripe extension can refund orders inside WooCommerce: https://woocommerce.com/document/stripe/admin-experience/refunding-orders/
- Stripe can return full or partial refunds, but availability/balance and payment-method rules matter: https://docs.stripe.com/refunds

### PayPal

- ArraySubs uses a PayPal sale transaction refund, matching PayPal subscription webhook sale events.
- The underlying `/v1/payments/sale/{sale_id}/refund` endpoint is deprecated by PayPal for new integrations, even though the inspected adapter currently uses the sale model associated with PayPal Subscriptions charges. Flag this as a technical-review item for the product team, not as an article alarm. Source: https://developer.paypal.com/docs/api/payments/v1/
- The article should tell merchants to test both initial-order and renewal-order refunds in sandbox and confirm transaction IDs are captured.

### Paddle

- Paddle adjustments preserve the original transaction record and can represent full/partial refunds or credits.
- Most live refunds can require Paddle approval; approval timing means “refund request created” is not always “funds returned.” Source: https://developer.paddle.com/build/transactions/create-transaction-adjustments/

## Implementation and pre-launch test checklist

The article can include this extractable checklist after the verdicts.

### Common tests for every automatic option

- [ ] Confirm merchant country, settlement currency, product category, and account eligibility with the provider.
- [ ] Use provider sandbox/test credentials; keep test/live webhook secrets separate.
- [ ] Run initial checkout on classic checkout and Checkout Block if both are supported on the store.
- [ ] Test a normal paid start, a zero-total trial, a signup fee, coupon/discount behavior, tax, and shipping where applicable.
- [ ] Confirm the ArraySubs subscription stores the intended gateway and active remote context.
- [ ] Observe a renewal order before and after provider confirmation.
- [ ] Intentionally fail a payment and verify customer/admin messages, retries, grace period, notes, and no double charge.
- [ ] Test a renewal that requires customer authentication or interactive recovery where the gateway supports it.
- [ ] Update the saved payment source, then run the next renewal against the updated method.
- [ ] Test immediate cancellation and cancel-at-period-end; verify local and remote states agree.
- [ ] Test full and partial refunds on both the initial order and a renewal order.
- [ ] Test duplicate webhook delivery and confirm the event is handled idempotently.
- [ ] Disable or misconfigure the gateway in test and confirm the documented manual fallback rather than assuming silent automatic recovery.
- [ ] Verify scheduled actions, cron health, HTTPS reachability, time zone, and firewall/CDN rules.
- [ ] Reconcile WooCommerce order, ArraySubs subscription, gateway transaction, fees, tax, payout, and refund records.

### Stripe-specific tests

- [ ] Install/connect the official WooCommerce Stripe Gateway and verify Payment, Payout, Webhook, and Sync health.
- [ ] Verify both the official Woo Stripe webhook and ArraySubs secondary endpoint in test and live modes.
- [ ] Run a 3DS test-card checkout and Pay for Order recovery.
- [ ] Test off-session `requires_action`, a hard decline, and an automatically updated/replaced card.
- [ ] Test mixed cart, multiple subscriptions, and different billing cycles.

WooCommerce says Stripe webhooks are normally created automatically on current extension versions and explains how to verify/reconfigure them: https://woocommerce.com/document/stripe/setup-and-configuration/stripe-webhooks/

### PayPal-specific tests

- [ ] Configure Client ID, Client Secret, webhook ID, and sandbox mode.
- [ ] Test the buyer approval/return flow and verify a completed sale is captured, not only an approved agreement.
- [ ] Confirm a one-subscription-only checkout and visible rejection of mixed/multiple/different-cycle carts.
- [ ] Test the new-authorization payment-method update path without creating duplicate active agreements.
- [ ] Test a failed PayPal renewal, subsequent webhook, remote suspension/cancellation, and local reconciliation.

### Paddle-specific tests

- [ ] Confirm the product is accepted under Paddle’s policy before building around the integration.
- [ ] Configure API key, client-side token, seller ID, notification secret, and an approved default payment-link domain.
- [ ] Sync every WooCommerce subscription product/variation to a Paddle Product and Price.
- [ ] Change a price/billing term in test and verify a new remote price is created and the correct local product uses it.
- [ ] Test Paddle.js overlay, `transaction.completed`, past-due behavior, portal method update, pause/resume, cancellation, and refund approval state.
- [ ] Confirm different billing cycles/customer-defined schedules are rejected rather than silently normalized.

## Limitations and not-a-fit section for the article

Include a visible “When ArraySubs is not the best fit” subsection:

- A business that requires an automatic gateway other than Stripe, PayPal, or Paddle needs manual renewals, custom integration work, or a different subscription stack.
- A Paddle-ineligible physical goods or service business should not select Paddle merely for tax outsourcing.
- A store that cannot expose reliable HTTPS webhook endpoints or operate scheduled jobs should solve infrastructure before promising automatic renewals.
- Complex metered/usage billing, provider-native invoicing, marketplace split payments, or enterprise contract billing needs separate scope validation; do not infer it from “subscriptions supported.”
- PayPal-heavy sites with mixed carts/multiple plans may need PayPal as a secondary option rather than the sole checkout path.
- Merchants that need a completely embedded payment-method editor may dislike portal/redirect or reauthorization flows.
- Migrating active agreements between providers is a customer-consent and reconciliation project, not a settings toggle.

## Recommended article outline

1. 40–60 word direct answer
2. Key takeaways box
3. Tested scope and version disclosure
4. Choose the renewal architecture before the logo
5. Evaluation criteria and hard gates
6. Comparison table for Stripe, PayPal, Paddle, and manual renewal
7. Stripe verdict and not-fit cases
8. PayPal verdict and not-fit cases
9. Paddle/MoR verdict and product-eligibility warning
10. Manual-renewal verdict and cost of customer action
11. Best choice for physical, digital, SaaS, membership, and B2B invoice use cases
12. Weighted decision framework with one worked example
13. Switching, payment-method updates, refunds, and webhook operations
14. ArraySubs Gateway Health and diagnostic workflow
15. Implementation/testing checklist
16. Limitations and quarterly refresh triggers
17. CTA after the reader has the verdict: `/deals/arraysubs/pricing/`

## Internal-link plan

Required:

- Payment gateway feature pillar: `/deals/arraysubs/features/#payment-gateways`
- Stripe automatic billing/SCA recipe: `/deals/arraysubs/use-cases/recipes/stripe-automatic-billing-sca/`
- Member payment-method update recipe: `/deals/arraysubs/use-cases/recipes/member-update-payment/`
- Gateway Health recipe: `/deals/arraysubs/use-cases/recipes/gateway-health-monitor/`
- Pricing CTA: `/deals/arraysubs/pricing/`

Sibling links as they publish:

- A057 — Stripe vs PayPal vs Paddle for WooCommerce Recurring Billing
- A058 — Stripe Recurring Payments for WooCommerce: How They Work and What to Test
- A059 — PayPal Recurring Payments for WooCommerce: Agreements, Renewals, and Limits
- A060 — Paddle Merchant of Record for WooCommerce Subscriptions
- A061 — Automatic vs Manual Gateway Support for Subscriptions
- A062 — SCA and 3D Secure for Subscription Renewals
- A063 — Subscription Payment Tokens and Card Updates Explained
- A064 — Subscription Webhooks: Events Every WooCommerce Store Should Monitor
- A065 — Sales Tax and VAT on WooCommerce Subscriptions

Avoid duplicating the product recipes step by step. This article owns gateway selection and decision architecture; recipes own setup execution.

## Confirmed staging screenshot targets

Use the confirmed staging WordPress admin only. Do not expose credentials, API keys, webhook secrets, customer data, order IDs tied to real people, or full signed URLs. Redact/crop any sensitive values before publication.

### Screenshot 1 — WooCommerce payment-method list

- Route: WooCommerce → Settings → Payments
- Goal: show the available Stripe, PayPal (ArraySubs), and Paddle (ArraySubs) rows together, including enabled/setup status where safe.
- Marker queries: “Where are the three automatic gateway choices?” and “Which control opens each gateway’s settings?”
- Article use: establish that gateway availability is configured in WooCommerce, while ArraySubs provides the subscription layer.

### Screenshot 2 — Gateway Health overview

- Route: ArraySubs admin → Settings → Payment Gateways; React route `#/settings/gateways`
- Goal: show gateway cards with status, test badge, subscription count, and last webhook.
- Marker queries: “Where can an operator tell enabled from needs-setup?” and “Where is recent webhook evidence shown?”
- Article use: operations criteria and pre-launch verification.

### Screenshot 3 — Expanded Stripe health details

- Route: same Gateway Health page; expand the Stripe card
- Goal: show official Woo Stripe webhook status and ArraySubs secondary webhook status together. Crop or obscure complete endpoint URLs if they reveal environment details.
- Marker queries: “Which status belongs to the official Woo Stripe endpoint?” and “Which status belongs to the ArraySubs secondary endpoint?”
- Article use: explain why “webhook configured” is not one generic checkbox.

### Screenshot 4 — Webhook event log

- Route: lower section of Gateway Health page
- Goal: show gateway and event-type filters plus recent event rows. Use only synthetic/demo events; crop event IDs if necessary.
- Marker queries: “Which filters isolate one gateway?” and “Where does the operator see processed time and event type?”
- Article use: idempotency, diagnostics, and reconciliation.

### Screenshot 5 — Gateway settings or capabilities

- Preferred route: WooCommerce → Settings → Payments → Paddle or PayPal, whichever has safe demo settings
- Goal: show the non-secret configuration labels (sandbox/test mode, webhook URL label, checkout restrictions/default payment link). Never publish API keys, secrets, client IDs, or notification secrets.
- Marker queries: “Which field separates sandbox from production?” and “Where does the UI state the webhook or checkout requirement?”
- Article use: demonstrate gateway-specific operational setup.

### Screenshot 6 — Subscription payment context

- Route: ArraySubs → Subscriptions → a synthetic/demo subscription detail
- Goal: show payment gateway/status, saved method summary, sync/update/detach actions, or retry diagnostics without personal information.
- Marker queries: “Where does the admin see the attached gateway?” and “Which action reverts the subscription to manual payment?”
- Article use: switching constraints and same-gateway method updates.

Capture 3–6 clean originals, annotate only the chosen frames, and use different screenshots at the section where they answer a concrete question. If the staging data cannot safely demonstrate one target, replace it with a generated contextual visual rather than creating misleading production-like data.

## Contextual visual ideas (use varied forms)

1. **Decision-room illustration:** a merchant at a branching checkout junction—flexible Stripe route, PayPal approval route, and Paddle MoR route—with physical boxes visibly unable to enter the Paddle digital-products lane.
2. **Billing architecture scene:** WordPress storefront and renewal clock charging Stripe directly, versus PayPal/Paddle remote clocks sending signed event envelopes back to WooCommerce.
3. **Saved-method lifecycle illustration:** initial authentication → token/agreement → off-session renewal → customer recovery, using card vault and portal imagery rather than a chart.
4. **Merchant-of-Record responsibility handoff:** two desks; the merchant owns tax/refunds/compliance with a PSP, while Paddle’s MoR desk owns those operational folders for eligible digital sales.
5. **Migration bridge:** active subscribers crossing from one provider island to another with consent checkpoints, remote-agreement cancellation, schedule reconciliation, and duplicate-charge guardrails.
6. **Failure-response operations scene:** Gateway Health console receives signed webhook envelopes, detects a duplicate, checks the remote charge, and safely avoids a second debit.
7. **Use-case storefront montage:** subscription box → Stripe, global SaaS → Paddle, PayPal-heavy membership → Stripe + PayPal, B2B retainer → manual invoice.
8. **Total-cost workbench:** a low headline fee tag beside separate tax, engineering, support, and reconciliation tools, contrasted with an all-in MoR package—no fake numeric values.

Avoid making all visuals dashboard mockups or comparison cards. Use at least one process scene, one real plugin screenshot, one operational environment, and one business-model illustration.

## Official source and claim map

Every source below was checked on 2026-07-20.

### WooCommerce

- https://woocommerce.com/document/subscriptions/payment-gateways/ — automatic/manual distinction; automatic-support table; manual renewal orders can be paid with installed gateways; renewal method persistence.
- https://woocommerce.com/document/subscriptions/renewal-process/ — how automatic and manual renewal processes differ.
- https://woocommerce.com/document/subscriptions/customers-view/subscriber-payment-methods/ — tokenization, subscription-specific saved methods, and customer payment-method changes in WooCommerce Subscriptions generally. Use for ecosystem context, not to claim ArraySubs implements the exact Woo Subscriptions UI.
- https://woocommerce.com/document/stripe/ — official Stripe extension overview and payment-method breadth.
- https://woocommerce.com/document/stripe/setup-and-configuration/stripe-webhooks/ — official Stripe extension webhook health/reconfiguration.
- https://woocommerce.com/document/stripe/customer-experience/saved-payment-information/ — tokenization and saved-method management.
- https://woocommerce.com/document/stripe/customer-experience/3d-secure/ — 3DS support at checkout and Pay for Order.
- https://woocommerce.com/document/stripe/admin-experience/refunding-orders/ — Woo admin Stripe refund path.

### Stripe

- https://docs.stripe.com/payments/setup-intents — off-session mandate, SCA setup, MIT treatment, and possible later recovery.
- https://docs.stripe.com/strong-customer-authentication?locale=en-GB — SCA and off-session payment model.
- https://docs.stripe.com/payments/payment-methods/payment-method-support — method-level SetupIntent/off-session support varies.
- https://docs.stripe.com/payments/cards/overview — automatic card updater is network/issuer dependent; webhook events announce changes.
- https://docs.stripe.com/refunds — full/partial refund mechanics and limitations.
- https://stripe.com/global — merchant account country availability.
- https://docs.stripe.com/currencies — currencies and settlement caveats.
- https://stripe.com/resources/more/merchant-of-record — normal Stripe processing leaves merchant as MoR; separate Managed Payments is distinct.
- https://docs.stripe.com/tax/how-tax-works — registration, calculation, collection, reporting, filing, and remittance responsibilities.

### PayPal

- https://developer.paypal.com/platforms/subscriptions — product/plan/approval/subscription model.
- https://developer.paypal.com/docs/subscriptions/reference/webhooks/ — authoritative subscription event list.
- https://developer.paypal.com/docs/multiparty/subscriptions/customize/payment-failure-retry/ — gateway-managed retries and failure thresholds.
- https://developer.paypal.com/docs/subscriptions/customize/ — platform capabilities; do not conflate with the narrower ArraySubs adapter.
- https://developer.paypal.com/api/rest/reference/currency-codes/ — currency availability and merchant settings caveats.
- https://developer.paypal.com/docs/api/payments/v1/ — sale refund endpoint used by the current adapter and its deprecation notice.

### Paddle

- https://www.paddle.com/resources/how-to-evaluate-a-merchant-of-record — MoR definition and decision criteria; vendor-authored, so label quantitative performance claims as Paddle claims or omit them.
- https://www.paddle.com/help/start/intro-to-paddle/what-am-i-not-allowed-to-sell-on-paddle — product eligibility, including physical goods/human services not-fit warning.
- https://developer.paddle.com/concepts/sell/customer-portal/ — portal functions.
- https://developer.paddle.com/build/subscriptions/update-payment-details/ — portal/API payment update workflows and temporary links.
- https://developer.paddle.com/build/transactions/create-transaction/ — remote transaction and subscription-renewal model.
- https://developer.paddle.com/build/transactions/create-transaction-adjustments/ — refunds/credits, records, and approval status.
- https://developer.paddle.com/webhooks/ — event delivery overview.
- https://developer.paddle.com/webhooks/about/signature-verification/ — `Paddle-Signature` verification.

## Refresh triggers

Review quarterly and immediately after any of these changes:

- ArraySubs/Pro adds or removes an automatic gateway or capability;
- official WooCommerce Stripe integration changes its hooks, token model, or webhook configuration;
- PayPal changes Subscription API/webhook/refund behavior;
- Paddle changes acceptable-use policy, MoR coverage, catalog/price behavior, or refund approval rules;
- provider country/currency availability or pricing changes;
- SCA/3DS rules or network credential-on-file requirements change;
- Gateway Health, payment-method updates, retries, or cross-gateway migration behavior changes.

## Claims to avoid

- “Any WooCommerce gateway automatically renews ArraySubs subscriptions.”
- “Stripe renewals never require customer authentication.”
- “PayPal or Paddle does not support SCA.”
- “Paddle is best for physical subscription boxes.”
- “Paddle removes every tax/legal obligation from the seller.”
- “Stripe/PayPal automatically handles and remits all sales tax in a normal payment integration.”
- “Switching gateways only requires changing a setting.”
- “Gateway Health guarantees future renewals.”
- “All payment methods supported at one-time checkout can be reused off-session.”
- Any exact fee, country count, approval time, or refund time not verified beside the claim on publication day.
## 2026-07-22 completion audit

Rechecked the published article’s installed plugin versions, long-form depth, internal-link set, Pro CTA, preserved screenshot evidence, and visible test-scope/limitations/update-log section. The accepted staging screenshots captured July 20, 2026 remain unchanged; no live/sandbox charge or provider onboarding was performed in this completion audit.

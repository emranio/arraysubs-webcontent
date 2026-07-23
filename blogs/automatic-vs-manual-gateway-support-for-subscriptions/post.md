---
title: "Automatic vs Manual Gateway Support for Subscriptions"
meta_description: "Learn why a WooCommerce gateway can work at checkout but not auto-renew, and how to qualify tokens, schedules, SCA, invoices, failures, and switching."
focus_keyword: "automatic vs manual subscription gateway support"
published: "2026-06-04"
updated: "2026-07-13"
last_verified: "2026-07-22"
author: "Emran"
author_affiliation: "ArrayHash"
reviewer: "ArraySubs Engineering Team"
---

# Automatic vs Manual Gateway Support for Subscriptions

A WooCommerce gateway can work at checkout yet remain manual-only for subscriptions. Automatic renewal needs a subscription-aware integration that preserves reusable customer authority, owns or recognizes the future schedule, handles off-session and authentication states, records one renewal order, and reconciles gateway events. Without that complete chain, a manual renewal invoice is the safe model.

The practical rule is simple:

> **Works at checkout does not mean it can charge a future renewal automatically.**

That distinction matters because the first payment happens while the customer is present. A renewal may happen months later, after the browser session has ended, the price or tax has changed, the card has expired, the bank requires authentication, the plugin has been updated, or a remote billing agreement has drifted from WooCommerce.

> **Key takeaways**
>
> - Checkout support, manual renewal support, saved-payment support, and automatic renewal support are four different capabilities.
> - A broad range of WooCommerce gateways can be useful for manual renewals because the customer pays a normal pending renewal order.
> - Automatic renewal requires reusable authority plus one unambiguous schedule owner, authenticated payment events, and lifecycle-complete recovery.
> - ArraySubs core creates renewal orders, payment URLs, emails, and grace/on-hold transitions; ArraySubs Pro supplies the current Stripe, PayPal, and Paddle automatic adapters.
> - Stripe is site-scheduled in the current ArraySubs architecture. PayPal and Paddle own their remote subscription schedules.
> - A local manual fallback does not prove a provider-owned PayPal or Paddle agreement stopped charging.
> - Paying one manual renewal through another gateway does not prove that future automatic renewals migrated.
> - Qualify the exact offer, country, currency, checkout surface, lifecycle, and failure cases—not the gateway logo.

This guide reflects current ArraySubs and ArraySubs Pro source behavior and a user-confirmed staging interface verified July 22, 2026. Payment-provider behavior, countries, methods, regulations, and integration versions change. It is technical and operational guidance, not legal, PCI, banking, or compliance advice.

## Why can a gateway work at checkout but fail to auto-renew?

At checkout, the gateway answers a narrow question: **can it process this customer-present order right now?** The customer can enter credentials, approve a wallet, complete 3D Secure, choose a bank, or follow a redirect. The order has a known amount and the browser is available for interaction.

Automatic renewal asks a much larger set of questions:

- Did the customer authorize future use, not merely the first payment?
- Is there a reusable token, mandate, or remote subscription agreement?
- Which system decides when the next payment is due?
- Can that system initiate or recognize a charge without routine customer presence?
- What happens when the issuer requires authentication anyway?
- How is one gateway charge mapped to one WooCommerce renewal order?
- How are duplicate, delayed, or out-of-order events handled?
- Does a payment-method update change the subscription’s actual billing context?
- Does cancellation stop both the local schedule and any remote agreement?
- Are the exact amount, currency, tax, shipping, trial, interval, and cart structure supported?

The WooCommerce payment settings screen can therefore contain three very different kinds of provider: a checkout-only gateway, an offline/manual method, and a subscription-aware automatic integration. Their presence on the same page does not make their renewal capabilities equivalent.

![Annotated WooCommerce payment-provider rows distinguishing a manual path, provider-scheduled adapters, and the site-scheduled Stripe adapter.](/blogs/automatic-vs-manual-gateway-support-for-subscriptions/woocommerce-payment-provider-choices-verified.png)

This is a first-party staging observation, not a certification screen. The rows show that the payment methods are installed or available to configure. They do not prove that every method can preserve recurring authority, process an off-session renewal, or synchronize the whole subscription lifecycle.

WooCommerce makes the distinction explicit in its [subscription gateway documentation](https://woocommerce.com/document/subscriptions/payment-gateways/): payment methods can generally be used for customer-present manual subscription payments, while automatic renewal and advanced subscription features depend on the specific gateway extension. Its [payment gateway integration guide](https://woocommerce.com/document/subscriptions/develop/payment-gateway-integration/) separately describes signup, recurring processing, failures, payment-method changes, and schedule ownership.

## The three questions merchants should stop collapsing into one

### 1. Can this gateway take the initial checkout payment?

A “yes” proves only that the gateway is installed, configured, enabled, available for the current order, and able to complete the customer-present transaction. Even that answer is contextual. A gateway may be available for one currency but not another, on Classic Checkout but not Checkout Blocks, for a simple product but not a mixed subscription cart, or in one country but not the customer’s country.

Checkout success does not prove that the integration saved anything reusable. A hosted redirect can return a paid order without creating the token, mandate, provider customer, billing agreement, or remote subscription that a future renewal needs.

### 2. Can it support a manual renewal invoice?

Manual renewal means the subscription system creates a pending renewal order and asks the customer or an administrator to complete payment. The customer is present again, so the pay-for-order checkout can offer whatever methods are valid for that order and customer.

This is why checkout-only gateways can still be valuable for subscriptions. They may not charge a customer automatically next year, but they can process the next annual invoice when the customer follows a secure payment link.

In ArraySubs core, the renewal scheduler creates the invoice/order before the due time, links it to the subscription, and exposes WooCommerce’s secure order-payment URL. The customer portal shows a **Pay** action for eligible pending or failed renewal orders, while renewal and failure emails can include the same secure route.

![Annotated customer portal showing an open renewal order, its Pay action, and the related on-hold lifecycle notice.](/blogs/automatic-vs-manual-gateway-support-for-subscriptions/manual-renewal-pay-action.png)

Manual support still has conditions. Email must arrive; the method must be available on that pay-for-order request; asynchronous bank settlement must be reconciled; and access or fulfillment must follow the merchant’s documented grace policy. “Manual” means customer-present collection, not operational simplicity.

### 3. Can it renew automatically?

Automatic renewal is a capability chain:

> Exact offer accepted  
> → reusable customer authority captured  
> → one system owns the future schedule  
> → renewal obligation is created once  
> → off-session charge is initiated or recognized  
> → authentication/failure state is classified  
> → signed events reconcile gateway and Woo records  
> → method updates and cancellation reach the right context  
> → the next cycle advances only after the right result

If one link is absent, the gateway may still process checkout or a manual renewal. It has not demonstrated automatic renewal.

## A five-level gateway capability ladder

“Supported” is too vague for a subscription gateway. A more useful model has five levels.

![A five-step gateway qualification ladder progresses from checkout to token, authority, automatic collection, and monitored lifecycle completion.](/blogs/automatic-vs-manual-gateway-support-for-subscriptions/gateway-qualification-ladder.png)

| Level | Proven capability | Subscription consequence |
| --- | --- | --- |
| 0 — Unavailable | Cannot process the initial order in this exact context | No checkout path |
| 1 — Checkout only | Processes a customer-present initial or renewal order | Manual renewal can still work through a payable order |
| 2 — Reusable method | Stores a token/mandate or creates a remote agreement with future-use authority | Necessary, but not sufficient, for automatic renewal |
| 3 — Automatic collection | The site or provider can initiate or recognize a future renewal without routine customer action | Automatic-renewal candidate |
| 4 — Lifecycle complete | Handles SCA/action, failures, retries, updates, cancellation, webhooks, reconciliation, and the supported offer shape | Launch candidate after exact-scenario testing |

Level 2 must remain separate from Level 3. Finding a token in WordPress does not prove the subscription engine knows when to use it, what amount to charge, or how to interpret the response. Likewise, a provider-owned subscription may not use a conventional WooCommerce card token at all; its reusable billing context can be a remote agreement ID.

Level 3 must remain separate from Level 4. A sandbox success on one renewal does not test expired cards, SCA, webhook duplication, late events, refunds, cancellation, a method update, a price change, or disabling the integration. Subscriptions live long enough for the unhappy paths to become normal operations.

For broader commercial advice about choosing the customer experience, see [manual versus automatic subscription renewals](/billing-strategy/manual-vs-automatic-subscription-renewals-in-woocommerce/). This guide stays focused on qualifying the gateway and integration.

## What does an automatic subscription gateway actually need?

### Reusable authority: token, mandate, or remote agreement

The customer must authorize future billing in a form the provider and integration can reuse. Three concepts are commonly confused:

- A **token** is a provider-specific reference used instead of raw payment credentials.
- A **mandate or future-use agreement** is the customer/network authority for later merchant-initiated or recurring payments.
- A **remote subscription** is a provider-side object that can combine an agreement, schedule, price, state, and payment method.

The [WooCommerce Payment Token API](https://developer.woocommerce.com/docs/features/payments/payment-token-api/) lets integrations associate gateway-specific payment tokens with users and orders. PCI SSC’s [tokenization guidance](https://www.pcisecuritystandards.org/documents/Tokenization_Product_Security_Guidelines.pdf) explains how a surrogate token can reduce exposure of the primary account number. Neither means that a token automatically satisfies every PCI obligation or authorizes every future charge.

Stripe’s [SetupIntent documentation](https://docs.stripe.com/payments/setup-intents) is especially clear: an integration preparing a method for future off-session use must collect appropriate customer consent and establish terms covering frequency and how the amount is determined. A technically stored credential and a valid recurring authority are related, but not identical.

### One clear schedule owner

Exactly one system should own future collection. There are two common models:

1. **Site-scheduled:** WordPress/ArraySubs decides the due time, creates a renewal order, and asks the gateway to charge a saved method.
2. **Provider-scheduled:** the payment provider’s remote subscription creates the recurring transaction, and WordPress reconciles the provider event into a local renewal order.

Two active charge engines can produce a duplicate charge. Zero active charge engines produce a missing renewal. The schedule owner must also remain clear during a plugin outage, a settings change, migration, pause, cancellation, or manual fallback.

### Off-session and authentication handling

Automatic does not mean guaranteed. An issuer can approve the renewal, decline it, leave it processing, or require the customer to authenticate. Stripe’s [SCA guidance](https://docs.stripe.com/strong-customer-authentication) notes that exemptions are not guaranteed; a future off-session payment can still need customer action.

The integration therefore needs to distinguish a retryable technical issue from insufficient funds, a hard decline, an authentication-required state, and an already-processing transaction. Repeating an unchanged request is not a substitute for bringing the customer back on-session when the bank requires it.

![A dark renewal decision map branches a future off-session charge through frictionless authentication, customer challenge, success, or invoice recovery.](/blogs/automatic-vs-manual-gateway-support-for-subscriptions/sca-renewal-decision-map.png)

The dedicated [Stripe automatic billing and SCA recipe](/deals/arraysubs/use-cases/recipes/stripe-automatic-billing-sca/) covers the product-specific setup and recovery flow; this article intentionally does not duplicate it.

### Renewal-order identity and payment evidence

Every cycle needs one authoritative local obligation. The renewal order should have the agreed products, totals, currency, taxes, shipping, discounts, fees, billing period, and payment method. The gateway-side intent, sale, or transaction should map back to that one order and subscription.

At minimum, retain and reconcile:

- local subscription and renewal-order IDs;
- provider customer, method/mandate, and remote-subscription references where applicable;
- provider event and transaction identifiers;
- amount, currency, status, and occurred time;
- whether payment succeeded, is processing, needs customer action, failed, or was reversed; and
- which schedule owner advanced the next billing date.

Do not put raw card numbers, CVC, API secrets, full sensitive tokens, or unredacted decline payloads in public logs or support tickets.

### Webhooks, idempotency, and reconciliation

Browser redirects are not settlement evidence. Provider events can be duplicated, delayed, or delivered out of order. A capable integration authenticates the raw event, prevents duplicate side effects, compares event time/state, and can reconcile missed success before it attempts another charge.

Provider-scheduled billing depends on this especially strongly. PayPal documents subscription payment and lifecycle events such as `PAYMENT.SALE.COMPLETED` and failed-payment states in its [Subscriptions webhook reference](https://developer.paypal.com/subscriptions/webhooks). Paddle documents webhook duplication, possible out-of-order delivery, and the need to use event identity and occurrence time in [How webhooks work](https://developer.paddle.com/webhooks/about/how-webhooks-work/).

### Payment-method update and cancellation

A customer changing the default card in an account does not necessarily update an existing subscription. The integration must update the exact provider context that the next renewal will use. The [ArraySubs member payment-update workflow](/deals/arraysubs/use-cases/recipes/member-update-payment/) shows the intended customer-facing route for supported adapters.

Cancellation has the reverse requirement: stop the future obligation in the schedule owner. Cancelling a local WordPress record while leaving a remote PayPal or Paddle subscription active is not cancellation. Removing local IDs can make the situation worse by discarding the evidence needed to find and stop the remote agreement.

## How ArraySubs divides manual and automatic renewal work

ArraySubs core is designed to preserve a valid manual path. ArraySubs Pro adds subscription-aware automatic adapters.

### What ArraySubs core handles

Current core behavior includes:

- subscription records and next-payment dates;
- paired invoice-generation and due-time scheduled actions;
- a linked WooCommerce renewal order;
- secure payment URLs for manual renewal;
- renewal invoice, success, and failure email events;
- customer-portal order and Pay actions;
- configurable grace, on-hold, and eventual cancellation transitions;
- duplicate-order safeguards and pending-renewal references;
- success handling that clears failure state and advances from the scheduled renewal basis; and
- safe manual fallback when no Pro automatic route is established.

The customer view makes the consequence visible: an unpaid renewal can place the subscription on hold while preserving the next-payment context and a path back to payment.

![Annotated customer subscription row showing the On Hold state and next-payment context after an unpaid renewal.](/blogs/automatic-vs-manual-gateway-support-for-subscriptions/customer-subscription-on-hold.png)

The exact timing is configurable. Current code defaults are a six-hour invoice lead, three days active after the due date, and seven additional on-hold days before cancellation, but staging or production values can differ. Merchants should align those settings with fulfillment risk, access promises, bank settlement time, and customer communication.

### What ArraySubs Pro adds

Current ArraySubs Pro adds:

- an automatic gateway registry and gateway-resolution layer;
- Stripe, PayPal, and Paddle subscription adapters;
- provider-specific context capture;
- automatic-renewal delegation and lifecycle hooks;
- off-session Stripe PaymentIntent processing;
- provider-event handling for remote PayPal/Paddle schedules;
- payment-method update routing;
- retry and reconciliation hooks where the adapter supports them;
- an optional per-subscription auto-renew control with gateway-specific behavior; and
- Gateway Health status, capability, endpoint, event, and subscription-count evidence.

See the [ArraySubs payment gateway features](/deals/arraysubs/features/#payment-gateways) for the commercial overview. The important engineering caveat is that an adapter’s existence is not proof that every exact subscription is ready.

## Automatic and manual journeys side by side

![A blueprint comparison shows a continuous tokenized automatic renewal on the left and a customer-driven invoice payment journey on the right.](/blogs/automatic-vs-manual-gateway-support-for-subscriptions/automatic-vs-manual-renewal-flow.png)

| Stage | Automatic, site-scheduled | Automatic, provider-scheduled | Manual invoice |
| --- | --- | --- | --- |
| Signup | Customer authorizes future use; site stores provider context | Customer approves remote subscription/agreement | Customer pays initial order; reusable context is optional |
| Schedule owner | ArraySubs | PayPal or Paddle | ArraySubs creates due renewal order |
| Renewal action | Site initiates off-session charge | Provider creates/collects recurring transaction | Customer opens order and selects an available method |
| Local order | Created before charge | Created or reconciled around provider event | Created pending payment |
| Authentication | May require customer recovery | Provider flow/rules own authentication | Customer is present and can authenticate |
| Failure owner | Site classifies and uses bounded recovery | Provider retry/state plus local reconciliation | Customer/admin action plus grace policy |
| Cancellation | Stop local schedule and billing context | Confirm remote cancellation plus local state | Stop future invoice schedule |

Manual renewal is not inherently a failure state. It is a sound model for annual business invoices, purchase-order approval, bank transfer, high-value services, or regional gateways without reusable recurring authority. It becomes a problem only when the customer and operations team were promised hands-off collection.

Automatic renewal is not inherently better either. It carries stronger integration, reconciliation, customer-consent, and failure-recovery requirements. For a $6,000 annual consultancy retainer that needs purchasing approval, an invoice may be the correct contract. For a $9 monthly membership that promises uninterrupted access, repeated manual action will usually create avoidable churn and support load.

## Stripe, PayPal, and Paddle use three different ArraySubs paths

The current Pro adapters all support an automatic concept, but they do not share one billing architecture.

### Stripe: ArraySubs schedules and initiates the renewal

For current Stripe renewals, ArraySubs owns the local schedule and creates the WooCommerce renewal order. It resolves stored Stripe customer/payment-method context and creates a new off-session PaymentIntent. It can classify `succeeded`, `processing`, and customer-action states such as `requires_action`, store transaction evidence, reconcile webhooks, and use bounded local retry policy.

This is not a Stripe Billing Subscription/Invoice implementation. Stripe Billing Smart Retries do not own these PaymentIntents. The detailed architecture and acceptance tests are in [Stripe recurring payments for WooCommerce](/payments-and-compliance/stripe-recurring-payments-for-woocommerce-how-they-work-and-what-to-test/).

### PayPal: the remote subscription owns future billing

The current PayPal adapter creates remote Product, Plan, and Subscription objects. At local due time, ArraySubs does not create a new PayPal charge; it records that it is awaiting the provider. PayPal’s subscription sale and lifecycle events supply the remote payment result that must reconcile to the Woo renewal cycle.

Because PayPal owns the remote agreement, local disablement or a manual order is not proof that remote billing stopped. Current plan limits, fixed-price behavior, Blocks caveats, and reauthorization boundaries are covered in [PayPal recurring payments for WooCommerce](/payments-and-compliance/paypal-recurring-payments-for-woocommerce-agreements-renewals-and-limits/).

### Paddle: the remote subscription owns the transaction schedule

Paddle also owns automatic renewal timing and creates a recurring Transaction from its Subscription. Verified events reconcile the remote transaction, Woo order, and local subscription. Paddle’s Merchant-of-Record role further changes buyer-facing tax documents, checkout, refunds, payouts, and financial reconciliation.

The current implementation has important product-sync, interval/trial, total-parity, refund, and reconciliation limits. Review [Paddle Merchant of Record for WooCommerce subscriptions](/payments-and-compliance/paddle-merchant-of-record-for-woocommerce-subscriptions/) before treating it as a drop-in gateway.

### Current declared capability snapshot

![A gallery-style capability matrix uses checked, conditional, and unavailable tiles to emphasize that gateway support is multidimensional.](/blogs/automatic-vs-manual-gateway-support-for-subscriptions/gateway-capability-matrix.png)

| Capability | Stripe adapter | PayPal adapter | Paddle adapter | Core manual path |
| --- | --- | --- | --- | --- |
| Automatic collection | Yes, site-scheduled | Yes, provider-scheduled | Yes, provider-scheduled | No |
| Customer-present renewal | Available through supported pay flow | Available where provider/order path allows | Available where provider/order path allows | Yes, via payable Woo order |
| Local retry owner | Yes | No | No | Customer/admin action |
| Generic SCA flag | Yes | No | No | Customer present at payment |
| Payment-method update route | Stripe portal context | Reauthorization concept | Paddle customer portal | Choose method on each payable order |
| Different cycles in one checkout | Declared yes | No | No | Depends on cart and gateway availability |
| Provider-owned schedule | No | Yes | Yes | No |
| Operational event evidence | Yes | Yes | Yes | Woo order/payment evidence |

This table is a source-reviewed capability snapshot, not a universal compatibility promise. “Declared yes” must still be tested against the exact product, method, country, currency, cart, checkout surface, and lifecycle change.

## What happens when automatic readiness is lost?

An automatic subscription is not permanently automatic just because signup succeeded. Its readiness can disappear when credentials expire, live/test environments are mixed, the adapter is disabled, a token is deleted, a remote agreement is paused, the subscription’s gateway context is incomplete, or a product change leaves the remote schedule inconsistent.

Current ArraySubs source reveals why this must be monitored rather than assumed.

### Automatic classification is not the full readiness test

The current Pro registry can identify a registered, enabled gateway for the subscription. At due time, additional logic checks the per-subscription auto-renew setting, local gateway status, and stored payment-method context before delegating automatic payment.

Those tests are useful, but they do not prove all of the following at once:

- credentials are valid in the intended environment;
- the gateway is available for this exact transaction;
- the declared automatic capability covers this cart and schedule;
- the remote token/agreement is still usable;
- webhook delivery is current;
- the provider and local next dates agree; or
- the last success has been reconciled.

An operator should therefore treat automatic readiness as a continuously evidenced condition, not a static product setting.

### Pre-due email classification and due-time readiness can differ

In the source version verified July 22, 2026, the logic that suppresses a pre-due manual renewal invoice for an automatic subscription uses a broader classification than the due-time automatic-charge gate. A subscription can name a registered/enabled automatic gateway with auto-renew on, while its actual provider payment-method context is missing or locally inactive.

Possible sequence:

> Subscription looks automatic at invoice-email time  
> → normal pre-due manual invoice email is suppressed  
> → due-time check finds missing/inactive payment context  
> → payment processor returns a manual-required order URL  
> → customer needs communication that may not have happened pre-due

The operational lesson is not that fallback is useless. It is that fallback must be paired with a pre-renewal exception report and an explicit communication route. Monitor automatic subscriptions for missing context before invoice generation; do not wait for the due-time branch to discover it.

### Local fallback cannot stop a provider-owned agreement

For site-scheduled Stripe, switching the local policy to manual can prevent ArraySubs from initiating a future charge. For provider-scheduled PayPal or Paddle, the remote agreement can keep billing even if the local adapter is disabled, unavailable, or detached.

That creates a dangerous double path:

> Remote PayPal/Paddle subscription remains active  
> + local integration falls back to a payable Woo renewal order  
> = customer may be charged remotely and asked to pay locally

Before communicating a manual fallback for a provider-owned subscription:

1. record the remote agreement/subscription identifier;
2. inspect the provider’s current state and next billing time;
3. cancel, pause, or migrate using the supported provider-specific action;
4. obtain authoritative remote confirmation;
5. preserve the event and audit evidence;
6. only then expose the new manual obligation; and
7. monitor the next cycle for both a duplicate charge and a missed payment.

### Gateway Health detach is a local action

The inspected Gateway Health detach operation marks local metadata detached and removes local gateway references. It does not call the adapter’s remote cancellation operation. For PayPal or Paddle, “detached” should therefore be read as a local diagnostic/administrative state, not evidence that the provider agreement stopped.

Do not remove the only remote ID before resolving the remote schedule. A clean local record can hide a continuing remote obligation.

### The auto-renew toggle is gateway-specific

An auto-renew switch is not a universal reversible Boolean:

- **Stripe:** because ArraySubs owns the schedule, the local policy can move future collection to manual.
- **Paddle:** the current path can pause the remote subscription and later call a resume operation, with provider-specific effective-date behavior.
- **PayPal:** the current off action cancels the remote billing context and marks it inactive; the same agreement cannot simply be switched back on without a new authorization path.

Support and product copy should explain the gateway-specific consequence before the customer clicks the control.

## A formal automatic-readiness test

Use this conjunction before calling an exact subscription “automatic-ready”:

> **AUTO_READY = G × A × C × R × S × T × Q × O**

Every term must be true:

| Term | Readiness question |
| --- | --- |
| G — Gateway registered | Does the exact subscription gateway ID resolve to the intended adapter? |
| A — Automatic capability | Does the adapter implement this automatic model, not only checkout? |
| C — Configured and available | Are credentials, environment, country, currency, and order availability valid? |
| R — Reusable authority | Is the correct token, mandate, customer, or remote subscription context present? |
| S — Status healthy | Is the local and remote billing context active and usable? |
| T — Toggle/policy permits | Is auto-renew on, with no pending cancellation or intentional manual policy? |
| Q — Qualified offer | Are the amount, tax, shipping, trial, interval, cart, quantity, and changes supported? |
| O — Operational evidence | Have scheduler, webhook, failure, recovery, cancellation, and reconciliation paths been proven? |

This is a logic model, not a performance formula. Multiplication is useful because one zero makes the result zero. A famous provider cannot compensate for a missing mandate. A valid token cannot compensate for two competing schedules. A healthy webhook cannot compensate for an unsupported trial or wrong renewal total.

## How should you qualify a gateway before launch?

Qualification should produce evidence at each lifecycle stage. Record the plugin/provider versions and exact environment, then test a deliberately small but complete matrix.

### Checkout evidence

- Confirm the gateway extension and vendor you intend to operate; different integrations for the same provider can have different subscription support.
- Test the checkout surface the store actually uses: Classic, Blocks, or both.
- Test the real store country, customer country, currency, and payment method.
- Cover the offer shapes you sell: paid signup, zero-total trial, signup fee, coupon, tax, shipping, mixed cart, quantity, and multiple subscriptions where applicable.
- Verify the Woo order stores the expected gateway ID and non-sensitive payment evidence.
- Confirm no raw credential, secret, PAN, or CVC is written to logs.

### Reusable-authority evidence

- Show clear recurring amount/frequency terms, or explain how a variable amount is determined.
- Verify that the checkout performs the intended future-use setup or creates the remote subscription.
- Confirm the correct provider customer, method/mandate, and remote-subscription IDs are associated with the right WordPress customer and ArraySubs subscription.
- Test a free trial with no initial charge; it still needs future billing context if the first paid cycle will be automatic.
- Update the method through the supported subscription route and prove that the next renewal uses it.

### Renewal evidence

- Name the one schedule owner.
- Observe exactly one renewal obligation and one payable Woo order for the cycle.
- Compare product, amount, discount, fee, shipping, tax, currency, and billing period to the customer agreement.
- For site-scheduled billing, inspect the off-session/MIT request and result.
- For provider-scheduled billing, map the remote transaction to the right local subscription and cycle.
- Reconcile provider transaction ID, local order ID, status, and next date.
- Ensure the next date advances only after the intended successful or accepted result.

### Failure and authentication evidence

- Test insufficient funds, expired or invalid method, generic decline, processing error, and authentication-required states.
- Provide an exact secure action route when the customer must authenticate or update a method.
- Bound or suppress unchanged hard-failure retries.
- Reconcile a possible missed success before creating another payment attempt.
- Confirm the manual Pay action works where fallback is safe.
- Verify email delivery and that messages contain useful but non-sensitive guidance.
- Exercise grace, on-hold, access, fulfillment, and cancellation policy.

![An editorial operations room routes a failed renewal through retry, notification, payment update, manual invoice, recovery, or on-hold outcomes.](/blogs/automatic-vs-manual-gateway-support-for-subscriptions/failed-renewal-operations.png)

### Webhook and reconciliation evidence

- Use a public HTTPS endpoint and preserve the raw body required for signature verification.
- Reject an altered payload and wrong secret.
- Deliver the same event twice and prove side effects occur once.
- Deliver older state after newer state and prove the subscription does not regress.
- Retain gateway, event ID/type, occurred time, processing time, order, subscription, outcome, and useful error classification.
- Simulate a missed event, then prove a reconciliation job can repair local state without charging again.

### Lifecycle and switching evidence

- Update the customer’s method and prove the subscription—not merely the account default—changed.
- Cancel and prove both local and provider-owned future schedules stopped.
- Test pause and resume for timing, immediate-charge behavior, and next-date alignment.
- Disable the gateway or Pro only after executing a remote-agreement runbook.
- Obtain fresh authorization when moving to another provider.
- Observe the first post-switch renewal before retiring the old path.

## What Gateway Health proves—and what it does not

ArraySubs Pro Gateway Health collects useful operational signals for current Stripe, PayPal, and Paddle integrations. The current screen exposes gateway status cards, subscription counts, last-webhook timing, endpoint/settings routes, declared capabilities, and a filterable event log.

![Annotated ArraySubs Gateway Health screen separating automatic-adapter cards, readiness signals, and webhook evidence.](/blogs/automatic-vs-manual-gateway-support-for-subscriptions/arraysubs-gateway-health-overview-verified.png)

This first-party staging view is intentionally empty/disabled; it demonstrates the information architecture, not production uptime or transaction performance. Use the [Gateway Health monitoring recipe](/deals/arraysubs/use-cases/recipes/gateway-health-monitor/) to configure an operating routine.

Gateway Health can help answer:

- Is the adapter enabled and does it still need setup?
- Does the gateway report available in this environment?
- Is the store in test or live mode?
- How many subscriptions currently reference the gateway?
- When did the last webhook arrive?
- Which declared capabilities does the adapter expose?
- What events were recorded and processed?

It does not prove:

- this exact subscription has a valid token or remote agreement;
- the next cart/amount/currency is supported;
- the remote and local next dates agree;
- every event was received;
- a remote success has the correct Woo renewal order;
- a provider-owned agreement has been stopped;
- a payout, fee, refund, or accounting record reconciles; or
- the next renewal will succeed.

Think of the dashboard as an instrument panel, not a certificate. A healthy indicator should trigger confidence to run the transaction test, not permission to skip it.

## How do failures differ between manual and automatic support?

### Manual failure is usually a customer-present workflow problem

Common manual issues include an invoice not reaching the inbox, an expired payment link/session, a gateway not being available for the renewal order, procurement delay, bank-transfer settlement delay, or the customer abandoning checkout. Recovery usually means resurfacing the secure Pay action, correcting order availability, helping the customer choose another valid method, and applying the documented grace/access policy.

The payment attempt is customer-present, so required authentication can normally happen during checkout. That does not eliminate declines, but it simplifies the interaction model.

### Site-scheduled automatic failure is a charge-state problem

For current Stripe renewals, support should inspect the local scheduled action, Woo renewal order, PaymentIntent, last webhook, stored customer/method context, and exact status. A `requires_action` state calls for customer authentication, while `processing` calls for waiting/reconciliation. An existing successful PaymentIntent should be reconciled, not replaced by a second charge.

### Provider-scheduled failure is a remote-state problem

For current PayPal and Paddle subscriptions, start with the provider’s subscription and transaction state. The provider owns charge timing and usually retry behavior. Local work should interpret signed events and align the Woo order without adding a second local collection engine.

The broader [failed subscription payment recovery guide](/payment-recovery/failed-subscription-payment-recovery-for-woocommerce/) explains decline routing and recovery policy, while [what happens when a subscription payment fails](/payment-recovery/what-happens-when-a-subscription-payment-fails/) follows the customer-facing lifecycle.

## Can a customer switch gateways by paying one manual renewal?

No—not as a general rule in current ArraySubs.

Paying a pending renewal order through a different gateway proves that order was paid. It does not prove that the subscription now stores the new gateway’s reusable customer authority, that a new provider agreement exists, that the old remote agreement stopped, or that the next schedule points at the new context.

Current provider update routes are within-provider:

- Stripe uses a Stripe customer/billing-portal route for stored Stripe context.
- Paddle uses a Paddle customer-portal session.
- PayPal requires a new authorization concept rather than portable card-token replacement.

A safe migration needs:

1. an explicit decision about the new schedule owner;
2. fresh customer authorization appropriate to the new provider;
3. capture of the new provider-specific customer/method/agreement context;
4. preservation and authoritative shutdown of the old remote agreement;
5. local subscription metadata and dates aligned to the new model;
6. one controlled next renewal; and
7. reconciliation proving no duplicate and no gap.

Payment tokens are normally provider-specific; portability should never be assumed. Until a purpose-built migration path has completed those steps, describe the payment as an order-level payment, not a subscription migration.

## Four worked examples

The following numbers are illustrative, not ArraySubs performance data.

### Example 1: regional gateway succeeds at checkout but remains manual

A merchant sells a $240 annual membership. A regional bank gateway accepts the signup while the customer is present, but there is no registered ArraySubs automatic adapter or reusable recurring context.

> **Initial checkout:** yes  
> **Future payable renewal order:** yes  
> **Automatic off-session renewal:** no

At the next annual date, ArraySubs creates a $240 pending renewal order. The customer follows the Pay link and uses an available method. That is valid manual gateway support. Calling it automatic because checkout worked would misrepresent the contract.

### Example 2: Stripe has a saved method but the bank requests authentication

A customer authorizes a $49 monthly subscription. Eleven off-session renewals succeed. On the twelfth, the issuer returns an authentication-required state.

The integration remains automatic-capable, but that individual renewal is not paid. The correct response is to preserve the one renewal order and PaymentIntent, send the customer to the secure authentication route, then reconcile the result. Repeatedly creating new intents cannot satisfy a customer-presence requirement.

### Example 3: annual bank transfer is intentionally manual

A business buys a $6,000 annual support retainer. Its procurement team requires a purchase order, the finance team receives an invoice, and service extends after the bank transfer settles.

Manual renewal is the correct design. The relevant measures are invoice delivery, approval time, days to payment, overdue balance, fulfillment policy, and bank reconciliation—not the percentage of customers with a card token.

### Example 4: disabling a remote adapter creates a double-payment risk

A Paddle or PayPal subscription remains active remotely. An operator disables the local gateway and assumes ArraySubs will now invoice manually. Core can indeed create a payable order, but the provider can still collect on its own schedule.

The fix is not to detach more metadata. First retrieve and preserve the remote ID, verify upcoming provider billing, stop or migrate that agreement, wait for authoritative confirmation, then introduce the manual path. Monitor the next cycle on both sides.

## Support runbook: classify before acting

Collect evidence before retrying, reinvoicing, detaching, or telling the customer to pay again.

![Annotated ArraySubs subscription controls showing lifecycle-state filters, customer search, and the gateway filter in a privacy-safe no-result state.](/blogs/automatic-vs-manual-gateway-support-for-subscriptions/subscription-gateway-triage-verified.png)

Start the local triage by narrowing the subscription list to the relevant lifecycle state and gateway. The screenshot deliberately shows a no-result search so no customer row or email is published; it demonstrates the investigation controls, not production subscription volume.

### Minimum record set

- subscription ID, status, next date, and pending-cancellation state;
- renewal-order ID, status, total, currency, and whether it has a secure payment URL;
- local payment-method and gateway slugs;
- presence—not the public full value—of remote customer, method, transaction, and subscription references;
- gateway status and auto-renew policy;
- scheduled invoice, due-time, and retry actions;
- last gateway event type, occurrence time, and processing outcome;
- provider-side payment intent, sale, transaction, or subscription state;
- exact customer-visible message and action route;
- which system owns the schedule; and
- recent plugin, credential, environment, webhook, product, or setting changes.

### Decision sequence

1. **Did initial checkout fail?** If yes, investigate availability, credentials, checkout surface, or cart. Otherwise continue.
2. **Does this exact gateway ID resolve to an automatic adapter?** If no, it is manual renewal by design. Otherwise continue.
3. **Is reusable or remote context present and healthy?** If no, repair or reauthorize and check remote safety before fallback. Otherwise continue.
4. **Who owns the schedule?** For ArraySubs/Stripe, inspect the scheduled action, order, and PaymentIntent. For PayPal/Paddle, inspect the remote subscription, transaction, and webhook.
5. **Was money already collected?** If yes, reconcile without charging or invoicing again. If no, classify customer action, decline, retry, or the safe manual path.

Good support language is specific:

- “This method can complete checkout, but this subscription is configured for manual renewal.”
- “The renewal order is ready to pay; no automatic charge was attempted.”
- “Your bank requires authentication before this renewal can complete.”
- “We are reconciling an existing provider transaction before attempting another charge.”
- “This PayPal/Paddle agreement owns the remote schedule; we are checking it before changing the local order.”

Avoid “your card is saved, so renewal is guaranteed,” “retry until it works,” or “we switched it to manual” without proving the remote agreement stopped.

## When ArraySubs may not be the best fit

ArraySubs is a strong fit when you want WooCommerce-native subscription records, a robust manual renewal path, and one of the current Pro automatic architectures for an offer you can qualify end to end. It may not be the right solution when:

- a required regional payment method has no compatible automatic adapter and customer-present invoices are unacceptable;
- the business needs a billing model, interval, proration rule, usage calculation, or cart structure outside the tested adapter capabilities;
- high-volume revenue operations require a dedicated billing platform’s orchestration and ledger to be authoritative;
- provider/network token portability is a hard migration requirement;
- the merchant cannot operate webhook monitoring and reconciliation;
- physical, service-heavy, regulated, or marketplace products do not fit the intended provider, especially a Merchant-of-Record eligibility model; or
- the business needs every renewal charge to originate from a system other than the architecture the adapter uses.

The correct outcome can be manual ArraySubs renewals, a different WooCommerce subscription integration, a dedicated billing platform, or a provider-specific architecture. The decision should follow the exact lifecycle evidence, not a desire to force every gateway into one model.

## Frequently asked questions

### Can every WooCommerce gateway process a manual subscription renewal?

WooCommerce’s documented model allows payment methods to be used for manual subscription payments through a pending renewal order. In practice, the gateway still must be enabled and available for that exact pay-for-order request, customer, country, currency, amount, and checkout context. “Broad manual compatibility” is more accurate than “every gateway always appears.”

### Does a saved card mean automatic renewal will work?

No. A saved token is only one component. You also need customer authority for future use, an automatic adapter, one schedule owner, a supported exact offer, valid credentials/status, correct off-session processing, and lifecycle-complete event and recovery handling.

### Why did ArraySubs create a manual order for an automatic subscription?

Current due-time processing can choose the manual-required branch when the automatic route is unavailable—for example, when auto-renew is off, gateway status is inactive, or stored payment context is missing. Investigate the readiness failure and customer communication. For PayPal or Paddle, confirm the remote agreement is not still scheduled before asking the customer to pay.

### Does disabling or detaching PayPal or Paddle stop renewal?

Not by itself. Those providers can own remote subscription schedules. The current local Gateway Health detach action is not remote cancellation. Verify and stop the provider agreement through the supported provider-specific lifecycle path, then reconcile local state.

### Can a customer move from manual to automatic by paying once with Stripe?

Not automatically in the general current flow. Paying one renewal proves that order paid. A future automatic subscription needs explicit future-use authorization, stored Stripe context attached to the subscription, a deliberate schedule-owner transition, and a verified next renewal.

### Which ArraySubs gateways currently support automatic renewal?

Current ArraySubs Pro provides automatic adapters for Stripe, PayPal, and Paddle. They do not behave identically: Stripe is site-scheduled, while PayPal and Paddle are provider-scheduled. Availability and support still depend on the exact method, country, currency, checkout, cart, offer, lifecycle action, and current integration version.

## The decision rule to carry into production

Do not ask only, “Is this gateway supported?” Ask whether this exact subscription offer, on this exact checkout surface, with this exact gateway adapter and customer authorization, can create one renewal obligation, collect or present it once, survive authentication and failure, update the correct payment context, stop the correct schedule, and reconcile the evidence.

Anything less may still be an excellent manual-renewal gateway. It should not be presented as automatic.

Use the [ArraySubs payment gateway feature overview](/deals/arraysubs/features/#payment-gateways) to compare the current integration surfaces, then validate the exact lifecycle with the recipes linked above. If the current Pro adapters fit your payment architecture and acceptance matrix, [View Pro Pricing](/deals/arraysubs/pricing/).

## Verification scope, limitations, and update log

This explainer was last reverified on July 22, 2026, by Emran at ArrayHash and reviewed by the ArraySubs Engineering Team. Verification combined ArraySubs Free and Pro source inspection, current primary gateway and WooCommerce documentation, and fresh staging captures of WooCommerce payment providers, ArraySubs Gateway Health, and privacy-safe subscription triage controls.

The staging pass verified installed interfaces, provider rows, automatic-adapter visibility, readiness metrics, event-log controls, and gateway/lifecycle filters. It did **not** enable or fund any gateway, create a new renewal, perform an off-session charge, deliver a provider webhook, authenticate with 3D Secure, switch a subscription across providers, cancel a remote PayPal/Paddle agreement, or pay the manual renewal shown in the preserved customer-portal screenshot. The capability classifications and code gaps are version-specific and must be tested against the exact offer, country, method, and integration versions before launch.

Update history:

- **July 22, 2026:** Recaptured and strictly annotated three real plugin screenshots, rejected and replaced one capture that exposed a synthetic customer email, recorded full provenance and marker plans, added the privacy-safe support-triage visual, and refreshed verification disclosures.
- **July 13, 2026:** Updated the article’s gateway-capability analysis and metadata.
- **June 4, 2026:** Original publication.

Reverify after changes to ArraySubs renewal routing, manual fallback, payment-context validation, gateway registration, remote cancellation, or Gateway Health; after WooCommerce changes payment-provider or pay-for-order behavior; and whenever Stripe, PayPal, Paddle, SCA, supported methods, countries, or event contracts change.

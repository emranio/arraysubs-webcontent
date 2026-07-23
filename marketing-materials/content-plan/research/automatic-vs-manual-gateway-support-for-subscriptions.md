# Research packet — Automatic vs Manual Gateway Support for Subscriptions (A061)

## Verified screenshot replacement plan — 2026-07-22

These clean originals were captured from the confirmed staging site after ArraySubs Pro activation. They replace or supplement untraceable screenshot references while preserving every prior image file. Each original was inspected twice before annotation. The subscriptions-list capture deliberately uses a no-result search so no customer identity is published.

1. **WooCommerce payment-provider choices**
   - Source route: `http://localhost:10013/wp-admin/admin.php?page=wc-settings&tab=checkout`
   - Original: `a061-woocommerce-payment-providers-original.png`
   - Placement: “Why can a gateway work at checkout but fail to auto-renew?”
   - Marker queries: `Outline the Take offline payments row and label it "Manual path".`; `Outline the Paddle (ArraySubs) and PayPal (ArraySubs) rows together and label them "Provider-scheduled".`; `Outline the Stripe row and label it "Site-scheduled".`
2. **ArraySubs Gateway Health overview**
   - Source route: `http://localhost:10013/wp-admin/admin.php?page=arraysubs-mainadmin#/settings/gateways`
   - Original: `a061-gateway-health-overview-original.png`
   - Placement: “Gateway Health: what it proves and what it does not.”
   - Marker queries: `Outline the Paddle, PayPal, and Stripe gateway cards together and label them "Automatic adapters".`; `Outline the status, subscription count, and last webhook metrics across the three cards and label them "Readiness signals".`; `Outline the Webhook Event Log panel and label it "Webhook evidence".`
3. **ArraySubs subscription gateway triage**
   - Source route: `http://localhost:10013/wp-admin/admin.php?page=arraysubs-mainadmin#/subscriptions`
   - Original: `a061-subscription-gateway-filter-original.png`
   - Placement: “Support runbook: classify before acting.”
   - Privacy state: a deliberate no-result customer search prevents customer rows from appearing.
   - Marker queries: `Outline the subscription status filter row and label it "Lifecycle states".`; `Outline the customer search box and label it "Customer search".`; `Outline the All Gateways dropdown and label it "Gateway filter".`

Annotation contract for all three: purple `#873EFF`, focused crop, three review passes, and no unresolved markers allowed. Accepted annotated files must be copied byte-for-byte into both the article source directory and its public mirror.

**Research completed:** 2026-07-20  
**Intended article:** A061 — Automatic vs Manual Gateway Support for Subscriptions  
**Canonical slug:** `automatic-vs-manual-gateway-support-for-subscriptions`  
**Primary keyword:** `automatic vs manual subscription gateway support`  
**Audience:** global WooCommerce merchants, developers, finance operators, and support teams  
**Evidence standard:** current ArraySubs/ArraySubsPro source inspection plus primary vendor, standards-body, and WooCommerce documentation only  
**Important scope:** this is a durable research packet for the writer, not publish-ready legal, payments-network, tax, or compliance advice.

## Executive answer

A gateway can appear at WooCommerce checkout yet still be manual-only for subscriptions. Automatic renewal requires a subscription-aware integration that preserves reusable customer authority—a token, mandate, or remote billing agreement—owns the next-charge schedule, handles off-session and SCA states, records renewal orders, and reconciles gateway events. Without that complete chain, the safe path is a manual renewal invoice.

The central misconception to dismantle is:

```text
works at checkout ≠ can charge a future renewal automatically
```

Checkout support proves that the gateway can handle the customer-present transaction in front of it. Automatic-renewal support is a separate lifecycle capability. It must survive after the checkout browser session ends and must coordinate reusable authority, a schedule, a future amount, customer absence, authentication exceptions, failure recovery, cancellation, payment-method changes, webhooks, and accounting records.

For current ArraySubs:

- **ArraySubs core/free** owns subscription records, renewal scheduling, renewal-order creation, manual payment URLs, renewal emails, portal Pay actions, grace/on-hold/cancellation progression, and the safe default when no Pro automatic adapter is available.
- **ArraySubs Pro** supplies the automatic-payment adapter system and current Stripe, PayPal, and Paddle integrations, plus gateway health data, payment-method update routing, gateway event handling, retry/reconciliation hooks, and an optional per-subscription auto-renew toggle.
- **Stripe** is site-scheduled in this architecture: ArraySubs creates the due renewal order and confirms a new off-session Stripe PaymentIntent using stored Stripe customer/payment-method context.
- **PayPal** and **Paddle** are provider-scheduled in the current adapters: the remote subscription owns later billing, while ArraySubs creates or reconciles local WooCommerce renewal records from scheduled work and verified events.
- A missing, disabled, unresolved, inactive, or auto-renew-disabled automatic context can lead the local payment processor to return a manual-payment result. That is operationally useful, but it is not automatically safe for a PayPal/Paddle remote agreement that may still be active.

## Search intent and cannibalization boundary

This article must own **gateway qualification and diagnosis**, not the broader business choice between manual and automatic customer journeys.

- A018, [Manual vs Automatic Subscription Renewals in WooCommerce](/billing-strategy/manual-vs-automatic-subscription-renewals-in-woocommerce/), owns the commercial decision: which renewal model fits a business, customer contract, and operating model.
- A056, [Best Payment Gateways for WooCommerce Subscriptions in 2026](/payments-and-compliance/best-payment-gateways-for-woocommerce-subscriptions/), owns gateway selection and comparison.
- A058, A059, and A060 own the provider-specific Stripe, PayPal, and Paddle architectures.
- A062 owns detailed SCA/3DS analysis.
- A063 owns detailed token and card-update analysis.
- A064 owns detailed webhook-event monitoring.
- A067 will own migration procedure.
- A179 will own “renewal not working” troubleshooting.

A061 should therefore answer:

1. Why can a gateway be visible and successful at checkout but unable to auto-renew?
2. What technical capabilities turn a checkout gateway into an automatic subscription gateway?
3. What happens when those capabilities are missing or later become unhealthy?
4. How should a merchant qualify a gateway and prove its behavior before launch?
5. What exactly does ArraySubs core do, and what does ArraySubs Pro add?

It should link to narrow recipes instead of repeating click-by-click configuration:

- Stripe setup and SCA recipe: `/deals/arraysubs/use-cases/recipes/stripe-automatic-billing-sca/`
- Member payment update recipe: `/deals/arraysubs/use-cases/recipes/member-update-payment/`
- Gateway Health recipe: `/deals/arraysubs/use-cases/recipes/gateway-health-monitor/`

## The three questions merchants commonly collapse into one

### 1. Can the gateway take this checkout payment?

This is a customer-present, order-specific question. It depends on the gateway being installed, enabled, available for the shopper/order, configured with valid credentials, and capable of the current product, country, currency, amount, and checkout surface.

A “yes” answers only the initial transaction. It does not prove that the gateway:

- saves reusable payment authority;
- can charge without the customer present;
- receives or triggers a future scheduled payment;
- can represent trials, changing totals, multiple subscriptions, or mixed carts;
- handles a future authentication-required state;
- updates the subscription after a method change;
- stops the remote obligation on cancellation;
- gives the local store trustworthy event evidence.

### 2. Can the gateway support a manual renewal invoice?

Manual renewal means the subscription system creates an open renewal order and the customer or an administrator completes payment. WooCommerce’s official Subscriptions documentation states that all WooCommerce payment methods can be used for manual subscription payments because Subscriptions creates a pending renewal order and that order can then be paid with an available gateway. This is the key reason checkout-capable gateways often remain useful even when they cannot automatically renew.

In ArraySubs, core constructs the renewal order and exposes WooCommerce’s secure `get_checkout_payment_url()` in the result, renewal email, failed-payment email, and customer portal. The payment methods actually shown on that pay-for-order screen remain subject to WooCommerce and each gateway’s availability rules for that order and customer.

### 3. Can the gateway renew automatically?

Automatic renewal is a chain of capabilities, not a label:

```text
exact cart accepted
  + customer grants future-use authority
  + reusable remote context survives checkout
  + one system owns the future schedule
  + due-time payment can be initiated or recognized
  + SCA/customer-action states have a recovery path
  + success/failure events are authenticated and reconciled
  + payment-method changes affect the correct subscription
  + cancellation stops the correct future obligation
  = automatic-renewal support
```

WooCommerce’s gateway integration guide makes this separation explicit. A gateway must declare subscription support, implement signup processing, manage or participate in recurring payment processing, process failures, and handle recurring payment-method changes. It also distinguishes provider-scheduled billing from extension-scheduled token billing.

## A capability ladder that is more precise than “supported”

The article should introduce a five-level capability ladder. This gives readers an extractable framework and avoids the misleading binary label.

| Level | What the integration can do | Subscription consequence |
| --- | --- | --- |
| 0 — unavailable | Cannot process the initial order in this context | No checkout path |
| 1 — checkout only | Processes a customer-present initial or renewal order | Manual subscription renewal can still work through a payable order |
| 2 — reusable method | Stores a provider token/mandate or remote agreement with permission for future use | Necessary but not sufficient for automatic renewal |
| 3 — automatic collection | Site or provider can initiate/recognize a future renewal without routine customer action | Automatic renewal candidate |
| 4 — lifecycle complete | Handles retries, SCA/customer action, method changes, cancellation, webhooks, reconciliation, and supported cart/schedule changes | Launch candidate after testing |

Level 2 is deliberately separate from Level 3. A saved token is not proof that a particular extension knows when or how to charge it. Conversely, a provider-managed subscription may not expose a conventional Woo token; the remote subscription ID can be the renewable billing context.

Level 3 is deliberately separate from Level 4. A happy-path renewal is not enough. Merchants sell subscriptions for months or years, so update, failure, cancellation, and drift behavior determine whether automatic support is real.

## Formal automatic-readiness test

For the article’s original decision framework, define automatic readiness as a conjunction:

```text
AUTO_READY = G × A × C × R × S × T × Q × O
```

Where every term is Boolean:

- **G — Gateway registered:** a current subscription adapter resolves for the gateway ID.
- **A — Automatic capability:** the adapter actually supports the intended automatic model.
- **C — Configured and available:** required credentials/environment are valid and the gateway is available for the exact transaction context.
- **R — Reusable authority:** the subscription has the provider-specific customer, payment-method, mandate, or remote-subscription context needed later.
- **S — Status healthy:** local and remote billing context is active and not detached, paused, errored, cancelled, or otherwise unusable.
- **T — Toggle/policy permits:** auto-renew is enabled and the subscription is not pending cancellation or intentionally manual.
- **Q — Qualified offer:** exact cart, amount, currency, country, interval, trial, taxes, shipping, quantity, and schedule are supported.
- **O — Operational evidence:** scheduler, webhooks, idempotency, recovery, cancellation, and reconciliation have been tested and monitored.

If any term is zero, the merchant does not have proven automatic renewal. A gateway may still support the current manual payment.

The multiplication is a logic model, not a performance formula. It intentionally prevents a strong gateway brand or successful first payment from compensating for a missing mandate, unsupported schedule, or broken webhook.

## Reusable authority: token, mandate, or remote subscription

### A WooCommerce token is a reference, not raw card data

WooCommerce provides a Payment Token API that associates gateway-specific token objects with users and orders. Its documentation shows gateway ID, token value, last four digits, expiry, type, and user ownership checks. The actual implementation and security properties still belong to the payment integration and provider.

PCI SSC describes payment tokenization as replacing a primary account number with a surrogate token that can be stored instead of the PAN. Tokenization can reduce disclosure risk, but the PCI guidance expressly does not say that tokenization removes every applicable PCI DSS requirement. The article should not claim “using tokens makes the store PCI compliant.”

### A reusable reference still needs permission and future-use setup

Stripe’s SetupIntent documentation says future off-session use requires customer permission and an agreement that covers the merchant’s ability to initiate one or a series of payments, expected frequency, and how the amount is determined. Stripe also explains that setting future usage correctly helps mark later off-session card payments as merchant-initiated transactions and optimize them for SCA handling.

This yields a crucial distinction:

```text
saved credential = technical reference
future-use authority = customer/network agreement
automatic renewal = reference + authority + schedule + integration
```

Merely finding a token ID in WordPress does not prove the customer authorized the intended recurring use or that the token is valid for the amount/method/country later.

### Remote agreements are a different automatic model

PayPal Subscriptions and Paddle subscriptions can own the recurring schedule remotely. The local store does not create each charge request in the same way as the current Stripe path. Instead, it needs the remote subscription/billing agreement identifier and trusted events that map remote renewals back to a WooCommerce renewal order.

This distinction affects:

- who retries a failed payment;
- where the next billing date is authoritative;
- how plan/amount/date changes propagate;
- how an auto-renew toggle is implemented;
- whether disabling a local plugin stops remote charging;
- how a late/missing webhook is reconciled;
- how a migration must cancel or replace the old agreement.

## Merchant-initiated transactions and SCA: automatic does not mean guaranteed

The writer should stay concise here and link to A062 for depth.

For card-based site-initiated renewal:

1. The customer is on-session at signup or payment-method setup.
2. The integration captures reusable authority and performs any required initial authentication.
3. At renewal, the system creates an off-session request referencing the saved method and customer.
4. The issuer may approve, decline, process asynchronously, or require the customer to authenticate again.

Stripe explicitly says exemptions are not guaranteed and off-session payments may still require authentication. Its SetupIntent guide tells integrations to build a recovery process and bring the customer back online when authentication is required.

Therefore:

- “SCA-ready” means the integration can prepare, classify, and recover authentication states.
- It does not mean every renewal avoids 3DS.
- A gateway accepting a one-time 3DS checkout does not prove it supports future off-session renewal.
- A repeated off-session retry cannot complete customer authentication by itself.

Current ArraySubs Stripe behavior illustrates the right state distinction. It creates an off-session PaymentIntent with `confirm=true`, stores the intent, treats `succeeded` as paid, `processing` as pending, and `requires_action`/`requires_confirmation` as a customer-action state. The broad A061 article should link to the dedicated [Stripe automatic billing and SCA recipe](/deals/arraysubs/use-cases/recipes/stripe-automatic-billing-sca/) instead of reproducing setup steps.

PayPal and Paddle perform their own checkout/authentication and remote recurring processing. Their ArraySubs capability arrays set the generic `sca` flag false, so the article must not imply that ArraySubs implements Stripe-style SCA handling for those adapters. Provider/network authentication may still occur inside their hosted flows.

## Manual renewal journey in current ArraySubs

The current core source supports this sequence:

```text
stored next payment date
  → invoice action scheduled before due
  → pending WooCommerce renewal order created
  → renewal-invoice event/email for manual context
  → due-time payment processor returns manual_required
  → customer sees secure Pay action on the related order
  → WooCommerce pay-for-order checkout
  → paid order advances subscription and next schedule
```

### Verified core behavior

- `RenewalScheduler::schedule()` queues both invoice generation and due-time processing.
- The default invoice lead is six hours, configurable as hours or days.
- `RenewalProcessor::createRenewalInvoice()` avoids duplicates, creates a renewal order, links it to the subscription, stores `_pending_renewal_order_id`, and fires `arraysubs_renewal_invoice_created`.
- The subscription deliberately stays active at invoice creation; overdue status changes happen through the grace policy.
- `PaymentProcessor::processPayment()` returns `manual_required` and the WooCommerce checkout payment URL when the Pro automatic filters do not establish an automatic charge path.
- The customer portal lists related orders and shows **Pay** only for orders that need payment and are `pending` or `failed`.
- Renewal invoice and payment-failed emails include the order payment URL.
- On payment, current core clears the pending order, on-hold, retry, and failure state; applies payment-gated changes; calculates the next date from the scheduled renewal basis; schedules the next cycle; and restores an eligible subscription to active.
- Default core grace values are three days active after due and seven further days before cancellation, but the site settings are configurable and the staging screenshot may show non-default values.

### What manual support does not guarantee by itself

- delivery of email to the inbox;
- that every enabled gateway is available on every pay-for-order request;
- immediate bank-transfer settlement;
- procurement approval or invoice-document compliance;
- a successful future automatic migration;
- continued access or fulfillment beyond the merchant’s configured policy;
- tax/shipping parity unless the renewal order is tested.

### Best manual use cases

- annual B2B invoices and purchase-order workflows;
- bank transfer or other asynchronous/offline settlement;
- regional gateways that do not support a reusable subscription contract;
- high-value services requiring approval each cycle;
- deliberate customer-present payment for regulatory or contractual reasons;
- a controlled fallback while an automatic context is repaired, provided any remote billing agreement is safely stopped.

Manual renewal is usually a poor fit for very frequent low-value plans when uninterrupted access is promised and customers do not expect monthly action. That is a business-model observation, not a claim that manual support is technically inferior.

## Automatic journey in current ArraySubs

### Shared local decision route

The core payment processor asks Pro whether a subscription is automatic. Current Pro answers yes when `_payment_gateway` maps to a registered, enabled ArraySubs automatic gateway. Before the due-time payment attempt, Pro then checks:

- the gateway resolves;
- the per-subscription auto-renew toggle is not off;
- `_gateway_status` is empty or active;
- `_gateway_payment_method_id` exists.

If these checks pass, core delegates to `arraysubs_process_automatic_renewal_payment`. If they do not, core uses its manual-payment branch.

### Stripe: local schedule and off-session charge

Current ArraySubs Pro uses the official WooCommerce Stripe Gateway for the initial checkout surface and a non-checkout Stripe delegate for automatic renewal/lifecycle contracts.

At renewal, ArraySubs:

- owns the local next-payment schedule;
- creates the Woo renewal order;
- resolves stored Stripe customer and payment-method IDs;
- prepares renewal order metadata;
- creates and confirms an off-session PaymentIntent;
- marks the order paid on `succeeded`;
- returns pending for `processing`;
- creates a customer-action route for `requires_action`;
- stores transaction evidence and reconciles webhooks;
- supports local pre-retry verification and a current retry config of three attempts, 24 hours apart.

This is not a Stripe Billing Subscription/Invoice architecture. Stripe Billing Smart Retries are not the owner of these local PaymentIntents.

### PayPal: provider schedule and event-confirmed sale

Current ArraySubs Pro creates a PayPal Product, Plan, and Subscription during signup/approval. At local renewal time, its `processRenewalPayment()` does not issue a new charge. It verifies that a PayPal subscription ID exists, records that it is awaiting PayPal, and returns a pending-success posture. PayPal’s `PAYMENT.SALE.COMPLETED` and related subscription webhooks provide the remote result.

PayPal’s official Subscriptions documentation confirms that its Subscriptions API creates recurring plans and that `PAYMENT.SALE.COMPLETED` represents a subscription payment, while `BILLING.SUBSCRIPTION.PAYMENT.FAILED`, cancellation, suspension, and other events describe lifecycle changes.

### Paddle: provider schedule and transaction-confirmed renewal

Current Paddle behavior is also provider-owned. The ArraySubs renewal method does not issue a charge; it waits for the Paddle subscription’s automatic transaction and the verified event result. Paddle’s `transaction.completed` documentation identifies `subscription_recurring` as a transaction created automatically from a renewal and distinguishes automatic collection using a payment method on file from manual invoice collection.

Paddle’s official webhook guidance says subscription state should be synchronized from events and calls for reconciliation to repair missed-event drift. It also documents at-least-once delivery and possible out-of-order events, requiring idempotent processing and event-time comparison.

For full current Paddle limitations—tax/category mapping, price synchronization, totals, refunds, fixed terms, and reconciliation—the article should link to [Paddle Merchant of Record for WooCommerce Subscriptions](/payments-and-compliance/paddle-merchant-of-record-for-woocommerce-subscriptions/) rather than repeating that investigation.

## Current ArraySubs gateway capability matrix

The table below reflects declared current source capabilities, not a promise that every variation has passed production acceptance testing.

| Capability | Stripe delegate | PayPal adapter | Paddle adapter | Manual/core path |
| --- | --- | --- | --- | --- |
| Automatic payments | Yes | Yes, provider-scheduled | Yes, provider-scheduled | No; customer/admin pays |
| Free-trial path | Declared | Declared via plan cycle | Declared via Paddle price | Manual collection after trial possible |
| Payment-method update | Stripe portal route | Reauthorization concept | Paddle portal session | Customer can choose a method on each payable order |
| Card auto-update | Declared | No | Declared | Not applicable to recurring credential |
| Card expiry notice | Declared | No | No | Not applicable to recurring credential |
| SCA flag | Yes | No | No | Customer is present at checkout when authentication is required |
| Mixed cart | Yes | No | Yes | Controlled by core/cart/gateway availability |
| Multiple subscriptions | Yes | No | Yes | Controlled by core/cart/gateway availability |
| Different cycles in one checkout | Yes | No | No | Controlled by core/cart/gateway availability |
| Product sync required | No | Current flag says no despite PayPal Product/Plan creation | Yes | No remote recurring catalog |
| Local retry owner | Yes | No | No | Customer/admin action |
| Provider retry owner | No Stripe Billing schedule in this architecture | Yes | Yes | No |
| Gateway sync/reconciliation | Declared | Declared | Declared | Order/payment reconciliation remains local |

### Important wording discipline

- Say “declares support” when describing the capability array alone.
- Say “current source implements” only when the relevant implementation path was inspected.
- Say “first-party staging observation” for behavior directly seen on the confirmed staging site.
- Never translate a capability flag into “works for every country, currency, cart, and lifecycle action.”
- Do not say “500+ gateways auto-renew.” The broader WooCommerce ecosystem is a manual checkout/pay-for-order advantage in core; automatic paths are specifically integrated.

## Implementation gaps and boundaries the article should disclose

These findings are especially useful because they show why merchants must qualify the whole lifecycle.

### 1. Automatic classification is weaker than full readiness

`GatewayRegistry::isRegistered()` requires a gateway to resolve and report enabled. It does not require:

- `isGatewayAvailable()` to be true;
- `gatewayNeedsSetup()` to be false;
- declared `automatic_payments` capability to be true;
- a valid payment method/remote subscription context;
- a healthy webhook;
- a supported exact offer/cart.

At due time, `filterShouldProcessPayment()` adds auto-renew, gateway-status, and payment-method checks, but still does not call `isGatewayAvailable()` or test the automatic capability flag. A credential/setup problem can therefore reach the adapter and fail later.

Public wording: **“ArraySubs Gateway Health exposes setup, enabled, available, environment, capabilities, subscription count, endpoint, and last-event evidence, but operators must still prove a renewal. A green-looking installation state is not transaction certification.”**

### 2. Invoice-email classification and due-time readiness can diverge

The current renewal email manager suppresses the pre-due manual invoice when:

- Pro says the subscription uses a registered/enabled automatic gateway; and
- auto-renew is on.

It does not check active gateway status, stored `_gateway_payment_method_id`, actual availability, or credentials. The due-time charge gate does check status and payment-method presence. Therefore a subscription can be treated as automatic when the invoice email is created, then fall back to manual at due time because the token/context is missing.

Potential consequence: the customer may not receive the normal pre-due invoice email even though a manual payment is ultimately required.

Article wording should be factual and restrained: **“In the source version verified July 20, 2026, automatic-email suppression and due-time charge readiness use different tests. Treat missing or inactive payment context as an exception that needs proactive monitoring and customer communication; do not assume fallback alone sends the right pre-due message.”**

### 3. Local manual fallback does not stop a provider-owned schedule

When Pro or a gateway is unavailable, core’s filter default is manual. That is safe for local behavior, but it cannot cancel an already-active PayPal or Paddle remote agreement when Pro code is not running.

Risk scenario:

```text
PayPal/Paddle remote subscription still active
  + local adapter disabled/deactivated/unresolved
  → ArraySubs creates/manualizes local renewal order
  + provider may still collect remotely
  = duplicate obligation or reconciliation drift risk
```

The article must advise operators to inspect and stop/pause/cancel the remote agreement before treating provider-scheduled subscriptions as manual.

### 4. Gateway Health “detach” is local, not remote cancellation

The current `GatewayHealthController::detachGateway()`:

- sets `_gateway_status` to detached;
- removes `_payment_gateway`, remote payment-method reference, session/transaction IDs, and display metadata;
- logs that the subscription reverted to manual.

It does not call the adapter’s `cancelRemoteBillingContext()`. For a provider-scheduled PayPal or Paddle agreement, detaching local metadata does not prove remote billing stopped.

Public article warning: **“Use Detach as a local diagnostic/administrative action, not as proof that a provider-owned agreement was cancelled. Verify remote status first and preserve the remote ID needed for reconciliation.”**

### 5. Cross-gateway migration is not proven by paying one manual order

Current core stores initial-order payment method/token context and fires the Pro capture hook on initial payment. The inspected renewal-success method advances subscription state but does not replace `_payment_method`, fire the same gateway-context capture hook, or implement a general cross-gateway migration.

Current provider update routes are within-provider:

- Stripe: create Stripe Billing Portal session for the stored Stripe customer;
- Paddle: create Paddle customer portal session;
- PayPal: return a reauthorization concept that says a new agreement is required, but the inspected method itself returns no approval URL.

Therefore the article should say:

- paying a manual renewal with a different gateway does not, by itself, prove future automatic renewals migrated;
- provider tokens/agreements are gateway-specific in current ArraySubs metadata;
- migration needs explicit customer authorization, new provider context capture, remote-old-agreement shutdown, and a verified next renewal;
- link to future A067 rather than teaching migration here.

### 6. Declared PayPal/Paddle auto-renew toggle behavior is not symmetrical

When the optional global auto-renew toggle is enabled:

- Stripe can be switched to manual locally because ArraySubs owns the local schedule.
- Paddle auto-renew-off calls remote pause and marks the gateway paused; re-enable can call resume.
- PayPal auto-renew-off cancels the remote billing context and marks it inactive. Current controller logic does not allow immediately re-enabling that inactive PayPal agreement; reauthorization is needed.

Do not present the toggle as a universal reversible Boolean.

## Customer journeys to compare

### Journey A — Checkout-only gateway, manual renewal

```text
customer checks out with regional gateway
  → initial order paid
  → subscription activated
  → no registered automatic adapter / no reusable automatic context
  → renewal order generated before next due date
  → customer receives/opens Pay action
  → customer selects an available gateway and pays
  → subscription advances
```

Support implications:

- reminders and Pay action must work;
- access/grace policy must be understood;
- late payment should advance from the intended scheduled anchor;
- staff must not promise “card on file” behavior from a successful checkout.

### Journey B — Stripe site-scheduled automatic renewal

```text
customer checks out and authorizes future use
  → official Stripe gateway creates reusable context
  → ArraySubs stores gateway customer/method context
  → local scheduler creates renewal order
  → ArraySubs creates off-session PaymentIntent
  → succeeded / processing / requires_action / failed
  → webhook + local result reconcile order
  → next schedule advances only after paid result
```

Support implications:

- distinguish PaymentIntent from Stripe Billing Invoice;
- inspect `requires_action` rather than blindly retrying;
- verify an existing successful remote charge before retry;
- update the subscription’s Stripe context, not merely a WordPress account default.

### Journey C — PayPal/Paddle provider-scheduled renewal

```text
customer approves hosted/remote subscription
  → remote provider stores agreement and schedule
  → local subscription stores remote IDs
  → provider creates/collects next renewal
  → signed webhook describes success/failure/status
  → ArraySubs finds or creates the matching Woo renewal order
  → local subscription/order reconciles to remote truth
```

Support implications:

- never add a second charge engine without proving the remote collection is stopped/unpaid;
- compare remote and local next dates;
- cancellation, pause, and resume need remote confirmation;
- provider event delays/duplicates/order must be handled;
- disabling or detaching locally is not a remote stop.

### Journey D — Automatic readiness lost before renewal

```text
subscription still names automatic gateway
  + token missing / gateway inactive / adapter disabled / auto-renew off
  → pre-due classification may still look automatic in some paths
  → due-time automatic gate fails
  → manual_required order URL returned
  → customer communication and remote-state safety must be verified
```

This is the most valuable diagnostic journey for A061 because generic comparison articles rarely examine it.

## Gateway qualification checklist

The article should provide an extractable launch checklist divided by evidence type.

### A. Checkout evidence

- [ ] Gateway is installed from the intended vendor and exact extension/version is recorded.
- [ ] Gateway is enabled, fully configured, and available for the store country/currency.
- [ ] Classic and/or Block Checkout support is tested on the actual surface the store uses.
- [ ] Initial paid, zero-total trial, signup-fee, coupon, tax, shipping, and mixed-cart cases match the offer.
- [ ] The order stores the expected gateway ID and payment evidence.
- [ ] No raw PAN, CVC, secret, or unsafe credential appears in WordPress logs/screenshots.

### B. Reusable-authority evidence

- [ ] Customer-facing terms disclose recurring amount/frequency or how the amount is determined.
- [ ] The gateway performs the correct future-use setup or creates a remote subscription agreement.
- [ ] The subscription stores the correct provider customer/payment-method/mandate/subscription IDs.
- [ ] The saved context is attached to the right WordPress customer and subscription.
- [ ] A trial with no initial charge still captures the required future context.
- [ ] Removing or updating an account-level default does not silently leave the subscription on stale context.

### C. Renewal evidence

- [ ] Exactly one system owns the billing schedule.
- [ ] Exactly one payable Woo renewal order represents the cycle.
- [ ] The renewal amount, tax, shipping, discount, fee, currency, and quantity match the customer agreement.
- [ ] Site-scheduled payment sends the correct off-session/MIT indicators.
- [ ] Provider-scheduled payment maps its remote transaction to the correct local cycle.
- [ ] Paid order and gateway transaction IDs reconcile.
- [ ] The next date advances only after the intended paid/accepted result.

### D. Failure and SCA evidence

- [ ] Insufficient funds, expired/invalid method, generic decline, processing error, and authentication-required states are distinguishable.
- [ ] Authentication-required renewal gives the customer a secure action URL.
- [ ] Repeating an unchanged hard failure is prevented or bounded.
- [ ] A missed webhook is checked before another charge.
- [ ] A manual Pay path exists when appropriate.
- [ ] Grace/on-hold/cancellation matches fulfillment and access policy.
- [ ] Customer and admin emails arrive with useful, non-sensitive instructions.

### E. Webhook and reconciliation evidence

- [ ] Endpoint is public HTTPS and preserves the raw body needed for verification.
- [ ] Signature verification rejects altered payloads and wrong secrets.
- [ ] Duplicate event delivery is idempotent.
- [ ] Out-of-order events cannot regress newer state.
- [ ] Event ID, occurred time, gateway, order, subscription, outcome, and processing error are retained.
- [ ] A reconciliation job repairs a missed success without charging again.
- [ ] Gateway Health shows current setup/availability and event evidence.

### F. Lifecycle and switching evidence

- [ ] Customer payment-method update changes the subscription’s future billing context.
- [ ] Cancellation stops both local and remote schedules.
- [ ] Pause/resume behavior is gateway-specific and tested for effective date/immediate charge.
- [ ] Auto-renew-off behavior is disclosed per gateway.
- [ ] Disabling the plugin/gateway has an explicit remote-agreement runbook.
- [ ] A gateway switch obtains new authorization and cancels/archives the old context.
- [ ] The first post-switch renewal is observed end to end before the old path is retired.

## Worked examples

All numbers below must be labeled illustrative, not ArraySubs performance data.

### Example 1 — A gateway succeeds at checkout but stays manual

A regional gateway accepts a $240 annual membership while the customer is present. It returns payment success but does not expose an ArraySubs automatic adapter or reusable future-charge context.

Classification:

```text
checkout = yes
manual renewal = yes, through a future payable order
automatic renewal = no
```

At the next annual date, ArraySubs creates a $240 renewal order. The customer pays through an available method. This is valid manual support. Calling it “automatic” because the first payment succeeded would be false.

### Example 2 — Stripe token exists but SCA still requires action

A customer authorizes a $49 monthly subscription and the subscription stores a Stripe customer and payment-method reference. Eleven renewals succeed off-session. On the twelfth, the issuer returns `requires_action`.

Classification before the attempt:

```text
automatic capable = yes
this renewal paid automatically = not yet
customer action required = yes
```

The safe response is to preserve the one renewal order, direct the customer to authenticate, and reconcile the resulting PaymentIntent. Blindly creating another PaymentIntent does not satisfy the issuer’s customer-presence requirement.

### Example 3 — Annual bank-transfer invoicing is intentionally manual

A consultancy sells a $6,000 annual support retainer. The customer needs a purchase order and pays by bank transfer. The finance team reviews the invoice and records settlement before service extends.

Manual support is the correct contract. The important metrics are invoice delivery, days-to-pay, overdue balance, access/fulfillment policy, and reconciliation—not a forced tokenization project.

### Example 4 — Disabling a provider-scheduled adapter can create a double path

A PayPal or Paddle remote subscription remains active. An operator disables the local gateway or Pro plugin and assumes future renewals are now manual. ArraySubs core can create a payable renewal order, but the remote provider may still charge on its own schedule.

Safe runbook:

1. identify the remote subscription/agreement before removing local IDs;
2. verify whether a future remote charge is scheduled;
3. cancel/pause/migrate it using the provider-specific supported action;
4. wait for or retrieve authoritative remote confirmation;
5. preserve audit evidence;
6. only then communicate a manual invoice path;
7. watch the next cycle for both duplicate charge and missing payment.

### Example 5 — Missing token exposes a communication gap

The subscription has an enabled automatic gateway ID and auto-renew is on, but its provider payment-method reference is missing.

Current source behavior can suppress the pre-due manual invoice email because the subscription is classified automatic at invoice creation. At due time, the payment gate sees the missing reference and returns manual-required.

Operational rule: monitor automatic subscriptions for missing context before invoice creation, notify the customer with a valid update/pay action, and do not rely on the due-time fallback alone.

## Failure diagnosis and support runbook

Support should classify before acting.

### Minimum evidence to collect

- subscription ID and current status;
- renewal order ID, status, total, currency, and payment URL availability;
- `_payment_method` and `_payment_gateway` gateway slugs;
- whether a remote customer/payment-method/subscription ID is present (never paste the full value into public tickets);
- `_gateway_status` and auto-renew state;
- scheduled invoice, due-time, and retry actions;
- last gateway event type/time/outcome;
- gateway-side transaction/payment intent/subscription status;
- exact customer-visible message and action URL type;
- whether the remote provider owns the schedule;
- recent settings/plugin/credential/environment changes.

### Diagnostic decision tree

```text
Did initial checkout fail?
  yes → gateway availability/credentials/cart problem; not a renewal issue yet
  no  → continue

Is there a registered automatic adapter for this exact gateway ID?
  no  → manual renewal by design
  yes → continue

Does the subscription have healthy reusable/remote context?
  no  → repair/update/re-authorize; manual fallback only after remote-safety check
  yes → continue

Who owns the schedule?
  ArraySubs/Stripe → inspect scheduled action, renewal order, PaymentIntent
  PayPal/Paddle    → inspect remote subscription/transaction and webhook mapping

Was money already collected remotely?
  yes → reconcile; do not retry/reinvoice
  no  → classify decline, action, retry, or manual path

Does the customer need authentication or a new method?
  yes → send exact secure customer action
  no  → use bounded provider-appropriate recovery
```

### Support wording

Good:

- “This payment method can complete checkout, but this subscription is set to manual renewal.”
- “The renewal order is ready to pay; no automatic charge was attempted.”
- “Your bank requires authentication before this renewal can complete.”
- “We are reconciling an existing gateway transaction before attempting another charge.”
- “Your PayPal/Paddle agreement owns the remote schedule; we are checking that state before changing the local order.”

Avoid:

- “WooCommerce doesn’t support this gateway” when only automatic renewal is unsupported.
- “Your card is saved, so the renewal is guaranteed.”
- “We switched you to manual” without stopping a remote agreement.
- “Retry until it works.”
- exposing raw decline payloads, full IDs, secrets, card numbers, or CVC.

## Gateway Health: what it proves and what it does not

Current ArraySubs Pro Gateway Health returns per-gateway:

- slug, title, and description;
- enabled, needs-setup, available, and test-mode state;
- subscription count;
- last webhook timestamp;
- webhook URL and settings URL;
- declared capabilities;
- additional Stripe health fields;
- a paginated webhook event log with gateway, event ID/type, and processed time.

This is valuable operational evidence. It helps answer “is the integration configured and are events arriving?” It does not prove:

- that the exact subscription has a valid token/agreement;
- that the next amount/cart is supported;
- that the remote schedule matches local schedule;
- that no event was missed outside the retained log;
- that a completed remote charge has a correct local order;
- that a provider-owned agreement was stopped;
- that accounting/payout reconciliation is complete.

Natural product placement:

- introduce Gateway Health when explaining evidence and operational readiness;
- link the [Gateway Health monitoring recipe](/deals/arraysubs/use-cases/recipes/gateway-health-monitor/);
- describe capability cards and event logs without calling the dashboard a financial reconciliation system.

## Screenshot plan for the writer

Use fresh article-specific annotations generated from clean staging originals. The existing originals listed here are candidates; the main writer should recapture if the confirmed staging UI changed. Never reuse an already annotated file as annotation input.

### Screenshot 1 — WooCommerce payment providers

- **Candidate original:** `web-content/marketing-materials/content-plan/screenshots/live-ui/29-woocommerce-payment-methods-original.png`
- **Placement:** immediately after “works at checkout does not equal automatic renewal.”
- **Teaching purpose:** show offline methods and ArraySubs automatic providers on one WooCommerce Payments screen.
- **Sparse marker ideas:**
  - “Manual invoice candidate” → the “Take offline payments” row.
  - “Subscription adapters” → Paddle (ArraySubs) and PayPal (ArraySubs) rows.
  - “Official checkout surface” → Stripe row.
- **Caption caution:** the screen lists/configures providers; it does not certify future renewals.

### Screenshot 2 — ArraySubs Gateway Health overview

- **Candidate original:** `web-content/marketing-materials/content-plan/screenshots/live-ui/28-payment-gateway-health-overview-original.png`
- **Placement:** in the gateway-qualification or operational-evidence section.
- **Teaching purpose:** show provider status, subscription counts, last webhook, and event log as separate signals.
- **Sparse marker ideas:**
  - “Connection state” → status field on a gateway card.
  - “Event freshness” → Last Webhook field.
  - “Operational evidence” → Webhook Event Log.
- **Caption caution:** a disabled/empty staging state is still educational but must be labeled a first-party staging observation, not a production benchmark.

### Screenshot 3 — Customer Pay action on an unpaid renewal

- **Candidate original:** `web-content/marketing-materials/content-plan/screenshots/live-ui/19-customer-pay-action-original.png`
- **Placement:** in the manual customer journey.
- **Teaching purpose:** prove that a pending renewal order exposes a customer Pay action and show the status/note context.
- **Sparse marker ideas:**
  - “Open renewal order” → pending-payment status row.
  - “Customer action” → Pay button.
  - “Lifecycle context” → on-hold/unpaid subscription note.
- **Privacy:** recapture with non-sensitive synthetic staging data and crop out unnecessary identity/session banners.

### Screenshot 4 — Grace period settings

- **Candidate original:** `web-content/marketing-materials/content-plan/screenshots/live-ui/01-grace-period-settings-original.png`
- **Placement:** after manual failure/access implications.
- **Teaching purpose:** show invoice lead, active grace, and on-hold-before-cancel as separate merchant-configurable controls.
- **Sparse marker ideas:**
  - “Invoice lead” → Generate Invoice Before Due.
  - “Active grace” → Days Active After Due.
  - “Final hold window” → Days On-Hold Before Cancel.
- **Caption caution:** screenshot values may be staging-specific and must not be called product defaults. Source defaults are 6 hours, 3 active days, and 7 on-hold days as of verification.

### Optional Screenshot 5 — Customer subscription payment method/recovery action

- **Candidate original:** `web-content/marketing-materials/content-plan/screenshots/live-ui/18-customer-recovery-actions-original.png`
- **Placement:** in the payment-method update or recovery section.
- **Teaching purpose:** distinguish the displayed method, manage-payment-method link, subscription status, and pending order.
- **Sparse marker ideas:**
  - “Current subscription method” → Payment Method row.
  - “Update route” → Manage payment methods.
  - “Payment state” → On Hold badge.
- **Privacy:** same synthetic-data/crop requirement.

The article can use four of these without padding. Suggested generated visuals in addition to screenshots:

1. capability ladder from checkout-only to lifecycle-complete;
2. three-lane sequence diagram for manual, Stripe site-scheduled, and provider-scheduled renewal;
3. automatic-readiness conjunction wheel/checklist;
4. “lost readiness” diagnostic decision tree;
5. local-vs-remote switching safety diagram.

Avoid fake UI, invented gateway logos, prose-heavy graphics, and repeated dashboard compositions.

## Recommended article outline for a 5,000–6,500 word explainer

### Opening (direct answer, 40–60 words)

Use the executive answer almost verbatim. Mention WooCommerce, automatic renewal, manual renewal invoice, reusable authority, and ArraySubs inside the first 150 words.

### Key takeaways box

- Checkout support and automatic renewal support are different capabilities.
- Manual renewal can use a broad WooCommerce pay-for-order ecosystem.
- Automatic renewal needs reusable authority plus one clear schedule owner.
- Stripe, PayPal, and Paddle use different ArraySubs ownership models.
- Safe fallback requires customer communication and remote-agreement checks.

### H2 — Why does a gateway work at checkout but fail to auto-renew?

- customer-present transaction versus future absent transaction;
- screenshot: Woo payment providers;
- explain the three questions;
- cite WooCommerce gateway and integration docs.

### H2 — What do “manual” and “automatic” support actually mean?

- direct definitions;
- five-level capability ladder;
- link to A018 for broader business choice;
- avoid repeating its recommendation-by-business-model section.

### H2 — What does an automatic subscription gateway need?

- token/mandate/remote agreement;
- consent and MIT/SCA;
- one schedule owner;
- renewal order/evidence;
- webhooks and reconciliation;
- customer update/cancellation path.

### H2 — How ArraySubs routes manual and automatic renewals

- core renewal-order pipeline;
- Pro registry/delegation;
- manual Pay URL and emails;
- automatic gate checks;
- screenshot: customer Pay action.

### H2 — Three automatic architectures are not interchangeable

- Stripe site-scheduled;
- PayPal remote schedule;
- Paddle remote schedule;
- small comparison table;
- link provider-specific A058/A059/A060.

### H2 — What happens when automatic readiness is lost?

- missing token/status/credentials;
- disabled Pro/gateway;
- invoice-email readiness mismatch;
- local fallback vs remote obligation;
- detach warning;
- auto-renew toggle differences.

### H2 — How should a merchant qualify a gateway?

- AUTO_READY formula;
- grouped checklist;
- screenshot: Gateway Health;
- explain dashboard limits.

### H2 — How do failures, SCA, and payment-method updates differ?

- customer action vs retry;
- manual Pay action;
- Stripe requires_action;
- provider-owned recovery;
- within-provider updates;
- links to A062/A063 and member-update recipe.

### H2 — Can you switch an existing subscription to another gateway?

- no generic automatic portability claim;
- new authorization + context capture + old remote shutdown;
- paying an order is not proven migration;
- link A067 when published; keep this section diagnostic, not procedural.

### H2 — Worked examples

- checkout-only annual membership;
- Stripe authentication-required renewal;
- annual bank-transfer invoice;
- provider adapter disabled while remote schedule remains active.

### H2 — Support runbook

- minimum evidence;
- decision tree;
- screenshot: payment method/recovery action or grace settings.

### H2 — Limitations and when ArraySubs is not the best fit

- unsupported automatic provider/country/method requiring a different integration;
- complex high-volume orchestration requiring a dedicated billing platform;
- unsupported provider-specific cart/schedule semantics;
- merchant unwilling to monitor webhooks/reconciliation;
- migration requiring network/provider token portability not implemented;
- MoR need better addressed by provider-specific architecture after eligibility review.

### Conclusion and CTA

Recommend qualifying the full lifecycle, not the checkout badge. Link [ArraySubs payment gateway features](/deals/arraysubs/features/#payment-gateways), then place **View Pro Pricing** link to `/deals/arraysubs/pricing/` after the reader has received the complete decision framework.

### Useful FAQ questions only

1. Can every WooCommerce gateway process manual subscription renewals?
2. Does a saved card mean automatic renewal will work?
3. Why did ArraySubs create a manual invoice for an automatic subscription?
4. Does disabling a PayPal or Paddle gateway stop remote renewal?
5. Can a customer switch from manual to automatic by paying with Stripe once?
6. Which ArraySubs gateways currently support automatic renewal?

## Internal-link map and anchor suggestions

Required and verified intended routes:

- `/deals/arraysubs/features/#payment-gateways` — “ArraySubs payment gateway features,” “automatic-payment integrations,” or “gateway capability overview.”
- `/deals/arraysubs/use-cases/recipes/stripe-automatic-billing-sca/` — “Stripe automatic billing and SCA recipe.”
- `/deals/arraysubs/use-cases/recipes/member-update-payment/` — “member payment-update workflow.”
- `/deals/arraysubs/use-cases/recipes/gateway-health-monitor/` — “Gateway Health monitoring recipe.”
- `/deals/arraysubs/pricing/` — “View Pro Pricing.”

Contextual published links:

- `/payments-and-compliance/best-payment-gateways-for-woocommerce-subscriptions/` — gateway selection/comparison, not qualification mechanics.
- `/payments-and-compliance/stripe-recurring-payments-for-woocommerce-how-they-work-and-what-to-test/` — current Stripe architecture.
- `/payments-and-compliance/paypal-recurring-payments-for-woocommerce-agreements-renewals-and-limits/` — current PayPal architecture and limits.
- `/payments-and-compliance/paddle-merchant-of-record-for-woocommerce-subscriptions/` — current Paddle/MoR architecture and limitations.
- `/billing-strategy/manual-vs-automatic-subscription-renewals-in-woocommerce/` — business-model comparison.
- `/billing-strategy/how-woocommerce-subscription-renewals-work/` — full local renewal lifecycle.
- `/payment-recovery/failed-subscription-payment-recovery-for-woocommerce/` — decline routing, retry ownership, and recovery policy.
- `/payment-recovery/what-happens-when-a-subscription-payment-fails/` — customer-facing failure timeline.

Future siblings should only be linked if actually published before A061 goes live:

- A062 SCA and 3D Secure for Subscription Renewals.
- A063 Subscription Payment Tokens and Card Updates Explained.
- A064 Subscription Webhooks.
- A067 Migrating Subscription Gateways.

## Claim ledger with source support

### Primary external sources

1. **WooCommerce — Subscriptions Payment Methods & Gateways**  
   URL: https://woocommerce.com/document/subscriptions/payment-gateways/  
   Supports: automatic versus manual method distinction; feature support is extension-specific; a named provider does not imply every third-party integration supports automatic renewals; all WooCommerce methods can process manual subscription payments through a pending order; manual-renewal customers can choose an available method; advanced features such as recurring total/date/method changes vary by extension.  
   Accessed: 2026-07-20.

2. **WooCommerce — Subscription Renewal Process**  
   URL: https://woocommerce.com/document/subscriptions/renewal-process/  
   Supports: automatic renewal normally needs no customer intervention; manual renewal requires login/payment; manual uses standard Woo checkout and can use a different available method; renewal orders and emails; failed-renewal Pay action; gateway deactivation can cause manual renewal in Woo Subscriptions’ own architecture.  
   Important caveat: do not automatically transfer every Woo Subscriptions behavior to ArraySubs; use this source for ecosystem concepts and label ArraySubs behavior from source inspection.  
   Accessed: 2026-07-20.

3. **WooCommerce — Subscriptions Payment Gateway Integration Guide**  
   URL: https://woocommerce.com/document/subscriptions/develop/payment-gateway-integration/  
   Supports: a gateway must explicitly register subscription support; signup, management, failed payments, payment-method changes, and recurring processing are separate implementation responsibilities; provider-scheduled and extension-scheduled/tokenized architectures differ; declaring support makes an enabled gateway visible but full lifecycle code is still required.  
   Accessed: 2026-07-20.

4. **WooCommerce Developer Docs — Payment Token API**  
   URL: https://developer.woocommerce.com/docs/features/payments/payment-token-api/  
   Supports: gateway-specific tokenization support, user ownership, order/customer token storage, saved-method UI, token retrieval, last-four/expiry display fields.  
   Accessed: 2026-07-20.

5. **Stripe — Setup Intents API**  
   URL: https://docs.stripe.com/payments/setup-intents  
   Supports: setting up methods for future payments; consent/mandate requirements; on-session versus off-session usage; Stripe marking properly configured later off-session charges as MIT; future payments can still require customer authentication and need a recovery path.  
   Accessed: 2026-07-20.

6. **Stripe — Strong Customer Authentication readiness**  
   URL: https://docs.stripe.com/strong-customer-authentication  
   Supports: customer can authenticate during setup and a card can later be reused off-session; off-session exemptions are not guaranteed; banks can require authentication later.  
   Accessed: 2026-07-20.

7. **PayPal — Integrate Subscriptions**  
   URL: https://developer.paypal.com/subscriptions/integrate  
   Supports: Product/Plan/Subscription API architecture, PayPal approval flow, recurring plan, and webhook integration.  
   Accessed: 2026-07-20.

8. **PayPal — Subscriptions webhooks**  
   URL: https://developer.paypal.com/subscriptions/webhooks  
   Supports: `PAYMENT.SALE.COMPLETED`, refund/reversal, subscription activation/update/cancellation/suspension, and failed-payment event meanings.  
   Accessed: 2026-07-20.

9. **Paddle — transaction.completed**  
   URL: https://developer.paddle.com/webhooks/transactions/transaction-completed/  
   Supports: completed transaction semantics; automatic versus manual collection; `subscription_recurring` origin; subscription/billing period and payment details.  
   Accessed: 2026-07-20.

10. **Paddle — Webhooks overview**  
    URL: https://developer.paddle.com/webhooks/  
    Supports: lifecycle events needed to keep subscription state synchronized and which events represent transactions/subscription changes.  
    Accessed: 2026-07-20.

11. **Paddle — How webhooks work**  
    URL: https://developer.paddle.com/webhooks/about/how-webhooks-work/  
    Supports: duplicate delivery, event idempotency, possible out-of-order arrival, use of `occurred_at`, and transaction/subscription event timing.  
    Accessed: 2026-07-20.

12. **Paddle — Provision access and handle subscription state**  
    URL: https://developer.paddle.com/build/subscriptions/provision-access-webhooks/  
    Supports: webhook-driven state cache, event selection, and reconciliation to repair missed-event drift.  
    Accessed: 2026-07-20.

13. **PCI Security Standards Council — Tokenization Product Security Guidelines**  
    URL: https://www.pcisecuritystandards.org/documents/Tokenization_Product_Security_Guidelines.pdf  
    Supports: token as a surrogate for PAN, reduced disclosure risk, acquiring/card-on-file token context, and explicit limitation that the document does not replace PCI DSS requirements.  
    Accessed: 2026-07-20.

### Current ArraySubs/ArraySubsPro source evidence

Use these files as first-party product evidence, citing ArraySubs source review or describing as “verified in the current implementation” rather than linking a private repository:

- `arraysubs/src/functions/gateway-helpers.php`
  - safe default without Pro;
  - automatic subscription filter;
  - per-subscription auto-renew behavior;
  - retry defaults/failure categories.
- `arraysubs/src/Features/RecurringBilling/Services/PaymentProcessor.php`
  - automatic delegation and manual fallback;
  - `manual_required` result and payment URL.
- `arraysubs/src/Features/RecurringBilling/Services/RenewalProcessor.php`
  - renewal order creation, due-time processing, pending/manual/action states, retry verification, failure handling.
- `arraysubs/src/Features/RecurringBilling/Services/RenewalScheduler.php`
  - paired invoice and due-time scheduling;
  - configurable invoice lead.
- `arraysubs/src/Features/RecurringBilling/Services/Hooks.php`
  - default grace transitions, invoice recovery job, pending cancellation scheduling safeguards.
- `arraysubs/src/Features/RecurringBilling/Services/OrderCreation.php`
  - renewal-order payment method/token copying and order construction.
- `arraysubs/src/Features/Subscriptions/Services/OrderIntegration.php`
  - initial payment context storage;
  - renewal-success state advancement;
  - gateway validation on reactivation.
- `arraysubs/src/Features/CustomerPortal/views/view-subscription.php`
  - customer Pay action for pending/failed orders.
- `arraysubs/src/Features/Emails/Services/EmailManager.php`
  - manual invoice email and automatic-suppression logic;
  - success/failure communication.
- `arraysubs/src/functions/settings-helpers.php`
  - current default invoice lead and grace settings.
- `arraysubspro/src/Features/AutomaticPayments/Services/GatewayRegistry.php`
  - registered/enabled adapter resolution.
- `arraysubspro/src/Features/AutomaticPayments/Services/GatewayResolver.php`
  - `_payment_gateway`/`_payment_method` resolution.
- `arraysubspro/src/Features/AutomaticPayments/Services/Hooks.php`
  - automatic classification, due-time readiness checks, adapter delegation, gateway sync/reconciliation, provider cancellation handling.
- `arraysubspro/src/Features/AutomaticPayments/Services/CartRestrictions.php`
  - mixed cart, multiple subscriptions, different cycles, and product-sync custom-term restrictions.
- `arraysubspro/src/Features/AutomaticPayments/Services/PaymentMethodCoordinator.php`
  - lifecycle gating and adapter-specific update routing.
- `arraysubspro/src/Features/AutomaticPayments/Contracts/AutomaticGatewayContract.php`
  - full lifecycle contract beyond checkout.
- `arraysubspro/src/Features/AutomaticPayments/Abstracts/AbstractArraySubsGateway.php`
  - default capabilities and gateway lifecycle surface.
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Stripe/StripeDelegate.php`
  - official checkout delegation, off-session PaymentIntent, SCA/action/pending states, retry, portal update.
- `arraysubspro/src/Features/AutomaticPayments/Gateways/PayPal/PayPalGateway.php`
  - remote PayPal subscription ownership, webhook-driven renewal, current capability boundaries, reauthorization update concept.
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleGateway.php`
  - remote Paddle schedule, waiting renewal, portal update, current cart/lifecycle capabilities.
- `arraysubspro/src/Features/AutomaticPayments/REST/AutoRenewController.php`
  - per-gateway toggle semantics and restrictions.
- `arraysubspro/src/Features/AutomaticPayments/REST/GatewayHealthController.php`
  - dashboard evidence, log fields, and local-only detach behavior.

## Accuracy and wording guardrails

Do not publish these claims:

- “Any gateway that works with WooCommerce can automatically renew subscriptions.”
- “A saved card guarantees future off-session charges.”
- “Tokenization makes your site PCI compliant.”
- “SCA/3DS happens only at signup.”
- “Disabling Pro/PayPal/Paddle stops existing remote agreements.”
- “Gateway Health detach cancels the remote subscription.”
- “Paying a manual renewal with a new gateway automatically migrates future renewals.”
- “ArraySubs Pro supports every Stripe/PayPal/Paddle method, country, currency, and cart.”
- “Automatic fallback always sends a manual renewal invoice email.”
- “Stripe Billing manages current ArraySubs Stripe renewals.”
- “PayPal and Paddle use ArraySubs local retry schedule.”

Preferred claims:

- “Checkout acceptance is necessary but not sufficient for automatic renewal.”
- “ArraySubs core can use a broad WooCommerce payment ecosystem for customer-present manual renewal orders, subject to each gateway’s order availability.”
- “Current ArraySubs Pro automatic adapters cover Stripe, PayPal, and Paddle with different schedule owners and capability boundaries.”
- “The gateway, subscription engine, customer authority, and operational event trail must all agree.”
- “A fallback order is not proof that a provider-owned remote obligation stopped.”
- “Test the exact offer, not the gateway logo.”

## Suggested metadata

- **Title/H1:** Automatic vs Manual Gateway Support for Subscriptions
- **SEO title option:** Automatic vs Manual Subscription Gateway Support
- **Meta description (154 characters):** Learn why a WooCommerce gateway can work at checkout but not auto-renew, and how to qualify tokens, schedules, SCA, invoices, failures, and switching.
- **Focus keyword:** automatic vs manual subscription gateway support
- **Suggested format:** Technical explainer / gateway qualification guide
- **Suggested author:** Emran, ArrayHash
- **Suggested reviewer:** ArraySubs Engineering Team
- **Visible test environment:** WordPress + WooCommerce + current ArraySubs/ArraySubs Pro source and user-confirmed staging UI; list exact plugin versions if the main writer can obtain them without exposing credentials.
- **Visible limitations:** provider/country/method availability changes; current code findings are version-specific; no universal PCI/SCA/legal advice; no conversion benchmark claimed.

## Final thesis for the writer

The trustworthy label is not “gateway supported.” It is:

> This exact subscription offer, on this exact checkout surface, with this exact gateway adapter and customer authorization, can create one renewal obligation, collect or present it once, survive authentication and failure, update the right payment context, stop the right schedule, and reconcile the evidence.

Anything less may still be a perfectly valid manual-renewal gateway. It should not be sold as automatic.

# Research: Stripe Recurring Payments for WooCommerce — How They Work and What to Test

## Research record

- Brief: `articles/058-stripe-recurring-payments-for-woocommerce-how-they-work-and-what-to-test.md`
- Recommended URL: `/deals/arraysubs/resources/payments-and-compliance/stripe-recurring-payments-for-woocommerce-how-they-work-and-what-to-test/`
- Researched and source-verified: 2026-07-20
- Search intent: informational
- Focus query: `Stripe recurring payments WooCommerce`
- Product scope inspected: ArraySubs core `1.8.11`, ArraySubs Pro `1.1.2`, WooCommerce `10.9.4`, and the official WooCommerce Stripe Gateway `10.8.4`
- Evidence base: the current local source for all four components plus current official WooCommerce and Stripe documentation
- Test-scope disclosure: this note records code-level first-party observations and official documentation. It does not claim that a sandbox checkout, real SCA challenge, off-session renewal, refund, dispute, or provider-to-site webhook was completed on the confirmed staging site. Those require a configured Stripe sandbox and a publicly reachable HTTPS endpoint.
- Important product boundary: ArraySubs uses Stripe as a payment processor, not Stripe Billing as the subscription engine. ArraySubs owns the subscription and renewal schedule in WordPress; ArraySubs Pro creates a new off-session PaymentIntent for each due renewal.
- Security boundary: never publish Stripe API keys, webhook secrets, client secrets, full customer or PaymentMethod IDs, real customer data, or signed recovery URLs. Use masked IDs and synthetic customers in screenshots and examples.

## Direct answer for the opening

> Stripe recurring payments in ArraySubs are WooCommerce-controlled, token-based charges—not Stripe Billing subscriptions. The official WooCommerce Stripe extension authenticates the payment method and saves Stripe Customer and PaymentMethod references at checkout. ArraySubs schedules renewals locally, creates a WooCommerce renewal order, then ArraySubs Pro confirms an off-session PaymentIntent. Webhooks, customer recovery, duplicate-charge checks, retries, and reconciliation must be tested before launch.

This is 59 words. Keep the core answer inside the first 150 words of the article and immediately link the distinction between the official Stripe checkout layer and the ArraySubs renewal layer.

## The most important architecture distinction

The article should show this responsibility split before explaining individual API objects:

| Responsibility | Official WooCommerce Stripe extension | ArraySubs core | ArraySubs Pro Stripe bridge | Stripe |
|---|---|---|---|---|
| Checkout payment UI and Stripe.js flow | Yes | No | Adds compatibility filters; does not replace checkout UI | Hosts payment primitives and authentication |
| Initial PaymentIntent or SetupIntent | Yes | Creates/links the ArraySubs subscription around the Woo order | Forces reusable/off-session setup for ArraySubs carts | Processes the intent |
| WooCommerce saved token/order Stripe metadata | Yes | Stores generic order/payment context | Copies Stripe customer, PaymentMethod, card display, mandate, and transaction context to the ArraySubs subscription | Stores Customer, PaymentMethod, Intent, Charge, and Mandate objects |
| Renewal schedule | No Stripe Billing schedule | Yes, in WordPress/Action Scheduler | Delegates the due charge to Stripe | No provider-side recurring plan for this architecture |
| Renewal order | No | Creates or reuses the pending WooCommerce renewal order | Adds Stripe payment context | No WooCommerce order ownership |
| Renewal charge | Official API client is reused | Routes the payment to Pro when automatic context is valid | Creates/confirms an off-session PaymentIntent | Authorizes/captures the charge |
| Success/failure lifecycle | Processes its own Stripe webhook behavior for Woo orders | Advances subscription only after order payment completion; owns retry/grace logic | Adds ArraySubs event handling, recovery metadata, logging, reconciliation, refund/dispute handling | Emits events and returns authoritative object status |
| Product, Price, Subscription, Invoice in Stripe Billing | Not used for Woo recurring tokens | Not used | Not used | Must not be implied to exist |

Official WooCommerce explicitly says its Stripe extension does **not** use Stripe Billing. It saves secure tokens so a subscriptions extension can initiate future payments, and the payments appear under Stripe Payments rather than Stripe Billing:

- https://woocommerce.com/document/stripe/admin-experience/stripe-billing/

This guardrail prevents the article from falsely describing Stripe Products, Prices, Invoices, or Stripe Subscription schedules as part of ArraySubs recurring billing.

## End-to-end lifecycle

### Phase 1 — Customer checkout and consent

1. A logged-in customer buys an ArraySubs subscription product through the official WooCommerce Stripe checkout.
2. The official extension creates or reuses a Stripe Customer and runs a PaymentIntent when money is due now, or a SetupIntent when the method must be prepared without an immediate charge.
3. ArraySubs Pro forces the official extension to save a reusable method for an ArraySubs subscription order and sets `setup_future_usage=off_session` on applicable PaymentIntent requests.
4. The customer completes any initial authentication required by Stripe or the issuer. This is the best opportunity to establish the customer agreement and optimize the credential for future merchant-initiated charges.
5. The official extension stores the Stripe customer ID, PaymentMethod/source ID, Intent ID, Charge ID, selected payment-method type, and possibly a mandate on the WooCommerce order.
6. ArraySubs links the paid order to the subscription, stores generic payment context, schedules the next renewal, and emits `arraysubs_gateway_context_captured`.
7. The Pro bridge reads official Stripe order metadata and writes normalized gateway context to the ArraySubs subscription.

ArraySubs-specific code observations:

- `arraysubspro/src/Features/AutomaticPayments/Services/StripeSubscriptionCompatibility.php:31-42` registers the compatibility filters on the official extension.
- `StripeSubscriptionCompatibility.php:47-64` forces saving only for logged-in ArraySubs subscription purchases when Stripe is available.
- `StripeSubscriptionCompatibility.php:70-111` sets `setup_future_usage=off_session` for PaymentIntents and adds ArraySubs/save-method metadata.
- `arraysubs/src/Features/Subscriptions/Services/OrderIntegration.php:930-984` stores the payment method/token context, emits gateway-context hooks, and schedules the first renewal.
- `arraysubspro/src/Features/AutomaticPayments/Services/StripeOrderContextBridge.php:135-205` reads `_stripe_customer_id`, `_stripe_source_id`, `_stripe_upe_payment_type`, `_stripe_intent_id`, and `_stripe_charge_id`, then normalizes them into subscription metadata.
- `arraysubspro/src/Features/AutomaticPayments/Services/MandateRegistry.php:29-58` copies an official order mandate into `_gateway_mandate_id` for later eligible bank-debit renewals.

### Phase 2 — Local scheduling and renewal-order creation

1. ArraySubs schedules both an invoice-generation action and a due-time renewal-processing action for the subscription.
2. The invoice path normally creates a pending WooCommerce renewal order before the due time and stores `_pending_renewal_order_id`.
3. At the due time, the Action Scheduler handler acquires a per-subscription renewal lock.
4. The processor validates that the subscription is active, trial, or on hold, is not waiting for cancellation, and is actually due.
5. It reuses the pending renewal order or creates one if necessary.
6. If this is a retry, it asks the gateway to verify whether Stripe already charged the order before attempting a new charge.
7. It routes the order to the automatic-payment gateway only when Stripe is registered, active, auto-renew is enabled, and a saved PaymentMethod exists. Otherwise the normal core fallback is a manual renewal invoice.

Code observations:

- `arraysubs/src/Features/RecurringBilling/Services/RenewalScheduler.php:43-57` schedules the invoice and due-time renewal using centralized Action Scheduler constants.
- `RenewalScheduler.php:118-139` schedules precise invoice generation before the due time.
- `arraysubs/src/Features/RecurringBilling/Services/Hooks.php:802-820` acquires and releases a per-subscription `HOOK_PROCESS_RENEWAL` lock around processing.
- `arraysubs/src/Features/RecurringBilling/Services/RenewalProcessor.php:225-340` validates the lifecycle, obtains the renewal order, performs pre-retry charge verification, and routes the payment result.
- `arraysubspro/src/Features/AutomaticPayments/Services/Hooks.php:240-327` only treats the renewal as automatic when the registered gateway context is usable; disabled auto-renew, a non-active gateway context, or a missing saved method prevents an automatic charge.
- `arraysubs/src/Features/RecurringBilling/Services/PaymentProcessor.php:25-111` distinguishes already-paid, zero-value, automatic, and manual-required outcomes.

### Phase 3 — The off-session PaymentIntent

For a normal positive-value Stripe renewal, the current ArraySubs Pro adapter builds a Stripe request with:

- the WooCommerce renewal amount converted to the currency’s smallest unit;
- lowercased order currency;
- saved Stripe Customer ID;
- saved PaymentMethod ID;
- `off_session=true`;
- `confirm=true`;
- metadata containing Woo order ID, ArraySubs subscription ID, `renewal=true`, and site URL;
- the stored mandate when the payment-method type is one of the explicitly handled debit methods.

The adapter sends that request to `payment_intents` through `WC_Stripe_API`. It does not create a Stripe Subscription or a Stripe Billing Invoice.

Current status handling:

| PaymentIntent result | ArraySubs behavior | What the article should say |
|---|---|---|
| `succeeded` | Extract Charge ID where available, store Intent/Charge metadata, call Woo order `payment_complete()`, and record the last transaction | The renewal can complete synchronously, but webhook delivery still matters for audit/reconciliation |
| `processing` | Store the PaymentIntent as the transaction reference and return a pending result | Do not mark the money captured; wait for authoritative confirmation |
| `requires_action` | Store Intent/recovery URL, return `requires_action`, and queue a customer verification email | An off-session credential can still require the customer to return and authenticate |
| `requires_confirmation` | Uses the same customer-action path | Treat as incomplete, not failed or paid |
| API error with `authentication_required` or an embedded PI in `requires_action` | Converts to the verification path | The error is recoverable through customer action, not blind retrying |
| Other API error/unexpected status | Returns a classified failure | Retry only under the store’s recovery policy and after remote verification |
| Zero amount | Core/adapter completes without a gateway charge | Include a zero-value trial/credit test; do not expect a Stripe Charge |

Code observations:

- `arraysubspro/src/Features/AutomaticPayments/Gateways/Stripe/StripeDelegate.php:189-310` implements the off-session PaymentIntent and status branches.
- `StripeDelegate.php:1437-1478` writes official Stripe-compatible order metadata and stores PaymentIntent/Charge IDs.
- `StripeDelegate.php:1543-1569` resolves a Charge from `latest_charge` or the legacy charges list.
- `StripeDelegate.php:1571-1618` writes the verification URL/Intent context and fires `arraysubs_renewal_requires_verification`.
- `arraysubs/src/Features/Emails/Emails/RenewalRequiresVerificationEmail.php:20-145` defines the customer verification email and derives the pay-for-order/Stripe-confirmation URL.

### Phase 4 — Payment completion and next-cycle advancement

WooCommerce order payment completion is the decisive local event. When a renewal order becomes paid, ArraySubs:

- stores the last payment date;
- increments completed payments only for positive-value orders;
- links the renewal order to the subscription;
- clears the pending renewal order and retry/failure state;
- applies a pending plan switch if one was scheduled for renewal;
- calculates the next payment date from the scheduled due date rather than the late payment time;
- schedules the next invoice and renewal;
- returns on-hold/trial subscriptions to active where appropriate;
- fires renewal-complete and gateway-payment-succeeded hooks.

Code observation: `arraysubs/src/Features/Subscriptions/Services/OrderIntegration.php:993-1103` owns this local post-payment transition. This separation is important: a successful API response is not the only path to completion because an asynchronous webhook can also complete the Woo order.

## Object model glossary

### WooCommerce order

The initial order records checkout. Each billing cycle gets a renewal order. A paid order is the local accounting and lifecycle trigger; the ArraySubs subscription is not advanced merely because a scheduler ran.

### ArraySubs subscription

A WordPress `arraysubs_data` post owns the local schedule, status, product, recurring amount, payment gateway, saved gateway context, and order history. The article must not call this a Stripe Subscription.

### Stripe Customer

The remote owner of saved PaymentMethods. ArraySubs stores the ID in `_gateway_customer_id`; the official Woo extension also maintains its own customer metadata. Moving API keys to another Stripe account can make existing IDs invalid even if they have the same `cus_` shape.

### WooCommerce payment token

The local WooCommerce reference that represents a saved method without storing raw card details. Official Woo documentation explains that tokenization lets WooCommerce remember a method while the actual card number/CVC is not stored directly on the site.

### Stripe PaymentMethod

The remote reusable payment instrument, usually a `pm_...` ID. ArraySubs stores it in `_gateway_payment_method_id` and records non-sensitive display attributes such as brand, last four, expiry, type, and wallet. A PaymentMethod belongs to a particular Stripe account/customer context; an ID copied across accounts is not portable.

### PaymentIntent

The state machine for one payment attempt/amount. Initial checkout and every ArraySubs renewal can have separate PaymentIntents. Retrying one PaymentIntent can produce multiple Charge attempts, so reports should distinguish PI ID, Charge ID, order ID, and subscription ID.

### SetupIntent

Prepares a method for future use without making a charge. It is especially relevant to a free trial or a payment-method update. `usage=off_session` helps Stripe optimize the credential and collect required authentication/mandate for later merchant-initiated charges, but does not guarantee that all future charges avoid authentication.

### Charge

The money-movement object created beneath a successful PaymentIntent. Current ArraySubs code prefers the `ch_...` ID as the Woo transaction ID because Woo Stripe refund handling expects a Charge reference.

### Mandate

Evidence/authorization for future debits or merchant-initiated use. ArraySubs explicitly forwards a stored mandate for `sepa_debit`, `us_bank_account`, `bacs_debit`, `au_becs_debit`, and `acss_debit`. This is implementation support, not proof that each method is available for every merchant, currency, checkout mode, or country.

## SCA, 3D Secure, and off-session renewal

The article should use this precise explanation:

1. The initial customer-present checkout is a customer-initiated transaction. Stripe can request 3DS/SCA while the customer is available.
2. Saving the method with future off-session usage plus clear customer consent establishes the intended recurring/MIT context.
3. At renewal, ArraySubs sets `off_session=true`; this tells Stripe the customer is not present to answer a new challenge.
4. Stripe and the issuer may apply an exemption or accept the previously authenticated credential, but they can still require authentication.
5. If that occurs, ArraySubs must pause completion, send the customer to a secure pay-for-order confirmation flow, and only advance the subscription after the Woo order is paid.

Do not write “SCA happens only once,” “3DS guarantees later approval,” or “off-session charges never need the customer.” Stripe’s documentation explicitly says later authentication can still be required and the integration needs a recovery path.

Consent is not optional product copy. Stripe says future off-session use requires customer permission/terms covering the merchant’s ability to initiate payments, frequency/timing, how the amount is determined, and the cancellation policy. The article should recommend legal review for the exact checkout consent language rather than provide legal advice.

Primary sources:

- https://docs.stripe.com/payments/setup-intents
- https://docs.stripe.com/payments/payment-intents
- https://docs.stripe.com/payments/paymentintents/lifecycle
- https://docs.stripe.com/payments/save-and-reuse
- https://docs.stripe.com/payments/cits-and-mits
- https://docs.stripe.com/declines/codes

## Official and secondary webhook behavior

### Official WooCommerce Stripe endpoint

The official Stripe extension normally receives Stripe events at its `wc-api=wc_stripe` URL and owns the Woo order behavior. Current Woo documentation tells merchants to verify separate Live and Test connection/webhook status; “Connected” in one mode does not prove the other mode works.

The local official extension `10.8.4` handles, among others:

- `payment_intent.processing`
- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `payment_intent.requires_action`
- `setup_intent.succeeded` / `setup_intent.setup_failed`
- `checkout.session.*` success/failure cases
- charge success/failure/capture/refund/dispute events

It can defer successful PaymentIntent processing through Action Scheduler and later emits `wc_stripe_webhook_received` or `wc_stripe_deferred_webhook` hooks. ArraySubs Pro listens to those hooks so it can capture/refresh context and record normalized ArraySubs events without replacing the official handler.

### ArraySubs secondary Stripe endpoint

ArraySubs Pro can provision a separate REST endpoint at `arraysubs/v1/webhooks/arraysubs_stripe`. It stores a different endpoint ID/signing secret for test and live modes, checks remote endpoint health, and requests a focused event list:

- payment succeeded/failed/requires action;
- invoice succeeded/failed (defensive compatibility, not evidence that ArraySubs uses Stripe Billing invoices);
- charge succeeded/refunded/dispute opened/dispute closed;
- SetupIntent succeeded;
- legacy source expiring;
- PaymentMethod updated/automatically updated.

The secondary router verifies the Stripe signature, rejects malformed payloads, resolves order/subscription IDs from metadata/customer/transaction context, checks event-ID duplication, dispatches a normalized handler, records successful events, and logs the outcome.

Code observations:

- `arraysubspro/src/Features/AutomaticPayments/Services/StripeWebhookProvisioner.php:92-191` creates or repairs the endpoint.
- `StripeWebhookProvisioner.php:255-305` defines the endpoint URL and selected event list.
- `arraysubspro/src/Features/AutomaticPayments/REST/WebhookController.php:42-90` exposes the public route but delegates security to signature verification.
- `arraysubspro/src/Features/AutomaticPayments/Services/WebhookRouter.php:32-129` performs verification, parsing, deduplication, resolution, dispatch, and response.
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Stripe/StripeDelegate.php:622-749` verifies signatures, parses events, resolves entities, and records event IDs.
- `StripeDelegate.php:751-895` consumes official/deferred Woo Stripe events and preserves skipped successful-event logging.
- `arraysubspro/src/Features/AutomaticPayments/Services/DatabaseMigration.php:156-168` creates a unique `(gateway_slug, event_id)` key.

### Operational rules for the article

- Both endpoints must use the correct signing secret for their own mode and URL.
- A 2xx response proves receipt of that delivery, not that every later business-side effect is correct.
- Stripe can retry events and does not guarantee ordering; handlers must be idempotent and able to retrieve missing objects.
- Log event ID, type, created time, processing time, mode, resolved order/subscription, and handler outcome—but never log the signing secret or full sensitive payload indiscriminately.
- Test duplicate delivery, out-of-order delivery, a temporarily failing endpoint, and event replay.
- A localhost staging URL is not directly reachable by Stripe; use a controlled public HTTPS test endpoint/tunnel or a separate public staging environment for real webhook testing.

Primary sources:

- https://woocommerce.com/document/stripe/setup-and-configuration/stripe-webhooks/
- https://docs.stripe.com/webhooks
- https://docs.stripe.com/api/events/types

## Idempotency and reconciliation

This section should be unusually explicit because “webhook deduplication” and “charge idempotency” solve different problems.

### Four different guards in the current stack

1. **Action Scheduler uniqueness.** Central scheduling removes/replaces pending duplicate hook+argument+group actions.
2. **Per-subscription execution lock.** A second simultaneous renewal worker cannot enter the same `HOOK_PROCESS_RENEWAL` handler while the first holds the lock.
3. **Webhook event deduplication.** The custom event table has a unique gateway/event key and `INSERT IGNORE`, so the same Stripe Event ID is not handled twice across official and secondary routes.
4. **Pre-retry remote verification.** Before a retry, ArraySubs retrieves the stored PaymentIntent or searches recent PaymentIntents for matching `order_id` and `subscription_id` metadata. If Stripe says it already succeeded, ArraySubs marks the Woo order paid without charging again.

### Important limitation: stable request idempotency is not the same guard

The installed official Stripe extension generates a fresh UUID idempotency key for a `POST payment_intents` request (`woocommerce-gateway-stripe/includes/class-wc-stripe-api.php:180-220`). No ArraySubs hook currently replaces `wc_stripe_idempotency_key` with a deterministic renewal-order key. Therefore the article must **not** claim that repeated renewal-creation POSTs inherently reuse one business-level idempotency key.

The shipped safety story is the combination of the local lock, stored Intent metadata, webhook dedupe, and pre-retry remote reconciliation. Those are meaningful guards, but they still deserve a timeout/crash test between “Stripe accepted the request” and “WordPress stored the response.” This is a high-value launch test and a product hardening item.

Stripe’s own idempotency documentation recommends a stable unique key for safely retrying the same POST. If the product later introduces an order-derived key, it must remain stable for the same logical attempt and change when the merchant intentionally changes the request parameters/payment method.

Sources and code:

- https://docs.stripe.com/api/idempotent_requests
- https://docs.stripe.com/error-low-level
- `arraysubs/src/Features/RecurringBilling/Services/Hooks.php:802-820`
- `arraysubs/src/Features/RecurringBilling/Services/RenewalProcessor.php:278-312`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Stripe/StripeDelegate.php:406-478`
- `StripeDelegate.php:708-749`

## Failure, retry, and recovery flows

### Customer action required

When Stripe returns `authentication_required`/`requires_action`, ArraySubs stores a recovery URL and Intent ID on both order/subscription, logs the state, fires a verification email, and leaves the renewal order unpaid. The recovery URL points to WooCommerce’s pay-for-order flow with Stripe confirmation context.

Test that:

- the email is delivered and contains the correct order/amount, safe URL, and customer-facing explanation;
- an unauthenticated or wrong customer cannot access another customer’s order;
- successful 3DS completion pays exactly the existing renewal order rather than creating a new subscription/order;
- the next payment date advances only after payment completion;
- the email link remains usable within the intended grace window;
- repeated clicks or webhook replays do not double charge.

Current template observation: the email formats an authentication deadline three days from generation. Do not claim this is dynamically identical to every configured grace-period deadline without an observed test.

### Hard/soft decline

The current core classification recognizes insufficient funds, generic/card decline, expired card, incorrect CVC, authentication required, processing error, invalid card, and unknown. For normal failures, it records the failure state, marks the renewal order failed, schedules a retry, fires email/gateway hooks, and keeps the subscription within standard grace handling rather than immediately canceling it.

Stripe-specific retry defaults in current code:

- automatic retries enabled;
- maximum 3 scheduled retry attempts;
- one-day interval;
- remote charge verification before every retry when the retry counter is non-zero.

Do not imply all decline types should receive the same retry strategy. An expired/missing method needs customer action; a processing error may deserve a later retry; `authentication_required` needs an on-session flow; excessive retries can violate network guidance or worsen outcomes.

Code observations:

- `arraysubs/src/Features/RecurringBilling/Services/RenewalProcessor.php:453-615` records pending/action/failure states and schedules retries.
- `arraysubs/src/functions/gateway-helpers.php:176-247` normalizes retry settings and resets failure state after success.
- `gateway-helpers.php:330-389` classifies common failure codes/messages.
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Stripe/StripeDelegate.php:366-404` publishes the Stripe retry configuration.

Primary Stripe guidance:

- https://docs.stripe.com/declines/card
- https://docs.stripe.com/declines/codes
- https://docs.stripe.com/error-codes

### Missed success webhook / ambiguous timeout

Use this reconciliation order:

1. Stop blind retries.
2. Inspect the Woo order for stored `pi_...` and `ch_...` references.
3. Retrieve the PaymentIntent from Stripe.
4. If no local Intent was stored, search recent Stripe PaymentIntents for exact `order_id` + `subscription_id` metadata and customer.
5. If succeeded, normalize the Charge ID and mark the existing Woo order paid.
6. If genuinely failed, classify the reason and resume the recovery policy.
7. Record the reconciliation in the subscription/order notes and Gateway Health logs.

ArraySubs exposes the same concept in both the pre-retry check and admin gateway synchronization. `StripeDelegate.php:479-550` retrieves customer/payment method and recent matching PaymentIntents; `arraysubspro/src/Features/AutomaticPayments/Services/Hooks.php:388-514` can reconcile a successful remote charge to a still-unpaid local order.

## Payment-method update lifecycle

### What is definitely implemented

- ArraySubs displays saved non-sensitive method details on an active, on-hold, or trial subscription.
- The customer-facing update endpoint verifies login and subscription ownership.
- The Stripe adapter creates an ephemeral Stripe Billing Portal session for the stored Stripe Customer and redirects the customer there.
- The event handler can refresh stored PaymentMethod details for `payment_method.updated`, `payment_method.automatically_updated`, and the legacy card-auto-update event selected on the secondary endpoint.
- Updating the recorded method clears retry/failure state and fires an ArraySubs payment-method-updated hook.

Code observations:

- `arraysubspro/src/Features/AutomaticPayments/Gateways/Stripe/StripeDelegate.php:551-621` formats the saved method and creates a Stripe portal session.
- `arraysubspro/src/Features/AutomaticPayments/Services/PaymentMethodCoordinator.php:28-114` gates display/update by gateway capability and subscription lifecycle.
- `arraysubspro/src/Features/AutomaticPayments/REST/PaymentMethodController.php:42-199` enforces customer ownership/admin permission and returns the update mechanism.
- `StripeDelegate.php:946-1009` applies PaymentMethod update events to subscription metadata.

### Verification gap that the article must not hide

Stripe’s portal documentation says a customer can attach/detach a method and can change the customer’s default method; it recommends `payment_method.attached`, `payment_method.detached`, and `customer.updated` for portal synchronization. The current ArraySubs secondary endpoint list does not request those three events, and current ArraySubs code does not handle `customer.invoice_settings.default_payment_method`. A `payment_method.updated` event means the object’s details changed; it does not necessarily mean the customer chose that method for this ArraySubs subscription.

Therefore do not claim “the portal always switches the next ArraySubs renewal automatically” without a real end-to-end test. The launch test must prove which event is emitted, whether `_gateway_payment_method_id` changes to the selected method, whether removal is prevented/handled, and whether the next renewal charges the new method. If it does not, use the official WooCommerce My Account saved-method flow plus an explicit subscription-specific selection/sync mechanism, or harden the integration before marketing the feature.

Primary sources:

- https://docs.stripe.com/customer-management/configure-portal
- https://docs.stripe.com/customer-management/integrate-customer-portal
- https://docs.stripe.com/payments/cards/overview
- https://docs.stripe.com/api/events/types
- https://woocommerce.com/document/stripe/customer-experience/saved-payment-information/

## Refund flow

### WooCommerce-initiated refund

The official WooCommerce Stripe gateway owns the normal gateway refund. ArraySubs Pro’s pre-refund hook ensures a renewal order that stores only a PaymentIntent resolves and persists its backing Charge ID, because the official gateway expects the Woo order transaction to be a charge reference.

Test both the initial order and renewal orders for:

- full refund;
- partial refund;
- multiple partial refunds without exceeding the captured amount;
- refund requested when the Woo order stores `pi_...` vs `ch_...`;
- local refund record, Woo order total/status, ArraySubs lifecycle/cancellation policy, Stripe refund status, and customer email;
- asynchronous refund success and failure.

### Stripe-dashboard refund

The secondary webhook handler processes `charge.refunded`, resolves the related Woo order/subscription, avoids echoing a locally initiated refund, creates a local Woo refund when needed, and records the external event. The current event list centers on `charge.refunded`; Stripe’s current docs recommend `refund.created`, `refund.updated`, and `refund.failed` for detailed refund state. Do not claim complete asynchronous-refund state coverage without testing those cases.

Code observations:

- `arraysubspro/src/Features/AutomaticPayments/Gateways/Stripe/StripeDelegate.php:386-404` normalizes renewal transaction context before an official Woo refund.
- `StripeDelegate.php:1035-1347` extracts refund details, prevents duplicate local refund rows, and syncs external refunds into WooCommerce.

Primary sources:

- https://woocommerce.com/document/stripe/admin-experience/refunding-orders/
- https://docs.stripe.com/refunds
- https://docs.stripe.com/testing

## Dispute flow

ArraySubs listens for `charge.dispute.created` and `charge.dispute.closed`. On creation it adds an order note, puts the Woo order on hold, records the reason/amount, and deliberately does **not** auto-cancel the ArraySubs subscription. On resolution it records the outcome. This is an operator-review policy, not a guarantee that access should remain active in every business.

Test:

- dispute opened against an initial order and a renewal order;
- order/subscription resolution from the event;
- on-hold order state and admin visibility;
- won, lost, and warning-closed outcomes;
- access policy chosen by the merchant;
- evidence deadline/escalation process in Stripe Dashboard;
- event replay without duplicate notes or state transitions.

Code observations: `StripeDelegate.php:1349-1422` handles opened/resolved disputes. Stripe says dispute response deadlines commonly fall within 7–21 days depending on the network, but the article should link the live Dashboard deadline rather than promise a fixed window.

Primary sources:

- https://docs.stripe.com/disputes
- https://docs.stripe.com/disputes/responding
- https://docs.stripe.com/disputes/how-disputes-work
- https://docs.stripe.com/testing

## Recurring payment-method support: avoid the “all Stripe methods” trap

Official WooCommerce currently says automatic subscription renewals are supported through normal cards and additional methods that use SEPA tokenization, specifically SEPA Direct Debit, iDEAL, and Bancontact. The official Stripe extension can save several other methods generally, but general “saved method” support does not prove that a particular method supports unattended recurring charges in the chosen checkout mode.

The installed official extension contains an important Checkout Sessions caveat: `setup_future_usage` cannot be requested for some methods that convert to SEPA in that flow, so no reusable method is generated and token creation is skipped. Availability also varies by merchant country, customer country, currency, account capability, and mandate rules.

Article wording:

- Say “cards are the baseline method for this guide.”
- Say “test each additional method end to end; checkout visibility is not automatic-renewal proof.”
- Link the official payment-method support pages rather than publishing a universal matrix that will become stale.
- Keep ACH/BACS/BECS/SEPA timing asynchronous where applicable; a `processing` state is not paid.

Sources:

- https://woocommerce.com/document/subscriptions/payment-gateways/
- https://woocommerce.com/document/stripe/customer-experience/saved-payment-information/
- https://docs.stripe.com/payments/payment-methods/payment-method-support
- https://docs.stripe.com/payments/setup-intents

## Launch test plan

Use a synthetic customer, a low-value product, Stripe sandbox/test mode, and a disposable test environment. Never use real card details in test mode or Stripe test details in live mode.

### Environment and observability preflight

- [ ] Record WordPress, WooCommerce, ArraySubs, ArraySubs Pro, official Stripe extension, PHP, timezone, checkout type, and active theme versions.
- [ ] Confirm the official Stripe extension satisfies the ArraySubs minimum (`9.8.0` in current code) and note the current adapter’s declared tested version (`10.6.1`) versus the actually installed `10.8.4`; regression-test the newer installed version.
- [ ] Connect Stripe test mode separately from live mode.
- [ ] Confirm account status, API mode, and official webhook status in the Woo Stripe settings UI.
- [ ] Confirm the ArraySubs secondary endpoint ID, secret-present status, event coverage, and no provisioning error in Gateway Health.
- [ ] Use a publicly reachable HTTPS test endpoint for real webhooks; localhost alone is insufficient.
- [ ] Confirm WP-Cron/real cron and Action Scheduler workers run reliably; inspect failed/pending actions.
- [ ] Turn on appropriate WooCommerce/ArraySubs logging without logging secrets or full sensitive payloads.
- [ ] Confirm transactional email delivery for invoice, failure, success, and renewal-verification messages.

### Initial checkout matrix

| Case | Expected proof |
|---|---|
| Normal card, paid start | One paid initial Woo order, one active ArraySubs subscription, stored `cus_` + `pm_`, future renewal scheduled |
| Card requiring initial 3DS | Challenge completes on customer-present checkout; method remains reusable off session |
| Paid start with `setup_future_usage` | PaymentIntent includes future off-session setup; method is attached to correct Customer |
| Free trial / zero due now | SetupIntent or correct zero-payment setup path captures a reusable method; no fake Charge expected |
| Guest checkout attempt | Store follows ArraySubs account requirement; no orphan Customer/Intent/subscription |
| Saved existing method | Correct Customer/PaymentMethod copied to the new subscription |
| Missing remote saved method | Stale Woo token is removed or the customer receives a recoverable error; no unusable subscription created |
| Classic vs Checkout Block / Optimized Checkout | Run every checkout surface the production store exposes |
| Coupon, signup fee, tax, shipping | Initial and recurring totals in Woo, ArraySubs, and Stripe match the intended contract |
| Mixed cart/multiple subscriptions/different cycles | Test only if store enables these shapes; verify separate subscription schedules and correct saved context |

### Renewal matrix using official Stripe test values

Use current test values from https://docs.stripe.com/testing and https://docs.stripe.com/payments/save-and-reuse-cards-only. Do not copy them into live fields.

| Scenario | Useful official test card/example | Expected local outcome |
|---|---|---|
| Immediate success | `4242 4242 4242 4242` | Renewal PI succeeds, Charge stored, existing renewal order paid, next cycle scheduled |
| Auth succeeds later when correctly set up | `4000 0025 0000 3155` | Initial authentication/setup; later off-session success if properly prepared |
| Off-session authentication required | `4000 0027 6000 3184` | No false payment completion; verification email/URL; customer returns and pays existing order |
| Insufficient funds after setup | `4000 0082 6000 3178` | Classified failure, no paid order, retry/recovery policy visible |
| Generic decline | Use current official generic-decline test value | Failure reason recorded and surfaced safely |
| Expired card | Use current official expired-card test value | Customer method-update path, not blind retries alone |
| PaymentMethod deleted/detached in Stripe | Remove synthetic method in sandbox | Renewal blocked with a clear missing-context path; no repeated API storm |
| Asynchronous bank debit | Use method-specific official sandbox values | Order stays pending/processing until webhook success/failure |
| Zero renewal after credit/discount | Build a legitimate zero-total renewal | Woo order completes without Stripe Charge; payment counters remain correct |

### Scheduler, timeout, and duplicate-charge tests

- [ ] Trigger the same due renewal action concurrently; verify the per-subscription lock allows one processor.
- [ ] Run the action twice after the order is already paid; verify no second charge.
- [ ] Simulate timeout after Stripe creates the PaymentIntent but before WordPress receives/stores the response.
- [ ] Before retry, confirm ArraySubs retrieves or discovers the succeeded PI by metadata and reconciles without charging again.
- [ ] Resend the same Stripe Event ID to official and secondary endpoints; verify one logical ArraySubs processing record.
- [ ] Send different Event IDs for the same object/type and verify object-level handlers remain safe.
- [ ] Deliver success/failure events out of order; verify final Woo/Stripe status is reconciled from the authoritative object rather than arrival order.
- [ ] Disable webhook delivery temporarily, let Stripe retry, restore it, and verify local state catches up.
- [ ] Run admin “Sync from Gateway” against an intentionally stale unpaid order with a succeeded remote PI.

### Customer recovery and payment-method tests

- [ ] Verification email links to the existing renewal order and is ownership-protected.
- [ ] A completed 3DS recovery advances the schedule once.
- [ ] Customer updates the method through the current portal flow.
- [ ] Inspect emitted events (`payment_method.attached`, `customer.updated`, `payment_method.updated`) and verify the exact ArraySubs subscription stores the newly selected `pm_`.
- [ ] Remove the default method and verify the subscription is not left pointing to a detached method.
- [ ] Let Stripe automatically update a test card where supported and verify last4/expiry refresh.
- [ ] Confirm a card-brand change requires new customer agreement before subsequent MIT charges, per Stripe guidance.
- [ ] After update, run the next renewal and prove Stripe charged the new PaymentMethod—not just the customer-level default or old subscription value.

### Refund/dispute matrix

- [ ] Full and partial Woo-admin refunds for initial order and renewal order.
- [ ] External Stripe Dashboard refund syncs to exactly one local Woo refund.
- [ ] Asynchronous refund success and failure are visible and reconciled.
- [ ] Refund amount never exceeds remaining refundable amount.
- [ ] Dispute-created event places the Woo order on hold, logs the reason, and follows the merchant’s access policy.
- [ ] Won/lost dispute resolution is recorded without silently changing subscription status.

### Production cutover

- [ ] Repeat endpoint, event, secret, and account checks in live mode; never assume test configuration copied over.
- [ ] Place one controlled real purchase with the team’s own payment method and refund it according to policy.
- [ ] Confirm first live webhook delivery and one live scheduled renewal on a controlled short-cycle product before broad launch.
- [ ] Add monitoring for failed Action Scheduler jobs, no recent Stripe webhook, renewal failures, requires-action orders, detached methods, and Woo/Stripe transaction mismatch.
- [ ] Reconcile Woo order ID ↔ ArraySubs subscription ID ↔ PaymentIntent ID ↔ Charge ID ↔ payout/fee/refund records.
- [ ] Document incident owners and a “stop retries, retrieve remote status first” runbook.

## Staging screenshot targets (capture 3–6)

Use the confirmed staging WordPress admin. Capture clean originals through the project screenshot workflow, then annotate only the selected frames. Never show credentials, secret values, full signed URLs, or real customer details.

### Screenshot 1 — Stripe configuration and test/live health

- Route: WooCommerce → Settings → Payments → Stripe → Settings
- Show: the Live/Test mode selector plus safe account/webhook status labels.
- Crop/avoid: API keys, webhook signing secrets, full account IDs, or connection URLs.
- Marker targets: “Which mode is being tested?” and “Where does WooCommerce report webhook health?”
- Article placement: environment preflight.

### Screenshot 2 — ArraySubs Gateway Health, expanded Stripe card

- Route: ArraySubs admin → Settings → Payment Gateways (`#/settings/gateways`), expand Stripe
- Show: installed/minimum/tested Stripe extension versions, official endpoint status, secondary endpoint status, account charging/payout health where safely populated.
- Crop/avoid: full environment URL if the publication should not expose it.
- Marker targets: “Official Woo Stripe endpoint” and “ArraySubs secondary endpoint.”
- Article placement: webhook architecture.

### Screenshot 3 — Gateway Health event log filtered to Stripe

- Route: lower section of the same Gateway Health page
- Show: Stripe filter, safe event types such as `payment_intent.succeeded`/`requires_action`, processed timestamps, and no full event IDs if those are treated as sensitive operational identifiers.
- Marker targets: “Event type” and “Processed time.”
- Article placement: monitoring and idempotency.

### Screenshot 4 — Synthetic Stripe subscription detail and payment timeline

- Route: ArraySubs → Subscriptions → synthetic subscription detail (`#/subscriptions/detail/{id}`)
- Show: attached Stripe gateway, non-sensitive saved-card summary, next payment date, and a timeline containing renewal/order/payment events.
- Crop/avoid: customer name/email/address and full remote IDs.
- Marker targets: “Saved payment method” and “Renewal payment event.”
- Article placement: object lifecycle and reconciliation.

### Screenshot 5 — Renewal Failures audit

- Route: ArraySubs → Audits → Renewal Failures (`#/audits/renewal-failures`)
- Show: a synthetic failed renewal with gateway, human-readable failure reason, retry attempt/next retry, linked renewal order, and Retry action.
- Only use synthetic data; if no safe failure exists, do not fabricate a UI record for the screenshot.
- Marker targets: “Failure reason” and “Retry/reconciliation action.”
- Article placement: decline and recovery runbook.

### Screenshot 6 — Customer payment-method update action

- Route: WooCommerce My Account → Subscriptions → a synthetic ArraySubs Stripe subscription
- Show: masked card brand/last4/expiry and the payment-method update control immediately before redirecting to Stripe.
- Do not capture the hosted portal if it exposes live account branding/customer data unless the sandbox customer is fully synthetic.
- Marker targets: “Current saved method” and “Update payment method.”
- Article placement: payment-method lifecycle and its verification caveat.

## Contextual visual ideas (use 4–8, varied forms)

1. **Four-layer lifecycle cutaway:** a storefront/checkout layer hands a sealed PaymentMethod token to an ArraySubs calendar; at renewal a Woo order becomes a Stripe PaymentIntent and returns as a Charge/webhook. Use an architectural illustration, not a dashboard.
2. **SCA day-one vs renewal diptych:** left side shows customer-present 3DS authentication at initial checkout; right side shows an unattended renewal either passing through an exemption or branching to a secure “return to authenticate” path.
3. **Object workbench:** physical-looking labeled objects for Woo order, ArraySubs subscription, Stripe Customer, PaymentMethod, PaymentIntent, and Charge connected with strings; emphasize that a Stripe Subscription object is absent.
4. **Webhook control room:** two incoming signed channels—official Woo Stripe and ArraySubs secondary—enter a deduplication gate, event ledger, order reconciliation desk, and subscription timeline.
5. **Ambiguous-timeout incident scene:** a renewal request disappears in fog after Stripe; an operator first retrieves the PaymentIntent by stored ID/metadata, finds it succeeded, and closes a guarded “do not recharge” switch.
6. **Payment-method replacement relay:** old card token hands off to a new card through a hosted portal, followed by an event envelope and a final verification checkpoint on the ArraySubs subscription before the next renewal.
7. **Launch test laboratory:** a QA bench with lanes for success, 3DS, insufficient funds, expired card, async processing, duplicate webhook, refund, and dispute—represented as test rigs rather than a flat checklist graphic.
8. **Refund/dispute fork:** a completed Charge branches into a reversible refund path that syncs back to WooCommerce and a dispute path that moves the order to an operator-review desk without auto-canceling access.

Avoid making all generated visuals flowcharts. Use at least one environmental scene, one object-based explainer, one split customer journey, and one real plugin screenshot sequence.

## Internal-link plan

Required commercial/product destinations:

- Payment-gateway feature pillar: `/deals/arraysubs/features/#payment-gateways`
- Stripe automatic billing/SCA setup recipe: `/deals/arraysubs/use-cases/recipes/stripe-automatic-billing-sca/`
- Member payment-method update recipe: `/deals/arraysubs/use-cases/recipes/member-update-payment/`
- Gateway Health monitoring recipe: `/deals/arraysubs/use-cases/recipes/gateway-health-monitor/`
- CTA after the core answer/test framework: `/deals/arraysubs/pricing/`

Adjacent C05 sibling articles:

- A056: `/deals/arraysubs/resources/payments-and-compliance/best-payment-gateways-for-woocommerce-subscriptions/`
- A057: `/deals/arraysubs/resources/payments-and-compliance/stripe-vs-paypal-vs-paddle-for-woocommerce-recurring-billing/`
- A059: `/deals/arraysubs/resources/payments-and-compliance/paypal-recurring-payments-for-woocommerce-agreements-renewals-and-limits/`
- A060: `/deals/arraysubs/resources/payments-and-compliance/paddle-merchant-of-record-for-woocommerce-subscriptions/`
- A061: `/deals/arraysubs/resources/payments-and-compliance/automatic-vs-manual-gateway-support-for-subscriptions/`
- A062: `/deals/arraysubs/resources/payments-and-compliance/sca-and-3d-secure-for-subscription-renewals/`
- A063: `/deals/arraysubs/resources/payments-and-compliance/subscription-payment-tokens-and-card-updates-explained/`
- A064: `/deals/arraysubs/resources/payments-and-compliance/subscription-webhooks-events-every-woocommerce-store-should-monitor/`

Useful already-published cross-cluster context:

- Renewal lifecycle: `/deals/arraysubs/resources/subscription-foundations/how-woocommerce-subscription-renewals-work/`
- Manual vs automatic renewals: `/deals/arraysubs/resources/subscription-foundations/manual-vs-automatic-subscription-renewals-in-woocommerce/`
- Failed-payment recovery: `/deals/arraysubs/resources/payment-recovery/failed-subscription-payment-recovery-for-woocommerce/`
- Expired-card recovery: `/deals/arraysubs/resources/payment-recovery/expired-cards-and-subscription-recovery/`
- Dunning strategy: `/deals/arraysubs/resources/payment-recovery/subscription-dunning-strategy-timing-messages-and-stop-rules/`

Cannibalization rule: this guide owns the broad Stripe recurring-payment architecture and the launch test matrix. Link to the Stripe/SCA recipe for click-by-click ArraySubs configuration rather than duplicating it. A062 owns the deep regulatory/SCA explanation; A063 owns token/card-update depth; A064 owns the cross-gateway webhook catalog.

## Recommended article outline

1. 40–60 word direct answer
2. Key takeaways and tested-version disclosure
3. Stripe recurring payments are not Stripe Billing in ArraySubs
4. Responsibility table: Woo Stripe vs ArraySubs vs Stripe
5. Object glossary: token, Customer, PaymentMethod, SetupIntent, PaymentIntent, Charge, mandate
6. Initial checkout and future-use setup
7. Local Action Scheduler and renewal-order lifecycle
8. Off-session PaymentIntent status decision table
9. SCA/requires-action customer recovery
10. Official + secondary webhook architecture
11. Idempotency, locks, duplicate events, and remote reconciliation
12. Failure/retry/dunning paths
13. Card/payment-method update flow and the visible verification gap
14. Refund and dispute paths
15. Full staging/sandbox launch test matrix
16. Production monitoring/runbook
17. Limitations and when this architecture is not a fit
18. CTA and related guides

## Limitations and not-fit cases

- ArraySubs Stripe automatic renewals require ArraySubs Pro and the official WooCommerce Stripe Gateway; ArraySubs Free uses manual renewal invoices.
- The current Pro bridge requires official Stripe Gateway `9.8.0+`; the inspected code declares testing through `10.6.1`, while staging/local has `10.8.4`, so the article should disclose the observed version and avoid an unqualified compatibility guarantee.
- Stripe merchant availability, currencies, methods, and account capabilities vary by country and business type.
- A checkout-visible method is not necessarily reusable for off-session renewal.
- Stripe processing does not make Stripe the Merchant of Record; the merchant still owns normal seller, tax, refund, dispute, and compliance responsibilities unless using a separately contracted service.
- WordPress/Action Scheduler reliability is part of the payment system because ArraySubs owns the schedule.
- Webhook delivery and reconciliation are operational requirements, not optional observability extras.
- The current customer portal update path needs an end-to-end proof that the selected default method is copied to the exact ArraySubs subscription.
- The current secondary event list does not cover Stripe’s recommended detailed `refund.*` event family, so asynchronous refund state needs specific validation.
- The current PaymentIntent POST path uses a fresh official-plugin UUID idempotency key; rely on and test the shipped lock/reconciliation safeguards, and do not market deterministic request-level idempotency.
- Complex metered billing, usage aggregation, Stripe Billing invoicing, marketplace split payments, or provider-native subscription schedules are outside this architecture.
- A business that cannot operate public HTTPS webhooks, reliable cron workers, secure customer recovery, and payment reconciliation should solve those infrastructure gaps before unattended recurring billing.

## Official source and claim map

Every source below was checked on 2026-07-20.

### WooCommerce

- https://woocommerce.com/document/stripe/admin-experience/stripe-billing/ — official Stripe extension does not use Stripe Billing; token-based renewal model.
- https://woocommerce.com/document/stripe/customer-experience/saved-payment-information/ — Woo tokenization, My Account saved methods, and no raw card/CVC storage on the site.
- https://woocommerce.com/document/stripe/customer-experience/checkout/ — current standard and Optimized Checkout experiences; saved-method UI.
- https://woocommerce.com/document/stripe/customer-experience/testing/ — separate test-mode connection and Woo Stripe test workflow.
- https://woocommerce.com/document/stripe/setup-and-configuration/settings-guide/ — account and webhook health in Live and Test modes.
- https://woocommerce.com/document/stripe/setup-and-configuration/stripe-webhooks/ — official endpoint configuration/health.
- https://woocommerce.com/document/stripe/admin-experience/refunding-orders/ — official Woo admin refund behavior.
- https://woocommerce.com/document/subscriptions/payment-gateways/ — ecosystem automatic/manual distinction and current Stripe recurring method notes. Use for context, not to claim ArraySubs is WooCommerce Subscriptions.
- https://woocommerce.com/document/subscriptions/develop/payment-gateway-integration/ — site-scheduled token charging vs gateway-scheduled recurrence.

### Stripe

- https://docs.stripe.com/payments/payment-intents — PaymentIntent lifecycle and `setup_future_usage`.
- https://docs.stripe.com/payments/paymentintents/lifecycle — `requires_payment_method`, `requires_confirmation`, `requires_action`, processing, and success.
- https://docs.stripe.com/payments/setup-intents — future-use setup, consent/mandate, off-session optimization, and later recovery caveat.
- https://docs.stripe.com/payments/save-and-reuse — Customer + PaymentMethod + off-session charge model.
- https://docs.stripe.com/payments/save-and-reuse-cards-only — official off-session test cards and recovery expectations.
- https://docs.stripe.com/payments/cits-and-mits — customer/merchant-initiated transaction consent and card-brand-change requirements.
- https://docs.stripe.com/payments/payment-methods/payment-method-support — method-, region-, currency-, and mode-specific support.
- https://docs.stripe.com/webhooks — signatures, retries, duplicate events, ordering, endpoint secrets, and delivery behavior.
- https://docs.stripe.com/api/events/types — precise current semantics for PaymentIntent and PaymentMethod events.
- https://docs.stripe.com/api/idempotent_requests — stable-key semantics for safely repeated POST requests.
- https://docs.stripe.com/error-low-level — timeout/network errors and reconciliation/idempotency guidance.
- https://docs.stripe.com/declines/card — on-session/off-session decline operations and retry cautions.
- https://docs.stripe.com/declines/codes — `authentication_required`, insufficient funds, expired card, and other decline meanings.
- https://docs.stripe.com/testing — current sandbox cards for declines, 3DS, refunds, and disputes; prohibition on live-mode testing with real values.
- https://docs.stripe.com/payments/cards/overview — card lifecycle, automatic updater limits, and update events.
- https://docs.stripe.com/customer-management/configure-portal — payment-method update capability and required portal configuration.
- https://docs.stripe.com/customer-management/integrate-customer-portal — ephemeral session flow and recommended update events.
- https://docs.stripe.com/refunds — full/partial/asynchronous refunds and current `refund.*` event recommendation.
- https://docs.stripe.com/disputes — dispute fundamentals.
- https://docs.stripe.com/disputes/responding — notifications and response workflow.

## Citation placement audit — 2026-07-22

The published post currently contains internal links but no external citations. Add the following primary-source links immediately beside the quoted provider-facing claims. Do not use WooCommerce or Stripe documentation to substantiate ArraySubs implementation details; those details remain first-party code observations under the article's disclosed tested versions and limitations.

1. **Opening and “The shortest accurate architecture” — the subscription is local, not a Stripe Billing subscription.**
   - Exact passages: “Stripe moves the money, but the WordPress store—not Stripe Billing—owns the subscription schedule in this architecture.” and “This is not Stripe Billing. You should not expect to find a Stripe Subscription, Stripe Price, or Stripe Invoice that controls the cadence.”
   - Cite WooCommerce's explicit statement that its Stripe extension does not use Stripe Billing and instead supports renewals with secure tokens: https://woocommerce.com/document/stripe/admin-experience/stripe-billing/
   - Keep the ArraySubs ownership/scheduling half labeled as an ArraySubs first-party implementation observation; the WooCommerce page does not document ArraySubs.

2. **Key takeaways and object glossary — saved methods are tokenized and raw card details are not stored by WooCommerce.**
   - Exact passages: “A WooCommerce payment token is a local reference to a Stripe PaymentMethod. Raw card data does not belong in WordPress.” and “The official WooCommerce Stripe extension keeps raw card details out of WordPress. WooCommerce stores a token object containing safe provider references.”
   - Cite WooCommerce's saved-payment documentation beside the first occurrence: https://woocommerce.com/document/stripe/customer-experience/saved-payment-information/
   - Stripe's PaymentMethod model can support the glossary distinction between a reusable provider object and raw payment details: https://docs.stripe.com/api/payment_methods/object

3. **“Step 1: configure the official Stripe gateway first” — test/live separation and webhook health.**
   - Exact passage: “Test and live modes have separate objects, endpoints, signing secrets, customers, methods, payments, and event histories.”
   - Cite the official WooCommerce test-mode connection procedure: https://woocommerce.com/document/stripe/customer-experience/testing/
   - For the “Configured” Live and Test webhook-status checks, cite: https://woocommerce.com/document/stripe/setup-and-configuration/stripe-webhooks/
   - For the broader connection/status settings, cite: https://woocommerce.com/document/stripe/setup-and-configuration/settings-guide/

4. **“Step 3: establish future-use authority at checkout” — PaymentIntent versus SetupIntent and future-use setup.**
   - Exact passages: “When an initial payment is collected, the PaymentIntent should be configured for future off-session use.” and “When no money is due—for example, a free trial—a SetupIntent or equivalent setup path may establish the reusable method without charging it.”
   - Cite Stripe's Intent lifecycle explanation, which distinguishes charging with a PaymentIntent from saving without a charge with a SetupIntent: https://docs.stripe.com/payments/paymentintents/lifecycle
   - Cite Stripe's Setup Intents guide for future-payment setup, authentication, and the no-charge behavior: https://docs.stripe.com/payments/setup-intents
   - Cite the save-and-reuse guide for customer permission and off-session reuse: https://docs.stripe.com/payments/save-and-reuse

5. **“Step 5: confirm a new off-session PaymentIntent” — the state table is a Stripe state machine, not a Boolean result.**
   - Exact placement: the five-row table beginning “PaymentIntent result | Meaning | Local response,” especially `succeeded`, `processing`, `requires_action`, and `requires_payment_method`.
   - Cite Stripe's lifecycle page in the sentence immediately introducing or following the table: https://docs.stripe.com/payments/paymentintents/lifecycle
   - For the canonical status field and enum, cite: https://docs.stripe.com/api/payment_intents/object#payment_intent_object-status
   - The “Local response” column is ArraySubs operational guidance/first-party behavior and must not be presented as if Stripe mandates those exact WooCommerce state transitions.

6. **“SCA: the first payment and renewal are different moments” — customer-present setup does not guarantee every future off-session charge.**
   - Exact passage: “A renewal happens off session, where the issuer may apply an exemption, approve frictionlessly, or require the customer to return.”
   - Cite Stripe's SCA overview for saved credentials and subsequent merchant-initiated/off-session payments: https://docs.stripe.com/strong-customer-authentication
   - Cite Stripe's save-and-reuse card flow for how an off-session payment can return an authentication-required error: https://docs.stripe.com/payments/save-and-reuse-cards-only
   - Cite the current Stripe testing page beside the SCA scenario list because it supplies explicit 3DS and off-session test cases: https://docs.stripe.com/testing#regulatory-cards

7. **“Two webhook paths must stay healthy” — signature verification, raw body, duplicates, ordering, and quick acknowledgement.**
   - Exact placement: the checklist beginning “A valid webhook handler should.”
   - Cite Stripe's webhook guide at the end of that checklist: https://docs.stripe.com/webhooks
   - Useful direct subsections for individual claims are https://docs.stripe.com/webhooks#verify-webhook-signatures, https://docs.stripe.com/webhooks#handle-duplicate-events, https://docs.stripe.com/webhooks#event-ordering, and https://docs.stripe.com/webhooks#quickly-return-a-2xx-response
   - Cite WooCommerce separately for the official Woo Stripe endpoint and its Live/Test health indicators: https://woocommerce.com/document/stripe/setup-and-configuration/stripe-webhooks/
   - The existence and behavior of the second ArraySubs endpoint remain ArraySubs first-party observations.

8. **“Webhook deduplication is not charge idempotency” — duplicate deliveries and request idempotency are separate controls.**
   - Exact passages: “Webhook event deduplication prevents the same `evt_...` delivery from applying its local effect twice.” and “Payment request idempotency asks Stripe to treat repeated creation requests with the same operation key as one logical request.”
   - Cite Stripe's duplicate-event guidance for the first claim: https://docs.stripe.com/webhooks#handle-duplicate-events
   - Cite Stripe's idempotent-request semantics for the second: https://docs.stripe.com/api/idempotent_requests
   - The sentence about the inspected Woo Stripe request layer generating a fresh UUID is a local source-code finding, not a claim supported by Stripe's generic idempotency documentation.

9. **“The most dangerous failure: an ambiguous timeout” — reconcile an unknown result before creating another payment.**
   - Exact passages: “Locally, the request looks failed. Remotely, money moved.” and “The safe sequence is to search the known stored intent and recent Stripe PaymentIntents ... before issuing a new charge.”
   - Cite Stripe's low-level error guide, especially its different treatment of network/server uncertainty and retry safety: https://docs.stripe.com/error-low-level
   - Pair it with the stable-key behavior documented at: https://docs.stripe.com/api/idempotent_requests
   - Preserve the article's wording as operational risk guidance; do not imply the generic Stripe documents prove ArraySubs' particular reconciliation search implementation.

10. **“Failures, retries, grace, and stop rules” — decline classes and customer-safe recovery.**
    - Exact passages: “Issuer decline reasons can be sensitive or inaccurate” and the distinction between authentication-required outcomes, temporary failures, and hard declines.
    - Cite Stripe's decline-handling guidance: https://docs.stripe.com/declines/card
    - Cite the official decline-code meanings only where a specific code is discussed: https://docs.stripe.com/declines/codes
    - The “three attempts separated by one day” default is an ArraySubs code observation and needs the tested-version disclosure, not a Stripe citation.

11. **“Payment-method updates need an end-to-end proof” — a customer default and a subscription-specific method can diverge.**
    - Exact passages: “A portal update may change provider state without updating every local pointer your next renewal uses.” and “Stripe also has customer-level default settings.”
    - Cite Stripe's portal integration documentation, which tells integrations to process `payment_method.attached`, `payment_method.detached`, and `customer.updated`, and distinguishes customer-level defaults from subscription overrides: https://docs.stripe.com/customer-management/integrate-customer-portal#webhooks
    - Cite the portal configuration documentation for enabling payment-method updates: https://docs.stripe.com/customer-management/configure-portal
    - Cite WooCommerce for the separate My Account saved-method/default interface: https://woocommerce.com/document/stripe/customer-experience/saved-payment-information/
    - Keep the suspected ArraySubs pointer-synchronization gap explicitly framed as a first-party verification gap.

12. **“Refunds, disputes, and provider truth” — Woo-admin refunds, asynchronous refund events, and disputes.**
    - Exact passage: “ArraySubs delegates a normal Stripe refund to the official WooCommerce Stripe Gateway.” Cite the official WooCommerce refund workflow: https://woocommerce.com/document/stripe/admin-experience/refunding-orders/
    - Exact placement: the external-refund and granular-event discussion. Cite Stripe's current refund lifecycle and recommended `refund.created`, `refund.updated`, and `refund.failed` events: https://docs.stripe.com/refunds
    - Exact placement: “Disputes also need their own policy.” Cite Stripe's dispute lifecycle: https://docs.stripe.com/disputes and the response/evidence workflow: https://docs.stripe.com/disputes/responding
    - The ArraySubs Charge/PaymentIntent normalization and local event mapping are first-party implementation observations.

13. **“A serious pre-launch test matrix” — use official sandbox values for success, declines, 3DS, refunds, and disputes.**
    - Exact placement: the opening sentence of the matrix plus the checkout, renewal-state, and refund/dispute subsections.
    - Cite the official WooCommerce Stripe test-mode workflow: https://woocommerce.com/document/stripe/customer-experience/testing/
    - Cite Stripe's current sandbox/test-value catalog: https://docs.stripe.com/testing
    - Do not copy full card numbers into the article; link readers to the maintained official table so the test data remains current.

14. **Key takeaway and “Mistake 6: making localhost your webhook test” — distinguish registered public delivery from CLI forwarding.**
    - Exact passages: “Test mode needs a publicly reachable HTTPS webhook endpoint for real provider callbacks.” and “Stripe cannot deliver an internet webhook to an unexposed local hostname.”
    - Cite Stripe's webhook registration requirement and local-forwarding instructions: https://docs.stripe.com/webhooks#register-your-endpoint and https://docs.stripe.com/webhooks#forward-events-to-a-local-endpoint
    - A precise supporting CLI page is: https://docs.stripe.com/stripe-cli/use-cli#forward-events-to-a-local-webhook-endpoint
    - Keep the existing qualification “without a tunnel or public staging URL”; Stripe CLI forwarding is a valid local test method, but it is not evidence that the production endpoint is reachable.

15. **Payment-method coverage and the launch matrix — avoid implying every checkout method is reusable off session.**
    - Exact passages: “A gateway that can take one checkout payment does not necessarily support reusable off-session authorization” and the matrix cases involving cards, bank debits, wallets, and non-card `processing` states.
    - Cite Stripe's current support matrix because availability depends on method, country, currency, product, and recurring/payment mode: https://docs.stripe.com/payments/payment-methods/payment-method-support
    - Cite WooCommerce's current list of methods its extension can save: https://woocommerce.com/document/stripe/customer-experience/saved-payment-information/#which-payment-methods-can-be-saved
    - ArraySubs' narrower supported-method set must still come from inspected ArraySubs code and installed-version tests.

**Placement priority:** items 1, 2, 4–9, and 12–14 are launch-blocking citation gaps because they support the article's core architecture, payment-state, SCA, webhook, duplicate-charge, refund, and testing claims. Items 3, 10, 11, and 15 should be added in the same pass because they cover time-sensitive configuration, recovery, and capability statements. Prefer one or two tightly scoped links beside the relevant sentence or table rather than a detached bibliography.

## Claims to avoid

- “ArraySubs creates Stripe Billing subscriptions.”
- “Stripe automatically runs the ArraySubs renewal schedule.”
- “The official WooCommerce Stripe extension alone is the ArraySubs subscription engine.”
- “Saving a card means every future renewal will succeed without authentication.”
- “`off_session=true` bypasses SCA.”
- “All Stripe checkout methods support automatic subscription renewals.”
- “A PaymentIntent and Charge are the same object/ID.”
- “A 2xx webhook response proves the Woo order and subscription are reconciled.”
- “Webhook event-ID dedupe prevents every possible duplicate charge.”
- “Every retry reuses the same deterministic Stripe idempotency key.”
- “The current Stripe customer portal update definitely changes the PaymentMethod on every ArraySubs subscription.”
- “Stripe’s automatic card updater works for every issuer/country/card.”
- “A `processing` PaymentIntent is paid.”
- “Three retries is universally the correct dunning policy.”
- “An external refund is complete as soon as the request is created.”
- “A dispute should always auto-cancel access” or “a dispute should never affect access.”
- “Stripe handles and remits all merchant sales tax in a normal payment-processing integration.”
- Any statement that exposes secret keys, signing secrets, client secrets, full recovery URLs, or real customer payment identifiers.

## Refresh triggers

Review quarterly and immediately after:

- ArraySubs changes the renewal scheduler, retry pipeline, gateway meta, verification email, or reconciliation behavior;
- ArraySubs Pro changes the official Stripe dependency/version range, PaymentIntent parameters, portal update flow, webhook event list, refund/dispute handler, or idempotency approach;
- the official WooCommerce Stripe extension changes its checkout modes, intent filters, webhook/deferred hooks, token schema, or idempotency implementation;
- Stripe changes PaymentIntent/SetupIntent, SCA/MIT consent, portal, webhook, refund, dispute, or automatic card-updater behavior;
- the staging/production store changes checkout surface, payment methods, cron, firewall/CDN, domain, API keys/account, tax configuration, or email delivery;
- a new country, currency, bank debit, wallet, or alternative method is enabled for subscription checkout.

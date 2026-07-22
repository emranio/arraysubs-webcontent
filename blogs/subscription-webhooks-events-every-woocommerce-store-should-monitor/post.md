---
title: "Subscription Webhooks: Events Every WooCommerce Store Should Monitor"
meta_description: "Learn which WooCommerce subscription webhooks to monitor across Stripe, PayPal, and Paddle, with security, idempotency, replay, and reconciliation guidance."
focus_keyword: "WooCommerce subscription webhooks"
published: "2026-03-02"
updated: "2026-07-19"
last_verified: "2026-07-22"
author: "Emran"
author_affiliation: "ArrayHash"
reviewer: "ArraySubs Engineering Team"
---

# Subscription Webhooks: Events Every WooCommerce Store Should Monitor

WooCommerce subscription webhook monitoring should prove five things: the payment provider reached the correct endpoint, the signature was verified, the event correlated to the correct order and subscription, a duplicate cannot repeat the business mutation, and local access, status, and renewal dates reconcile with provider truth. An HTTP 200 response or a recent-event timestamp alone is not enough.

The practical goal is not to collect every event a gateway can emit. It is to monitor the smallest complete event set that protects money movement, subscription lifecycle, customer access, and the evidence needed to repair a missed or delayed update.

> **Key takeaways**
>
> - Payment-provider webhooks are inbound facts from Stripe, PayPal, or Paddle; WooCommerce core webhooks are usually outbound store notifications. They solve different problems.
> - Webhooks do not replace scheduled renewal jobs. Scheduled jobs initiate store-owned work; webhooks report asynchronous provider outcomes; API reconciliation repairs uncertainty.
> - Verify signatures before parsing or mutating anything. Keep live/test mode, provider account, app, endpoint, and secret aligned.
> - Duplicate delivery is normal. Store provider event IDs, but also make the order/subscription mutation itself idempotent.
> - Delivery order is not guaranteed. Retrieve authoritative provider objects when an event arrives without the prerequisite local state.
> - ArraySubs Pro normalizes relevant Stripe, PayPal, and Paddle events and provides Gateway Health, but its visible event ledger records successfully handled events—not every rejected or failed inbound request.
> - “Last webhook” in current Gateway Health means the newest remembered successful event for that gateway. It is not a raw last-request timestamp.
> - Current processed-event rows are retained for 30 days, and the scheduled gateway reconciliation method is still a placeholder. External provider monitoring and an incident runbook remain necessary.

This guide reflects a first-party review of ArraySubs 1.8.11, ArraySubs Pro 1.1.2, the confirmed staging UI, and current primary Stripe, PayPal, Paddle, and WooCommerce documentation, reverified July 22, 2026. The staging gateways are deliberately disabled or unconfigured, so screenshots prove interface structure and exposed evidence—not production delivery health. No real customer payload, signing secret, live webhook replay, or production payment was used.

## What is a WooCommerce subscription webhook?

A payment-provider webhook is an HTTPS request sent to your WordPress site when an event happens outside the current browser request. A renewal can complete at Stripe while no customer is visiting the store. A PayPal agreement can be suspended in PayPal. Paddle can finish processing a recurring transaction after checkout returns. The provider needs a trusted way to tell WooCommerce and the subscription system what happened.

That notification is only the beginning of a pipeline. A robust receiver must:

1. identify the intended gateway and endpoint;
2. verify the provider signature against the exact raw request;
3. parse the provider event and preserve its unique ID;
4. resolve the provider object to the right WooCommerce order and ArraySubs subscription;
5. apply an idempotent state change;
6. record safe evidence; and
7. reconcile the final local state with provider money movement.

A webhook does **not** inherently prove that the payment succeeded, that the event is authentic, that it belongs to this merchant account, or that WordPress applied the intended update. Those are separate claims requiring separate evidence.

### A webhook is an observation, not the schedule

For Stripe renewals in current ArraySubs Pro, WordPress and Action Scheduler own the renewal timing. ArraySubs generates a renewal order and initiates an off-session Stripe PaymentIntent. Stripe webhooks then report asynchronous success, failure, authentication requirements, refunds, disputes, and method changes.

PayPal and Paddle are different. Each can own a remote recurring agreement/subscription and its collection schedule. Their webhooks tell the store about activity initiated remotely. That difference is why a universal “listen for invoice paid” checklist is incomplete.

For the broader scheduling model, read [how WooCommerce subscription renewals work](/deals/arraysubs/resources/billing-strategy/how-woocommerce-subscription-renewals-work/) and the [automatic-versus-manual gateway explainer](/deals/arraysubs/resources/payments-and-compliance/automatic-vs-manual-gateway-support-for-subscriptions/). The webhook layer must match the gateway’s actual collection owner.

## What is the difference between webhooks, scheduled jobs, and reconciliation?

Treat these as three complementary controls.

| Control | Primary question | Typical trigger | What it should never assume |
| --- | --- | --- | --- |
| Scheduled job | What work is due now? | Action Scheduler timestamp | Provider has not already collected |
| Provider webhook | What happened remotely? | Provider-created event | Event is authentic or locally applied merely because it arrived |
| API reconciliation | What is true now? | Manual sync, incident job, periodic control | Local history contains every remote change |

![Scheduled jobs, webhooks, and reconciliation shown as three connected subscription-payment controls.](/blogs/subscription-webhooks-events-every-woocommerce-store-should-monitor/webhook-scheduler-reconciliation-controls.png)

### Scheduled jobs initiate deterministic store work

ArraySubs Free centralizes renewal scheduling and maintenance hooks through its Action Scheduler support. Store-owned renewal generation, overdue checks, trial conversion, and maintenance tasks can run even when no provider event arrives.

A scheduler failure produces a different symptom from a webhook failure. If no renewal order exists and no provider collection was attempted, inspect the schedule. If the provider shows a successful payment but WooCommerce still shows an unpaid renewal, inspect delivery, correlation, and webhook handling.

### Webhooks report asynchronous provider facts

Providers retry deliveries, send related events close together, and can emit changes made in their own dashboard. A webhook receiver must be public so the provider can call it, but “public” must not mean “trusted.” The signature is the authentication boundary.

Stripe’s [webhook guidance](https://docs.stripe.com/webhooks) explicitly warns that events can be duplicated and delivered out of order. PayPal describes its webhooks as reverse API calls scoped to the REST app that created the activity ([PayPal webhooks overview](https://developer.paypal.com/api/rest/webhooks/)). Paddle likewise models events as the asynchronous record of entity changes and recommends specific lifecycle events for local provisioning ([Paddle webhook behavior](https://developer.paddle.com/webhooks/about/how-webhooks-work/)).

### Reconciliation repairs missing or ambiguous history

Reconciliation asks the provider for current objects and compares them with local orders/subscriptions. It is the control for uncertain cases: timeouts, out-of-order events, database restoration, endpoint downtime, or a handler exception after the provider already moved money.

Current ArraySubs Pro exposes gateway-specific sync capabilities and helpful operational evidence, but its general scheduled `reconcileGateways()` method is a future-work placeholder. Do not plan operations around an automatic universal repair loop that is not implemented.

## What should a webhook monitoring pipeline prove?

The most useful model is a seven-layer evidence chain.

| Layer | Monitoring question | Minimum evidence |
| --- | --- | --- |
| Provider creation | Did the remote event exist? | Event ID, type, occurred time, account/mode |
| Delivery | Did the correct endpoint receive an attempt? | Destination URL, attempt time, HTTP result |
| Verification | Was the signature accepted? | Sanitized verification result and secret version/context |
| Correlation | Which local objects were resolved? | Subscription ID, renewal/order ID, customer ID, remote object ID |
| Mutation | What local state changed? | Before/after status, access, next date, notes, failure markers |
| Idempotency | Could replay repeat the effect? | Event ledger plus business-state guard |
| Reconciliation | Do local and remote money/state agree? | One remote transaction mapped to one Woo order |

![A trustworthy webhook evidence flow from provider delivery through verification, correlation, application, and reconciliation.](/blogs/subscription-webhooks-events-every-woocommerce-store-should-monitor/trustworthy-webhook-evidence-flow.png)

Do not collapse this chain into a single green dot. A provider delivery page can show HTTP 200 while the receiver returns `processed: false`. A local ledger can show an event ID while a later task fails to grant access. Conversely, an empty local ledger can coexist with rejected traffic that never passed signature verification.

### Use three clocks during incident review

Record the provider’s event occurrence time, the delivery attempt time, and the local processed time separately. They answer different questions:

- **Occurred at:** when the provider says the business event happened;
- **Delivered at:** when an endpoint attempt was made; and
- **Processed at:** when WordPress successfully remembered the handled event.

![The three webhook incident clocks: occurred, delivered, and processed.](/blogs/subscription-webhooks-events-every-woocommerce-store-should-monitor/webhook-three-clocks.png)

Large gaps can reveal endpoint downtime, retries, queues, or a slow handler. Comparing only local WordPress time with a customer email can misidentify the cause.

## What does ArraySubs Gateway Health show?

ArraySubs Pro’s Gateway Health dashboard lives under ArraySubs Audits > Gateway Logs. It combines per-gateway setup context with a processed webhook event ledger.

![Annotated ArraySubs Gateway Health overview showing the gateway status row and filters for remembered webhook events.](/blogs/subscription-webhooks-events-every-woocommerce-store-should-monitor/gateway-health-webhook-monitor.png)

The current dashboard exposes:

- Paddle, PayPal, and Stripe cards;
- gateway enabled/setup state;
- count of relevant local subscriptions;
- newest remembered event time;
- gateway-specific endpoint details;
- declared subscription capabilities; and
- a filterable Webhook Event Log with gateway, event ID, event type, and processed time.

This is valuable because support can begin with the configured collector and the exact event ID instead of guessing from a generic “payment failed” email. The [Gateway Health monitoring recipe](/deals/arraysubs/use-cases/recipes/gateway-health-monitor/) owns the setup clicks; this article focuses on interpreting the evidence.

### What the current event log does not prove

Current ArraySubs Pro writes an event to its idempotency table only after the gateway handler returns success. Therefore, the visible list is a successfully handled/remembered-event ledger. It is not a complete raw ingress log.

The following can be missing from that table:

- unknown gateway requests rejected with HTTP 400;
- invalid signatures rejected with HTTP 401;
- payload parse failures rejected with HTTP 400;
- handler exceptions returned as HTTP 500;
- unsupported/unresolved events returned as HTTP 200 with `processed: false`; and
- requests blocked before WordPress or the REST controller.

“Last webhook: Never” should be read as “no remembered relevant event exists in the current retained ledger for this gateway.” It does not prove that the endpoint URL has never received traffic.

### The on-screen filter is not the full event inventory

The current event-type dropdown includes a convenient shortlist such as PaymentIntent success/failure and invoice success/failure. ArraySubs handles more Stripe events and separate PayPal/Paddle event names. Filter options should not be copied into an architecture diagram as if they were the complete contract.

## Which Stripe webhook events should an ArraySubs store monitor?

Stripe is unusual in this stack because the official WooCommerce Stripe Gateway handles checkout and its own webhook route, while ArraySubs Pro can provision a secondary endpoint for subscription-specific automation.

![Annotated Stripe Gateway Health detail separating the official WooCommerce Stripe endpoint from the ArraySubs secondary endpoint.](/blogs/subscription-webhooks-events-every-woocommerce-store-should-monitor/stripe-dual-webhook-health.png)

The staging capture is intentionally unconfigured. It proves the UI separates the two endpoint roles, exposes their URLs/statuses, and provides the event monitor. It does not prove either endpoint is reachable from Stripe or has the correct secret.

### Current ArraySubs secondary Stripe event map

| Stripe event | ArraySubs meaning | Operator question |
| --- | --- | --- |
| `payment_intent.succeeded` | Payment succeeded | Did one PaymentIntent settle one renewal order? |
| `payment_intent.payment_failed` | Payment failed | Was the order held and failure/retry state recorded? |
| `payment_intent.requires_action` | Customer action required | Is the customer recovery path available without blind retry? |
| `invoice.payment_succeeded` | Payment succeeded | Is this invoice relevant to the local subscription collector? |
| `invoice.payment_failed` | Payment failed | Did the event resolve the intended local renewal? |
| `charge.succeeded` | Payment succeeded | Is this only corroboration, or the decisive local event? |
| `charge.refunded` | Refund created | Did refund amount, order, and subscription policy reconcile? |
| `charge.dispute.created` | Dispute opened | Was access/risk handling triggered according to policy? |
| `charge.dispute.closed` | Dispute resolved | Was the final resolution applied exactly once? |
| `setup_intent.succeeded` | Payment method updated | Did the intended subscription receive a PaymentMethod ID? |
| `customer.source.expiring` | Card expiring | Is this legacy Sources evidence rather than PaymentMethods? |
| `payment_method.updated` | Payment method updated | Were safe descriptors and the right subscription refreshed? |
| automatic method-update variants | Payment method updated | Did provider/card-network evidence update the same vaulted object? |

The last row summarizes `payment_method.automatically_updated` and `payment_method.card_automatically_updated` to keep the table readable; both are in the current required secondary-endpoint list.

### Do not demand every Stripe event

Stripe advises subscribing only to event types the integration needs. Receiving everything increases load and makes alerting noisy. The correct inventory is a contract between the endpoint configuration and the code version actually deployed.

The [Stripe recurring-payment test guide](/deals/arraysubs/resources/payments-and-compliance/stripe-recurring-payments-for-woocommerce-how-they-work-and-what-to-test/) explains the complete charge path. The [SCA and 3D Secure renewal guide](/deals/arraysubs/resources/payments-and-compliance/sca-and-3d-secure-for-subscription-renewals/) explains why a `requires_action` outcome is a recovery state, not permission to keep retrying.

### Verify both account scope and delivery route

For every Stripe incident, record:

- test or live mode;
- Stripe account/connected-account context;
- official Woo Stripe endpoint URL and secret status;
- ArraySubs secondary endpoint URL, endpoint ID, secret status, and required-event configuration;
- provider event ID and object ID;
- Woo order transaction ID; and
- ArraySubs subscription ID.

A correct-looking event ID from another account or mode is not valid evidence for this site. The [payment-token and card-update explainer](/deals/arraysubs/resources/payments-and-compliance/subscription-payment-tokens-and-card-updates-explained/) covers the same scoping rule for vaulted methods.

## Which PayPal subscription events should be monitored?

PayPal webhooks are scoped to a REST app. Activity created through a different app on the same PayPal account does not automatically appear at the endpoint for this app. That makes app identity part of the monitoring key.

![Annotated PayPal Gateway Health detail showing the gateway-specific endpoint and declared lifecycle capabilities.](/blogs/subscription-webhooks-events-every-woocommerce-store-should-monitor/paypal-webhook-endpoint.png)

The screenshot proves that current ArraySubs Pro exposes a PayPal webhook URL and gateway capability context. It does not prove that the URL is subscribed in PayPal, that the app is correct, or that any event has passed verification.

### Current ArraySubs PayPal event map

| PayPal event | Current local meaning |
| --- | --- |
| `BILLING.SUBSCRIPTION.ACTIVATED` | Subscription activation/payment success path |
| `BILLING.SUBSCRIPTION.CANCELLED` | Subscription cancelled |
| `BILLING.SUBSCRIPTION.EXPIRED` | Terminal/cancelled handling |
| `BILLING.SUBSCRIPTION.PAYMENT.FAILED` | Payment failed |
| `PAYMENT.SALE.COMPLETED` | Payment succeeded |
| `PAYMENT.SALE.DENIED` | Payment failed |
| `PAYMENT.SALE.REFUNDED` | Refund created |
| `PAYMENT.SALE.REVERSED` | Refund/reversal handling |
| `CUSTOMER.DISPUTE.CREATED` | Dispute created |
| `CUSTOMER.DISPUTE.RESOLVED` | Dispute resolved |
| `BILLING.SUBSCRIPTION.SUSPENDED` | Dedicated suspension/on-hold handling |

PayPal’s [official event inventory](https://developer.paypal.com/api/rest/webhooks/event-names/) contains many more events. The article’s list is the current ArraySubs contract, not a complete list of everything PayPal can send.

### Customer return and webhook are complementary

Current ArraySubs PayPal code can proactively confirm an approved order when the payer returns to WooCommerce rather than waiting solely for a possibly delayed sale-completed webhook. This improves checkout completion, but it creates two evidence paths that must converge safely.

Verify the PayPal sale/agreement ID, Woo order, ArraySubs subscription, and final provider state. A return page alone does not prove settlement; a later webhook must not duplicate the local completion.

For the broader agreement model and its limits, use [PayPal recurring payments for WooCommerce](/deals/arraysubs/resources/payments-and-compliance/paypal-recurring-payments-for-woocommerce-agreements-renewals-and-limits/).

## Which Paddle subscription events should be monitored?

Paddle owns the remote subscription and transaction processing sequence. Its event names describe stages of provider-owned objects rather than Stripe-style PaymentIntents.

Current ArraySubs Pro maps:

- `transaction.completed` to payment succeeded;
- `transaction.payment_failed` to payment failed;
- `subscription.canceled` to subscription cancelled;
- `subscription.updated` to payment method/subscription context updated;
- `adjustment.created` to refund created; and
- `subscription.created`, `subscription.paused`, and `subscription.resumed` to dedicated lifecycle handlers.

Paddle documents that `transaction.paid` is an early point at which funds are captured, while `transaction.completed` means Paddle has finished internal transaction processing. Current ArraySubs uses `transaction.completed` as its mapped success event. Monitor the event the deployed handler actually consumes, not a generic checklist copied from another integration. See Paddle’s [transaction.completed reference](https://developer.paddle.com/webhooks/transactions/transaction-completed/) and [subscription provisioning guidance](https://developer.paddle.com/build/subscriptions/provision-access-webhooks/).

The [Paddle Merchant-of-Record guide](/deals/arraysubs/resources/payments-and-compliance/paddle-merchant-of-record-for-woocommerce-subscriptions/) covers tax documents, refunds, and MoR responsibility. Webhook correctness does not move those legal/accounting responsibilities back to WooCommerce.

## Are WooCommerce webhooks the same as gateway webhooks?

No. WooCommerce core webhooks are normally outbound notifications configured under WooCommerce > Settings > Advanced > Webhooks. They tell another system that an order, product, customer, coupon, or WordPress/WooCommerce action changed.

Payment-provider webhooks are inbound. Stripe, PayPal, or Paddle tells WordPress about a remote payment or subscription event.

| Direction | Example | Authentication model | Main use |
| --- | --- | --- | --- |
| WooCommerce outbound | Woo sends an order-updated payload to a CRM | Woo secret/HMAC at receiving system | Notify downstream application |
| Provider inbound | Stripe sends PaymentIntent success to WordPress | Provider signature verified by gateway integration | Reconcile payment/lifecycle state |

WooCommerce’s [developer webhook documentation](https://developer.woocommerce.com/docs/best-practices/urls-and-routing/webhooks/) describes outbound topics, delivery URL, status, and HMAC secret. Creating a WooCommerce outbound webhook does not configure Stripe or repair a provider callback.

## How should webhook signatures and secrets be handled?

Signature verification must occur before event data is trusted or used to mutate an order. Verification normally binds the raw body, signature header, timestamp/tolerance, and endpoint-specific secret.

### Security checklist

- Use HTTPS on public endpoints.
- Keep separate secrets for test/live and for distinct endpoints.
- Do not reuse API keys as webhook secrets.
- Do not parse, normalize, or re-serialize the raw body before provider verification when the SDK expects original bytes.
- Rotate compromised secrets and update the matching endpoint atomically.
- Reject invalid signatures with a non-success response.
- Rate-limit and protect infrastructure without blocking legitimate provider ranges/behavior by guesswork.
- Keep WordPress, WooCommerce, gateway plugins, ArraySubs, and dependencies patched.
- Never paste signing secrets or full payloads into tickets, articles, screenshots, chat, or public logs.
- Log safe correlation IDs and sanitized error categories instead of sensitive customer/payment data.

ArraySubs Pro’s generic receiver is intentionally public. Its gateway adapter decides whether a request is authentic. That architecture is normal; it is not permission to bypass verification in a custom integration.

## How should duplicate, delayed, and out-of-order events be handled?

Webhook delivery is at least once in practice: a provider can retry when a response is slow or unsuccessful, and operators can manually resend an event. A store must expect the same event ID again.

### Event-ID deduplication is necessary but not sufficient

Current ArraySubs Pro checks a unique gateway/event-ID ledger before dispatch and remembers the event after a successful handler. `INSERT IGNORE` protects the ledger from duplicate rows.

This is useful duplicate suppression. It should not be marketed as a strict exactly-once guarantee because two workers can pass a pre-check before either has written the ID, while the business mutation occurs before the successful ID insert.

![Duplicate webhook deliveries converging through one event ID into one safe business mutation.](/blogs/subscription-webhooks-events-every-woocommerce-store-should-monitor/webhook-duplicate-one-mutation.png)

The mutation itself should therefore be safe to repeat:

- find the renewal order by provider transaction/payment ID;
- stop if that exact successful transaction is already attached;
- do not create a second renewal order for the same billing period;
- apply status transitions only from eligible current states;
- avoid repeating emails/access grants/refunds on the same event/object; and
- re-read the final order/subscription before acknowledging completion.

### Event ordering cannot be assumed

Stripe explicitly says event order is not guaranteed. The same architectural rule should be applied across gateways. If a payment event arrives before the local subscription mapping exists, retrieve authoritative provider data or queue a controlled retry rather than fabricating the missing relationship.

Useful ordering controls include:

1. compare provider `occurred_at` with the last applied lifecycle timestamp;
2. validate the current remote object status before applying a terminal downgrade;
3. retrieve missing invoice, charge, transaction, agreement, or subscription objects;
4. preserve event IDs and object IDs for replay; and
5. make newer terminal evidence win over stale nonterminal updates according to gateway semantics.

### A fast 200 is not the same as processed success

Providers often prefer a quick success response and asynchronous work. Current ArraySubs routing performs its handler flow in the request and can return 200 with `processed: false` for an unhandled event. Monitor the response body and application evidence where available, not the status code in isolation.

## How should provider events correlate to WooCommerce and ArraySubs objects?

The essential relationship is:

**provider account/mode → provider event → provider object/transaction → Woo order → ArraySubs subscription → customer/access**

Every arrow must be defensible. Common correlation sources include provider metadata, transaction IDs stored on orders, remote agreement/subscription IDs stored on the ArraySubs subscription, normalized order/subscription links, and the local customer ID.

### Avoid dangerous fallback assumptions

- One customer can own multiple subscriptions.
- One provider customer can have multiple payment methods.
- A gateway-normalized “payment method” field can contain a Stripe PaymentMethod or a PayPal/Paddle remote subscription ID.
- A parent/initial order is not the same as the current renewal order.
- The newest unpaid order is not automatically the event’s order.
- An email address is not a safe unique transaction key.

The [subscription order versus renewal order guide](/deals/arraysubs/resources/billing-strategy/subscription-order-vs-renewal-order-vs-parent-order/) explains the local object distinctions that webhook handlers must preserve.

## What symptoms indicate a webhook monitoring gap?

| Symptom | Likely investigation | Unsafe response |
| --- | --- | --- |
| Provider paid; Woo renewal unpaid | Missing/delayed delivery, correlation failure, handler exception | Charge again immediately |
| Woo order paid; provider transaction absent | Return-path/local mutation before settlement, wrong account/mode | Grant permanent access without provider check |
| Two renewal orders or emails | Duplicate/racing handler or scheduler overlap | Delete evidence before correlation |
| Subscription on hold after method update | Old failed order still unpaid | Assume update paid the debt |
| Next date stale after successful renewal | Partial handler or schedule computation failure | Manually jump date without order audit |
| Gateway Health shows Never | No retained successful event, wrong endpoint/app/account, or all deliveries rejected | Conclude provider sent nothing |
| Event exists but no local object | Missing metadata/mapping or event arrived before local commit | Attach it to the first customer match |
| Replayed event repeats refund/access change | Business mutation is not idempotent | Disable retries globally |

The [failed-subscription-payment recovery pillar](/deals/arraysubs/resources/payment-recovery/failed-subscription-payment-recovery-for-woocommerce/) covers customer recovery; this table focuses on systems evidence.

## Incident runbook: provider shows paid, WooCommerce shows unpaid

This is the highest-risk common incident because a blind retry can double-charge the customer.

![A five-step paid-renewal incident sequence: freeze, verify provider truth, inspect delivery, repair, and reconcile.](/blogs/subscription-webhooks-events-every-woocommerce-store-should-monitor/paid-renewal-incident-runbook.png)

### 1. Freeze new collection attempts for the affected renewal

Identify the exact subscription and renewal order. Inspect scheduled retries before triggering any manual payment. Do not cancel the provider transaction, delete the order, or detach the gateway while evidence is incomplete.

### 2. Establish provider truth

Retrieve the provider payment/transaction by its ID. Verify account, mode, currency, amount, status, timestamps, customer, subscription/agreement, and refund/dispute state.

### 3. Inspect delivery truth

In the provider dashboard, find the original event and endpoint attempts. Record response status and time. Confirm the endpoint matches the active site, gateway, app/account, and mode.

### 4. Separate receipt from processing

Look for:

- invalid signature;
- parse failure;
- unhandled event type;
- unresolved subscription/order;
- handler exception;
- successful event ledger row; and
- a later scheduled job or admin action that changed state again.

An event absent from Gateway Health may have failed before successful remembrance.

### 5. Repair with the original authority

Prefer provider-supported event resend/replay or a gateway-specific sync that retrieves current state. Do not simulate success by manually changing only the subscription status. If manual repair is unavoidable, attach the existing provider transaction to the correct renewal order and document why it is safe.

### 6. Reconcile the full outcome

Confirm:

- one provider payment;
- one Woo renewal order;
- correct order amount/currency/status;
- correct ArraySubs status;
- correct next payment date/billing anchor;
- cleared or intentionally retained retry/failure state;
- correct access entitlement;
- one set of customer/admin notifications; and
- durable sanitized incident evidence.

### 7. Close the monitoring gap

Fix the endpoint, secret, event selection, correlation mapping, handler, timeout, or deployment issue. Add an alert that would have found this divergence before the customer did.

## What should a webhook monitoring dashboard alert on?

Avoid one universal time threshold for every store. A weekly subscription store and a high-volume daily service have different baselines. Alert on expected activity and reconciliation, not merely raw request count.

Useful controls include:

- endpoint disabled, deleted, or configured to another URL;
- signing secret missing or mode/account mismatch;
- required event types missing from the provider endpoint;
- repeated non-2xx delivery attempts;
- HTTP 200 responses with a locally unprocessed/unhandled outcome;
- invalid-signature spikes;
- event-to-local-processing lag above the store’s tested baseline;
- provider success with no paid Woo order after a bounded window;
- paid Woo order with no provider transaction;
- multiple local orders for one provider transaction/billing period;
- renewal failure without customer recovery communication;
- remote cancellation/hold/pause with stale local access; and
- no successful remembered events despite expected gateway volume.

Combine provider-side alerting with WordPress logs and business reconciliation. Gateway Health is the starting console, not the only telemetry system for a high-volume or regulated operation.

## How long should webhook event evidence be retained?

Current ArraySubs Pro stores successfully processed event IDs/types/times for 30 days, then schedules a daily cleanup. The staging Scheduled-Job Logs show the cleanup action executing successfully.

![Annotated ArraySubs Scheduled-Job Logs showing successful processed-webhook-event cleanup and the auditable job columns.](/blogs/subscription-webhooks-events-every-woocommerce-store-should-monitor/webhook-cleanup-job-log.png)

This proves the maintenance task ran on the staging site at the shown times. It does not prove how many rows were deleted, that every production job will run, or that the event table is a sufficient legal/accounting archive.

Choose broader retention based on operational, contractual, accounting, privacy, and legal requirements. A safe observability store can retain event IDs, object IDs, safe timestamps, statuses, and hashes/correlation data without copying complete cardholder/customer payloads into WordPress logs.

### Privacy and support boundaries

Never request or store:

- raw card numbers or CVC;
- signing secrets or API keys;
- full unredacted provider payloads by default;
- customer portal session URLs;
- unnecessary addresses, tax IDs, or personal data; or
- screenshots containing live credentials or customer payment information.

Support usually needs gateway/account/mode, event ID/type/time, safe provider object ID, local subscription/order IDs, response/error category, and final reconciliation result.

## What should stores test before trusting subscription webhooks?

Run the test matrix in sandbox/test mode for every enabled gateway and repeat it after provider, gateway-plugin, WooCommerce, WordPress, or ArraySubs changes.

### Common tests

- Correct signature is accepted; wrong/missing signature is rejected.
- Test and live secrets cannot validate each other’s events.
- A normal renewal produces one provider payment, one renewal order, one lifecycle update, and one next date.
- The same event ID delivered twice does not repeat business effects.
- Two related events arriving in the reverse order reconcile to the correct final state.
- Handler timeout/retry does not create a duplicate payment/order.
- Unhandled event returns visible evidence and does not masquerade as processed success.
- Missing subscription metadata enters a recoverable queue/error path rather than attaching to a guess.
- Refund, partial refund, dispute, cancellation, pause/suspension, resume, and method update follow documented policies.
- Endpoint downtime followed by replay catches up safely.
- Database/site restore does not reprocess old provider events into new money movement.
- Logs and screenshots contain no secrets or unnecessary customer data.

### Stripe-specific tests

- Official Woo Stripe and ArraySubs secondary endpoints match the active account/mode.
- Required secondary events are present remotely.
- PaymentIntent success/failure/requires-action each resolve the intended renewal.
- Invoice/charge events cannot double-complete an already paid renewal.
- Refund and dispute events correlate to the right order/subscription.
- Payment-method update events change only the intended subscription/context.

### PayPal-specific tests

- Webhook subscription belongs to the same REST app used to create the agreement.
- Sale completion and buyer-return confirmation converge on one paid order.
- Suspension produces on-hold behavior rather than an unsupported terminal assumption.
- Cancelled/expired/refunded/reversed/dispute events preserve remote/local correlation.

### Paddle-specific tests

- `transaction.completed` is the decisive processed-success event for the current integration.
- Payment failure maps to the intended renewal/subscription and dunning state.
- Created/updated/paused/resumed/canceled events reconcile remote lifecycle and local access.
- Adjustment/refund evidence maps to the correct transaction/order.

## When is ArraySubs—and Gateway Health—the right fit?

ArraySubs Free is useful when you need the shared WooCommerce subscription engine, renewal scheduling, orders, lifecycle, and customer management. ArraySubs Pro adds automatic Stripe/PayPal/Paddle integrations, gateway-specific webhook handling, retry/recovery capabilities, synchronization, and Gateway Health.

See [ArraySubs payment-gateway features](/deals/arraysubs/features/#payment-gateways) for the current product surface. The feature solves important WordPress-side integration and monitoring needs; it does not replace:

- the provider’s delivery-attempt console;
- infrastructure/uptime monitoring;
- a central log/metrics platform;
- accounting and payout reconciliation;
- security incident response;
- custom exactly-once orchestration for high-scale systems; or
- qualified compliance/legal controls.

For a small or medium WooCommerce subscription store, Gateway Health plus a tested runbook can provide a strong operational baseline. High-volume, multi-account, marketplace, or regulated deployments should add external observability and automated divergence detection.

## Verification scope, limitations, and update log

The code review covered the current event maps, endpoint roles, processed-event ledger, retention cleanup, and gateway-health surfaces in ArraySubs 1.8.11 and ArraySubs Pro 1.1.2. On July 22, 2026, we rechecked the article against those plugin versions and the accepted staging evidence. The four real UI captures show Gateway Health, Stripe’s dual endpoint context, PayPal’s endpoint/capability context, and the processed-event cleanup job; the remaining visuals are explanatory diagrams with different compositions.

The staging gateway cards were disabled or unconfigured. We did not send an authentic Stripe, PayPal, or Paddle webhook; rotate or validate a signing secret; replay a provider event; simulate an out-of-order event pair; or settle a live or sandbox renewal. The visible event ledger records remembered successful handling and cannot prove rejected requests, provider-side delivery attempts, infrastructure blocks, or production reachability. Treat every provider event list and retention statement as version-specific, and repeat the test matrix against the exact account, mode, endpoint, secret, and deployed code before launch.

**Update log:** Published March 2, 2026; editorially updated July 19, 2026; plugin-version, evidence, internal-link, CTA, and limitations review completed July 22, 2026.

## Frequently asked questions

### Which webhook event means a subscription renewal was paid?

It depends on the gateway architecture. Current ArraySubs maps Stripe PaymentIntent/invoice/charge success events, PayPal sale/subscription activation events, and Paddle `transaction.completed`. Prove the exact event relates to one local renewal order and reconcile the provider transaction.

### Is HTTP 200 proof that ArraySubs processed the event?

No. Current routing can return HTTP 200 with `processed: false` for an unsupported or unresolved event. Check the response body where available, the handled-event ledger, local mutation, and final provider/local reconciliation.

### Why is Gateway Health’s webhook log empty?

Possible causes include no successfully handled events within retention, disabled/misconfigured gateway, wrong endpoint/app/account/mode, missing required events, signature/parse/handler failure, or traffic blocked before WordPress. Check provider delivery attempts and application logs.

### Does ArraySubs guarantee exactly-once webhook processing?

No strict guarantee should be claimed. It suppresses duplicate gateway/event IDs and protects the ledger with a unique key, but robust operations also require idempotent order/subscription mutations, correlation checks, and reconciliation.

### Can webhooks replace Action Scheduler?

No. Scheduled jobs initiate due store-owned work and maintenance. Webhooks report provider-originated/asynchronous outcomes. Both are needed, and reconciliation covers uncertainty between them.

### Should a store subscribe to every provider event?

Usually no. Subscribe to the smallest event contract the deployed integration actually handles and the business needs. Extra events increase load and noise without improving correctness.

### How long does ArraySubs keep remembered webhook events?

Current ArraySubs Pro cleanup removes processed-event rows older than 30 days. Treat that table as a duplicate-suppression/operational ledger, not a permanent audit archive.

### Can I resend a webhook after fixing the endpoint?

Use the provider’s supported replay/resend feature and verify idempotency first. Freeze competing retries, preserve the original event/transaction ID, then reconcile one provider outcome to one Woo order and subscription.

## The operating rule to remember

A webhook is trustworthy only when the whole chain is trustworthy:

**correct provider account and endpoint → verified signature → known event contract → exact order/subscription correlation → idempotent mutation → provider/local reconciliation**

ArraySubs Pro can normalize gateway events and surface practical health evidence, but monitoring must extend beyond a recent timestamp. Test duplicates, delays, ordering, rejection, replay, and partial failure before live renewals depend on the integration.

If you need automatic Stripe, PayPal, or Paddle subscription workflows with Gateway Health and recovery tooling, [view ArraySubs Pro pricing](/deals/arraysubs/pricing/). Use the [Gateway Health recipe](/deals/arraysubs/use-cases/recipes/gateway-health-monitor/) once the architecture and monitoring responsibilities are agreed.

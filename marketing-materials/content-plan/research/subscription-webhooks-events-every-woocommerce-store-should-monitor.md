# A064 research — Subscription Webhooks: Events Every WooCommerce Store Should Monitor

Research completed July 21, 2026 for ArraySubs 1.8.11, ArraySubs Pro 1.1.2, WooCommerce on the confirmed staging site, current plugin source, and current primary gateway documentation. This is a truth packet, not publish-ready prose. Never expose webhook secrets or full customer payloads in the article or screenshots.

## Direct-answer position

WooCommerce subscription webhook monitoring should prove five things: the provider can reach the correct endpoint, the signature is verified, the event is tied to the correct order/subscription, duplicate delivery cannot repeat the business mutation, and local order/access/next-date state reconciles with provider truth. Scheduled jobs remain necessary for store-owned renewals and cleanup; webhooks remain necessary for provider-originated or asynchronous outcomes.

## Product truth: where the feature lives

- The generic recurring scheduling engine and centralized Action Scheduler constants live in ArraySubs Free.
- Automatic Stripe, PayPal, and Paddle integrations, webhook receipt/verification, event normalization, remote-state handlers, the processed-event table, and Gateway Health are ArraySubs Pro.
- `WebhookController` exposes a public REST receiver because providers cannot authenticate as WordPress users. Security depends on each gateway’s signature-verification implementation, not WordPress login.
- `WebhookRouter::process()` resolves the gateway, verifies the signature, parses the payload, checks the event ID for duplicates, resolves entity IDs, builds a subscription/order context, dispatches the normalized event, remembers successfully handled events, and returns a REST response.
- Unknown gateway returns HTTP 400. Invalid signature returns 401. Parse failure returns 400. Handler exception returns 500.
- An unsupported or unresolved handler returns `success: false`; the REST response is still HTTP 200 with `processed: false`, and the event is not remembered in the idempotency table. Do not describe HTTP 200 alone as proof that the local mutation completed.

## Gateway Health semantics and important limitations

Gateway Health is a Pro admin surface at ArraySubs Audits > Gateway Logs. The dashboard reads gateway enablement/setup state, subscription count, last remembered webhook time, endpoint URL, and declared capabilities. It also exposes a filtered Webhook Event Log.

The table shown by Gateway Health is `wp_arraysubs_webhook_events` (prefix varies). Its columns are gateway slug, event ID, event type, and `processed_at`. A unique `(gateway_slug, event_id)` index plus `INSERT IGNORE` prevents duplicate rows.

Critical wording boundaries:

1. The table is a successfully handled/remembered-event ledger, not a raw ingress or rejected-delivery log. Invalid signatures, parse failures, handler exceptions, and unhandled events are absent.
2. “Last webhook” is derived from the newest remembered row for that gateway. It means last successfully remembered relevant event, not necessarily the last POST that reached WordPress.
3. The event list does not store the entire payload, provider delivery attempt, signature result, HTTP response, processing latency, or rejected-event reason.
4. Processed rows are deleted after 30 days by the daily `arraysubs_cleanup_webhook_events` scheduled action. Gateway Health is not a permanent audit archive.
5. The on-screen event-type filter is a convenient shortlist (`payment_intent.succeeded`, `payment_intent.payment_failed`, `customer.subscription.updated`, `invoice.payment_succeeded`, `invoice.payment_failed`); it is not the complete implemented gateway inventory.
6. `reconcileGateways()` currently contains a future-work placeholder, and no active recurring reconciliation job should be claimed. Current manual “sync from gateway” features are gateway/subscription actions, not proof of a universal scheduled reconciler.

## Idempotency and exactly-once boundary

ArraySubs Pro checks `(gateway slug, provider event ID)` before dispatch and remembers the event after a successful handler. `INSERT IGNORE` protects the table when two routes race to insert the same event. This is useful duplicate suppression, but it is not a mathematical exactly-once guarantee: a race can allow two workers past the pre-check before either row exists, while the business mutation occurs before `rememberEvent()`. The article should recommend idempotent order/subscription mutations, transaction-ID correlation, locks where appropriate, and a final state re-check.

Provider duplicates are not the only duplicate risk. Stripe documents that separate event objects can sometimes describe the same underlying object transition; compare object ID plus event type where the workflow requires that stronger guard. Never key only on event type.

## Exact current ArraySubs Stripe inventory

The ArraySubs secondary Stripe endpoint is provisioned from the active WooCommerce Stripe account/mode and listens for:

- `payment_intent.succeeded` → payment succeeded
- `payment_intent.payment_failed` → payment failed
- `payment_intent.requires_action` → payment requires customer action
- `invoice.payment_succeeded` → payment succeeded
- `invoice.payment_failed` → payment failed
- `charge.succeeded` → payment succeeded
- `charge.refunded` → refund created
- `charge.dispute.created` → dispute created
- `charge.dispute.closed` → dispute resolved
- `setup_intent.succeeded` → payment method updated
- `customer.source.expiring` → card expiring (legacy Sources boundary)
- `payment_method.updated` → payment method updated
- `payment_method.automatically_updated` → payment method updated
- `payment_method.card_automatically_updated` → payment method updated

Stripe is special because ArraySubs Pro integrates with the official WooCommerce Stripe Gateway for checkout and also has an ArraySubs secondary endpoint. The Gateway Health expansion shows both official Woo Stripe and ArraySubs secondary endpoint status/URLs. Avoid saying every event must be processed twice. The code contains duplicate suppression and special handling around official Woo Stripe callbacks.

Stripe’s primary webhook documentation says delivery order is not guaranteed, endpoints can receive duplicates, only required event types should be subscribed, and missing objects should be retrieved from the API when needed. It also recommends asynchronous handling for production reliability. Source: https://docs.stripe.com/webhooks

## Exact current ArraySubs PayPal inventory

Current PayPal normalized events:

- `BILLING.SUBSCRIPTION.ACTIVATED` → payment succeeded/activation handling
- `BILLING.SUBSCRIPTION.CANCELLED` → subscription cancelled
- `BILLING.SUBSCRIPTION.EXPIRED` → subscription cancelled/terminal handling
- `BILLING.SUBSCRIPTION.PAYMENT.FAILED` → payment failed
- `PAYMENT.SALE.COMPLETED` → payment succeeded
- `PAYMENT.SALE.DENIED` → payment failed
- `PAYMENT.SALE.REFUNDED` → refund created
- `PAYMENT.SALE.REVERSED` → refund/reversal handling
- `CUSTOMER.DISPUTE.CREATED` → dispute created
- `CUSTOMER.DISPUTE.RESOLVED` → dispute resolved
- `BILLING.SUBSCRIPTION.SUSPENDED` is intentionally routed to a dedicated suspended handler, because suspension means hold rather than an automatic terminal payment-failure state.

PayPal also confirms approved checkout on the customer return path so the order does not depend exclusively on a delayed `PAYMENT.SALE.COMPLETED` webhook. Treat return confirmation and webhook delivery as complementary evidence, then reconcile transaction IDs.

PayPal webhooks are scoped to a specific REST app. Activity created through a different app on the same account does not automatically arrive at this endpoint. Primary overview: https://developer.paypal.com/api/rest/webhooks/ . Official event inventory: https://developer.paypal.com/api/rest/webhooks/event-names/ .

## Exact current ArraySubs Paddle inventory

Current Paddle event map:

- `transaction.completed` → payment succeeded
- `transaction.payment_failed` → payment failed
- `subscription.canceled` → subscription cancelled
- `subscription.updated` → payment method/subscription context updated
- `adjustment.created` → refund created
- `subscription.created` → custom created handler
- `subscription.paused` → custom paused handler
- `subscription.resumed` → custom resumed handler

Paddle’s docs distinguish `transaction.paid` (funds captured) from `transaction.completed` (Paddle finished transaction processing). ArraySubs currently maps `transaction.completed`, so the article should explain why the implemented event—not a generic earlier event—is the local decision point. Primary sources: https://developer.paddle.com/webhooks/about/how-webhooks-work/ , https://developer.paddle.com/webhooks/transactions/transaction-completed/ , and https://developer.paddle.com/build/subscriptions/provision-access-webhooks/ .

Paddle can emit many more event types than ArraySubs handles. Do not convert provider availability into an ArraySubs feature claim.

## WooCommerce outbound webhooks versus payment-provider inbound webhooks

WooCommerce core webhooks are store-originated notifications configured under WooCommerce > Settings > Advanced > Webhooks. They can notify another system about order/product/customer/action events. Provider webhooks travel the other direction: Stripe, PayPal, or Paddle calls WordPress about external payment/lifecycle facts. These are different systems and should not be presented as substitutes.

WooCommerce documents topic, status, delivery URL, secret/HMAC, and hook mapping. Source: https://developer.woocommerce.com/docs/best-practices/urls-and-routing/webhooks/ .

## Monitoring model and worked incident framework

For each expected provider event, record or derive:

| Layer | Question | Evidence |
| --- | --- | --- |
| Provider creation | Did the event exist? | Provider event ID/object/time |
| Delivery | Did the correct endpoint receive it? | Provider attempt and HTTP result |
| Verification | Was the signature accepted? | Sanitized application log/result |
| Correlation | Which local order/subscription was resolved? | Local IDs and provider object/transaction IDs |
| Mutation | What status, notes, access, failure/retry state changed? | Before/after local state |
| Idempotency | Could replay repeat the mutation? | Event ID ledger plus business-state guard |
| Reconciliation | Do provider money and local order agree? | One provider charge/refund to one Woo order |

Worked example: renewal charge exists at provider but local subscription remains on hold.

1. Search provider by renewal transaction/payment ID; do not charge again.
2. Check endpoint/app/account/mode and delivery attempts.
3. Distinguish invalid signature, parse error, unhandled event, correlation failure, and handler exception.
4. Resolve the renewal order and original subscription; confirm ownership and amounts/currency.
5. If safe, replay/resend the original provider event or run a gateway-specific sync rather than inventing a new payment.
6. Verify one paid renewal order, correct next date, cleared failure/retry markers, restored eligible access, and one transaction ID.
7. Record the incident cause and close the monitoring gap.

## Screenshot plan and what each proves

1. `gateway-health-webhook-monitor.png`: combined Paddle/PayPal/Stripe cards plus Webhook Event Log filters. Proves the current UI exposes enabled/status, subscription count, last remembered event, and filters. Staging is intentionally disabled/unconfigured; it does not prove production health.
2. `stripe-dual-webhook-health.png`: expanded Stripe card. Proves the UI distinguishes official Woo Stripe and ArraySubs secondary endpoint status/URLs and exposes the processed-event monitor.
3. `paypal-webhook-endpoint.png`: expanded PayPal card. Proves gateway-specific endpoint and declared capability visibility; it does not prove delivery or remote app subscription.
4. `webhook-cleanup-job-log.png`: Scheduled-Job Logs with successful Cleanup Webhook Events rows. Proves the maintenance action executes on this staging site and reinforces the 30-day retention boundary.

An unannotated Paddle expansion remains a research artifact and should not be published merely to inflate screenshot count.

## Internal links

- Payment-gateway feature anchor: `/deals/arraysubs/features/#payment-gateways`
- Gateway Health recipe: `/deals/arraysubs/use-cases/recipes/gateway-health-monitor/`
- Stripe setup/SCA recipe: `/deals/arraysubs/use-cases/recipes/stripe-automatic-billing-sca/`
- Member payment update recipe: `/deals/arraysubs/use-cases/recipes/member-update-payment/`
- Stripe recurring architecture: `/payments-and-compliance/stripe-recurring-payments-for-woocommerce-how-they-work-and-what-to-test/`
- PayPal architecture: `/payments-and-compliance/paypal-recurring-payments-for-woocommerce-agreements-renewals-and-limits/`
- Paddle MoR architecture: `/payments-and-compliance/paddle-merchant-of-record-for-woocommerce-subscriptions/`
- SCA recovery: `/payments-and-compliance/sca-and-3d-secure-for-subscription-renewals/`
- Token/update model: `/payments-and-compliance/subscription-payment-tokens-and-card-updates-explained/`
- Failure recovery pillar: `/payment-recovery/failed-subscription-payment-recovery-for-woocommerce/`
- Pricing CTA: `/deals/arraysubs/pricing/`

## Recommended 5,000–7,000-word outline

1. Direct answer and key takeaways.
2. What a webhook does—and does not do.
3. Webhooks versus scheduled actions versus API reconciliation, with ownership matrix.
4. The six-stage event pipeline: create, deliver, verify, correlate, mutate, reconcile.
5. Gateway Health: what its cards/log prove and what they omit.
6. Stripe’s two-route architecture and exact current event inventory.
7. PayPal app scoping, return confirmation, and exact inventory.
8. Paddle processing stages and exact current inventory.
9. WooCommerce outbound webhooks versus inbound provider callbacks.
10. Signature verification and secret-handling checklist.
11. Duplicate delivery, races, ordering, replay, and idempotent business mutations.
12. Correlation rules for provider objects, Woo orders, ArraySubs subscriptions, and customers.
13. Failure-symptom table: money exists/local unpaid; local paid/provider missing; duplicate orders; stale next date; wrong subscription; last-webhook never; empty event log.
14. Reconciliation runbook and worked incident.
15. Monitoring/SLO design without inventing universal numeric thresholds.
16. Retention, privacy, and safe support evidence.
17. Test matrix across Stripe, PayPal, Paddle, delayed/duplicate/out-of-order/rejected/unhandled cases.
18. When ArraySubs Pro helps, when custom observability is still required.
19. FAQ, conclusion, and CTA.

## Claims to avoid

- “A 200 response means the event was fully processed.”
- “Gateway Health shows every webhook delivery or rejected payload.”
- “ArraySubs guarantees exactly-once processing.”
- “Webhook order is guaranteed.”
- “The scheduled reconciliation job repairs missed events automatically.”
- “Every provider event listed in provider docs is handled by ArraySubs.”
- “Never in Last Webhook proves the endpoint received nothing.”
- “A webhook alone proves money movement without provider transaction verification.”
## 2026-07-22 completion audit

Rechecked the finished article against ArraySubs 1.8.11 and ArraySubs Pro 1.1.2, preserved the accepted screenshot set, confirmed the Gateway Health and event-ledger claims remain bounded by the documented disabled/unconfigured staging state, and added a visible verification-scope, limitations, and update-log section. No authentic provider webhook, secret rotation, provider replay, or renewal payment was performed during this completion audit.

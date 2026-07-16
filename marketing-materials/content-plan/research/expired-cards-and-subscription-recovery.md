# Research brief: Expired Cards and Subscription Recovery

## Research record

- **Article:** A036 — Expired Cards and Subscription Recovery
- **Research date / last verified:** 2026-07-16
- **Focus keyword:** `expired card subscription recovery`
- **Search intent:** Subscription operators need to understand what happens to a stored payment token when a card expires, prevent avoidable failures, give customers a secure update path, and confirm that recovery restored every local and remote state.
- **Evidence scope:** A036 brief; publishing standard; ArraySubs 1.8.11 and ArraySubs Pro 1.1.2 source; current official WooCommerce, Stripe, PayPal, Paddle, and PCI SSC material.
- **Test limitation:** Source and UI behavior were inspected. No real card was allowed to expire and no live gateway recovery was executed. Label screenshots as current first-party UI observations.

## 40–60-word direct answer

> An expired card does not make the subscription itself unusable, but it can make the saved payment token unable to fund the next renewal. Recovery requires a secure gateway-hosted update or reauthorization, a correctly timed retry, and reconciliation of the renewal order, subscription status, access, and next billing date after payment succeeds.

This is 52 words. Name WooCommerce and ArraySubs within the next sentence.

## Answer-first editorial thesis

Treat expiration as a five-part workflow, not merely an email problem:

1. **Detect:** know that the method is expiring or that a payment failed because it expired.
2. **Notify:** send the customer to a trusted update path without exposing card data.
3. **Update:** let the gateway vault replace or reauthorize the payment method.
4. **Collect:** retry or let the provider retry the unpaid renewal.
5. **Reconcile:** verify paid order, active subscription, restored access, clean failure state, and correct next renewal.

An automatic network account update and a customer portal update are different capabilities. The article must say so explicitly.

## Key takeaways

- Store gateway tokens and display only safe card descriptors; never store security codes.
- A network account updater is provided by a payment network/gateway relationship, not by ArraySubs.
- Pre-expiry notice support differs by gateway; do not imply every gateway exposes card expiration.
- A new payment method is not proof that an old invoice was paid—collection and reconciliation are separate checks.
- The safest update flow is gateway-hosted and returns the customer to a clear recovery state.

## Verified primary sources

All web sources accessed 2026-07-16.

| Claim | Primary source | Editorial use |
| --- | --- | --- |
| WooCommerce customers can change a subscription payment method only when the gateway supports the relevant capability; changing it does not automatically cover every historical failed order. | [WooCommerce: Subscriber payment methods](https://woocommerce.com/document/subscriptions/customers-view/subscriber-payment-methods/) | Separate method update from invoice recovery. |
| WooCommerce's troubleshooting framework asks operators to distinguish token, gateway, webhook, scheduled action, and order-state failures. | [WooCommerce: Subscription troubleshooting framework](https://woocommerce.com/document/subscriptions/troubleshooting-framework/) | Build the support checklist. |
| Stripe describes automatic card updates as a network-supported Stripe feature; availability and results are not guaranteed for every card. | [Stripe: Cards overview](https://docs.stripe.com/payments/cards/overview) | Define account updater without attributing it to ArraySubs. |
| Stripe's customer portal can let customers update payment methods in a Stripe-hosted flow. | [Stripe: Customer portal](https://docs.stripe.com/customer-management) | Support the secure self-service recommendation. |
| PayPal subscription payment failures can produce an outstanding balance and provider-side retries/suspension. | [PayPal: Payment failure retry](https://developer.paypal.com/docs/multiparty/subscriptions/customize/payment-failure-retry/) | Explain reauthorization and local/remote alignment. |
| Paddle provides customer-portal flows for updating payment details and documents payment-recovery states. | [Paddle: Update payment details](https://developer.paddle.com/build/subscriptions/update-payment-details/), [Paddle: Payment recovery](https://developer.paddle.com/concepts/retain/payment-recovery-dunning/) | Show that Paddle owns sensitive update UI and dunning. |
| Card verification codes are sensitive authentication data and cannot be stored after authorization. | [PCI SSC FAQ 1533](https://www.pcisecuritystandards.org/faqs/1533/) | Security boundary for screenshots, logs, and support procedures. |

## Definitions

- **Payment token:** a gateway-scoped reference to vaulted payment credentials; it is not the full card number.
- **Card descriptor:** safe customer-facing metadata such as brand, last four digits, and expiration.
- **Network account updater:** a gateway/network service that may refresh changed card credentials without customer action.
- **Portal update:** a deliberate customer action in a merchant or gateway-hosted account screen.
- **Reauthorization:** a new customer approval/mandate when the old automatic-payment agreement cannot simply be edited.
- **Recovered renewal:** a verified successful charge plus consistent order, subscription, access, and schedule state.

## Current ArraySubs product truth

### Payment-method portal behavior

Current Pro `PaymentMethodCoordinator` supports updates for active, trial, and on-hold subscriptions. Pending-cancellation subscriptions are excluded.

| Gateway | Current customer path | Caveat |
| --- | --- | --- |
| Stripe | Creates a Stripe Billing Portal session. | The update happens in Stripe, not in an ArraySubs card form. |
| Paddle | Creates/uses a Paddle customer portal path. | Paddle controls the sensitive payment UI and provider recovery. |
| PayPal | Returns a `reauthorize` result and message that new authorization is required. | Current code does not supply a seamless hosted update URL; do not promise a one-click PayPal card update. |

The customer portal can show brand, last four digits, expiry, and an `Expired` badge when those descriptors exist. This is display metadata, not card storage.

### Stripe event handling

The current Stripe delegate maps `payment_method.updated`, `payment_method.automatically_updated`, and `payment_method.card_automatically_updated`. When processed successfully, it updates safe method metadata and clears local retry/failure state.

This supports an editorial distinction:

```text
Stripe/network may refresh the credential
              ↓ webhook
ArraySubs updates local descriptors and recovery state
              ≠
ArraySubs operating its own network updater
```

### Pre-expiry notice caveat

- ArraySubs has a card-expiring email class and a `customer.source.expiring` Stripe event path.
- The email fires from the `arraysubs_card_expiring` action.
- No current scheduled local scan of stored card expirations was found.
- PayPal and Paddle integrations currently declare no local card-expiry-notice support.

Therefore write: **“ArraySubs can react to a supported gateway expiration event”**, not **“ArraySubs automatically scans all cards and warns every customer.”**

### Retry and recovery caveat

The core classifier can identify `expired_card`, but the current local Stripe retry schedule is fixed rather than decline-adaptive. Updating the method, collecting the unpaid order, and clearing/reconciling failure state are related but distinct actions.

## Practical recovery decision table

| Evidence | Operator action | Customer action | Completion proof |
| --- | --- | --- | --- |
| Expiry warning, renewal not yet due | Send one calm pre-expiry notice with trusted portal link. | Update/reauthorize. | New safe descriptor/webhook recorded; next renewal still scheduled. |
| Renewal failed as expired card | Keep customer inside defined grace; send direct update and Pay Now path. | Update method, then pay/retry. | Renewal order paid; subscription and access restored. |
| Method updated but invoice still unpaid | Do not call it recovered. Retry under gateway policy or provide Pay Now. | Complete any authentication/payment step. | Successful charge plus local/remote state agreement. |
| Provider says active but local site stays on-hold | Inspect webhook/action/log trail and reconcile idempotently. | Usually none until diagnosis. | One paid renewal, no duplicate charge, correct next date. |
| PayPal agreement cannot be edited | Explain reauthorization honestly. | Authorize a new billing agreement/path. | New agreement attached and future automatic billing verified. |

## Operational checklist

- Confirm the subscription's gateway and whether that integration supports payment-method change.
- Verify the failed renewal order and actual provider reason; avoid assuming every expiration badge caused the failure.
- Use only HTTPS and gateway-hosted collection/update UI.
- Never request PAN or CVC by email, chat, screenshot, or support ticket.
- Include a recognizable domain, subscription/product context, deadline, support contact, and plain-text fallback in notices.
- After an update, inspect the payment event, renewal order, subscription status, access/role, next payment date, and remote subscription/agreement.
- Check for duplicate attempts before manual collection.
- Redact customer email, address, payment IDs, tokens, and logs in screenshots.

## Suggested worked example

Use a fictional subscriber whose card expires July 31 and whose renewal is August 3:

1. A supported gateway sends an expiry event on July 20.
2. The store sends a notice linking to the gateway-hosted portal.
3. If the customer updates July 22, verify the descriptor/webhook but do not create a charge early.
4. If no update occurs and August 3 fails, issue the failed-payment notice and honor the configured grace policy.
5. Once payment succeeds, verify the paid renewal, active access, cleaned failure metadata, and next August/September date.

Use this to show that “updated” and “recovered” are separate milestones.

## Screenshot opportunities on mirror-help.arrayhash.com

Capture only current-version states that genuinely exist. Add numbered markers and a caption with ArraySubs/Pro versions and verification date.

1. **Customer subscription view:** `/my-account/subscriptions/` → open a subscription; mark (1) card brand/last four, (2) expiration or Expired badge, (3) update payment method, (4) Pay Now if present.
2. **WooCommerce email settings:** WooCommerce → Settings → Emails → ArraySubs card-expiring or payment-failed email; mark enablement, recipient/audience, subject, and heading fields.
3. **Subscription detail:** `/wp-admin/admin.php?page=arraysubs-mainadmin#/subscriptions/detail/{id}`; mark status, gateway, renewal order, and next-payment date.
4. **Gateway settings/logs:** `/wp-admin/admin.php?page=arraysubs-mainadmin#/settings/gateways`; show where operators start webhook/log diagnosis without revealing keys.
5. **Renewal Failures audit:** `/wp-admin/admin.php?page=arraysubs-mainadmin#/audits/renewal-failures`; mark category, attempt count, next retry, and action controls. Redact customer data.

Do not fabricate an expired card on the production-like mirror. If the state is unavailable, use a code-informed concept illustration instead.

## Varied non-chart visual ideas

- **Secure update scene:** customer at a laptop moving from an expired-card warning to a branded gateway portal, with trust/shield motifs.
- **Token-not-card cutaway:** physical card → gateway vault → opaque token → WooCommerce renewal, using shapes and short labels.
- **Five-step recovery path:** detect, notify, update, collect, reconcile as distinct illustrated stations rather than a graph.
- **Split-screen concept:** “Method updated” on the left and “Renewal recovered” on the right, connected by a still-unpaid invoice.
- **Gateway logo lane:** Stripe, PayPal, and Paddle marks in separate portal/reauthorization paths; use logos only factually and follow brand rules.
- **Support privacy scene:** agent screen with safe last-four data visible and PAN/CVC fields crossed out.

## Recommended long-form outline

1. Direct answer and key takeaways.
2. What actually expires: card, vault credential, token, and agreement distinctions.
3. Network updater versus customer portal update.
4. Before renewal: detection, pre-expiry communication, and gateway limitations.
5. After failure: update, retry/authentication, grace, and restoration.
6. Gateway-specific ArraySubs paths and version caveats.
7. Decision table and worked example.
8. Security, screenshot privacy, and support checklist.
9. Monitoring and proof of recovery.
10. Limitations, source notes, and CTA after the full answer.

## Internal links

- `/deals/arraysubs/features/#subscription-operations`
- `/deals/arraysubs/use-cases/recipes/lenient-dunning-grace/`
- `/deals/arraysubs/use-cases/recipes/strict-dunning-grace/`
- `/deals/arraysubs/use-cases/recipes/auto-downgrade-on-failed-payment/`
- A035 grace-period explainer for access timing.
- A037 email sequence for adaptable copy.
- A038 downgrade guide for the final fallback.
- Later A063 payment-token article for deeper token architecture once published.

## Claims to avoid

- “ArraySubs has a network account updater.”
- “Every expired card causes a failed payment.”
- “Updating the payment method automatically pays every failed renewal.”
- “PayPal supports the same seamless portal update as Stripe.”
- “ArraySubs scans every gateway card and always sends pre-expiry reminders.”
- Any statement that displays or requests full card data or CVC.

## Refresh triggers

- Payment coordinator or portal changes for Stripe, PayPal, or Paddle.
- New scheduled expiration detection or gateway capability flags.
- Changes to webhook event mapping, retry cleanup, or renewal reconciliation.
- PCI SSC guidance changes and quarterly gateway-documentation review.

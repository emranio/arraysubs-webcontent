# Research dossier: Manual vs Automatic Subscription Renewals in WooCommerce (A018)

**Research completed:** 2026-07-13  
**Article brief:** `web-content/content-plan/articles/018-manual-vs-automatic-subscription-renewals-in-woocommerce.md`  
**Primary keyword:** `manual vs automatic subscription renewals`  
**Evidence policy:** official WooCommerce Subscriptions documentation for definitions and extension-specific behavior; current ArraySubs code and manuals for tier and gateway claims. No invented payment-success or churn benchmarks.

## Direct-answer conclusion (40–60 words)

> Automatic renewal charges a compatible saved payment method or provider subscription without requiring the customer to revisit checkout. Manual renewal creates an invoice/order the customer must open and pay. Automatic suits predictable high-frequency consumer billing; manual suits approvals, bank transfer, invoices, or unsupported automatic methods—but adds collection delay and customer action every cycle.

## Quick comparison

| Dimension | Automatic renewal | Manual renewal |
| --- | --- | --- |
| Customer action each cycle | Normally none; authentication/recovery may still be required | Customer opens renewal order and pays |
| Payment requirement | Compatible automatic gateway/method and valid stored/remote context | Any method allowed on the authenticated order-pay flow, subject to engine/store rules |
| Timing | Site or provider attempts around the due date | Collection occurs when customer completes payment |
| Failure path | Gateway error, retry, SCA/3DS, payment update, grace/dunning | Unpaid invoice, reminders, customer support, grace/on-hold policy |
| Payment choice at renewal | Usually tied to stored/provider method | Customer can choose an available method when paying |
| Support load | More payment-method/webhook/retry troubleshooting | More invoice chasing and “how do I pay?” support |
| Cash timing | More predictable if the method succeeds | More variable due to customer response |
| Best fit | Frequent, low-touch, replenishment/access | B2B approval, offline payment, low-frequency/high-touch billing |

## Key facts

1. Every WooCommerce gateway can potentially participate in a manual checkout payment, but automatic renewal requires the exact gateway extension and payment method to support recurring/off-session behavior.
2. A gateway brand is not enough: capability can differ by card versus wallet/bank method, country, currency, checkout type, and extension version.
3. Automatic does not mean failure-free. Stored methods expire, authentication can be required, providers/webhooks can be delayed, and retries need a tested recovery path.
4. Manual does not mean “no automation.” The engine can generate an order, email a pay link, apply grace, and update the subscription after payment; the customer still authorizes each cycle.
5. Current ArraySubs boundary: core 1.8.9 supplies manual renewal invoices; Pro 1.1.0 supplies current automatic Stripe, PayPal, and Paddle implementations.

## Workflow: automatic renewal

```text
signup checkout
  → save gateway customer/payment method/mandate or remote subscription context
  → next due event
  → renewal order and site-managed charge OR provider-managed billing event
  → gateway result/webhook
  → order paid/failed
  → subscription next date or retry/grace/recovery
```

The engine must prevent duplicate charging when both a local action and webhook can arrive. It also needs to map delayed or out-of-order provider events to the correct subscription and cycle.

### Two automatic-billing ownership models in current ArraySubs

| Model | Current ArraySubs example | Billing clock | Local responsibility |
| --- | --- | --- | --- |
| ArraySubs-managed | Stripe | Local scheduler/invoice and off-session payment path | create due order, attempt payment, consume result/webhook, recover |
| Gateway-managed | PayPal, Paddle | Provider subscription/schedule | use provider event to create/update local renewal without duplicate local charge |

This table describes current first-party architecture, not every possible provider integration. Verify the live implementation and gateway account.

## Workflow: manual renewal

```text
next invoice event
  → pending renewal order
  → renewal email + My Account pay action
  → authenticated customer reviews order
  → selects an available checkout method
  → successful payment updates order/subscription
```

The customer’s action can be commercially desirable where each cycle needs purchase-order approval, invoice review, bank transfer, or a fresh payment choice. It is operationally expensive when billing is frequent and the customer expects “set and forget.”

## Payment token, SCA, and security considerations

- A Woo/WordPress database should not store raw card numbers. Automatic integrations normally store provider tokens/IDs or mandates, with sensitive payment data held by the provider.
- “Saved card” does not automatically prove off-session recurring capability.
- Strong Customer Authentication or 3DS can require customer action after an attempted automatic renewal. The engine needs a secure recovery URL and clear notice.
- Payment-method update must affect the correct future agreement/provider context.
- Webhook signatures, event idempotency, secrets, API permissions, and log redaction must be tested.
- Switching auto-renew off should not delete transaction history or accidentally charge through a provider-owned schedule.

This is general technical information, not PCI, security, or regulatory advice.

## Cash-flow and operations model

Do not claim automatic renewal always has a higher success rate without store data. Use a transparent receivables model:

```text
expected collected by day D = invoices due × average invoice value × observed paid-by-day-D rate
manual collection labor = invoices due × average handling/chase minutes ÷ 60 × loaded hourly cost
automatic recovery labor = failures × average investigation/recovery minutes ÷ 60 × loaded hourly cost
```

Hypothetical example, not a benchmark:

- 100 renewals × $40 = $4,000 due.
- If 84 are paid by day 0, collected is $3,360.
- If 10 more pay by day 7, cumulative collection is $3,760.
- Six remain unresolved; classify them by decline, authentication, invalid method, manual nonresponse, or technical error before changing policy.

The useful chart is a cumulative paid-by-day curve split by renewal mode and failure reason, using actual store data. A single “success rate” hides delayed manual payment and recovered automatic failures.

## Model recommendations

### Prefer automatic when

- customers expect uninterrupted, low-touch access or replenishment;
- billing is monthly/weekly or the subscriber base is large;
- the exact gateway/method and region are supported;
- the team can operate webhooks, logs, retries, payment updates, and reconciliation;
- the customer clearly consented to automatic recurring charges.

### Prefer manual when

- each cycle requires a buyer’s approval, purchase order, invoice review, or bank transfer;
- amounts or scope are reviewed each period;
- the automatic method is unsupported and manual collection is acceptable;
- billing is infrequent/high-value and support is deliberately high touch;
- policy requires the customer to affirm each payment.

### Consider offering a controlled toggle when

- the engine and gateway can safely detach/reconnect automatic context;
- the page and portal explain the consequences;
- turning automatic off creates a valid manual renewal rather than silently ending service;
- re-enabling requires a valid payment method and cannot reactivate an ended subscription without policy.

Current ArraySubs Pro includes an auto-renew/manual-fallback flow. Code/manual evidence says disabling auto-renew can lead to manual invoice collection; re-enabling requires compatible valid payment context. Test each gateway because provider-managed subscriptions have distinct lifecycle implications.

## Failure and recovery matrix

| Failure | Automatic response | Manual response | Evidence to inspect |
| --- | --- | --- | --- |
| Insufficient funds/decline | retry policy, notice, method update | payment attempt fails; customer retries/chooses another method | order notes + gateway result |
| Authentication required | secure customer action flow | customer authenticates in checkout | provider status/event + customer email |
| Expired/invalid method | update method then retry | choose another available method | token/remote ID + order result |
| Webhook delay/failure | reconcile provider and local state; do not double charge | usually not the initial trigger, but payment result can still be webhook-based | event ID, signature/log, order state |
| Customer does nothing | not normally applicable until recovery action | reminders, grace, on hold/cancel policy | invoice delivery, portal, action logs |
| Scheduler delay | renewal attempt/invoice late | invoice late | Action Scheduler and cron evidence |

## ArraySubs code truth

- `arraysubs/src/Features/RecurringBilling/Services/PaymentProcessor.php`: already-paid and zero-total guards; Pro automatic filters; core manual pay-URL fallback.
- `arraysubs/src/Features/RecurringBilling/Services/RenewalProcessor.php`: due-order processing and pending order linkage.
- `arraysubspro/src/Features/AutomaticPayments/`: current automatic gateway implementations and auto-renew controls.
- `user-manual/markdowns/checkout-and-payments/automatic-payments/README.md`: current gateway architecture/capability explanation.
- `user-manual/markdowns/checkout-and-payments/automatic-payments/auto-renew-and-manual-fallback.md`: current toggle and fallback behavior.
- `user-manual/markdowns/gateway-health/README.md`: first-party monitoring UI.

Avoid a broad claim such as “all Stripe/PayPal/Paddle methods work.” State that ArraySubs Pro has current implementations for those providers and instruct the reader to verify the exact feature/method.

## Limitations and unknowns

- No live gateway transaction or recovery was run for this dossier.
- Official WooCommerce Subscriptions documentation is product-specific, not proof of every plugin.
- Gateway capability, SCA, refunds, currency/country, wallet/bank methods, and webhook ownership change over time.
- Cash-flow examples are hypothetical; the article must not invent conversion, success, churn, or labor benchmarks.
- Manual payment can be better for intentional approval workflows; avoid framing it as universally inferior.
- Automatic renewal terms and cancellation/reminder duties require jurisdiction-specific legal review.
- Access and fulfillment during grace must be defined by store policy and tested.

## Five FAQ answers

### What is a manual subscription renewal in WooCommerce?

The subscription engine creates a renewal order/invoice, but the customer must open its pay link or My Account action and complete checkout. The subscription advances after that order is paid.

### What is an automatic subscription renewal?

The engine or payment provider attempts the recurring charge using compatible saved/remote payment context without a fresh checkout choice. Results or webhooks update the renewal order and subscription.

### Can every WooCommerce gateway charge automatic renewals?

No. Manual payment can use broadly available checkout methods, but automatic renewal requires explicit support in the exact gateway extension and payment method. Verify country, currency, feature, and version.

### What happens if a customer turns off auto-renew?

It depends on the engine/provider. In the current ArraySubs Pro flow, eligible subscriptions can fall back to manual renewal, and re-enabling requires compatible payment context. Verify whether provider-managed billing is also changed.

### Which renewal mode is better for B2B subscriptions?

Manual often fits purchase-order and invoice-approval workflows; automatic fits standardized, high-volume agreements with clear authorization. Choose based on payment process, billing frequency, support capacity, and gateway coverage—not the B2B label alone.

## Visual plan

Use flat ArraySubs palette and clear shapes; no gradients, glow, 3D, or pseudo-text.

1. Hero split: automatic calendar/card loop versus human approving invoice.
2. Quick-comparison table in HTML.
3. Automatic and manual parallel swimlanes.
4. Site-managed versus provider-managed billing flow.
5. Human-centered SCA recovery diagram.
6. Cumulative collection line/bar chart only with actual dated data; hypothetical sample must be clearly labeled.
7. Failure-reason stacked bar template with blank/real values, not invented values.
8. Decision tree for business model choice.
9. ArraySubs Free/manual versus Pro/automatic boundary card dated 2026-07-13.
10. Dated screenshots of automatic settings, portal toggle, gateway health, and manual pay action.

## Internal links

- Commercial overview: `/deals/arraysubs/`
- Billing operations: `/deals/arraysubs/features/#subscription-operations`
- Recipes: `/deals/arraysubs/use-cases/recipes/switch-at-renewal/`, `/deals/arraysubs/use-cases/recipes/downgrade-with-credit/`, `/deals/arraysubs/use-cases/recipes/subscription-notes-timeline/`
- Siblings: A017 renewal lifecycle, A019 record types, A020 synchronization.

## Primary sources (accessed 2026-07-13)

1. WooCommerce, “Understanding the Subscription Renewal Process”: https://woocommerce.com/document/subscriptions/renewal-process/
2. WooCommerce, “Subscription Payment Gateways”: https://woocommerce.com/document/subscriptions/payment-gateways/
3. WooCommerce, “Testing Subscription Renewal Payments”: https://woocommerce.com/document/subscriptions/testing-subscription-renewal-payments/
4. WooCommerce, “Subscriptions Troubleshooting Framework”: https://woocommerce.com/document/subscriptions/troubleshooting-framework/
5. ArraySubs payment routing: `arraysubs/src/Features/RecurringBilling/Services/PaymentProcessor.php`
6. ArraySubs renewal processor: `arraysubs/src/Features/RecurringBilling/Services/RenewalProcessor.php`
7. ArraySubs Pro automatic payments: `arraysubspro/src/Features/AutomaticPayments/`
8. ArraySubs automatic-payment manual: `user-manual/markdowns/checkout-and-payments/automatic-payments/README.md`
9. ArraySubs auto-renew fallback manual: `user-manual/markdowns/checkout-and-payments/automatic-payments/auto-renew-and-manual-fallback.md`


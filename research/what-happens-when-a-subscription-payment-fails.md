# Research brief: What Happens When a Subscription Payment Fails?

## Research record

- **Article:** A032
- **Research date / last verified:** 2026-07-13
- **Focus keyword:** `what happens when subscription payment fails WooCommerce`
- **Intent:** Direct-answer timeline for merchants and customers who need to know what changes immediately, what may retry, and when access can end.
- **Evidence scope:** Current official WooCommerce and gateway documentation; ArraySubs 1.8.9 and ArraySubs Pro 1.1.0 source; current user manual/screenshots.
- **No live failure was simulated.** UI, email delivery, and exact scheduler ordering still require sandbox verification.

## Direct-answer conclusion

> When a subscription payment fails, the renewal order remains unpaid or becomes failed, the reason is logged, and the customer is prompted to fix or pay it. With ArraySubs defaults, access stays active for three grace days, then the subscription moves on-hold; cancellation follows seven days later if it remains unpaid. Gateway retry behavior varies.

This is 55 words.

## Editorial thesis

The article should answer the question as a timeline, then branch by payment mode. It must keep four states separate:

- **renewal order status**: pending, failed, on-hold, paid, cancelled;
- **subscription status**: active/trial, on-hold, cancelled;
- **gateway status**: active, errored, past due, suspended, etc.;
- **access/fulfillment outcome**: determined by the store's rules, not the word “failed” alone.

It also must distinguish WooCommerce Subscriptions' default retry system from current ArraySubs behavior. They are different products.

## Current ArraySubs timeline

### Before the due date

1. A renewal reminder can be scheduled; current default is three days before the stored due date.
2. A pending renewal order is normally generated at the configured lead time; current default is six hours before due.
3. Automatic-payment subscriptions do not receive a “please pay this invoice” email before the off-session charge. Manual/auto-renew-disabled subscriptions do.

### At the due date

| Payment mode | What happens |
| --- | --- |
| Manual/offline | The renewal order waits for customer/admin payment; there is no automatic card attempt |
| Stripe automatic | ArraySubs attempts the stored method through the official WooCommerce Stripe gateway integration |
| PayPal automatic | PayPal manages the remote billing schedule; ArraySubs waits for payment/failure webhooks |
| Paddle automatic | Paddle manages the remote billing schedule; ArraySubs waits for transaction/subscription webhooks |

### Immediately after an automatic failure

Current ArraySubs local failure handling can:

- record the failure time and gateway message;
- normalize a category such as insufficient funds, expired card, authentication required, or processing error;
- mark the renewal order `failed` if appropriate;
- add private order/subscription notes and Pro audit data;
- send customer and admin payment-failed emails when enabled;
- include the amount, customer-friendly reason when known, Pay Now link, and account link;
- keep the subscription active during its configured active grace window;
- queue the next local retry for Stripe when retry limits allow.

If the system fails before it has a usable renewal order—such as renewal-order creation failure—a separate fallback path can put the subscription on-hold immediately. The article should not promise that every technical failure follows the clean payment-decline timeline.

### Local Stripe retry path

Current Stripe retry configuration is:

```text
Maximum automatic retries after the first failure = 3
Interval between retry scheduling = 24 hours
```

Before any retry, ArraySubs verifies with the gateway that a missed webhook did not hide a successful charge. If a charge is found, it reconciles the order without charging again.

There is a boundary caveat: the default third retry is scheduled around day 3, the same boundary at which the hourly overdue checker can move the subscription on-hold and unschedule renewal actions. Exact ordering can depend on Action Scheduler execution time. The article should say “up to three current Stripe retries” and tell merchants to verify job history rather than promise all three always execute before on-hold.

### Active grace

With current defaults, an active/trial subscription with an unpaid renewal order remains active until it is more than three days past its stored next-payment date. The hourly overdue checker then changes it to on-hold and records `_on_hold_date`.

“Active subscription” is a status fact. Whether a shipment should still release or expensive service should continue is an operational policy that needs separate controls.

### On-hold

On-hold stops renewal scheduling in the current status integration and can restrict access through the store's access rules. The customer can still pay the open renewal while the subscription is recoverable. A successful payment:

- marks/recognizes the order as paid;
- clears pending-order, on-hold, retry, and failure state;
- advances the next payment from the original scheduled due date;
- reschedules invoice and renewal actions;
- changes the subscription back to active;
- sends payment-success communication.

### Cancellation

With the default additional seven-day on-hold period, the total default path is approximately ten days after the due date:

```text
Due date + 3 active-grace days + 7 on-hold days = cancellation threshold
```

Because the overdue job is hourly and checks strict date comparisons, the visible transition can occur after the exact threshold. Cancellation clears future next-payment scheduling. An optional, validly configured auto-downgrade can intervene at an eligible cancellation transition and reactivate a fallback plan instead.

## Simple timeline graphic data

Use this as the base for a flat timeline; values are current defaults, not universal recommendations.

| Relative time | Renewal order | Subscription | Customer action |
| --- | --- | --- | --- |
| Day −3 | Not necessarily created yet | Active | Renewal reminder can send |
| Hour −6 | Pending renewal order created | Active | Manual payer may receive invoice |
| Day 0 | Automatic attempt fails / manual invoice remains unpaid | Active | Read failure email; pay/authenticate/update method |
| Day 1 | Stripe retry may run | Active | Fix payment method before retry |
| Day 2 | Stripe retry may run | Active | Pay open order or update method |
| Around day 3 | Third retry and overdue transition can be near same scheduler boundary | Active → On-Hold if still unpaid | Pay promptly; access may become restricted |
| Days 3–10 | Unpaid renewal remains | On-Hold | Pay open order; contact support if needed |
| After total grace | Unpaid/cancelled renewal context | Cancelled, unless an eligible downgrade changes the outcome | Follow store reactivation/resubscribe policy |

## ArraySubs versus WooCommerce Subscriptions

| Topic | Current ArraySubs | WooCommerce Subscriptions official documentation |
| --- | --- | --- |
| Retry policy | Stripe: fixed current local config of up to 3 retries at 24-hour intervals; PayPal/Paddle remote-owned | Optional failed-payment retry system; documented default has five rules over seven days and is customizable by code |
| Subscription during first failure | Remains active through configured grace for ordinary payment-attempt failure | Retry rules can set subscription/order statuses per rule |
| Manual renewal | Pending/open order and customer Pay Now path | Customer logs in and pays through normal checkout; subscription can go on-hold under its renewal process |
| Gateway ownership | Stripe local; PayPal/Paddle remote | Depends on gateway and whether the gateway controls schedule |
| Access | ArraySubs membership/access rules read subscription status/configuration | Woo can assign inactive subscriber roles; extension behavior varies |

Do not use Woo's five-rule retry schedule as ArraySubs product copy.

## Failure reason → customer next step

| Reason/category | Plain-language next step |
| --- | --- |
| Insufficient funds | Use another method or ensure funds are available before a permitted retry |
| Expired card | Update the payment method; repeating the unchanged card will not fix it |
| Incorrect CVC/card data | Re-enter correct details or use another method |
| Authentication required | Open the secure payment/authentication link and complete the required step |
| Generic issuer decline | Contact the issuer or use another method; the store may not know the private reason |
| Processing error | Try again later; merchant should check gateway and WooCommerce logs |
| Missing payment token/gateway unavailable | Reconnect/update payment method or use the manual invoice path |
| Unknown | Preserve the raw code/message and investigate before aggressive retries |

Never expose sensitive gateway payloads or imply the merchant knows a private issuer reason it does not have.

## Worked examples

### Recovered on day 2

Assume a monthly renewal due July 15 fails, then is paid July 17.

```text
Scheduled renewal date = July 15
Payment recovery date = July 17
Next monthly date basis = July 15 + one month = August 15
```

Current ArraySubs advances from the scheduled due-date basis stored on the order, so late payment does not automatically move the billing anchor to August 17.

### Grace calculation

Merchant settings:

- active grace = 5 days;
- on-hold before cancel = 10 days.

```text
Total configured overdue window = 5 + 10 = 15 days
```

Actual status transitions happen on a later overdue-check run. This does not define a legal notice period or guarantee access; it is scheduling arithmetic.

## Merchant response checklist

1. Open the affected subscription and renewal order.
2. Confirm the order is genuinely unpaid at the gateway before retrying.
3. Identify automatic/manual/PayPal/Paddle ownership.
4. Read raw gateway error, normalized category, retry count, and next attempt.
5. Confirm customer failure email and Pay Now/payment-update route are usable.
6. Check active-grace/on-hold dates and access/fulfillment rules.
7. Use the supported manual Retry action when appropriate; it runs pre-charge verification.
8. If gateway state differs, use supported sync/reconciliation before another charge.
9. After payment, verify order paid, subscription active, next date/jobs advanced, and failure metadata cleared.
10. Do not use “Mark Resolved” as a payment fix; it only dismisses the audit item.

## Limitations and unknowns

- No browser test confirmed exact UI copy, email rendering, or delivery.
- Exact scheduler ordering near day-3 retry/on-hold boundary is a current point to verify.
- Gateway configurations can change remotely; PayPal/Paddle published defaults are not guaranteed store settings.
- ArraySubs' normalized categories do not cover every possible gateway error.
- Access while active or on-hold depends on configured rules and cached/integrated systems.
- Already-created shipments or external provisioning may not reverse when status changes.
- A cancelled subscription may need a distinct reactivation/resubscribe policy; do not promise payment after cancellation automatically restores it.

## FAQ answers

### Does ArraySubs cancel a subscription immediately after one failed payment?

Usually no. For an ordinary renewal-payment failure, current defaults keep it active for three days, then on-hold for seven more before cancellation. A technical failure that cannot create/process a renewal order can follow a different fallback path.

### Will ArraySubs retry the card automatically?

For current Stripe-managed renewals, ArraySubs can schedule up to three local retries 24 hours apart. PayPal and Paddle control their remote retry policies. Manual renewals wait for customer/admin payment.

### Can the customer keep access after a failure?

The subscription remains active during the configured active grace window. On-hold may restrict access according to the store's rules. Merchants should state their exact service/fulfillment policy rather than promise universal access.

### What if the customer was already charged but WooCommerce says failed?

Do not retry blindly. Current ArraySubs asks the gateway for a recent charge before retrying and can reconcile a missed webhook. Operators should also compare gateway transaction data, the renewal order, and logs.

### Does late payment change the next renewal date?

Current ArraySubs advances from the scheduled due-date basis stored on the renewal order, so a payment recovered two days late normally keeps the original billing anchor rather than shifting it two days.

## Visual ideas

1. **Horizontal timeline:** day −3, hour −6, day 0, day 1/2/3, on-hold, cancellation.
2. **Four-state swimlane:** order, subscription, gateway, access/customer action.
3. **Failure-action matrix:** reason → retry/update/authenticate/escalate.
4. **Default-versus-configured bar:** active grace + on-hold days as two adjacent segments, no gradients.
5. **Annotated subscription recovery detail:** `user-manual/markdowns/billing-and-renewals/recovery-and-grace-flows.ASSETS/03-subscription-recovery-detail-annotated.png`.
6. **Annotated failure timeline:** `user-manual/markdowns/audits-and-logs/renewal-failures.ASSETS/04-subscription-failure-timeline-annotated.png`.

## Internal-link suggestions

- Commercial hub: `/deals/arraysubs/features/#subscription-operations`
- Recipe: `/recipes/arraysubs/lenient-dunning-grace/`
- Recipe: `/recipes/arraysubs/strict-dunning-grace/`
- Recipe: `/recipes/arraysubs/auto-downgrade-on-failed-payment/`
- Related A031: `/blogs/failed-subscription-payment-recovery-for-woocommerce/`
- Related A033: `/blogs/subscription-dunning-strategy-timing-messages-and-stop-rules/`
- Related A034 using its published content-plan slug.

## Product-truth files inspected

- `arraysubs/src/Features/RecurringBilling/Services/RenewalProcessor.php`
- `arraysubs/src/Features/RecurringBilling/Services/Hooks.php`
- `arraysubs/src/Features/RecurringBilling/Services/PaymentProcessor.php`
- `arraysubs/src/Features/Subscriptions/Services/OrderIntegration.php`
- `arraysubs/src/Features/Emails/Services/EmailManager.php`
- `arraysubs/src/Features/Emails/Emails/PaymentFailedEmail.php`
- `arraysubs/src/Features/Emails/templates/customer-payment-failed.php`
- `arraysubs/src/functions/gateway-helpers.php`
- `arraysubspro/src/Features/AutomaticPayments/Services/Hooks.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Stripe/StripeDelegate.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/PayPal/PayPalGateway.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleGateway.php`
- `user-manual/markdowns/billing-and-renewals/recovery-and-grace-flows.md`
- `user-manual/markdowns/audits-and-logs/renewal-failures.md`
- `user-manual/markdowns/billing-and-renewals/renewal-communication.md`

## Official external sources

All URLs accessed 2026-07-13.

- WooCommerce, **Failed Recurring Payment Retry System**: https://woocommerce.com/document/subscriptions/failed-payment-retry/
- WooCommerce, **Subscription Renewal Process**: https://woocommerce.com/document/subscriptions/renewal-process/
- Stripe, **Card declines**: https://docs.stripe.com/declines/card
- Stripe, **Decline codes**: https://docs.stripe.com/declines/codes
- PayPal, **Payment failures and recovering balances**: https://developer.paypal.com/docs/multiparty/subscriptions/customize/payment-failure-retry/
- Paddle, **Automatic payment failure retries**: https://developer.paddle.com/changelog/2025/default-dunning-payment-recovery/
- Paddle, **subscription.past_due webhook**: https://developer.paddle.com/webhooks/subscriptions/subscription-past-due/

## Drafting guardrails

- Lead with the 40–60-word answer and current default timeline.
- Say “up to three Stripe retries,” not “three retries always happen.”
- Separate order, subscription, gateway, and access states.
- Do not present WooCommerce Subscriptions' retry rules as ArraySubs rules.
- Explain that administrative resolution is not payment recovery.

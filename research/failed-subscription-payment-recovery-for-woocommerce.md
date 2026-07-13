# Research brief: Failed Subscription Payment Recovery for WooCommerce

## Research record

- **Article:** A031
- **Research date / last verified:** 2026-07-13
- **Focus keyword:** `WooCommerce failed subscription payment recovery`
- **Intent:** Pillar guide for designing, operating, and measuring a recovery program without treating every decline or customer equally.
- **Evidence scope:** Current official WooCommerce, Stripe, PayPal, and Paddle documentation; ArraySubs 1.8.9 and ArraySubs Pro 1.1.0 source; current ArraySubs user manual/screenshots.
- **No invented benchmarks:** No recovery-rate, retry-count, grace-period, or churn benchmark is claimed. Numeric values are either current documented defaults/product behavior or clearly labeled arithmetic examples.
- **No live failed-payment simulation was run.** Product findings are source/manual observations.

## Direct-answer conclusion

> Recover failed subscription payments with a coordinated system: classify the failure, avoid duplicate charges, retry only when the decline is recoverable, send a clear payment-update path, preserve access for a defined grace period, and stop or downgrade predictably. Measure recovered customers and value by decline, gateway, attempt, and cohort—not merely how many retries ran.

This is 55 words.

## Editorial thesis

Payment recovery is a lifecycle system, not a retry button. The pillar should connect:

1. prevention and pre-renewal reminders;
2. invoice and charge creation;
3. decline classification;
4. duplicate-charge verification;
5. automatic and manual retry ownership;
6. customer/admin communication;
7. access/grace/on-hold/cancellation policy;
8. downgrade or save paths;
9. observability and measurement;
10. stop rules and experiments.

The article must separate **voluntary churn** (the customer intentionally cancels) from **involuntary churn risk** (a renewal cannot be collected). It should not imply every failed payment becomes churn; a failure can be recovered, remain open, enter on-hold, or end in cancellation.

## Current ArraySubs recovery lifecycle

Default ArraySubs settings and jobs create this high-level path:

```text
Next payment approaches
→ reminder (default 3 days before, if enabled)
→ renewal invoice generated (default 6 hours before due)
→ payment due / automatic attempt or manual invoice
→ success: order paid, failure state cleared, next date advanced
→ failure/unpaid: order remains unpaid/failed; subscriber remains active during grace
→ Stripe local retries: up to 3 retries, 24 hours apart
→ after 3 configured grace days: Active/Trial → On-Hold, if an unpaid renewal exists
→ after 7 more configured days: On-Hold → Cancelled
→ optional configured auto-downgrade can reactivate on an eligible fallback plan
```

Both grace durations and invoice lead time are configurable. The overdue checker runs hourly, so transitions can occur after the exact threshold rather than at the exact second.

## Default does not mean universal recommendation

Current defaults are:

- invoice lead: 6 hours before due;
- renewal reminder: 3 days before due;
- active grace: 3 days after due;
- on-hold period before cancellation: 7 additional days;
- Stripe local retry policy: 3 retries, each 24 hours after the prior failed attempt.

These values describe current ArraySubs behavior, not a best-practice mandate for every product, gateway, price point, or customer segment. A low-cost digital tool, an annual enterprise license, and a perishable shipment should not automatically share one access and fulfillment policy.

## Gateway ownership matrix

| Gateway/mode | Who owns the recurring schedule | Who owns retry timing in current ArraySubs path | Critical operating implication |
| --- | --- | --- | --- |
| Manual/offline renewal | ArraySubs | Customer/admin manually pays/retries the open WooCommerce order | Make the invoice/pay link and deadline explicit |
| Stripe via official Woo gateway delegate | ArraySubs | ArraySubs queues three local retries at 24-hour intervals | Stripe Billing Smart Retries are not automatically applicable because ArraySubs uses plugin-created renewal orders/PaymentIntents, not a Stripe Billing subscription invoice |
| PayPal Subscriptions | PayPal | PayPal's remote plan/payment-failure policy | Local order waits for webhooks; reconcile remote and local state before manual intervention |
| Paddle Billing | Paddle | Paddle's payment-recovery system | Paddle marks remote subscription past due and retries under its configured recovery policy; ArraySubs keeps local lifecycle/grace context |

Official PayPal documentation says its Subscriptions API can retry every five days up to twice per billing cycle and uses `payment_failure_threshold`/`auto_bill_outstanding`. Official Paddle documentation says automatically collected subscriptions can receive up to seven retries over 30 days under its current default recovery. Those are gateway policies, not ArraySubs local Stripe rules, and can change; link rather than hard-code them as merchant recommendations.

## Failure classification

Current ArraySubs normalizes these categories:

| Category | Likely next action | Retry stance |
| --- | --- | --- |
| `insufficient_funds` | Tell customer the payment could not be completed; offer alternate method; a later retry can be reasonable | Potentially recoverable; do not hammer repeatedly |
| `card_declined` / `generic_decline` | Ask customer to contact issuer or use another method; inspect gateway advice | Conditional; issuer advice should guide action |
| `expired_card` | Direct payment-method update | Do not expect time alone to fix it |
| `incorrect_cvc` | Ask customer to re-enter card/security details | Requires customer correction |
| `invalid_card` | Ask for a valid/new method | Hard/customer-action failure |
| `authentication_required` | Send an authentication/pay-now path | Requires customer action; off-session repeat alone is not enough |
| `processing_error` | Retry after a bounded delay and inspect logs | Usually transient, but cap attempts |
| `unknown` | Inspect raw gateway/order/log evidence | Do not automate aggressive retries without evidence |

Stripe's official decline documentation distinguishes network advice such as `try_again_later`, `do_not_try_again`, and `confirm_card_data`. The article should recommend storing/using gateway advice when available rather than treating every decline code as a marketing segment.

## Current ArraySubs failure mechanics

### First automatic failure

When the automatic renewal attempt returns failure, current core:

- stores time, reason, and normalized failure category;
- changes the renewal order to `failed` if it is not already failed/cancelled;
- keeps the subscription active during its active grace window;
- adds a private subscription note;
- schedules the next local retry when the gateway config enables it;
- fires customer/admin email hooks;
- records gateway-specific failure context in Pro.

### Duplicate-charge protection

Before a retry, current `RenewalProcessor` asks the resolved gateway whether the order was already charged—important when a webhook was missed. If it finds a successful remote charge, it marks the order paid and reconciles without charging again.

The same check is forced for a manual retry, even if the retry counter was previously zero. This should be a prominent safety point in the pillar.

### Customer/admin communication

Current ArraySubs registers purpose-built:

- renewal reminder;
- manual renewal invoice;
- payment successful;
- payment failed (customer and admin);
- on-hold;
- cancellation/expiration;
- renewal-requires-verification;
- auto-downgrade emails.

For automatic subscriptions, the “please pay” invoice email is suppressed before the off-session attempt; the customer receives success or failure instead. The failure email can include the normalized reason, amount due, Pay Now link, and account-management link. Generic WooCommerce order emails are suppressed for ArraySubs renewal orders to reduce duplicates.

Email hooks can still run on each failed attempt. Merchants should test frequency and copy so a three-retry policy does not create confusing repetition.

### Grace, on-hold, cancellation, and recovery

Current overdue logic only moves an active/trial subscription toward on-hold if an unpaid renewal order exists. If none exists, it tries to create one and gives time to pay. On payment:

- pending renewal order state is cleared;
- retry/failure metadata is cleared;
- `_on_hold_date` is cleared;
- next payment advances from the scheduled due-date basis, not simply “now”;
- future renewal actions are scheduled;
- on-hold/trial becomes active;
- success communication fires.

This prevents a late recovery from shifting the customer's schedule merely because payment arrived later.

### Administrative “resolved” is not payment recovery

ArraySubs Pro's Renewal Failures screen lets an admin mark an issue resolved. Current source explicitly records that this is an administrative dismissal and **does not change the order payment status**. A recovered-payment KPI must not count those dismissals as money recovered.

## Recovery playbook by failure type and customer value

| Segment | First response | Retry | Human escalation | Access/downgrade consideration |
| --- | --- | --- | --- | --- |
| Transient processing error | Immediate factual email or suppress first customer email if a quick retry policy is proven less confusing | Bounded delayed retry | Escalate if repeated/systemic | Short grace can be reasonable where fulfillment has not started |
| Insufficient funds | Clear amount/date and alternate-payment path | Later bounded retry | High-value/annual accounts may merit personal outreach | Grace should reflect service/fulfillment cost and customer history |
| Expired/invalid card | Payment-update CTA | Retry after a new method is stored | Escalate valuable accounts approaching access loss | Avoid meaningless repeated attempts on unchanged credentials |
| Authentication required | Authentication/pay-now link | Retry only after action/updated state | Support for customers who cannot complete SCA | Do not cancel before giving a usable action path |
| Generic issuer decline | Alternate method/contact issuer | Follow advice code; cap attempts | Contact valuable accounts if policy permits | Keep tone neutral; do not expose sensitive issuer data |
| Missing token/gateway detached | Explain payment method must be reconnected | No blind charge retry | Operational escalation | Manual invoice fallback may be appropriate |
| Remote PayPal/Paddle past due | Use gateway-hosted update/recovery path and local status visibility | Let gateway policy run; do not create a second independent retry engine | Reconcile before manual charge | Align local access grace with remote recovery window intentionally |

“High value” should be a merchant-defined service tier or economic rule, not a secret guess. Avoid discriminatory outreach criteria; use contractual/account attributes and consistent policies.

## Recovery measurement framework

Use closed observation windows. A failure from yesterday may still be in recovery and should not be labeled unrecovered.

### Core formulas

```text
Renewal failure rate
= failed first renewal attempts
÷ eligible first renewal attempts

Customer recovery rate
= failed-renewal customers who later paid the affected renewal
÷ failed-renewal customers whose recovery window has closed

Value recovery rate
= amount collected against failed renewals
÷ amount originally due on failed renewals whose window has closed

Recovery by attempt N
= affected renewals first recovered on attempt N
÷ affected renewals eligible to reach attempt N

Time to recovery
= paid timestamp − first-failure timestamp
```

Keep count and value recovery separate. One large annual account can distort value recovery while customer recovery remains low.

### Worked metric example

Illustrative closed cohort:

- 100 renewal attempts;
- 12 first attempts fail;
- 7 later pay within the defined recovery window;
- failed amount due: `$1,600`;
- recovered amount: `$900`.

```text
Failure rate = 12 ÷ 100 = 12%
Customer recovery rate = 7 ÷ 12 = 58.3%
Value recovery rate = $900 ÷ $1,600 = 56.25%
```

These are arithmetic outputs, not ArraySubs, WooCommerce, or industry benchmarks.

### Required segmentation

At minimum segment by:

- gateway and payment method;
- decline category/advice;
- first renewal versus later renewal;
- monthly/annual cadence;
- order value band;
- tenure/customer segment;
- retry attempt;
- manual update, email click, admin outreach, or gateway recovery method;
- product/access/fulfillment type;
- configured grace and message variant.

## Dashboard design

| Panel | Measure | Decision it supports |
| --- | --- | --- |
| Failure funnel | renewal attempts → first failures → retries → recovered → on-hold → cancelled/downgraded | Where customers leave the lifecycle |
| Decline mix | failed count/value by normalized category and raw gateway code | Retry versus payment-update emphasis |
| Attempt curve | recovery count/value by attempt number and elapsed day | Whether later retries add enough value to justify them |
| Gateway reconciliation | local failed/open versus remote paid/past-due/cancelled | Webhook and duplicate-charge risk |
| Customer action | email delivered/clicked → method updated → paid | Message and payment-update path effectiveness |
| Cohort outcomes | recovery, refunds, support, involuntary cancellation by product/gateway | Sustainable policy, not just charge volume |

Do not infer email delivery from “send hook ran” unless a mail provider/log confirms delivery.

## Experiment design

Safe experiments change one material variable at a time:

- message subject/body/CTA;
- first reminder timing;
- later retry timing for recoverable declines;
- grace length for a defined product segment;
- direct hosted payment-method update versus account landing page;
- human escalation for a defined service tier.

Guardrails:

1. exclude hard/customer-action failures from a timing-only retry test;
2. predefine the observation window and primary metric;
3. monitor duplicate charges, complaints, refunds, support contacts, and access mistakes;
4. honor card-network/gateway retry restrictions;
5. do not combine new retry timing, new email, and new grace policy in one test;
6. stop an experiment immediately if it creates double charges or misleading access states.

## Stop rules

Stop automatic retries when:

- the order is paid or gateway verification finds it paid;
- the customer supplies a stop/cancel instruction that applies;
- the gateway says do not retry or the decline requires a new method/authentication;
- credentials/token/gateway context are missing;
- maximum supported attempts are reached;
- the subscription is cancelled/expired or pending cancellation blocks charging;
- a remote gateway owns recovery and a second local engine would duplicate attempts;
- the expected order amount/schedule does not match the customer contract;
- fraud/risk controls require review.

## Operational runbook

1. Identify subscription and affected renewal order.
2. Check whether it is automatic, manual, or remote gateway-managed.
3. Confirm the order is still unpaid at both WooCommerce and gateway.
4. Inspect raw gateway error plus normalized category/advice.
5. Check retry count, next retry time, grace state, and scheduled actions.
6. Check customer/admin email state and available Pay Now/payment-update path.
7. Review access, shipment, pending switch, cancellation, and auto-downgrade impact.
8. Choose retry, customer action, manual payment, gateway sync, or stop/escalate.
9. After payment, verify order paid, subscription active, failure metadata cleared, and next date/jobs advanced.
10. Record the resolution source; do not count “marked resolved” as recovered payment.

## Limitations and unknowns

- No failed-payment E2E test validated exact email frequency, UI, or gateway sandbox behavior.
- Stripe Billing Smart Retries documentation is ecosystem context, not current ArraySubs Stripe implementation truth.
- PayPal/Paddle gateway recovery configuration can change remotely and may not match local grace timing.
- Current ArraySubs failure categories normalize a subset of possible gateway codes; retain raw evidence.
- The hourly overdue checker means thresholds are approximate to the next run.
- On-hold access depends on configured membership/content rules; do not promise a universal access outcome.
- Auto-downgrade is configuration-dependent, requires a valid target, cancels the stale unpaid order, detaches old automatic context, and can create/reactivate a fallback plan. It is not an automatic default for every failed payment.
- Mail sending is not proof of inbox delivery.

## FAQ answers

### How many times does ArraySubs retry a failed renewal?

Current local Stripe configuration is three automatic retries, 24 hours apart. Manual renewals require customer/admin action. PayPal and Paddle own remote recovery schedules. Do not describe one retry count as applying to every gateway.

### Does a failed payment immediately cancel access?

Not under the current default ArraySubs lifecycle. The subscription remains active for three configured grace days, then moves on-hold; cancellation follows after seven additional configured days. Actual access while on-hold depends on the store's access rules.

### Should every decline be retried?

No. Processing errors and some insufficient-funds cases may recover later. Expired/invalid credentials and authentication-required failures need customer action. Use gateway advice and stop rules, and cap all attempts.

### What does “mark failure resolved” do?

It dismisses the item administratively in the Renewal Failures workflow and records an audit note. Current source says it does not change the order's payment status, so it is not a recovered payment.

### Can ArraySubs prevent a duplicate charge on retry?

Current retry processing asks the gateway whether the renewal order was already charged, such as when a webhook was missed. If it finds a successful charge, it reconciles the order without charging again. Verify the gateway integration supports that check.

## Visual ideas

1. **Pillar lifecycle flowchart:** reminder → invoice → failure classification → retry/action → recovery → grace → on-hold → cancel/downgrade.
2. **Decline-action matrix:** categories versus retry, payment update, authentication, or escalation.
3. **Recovery funnel:** flat bars with merchant-supplied data placeholders, not industry numbers.
4. **Attempt curve:** line/bar chart of first-party recovery by attempt and elapsed time.
5. **Gateway ownership diagram:** ArraySubs/Stripe versus PayPal/Paddle remote scheduling.
6. **Annotated grace settings:** `user-manual/markdowns/billing-and-renewals/recovery-and-grace-flows.ASSETS/01-grace-period-settings-annotated.png`.
7. **Annotated admin recovery controls:** `user-manual/markdowns/checkout-and-payments/automatic-payments/payment-recovery.ASSETS/02-admin-payment-recovery-controls-annotated.png`.
8. **Annotated failure queue/timeline:** `user-manual/markdowns/audits-and-logs/renewal-failures.ASSETS/01-renewal-failure-queue-annotated.png` and `04-subscription-failure-timeline-annotated.png`.

## Internal-link suggestions

- Commercial hub: `/deals/arraysubs/features/#subscription-operations`
- Recipe: `/recipes/arraysubs/lenient-dunning-grace/`
- Recipe: `/recipes/arraysubs/strict-dunning-grace/`
- Recipe: `/recipes/arraysubs/auto-downgrade-on-failed-payment/`
- Related A032: `/blogs/what-happens-when-a-subscription-payment-fails/`
- Related A033: `/blogs/subscription-dunning-strategy-timing-messages-and-stop-rules/`
- Related A034 using its final content-plan slug.

## Product-truth files inspected

- `arraysubs/src/Features/RecurringBilling/Services/RenewalProcessor.php`
- `arraysubs/src/Features/RecurringBilling/Services/Hooks.php`
- `arraysubs/src/Features/RecurringBilling/Services/PaymentProcessor.php`
- `arraysubs/src/Features/Subscriptions/Services/OrderIntegration.php`
- `arraysubs/src/Features/Emails/Services/EmailManager.php`
- `arraysubs/src/Features/Emails/Emails/PaymentFailedEmail.php`
- `arraysubs/src/Features/Emails/templates/customer-payment-failed.php`
- `arraysubs/src/functions/gateway-helpers.php`
- `arraysubs/src/functions/settings-helpers.php`
- `arraysubs/src/Features/PlanSwitching/Services/AutoDowngradeHandler.php`
- `arraysubspro/src/Features/AutomaticPayments/Services/Hooks.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Stripe/StripeDelegate.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/PayPal/PayPalGateway.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleGateway.php`
- `arraysubspro/src/Features/Audits/REST/RenewalFailureController.php`
- `user-manual/markdowns/billing-and-renewals/recovery-and-grace-flows.md`
- `user-manual/markdowns/checkout-and-payments/automatic-payments/payment-recovery.md`
- `user-manual/markdowns/audits-and-logs/renewal-failures.md`
- `user-manual/markdowns/billing-and-renewals/renewal-communication.md`

## Official external sources

All URLs accessed 2026-07-13.

- WooCommerce, **Failed Recurring Payment Retry System**: https://woocommerce.com/document/subscriptions/failed-payment-retry/
- WooCommerce, **Subscription Renewal Process**: https://woocommerce.com/document/subscriptions/renewal-process/
- WooCommerce, **Troubleshooting Framework for WooCommerce Subscriptions**: https://woocommerce.com/document/subscriptions/troubleshooting-framework/
- Stripe, **Card declines**: https://docs.stripe.com/declines/card
- Stripe, **Decline codes**: https://docs.stripe.com/declines/codes
- Stripe, **Revenue recovery**: https://docs.stripe.com/billing/revenue-recovery
- Stripe, **Revenue recovery analytics**: https://docs.stripe.com/billing/revenue-recovery/recovery-analytics
- PayPal, **Payment failures and recovering balances**: https://developer.paypal.com/docs/multiparty/subscriptions/customize/payment-failure-retry/
- Paddle, **Automatic payment failure retries**: https://developer.paddle.com/changelog/2025/default-dunning-payment-recovery/
- Paddle, **subscription.past_due webhook**: https://developer.paddle.com/webhooks/subscriptions/subscription-past-due/

## Drafting guardrails

- Separate current ArraySubs behavior from WooCommerce Subscriptions and Stripe Billing features.
- Never claim an industry recovery benchmark.
- Treat raw gateway code/advice as evidence; normalized categories are routing aids.
- Distinguish paid recovery from administrative dismissal.
- Put duplicate-charge verification, stop rules, and customer action paths before optimization tactics.

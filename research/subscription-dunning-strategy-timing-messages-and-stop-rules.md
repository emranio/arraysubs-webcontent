# Research brief: Subscription Dunning Strategy: Timing, Messages, and Stop Rules

## Research record

- **Article:** A033
- **Research date / last verified:** 2026-07-13
- **Focus keyword:** `subscription dunning strategy WooCommerce`
- **Intent:** Strategy and operating framework for retry timing, customer communication, access policy, measurement, and safe stopping.
- **Evidence scope:** Current official WooCommerce, Stripe, PayPal, and Paddle documentation; ArraySubs 1.8.9 and ArraySubs Pro 1.1.0 source; current user manual/screenshots.
- **No universal schedule:** No retry cadence or grace length is recommended as universally optimal. Current product defaults are labeled as product behavior, and proposed schedules are planning templates only.
- **No live dunning test was run.** Email delivery, gateway sandbox behavior, and scheduler ordering require validation.

## Direct-answer conclusion

> A subscription dunning strategy is the coordinated policy for failed-payment retries, customer messages, access grace, and the final stop, cancellation, or downgrade action. Build it by decline type and gateway ownership, give customers one clear payment-fix path, cap attempts, and measure recovery after closed observation windows alongside complaints, refunds, support, and duplicate-charge risk.

This is 56 words.

## Editorial thesis

Dunning is the complete recovery journey between first failure and final disposition. It is not synonymous with “send three emails” or “retry every few days.” The article should define five linked layers:

1. **collection ownership** — ArraySubs, customer, PayPal, or Paddle;
2. **failure routing** — retryable, customer-action, hard/stop, or unknown;
3. **message sequence** — what the customer needs now and what happens next;
4. **service policy** — active grace, on-hold, shipment/access controls, downgrade/cancel;
5. **measurement and stop rules** — when another attempt is justified and when it is unsafe.

## Current ArraySubs baseline

Current configurable/default behavior provides the baseline a merchant starts from:

| Control | Current default/product truth | Configurability |
| --- | --- | --- |
| Renewal reminder | 3 days before renewal | Email setting |
| Renewal invoice creation | 6 hours before due | Renewal setting |
| Active grace after due | 3 days | General renewal setting |
| On-hold before cancellation | 7 additional days | General renewal setting |
| Stripe local retry | Up to 3 retries, 24 hours apart | Fixed in current Stripe delegate/source, not exposed as a merchant UI setting in the inspected code |
| Manual renewal | Customer/admin pays open order | Operational workflow |
| PayPal/Paddle retry | Remote gateway owns retry/recovery | Gateway plan/dashboard behavior |
| Payment-failed email | Customer and admin; can include reason and Pay Now URL | Woo email/ArraySubs email settings/templates |
| On-hold/cancel emails | Lifecycle-triggered | Email settings/templates |
| Auto-downgrade | Optional configured fallback at eligible expiry/cancellation transition | Product/global plan-switch configuration |

The pillar article A031 can cover the end-to-end system. A033 should focus on choosing and governing the policy.

## Step 1: identify schedule ownership

```text
Manual/offline → customer action owns collection after invoice
Stripe → ArraySubs owns invoice, charge, and local retry schedule
PayPal → remote PayPal subscription owns collection/retries
Paddle → remote Paddle subscription owns collection/retries
```

Do not run two independent retry engines against the same obligation. For PayPal/Paddle, local messages/access policy can complement remote recovery, but local manual charging should follow reconciliation and an explicit operator decision.

Stripe Billing's Smart Retries apply to Stripe Billing subscription/invoice collection. Current ArraySubs Stripe renewals use WooCommerce renewal orders and plugin-created PaymentIntents, so the article must not tell ArraySubs merchants to toggle Stripe Billing Smart Retries and assume it controls these charges.

## Step 2: segment failure by required remedy

| Segment | Examples | Correct customer task | Automated retry stance |
| --- | --- | --- | --- |
| Retryable/transient | processing error, gateway timeout, some insufficient-funds/advice-to-retry cases | Often no data change, but customer can use another method | Bounded delayed retry; monitor repeat/systemic failure |
| Customer data/action | expired card, incorrect CVC, invalid number, authentication required | Update method, correct details, or authenticate | Do not repeat unchanged credentials; retry after action |
| Issuer/stop advice | do-not-try-again, stolen/lost card, transaction not allowed | New method/contact issuer | Stop that credential/transaction path |
| Missing context | token absent, gateway detached/disabled, remote subscription missing | Reconnect method or use manual invoice | No blind retry |
| Unknown | unmapped gateway error | Inspect raw code, logs, and remote state | Conservative cap; escalate |

Stripe's official docs say network advice can explicitly indicate `do_not_try_again`, `try_again_later`, or `confirm_card_data`; it also warns that excessive retries can appear fraudulent and that card networks limit reattempts. Use the gateway's current advice rather than a universal timetable.

## Step 3: design the message ladder

Every message should answer:

1. What failed?
2. What amount/order/subscription is affected?
3. What does the customer need to do?
4. Is another attempt planned, and when?
5. What happens to access/service/shipment if unpaid?
6. How can the customer get help?

### Message framework

| Moment | Subject objective | Body essentials | Avoid |
| --- | --- | --- | --- |
| Pre-renewal reminder | Prevent surprise; prompt proactive method review | date, amount/plan, manage-payment link | Threat language before any failure |
| First failure | Explain and provide a single fix path | amount, plain reason if safe, Pay Now/update method, next step/time | Raw codes, blame, false urgency |
| Retry reminder | Tell customer an attempt is scheduled or still unresolved | scheduled attempt window, current method/action link, support | Sending an identical “first failure” message repeatedly |
| Before on-hold | Make service consequence explicit | exact cutoff in store timezone, access/shipment effect, fix path | Vague “soon” or undisclosed loss of service |
| On-hold | Confirm status and fastest restoration path | what is restricted, open order, Pay Now, support | Claiming cancellation if it is only on-hold |
| Final warning | State final disposition and date | cancel/downgrade date, remaining action, data/access implications | Invented legal threats or surprise fees |
| Recovered | Close the loop | payment received, status restored, next renewal date | Continuing the failure sequence after payment |
| Cancelled/downgraded | Record final outcome | effective status/plan, access, resubscribe/reactivate path | Hiding a fallback-plan change |

### Tone principles

- factual, calm, and specific;
- one primary CTA per message;
- local date/time plus timezone when timing matters;
- customer-safe failure explanation, not raw processor payload;
- no claim that the customer did something wrong;
- no false promise that updating one field guarantees payment;
- accessible link text and a non-link fallback/support route.

## Step 4: choose timing from constraints

Start with hard constraints, not a copied benchmark:

- gateway/network retry rules and advice;
- whether the failure is retryable;
- billing cadence and amount;
- product marginal cost during grace;
- digital access versus physical fulfillment;
- customer value/service tier under a consistent policy;
- time needed to notice and update a method;
- weekends, payday patterns only if supported by first-party evidence;
- local notice/contract requirements reviewed by counsel;
- remote gateway recovery window;
- email fatigue and support capacity.

### Timing worksheet

Let:

- `D0` = first failed-payment time;
- `r_i` = delay before retry `i`;
- `G_active` = days status stays active after due;
- `G_hold` = additional on-hold days;
- `T_gateway` = gateway-owned final recovery time where remote;
- `T_stop` = merchant final disposition time.

```text
Retry i time = prior failed attempt time + r_i
Local on-hold threshold = due time + G_active
Local cancellation threshold = due time + G_active + G_hold
```

For remote billing, choose intentionally whether:

```text
T_stop < T_gateway  → local service can end while gateway still retries
T_stop = T_gateway  → lifecycle aligns with gateway recovery window
T_stop > T_gateway  → local grace continues after remote retries stop
```

None is universally correct, but an accidental mismatch is a defect.

### Current ArraySubs boundary caveat

With defaults, Stripe retry 3 and the active-to-on-hold threshold are both around day 3. The overdue checker can move a subscription on-hold and status integration can unschedule renewal actions. Exact Action Scheduler ordering should be tested. This is a strong reason to treat retry timing and grace timing as one system.

## Step 5: choose the access and fulfillment policy

| Product | Grace question | Possible starting model | Required control |
| --- | --- | --- | --- |
| Low-marginal-cost digital access | Does short continued access improve recovery without material abuse? | Active grace, then on-hold restriction | Status-driven access rule and cache invalidation |
| High-cost service | What work can continue unpaid? | Limited/graduated service during grace | Service-team visibility and escalation |
| Physical shipment | Has inventory/label/carrier handoff occurred? | Hold next shipment after failure while preserving account grace | Fulfillment-system integration; billing status alone may be too late |
| Essential/regulated service | What notice and continuity duties apply? | Legal/contract-specific | Qualified review; do not rely on generic blog advice |
| Freemium product | Can a safe fallback preserve customer value? | Auto-downgrade after eligible cancellation | Valid fallback plan, clear email, access mapping, stale order cancellation |

ArraySubs' optional auto-downgrade is not just a status label. Current code cancels the pending unpaid order, updates/reuses a target subscription/plan, detaches old automatic-payment context, returns the fallback to active, schedules its renewal if appropriate, and sends a downgrade event/email. Test the entire entitlement and billing outcome.

## Stop rules

### Hard stops for payment attempts

Stop when:

- the renewal order is paid or pre-retry verification finds it paid;
- the customer cancelled or revoked authorization in a way that applies;
- gateway advice says do not retry;
- a new payment method/authentication is required and none is supplied;
- payment context/token/gateway is invalid;
- retry limit or card-network limit is reached;
- subscription/order status is no longer eligible;
- order amount/currency/schedule does not match the subscription promise;
- a remote gateway owns recovery and local charging would duplicate it;
- fraud/risk review is required.

### Stop or change communication when

- payment is recovered;
- message delivery repeatedly fails and an approved alternate channel is used;
- customer enters a support-assisted resolution flow;
- subscription is cancelled/downgraded;
- the next message would add no new action or consequence;
- legal/contact preferences prohibit the channel.

### Escalation rules

Escalate to an operator for:

- high-contract-value accounts under a documented service policy;
- unknown/systemic gateway failures;
- remote/local state mismatch;
- already-shipped physical goods;
- repeated failed authentication;
- dispute/fraud indicators;
- amount/tax/shipping mismatch;
- a customer who reports a charge that the local order does not show.

## Measurement framework

### Primary outcomes

```text
Customer recovery rate
= recovered failed-renewal customers
÷ eligible failed-renewal customers with closed windows

Value recovery rate
= recovered failed amount
÷ failed amount with closed windows

Involuntary cancellation rate
= subscriptions cancelled for unresolved payment failure
÷ subscriptions with failed renewals in the closed cohort

Median time to recovery
= median(paid time − first failure time) for recovered renewals
```

### Guardrail metrics

- duplicate-charge reports and confirmed duplicates;
- refunds/chargebacks after recovery;
- unsubscribe/spam/complaint rate by message;
- support contacts per failed renewal;
- access or shipment mistakes;
- payment-method update completion;
- remote/local reconciliation mismatch;
- cancellation/downgrade reversal;
- failed email delivery where measurable.

### Attempt-level metric

```text
Incremental recovery at attempt N
= renewals first recovered on attempt N
÷ renewals still eligible immediately before attempt N
```

Do not divide by all original failures when evaluating later attempts; many cases were already recovered or stopped and were not eligible.

## Worked experiment example

Hypothesis: a failure email with one direct Pay Now/payment-update CTA improves recovery within the same fixed retry/grace policy.

Design:

- eligible segment: Stripe failures categorized as expired card/invalid card requiring customer action;
- control: current message;
- variant: same facts and timing, clearer CTA/next consequence;
- primary metric: payment-method update followed by recovered affected order within a closed window;
- guardrails: complaints, support contacts, duplicate charges, refunds;
- unchanged: retry timing, grace, access policy, and audience.

This isolates message design. Do not also change retry count and grace duration in the same experiment.

## Dunning policy worksheet

The article can offer this extractable table:

| Policy field | Merchant decision |
| --- | --- |
| Gateway/schedule owner |  |
| Retryable categories |  |
| Customer-action categories |  |
| Hard-stop advice/codes |  |
| Retry delays and maximum |  |
| First failure message |  |
| Retry/on-hold/final messages |  |
| Active-grace days |  |
| On-hold access/fulfillment |  |
| Cancellation or fallback plan |  |
| Human escalation segment |  |
| Recovery observation window |  |
| Primary KPI and guardrails |  |
| Evidence/log locations |  |
| Owner and review date |  |

## Limitations and unknowns

- No browser/sandbox test confirmed email sequence, delivery, or current gateway dashboard configuration.
- Current ArraySubs Stripe retry timing is fixed in source; the manual's older wording about merchant-configurable retry counts must not be repeated.
- Stripe Billing recovery tools are not the same as ArraySubs' local WooCommerce order/PaymentIntent flow.
- PayPal/Paddle policies can evolve and are configured remotely; verify current store settings at publication and implementation.
- Current normalized decline categories are helpful but incomplete; raw codes/advice remain necessary.
- On-hold access and physical fulfillment depend on integrations outside the renewal engine.
- The day-3 retry/on-hold collision needs real scheduler verification.
- Legal notice, collections, cancellation, and essential-service rules vary by contract and jurisdiction.

## FAQ answers

### What is subscription dunning?

Dunning is the coordinated process after a payment problem: retries, customer messages, payment-method correction, access/grace policy, operator escalation, and the final cancellation, on-hold, or downgrade outcome.

### What is the best retry schedule?

There is no universal schedule. Use gateway/network guidance, decline type, product economics, customer action time, and first-party results. Current ArraySubs Stripe behavior is up to three 24-hour retries, but that is product behavior, not an industry optimum.

### Should every failed payment email threaten cancellation?

No. The first message should explain the problem, amount, next step, and planned timing. State access or cancellation consequences only when accurate, with a specific date and a usable recovery path.

### Should PayPal or Paddle merchants also enable local automatic retries?

Not as a second uncoordinated engine. PayPal and Paddle own their remote billing/recovery schedules. Use local lifecycle/messages deliberately, reconcile state, and avoid duplicate charge attempts.

### When should dunning stop?

Stop when payment is recovered, the gateway says not to retry, customer action/new credentials are required, authorization is withdrawn, the maximum permitted attempts are reached, status is ineligible, or local charging would conflict with remote recovery.

## Visual ideas

1. **Five-layer dunning flow:** ownership → failure segment → timing → message/access → stop/outcome.
2. **Swimlane timeline:** customer, ArraySubs, gateway, access/fulfillment.
3. **Message ladder:** reminder, failure, retry, on-hold, final, recovered.
4. **Decline decision matrix:** retry / update / authenticate / stop.
5. **Gateway alignment timeline:** local grace window versus PayPal/Paddle remote recovery window.
6. **Flat KPI funnel and attempt bar chart:** use first-party placeholders only.
7. **Annotated email schedule:** `user-manual/markdowns/billing-and-renewals/renewal-communication.ASSETS/01-email-reminder-schedule-annotated.png`.
8. **Annotated grace controls:** `user-manual/markdowns/settings/general-settings.ASSETS/04-grace-period-timeline-controls-annotated.png`.

## Internal-link suggestions

- Commercial hub: `/deals/arraysubs/features/#subscription-operations`
- Recipe: `/recipes/arraysubs/lenient-dunning-grace/`
- Recipe: `/recipes/arraysubs/strict-dunning-grace/`
- Recipe: `/recipes/arraysubs/auto-downgrade-on-failed-payment/`
- Related A031: `/blogs/failed-subscription-payment-recovery-for-woocommerce/`
- Related A032: `/blogs/what-happens-when-a-subscription-payment-fails/`
- Related A034 and A035 using their final content-plan slugs.

## Product-truth files inspected

- `arraysubs/src/Features/RecurringBilling/Services/RenewalProcessor.php`
- `arraysubs/src/Features/RecurringBilling/Services/Hooks.php`
- `arraysubs/src/Features/Subscriptions/Services/OrderIntegration.php`
- `arraysubs/src/Features/Emails/Services/EmailManager.php`
- `arraysubs/src/Features/Emails/Emails/PaymentFailedEmail.php`
- `arraysubs/src/Features/PlanSwitching/Services/AutoDowngradeHandler.php`
- `arraysubs/src/functions/gateway-helpers.php`
- `arraysubs/src/functions/settings-helpers.php`
- `arraysubspro/src/Features/AutomaticPayments/Services/Hooks.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Stripe/StripeDelegate.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/PayPal/PayPalGateway.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleGateway.php`
- `user-manual/markdowns/billing-and-renewals/recovery-and-grace-flows.md`
- `user-manual/markdowns/checkout-and-payments/automatic-payments/payment-recovery.md`
- `user-manual/markdowns/billing-and-renewals/renewal-communication.md`
- `user-manual/markdowns/audits-and-logs/renewal-failures.md`

## Official external sources

All URLs accessed 2026-07-13.

- WooCommerce, **Failed Recurring Payment Retry System**: https://woocommerce.com/document/subscriptions/failed-payment-retry/
- WooCommerce, **Subscription Renewal Process**: https://woocommerce.com/document/subscriptions/renewal-process/
- Stripe, **Card declines**: https://docs.stripe.com/declines/card
- Stripe, **Decline codes**: https://docs.stripe.com/declines/codes
- Stripe, **Automate payment retries**: https://docs.stripe.com/billing/revenue-recovery/smart-retries
- Stripe, **Automate customer emails**: https://docs.stripe.com/billing/revenue-recovery/customer-emails
- PayPal, **Payment failures and recovering balances**: https://developer.paypal.com/docs/multiparty/subscriptions/customize/payment-failure-retry/
- Paddle, **Automatic payment failure retries**: https://developer.paddle.com/changelog/2025/default-dunning-payment-recovery/
- Paddle, **subscription.past_due webhook**: https://developer.paddle.com/webhooks/subscriptions/subscription-past-due/

## Drafting guardrails

- Do not prescribe one retry cadence as best.
- Make gateway ownership the first decision.
- Do not tell ArraySubs merchants that Stripe Billing Smart Retries control ArraySubs renewal PaymentIntents.
- Include hard stop rules and complaint/duplicate-charge guardrails alongside recovery KPIs.
- Keep current defaults labeled as defaults; do not turn them into benchmarks.

# Research brief: Failed Payment Email Sequence — A Message-by-Message Playbook

## Research record

- **Article:** A037 — Failed Payment Email Sequence: A Message-by-Message Playbook
- **Research date / last verified:** 2026-07-16
- **Focus keyword:** `failed payment email sequence`
- **Search intent:** Operators want usable copy, timing, stop rules, accessibility guidance, and measurement for recovering failed subscription renewals without confusing or shaming customers.
- **Evidence scope:** A037 brief; publishing standard; ArraySubs 1.8.11 and Pro 1.1.2 email/retry/lifecycle source; WooCommerce email and retry documentation; current Stripe and Gmail sender guidance.
- **Test limitation:** Current source and settings UI were inspected. No production sequence was sent and no deliverability or conversion claim was measured.

## 40–60-word direct answer

> A failed-payment email sequence should explain the problem immediately, provide one secure recovery action, increase specificity as the access deadline approaches, and stop as soon as payment succeeds or the lifecycle changes. Each message must match the actual retry, grace, and access policy; a persuasive email cannot fix an incorrect token, webhook, or renewal state.

This is 54 words. Follow it with a short note that the templates are adaptable, not benchmark-backed promises.

## Answer-first editorial thesis

The sequence is a state machine, not a blast calendar:

```text
failure verified
  → immediate notice
  → reminder before next meaningful boundary
  → access/final-state warning
  → post-failure path

At every step: paid / manually resolved / cancelled / downgraded = stop or branch.
```

The exact number of emails is less important than sending only when the customer has new information or a new deadline.

## Key takeaways

- Put the secure action, exact consequence, and support route above promotional content.
- Use the actual product, amount, payment state, retry timing, and access deadline when known.
- Never invent a deadline that the retry/grace engine does not enforce.
- Stop messages on payment, manual resolution, cancellation, downgrade, or superseding gateway communication.
- Test deliverability and task completion separately from opens and clicks.

## Verified primary sources

All web sources accessed 2026-07-16.

| Claim | Primary source | Editorial use |
| --- | --- | --- |
| WooCommerce failed-payment retry rules can change order/subscription state and control customer/store emails at retry boundaries. | [WooCommerce: Failed recurring payment retry](https://woocommerce.com/document/subscriptions/failed-payment-retry/) | Tie email timing to lifecycle actions. |
| WooCommerce transactional emails have configurable subject, heading, additional content, and templates; current email logs can be reviewed in WooCommerce Status logs. | [WooCommerce: Email settings](https://woocommerce.com/document/configuring-woocommerce-settings/emails/), [WooCommerce: Email FAQ](https://woocommerce.com/document/email-faq/) | Ground configuration and evidence checks. |
| Stripe can send failed-payment and upcoming-renewal customer emails, but those settings and provider retries must be coordinated with merchant messaging. | [Stripe: Revenue recovery customer emails](https://docs.stripe.com/billing/revenue-recovery/customer-emails), [Stripe: Smart retries](https://docs.stripe.com/billing/revenue-recovery/smart-retries) | Prevent duplicate/conflicting notices. |
| Gmail's sender guidelines require authentication and recommend clear, expected mail; higher-volume senders have additional requirements. | [Google: Email sender guidelines](https://support.google.com/mail/answer/81126) | Support authentication, identity, and deliverability checks without promising inbox placement. |

## Current ArraySubs product truth

### What exists now

- Core provides a customer `payment_failed` email and an admin payment-failed email.
- The customer template follows WooCommerce email conventions and can show a customer-safe reason, amount/status, **Pay Now**, and **Manage Subscription** actions.
- Subject, heading, and additional content are configurable through the WooCommerce email system.
- Failure hooks trigger the message. Gateway-backed failures defer to the appropriate gateway failure hook so the generic and gateway path do not both fire for the same event.
- Related lifecycle emails exist for on-hold, cancelled, card-expiring, and auto-downgrade events.

### What does not exist as a verified native feature

- No native visual builder for a timed three- or four-message failed-payment sequence was found.
- No built-in A/B-test engine for payment-failure email copy was found.
- `HOOK_SEND_PAYMENT_FAILED` is registered, but no current scheduling call proving an independent delayed sequence was found.
- No durable per-renewal “failed email already sent” sentinel was found; a failure email can be triggered again by another genuine failure attempt.

Therefore the article must not say ArraySubs ships the proposed multi-message playbook. Present the copy as a policy/template layer that may require an external automation tool, WooCommerce email customization, or custom development.

## Recommended sequence framework

Timing is relative to the verified failure and actual grace boundaries, not arbitrary universal days.

| Message | Trigger | Job to be done | Must include | Stop/skip condition |
| --- | --- | --- | --- | --- |
| 1. Payment needs attention | First verified failure | Explain and enable immediate recovery. | Product/subscription, safe reason, amount if reliable, one Pay Now/update action, support. | Payment already succeeded; provider owns the sole notice. |
| 2. Recovery reminder | Before next retry or halfway to access change | Add the next meaningful event without pressure theater. | What happens next, secure update path, retry timing if known. | No new information; duplicate attempt; dispute/fraud review. |
| 3. Access deadline | Before on-hold/restriction | State exact access or fulfillment impact. | Date/time zone, affected entitlement, recovery path, data retention promise only if true. | Policy does not actually restrict access then. |
| 4. Final outcome | Before cancellation/downgrade | Explain final state and last available action. | Exact outcome, deadline, restart/downgrade path. | Account was paid, cancelled voluntarily, or downgraded already. |
| Post-failure | After lifecycle action | Preserve trust and show next step. | Current state, what is retained/lost, reactivation/support path. | No lawful/operational reason to continue contacting. |

## Adaptable templates

Use placeholders only when the value is trustworthy. Never reveal full payment data.

### Message 1 — direct and calm

- **Subject:** `Action needed: we could not renew [subscription name]`
- **Preheader:** `Update your payment method or pay securely from your account.`
- **Opening:** `We could not process the [date] renewal for [subscription]. Your bank or payment provider did not complete the payment.`
- **Action:** `[Pay securely]` or `[Update payment method]`
- **Safety line:** `For security, do not send card details by email. We will never ask for your card security code in a reply.`
- **State line:** `Your subscription is currently [actual state]. [Actual access consequence and date].`

### Message 2 — useful new information

- **Subject:** `Reminder: [subscription] payment is still unresolved`
- State whether another automatic attempt is actually scheduled.
- If timing is unknown, say `We may try again under your payment provider's recovery policy` rather than inventing a timestamp.
- Include both self-service and support paths when a gateway may require reauthorization.

### Message 3 — access boundary

- **Subject:** `[Subscription] access changes on [date]`
- Name the entitlement or fulfillment that changes.
- For physical goods, separate billing recovery from shipment cutoff.
- Avoid “your account will be deleted” unless deletion is real, documented, and lawful.

### Message 4 — final outcome

- **Subject:** `Final payment notice for [subscription]`
- Say whether the actual outcome is cancellation, on-hold continuation, or fallback downgrade.
- Explain what happens to data, credits, content, or booked service only when verified.

### Recovery confirmation

- **Subject:** `Payment received — [subscription] is active`
- Confirm receipt, current status, next renewal date, and receipt/order link.
- Do not claim restoration until the local and remote state agree.

## Copy and accessibility checklist

- Use a clear From name and authenticated sending domain.
- Keep one primary action and expose the destination domain in plain text nearby.
- Make links descriptive; avoid several identical “click here” links.
- Do not communicate meaning using color alone.
- Use readable text, sufficient contrast, responsive buttons, meaningful alt text, and a plain-text alternative.
- Explain customer action in verbs: `Pay renewal`, `Update payment method`, or `Contact support`.
- State deadlines with date, time, and timezone where material.
- Avoid blame (`your card was bad`), false urgency, coupon distractions, and unsupported recovery-rate claims.
- Coordinate ArraySubs, WooCommerce, and gateway-generated notices so the customer does not receive contradictory mail.

## Measurement and test plan

Measure on closed, comparable cohorts.

```text
email-attributed recovery rate
= recovered failed renewals after eligible email / eligible delivered failed-renewal emails

task completion rate
= unique customers who complete payment/update / unique customers who reach the secure action

time to recovery
= successful recovery timestamp − first verified failure timestamp
```

Do not label every recovery after an email as caused by the email; automatic retries are a confounder. Track delivered, bounced, secure-action visits, method updates, paid renewals, duplicate sends, support contacts, and spam complaints. A/B test one variable at a time and keep grace/retry policy constant during the test.

## Screenshot opportunities on mirror-help.arrayhash.com

Use numbered markers, redact recipients/customer data, and caption product version/date.

1. **WooCommerce email settings:** WooCommerce → Settings → Emails → ArraySubs Payment Failed; mark (1) enabled state, (2) subject, (3) heading, (4) additional content.
2. **Email preview/current template:** show the customer-safe failure reason, Pay Now, and Manage Subscription areas; mark each action. Use test data only.
3. **General grace settings:** `/wp-admin/admin.php?page=arraysubs-mainadmin#/settings/general`; mark active and on-hold days that the copy must match.
4. **Renewal Failures audit:** `/wp-admin/admin.php?page=arraysubs-mainadmin#/audits/renewal-failures`; mark first/last failure, next retry, attempts, and resolution controls.
5. **Subscription detail/activity:** `/wp-admin/admin.php?page=arraysubs-mainadmin#/subscriptions/detail/{id}` and `/wp-admin/admin.php?page=arraysubs-mainadmin#/audits/activity-audits`; show how support verifies state before promising recovery.
6. **Woo email log:** WooCommerce → Status → Logs, source `transactional-emails` when available; redact addresses and IDs.

## Varied non-chart visual ideas

- **Inbox story scene:** the same customer receives a calm notice, deadline reminder, and resolution confirmation across three illustrated moments.
- **Tone spectrum cards:** helpful → specific → urgent, with an alarmist/shaming example crossed out.
- **State-machine shapes:** payment state nodes with visible stop gates after paid, cancelled, or downgraded.
- **Email anatomy cutaway:** identity, reason, state, secure action, support, and safety note marked as components.
- **Human support scene:** customer on mobile and support agent checking status, emphasizing empathy and exact information.
- **Brand/logo coordination lane:** ArraySubs/WooCommerce email beside Stripe/PayPal/Paddle notice lanes to expose duplication risk.

## Recommended long-form outline

1. Direct answer and sequence principles.
2. Why event/state-driven messaging beats a fixed blast calendar.
3. Message-by-message timing and adaptable templates.
4. Gateway, retry, grace, access, and fulfillment alignment.
5. What ArraySubs emails currently do—and what a custom sequence still needs.
6. Accessibility, security, sender authentication, and deliverability.
7. Stop rules and post-failure branches.
8. Measurement and a controlled A/B test plan.
9. Screenshot-backed implementation observations, limitations, and CTA.

## Internal links

- `/deals/arraysubs/features/#subscription-operations`
- Lenient and strict dunning/grace recipes.
- Auto-downgrade-on-failed-payment recipe.
- A036 expired-card recovery for the update path.
- A038 auto-downgrade for final-state copy.
- A039 checklist for operations and measurement.

## Claims to avoid

- “ArraySubs includes this complete automated sequence.”
- “Send exactly four emails for every store.”
- Invented open, click, recovery, or revenue-lift claims.
- A retry date or access deadline not enforced by the store.
- “Payment method updated” as proof the renewal was paid.
- Any promise of inbox placement or supported rich results.

## Refresh triggers

- Changes to ArraySubs email hooks/templates or delayed scheduling.
- New native automation, segmentation, deduplication, or A/B-test capability.
- Changes to gateway-owned notices/retries, WooCommerce email logs, or Gmail sender requirements.
- Quarterly template and deliverability review.

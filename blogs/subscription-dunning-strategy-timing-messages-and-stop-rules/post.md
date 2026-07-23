---
title: "Subscription Dunning Strategy: Timing, Messages, and Stop Rules"
meta_description: "Create a WooCommerce subscription dunning strategy for retry ownership, decline routing, customer messages, grace, access, KPIs, and safe stop rules."
focus_keyword: "subscription dunning strategy WooCommerce"
published: "2026-06-02"
updated: "2026-06-25"
last_verified: "2026-07-13"
author: "Emran"
author_affiliation: "ArrayHash"
reviewer: "ArraySubs Engineering Team"
---

# Subscription Dunning Strategy: Timing, Messages, and Stop Rules

A subscription dunning strategy is the coordinated policy for failed-payment retries, customer messages, access grace, and the final stop, cancellation, or downgrade action. Build it by decline type and gateway ownership, give customers one clear payment-fix path, cap attempts, and measure recovery after closed observation windows alongside complaints, refunds, support, and duplicate-charge risk.

> **Key takeaways**
>
> - Dunning joins collection ownership, failure routing, messages, access, and outcomes.
> - No retry schedule is universally best.
> - Manual, local Stripe, PayPal, and Paddle flows need different policies.
> - Every message should add an action or a new consequence.
> - Stop rules and guardrail metrics matter as much as recovered value.

## Build the five-layer policy

![Dunning sequence — a focused timeline for Dunning coordinates retries, messages, and access.](/blogs/subscription-dunning-strategy-timing-messages-and-stop-rules/decision-visual.png)

1. **Ownership:** who creates invoices and controls attempts?
2. **Failure route:** retryable, customer action, hard stop, or unknown?
3. **Timing:** when can another attempt or lifecycle change occur?
4. **Message/access:** what does the customer do and what service continues?
5. **Stop/outcome:** paid, on-hold, cancelled, downgraded, or escalated?

Current ArraySubs defaults—three-day reminder, six-hour invoice lead, three active-grace days, seven on-hold days, and up to three local Stripe retries at 24-hour intervals—are a baseline, not an industry recommendation.

## Step 1: assign ownership

```text
manual/offline → customer action pays the ArraySubs order
Stripe → ArraySubs owns local invoice, charge, and retry
PayPal → PayPal owns remote schedule and recovery
Paddle → Paddle owns remote schedule and recovery
```

Do not run two charge engines. Local messages and access rules can complement a remote provider, but reconcile remote state before any manual attempt. Stripe Billing Smart Retries do not control current ArraySubs PaymentIntent renewals.

## Step 2: route by remedy

| Segment | Examples | Automated stance |
| --- | --- | --- |
| Transient | processing error, some insufficient funds | bounded delayed retry |
| Customer action | expired card, CVC, authentication | retry after correction/action |
| Stop advice | do-not-try-again, lost/stolen, not allowed | stop credential/path |
| Missing context | token/gateway/remote agreement absent | no blind retry |
| Unknown | unmapped error | preserve raw evidence, cap, escalate |

Gateway advice overrides a copied timetable. Excessive retries can create network, fraud, complaint, and duplicate-charge risk.

## Step 3: design the message ladder

Every message should answer: what failed, what amount/plan is affected, what the customer should do, whether another attempt is planned, what happens to access/shipment, and how to get help.

| Moment | Message job |
| --- | --- |
| Reminder | prevent surprise; review date, amount, method |
| First failure | explain and provide one fix path |
| Retry notice | state attempt window or unresolved action |
| Before on-hold | name exact cutoff and service result |
| On-hold | confirm restriction and fastest restoration |
| Final | name cancellation/downgrade date and remaining option |
| Recovered | close loop and show next date |
| Cancelled/downgraded | record final plan, access, and return path |

Use a calm tone, local date/timezone, customer-safe reason, one primary CTA, accessible link text, and a support fallback. Stop the failure sequence after recovery.

## Step 4: choose timing from constraints

Consider gateway/network rules, failure remedy, cadence and amount, service/fulfillment cost during grace, customer action time, remote recovery window, support capacity, and legal/contract review.

```text
retry i = prior failed attempt + chosen delay
on-hold threshold = due time + active grace
cancel threshold = due time + active grace + on-hold grace
```

For remote billing, decide whether local service ends before, with, or after the gateway’s final recovery window. An accidental mismatch is a defect.

![Timing and contact — an illustrative numbers for Dunning coordinates retries, messages, and access.](/blogs/subscription-dunning-strategy-timing-messages-and-stop-rules/model-visual.png)

*Planning timeline only; no universal cadence is recommended.*

Current ArraySubs default third Stripe retry and on-hold threshold both sit near day three. Test real Action Scheduler ordering as one system.

## Step 5: define access and fulfillment

Low-cost digital access may tolerate short active grace. Expensive service can need graduated limits. Physical fulfillment may need to hold a shipment immediately even while account access remains active. Regulated or essential services need qualified review.

An eligible ArraySubs auto-downgrade can cancel the stale unpaid order, detach old automatic context, move/reuse a fallback plan, return it to active, and send lifecycle communication. It is optional and must be tested end to end.

## Stop rules

Stop attempts when paid, authorization is withdrawn, gateway says stop, new credentials/authentication are required, context is invalid, the limit is reached, status is ineligible, amount/schedule is wrong, remote recovery owns the charge, or risk review is needed.

Stop or change communication when recovered, delivery repeatedly fails, support takes over, final disposition occurs, or the next message adds no useful action.

## Measurement and experiments

```text
customer recovery = recovered customers ÷ eligible failures with closed windows
value recovery = recovered amount ÷ failed amount with closed windows
involuntary cancellation = payment-failure cancellations ÷ closed failed-renewal cohort
incremental recovery at attempt N = first recoveries at N ÷ cases eligible immediately before N
```

Track duplicate charges, complaints, refunds, chargebacks, support, access/shipment mistakes, update completion, reconciliation mismatch, and email delivery. Test one material variable at a time—message, timing, or grace—not all three.

![Measure the outcome — a focused cycle system for Dunning coordinates retries, messages, and access.](/blogs/subscription-dunning-strategy-timing-messages-and-stop-rules/operating-visual.png)

For implementation detail and a recovery runbook, read [Failed Subscription Payment Recovery](/payment-recovery/failed-subscription-payment-recovery-for-woocommerce/).

## Final recommendation

Write the dunning policy as a governed state machine with owners, messages, stop conditions, and evidence. Optimize only within gateway rules and customer-safe guardrails. [Compare ArraySubs plans](/deals/arraysubs/pricing/).

## Frequently asked questions

### What is subscription dunning?

Dunning is the coordinated process after a payment problem: retries, messages, payment-method correction, grace/access policy, escalation, and final cancellation, on-hold, or downgrade.

### What is the best retry schedule?

There is no universal best schedule. Use gateway advice, decline type, product economics, customer action time, and first-party results. Current ArraySubs Stripe behavior is a product baseline, not a benchmark.

### Should every failed-payment email threaten cancellation?

No. First explain the issue, amount, action, and planned timing. State access or cancellation consequences only when accurate, specific, and paired with a usable recovery path.

### Should PayPal or Paddle also use local retries?

Not as a second uncoordinated charge engine. Those gateways own remote schedules. Reconcile them and align local lifecycle/messages without creating duplicate attempts.

### When should dunning stop?

Stop on payment, withdrawal of authorization, gateway stop advice, required new credentials/authentication, retry exhaustion, ineligible status, incorrect amount/schedule, or conflict with remote recovery.

## Disclosure, verification, and update log

- **July 2026:** Verified against current ArraySubs recovery and gateway ownership plus official processor guidance. No retry cadence or recovery benchmark is prescribed.

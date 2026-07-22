---
title: "Multi-Gateway Resilience for Subscription Stores"
meta_title: "Multi-Gateway Resilience for Subscription Stores"
meta_description: "Design multi-gateway resilience for WooCommerce subscriptions without assuming token portability or automatic renewal failover. Includes metrics, failure domains, and an incident runbook."
focus_keyphrase: "multi-gateway resilience subscription store"
published: "2026-02-17"
updated: "2026-05-29"
last_verified: "2026-07-22"
author: "ArraySubs Editorial Team"
reviewer: "ArraySubs Product Team"
---

# Multi-Gateway Resilience for Subscription Stores

Adding a second payment gateway can keep a compatible option available for new checkout when another provider has trouble. It does not automatically move existing subscriptions, payment credentials, mandates, PayPal agreements, or Paddle subscriptions to the second gateway.

That distinction separates real multi-gateway resilience from a misleading “primary to backup” diagram. New customers can sometimes choose among enabled methods. Existing customers normally renew through the gateway context stored on their subscription. If that context is unavailable, recovery can require the original provider, a retry, a manual renewal order, a payment-method update inside that provider, a processor-assisted migration, or customer reauthorization.

> **Direct answer:** build resilience across acquisition, the installed subscriber base, the local/provider control plane, and reconciliation. Treat each gateway as a distinct billing architecture. Measure concentration and renewals due during an incident, test the exact continuity path, and never let an unverified “backup” attempt an existing renewal.

The current ArraySubs Pro build can register Stripe, PayPal, and Paddle paths, expose configuration and processed-event evidence through Gateway Health, update a payment method through the subscription’s current gateway, retry eligible plugin-controlled failures, and manually sync current provider state. It does not provide health-based routing, automatic cross-gateway renewal failover, a portable token vault, cascading processor attempts, or full-fleet proactive reconciliation.

## Key takeaways

- Multiple gateways can improve new-checkout continuity for compatible products, carts, countries, currencies, and methods.
- Installed subscriptions remain bound to their stored gateway, credential, mandate, or remote agreement unless a supported migration or reauthorization changes that context.
- Disabling a gateway for new checkout can be safer than deactivating its extension while existing renewals still depend on it.
- Provider status, local credentials, WordPress scheduling, webhooks, customer declines, and adapter state are separate failure domains.
- A green Gateway Health card is configuration/event evidence, not a guarantee that every renewal will succeed.
- Replay only after checking provider transactions and local orders. Late or duplicate webhooks make blind replay dangerous.
- Measure gateway recurring-revenue share, renewal value due in the incident window, tested continuity coverage, detection time, and restoration time.
- A constrained backup can narrow cart behavior. Test the whole enabled gateway portfolio before relying on it.

![A subscription store with several checkout gateways while existing renewals remain attached to their original gateway](/blogs/multi-gateway-resilience-for-subscription-stores/featured-image.png)

## Define resilience as four layers

![Four layers of gateway resilience: acquisition, installed base, control plane, and reconciliation](/blogs/multi-gateway-resilience-for-subscription-stores/four-continuity-layers.png)

### 1. Acquisition continuity

Can an eligible new customer complete checkout through another method when one gateway is unavailable? This depends on the product, cart shape, country, currency, buyer, method, and provider account. It is the layer most people mean when they say “backup gateway.”

### 2. Installed-base continuity

What happens to subscriptions already bound to the affected gateway? A Stripe payment method, PayPal billing agreement, and Paddle remote subscription are not interchangeable. The answer may be “wait and retry the original path,” “ask the customer to update inside the same provider,” “send a manual renewal invoice,” or “run a controlled migration.”

### 3. Control-plane continuity

Is the failure in the provider API, merchant account, credentials, WordPress/PHP, Action Scheduler, webhook delivery, webhook processing, database, or adapter? More gateways do not help when every plugin-controlled renewal shares a broken scheduler.

### 4. Reconciliation

How will the team prove who was charged and which local state is correct? Provider transactions, WooCommerce renewal orders, subscription metadata, Action Scheduler actions, and processed events need one timeline. Recovery without reconciliation can create duplicates.

## New checkout and existing renewals are different systems

WooCommerce’s subscription documentation makes the architectural distinction explicit: a merchant can stop offering an old method to new buyers while keeping the extension active for existing automatic renewals. Moving existing subscribers is more complicated and can require customers to change payment methods.

This leads to a useful operating pattern:

- **New checkout:** hide or disable the affected method when appropriate and surface a compatible tested alternative.
- **Installed base:** keep the original integration, credentials, events, and remote agreements operational until the runbook proves another safe path.

Deactivating an extension is not the same as disabling its method for new checkout. In the WooCommerce ecosystem, deactivation can cause existing renewals to become manual. In ArraySubs, adapter availability and stored gateway context similarly affect whether automatic or manual behavior applies. Test the exact version and cohort before an incident.

The [gateway migration guide](/deals/arraysubs/resources/payments-and-compliance/migrating-subscription-gateways-without-breaking-renewals/) covers the controlled process for changing that installed-base context. Do not bulk-edit `_payment_gateway` metadata or copy provider token strings.

## Failure domains: what a second gateway does not fix

![Subscription payment failure domains with a second gateway protecting only compatible new checkout](/blogs/multi-gateway-resilience-for-subscription-stores/failure-domains.png)

| Failure domain | New checkout impact | Existing renewal impact | First response | Why a second gateway is insufficient |
| --- | --- | --- | --- | --- |
| Provider API/checkout outage | Affected option may fail or disappear | Plugin charges or remote schedules depend on provider | Confirm incident and scope; keep compatible alternative visible | Installed subscriptions remain bound to provider |
| Merchant credentials/account | Store sees provider-like failure | Charges, sync, and webhooks can fail for this account | Validate account status, credentials, last known-good request | Backup does not repair old tokens/agreements |
| Webhook delivery/processing | Checkout may still succeed | Provider may charge while local state lags | Compare provider events, processed ledger, orders | New routing does not reconcile old transactions |
| Action Scheduler/WordPress | Checkout may work | Plugin-owned invoices/charges are late or absent | Inspect pending/failed actions and application errors | All plugin-scheduled gateways can share failure |
| Isolated customer decline | Usually no store-wide effect | One subscription enters recovery | Classify decline; update/retry if eligible | Alternate charge may lack authorization |
| Adapter deactivation/config | Method unavailable | Automatic behavior may become manual or lose integration | Restore adapter/config and sample cohort | Backup cannot recreate gateway context |

A provider status page is useful external evidence, not a diagnosis. Stripe, PayPal, and Paddle status pages cannot see your account restrictions, secret rotation, firewall, PHP errors, scheduler queue, or webhook handler.

## How the current ArraySubs gateways differ

### Stripe: plugin-controlled billing clock

The current Stripe delegate uses the official WooCommerce Stripe gateway and ArraySubs-owned scheduling. At due time, the plugin creates or confirms an off-session PaymentIntent using the stored Stripe context. A provider incident can block that attempt; a local scheduler incident can prevent the attempt from happening.

### PayPal: remote billing agreement

ArraySubs Pro creates a remote product, plan, and buyer-approved subscription. PayPal owns the future billing schedule, and webhooks tell ArraySubs about completed sales and state. Pausing WordPress scheduling does not necessarily stop the provider’s remote agreement.

### Paddle: remote provider subscription

ArraySubs Pro creates Paddle products, prices, transactions, and subscriptions. Paddle owns future billing as the remote provider/MoR path, and webhooks update local state. Its portal/update behavior remains tied to the Paddle subscription.

### Manual renewal

When no active automatic adapter applies, core can create a payable WooCommerce renewal order. This can provide a controlled contingency if customers are informed and access/grace behavior is defined. It is not automatic failover and requires customer action.

The [automatic versus manual subscription payment guide](/deals/arraysubs/resources/payments-and-compliance/automatic-vs-manual-subscription-payment-gateways/) explains that capability boundary in more detail.

## Why payment updates do not create cross-gateway failover

The current `PaymentMethodCoordinator` resolves the subscription’s existing gateway and asks that gateway for its update mechanism. Stripe can use its card update flow, Paddle can use a provider-hosted update, and PayPal can require reauthorization. The controller does not expose a generic “move this subscription to another gateway” action.

That is correct conceptually: updating a card inside a provider account is different from transferring a credential or creating a new wallet/MoR agreement. A customer seeing an “Update payment method” button should not be told that it selects any enabled gateway.

See [subscription payment tokens and card updates explained](/deals/arraysubs/resources/payments-and-compliance/subscription-payment-tokens-and-card-updates-explained/) and the [member payment-update recipe](/deals/arraysubs/use-cases/recipes/member-update-payment/).

## Build a gateway continuity card for every provider

Create one short operating card per enabled gateway. It should be usable by an incident responder who did not build the integration.

### Identity and ownership

Record the gateway slug, provider product, merchant entity and account, live/test mode, API app, billing-clock owner, WooCommerce extension, ArraySubs adapter, technical owner, finance owner, and provider support route. Do not place secrets on the card; link to the approved vault and rotation procedure.

### Installed population

Record active, trial, on-hold, scheduled-cancel, failed, and manual-fallback counts. Add recurring value, next 24/72-hour due value, currencies, countries, products, and high-risk cart shapes. Refresh this inventory on a defined schedule.

### Expected event chain

Write the expected chain for initial checkout and renewal. For Stripe that may include a local scheduled action, PaymentIntent, WooCommerce order, and webhook. For PayPal or Paddle, include the remote subscription/agreement and provider-owned due date. Mark the system of record at each transition.

### Customer recovery

Document the exact payment-update path, whether the customer remains inside the provider context, required reauthorization, manual-payment fallback, message template, grace/access policy, and support escalation. Test the link and permission with a synthetic customer rather than assuming the button exists.

### New-checkout alternative

List which products, cart shapes, countries, currencies, and methods the alternate gateway really supports. A backup that works for one simple monthly subscription does not prove it works for a mixed cart, several subscriptions, different cycles, a trial, or a particular local method.

### Shutdown and exit

State how to stop new checkout without breaking installed renewals, how to stop remote billing, how long webhooks/refunds/disputes remain active, which records can be exported, and whether customer or provider participation is needed for migration.

The continuity card is operational documentation, not a substitute for the provider agreement or a full incident runbook. Its value is making gateway differences visible before pressure encourages a generic and unsafe action.

## A backup gateway has its own product constraints

The inspected ArraySubs capabilities say Stripe supports mixed carts, multiple subscriptions, and different cycles. PayPal declares those cart shapes unsupported. Paddle supports mixed carts and multiple subscriptions but not different cycles.

Current cart restrictions can derive store behavior from the most restrictive enabled automatic gateway. Enabling PayPal as a “backup” can therefore narrow mixed and multiple-subscription checkout; enabling Paddle can narrow different-cycle carts.

Test each material product and cart combination with the intended gateway portfolio. Resilience that removes a core checkout scenario is not free.

## Measure concentration before an incident

![Gateway cohorts, renewals due in 72 hours, concentration share, and tested continuity paths](/blogs/multi-gateway-resilience-for-subscription-stores/gateway-concentration.png)

### Gateway recurring-revenue share

```text
gateway recurring-revenue share
= recurring revenue assigned to gateway / total recurring revenue
```

Segment by current subscription metadata. Report manual separately. If currencies differ, state the conversion time and source instead of summing raw values.

### Renewal exposure in an incident window

```text
renewal value exposed
= scheduled renewal value in the incident window for the affected gateway

exposure share
= renewal value exposed / total scheduled renewal value in the window
```

Exposure is not predicted loss. A due renewal may succeed after recovery, move to manual payment, or not become payable because of cancellation or another lifecycle condition.

### Tested continuity coverage

```text
tested continuity coverage by recurring revenue
= recurring revenue with a documented, recently tested continuity path
  / total recurring revenue
```

Define “recently,” such as within the last quarter. An enabled alternate gateway does not qualify by itself. A tested path might be renewal through the original gateway while it is hidden from new checkout, a current-provider payment update, or a manual invoice with an approved communication and access sequence.

### Detection and restoration time

```text
MTTD = detected_at - incident_started_at
MTTR = normal_processing_restored_at - incident_started_at
```

Also set an RTO for restoring a safe checkout/renewal process and an RPO for the event/transaction interval the team can reconstruct from provider records. ArraySubs does not automatically calculate these incident metrics.

## Use symptom-based alerts, not one “gateway down” alarm

No single signal proves a subscription gateway incident. Combine several observations and attach a first diagnostic action.

| Signal | Possible meaning | First diagnostic | Avoid |
| --- | --- | --- | --- |
| Checkout error spike | Provider outage, credentials, method, JavaScript, account restriction | Reproduce exact cart/method; check provider and account | Switching all traffic before identifying scope |
| Due actions not running | Scheduler, cron, PHP, lock, cancellation guard | Inspect Action Scheduler and application errors | Blaming the provider before an API attempt exists |
| Provider success/local order unpaid | Webhook delay/failure, processing error, mapping issue | Find provider event/transaction and processed ledger | Retrying the charge blindly |
| Local renewal order/no provider transaction | API request failed, worker stopped, invalid credential | Inspect request/error and pending action | Marking paid or advancing dates manually |
| Declines concentrated on one customer/method | Funding, issuer, authentication, expiry | Classify provider decline and update eligibility | Calling a customer decline an outage |
| No recent processed webhook | No traffic, endpoint problem, secret/account/app mismatch | Compare provider event dashboard and expected volume | Treating silence as definitive failure |
| Remote renewal continues after local change | Remote agreement still owns schedule | Inspect provider subscription status and effective cancel date | Detaching or deleting more local metadata |

Alert thresholds should reflect baseline volume and time of day. A low-volume gateway may go hours without an event normally, while a high-volume renewal window needs much tighter expectations. Record denominators, not just counts.

## New-checkout continuity checklist

Before advertising a gateway as the checkout fallback, prove:

- the merchant account is live-approved for the product and countries;
- the exact product, variation, trial, signup fee, coupon, tax, shipping, and currency pass;
- mixed one-time/subscription carts work if the store sells them;
- multiple subscriptions and different cycles behave as intended;
- initial mandate or SCA authorization is created;
- the future renewal—not only the first payment—works;
- cancellation, refund, dispute, and payment update work;
- webhooks are signed, idempotent, and mapped to the right local objects;
- email, statement descriptor, invoice, tax, payout, and ledger reconcile;
- customer support understands the provider-specific experience;
- enabling the fallback does not impose unacceptable global cart restrictions.

Retest after gateway, extension, checkout, product, tax, or cart changes. A continuity test expires when the operating path changes.

## Change-management rules for a resilient gateway portfolio

Treat gateway configuration as production billing infrastructure. Require a review when someone enables or disables a method, rotates credentials, changes webhook apps or secrets, modifies cart capability flags, changes scheduler ownership, updates a gateway extension, edits cancellation behavior, or changes a provider account.

The change record should identify affected new checkouts, installed subscriptions, next due window, remote agreements, expected webhooks, rollback, and who watches the first renewals. Prevent staging and cloned sites from retaining live credentials and active renewal jobs. Keep test and live provider objects visibly separate.

Do not delete historic gateway metadata merely to make an admin screen look clean. Remote identifiers, transaction mappings, event evidence, and payment display data may still be needed for support, refunds, disputes, tax documents, or reconciliation. Apply a reviewed retention policy and limit access instead.

Finally, separate “method hidden from new buyers,” “adapter unavailable,” “remote schedule stopped,” and “historic access removed.” Those are four different states with different consequences. A resilient runbook names the intended state explicitly instead of using “disable the gateway” as a vague instruction.

## Reconciliation cases after an outage

### Provider charged, local state missing

Do not charge again. Retrieve the authoritative provider transaction and event, verify customer, amount, currency, period, and status, then repair processing through an idempotent webhook replay or controlled reconciliation. Confirm one paid renewal order and one date advancement.

### Local order exists, no provider attempt

Determine why the due action did not reach the provider. Check locks, scheduler, credentials, adapter availability, and cancellation guards. If a fresh attempt is safe, run the specific action through the normal processor so duplicate checks and logs remain intact.

### Provider request failed with unknown outcome

An HTTP timeout does not prove the provider did not process the request. Search by idempotency key, order metadata, customer, amount, and time before retrying. Escalate when the provider outcome cannot be established.

### Remote provider billed after local cancellation

Compare local cancellation mode/effective date with the remote agreement. If remote cancellation should have occurred, preserve events and timestamps, stop future billing through the provider-supported path, resolve refund/customer communication, and fix synchronization. Do not hide the evidence by detaching first.

### Customer decline during a provider incident

Keep two classifications. A genuine decline may still require update or retry after provider recovery, while an infrastructure failure should not be reported as customer fault. Provider reason codes, account-wide patterns, and later outcomes guide the distinction.

## Illustrative exposure example

Suppose a store has **$90,000** of renewals due in the next 72 hours:

| Billing context | Due value | Incident state |
| --- | ---: | --- |
| Stripe | $60,000 | Provider/API incident affects plugin-controlled charges |
| PayPal | $20,000 | Available |
| Paddle | $5,000 | Available |
| Manual | $5,000 | Available; customer action required |

```text
Stripe exposure share = $60,000 / $90,000 = 66.7%
```

This is invented data for method illustration. PayPal and Paddle may preserve some compatible new checkouts. They do not automatically take over the $60,000 of existing Stripe renewals. The exposed cohort needs Stripe recovery/retry, a manual path, customer reauthorization, or a planned processor-assisted migration. The table does not predict a loss or recovery rate.

## Gateway Health: useful evidence with a precise boundary

![ArraySubs Gateway Health overview for multiple configured gateways](/blogs/multi-gateway-resilience-for-subscription-stores/gateway-health-overview.png)

Gateway Health reports registered gateway configuration/readiness, test mode, subscription counts, latest stored processed-webhook evidence, endpoints, and capability flags. Stripe adds account/webhook checks.

This screen helps answer “is the adapter configured, and what has this installation processed?” It does not answer:

- is the provider globally or account-specifically up right now?
- will a particular issuer approve the renewal?
- did a webhook hit the edge but fail before the processed ledger?
- is Action Scheduler healthy?
- can another gateway charge this subscription?
- is every remote agreement consistent with local state?

The processed-event ledger also has a cleanup window. “No recent event” can mean no traffic rather than failure.

![Stripe webhook health and recent processed-event evidence](/blogs/multi-gateway-resilience-for-subscription-stores/stripe-webhook-health.png)

![PayPal webhook health and recent processed-event evidence](/blogs/multi-gateway-resilience-for-subscription-stores/paypal-webhook-health.png)

Use the [Gateway Health monitor recipe](/deals/arraysubs/use-cases/recipes/gateway-health-monitor/) as one layer of the operating runbook, not as automated cross-gateway orchestration.

## Incident runbook

![Incident timeline from detection through reconciliation, including a late webhook](/blogs/multi-gateway-resilience-for-subscription-stores/incident-timeline.png)

### Before the incident

1. Export a gateway-segmented subscriber and next-renewal inventory.
2. Record each gateway’s billing-clock owner, update flow, cart support, currencies, and countries.
3. Keep old adapters and credentials controlled but operational for installed subscriptions when the method is hidden from new checkout.
4. Test alternatives for every material product/cart shape.
5. Test customer payment updates on each current gateway.
6. Define incident owner, RTO, RPO, approval authority, communications, and reconciliation owner.
7. Record provider support paths and status pages.
8. Decide when manual billing is acceptable and how access/grace periods behave.

### Detect and triage

Timestamp the first symptom and scope. Separate checkout, plugin-scheduled renewal, remote-provider renewal, webhook, and local scheduler symptoms. Check the provider status, then this merchant account and endpoint. Compare renewals due with invoices/orders and provider transactions. Freeze bulk replay until duplicate-charge checks are available.

### Contain

Hide the affected method for new checkout where appropriate, while retaining the integration for installed renewals unless the runbook proves otherwise. Surface a compatible alternative for new checkout. Do not bulk detach subscriptions: the current detach operation reverts local billing to manual; it is not a provider migration or remote cancellation.

### Recover and reconcile

Build one timeline:

```text
scheduled action
→ renewal order
→ provider request/transaction
→ webhook or API result
→ processed event
→ final subscription status and next date
```

Classify each record as charged-remote/local-missing, local-order/no-charge, hard decline, soft decline, action required, or not attempted. Re-run only when provider evidence and the duplicate precheck show no success. Manually sync a sample from the current gateway. Communicate by cohort: no action, payment update required, or manual payment required.

Close only after provider transactions, local orders, subscription states, the future renewal calendar, and finance records agree.

## A tabletop exercise

Scenario: Stripe API calls fail at 09:00 on a high-volume renewal day. New checkout is partly available, and webhooks arrive late and out of order.

- **10:00:** provider status confirms an incident.
- **10:30:** two customers report duplicate authorization emails, but no duplicate settled charge is proven.
- **11:00:** PayPal is available, but the most valuable cart contains multiple subscriptions and conflicts with current PayPal capabilities.
- **12:00:** a Stripe webhook for an earlier success arrives after a local retry has been queued.

The exercise passes when the team distinguishes new checkout from installed renewals, refuses token copying or bulk gateway metadata changes, gates replay on provider transaction evidence, targets messages to the affected cohort, and reconciles late/duplicate events.

## Verification environment and limits

This guide was last verified on **July 22, 2026** against ArraySubs 1.8.11, ArraySubs Pro 1.1.2, WordPress 7.0.2, WooCommerce 10.9.4, current code, fresh local Gateway Health screens, and the primary provider and WooCommerce sources below.

We did not simulate a production provider outage, run a live renewal failure, migrate credentials, test every cart portfolio, replay live webhooks, or verify every customer update flow. Provider status and account behavior can change. Re-run the incident tests on the exact store before relying on them.

## Frequently asked questions

### Does ArraySubs automatically fail over a renewal?

No. The current resolver uses the gateway stored on the subscription. It does not pick a healthier alternate provider.

### Can I charge the saved Stripe card through PayPal or Paddle?

No generic path exists. Provider tokens, mandates, wallets, and remote agreements are provider/account-specific. Use a supported secure migration or customer authorization.

### Can I disable a broken gateway?

You can hide or disable it for new checkout when appropriate, but do not assume deactivating the integration is safe for existing renewals, webhooks, refunds, or disputes. Follow the cohort runbook.

### Is Gateway Health an uptime monitor?

It provides configuration and processed-event evidence. It does not continuously prove provider, merchant account, scheduler, edge webhook, or every renewal health.

### Should I replay all failed scheduled actions after recovery?

No. First reconcile provider transactions and local orders. A payment may have succeeded while its webhook was late. Re-run only when duplicate-charge controls prove no success.

### Does more gateways always mean more resilience?

No. A second gateway helps only for scenarios it supports and the team can operate. Current most-restrictive cart behavior can also narrow checkout when a constrained gateway is enabled.

## Final resilience checklist

- [ ] Gateway share and renewals due in 24/72 hours are visible by count and value.
- [ ] Each gateway’s scheduling owner and customer update path are documented.
- [ ] Alternate checkout is tested for every material cart/country/currency.
- [ ] Old adapters remain available for installed renewals, events, refunds, and disputes as required.
- [ ] Scheduler, provider API, account, webhook, decline, and adapter failures have separate checks.
- [ ] Manual billing and access/grace behavior have an approved customer path.
- [ ] Replay requires provider transaction and local order evidence.
- [ ] Customer communication targets the affected cohort.
- [ ] RTO, RPO, MTTD, MTTR, incident owner, and reconciliation owner are defined.
- [ ] A tabletop exercise has tested late/duplicate events and incompatible backup carts.

Review [ArraySubs payment gateway capabilities](/deals/arraysubs/features/#payment-gateways), [Stripe automatic billing and SCA](/deals/arraysubs/use-cases/recipes/stripe-automatic-billing-sca/), and [ArraySubs Pro pricing](/deals/arraysubs/pricing/) when building a tested multi-gateway operating model.

## Primary sources

- [WooCommerce subscription payment gateways](https://woocommerce.com/document/subscriptions/payment-gateways/)
- [WooCommerce Subscriptions FAQ](https://woocommerce.com/document/subscriptions/faq/)
- [WooCommerce renewal process](https://woocommerce.com/document/subscriptions/renewal-process/)
- [WooCommerce: Migrating subscribers](https://woocommerce.com/document/subscriptions/migrating-subscribers-woocommerce-subscriptions/)
- [Stripe: Import payment data](https://docs.stripe.com/get-started/data-migrations/pan-import)
- [Stripe webhook guidance](https://docs.stripe.com/webhooks)
- [Stripe status](https://status.stripe.com/)
- [PayPal production status](https://www.paypal-status.com/product/production)
- [Paddle status](https://paddlestatus.com/)
- [Paddle: Update payment details](https://developer.paddle.com/build/subscriptions/update-payment-details)

## Verification and update log

- **2026-07-22:** Verified current gateway resolver, payment-update coordinator, Gateway Health/event evidence, sync/detach boundaries, cart capability logic, local UI, and primary sources.
- **2026-05-29:** Editorial update date assigned for the initial publication package.

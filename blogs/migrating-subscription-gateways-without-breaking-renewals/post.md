---
title: "Migrating Subscription Gateways Without Breaking Renewals"
meta_title: "Migrate a Subscription Gateway Without Breaking Renewals"
meta_description: "A phased WooCommerce subscription gateway migration runbook covering tokens, mandates, schedules, webhooks, cohorts, reconciliation, rollback, and ArraySubs limits."
focus_keyphrase: "migrate WooCommerce subscription gateway"
published: "2026-03-27"
updated: "2026-06-20"
last_verified: "2026-07-22"
author: "ArraySubs Editorial Team"
reviewer: "ArraySubs Product Team"
---

# Migrating Subscription Gateways Without Breaking Renewals

Migrating a subscription gateway is not a settings change. A renewal only keeps working when the local subscription, renewal schedule, provider customer and payment credential, stored-credential authorization or mandate, remote billing agreement, webhook ownership, and finance records remain consistent through the handoff.

That is why “export the subscriptions, enable the new gateway, and disable the old one” is unsafe. A spreadsheet may describe the commercial subscription without containing a reusable credential. A local gateway switch may leave a remote PayPal or Paddle agreement billing. A successful payment at the new provider may never update WooCommerce if the wrong app owns the webhook. A cloned site may issue the same Stripe renewal as production.

> **Direct answer:** build a controlled migration manifest, classify who owns every next charge, prove credential and agreement portability with the providers, pilot a small cohort, migrate by due-date boundary, reconcile local/source/target state, and keep a rollback path. Exactly one scheduler or provider must be allowed to charge each subscription’s next billing period.

ArraySubs does not currently provide a generic bulk workflow that imports a competitor’s subscriptions, arbitrary next-payment dates, tokens, mandates, or remote billing agreements. Its CSV export can seed a business inventory, but it is not a migration manifest. Gateway Sync reads the current provider; it does not convert a subscription. Detach is not remote cancellation.

## Key takeaways

- Define the migration type before selecting a runbook: same account/integration change, same provider/different account, card-data transfer, or wallet/MoR/remote-agreement replacement.
- Treat credentials and authorizations as separate objects. A token identifier is not proof that the target can legally and technically charge it.
- Record the last renewal owned by the old path and the first renewal owned by the new path for every cohort.
- Safe dual run means both integrations remain available for the subscriptions they own—not that both may attempt the same charge.
- Keep old credentials and provider access long enough for webhooks, refunds, disputes, invoices, records, and late events, while preventing unintended new billing.
- Reconcile one provider transaction to one WooCommerce renewal order and one subscription date advancement.
- Rollback usually means stopping expansion and leaving unmigrated cohorts on the source. It rarely means instantly moving transferred credentials back.
- Use provider-approved secure transfer or customer reauthorization. Never move raw card data through WordPress, CSV, email, or a custom script.

![A controlled bridge moving subscription renewals from an old gateway to a new gateway](/blogs/migrating-subscription-gateways-without-breaking-renewals/featured-image.png)

## First define what is actually moving

“Gateway migration” covers several materially different operations.

### Same provider account, different WordPress integration

The remote customer and payment method may remain in the same account. The migration question becomes whether the new integration can use the existing object IDs and whether only one installation can issue each renewal. Even this apparently simple path needs webhook, idempotency, mode, and job-ownership controls.

### Same provider, different account or legal entity

Object IDs are often account-scoped. A payment method that exists in one account may not be chargeable in another. Ask the provider for an account-to-account migration and authoritative ID mapping. A merchant ownership relationship alone does not create portability.

### Cross-provider card migration

This can be possible through a coordinated PCI-controlled transfer. Stripe, for example, documents secure provider-to-provider import and export processes and supplies mappings because imported objects receive new IDs. This is not a CSV token export. The source and target processors must approve and operate the transfer, and the application has to consume the mappings.

### Wallet, bank mandate, Merchant of Record, or remote agreement migration

PayPal buyer-approved subscriptions, Paddle subscriptions, bank mandates, and other provider-hosted agreements may require a provider migration program, a new agreement, or buyer reauthorization. Do not generalize a card-transfer process to a wallet or reseller agreement.

The [Merchant of Record vs payment processor guide](/payments-and-compliance/merchant-of-record-vs-payment-processor-for-subscription-businesses/) explains why seller role, data control, and exit terms should have been evaluated before the original provider was selected.

## The seven-plane migration model

![Seven linked planes that must stay consistent through a gateway migration](/blogs/migrating-subscription-gateways-without-breaking-renewals/seven-plane-model.png)

| Plane | What must remain consistent | Failure if omitted |
| --- | --- | --- |
| Local subscription | Customer, product, amount, currency, interval, status, dates, cancel state | Wrong terms or an orphaned subscription |
| Renewal schedule | Precise due time, invoice lead time, retries, pending order, scheduling owner | Double, missed, early, or late charge |
| Payment credential | Provider customer, payment method/token mapping, reusable state, display metadata | Target cannot charge off-session |
| Authorization or mandate | Consent scope, stored-credential agreement, SCA/mandate evidence | Unauthorized or repeatedly challenged renewal |
| Remote agreement | Provider product, plan/price, subscription/agreement ID and status | Source keeps billing or target has no valid agreement |
| Webhooks and API app | Endpoint, live app/account, signing secret, event cursor, idempotency | Provider succeeds while local state remains stale |
| Finance and operations | Order, invoice, tax, transaction, refund/dispute, payout, ledger mapping | Revenue cannot reconcile and rollback is unsafe |

A migration is complete only when the seven planes agree for the intended cohort and the old path cannot create an unexpected future charge.

## Build a real migration manifest

Start with an access-controlled operational dataset. Do not email it around. Minimize personal data, restrict access, record ownership, and never put raw PAN or CVC into it.

![A protected migration manifest organizing identity, terms, dates, consent, cutover, and reconciliation](/blogs/migrating-subscription-gateways-without-breaking-renewals/migration-manifest.png)

| Field group | Recommended fields |
| --- | --- |
| Ownership | Cohort, owner, ticket/run ID, source and target environments |
| Local identity | ArraySubs subscription ID, customer ID/email, raw status, parent and pending renewal order IDs |
| Commercial terms | Product/plan/price, quantity, amount, currency, tax/discount, interval, trial/end/cancel state |
| Dates | Start, last successful charge, next due, retries, current period boundaries, timezone/source note |
| Source gateway | Gateway slug, mode, provider account/app, local status |
| Remote identity | Customer, payment method, mandate, agreement/subscription, product, plan/price, last transaction IDs |
| Payment state | Reusable/off-session eligibility, type, expiry/display metadata, latest failure/action, retry count |
| Consent/evidence | Agreement version/time, SCA or mandate reference, notice and reauthorization state |
| Webhook state | Endpoint/app, secret version, last acknowledged event, unresolved/replayed events |
| Cutover | Last old-owned renewal, first new-owned renewal, old stop time, new activation, rollback decision |
| Reconciliation | New mappings, first target result, order match, refund/dispute mapping, exception reason |

### Why the ArraySubs CSV is not enough

The current ArraySubs subscription export includes useful reporting fields: subscription ID, status label, customer, product, recurring amount and currency, cycle, dates, completed-payment count, payment-method title, and creation date.

It does not contain the full gateway slug and raw gateway state, remote customer/payment/agreement/plan/mandate IDs, provider app/account/mode, token portability evidence, consent records, pending order and retry state, complete tax and discount terms, webhook cursor, or cutover mapping. Use it as one authorized input and enrich it from WooCommerce, the provider, and finance records.

If an export contains just enough information to recreate a subscription row but not enough to prove the next charge, it is a report—not a migration control.

## Credential portability: prove it, do not infer it

A provider token is usually a reference meaningful inside a provider, account, vault, or integration. Copying the identifier does not copy the underlying credential or its authorization.

For cards, use an official provider-to-provider migration. Stripe’s current documentation says card data exports go only to a PCI DSS Level 1-compliant payment processor through secure encrypted transfer. It also notes that Link credentials are not included. Imported payment data receives new Stripe objects, and your application must map the source records to those new IDs.

For stored credentials and merchant-initiated renewals, preserve the agreement and authorization evidence. Visa and Mastercard rules distinguish the customer-initiated setup from later merchant-initiated charges. In European SCA contexts, a valid mandate and the absence of payer action matter to the later transaction treatment. A transfer plan that only asks “did the token import?” is incomplete.

Use this decision sequence:

1. Is the target using the same provider account and legal merchant?
2. Can the target integration consume the existing customer, payment method, mandate, and agreement IDs?
3. If the account changes, does the provider support an account-to-account transfer with mappings?
4. If providers change, do both processors approve a PCI-controlled transfer?
5. Is the payment method a card, wallet, bank mandate, or hosted remote agreement?
6. What consent, notice, SCA, or reauthorization action is required?
7. What update-payment fallback exists for records that cannot transfer?

The [subscription payment tokens and card updates guide](/payments-and-compliance/subscription-payment-tokens-and-card-updates-explained/) covers the difference between display metadata, provider tokens, reusable methods, and account/customer references.

## PayPal and Paddle need remote-agreement planning

PayPal Subscriptions uses a product, plan, and buyer-approved subscription model. PayPal webhooks are tied to the REST app that receives them; changing apps can change which events arrive. No generic public rule proves that an arbitrary PayPal agreement or token can be moved to another processor. Obtain account-specific guidance and be prepared to create a new buyer authorization.

Paddle’s public migration guide is useful as a pattern for cohorts, mappings, parallel operation, and cancellation sequence, but its documented path is Paddle Classic to Paddle Billing. It must not be presented as proof that a competitor’s subscription agreement can be imported into Paddle.

For a remote agreement, record both the provider’s effective cancellation boundary and the target agreement’s first billing boundary. A local status change does not replace either.

## Scheduling ownership is the double-charge control

The current ArraySubs adapters use two scheduling models:

- For the inspected **Stripe** path, ArraySubs owns the precise renewal schedule. At due time, Pro creates or confirms an off-session PaymentIntent through the official WooCommerce Stripe integration.
- For **PayPal and Paddle**, the remote provider subscription owns future billing. ArraySubs reaches the local due state and waits for provider payment and webhook events rather than independently charging the same cycle.

That means a cutover must branch by gateway.

For a locally scheduled Stripe cohort, ensure that an old site, clone, worker, scheduled action, and new site cannot issue competing PaymentIntents. For PayPal or Paddle, stop or transition the remote agreement using the provider-supported action and verify its effective state before enabling a replacement schedule.

ArraySubs locks and pending-order checks reduce duplicate concurrent work inside one installation. They do not coordinate an old website, a second account, or a remote agreement that is still live.

## Safe dual run

![Timeline showing one charging owner before and after a per-cohort cutover boundary](/blogs/migrating-subscription-gateways-without-breaking-renewals/safe-dual-run.png)

Safe dual run means both integrations remain operational for the cohorts they own while exactly one owner is allowed to charge each subscription’s next period.

It does **not** mean:

- enable both and see which succeeds first;
- allow duplicate attempts and refund one later;
- disable the old webhook while its agreements still bill;
- change the local gateway before stopping the remote schedule;
- let a production clone keep live credentials and renewal jobs.

Create a billing-boundary field per subscription or cohort:

```text
Subscription 461
Last source-owned period: 2026-08-01 through 2026-08-31
Source result required: reconciled paid order or final owned failure
First target-owned renewal: 2026-09-01 at approved site timezone
Old remote stop/effective state: verified
Target credential/agreement: active and mapped
```

The dates are illustrative. The control is the explicit ownership boundary, not a universal number of days.

## A phased migration runbook

### 1. Freeze scope and assign owners

Record source and target entities, accounts, apps, modes, products, countries, currencies, provider contacts, data owner, finance owner, support owner, technical owner, and incident decision-maker. Pause unrelated gateway and schema changes.

### 2. Export and enrich inventory

Reconcile active, trialing, paused, scheduled-cancel, overdue, failed, retrying, and pending-renewal populations across ArraySubs, WooCommerce orders, provider APIs/exports, webhook logs, and the ledger. Resolve count differences before moving money.

### 3. Classify portability and scheduling owner

For every cohort, write whether ArraySubs or a remote provider owns the next charge. Mark each credential, mandate, and agreement as reusable, provider-transferable, mapped, reauthorization-required, or unsupported.

### 4. Define the billing boundary

Write the last old-owned renewal and first new-owned renewal. Near-due records may stay on the source for one final cycle. Farther-from-due records with proven portable credentials may move earlier. Failed and retrying subscriptions become exception cohorts.

### 5. Build the target without exposing every renewal

Configure live and test credentials, webhook endpoint and secrets, payment methods, currency, tax, descriptors, emails, retries, action-required handling, logs, and monitoring. Verify that environment separation prevents test and production cross-talk.

### 6. Test synthetic and internal subscriptions

Exercise initial authorization, a real renewal path in the appropriate safe environment, action-required/decline behavior, retry, refund, cancellation, payment update, delayed and duplicate webhooks, finance reconciliation, and old-path suppression.

### 7. Pilot a small real cohort

Choose representative, low-risk subscriptions with enough time before due dates. Avoid only testing the easiest card, country, currency, and status. Compare local, source, target, and ledger state after every event.

### 8. Expand by due-date cohorts

Move controlled batches. Reconcile the first target renewal before expanding. Maintain an update-payment or reauthorization route for accounts that did not transfer.

### 9. Stop the old owner at the proven boundary

Cancel or transition the authoritative remote schedule through the provider. Confirm the effective time and events. Prevent new signups and unintended billing while preserving required access for refunds, disputes, and late events.

### 10. Reconcile and monitor

Track first target renewals, duplicate/missing orders, webhook lag, action-required failures, taxes and invoices, payouts, refunds, disputes, support contacts, and manual-payment fallbacks.

### 11. Close after the risk tail

Retain mappings and evidence under an approved policy. Resolve every exception. Rotate or revoke old credentials only when event, refund, dispute, and record obligations allow it.

## Migration preflight questions that must have named owners

Before approving the pilot, run a review where every answer has an owner, a source, and a pass/fail result.

### Product and commercial terms

- Can the target represent every active product, variation, quantity, interval, currency, trial, end date, discount, tax treatment, and cancellation state?
- If a legacy price no longer exists in the catalog, what target object preserves it without changing the contract?
- Which subscriptions contain a pending switch, pause, skip, cancellation, retry, credit, refund, or manual balance that prevents a clean bulk move?

### Credential and authorization

- Which payment methods are reusable off-session at the target?
- Which imported credentials receive new identifiers, and who loads the mapping?
- Which wallets or mandates cannot transfer?
- What evidence supports future merchant-initiated renewals?
- What does the customer see if reauthorization fails, expires, or is abandoned?

### Scheduling and state

- Which system currently owns invoice generation, the due-time attempt, retry, and date advancement?
- Can a pending renewal finish after the nominal cutover time?
- How are trial endings, scheduled cancellations, pauses, and timezones represented at both ends?
- What suppresses production clones, old workers, and provider-hosted schedules?

### Webhooks and API access

- Which live app and account signs each event?
- Are old and new event IDs globally unique inside your idempotency store?
- Can the provider replay events, and from what retention window?
- How will an event arriving out of order or after rollback be reconciled?
- Which secrets can be rotated only after the risk tail?

### Finance and customer operations

- Can finance trace source and target transaction IDs to one renewal order and ledger entry?
- Who owns a refund or chargeback for a source transaction after the target goes live?
- Which invoice or tax document must be corrected if the boundary is wrong?
- What message does support send for reauthorization, a missed renewal, or a suspected duplicate?
- Who can pause the migration, and who can authorize refunds?

An unanswered preflight item is not necessarily a reason to abandon the migration. It is a reason not to expose the next cohort until the uncertainty is bounded.

## Incident controls for the first target renewals

The first target renewal is the real migration test. A successful setup authorization or sandbox transaction does not prove that the stored credential, mandate, due-time job, webhook, order mapping, tax, and ledger will work together on the future date.

Create a first-renewal watchlist with subscription ID, due time, old owner, new owner, target credential/agreement, expected amount/currency, expected order, and assigned observer. Check it at four points:

1. **Before due:** target ownership is active, old ownership is suppressed, and no unresolved source attempt exists.
2. **At provider result:** one authorized attempt exists with the expected amount and method.
3. **After webhook processing:** one renewal order is paid or one explicit failure/action state is recorded; the subscription advances only once.
4. **After settlement:** fees, tax, payout, invoice, and ledger mapping reconcile.

For a suspected duplicate, stop expansion immediately. Do not cancel both transactions automatically before determining which one is valid, settled, refundable, or already tied to fulfillment. Preserve provider event IDs, order IDs, request logs, timestamps, and customer communication. Assign one person to make the refund decision and another to verify the resulting subscription schedule.

For a missed charge, do not simply run every due action again. Establish which owner was supposed to bill, whether a remote provider result is late, whether an order is already pending, and whether the customer must act. Recovery should create one traceable attempt and one customer-visible outcome.

## Treat due dates as cohorts, not a site-wide switch

| Cohort | Safer default | Required proof before moving |
| --- | --- | --- |
| Renewal processing or pending | Complete and reconcile on source | One result, one renewal order, no unresolved action |
| Near due | Let source own one final renewal, then move | Old result and next boundary confirmed |
| Farther due with portable credential | Migrate in controlled batch | Target off-session eligibility and mapping proven |
| Reauthorization required | Collect new authorization before target ownership | New mandate/agreement active |
| Failed or retrying | Exception runbook | Retry owner, balance, notices, and next action defined |
| Paused or cancel-at-period-end | Preserve semantics | Local and provider resume/cancel rules mapped |

Stripe Billing publishes useful small-batch, anchor, tax, discount, and trial migration guidance. However, the current ArraySubs Stripe path uses ArraySubs scheduling and PaymentIntents rather than Stripe Billing Subscriptions. Use Stripe’s document as an operational reference, not as an executable ArraySubs import recipe.

The current ArraySubs admin also rejects arbitrary edits to `next_payment_date`. Preserving competitor dates may require purpose-built, reviewed migration code that respects lifecycle and scheduler invariants. No generic date-import workflow was found in the inspected build.

## Three-way reconciliation and rollback

![Three-way local, source, and target reconciliation with a stop-expansion rollback path](/blogs/migrating-subscription-gateways-without-breaking-renewals/reconciliation-and-rollback.png)

For every migrated subscription, compare local ArraySubs/WooCommerce state, source provider state, and target provider state.

| Control | Pass condition |
| --- | --- |
| Identity | One local subscription maps to the intended customer and remote objects |
| Billing boundary | Exactly one provider or scheduler owns the next renewal |
| Commercial terms | Amount, currency, interval, quantity, tax/discount, trial/end/cancel match |
| Date | Source of truth, timezone, last paid, and next due are explicit |
| Credential/mandate | Target can make the intended off-session charge or reauthorization is pending |
| Webhooks | Correct app signs events; duplicates are idempotent; delays reconcile |
| Order/payment | One provider success maps to one paid renewal order and date advancement |
| Failure/action | Decline, action required, retry, and manual fallback have an owner |
| Finance | Transaction, fee, tax, payout, refund/dispute, and ledger records reconcile |
| Old path | No unexpected new charge; required historic access remains |

Define pause criteria before the pilot: any duplicate-charge signal, object-mapping mismatch, unexplained reconciliation variance, webhook backlog, target error rate, or support spike can justify stopping expansion.

Rollback normally means:

- stop adding cohorts to the target;
- leave unmigrated subscriptions on the source;
- preserve migrated mappings and authorizations;
- decide case by case whether an old agreement can legally and technically resume;
- reconcile and refund any error;
- process late source and target events idempotently.

It does not mean assuming a secure credential transfer is instantly reversible.

## ArraySubs tools that help—and their boundaries

### Gateway filter and CSV export

The subscription list can group the population by gateway, and the CSV can seed commercial inventory. It does not export credentials or define a cutover.

![ArraySubs subscription list filtered by payment gateway](/blogs/migrating-subscription-gateways-without-breaking-renewals/subscription-gateway-filter.png)

### Subscription billing context

The subscription detail screen can expose gateway and billing context for supported paths. Use it for per-record inspection, not as proof that a remote object has moved.

![Subscription detail showing current billing context](/blogs/migrating-subscription-gateways-without-breaking-renewals/subscription-billing-context.png)

### Gateway Health

Gateway Health surfaces setup, mode, availability, subscription count, webhook state, endpoint, and capabilities. It is useful for preflight and monitoring. It is not a transfer engine or uptime guarantee.

![Gateway Health overview used as a migration preflight screen](/blogs/migrating-subscription-gateways-without-breaking-renewals/gateway-health-overview.png)

### Sync and Detach

Gateway Sync asks the current provider adapter for fresh state. It does not convert or remap the subscription.

The current Detach endpoint removes local gateway and payment display metadata. It does not call the provider to cancel remote billing. Several remote identifiers can remain in post meta. Do not use Detach as the cutover for a live PayPal or Paddle subscription. Stop or transition the remote schedule through the provider-supported path first, verify the state, and then apply the tested local change.

Manual fallback can preserve a payable renewal opportunity when no automatic path is available. It does not preserve automatic renewal or create consent for a new provider.

Review the [payment gateway feature overview](/deals/arraysubs/features/#payment-gateways), [Gateway Health monitor recipe](/deals/arraysubs/use-cases/recipes/gateway-health-monitor/), [Stripe automatic billing and SCA recipe](/deals/arraysubs/use-cases/recipes/stripe-automatic-billing-sca/), and [member payment-method update recipe](/deals/arraysubs/use-cases/recipes/member-update-payment/) as operational inputs.

## Two worked migration patterns

### ArraySubs Stripe to another processor

Reconcile ArraySubs-owned dates and active subscriptions. Ask the source and target processors for a PCI-controlled transfer and mappings. Preserve stored-credential evidence, identify methods requiring new authorization, and build the target renewal implementation with idempotent orders and webhooks. Pilot far-from-due accounts, then expand by cohort. Ensure old sites and jobs cannot issue PaymentIntents. Verify every first target renewal.

This is a conceptual runbook. The inspected ArraySubs build has no generic target-processor importer.

### ArraySubs PayPal or Paddle to a new gateway

Inventory remote products, plans, subscriptions/agreements, local state, and next billing dates. Obtain provider-specific migration guidance. Create new buyer authorizations where required. Record last source and first target periods. Cancel or transition the remote agreement through the provider, verify it, and only then change local ownership. Reconcile late webhooks, refunds, disputes, and the first target renewal.

## Verification environment and limits

This guide was last verified on **July 22, 2026** against ArraySubs 1.8.11, ArraySubs Pro 1.1.2, WordPress 7.0.2, WooCommerce 10.9.4, current local gateway interfaces, and the primary provider and card-network sources below.

We did not execute a production provider migration, secure PAN transfer, buyer reauthorization, live renewal, webhook replay, refund, or rollback. The UI evidence is a synthetic/local environment. Provider account, contract, country, payment method, and network rules must be verified for the actual migration.

## Frequently asked questions

### Can I change the gateway setting on existing subscriptions?

A local setting can change local routing without moving the underlying credential, mandate, or remote agreement. That can stop automatic renewal or create double billing. Use a provider-approved, cohort-based migration plan.

### Can ArraySubs export payment tokens?

The current CSV is a business report and does not export a generic portable credential. Sensitive card transfers should happen only through approved PCI-controlled provider processes.

### Does Gateway Sync migrate a subscription?

No. Sync queries current state through the existing adapter. It does not convert a Stripe, PayPal, or Paddle subscription into another provider’s objects.

### Does Detach cancel a remote subscription?

No. The inspected endpoint changes local state and metadata; it does not call the remote provider to stop billing. Verify remote cancellation or transition before a local cutover.

### Can PayPal or Paddle subscriptions move without customer action?

Do not assume so. Provider-hosted agreements can require a supported provider migration program or new buyer authorization. Ask both providers about the exact account and product path.

### Should I disable the old extension after cutover?

Not immediately by default. Historic webhooks, remote renewals, refunds, disputes, invoices, and records may still depend on it. Disable new signups separately from retaining controlled access to old objects and events.

### How do I prevent double charging?

Record one charging owner for each next billing period, stop the old owner at the verified boundary, make the new path idempotent, suppress old jobs/sites, and reconcile provider transactions against renewal orders.

## Final migration checklist

- [ ] Source and target accounts, entities, apps, modes, owners, and provider contacts are recorded.
- [ ] Active, trial, paused, cancelling, failed, retrying, and pending populations reconcile.
- [ ] Every cohort has a scheduling owner and portability classification.
- [ ] Credentials move through a provider-approved secure process or customers reauthorize.
- [ ] Consent, mandate, SCA, and stored-credential evidence is preserved.
- [ ] Last source-owned and first target-owned billing periods are explicit.
- [ ] Webhook apps, endpoints, secrets, replay, and idempotency are verified.
- [ ] One target transaction maps to one renewal order and one date advancement.
- [ ] Old remote billing is stopped only at the proven boundary.
- [ ] Refunds, disputes, invoices, records, and late events remain operable.
- [ ] Pause thresholds, incident owners, customer communication, and rollback are approved.
- [ ] First target renewals and finance payouts reconcile before cohort expansion.

ArraySubs can help operate and observe supported gateway paths, but a real migration still needs provider coordination and a purpose-built data/control plan. [Choose an ArraySubs plan](/deals/arraysubs/pricing/) after confirming that the target gateway and migration path meet your recurring-payment requirements.

## Primary sources

- [Stripe data migrations overview](https://docs.stripe.com/get-started/data-migrations/overview)
- [Stripe card-data export](https://docs.stripe.com/get-started/data-migrations/pan-export)
- [Stripe card-data import](https://docs.stripe.com/get-started/data-migrations/pan-import)
- [Stripe migrated-data mappings](https://docs.stripe.com/get-started/data-migrations/map-payment-data)
- [Stripe subscription migration guidance](https://docs.stripe.com/billing/subscriptions/migrate-subscriptions)
- [PayPal REST webhooks](https://developer.paypal.com/api/rest/webhooks/)
- [PayPal Subscriptions integration](https://developer.paypal.com/subscriptions/integrate)
- [Paddle migration overview: Classic to Billing](https://developer.paddle.com/migrate/)
- [PCI SSC third-party service-provider responsibility](https://www.pcisecuritystandards.org/faqs/1312/)
- [Visa stored-credential framework](https://usa.visa.com/content/dam/VCOM/global/support-legal/documents/stored-credential-transaction-framework-vbs-10-may-17.pdf)
- [Mastercard Transaction Processing Rules](https://www.mastercard.us/content/dam/public/mastercardcom/na/global-site/documents/transaction-processing-rules.pdf)
- [EBA mandate and SCA Q&A](https://www.eba.europa.eu/single-rule-book-qa/qna/view/publicId/2018_4031)
- [WooCommerce Subscriptions payment gateways](https://woocommerce.com/document/subscriptions/payment-gateways/)

## Verification and update log

- **2026-07-22:** Verified ArraySubs migration-related exports, REST limits, adapter scheduling ownership, Detach behavior, Gateway Health, and current provider migration documentation.
- **2026-06-20:** Editorial update date assigned for the initial publication package.

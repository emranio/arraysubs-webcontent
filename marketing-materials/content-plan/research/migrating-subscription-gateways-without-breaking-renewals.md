# Research notes: Migrating subscription gateways without breaking renewals

- Article ID: A067
- Research completed: 2026-07-22
- Last verified: 2026-07-22
- Product source inspected: ArraySubs 1.8.11 and ArraySubs Pro 1.1.2
- Verification environment: local source review only; no live provider migration, buyer reauthorization, webhook replay, or renewal charge was executed
- Intended use: durable evidence and editorial guidance for the eventual article, not publish-ready copy

## Direct answer to preserve

A subscription gateway migration is not a settings change. It is a controlled transfer across at least seven linked planes: the local subscription record, the renewal schedule, the provider customer/payment credential, any mandate or buyer authorization, any remote billing agreement/subscription, webhook ownership, and finance/reconciliation records. A safe plan inventories and classifies all seven, proves whether each credential or agreement can move, pilots a small cohort, prevents old and new systems from charging the same renewal, reconciles every state transition, and preserves a rollback path.

ArraySubs does not currently provide a generic bulk workflow that migrates a competitor’s subscriptions, tokens, mandates, or remote billing agreements. Its CSV export is useful as a business report but is not a migration manifest. Gateway sync reads current provider state; it does not convert a subscription to another provider. Detach is not a remote cancellation and must not be used as a cutover shortcut.

## Evidence labels used below

- **Source fact**: supported by a current primary source linked next to the claim.
- **ArraySubs code fact**: verified in local Free or Pro source at the version above; it is not a provider guarantee.
- **Editorial recommendation**: a proposed runbook, table, calculation, example, or control.
- **Limitation/inference**: a conclusion that must remain qualified and be revalidated for the actual provider accounts and contracts.

## 1. Define the migration object before choosing a runbook

### Editorial recommendation: seven-plane model

| Plane | What must remain internally consistent | Common failure if omitted |
| --- | --- | --- |
| Local subscription | Customer, product/price, amount, currency, interval, status, dates, cancel state | Wrong amount/status or an orphaned subscription |
| Renewal scheduling | Who owns the next charge, precise due time, invoice lead time, retries, pending order | Double charge, missed charge, or early/late renewal |
| Customer/payment credential | Provider customer ID, token/payment method, fingerprint/mapping, display metadata | New gateway cannot charge off-session |
| Authorization/mandate | Consent scope, stored-credential agreement, mandate ID/reference, SCA evidence | Unauthorized or repeatedly challenged renewals |
| Remote agreement | Provider plan/price/subscription/agreement ID and its state | Old provider continues billing after local switch |
| Webhooks/API app | Endpoint, signing secret, provider account/app, mode, event cursor/idempotency | Payment succeeds but local subscription never updates |
| Finance/operations | Renewal order, invoice, tax, transaction/refund/dispute, payout and ledger mapping | Unreconciled revenue or unsafe rollback |

The article should explicitly distinguish these four migration types because they have different risk:

1. Same provider and same merchant account, changing only the WordPress integration.
2. Same provider, moving to a different provider account or legal entity.
3. Cross-provider migration where sensitive card data might be transferred securely.
4. Wallet/MoR/remote-agreement migration that normally needs a provider migration program, a new agreement, or buyer reauthorization.

## 2. Inventory: build a real migration manifest

### Editorial recommendation: original manifest schema

The working manifest should be an access-controlled operational dataset, not an emailed spreadsheet. Keep only the minimum sensitive data and never place raw PAN/CVC in it.

| Field group | Recommended fields |
| --- | --- |
| Ownership | Migration cohort, owner, ticket/run ID, source environment, target environment |
| Local identity | ArraySubs subscription ID, WordPress customer ID/email, current raw status, parent order ID, pending renewal order ID |
| Commercial terms | Product/plan/price IDs, quantity, amount, currency, taxes/discounts, billing interval/count, trial/end/cancel-at-period-end state |
| Dates | Start, last successful charge, next payment due, retry dates, current period start/end, timezone/source-of-truth note |
| Source gateway | Gateway slug, test/live mode, provider account/app, local gateway status |
| Remote identity | Provider customer, payment method/token, mandate, agreement/subscription, product, plan/price, last transaction IDs |
| Payment state | Reusable/off-session eligibility, payment-method type, expiry/display metadata, latest failure/action state, retry count |
| Consent/evidence | Stored-credential agreement version/time, SCA/mandate reference, buyer notice/reauthorization state |
| Webhook state | Endpoint/app, signing-secret version, last acknowledged event, unresolved events, idempotency/replay status |
| Cutover | Planned last old-owned renewal, first new-owned renewal, old cancellation time, new activation time, rollback decision/time |
| Reconciliation | New object mapping, first target charge result, local order/payment match, refund/dispute mapping, exception reason |

### ArraySubs code fact: the current export is not this manifest

`arraysubs/src/Features/SubscriptionAdmin/REST/ExportController.php` exports useful reporting fields such as ID, status label, customer, product, amount, currency, billing cycle, start/next/last/end dates, completed-payment count, payment-method title, and created date. It does **not** export the gateway slug, raw gateway status, remote customer/payment-method/subscription/agreement/plan/mandate identifiers, source app/account/mode, pending or parent order IDs, retry state, tax/discount detail, webhook state, consent evidence, or cutover mapping. The eventual article should say: use it to seed a business inventory, then build and validate a separate migration manifest from authorized sources.

## 3. Credential and agreement portability

### Source facts

- Stripe has provider-to-provider migration processes for customer and payment data. Its overview distinguishes migrations of customer/payment data and says merchants should maintain an update-card fallback. The process is secure and coordinated rather than a CSV import: [Stripe data migrations overview](https://docs.stripe.com/get-started/data-migrations/overview).
- Stripe exports card data only to a PCI DSS Level 1-compliant payment processor through encrypted secure transfer. Stripe also says Link credentials are not included/transferable. This is strong evidence against “download your tokens and upload them elsewhere”: [Stripe PAN export](https://docs.stripe.com/get-started/data-migrations/pan-export).
- Stripe can import payment data as Stripe PaymentMethods, and imported objects receive new Stripe IDs/mappings. A successful import still requires the application to ingest and use those mappings: [Stripe PAN import](https://docs.stripe.com/get-started/data-migrations/pan-import) and [mapping migrated payment data](https://docs.stripe.com/get-started/data-migrations/map-payment-data).
- PCI SSC says merchants retain responsibility for oversight and written responsibility allocation with third-party service providers. Tokenization can reduce exposure, but it does not make tokens universally portable or remove merchant responsibilities: [PCI SSC FAQ 1312](https://www.pcisecuritystandards.org/faqs/1312/) and [PCI SSC Tokenization Guidelines](https://www.pcisecuritystandards.org/documents/Tokenization_Guidelines_Info_Supplement.pdf).
- Visa’s stored-credential framework and Mastercard’s transaction rules require a valid merchant-cardholder agreement/express authorization for stored credentials and subsequent merchant-initiated transactions. Treat consent/mandate evidence as a first-class migration object, not a token attribute: [Visa stored-credential framework](https://usa.visa.com/content/dam/VCOM/global/support-legal/documents/stored-credential-transaction-framework-vbs-10-may-17.pdf), [Visa merchant library](https://usa.visa.com/support/merchant/library.html), and [Mastercard Transaction Processing Rules](https://www.mastercard.us/content/dam/public/mastercardcom/na/global-site/documents/transaction-processing-rules.pdf).
- The EBA has stated that remote establishment of a mandate is subject to strong customer authentication and that later genuine payee-initiated transactions can fall outside SCA only when they rest on a valid mandate and involve no payer action: [EBA Q&A 2018_4031](https://www.eba.europa.eu/single-rule-book-qa/qna/view/publicId/2018_4031) and [EBA Q&A 2018_4131](https://www.eba.europa.eu/single-rule-book-qa/qna/view/publicId/2018_4131).

### Editorial recommendation: portability decision tree

```text
Is the target the same provider account and legal merchant?
├─ Yes → Can the target integration use the existing customer/payment/agreement IDs?
│  ├─ Yes → Map and pilot; do not recreate remote billing blindly.
│  └─ No → Obtain provider/integration-specific migration guidance.
└─ No
   ├─ Same provider, different account/entity?
   │  └─ Ask provider for an account-to-account migration and authoritative ID mapping.
   ├─ Cards held by a processor?
   │  └─ Ask both processors for a PCI-controlled transfer; preserve consent and update-card fallback.
   └─ Wallet, bank mandate, MoR, or provider-hosted billing agreement?
      └─ Do not assume portability. Use an official migration program or buyer reauthorization/new agreement.
```

### Provider-specific qualification

- PayPal says webhook events are associated with the specific REST app that created/owns them; a different app on the same account does not automatically receive those events. App/credential rotation is therefore part of migration design: [PayPal REST webhooks](https://developer.paypal.com/api/rest/webhooks/) and [PayPal Webhooks Events dashboard](https://developer.paypal.com/api/rest/webhooks/events-dashboard/).
- PayPal’s public Subscriptions model is product → plan → buyer-approved subscription. No current generic public source proving arbitrary PayPal agreement/token portability into another processor was found. The article must say “ask PayPal for the exact account/product migration path” rather than promise portability: [PayPal Subscriptions integration](https://developer.paypal.com/subscriptions/integrate) and [PayPal Subscriptions documentation](https://developer.paypal.com/docs/subscriptions/).
- Paddle’s public migration documentation reviewed here is for **Paddle Classic to Paddle Billing**, not a generic competitor-to-Paddle import. It contains useful operational patterns—parallel running, cohorts, mappings, import events, and cancellation sequencing—but must not be generalized as proof that any provider’s agreements can be imported: [Paddle migration overview](https://developer.paddle.com/migrate/), [plan a migration](https://developer.paddle.com/migrate/plan/), and [port data from Paddle Classic](https://developer.paddle.com/migrate/start/port-data/).

## 4. Scheduling ownership and double-charge prevention

### ArraySubs code facts

- ArraySubs owns precise renewal scheduling for the Stripe adapter. Core schedules both invoice generation and due-time renewal processing; Pro creates/confirms an off-session Stripe PaymentIntent when payment is due. Relevant source: `arraysubs/src/Features/RecurringBilling/Services/RenewalScheduler.php`, `arraysubs/src/Features/RecurringBilling/Services/RenewalProcessor.php`, and `arraysubspro/src/Features/AutomaticPayments/Gateways/Stripe/StripeDelegate.php`.
- PayPal and Paddle own recurring billing schedules in their remote subscription objects. When ArraySubs reaches the local due time, it waits for provider payment/webhook completion rather than independently charging the buyer. Relevant source: `arraysubspro/src/Features/AutomaticPayments/Gateways/PayPal/PayPalGateway.php` and `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleGateway.php`.
- Therefore the cutover control differs by gateway. For Stripe, prevent both sites/jobs from issuing a PaymentIntent. For PayPal/Paddle, stop or cancel the remote agreement at the correct boundary and verify the provider state before allowing a replacement schedule to bill.
- Core renewal processing defends against some duplicate local work with pending-order checks and scheduler locks, but those controls do not coordinate with an old website, another provider account, or a remote agreement outside the current installation. Do not describe them as migration duplicate-charge protection.

### Critical limitation: ArraySubs “Detach” is not cancellation

The inspected Pro detach endpoint sets the local gateway status to detached and removes `_payment_gateway`, payment-method/session/last-transaction identifiers, and card display fields. It does not call the remote provider to cancel billing, and it leaves several remote identifiers such as customer, mandate, PayPal subscription, Paddle subscription, and plan IDs in post meta. Relevant source: `arraysubspro/src/Features/AutomaticPayments/REST/GatewayHealthController.php`, method `detachGateway()`.

**Editorial consequence:** never instruct a merchant to click Detach as the migration cutover. A remote PayPal/Paddle agreement could continue charging while ArraySubs falls back to manual payment or another gateway, creating a double-billing risk. First stop/transition the authoritative remote schedule using the provider-supported action, verify it, then change local state according to the tested runbook.

## 5. Phased migration runbook

### Editorial recommendation

1. **Freeze scope and assign owners.** Name source/target accounts, legal entities, environments, currencies, products, provider contacts, and an incident decision-maker. Stop unrelated gateway/schema changes.
2. **Export and enrich inventory.** Reconcile active, trialing, paused, canceling, overdue, failed, and pending-renewal populations across ArraySubs, WooCommerce orders, provider exports/APIs, webhooks, and finance ledgers.
3. **Classify scheduling owner and portability.** For every cohort, record whether ArraySubs or the remote provider owns the next charge and whether the credential, mandate, or agreement can be reused, mapped, transferred, or must be replaced.
4. **Define billing boundary per subscription.** Record the last renewal owned by the old path and the first renewal owned by the new path. Avoid a single site-wide timestamp when customer due dates vary.
5. **Build target configuration without exposing it to all renewals.** Configure live/test keys, webhook endpoint/secrets, payment methods, currencies, taxes, descriptors, email, failure handling, and monitoring. Verify environment separation.
6. **Pilot synthetic and internal subscriptions.** Prove initial authorization, first renewal, retry/action-required behavior, refund, cancel, payment update, webhook delay/replay, and reconciliation.
7. **Pilot a small real cohort.** Prefer a representative low-risk group with enough time before due dates. Compare provider and local state after every event; maintain an update-payment/reauthorization path.
8. **Migrate by due-date cohorts.** Near-due subscriptions can remain on the old path for one final renewal; migrate only after that result is reconciled. Subscriptions farther from due can move earlier. The threshold must reflect provider processing, communication, SCA, and support lead time—not a universal number of days.
9. **Cancel/disable the old owner only at the proven boundary.** Confirm remote cancellation/effective date and webhook state. Keep old credentials/extensions available for refunds, disputes, and event handling as required, while preventing new signups and unintended charges.
10. **Reconcile and monitor.** Check every first target renewal, missing/duplicate orders, provider events, action-required failures, tax/invoice records, payouts, refunds, disputes, support contacts, and manual fallbacks.
11. **Close only after the risk tail.** Retain authorized mappings and evidence, document exceptions, rotate/revoke old credentials when safe, and preserve access needed for refunds/disputes/records.

### “Dual run” must be defined precisely

Safe dual run means both integrations remain operational for the cohorts they own, while **one and only one owner is permitted to charge each subscription’s next billing period**. It does not mean both providers may attempt the same renewal and finance will refund the duplicate later.

## 6. Billing-date strategy

### Source facts and scope qualification

- Stripe Billing’s subscription-migration toolkit recommends small batches, monitoring first payments, coordinating creation/cancellation, and preserving billing anchors, taxes, discounts, and trials: [Stripe migrate subscriptions](https://docs.stripe.com/billing/subscriptions/migrate-subscriptions) and [Stripe import subscriptions toolkit](https://docs.stripe.com/billing/subscriptions/import-subscriptions-toolkit).
- **Limitation:** ArraySubs’ current Stripe integration does not use Stripe Billing Subscriptions for its renewal schedule; it creates PaymentIntents from the local ArraySubs schedule. The Stripe Billing toolkit is therefore an operational reference, not an executable ArraySubs procedure.

### ArraySubs limitation

The subscription admin endpoint intentionally rejects arbitrary edits to `next_payment_date` and states that ArraySubs calculates it automatically. Relevant source: the subscription admin REST update logic returning `next_payment_date_locked`. Do not promise a supported CSV/API path for importing arbitrary competitor next-payment dates. A real migration may require purpose-built, reviewed migration code that preserves ArraySubs lifecycle invariants; that capability is not present in the inspected generic UI/export.

### Editorial recommendation: due-date buckets

| Bucket | Suggested treatment | Required proof before moving |
| --- | --- | --- |
| Renewal already processing/pending | Complete and reconcile on source; do not move mid-attempt | One provider result, one local renewal order, no unresolved action |
| Near due | Usually let source own one final renewal; move after success/final failure | Old result and next boundary confirmed |
| Farther from due, portable credential | Migrate in controlled batch and verify mapping | Target reusable/off-session charge eligibility |
| Reauthorization required | Notify and collect new authorization before target ownership | New mandate/agreement active; old boundary recorded |
| Failed/retrying | Treat as exception cohort, not bulk-migrate blindly | Retry owner, balance, notices, and next action agreed |
| Paused/cancel-at-period-end | Preserve exact semantic state | Provider/local cancel and resume rules mapped |

## 7. Reconciliation, monitoring, and rollback

### Editorial recommendation: three-way reconciliation table

For every migrated subscription, compare local ArraySubs/WooCommerce state, source provider state, and target provider state.

| Control | Pass condition |
| --- | --- |
| Identity mapping | One local subscription maps to the intended customer and current remote objects |
| Billing boundary | Exactly one provider/scheduler owns the next renewal |
| Commercial terms | Currency, amount, interval, quantity, tax/discount, trial/end/cancel state match approved scope |
| Date | Source of truth, timezone, last paid date, and next due boundary are explicit |
| Credential/mandate | Target can legally and technically make the intended off-session charge, or reauthorization is pending |
| Webhooks | Correct live app/account signs events; duplicates are idempotent; delayed events reconcile |
| Order/payment | One successful provider transaction maps to one paid renewal order/subscription advancement |
| Failure/action | Requires-action, decline, retry, and manual fallback are visible and owned |
| Finance | Transaction, fee, tax/invoice, payout, refund/dispute, and ledger records reconcile |
| Old path | No unexpected new charge; required refund/dispute access remains |

### Rollback design

Rollback is usually “stop expanding the target and keep unmigrated cohorts on the source,” not “move already-transferred credentials back instantly.” Before the pilot, define:

- pause criteria: error rate, double-charge signal, webhook lag, mapping mismatch, reconciliation variance, support volume;
- which subscriptions have crossed an irreversible boundary;
- whether the old remote agreement still exists and may legally/technically resume;
- how target-created objects and authorizations will be treated;
- who communicates with affected buyers and reconciles/refunds an error;
- how provider events arriving after rollback are idempotently processed.

## 8. Verified ArraySubs migration capabilities and limits

### Capabilities that help operations

- Subscription list gateway filtering and CSV business export can help scope a population.
- Subscription details expose current gateway information and provider identifiers/last transaction in supported paths.
- Gateway sync can refresh current provider state and recent activity for the existing adapter.
- Gateway Health shows enabled/setup/availability, mode, subscription count, webhook state, endpoint, and adapter capabilities.
- Core can fall back to a payable renewal order/manual checkout when no active automatic gateway is available, which can be an explicitly communicated contingency for some cohorts.
- Central scheduler hooks and locks reduce duplicate concurrent local processing within one installation.

### Limits that must be explicit

- No generic bulk competitor-subscription import, next-date import, token import/export, mandate import, remote-agreement conversion, or provider-to-provider mapping workflow was found.
- Gateway sync is not migration; it queries the current provider/adapter.
- Detach is not remote cancel and is unsafe as a standalone cutover.
- Manual fallback preserves a payment opportunity; it does not preserve automatic renewal or customer consent for a new provider.
- The file `arraysubspro/src/DatabaseMigration.php` contains an internal one-time slug cleanup from `arraysubs_stripe` to `stripe`. It is not a gateway-data migration feature and must not be described as one.
- The Stripe adapter is locally scheduled; PayPal/Paddle are remotely scheduled. A single generic migration checklist must branch on this distinction.
- The inspected PayPal payment-update path says reauthorization/migration is required but returns no complete reauthorization URL. Customer reauthorization needs an independently verified workflow.
- Existing provider credentials/extensions may need to remain operational for events, refunds, disputes, and historic object access even after they are hidden from new checkout. Disabling an extension is not the same as disabling it as a new-signup payment option.

## 9. Two worked examples to include

### Example A: ArraySubs Stripe to another processor

1. Reconcile active subscriptions and ArraySubs-owned next dates.
2. Ask source and target processors whether a PCI-controlled card-data transfer is supported and obtain mappings; do not export token strings as if they were portable credentials.
3. Preserve stored-credential/mandate evidence and identify payment methods that need new authorization.
4. Configure the target renewal implementation, webhooks, retries, action-required handling, order idempotency, and monitoring.
5. Pilot a far-from-due cohort, then migrate by due-date bucket.
6. Ensure only the old or new local job can charge each due renewal; cloned/old sites must not retain live keys and active schedules.
7. Verify each first target charge and its one-to-one renewal-order mapping.

Label this as a conceptual runbook because the inspected ArraySubs build has no generic target-processor adapter/importer.

### Example B: ArraySubs PayPal or Paddle to a new gateway

1. Inventory remote product/plan/subscription/agreement and local subscription states.
2. Obtain provider-specific guidance; do not assume a wallet/MoR agreement or token can be ported.
3. Where needed, create a new target authorization/agreement through buyer action.
4. Record the remote provider’s last-owned billing period and target’s first-owned period.
5. Cancel or transition the old remote subscription through the provider-supported action and verify the effective state.
6. Only then change local gateway ownership. Do not use ArraySubs Detach as the remote cancellation.
7. Reconcile late source webhooks, refunds/disputes, and the first target renewal.

## 10. Screenshot and UI evidence opportunities

### Article-production captures completed 2026-07-22

The article production pass selected three synthetic/local evidence pairs from the current browser-tested screenshot library and mirrored the annotated copies into both article asset trees.

| Article asset | Original evidence | Annotation focus | Placement/context |
| --- | --- | --- | --- |
| `subscription-gateway-filter.png` | `a061-subscription-gateway-filter-original.png` | Gateway filter and list scope | Useful cohort inventory, not a migration engine |
| `subscription-billing-context.png` | `a063-subscription-billing-context-original.png` | Current subscription billing/gateway context | Per-record inspection does not prove remote transfer |
| `gateway-health-overview.png` | `a064-gateway-health-overview-original.png` | Mode, webhook, and provider health signals | Preflight visibility, not credential/agreement portability |

No live provider migration, secure PAN transfer, buyer reauthorization, renewal, refund, or rollback was executed. Capture a synthetic test environment during future refreshes; label plugin/provider versions and test/live mode.

1. **Subscription list:** show the All Gateways filter and Export CSV action. Annotate the export’s purpose and explicitly state that it is not a token/agreement migration file.
2. **Subscription detail gateway panel:** show gateway, remote identifiers, last transaction, Sync, and Detach. Annotate “Sync reads current provider state” and “Detach is not remote cancel.”
3. **Gateway Health:** show live/test mode, endpoint, last webhook, counts, and capabilities as the preflight control plane.
4. **Scheduled actions:** show the two ArraySubs core renewal hooks for a synthetic Stripe subscription and explain local scheduling ownership.
5. **PayPal/Paddle provider sandbox:** show the remote subscription status and next billing date next to local state to illustrate two-source reconciliation.
6. **Customer payment-update path:** capture Stripe portal/Paddle portal/PayPal behavior separately; do not imply identical capabilities.

## 11. Internal-link recommendations

Required commercial and recipe links:

- Payment gateway feature overview: `/deals/arraysubs/features/#payment-gateways`
- Stripe automatic billing and SCA recipe: `/deals/arraysubs/use-cases/recipes/stripe-automatic-billing-sca/`
- Member update-payment recipe: `/deals/arraysubs/use-cases/recipes/member-update-payment/`
- Gateway health monitor recipe: `/deals/arraysubs/use-cases/recipes/gateway-health-monitor/`

Useful contextual links from the content plan:

- A063, “Subscription payment tokens and card updates explained” — credential/token groundwork.
- A064, “Subscription webhooks and events every WooCommerce store should monitor” — event ownership and replay.
- A066, “Merchant of Record vs payment processor for subscription businesses” — contract and data/exit architecture.
- A068, “Choosing a subscription gateway by country and business model” — target-gateway eligibility before migration.
- A069, “Automatic vs manual gateway support for subscriptions” — contingency and capability language.
- A177, “WooCommerce subscription renewal failed: a recovery playbook” — exception handling.
- A178, “WooCommerce subscription renewals not running: WP-Cron and Action Scheduler checks” — scheduling diagnostics.
- A181, “How to recover a past-due WooCommerce subscription without double charging” — exact-once recovery control.
- A187, “How to test WooCommerce subscription webhooks safely” — migration preflight.
- Pricing page — one contextual CTA after verified ArraySubs capability/limit mapping: `/deals/arraysubs/pricing/`

## 12. Claims to avoid

- “Switch the gateway setting and existing renewals move automatically.”
- “ArraySubs exports/migrates payment tokens, mandates, or remote agreements.”
- “Tokens are portable because the merchant owns the customer.”
- “Detach cancels the provider subscription.”
- “Gateway sync converts or reattaches a subscription to a new provider.”
- “Dual run means both systems can attempt the same charge.”
- “All subscriptions can keep their dates through the current ArraySubs admin/CSV flow.”
- “PayPal/Paddle customers can always update payment details without reauthorization.”
- “Stripe’s Billing migration toolkit directly applies to ArraySubs Stripe.” It does not; ArraySubs currently uses its own schedule and PaymentIntents.
- “Disable/delete the old gateway extension immediately.” Historic webhooks, refunds, disputes, and remote billing may still depend on it.
- A universal freeze window such as “migrate every account seven days before renewal.” Use provider/account-specific timing and due-date cohorts.

## 13. Publication-day revalidation checklist

- Recheck the ArraySubs export schema, subscription update endpoint, detach behavior, adapter scheduling models, and Gateway Health UI.
- Confirm exact source and target provider accounts, legal entities, modes, APIs/apps, and signed migration support.
- Recheck Stripe’s current import/export requirements and whether the target processor is eligible for a secure transfer.
- Recheck PayPal app/webhook behavior and obtain account-specific migration guidance.
- Recheck whether Paddle exposes a current generic competitor migration program; do not reuse Paddle Classic guidance as proof.
- Test one initial authorization and at least one actual renewal in a safe live-value cohort where permitted; a sandbox alone does not prove network credential migration.
- Test delayed/duplicate webhooks, failure/action required, refund, cancel, and old-path suppression.
- Capture screenshots with synthetic data and redact customer IDs, provider IDs, keys, and signing secrets.

## 14. Primary source register

- Stripe data migrations overview: https://docs.stripe.com/get-started/data-migrations/overview
- Stripe PAN export: https://docs.stripe.com/get-started/data-migrations/pan-export
- Stripe PAN import: https://docs.stripe.com/get-started/data-migrations/pan-import
- Stripe migrated-data mappings: https://docs.stripe.com/get-started/data-migrations/map-payment-data
- Stripe Billing migrate subscriptions: https://docs.stripe.com/billing/subscriptions/migrate-subscriptions
- Stripe Billing import toolkit: https://docs.stripe.com/billing/subscriptions/import-subscriptions-toolkit
- PayPal REST webhooks: https://developer.paypal.com/api/rest/webhooks/
- PayPal Webhooks Events dashboard: https://developer.paypal.com/api/rest/webhooks/events-dashboard/
- PayPal Subscriptions integration: https://developer.paypal.com/subscriptions/integrate
- PayPal Subscriptions docs: https://developer.paypal.com/docs/subscriptions/
- Paddle migration overview, Classic-to-Billing scope: https://developer.paddle.com/migrate/
- Paddle migration planning, Classic-to-Billing scope: https://developer.paddle.com/migrate/plan/
- Paddle port data, Classic-to-Billing scope: https://developer.paddle.com/migrate/start/port-data/
- PCI SSC third-party responsibility FAQ: https://www.pcisecuritystandards.org/faqs/1312/
- PCI SSC Tokenization Guidelines: https://www.pcisecuritystandards.org/documents/Tokenization_Guidelines_Info_Supplement.pdf
- Visa stored-credential framework: https://usa.visa.com/content/dam/VCOM/global/support-legal/documents/stored-credential-transaction-framework-vbs-10-may-17.pdf
- Visa merchant library: https://usa.visa.com/support/merchant/library.html
- Mastercard Transaction Processing Rules: https://www.mastercard.us/content/dam/public/mastercardcom/na/global-site/documents/transaction-processing-rules.pdf
- EBA mandate/SCA Q&A: https://www.eba.europa.eu/single-rule-book-qa/qna/view/publicId/2018_4031
- EBA merchant-initiated transaction Q&A: https://www.eba.europa.eu/single-rule-book-qa/qna/view/publicId/2018_4131
- WooCommerce gateway guide, ecosystem context only: https://woocommerce.com/document/subscriptions/payment-gateways/
- WooCommerce payment-method changes, ecosystem context only: https://woocommerce.com/document/subscriptions/customers-view/subscriber-payment-methods/
- WooCommerce subscription migration FAQ, ecosystem context only: https://woocommerce.com/document/subscriptions/faq/
- WooCommerce add/modify subscription, ecosystem context only: https://woocommerce.com/document/subscriptions/add-or-modify-a-subscription/
- WooCommerce gateway integration, ecosystem context only: https://woocommerce.com/document/subscriptions/develop/payment-gateway-integration/

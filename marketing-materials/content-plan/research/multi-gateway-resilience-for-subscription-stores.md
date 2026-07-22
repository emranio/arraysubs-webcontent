# Research notes: Multi-gateway resilience for subscription stores

## Research record

- Content-plan ID: A069
- Planned URL: `/deals/arraysubs/resources/payments-and-compliance/multi-gateway-resilience-for-subscription-stores/`
- Research date: 2026-07-22
- Product source inspected: ArraySubs Free 1.8.11 and ArraySubs Pro 1.1.2 in the current working tree
- Scope: evidence and editorial inputs only; this is not an article draft
- Test boundary: source inspection and current primary-source research only. No browser staging or end-to-end incident simulation was performed for this research pass.
- Required article guardrail: never imply that adding a second gateway transparently moves an existing renewal, payment token, mandate, billing agreement, or remote subscription to that gateway.

### Evidence labels used here

- **Verified product fact**: confirmed in the current ArraySubs Free/Pro source.
- **Verified external fact**: supported by a current first-party or institutional source at the claim.
- **Recommended framework**: an original operating model proposed for the article, not an ArraySubs feature.
- **Illustrative example**: invented arithmetic that must be labelled as such in publication.
- **Unknown / verify in a live test**: not established by source inspection alone.

## Research conclusion

The article should define multi-gateway resilience as several different capabilities, not one “failover” switch:

1. **Acquisition continuity**: another compatible gateway can remain available for new checkouts.
2. **Installed-base continuity**: subscriptions already assigned to a gateway continue to depend on that gateway’s stored token, mandate, or remote agreement.
3. **Control-plane continuity**: WordPress, Action Scheduler, gateway APIs, and webhook delivery all need separate monitoring and recovery.
4. **Recovery and reconciliation**: after an incident, the store must compare gateway charges and events with local orders and subscription state before replaying work.

ArraySubs Pro can register Stripe, PayPal, and Paddle integrations, expose configuration/event evidence in Gateway Health, update a payment method through the subscription’s current gateway, retry eligible plugin-controlled failures, and manually sync a subscription from its current gateway. It does **not** currently provide health-based checkout routing, automatic cross-gateway renewal failover, a portable token vault, automatic cascading charges across processors, or a recurring proactive reconciliation engine.

The most defensible promise is therefore: multiple gateways can reduce some single-gateway concentration risk, especially for new sales, but continuity for the installed subscriber base requires a gateway-specific runbook and often customer or processor participation.

## External evidence bank

Accessed 2026-07-22. Link the source adjacent to the relevant claim in the article.

| Claim supported | Primary source | Publication note |
|---|---|---|
| Subscription gateway extensions differ in automatic renewal, payment-method change, multiple-subscription, and other lifecycle capabilities. Multiple processors may be offered, but feature support is adapter-specific. | [WooCommerce: Subscription payment methods and gateways](https://woocommerce.com/document/subscriptions/payment-gateways/) | Use this to reject a generic “all gateways are interchangeable” model. |
| A store can disable an old payment method for new checkout while keeping its extension active so existing automatic renewals continue. Moving existing subscribers is more complicated and usually requires customers to change payment methods. | [WooCommerce Subscriptions FAQ](https://woocommerce.com/document/subscriptions/faq/) | This is the clearest external support for separating new-checkout routing from existing-renewal continuity. |
| Deactivating the gateway extension, rather than merely disabling the payment method for checkout, can convert existing automatic renewals to manual renewals. | [WooCommerce: Subscription renewal process](https://woocommerce.com/document/subscriptions/renewal-process/) | Phrase as WooCommerce’s documented behavior, then explain that the same operational distinction should be tested in an ArraySubs runbook. |
| Importing or migrating subscriptions can require customer token/gateway data. In some migrations the first renewal fails and the customer must pay to link a new method. | [WooCommerce: Migrating subscribers](https://woocommerce.com/document/subscriptions/migrating-subscribers-woocommerce-subscriptions/) | Evidence that a subscription row alone is insufficient for automatic billing continuity. |
| Even a migration between accounts at the same provider can require coordination with the gateway and a credentials change. | [WooCommerce Subscriptions FAQ](https://woocommerce.com/document/subscriptions/faq/) | Do not claim that same-brand migrations are automatic. |
| Stripe payment-data migrations are coordinated secure projects with source-to-destination ID mapping, processing time, update handling, and post-import work. A merchant may keep charging through the existing processor while migration completes. | [Stripe: Import payment data](https://docs.stripe.com/get-started/data-migrations/pan-import) | Supports “processor-assisted migration,” not do-it-yourself token copying. It is Stripe-specific. |
| Webhook endpoints must tolerate duplicate events and should not depend on event delivery order. | [Stripe: Receive Stripe events in a webhook endpoint](https://docs.stripe.com/webhooks) | This is an engineering reason to reconcile rather than blindly replay after an outage. |
| Vendor status pages are useful external incident signals for Stripe, PayPal, and Paddle. | [Stripe status](https://status.stripe.com/), [PayPal production status](https://www.paypal-status.com/product/production), [Paddle status](https://paddlestatus.com/) | A green status page is not proof that this store’s credentials, webhook endpoint, or scheduler are healthy. |
| Paddle payment-detail updates happen through a provider-hosted update flow for that Paddle subscription’s future charges. | [Paddle: Update payment details](https://developer.paddle.com/build/subscriptions/update-payment-details) | Illustrates that updates are tied to the current provider context, not a generic cross-processor card record. |

### Source-use cautions

- WooCommerce Subscriptions documentation describes WooCommerce Subscriptions. Use it to establish recurring-payment architecture and migration constraints, not to assert an ArraySubs implementation detail.
- Stripe, PayPal, and Paddle status pages describe provider-wide services. They do not see local WordPress cron, Action Scheduler, PHP errors, credentials, firewall rules, or a single merchant account’s configuration.
- Stripe’s migration documentation is evidence that secure migrations require provider coordination. Do not generalize its exact steps or timelines to PayPal or Paddle.
- Do not cite a vendor’s “uptime” marketing percentage unless its measurement period, service boundary, and source are stated. None is needed for this article.

## Verified ArraySubs product behavior

### Free/core responsibilities

| Verified behavior | Product source | Editorial consequence |
|---|---|---|
| Core stores and resolves a subscription’s gateway slug from subscription metadata. Without Pro answering its filters, automatic-payment checks return false and the subscription follows manual-payment behavior. | `arraysubs/src/functions/gateway-helpers.php` | Free supplies the shared contract and safe manual fallback; Pro supplies registered automatic adapters. |
| Core’s retry configuration defaults to enabled, three retries, 24 hours apart, but Pro adapters can override it. | `arraysubs/src/functions/gateway-helpers.php` | State this as a current code default, not a universal gateway schedule. Provider-controlled billing may behave differently. |
| The renewal pipeline has duplicate-charge prechecks and failure handling, while Action Scheduler holds precise invoice and due-time actions. | `arraysubs/src/Features/RecurringBilling/Services/RenewalProcessor.php`; `arraysubs/src/Supports/ActionScheduler.php` | Resilience includes scheduler health and idempotency, not just choosing a PSP. |
| Pending end-of-period cancellation unschedules/blockades renewal work. | `arraysubs/src/Features/CancellationFlow/Services/Hooks.php`; `arraysubs/src/functions/cancellation-helpers.php`; `arraysubs/src/Features/RecurringBilling/Services/Hooks.php` | A non-renewal during pending cancellation may be deliberate, not a gateway outage. |

### Pro gateway responsibilities and limits

| Verified behavior | Product source | Editorial consequence |
|---|---|---|
| Pro registers ArraySubs PayPal and Paddle gateways and delegates Stripe subscriptions to the official WooCommerce Stripe integration. | `arraysubspro/src/Features/AutomaticPayments/Services/Hooks.php`; `arraysubspro/src/Features/AutomaticPayments/Gateways/Stripe/StripeDelegate.php` | The article can name supported adapters, while noting that each has a different billing model and capability matrix. |
| `GatewayResolver` resolves the gateway stored on the subscription (`_payment_gateway`, with `_payment_method` fallback). It does not select a healthier alternate gateway. | `arraysubspro/src/Features/AutomaticPayments/Services/GatewayResolver.php` | This is direct evidence against transparent renewal failover. |
| `PaymentMethodCoordinator` asks that resolved current gateway for its own update mechanism. It exposes no cross-gateway migration route. Updates are allowed only for active, trial, or on-hold subscriptions not pending cancellation. | `arraysubspro/src/Features/AutomaticPayments/Services/PaymentMethodCoordinator.php`; `arraysubspro/src/Features/AutomaticPayments/REST/PaymentMethodController.php` | “Update payment method” means update inside the current billing context, not move the subscription to another provider. |
| Gateway Health returns registered gateway configuration/readiness fields, subscription counts, the latest stored processed-webhook timestamp, webhook URL, and capability flags. Stripe adds account/webhook checks. | `arraysubspro/src/Features/AutomaticPayments/REST/GatewayHealthController.php` | Call it a configuration and event-evidence dashboard, not a full uptime monitor or predictive renewal-health system. |
| The Gateway Health webhook log reads the processed-event ledger. Processed events are retained for a limited cleanup window. | `arraysubspro/src/Features/AutomaticPayments/REST/GatewayHealthController.php`; `arraysubspro/src/Features/AutomaticPayments/Services/DatabaseMigration.php` | “No event” can mean no traffic as well as an incident; the ledger is not raw ingress capture. |
| The scheduled `reconcileGateways()` handler is a placeholder. A separate manual “Sync from Gateway” path can reconcile one subscription from its current gateway. | `arraysubspro/src/Features/AutomaticPayments/Services/Hooks.php`; `arraysubs/src/Features/SubscriptionAdmin/REST/SubscriptionController.php` | Do not claim recurring automatic gateway reconciliation. Recommend a runbook and manual sampling until that exists. |
| Admin detach clears gateway/payment-method metadata and reverts that subscription to manual payment. It is not a transfer to another gateway. | `arraysubspro/src/Features/AutomaticPayments/REST/GatewayHealthController.php` | Describe detach as a last-resort manual-billing recovery tool, with customer communication and validation. |
| Stripe is plugin-scheduled; PayPal and Paddle can hold remote provider-side billing agreements/subscriptions. Pro has explicit pending-cancellation handling for those remote schedules. | `arraysubspro/src/Features/AutomaticPayments/Services/Hooks.php` | Incident plans must distinguish who owns the billing clock. Pausing WordPress cron cannot stop every provider-controlled renewal. |
| Stripe declares mixed-cart and multiple-subscription support. PayPal declares neither; Paddle declares both. | `arraysubspro/src/Features/AutomaticPayments/Gateways/Stripe/StripeDelegate.php`; `.../PayPal/PayPalGateway.php`; `.../Paddle/PaddleGateway.php` | A “backup” gateway is useful only for checkout shapes it supports. |
| Cart restrictions apply the most restrictive enabled gateway capabilities to subscription carts and validate the selected gateway. | `arraysubspro/src/Features/AutomaticPayments/Services/CartRestrictions.php` | Enabling a constrained backup can narrow checkout behavior. This must be tested before an incident. |

### Current capability snapshot

This table is a current-code research aid, not a permanent public compatibility promise. Re-verify before publication.

| Dimension | Stripe delegate | ArraySubs PayPal | ArraySubs Paddle | Manual renewal |
|---|---|---|---|---|
| Billing clock | ArraySubs/plugin-controlled | Provider remote agreement | Provider remote subscription | Store/customer action |
| Existing renewal automatically fails over to another gateway | No | No | No | Not applicable |
| Customer payment-method update | Declared supported | Declared supported via reauthorization | Declared supported/hosted | Customer pays renewal manually |
| Mixed subscription + one-time cart | Declared supported | Declared unsupported | Declared supported | Core allows, subject to checkout method |
| Multiple subscriptions in one cart | Declared supported | Declared unsupported | Declared supported | Core allows, subject to checkout method |
| Remote pause/resume capability | No remote subscription | Declared no native pause/resume | Declared supported | Core can move local schedule |
| Retention-offer eligibility in current cancellation flow | Yes (`retention_amount_update`) | No | No | Yes |

## What multi-gateway can and cannot solve

### Good claims

- A second enabled, tested gateway can preserve a checkout option for compatible new orders when another option is unavailable.
- Keeping the original adapter/plugin and credentials operational can preserve renewals for its installed base even if the method is hidden from new checkout.
- Separating subscribers by gateway makes revenue concentration and incident exposure measurable.
- Gateway-specific health, webhook, and renewal checks can reduce detection time.
- A documented customer reauthorization path can restore automatic billing when a stored method or provider relationship cannot be migrated.

### Claims to reject

- “ArraySubs automatically routes a failed renewal to the next gateway.”
- “Payment tokens are portable between Stripe, PayPal, and Paddle.”
- “A Gateway Health green state proves every renewal will succeed.”
- “Disabling or deleting the old gateway is safe once a backup is enabled.”
- “Webhook replay alone repairs an outage.”
- “A card decline is proof of a gateway outage.”
- “More gateways always improve checkout.” The PayPal capability limits and most-restrictive cart logic make this false.

## Recommended original framework: four continuity layers

This is an original editorial framework, not a named ArraySubs feature.

| Layer | Question | Test before an incident | Minimum evidence |
|---|---|---|---|
| Acquisition | Can an eligible new customer complete checkout through another method? | Test each product/cart/currency/country combination on a non-production or safe test setup. | Successful test order and subscription context. |
| Installed base | What happens to subscriptions already bound to the affected gateway? | Sample renewals, payment updates, expired cards, and a disabled-new-checkout configuration. | Gateway-segmented subscriber inventory and renewal calendar. |
| Control plane | Is the failure at WordPress, Action Scheduler, API credentials, provider API, or webhook delivery? | Exercise scheduler checks, API connection checks, and a known webhook/test event. | Timeline with expected versus actual events. |
| Reconciliation | How will the store prove who was charged and which local state is correct? | Run a tabletop reconciliation on a small period. | Provider transaction IDs, orders, subscription metadata, event ledger, and action logs. |

### Failure-domain matrix for an original table

| Failure domain | New checkout impact | Existing renewal impact | First response | Why a second gateway is insufficient |
|---|---|---|---|---|
| Provider checkout/API outage | Affected gateway may disappear or fail | Plugin-controlled charges may fail; remote schedules depend on provider | Confirm provider incident; keep checkout alternative visible if compatible | Installed subscriptions remain bound to the affected provider. |
| Store credentials/account issue | Similar to an outage for this store | Charges and API sync can fail for the affected account | Validate credentials/account status and recent known-good request | Another gateway does not repair the current account’s tokens/agreements. |
| Webhook delivery/processing issue | Checkout may still work | Provider may charge while local state lags | Compare provider events with processed ledger and orders | Routing checkout elsewhere does not reconcile past provider events. |
| Action Scheduler/WordPress failure | Checkout may work | Plugin-scheduled invoices/charges can be late or absent | Inspect pending/failed actions and PHP/application errors | All plugin-controlled gateways may share the same scheduler failure. |
| Isolated customer decline | Usually none | One subscription enters recovery | Classify decline; request update or retry if eligible | Charging a different processor without authorization can be unsafe and unsupported. |
| Adapter/plugin deactivation | Method unavailable | Automatic renewals may fall back to manual or lose integration behavior | Restore adapter/configuration; sample affected subscriptions | Backup configuration does not recreate old gateway context. |

## Measurement formulas

State time zone, currency conversion rule, renewal window, subscription statuses, and whether values are counts or recurring revenue.

### Gateway concentration

```text
gateway recurring-revenue share
= recurring revenue assigned to gateway / total recurring revenue
```

Use current subscription metadata to segment. Report manual separately. Do not mix currencies without a stated conversion method.

### Renewal exposure in an incident window

```text
renewal value exposed
= sum of scheduled renewal value in the incident window for affected gateway

exposure share
= renewal value exposed / total scheduled renewal value in the same window
```

This is exposure, not predicted loss. An exposed renewal may succeed later, be recovered, or never become due.

### Tested continuity coverage

```text
tested continuity coverage by recurring revenue
= recurring revenue with a documented, recently tested continuity path
   / total recurring revenue
```

Define “recently tested,” for example within the last quarter. A path may be “renew through original gateway after new checkout is disabled,” “customer-hosted update,” or “manual invoice with an agreed communication sequence.” Merely enabling a backup does not qualify.

### Detection and restoration times

```text
MTTD = detected_at - incident_started_at
MTTR = normal_processing_restored_at - incident_started_at
```

For a billing incident, also record:

- **RTO**: target time to restore a safe renewal/checkout process.
- **RPO**: maximum event/transaction interval the team is prepared to reconstruct from gateway records.

These are operating targets, not automatically measured ArraySubs dashboard fields.

## Illustrative worked example

Label this as invented data if used.

A store has USD 90,000 of renewals scheduled in the next 72 hours:

| Stored billing context | Scheduled value | Incident state |
|---|---:|---|
| Stripe | $60,000 | Provider/API incident affects plugin-controlled charges |
| PayPal | $20,000 | Available |
| Paddle | $5,000 | Available |
| Manual | $5,000 | Available, customer action required |

Calculations:

```text
Stripe exposure share = $60,000 / $90,000 = 66.7%
```

Correct interpretation: PayPal or Paddle might keep some compatible **new checkouts** open. They do not automatically take over the $60,000 of existing Stripe renewals. Those renewals need a Stripe recovery/retry decision, a manual-payment path, customer reauthorization, or a planned processor-assisted migration. The example should not invent a recovery rate.

## Incident runbook inputs

### Before an incident

1. Export a gateway-segmented subscriber and next-renewal inventory.
2. Record each gateway’s billing-clock owner, update flow, supported cart shapes, currencies, and geographies.
3. Keep old gateway adapters and credentials active for installed subscriptions even if new checkout is disabled.
4. Test backup checkout for each material product/cart shape; PayPal’s current limits make a generic test inadequate.
5. Test customer payment-method update on each gateway.
6. Define RTO, RPO, incident owner, approval authority, customer message templates, and reconciliation owner.
7. Record provider support escalation paths and status pages.
8. Decide when manual billing is acceptable and how access/grace periods will behave.

### Detection and triage

1. Timestamp the first symptom and affected scope.
2. Distinguish new checkout, plugin-scheduled renewal, remote-provider renewal, webhook processing, and local scheduler failures.
3. Check provider status, but also test this merchant account and local endpoint.
4. Compare scheduled renewals due with generated invoices/orders and provider transactions.
5. Freeze risky bulk replay until duplicate-charge checks and reconciliation evidence are available.

### Containment

- Hide or disable the affected method for new checkout if appropriate, but keep its integration active for installed renewals unless the runbook proves otherwise.
- Surface a compatible alternative for new checkout.
- Do not bulk detach existing subscribers; detach makes them manual.
- Do not ask every customer to update a method until the affected cohort and provider recovery plan are known.

### Recovery and reconciliation

1. Build one timeline from Action Scheduler, renewal orders, gateway transactions, and processed webhook events.
2. Identify “charged remotely/local missing,” “local renewal/no charge,” “hard decline,” “soft decline,” and “not attempted.”
3. Re-run only actions whose duplicate-charge precheck and provider evidence show no successful charge.
4. Manually sync a sample from the affected gateway.
5. Send cohort-specific communication: no action, update required, or manual payment required.
6. Close only after the renewal calendar, gateway transactions, local orders, and subscription statuses reconcile.

## Tabletop exercise

Recommended scenario: “Stripe API calls fail at 09:00 on a high-volume renewal day; checkout is still partially available; webhooks arrive late and out of order.”

Injects:

- 10:00: provider status confirms an incident.
- 10:30: two customers report duplicate authorization emails, but no duplicate settled charge is yet proven.
- 11:00: PayPal is available, but the most valuable cart includes multiple subscriptions and is incompatible with current PayPal capability flags.
- 12:00: a Stripe webhook for an earlier successful charge arrives after a local retry is queued.

Pass criteria:

- Team distinguishes new checkout from installed renewals.
- No one proposes copying tokens or bulk-changing `_payment_gateway` metadata.
- Replay is gated by provider transaction evidence and the duplicate-charge check.
- Customer messages target the affected cohort.
- Reconciliation accounts for late and duplicate events.

## Suggested original visuals and tables

1. **Two-lane diagram**: new checkout can select an available compatible gateway; existing renewal follows stored gateway context. This is the most important original visual.
2. **Gateway capability matrix**: billing-clock owner, payment update, cart support, remote pause/resume, and installed-base migration path.
3. **Failure-domain matrix**: use the proposed table above.
4. **Incident timeline worksheet**: scheduled action → local order → provider transaction → webhook/event ledger → final subscription state.
5. **Gateway concentration table**: subscriber count, recurring revenue, renewals due in 24/72 hours, tested continuity path, last test date.

Do not publish a simplistic “primary arrow to backup” diagram for existing renewals.

## Screenshot and UI opportunities

### Article-production capture selection completed 2026-07-22

Existing repository evidence was rechecked for safe synthetic/local content and current UI relevance. Three annotated copies were mirrored into both article asset trees.

| Article asset | Original evidence | Annotation focus | Placement/context |
| --- | --- | --- | --- |
| `gateway-health-overview.png` | `a061-gateway-health-overview-original.png` | Multiple gateway configuration/health cards | Configuration and event evidence, not automatic failover |
| `stripe-webhook-health.png` | `a064-stripe-webhook-health-original.png` | Stripe webhook and processed-event signals | Processed evidence is one control-plane layer |
| `paypal-webhook-health.png` | `a064-paypal-webhook-health-original.png` | PayPal webhook and processed-event signals | Gateway-specific evidence does not make contexts portable |

No production incident, renewal failure, token migration, live webhook replay, or cross-gateway charge was executed.

Existing repository images may be reused after verifying that their data is safe and the UI still matches current source.

| UI | Route / existing asset | What it can prove | Mandatory caption caveat |
|---|---|---|---|
| Gateway Health overview | ArraySubs admin `#/settings/gateways`; `screenshots/live-ui/a064-gateway-health-overview-original.png` | Registered gateways, enabled/setup/availability fields, subscriber counts, last processed webhook, capabilities | “Configuration and event evidence; not provider uptime or automatic failover.” |
| Subscription billing context | Subscription detail; `screenshots/live-ui/a063-subscription-billing-context-original.png` | One subscription is associated with a specific gateway/payment context | Crop IDs, customer data, last four digits, emails, and tokens. |
| WooCommerce payment methods | WooCommerce → Settings → Payments | Multiple methods may be enabled for new checkout | Does not prove existing subscription migration or compatibility for every cart. |
| Processed webhook log | Gateway Health webhook log | Event IDs/types processed locally | Not raw ingress; lack of events can mean lack of traffic. |
| Manual “Sync from Gateway” control | Subscription detail | An operator can reconcile one current-gateway subscription | It is not recurring automatic reconciliation and does not switch gateways. |

## ArraySubs positioning notes

### Reasonable fit

- Merchant wants Stripe, PayPal, or Paddle options with gateway-specific recurring behavior.
- Merchant needs a single dashboard for setup/readiness evidence and processed events.
- Merchant is willing to maintain gateway-specific operations, customer update paths, and manual reconciliation procedures.
- Merchant understands that enabling multiple checkout methods and migrating the installed base are separate projects.

### Not a current product promise

- Rules-based acquiring orchestration across processors or merchant accounts.
- Network-token or mandate portability across gateways.
- Automatic cascading retry from one gateway to another.
- Automated incident alerts using provider status feeds.
- Scheduled full-fleet provider-to-local reconciliation.
- Zero-customer-action migration between unrelated providers.

When those are requirements, recommend architecture/support scoping rather than implying that ordinary WooCommerce gateway configuration solves them.

## Internal-link plan

- Primary feature anchor: `/deals/arraysubs/features/#payment-gateways`
- Related article: `/deals/arraysubs/resources/payments-and-compliance/best-payment-gateways-for-woocommerce-subscriptions/` (A056)
- Related article: `/deals/arraysubs/resources/payments-and-compliance/stripe-vs-paypal-vs-paddle-for-woocommerce-recurring-billing/` (A057)
- Related article: `/deals/arraysubs/resources/payments-and-compliance/stripe-recurring-payments-for-woocommerce-how-they-work-and-what-to-test/` (A058)
- Related article: `/deals/arraysubs/resources/payments-and-compliance/subscription-payment-tokens-and-card-updates-explained/` (A063)
- Related article: `/deals/arraysubs/resources/payments-and-compliance/subscription-webhooks-events-every-woocommerce-store-should-monitor/` (A064)
- Recipe: `/deals/arraysubs/use-cases/recipes/stripe-automatic-billing-sca/`
- Recipe: `/deals/arraysubs/use-cases/recipes/member-update-payment/`
- Recipe: `/deals/arraysubs/use-cases/recipes/gateway-health-monitor/`

Do not invent slugs. Reconcile these against `content-plan/articles/` and the published-site inventory during drafting.

## Claims that need live verification before drafting

- The exact Gateway Health labels and which controls appear with Stripe, PayPal, and Paddle all configured.
- Whether each gateway remains hidden from checkout while still renewing an existing test subscription in the current build.
- The full customer-visible payment-method update journey for all three gateways.
- Cart behavior with multiple gateways simultaneously enabled across simple, mixed, and multi-subscription carts.
- Manual sync output and safe redaction requirements.
- What the UI shows when a gateway is disabled, unavailable, misconfigured, or has no recent webhook traffic.

## Refresh triggers

Re-audit this note when any of these change:

- `GatewayResolver`, `PaymentMethodCoordinator`, `GatewayHealthController`, or `CartRestrictions`
- Any gateway capability matrix
- The placeholder `reconcileGateways()` implementation
- A new migration/reattach endpoint
- Cross-gateway token-vault or orchestration support
- ArraySubs Free/Pro version at publication
- WooCommerce, Stripe, PayPal, or Paddle migration guidance

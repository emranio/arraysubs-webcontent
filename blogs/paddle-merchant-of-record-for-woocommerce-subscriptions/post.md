---
title: "Paddle Merchant of Record for WooCommerce Subscriptions"
meta_description: "Learn how Paddle Merchant of Record works with WooCommerce and ArraySubs, including tax, checkout, renewals, webhooks, refunds, payouts, and limits."
focus_keyword: "Paddle Merchant of Record WooCommerce"
published: "2026-02-28"
updated: "2026-05-26"
last_verified: "2026-05-26"
author: "Emran"
author_affiliation: "ArrayHash"
---

# Paddle Merchant of Record for WooCommerce Subscriptions

Paddle can be the Merchant of Record for an eligible software or digital subscription sold from a WooCommerce storefront. Paddle becomes the buyer-facing reseller and handles payment collection, applicable sales-tax/VAT administration, transaction documents, refunds, and chargeback operations. The supplier still owns product eligibility, delivery, support, privacy, accounting, and correct ArraySubs–Paddle lifecycle reconciliation.

In ArraySubs Pro, Paddle also becomes the **remote billing control plane**. WooCommerce and ArraySubs create local products, orders, subscriptions, access, and operational records; Paddle Product and Price objects feed hosted checkout; Paddle creates Transactions and the remote Subscription; signed webhooks settle the local order. That architecture can reduce global transaction-tax operations, but it also transfers schedule and checkout control to Paddle.

> **Key takeaways**
>
> - Merchant of Record means Paddle is the reseller/seller of record to the buyer for covered eligible sales. It does not mean “all compliance, tax, legal, accounting, support, and risk disappear.”
> - Paddle is designed primarily for eligible software and digital products. Physical subscription boxes and primarily human-delivered services are generally not the intended fit.
> - ArraySubs Pro synchronizes Woo products to Paddle Products and Prices, creates a draft Paddle Transaction, opens Paddle Checkout, and waits for `transaction.completed` before marking a positive Woo order paid.
> - Paddle owns the remote subscription schedule and renewal collection. ArraySubs creates/reconciles local renewal orders and entitlements.
> - In ArraySubs Pro 1.1.2, Paddle product sync reads the wrong ArraySubs metadata keys for non-1 intervals and free trials. Do not launch those terms until fixed and sandbox-tested.
> - Stored Paddle Price IDs can be reused without a current-price/cycle/trial fingerprint check. A normal Woo price edit can leave checkout and existing subscriptions on stale remote economics.
> - Signup fees, Woo fees, shipping, and Woo tax totals are not represented as separate Paddle checkout items in the inspected builder. Exact total parity is a launch gate.
> - The inspected full/partial refund payloads do not match Paddle’s Adjustment requirements, and asynchronous approval is not fully tracked. Treat Woo-initiated Paddle refunds as blocked until fixed and tested.

This guide is general operational information, not legal, tax, privacy, accounting, or financial advice. Paddle’s contract, eligibility rules, tax treatment, pricing, payout schedule, and product capabilities can change; verify the live terms and obtain qualified advice for your business.

## Merchant of Record is a legal and operational role

A payment processor moves money for the merchant. A Merchant of Record sits in the buyer transaction as the reseller/seller of record for the covered sale. That changes who issues the buyer-facing transaction document, collects and remits transaction tax, interfaces with payment networks, and administers refunds and chargebacks.

It does **not** turn the supplier into a passive bystander.

![A split responsibility workbench places payment, tax, invoices, refunds, and disputes with the MoR while product, support, privacy, and accounting remain with the supplier.](/blogs/paddle-merchant-of-record-for-woocommerce-subscriptions/paddle-vs-supplier-responsibilities.png)

Paddle’s current [Master Services Agreement](https://www.paddle.com/legal/terms) describes Paddle as a nonexclusive reseller, while its [Buyer Terms](https://www.paddle.com/legal/buyer-terms) govern the buyer-facing relationship. Read both before designing invoices, terms, refunds, and support messages.

### What Paddle takes on

For eligible covered transactions, the Paddle MoR service generally includes:

- buyer-facing sale and payment collection;
- payment-method and hosted-checkout operations;
- calculation, collection, filing, and remittance of applicable transaction taxes such as sales tax, VAT, and GST;
- buyer-facing receipts/invoices/transaction documents;
- operational refund processing under its policy and API;
- payment-network dispute/chargeback administration;
- balance management and net payout after taxes, fees, refunds, FX, reserves, chargebacks, and other adjustments; and
- relevant local buyer-payment/commercial requirements within its reseller scope.

Paddle explains its [VAT and tax responsibility model](https://www.paddle.com/help/start/intro-to-paddle/how-paddle-is-able-to-take-on-your-vat-and-tax-responsibilities), but the benefit depends on accurate product classification and customer facts.

### What the supplier still owns

The software supplier remains responsible for:

- eligibility and accurate product/tax-category information;
- lawful product, licensing, intellectual property, and marketing claims;
- price, trial, renewal, cancellation, and refund disclosures;
- product availability, downloads, licenses, entitlements, uptime, and technical support;
- privacy notices, security, retention, data-subject response, and WordPress data handling;
- its own business registrations, corporate income/payroll/employment taxes, bookkeeping, and revenue recognition;
- keeping Woo orders, ArraySubs subscriptions, and Paddle objects synchronized;
- investigating failed payments, missing fulfillment, lifecycle mismatch, refunds, and customer complaints;
- reconciling Transactions, Adjustments, fees, taxes, FX, reserves, payouts, and bank deposits; and
- the economic effect of refunds, chargebacks, fees, reserves, or negative balances when the contract allocates them to the supplier.

### Responsibility ledger

| Workstream | Paddle role | Supplier / Woo / ArraySubs role |
| --- | --- | --- |
| Buyer-facing seller | Reseller/MoR for the covered transaction | Supplies the underlying product/service to Paddle for resale |
| Checkout and collection | Hosts checkout and collects | Creates the correct transaction and holds fulfillment pending settlement |
| Sales tax/VAT/GST | Calculates, collects, remits based on correct inputs | Classifies product and handles supplier-side taxes/accounting |
| Buyer transaction document | Issues Paddle sale document | Keeps Woo order as internal operational record without contradicting seller identity |
| Product delivery/access | Not the software delivery engine | Grants, suspends, restores, and revokes entitlements |
| Product support | Limited transaction/order support | Owns technical and product support |
| Refund administration | Processes under policy/API | Updates local order/access and may bear economic impact |
| Chargebacks | Runs network dispute process | Provides evidence, manages fraud/access, reconciles economic impact |
| Privacy/data | Governs Paddle buyer/checkout data | Governs WordPress/Woo data and integration flows |
| Payout | Remits eligible net balance | Reconciles statement/report to accounting and bank |

Never shorten this to “Paddle handles all taxes and compliance.” MoR transfers a defined buyer-transaction role, not every obligation your business has.

## Who is eligible to use Paddle?

Paddle is a strong potential fit for:

- B2B or B2C SaaS;
- WordPress plugins/themes and downloadable software;
- software licenses and digital entitlements;
- eligible apps or games; and
- digital subscriptions where global transaction-tax administration is a major burden.

Paddle’s [product eligibility guidance](https://www.paddle.com/help/start/intro-to-paddle/what-am-i-not-allowed-to-sell-on-paddle) excludes or restricts physical goods/delivery, primarily human services, some marketplaces, and many regulated or high-risk categories. Onboarding and product approval still apply.

It is usually a poor or unverified fit for:

- physical subscription boxes;
- mixed digital/physical carts that cannot be isolated;
- consulting, coaching, or agency retainers dominated by human service;
- donations, crowdfunding, or unapproved marketplaces;
- regulated/high-risk categories without explicit approval;
- merchants that must remain the named buyer-facing seller; or
- stores that require WooCommerce to initiate and control every renewal charge.

The broader [gateway comparison](/payments-and-compliance/best-payment-gateways-for-woocommerce-subscriptions/) helps choose between direct processing, wallet agreements, MoR, and manual billing before you implement a provider.

## The three-system architecture

There are three ledgers/control planes:

1. **WooCommerce:** cart, order, customer, product, coupon, tax presentation, fulfillment, and local reporting.
2. **ArraySubs:** local subscription, next dates, status, portal, cancellation/access hooks, renewal-order association, and gateway metadata.
3. **Paddle:** remote Product, Price, Transaction, Customer, Subscription, Checkout, Adjustment, tax, invoice, balance, and payout.

![A local Woo/ArraySubs desk, hosted checkout, and remote billing clock exchange signed lifecycle signals into local order trays.](/blogs/paddle-merchant-of-record-for-woocommerce-subscriptions/paddle-checkout-renewal-webhooks.png)

| Object | Typical ID | Owner of truth | ArraySubs purpose |
| --- | --- | --- | --- |
| Woo product/variation | integer | Woo/ArraySubs | Source offer for catalog sync |
| Paddle Product | `pro_...` | Paddle catalog | Remote product name/description/tax category |
| Paddle Price | `pri_...` | Paddle catalog | Amount, currency, cycle, optional trial |
| Woo initial order | integer | Woo local operations | Pending until Paddle settles |
| Paddle Transaction | `txn_...` | Paddle money/tax | Checkout and every renewal sale |
| ArraySubs subscription | integer | ArraySubs local lifecycle | Status, customer, entitlement, local dates and gateway context |
| Paddle Subscription | `sub_...` | Paddle recurring schedule | Remote items, next billing, status, scheduled changes |
| Paddle Customer | `ctm_...` | Paddle buyer/portal | Portal session and remote identity |
| Paddle Adjustment | `adj_...` | Paddle refund/credit/chargeback | Financial adjustment lifecycle |

The Paddle payment context is not a portable Woo card token. ArraySubs stores remote identifiers and may cache brand/last-four display values, but Paddle controls the actual method inside its Customer/Subscription ecosystem.

## How checkout works

ArraySubs Pro registers a distinct Paddle (ArraySubs) provider in WooCommerce.

![Annotated WooCommerce payment-provider list identifying the Paddle (ArraySubs) gateway with its Enable and Manage actions.](/blogs/paddle-merchant-of-record-for-woocommerce-subscriptions/woocommerce-paddle-payment-method-verified.png)

The classic checkout sequence is:

1. WooCommerce creates a pending local order.
2. The gateway collects Paddle Price IDs/quantities for subscription items and creates/caches Price objects for eligible one-time digital items.
3. ArraySubs Pro creates a draft Paddle Transaction with local order/subscription IDs in `custom_data`.
4. Browser JavaScript opens Paddle Checkout using the transaction ID.
5. Paddle collects customer, address, payment, tax, and consent context.
6. Browser completion redirects to the Woo order-received page.
7. The Woo order remains pending until a verified Paddle webhook confirms `transaction.completed`.
8. ArraySubs captures the Paddle Transaction, Customer, and Subscription context and completes the order.

Browser success is not authoritative settlement. Webhooks are part of payment correctness.

### Classic and Checkout Blocks are separate paths

Unlike the current PayPal adapter, the Paddle integration registers a WooCommerce Blocks payment method and opens the transaction-ID checkout through a separate Blocks script. That is encouraging, but it is not proof of parity.

Test both checkout types for:

- gateway visibility by cart shape;
- Store API validation and serialized payment data;
- double submit and React rerender;
- overlay close/back/refresh;
- mobile keyboard/focus/accessibility;
- browser success with delayed webhook;
- webhook success with failed redirect;
- cart total versus Paddle total; and
- recovery of a pending Woo order.

### Sandbox configuration

The staged settings screen shows the three controls that must agree: gateway enablement, sandbox mode, and environment-specific credentials.

![Annotated Paddle gateway settings showing Sandbox mode, the API and client-token fields, and Seller ID without exposing credentials.](/blogs/paddle-merchant-of-record-for-woocommerce-subscriptions/paddle-sandbox-settings-verified.png)

A correct setup also needs a matching client-side token, webhook secret, approved/default checkout domain, and exact event subscriptions. Keep API keys and webhook secrets out of browser source, screenshots, logs, support tickets, and public documentation. Follow Paddle’s current [go-live checklist](https://developer.paddle.com/build/go-live-checklist/).

## Product and Price synchronization is a billing change-control system

The integration synchronizes eligible subscription products into Paddle Product and Price records. The current code can create/update a Product, create a replacement Price, archive an older Price, and save IDs in Woo product metadata.

![A product-sync factory validates local subscription cubes, creates versioned remote Prices, and quarantines a stale Price.](/blogs/paddle-merchant-of-record-for-woocommerce-subscriptions/paddle-product-price-sync.png)

### Current blocker: interval and trial keys do not match core

The inspected sync class reads:

```text
_subscription_period_interval
_subscription_trial_length
_subscription_trial_period
```

ArraySubs core stores:

```text
_subscription_interval
_trial_length
_trial_period
```

Expected effect in ArraySubs Pro 1.1.2:

- “every two months” can sync as every one month;
- a configured free trial can disappear from the remote Paddle Price;
- local product/checkout language can differ from Paddle Checkout; and
- the capability flag `trials: true` overstates the shipped wiring.

Do not launch non-1 intervals or trials until the metadata keys are fixed and the remote Price is verified in sandbox.

### Current high risk: a stored Price can stay stale

When a Woo product already has a Paddle Price ID, the checkout path can reuse it without comparing:

- current Woo amount;
- currency;
- billing period/interval;
- trial;
- tax category;
- variation;
- last-updated fingerprint; or
- whether the Paddle Price is still active.

Changing a normal Woo price therefore does not prove that future Paddle checkout uses the new amount. Creating a new remote Price for new buyers also does not migrate existing Paddle Subscriptions, which continue to reference their accepted remote items.

Required change control:

1. Calculate a deterministic fingerprint from product/variation, amount, currency, cadence, trial, tax category, and all billing inputs.
2. Compare on product save and before checkout.
3. Lock sync so concurrent first checkouts cannot create duplicates.
4. Create a replacement Price when the fingerprint changes.
5. Preserve old/new mapping and decide whether the change affects new sales only.
6. For existing subscriptions, use Paddle item-update APIs with full desired items and explicit proration mode—or block the local change.
7. Test partial failure where remote creation succeeds but local metadata/archive fails.

Paddle documents [replacing subscription Prices](https://developer.paddle.com/build/subscriptions/replace-products-prices-upgrade-downgrade/) and [proration modes](https://developer.paddle.com/concepts/subscriptions/proration/). Source inspection did not find that remote update in the ArraySubs plan-switch path; retention amount update is explicitly unsupported.

### Tax category cannot be an unreviewed default

The observed Product creation hardcodes `tax_category: standard`. Paddle’s tax calculation depends on product classification. “Standard” is not a safe universal category for SaaS, plugins, games, ebooks, downloads, or mixed digital services.

Expose/review the category per product, retain change history, and test representative buyer locations before relying on the MoR tax result.

## What the current transaction builder does not carry

For recurring items, checkout sends the remote Paddle Price ID and quantity rather than overriding it with the Woo order line total. The observed builder does not separately represent:

- ArraySubs signup fee;
- Woo shipping;
- Woo fees;
- the Woo tax total; or
- an arbitrary coupon-adjusted recurring amount.

Paddle can support discounts, one-time charges, and tax calculation as platform capabilities. That does not mean the current adapter models each Woo concept.

| Woo commercial element | Current inspected mapping | Launch position |
| --- | --- | --- |
| Base recurring product Price | Paddle Price ID + quantity | Candidate after sync verification |
| Same-cycle multiple recurring items | Intended | Verify one transaction/subscription mapping and exact totals |
| Different recurring cycles | Rejected | Expected and appropriate for Paddle transaction constraint |
| Eligible one-time digital item | One-time Paddle Price path | Verify amount, tax category, fulfillment, refund allocation |
| Signup fee | Not represented | Unsupported until implemented |
| Shipping | Not represented | Physical model usually ineligible; do not offer |
| Woo fee | Not represented | Unsupported/unreconciled |
| Woo coupon/discount | No equivalent seen in recurring item builder | High mismatch risk |
| Woo-calculated tax | Paddle calculates separately | Never assume parity; reconcile |
| Multicurrency order | Synced Price tends to use store currency | High risk; prove or block |

Before fulfillment, compare Woo line subtotal/discount/fee/shipping/tax/total to Paddle subtotal/discount/tax/total/currency. A `transaction.completed` event proves Paddle settled its transaction; it does not prove the Woo total was correct.

## Renewals: Paddle charges, ArraySubs records

Paddle creates and collects renewal Transactions from the remote Subscription schedule. ArraySubs’ renewal payment handler adopts a waiting posture rather than making another charge.

### Normal order-first path

```text
ArraySubs creates pending order
→ Paddle reaches next billed time
→ Paddle creates/collects Transaction
→ signed completed event arrives
→ ArraySubs finds pending order
→ stores txn ID and completes order
→ local dates/access advance
```

### Event-first fallback

If Paddle charges before the local scheduler creates an order, the webhook handler can create a retroactive renewal order, set its total from the Paddle Transaction, and mark it paid. That prevents a remote renewal from disappearing locally.

It is not a full accounting reconstruction. The fallback can lack normal line-item, tax, fee, coupon, and fulfillment detail. A later scheduler run must also recognize the paid period and avoid creating another payable order.

Test:

- order first, event second;
- event first, order second;
- exact billing-boundary concurrency;
- two copies of one event concurrently;
- two Paddle transactions for one local period;
- stale failure after success;
- local schedule delay after remote settlement; and
- missing webhook recovered by a controlled reconciliation process.

## Webhooks are at least once and out of order

Paddle explicitly documents [at-least-once delivery](https://developer.paddle.com/webhooks/about/how-webhooks-work/) and no guaranteed chronological order. Every handler must therefore be idempotent at the event and business-object level.

![Annotated ArraySubs Gateway Health screen identifying the Paddle health card, webhook endpoint, and event-evidence log.](/blogs/paddle-merchant-of-record-for-woocommerce-subscriptions/paddle-gateway-health-verified.png)

The current verifier reads the exact raw body, parses `Paddle-Signature`, calculates HMAC SHA-256 for `timestamp:body`, rejects old timestamps using a five-minute tolerance, and compares safely. Paddle’s [signature guide](https://developer.paddle.com/webhooks/about/signature-verification/) supports multiple `h1` signatures during rotation; the current parser retains only one, so rotation needs a specific test.

### Current mapped events

| Paddle event | Current path | Important gap |
| --- | --- | --- |
| `transaction.completed` | Complete initial/renewal order | Amount/line parity and concurrency still need guards |
| `transaction.payment_failed` | Mark payment failed | Past-due/recovery event coverage is incomplete |
| `subscription.created` | Capture remote mapping | Can arrive before local correlation exists |
| `subscription.updated` | Generic/payment-context sync | Broader than a payment-method update; stale ordering risk |
| `subscription.paused` / `resumed` | Local lifecycle context | Effective-time and immediate-charge semantics matter |
| `subscription.canceled` | Local cancellation context | Must not be overwritten by older update |
| `adjustment.created` | Refund-like handler | Credits/chargebacks filtered; async state incomplete |

Notably absent for workflows discussed here are `transaction.past_due`, `subscription.past_due`, `subscription.activated`, `subscription.trialing`, `adjustment.updated`, and payment-method saved/deleted events.

### The duplicate race

The shared event table has a unique gateway/event-ID key. The router currently checks whether an event exists, performs handler side effects, and records the event after success. Two simultaneous deliveries can both pass the check and both create/complete an order before one log insert loses the race.

Use this safer design:

1. verify signature;
2. atomically insert/claim the event as processing;
3. return after durable acceptance or queue the work;
4. lock the remote Transaction/local subscription or period;
5. make order completion/refund/state updates independently idempotent;
6. record success/failure/retry details; and
7. compare `occurred_at`/remote `updated_at` before applying older state.

The current parser retains `occurred_at`, but handlers do not visibly reject stale state. An old update arriving after cancellation can regress local metadata. Also, event records are cleaned after roughly 30 days, so transaction/order idempotency must survive longer than the transport log.

## Dunning is a shared operations problem, not one retry engine

Paddle owns the remote schedule and collection recovery. ArraySubs handles local failure/order/access behavior. Mapped `transaction.payment_failed` is only one signal; Paddle Transactions and Subscriptions can also become past due.

Document:

- which Paddle state triggers local grace/access changes;
- which system emails the customer and when;
- how duplicate failure messages are prevented;
- what restores local access after later success;
- how past-due differs from paused/cancelled;
- how local fixed-term/cancellation stops remote collection; and
- how support confirms no remote retry before asking for another payment.

For general recovery policy, read [What Happens When a Subscription Payment Fails](/payment-recovery/what-happens-when-a-subscription-payment-fails/). Do not impose a separate ArraySubs charge retry on a Paddle-managed schedule.

## Lifecycle operations have provider-specific timing

### Cancel now and cancel at period end

The adapter calls Paddle’s cancellation API. Period-end cancellation sends `effective_from: next_billing_period`, which creates a remote `scheduled_change`. Immediate cancellation is terminal.

Test the billing boundary, pending transaction, duplicate click, webhook/API race, timezone, access end, and local rollback after API failure. Refund remains a separate action.

### Undo cancellation can clear the wrong scheduled change

Current restoration patches `scheduled_change` to `null` without first proving that the current remote scheduled action is the cancellation being undone. If a newer pause replaced it, an old undo could clear the pause.

Retrieve the latest subscription, require `scheduled_change.action === cancel`, compare expected version/timestamp, then clear.

### Pause defaults to later; resume can charge now

The current pause request sends no body. Paddle’s documented default is pause at the next billing period. Local UI/status can therefore show paused before the remote schedule becomes paused.

Resume also sends no body. Paddle’s default resumes immediately, starts a new billing period, and can collect an immediate payment. Confirmation text must disclose that a resume can charge now and move the billing anchor.

Test local/remote status immediately and after effective time, scheduled change, a renewal between request/effective date, resume charge/credits, duplicate clicks, and webhook delay beyond the five-minute two-way guard.

### Fixed-term plans are not modeled remotely

Source inspection did not find ArraySubs length/payment-count/customer-chosen duration mapped into the Paddle Price or a proven final-period remote cancellation. A local subscription can expire while Paddle remains active.

Do not sell fixed-term Paddle subscriptions until the remote stop is implemented and proven at the exact final period.

## Payment-method updates use Paddle’s portal

ArraySubs Pro creates a Paddle customer portal session using the stored Paddle Customer ID and opens the general overview URL. It does not pass a subscription-specific deep-link request.

Paddle’s portal can expose invoices, transaction history, method update, and subscription management according to its configuration. The URL is temporary and should be generated on demand.

Limitations to test:

- the exact customer and subscription shown;
- portal actions allowed by Paddle versus local ArraySubs policy;
- which subscription the new method applies to;
- multiple Paddle subscriptions for one customer;
- missing/wrong customer mapping;
- URL expiration and ownership enforcement;
- payment-method saved/deleted event coverage; and
- whether local brand/last-four display refreshes.

Say “ArraySubs sends the customer to Paddle’s portal,” not “ArraySubs updates the card.” The [member payment-update recipe](/deals/arraysubs/use-cases/recipes/member-update-payment/) describes the desired customer workflow; verify the provider-specific behavior separately.

## Current refunds are a launch blocker

Paddle uses Adjustments for refunds, credits, and chargebacks. The inspected Woo refund method currently builds incompatible requests.

For a full refund, it omits required `type: full`. For a partial refund, it sends a `txn_...` Transaction as `items[].item_id`, but Paddle requires a `txnitm_...` transaction line-item ID with correct allocation.

Paddle can also create a refund in pending approval. The method reports success after Adjustment creation and does not map `adjustment.updated`, so Woo can believe a refund is complete before Paddle approves or rejects it.

Required fix/test:

1. Retrieve the Paddle Transaction and its actual line items.
2. Build full or partial Adjustment with the exact current schema.
3. Add a durable idempotency/recovery key for uncertain requests.
4. Keep local refund pending while remote status is pending approval.
5. Map `adjustment.updated` approved/rejected outcomes.
6. Allocate amount/tax/discount across Woo refund lines.
7. Reconcile dashboard-created Adjustments into Woo records.
8. Test timeout after remote creation, duplicate events, refund after payout, and negative-balance impact.

Until that passes, do not recommend the Woo refund button for Paddle even though the gateway capability flag says refunds are supported.

## Chargebacks still matter to the supplier

Paddle handles the payment-network dispute process as MoR, but Adjustment events can represent chargeback warnings and chargebacks. The current handler filters non-refund actions and the gateway declares no dedicated dispute capability.

The supplier still needs to:

- provide fulfillment/access evidence;
- prevent fraud and account abuse;
- decide whether access remains active;
- respond to Paddle’s requests;
- record chargeback/fee/balance movements; and
- prevent later service/renewals where appropriate.

Paddle explains its [chargeback model](https://www.paddle.com/help/manage/risk-prevention/understanding-chargebacks-with-paddle). Never promise that Paddle absorbs every economic loss.

## Tax, invoices, and payout accounting

Paddle’s tax engine uses product classification and buyer facts to calculate the Paddle-to-buyer transaction. The Woo order remains a crucial internal operational record, but it is not automatically the buyer’s authoritative tax invoice.

![A global tax-evidence laboratory routes buyer location and tax-category signals into transaction documents and remittance vaults.](/blogs/paddle-merchant-of-record-for-woocommerce-subscriptions/paddle-global-tax-evidence.png)

### Avoid double or contradictory invoices

Configure Woo PDF-invoice tools carefully. A document naming your supplier entity as seller and separately charging the same transaction tax can contradict Paddle’s MoR document. Consider labeling Woo output as an order confirmation/internal record and directing customers to Paddle’s portal for the transaction invoice, subject to professional advice.

Test consumer/B2B, domestic/cross-border, tax-inclusive/exclusive, valid/invalid tax ID, location mismatch, exemption/reverse charge, refunds, trial-to-paid, and buyer-location changes.

### Payout is net settlement, not gross Woo sales

ArraySubs can store limited payout detail from a successful Transaction, but it does not import Paddle’s payout reconciliation reports or fully map tax, fees, FX, reserves, refunds, chargebacks, and bank settlement.

![A three-way reconciliation bridge matches transaction slices, local order trays, Adjustments, and exceptions into a net payout chest.](/blogs/paddle-merchant-of-record-for-woocommerce-subscriptions/paddle-payout-reconciliation.png)

Reconcile three levels:

1. **Commerce ledger:** Woo initial/renewal/refund orders and ArraySubs state.
2. **Paddle subledger:** Transactions, Adjustments, taxes, fees, balance movements, Subscriptions, and payout report.
3. **Cash ledger:** statement/remittance and the actual bank deposit after bank/SWIFT costs.

For every Transaction, retain `txn_...`, `sub_...`, `ctm_...`, Woo order/subscription, gross, discount, tax, total, currency, fee/balance currency, Adjustment IDs/status, timestamps, payout/report period, and reconciliation status. Paddle documents its [payout reconciliation report](https://developer.paddle.com/build/reports/payout-reconciliation/).

## Production test matrix

### Onboarding and security

- [ ] Entity, product category, website, legal pages, and domain are approved.
- [ ] Sandbox API key/client token/webhook secret all match.
- [ ] Live/sandbox mix fails safely.
- [ ] Least-privilege key supports every used endpoint.
- [ ] Public HTTPS webhook preserves raw body.
- [ ] Signature rotation, multiple `h1`, timestamp boundary, WAF, and clock skew are tested.
- [ ] Gateway Health shows environment and event outcomes without secrets.

### Catalog and terms

- [ ] Interval 1 syncs correctly.
- [ ] Interval greater than 1 is fixed and verified remotely.
- [ ] Free trial keys are fixed and trial appears in Paddle Price.
- [ ] Product/variation amount, currency, cadence, trial, and tax category have a fingerprint.
- [ ] Price change creates a controlled new Price.
- [ ] Existing subscriptions are migrated with explicit Paddle item/proration flow or remain intentionally unchanged.
- [ ] Signup fee, fee, shipping, coupon, tax, fixed term, and different renewal price are blocked unless implemented.

### Cart and checkout

- [ ] One subscription exact total.
- [ ] Quantity and two same-cycle subscriptions.
- [ ] Different cycles rejected with useful message.
- [ ] Eligible one-time digital item plus subscription.
- [ ] Physical/ineligible product blocked.
- [ ] Classic and Blocks overlay close, back, refresh, double submit, delay, mobile, and accessibility.
- [ ] Browser completion never marks paid before verified webhook.

### Events and renewal

- [ ] Order-first and event-first paths converge on one paid order.
- [ ] Duplicate same event sequential/concurrent is harmless.
- [ ] New event ID for same Transaction is harmless.
- [ ] Older update after cancel/pause/resume cannot regress state.
- [ ] Failure → later success restores order/access coherently.
- [ ] Unsupported critical events alert visibly.
- [ ] Webhook is accepted durably and processed within Paddle’s response target.

### Lifecycle and portal

- [ ] Immediate and period-end cancellation.
- [ ] Undo clears only the intended cancellation.
- [ ] Pause timing matches local access language.
- [ ] Resume confirmation discloses immediate charge/new billing period.
- [ ] Fixed-term end stops remote Paddle billing.
- [ ] Portal session is owner-only, temporary, and opens the intended customer/subscription.
- [ ] Method update is used by the next renewal and local display does not mislead.

### Refund, disputes, tax, and finance

- [ ] Correct full/partial Adjustment schema and line allocation.
- [ ] Pending → approved/rejected updates Woo correctly.
- [ ] External refund maps local refund/accounting/access.
- [ ] Chargeback warning/chargeback has an operational/economic case.
- [ ] Paddle tax/document result is correct for representative jurisdictions.
- [ ] No duplicate contradictory Woo invoice.
- [ ] Payout report ties to Paddle ledger, statement, and bank deposit.

## Monitoring after launch

Alert on:

- checkout Transaction creation errors/timeouts;
- old pending Woo Paddle orders;
- signature rejection, webhook latency, event-processing failures, and queue age;
- retroactive renewal-order creation;
- completed Paddle Transaction without paid Woo order;
- paid Woo order without completed Paddle Transaction;
- multiple Paddle Transactions for one local period;
- amount/currency/tax variance;
- stale Price fingerprint;
- past-due or scheduled-change mismatch;
- active remote/cancelled local—or the reverse;
- refund marked complete while Adjustment is pending/rejected;
- unhandled chargeback action; and
- payout/bank variance.

The ArraySubs [Gateway Health recipe](/deals/arraysubs/use-cases/recipes/gateway-health-monitor/) helps monitor credentials, endpoint state, and event flow. It is not financial reconciliation.

## Decision framework

### Paddle is a strong candidate when

- your entity and products are approved software/digital offers;
- global sales-tax/VAT administration is a major burden;
- you accept Paddle as buyer-facing reseller and document issuer;
- Paddle-controlled checkout, schedule, payment methods, and payout timing fit the business;
- your cart is simple and exact economics can be represented in Paddle;
- the current interval/trial/catalog/refund blockers are fixed; and
- finance/operations can reconcile remote and local records.

### Choose a direct processor or another architecture when

- you sell physical goods or mostly human services;
- you must remain buyer-facing Merchant of Record;
- WooCommerce must initiate every renewal;
- complex shipping, fees, coupons, mixed currencies, usage billing, or negotiated invoices are essential;
- upgrades/downgrades/proration must be native today;
- you cannot accept remote payout timing/reserves/control; or
- your team cannot build the required reconciliation and monitoring.

Compare the provider-owned model with [PayPal recurring agreements](/payments-and-compliance/paypal-recurring-payments-for-woocommerce-agreements-renewals-and-limits/) and the site-initiated [Stripe renewal model](/payments-and-compliance/stripe-recurring-payments-for-woocommerce-how-they-work-and-what-to-test/).

## Final recommendation

Paddle Merchant of Record can be a powerful architecture for an approved software or digital subscription business using WooCommerce as its storefront and ArraySubs as its local subscription/entitlement layer. Its value is the coherent transfer of buyer-facing sale, transaction-tax, payment, document, refund, and dispute administration—not a vague promise of universal compliance.

Treat the integration as two controlled transfers:

```text
responsibility transfer
supplier → Paddle as reseller/MoR

control-plane transfer
local schedule → Paddle Subscription

required bridge
signed events + reconciliation
```

Before launch, fix and test the current interval/trial metadata mismatch, stale Price behavior, commercial-total omissions, refund Adjustment flow, webhook ordering/idempotency, fixed-term stop, and payout reconciliation. Those are not edge polish; they determine whether the buyer is charged the disclosed amount and whether Woo access/accounting matches Paddle truth.

ArraySubs Pro supplies Paddle catalog/checkout wiring, local subscription and renewal-order integration, customer portal routing, lifecycle hooks, and Gateway Health around that provider-controlled system. Use [ArraySubs payment gateway features](/deals/arraysubs/features/#payment-gateways) after the independent architecture decision is settled, and enable live billing only after the full intended offer passes sandbox and production-readiness testing.

[View ArraySubs Pro pricing](/deals/arraysubs/pricing/) when Paddle’s Merchant-of-Record model fits your catalog and the intended offer has passed the article’s launch gates.

## Verification scope, limitations, and update log

This guide was written and fact-checked by Emran at ArrayHash. Verification during the latest update combined ArraySubs Free and Pro source inspection, current Paddle legal/developer documentation, and fresh staging captures of the Paddle settings, WooCommerce provider row, and ArraySubs Gateway Health interface.

The staging pass verified installed versions, configuration surfaces, provider visibility, sandbox controls, capability labels, the webhook URL display, and the event-log interface. It did **not** enter Paddle credentials, enable the gateway, synchronize a live catalog, create a sandbox Transaction or Subscription, open Paddle Checkout, receive provider-originated events, pause or resume a remote subscription, update a payment method, request an Adjustment, test a chargeback, or reconcile a payout. The implementation gaps and launch blockers in this guide come from first-party source inspection and remain subject to sandbox proof after code changes.

Update history:

- **July 22, 2026:** Recaptured and strictly annotated three real staging screenshots, recorded their provenance and marker plans, mirrored accepted bytes into both asset trees, refreshed the verification limitations, and added the Pro pricing CTA.
- **May 26, 2026:** Updated the article’s operational guidance and metadata.
- **February 28, 2026:** Original publication.

Reverify after ArraySubs changes Paddle catalog sync, checkout totals, event correlation, lifecycle actions, portal routing, Adjustment/refund handling, or Gateway Health; after Paddle changes legal terms, eligibility, prices, APIs, event schemas, refund approval, tax treatment, or payout reporting; and after WooCommerce changes payment-provider or Checkout Block behavior.

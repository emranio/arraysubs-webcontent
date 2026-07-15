# Research dossier: How to Add Subscriptions to WooCommerce (A001)

**Research completed:** 2026-07-13  
**Article brief:** `web-content/content-plan/articles/001-how-to-add-subscriptions-to-woocommerce-the-complete-2026-guide.md`  
**Publishing standard:** `web-content/content-plan/plan/07-seo-geo-publishing-standard.md`  
**Evidence policy used:** current official WooCommerce and WordPress documentation for platform behavior; current ArraySubs code, architecture docs, and first-party product page for ArraySubs-specific facts. No third-party benchmarks or unsourced statistics were used.

## Research scope and test status

This dossier supports a broad, implementation-neutral setup guide. It should explain the decisions and lifecycle a merchant must design before linking to ArraySubs-specific recipes for exact configuration. It must not reproduce the narrow recipes.

ArraySubs product truth was checked against the workspace on 2026-07-13:

- ArraySubs core header version: **1.8.9** (`arraysubs/arraysubs.php`).
- ArraySubs Pro header version: **1.1.0** (`arraysubspro/arraysubspro.php`).
- The local code declares WordPress 6.0+, PHP 8.1+, and WooCommerce 8.0+ requirements; the core header declares HPOS compatibility and “WC tested up to: 10.” Treat these as declarations in the inspected build, not as independent certification.
- This research pass inspected code and current documentation. It did **not** run a live signup, renewal, failure, or refund transaction. If the published article claims observed behavior, the writer must add a dated test record and original screenshots from a controlled store.

## Search intent and recommended thesis

The searcher is not merely asking where a “subscription” checkbox lives. They need a safe path from a one-time WooCommerce catalog to a recurring operation. The differentiating thesis should be:

> Adding subscriptions is a four-system design problem—billing, access, fulfillment, and customer self-service—not a single product-field change. Choose the commercial model first, then choose an engine and gateway that can execute the full lifecycle, and prove signup plus renewal in a sandbox before launch.

This framing is defensible, useful to first-time operators, and avoids turning the article into a generic plugin installation tutorial.

## Suggested direct answer (40–60 words)

> To add subscriptions to WooCommerce, install a subscription engine, choose what recurs and when it ends, configure the product’s price and billing schedule, connect a compatible payment gateway, define taxes, shipping, access, and self-service, then complete both signup and renewal tests in a sandbox. WooCommerce alone does not manage that full lifecycle.

The first 150 words should name **WooCommerce**, a **subscription engine/plugin**, **subscription product**, **payment gateway**, and **renewal order**. Do not open with ArraySubs promotion.

## Key conclusions for the article

1. A subscription product defines what the buyer can purchase; the subscription record is the ongoing agreement; the parent and renewal orders record individual transactions. Conflating these objects causes support and reporting mistakes.
2. The first decision is the product model—open-ended recurring, fixed-term recurring, prepaid, or lifetime—not the plugin settings screen.
3. Automatic renewal support must be verified for the exact gateway extension, checkout/payment method, feature, and installed version. A gateway brand name alone is not enough.
4. Billing cadence, access duration, and fulfillment cadence can differ. Model all three explicitly; a monthly shipment does not necessarily imply a monthly charge.
5. A successful first checkout is insufficient validation. Launch only after testing the next scheduled action, renewal order, automatic/manual payment behavior, emails, customer portal, cancellation, and at least one failure path.

## Terminology and factual foundation

### WooCommerce versus a subscription engine

WordPress plugins extend core functionality, and the official WordPress installation flow is Plugins → Add New → Install → Activate. WooCommerce provides the commerce catalog, checkout, orders, tax/shipping framework, and payment-gateway layer. A subscription engine extends that foundation with a future-payment agreement, billing schedule, lifecycle statuses, renewal-order creation, and scheduled work.

Safe wording: “WooCommerce is the commerce foundation; recurring lifecycle behavior comes from a subscription extension or plugin.” Do not state that installing WooCommerce alone produces a complete subscription system.

Evidence:

- WordPress plugin installation and compatibility guidance: https://wordpress.org/documentation/article/manage-plugins/
- WooCommerce Subscriptions documentation index: https://woocommerce.com/document/subscriptions/
- Official WooCommerce Subscriptions product-creation guide: https://woocommerce.com/document/subscriptions/creating-subscription-products/

### Product, subscription, and orders are different entities

WooCommerce’s official Subscriptions documentation describes a subscription as an agreement for future transactions and orders as records of past transactions. Checkout normally creates a parent order and a subscription; later payments are represented by renewal orders. One subscription can accumulate multiple renewal orders over its life.

Use these definitions:

| Entity | What it represents | Practical question it answers |
|---|---|---|
| Subscription product/plan | The purchasable offer and default pricing/schedule rules | “What can a new buyer choose?” |
| Parent order | The initial checkout transaction | “What happened at signup?” |
| Subscription record | The continuing agreement, current status, schedule, customer, and payment context | “What should happen next?” |
| Renewal order | A transaction record for one later billing cycle, automatic or manual | “What happened at this renewal?” |
| Entitlement/access rule | What the active/trial/ended state unlocks | “What may this customer use?” |

Evidence:

- Subscription order relationships: https://woocommerce.com/document/subscriptions/orders/
- Woo troubleshooting creation model: checkout → parent order → subscription snapshot → renewal-order snapshot: https://woocommerce.com/document/subscriptions/troubleshooting-framework/

### Core schedule terms

- **Recurring amount:** amount due for each billing period.
- **Billing period:** day, week, month, or year (the available set and limits vary by engine).
- **Billing interval:** number of periods between charges, such as every 3 months.
- **Length/end:** finite number of charges or periods; zero/blank commonly means continue until cancellation, but the UI and counting convention must be confirmed in the selected engine.
- **Sign-up fee:** one-time amount at signup in addition to the recurring amount. In WooCommerce Subscriptions, a sign-up fee is charged at the beginning even when the plan has a free trial.
- **Free trial:** period before the recurring charge starts; a zero-dollar signup can affect whether a payment method is collected and how conversion behaves.
- **Next payment date:** when the next renewal process is due.
- **Automatic renewal:** the system attempts payment without customer action.
- **Manual renewal:** a renewal order/invoice requires the customer to return and pay.
- **Pending cancellation/cancel at period end:** access continues through the prepaid period, then ends.
- **Expired:** a finite term reached its defined end; this is semantically different from a customer cancellation.

Evidence:

- Current product fields, trial, sign-up fee, total-payment semantics, and available periods in WooCommerce Subscriptions: https://woocommerce.com/document/subscriptions/creating-subscription-products/
- Renewal modes: https://woocommerce.com/document/subscriptions/renewal-process/
- Lifecycle status meanings: https://woocommerce.com/document/subscriptions/statuses/

## What the subscription engine must do

The article can use a four-layer diagram with the following responsibilities:

1. **Offer layer:** recurring price, interval, fixed/open-ended term, trial, sign-up fee, variants.
2. **Agreement layer:** subscriber, active/trial/on-hold/ended state, next payment, end date, stored payment context.
3. **Transaction layer:** parent order, renewal order, tax, discounts, shipping, refunds, emails, payment result.
4. **Operations layer:** scheduled actions, retries, webhooks, logs, portal actions, access changes, monitoring.

Official WooCommerce documentation states that Woo Subscriptions relies on scheduled actions for renewals, expirations, and status updates. Action Scheduler provides a queue, logging, and an admin interface; WP-Cron is one mechanism that wakes the queue. Low-traffic or broken-cron sites can run jobs late. This is why monitoring scheduled work belongs in the setup guide, not only in troubleshooting content.

Evidence:

- Scheduled events and WP-Cron/Action Scheduler: https://woocommerce.com/document/subscriptions/develop/complete-guide-to-scheduled-events-with-subscriptions/
- Scheduled-action error symptoms and normal renewal sequence: https://woocommerce.com/document/subscriptions/scheduled-action-errors/

## Product-model decision framework

### Do not use “prepaid,” “fixed-term,” and “installment” as synonyms

These models change when money is collected and therefore create different risk, refund, tax, fulfillment, and failed-payment behavior.

| Model | Payment pattern | End behavior | Typical use | Main setup risk |
|---|---|---|---|---|
| Open-ended recurring | Charge every period until cancellation | No predefined end | Membership, replenishment, SaaS access | Unclear cancellation and dunning policy |
| Fixed-term recurring | Charge each period for N total payments/periods | Expires after the defined term | 12-week program, six-box run | Off-by-one counting and trial-length assumptions |
| Prepaid term | Collect the full term upfront; deliver/access over time | Ends or renews after prepaid term | Annual membership, prepaid box series | Billing and fulfillment schedules are different |
| Lifetime/one-time entitlement | One payment; no renewal | Ongoing access under stated lifetime definition | Launch deal, permanent course access | Calling it recurring when it is not; unbounded support cost |
| Installment plan | Split a fixed total across several payments | Ends after balance paid | Course tuition or financed purchase | Mistaking financing/installments for a cancel-anytime subscription |

Decision tree:

```text
Will the customer ever be charged again after checkout?
├─ No
│  ├─ Access/benefit lasts for a defined term → prepaid fixed term
│  └─ Access is intended to continue indefinitely → lifetime/one-time entitlement
└─ Yes
   ├─ Is the number of charges predetermined?
   │  ├─ Yes → fixed-term recurring or installment plan (state the total price)
   │  └─ No → open-ended recurring until cancellation
   └─ Does delivery happen on the same cadence as billing?
      ├─ Yes → one schedule may drive both
      └─ No → define a separate fulfillment/access schedule and tooling
```

Important ArraySubs content inconsistency to handle: the required internal link slug `/prepaid-fixed-cycles/` currently describes **six monthly charges**, which is fixed-term recurring/installment behavior, not full upfront prepayment. Link it as the “fixed-cycle recipe,” but do not repeat its “prepaid” label as a definition. The broader guide should correct the terminology without attacking the recipe.

### Worked examples for original analysis

Use transparent, hypothetical examples—never present them as customer results or benchmarks.

| Offer | Billing | Access | Fulfillment | Self-service requirements |
|---|---|---|---|---|
| Coffee club | $28 monthly until canceled | N/A | One box monthly | Change address, skip/pause, cancel, payment update |
| 12-week course | $120 monthly for 3 payments | Course access for 12 weeks | Weekly lessons | Payment update, access end date, failed-payment grace |
| Annual community | $240 upfront each year | 12 months | Continuous digital access | Cancel at period end, renewal reminder, payment update |
| Six-box prepaid series | $240 once | N/A | One box monthly for 6 months | Address changes and shipment tracking; no monthly payment retry |
| Lifetime course | $299 once | Ongoing under published lifetime terms | Immediate digital access | Account recovery and entitlement support; no renewal portal action |

## Map four clocks before choosing settings

The most useful original framework is a “four clocks” worksheet:

1. **Billing clock:** when money is due and how many times.
2. **Access clock:** when entitlement starts, pauses, and ends.
3. **Fulfillment clock:** when goods/services are delivered and whether shipping repeats.
4. **Recovery clock:** retry intervals, grace period, reminder timing, and cancellation/end timing.

Worksheet fields:

| Area | Merchant must decide | Verification question |
|---|---|---|
| Initial charge | recurring amount, sign-up fee, trial, proration, tax, first shipping | Does checkout show the exact amount due today and the next charge? |
| Renewal | amount, interval, automatic/manual mode, coupon effect | Does a renewal order contain the correct items and total? |
| Access | states that grant access, trial behavior, grace, end/cancel behavior | Does access change at the intended lifecycle event? |
| Fulfillment | shipment frequency, recurring/one-time shipping, address cutoff, stock | Does each intended shipment have an operational order/work item? |
| Self-service | view, pay, update payment/address, pause, skip, switch, cancel | Can customers complete allowed actions without support? |
| Failure | retry rules, emails, grace, hold/cancel, support handoff | What happens after a decline and after recovery? |

Woo’s FAQ explicitly warns that its standard Subscriptions model does not natively express a billing schedule that differs from the recurring shipping schedule (for example, charge quarterly but ship monthly). Use this only as a product-specific example of why separate-clock design matters; do not generalize it to every extension.

Evidence: https://woocommerce.com/document/subscriptions/faq/

## Payment gateway research

### Manual versus automatic renewals

WooCommerce’s official renewal-process guide distinguishes:

- Automatic renewals: no customer action for each successful renewal; only compatible gateway integrations can do this.
- Manual renewals: customer logs in and pays each renewal through standard checkout; the customer can typically select a payment method per renewal.

Woo warns that manual renewal is not recommended for frequent renewals because every period adds customer action. This is Woo’s operational advice, not a universal measured conversion statistic.

Evidence: https://woocommerce.com/document/subscriptions/renewal-process/

### Gateway verification checklist

Do not write “Stripe/PayPal supports subscriptions” without qualification. Verify:

1. Exact WooCommerce gateway extension and vendor.
2. Exact checkout payment method (card, wallet, bank debit, etc.).
3. Automatic versus manual renewal.
4. Token/payment-method storage and customer update path.
5. Cancellation, suspension/reactivation, date changes, recurring amount changes, and multiple-subscription support.
6. Who owns the schedule: the WooCommerce site/extension or a remote gateway agreement.
7. Webhook setup, signature verification, retries, reconciliation, and idempotency.
8. Sandbox/test support and how off-session renewal can be triggered.
9. Currency, country, SCA/3DS, minimum-amount, and refund constraints.
10. Installed extension version; Woo notes support tables refer to latest official versions and may not apply to third-party extensions or hosted wrappers.

Official Woo documentation confirms that gateway feature support varies, and its compatibility tables include cancellation, suspension, reactivation, multiple subscriptions, recurring-total changes, payment-date changes, and payment-method changes. It also documents two architectures: a gateway may own the remote recurring schedule, or the site/extension may schedule token-based charges.

Evidence:

- Current gateway feature tables and caveats: https://woocommerce.com/document/subscriptions/payment-gateways/
- Checkout enablement and “Automatic Recurring Payments” indicator: https://woocommerce.com/document/subscriptions/payment-gateways/enabling-payment-gateways-for-subscriptions/
- Gateway-controlled versus extension-scheduled architecture: https://woocommerce.com/document/subscriptions/develop/payment-gateway-integration/

## Renewal lifecycle and statuses

Use a product-neutral lifecycle graphic, then explain that exact labels vary by engine:

```text
Product selected
  → checkout calculates amount due today
  → parent order created
  → subscription agreement created
  → trial or active
  → scheduled next-payment event becomes due
  → renewal order created
  → automatic charge OR manual invoice/payment
      ├─ success → renewal order paid → subscription active → next date scheduled
      └─ failure → failed/on-hold/retry/grace path → recover or end
  → fixed term expires OR customer cancellation takes effect
```

WooCommerce Subscriptions’ documented statuses include Pending, Active, On-hold, Pending-Cancellation, Cancelled, and Expired. Active means the agreement is expected to renew or expire in future. Pending-cancellation preserves the prepaid term until the end. Expired indicates the defined end date/length was reached. Use these as an official example, not a promise that every plugin uses identical status slugs.

Evidence:

- Status definitions: https://woocommerce.com/document/subscriptions/statuses/
- Renewal sequence and automatic/manual modes: https://woocommerce.com/document/subscriptions/renewal-process/
- Renewal-order relationship: https://woocommerce.com/document/subscriptions/orders/

## Taxes, shipping, access, and customer self-service

### Taxes

Avoid universal tax claims. WooCommerce Subscriptions documents different tax behavior for manual and automatic renewal flows: manual renewal tax is calculated when the customer pays through checkout, while automatic renewal can apply the recurring tax lines captured on the subscription unless they are changed. Other engines and merchant-of-record gateways can differ.

Article guidance:

- Configure store tax rules before the end-to-end test.
- Test initial and renewal totals for representative taxable/non-taxable addresses.
- Verify how address changes affect future renewals.
- State that tax content is general information, not legal or tax advice.
- For ArraySubs, the current first-party product page says WooCommerce tax calculations are used for checkout and renewals except Paddle, which handles tax/VAT; this must be transaction-tested before publishing as observed behavior.

Evidence:

- Woo automatic/manual renewal tax comparison: https://woocommerce.com/document/subscriptions/renewal-process/
- ArraySubs first-party statement: https://arrayhash.com/deals/arraysubs/

### Shipping and stock

The engine must decide whether shipping is charged only at signup or on renewal, what address is used, and whether renewal orders trigger fulfillment and stock reduction. WooCommerce Subscriptions documents one-time shipping as a product option and states subscription-product stock is generally reduced at renewal. The customer address-management docs say address changes affect future subscription shipments, not historical orders.

Evidence:

- Product shipping and stock fields: https://woocommerce.com/document/subscriptions/creating-subscription-products/
- Customer address changes: https://woocommerce.com/document/subscriptions/customers-view/update-address/

### Access/entitlements

Recurring billing does not automatically define what gets unlocked. The merchant must map trial, active, grace/on-hold, pending-cancellation, cancelled, and expired states to content, downloads, services, roles, or external systems. For a cancellation at period end, access normally continues through the paid term; immediate cancellation can end access immediately. State the policy clearly and test the actual integration.

### Customer portal

At minimum, decide whether customers may:

- see status, next payment, totals, and related orders;
- pay manual/failed renewals;
- update billing/shipping address;
- change a stored payment method;
- turn automatic renewal on/off;
- pause, skip, switch, or cancel;
- understand when cancellation takes effect.

Woo’s current Subscriber’s View documents visibility of status, dates, totals, payment method, addresses, and order history, plus supported management actions. Availability can depend on gateway capabilities and settings.

Evidence:

- Customer portal overview: https://woocommerce.com/document/subscriptions/customers-view/
- Saved payment methods and token implications: https://woocommerce.com/document/subscriptions/customers-view/subscriber-payment-methods/
- Cancellation/suspension behavior: https://woocommerce.com/document/subscriptions/customers-view/suspend-cancel-or-remove-an-item/

## Failure recovery and operational reliability

A launch design must answer:

- Does a failed payment immediately remove access, or enter a grace/on-hold state?
- Which failure types are retried, how many times, and at what intervals?
- Can the customer update payment and retry?
- Can the system detect a successful charge whose webhook was missed before trying again?
- Which emails go to the customer and staff?
- What ends the recovery path—cancellation, expiration, downgrade, manual review?

WooCommerce Subscriptions has a failed-payment retry system that is off by default in its documented settings and stores retry records/statuses. Do not imply the same default or rules for other plugins. The wider truth is that a subscription implementation needs an explicit recovery policy.

Evidence:

- Woo failed-payment retry system: https://woocommerce.com/document/subscriptions/failed-payment-retry/
- Renewal troubleshooting, order notes, gateway logs, and failed scheduled actions: https://woocommerce.com/document/subscriptions/testing-subscription-renewal-payments/

## Recommended implementation sequence

This is a broad launch sequence, not an ArraySubs click-by-click recipe:

1. **Inventory the offer.** Write the recurring amount, amount due today, cadence, term/end, trial, sign-up fee, access, fulfillment, and cancellation promise in plain language.
2. **Choose the product model.** Open-ended, fixed-term recurring, prepaid, lifetime, or installment; do not configure until the terminology is unambiguous.
3. **Choose the subscription engine.** Check product models, gateway architecture, portal actions, tax/shipping behavior, scheduling, migration/export, and support ownership.
4. **Back up and use a controlled environment.** Update dependencies, verify compatibility, and avoid live payment credentials during setup.
5. **Install and activate the engine.** Follow WordPress’s official plugin workflow; exact product-editor labels vary by engine/version.
6. **Configure the subscription offer.** Use a simple product for one plan or variations/plans when customers choose tiers/cadences; set price, interval, length, trial, fee, and clear storefront disclosure.
7. **Configure payments.** Decide manual/automatic, enable the exact supported gateway method, use sandbox mode, confirm token and webhook behavior.
8. **Configure tax, shipping, access, portal, emails, and failure recovery.** Treat them as launch requirements, not future polish.
9. **Run a signup test.** Confirm product page, cart, checkout, amount today, future amount/date, parent order, subscription status, customer account, access, emails, and scheduled work.
10. **Run a renewal test.** Trigger the engine’s documented renewal method; confirm one renewal order, correct total/tax/shipping, payment result, next date, stock/access, and emails.
11. **Run exception tests.** Decline/failure, manual payment, payment update, address update, cancel-at-period-end/immediate cancel, finite expiry, and duplicate-site protection.
12. **Launch and monitor.** Watch overdue/failed scheduled actions, gateway/webhook logs, failed renewals, and support reports daily during the first renewal cohort.

WordPress advises taking a current backup before plugin updates. Woo advises using gateway test/sandbox modes and notes that test orders can still send email and affect analytics/integrations. The article should remind readers to isolate or clean test data.

Evidence:

- Plugin management/backups: https://wordpress.org/documentation/article/manage-plugins/
- Generic WooCommerce test-order guidance: https://woocommerce.com/document/managing-orders/testing-orders/
- Subscription renewal testing: https://woocommerce.com/document/subscriptions/testing-subscription-renewal-payments/

## Launch test matrix

Use this as the required extractable checklist/table in the article.

| Test | Expected proof | Where to inspect |
|---|---|---|
| Product display | amount due today, recurring amount/cadence, trial/fee/end are unambiguous | product, cart, checkout |
| Signup success | one parent order and one linked subscription; correct status and dates | orders + subscription admin |
| Portal | customer sees schedule, total, payment method, addresses, and permitted actions | My Account |
| Renewal action | exactly one due action and one renewal order | Scheduled Actions + related orders |
| Automatic renewal | sandbox charge succeeds; order paid; next date advances | gateway sandbox, order notes, subscription |
| Manual renewal | invoice/pay link works; payment reactivates/advances agreement | email + customer checkout |
| Failure | decline produces visible error, correct status, notification, and retry/grace behavior | order/subscription notes, logs, email |
| Payment update | new method is used for future renewals without losing agreement | portal + gateway + subscription |
| Address/shipping | future renewal uses intended address and shipping charge | renewal order |
| Cancellation | immediate versus period-end behavior matches promise and access policy | portal, status, scheduled work, access |
| Fixed-term expiry | no extra charge is scheduled after final cycle | subscription dates + Scheduled Actions |
| Duplicate/staging safety | cloned site cannot charge or email real customers | staging indicator/config, queue, gateway mode |

WooCommerce Subscriptions documents staging-mode protections because cloned production databases can otherwise create duplicate payment risk. The exact protection is product-specific; other engines must be checked explicitly. Never assume a generic staging clone is safe.

Evidence: https://woocommerce.com/document/subscriptions/subscriptions-handles-staging-sites/

## ArraySubs product truth (first-party, dated)

Use this only after the educational answer and decision framework. Recommended disclosure: “ArraySubs is the product discussed by this site; feature statements below were checked against ArraySubs 1.8.9 and ArraySubs Pro 1.1.0 on July 13, 2026.”

### Verified in local core code

- Core is a WooCommerce subscription manager with recurring billing, customer portal, and membership restrictions (`arraysubs/arraysubs.php`).
- Existing simple products and variable-product variations can be marked as subscriptions; the product fields include day/week/month/year or Lifetime Deal, interval 1–12, subscription length, trial, sign-up fee, and different renewal price (`arraysubs/src/Features/SubscriptionProducts/views/simple-product-fields.php`, `variation-fields.php`, and `Services/Validation.php`).
- The product helper treats lifetime as a non-renewing special case; the renewal processor refuses to generate renewal invoices for lifetime subscriptions (`arraysubs/src/functions/product-helpers.php`; `arraysubs/src/Features/RecurringBilling/Services/RenewalProcessor.php`).
- Core registers Pending, Active, On Hold, Cancelled, Expired, and Trial subscription statuses (`arraysubs/src/Features/Subscriptions/Services/SubscriptionCPT.php`).
- The renewal scheduler creates separate precise invoice-generation and due-time processing actions through centralized Action Scheduler hooks and groups (`arraysubs/src/Features/RecurringBilling/Services/RenewalScheduler.php`; `arraysubs/src/Supports/ActionScheduler.php`).
- If no Pro automatic gateway handles the agreement, the payment processor falls back to a manual renewal order/payment URL (`arraysubs/src/Features/RecurringBilling/Services/PaymentProcessor.php`).
- Renewal orders use the price captured on the subscription rather than silently adopting later product-price changes; they copy stored addresses, calculate totals, link to the subscription, and may add recurring shipping when configured (`arraysubs/src/Features/RecurringBilling/Services/OrderCreation.php`).

### Verified in local Pro code/docs

- Pro boots Automatic Payments, Subscription Shipping, Fixed Period Membership, Flexible Renewal Sync, Analytics, Audits, Store Credit, Checkout Builder, and other premium modules (`arraysubspro/src/Boot.php`).
- Automatic gateway implementations/delegates exist for Stripe, PayPal, and Paddle (`arraysubspro/src/Features/AutomaticPayments/Gateways/`).
- The documented architecture says Stripe is site/plugin-scheduled, while PayPal and Paddle can be gateway-scheduled; this affects cancellation, webhook, and reconciliation behavior (`documentations/architecture/cancellation-flow.md`; `gateway-sync.md`).
- Pro Subscription Shipping can store one-time versus recurring shipping behavior and customer/admin address-management endpoints (`arraysubspro/src/Features/SubscriptionShipping/`).
- The retry architecture documents configurable Stripe retries and gateway-side policies for PayPal/Paddle; do not summarize this as one universal retry schedule (`documentations/architecture/payment-retry-system.md`).

### First-party public product-page statements

The live ArraySubs product page currently presents simple/variable subscriptions, trials, sign-up fees, different renewal prices, fixed-period rules, lifetime deals, a customer portal, manual renewals in core, and Stripe/PayPal/Paddle automatic renewals in Pro: https://arrayhash.com/deals/arraysubs/

The same page correctly marks several features **Coming soon**. The article must not present these as shipped:

- Installment / Split Payments
- Customer-Chosen Subscription Duration
- Early Renew
- Donation & Crowdfunding Module

### Where ArraySubs is not the best fit

State neutrally that ArraySubs may not be the best fit when:

- the store does not use WooCommerce/WordPress;
- the required automatic gateway is outside the currently implemented Stripe, PayPal, and Paddle paths and manual renewal is unacceptable;
- the launch requires a currently marked coming-soon workflow such as customer-chosen duration or native split-payment installments;
- the business needs a fully hosted commerce system rather than owning WordPress/WooCommerce operations, cron, updates, and gateway integration;
- migration risk from an established subscription stack outweighs the benefit of changing engines;
- the billing model is usage-metered or otherwise not demonstrated by current shipped code.

Do not claim a competitor is better or lacks a feature without a separate current comparison test.

## Required internal links and placement

- After the neutral engine-selection framework: `/deals/arraysubs/` (commercial pillar).
- In the product/model section: `/deals/arraysubs/features/#products-checkout`.
- Contextual recipe links, without duplicating their configuration:
  - monthly versus annual: `/deals/arraysubs/use-cases/recipes/monthly-vs-annual-variable/`
  - fixed-cycle recipe: `/deals/arraysubs/use-cases/recipes/prepaid-fixed-cycles/`
  - lifetime: `/deals/arraysubs/use-cases/recipes/lifetime-deal-one-time/`
- Sibling education:
  - A002 “What Is a WooCommerce Subscription?”
  - A003 “WooCommerce Subscription Product Types Explained”
  - A004 “Simple vs Variable WooCommerce Subscriptions”
- Primary CTA only after the core answer and launch framework: `/deals/arraysubs/pricing/` (“View Pro Pricing”).

## Visual and image opportunities

All generated visuals should follow `web-content/app/globals.css`: **flat design, no shadows, no gradients**, white/#F0E9FF surfaces, #873EFF primary, #6F22E6 strong purple, #18A554 green, #FE8218 orange, #12002B ink, #3F2A5C secondary text, #DED2F4 borders. Avoid neon, glassmorphism, 3D blobs, glow, and illegible pseudo-text. Use clean geometric people only where human context improves comprehension.

1. **Hero image (16:9):** flat WooCommerce storefront in the center connected to a recurring calendar, payment card/token, parcel, membership key, and customer portal. Clear negative space; no text inside the generated art.
2. **Four-system stack:** four horizontal cards—Billing, Access, Fulfillment, Self-service—flowing into one subscription record. Use simple human/customer silhouette at the endpoint.
3. **Product-model decision tree:** one-time versus charged again, predetermined end, billing versus delivery cadence. Prefer an authored SVG/HTML diagram for accurate labels.
4. **Product-model comparison illustration:** four equal panels for open-ended, fixed-term, prepaid, and lifetime using calendar/payment icons.
5. **Four-clocks swimlane:** billing, access, fulfillment, recovery lanes across signup → renewal → failure → end. Authored flow diagram rather than generated text.
6. **Renewal lifecycle flowchart:** product → checkout → parent order → subscription → scheduled action → renewal order → automatic/manual payment → success/failure.
7. **Automatic versus manual renewal split:** two human-centered paths; automatic uses saved method, manual returns customer to checkout.
8. **Gateway capability matrix:** compact HTML table with check/verify cells—not a generated screenshot and not a vendor ranking.
9. **Worked-example donut chart:** explicitly hypothetical $50 first charge = $40 first recurring period (80%) + $10 sign-up fee (20%). Caption: “Illustrative arithmetic, not a benchmark.”
10. **Worked-example bar chart:** six-month cash timing for the same hypothetical $240 term—monthly fixed-term bars of $40 each versus prepaid $240 at month 0 and $0 thereafter. Caption must say same total, different collection timing; exclude tax/refunds/fees.
11. **Billing-versus-fulfillment visual:** $240 collected once, then six monthly boxes; highlights why “prepaid” is not six monthly charges.
12. **Launch test path:** sandbox checkout → parent order → portal → forced renewal → failure test → monitoring, with a green proof artifact under each step.
13. **Operations dashboard illustration:** Scheduled Actions, gateway logs, failed renewals, and customer emails as flat cards; no invented performance numbers.
14. **Not-a-fit signpost:** a simple flat decision panel for non-Woo stores, unsupported automatic gateway, usage billing, or coming-soon requirements.

Screenshots should be current and original if the article names exact ArraySubs controls. Recommended captures after a real controlled test:

- simple product Subscription tab showing period/interval/length/trial/fee;
- variation-level subscription fields for monthly/annual;
- checkout disclosure for amount today and renewal schedule;
- subscription detail with next payment and linked orders;
- customer portal actions;
- Scheduled Actions entries before and after a forced renewal;
- renewal order totals and notes;
- sandbox gateway result and one failure/retry state, with all customer/payment data redacted.

## Risks, limitations, and editorial guardrails

- **UI drift:** Woo’s current product-creation documentation contains both plan-based purchase options and Simple/Variable Subscription terminology. Exact screens vary by extension version. Use conceptual steps unless showing a dated screenshot.
- **Engine-specific behavior:** WooCommerce Subscriptions docs are authoritative for Woo’s paid extension, not for every WooCommerce subscription plugin. Prefix claims with the product name where behavior is not universal.
- **Gateway drift:** feature coverage changes by exact extension, payment method, country, and version. Link to current gateway docs; do not freeze a broad “supported gateways” count.
- **Tax/legal risk:** no legal, tax, accounting, negative-option, or SCA advice. Require qualified review for jurisdiction-specific claims.
- **No invented data:** do not invent conversion lift, churn reduction, renewal success, install counts, ROI, or customer quotations. Charts must use disclosed hypothetical arithmetic.
- **Prepaid terminology:** full upfront payment is prepaid; N future charges are fixed-term recurring/installments. Preserve this distinction throughout.
- **Lifetime terminology:** lifetime is not recurring billing. Define whose/what lifetime and ongoing service limits in customer terms.
- **Staging safety:** a clone can duplicate scheduled work and charges unless the engine/gateway provides safeguards. Test and document the selected engine’s behavior.
- **Cron reliability:** Action Scheduler queues work but still needs a functioning runner; monitor overdue actions and use proper server cron where appropriate.
- **Cancellation semantics:** differentiate immediate cancellation, cancel at period end, expiration, and failed-payment termination.
- **Promotion boundary:** deliver the neutral answer before ArraySubs; disclose first-party commercial interest.
- **Authorship:** the publishing standard requires a named author and technical reviewer with relevant experience. Names and bios must be provided/confirmed by ArrayHash; do not invent credentials.

## Suggested metadata and freshness record

- Title: **How to Add Subscriptions to WooCommerce (2026 Guide)** (52 characters including spaces; verify in final metadata tooling).
- Focus keyword: **how to add subscriptions to WooCommerce**.
- Suggested meta description: **Learn how to add subscriptions to WooCommerce, choose a billing model and gateway, test renewals, and launch with a practical 2026 checklist.**
- Visible published date: publication date selected by editor.
- Last verified: **July 13, 2026** for this research pass; update to the actual final verification date after transaction testing.
- Test environment block must list WordPress, WooCommerce, ArraySubs, ArraySubs Pro, gateway extension versions, PHP, theme/checkout type, currency/country, and sandbox mode.
- Update log starter: “July 2026 — Initial publication; product-model terminology, gateway framework, ArraySubs 1.8.9/Pro 1.1.0 code, and official Woo/WordPress documentation verified.”
- Refresh trigger: relevant WordPress/WooCommerce/ArraySubs release; gateway capability change; checkout architecture change; tax/regulatory claim; or at least quarterly for gateway/product status.

## Primary evidence map for claim-side citations

| Claim area | Primary source |
|---|---|
| Install/activate WordPress plugins; compatibility and backup guidance | https://wordpress.org/documentation/article/manage-plugins/ |
| Subscription product configuration, period/interval, term, trial, fee, shipping/stock | https://woocommerce.com/document/subscriptions/creating-subscription-products/ |
| Subscription versus order; parent and renewal order relationships | https://woocommerce.com/document/subscriptions/orders/ |
| Automatic versus manual renewal behavior, tax/shipping/address differences | https://woocommerce.com/document/subscriptions/renewal-process/ |
| Lifecycle status meanings | https://woocommerce.com/document/subscriptions/statuses/ |
| Gateway compatibility/features and exact-extension caveats | https://woocommerce.com/document/subscriptions/payment-gateways/ |
| Enabling compatible gateways and automatic-recurring indicator | https://woocommerce.com/document/subscriptions/payment-gateways/enabling-payment-gateways-for-subscriptions/ |
| Gateway-controlled versus site-scheduled recurring architecture | https://woocommerce.com/document/subscriptions/develop/payment-gateway-integration/ |
| Scheduled events, Action Scheduler, WP-Cron, overdue jobs | https://woocommerce.com/document/subscriptions/develop/complete-guide-to-scheduled-events-with-subscriptions/ |
| Renewal test and troubleshooting evidence | https://woocommerce.com/document/subscriptions/testing-subscription-renewal-payments/ |
| Failed-payment retry behavior in Woo Subscriptions | https://woocommerce.com/document/subscriptions/failed-payment-retry/ |
| Staging and duplicate-payment protections in Woo Subscriptions | https://woocommerce.com/document/subscriptions/subscriptions-handles-staging-sites/ |
| Customer portal/actions | https://woocommerce.com/document/subscriptions/customers-view/ |
| Payment token and method-update behavior | https://woocommerce.com/document/subscriptions/customers-view/subscriber-payment-methods/ |
| Address updates | https://woocommerce.com/document/subscriptions/customers-view/update-address/ |
| Cancellation/suspension | https://woocommerce.com/document/subscriptions/customers-view/suspend-cancel-or-remove-an-item/ |
| Generic Woo test-order caveats | https://woocommerce.com/document/managing-orders/testing-orders/ |
| ArraySubs public current feature/tier/coming-soon statements | https://arrayhash.com/deals/arraysubs/ |

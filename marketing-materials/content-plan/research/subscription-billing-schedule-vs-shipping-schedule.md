# Research brief: Subscription Billing Schedule vs Shipping Schedule

## Research record

- **Article:** A024
- **Research date / last verified:** 2026-07-13
- **Focus keyword:** `subscription billing schedule vs shipping schedule`
- **Intent:** Help physical-subscription operators distinguish when money is collected from when goods are allocated, packed, and delivered.
- **Evidence scope:** ArraySubs Pro 1.1.0 Subscription Shipping source, current ArraySubs manual and screenshot, and official WooCommerce Subscriptions and Order Delivery documentation. No live warehouse, carrier, tax, or gateway test was run.
- **No invented benchmarks:** Volumes, costs, dates, and unit counts are illustrative formulas/scenarios only.
- **Product guardrail:** ArraySubs **Subscription Shipping is Pro**. It controls whether and how much shipping is charged on initial and renewal orders. It does not create an independent shipment schedule, multi-box cadence, or build-your-own-box workflow.

## Direct-answer conclusion

> A billing schedule decides when the customer is charged; a shipping schedule decides when goods are allocated and delivered. They can differ, but every extra shipment needs its own fulfillment record, inventory, address cutoff, shipping-cost recovery, tax review, and failed-payment rule. ArraySubs Pro configures renewal shipping charges, not an independent delivery cadence.

## Editorial thesis

One renewal order naturally creates one billing event and one fulfillment opportunity. If a business charges quarterly but ships monthly, software must model twelve fulfillment obligations from four payments. Hiding that difference inside a shipping-rate setting creates missed boxes, duplicate shipments, unrecovered postage, and confusing cancellation/refund outcomes.

## Key facts

- Billing, renewal-order generation, fulfillment, delivery, shipping charges, and address cutoffs are separate schedules/policies.
- A quarterly charge with monthly delivery requires more fulfillment records than renewal orders.
- ArraySubs Pro Subscription Shipping controls one-time versus recurring shipping charges and optional initial/renewal amounts.
- It does not generate independent deliveries, multiple boxes per payment, inventory reservations, or build-your-own boxes.
- Current renewal shipping relies on captured/override amounts; do not assume every renewal receives a new live carrier quote.
- Paid, failed, paused, skipped, canceled, and refunded states need explicit rules for already-funded versus future shipments.

## Definitions

| Schedule | Governs | Typical record | Failure if conflated |
| --- | --- | --- | --- |
| Billing schedule | When and how much money is due | Subscription renewal order/payment | Duplicate or missing charges |
| Renewal-order schedule | When a recurring order is generated | Renewal order/action | Treated as if it were every shipment |
| Fulfillment schedule | When inventory is reserved, picked, packed, or service delivered | Shipment/suborder/fulfillment record | Boxes have no authoritative state |
| Delivery schedule | Customer-promised arrival/collection date | Delivery window/date | Carrier and cutoff mismatch |
| Shipping-charge policy | Which orders collect shipping and how much | Shipping line on checkout/renewal | Postage under- or over-recovery |
| Address cutoff | Last point an address change affects a fulfillment | Effective-date rule | Parcel sent to stale address |

## Verified ArraySubs Pro behavior

### What the current feature does

Subscription Shipping applies only to physical/nonvirtual subscription products. Product settings support:

- **Recurring shipping:** collect shipping on the initial order and each renewal.
- **One-time shipping:** collect shipping on the initial order only; renewal orders omit shipping.
- **Initial shipping override:** optionally set a distinct initial shipping amount.
- **Renewal shipping override:** optionally set a distinct recurring shipping amount.

If no override is provided, checkout uses WooCommerce's shipping calculation. Current implementation captures shipping method/amount and builds renewal shipping from the stored renewal amount, with an initial-total fallback. The article should avoid promising that every renewal dynamically re-rates the live carrier quote unless a verified integration does so.

Customers can update a subscription shipping address. Current code uses the subscription address for future processing and supports an address cutoff; the default setting is three days before renewal. Address changes inside the cutoff need clear messaging about which fulfillment is affected.

### Plan-switch interaction

- An immediate plan switch recalculates shipping for the target product.
- A deferred switch uses the target product's shipping rules on the target renewal before the product switch is finalized.

This behavior still follows renewal-order cadence. It does not generate a monthly shipment schedule from a quarterly billing record.

### What the feature does not do

- create multiple delivery records per renewal;
- schedule fulfillment independently of billing;
- build or customize box contents;
- reserve stock for future boxes;
- create carrier labels or delivery windows;
- decide whether already-paid shipments continue after a failed later payment;
- provide a prepaid-shipment ledger.

Official WooCommerce Subscriptions documentation likewise recommends matching payment and shipping schedules for ordinary physical subscription products and states in its FAQ that a recurring billing schedule cannot natively differ from the recurring shipping schedule (for example, bill every three months and ship monthly). Official Woo Order Delivery documentation is an example of a separate delivery-scheduling layer for renewal orders; it should not be portrayed as part of ArraySubs.

## Schedule and cost formulas

Let:

- `B` = billing events per modeled year;
- `F` = fulfillment events per modeled year;
- `S_f` = shipping/packaging/handling cost per fulfillment;
- `S_b` = shipping charged per billing event;
- `U` = units per fulfillment;
- `N` = eligible active subscribers;
- `L` = fulfillments per subscriber within the inventory lead-time window;
- `Q` = merchant-defined safety stock.

```text
annual shipping charge collected = B × S_b
annual fulfillment shipping cost = F × S_f
shipping recovery gap = (B × S_b) − (F × S_f)

fulfillment records beyond renewal orders = max(0, F − B)

units required in lead-time window = (N × U × L) + Q
```

If billing every `m` months, a rough count is `12 ÷ m` events per year. Use actual schedule dates for production; calendar boundaries, skipped cycles, start dates, cancellations, and failed payments make the simple annual ratio incomplete.

## Worked model — not a benchmark

A merchant bills $90 every three months and promises one box per month. Packaging and postage cost $8 per box. Ignore product cost, tax, payment fees, refunds, skips, and partial years.

```text
billing events B = 4 per year
fulfillment events F = 12 per year
base renewal orders = 4
additional fulfillment records required = 12 − 4 = 8
annual shipping cost = 12 × $8 = $96
shipping charge needed per quarterly billing to recover that modeled cost = $96 ÷ 4 = $24
```

| Quarter | Customer payment | Boxes promised | Required fulfillment records |
| --- | ---: | ---: | ---: |
| Q1 | $90 + modeled $24 shipping allocation | 3 | 3 |
| Q2 | $90 + modeled $24 shipping allocation | 3 | 3 |
| Q3 | $90 + modeled $24 shipping allocation | 3 | 3 |
| Q4 | $90 + modeled $24 shipping allocation | 3 | 3 |

ArraySubs Pro can place a renewal shipping charge on the four renewal orders, but it does not create the eight non-renewal fulfillment records. The merchant needs a separate fulfillment/delivery architecture or should align billing and shipping.

## Architecture choices

### 1. Match payment and shipment cadence

One monthly renewal produces one monthly shipment. This is the simplest model for inventory, address changes, failed payments, refunds, and reporting.

### 2. Prepay several shipments, then create a fulfillment ledger

A quarterly payment funds three monthly obligations. On successful payment, create three dated fulfillment records and release each on its schedule. The ledger must support address cutoffs, skips, cancellation/refund allocation, substitutions, stock, and duplicate prevention.

### 3. Separate commercial and operations systems

The subscription platform records paid-through service; an operations system generates shipments. Reconcile subscription, paid period, fulfillment ID, promised date, actual shipment, tracking, and refund state. Idempotent integration is mandatory.

### 4. Use a delivery-date layer for one renewal/one shipment

An extension such as WooCommerce Order Delivery can attach delivery dates to renewal orders. This solves date selection/assignment for those orders; it does not by itself turn four renewal orders into twelve fulfillment obligations.

## Failure, pause, skip, and cancellation policy

The merchant must answer each of these before launch:

- If a quarterly payment fails, do all three future boxes pause?
- If the customer already paid for three boxes, does a later subscription status change stop unfulfilled paid boxes?
- Does “skip next renewal” skip one payment, one box, or every box funded by that payment?
- If a box is already picked or labeled, what is the cancellation cutoff?
- If an address changes after the first monthly box but before the next, which records update?
- How is a refund allocated across delivered, in-process, and future goods?
- How are damaged/replacement shipments distinguished from scheduled fulfillments?

There is no universal answer. Terms, refund policy, consumer law, tax, and accounting treatment require qualified review.

## Metrics without invented targets

```text
on-time fulfillment rate = fulfillments shipped by promised cutoff ÷ fulfillments due
shipping recovery = shipping charges collected ÷ shipping and packaging cost incurred
unlinked fulfillment rate = fulfillment records without a paid obligation ÷ fulfillment records
duplicate fulfillment rate = duplicated scheduled fulfillments ÷ fulfillments due
address-cutoff exception rate = shipments corrected after cutoff ÷ shipments due
inventory shortfall rate = fulfillments delayed for stock ÷ fulfillments due
```

Segment by product, warehouse, carrier, cadence, address-change timing, and payment state. Do not publish target values without first-party evidence.

## Limitations and unknowns

1. **No independent ArraySubs delivery cadence:** the central product-fit limitation.
2. **Stored versus live shipping rates:** current renewal logic uses captured/override values; live carrier changes and surcharges need explicit testing.
3. **Tax treatment:** shipping taxability, invoice/tax date, prepaid goods, and jurisdiction rules are not determined by these formulas.
4. **Plan switches:** quantity/product/cadence/shipping changes can affect future fulfillment records outside ArraySubs; no external ledger reconciliation was tested.
5. **Address cutoff:** default is three days before renewal, not necessarily before each independently scheduled shipment.
6. **Warehouse triggers:** order creation, payment, processing status, and shipping-line hooks can each trigger integrations; no representative stack was tested.
7. **One-time shipping semantics:** charging once does not mean future shipments cost nothing; the merchant may be embedding delivery cost in product price.
8. **International, zone, and weight changes:** a fixed renewal override can become economically inaccurate as destinations or contents change.

## Five FAQ answers

### 1. Are billing schedule and shipping schedule the same thing?

No. Billing says when money is due; shipping says when goods are fulfilled or delivered. Many subscription systems make them appear identical because one renewal order creates one shipment opportunity, but a prepaid or multi-delivery offer needs a separate fulfillment model.

### 2. Can ArraySubs bill quarterly and ship monthly automatically?

ArraySubs Pro can configure shipping charges on initial and renewal orders, but its Subscription Shipping feature does not generate an independent monthly delivery schedule from a quarterly renewal. That offer needs separate fulfillment records/integration or matched billing and shipping cadences.

### 3. What is recurring versus one-time shipping in ArraySubs Pro?

Recurring shipping adds shipping to the initial order and renewal orders. One-time shipping charges it on the initial order only. Both options concern the shipping **charge** on subscription orders; neither creates extra shipments between renewals.

### 4. What happens to shipments after a failed renewal?

For one-payment/one-shipment models, merchants often hold fulfillment until payment succeeds. For prepaid multi-shipment models, some future boxes may already be funded. The store needs a documented paid-obligation ledger and policy; status alone is not enough to decide every shipment.

### 5. How should a merchant price shipping when it bills less often than it ships?

Model all fulfillment costs, then allocate them across billing events. If twelve boxes cost $8 each and four payments collect shipping, $24 per payment recovers the modeled $96 before taxes, rate changes, damage, reshipments, handling, and overhead. Use the merchant's actual costs.

## Visual ideas

1. **Two-track timeline:** four quarterly payment circles above twelve monthly box icons, linked to show three boxes per payment.
2. **Flat flowchart:** paid renewal → create fulfillment obligations → address cutoff → reserve stock → pack → ship → reconcile.
3. **Bar chart:** payment events (4) versus fulfillment events (12) for the illustrative model; label “example, not benchmark.”
4. **Pie chart:** illustrative annual shipping cost allocation across four quarterly bills—four equal $24 slices; clearly a math example.
5. **Operations table graphic:** billing, fulfillment, delivery, address cutoff, responsible system.
6. **Human/warehouse illustration:** operator reconciling calendar, boxes, and paid order; muted blue, rust, cream, and green, no gradients.
7. **Inventory formula card:** active subscribers × units × fulfillments in lead time + safety stock.

## Internal-link suggestions

- Primary CTA: `/deals/arraysubs/pricing/`
- Subscription Shipping on the feature hub: `/deals/arraysubs/features/#products-checkout`
- Recurring shipping box recipe: `/deals/arraysubs/use-cases/recipes/recurring-shipping-box/`
- One-time welcome-kit shipping recipe: `/deals/arraysubs/use-cases/recipes/one-time-shipping-welcome-kit/`
- Customer shipping-address recipe: `/deals/arraysubs/use-cases/recipes/member-update-shipping/`
- Early-renew strategy: `/billing-strategy/early-subscription-renewals-benefits-risks-and-guardrails/`
- Cancellation comparison: `/billing-strategy/immediate-cancellation-vs-cancel-at-period-end/`

Verify every route exists before publication; if recipe slugs differ in the app data, use the canonical generated URL. Keep setup details in recipes.

## Primary and first-party sources

All sources accessed 2026-07-13.

- ArraySubs manual, Subscription Shipping: `../../user-manual/markdowns/subscription-shipping/README.md`
- ArraySubs annotated product-shipping screenshot: `../../user-manual/markdowns/subscription-shipping/README.ASSETS/01-product-shipping-settings-annotated.png`
- ArraySubs Pro shipping calculator: `../../arraysubspro/src/Features/SubscriptionShipping/Services/ShippingCalculator.php`
- ArraySubs Pro shipping hooks: `../../arraysubspro/src/Features/SubscriptionShipping/Services/Hooks.php`
- ArraySubs Pro address manager: `../../arraysubspro/src/Features/SubscriptionShipping/Services/AddressManager.php`
- WooCommerce, Creating a Subscription Product: https://woocommerce.com/document/subscriptions/creating-subscription-products/
- WooCommerce, Subscriptions FAQ: https://woocommerce.com/document/subscriptions/faq/
- WooCommerce, Order Delivery for Subscriptions: https://woocommerce.com/document/woocommerce-order-delivery/subscriptions/
- WooCommerce, Schedule Delivery Dates for Renewal Orders: https://woocommerce.com/document/schedule-delivery-dates-for-woocommerce-subscriptions-renewal-orders/

## Drafting cautions

- State Pro ownership and the feature boundary early.
- Never call shipping-charge settings a delivery scheduler or box builder.
- Separate billing, renewal-order, fulfillment, delivery, and address-cutoff dates in examples.
- Treat tax/refund/accounting outcomes as jurisdiction- and policy-dependent.
- Name only real authors/reviewers and cite official product sources near claims.

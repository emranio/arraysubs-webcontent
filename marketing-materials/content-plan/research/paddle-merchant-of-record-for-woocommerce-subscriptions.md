# A060 research pack — Paddle Merchant of Record for WooCommerce Subscriptions

**Research date:** 2026-07-20  
**Article brief:** `web-content/marketing-materials/content-plan/articles/060-paddle-merchant-of-record-for-woocommerce-subscriptions.md`  
**Focus keyword:** `Paddle Merchant of Record WooCommerce`  
**Recommended URL:** `/deals/arraysubs/resources/payments-and-compliance/paddle-merchant-of-record-for-woocommerce-subscriptions/`  
**Evidence standard:** Paddle primary documentation and legal terms, WooCommerce documentation for ecosystem context, and first-party inspection of the installed ArraySubs/ArraySubs Pro/WooCommerce code. Code observations are not a substitute for live Paddle sandbox verification.

## Executive answer for the writer

Paddle can be the Merchant of Record for an eligible software or digital-product subscription sold from a WooCommerce storefront. In that arrangement, Paddle is the reseller to the buyer and takes responsibility for the buyer-facing transaction, collection and remittance of applicable sales tax/VAT, compliant transaction documents, payment processing, and much of the refund and chargeback administration. It does **not** make the software supplier responsibility-free. The supplier still owns product legality and eligibility, accurate product and tax-category information, fulfillment, technical support, marketing promises, privacy and data obligations, intellectual property, corporate accounting and income-tax duties, and the economic effect of refunds, chargebacks, reserves, fees, and payout adjustments under the Paddle agreement.

The current ArraySubs Pro integration is a provider-managed billing architecture, not merely a saved-card WooCommerce renewal adapter. It syncs a Woo product into Paddle Product and Price records, creates a Paddle transaction for checkout, opens Paddle.js, lets Paddle create and schedule the remote subscription, waits for signed Paddle webhooks to settle Woo orders, and uses Paddle APIs for cancellation, pause/resume, portal access, and adjustments. ArraySubs remains the local subscription, customer-portal, order, audit, and operations layer; Paddle owns the remote recurring schedule and money movement.

That architecture is promising for eligible global digital offers, but the installed implementation has material gaps that must be stated and tested before launch:

1. Paddle product sync reads the wrong ArraySubs metadata keys for billing interval and free trial. Current non-1 intervals can become interval 1, and free trials can be omitted from the remote Paddle Price.
2. Checkout reuses any stored Paddle Price ID without comparing Woo price, cycle, trial, currency, or tax configuration. Woo changes can leave a stale remote price indefinitely.
3. Signup fees, shipping, Woo fees, and Woo tax totals are not represented in the Paddle transaction item builder. The current integration should not be marketed as supporting those amounts without verified implementation changes.
4. The gateway advertises mixed carts and multiple same-cycle subscriptions, while correctly rejecting different recurring cycles. Those combinations still need exact cart and settlement tests.
5. Renewal collection is Paddle-scheduled. ArraySubs creates or finds a Woo renewal order when a `transaction.completed` webhook arrives, including a webhook-first fallback if Paddle charges before the local renewal job. This needs duplicate, out-of-order, and concurrency testing.
6. The webhook event table has a unique gateway/event key, but the router checks for a duplicate before side effects and records success afterward. Concurrent copies can both pass the initial check. Paddle explicitly documents at-least-once and out-of-order delivery, and the current code does not use `occurred_at` to reject stale state changes.
7. Current refund request construction is not aligned with Paddle's Adjustment API. Full refunds omit the required `type: full`; partial refunds use a transaction ID where Paddle requires a transaction-item ID. Live refunds can also remain pending approval, while the method reports local success after creation and does not handle `adjustment.updated`.
8. Payment-method updates open a general Paddle customer portal rather than a subscription-specific deep link. Current webhook coverage does not include Paddle's payment-method saved/deleted events, and display metadata may remain stale.
9. Paddle handles the dispute workflow as Merchant of Record, but the supplier can still bear the economic chargeback/refund/fee impact. The current ArraySubs event map does not surface Paddle chargeback actions into a dedicated local dispute workflow.
10. Payout reconciliation is outside the current adapter. One initial payout amount may be stored from a transaction, but renewal-level payout details, Paddle reports, fees, taxes, reserves, FX, adjustments, and bank deposits are not reconciled by ArraySubs.

The article should therefore explain both the **responsibility transfer** and the **control-plane transfer**. Merchant of Record is not a synonym for “tax plugin,” and successful checkout is not proof that the entire recurring lifecycle is production-ready.

## Source hierarchy and update policy

Use sources in this order:

1. Paddle's current Master Services Agreement, Buyer Terms, Acceptable Use/eligibility guidance, refund policy, privacy/GDPR material, and developer documentation.
2. Current installed ArraySubs, ArraySubs Pro, and WooCommerce code for statements about the shipped adapter.
3. WooCommerce subscription-gateway documentation only for general ecosystem distinctions such as automatic versus manual renewal. Do not imply the inspected product is WooCommerce Subscriptions.
4. Secondary commentary only when a primary source does not answer the question, and label the inference.

Legal terms, eligibility lists, pricing, payout schedules, tax treatment, supported countries, API versions, and product capabilities can change. Recheck the linked live pages at publication and on material article updates. The article must say it is general operational information, not legal, tax, accounting, privacy, or financial advice.

## Verified installed versions and scope

The code observations in this pack are tied to this workspace snapshot:

| Component | Installed/header evidence | Scope note |
|---|---|---|
| ArraySubs | `arraysubs/arraysubs.php:12-20` — version 1.8.11; WordPress tested through 7.0; PHP 8.1+; WooCommerce minimum 8.0, tested through 10 | Local subscription engine and shared lifecycle |
| ArraySubs Pro | `arraysubspro/arraysubspro.php:13-19` — version 1.1.2; WordPress tested through 7.0; PHP 8.1+ | Paddle automatic-payment adapter is Pro-only |
| WooCommerce | `woocommerce/woocommerce.php:6` — version 10.9.4 | Installed order/cart/payment environment |
| Paddle API | `PaddleApiClient.php` calls Paddle Billing API v1 endpoints | The client does not pin a `Paddle-Version` request header |

Treat every capability statement below as “observed in this version,” not a permanent guarantee.

## Merchant of Record: exact meaning and the responsibility boundary

### What Paddle takes on

Paddle's agreement describes Paddle as a nonexclusive reseller. In the buyer transaction, Paddle is the seller/Merchant of Record. Subject to the agreement and correct supplier information, the operational transfer includes:

- payment collection from the buyer;
- calculating, collecting, filing, and remitting applicable sales tax, VAT, GST, and similar transaction taxes on the Paddle-to-buyer sale;
- providing buyer-facing transaction documents/receipts/invoices for that sale;
- payment-method and checkout operations provided through Paddle;
- buyer order support and much of the operational refund/chargeback process;
- remitting the supplier's net balance through Paddle payouts after taxes, fees, refunds, chargebacks, FX and other adjustments;
- handling local buyer-facing payment/commercial requirements that form part of Paddle's reseller service.

Primary legal source: https://www.paddle.com/legal/terms  
Buyer relationship: https://www.paddle.com/legal/buyer-terms  
Tax overview: https://www.paddle.com/help/start/intro-to-paddle/how-paddle-is-able-to-take-on-your-vat-and-tax-responsibilities and https://www.paddle.com/help/sell/tax/how-paddle-handles-vat-on-your-behalf

### What remains with the software supplier

The supplier still owns or materially participates in:

- verifying that the product and business are eligible for Paddle;
- providing accurate product descriptions, tax categories, pricing, website URLs, business and ownership information;
- lawful marketing, price disclosures, trial terms, renewal terms, cancellation promises and refund representations;
- product quality, availability, access provisioning, downloads, licenses, service delivery, uptime promises and technical support;
- intellectual-property ownership/licensing and non-infringement;
- its own privacy notice, lawful data handling, security, processor/controller analysis, retention and data-subject response duties;
- business registrations, corporate income tax, employment tax, payroll, accounting books, revenue recognition and any supplier-side tax triggered by the Paddle relationship or payout;
- keeping WooCommerce, ArraySubs and Paddle records synchronized;
- investigating fulfillment and access after a payment, refund, pause, cancellation or chargeback;
- monitoring payout statements and reconciling Paddle's balance movements to the bank and accounting ledger;
- funding or economically bearing refunds, chargebacks, fees, reserves, setoffs or negative balances where the agreement assigns them to the supplier;
- customer support that Paddle does not perform, especially product, entitlement, usage and technical support.

Paddle's MSA also requires the supplier to provide accurate product/tax information and makes the supplier responsible for consequences of inaccurate information. It does not turn Paddle into the software publisher, licensor, fulfillment provider, privacy officer, or accountant.

### A usable responsibility matrix

| Workstream | Paddle as MoR | Supplier/ArraySubs/Woo | Article language |
|---|---|---|---|
| Buyer-facing seller | Paddle is reseller/MoR for the covered transaction | Supplier provides the underlying product/service to Paddle for resale | “Paddle is the seller of record to the buyer for the covered sale” |
| Checkout/payment collection | Paddle Checkout and processors collect the payment | Site must create the correct transaction and preserve order state | “Paddle operates collection; the integration must still reconcile Woo” |
| Sales tax/VAT/GST | Calculates, collects and remits for the Paddle-to-buyer transaction, based on correct inputs | Supplier must classify the product and provide accurate facts; handles its own business taxes | “MoR transfers transaction-tax operations, not every tax obligation” |
| Buyer transaction document | Paddle issues the Paddle sale document | Woo order/invoice records are internal commerce/accounting records and must not contradict seller identity | “Do not issue a second merchant invoice for the same Paddle sale without advice” |
| Fulfillment/access | Not the software delivery engine | Supplier/ArraySubs grants, suspends and revokes access correctly | “Payment state must drive, but cannot replace, entitlement logic” |
| Product support | Limited buyer/order support | Supplier provides technical/product support | “MoR does not outsource product support” |
| Refund administration | Paddle processes/refers refunds under its policy and APIs | Supplier must follow policy, update local records/access, and may bear economic cost | “Operational administration and economic impact are different questions” |
| Chargebacks | Paddle interfaces with the payment ecosystem and buyer dispute | Supplier supplies evidence, manages access/fraud, and may bear chargeback/fee impact | Never say “Paddle absorbs all chargebacks” |
| Data/privacy | Paddle handles its buyer/checkout data under its notices and agreements | Supplier remains responsible for its own WordPress/Woo data and integrations | “There are multiple data controllers/processors, not no privacy work” |
| Payout | Paddle pays net eligible balance | Supplier reconciles statements/reverse invoices/remittance and bank deposit | “Payout is a net settlement, not gross Woo sales” |
| Corporate accounting/tax | Provides settlement documents | Supplier books revenue/fees/taxes/FX/refunds correctly and seeks advice | Never say “Paddle handles all accounting/tax” |

### Claims the article must avoid

- “Paddle makes you compliant worldwide.”
- “Paddle handles all taxes.”
- “Paddle removes all legal obligations.”
- “Paddle absorbs all refunds and chargebacks.”
- “You never need an accountant.”
- “The Woo order is the buyer's tax invoice.”
- “Paddle is only a payment gateway.”
- “A Merchant of Record is automatically right for every WooCommerce store.”
- “Paddle supports anything WooCommerce can sell.”
- “The supplier never interacts with customer data.”

## Eligibility and business-model fit

Paddle is designed for software and eligible digital products, including many B2B SaaS, consumer software, digital applications and game businesses. It is not a general-purpose Merchant of Record for every WooCommerce catalog.

Paddle's current “not allowed to sell” guidance excludes or restricts categories including physical goods/physical delivery, pure human services, certain marketplaces, regulated or high-risk categories, and other products listed by its Acceptable Use/approval rules. Some businesses require enhanced diligence rather than receiving automatic approval.

Primary source: https://www.paddle.com/help/start/intro-to-paddle/what-am-i-not-allowed-to-sell-on-paddle  
Contract definition/eligibility: https://www.paddle.com/legal/terms

### Good potential fit

- SaaS sold on a recurring plan;
- WordPress plugins/themes or other downloadable software with recurring access/support;
- software licenses and digital entitlements;
- an eligible digital subscription where global transaction-tax administration is a major operational burden;
- stores comfortable with Paddle controlling the buyer-facing payment and remote subscription schedule.

### Poor or unverified fit

- physical subscription boxes and products requiring physical delivery;
- mixed digital/physical catalogs that cannot route eligible and ineligible items cleanly;
- consulting retainers or primarily human-delivered services;
- donation, crowdfunding, marketplace, financial, medical, adult, gambling, weapons, crypto or other restricted/high-risk categories without explicit Paddle approval;
- a store that requires the Woo merchant name to be the buyer-facing seller/invoice issuer;
- complex usage billing, metering, negotiated invoicing, localized payment-method promises or tax treatment that the current adapter has not implemented;
- merchants that require WooCommerce to own the authoritative recurring schedule and independently initiate every renewal charge.

### Approval and go-live checks

Before enabling live mode, verify:

- the legal entity and owners are approved;
- every sold product/category is approved and correctly described;
- the production website and checkout domain meet Paddle review requirements;
- required legal, privacy, refund, cancellation and product-support pages are live;
- Paddle is correctly disclosed as the reseller/Merchant of Record where required;
- live API keys and client-side tokens match the live environment;
- sandbox credentials do not leak into production and vice versa;
- the default payment-link/approved checkout domain settings are correct;
- the webhook destination is public HTTPS, reachable, signed and subscribed to the exact required events;
- API-key permissions cover products, prices, transactions, subscriptions, adjustments and customer portal sessions, with no unnecessary scopes;
- the product tax category is reviewed rather than silently assumed to be “standard.”

Official go-live overview: https://developer.paddle.com/build/go-live-checklist/

## Exact current ArraySubs–WooCommerce–Paddle architecture

### Control-plane diagram

```text
Woo product/variation
    │
    ├─ ArraySubs subscription metadata
    │    cycle, interval, trial, signup fee, product mode
    │
    └─ PaddleProductSync
         ├─ Paddle Product (pro_...)
         └─ Paddle Price   (pri_...)

Woo checkout/order
    │
    ├─ PaddleGateway creates draft Paddle Transaction (txn_...)
    │      items + custom_data(order_id, site_url, subscription_id)
    ├─ Paddle.js/Paddle Checkout overlay collects customer/payment/address
    └─ transaction.completed webhook
           ├─ marks initial Woo order paid
           ├─ maps Paddle Subscription (sub_...)
           ├─ maps Paddle Customer (ctm_...)
           └─ stores payment display/payout metadata

Renewal time
    │
    ├─ Paddle owns remote schedule and automatically creates/collects transaction
    ├─ ArraySubs local scheduler may precreate pending Woo renewal order
    └─ transaction.completed webhook
           ├─ finds pending renewal order, or
           ├─ creates a retroactive Woo renewal order if webhook arrived first
           └─ marks it paid and updates the next-billed date
```

### Object map and ownership

| Local/remote object | ID shape/meta | Owner of truth | Observed role |
|---|---|---|---|
| Woo product or variation | integer post ID | Woo/ArraySubs for offer definition | Source for Paddle catalog sync |
| Paddle Product | `pro_...`; `_arraysubs_gateway_paddle_product_id` | Paddle catalog | Name, description, tax category |
| Paddle Price | `pri_...`; `_arraysubs_gateway_paddle_price_id` | Paddle catalog/checkout | Unit price, currency, recurring cycle, optional trial |
| Woo initial order | Woo order ID; `_paddle_transaction_id` | Woo for local order/fulfillment | Pending until webhook confirms transaction |
| Paddle Transaction | `txn_...` | Paddle for money movement/tax | Checkout and each renewal charge |
| ArraySubs subscription | WordPress post/data ID | ArraySubs for local lifecycle/UI/order association | Local status, schedule context, gateway IDs, access hooks |
| Paddle Subscription | `sub_...`; `_gateway_paddle_subscription_id` | Paddle for recurring billing schedule | Items, status, next billing, scheduled change |
| Paddle Customer | `ctm_...`; `_gateway_customer_id` | Paddle for checkout/portal customer | Used to create customer portal session |
| Payment context | `_gateway_payment_method_id` currently receives Paddle subscription ID plus brand/last4 fields | Paddle for actual payment method; local display cache | Not a portable Woo payment token |
| Payout detail | `_gateway_paddle_payout_amount` | Paddle balance/reporting | Current code stores limited transaction payout data only |

### Initial classic checkout flow

1. Woo creates the order using the ArraySubs Paddle gateway ID `arraysubs_paddle`.
2. `PaddleGateway::process_payment()` builds checkout items.
3. For subscription products, `PaddleProductSync::syncProduct()` supplies a Paddle Price ID. For a previously synced product, the checkout path can reuse the stored ID without refreshing it.
4. `PaddleGateway` sends `POST /transactions` with the items and `custom_data` containing Woo/ArraySubs identifiers.
5. The transaction is draft because no customer/address is supplied server-side; Paddle Checkout collects the missing buyer and payment information.
6. `paddleCheckout.js` opens Paddle.js v2 using the transaction ID.
7. Checkout completion sends the browser toward Woo's order-received page, but the Woo order remains pending until the signed Paddle event arrives.
8. `transaction.completed` marks payment complete, saves remote context and maps the Paddle subscription/customer.

Important consequence: browser success is not authoritative settlement. The public webhook endpoint is part of checkout correctness, not an optional analytics feed.

First-party evidence:

- `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleGateway.php` — constructor, `process_payment()`, checkout item/transaction builders and `handlePaymentSucceeded()`.
- `arraysubspro/src/resources/paddleCheckout.js` — classic checkout Paddle.js overlay and completion/close behavior.
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleApiClient.php` — `/transactions` request.

### Checkout Blocks flow

The adapter separately registers a WooCommerce Blocks payment method through `PaddleBlocksPaymentMethod`, passes Store API payment context into the gateway, returns serialized `paddle_data`, and opens the same transaction-ID Paddle Checkout in `paddleCheckoutBlocks.js` after Woo reports checkout success.

This is not proof of complete feature parity. Blocks tests must cover:

- gateway visibility for each cart shape;
- buyer data, validation, terms and privacy copy;
- success redirect;
- checkout close and browser back behavior;
- Paddle error before/after Woo order creation;
- duplicate submit protection;
- pending-order messaging while a webhook is delayed;
- taxes/coupons/fees and exact settled total;
- mixed cart and variation items;
- express/accelerated methods if offered by Paddle;
- restoration/retry of a pending order.

First-party evidence:

- `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleBlocksPaymentMethod.php`.
- `arraysubspro/src/resources/paddleCheckoutBlocks.js`.

### Customer creation behavior

The current transaction-ID checkout does not send a precreated Paddle Customer, address or billing details. Paddle Checkout collects them. The API client contains customer helper logic, but the observed checkout path does not use it. Therefore:

- the article should not claim Woo customer/address records are pre-synchronized to Paddle;
- buyer identity and address differences need reconciliation tests;
- guest checkout and repeat checkout can create/match Paddle customers according to Paddle behavior, not a proven ArraySubs customer-deduplication rule;
- a stored `ctm_...` ID is Paddle-specific and not a Woo payment token.

## Product and price synchronization

### What the code intends to do

`PaddleProductSync::syncProduct()` creates or updates a Paddle Product and creates a Paddle Price. When explicitly refreshing an already synced product, it archives the old price after creating a replacement. Product IDs and Price IDs are saved as Woo product metadata.

The remote Product is currently created with `tax_category: standard`. The Price uses Woo price, store currency, billing cycle and trial information as read by the sync class.

Official concepts:

- Products: https://developer.paddle.com/api-reference/products/
- Prices: https://developer.paddle.com/api-reference/prices/
- Create products/prices: https://developer.paddle.com/build/products/create-products-prices/
- Create price: https://developer.paddle.com/api-reference/prices/create-price/

### Critical interval and trial metadata mismatch

The current sync reads:

- `_subscription_period_interval`
- `_subscription_trial_length`
- `_subscription_trial_period`

But ArraySubs core stores and reads:

- `_subscription_interval`
- `_trial_length`
- `_trial_period`

Evidence:

- `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleProductSync.php:187-214` — mismatched keys.
- `arraysubs/src/functions/product-helpers.php:100,116-117` — canonical core keys.
- `arraysubs/src/Features/SubscriptionProducts/Services/Hooks.php:459-462,574-577` — product/variation save keys.

Expected current effects:

- a plan configured “every 2 months” can sync as “every 1 month” because interval falls back to 1;
- a configured free trial can be absent from the Paddle Price because trial length reads as zero;
- the local checkout/order presentation can disagree with the Paddle Checkout and remote renewal schedule;
- the adapter advertises `trials: true`, but shipped metadata wiring does not prove that a configured ArraySubs trial reaches Paddle.

This is a launch blocker for non-1 intervals and trials until fixed and verified. The article must not claim those configurations work in the current build.

### Stale-price behavior

The checkout path returns a stored Paddle Price ID if one exists. It does not compare a version, hash, last-updated time, current amount, currency, period, interval, trial, tax category, or archived/active state before reuse.

The sync class can create and archive prices when invoked, but first-party inspection did not identify a product-save hook that automatically invokes Paddle sync after each relevant ArraySubs product change. Consequently:

- a Woo price edit can leave future checkouts using the old Paddle price;
- changing monthly to yearly can leave the old remote interval;
- adding/removing a trial can leave old checkout behavior;
- changing currency or a variation's configuration can leave an invalid remote reference;
- deleting/archiving a Paddle price in the dashboard can break checkout;
- creating a replacement Price does not automatically migrate existing Paddle Subscriptions to the new Price.

Safe article language: “ArraySubs Pro uses Paddle catalog objects; treat product changes and existing subscription migrations as controlled billing operations, not ordinary Woo price edits.”

Required remediation/test direction:

1. Store a deterministic sync fingerprint containing product/variation ID, amount, currency, billing interval, trial, tax category and other billing inputs.
2. Compare it before checkout and on product save.
3. Lock sync to avoid duplicate Products/Prices during concurrent checkouts.
4. Decide whether a change affects new sales only or migrates existing remote subscriptions.
5. Use Paddle's subscription item-update API and explicit proration mode for migrations.
6. Preserve an auditable old-price-to-new-price mapping.
7. Test retry behavior if replacement creation succeeds but local metadata save or old-price archive fails.

### Existing subscriptions do not follow a Woo price edit

A Paddle Subscription owns its remote item Price IDs. Creating a new Price for new checkout does not modify old subscriptions. Paddle's update-subscription API requires the complete desired items list and a `proration_billing_mode` when replacing products/prices.

Primary sources:

- https://developer.paddle.com/build/subscriptions/add-remove-products-prices-addons/
- https://developer.paddle.com/build/subscriptions/replace-products-prices-upgrade-downgrade/
- https://developer.paddle.com/concepts/subscriptions/proration/

The current plan-switch integration captures/retains payment context but first-party inspection did not find a Paddle `updateSubscription()` call that replaces remote items during an ArraySubs plan switch. A local plan/amount change can therefore diverge from Paddle's next charge. The capability `retention_amount_update` is explicitly false.

Do not claim automatic upgrades, downgrades, proration or retention discounts for Paddle without a verified remote-subscription change flow.

### Product tax category

The integration hardcodes `tax_category: standard` in observed product-creation paths (`PaddleProductSync.php:83`; another helper in `PaddleGateway.php:2240`). Paddle Product tax category influences transaction tax treatment. “Standard” is not a safe universal classification for SaaS, downloads, games, ebooks or mixed digital services.

Required operational control:

- expose or derive the Paddle tax category;
- make the choice per eligible product/variation where needed;
- obtain tax/legal review for ambiguous products;
- store the category and change history;
- confirm Paddle Checkout's tax outcome in representative buyer locations;
- never claim MoR accuracy if the supplier feeds the wrong product facts.

### Price, coupon, fee, tax and currency parity

For a recurring item, checkout sends the Paddle catalog Price ID and quantity. It does not send the Woo order line total as an override. For a one-time product in a mixed cart, the code can create/cache a one-time Paddle Price based on the order line amount and currency. This split creates important questions:

- Woo coupons applied to a recurring product may reduce the Woo order but not the remote recurring Price unless modeled in Paddle;
- Woo tax may be calculated locally while Paddle calculates buyer tax independently;
- the Paddle total can differ from the Woo order total, yet the webhook can still mark the Woo order paid;
- order currency and store currency can differ under a multicurrency plugin, while synced recurring Price uses store currency;
- Woo fees and shipping are not separate Paddle transaction items in the observed builder;
- rounding and zero-decimal currency behavior must be compared, not assumed;
- a “first payment” different from recurring price is not modeled merely by syncing one recurring Price.

The launch test must compare all of these values: Woo order line subtotal, discounts, fees, shipping, local tax, Woo total, Paddle transaction subtotal/discount/tax/total, Paddle payout balance movement, and bank settlement.

### Signup fees and one-time charges

ArraySubs core stores signup fee as `_signup_fee`, but the Paddle sync/transaction path does not model it as a Paddle one-time subscription charge or separate transaction item. Paddle itself supports one-time charges attached to subscriptions, but the current adapter does not use that API for setup fees.

Primary Paddle sources:

- https://developer.paddle.com/build/subscriptions/bill-add-one-time-charge/
- https://developer.paddle.com/api-reference/subscriptions/create-subscription-charge/

Do not say “Paddle supports ArraySubs signup fees” based only on Paddle platform capability. Current adapter support is unverified/absent.

### Fixed term, customer-chosen duration and different renewal amount

First-party inspection did not find Paddle catalog/request fields for ArraySubs subscription length/fixed-term configuration, customer-chosen interval/length, or a different later renewal amount. The site-wide `CartRestrictions` class blocks per-item customer-defined/flexible billing cycles for a gateway requiring product sync unless a developer filter overrides it.

Risks:

- a local fixed-term subscription may stop locally while Paddle continues billing unless an exact remote cancellation is scheduled;
- a customer-chosen cycle cannot be represented by a static cached Paddle Price without controlled Price generation;
- a first amount different from renewal amount requires a trial, discount or one-time charge architecture that is not currently implemented;
- changing quantity/items during trial has Paddle-specific restrictions.

Paddle documents that trialing subscriptions restrict item changes, and some quantity changes require `do_not_bill`: https://developer.paddle.com/errors/subscriptions/subscription_trialing_items_update_invalid_options/

## Cart compatibility and gateway selection constraints

`PaddleGateway` advertises:

| Capability | Current flag | Practical interpretation |
|---|---:|---|
| Automatic payments | true | Paddle, not ArraySubs, schedules remote renewal transactions |
| Trials | true | Platform supports them, but current metadata mismatch is a blocker |
| Pause/resume | true | API calls exist; effective timing/state needs tests |
| Cancel at period end | true | Scheduled Paddle cancellation is used |
| Undo period-end cancellation | true | Clears remote scheduled change; race/scoping needs tests |
| Product sync | true | Creates Paddle Product/Price; stale sync is a material gap |
| Payment-method update | true | Opens Paddle customer portal; local display sync is incomplete |
| Card auto-update | true | Paddle can manage underlying method; local cached display may be stale |
| Refunds | true | Capability flag exists, but request bugs and async approval make current flow unsafe |
| Hosted payment page/customer portal | true | Paddle Checkout overlay and portal session |
| Mixed cart | true | Recurring plus one-time items intended; fees/shipping/tax parity remains unverified |
| Multiple subscriptions | true | Intended only when recurring cycles are compatible |
| Different billing cycles | false | Cart restrictions should reject mixed recurring intervals |
| Retention amount update | false | Do not promise retention discounts/amount changes |
| Disputes | false | Paddle handles dispute channel; no complete local dispute surface |
| SCA | false | Does not mean SCA is absent; Paddle owns checkout/authentication behavior |

Paddle requires recurring items in a transaction/subscription to share a billing interval. ArraySubs Pro's `CartRestrictions` applies the most restrictive enabled automatic gateway to cart compatibility, so enabling Paddle can influence gateway/cart eligibility even when other gateways are enabled.

Required cart matrix:

| Cart | Expected current policy | Must verify |
|---|---|---|
| One monthly subscription | Allowed | remote Price interval/amount/tax match |
| Two monthly subscriptions | Intended allowed | one vs multiple Paddle subscriptions; quantity/items; local subscription mapping |
| Monthly + yearly subscription | Rejected for Paddle | gateway visibility and human-readable explanation in classic/Blocks |
| Subscription + one-time digital item | Intended allowed | one-time Price, tax category, total, fulfillment and refund allocation |
| Subscription + physical/shippable item | Technically mixed-cart flag may allow, but business may be Paddle-ineligible | must be blocked unless Paddle expressly approves product/delivery model |
| Subscription + signup fee | Woo can show fee; Paddle request omits it | treat unsupported until fixed |
| Free trial requiring method | Intended through recurring Price trial | currently broken by metadata mismatch |
| Fixed-term plan | Local feature can exist | verify remote cancellation at exact final period; no current proof |
| Customer-selected cycle | Cart restriction should block for product-sync gateway | verify UX and bypass filters |
| Variable subscription | Product/variation sync intended | every variation must have isolated current Paddle IDs/fingerprint |
| Coupon-discounted first order | Woo discount can diverge | verify Paddle-discount modeling; current builder shows none |
| Multicurrency checkout | High risk | Price currency vs Woo order currency; gateway visibility |

## Renewal ownership and order reconciliation

### Paddle owns the charge schedule

For Paddle, `PaddleGateway::processRenewalPayment()` returns a success/waiting posture rather than creating a charge. Paddle has already scheduled the remote Subscription and creates renewal Transactions itself. The local ArraySubs scheduler still creates a pending Woo renewal order around the expected due date so local fulfillment, emails, history and reporting have an order record.

Paddle's subscription/transaction concepts:

- https://developer.paddle.com/api-reference/subscriptions/
- https://developer.paddle.com/api-reference/transactions/
- https://developer.paddle.com/build/transactions/create-transaction/

### Order-first normal path

1. ArraySubs local scheduler creates a pending renewal order.
2. Paddle reaches `next_billed_at`, creates and collects a transaction.
3. Paddle sends `transaction.completed`.
4. ArraySubs resolves the local subscription and finds the pending renewal order.
5. It stores the Paddle transaction ID and marks the Woo order paid.
6. Local next-billed data is updated from Paddle context.

### Webhook-first fallback path

If Paddle charges before the local scheduler creates the order, `handlePaymentSucceeded()` can create a retroactive Woo renewal order and mark it paid. This is an important resilience behavior, but the observed fallback sets an order total from Paddle transaction totals and does not build the full expected product line-item/tax/fee breakdown.

Risks:

- inventory and fulfillment hooks can lack ordinary line-item detail;
- tax reports and product revenue reports can differ from Paddle;
- coupon/discount allocation is absent;
- a later local scheduler run must not create another payable renewal;
- concurrent duplicate webhooks can both try to create the fallback order;
- order notes/status transitions need to remain idempotent.

The article may say “ArraySubs can reconstruct a local paid renewal record when Paddle's event arrives first,” but should not call it a full accounting reconstruction.

### Entity mapping

Paddle checkout sends `custom_data` with `order_id`, `site_url` and `subscription_id`; Paddle normally copies transaction custom data into the generated subscription. The webhook resolver prefers custom data, then tries Paddle subscription ID meta.

Ordering edge case: `subscription.created` can arrive before `transaction.completed`. If the event lacks usable custom data or local Paddle-subscription mapping has not yet been stored, entity resolution can fail. The Paddle subscription-created event can reference a transaction, but the current resolver does not use that transaction ID to find the original Woo order.

This must be tested with intentionally reordered deliveries.

### Payment failures and dunning ownership

The adapter maps `transaction.payment_failed` to a local payment-failed event. Paddle can also move Transactions and Subscriptions through `past_due` and its own recovery flow. Current event mapping does not include `transaction.past_due`, `subscription.past_due`, `subscription.activated` or `subscription.trialing` events.

Do not assume ArraySubs retry schedules and Paddle retry schedules are one unified dunning engine. Because Paddle owns the remote schedule, a merchant must document:

- which system decides when Paddle retries;
- which event starts local grace/access policy;
- whether ArraySubs sends duplicate failure messages;
- what restores local access after a later Paddle success;
- when a Paddle Subscription becomes paused/canceled versus merely past due;
- who stops retries after a local cancellation or fixed-term end;
- how an operator distinguishes “payment failed,” “transaction past due,” and “subscription past due.”

Official Paddle webhook catalog and payment-failure events should be checked before publication:

- https://developer.paddle.com/webhooks/
- https://developer.paddle.com/webhooks/transactions/transaction-payment-failed/

## Lifecycle operations: cancel, undo, pause and resume

### Cancel now or at period end

The adapter calls Paddle's subscription cancellation endpoint. A period-end cancellation uses `effective_from: next_billing_period`; Paddle records a `scheduled_change`. Immediate cancellation is irreversible because a canceled Paddle Subscription cannot be resumed.

Official sources:

- https://developer.paddle.com/api-reference/subscriptions/cancel-subscription/
- https://developer.paddle.com/build/subscriptions/cancel-subscriptions/

Required tests:

- immediate cancel before/after a payment;
- cancel at period end and verify remote `scheduled_change`/local waiting-cancellation state;
- duplicate cancel request;
- cancel while a renewal transaction is past due;
- webhook delay or webhook arriving before the API response is stored;
- cancel at the exact billing boundary;
- entitlement end time and timezone;
- refund policy independent from cancellation;
- canceled subscription cannot be “reactivated” by only changing local status.

### Undo scheduled cancellation

`restoreScheduledCancel()` patches `scheduled_change` to `null`. Paddle uses that field for scheduled pause as well as scheduled cancellation. The call is reached through local cancellation-reversal logic, but the remote request itself clears the entire scheduled change without verifying that its action is cancellation.

Race to test: a customer schedules cancellation, an operator or Paddle schedules another lifecycle change, and then an old undo request clears the newer change.

Safe remediation is to retrieve the current subscription, verify `scheduled_change.action === 'cancel'`, compare an expected version/timestamp, then clear it.

### Pause timing mismatch

`PaddleApiClient::pauseSubscription()` sends an empty request body. Paddle's documented default is to pause at the next billing period. The local ArraySubs auto-renew/lifecycle path can mark a paused/gateway status immediately. A merchant can therefore see “paused” locally while Paddle remains active until period end.

Official source: https://developer.paddle.com/api-reference/subscriptions/pause-subscription/ and https://developer.paddle.com/build/subscriptions/pause-subscriptions/

Verify:

- local status immediately after request;
- remote `scheduled_change` and effective time;
- access policy until effective time;
- a charge occurring between request and effective time;
- the `subscription.paused` webhook final transition;
- undo or resume before the scheduled pause takes effect;
- failure response after local UI state changes.

### Resume can charge immediately

`PaddleApiClient::resumeSubscription()` also sends an empty body. Paddle's documented default resumes immediately, starts a new billing period and may collect an immediate payment. A seemingly benign “turn auto-renew back on” action can therefore create a charge and reset the billing anchor.

Official source: https://developer.paddle.com/api-reference/subscriptions/resume-subscription/

The UI, confirmation text and support documentation must disclose whether resuming charges now. Test immediate totals, credits/proration, next billing date, duplicate clicks, already-active subscriptions, a subscription with a scheduled pause, and local rollback after API failure.

### Two-way sync guard

`TwoWaySyncGuard` records locally initiated lifecycle/refund actions for 300 seconds to avoid echoing the same remote webhook back into another API call. That is useful but not durable idempotency:

- a webhook delayed beyond five minutes can miss the guard;
- a failed API request can leave a guard marker;
- identical customer/operator actions can overlap;
- local and remote state can change independently during the guard;
- restart/persistence semantics must be understood from the backing store.

Evidence: `arraysubspro/src/Features/AutomaticPayments/Services/TwoWaySyncGuard.php:30` and Paddle calls in `PaddleGateway.php`/`Services/Hooks.php`.

## Payment-method updates and customer portal

The current integration creates a Paddle customer portal session using the stored Paddle Customer ID and redirects to `urls.general.overview`. It does not pass `subscription_ids` to request a subscription-specific payment-method deep link.

Official portal source: https://developer.paddle.com/api-reference/customer-portals/create-customer-portal-session/

Paddle customer portal can provide transaction history/invoices, payment-method updates and subscription management according to the configured portal. Session URLs are temporary and should be created on demand rather than stored or emailed as permanent links.

Current limitations:

- no direct ArraySubs-hosted card form;
- no proven deep link to the exact subscription payment update;
- portal settings may allow broader subscription actions than local ArraySubs policy expects;
- event map does not include `payment_method.saved` or `payment_method.deleted`;
- `subscription.updated` is normalized as a payment-method update even though it can represent many subscription changes;
- local card brand/last-four cache is not explicitly refreshed from dedicated payment-method events;
- `syncFromGateway()` expects a payment-method-like block on a Subscription response and always returns `recent_charges: []`; the documented Paddle Subscription object does not prove that such payment details are embedded;
- admin “sync” cannot currently reconcile missed Paddle renewal charges from a recent-transactions list.

Article guidance:

- say “ArraySubs sends the customer to Paddle's portal” rather than “ArraySubs updates the card”;
- tell merchants to test the exact portal configuration;
- avoid displaying stale brand/last-four as proof of the current funding source;
- confirm which subscription the updated method applies to;
- monitor Paddle events and verify the next renewal with a sandbox/test clock process.

Related internal link: `/deals/arraysubs/use-cases/recipes/member-update-payment/`

## Webhooks, ordering, deduplication and race conditions

### Current subscribed/handled event map

Observed map in `PaddleGateway.php:110-124`:

| Paddle event | Normalized/local path | Gap |
|---|---|---|
| `transaction.completed` | payment succeeded | Core settlement event; initial and renewal branching |
| `transaction.payment_failed` | payment failed | Does not cover every past-due/recovery transition |
| `subscription.canceled` | subscription canceled | Must be ordered against update/undo events |
| `subscription.updated` | payment method updated/generic sync | Event meaning is broader than payment method |
| `adjustment.created` | refund created | Also carries credits/chargebacks; current handler filters to refund |
| `subscription.created` | custom handler | Entity-resolution/order race |
| `subscription.paused` | custom handler | State timing must align with scheduled pause |
| `subscription.resumed` | custom handler | Immediate charge/billing anchor implications |

Material unmapped events to consider based on enabled workflows:

- `subscription.activated`;
- `subscription.trialing`;
- `subscription.past_due`;
- `transaction.past_due`;
- `adjustment.updated`;
- `payment_method.saved`;
- `payment_method.deleted`;
- relevant customer/address/business events if local display or tax identity depends on them;
- payout/report events or a separate reconciliation import if financial operations require them.

If an unsupported event reaches the current router, the adapter can return a handler result with `success: false` while the REST route still responds successfully at the HTTP layer. Paddle treats a 2xx response as accepted and will not retry merely because the JSON says `success: false`. Subscribe only to events intentionally handled, and make unsupported critical events produce an observable alert or non-2xx if retry is actually desired.

### Signature verification

Current code:

- reads the exact raw request body;
- parses `Paddle-Signature` fields;
- signs `timestamp:raw_body` with HMAC SHA-256 and the webhook secret;
- rejects events older than 300 seconds by default;
- compares using `hash_equals`.

Evidence: `PaddleApiClient::verifyWebhookSignature()` at `PaddleApiClient.php:282-319`, parser at `:398-422`, and `PaddleGateway::verifyWebhookSignature()` at `PaddleGateway.php:1141-1168`.

Paddle's official guidance says to verify the unmodified body, supports multiple `h1` values during secret rotation, and notes a five-second default tolerance in official SDKs. The current parser retains only one `h1` value (effectively the last parsed) and uses a broader five-minute tolerance.

Primary source: https://developer.paddle.com/webhooks/about/signature-verification/

Required security tests:

- valid current signature;
- modified whitespace/body;
- wrong secret;
- absent signature;
- old timestamp just inside/outside tolerance;
- future timestamp/clock skew;
- multiple `h1` values where any valid signature should pass;
- secret rotation and rollback;
- large payload;
- reverse proxy/WAF preserving raw body;
- endpoint never logs secret or full sensitive payload.

### At-least-once and out-of-order delivery

Paddle documents webhook delivery as at least once and not guaranteed in chronological order. It recommends using `event_id` for deduplication and `occurred_at` to reason about ordering.

Primary sources:

- https://developer.paddle.com/webhooks/about/how-webhooks-work/
- https://developer.paddle.com/webhooks/

The current parser stores `occurred_at`, but handlers do not compare it with the last applied event for an entity. An older `subscription.updated` arriving after a cancellation/pause/resume can regress local metadata or status.

Recommended durable state model:

- persist last-applied Paddle event time and event ID per remote object and state domain;
- compare remote object `updated_at`/event `occurred_at` before applying a state transition;
- retrieve the current Paddle object when events conflict;
- make every order/state/refund mutation idempotent independent of the transport event table;
- preserve raw event ID/type/object ID/occurred-at/received-at/processing result for audit;
- do not assume delivery order across transaction and subscription event streams.

### Duplicate race in current router

The `arraysubs` event table has a unique `(gateway_slug,event_id)` key (`Services/DatabaseMigration.php:162-166`). However `WebhookRouter.php:75-108` executes this order:

1. query whether event is already remembered;
2. perform handler side effects;
3. remember the event only after successful handling.

Two concurrent deliveries can both see “not present,” both mark an order paid or create a retroactive renewal, and only collide at the final insert. A unique key protects the log row, not side effects that happened before the insert.

Safer pattern:

1. atomically claim/insert event as processing before side effects;
2. only one worker wins the unique key;
3. store processing/succeeded/failed state and retry count;
4. make business operations idempotent by transaction ID/order ID as a second guard;
5. use an order/subscription lock around renewal order lookup/creation/payment;
6. allow controlled retry for failed processing without opening duplicate execution.

The event cleanup period is currently 30 days in the shared gateway event logic. A very old replay after cleanup can be processed again; business-object idempotency must outlive transport-log retention.

### Synchronous response risk

The router performs parsing, resolution and business handler work before returning. Some handlers can make API calls or create/update Woo objects. Paddle recommends acknowledging webhooks in under five seconds and queueing asynchronous work; live notifications can retry many times over a multi-day window when delivery fails.

Primary source: https://developer.paddle.com/webhooks/about/respond-to-webhooks/  
Sandbox/live retry context: https://developer.paddle.com/sdks/sandbox/

Production hardening:

- verify signature and atomically persist/claim the event quickly;
- return 200 after durable acceptance;
- process through Action Scheduler/queue;
- alert on queue age/failure/dead letters;
- retain enough payload/object identifiers to retrieve current Paddle state;
- measure endpoint latency at p50/p95/p99;
- test WordPress maintenance mode, PHP timeout, database lock and Paddle API latency.

### Essential webhook race scenarios

1. `subscription.created` before `transaction.completed`.
2. `transaction.completed` before the local renewal order exists.
3. local renewal order exists before `transaction.completed`.
4. two identical `transaction.completed` requests concurrently.
5. two different Paddle transactions for the same local billing period.
6. old `subscription.updated` after `subscription.canceled`.
7. resume event and immediate completed transaction in either order.
8. scheduled cancellation undo crossing the billing boundary.
9. refund adjustment created before local refund response completes.
10. adjustment created as pending, then approved/rejected in `adjustment.updated`.
11. payment failed followed quickly by payment completed.
12. webhook succeeds remotely but WordPress response is lost, causing Paddle retry.
13. handler changes Woo state then crashes before remembering event ID.
14. event arrives after the 30-day dedupe record is cleaned.

Related internal link: `/deals/arraysubs/use-cases/recipes/gateway-health-monitor/`

## Refunds, credits and chargebacks

### Current local refund request is not production-safe

`PaddleGateway::process_refund()` builds an Adjustment request.

For a full refund, it sends `action`, `transaction_id` and `reason` but does not send `type: full`. Paddle's create-adjustment schema requires the adjustment type; the default/partial path requires item allocation.

For a partial refund, it sends this logical shape:

```text
items[0].item_id = txn_...
items[0].type    = partial
items[0].amount  = minor-unit amount
```

Paddle requires `item_id` to identify a transaction line item (`txnitm_...`), not the transaction (`txn_...`). The code does not first retrieve the transaction and allocate the refund across its `details.line_items`.

Evidence: `PaddleGateway.php:530-581`, especially `:548-566`.

Official schema: https://developer.paddle.com/api-reference/adjustments/create-adjustment/

Expected current outcome: full and partial refunds can be rejected or misconstructed. Treat this as a blocker; do not rely on the `refunds: true` capability flag.

### Async approval state

Paddle live refunds can be created in a pending-approval state. The current method returns `true` as soon as adjustment creation returns without inspecting a final approved state. The event map handles `adjustment.created` but not `adjustment.updated`.

Consequences:

- Woo can show a successful local refund while Paddle later rejects/declines it;
- access and emails can change prematurely;
- finance can expect cash movement that never occurred;
- there is no local resolution path for approved/rejected status;
- retrying an uncertain refund can create duplicates without a durable idempotency strategy.

Official event: https://developer.paddle.com/webhooks/adjustments/adjustment-updated/

### External refunds

The current `adjustment.created` handler records notes when `action=refund`; it does not create a complete Woo refund record that updates order refunded totals, tax/line allocation and access policy. Observed amounts are Paddle minor units and need correct formatting before display.

Required two-way matrix:

- full refund from Woo;
- partial refund of one line item;
- partial amount across multiple transaction items;
- refund initiated in Paddle dashboard;
- pending then approved;
- pending then rejected;
- duplicate adjustment events;
- refund after cancellation;
- refund of initial transaction vs renewal transaction;
- refund with tax/discount allocation;
- refund after payout and resulting negative balance/setoff;
- local API timeout followed by remote success.

### Chargebacks

Paddle Adjustment events can represent refund, credit, chargeback and chargeback-warning actions. The current event map routes `adjustment.created` through a refund-normalized handler, and that handler exits when the action is not refund. The gateway's `disputes` capability is false and dedicated dispute handlers are not connected to Paddle chargeback events.

Paddle as MoR manages the payment-network dispute channel, but its agreement can allocate the economic amount and fees back to the supplier through balance movements/setoff. The supplier still needs fraud prevention, fulfillment evidence, access revocation, customer support, and reconciliation.

Primary sources:

- https://developer.paddle.com/webhooks/adjustments/adjustment-created/
- https://www.paddle.com/help/manage/risk-prevention/understanding-chargebacks-with-paddle
- https://www.paddle.com/legal/terms

Never write “Paddle assumes all chargeback risk.” Safer: “Paddle handles the Merchant-of-Record dispute process, while the supplier must still monitor operational and economic consequences under its agreement.”

### Paddle refund policy and customer promises

Paddle has a buyer refund policy and applicable consumer rights may override a merchant's preferred policy. The merchant's product page, checkout, terms and support responses must not make promises that conflict with Paddle's buyer terms/refund policy.

Primary sources:

- https://www.paddle.com/legal/refund-policy
- https://www.paddle.com/help/manage/your-customers/how-do-i-issue-refunds
- https://www.paddle.com/legal/buyer-terms

Recheck policy dates and jurisdiction-specific language at publication.

## Tax, invoices and accounting records

### Transaction tax

Paddle's MoR model generally places calculation, collection and remittance of buyer-transaction sales tax/VAT/GST with Paddle. That benefit depends on:

- an eligible product;
- correct tax category/product facts;
- correct customer location/business/tax-ID information;
- a transaction actually completed as a Paddle sale;
- the Paddle agreement and current law.

ArraySubs/Woo still must ensure it does not independently collect or report the same buyer tax as if the Woo merchant were seller. The current integration can let Woo calculate an order total while Paddle calculates its own checkout tax, with no full tax reconciliation in the adapter.

Required tax scenarios:

- domestic consumer;
- cross-border consumer;
- tax-inclusive and tax-exclusive display;
- valid/invalid business VAT or tax ID;
- location evidence mismatch;
- tax-exempt/reverse-charge outcome where applicable;
- tax rate/category change;
- refund tax reversal;
- coupon and tax allocation;
- zero-value trial then taxable renewal;
- tax differences between initial and renewal buyer location/status;
- Woo tax disabled vs enabled;
- Woo total differing from Paddle total.

Do not copy Paddle tax totals into Woo tax fields without a documented accounting design. Do not present a Woo-generated invoice naming the supplier as seller for the same Paddle buyer sale without qualified review.

### Buyer transaction documents

Paddle provides buyer-facing receipts/invoices/transaction documents for completed Paddle sales, including through the customer portal. The Woo order is valuable for internal fulfillment and local operational history, but it is not automatically the authoritative buyer tax invoice.

The article should recommend:

- link customers to Paddle's document/portal route;
- clearly identify Paddle as seller/MoR where required;
- configure Woo PDF-invoice plugins so they do not create a contradictory duplicate tax invoice;
- label internal Woo documents as order confirmations/records when appropriate;
- preserve Paddle transaction/document identifiers in support and accounting records.

### Sales-assisted/manual invoicing

Paddle supports sales-assisted invoiced transactions as a platform capability, but the current ArraySubs adapter creates automatic-collection checkout Transactions. It does not expose Paddle manual invoice creation, issuance, payment terms or invoiced-subscription workflows.

Primary sources:

- https://developer.paddle.com/concepts/sell/sales-assisted-invoice/
- https://developer.paddle.com/build/invoices/create-issue-invoices/

Do not market Paddle invoicing in this ArraySubs integration unless that workflow is implemented and tested.

### Supplier-side accounting

Even with MoR, the supplier needs a policy for:

- gross buyer sales versus net supplier revenue presentation;
- Paddle service/transaction fees;
- sales tax collected/remitted by Paddle;
- refunds, credits and chargebacks;
- reserves/retained amounts;
- foreign-exchange movement;
- Paddle reverse invoice/statement/remittance documents;
- accrual timing and deferred revenue for subscriptions;
- settlement timing differences;
- bank fees and SWIFT/wire deductions;
- corporate income tax and local registrations.

These are accounting judgments. The article should give a reconciliation workflow and advise qualified accounting/tax review, not prescribe journal entries.

## Payouts and reconciliation

Paddle typically settles an eligible net balance on its payout schedule and subject to thresholds, review, reserves and chosen payout method. These details can change and must be rechecked. Current Paddle help says payouts are generally monthly, sent by the 15th for the prior period, with a minimum threshold, but the article should link live policy instead of turning this into a permanent promise.

Sources:

- https://www.paddle.com/help/manage/get-paid/when-and-how-do-i-get-paid
- https://www.paddle.com/help/manage/get-paid/what-statements-will-i-receive
- https://www.paddle.com/help/manage/get-paid/is-there-a-fee-taken-for-payouts

### Current ArraySubs reconciliation coverage

The adapter can store `_gateway_paddle_payout_amount` from transaction details in the payment-success path. That is not a settlement ledger:

- it does not import all renewal-level payout/balance movements;
- it does not map taxes, fees, FX, refunds, chargebacks, reserves and payout deductions;
- it does not fetch Paddle payout reconciliation reports;
- it does not connect Woo orders to a Paddle payout ID/bank deposit;
- `syncFromGateway()` reports no recent charges;
- retroactive Woo renewal orders can lack line-item detail;
- adjustment state is incomplete.

### Recommended three-way reconciliation

Reconcile at three levels:

1. **Commerce ledger:** Woo initial/renewal/refund orders and ArraySubs subscription state.
2. **Paddle subledger:** Transactions, adjustments, taxes, fees, balance movements, subscriptions and payout report.
3. **Cash ledger:** Paddle payout/remittance to the actual bank account, net of bank/SWIFT effects.

For each Paddle transaction, retain or report:

- Paddle transaction ID;
- Paddle subscription/customer IDs;
- Woo initial or renewal order ID;
- gross, discount, tax, total, currency;
- fee and balance currency;
- payout/balance movement;
- refund/credit/chargeback adjustment IDs and states;
- occurred/completed timestamps;
- payout ID/report period;
- variance/reconciliation status.

Paddle report source: https://developer.paddle.com/build/reports/payout-reconciliation/  
Current report improvement changelog (2026-05-27): https://developer.paddle.com/changelog/2026/payout-reconciliation-report-improvements/

### Daily/period-end controls

- Daily: unmatched completed Paddle Transactions, paid Woo orders missing Paddle ID, Paddle failures without local failed state, duplicate remote transactions, adjustments without local cases.
- Weekly: upcoming renewal sample, past-due subscriptions, stale scheduled changes, stale product fingerprints, webhook delivery errors/latency.
- Payout period: tie transaction/adjustment balance movements to Paddle report, statement/reverse invoice/remittance and bank deposit.
- Month end: explain every difference caused by timing, tax, fee, FX, reserve, chargeback, refund or bank charge.
- Audit trail: retain source IDs and report versions; never rely only on editable order notes.

## Data protection and security

MoR reduces the supplier's direct handling of card data because Paddle Checkout collects payment information, but WordPress still handles identity, order, subscription, entitlement and support data. The supplier needs a data map covering:

- Woo customer/order/subscription records;
- Paddle customer/subscription/transaction/adjustment records;
- identifiers copied between systems;
- webhook payloads and logs;
- customer portal session links;
- analytics/marketing tools on checkout and order-received pages;
- support exports and screenshots;
- backups, retention and deletion behavior;
- access controls for WordPress/Paddle staff.

Primary privacy/GDPR source: https://www.paddle.com/legal/gdpr

### Credential handling observed

The gateway settings include server-side API key, client-side token, webhook secret, test/live mode, default payment-link information and seller ID. The observed API client:

- uses Bearer authorization;
- uses Paddle sandbox or live base URL by mode;
- has a 30-second HTTP timeout;
- retries WordPress transport errors and HTTP 429, with blocking sleeps;
- does not retry general 5xx responses;
- does not pin `Paddle-Version: 1`;
- parses response errors into `WP_Error`;
- includes a `seller_id` setting that first-party inspection did not find used in API or checkout calls.

Evidence: `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleApiClient.php` and `PaddleGateway.php` settings/callers.

Official sources:

- Authentication/scopes: https://developer.paddle.com/api-reference/about/authentication/
- Versioning/header guidance: https://developer.paddle.com/api-reference/about/versioning/

Security checklist:

- use least-privilege keys and separate sandbox/live credentials;
- rotate keys and webhook secrets with an overlap plan;
- never expose API key/webhook secret to browser source, logs, screenshots or article images;
- expose only the environment-correct client token;
- restrict WordPress admin capabilities;
- use public HTTPS webhook route behind a proxy that preserves raw body;
- rate-limit abusive traffic without blocking Paddle;
- monitor 401 signature failures and clock drift;
- redact email/address/payment payload fields from logs;
- create fresh portal-session URLs on demand and avoid persistent sharing;
- test backup restore so old credentials/subscription state do not resume collection unexpectedly.

## API reliability observations

The current `PaddleApiClient` covers Products, Prices, Transactions, Subscriptions, Adjustments and portal sessions. It does not expose list/search/report APIs needed for full reconciliation.

Reliability gaps to disclose internally:

- no deterministic idempotency key is apparent on transaction/adjustment creation;
- only transport errors and 429 are retried; transient 5xx responses are not;
- retries block the PHP request with `usleep`/`sleep`;
- an API timeout after Paddle accepts a create request can produce an uncertain outcome;
- no request ID is surfaced for Paddle support correlation;
- no `Paddle-Version` header pin;
- no circuit breaker/queue for slow API paths;
- client permissions are not proactively validated;
- API credential presence is enough for gateway availability even if webhook secret is absent or endpoint is unhealthy.

High-value failure-injection test: Paddle accepts a transaction, WordPress times out before storing `txn_...`, then checkout is retried. Verify whether a second transaction is created and how the first is recovered.

## Known implementation gaps and editorial severity

| Severity | Finding | Evidence | Editorial rule / action |
|---|---|---|---|
| Blocker | Wrong interval/trial meta keys | `PaddleProductSync.php:187-214` vs core keys | Do not claim non-1 intervals/trials work; fix and sandbox test |
| Blocker | Full refund omits `type: full` | `PaddleGateway.php:548-566`; Paddle schema | Do not recommend Woo refund button for Paddle until fixed |
| Blocker | Partial refund sends `txn_` as item ID, not `txnitm_` | same | Must retrieve/allocate actual transaction items |
| High | Stored Price ID reused without freshness comparison | checkout/sync paths in `PaddleGateway.php`/`PaddleProductSync.php` | Explain stale-price risk and change-control process |
| High | Signup fee/fees/shipping/Woo tax not represented | checkout item builder; core `_signup_fee` | Treat unsupported/unverified |
| High | Existing remote subscription not updated on local plan switch | no Paddle item update found; retention amount update false | Do not claim upgrades/downgrades/proration |
| High | Concurrent webhook dedupe check occurs before side effects | `WebhookRouter.php:75-108` | Require atomic claim and business-object idempotency |
| High | `occurred_at` parsed but not applied for ordering | `PaddleGateway.php:1179-1208`; handlers | Test stale event regression; recommend state versioning |
| High | Refund async approval not tracked | no `adjustment.updated` map | Do not equate adjustment creation with money returned |
| High | Chargeback actions ignored by refund handler | `adjustment.created` map/filter; disputes false | Add ops workflow/reconciliation; avoid no-risk claim |
| High | Retroactive renewal order lacks full line items | renewal fallback handler | Not full accounting/fulfillment reconstruction |
| High | Woo and Paddle totals can diverge without blocking payment completion | recurring Price-ID builder vs Woo order | Test coupons/tax/fees/currency; add variance guard |
| High | Fixed-term/local length not modeled remotely | no observed Paddle cancellation-at-end mapping | Paddle can continue billing unless explicit cancellation occurs |
| Medium | Pause defaults at next period while local UI/state may switch now | empty pause body | Clarify effective time and access behavior |
| Medium | Resume defaults immediate/new period/charge | empty resume body | Confirmation must disclose charge/billing reset |
| Medium | Undo clears any scheduled change | patch `scheduled_change: null` | Verify action/version before clearing |
| Medium | General portal URL, no subscription deep link | `createPortalSession(customer_id)` and general overview | Set user expectation and test portal permissions |
| Medium | Payment-method events/cache incomplete | event map/sync method | Cached brand/last4 is not authoritative |
| Medium | Synchronous webhook handling | `WebhookRouter` | Queue after durable acceptance; monitor latency |
| Medium | Parser retains one of multiple `h1` signatures | signature parser | Support rotation properly |
| Medium | 30-day event dedupe retention | shared event cleanup | Object-level idempotency must persist longer |
| Medium | API does not retry 5xx or pin version header | `PaddleApiClient` | Add resilience/version control |
| Medium | Seller ID setting appears unused | settings vs callers | Do not tell user it changes API ownership/routing |
| Medium | No payout-report integration | API client/sync | Require external three-way reconciliation |
| Context | Physical products prohibited/restricted | Paddle eligibility guidance | Paddle is not for subscription boxes by default |

## Production test matrix

Every test should capture Woo order/subscription IDs, Paddle Product/Price/Transaction/Subscription/Customer/Adjustment IDs, event IDs and timestamps, screenshots, request/response status, local meta, remote object state and financial totals.

### A. Onboarding, credentials and environment

1. Sandbox API key + sandbox client token + sandbox webhook secret all match.
2. One live credential accidentally mixed into sandbox fails safely and visibly.
3. Missing API key/client token hides/disables gateway with actionable message.
4. Missing webhook secret does not allow a misleading “ready” status.
5. Invalid/revoked API key produces no orphan Woo order or remote ambiguity.
6. Least-privilege permissions support every used endpoint.
7. Production domain/default payment link is approved.
8. Webhook URL is public HTTPS and reachable from Paddle.
9. Secret rotation accepts both valid signatures during transition.
10. Gateway Health shows environment, endpoint delivery and recent event outcomes without exposing secrets.

### B. Product catalog sync

1. Simple monthly plan interval 1.
2. Every 2 months — expected to expose current metadata bug before fix.
3. Annual plan.
4. Free trial in days/weeks/months/years — expected current mismatch before fix.
5. Paid trial if product model supports it.
6. Signup fee — expected missing from Paddle request before fix.
7. Fixed-term plan — ensure Paddle stops at exact end.
8. Different renewal price.
9. Variable product with several amounts/cycles.
10. Product name/description change.
11. Price change after first sync.
12. Cycle change after first sync.
13. Trial added/removed after first sync.
14. Paddle Price archived/deleted externally.
15. Concurrent first checkouts for an unsynced product.
16. API succeeds then local meta save fails.
17. Replacement Price created then old Price archive fails.
18. Correct Paddle tax category per product.
19. Unsupported/retired currency.
20. Zero-decimal and ordinary two-decimal currency.

### C. Cart and total parity

1. One recurring item.
2. Quantity greater than one.
3. Two same-cycle recurring items.
4. Two different-cycle items — rejected with useful UX.
5. Recurring + one-time eligible digital item.
6. Recurring + physical/shippable item — blocked unless expressly approved.
7. Product coupon.
8. Cart coupon.
9. Woo fee.
10. Shipping.
11. Signup fee.
12. Woo tax-inclusive display.
13. Woo tax-exclusive display.
14. Business tax ID/reverse-charge case.
15. Multicurrency order different from store currency.
16. Compare every Woo and Paddle amount before fulfillment.

### D. Classic checkout

1. Logged-in customer success.
2. Guest checkout if allowed.
3. Paddle overlay closed before payment.
4. Payment declined.
5. Browser navigates back/refreshes.
6. Double click/duplicate submission.
7. Transaction completed but browser redirect fails.
8. Browser success but webhook delayed.
9. Webhook before order-received page.
10. Checkout transaction accepted but local API request times out.
11. Order currency/tax/total mismatch.
12. Product fulfillment only after authoritative paid state.

### E. Checkout Blocks

Repeat every classic scenario plus:

1. Gateway visibility/labels in Blocks.
2. Store API validation error.
3. Serialized `paddle_data` missing/malformed.
4. Checkout success callback fires twice.
5. React rerender does not reopen duplicate overlay.
6. Order recovery after tab reload.
7. Accessibility/keyboard/focus and mobile overlay behavior.
8. Terms/privacy consent placement.

### F. Initial event mapping

1. `transaction.completed` then `subscription.created`.
2. `subscription.created` then `transaction.completed`.
3. Missing custom data.
4. Wrong site URL/custom data copied from another environment.
5. Duplicate event sequentially.
6. Duplicate event concurrently.
7. Same transaction event with a new event ID.
8. Signature invalid/old/multiple `h1`.
9. Database unavailable after signature verification.
10. Handler succeeds then process dies before event remembered.

### G. Renewals and dunning

1. Pending renewal order exists before Paddle charge.
2. Paddle charge/event arrives before local order.
3. Exact billing-boundary concurrency.
4. Duplicate completed event cannot create duplicate order.
5. Two remote transactions cannot settle one billing period silently.
6. Failure event then success event.
7. Success event then stale failure event.
8. Paddle past-due states map correctly.
9. Customer updates method during recovery.
10. Local access/grace and Paddle retry schedule are documented.
11. Next-billed date/timezone remains aligned.
12. Renewal product line/tax/discount data reconciles.
13. A local scheduler delay does not create a second payable order later.
14. A missed webhook is recovered through a manual reconciliation run.

### H. Customer portal/payment method

1. Portal session generated only for authenticated owner.
2. Temporary URL expires safely.
3. Correct Paddle Customer and subscription visible.
4. Update payment method and verify actual next-renewal source.
5. Delete payment method.
6. Multiple Paddle subscriptions for one customer.
7. Portal cancellation/pause settings match local policy.
8. Local brand/last-four cache refreshes or is clearly stale.
9. Customer with missing/incorrect `ctm_` mapping.
10. Repeated clicks do not leak/reuse an old session.

### I. Lifecycle

1. Immediate cancellation.
2. Period-end cancellation.
3. Undo period-end cancellation.
4. Old undo does not clear a newer scheduled pause.
5. Pause request/effective time/local state.
6. Resume and immediate charge disclosure.
7. Resume resets billing period as expected.
8. Duplicate pause/resume clicks.
9. API timeout with unknown remote outcome.
10. Webhook delayed beyond 300-second two-way guard.
11. Fixed-term final renewal schedules remote cancel.
12. Plan switch updates remote items/amount or is blocked.
13. Trialing item-change restrictions.
14. Canceled remote subscription cannot be reactivated locally.

### J. Refunds and chargebacks

1. Full refund request exact schema.
2. Partial one-item refund uses `txnitm_`.
3. Partial multi-item allocation.
4. Pending approval then approved.
5. Pending approval then rejected.
6. Local timeout after remote adjustment creation.
7. Paddle dashboard refund syncs Woo refund amounts/tax/access.
8. Duplicate adjustment events.
9. Chargeback warning.
10. Chargeback opened/closed/fee/balance movement.
11. Refund after payout.
12. Refund and cancellation are distinct operations.

### K. Reconciliation and operations

1. Every paid Woo order has exactly one expected Paddle transaction.
2. Every completed Paddle transaction maps to one Woo order.
3. Initial and renewal IDs remain distinguishable.
4. Tax/discount/fee/FX/balance movement reconcile.
5. Adjustment totals reconcile to Woo and access state.
6. Payout report ties to remittance and bank deposit.
7. Threshold/reserve rolls balance correctly to later payout.
8. Webhook latency/failure alert fires.
9. Stale product Price alert fires.
10. Orphan remote/local objects are reportable.

## Monitoring and operational runbook

### Metrics

- checkout transaction creation success/error/timeout;
- Paddle Checkout opened/completed/closed;
- pending Woo Paddle orders older than a threshold;
- webhook requests by event type/status/latency;
- signature rejection count;
- event queue age, processing failures and retries;
- duplicate-event claim count;
- retroactive renewal orders created;
- Paddle completed transactions without paid Woo order;
- Woo paid orders without completed Paddle transaction;
- product sync fingerprint mismatches/stale Price IDs;
- past-due Paddle subscriptions/local mismatch;
- scheduled-change mismatches;
- adjustment pending/rejected age;
- payout reconciliation variance.

### Alerts

- no Paddle webhooks in an expected active period;
- any sustained webhook 4xx/5xx or latency above Paddle's acknowledgement target;
- a paid/fulfilled Woo order whose Paddle total is lower/different unexpectedly;
- multiple Paddle transactions for one local period;
- a remote renewal with no local order after grace threshold;
- an active Paddle subscription paired with canceled/expired local entitlement;
- a local active subscription paired with canceled/paused Paddle state;
- refund marked locally complete while Paddle adjustment is pending/rejected;
- Price fingerprint drift;
- payout/bank variance over policy threshold.

### Incident identifiers to capture

- Woo order and ArraySubs subscription IDs;
- Paddle Product/Price/Transaction/Subscription/Customer/Adjustment IDs;
- event ID, type, occurred-at, received-at and signature result;
- local/remote status before and after;
- API request route/status/Paddle request ID if available;
- exact amounts/currencies;
- whether customer access/fulfillment changed;
- whether a second charge/refund is possible;
- operator and corrective action.

Use the internal Gateway Health recipe for the product workflow, but state that health telemetry is not financial reconciliation: `/deals/arraysubs/use-cases/recipes/gateway-health-monitor/`

## Recommended article structure and evidence notes

This is research guidance, not article copy.

1. **Answer the question immediately.** Paddle can be MoR for eligible software/digital subscriptions sold through a Woo storefront; it is not a universal Woo gateway.
2. **Explain MoR with a responsibility ledger.** Separate transaction tax/invoice/payment administration from product, privacy, accounting and economic liability.
3. **Show the three-system architecture.** Woo/ArraySubs local subscription and orders; Paddle Product/Price/Transaction/Subscription/Customer; signed webhooks as the bridge.
4. **Explain renewal ownership.** Paddle owns the remote schedule; ArraySubs reconciles local renewal orders.
5. **Explain eligibility.** Software/digital focus, prohibited physical delivery and restricted categories; approval required.
6. **Explain catalog synchronization.** Product/Price immutability/change control, new sales versus existing subscriptions, and current stale-price/meta-key caveats.
7. **Cover lifecycle.** Cancel at period end, undo, pause effective time, resume immediate-charge risk, plan-change limitations.
8. **Cover webhooks.** Signature, at least once, out of order, atomic idempotency, latency and recovery.
9. **Cover payment updates.** Paddle portal, temporary URL, local cache limitations.
10. **Cover refunds/chargebacks honestly.** Paddle Adjustment workflow, economic liability and current adapter blockers.
11. **Cover tax/invoices/payout reconciliation.** Paddle buyer document versus Woo operational order; three-way reconciliation.
12. **Give a launch test matrix.** Classic and Blocks checkout, totals, renewals, races, lifecycle, adjustments and payout.
13. **Position ArraySubs carefully.** Pro provides a shared Woo subscription/lifecycle/portal/health surface around Paddle, but current facts and limitations govern.
14. **CTA.** Link to Pro pricing only after explaining who is a fit and what must be tested.

### Suggested screenshots/visual evidence for the later article

The writing task requested 3–6 real plugin screenshots. Good candidates, with secrets and customer data redacted:

1. WooCommerce payment-methods screen with “Paddle (ArraySubs)” enabled.
2. ArraySubs Paddle sandbox settings showing mode, API/client/webhook fields empty or redacted and webhook URL.
3. ArraySubs Gateway Health Paddle panel with endpoint/event state.
4. Woo initial order notes/meta after a completed Paddle checkout, showing transaction mapping but no personal data.
5. ArraySubs subscription detail showing Paddle subscription/customer context and next billing/status.
6. Member update-payment action/redirect explanation, paired with a safely staged Paddle portal screen if permitted.

Do not screenshot real API keys, webhook secrets, client tokens, customer email/address, transaction documents, live last-four details, or production payout data.

Suggested context-specific generated visuals:

- responsibility ledger: Paddle MoR duties versus supplier residual duties;
- control-plane diagram: Woo/ArraySubs local ledger connected by signed webhooks to Paddle billing ledger;
- product-sync drift visual: Woo price change, new Paddle Price for new buyers, old existing subscriptions unchanged;
- renewal race timeline: local-order-first versus Paddle-event-first convergence;
- three-way reconciliation: Woo orders ↔ Paddle transactions/adjustments ↔ bank payout.

## Internal links

Required commercial/product links:

- Payment gateway feature pillar: `/deals/arraysubs/features/#payment-gateways`
- Pro/pricing CTA: `/deals/arraysubs/pricing/`
- Stripe automatic billing/SCA recipe: `/deals/arraysubs/use-cases/recipes/stripe-automatic-billing-sca/`
- Member payment-update recipe: `/deals/arraysubs/use-cases/recipes/member-update-payment/`
- Gateway Health recipe: `/deals/arraysubs/use-cases/recipes/gateway-health-monitor/`

Editorial cluster links:

- A056, gateway comparison: `/deals/arraysubs/resources/payments-and-compliance/best-payment-gateways-for-woocommerce-subscriptions/`
- A057, Stripe vs PayPal vs Paddle: use its published URL after registry confirmation; current blog source slug is `/blogs/stripe-vs-paypal-vs-paddle-for-woocommerce-recurring-billing/` and its resource URL should be preferred if published.
- A059, PayPal recurring payments: use published resource URL/registry after confirmation.
- A061, automatic vs manual gateway support: add when published.
- A062, SCA/3DS renewals: add when published; clarify Paddle owns authentication in its checkout rather than ArraySubs declaring SCA absent.
- A063, payment tokens/card updates: add when published.
- A064, subscription webhooks: add when published.
- A065, sales tax/VAT: add when published.
- A066, Merchant of Record vs processor: add when published, avoiding keyword cannibalization by keeping A060 implementation-specific.
- A067, gateway migration: add when published; warn that Paddle remote subscriptions/payment context are not portable Woo tokens.

Existing context links that can support the article:

- `/blogs/best-payment-gateways-for-woocommerce-subscriptions/`
- `/blogs/stripe-vs-paypal-vs-paddle-for-woocommerce-recurring-billing/`
- `/blogs/paypal-recurring-payments-for-woocommerce-agreements-renewals-and-limits/`
- `/blogs/how-taxes-and-shipping-behave-on-subscription-renewals/`
- `/blogs/immediate-vs-next-renewal-plan-changes/`
- `/blogs/what-happens-when-a-subscription-payment-fails/`

Anchor-text variation examples:

- “ArraySubs payment-gateway features”
- “compare recurring billing control planes”
- “member payment-method update workflow”
- “monitor gateway webhooks and connectivity”
- “automatic versus manual renewal support”
- “subscription tax and VAT responsibilities”
- “safe subscription gateway migration”

## Claims not to make

### Legal/tax/compliance

- Do not claim universal compliance, zero tax duties, zero liability, or legal advice.
- Do not claim Paddle is available for every country/entity/product.
- Do not claim physical products or subscription boxes are eligible.
- Do not promise a fixed price, payout date, threshold, refund rule, dispute result or supported payment method without rechecking live terms.
- Do not say Paddle's buyer invoice eliminates supplier accounting documents.
- Do not say the supplier is not responsible for privacy/security.

### Product behavior

- Do not claim configured free trials work in the current adapter without fixing/testing metadata keys.
- Do not claim non-1 billing intervals sync correctly in the current adapter.
- Do not claim Woo price edits automatically update Paddle or existing subscriptions.
- Do not claim signup fees, shipping, fees, Woo coupons or Woo tax automatically carry to Paddle.
- Do not claim upgrades/downgrades/proration/retention discounts are synchronized.
- Do not claim fixed-term plans automatically stop Paddle billing.
- Do not claim multiple different billing cycles can share a Paddle checkout.
- Do not claim the payment method is a portable Woo token.
- Do not claim ArraySubs performs the renewal charge; Paddle schedules it.
- Do not claim browser checkout success settles the Woo order; webhook settlement is authoritative.
- Do not claim full webhook ordering/idempotency solely from the event table.
- Do not claim admin sync recovers missed Paddle charges; `recent_charges` is empty.
- Do not claim refund support is production-ready in this snapshot.
- Do not claim Paddle chargebacks are fully surfaced in ArraySubs Gateway Health/dispute UI.
- Do not claim payout reconciliation is automatic.

### Competitive/comparison language

- Do not frame MoR as categorically better than a processor. It exchanges transaction-tax/merchant operations for provider control, approval scope, fees, payout timing and remote-schedule dependence.
- Do not claim Stripe or PayPal cannot support global subscriptions; compare architecture and responsibilities, not slogans.
- Do not imply Paddle is merely “Stripe plus tax.”

## Primary sources

### Paddle legal, eligibility, privacy and commercial relationship

1. Master Services Agreement: https://www.paddle.com/legal/terms
2. Buyer Terms: https://www.paddle.com/legal/buyer-terms
3. Refund Policy: https://www.paddle.com/legal/refund-policy
4. GDPR/privacy material: https://www.paddle.com/legal/gdpr
5. Prohibited/restricted products: https://www.paddle.com/help/start/intro-to-paddle/what-am-i-not-allowed-to-sell-on-paddle
6. VAT/tax responsibility overview: https://www.paddle.com/help/start/intro-to-paddle/how-paddle-is-able-to-take-on-your-vat-and-tax-responsibilities
7. How Paddle handles VAT: https://www.paddle.com/help/sell/tax/how-paddle-handles-vat-on-your-behalf
8. Chargebacks: https://www.paddle.com/help/manage/risk-prevention/understanding-chargebacks-with-paddle
9. Refund operation: https://www.paddle.com/help/manage/your-customers/how-do-i-issue-refunds
10. Payout timing: https://www.paddle.com/help/manage/get-paid/when-and-how-do-i-get-paid
11. Payout statements: https://www.paddle.com/help/manage/get-paid/what-statements-will-i-receive
12. Payout fees: https://www.paddle.com/help/manage/get-paid/is-there-a-fee-taken-for-payouts
13. Paddle, “How to evaluate a Merchant of Record”: https://www.paddle.com/resources/how-to-evaluate-a-merchant-of-record

### Paddle developer architecture

14. Go-live checklist: https://developer.paddle.com/build/go-live-checklist/
15. API authentication: https://developer.paddle.com/api-reference/about/authentication/
16. API versioning: https://developer.paddle.com/api-reference/about/versioning/
17. Products: https://developer.paddle.com/api-reference/products/
18. Prices: https://developer.paddle.com/api-reference/prices/
19. Create Price: https://developer.paddle.com/api-reference/prices/create-price/
20. Create products/prices: https://developer.paddle.com/build/products/create-products-prices/
21. Transactions: https://developer.paddle.com/api-reference/transactions/
22. Create Transaction: https://developer.paddle.com/api-reference/transactions/create-transaction/
23. Transaction build flow: https://developer.paddle.com/build/transactions/create-transaction/
24. Subscriptions: https://developer.paddle.com/api-reference/subscriptions/
25. Add/remove subscription items: https://developer.paddle.com/build/subscriptions/add-remove-products-prices-addons/
26. Replace subscription prices: https://developer.paddle.com/build/subscriptions/replace-products-prices-upgrade-downgrade/
27. Proration: https://developer.paddle.com/concepts/subscriptions/proration/
28. Trialing item-update restriction: https://developer.paddle.com/errors/subscriptions/subscription_trialing_items_update_invalid_options/
29. One-time subscription charge: https://developer.paddle.com/build/subscriptions/bill-add-one-time-charge/
30. Create subscription charge API: https://developer.paddle.com/api-reference/subscriptions/create-subscription-charge/
31. Pause API: https://developer.paddle.com/api-reference/subscriptions/pause-subscription/
32. Pause workflow: https://developer.paddle.com/build/subscriptions/pause-subscriptions/
33. Resume API: https://developer.paddle.com/api-reference/subscriptions/resume-subscription/
34. Cancel API: https://developer.paddle.com/api-reference/subscriptions/cancel-subscription/
35. Cancel workflow: https://developer.paddle.com/build/subscriptions/cancel-subscriptions/
36. Update payment details: https://developer.paddle.com/build/subscriptions/update-payment-details/
37. Customer portal session: https://developer.paddle.com/api-reference/customer-portals/create-customer-portal-session/

### Paddle webhooks, adjustments and reconciliation

38. Webhooks overview/catalog: https://developer.paddle.com/webhooks/
39. Delivery/order semantics: https://developer.paddle.com/webhooks/about/how-webhooks-work/
40. Responding/queue guidance: https://developer.paddle.com/webhooks/about/respond-to-webhooks/
41. Signature verification: https://developer.paddle.com/webhooks/about/signature-verification/
42. Sandbox retry context: https://developer.paddle.com/sdks/sandbox/
43. Create Adjustment: https://developer.paddle.com/api-reference/adjustments/create-adjustment/
44. Adjustment created: https://developer.paddle.com/webhooks/adjustments/adjustment-created/
45. Adjustment updated: https://developer.paddle.com/webhooks/adjustments/adjustment-updated/
46. Payout reconciliation report: https://developer.paddle.com/build/reports/payout-reconciliation/
47. 2026 payout report improvement: https://developer.paddle.com/changelog/2026/payout-reconciliation-report-improvements/
48. Sales-assisted invoice concept: https://developer.paddle.com/concepts/sell/sales-assisted-invoice/
49. Create/issue invoice: https://developer.paddle.com/build/invoices/create-issue-invoices/

### WooCommerce context

50. Subscription payment gateways: https://woocommerce.com/document/subscriptions/payment-gateways/
51. WooPayments subscriptions (comparison context only): https://woocommerce.com/document/woopayments/subscriptions/

Use WooCommerce documentation only to explain the ecosystem distinction between automatic and manual renewals and gateway-specific capability. The inspected ArraySubs product is its own subscription implementation.

## First-party code evidence index

### Paddle adapter

- `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleGateway.php`
  - constructor: gateway ID, Woo supports and ArraySubs capability flags;
  - event map: handled Paddle notification types;
  - `process_payment()`: initial checkout/transaction flow;
  - `process_refund()`: current Adjustment construction defects;
  - `processRenewalPayment()`: Paddle-scheduled renewal posture;
  - `capturePaymentContext()`: transaction/subscription/customer/display mapping;
  - `syncFromGateway()`: subscription retrieval and empty recent charges;
  - `restoreScheduledCancel()`: clears scheduled change;
  - pause/resume/cancel methods: remote lifecycle calls;
  - portal method: general customer portal URL;
  - webhook parsing/handlers: order and subscription mutation;
  - product/checkout item builders: Price-ID and mixed-cart behavior.
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleApiClient.php`
  - base URLs/authentication/timeout/retry;
  - Products, Prices, Transactions, Subscriptions, Adjustments, portal sessions;
  - pause/resume empty bodies;
  - signature verification/parser.
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleProductSync.php`
  - Product tax category;
  - Price amount/currency/cycle/trial;
  - metadata-key mismatch;
  - replacement Price/archive behavior.
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleBlocksPaymentMethod.php`
  - Blocks gateway registration/Store API context.
- `arraysubspro/src/resources/paddleCheckout.js`
  - classic Paddle.js overlay.
- `arraysubspro/src/resources/paddleCheckoutBlocks.js`
  - Blocks Paddle.js overlay.

### Shared automatic-payment services

- `arraysubspro/src/Features/AutomaticPayments/Services/CartRestrictions.php`
  - most-restrictive gateway policy;
  - same-cycle/different-cycle validation;
  - flexible billing/product-sync restriction.
- `arraysubspro/src/Features/AutomaticPayments/Services/WebhookRouter.php:47-108`
  - signature, parse, pre-handler duplicate check, dispatch, post-success remember.
- `arraysubspro/src/Features/AutomaticPayments/Services/DatabaseMigration.php:162-166`
  - unique gateway/event table key.
- `arraysubspro/src/Features/AutomaticPayments/Services/TwoWaySyncGuard.php:30`
  - 300-second guard.
- `arraysubspro/src/Features/AutomaticPayments/Services/Hooks.php:380-514`
  - generic remote synchronization and recent-charge reconciliation expectation.
- `arraysubspro/src/Features/AutomaticPayments/Services/Hooks.php:735-900`
  - cancellation scheduling/restore path.
- `arraysubspro/src/Features/AutomaticPayments/Services/PaymentMetaNormalizer.php`
  - order/subscription relation resolution.

### ArraySubs core product metadata

- `arraysubs/src/functions/product-helpers.php:100,116-117`
  - canonical `_subscription_interval`, `_trial_length`, `_trial_period` reads.
- `arraysubs/src/Features/SubscriptionProducts/Services/Hooks.php:459-462,574-577`
  - canonical product/variation field saves.
- `arraysubs/src/Features/SubscriptionProducts/Services/Hooks.php:1360-1380`
  - signup-fee/trial first-payment semantics in core.

## Final verification checklist for the writer/editor

- [ ] Recheck Paddle legal terms, eligibility and refund-policy effective dates.
- [ ] Recheck current Paddle price and payout schedule; avoid permanent numeric promises.
- [ ] Confirm article states “eligible software/digital products,” not all Woo products.
- [ ] Include MoR residual-duty matrix and professional-advice disclaimer.
- [ ] Correctly name Paddle, not ArraySubs, as remote renewal schedule owner.
- [ ] Explain Woo/ArraySubs/Paddle object mapping.
- [ ] Disclose current interval/trial metadata mismatch.
- [ ] Disclose stale Price behavior and existing-subscription non-migration.
- [ ] Treat signup fees, Woo fees/shipping/coupons/tax parity as unsupported/unverified.
- [ ] Do not claim plan switch/proration support.
- [ ] Explain pause-at-next-period and resume-immediate-charge defaults.
- [ ] Explain at-least-once/out-of-order webhooks and current dedupe race.
- [ ] Treat refund construction/async state as a blocker in this snapshot.
- [ ] State chargeback administration does not erase economic exposure.
- [ ] Distinguish Paddle buyer transaction document from Woo order record.
- [ ] Include three-way payout reconciliation.
- [ ] Cover classic and Blocks checkout test paths.
- [ ] Use 3–6 sanitized real plugin screenshots.
- [ ] Use context-specific visuals that do not fabricate UI.
- [ ] Include required internal links and only link unpublished A061+ after publication.
- [ ] End with Pro pricing CTA only after fit/limitations/test checklist.

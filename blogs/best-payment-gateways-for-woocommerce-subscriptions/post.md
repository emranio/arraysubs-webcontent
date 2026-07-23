---
title: "Best Payment Gateways for WooCommerce Subscriptions in 2026"
meta_description: "Compare Stripe, PayPal, Paddle, and manual renewal gateways for WooCommerce subscriptions by automation, SCA, recovery, tax ownership, fit, and risk."
focus_keyword: "best payment gateways for WooCommerce subscriptions"
published: "2026-02-11"
updated: "2026-06-29"
last_verified: "2026-06-29"
author: "Emran"
author_affiliation: "ArrayHash"
---

# Best Payment Gateways for WooCommerce Subscriptions in 2026

For most WooCommerce subscription stores, **Stripe is the best primary automatic-renewal gateway**, PayPal is the best additional wallet for customers who actively prefer it, and Paddle is the strongest ArraySubs option for eligible software and digital businesses that want a Merchant of Record. Manual renewals remain a valid choice for invoice-led B2B sales, bank transfer, and regional gateways. The right answer depends on the billing architecture, not the logo.

> **Key takeaways**
>
> - Choose who initiates renewals and who owns tax, disputes, refunds, and customer payment updates before comparing gateway brands.
> - ArraySubs Pro supports automatic recurring billing through Stripe, PayPal, and Paddle; ArraySubs Free creates manual renewal invoices that customers can pay with compatible WooCommerce methods.
> - Stripe offers the broadest fit for a conventional merchant-controlled WooCommerce checkout, but the merchant remains responsible for its commerce operations and tax obligations.
> - PayPal adds a familiar wallet and provider-managed subscription agreement, but the ArraySubs implementation intentionally limits one subscription per checkout and does not support mixed billing cycles in one cart.
> - Paddle can remove substantial tax and payment-operations work as Merchant of Record, but it is designed for eligible software and digital products—not ordinary physical subscription boxes or human-delivered services.
> - Gateway Health, verified webhooks, failed-payment recovery, idempotency, and a tested customer payment-update path matter more to recurring revenue than a beautiful first checkout alone.

## The short verdict: which subscription gateway should you choose?

Use this starting point, then apply the hard gates and test plan later in this guide.

| Store situation | Strongest starting option | Why it fits | Main caution |
| --- | --- | --- | --- |
| Typical physical or digital subscription sold through WooCommerce | **Stripe with ArraySubs Pro** | Site-initiated automatic renewals, a conventional WooCommerce checkout, saved payment methods, local order records, and strong testing tools | You remain the merchant responsible for tax, refunds, disputes, compliance, and operational monitoring |
| Audience explicitly asks for PayPal | **PayPal alongside Stripe** | Familiar PayPal approval and a provider-managed subscription agreement | One subscription per checkout in the current ArraySubs adapter; cart and update-payment constraints need testing |
| Eligible SaaS, app, downloadable product, or digital subscription sold globally | **Paddle with ArraySubs Pro** | Merchant-of-Record model can take responsibility for covered payments, indirect tax, invoicing, refunds, and compliance | Product eligibility is narrow; physical goods and most human services are generally not a fit |
| B2B invoice, bank transfer, cheque, cash, or regional gateway | **Manual renewal with ArraySubs Free** | Works with the operational reality that a person or accounts-payable team approves each payment | It is not automatic: every cycle adds friction, delay, and collection work |
| Store needs several customer-preferred payment choices | **Stripe primary, PayPal secondary** | Covers card-first checkout and wallet-led demand without forcing one method on everyone | Every extra path expands QA, support, reconciliation, and webhook monitoring scope |

This is not a universal ranking. If Stripe cannot onboard your business or country, it is not the best gateway for you. If your software company specifically wants a Merchant of Record, optimizing a direct Stripe stack may solve the wrong problem. If a procurement team requires a purchase order and bank transfer, forcing card automation can reduce rather than improve conversion.

![Four business-model scenes show why a subscription box, membership, B2B invoice, and global software product can require different gateway architectures.](/blogs/best-payment-gateways-for-woocommerce-subscriptions/business-model-gateway-fit.png)

## First decide what kind of recurring billing system you want

The phrase “payment gateway” hides four materially different systems.

### 1. Site-initiated automatic renewal

Your WooCommerce subscription system decides that a payment is due, creates the renewal order, and asks a gateway such as Stripe to charge a saved payment method. This provides strong local control over the subscription lifecycle. It also means your store must schedule reliably, retain a valid token reference, submit an off-session payment correctly, process the gateway response, and reconcile any later webhook.

Stripe is the clearest ArraySubs example of this pattern. ArraySubs Pro schedules renewal processing, generates a WooCommerce renewal order, and uses the saved payment token through the installed Stripe integration. The current implementation also applies duplicate-charge safeguards around scheduled processing. That local control is valuable, but only if cron, Action Scheduler, tokens, gateway credentials, and webhook delivery are healthy.

### 2. Provider-managed automatic renewal

The payment provider holds a remote subscription agreement and decides when to make each recurring charge. Your WooCommerce store mirrors that remote lifecycle through webhooks and local records. PayPal and Paddle use this pattern in the current ArraySubs integrations, although their commercial models differ.

Provider-managed billing reduces some scheduling responsibility inside WordPress, but it makes webhook reliability and state reconciliation essential. A renewal can succeed remotely while the corresponding message is delayed locally. A local cancellation request can fail before the remote agreement changes. Your support team therefore needs to understand both the WooCommerce order and the provider-side object.

### 3. Merchant-of-Record billing

A Merchant of Record is not merely another card processor. For covered transactions, the MoR sells to the customer and assumes defined operational and regulatory responsibilities such as payment processing, tax calculation and remittance, invoicing, refunds, chargebacks, and consumer-compliance work. Paddle describes this model in its [Merchant-of-Record evaluation guide](https://www.paddle.com/resources/how-to-evaluate-a-merchant-of-record).

That responsibility transfer can be a strategic advantage for an eligible global software business. It also changes checkout, customer communications, accounting, refunds, pricing, and legal relationships. Paddle explicitly restricts what may be sold; its guidance says [physical goods and human services are generally not allowed](https://www.paddle.com/help/start/intro-to-paddle/what-am-i-not-allowed-to-sell-on-paddle). A physical coffee subscription should not choose Paddle merely because the tax proposition sounds attractive.

### 4. Manual renewal invoice

The subscription system creates a renewal order and invoice, but the customer or buyer must take action to pay it. ArraySubs Free supports this path. It can be appropriate for bank transfer, cheque, cash, purchase-order workflows, high-value B2B contracts, or a WooCommerce gateway outside the automatic list.

Manual is not a defective version of automatic billing. It is a different collection model. Its costs appear in days-sales-outstanding, reminders, human follow-up, service-access policy, and churn from forgotten invoices. Read [Manual vs Automatic Subscription Renewals in WooCommerce](/billing-strategy/manual-vs-automatic-subscription-renewals-in-woocommerce/) before treating the two modes as interchangeable.

![A technical cutaway traces site-initiated, provider-managed, Merchant-of-Record, and manual-invoice renewal paths.](/blogs/best-payment-gateways-for-woocommerce-subscriptions/gateway-billing-architecture.png)

WooCommerce likewise distinguishes automatic and manual subscription renewals: an automatic gateway charges without the customer returning, while a manual renewal produces an order the customer must pay. Its [subscription payment-gateway documentation](https://woocommerce.com/document/subscriptions/payment-gateways/) is useful ecosystem context, although individual subscription plugins and gateway adapters can support different feature sets.

## What the current ArraySubs gateway screen actually shows

The staged WooCommerce payment-method screen below was captured on July 20, 2026. It shows the three ArraySubs Pro recurring integrations—Paddle, PayPal, and Stripe—alongside other installed WooCommerce payment methods. A method appearing in WooCommerce does **not** automatically mean it can charge ArraySubs renewals without customer action. Automatic renewal support is an explicit integration capability.

![Annotated WooCommerce payment methods screen identifying Paddle, PayPal, and Stripe recurring options.](/blogs/best-payment-gateways-for-woocommerce-subscriptions/woocommerce-payment-gateways.png)

For the inspected release:

- **ArraySubs Free** supports manual renewal orders and invoices. Customers may use a compatible enabled WooCommerce payment method when they return to pay.
- **ArraySubs Pro + Stripe** supports site-initiated automatic recurring charges through a stored token and the official WooCommerce Stripe gateway.
- **ArraySubs Pro + PayPal** creates and tracks a remote PayPal subscription agreement, with renewals reported back through PayPal events.
- **ArraySubs Pro + Paddle** creates and tracks remote Paddle subscriptions and renewal transactions in a Merchant-of-Record flow.

The distinction affects nearly every later decision: what can share a cart, who retries a failure, where the customer updates a card, which system creates the authoritative renewal, how refunds work, and what evidence support needs during an incident.

## Stripe, PayPal, Paddle, and manual renewals compared

| Criterion | Stripe + ArraySubs Pro | PayPal + ArraySubs Pro | Paddle + ArraySubs Pro | Manual + ArraySubs Free |
| --- | --- | --- | --- | --- |
| Renewal initiator | ArraySubs/WooCommerce | PayPal agreement | Paddle subscription | Customer or buyer after invoice |
| Local WooCommerce renewal order | Yes | Yes, synchronized from provider events | Yes, synchronized from provider events | Yes |
| Saved-payment model | Gateway token used for off-session charge | Buyer-approved remote subscription | Remote subscription and Paddle-managed payment method | No automatic token required |
| Customer action each normal cycle | Normally no | Normally no | Normally no | Yes |
| SCA/3DS model | Initial setup plus exemption/step-up and recovery where required | Handled through PayPal approval and provider experience | Handled through Paddle checkout/provider experience | Happens when the customer actively pays, if the chosen gateway requires it |
| Payment-method update | WooCommerce/Stripe saved-method workflow, subject to integration behavior | Current ArraySubs path reauthorizes/replaces the remote agreement | Paddle customer-portal workflow | Customer chooses an available method on each invoice |
| Failed-payment retry owner | ArraySubs recovery policy plus Stripe response/webhooks | PayPal plan and agreement behavior plus ArraySubs synchronization | Paddle subscription/recovery behavior plus ArraySubs synchronization | Merchant reminder and collection process |
| Refund path | WooCommerce Stripe/admin and Stripe rules | Provider sale/refund path; verify current adapter behavior | Paddle adjustment/refund workflow | Depends on the gateway used for that invoice |
| Merchant of Record | Merchant | Merchant | Paddle for covered eligible sales | Merchant |
| Physical goods | Strong general fit if the business is supported | Often a useful secondary option | Generally not eligible | Often practical |
| Different subscription cycles in one cart | Supported by the local subscription/order model, subject to checkout and product rules | Not supported by the current ArraySubs adapter | Not supported by the current ArraySubs adapter | Each renewal is manually payable |
| Main operational dependency | Scheduler, token, Stripe API, and webhooks | Remote agreement and PayPal webhooks | Remote catalog/subscription and Paddle webhooks | Invoice delivery, customer action, and follow-up |

This table describes the verified ArraySubs integration behavior, not every capability advertised by each provider. Vendor platforms are broader than any one WordPress adapter. Always evaluate the exact combination of plugin version, WooCommerce version, gateway extension, account country, product type, and provider account.

## Why Stripe is the best overall choice for many WooCommerce subscription stores

Stripe is usually the strongest default when the merchant wants WooCommerce to remain the center of checkout and subscription operations. It supports a familiar card-led experience, saved payment information, off-session charges, refunds, and a large developer ecosystem without requiring a separate remote product-and-plan catalog for the basic ArraySubs billing model.

The official WooCommerce Stripe extension documents [saved payment information and customer management](https://woocommerce.com/document/stripe/customer-experience/saved-payment-information/) as well as [3D Secure support](https://woocommerce.com/document/stripe/customer-experience/3d-secure/). Stripe’s SetupIntent documentation explains why a payment method prepared for future off-session use can establish the appropriate customer permission and authentication context, while also warning that a later charge can still require recovery or authentication ([Stripe SetupIntents](https://docs.stripe.com/payments/setup-intents)).

### What Stripe does especially well

- It keeps the primary checkout and renewal-order model close to WooCommerce.
- It supports site-initiated charging, which gives the subscription engine control over due dates, lifecycle checks, order creation, and local recovery policy.
- The official gateway exposes tokenization and admin refund tooling; WooCommerce documents [processing Stripe refunds from WooCommerce](https://woocommerce.com/document/stripe/admin-experience/refunding-orders/).
- Stripe provides mature test-mode tools, event records, and webhook diagnostics.
- The architecture is a natural fit for physical subscriptions, memberships, services, and digital goods when the merchant is eligible and prepared to own the commerce obligations.

### What Stripe does not remove

Stripe processing does not normally make Stripe the Merchant of Record. The merchant remains responsible for the sale, customer relationship, tax position, refunds, disputes, and applicable compliance; Stripe explains this distinction in its [Merchant-of-Record overview](https://stripe.com/resources/more/merchant-of-record). Stripe Tax can help calculate and collect tax, but its documentation still distinguishes registration, collection, reporting, filing, and remittance responsibilities ([how Stripe Tax works](https://docs.stripe.com/tax/how-tax-works)). Obtain qualified tax and legal advice for the countries and product types you serve.

Availability is also not universal. Check [Stripe’s supported countries and regions](https://stripe.com/global), the settlement currencies available to your account, and method-specific off-session support before choosing it. Stripe can be excellent and still be unavailable or commercially unsuitable for a particular merchant.

### Stripe-specific ArraySubs strengths

The current integration uses the official WooCommerce Stripe gateway rather than presenting a parallel card form. ArraySubs Pro coordinates the subscription lifecycle and renewal order; Stripe handles the payment credential and transaction. The inspected code also includes safeguards around scheduled renewal processing so the same subscription is not casually charged twice by overlapping workers.

For setup details, use the focused [Stripe automatic billing and SCA recipe](/deals/arraysubs/use-cases/recipes/stripe-automatic-billing-sca/) instead of treating this comparison as a configuration manual.

## Why PayPal is often the best second option

PayPal earns its place because customer preference can be decisive. Some buyers trust a PayPal wallet more than entering a card directly, and some want to approve or manage recurring payment relationships from their PayPal account. PayPal’s subscription platform follows a remote product → plan → buyer approval → subscription model ([PayPal Subscriptions](https://developer.paypal.com/platforms/subscriptions)).

In ArraySubs Pro, that remote agreement is materially different from a local Stripe token. PayPal owns the recurring agreement and reports lifecycle events to the store. Its subscription webhook catalog includes completed sales, failures, refunds, reversals, cancellations, expirations, and suspensions ([PayPal subscription webhooks](https://developer.paypal.com/docs/subscriptions/reference/webhooks/)).

### When PayPal is compelling

- Analytics or customer interviews show meaningful PayPal demand.
- The audience values wallet approval and provider-side agreement visibility.
- The business can support a separate provider-managed lifecycle and reconciliation process.
- PayPal receiving, withdrawal, subscription, and currency capabilities are confirmed for the merchant account and customer markets.

### Current ArraySubs PayPal constraints to plan around

The current adapter allows one subscription per checkout and rejects incompatible mixed subscription cycles. This is not a cosmetic cart limitation. A single remote agreement needs one coherent billing structure. If your acquisition strategy depends on customers combining several unrelated subscription cadences, Stripe’s locally orchestrated model is usually more flexible.

Updating the payment source also differs from editing a local card token. The inspected ArraySubs flow reauthorizes or replaces the PayPal agreement rather than pretending an arbitrary saved card can be swapped in place. Support scripts, account pages, emails, and cancellation policy must reflect that reality.

PayPal can manage failed-payment behavior at the plan/agreement level; its documentation describes [payment failure thresholds and retry behavior](https://developer.paypal.com/docs/multiparty/subscriptions/customize/payment-failure-retry/). Your local system still needs to process the resulting events correctly. Do not run a local retry policy and a remote retry policy blindly, because duplicate or confusing collection attempts are worse than a conservative recovery sequence.

![Annotated ArraySubs PayPal settings screen showing a safe sandbox-first setup with an empty credential field.](/blogs/best-payment-gateways-for-woocommerce-subscriptions/paypal-sandbox-setup.png)

The screenshot deliberately shows sandbox mode and blank credentials. Never publish live client secrets in documentation, tickets, screenshots, or analytics. Establish the webhook, run an approval in sandbox, trigger a renewal, observe the resulting order, cancel the agreement, and inspect the event trail before enabling live checkout.

## When Paddle is the best strategic choice

Paddle is the most differentiated option in this comparison because it changes commercial responsibility, not just payment mechanics. For eligible software and digital products, Paddle acts as Merchant of Record. That can consolidate covered payment processing, sales-tax/VAT calculation and remittance, compliant invoicing, refunds, chargebacks, fraud handling, and parts of consumer-compliance operations.

![A responsibility-handoff scene contrasts a Merchant-of-Record route with a merchant carrying payment, tax, invoice, refund, and compliance work directly.](/blogs/best-payment-gateways-for-woocommerce-subscriptions/merchant-of-record-responsibilities.png)

### The strongest Paddle fit

- SaaS and downloadable software.
- Apps, digital tools, and eligible recurring digital content.
- A business selling into many tax jurisdictions without wanting to assemble its own registration, calculation, filing, and remittance operation.
- A team willing to adopt Paddle’s checkout, catalog, subscription, refund, portal, and reporting model.

### The wrong Paddle fit

- Physical subscription boxes.
- Human-delivered consulting, coaching, agency, or similar services that fall outside the acceptable-use model.
- A merchant that must remain the seller of record for commercial or contractual reasons.
- A store that requires arbitrary mixed subscription cycles in one checkout through the current ArraySubs adapter.
- A team expecting Paddle to behave like a drop-in direct card processor while keeping every existing operational assumption unchanged.

Paddle creates renewal transactions for remote subscriptions and documents that behavior in its [transaction guide](https://developer.paddle.com/build/transactions/create-transaction/). It also provides a customer portal that can expose payments, invoices, subscription management, cancellation, and payment-method updates ([Paddle customer portal](https://developer.paddle.com/concepts/sell/customer-portal/)). Temporary management links should be generated when needed, not stored indefinitely, according to Paddle’s [payment-update guidance](https://developer.paddle.com/build/subscriptions/update-payment-details/).

Refunds are another architectural difference. Paddle represents them through adjustment records, and a live refund may begin in a pending state rather than instantly mean “money returned” ([Paddle adjustments](https://developer.paddle.com/build/transactions/create-transaction-adjustments/)). Customer-support macros and local status handling should distinguish a requested refund from an approved/completed one.

![Annotated ArraySubs Paddle settings screen highlighting sandbox mode and the credential field without exposing a live API key.](/blogs/best-payment-gateways-for-woocommerce-subscriptions/paddle-sandbox-setup.png)

The ArraySubs Pro integration synchronizes the relevant remote product/price/subscription context and listens for Paddle events. That reduces neither the need for test-mode work nor the need for webhook monitoring. It changes which system is authoritative at each step.

## When manual renewals are the better business decision

Automatic renewal is powerful, but it is not synonymous with a professional subscription business. Manual invoices can be more appropriate when:

- a finance team requires a purchase order, approval chain, or bank transfer;
- contract values are high and customer count is modest;
- the buyer wants to choose a payment source each period;
- card-on-file consent is undesirable or unavailable;
- a regional WooCommerce gateway is strategically important but has no ArraySubs automatic adapter;
- the subscription represents an invoiceable relationship rather than low-touch consumer continuity.

ArraySubs Free creates the renewal order/invoice and keeps the WooCommerce order record in the store. The customer returns to pay with an enabled compatible method. This broadens gateway reach, because the gateway only needs to process the active invoice—it does not need a tokenized automatic-renewal contract with ArraySubs.

The tradeoff is operational. Measure:

```text
manual collection cost per renewal
= reminder cost
+ accounts-receivable time
+ support contacts
+ service interruption handling
+ avoidable involuntary churn
+ delayed cash cost
```

If that cost is low relative to order value and the procurement experience is expected, manual may be correct. For a $15 consumer subscription, it is often destructive. For a $12,000 annual B2B renewal, it can be completely normal.

## Use hard gates before a weighted score

A spreadsheet score should never allow a gateway to “win” despite being legally unavailable or technically incompatible. Apply these hard gates first:

1. **Merchant eligibility:** Can the provider onboard your legal entity, country, industry, and product?
2. **Product eligibility:** Does the provider allow physical goods, services, software, memberships, regulated products, or your specific risk category?
3. **Currency and settlement:** Can it accept the customer currency and settle into the required business account on workable terms?
4. **Recurring capability in the exact adapter:** Does the installed ArraySubs/gateway combination support automatic renewals—not just initial checkout?
5. **Cart model:** Does it support the number of subscriptions, products, quantities, and billing cadences your cart permits?
6. **Compliance architecture:** Must you remain Merchant of Record, or do you specifically want an MoR?
7. **Customer payment update:** Is there a safe, understandable path before and after a failure?
8. **Operational ownership:** Can the team monitor the scheduler, API credentials, webhooks, disputes, refunds, and recovery queue this architecture creates?

Only score the survivors.

## A practical weighted scoring framework

![An operations team weighs renewal automation, cart fit, geography, recovery, and accounting responsibilities on a gateway decision workbench.](/blogs/best-payment-gateways-for-woocommerce-subscriptions/gateway-decision-workbench.png)

For a conventional direct-to-consumer WooCommerce subscription, start with these weights and adapt them to evidence from your business:

| Evaluation criterion | Suggested weight | What to verify |
| --- | ---: | --- |
| Renewal reliability and observability | 25% | Idempotency, retries, webhooks, logs, status reconciliation, scheduler health |
| Checkout and cart fit | 20% | Conversion, mobile flow, multiple subscriptions, mixed cycles, trials, coupons, product types |
| Customer and regional fit | 15% | Merchant availability, buyer preference, currencies, settlement, local methods |
| Failed-payment recovery | 15% | Retry owner, authentication-required recovery, payment update, emails, grace period |
| Finance and compliance operating model | 15% | MoR status, tax, invoices, refunds, disputes, export/reconciliation |
| Implementation and support cost | 10% | Credentials, catalogs, environments, documentation, support capability, ongoing maintenance |

Score each viable option from 1 to 5, multiply by the weight, and document the evidence behind every score.

```text
weighted gateway score
= sum of each criterion's
  weight times its rating
```

Do not give Stripe a 5 for “global” because you have heard it is global; confirm the merchant country, settlement, currency, and required payment method. Do not give Paddle a 5 for tax because the product may be ineligible. Do not give PayPal a 5 for cart fit before testing the exact combination of products and cycles. A defensible score links to account-specific facts and test results.

### Worked example: a quarterly physical subscription box

Assume the company sells one physical box per subscription, ships domestically, wants automatic quarterly collection, and sees PayPal requested in 18% of pre-sale surveys.

- Paddle fails the product-eligibility hard gate.
- Manual bank transfer remains available for exceptional B2B buyers but scores poorly for consumer automation.
- Stripe scores highest as the primary card method because the WooCommerce checkout, order, shipping, local renewal, and token model fit.
- PayPal earns a secondary role because customer demand is measurable, even though the remote agreement needs a separate QA and support path.

The answer is not “Stripe beat PayPal.” The architecture is “Stripe primary, PayPal optional, manual exception,” with separate monitoring and checkout constraints documented.

### Worked example: global downloadable design software

Assume a small team sells only eligible downloadable software, has customers in dozens of jurisdictions, and regards indirect-tax operations as a major distraction.

- Stripe remains technically strong, but the business must build or buy a tax-registration, calculation, filing, remittance, invoice, and dispute operation appropriate to its obligations.
- Paddle may score higher because the MoR model directly addresses the team’s operating constraint.
- PayPal may still be useful only if the chosen commercial/payment architecture supports the desired wallet experience without fragmenting customer support.

In this example, a higher processing price could still be economically rational if the avoided compliance and operations cost is real. Compare total operating cost and responsibility, not the headline transaction rate alone. Pricing changes over time and differs by country, method, currency, and contract, so verify current account-specific terms directly with each provider rather than relying on a static roundup.

## SCA and 3D Secure: what “supports recurring payments” really means

Strong Customer Authentication does not mean every renewal must interrupt the customer, nor does an initially authenticated card guarantee that every later off-session charge will succeed. A good recurring architecture establishes permission and authentication context during signup, marks later payments correctly, uses available exemptions or merchant-initiated treatment where applicable, and provides a recovery path if the issuer still requires customer action.

Stripe explains the off-session model in its [SCA documentation](https://docs.stripe.com/strong-customer-authentication?locale=en-GB). The exact result depends on the payment method, account region, issuer, mandate, risk decision, and integration. Do not advertise “SCA-proof” or “guaranteed frictionless renewals.” Test these outcomes instead:

- initial checkout succeeds with 3DS;
- initial checkout succeeds without a challenge where permitted;
- the stored method is attached to the correct customer;
- an off-session renewal succeeds;
- a declined renewal enters the expected ArraySubs recovery state;
- an authentication-required renewal produces an actionable customer path;
- updating the method actually changes what the next renewal uses;
- the successful recovery does not create a second charge.

The next article in this cluster will cover [SCA and 3D Secure for subscription renewals](/payments-and-compliance/sca-and-3d-secure-for-subscription-renewals/) in depth. Until then, treat SCA as an end-to-end lifecycle concern rather than a checkout badge.

## Gateway Health is part of the gateway decision

Most gateway comparisons stop at method coverage and transaction fees. Recurring revenue fails later: an expired secret, disabled webhook, stale remote plan, cron outage, signature mismatch, authentication requirement, duplicate event, or payment source that can no longer be charged.

ArraySubs Pro includes Gateway Health so the operator can see configured gateway status, webhook state, renewal activity, and recent events from the same subscription environment. The staging screen below shows separate Paddle, PayPal, and Stripe health cards plus a webhook event log.

![Annotated ArraySubs Gateway Health screen showing status cards for Paddle, PayPal, and Stripe plus recent webhook activity.](/blogs/best-payment-gateways-for-woocommerce-subscriptions/arraysubs-gateway-health.png)

The expanded Stripe view distinguishes the official WooCommerce Stripe webhook from the secondary ArraySubs endpoint. That distinction matters because checkout can appear healthy while the event path used for subscription reconciliation is not.

![Annotated expanded Stripe Gateway Health card showing official and secondary webhook status areas.](/blogs/best-payment-gateways-for-woocommerce-subscriptions/stripe-webhook-health.png)

Use the [Gateway Health monitoring recipe](/deals/arraysubs/use-cases/recipes/gateway-health-monitor/) for the product-specific workflow. Operationally, assign owners and escalation thresholds:

| Signal | First owner | Initial response |
| --- | --- | --- |
| Credential invalid/expired | Engineering or platform operations | Disable risky rollout, rotate safely, run test transaction |
| Webhook missing or signature failure | Engineering | Verify endpoint, secret, delivery logs, response, and replay policy |
| Renewal failures spike | Revenue operations + support | Segment by gateway/failure code; pause unsafe retries; communicate where needed |
| Remote/local status mismatch | Engineering + support | Inspect provider object, local subscription, orders, and event history before editing state |
| Refund remains pending | Finance/support | Confirm provider status and customer message; do not state completion prematurely |
| Duplicate event arrives | Engineering | Confirm idempotent processing and one financial effect |

Monitoring is not an optional add-on to the “best” gateway. It is part of the definition.

## Customer payment updates can decide which system survives failure

A subscription gateway is only as durable as its update-payment path. Customers replace expired cards, close accounts, change wallets, or need to authenticate a previously stored method. The flow should answer four questions clearly:

1. Where does the customer start: WooCommerce account, provider portal, or a recovery invoice?
2. Does the update affect one subscription or every future payment tied to that customer?
3. Does it replace a local token, create a new remote agreement, or update a provider-managed subscription?
4. Does the failed renewal retry automatically afterward, or must the customer/admin trigger another action?

ArraySubs exposes a member update-payment workflow, but the underlying action differs by gateway. Read the focused [member payment-update recipe](/deals/arraysubs/use-cases/recipes/member-update-payment/) and test it for every enabled gateway. A support article that says only “update your card” is insufficient when PayPal requires reauthorization or Paddle sends the customer through a provider portal.

## Build a failure and recovery policy before launch

For Stripe, your local renewal system receives the charge result and can apply an ArraySubs recovery policy. For PayPal or Paddle, provider-side retries and events influence the local lifecycle. Manual renewal requires reminders and a customer payment. These are not three skins over the same state machine.

Define:

- how many attempts may occur and who initiates them;
- the spacing between attempts;
- whether service enters a grace period;
- which failure codes should never be retried without an update;
- when and how the customer receives a secure payment link;
- when the subscription becomes on-hold, cancelled, or expired;
- how a late successful event restores access;
- how duplicate processing is prevented;
- which team reviews stuck or mismatched states.

Use [Failed Subscription Payment Recovery for WooCommerce](/payment-recovery/failed-subscription-payment-recovery-for-woocommerce/) and [Automatic Retry for Failed Subscription Payments](/payment-recovery/automatic-retry-for-failed-subscription-payments-what-good-looks-like/) to design that policy. A gateway with a slightly lower headline fee can be more expensive if its failure recovery creates avoidable churn and support work.

## Pre-launch test plan for every automatic gateway

Do not declare a gateway production-ready after one successful signup. Use a sandbox or test account that mirrors the live configuration as closely as possible, then retain evidence for every result.

### Common lifecycle tests

1. Enable only the intended test credentials and confirm the environment cannot accidentally create a live charge.
2. Buy a simple subscription with no trial or signup fee.
3. Buy a subscription with each supported trial, signup fee, coupon, shipping, and tax condition in scope.
4. Confirm the parent order, subscription record, totals, dates, customer, gateway identifiers, and scheduled actions.
5. Trigger or advance a renewal and confirm exactly one financial transaction and one correct renewal order.
6. Repeat the renewal with an intentional decline.
7. Verify status, notes, attempt count, customer email, retry schedule, and access/grace behavior.
8. Update the payment method through the real customer journey.
9. Recover the failed payment and confirm the subscription returns to the expected state.
10. Cancel from the customer side and from the admin side where supported; verify the remote agreement and scheduled actions.
11. Refund a renewal, then inspect local order state, provider state, customer communication, and future subscription behavior.
12. Deliver the same webhook more than once and confirm one business effect.
13. Delay or omit a webhook, then establish how the store detects and reconciles the mismatch.
14. Disable the plugin, rotate a credential, or interrupt a scheduled job in staging and rehearse recovery.

### Stripe tests

- ordinary stored-card renewal;
- 3DS at checkout;
- off-session success;
- authentication-required failure and customer recovery;
- expired/declined card;
- official and ArraySubs webhook delivery;
- refund from WooCommerce;
- retry after a payment-method update;
- two workers attempting the same due renewal.

WooCommerce documents how current versions of its Stripe extension create and verify webhooks in [Stripe webhook setup and configuration](https://woocommerce.com/document/stripe/setup-and-configuration/stripe-webhooks/).

### PayPal tests

- buyer approval and return;
- remote agreement ID stored locally;
- completed sale event creates/updates one renewal order;
- payment failure and provider retry behavior;
- agreement cancellation and suspension;
- payment update/reauthorization;
- rejected cart containing multiple subscriptions or incompatible cycles;
- sandbox webhook delivery, replay, and signature handling.

### Paddle tests

- product and price synchronization;
- eligible product checkout;
- remote subscription creation;
- renewal transaction and webhook;
- customer-portal payment update;
- cancellation and pause/resume behavior in scope;
- refund/adjustment pending and completed states;
- rejected physical/service product policy before implementation;
- webhook signature verification following [Paddle’s signature guidance](https://developer.paddle.com/webhooks/about/signature-verification/).

### Manual renewal tests

- renewal order is generated on the correct date;
- customer receives the invoice and can reach a secure pay page;
- every intended WooCommerce payment method appears and works;
- duplicate reminders do not send;
- late payment restores the right service state;
- nonpayment follows the grace/cancellation policy;
- finance can reconcile the payment to the renewal and subscription.

## Migration is a billing project, not a settings change

Switching the enabled gateway for new checkout is easy. Moving existing subscriptions is hard because payment credentials are provider-specific, remote agreements may remain active, customer consent may need to be renewed, and both old and new systems can attempt to collect.

![A guarded migration bridge moves subscription records and secure credentials in controlled batches while a collision path warns against duplicate charges.](/blogs/best-payment-gateways-for-woocommerce-subscriptions/gateway-migration-guardrails.png)

Before migration:

- inventory every active, trialing, on-hold, past-due, cancelled, and scheduled subscription;
- identify the gateway, remote agreement, token ownership, next charge, currency, price, tax, and renewal schedule;
- determine whether tokens or agreements are legally and technically portable;
- obtain provider-specific migration approval where needed;
- freeze ambiguous lifecycle changes during each cutover cohort;
- establish an idempotency key and authoritative collection system;
- run a small internal cohort, then a low-risk customer cohort;
- monitor webhooks and bank settlements on both platforms;
- keep a customer communication and reauthorization plan;
- define a rollback that does not reactivate the old collector blindly.

Never represent a database copy as a payment-token migration. Never cancel all old agreements before confirming the replacement can collect. Never leave two schedulers believing they own the same next payment. The safest migration may require asking customers to reauthorize, even if that adds friction.

## Where ArraySubs fits—and where it does not

ArraySubs is designed to give WooCommerce stores a coherent subscription product, lifecycle, renewal-order, customer-portal, and operations layer. [ArraySubs payment-gateway features](/deals/arraysubs/features/#payment-gateways) connect that system to automatic Stripe, PayPal, and Paddle workflows in Pro, while Free supports manual renewal invoicing.

Useful capabilities around the gateway include:

- subscription products and recurring schedules;
- local subscription and renewal-order records;
- scheduled renewal processing and lifecycle actions;
- manual and automatic billing modes;
- Stripe, PayPal, and Paddle automatic integrations in Pro;
- customer payment-update workflows appropriate to the gateway;
- failed-payment retries, grace periods, and recovery controls;
- Gateway Health and webhook visibility;
- cancellation, renewal-date, plan-change, and customer-portal workflows;
- shared WooCommerce product, order, tax, shipping, and email context.

ArraySubs is not the right fit if the business needs an unsupported automatic gateway and refuses manual renewal, if the product violates the chosen provider’s rules, if the desired cart structure conflicts with a remote agreement, or if the team will not operate WordPress scheduling and webhook infrastructure. It also does not replace qualified legal, tax, accounting, payments-risk, or data-protection advice.

Once the architecture is clear, [view ArraySubs Pro pricing](/deals/arraysubs/pricing/) to compare the automatic gateway and operations features. Keep the product evaluation separate from the gateway’s own account eligibility, pricing, and terms.

## Final recommendation

For a typical eligible WooCommerce subscription merchant, start with **Stripe through ArraySubs Pro** as the primary automatic-renewal path. Add **PayPal** when actual customer demand justifies the second lifecycle. Choose **Paddle** when an eligible software or digital business deliberately wants a Merchant-of-Record operating model. Use **manual renewals through ArraySubs Free** when invoice approval, bank transfer, a regional method, or low-volume B2B collection makes customer action appropriate.

Then make the choice defensible:

1. Apply merchant, product, region, currency, cart, and compliance hard gates.
2. Score only viable options against renewal reliability, checkout, recovery, operations, and total cost.
3. Test the complete lifecycle—not only signup.
4. Monitor credentials, schedulers, remote state, webhook delivery, failures, refunds, and customer payment updates.
5. Document who owns every step and rehearse the failure paths before launch.

The best subscription gateway is the one whose billing architecture your business can legally use, customers will complete, and operators can keep correct through thousands of quiet renewals and the inevitable difficult ones.

## Frequently asked questions

### Which payment gateway is best for WooCommerce subscriptions?

Stripe is the best general starting point for many eligible WooCommerce stores because it supports a merchant-controlled checkout and site-initiated automatic renewal through ArraySubs Pro. PayPal is a valuable additional wallet, Paddle is better for eligible digital businesses seeking a Merchant of Record, and manual billing fits invoice-led workflows.

### Does every WooCommerce gateway support automatic subscription renewals?

No. A gateway that can collect a one-time WooCommerce order does not automatically support tokenized or provider-managed recurring billing. In ArraySubs, Pro provides explicit automatic integrations for Stripe, PayPal, and Paddle. Free creates manual renewal orders payable by customer action through compatible enabled methods.

### Can I offer Stripe and PayPal together?

Yes, when both accounts and integrations are correctly configured. Treat them as separate architectures in QA: Stripe renewals are locally initiated with a saved token, while PayPal uses a remote agreement and provider events. Confirm cart constraints, payment updates, cancellations, failures, refunds, and webhook reconciliation for both.

### Is Paddle better than Stripe for VAT and sales tax?

Paddle can be operationally simpler for eligible covered sales because it acts as Merchant of Record and assumes defined tax and compliance responsibilities. Direct Stripe processing normally leaves the merchant as Merchant of Record. But Paddle does not accept every product type, and the correct legal/tax treatment depends on your facts and contracts. Obtain professional advice.

### Can Paddle sell physical subscription boxes?

Generally no. Paddle’s acceptable-use guidance says physical goods and human services are not the intended product fit. Confirm eligibility directly with Paddle before designing the checkout. Use a direct gateway such as Stripe or PayPal, or manual renewal, for an eligible physical-goods model.

### Are manual renewals bad for retention?

They add customer action and can increase delayed or missed payments, especially for low-touch consumer plans. They can still be appropriate for B2B procurement, purchase orders, bank transfer, large annual invoices, and markets where automatic methods are unsuitable. Measure collection cost and churn rather than assuming one answer.

### Does SCA mean customers must approve every renewal?

No. Correctly established off-session recurring payments may use applicable exemptions or merchant-initiated treatment, but an issuer can still require customer authentication. The system needs a secure recovery path when that happens. Results vary by region, method, issuer, mandate, and integration.

### What should I monitor after launch?

Monitor due and completed renewals, failure rates and codes, retry queues, Action Scheduler/cron health, credential status, webhook delivery/signature errors, remote/local state mismatches, payment-update completion, cancellations, refunds, disputes, and duplicate-event handling. Review by gateway and cohort rather than only the blended success rate.

### Can existing subscriptions be moved to another gateway?

Sometimes, but not by simply changing a WordPress setting. Tokens and remote agreements may not be portable, provider approval may be required, and customers may need to reauthorize. Build a cohort migration with one authoritative collector, duplicate-charge safeguards, monitoring, customer communication, and a tested rollback.

## Test scope, limitations, and update log

- **First-party verification date:** July 22, 2026. The installed-version and article-completeness audit was repeated on this date; the accepted staging screenshots were captured July 20, 2026 and retained unchanged.
- **Environment:** Local staging WordPress at the user-confirmed staging host, WooCommerce 10.9.4, ArraySubs 1.8.11, ArraySubs Pro 1.1.2, and WooCommerce Stripe 10.8.4. Screenshots use sandbox/blank credential states and expose no secrets.
- **What was verified:** Current ArraySubs Free manual-renewal architecture, ArraySubs Pro Stripe/PayPal/Paddle adapter behavior, cart constraints, renewal ownership, Gateway Health surfaces, webhook status surfaces, and gateway settings available in the inspected code and staging UI.
- **What was not claimed:** This review did not make a live charge, prove provider onboarding for a particular merchant, test every country/currency/payment method, quote evergreen prices, or provide legal/tax/accounting advice.
- **Refresh triggers:** Re-check quarterly and after a material ArraySubs, WooCommerce, Stripe extension, PayPal API, Paddle Billing, SCA/regulatory, pricing, regional-availability, or acceptable-use change.
- **Authorship and verification:** Written and fact-checked by Emran for ArrayHash.

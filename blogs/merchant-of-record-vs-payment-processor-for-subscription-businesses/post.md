---
title: "Merchant of Record vs Payment Processor for Subscription Businesses"
meta_title: "Merchant of Record vs Payment Processor: Subscription Guide"
meta_description: "Compare Merchant of Record and payment processor models for subscriptions across tax, invoices, disputes, control, cost, data, and migration risk."
focus_keyphrase: "Merchant of Record vs payment processor subscriptions"
published: "2026-05-21"
updated: "2026-07-06"
last_verified: "2026-07-22"
author: "ArraySubs Editorial Team"
reviewer: "ArraySubs Product Team"
---

# Merchant of Record vs Payment Processor for Subscription Businesses

A payment processor moves money on behalf of your business. You normally remain the seller responsible for the transaction, including the commercial relationship and the tax, refund, dispute, invoice, and compliance work that your other providers do not contractually assume. A Merchant of Record, or MoR, becomes the buyer-facing seller for the transactions covered by its agreement and usually bundles payment processing with a broader set of transaction responsibilities.

That distinction is important, but it is not the whole decision. A processor can give a subscription business more direct control over checkout, pricing, customer data, payment routing, treasury, and provider choice. An MoR can reduce the operational burden of selling eligible products across markets, but it introduces its own eligibility rules, seller disclosures, payout model, refund and dispute processes, data boundaries, and migration dependencies.

The right comparison is therefore not “cheap processor versus expensive MoR” or “DIY versus no compliance.” It is a contract-specific comparison of responsibility, control, total operating cost, buyer experience, product eligibility, and exit risk for the same business and transaction mix.

> **Direct answer:** choose a conventional processor when direct control, modular infrastructure, data access, and provider flexibility matter more than bundling cross-market transaction operations. Consider an MoR when your eligible digital-product business would otherwise carry a disproportionate burden for indirect tax, transaction documents, fraud, disputes, and buyer transaction support. In either case, verify the signed contract. “Merchant of Record” is not a universal promise that every supplier obligation disappears.

## Key takeaways

- A processor handles payment operations for the merchant; the merchant usually remains the seller.
- An MoR is the seller or reseller for the covered buyer transaction, but the supplier still owns product, fulfillment, support, records, and other obligations defined by contract.
- Tax calculation software does not automatically make a processor an MoR. Registration, filing, remittance, evidence, and invoice duties must be allocated separately.
- “Handles disputes” does not necessarily mean “absorbs every dispute cost.” Contract deductions, reserves, evidence, and supplier obligations can remain.
- Product and seller eligibility are hard gates. A provider that fits digital software may not fit physical subscription boxes, donations, or human services.
- Compare total cost of ownership, not a headline transaction percentage.
- Treat data export, credential portability, active renewals, refunds, and post-termination support as purchase criteria—not an afterthought.
- ArraySubs connects the subscription lifecycle to supported WooCommerce gateways. It does not become the legal seller, file taxes, or certify provider eligibility.

![A subscription business choosing between a modular payment-processing stack and a bundled Merchant of Record counter](/blogs/merchant-of-record-vs-payment-processor-for-subscription-businesses/featured-image.png)

## What is a payment processor?

A payment processor supplies infrastructure that helps a merchant authorize, route, capture, settle, refund, and reconcile payments. The exact role varies across processor, gateway, acquirer, payment facilitator, wallet, network, and banking contracts, so “processor” is useful shorthand rather than a complete legal map.

The practical point is that a normal processor relationship does not usually replace your business as the seller. Your brand presents the product and price, contracts with the customer, defines delivery and access, and remains responsible for the obligations that have not been delegated to a tax, fraud, invoicing, filing, or support provider.

The PCI Security Standards Council also makes an important boundary clear: using a third-party service provider does not remove the merchant’s responsibility to manage that relationship and allocate security responsibilities. Tokenization and hosted payment fields can reduce the amount of card data your systems handle, but they do not turn every merchant responsibility into the provider’s responsibility.

This modularity is both the strength and the work of a processor architecture. You may combine:

- a payment gateway and acquirer;
- a tax-calculation service;
- registration and filing services;
- invoice and credit-note software;
- fraud and identity controls;
- dispute-management tooling;
- subscription billing and customer-portal software;
- finance, reconciliation, and data-warehouse systems.

You can replace or optimize a module independently—subject to its data and credential constraints. You also have to make the system work as a coherent whole.

## What is a Merchant of Record?

An MoR is the legal entity presented as the seller or authorized reseller for transactions within the scope of its agreement. The buyer pays that entity. The MoR then pays the supplier under the commercial terms between them.

For covered sales, an MoR commonly performs a wider operational bundle than an ordinary processor: payment processing, indirect-tax calculation and collection, relevant registrations and filings, transaction documents, fraud controls, refunds, disputes, and transaction-related buyer support. The exact list differs by provider, product, country, buyer type, sales channel, and signed agreement.

Paddle’s current buyer terms, for example, state that the buyer contracts with Paddle as the authorized reseller for a covered purchase. Its supplier terms preserve meaningful supplier obligations while allocating the resale transaction and buyer-facing seller role to Paddle. Stripe separately offers Managed Payments, currently documented as a Merchant of Record product for eligible digital products. That is a distinct product and integration; it is not a description of every ordinary Stripe Payments transaction.

That product-level distinction prevents a common category error:

- “Stripe” is not one universal contractual role. Ordinary Stripe Payments and Stripe Managed Payments allocate responsibilities differently.
- “Paddle is an MoR” does not mean every product, country, business entity, or sales channel is eligible.
- “The MoR handles tax” does not mean the supplier has no direct tax, income-tax, classification, evidence, accounting, or out-of-scope sales obligations.

Read provider explainers for orientation. Use the signed agreement, scope schedule, and qualified advisers for the real decision.

## Responsibility map: processor, MoR, and the supplier work that remains

The most reliable comparison uses three columns rather than two. The third column—what the supplier still has to do—stops the MoR model from being described as total outsourcing.

![Illustrated responsibility lanes for the business, processor, and Merchant of Record](/blogs/merchant-of-record-vs-payment-processor-for-subscription-businesses/responsibility-map.png)

| Workstream | Conventional processor: typical allocation | MoR: typical allocation for covered sales | Supplier work that normally remains |
| --- | --- | --- | --- |
| Buyer’s legal seller | The subscription business | The MoR or reseller | Correct seller disclosure and supplier-agreement compliance |
| Authorization and capture | Processor infrastructure; merchant configures the integration | MoR and its processing stack | Accurate product, price, buyer, and fulfillment data |
| Indirect-tax calculation | Merchant, often aided by tax software | Commonly the MoR | Classification, evidence, exemptions, and out-of-scope sales |
| Registration, filing, remittance | Merchant or a retained filing service | Commonly the MoR for covered transactions | Direct/income taxes and excluded countries or channels |
| Receipt, invoice, credit note | Merchant or merchant software | Commonly issued by the MoR | Documents or buyer workflows outside the covered model |
| Fraud and underwriting | Shared under processor/acquirer contracts | MoR operates its controls and underwriting | Product legitimacy, fulfillment evidence, reserves, and account compliance |
| Refund execution | Merchant decides and executes through provider tools | Often follows MoR policy and workflow | Product support, evidence, and supplier-funded amounts |
| Chargeback representation | Merchant or its dispute provider | Often the MoR | Evidence and any contractually deducted economic exposure |
| Customer support | Merchant | Transaction support may be split | Product, access, fulfillment, and relationship support |
| Checkout and pricing | Usually higher merchant control | Subject to reseller and compliance rules | Accurate catalog and approved promotions |
| Payout, FX, reserves | Processor/acquirer terms | MoR contract | Treasury, reconciliation, and working-capital planning |
| Data and exit | Provider-specific export and token rules | MoR-specific export, transfer, or reauthorization | Migration plan, communications, consent, and record retention |

“Typically” matters in every row. A processor may sell optional tax filing and dispute services. An MoR may exclude a country, product, marketplace channel, B2B document, or unusual refund workflow. Model the signed scope rather than awarding a checkmark to a provider category.

## Tax is the clearest example of why the distinction matters

Tax tooling is often the reason a subscription company first considers an MoR, but four separate jobs are routinely collapsed into one word:

1. determining where an obligation may exist;
2. registering with the relevant authority;
3. calculating and collecting the correct amount;
4. filing, remitting, issuing documents, and retaining evidence.

A conventional processor can provide strong calculation tools while the merchant still owns registration and filing. Stripe’s documentation for Stripe Tax, for example, explains calculation and monitoring alongside separate registration and filing workflows. That can be an excellent modular stack, but it is not the same legal allocation as Stripe Managed Payments or another MoR service.

An MoR can assume more of those transaction duties for covered sales because it is the buyer-facing seller. The supplier still has to give the MoR accurate classification and transaction data, handle sales outside the scope, keep appropriate business records, and obtain advice about its own taxes and reporting.

For a deeper operational breakdown, read [Sales Tax and VAT on WooCommerce Subscriptions](/deals/arraysubs/resources/payments-and-compliance/sales-tax-and-vat-on-woocommerce-subscriptions/). It separates address evidence, product tax class, recurring-order calculations, exemptions, invoices, refunds, and filing work instead of treating “tax support” as a yes/no gateway feature.

> **Tax and legal notice:** this guide is an operational comparison, not tax or legal advice. Country, product, entity, buyer, and contract details can change the result. Confirm the allocation with the provider and qualified advisers.

## Refunds, disputes, and fraud: operational ownership is not always economic ownership

“The MoR handles chargebacks” can describe who receives the dispute, submits evidence, communicates with the network, and makes a decision. It does not prove that the supplier has zero financial exposure.

Paddle’s current chargeback documentation says Paddle manages the chargeback as MoR and automates evidence submission, while also explaining that the disputed amount and a fee can be deducted from the supplier balance. That is a useful example of why the article headline and the commercial contract must be read together.

Ask both provider types:

- Who decides whether to refund?
- Can support issue a partial or goodwill refund?
- Who funds a refund after a payout?
- Who receives a dispute and submits evidence?
- What evidence must the supplier retain?
- Are dispute amounts, fees, or fraud losses deducted from the supplier balance?
- Can the provider create a rolling reserve or delay payouts?
- What happens to open refunds and disputes after contract termination?

Fraud allocation needs the same care. A provider can run fraud models and accept the formal transaction role while still requiring accurate product descriptions, delivery evidence, account reserves, and compliance with prohibited-business rules.

## Control and data: the processor advantage is not only checkout design

A processor architecture usually gives a merchant more direct control over the components around payment. That may include checkout presentation, billing descriptors, payment methods, routing, retry logic, customer communication, invoice layout, refund discretion, treasury, and raw transaction data.

More control is valuable when your checkout and billing model are part of the product. It can also create more integration, compliance, monitoring, and operational work.

An MoR model often standardizes more of the buyer transaction because the reseller has to operate it consistently. That can affect:

- who is named on checkout and receipts;
- the card statement descriptor;
- supported product categories and promotions;
- invoice and credit-note formats;
- refund and dispute policy;
- available payment methods by market;
- payout timing, currencies, and reserves;
- access to buyer and transaction records;
- the process for changing or terminating the service.

None of those constraints automatically makes the model worse. They are part of the service you are buying. They become a problem when the commercial team assumes they are interchangeable with a direct-merchant processor relationship.

## Five comparison mistakes that produce the wrong answer

### Comparing provider fees against each other instead of comparing systems

A processor quote and an MoR quote do not usually contain the same work. Comparing their percentages alone rewards the option that leaves more costs outside the quote. Put tax operations, transaction documents, fraud, dispute handling, finance time, engineering, and working capital into the model before declaring a winner.

### Treating an integration label as a contractual role

A checkout can say “powered by” a provider without telling you which provider product or entity is the seller. Record the exact legal entity, product name, account type, and governing agreement. For Stripe in particular, an ordinary Payments integration must not be described as Managed Payments merely because both use the Stripe brand.

### Assuming tax calculation equals tax compliance

Correct calculation is essential, but a merchant can still need registrations, returns, remittance, exemption handling, invoice corrections, evidence retention, and responses to authorities. Ask who owns each verb. If the answer is “the provider handles tax,” request the contract section and list of covered taxes and transactions.

### Ignoring the buyer’s experience

The buyer may see a different seller name, statement descriptor, invoice issuer, refund contact, and support path under an MoR. Test those surfaces with the actual country, currency, tax identity, coupon, refund, and cancellation scenarios you plan to operate. A back-office benefit that creates unacceptable procurement or support friction is not free.

### Postponing the exit question

The hardest portability questions become more expensive after thousands of customers depend on stored credentials or remote billing agreements. A provider’s CSV export may be useful without being sufficient to continue renewals elsewhere. Decide what must be exportable, which records must remain accessible, and what customer reauthorization you can tolerate before committing the subscription base.

## Total cost of ownership: compare the whole system

Headline pricing produces weak decisions because the two models bundle different work. Build both scenarios from the same annual sales, transaction count, average order value, buyer-country mix, currencies, payment methods, refund and dispute history, support load, and working-capital needs.

![A total-cost-of-ownership comparison for processor and Merchant of Record stacks](/blogs/merchant-of-record-vs-payment-processor-for-subscription-businesses/total-cost-of-ownership.png)

Use this original worksheet formula:

```text
Annual payment architecture TCO
= transaction and fixed fees
+ cross-border and FX costs
+ payout and treasury costs
+ refund, dispute, reserve, and bad-debt costs
+ tax software, registration, filing, audit, and invoice costs
+ fraud, risk, finance, reconciliation, and transaction-support labor
+ integration, monitoring, maintenance, and incident costs
+ working-capital cost from payout timing and reserves
+ expected migration, exit, and buyer-reauthorization cost
- costs genuinely included by the provider for the evaluated scope
```

Do not count an included service twice in the MoR column. Do not treat internal work as free in the processor column. Also avoid hard-coding a public list price into an evergreen architecture decision. Contracted pricing, FX, refunds, reserves, payout terms, alternative pricing, and support scope can materially change the comparison.

| Input | Processor scenario | MoR scenario | Evidence owner |
| --- | ---: | ---: | --- |
| Covered annual sales and transactions |  |  | Finance |
| Variable and fixed provider fees |  |  | Current quote and contract |
| Cross-border, FX, and payout cost |  |  | Country/currency matrix |
| Refund, dispute, and reserve cost |  |  | Historic rates and terms |
| Tax stack, registrations, filings |  |  | Tax owner/adviser |
| Fraud, finance, and transaction-support labor |  |  | Loaded staff cost |
| Engineering and monitoring |  |  | Roadmap and incident history |
| Working-capital effect |  |  | Payout/reserve schedule |
| Migration and exit reserve |  |  | Portability assessment |
| Scope exclusions |  |  | Contract/product rules |

Run a base case, a downside case, and a growth case. A model that only works at today’s country mix or a best-case dispute rate is fragile.

## Fit by business model

### Early-stage global digital software

An eligible MoR deserves serious consideration when indirect-tax registrations, compliant transaction documents, fraud, disputes, and cross-border transaction support would otherwise consume a small team. The decision still depends on eligibility, buyer experience, payout needs, unit economics, enterprise sales requirements, and exit terms.

### Mature SaaS with finance and tax operations

A conventional processor can be attractive when the business values checkout control, data access, routing, treasury, modular providers, and negotiated economics. An MoR may still fit selected markets, products, or channels. Avoid turning a transaction-scope decision into an ideological all-or-nothing choice.

### Physical subscription box

Product eligibility can end the comparison immediately. Paddle’s published restrictions state that physical goods and physical delivery are not supported. A physical subscription merchant should evaluate processor and acquirer options suited to its fulfillment, tax, shipping, refund, and recurring-payment model rather than assuming every subscription-focused MoR is eligible.

### Human services, donations, communities, and mixed products

Pure services, donations, community access, regulated products, and bundles mixing digital and physical fulfillment can fall outside a provider’s policy or require additional review. Describe the exact product and flow to the provider before designing around it.

### Enterprise B2B invoicing

Purchase orders, negotiated terms, tax exemptions, local invoice requirements, credit control, vendor onboarding, procurement portals, and sales-assisted contracts can dominate the decision. “Supports subscriptions” does not establish that either architecture supports the actual B2B workflow.

## A practical decision tree

![Decision tree for evaluating an eligible Merchant of Record against a processor stack](/blogs/merchant-of-record-vs-payment-processor-for-subscription-businesses/decision-tree.png)

1. **Test eligibility first.** Is your supplier entity, product, buyer type, country, currency, and channel covered under current policy and contract?
2. **Identify the dominant constraint.** Is the main problem cross-market tax and transaction operations, or is it checkout, data, routing, treasury, and product control?
3. **Set disqualifiers.** Document must-have payment methods, buyer documents, payout currencies, refund authority, data access, enterprise terms, margins, and exit capabilities.
4. **Model both TCOs.** Use current quotes and the same scope.
5. **Inspect portability before signing.** Determine what can move and what requires customer action.
6. **Pilot and reconcile.** Test real supported scenarios, refunds, documents, webhooks, payouts, support, and finance reconciliation before making the architecture your default.

## Exit and portability should be part of the purchase decision

A subscription gateway is not just the button used for a new checkout. Active renewals may depend on stored credentials, remote subscription agreements, mandate references, provider customer IDs, price objects, tax records, and provider-specific status.

![A provider-exit illustration separating data, tokens, terms, and customer consent](/blogs/merchant-of-record-vs-payment-processor-for-subscription-businesses/exit-and-portability.png)

Ask for a written exit answer to each of these questions:

- Which customer, transaction, invoice, tax, consent, subscription, and dispute records can be exported?
- Which data is contractually available after termination, and for how long?
- Can payment credentials or remote billing agreements transfer to another provider?
- If transfer is impossible, what customer reauthorization is required?
- Who continues to service refunds, chargebacks, invoices, and tax adjustments for old transactions?
- What happens to active renewals during a notice or wind-down period?
- Can the buyer still access transaction documents after exit?
- How will old and new provider records reconcile in finance and support systems?

Our next guide, [Migrating Subscription Gateways Without Breaking Renewals](/deals/arraysubs/resources/payments-and-compliance/migrating-subscription-gateways-without-breaking-renewals/), turns those questions into an inventory, cohort, pilot, cutover, and rollback plan.

## How this maps to WooCommerce and ArraySubs

ArraySubs Free owns the shared subscription lifecycle. It schedules precise invoice generation and due-time renewal processing. Without a supported automatic adapter, a renewal can become a payable WooCommerce renewal order that the customer completes through checkout.

ArraySubs Pro currently adds automatic integrations for supported official WooCommerce Stripe, PayPal, and Paddle gateway paths. They do not all use the same recurring architecture:

- The inspected **Stripe** path delegates to the official WooCommerce Stripe Gateway and uses stored Stripe customer/payment-method references with off-session PaymentIntents. It is direct processing in the inspected integration, not Stripe Managed Payments.
- The inspected **PayPal** path creates remote products, plans, and subscriptions. PayPal schedules later charges, and webhooks inform ArraySubs about completed sales and subscription state.
- The inspected **Paddle** path creates remote products, prices, transactions, and subscriptions. Paddle schedules later charges, and ArraySubs consumes transaction and subscription webhooks. This is the inspected MoR-oriented provider path, subject to Paddle’s contract and eligibility.

This matters because a plugin toggle does not change the provider’s legal role. ArraySubs does not become the MoR, register or file taxes, issue provider transaction documents, or certify that your entity and product are accepted.

![WooCommerce payment provider settings showing separate gateway integrations](/blogs/merchant-of-record-vs-payment-processor-for-subscription-businesses/woocommerce-payment-providers.png)

The payment settings screen is evidence that integrations are installed and configurable. It is not evidence that a country, currency, payment method, product, or recurring scenario is approved.

![ArraySubs Gateway Health overview for configured subscription gateways](/blogs/merchant-of-record-vs-payment-processor-for-subscription-businesses/gateway-health-overview.png)

Gateway Health provides an operational control plane for setup, availability, test mode, subscription counts, remembered webhook state, endpoint details, and adapter capabilities. Those signals help you run the integration; they do not replace the provider agreement or a legal eligibility review.

![Stripe account connection in WooCommerce settings](/blogs/merchant-of-record-vs-payment-processor-for-subscription-businesses/stripe-account-connection.png)

For Stripe automatic billing, the current ArraySubs path depends on the official WooCommerce Stripe integration. See the [Stripe automatic billing and SCA recipe](/deals/arraysubs/use-cases/recipes/stripe-automatic-billing-sca/) and the [member payment-method update recipe](/deals/arraysubs/use-cases/recipes/member-update-payment/) for the operational workflow.

![Paddle gateway health details in the ArraySubs test environment](/blogs/merchant-of-record-vs-payment-processor-for-subscription-businesses/paddle-gateway-health.png)

Paddle can fit eligible digital products that want an MoR transaction model, but its presence in Gateway Health is not blanket approval. The [Paddle Merchant of Record guide](/deals/arraysubs/resources/payments-and-compliance/paddle-merchant-of-record-for-woocommerce-subscriptions/) covers the integration-specific setup and limits.

For the broader provider shortlist, compare [Stripe vs PayPal vs Paddle for WooCommerce recurring billing](/deals/arraysubs/resources/payments-and-compliance/stripe-vs-paypal-vs-paddle-for-woocommerce-recurring-billing/) and [the best payment gateways for WooCommerce subscriptions](/deals/arraysubs/resources/payments-and-compliance/best-payment-gateways-for-woocommerce-subscriptions/).

## Contract questions to send every provider

1. Which entity appears as seller on checkout, statement, receipt, invoice, credit note, and refund?
2. Which seller countries, products, buyer countries, currencies, methods, and channels are included or excluded?
3. Who registers, calculates, collects, files, remits, issues documents, and retains audit evidence for each tax?
4. Who owns transaction support, product support, refunds, fraud, disputes, and reserves?
5. Which transaction, customer, consent, token, invoice, tax, and subscription records are exportable?
6. Can credentials or remote agreements transfer, and under what approvals?
7. Who controls price presentation, promotions, checkout changes, and buyer communication?
8. What are payout currencies, timing, minimums, FX rules, reserves, and negative-balance terms?
9. Which supplier warranties, indemnities, support duties, and prohibited-use rules remain?
10. What happens to renewals, documents, refunds, disputes, and records after termination?

Require the answer to identify the contract section or current product document. A sales-call assurance that cannot be mapped to the agreement is not a durable operating control.

## Verification environment and limits

This guide was last verified on **July 22, 2026** against:

- WordPress 7.0.2 and WooCommerce 10.9.4 in a local non-production store;
- ArraySubs 1.8.11 and ArraySubs Pro 1.1.2 source;
- the WooCommerce payment settings and ArraySubs Gateway Health interfaces;
- current Stripe, Paddle, WooCommerce, and PCI SSC primary documentation cited below.

We did not run a live card charge, tax registration or filing, provider underwriting decision, production dispute, payout, contract negotiation, or credential transfer. The screenshots use a test environment and establish product UI behavior only.

Provider offerings and terms can change. Revalidate Managed Payments status, provider policies, country and product eligibility, commercial terms, and the ArraySubs adapter capability map before relying on this comparison.

## Frequently asked questions

### Is an MoR always more expensive than a payment processor?

No. Its transaction price may be higher because it bundles more work, but the useful comparison includes tax tooling and filings, invoice operations, disputes, fraud, support, finance labor, engineering, working capital, reserves, and exit cost. Either model can have the lower total cost for a particular business.

### Does a Merchant of Record remove all tax responsibility?

No. An MoR can assume indirect-tax duties for covered buyer transactions, but the supplier still has obligations defined by product classification, source data, out-of-scope sales, direct taxes, accounting, and contract. Get jurisdiction-specific advice.

### Is Stripe a processor or a Merchant of Record?

Name the product. Ordinary Stripe Payments is used as direct processing infrastructure. Stripe Managed Payments is a distinct MoR product for eligible digital products. The inspected ArraySubs Stripe integration uses the official WooCommerce Stripe Gateway and PaymentIntents, not Managed Payments.

### Is Paddle a Merchant of Record for every subscription?

No. Paddle’s buyer and supplier terms establish its MoR/reseller role for covered sales, but seller entity, product, country, buyer, channel, underwriting, and agreement scope still determine eligibility.

### Does an MoR absorb every chargeback loss?

Not necessarily. It may operate the dispute process while the supplier still provides evidence and has amounts or fees deducted under the contract. Read the current dispute and reserve terms.

### Can a subscription business use both models?

Potentially. A business may use an MoR for eligible markets or products and a processor for others. That adds routing, catalog, analytics, support, accounting, refund, tax, and migration complexity. Define transaction ownership and customer communication carefully.

### Does ArraySubs decide which model I am using?

No. The provider product and contract define the legal model. ArraySubs connects subscription lifecycle behavior to supported gateway integrations. Review [payment gateway capabilities](/deals/arraysubs/features/#payment-gateways) and use the [Gateway Health monitor recipe](/deals/arraysubs/use-cases/recipes/gateway-health-monitor/) for operations.

## Decision summary

Use a processor when your business is ready to own or assemble the surrounding transaction operations and values the resulting control. Consider an MoR when its eligible coverage replaces enough tax, document, risk, dispute, and transaction-support work to justify the economics and constraints.

Before choosing either, verify six things in writing: seller role, scope, total cost, control, data portability, and exit treatment. Then pilot the exact subscription scenarios you intend to sell.

ArraySubs can operate the shared WooCommerce subscription lifecycle and connect supported automatic gateway paths, while Gateway Health makes the integration state visible. [View ArraySubs Pro pricing](/deals/arraysubs/pricing/) after you have chosen the provider model and validated your eligibility.

## Primary sources

- [Stripe: What is a Merchant of Record?](https://stripe.com/resources/more/merchant-of-record)
- [Stripe Managed Payments overview](https://docs.stripe.com/payments/managed-payments)
- [Stripe Managed Payments setup and eligibility](https://docs.stripe.com/payments/managed-payments/set-up)
- [Stripe Services Terms](https://stripe.com/legal/ssa-services-terms)
- [How Stripe Tax works](https://docs.stripe.com/tax/how-tax-works)
- [Stripe Tax filing](https://docs.stripe.com/tax/filing)
- [Paddle Buyer Terms](https://www.paddle.com/legal/buyer-terms)
- [Paddle Supplier Terms](https://www.paddle.com/legal/terms)
- [Paddle: Understanding chargebacks](https://www.paddle.com/help/manage/risk-prevention/understanding-chargebacks-with-paddle)
- [Paddle product restrictions](https://www.paddle.com/help/start/intro-to-paddle/what-am-i-not-allowed-to-sell-on-paddle)
- [PCI SSC third-party service-provider responsibility](https://www.pcisecuritystandards.org/faqs/1312/)
- [PCI SSC Tokenization Guidelines](https://www.pcisecuritystandards.org/documents/Tokenization_Guidelines_Info_Supplement.pdf)
- [WooCommerce Subscriptions payment gateways](https://woocommerce.com/document/subscriptions/payment-gateways/)

## Verification and update log

- **2026-07-22:** Verified product responsibilities against ArraySubs 1.8.11, ArraySubs Pro 1.1.2, WordPress 7.0.2, WooCommerce 10.9.4, current provider documentation, and fresh local test-environment gateway screens.
- **2026-07-06:** Editorial update date assigned for the initial publication package.

---
title: "Choosing a Subscription Gateway by Country and Business Model"
meta_title: "Choose a Subscription Gateway by Country and Business Model"
meta_description: "Use a hard-gate framework to choose a WooCommerce subscription gateway by seller country, product, recurring method, mandate, payout, tax, and integration."
focus_keyphrase: "choose subscription gateway by country"
published: "2026-06-12"
updated: "2026-07-18"
last_verified: "2026-07-22"
author: "ArraySubs Editorial Team"
reviewer: "ArraySubs Product Team"
---

# Choosing a Subscription Gateway by Country and Business Model

There is no reliable “best subscription gateway for each country” leaderboard. A provider can serve buyers in a country without onboarding merchants there. It can support a currency without settling to your bank in that currency. It can display a payment method for one-time checkout without supporting saved, off-session subscription renewals. It can support recurring billing in one integration while the exact WooCommerce adapter uses a different API architecture.

Choose through hard gates instead. Verify the seller’s legal entity and bank, the exact product and business model, the seller-of-record model, presentment and payout, the specific recurring payment method, the mandate/authentication path, the exact ArraySubs/WooCommerce adapter, and the operational ability to recover and reconcile.

> **Direct answer:** disqualify any gateway that fails seller onboarding, product eligibility, settlement, exact recurring-method support, authorization/mandate requirements, or integration fit. Only score cost, conversion, control, and convenience among candidates that pass every required gate.

ArraySubs can connect supported WooCommerce payment integrations to the subscription lifecycle. It does not certify provider underwriting, seller country, product category, currency, payout, payment method, mandate, tax position, or regulatory eligibility.

## Key takeaways

- Buyer-country reach, merchant-country onboarding, presentment currency, settlement currency, and payout bank support are different facts.
- One-time payment-method availability does not prove automatic renewal support.
- Product eligibility can be decisive: a digital-software MoR may reject physical goods, delivery, pure services, donations, or community models.
- “Supports SCA” is too broad. Verify how the initial mandate is created, how later off-session charges are classified, and how action-required failures recover.
- The current ArraySubs Stripe path is locally scheduled direct processing through the official WooCommerce Stripe gateway and PaymentIntents—not Stripe Managed Payments or Stripe Billing Subscriptions.
- The current PayPal and Paddle paths create remote provider subscriptions, so the provider owns future scheduling and webhooks drive local updates.
- Current ArraySubs code does not contain a general country/currency certification layer for these providers.
- A successful sandbox checkout is necessary but not sufficient. Test an actual renewal architecture, failure recovery, payout, documents, and reconciliation.

![A merchant choosing a subscription gateway through country, product, mandate, payout, and integration gates](/blogs/choosing-a-subscription-gateway-by-country-and-business-model/featured-image.png)

## The eight hard gates

![Eight hard gates that a subscription gateway candidate must pass](/blogs/choosing-a-subscription-gateway-by-country-and-business-model/eight-hard-gates.png)

| Gate | Question | Required evidence | Why a broad availability page is insufficient |
| --- | --- | --- | --- |
| Seller/entity | Can the provider onboard this entity, owners, bank, and risk category? | Current onboarding rules plus account approval | Buyer reach can exceed merchant onboarding |
| Product/model | Is the exact product, delivery, refund model, and risk category allowed? | Acceptable-use decision, preferably written | “Subscription” spans unrelated businesses |
| Seller/tax model | Is the business the seller, or is an eligible MoR transaction required? | Contract and tax/invoice review | A processor’s tax tool is not seller-of-record status |
| Currency/terms | Can it present the price and settle/payout acceptably? | Currency, FX, amount, bank, timing, reserve terms | Presentment and settlement differ |
| Exact method | Does the intended method support setup, saved/off-session charges, refunds, and disputes? | Method-specific provider matrix and runtime eligibility | One-time support proves little about renewal |
| Authorization | Can the integration establish and reuse a valid mandate/SCA authorization? | Regulatory and provider integration evidence | API architecture can disqualify a candidate |
| Adapter | Does the exact plugin path implement schedule, webhooks, retry, update, cart, and sync needs? | Current adapter map and end-to-end test | Provider capability may not be exposed |
| Operations | Can finance and support monitor, recover, refund, reconcile, and exit? | Runbook, test results, ownership, provider terms | First checkout is not a renewal system |

An “unknown” answer fails a hard gate until verified. It should not receive a neutral score in a weighted spreadsheet.

## Country is at least four different questions

### Where is the seller established?

Provider merchant availability starts with the registered entity, owners, KYC information, bank account, product, and risk review. Stripe’s global availability page lists markets where businesses can create Stripe accounts. It does not promise every method, integration, settlement bank, or recurring scenario to every account.

Paddle separately publishes supplier-country restrictions and says they can change. That is the beginning of onboarding analysis, not permanent approval. PayPal’s API and worldwide country lists need the same care: an API country code or global buyer reach does not prove that a merchant in the country can create the exact Subscriptions product and receive funds on the needed terms.

### Where is the buyer?

Buyer location influences displayed methods, tax, authentication, local rules, currency, and approval. A provider may accept buyers globally while offering local methods only for certain merchant and customer combinations.

### In which currency is the price shown?

Presentment currency is what the customer sees and pays. It can affect method availability, minimum and maximum amounts, FX, authorization, refund behavior, and conversion.

### In which currency and country does the merchant receive funds?

Settlement and payout are treasury questions. Ask which balance currencies the provider keeps, which bank countries and currencies receive payouts, when funds arrive, how FX is priced, whether reserves apply, and how refunds or disputes create negative balances.

Paddle, for example, documents more payment currencies than balance and payout currencies. WooPayments likewise publishes business-country and payout-currency pages separately. Those examples show why “supports currency X” is not a complete answer.

## Product eligibility comes before gateway features

A technically capable checkout is irrelevant when the provider will not underwrite the product.

![Four business-model scenarios with different payment, shipping, tax, and invoice requirements](/blogs/choosing-a-subscription-gateway-by-country-and-business-model/business-model-scenarios.png)

### Physical subscription boxes

Physical products require shipping addresses, address changes, tax and shipping recalculation, delivery evidence, refunds, lost-delivery support, card/wallet renewal, and fulfillment timing. Paddle’s current published restrictions exclude physical goods and physical delivery, so it is a hard non-fit for this scenario.

The current ArraySubs PayPal adapter creates subscriptions with `NO_SHIPPING` and restricts mixed carts, multiple subscriptions, and different billing cycles. That does not prove every physical use is impossible, but it is not enough evidence to recommend the path without a real shipping and address test.

### Digital SaaS and downloadable software

An eligible digital-software business can compare direct Stripe processing, PayPal buyer demand, and Paddle’s MoR model. The choice still depends on seller entity, tax and invoice model, SCA/mandate behavior, payout/FX, checkout, data, retries, support, and exit—not only the word “digital.”

### Memberships, courses, coaching, and communities

These models can mix digital access with human services or community participation. Provider policies can treat them differently. Obtain a written product decision before presenting a digital-goods MoR as an automatic fit.

### B2B invoice-led subscriptions

Purchase orders, negotiated payment terms, exemptions, buyer-vendor onboarding, compliant invoices, credit control, and manual bank settlement may matter more than automatic cards. ArraySubs Free can create payable WooCommerce renewal orders through a manual path. That can fit an operationally managed B2B workflow, but it is manual renewal, not automatic off-session collection.

Paddle has provider-level invoicing capabilities, but the current ArraySubs Paddle adapter does not establish that every sales-assisted invoice workflow is exposed. Separate provider capability from adapter capability.

## Three worked selection examples

These examples demonstrate the method; they are not country recommendations. Each business still needs current provider approval and an end-to-end test.

### Example 1: US entity selling a physical coffee subscription

The product gate immediately removes Paddle because the published policy excludes physical goods and delivery. The remaining shortlist might include Stripe automatic renewal, a carefully verified PayPal path, and a manual bank or invoice fallback.

The decision team should then test shipping address capture and update, tax and shipping recalculation on renewal, card replacement, failed renewal, partial refund, dispute evidence, mixed carts, multiple subscriptions, and the warehouse cutoff. The current PayPal adapter’s `NO_SHIPPING` setting and cart restrictions create specific unknowns. A successful buyer approval without a correct fulfillment address is not a pass.

Stripe may be the stronger technical candidate in the inspected ArraySubs capability map because it supports mixed carts, multiple subscriptions, and different cycles. That is not the final answer until the account, cards, countries, currencies, payouts, descriptor, and real renewal are verified.

### Example 2: EU digital SaaS selling globally

This business can compare a direct-merchant Stripe architecture with an eligible Paddle MoR architecture and add PayPal where wallet demand justifies the operational complexity.

The MoR choice is not merely “Paddle handles VAT.” The team should compare seller disclosure, product approval, buyer invoices and credit notes, VAT evidence, refund authority, payout and FX, buyer support, data export, subscription agreement ownership, and exit. The direct Stripe option should include the cost and ownership of registration, filing, invoice, fraud, dispute, and finance operations.

Both paths need a real initial authentication and off-session renewal test for representative EEA cards. Test an action-required failure, payment update, cancellation, refund, and ledger reconciliation. If enterprise buyers need a particular legal seller or invoice workflow, that can disqualify a technically successful checkout.

### Example 3: India-based software seller with India-issued cards

Start with whether the seller account, bank, product, currency, and payout are approved. Then treat the recurring architecture as a hard gate. The current ArraySubs Stripe path uses PaymentIntents, while Stripe’s current India guidance says that integration does not support India recurring e-mandates.

Do not turn that mismatch into a casual workaround. Obtain written guidance for the live account and exact integration. Prove mandate setup, required notices, the future charge, failure recovery, customer update, and reconciliation. If the path cannot satisfy the mandate framework, disqualify it for that cohort and evaluate another supported architecture or a clearly communicated manual-renewal flow.

PayPal or Paddle should not be assumed to solve the case merely because they are remote-scheduled. Their seller, product, currency, buyer, method, payout, and recurring agreement must independently pass. A provider-scheduled object is an architecture fact, not regulatory certification.

## Build a provider evidence packet

Country and method pages change, and support answers can be account-specific. Store an evidence packet with the selection decision:

- seller entity and provider account ID, with secrets excluded;
- approved product description and delivery model;
- relevant acceptable-use or underwriting confirmation;
- merchant-country and buyer-country pages with access date;
- presentment, balance, settlement, payout, FX, minimum, maximum, and reserve evidence;
- the exact payment-method matrix row and footnotes;
- mandate, SCA, stored-credential, or pre-debit requirements;
- provider product and API used by the WooCommerce integration;
- ArraySubs adapter version and scheduling owner;
- test cases, results, transaction/event/order IDs, and screenshots;
- known unsupported scenarios and manual fallbacks;
- data export, credential portability, termination, and historic-record rules;
- named owner and revalidation trigger.

The packet should separate three levels of proof:

1. **Published capability:** the provider documents a possible feature.
2. **Account entitlement:** the live merchant account is approved and the feature is enabled.
3. **Integrated result:** the exact store, adapter, method, country, and subscription lifecycle passed.

Many gateway recommendations stop at level one. Production decisions need all three.

## Use disqualifiers before preferences

Write disqualifiers in plain language before a vendor demonstration. Examples include:

- cannot onboard the seller entity or bank;
- product prohibited or approval uncertain;
- no required settlement/payout path;
- intended method cannot create a reusable mandate;
- later recurring charge unsupported in the integration;
- required invoice or tax model cannot be delivered;
- customer cannot update a failed or expired method;
- adapter cannot represent required cart or schedule semantics;
- webhook or finance reconciliation cannot be operated;
- data, credential, or record exit terms are unacceptable.

Then write preferences: lower cost, more local methods, faster payouts, richer checkout, simpler reporting, stronger support, better developer tools, or more control. Preferences can be weighted. Disqualifiers cannot be averaged away.

## Exact payment-method support is the recurring test

A payment-method logo at checkout answers only “can this method appear here now?” For a subscription, ask:

1. Can the initial checkout establish a stored credential or mandate?
2. Can the method be reused off-session or through a provider-scheduled agreement?
3. Are fixed and variable recurring amounts supported?
4. Which buyer countries, merchant countries, and currencies qualify?
5. What happens when authentication is required on a later charge?
6. Can the customer update or replace the method?
7. How are refunds, disputes, reversals, and expired credentials handled?
8. Is the behavior implemented by the exact WooCommerce and ArraySubs path?

WooPayments documents that only some methods support automatic subscription renewal while other alternative methods remain one-time options. It is not an ArraySubs adapter in the inspected registry, but it is a useful ecosystem example: provider or plugin availability at checkout must not be generalized to recurring use.

## Mandates, SCA, and regional recurring rules

In the EEA, the EBA distinguishes initial remote mandate establishment, which can require strong customer authentication, from later genuine payee-initiated transactions under a valid mandate with no payer action. The useful gateway question is not “SCA: yes or no?” It is whether the integration can establish the right authorization, label the later transaction correctly, and recover when authentication or customer action is still required.

India exposes an especially important integration-specific constraint. RBI’s e-mandate framework includes issuer authorization and pre-debit requirements. Stripe’s current India recurring-payments documentation says recurring e-mandates are not supported with the PaymentIntents/SetupIntents integration and directs that flow toward Stripe Subscriptions.

The inspected ArraySubs Stripe adapter schedules locally and creates off-session PaymentIntents; it does not use Stripe Billing Subscriptions. Therefore, do not recommend the current ArraySubs Stripe path for automatic renewal of India-issued cards that depend on India e-mandates without an exact current live-account test and written provider confirmation.

That is not a claim that Stripe is unavailable in India or that every Indian card fails. It is a precise warning about the current documented API architecture and a particular recurring requirement.

For the broader authentication model, use [SCA and 3D Secure for subscription renewals](/deals/arraysubs/resources/payments-and-compliance/sca-and-3d-secure-for-subscription-renewals/).

## Provider research: what the official pages prove

### Stripe

Use the global availability page for possible merchant-account markets, the currencies guide for presentment/settlement/minimums, and the method support matrix for the exact method and future-use conditions. Then test the official WooCommerce Stripe integration and the ArraySubs adapter. Ordinary direct Stripe processing should not be described as Stripe Managed Payments.

### PayPal

Use country and currency references as inputs, then confirm that the actual merchant account can create products, plans, and buyer-approved subscriptions. Verify funding sources, approval, webhooks, refunds, and the customer reauthorization path. The current ArraySubs code has no country/currency allowlist that certifies this externally.

### Paddle

Verify supplier country, product eligibility, presentment/balance/payout currencies, payment-method behavior, underwriting, MoR terms, and the adapter. Paddle dynamically displays methods based on buyer, currency, device, and other factors. Its provider-scheduled subscription path can be a strong fit for eligible software, but “configured” does not equal “approved for this product and country.”

## Map the provider to the actual ArraySubs architecture

### ArraySubs Free and manual renewal

Core schedules invoice generation and due-time renewal processing. When no active automatic adapter applies, it creates a payable WooCommerce renewal order. This can preserve a clear payment opportunity for manual, bank-transfer, invoice, or unsupported-method workflows, but the customer must pay; do not call it automatic renewal.

### Stripe adapter

ArraySubs owns the schedule. Pro delegates through the official WooCommerce Stripe extension and uses stored customer/payment-method references for an off-session PaymentIntent. The inspected capability map covers automatic renewal, trials, payment update, card update/expiry, SCA handling, disputes, refunds, sync, mixed carts, multiple subscriptions, and different cycles. Country and method support still come from the real account, official extension, and end-to-end path.

### PayPal adapter

Pro creates remote products, plans, and subscriptions; the buyer approves at PayPal; the provider schedules future charges; webhooks record payment. The inspected path restricts mixed carts, multiple subscriptions, and different cycles and has an incomplete reauthorization URL path. Verify product, funding source, shipping, and payment-update behavior.

### Paddle adapter

Pro creates remote Paddle objects and subscriptions. Paddle schedules the renewals as MoR, and webhooks update local state. The inspected map includes automatic renewal, trials, pause/resume, cancel-at-period-end, reversible cancellation, product sync, payment update, card auto-update, refunds, hosted/customer portals, mixed carts, and multiple subscriptions, while different cycles are disabled.

The adapter map shows “SCA” false for Paddle. That means ArraySubs is not managing that capability. It does not mean Paddle lacks 3DS or regulatory controls.

## The gateway portfolio can change cart behavior

Current ArraySubs Pro cart restrictions derive store behavior from the most restrictive enabled automatic gateway before a selected-gateway-specific check. Enabling PayPal can therefore narrow mixed carts, multiple subscriptions, and different-cycle carts; enabling Paddle can narrow different-cycle carts even when Stripe supports them.

Test the whole enabled gateway portfolio with the cart combinations the store actually sells. A candidate can pass its own recurring test and still create a portfolio-level product constraint.

## Country-and-business-model worksheet

![A country and business model worksheet connecting seller, buyer, product, renewal, payout, tax, adapter, and exit](/blogs/choosing-a-subscription-gateway-by-country-and-business-model/country-model-worksheet.png)

Complete one worksheet per seller entity × buyer region × product × payment method.

| Field | Entry and evidence |
| --- | --- |
| Seller entity, registration country, owners/KYC |  |
| Settlement-bank country |  |
| Product, delivery, refund model, risk category |  |
| B2B/B2C mix and invoice/exemption needs |  |
| Buyer regions and forecast share |  |
| Seller of record: business or MoR |  |
| Presentment currency and amount range |  |
| Balance/payout currency, timing, FX, reserve |  |
| Exact card, wallet, or bank method |  |
| Initial authorization/mandate path |  |
| Saved/off-session/subscription support |  |
| SCA/3DS/pre-debit/variable-amount rules |  |
| Tax calculation, registration, filing, invoice owner |  |
| Refund, dispute, fraud, and support owner |  |
| ArraySubs adapter and scheduling owner |  |
| Update, failure, retry, manual fallback |  |
| Webhook, test/live mode, monitoring |  |
| Export, credential portability, exit plan |  |
| Primary source, provider confirmation, date |  |
| Pilot result and owner |  |

## Score only after the gates

Once every required gate has passed, apply weights that reflect the business:

```text
Candidate score
= checkout and payment-method fit × weight
+ recurring authorization and recovery fit × weight
+ payout and FX fit × weight
+ tax and invoice operating fit × weight
+ adapter and operations fit × weight
+ control, data, and exit fit × weight
+ current total-cost fit × weight
```

A candidate with a failed entity, product, recurring-method, mandate, settlement, or adapter gate is disqualified regardless of weighted score. Do not allow a low fee or popular brand to average away a hard failure.

## End-to-end test matrix

![A test loop for onboarding, checkout, authorization, renewal, recovery, and reconciliation](/blogs/choosing-a-subscription-gateway-by-country-and-business-model/end-to-end-test-matrix.png)

Run the exact production architecture in provider test mode and, where permitted, a controlled low-value live pilot:

1. seller onboarding and live capability approval;
2. buyer-country and currency checkout on intended devices;
3. stored-credential, mandate, or SCA authorization;
4. actual off-session or provider-scheduled renewal;
5. authentication required, soft decline, hard decline, retry, and manual fallback;
6. payment-method update and replaced/expired credential;
7. amount, currency, and plan change if required;
8. cancel, cancel-at-period-end, pause/resume, refund, dispute, and reversal;
9. delayed, duplicate, and invalid webhook behavior;
10. tax, invoice/credit note, payout, FX, fee, and ledger reconciliation;
11. mixed, multiple-subscription, and different-cycle carts with all intended gateways enabled;
12. disablement, provider outage response, and migration/exit recovery.

Sandbox success does not prove account underwriting, a live issuer decision, payout, reserve treatment, or jurisdictional compliance. Record what remains unproven.

## What the current UI can and cannot tell you

![WooCommerce payment settings showing distinct providers and modes](/blogs/choosing-a-subscription-gateway-by-country-and-business-model/woocommerce-payment-providers.png)

WooCommerce settings show which gateway integrations are installed, enabled, and configured. They do not certify your country, product, currency, or recurring method.

![The official WooCommerce Stripe account connection used by the current ArraySubs Stripe path](/blogs/choosing-a-subscription-gateway-by-country-and-business-model/stripe-account-connection.png)

The Stripe connection establishes the current direct-processing dependency. Use the [Stripe automatic billing and SCA recipe](/deals/arraysubs/use-cases/recipes/stripe-automatic-billing-sca/) to verify the actual renewal path.

![PayPal sandbox settings in WooCommerce](/blogs/choosing-a-subscription-gateway-by-country-and-business-model/paypal-sandbox-settings.png)

PayPal settings and credentials can prove configuration. Provider API responses, buyer approval, a remote subscription, webhooks, and a renewal prove the subscription path.

![Paddle gateway health in the ArraySubs test environment](/blogs/choosing-a-subscription-gateway-by-country-and-business-model/paddle-gateway-health.png)

Gateway Health helps operators see setup, mode, availability, subscription counts, webhook state, endpoint, and capabilities. It is not a legal, country, product, payout, or payment-method eligibility certificate. Use the [Gateway Health monitor recipe](/deals/arraysubs/use-cases/recipes/gateway-health-monitor/) and retain provider evidence alongside it.

For provider-level comparisons, read [Stripe vs PayPal vs Paddle for WooCommerce recurring billing](/deals/arraysubs/resources/payments-and-compliance/stripe-vs-paypal-vs-paddle-for-woocommerce-recurring-billing/), the [Paddle MoR guide](/deals/arraysubs/resources/payments-and-compliance/paddle-merchant-of-record-for-woocommerce-subscriptions/), and [best payment gateways for WooCommerce subscriptions](/deals/arraysubs/resources/payments-and-compliance/best-payment-gateways-for-woocommerce-subscriptions/).

If the country decision is part of a provider change, plan [gateway migration without breaking renewals](/deals/arraysubs/resources/payments-and-compliance/migrating-subscription-gateways-without-breaking-renewals/) before onboarding the first replacement cohort.

## Verification environment and limits

This guide was last verified on **July 22, 2026** using ArraySubs 1.8.11, ArraySubs Pro 1.1.2, WordPress 7.0.2, WooCommerce 10.9.4, current local gateway screens, current adapter code, and the primary sources below.

We did not complete provider onboarding, obtain a production underwriting decision, run a live country checkout or renewal, test an India e-mandate, receive a payout, or execute a regulatory review. The UI screenshots are a local test environment and prove configuration behavior only.

Provider coverage changes. Recheck the seller-country, product, currency, method, payout, contract, and regulation pages, plus the exact adapter behavior, before approving a gateway.

## Frequently asked questions

### What is the best subscription gateway in my country?

There is no safe country-only answer. Start with seller entity and product eligibility, then verify payout, the exact recurring method, mandate rules, and adapter behavior. A gateway can be popular in a country and still fail your business model.

### If a gateway supports my currency, can it pay out in that currency?

Not necessarily. Presentment, balance, settlement, and payout currencies can differ. Verify bank country, FX, timing, minimums, and reserves.

### If a payment method appears at checkout, will renewals work?

Not necessarily. Verify stored or provider-scheduled recurring support, off-session use, authorization, failure recovery, and the exact integration.

### Does Gateway Health prove my account is eligible?

No. It reports integration configuration and remembered operational signals. Provider underwriting, product, country, payout, and recurring-method approval remain external.

### Is Paddle suitable for every subscription business?

No. It focuses on eligible software/digital products and publishes product and supplier-country restrictions. Physical delivery and several service/community categories can be excluded or restricted.

### Does ArraySubs Stripe use Stripe Billing Subscriptions?

The inspected path does not. ArraySubs owns the schedule and uses off-session PaymentIntents through the official WooCommerce Stripe gateway.

### Can I use automatic Stripe renewals for India-issued cards?

Do not make a categorical recommendation. Stripe currently says the PaymentIntents/SetupIntents path does not support India recurring e-mandates, while the inspected ArraySubs adapter uses PaymentIntents. Run the exact live-account test and obtain written confirmation.

## Final selection checklist

- [ ] Seller entity, owners, bank, and product are approved.
- [ ] Seller-of-record, tax, invoice, refund, dispute, and support roles are documented.
- [ ] Presentment, settlement, payout, FX, amount, and reserve terms pass.
- [ ] Exact recurring method and buyer-country combination is supported.
- [ ] Mandate/SCA/pre-debit and later action-required behavior is proven.
- [ ] The exact WooCommerce extension and ArraySubs adapter pass a renewal test.
- [ ] Update, failure, retry, manual fallback, refund, and cancellation pass.
- [ ] All intended enabled gateways pass mixed-cart and cycle tests.
- [ ] Webhooks, orders, tax documents, payout, and ledger reconcile.
- [ ] Data export, credential portability, and exit treatment are acceptable.
- [ ] Provider pages and confirmations have dates and owners.

After the hard gates and live pilot pass, compare [ArraySubs payment gateway capabilities](/deals/arraysubs/features/#payment-gateways), the [member payment-update workflow](/deals/arraysubs/use-cases/recipes/member-update-payment/), and [ArraySubs Pro pricing](/deals/arraysubs/pricing/).

## Primary sources

- [Stripe global availability](https://stripe.com/global)
- [Stripe supported currencies](https://docs.stripe.com/currencies)
- [Stripe payment-method support](https://docs.stripe.com/payments/payment-methods/payment-method-support)
- [Stripe India recurring payments](https://docs.stripe.com/india-recurring-payments?integration=paymentIntents-setupIntents&locale=en-GB)
- [PayPal country codes](https://developer.paypal.com/reference/country-codes/)
- [PayPal worldwide availability](https://www.paypal.com/pm/webapps/mpp/country-worldwide)
- [PayPal Subscriptions integration](https://developer.paypal.com/subscriptions/integrate)
- [Paddle supported supplier countries](https://www.paddle.com/help/legal/sanctions/which-countries-are-supported-by-paddle)
- [Paddle product restrictions](https://www.paddle.com/help/start/intro-to-paddle/what-am-i-not-allowed-to-sell-on-paddle)
- [Paddle supported currencies](https://developer.paddle.com/concepts/sell/supported-currencies/)
- [Paddle payment methods](https://developer.paddle.com/concepts/payment-methods/)
- [EBA remote mandate and SCA Q&A](https://www.eba.europa.eu/single-rule-book-qa/qna/view/publicId/2018_4031)
- [RBI e-mandate circular](https://www.rbi.org.in/scripts/bs_circularindexdisplay.aspx/Scripts/BS_CircularIndexDisplay.aspx?Id=12722)
- [WooPayments subscription method support](https://woocommerce.com/document/woopayments/subscriptions/)
- [WooCommerce Subscriptions payment gateways](https://woocommerce.com/document/subscriptions/payment-gateways/)

## Verification and update log

- **2026-07-22:** Verified provider country/method/currency sources, ArraySubs adapter architecture, current capability maps, cart restrictions, and local configuration screens.
- **2026-07-18:** Editorial update date assigned for the initial publication package.

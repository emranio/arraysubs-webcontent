# Research notes: Merchant of Record vs payment processor for subscription businesses

- Article ID: A066
- Research completed: 2026-07-22
- Last verified: 2026-07-22
- Product source inspected: ArraySubs 1.8.11 and ArraySubs Pro 1.1.2
- Verification environment: local source review only; no live payment, tax filing, dispute, or provider-contract test was run
- Intended use: durable evidence and editorial guidance for the eventual article, not publish-ready copy

## Direct answer to preserve

A payment processor processes payments for the merchant, while the merchant normally remains the seller responsible for the transaction. A Merchant of Record (MoR) becomes the seller for the transactions covered by its agreement and assumes a broader bundle of responsibilities, commonly including payment processing, indirect-tax handling, compliant transaction documents, fraud controls, refunds, and disputes. The exact allocation is contractual and transaction-specific; “MoR” must not be treated as a blanket promise that the supplier has no remaining obligations, costs, or risk.

Neither model is universally better. A processor usually offers more direct control over checkout, customer/payment data, pricing, and operating policy. A MoR can reduce the operational burden of selling eligible digital products across markets, but it may impose product-eligibility rules, seller-of-record disclosures, refund/dispute processes, payout timing, pricing constraints, and exit/migration dependencies. Compare current contracts and total operating cost for the same business, markets, transaction mix, and risk profile.

## Evidence labels used below

- **Source fact**: supported by a current primary source linked next to the claim.
- **ArraySubs code fact**: verified in the local Free or Pro source at the version above; it is not a provider promise.
- **Editorial recommendation**: a proposed framework, calculation, example, or test for the article.
- **Limitation/inference**: a conclusion drawn from the sources or code that should be stated as such and revalidated before publication.

## 1. Definitions and legal/operational boundary

### Source facts

- Stripe defines an MoR as the legal entity authorized and responsible for the customer transaction and contrasts it with a payment processor that handles payments while the business remains responsible for transactional compliance, taxes, refunds, and chargebacks. Stripe’s explainer was updated January 27, 2026: [Stripe, “What is a merchant of record?”](https://stripe.com/resources/more/merchant-of-record).
- Stripe now separately offers **Managed Payments**, a public-preview MoR product for eligible digital products. Its documentation says Stripe is the MoR for a Managed Payments transaction and appears to the buyer as the seller; it also describes indirect-tax, fraud, dispute, order-management, and transaction-support responsibilities. This is a distinct product and integration, not a property of ordinary Stripe Payments: [Stripe Managed Payments overview](https://docs.stripe.com/payments/managed-payments), [how it works](https://docs.stripe.com/payments/managed-payments/how-it-works), and [setup and eligibility](https://docs.stripe.com/payments/managed-payments/set-up).
- Stripe’s current services terms allocate MoR duties only to Managed Payment transactions and retain seller obligations, including product, content, fulfillment, and other contractual obligations. That supports transaction-specific wording, not “Stripe is/is not an MoR” as an unqualified company-wide claim: [Stripe Services Terms](https://stripe.com/legal/ssa-services-terms).
- Paddle’s buyer terms state that the buyer contracts with Paddle and that Paddle is the authorized reseller; recurring buyers authorize Paddle to make recurring charges. This establishes the buyer-facing seller relationship for covered Paddle transactions: [Paddle Buyer Terms](https://www.paddle.com/legal/buyer-terms).
- Paddle’s supplier terms describe Paddle as MoR/reseller, give Paddle control over the resale transaction, require seller-of-record disclosure, and route buyer invoices and refund handling through Paddle. They also preserve substantial supplier obligations and allow commercial terms to vary by agreement: [Paddle Supplier Terms](https://www.paddle.com/legal/terms).
- A processor is an entity engaged by a merchant to handle payment transactions on the merchant’s behalf. PCI SSC also says merchants remain responsible for managing third-party service-provider relationships and for clearly allocating responsibilities; outsourcing or tokenization is not a transfer of every merchant obligation: [PCI SSC glossary](https://www.pcisecuritystandards.org/glossary/), [PCI SSC FAQ 1312](https://www.pcisecuritystandards.org/faqs/1312/), and [PCI SSC Tokenization Guidelines](https://www.pcisecuritystandards.org/documents/Tokenization_Guidelines_Info_Supplement.pdf).

### Limitation to state clearly

“Merchant of Record” is not a uniform statutory package. The agreement, jurisdiction, product, transaction type, excluded countries, refund policy, prohibited-business rules, and operational implementation determine the real allocation. Marketing summaries are orientation; the signed contract and provider counsel are authoritative for a specific merchant.

## 2. Responsibility map

### Editorial recommendation: original comparison table

Use an original table with three columns: conventional processor, MoR for covered transactions, and residual supplier work. Avoid absolute checkmarks; use “typically” and add a contract-dependent footnote.

| Workstream | Conventional processor: typical allocation | MoR: typical allocation for covered sales | Supplier work that normally remains |
| --- | --- | --- | --- |
| Buyer’s legal seller | The business | The MoR/reseller | Disclose the seller correctly and comply with supplier agreement |
| Payment authorization and capture | Processor infrastructure; merchant configures integration and rules | MoR and its processor stack | Maintain eligible product/catalog and accurate transaction data |
| Indirect-tax calculation | Merchant, often assisted by software | Commonly MoR | Correct product classification, evidence, exemptions, and source data |
| Registration, filing, remittance | Merchant or retained filing provider | Commonly MoR for covered sales | Taxes outside covered sales; income/direct taxes; supplier records |
| Buyer receipt/invoice/credit note | Merchant or its software | Commonly issued by MoR | B2B documents or local requirements outside the MoR scope |
| Fraud and underwriting | Shared; merchant carries contractual exposure | MoR operates controls and underwriting | Product legitimacy, fulfillment evidence, account reserves/holds |
| Refund execution | Merchant decides within processor tooling | Often MoR policy/workflow | Support evidence and supplier-funded amounts under the contract |
| Chargeback representation | Merchant or service provider | Often MoR | Evidence, product/service records, and possible economic deductions |
| Customer support | Merchant | Split; MoR may handle transaction support | Product, access, fulfillment, and relationship support |
| Checkout and pricing control | Usually high, subject to network/provider rules | More constrained by reseller and compliance rules | Accurate price/catalog and approved promotions |
| Payout, FX, reserves | Processor/acquirer contract | MoR contract | Treasury, reconciliation, working-capital planning |
| Data portability and exit | Depends on provider/token portability | Depends on MoR export/transfer/reauthorization paths | Migration plan, consent, communications, and record retention |

### Source-backed qualifications for that table

- Ordinary Stripe Tax can calculate and collect tax, but Stripe’s tax workflow still requires the merchant to determine obligations, register, and file/remit or engage filing services. Therefore “processor with tax tools” must not be presented as MoR equivalence: [How Stripe Tax works](https://docs.stripe.com/tax/how-tax-works) and [Stripe Tax filing](https://docs.stripe.com/tax/filing).
- Paddle says chargebacks are raised against Paddle as MoR and that it automates evidence submission, but it also says the disputed amount and fee are deducted from the supplier balance. “MoR handles disputes” does not mean “the supplier has no economic exposure”: [Paddle, understanding chargebacks](https://www.paddle.com/help/manage/risk-prevention/understanding-chargebacks-with-paddle).
- Paddle’s refund policy confirms the authorized-reseller structure, but the supplier agreement and product configuration still govern supplier economics and operating responsibilities: [Paddle Refund Policy](https://www.paddle.com/legal/refund-policy).
- Paddle documents that it issues legal transaction records/invoices as MoR and reconciles sales-assisted invoices. That supports the invoicing row without implying that every invoice workflow is exposed by the ArraySubs integration: [Paddle sales-assisted invoicing](https://developer.paddle.com/concepts/sell/sales-assisted-invoice/) and [Paddle credit notes](https://www.paddle.com/help/sell/invoicing-tool/what-are-credit-notes-and-how-do-i-issue-them).

## 3. Control, data, checkout, and economic trade-offs

### Source facts

- Paddle’s terms make the supplier-to-Paddle relationship a resale arrangement and reserve transaction, pricing/resale, refund, risk, and buyer-document controls to Paddle. The article should translate this into operational questions instead of saying that a merchant “outsources everything”: [Paddle Supplier Terms](https://www.paddle.com/legal/terms).
- Stripe Managed Payments requires a dedicated integration and eligibility review. It is not a switch that turns ordinary Stripe PaymentIntents into MoR transactions: [Stripe Managed Payments setup](https://docs.stripe.com/payments/managed-payments/set-up).
- Current list pricing is only one input. Paddle publishes a pricing page, but signed commercial terms, alternative pricing, FX, refunds, chargebacks, payout timing, reserves, and service scope may change the comparison: [Paddle pricing](https://www.paddle.com/pricing).

### Editorial recommendation: questions that expose the real trade-off

Ask the provider or contract owner:

1. Which entity is named as seller on the checkout, card statement, receipt, invoice, and refund?
2. Which product categories, countries, currencies, buyer types, and sales channels are covered or excluded?
3. Who registers, calculates, collects, files, remits, issues credit notes, and owns audit evidence for each tax?
4. Who sets the refund policy and controls goodwill refunds, disputes, fraud rules, and reserves?
5. What transaction, customer, invoice, tax, consent, token, and subscription data can be exported at exit?
6. Can stored credentials or remote agreements be transferred, or must buyers authorize again?
7. Which party owns checkout customization, price presentation, promotions, invoices, and buyer communications?
8. What are the payout currencies, schedules, minimums, FX rules, rolling reserves, and negative-balance terms?
9. What supplier obligations, indemnities, product warranties, and support duties survive the MoR allocation?
10. What happens to active renewals, refunds, disputes, and records after termination?

## 4. Total-cost-of-ownership worksheet

### Editorial recommendation: original formula

Compare the same annual gross sales, buyer-country mix, payment-method mix, refund/dispute rate, average order value, currencies, and payout needs.

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
+ expected migration/exit and buyer-reauthorization cost
- costs genuinely included by the provider for the evaluated scope
```

For an MoR, do not count an included service twice, but do include supplier-side work that remains. For a processor, model optional tax/fraud/filing tools separately. Use the current quote and agreement; do not hard-code generic fee percentages into the evergreen article.

### Suggested worksheet columns

| Input | Processor scenario | MoR scenario | Evidence/owner |
| --- | ---: | ---: | --- |
| Annual covered sales and transactions |  |  | Finance |
| Provider variable and fixed fees |  |  | Current quote/contract |
| FX/cross-border/payout costs |  |  | Country and currency matrix |
| Refund/dispute/reserve cost |  |  | Historic rate + contract |
| Tax stack and filings |  |  | Tax adviser/current vendors |
| Fraud/risk/support/finance labor |  |  | Time and loaded cost |
| Engineering/maintenance |  |  | Roadmap and incident history |
| Working-capital cost |  |  | Payout/reserve terms |
| Migration/exit reserve |  |  | Portability assessment |
| Scope exclusions |  |  | Contract/product rules |

## 5. Fit by product and stage

### Editorial recommendation: use scenarios, not rankings

- **Early-stage global digital software business:** an eligible MoR can be a strong candidate when tax registrations, compliant buyer documents, transaction support, and cross-border operations would otherwise dominate a small team. The decision still depends on product eligibility, buyer experience, economics, payout needs, and exit terms.
- **Mature digital SaaS with finance/tax operations:** a conventional processor may offer more checkout, pricing, data, routing, and treasury control. An MoR can still win for selected countries or channels; transaction-level scope should be modeled rather than forcing an all-or-nothing narrative.
- **Physical subscription box:** Paddle explicitly says physical goods and physical delivery are not supported, so Paddle is a hard non-fit for that scenario. A processor architecture should be assessed instead: [Paddle, products not allowed](https://www.paddle.com/help/start/intro-to-paddle/what-am-i-not-allowed-to-sell-on-paddle).
- **Pure human services, donations, or community access:** Paddle’s current acceptable-use guidance restricts or excludes several such models. Verify the exact offering before treating Paddle as a generic subscription gateway: [Paddle, products not allowed](https://www.paddle.com/help/start/intro-to-paddle/what-am-i-not-allowed-to-sell-on-paddle).
- **Enterprise B2B invoicing:** assess negotiated payment terms, purchase orders, exemption evidence, local invoice rules, credit control, and buyer-vendor onboarding. Neither “processor” nor “MoR” alone answers these workflow requirements.

## 6. Verified ArraySubs product behavior

### ArraySubs code facts

- ArraySubs Free supplies the shared subscription lifecycle and schedules precise per-subscription invoice generation and due-time renewal processing. Without a Pro automatic gateway, a due renewal becomes a payable WooCommerce renewal order and uses WooCommerce’s checkout payment URL. Relevant source: `arraysubs/src/Features/RecurringBilling/Services/RenewalScheduler.php` and `arraysubs/src/Features/RecurringBilling/Services/PaymentProcessor.php`.
- ArraySubs Pro currently registers automatic adapters for the official WooCommerce Stripe gateway, PayPal, and Paddle. Relevant source: `arraysubspro/src/Features/AutomaticPayments/Services/GatewayRegistry.php` and `GatewayResolver.php`.
- The Stripe adapter delegates to the official WooCommerce Stripe Gateway and creates/confirms Stripe PaymentIntents for off-session renewals using stored customer/payment-method IDs. ArraySubs owns the schedule. This is conventional direct Stripe processing in the inspected implementation; no Stripe Managed Payments integration was found. Relevant source: `arraysubspro/src/Features/AutomaticPayments/Gateways/Stripe/StripeDelegate.php`.
- The PayPal adapter creates remote PayPal products, plans, and subscriptions and sends the buyer to PayPal for approval. PayPal schedules the later charges; ArraySubs waits for completed-sale webhooks before recording renewal payment. Relevant source: `arraysubspro/src/Features/AutomaticPayments/Gateways/PayPal/PayPalGateway.php`.
- The Paddle adapter creates remote Paddle products, prices, transactions, and subscriptions. Paddle schedules later charges and ArraySubs processes transaction/subscription webhooks. This is the inspected ArraySubs MoR path. Relevant source: `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleGateway.php`.
- The Gateway Health UI exposes configuration/availability state, test mode, subscription count, remembered webhook state, endpoint, and adapter capabilities. It is useful operational evidence but does not certify the merchant’s legal eligibility or country/currency coverage. Relevant source: `arraysubspro/src/Features/AutomaticPayments/REST/GatewayHealthController.php`.

### Important ArraySubs limitations and editorial guardrails

- Do not call “Stripe via ArraySubs” an MoR. The inspected adapter uses the official WooCommerce Stripe gateway and PaymentIntents, not Stripe Managed Payments.
- Do not say that enabling Paddle makes every store or product eligible for MoR coverage. Paddle underwriting, product rules, supplier-country support, and the supplier agreement remain external hard gates.
- Do not imply that ArraySubs performs tax registration, filing, remittance, buyer invoicing, chargeback representation, or legal seller-of-record work. Those responsibilities come from the provider/contract, not from the subscription plugin.
- Do not infer provider country, currency, payment-method, or recurring eligibility from a gateway appearing as configured in WordPress. The inspected PayPal/Paddle availability checks primarily validate WooCommerce gateway state and credentials; Stripe delegates availability to the official WooCommerce Stripe extension.
- Paddle reports no ArraySubs-managed SCA capability in its adapter map. That means the plugin is not orchestrating SCA; it does **not** mean Paddle lacks 3DS or regulatory controls.
- PayPal’s inspected payment-update path reports that reauthorization/migration is required but does not return a complete reauthorization URL. Do not promise seamless PayPal payment-method replacement.
- Current cart restrictions can be driven by the most restrictive enabled automatic gateway: PayPal can disallow mixed carts, multiple subscriptions, and different cycles; Paddle can disallow different cycles. This is a current product behavior to verify before publication, not a fundamental property of processor or MoR models. Relevant source: `arraysubspro/src/Features/AutomaticPayments/Services/CartRestrictions.php`.

## 7. Screenshot and UI evidence opportunities

### Article-production captures completed 2026-07-22

The article production pass selected four test-environment screenshot pairs from the current local ArraySubs/WooCommerce evidence library. The clean originals remain in `marketing-materials/content-plan/screenshots/live-ui/`; the already-annotated versions were copied byte-for-byte to both article asset trees.

| Article asset | Original evidence | Annotation focus | Placement/context |
| --- | --- | --- | --- |
| `woocommerce-payment-providers.png` | `a061-woocommerce-payment-providers-original.png` | Installed WooCommerce payment providers | Gateway configuration is not legal/product/country eligibility |
| `gateway-health-overview.png` | `a061-gateway-health-overview-original.png` | Gateway Health operational signals | Operational control plane, not contract proof |
| `stripe-account-connection.png` | `a062-stripe-account-connection-original.png` | Official WooCommerce Stripe connection | Inspected Stripe path is ordinary direct processing, not Managed Payments |
| `paddle-gateway-health.png` | `a060-paddle-gateway-health-original.png` | Paddle configuration and health state | MoR-oriented integration remains subject to Paddle eligibility and terms |

No live charge, provider underwriting decision, tax filing, dispute, payout, or credential transfer was performed. Screenshots establish UI state only.

When refreshing the article, capture a clean test environment with no real customer data and label each image with version/date.

1. **WooCommerce payment settings:** show that Manual, Stripe, PayPal, and Paddle are distinct integrations. Caption: “Gateway configuration is not legal-country or product eligibility.”
2. **ArraySubs Pro Gateway Health:** show setup/availability, test mode, subscription count, webhook state, and capabilities. Caption the screen as an operational control plane, not contract proof.
3. **Stripe settings/integration label:** show the official WooCommerce Stripe dependency. Annotate that the inspected ArraySubs integration is not Stripe Managed Payments.
4. **Paddle settings plus provider seller disclosure:** pair an ArraySubs setting with a current Paddle checkout/sandbox screen that shows Paddle as seller, if permitted by the test account and screenshot policy.
5. **Subscription detail gateway panel:** show provider identifiers, last transaction, and sync controls using synthetic data. Explain that identifiers aid operations but do not establish portability.

## 8. Suggested original visual structure

The article can use a compact decision tree:

```text
Is the product eligible under the MoR's current policy and your supplier entity supported?
├─ No → Evaluate processor/acquirer architecture.
└─ Yes
   ├─ Is cross-market tax/invoice/dispute operations the dominant constraint?
   │  ├─ Yes → Model MoR TCO and contract/exit terms.
   │  └─ No → Model processor control and modular service costs.
   └─ Does either path fail checkout, payout, data, buyer, or margin requirements?
      ├─ Yes → Disqualify it.
      └─ No → Pilot, reconcile, and choose using the TCO worksheet.
```

## 9. Internal-link recommendations

Required commercial and recipe links:

- Payment gateway feature overview: `/deals/arraysubs/features/#payment-gateways`
- Stripe automatic billing and SCA recipe: `/deals/arraysubs/use-cases/recipes/stripe-automatic-billing-sca/`
- Member update-payment recipe: `/deals/arraysubs/use-cases/recipes/member-update-payment/`
- Gateway health monitor recipe: `/deals/arraysubs/use-cases/recipes/gateway-health-monitor/`

Useful contextual links from the content plan:

- A057, “Stripe vs PayPal vs Paddle for WooCommerce recurring billing” — use for gateway-level comparison after the architecture distinction.
- A060, “Paddle Merchant of Record for WooCommerce subscriptions” — use for Paddle-specific setup and limits; do not duplicate its implementation detail.
- A061, “Sales tax and VAT on WooCommerce subscriptions” — use for tax operations that sit beneath the MoR/processor decision.
- A065, “Best payment gateways for WooCommerce subscriptions” — use for the broader gateway shortlist.
- A067, “Migrating subscription gateways without breaking renewals” — use from the exit/portability section.
- A068, “Choosing a subscription gateway by country and business model” — use from product/country eligibility.
- Pricing page — one contextual CTA after the product mapping, not inside the neutral definition: `/deals/arraysubs/pricing/`

## 10. Claims to avoid

- “An MoR removes all tax/compliance/legal responsibility.”
- “A processor is only a technical pipe” without acknowledging its contract, risk, fraud, network, and service obligations.
- “Stripe is a processor” or “Stripe is an MoR” without naming the exact product and transaction scope.
- “Paddle absorbs all chargeback cost.” Its current help page says supplier balances can be debited.
- “Paddle works for every subscription business.” Product and supplier-country eligibility are hard gates.
- “ArraySubs makes Stripe/PayPal/Paddle available in every country/currency.”
- “ArraySubs itself is the MoR or handles tax filing.”
- Evergreen fee comparisons without date, geography, transaction mix, contract scope, and source.
- Legal or tax advice. Direct readers to their signed provider agreement and qualified advisers.

## 11. Publication-day revalidation checklist

- Recheck Stripe Managed Payments status, supported markets, eligibility, and terms; it was public preview during research.
- Recheck Paddle supplier terms, buyer terms, acceptable-use rules, supported supplier countries, pricing, refund, and dispute pages.
- Recheck the exact ArraySubs Free/Pro versions and adapter capability map.
- Confirm whether the production integration still uses PaymentIntents for Stripe and remote provider schedules for PayPal/Paddle.
- Re-run the TCO inputs from current quotes rather than copying published list prices.
- Capture dated screenshots in test mode and remove account IDs, buyer data, API keys, and webhook secrets.

## 12. Primary source register

- Stripe MoR explainer: https://stripe.com/resources/more/merchant-of-record
- Stripe Managed Payments: https://docs.stripe.com/payments/managed-payments
- Stripe Managed Payments how it works: https://docs.stripe.com/payments/managed-payments/how-it-works
- Stripe Managed Payments setup: https://docs.stripe.com/payments/managed-payments/set-up
- Stripe Services Terms: https://stripe.com/legal/ssa-services-terms
- Stripe Tax: https://docs.stripe.com/tax/how-tax-works
- Stripe Tax filing: https://docs.stripe.com/tax/filing
- Paddle Buyer Terms: https://www.paddle.com/legal/buyer-terms
- Paddle Supplier Terms: https://www.paddle.com/legal/terms
- Paddle MoR evaluation guide: https://www.paddle.com/resources/how-to-evaluate-a-merchant-of-record
- Paddle chargebacks: https://www.paddle.com/help/manage/risk-prevention/understanding-chargebacks-with-paddle
- Paddle refunds: https://www.paddle.com/legal/refund-policy
- Paddle pricing: https://www.paddle.com/pricing
- Paddle sales-assisted invoices: https://developer.paddle.com/concepts/sell/sales-assisted-invoice/
- Paddle credit notes: https://www.paddle.com/help/sell/invoicing-tool/what-are-credit-notes-and-how-do-i-issue-them
- Paddle product restrictions: https://www.paddle.com/help/start/intro-to-paddle/what-am-i-not-allowed-to-sell-on-paddle
- PCI SSC glossary: https://www.pcisecuritystandards.org/glossary/
- PCI SSC third-party responsibility FAQ: https://www.pcisecuritystandards.org/faqs/1312/
- PCI SSC Tokenization Guidelines: https://www.pcisecuritystandards.org/documents/Tokenization_Guidelines_Info_Supplement.pdf
- WooCommerce Subscriptions gateway guide, ecosystem context only: https://woocommerce.com/document/subscriptions/payment-gateways/

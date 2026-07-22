# Research notes: Choosing a subscription gateway by country and business model

- Article ID: A068
- Research completed: 2026-07-22
- Last verified: 2026-07-22
- Product source inspected: ArraySubs 1.8.11 and ArraySubs Pro 1.1.2
- Verification environment: local source review only; no provider onboarding, live-country checkout, payout, recurring charge, or regulatory test was executed
- Intended use: durable evidence and editorial guidance for the eventual article, not publish-ready copy

## Direct answer to preserve

Choose a subscription gateway through hard gates, not a country leaderboard. First verify that the provider can onboard the seller’s exact legal entity and business model. Then verify product eligibility, settlement/payout, the exact payment method’s recurring and off-session behavior, currency and amount limits, local mandate/authentication rules, tax/seller-of-record needs, and finally the exact ArraySubs/WooCommerce integration path. A provider being “available” in a country or accepting a method for one-time checkout does not prove that the same merchant can use it for automatic renewals.

For the inspected ArraySubs build, Stripe is a locally scheduled direct-processing path through the official WooCommerce Stripe gateway; PayPal and Paddle create provider-hosted remote subscriptions and rely on provider webhooks. Paddle is the Merchant of Record path and is aimed at eligible software/digital products. ArraySubs itself does not certify country, legal-entity, currency, payout, product, mandate, or payment-method eligibility.

## Evidence labels used below

- **Source fact**: supported by a current primary source linked next to the claim.
- **ArraySubs code fact**: verified in local Free or Pro source at the version above; it is not a provider guarantee.
- **Editorial recommendation**: a proposed worksheet, decision rule, example, or test.
- **Limitation/inference**: a conclusion that must remain qualified and be rechecked for the exact account, integration, and publication date.

## 1. The country decision has multiple independent layers

### Editorial recommendation: hard-gate sequence

| Gate | Question | Evidence required | Why a broad availability page is insufficient |
| --- | --- | --- | --- |
| 1. Seller/entity | Can the provider onboard this registered entity, owners, bank account, and risk category? | Current provider country/onboarding rules plus account approval | Buyer reach can be wider than merchant onboarding |
| 2. Product/business model | Is the exact product, delivery method, refund model, and risk category allowed? | Acceptable-use/prohibited-business decision, ideally written | “Subscriptions” includes software, physical goods, services, donations, and regulated products |
| 3. Seller-of-record/tax | Does the business need direct merchant control or an eligible MoR sale? | Contract, tax advice, invoice/customer requirements | A processor’s tax tool does not automatically make it the legal seller |
| 4. Currency and commercial terms | Can it present the required currency and amount and settle/payout acceptably? | Presentment, settlement, payout, FX, minimum/maximum, reserve rules | Accepted currency can differ from settlement currency |
| 5. Exact payment method | Does this method support initial authorization, saved credentials, subscription/off-session charges, refunds, and disputes in this country? | Method-specific provider docs and account/runtime eligibility | One-time checkout support does not prove recurring support |
| 6. Authorization/mandate | Can the integration establish and reuse the legally valid mandate/SCA authorization? | Country/regulator plus provider integration docs | Regulation and API architecture can disqualify an otherwise supported card/method |
| 7. Plugin adapter | Does the exact ArraySubs adapter implement the needed schedule, webhook, retry, payment-update, cart, and sync behavior? | Current Free/Pro code/capability map and end-to-end test | Provider capability does not guarantee plugin exposure |
| 8. Operations | Can finance/support monitor, reconcile, refund, recover, and migrate it? | Test results, runbook, staffing, provider support/exit terms | A successful first checkout is not a production renewal system |

The article should stop and disqualify a candidate when a hard gate fails. Weighted scoring is useful only among candidates that pass every required gate.

## 2. Provider coverage: what official sources do and do not prove

### Stripe

#### Source facts

- Stripe’s global page lists countries/regions where businesses can create Stripe accounts. It should be read as merchant-account availability, not as proof that every payment method, presentment currency, settlement bank, or recurring integration is available to every account: [Stripe global availability](https://stripe.com/global).
- Stripe supports many presentment currencies, but its currency guide documents country-specific settlement, bank, FX, and minimum-charge constraints. “Supports 135+ currencies” is not a complete country recommendation: [Stripe supported currencies](https://docs.stripe.com/currencies).
- Stripe’s payment-method support matrix varies by business location, customer location, currency, product, API/integration, and whether future/off-session use is supported. The exact row and footnotes must be checked for the planned subscription path: [Stripe payment-method support](https://docs.stripe.com/payments/payment-methods/payment-method-support).
- For India, Stripe states that India recurring e-mandates are not supported with PaymentIntents or SetupIntents and directs recurring integration to Stripe Subscriptions. That is directly relevant to ArraySubs because the inspected Stripe adapter uses PaymentIntents rather than Stripe Billing Subscriptions: [Stripe India recurring payments](https://docs.stripe.com/india-recurring-payments?integration=paymentIntents-setupIntents&locale=en-GB).

#### ArraySubs limitation/inference

The current ArraySubs Stripe adapter creates and confirms off-session PaymentIntents from the locally owned ArraySubs schedule. Based on Stripe’s India integration restriction, **the current ArraySubs Stripe adapter should not be recommended for automatic renewal of India-issued cards that depend on India e-mandates without an exact current live-account test and written provider confirmation**. This is an integration-specific inference, not a claim that Stripe is unavailable in India or that every Indian transaction fails.

### PayPal

#### Source facts

- PayPal’s REST country-code reference covers countries/regions in its API but directs developers to country-specific availability and limitations. An API country code is not a feature entitlement: [PayPal REST country codes](https://developer.paypal.com/reference/country-codes/).
- PayPal markets availability across 200+ countries/regions and 25 currencies on its worldwide page, but this buyer/business reach does not prove that every country can receive payments, create Subscriptions, settle in every currency, or use the same funding source: [PayPal worldwide availability](https://www.paypal.com/pm/webapps/mpp/country-worldwide).
- PayPal maintains a separate REST currency-code list with country and transaction qualifications: [PayPal currency codes](https://developer.paypal.com/api/rest/reference/currency-codes/).
- PayPal Subscriptions uses products, plans, and buyer-approved subscriptions. Availability must be checked for the merchant account/product and the exact API behavior: [PayPal Subscriptions overview](https://developer.paypal.com/subscriptions/about) and [PayPal Subscriptions integration](https://developer.paypal.com/subscriptions/integrate).

#### ArraySubs limitation

No ArraySubs code-level country or currency allowlist was found for PayPal. The adapter primarily checks the WooCommerce gateway state and credentials, then the provider/API determines whether creation/approval succeeds. Therefore an “available” WordPress setting cannot be presented as country certification.

### Paddle

#### Source facts

- Paddle maintains a current list of unsupported supplier countries and says the list may change; additional risk review can apply. This is seller onboarding/underwriting evidence, not a permanent universal list: [Paddle supported supplier countries](https://www.paddle.com/help/legal/sanctions/which-countries-are-supported-by-paddle).
- Paddle says it is built for software businesses and excludes or restricts physical goods/physical delivery, pure human services, community access, donations, and other categories in its current acceptable-use guidance. Product eligibility is a hard gate before checkout or currency analysis: [Paddle, products not allowed](https://www.paddle.com/help/start/intro-to-paddle/what-am-i-not-allowed-to-sell-on-paddle).
- Paddle documents 30+ payment currencies, but balance/payout currencies are a smaller set, and bank-transfer settlement options are narrower. Paddle also states that it handles sales-tax liability as MoR. Presentment, balance, and payout currency must remain separate rows in the worksheet: [Paddle supported currencies](https://developer.paddle.com/concepts/sell/supported-currencies/).
- Paddle dynamically displays payment methods based on buyer location, currency, device, and other factors. Its documentation distinguishes method behaviors including subscription/save-for-later/refund support. The existence of a method logo or one-time transaction path is not proof of renewal support: [Paddle payment methods](https://developer.paddle.com/concepts/payment-methods/).
- Paddle’s supplier terms establish the MoR/reseller relationship and contractual controls, underwriting, and supplier obligations. The business must evaluate that model, not treat it as just another card processor: [Paddle Supplier Terms](https://www.paddle.com/legal/terms).

#### ArraySubs limitation

The Paddle adapter does not independently certify supplier country, product, currency, or method eligibility; it relies on Paddle credentials and API/checkout responses. The inspected adapter supports remote Paddle subscriptions and provider-scheduled renewals, but that implementation does not prove every Paddle Billing feature or payment method is exposed.

### WooPayments and WooCommerce: useful ecosystem context only

- WooPayments publishes a business-country availability list and separately documents payout currencies. These illustrate why entity country and settlement/payout are distinct gates: [WooPayments countries](https://woocommerce.com/document/woopayments/compatibility/countries/) and [WooPayments payout currencies](https://woocommerce.com/document/woopayments/payouts/payout-currencies/).
- WooPayments says that only some payment methods support automatic subscription renewal, while other alternative methods remain one-time options. This is a clear ecosystem example of why one-time method support cannot be generalized to recurring use: [WooPayments subscriptions](https://woocommerce.com/document/woopayments/subscriptions/) and [WooPayments payment methods](https://woocommerce.com/document/woopayments/payment-methods/).
- WooCommerce Subscriptions similarly distinguishes automatic from manual gateways and tells merchants to verify the exact gateway-extension capability. These pages do not prove ArraySubs behavior and should be labeled as ecosystem context: [WooCommerce Subscriptions payment gateways](https://woocommerce.com/document/subscriptions/payment-gateways/).

## 3. Regulation and mandate architecture

### Source facts

- The EBA states that remote establishment of a payment mandate is subject to SCA. Later genuine payee-initiated transactions can be outside the SCA requirement only when a valid mandate exists and the payer is not initiating the later transaction: [EBA Q&A 2018_4031](https://www.eba.europa.eu/single-rule-book-qa/qna/view/publicId/2018_4031) and [EBA Q&A 2018_4131](https://www.eba.europa.eu/single-rule-book-qa/qna/view/publicId/2018_4131).
- India’s RBI e-mandate framework includes issuer/authorization and pre-debit notification requirements. The current 2024 circular says the pre-debit notification must be sent at least 24 hours before the charge under the framework: [RBI e-mandate circular](https://www.rbi.org.in/scripts/bs_circularindexdisplay.aspx/Scripts/BS_CircularIndexDisplay.aspx?Id=12722).
- Provider implementation still matters: Stripe’s own India documentation says its PaymentIntents/SetupIntents integration does not support India recurring e-mandates and points to Stripe Subscriptions instead: [Stripe India recurring payments](https://docs.stripe.com/india-recurring-payments?integration=paymentIntents-setupIntents&locale=en-GB).

### Editorial consequence

Do not write “supports SCA” as a yes/no gateway checkbox. The article should ask:

1. How is the initial mandate/credential established?
2. Does the method support off-session merchant-initiated recurring use for the buyer’s country and currency?
3. Who sends required pre-debit notices or handles variable-amount rules?
4. What does the exact API/integration do when authentication is required later?
5. Can the customer update the payment method/mandate and can operations recover a failed renewal?

## 4. Verified ArraySubs gateway architecture

### ArraySubs Free

- Core owns subscription lifecycle and schedules both invoice-generation and due-time renewal actions. Relevant source: `arraysubs/src/Features/RecurringBilling/Services/RenewalScheduler.php`.
- If Pro does not confirm an active automatic adapter, the renewal becomes manual and ArraySubs creates a payable WooCommerce order using the order checkout URL. Relevant source: `arraysubs/src/Features/RecurringBilling/Services/PaymentProcessor.php` and `arraysubs/src/functions/gateway-helpers.php`.
- This manual path may fit B2B invoicing, bank transfer, cash, or unsupported automatic-method scenarios when operationally acceptable. It should not be described as automatic renewal.

### ArraySubs Pro adapter map

| Adapter | Scheduling/authorization model | Verified strengths in inspected capability map | Verified limits/qualifications |
| --- | --- | --- | --- |
| Stripe | ArraySubs schedules; official WooCommerce Stripe gateway supplies stored customer/payment method; Pro creates off-session PaymentIntent | Automatic renewals, trials, payment update, card updates/expiry, SCA handling, disputes, refunds, mixed carts, multiple subscriptions, different cycles, sync | Direct Stripe processing, not Stripe Managed Payments; pause/resume false; method/country support inherits exact official gateway/account and current adapter logic |
| PayPal | Pro creates remote product/plan/subscription; buyer approves at PayPal; provider schedules later charges; webhook records payment | Automatic renewals, trials, disputes, refunds, sync; payment update declared in capability map | Mixed carts, multiple subscriptions, different cycles, pause/resume, product sync, hosted page, and customer portal false; inspected reauthorization path has no complete URL; shipping preference is `NO_SHIPPING` |
| Paddle | Pro creates remote product/price/transaction/subscription; Paddle schedules renewals as MoR; webhooks update local state | Automatic renewals, trials, pause/resume, cancel-at-period-end, reversible cancellation, product sync, payment update, card auto-update, refunds, hosted/customer portals, mixed carts, multiple subscriptions, sync | Different cycles false; disputes/SCA/card-expiry false in ArraySubs capability map; Paddle product/country underwriting remains external; “SCA false” means no plugin-managed SCA, not no provider 3DS |

Primary local sources: `arraysubspro/src/Features/AutomaticPayments/Services/GatewayRegistry.php`, `AutomaticGatewayContract.php`, `Gateways/Stripe/StripeDelegate.php`, `Gateways/PayPal/PayPalGateway.php`, and `Gateways/Paddle/PaddleGateway.php`.

### Cross-gateway cart behavior

`arraysubspro/src/Features/AutomaticPayments/Services/CartRestrictions.php` currently derives store cart restrictions from the most restrictive enabled automatic gateway before a selected-gateway-specific check. Enabling PayPal can therefore narrow mixed carts, multiple subscriptions, and different-cycle carts; enabling Paddle can narrow different-cycle carts even when Stripe supports them. This is a product behavior to test in the current version and a strong example of why the store’s gateway portfolio matters, not only the selected gateway.

### Availability and health are not eligibility certification

- No local country/currency allowlist was found for PayPal or Paddle. Their ArraySubs availability checks primarily cover parent WooCommerce gateway state and credentials.
- Stripe delegates availability to the official WooCommerce Stripe extension.
- Gateway Health shows enabled/setup/available/test mode, subscription count, remembered webhook, endpoint, and capability information. That is operational readiness evidence, not provider underwriting, legal-country approval, payout approval, or recurring-method certification.

## 5. Business-model scenarios

### Editorial recommendation: use scenario mapping instead of “best by country” rankings

| Scenario | Hard gates | Candidate ArraySubs architecture | Must test | Disqualifier/example limit |
| --- | --- | --- | --- | --- |
| US physical subscription box | Physical goods, shipping, tax, card/wallet renewal, refund/chargeback, settlement | Stripe automatic or a supported manual WooCommerce payment path | Initial + off-session renewal, address/shipping changes, tax, failed renewal | Paddle says physical goods/physical delivery are not supported; current PayPal adapter sends `NO_SHIPPING`, so physical fulfillment is unproven |
| EU/EEA digital SaaS | Seller entity, VAT/invoice model, SCA/mandate, currency/payout, B2B evidence | Compare Paddle MoR with direct Stripe control; PayPal may be an additional buyer-demand option | 3DS initial setup, off-session renewal, action-required recovery, VAT/invoice/refund, payment update | Do not equate plugin capability-map “SCA” with legal compliance; validate end to end |
| India-based or India-card digital subscription | Account approval, INR/FX/payout, RBI mandate/pre-debit, exact recurring API | No categorical recommendation from ArraySubs source alone | Exact live account, India-issued card, mandate setup, notification, off-session renewal, failure recovery | Current ArraySubs Stripe uses PaymentIntents; Stripe says that path does not support India recurring e-mandates |
| Global downloadable software | Product eligibility, MoR/direct seller choice, country/currency/payout, tax, data/exit | Paddle is an MoR contender; Stripe direct processing is the higher-control path; PayPal can add wallet demand | Checkout conversion, invoices/tax, refunds/disputes, dunning, payout/FX, export/exit | Ordinary ArraySubs Stripe is not Stripe Managed Payments/MoR |
| B2B invoice-led subscription | Terms, purchase order, exemptions, legal invoice, manual payment/reconciliation | ArraySubs Free manual renewal order can fit an operationally managed flow | Invoice approval, order payment link, status reconciliation, late payment, access policy | Automatic card/wallet gateway may be irrelevant; Paddle’s broader invoice capabilities are not proven exposed by the current adapter |
| Membership/course/coaching/community | Exact deliverable and human-service/community mix, refund and consumer rules | Stripe/PayPal/manual path depending gates; Paddle only after written eligibility confirmation | Product review, buyer statement, refund/cancel, access delivery | Paddle currently restricts/excludes several pure human-service/community categories |
| Multiple products/cycles in one cart | Adapter cart capability, schedule ownership, checkout UX | Stripe has the broadest inspected cart capability | Mixed cart, multiple subscriptions, different cycles with all enabled gateways | Current most-restrictive-enabled-gateway logic can narrow the whole store |

### Physical-business caution

The PayPal adapter creates subscriptions with shipping preference `NO_SHIPPING`, and the inspected capability map disables mixed carts/multiple subscriptions/different cycles. This does not prove that every physical subscription fails, but it is insufficient evidence to recommend the adapter for physical recurring shipments without an end-to-end shipping/address test.

### B2B caution

Paddle has provider-level sales-assisted invoicing capabilities, but the inspected ArraySubs Paddle adapter is centered on checkout transactions/subscriptions and does not prove that those broader invoice workflows are exposed. Separate provider capability from integration capability.

## 6. Country-and-model worksheet

### Editorial recommendation: original hard-gate form

Complete one row per seller entity × buyer region × product × payment method. “Unknown” fails the hard gate until verified.

| Field | Entry/evidence |
| --- | --- |
| Seller legal entity and registration country |  |
| Owners/KYC and settlement-bank country |  |
| Product/delivery model and risk category |  |
| B2B/B2C mix and invoice/exemption needs |  |
| Buyer countries/regions and forecast share |  |
| Seller of record: business or MoR |  |
| Presentment currency and amount range |  |
| Settlement/payout currency, timing, FX, reserve |  |
| Exact method: card scheme/wallet/bank method |  |
| Initial authorization/mandate path |  |
| Saved/off-session/subscription support |  |
| SCA/3DS/pre-debit/variable-amount requirements |  |
| Tax calculation/registration/filing/invoice owner |  |
| Refund, dispute, fraud, and customer-support owner |  |
| ArraySubs adapter and scheduling owner |  |
| Payment-update, failure, retry, manual fallback |  |
| Webhook/test-mode/live-mode monitoring |  |
| Data export, credential portability, exit plan |  |
| Primary source URL, provider confirmation, verified date |  |
| Live pilot result and owner |  |

### Editorial recommendation: score only after the gates

```text
Candidate score
= checkout/payment-method fit × agreed weight
+ recurring authorization/recovery fit × weight
+ payout/FX fit × weight
+ tax/invoice operating fit × weight
+ product integration/operations fit × weight
+ control/data/exit fit × weight
+ current total-cost fit × weight
```

Any failed legal-entity, product, recurring-method, authorization, settlement, or integration hard gate = **disqualified**, regardless of weighted score.

## 7. Test matrix before recommendation or launch

### Editorial recommendation

For each country/model candidate, run the exact production architecture in provider test mode and, where permitted, a low-value live pilot:

1. Seller account onboarding/approval and live capability access.
2. Buyer-country/currency checkout with the intended device and payment method.
3. Initial stored-credential/mandate/SCA authorization.
4. Actual off-session renewal or provider-scheduled subscription renewal.
5. Authentication/action-required, soft decline, hard decline, and retry/manual fallback.
6. Payment-method update and expired/replaced credential.
7. Amount/currency/plan change where the business needs it.
8. Cancel, cancel-at-period-end, pause/resume, refund, dispute, and reversal as applicable.
9. Delayed/duplicate/invalid webhook and local order/subscription reconciliation.
10. Tax calculation, invoice/receipt/credit note, payout, FX, fee, and ledger reconciliation.
11. Mixed/multiple/different-cycle cart combinations with all intended gateways enabled.
12. Gateway disablement and exit/migration recovery.

Sandbox success does not prove account underwriting, live funding-source behavior, issuer response, settlement, or regulatory compliance.

## 8. Screenshot and UI evidence opportunities

### Article-production captures completed 2026-07-22

The production pass selected four dated local/test evidence pairs and copied their annotated versions into both article asset trees.

| Article asset | Original evidence | Annotation focus | Placement/context |
| --- | --- | --- | --- |
| `woocommerce-payment-providers.png` | `a061-woocommerce-payment-providers-original.png` | Installed/enabled provider integrations | Configuration does not certify country/product/recurring-method eligibility |
| `stripe-account-connection.png` | `a062-stripe-account-connection-original.png` | Official WooCommerce Stripe dependency | Current ArraySubs path is direct PaymentIntents processing |
| `paypal-sandbox-settings.png` | `a059-paypal-sandbox-settings-original.png` | PayPal sandbox configuration | Settings require provider approval, buyer agreement, webhook, and renewal proof |
| `paddle-gateway-health.png` | `a060-paddle-gateway-health-original.png` | Paddle test-mode health state | Operational readiness is not supplier/product/country approval |

No provider onboarding, live country checkout, recurring charge, payout, or regulatory test was executed. Capture synthetic data in a dated test environment during future refreshes.

1. **ArraySubs Pro Gateway Health:** show configured/available/test-mode/webhook/capability cards. Caption it as integration readiness, not country approval.
2. **WooCommerce payment settings:** show enabled gateways and current mode. Annotate that country, currency, product, and exact recurring-method eligibility still require provider validation.
3. **Subscription list gateway filter:** demonstrate how an operator can segment existing subscriptions by current gateway before adding/removing a country path.
4. **Stripe adapter/official plugin settings:** show the dependency on the official WooCommerce Stripe gateway and label the current path as PaymentIntents/direct processing, not Managed Payments.
5. **PayPal/Paddle sandbox subscription:** place local and remote next-status/transaction evidence side by side to show provider-scheduled renewals.
6. **Customer payment-method UI:** compare the actual update path for each gateway; do not use one gateway’s screen as evidence for another.
7. **Cart restriction examples:** capture a synthetic same-cycle versus different-cycle/multiple-subscription cart with the intended enabled-gateway portfolio.

## 9. Internal-link recommendations

Required commercial and recipe links:

- Payment gateway feature overview: `/deals/arraysubs/features/#payment-gateways`
- Stripe automatic billing and SCA recipe: `/deals/arraysubs/use-cases/recipes/stripe-automatic-billing-sca/`
- Member update-payment recipe: `/deals/arraysubs/use-cases/recipes/member-update-payment/`
- Gateway health monitor recipe: `/deals/arraysubs/use-cases/recipes/gateway-health-monitor/`

Useful contextual links from the content plan:

- A056, “How WooCommerce subscription payments work” — lifecycle foundation.
- A057, “Stripe vs PayPal vs Paddle for WooCommerce recurring billing” — provider comparison after the country/model gates.
- A058, “Stripe recurring payments for WooCommerce” — Stripe-specific implementation and tests.
- A059, “PayPal recurring payments for WooCommerce” — PayPal agreements and limits.
- A060, “Paddle Merchant of Record for WooCommerce subscriptions” — MoR/product eligibility detail.
- A061, “Sales tax and VAT on WooCommerce subscriptions” — tax-owner analysis.
- A062, “SCA and 3D Secure for subscription renewals” — mandate/authentication detail.
- A065, “Best payment gateways for WooCommerce subscriptions” — broader shortlist without duplicating the country worksheet.
- A066, “Merchant of Record vs payment processor for subscription businesses” — seller model and TCO.
- A067, “Migrating subscription gateways without breaking renewals” — country expansion or gateway exit.
- A069, “Automatic vs manual gateway support for subscriptions” — manual fallback and exact adapter capability.
- Pricing page — one contextual CTA after the verified ArraySubs mapping: `/deals/arraysubs/pricing/`

## 10. Claims to avoid

- “Gateway X is best for country Y” without seller entity, product, currency, method, recurring path, and verified date.
- “Available in 200 countries” as proof that merchants in all 200 can receive Subscriptions payments.
- “Supports currency X” as proof of settlement/payout in X or acceptance for every payment method.
- “Supports cards/wallet/bank method” as proof of saved/off-session automatic renewal.
- “SCA compliant” as an undifferentiated plugin/gateway badge.
- “Stripe works for Indian recurring cards through ArraySubs” without resolving the current PaymentIntents/e-mandate mismatch.
- “Paddle is suitable for any subscription.” Its current product policy excludes or restricts multiple business models.
- “Paddle SCA=false means Paddle has no 3DS.” It means ArraySubs does not manage that capability in the inspected adapter.
- “PayPal can update every subscription payment method seamlessly.” The inspected reauthorization path is incomplete.
- “WooPayments country/method coverage proves ArraySubs coverage.” WooPayments is ecosystem context, not an ArraySubs adapter in the inspected registry.
- “Gateway Health available=true means the merchant is legally/financially eligible.”
- Country/provider rankings with no last-verified date and publication-day refresh.

## 11. Publication-day revalidation checklist

- Recheck seller-country, supported-currency, payment-method, product-policy, pricing/fees, payout, and regulatory pages for each provider.
- Recheck whether Stripe’s India PaymentIntents/SetupIntents e-mandate limitation remains and whether the ArraySubs adapter architecture changed.
- Recheck ArraySubs Free/Pro versions, adapter registry/capability maps, availability checks, payment-update paths, and cart restrictions.
- Confirm the provider account is live-approved for the exact product, entity, buyer country, currency, and recurring method.
- Run the test matrix for the precise WooCommerce extension and ArraySubs adapter—not a provider demo integration.
- Revalidate tax/seller-of-record and consumer-rule conclusions with current contract and qualified advisers.
- Capture dated screenshots; remove customer data, API keys, webhook secrets, provider IDs, account identifiers, and financial totals.

## 12. Primary source register

- Stripe global availability: https://stripe.com/global
- Stripe currencies: https://docs.stripe.com/currencies
- Stripe payment-method support: https://docs.stripe.com/payments/payment-methods/payment-method-support
- Stripe India recurring payments: https://docs.stripe.com/india-recurring-payments?integration=paymentIntents-setupIntents&locale=en-GB
- PayPal country codes: https://developer.paypal.com/reference/country-codes/
- PayPal worldwide availability: https://www.paypal.com/pm/webapps/mpp/country-worldwide
- PayPal currency codes: https://developer.paypal.com/api/rest/reference/currency-codes/
- PayPal Subscriptions overview: https://developer.paypal.com/subscriptions/about
- PayPal Subscriptions integration: https://developer.paypal.com/subscriptions/integrate
- Paddle supported supplier countries: https://www.paddle.com/help/legal/sanctions/which-countries-are-supported-by-paddle
- Paddle product restrictions: https://www.paddle.com/help/start/intro-to-paddle/what-am-i-not-allowed-to-sell-on-paddle
- Paddle supported currencies: https://developer.paddle.com/concepts/sell/supported-currencies/
- Paddle payment methods: https://developer.paddle.com/concepts/payment-methods/
- Paddle Supplier Terms: https://www.paddle.com/legal/terms
- EBA mandate/SCA Q&A: https://www.eba.europa.eu/single-rule-book-qa/qna/view/publicId/2018_4031
- EBA merchant-initiated transaction Q&A: https://www.eba.europa.eu/single-rule-book-qa/qna/view/publicId/2018_4131
- RBI e-mandate circular: https://www.rbi.org.in/scripts/bs_circularindexdisplay.aspx/Scripts/BS_CircularIndexDisplay.aspx?Id=12722
- WooPayments countries, ecosystem context only: https://woocommerce.com/document/woopayments/compatibility/countries/
- WooPayments subscriptions, ecosystem context only: https://woocommerce.com/document/woopayments/subscriptions/
- WooPayments payment methods, ecosystem context only: https://woocommerce.com/document/woopayments/payment-methods/
- WooPayments payout currencies, ecosystem context only: https://woocommerce.com/document/woopayments/payouts/payout-currencies/
- WooCommerce Subscriptions gateways, ecosystem context only: https://woocommerce.com/document/subscriptions/payment-gateways/

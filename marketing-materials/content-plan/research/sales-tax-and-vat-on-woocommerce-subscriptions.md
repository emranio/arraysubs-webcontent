# Research packet — Sales Tax and VAT on WooCommerce Subscriptions

**Brief:** A065  
**Verified:** 2026-07-21  
**Evidence base:** current official regulator/platform documentation plus source inspection of ArraySubs 1.8.11 and ArraySubs Pro 1.1.2.  
**Required framing:** general operational information, not tax, legal, accounting, or financial advice. Registration, taxability, sourcing, rates, invoice rules, evidence requirements, exemptions, and refund treatment are jurisdiction- and fact-specific and require qualified review.

## Recommended direct answer (54 words)

For WooCommerce subscriptions, tax is not a percentage chosen once at signup. The seller must establish registration or nexus, product taxability, customer location and status, and whether the seller or a Merchant of Record owns transaction tax. Each renewal should use valid inputs and leave an auditable order, payment, tax, refund, and invoice trail.

## Core finding: solve four questions before configuring a rate

1. **Who is the buyer-facing seller?** With WooCommerce plus a payment processor such as Stripe or PayPal, the merchant normally remains the seller responsible for determining, registering, collecting, reporting, and remitting applicable transaction tax. A processor transmitting an amount is not automatically a tax engine or Merchant of Record. Paddle states that it acts as reseller/Merchant of Record for covered eligible sales and handles applicable VAT/sales-tax collection and remittance; the supplier still owns accurate product classification, eligibility, product delivery, its own bookkeeping/taxes, and integration reconciliation.
2. **Where does the seller have an obligation?** In the US, physical presence and state economic-nexus rules can matter; *South Dakota v. Wayfair* rejected a constitutional rule requiring physical presence. State thresholds, measurement periods, included revenue, taxability, sourcing, registration timing, and marketplace treatment differ. Do not publish a universal US threshold. In the EU/UK, place-of-supply and customer-status rules matter, especially for electronically supplied services.
3. **What is being sold?** “Subscription” describes payment cadence, not a universal tax category. Physical goods, downloaded software, remote-access software/SaaS, automated digital content, live human services, memberships, and mixed bundles can have different treatment. Washington is a useful official counterexample to simplistic claims: its Department of Revenue says digital products may be taxable whether downloaded, streamed, accessed through a subscription, or supplied as remote-access software. This proves variation, not a nationwide rule.
4. **Which facts apply to this renewal?** Relevant facts may include customer shipping or billing location, business/consumer status, valid tax ID or exemption evidence, product classification, price/tax-inclusive mode, discount, credit, refund, and the rate/effective date. A recurring agreement can produce a new taxable event or tax point each cycle; do not assume the initial tax result is permanent.

## Current jurisdiction findings to use carefully

### European Union VAT and OSS

- The EU One Stop Shop can let a business register once, submit one return, and make one payment for covered cross-border B2C sales rather than register separately in every Member State. The correct OSS scheme depends on where the seller is established and whether it is supplying goods or services.
- The official OSS guide says VAT is charged at the customer-country rate for covered destination-based sales, with sales reported through the Member State of Identification. It also says records may need to be kept for up to ten years. The article should say “OSS simplifies reporting”; it does not erase the need for registration analysis, correct product/customer classification, evidence, returns, and payment.
- For cross-border EU services, B2B and B2C treatment differs. A valid VAT number and the reverse-charge mechanism can affect a B2B service sale; exceptions apply. Never say “all EU subscriptions are charged the customer’s VAT rate.” First determine whether the supply is an electronically supplied service, another service, or goods, and whether the customer is a taxable person.
- For EU-established sellers of telecommunications, broadcasting, and electronic services, the official small-turnover simplification uses a EUR 10,000 cross-border threshold under stated conditions. Do not present this as a worldwide, non-EU, all-product, or general VAT-registration threshold.
- EU guidance on chargeable events says successive statements or payments for extended/continuous supplies can create a chargeable event at the end of each period to which they relate. Member States can have implementation details. Use this only to explain why recurring cycles need current tax controls, not to give jurisdiction-specific filing advice.

### United Kingdom VAT

- HMRC says B2C digital services supplied to UK consumers are liable to UK VAT; digital services supplied to consumers outside the UK may instead be taxable where the consumer is located. An overseas supplier may need UK VAT registration for UK B2C digital services. Product definition and place-of-supply analysis come first.
- HMRC distinguishes electronically supplied services from services merely arranged over the internet. Software, software updates, hosting, automated digital content, and online magazines are examples of electronic services; live/human-delivered education and professional advice can fall outside that category depending on facts.
- HMRC lists location evidence such as billing address, IP address, bank details, SIM country, landline, and other commercially relevant information. A Woo billing country by itself should not be advertised as universally sufficient evidence.
- HMRC’s VAT Notice 700 says a continuous service paid regularly generally has a tax point when a VAT invoice is issued or payment is received, whichever happens first, subject to the detailed rules. A subscription renewal therefore needs a defensible invoice/payment/tax record, not just a copied signup percentage.
- HMRC explicitly distinguishes a payment processor from a digital platform that is treated as supplier. Merely processing payment does not transfer VAT responsibility. This is a strong primary-source distinction for Stripe/PayPal versus a contractual MoR.

### United States sales tax

- Use *Wayfair* only for the principle that substantial nexus can arise from economic and virtual contacts; do not infer one national threshold. The Streamlined Sales Tax state practices and each state revenue authority remain the operational sources.
- Physical presence can independently trigger registration even below an economic threshold. Employee, inventory, office, contractor, affiliate, event, and other facts can matter by state.
- Product taxability varies. A “membership,” “SaaS plan,” “plugin license,” “digital publication,” “support plan,” and “subscription box” should not share one unreviewed product code or tax class.
- Sourcing can require more precise location data than country/state alone. Stripe’s own tax documentation warns that a five-digit ZIP can be insufficient in some US states. Collect only necessary data, but do not promise rooftop-accurate tax from an incomplete address.
- Marketplace-facilitator collection does not necessarily eliminate a seller’s other registrations, filings, B&O/franchise/income taxes, or obligations on direct sales. Likewise, a Merchant of Record changes the covered buyer transaction but not every supplier-side duty.

## WooCommerce behavior and configuration facts

- WooCommerce core supplies a tax calculation framework, not legal advice or a determination of when tax is owed. Its official docs repeatedly direct merchants to a tax professional.
- Core Taxes must be enabled. The merchant chooses whether catalog prices are entered inclusive or exclusive of tax, whether tax is based on customer shipping address, customer billing address, or shop base, product/shipping tax classes, rate tables, compound/priority behavior, rounding, display, and itemized tax names.
- WooCommerce calculates taxes per line. Its official example shows why tax included in a price is not simply `gross × rate`; at 20% on a tax-inclusive 120, tax is `120 - (120 / 1.2) = 20`.
- Core Taxes support manually maintained rates. Automated calculation requires an additional tax extension/service. Never describe core WooCommerce, ArraySubs, Stripe payments, or PayPal payments as automatically monitoring registrations, updating every rate, filing, or remitting.
- Woo’s EU VAT Number extension can collect and validate EU VAT numbers, apply configured exemptions, compare billing country with IP evidence for digital goods, and save evidence. That is a separate extension, not native ArraySubs behavior.
- Product `tax_status` and `tax_class` are decisive configuration inputs. Mixed carts should use separate items/classes when the legal analysis calls for different treatment; one blended subscription line makes tax, refund, and audit allocation harder.

## Current ArraySubs / ArraySubs Pro implementation findings

These are first-party source observations, not claims about every tax extension or future release.

### Local renewal order construction (ArraySubs core)

- `arraysubs/src/Features/SubscriptionCheckout/Services/Traits/SubscriptionCreationTrait.php:343-375` captures the checkout billing and shipping addresses into subscription metadata.
- `arraysubs/src/Features/RecurringBilling/Services/OrderCreation.php:97-187` creates a fresh WooCommerce renewal order, adds the current product object but sets the line amount from the subscription’s stored recurring price, copies the subscription billing/shipping addresses, adds eligible shipping, and calls `$order->calculate_totals()`.
- Consequence: ordinary local renewals can use current Woo tax configuration/rates and the address stored on the subscription, while preserving the promised recurring price. A product catalog price edit does not automatically reprice existing subscribers, but a tax table/class/status/address change can change the calculated tax. Third-party tax extensions can alter the result through Woo hooks; test the installed stack.
- Admins can update both subscription billing and shipping addresses in `SubscriptionController.php:849-864`. The current customer portal endpoint updates the subscription shipping address only and applies a default three-day cutoff (`CustomerController.php:589-689`). Updating a customer’s general Woo account address is not proof that the subscription address changed. Establish an explicit tax-address update workflow.
- ArraySubs source search found no native VAT-ID/VIES validation, reverse-charge decision, tax-exemption engine, OSS return, threshold monitor, or filing/remittance system. A generic/custom field is not tax validation. Compatible external Woo extensions may supply this behavior, but it must be integration-tested.
- Normal renewal creation does not copy the original order’s ordinary coupon lines. Retention discounts and plan-switch fees use their own paths. The current retention discount is implemented as a non-taxable negative fee. Do not assume its tax treatment is correct for every jurisdiction; obtain review and compare line tax before/after.

### Stripe automatic renewals

- `arraysubspro/src/Features/AutomaticPayments/Gateways/Stripe/StripeDelegate.php:190-229` charges an off-session PaymentIntent for the final Woo renewal order total. The request carries amount, currency, customer, payment method, and metadata; it does not enable Stripe Tax or create a Stripe Billing invoice/subscription.
- Therefore, in the inspected ArraySubs path, WooCommerce/the installed tax extension determines the tax and ArraySubs sends the resulting gross amount to Stripe. Stripe is the payment processor, not the seller or tax ledger in this flow.
- Stripe Tax is a separate product. Its official docs say it can calculate tax for Stripe Billing recurring payments and monitor potential obligations primarily from Stripe-processed sales, but merchants must confirm actual registration requirements. Do not imply those Stripe Tax features are wired into ArraySubs merely because Stripe is the gateway.

### PayPal automatic renewals

- ArraySubs Pro computes an effective tax percentage at checkout from Woo rates and location, includes percentage plus inclusive/exclusive mode in a cached plan signature, and sets PayPal Billing Plan `taxes` (`PayPalGateway.php:1412-1569`). PayPal’s API officially supports a plan-level tax percentage/inclusive flag.
- PayPal then owns the remote billing schedule; `processRenewalPayment()` does not initiate a charge and waits for `PAYMENT.SALE.COMPLETED`. This is not a per-renewal Woo tax calculation sent before PayPal charges.
- Material caveat: source inspection found no path that updates an already accepted PayPal subscription/plan tax when the customer’s address, Woo rate table, product tax class, or exemption status later changes. A later local renewal order can recalculate tax differently from the fixed remote plan. Treat address/rate/exemption changes as a reconciliation and migration problem; run a sandbox test before stating exact behavior.
- PayPal’s official terms make the seller responsible for determining, assessing, collecting, reporting, and remitting applicable tax. A PayPal plan tax field transmits a merchant-selected percentage; it is not evidence that PayPal determined legal taxability or became MoR.

### Paddle Merchant of Record renewals

- Paddle’s official materials state that it acts as reseller/Merchant of Record for covered eligible digital-product sales, collects customer facts, calculates and remits applicable sales tax/VAT/GST, and issues compliant invoices. The contractual scope, product eligibility, tax category, buyer status, and supplier obligations still require review.
- ArraySubs Pro creates Paddle catalog Products with a hard-coded `tax_category: standard` (`PaddleProductSync.php:77-84`, with another same default for one-time products). “Standard” must not be treated as a reviewed classification for every plugin, SaaS, ebook, game, membership, or mixed service.
- Paddle’s transaction `details` are documented as the source of truth for transaction totals, including discounts, tax, credits, and currency conversion. Its transaction API exposes tax rates and totals; its Adjustment API handles refunds/credits.
- In the inspected ArraySubs webhook success path, the integration persists Paddle transaction/subscription identifiers and payout total, then marks the local Woo order paid. Source search found no persistence of the remote line-level tax/rates into Woo tax items. This is an inference from the current code: treat Paddle’s transaction/invoice/adjustment as buyer-tax truth and the Woo order as an operational ledger until reconciliation proves parity.
- Do not apply Woo tax again to a Paddle checkout as if Woo were the buyer-facing seller. Instead, decide which values are estimates/display versus authoritative Paddle transaction values, and prevent double charging or contradictory invoices.

## Lifecycle events that require tax re-evaluation or reconciliation

| Event | What can change | Required control |
| --- | --- | --- |
| Initial signup | seller role, product class, buyer location/status, inclusive mode | Validate classification, registration, evidence, displayed total, payment total, invoice |
| Renewal | current rate, exemption, address, tax point, discounts | Recalculate or verify remote provider result; never copy the original percentage blindly |
| Address change | sourcing, rate, evidence, gateway plan mismatch | Update the subscription/provider record in time; record effective date; test next renewal |
| VAT ID / exemption change | B2B/B2C or exempt treatment | Validate through the approved service, preserve evidence, define future-only vs corrective effect |
| Plan or product change | tax code/class, price, mixed supply | Reclassify each line; preview proration and the next full renewal |
| Discount or credit | taxable base and allocation | Use explicit line allocation; do not assume a negative fee has universal treatment |
| Full/partial refund | tax to reverse, fee/period allocation | Link refund/credit note/Adjustment to original lines and jurisdiction; do not silently alter future renewals |
| Rate or law change | current and future cycles, grandfathering | Effective-dated rate/classification review; generate before/after sandbox renewals |
| Gateway migration | seller role, tax engine, invoice owner | Rebuild responsibility matrix; reconcile first live cycles across all ledgers |

## Worked examples worth including

All rates and amounts below must be labeled illustrative, not jurisdictional advice.

1. **Exclusive-tax local renewal:** stored recurring net price 100; applicable rate changes from 20% at signup to 21% before renewal. If the subscription address and Woo rate table are current, the new order can calculate 21 tax and Stripe can charge the resulting 121. This shows recurring price stability does not mean gross-total stability.
2. **Inclusive-price renewal:** a displayed/gross 120 at 20% contains net 100 and tax 20. At 19% while keeping gross 120, net becomes about 100.84 and tax about 19.16. This demonstrates why finance must reconcile net revenue as well as the buyer total.
3. **PayPal drift test:** initial PayPal plan carries 20% tax. Before renewal, change the subscription tax address/rate to an illustrative 21%. Compare PayPal Sale amount with the Woo renewal order created from current data. The expected risk is 120 remote versus 121 local; do not state the result until sandbox evidence confirms it.
4. **Paddle MoR test:** compare Paddle Transaction `details.totals.tax`, `tax_rates_used`, buyer invoice, Adjustment, payout totals, Woo order total/tax lines, and ArraySubs subscription/order IDs. Differences may be legitimate ledger roles, but unexplained differences are launch blockers.

## Recommended article outline

1. **Direct answer and key takeaways** — 40–60 words, then a five-bullet box. Put “general information, not tax advice” visibly before jurisdictional details.
2. **Why a subscription is not a tax category** — introduce seller role, obligation/nexus, product classification, and customer facts as the four-part decision model.
3. **Who owns tax: merchant, processor, tax engine, or MoR?** — a responsibility table for Woo + Stripe, Woo + PayPal, optional tax service, and Paddle MoR. Link to A060 and A066 rather than duplicating full MoR setup/comparison.
4. **EU VAT/OSS, UK VAT, and US sales tax without false universals** — short jurisdiction sections with official sources and explicit boundaries.
5. **How WooCommerce calculates tax** — inclusive/exclusive formula, location basis, product/shipping tax classes, Core Taxes versus automation, VAT-ID extension distinction.
6. **Initial checkout versus renewal** — show an extractable table and explain ArraySubs’ stored recurring price + current Woo calculation model. Link to A028 for the narrow tax/shipping renewal mechanics.
7. **Physical, digital, service, and mixed subscriptions** — classification worksheet; recommend separate line items/classes and evidence for mixed offers.
8. **Changes after signup** — address, VAT/exemption status, rate, discount, credit/refund, plan switch, and invoices. Include the PayPal fixed-plan caveat and Paddle remote-truth model.
9. **Gateway-specific ArraySubs operating model** — Stripe order-total charge, PayPal plan tax, Paddle MoR; clearly separate observed code from provider capability.
10. **Implementation and testing runbook** — configure, test representative buyer types/locations, trigger a renewal, change one fact, refund partially, reconcile four ledgers, retain evidence.
11. **Decision: direct seller or MoR** — operational trade-off, not a universal recommendation. Place the Pro-pricing CTA only after the reader has this framework.
12. **FAQ and limitations** — rate changes, address changes, discounts/refunds, Stripe Tax, PayPal, Paddle, VAT IDs. Link to A064 for webhook/reconciliation monitoring.

## Extractable assets to make the article genuinely useful

- **Responsibility matrix:** legal seller, tax determination, collection, filing/remittance, invoice, refund/credit, source-of-truth ledger for Woo + Stripe, Woo + PayPal, and Paddle.
- **Renewal formula:** `gross renewal = stored recurring net + current taxable shipping/fees - current discounts/credits + current applicable tax`; add caveats for inclusive pricing and remote gateway-led plans.
- **Change-event checklist:** owner, effective date, subscription address, customer tax status, product code/class, expected tax, remote provider record, local order, invoice/credit note, reconciliation status.
- **Four-ledger reconciliation:** Woo order ↔ ArraySubs subscription ↔ gateway transaction/plan ↔ tax return/MoR statement.
- **Test matrix:** B2C/B2B, domestic/cross-border, physical/digital/mixed, inclusive/exclusive, taxable/exempt, initial/renewal/address-change/refund.

## Screenshot targets (capture 4–6, with 3–5 plugin/renewal-specific screens)

1. **ArraySubs subscription edit — billing and shipping address panels.** Annotate that renewal uses subscription-stored address facts, not automatically the customer’s general account address. Use a sanitized test record.
2. **ArraySubs-created Woo renewal order — line subtotal, tax line(s), shipping tax, total, payment method, and renewal note/meta.** This is the strongest proof that the renewal is a new calculated order.
3. **ArraySubs customer portal — Update Shipping Address and cutoff message.** Use it beside the address-change section; do not imply it updates billing address, PayPal plan tax, VAT ID, or Paddle customer tax details.
4. **Woo product editor with ArraySubs subscription pricing plus Woo Tax status/Tax class.** One screenshot can show that cadence and tax classification are separate inputs.
5. **ArraySubs Pro gateway health/settings — Stripe, PayPal, Paddle context.** Use only if the current UI labels are legible and no keys/secrets are exposed; explain that gateway choice changes the tax control plane.
6. **WooCommerce Tax Options or Standard Rates.** Use one core settings screenshot, not several repetitive tables. Annotate inclusive/exclusive pricing, “Calculate tax based on,” and the rate table as software configuration rather than legal determination.

Avoid reusing generic Paddle checkout images from A060 as filler. If Paddle is illustrated, prefer an ArraySubs Paddle gateway/settings or health screen next to a purpose-built diagram showing Paddle Transaction/invoice as remote tax truth.

## Claims to avoid or qualify

- “ArraySubs handles sales tax/VAT” → **No.** It builds Woo renewal orders and integrates gateways; obligation analysis, VAT-ID/exemption validation, registrations, returns, filing, and remittance require Woo extensions/services, merchant processes, or a covered MoR arrangement.
- “Stripe Tax handles ArraySubs renewals” → **Not in the inspected integration.** ArraySubs creates an off-session PaymentIntent for the Woo total; Stripe Tax/Billing is a separate integration.
- “PayPal recalculates tax every renewal” → **Not supported by the inspected path.** ArraySubs sets a plan percentage at checkout and PayPal initiates later charges.
- “Paddle eliminates all tax/compliance work” → **Too broad.** Paddle takes covered buyer-transaction tax duties as MoR; supplier classification, eligibility, accounting, product delivery, privacy, and reconciliation remain.
- “EU digital VAT is always customer-country VAT” → **Too broad.** Seller establishment, B2B/B2C status, service classification, threshold/scheme, and exceptions matter.
- “US SaaS is taxable/non-taxable” → **No nationwide answer.** State law, product facts, sourcing, and nexus differ.
- “A refund changes the next renewal” → **Not automatically.** A refund/credit reverses or adjusts a prior transaction; future pricing/tax changes need their own supported action.
- “One billing address proves customer location” → **Do not promise this.** Evidence requirements vary; digital VAT and local sales-tax sourcing can require more.

## Official primary sources

### Regulators / law

- EU One Stop Shop overview: https://europa.eu/youreurope/business/taxation/vat/one-stop-shop/index_en.htm
- EU cross-border VAT: https://europa.eu/youreurope/business/taxation/vat/cross-border-vat/index_en.htm
- EU services abroad / electronic-services threshold: https://europa.eu/youreurope/business/selling-in-eu/selling-goods-services/provide-services-abroad/index_en.htm
- EU VAT chargeable events: https://taxation-customs.ec.europa.eu/taxation/vat/vat-directive/chargeable-event_en
- HMRC digital services to private consumers: https://www.gov.uk/guidance/the-vat-rules-if-you-supply-digital-services-to-private-consumers
- HMRC VAT Notice 700 (continuous supplies and records): https://www.gov.uk/guidance/vat-guide-notice-700
- US Supreme Court, *South Dakota v. Wayfair*: https://www.supremecourt.gov/opinions/17pdf/17-494_j4el.pdf
- Streamlined Sales Tax marketplace seller guidance: https://www.streamlinedsalestax.org/for-businesses/marketplace-sellers
- Washington DOR digital products: https://dor.wa.gov/forms-publications/publications-subject/tax-topics/digital-products-including-digital-goods

### WooCommerce

- Setting up taxes: https://woocommerce.com/document/setting-up-taxes-in-woocommerce/
- How taxes work: https://woocommerce.com/document/setting-up-taxes-in-woocommerce/how-taxes-work-in-woocommerce/
- Specific tax configurations: https://woocommerce.com/document/setting-up-taxes-in-woocommerce/configuring-specific-tax-setups-in-woocommerce/
- Troubleshooting Core Taxes / extension distinction: https://woocommerce.com/document/troubleshooting-core-taxes/
- EU VAT Number extension behavior: https://woocommerce.com/document/eu-vat-number/

### Stripe

- Calculate tax: https://docs.stripe.com/tax/calculating
- Collect tax for recurring Stripe Billing payments: https://docs.stripe.com/billing/taxes/collect-taxes
- Monitor potential obligations: https://docs.stripe.com/tax/monitoring
- Customer location requirements: https://docs.stripe.com/tax/customer-locations

### PayPal

- Subscriptions API plan tax fields: https://developer.paypal.com/docs/api/subscriptions/v1/
- Subscription integration example with plan tax: https://developer.paypal.com/docs/subscriptions/integrate/
- PayPal seller tax responsibility (official agreement): https://www.paypal.com/us/legalhub/paypal/pp-pos-ps?country.x=US&locale.x=en_US

### Paddle

- Paddle MoR tax-responsibility explanation: https://www.paddle.com/help/start/intro-to-paddle/how-paddle-is-able-to-take-on-your-vat-and-tax-responsibilities
- Paddle VAT/tax handling: https://www.paddle.com/help/sell/tax/how-paddle-handles-vat-on-your-behalf
- Paddle transaction totals/tax source: https://developer.paddle.com/api-reference/transactions/get-transaction
- Paddle Adjustment API: https://developer.paddle.com/api-reference/adjustments/create-adjustment
- Paddle tax-inclusive/exclusive pricing: https://www.paddle.com/help/sell/tax/do-you-support-tax-inclusiveexclusive-pricing

## Research limitations

- This packet deliberately does not list current tax rates or all registration thresholds; those are volatile and jurisdiction-specific.
- No live transaction was submitted to Stripe, PayPal, or Paddle during this research. Product-specific gateway conclusions are source-inspection findings and test hypotheses, not proof of production settlement behavior.
- The article should identify the tested WooCommerce/WordPress/ArraySubs versions, tax extensions, gateway modes, sample product classes, and dates. Re-verify quarterly and after any tax-extension, gateway, product-classification, address-workflow, or MoR contract change.
## 2026-07-22 completion audit

Rechecked the finished article against ArraySubs 1.8.11, ArraySubs Pro 1.1.2, WooCommerce 10.9.4, and the accepted staging screenshot evidence. Preserved every existing visual, kept the general-information/not-tax-advice boundary explicit, and added a visible verification-scope, limitations, and update-log section. The staging store still had no configured Standard tax rates, and no live/sandbox gateway transaction, VAT-ID validation, filing, or Merchant-of-Record reconciliation was performed during this completion audit.

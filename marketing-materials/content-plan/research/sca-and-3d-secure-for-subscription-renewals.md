# Research packet: SCA and 3D Secure for Subscription Renewals

## Verified screenshot replacement plan — 2026-07-22

These clean originals were captured from the confirmed staging site after ArraySubs Pro activation. They replace or supplement untraceable screenshot references while preserving all prior image files. Each original was inspected twice before annotation and contains no API key, webhook secret, customer identity, payment token, or recovery URL.

1. **Official Stripe account connection**
   - Source route: `http://localhost:10013/wp-admin/admin.php?page=wc-settings&tab=checkout&section=stripe`
   - Original: `a062-stripe-account-connection-original.png`
   - Placement: “Store a provider token, not raw card data.”
   - Marker queries: `Outline the official Stripe connection card and label it "Official Stripe".`; `Outline the Create or connect a test account action and label it "Test environment".`; `Outline the Create or connect an account button and label it "Live account".`
2. **WooCommerce Stripe provider row**
   - Source route: `http://localhost:10013/wp-admin/admin.php?page=wc-settings&tab=checkout`
   - Original: `a062-woocommerce-stripe-provider-original.png`
   - Placement: immediately before the Stripe connection screenshot to distinguish installed checkout visibility from configured SCA readiness.
   - Marker queries: `Outline the full Stripe payment-provider row and label it "Official Stripe".`; `Outline the Complete setup button in the Stripe row and label it "Connect Stripe".`; `Outline the Official badge in the Stripe row and label it "Woo extension".`
3. **ArraySubs Stripe Gateway Health**
   - Source route: `http://localhost:10013/wp-admin/admin.php?page=arraysubs-mainadmin#/settings/gateways`
   - Original: `a062-stripe-gateway-health-original.png`
   - Placement: “Why do webhooks matter to SCA recovery?”
   - Marker queries: `Outline the expanded Stripe gateway card and label it "Stripe health".`; `Outline the Official Woo Stripe webhook status row and label it "Official webhook".`; `Outline the ArraySubs secondary webhook status row and label it "ArraySubs webhook".`

Annotation contract for all three: purple `#873EFF`, focused crop, three review passes, and no unresolved markers allowed. Accepted annotated files must be copied byte-for-byte into both the article source directory and its public mirror.

## Research metadata

- **Article ID:** A062
- **Proposed article:** SCA and 3D Secure for Subscription Renewals
- **Focus keyword:** SCA 3D Secure subscription renewals
- **Primary audience:** Global WooCommerce merchants, subscription operators, developers, finance teams, support leads, and compliance reviewers
- **Search intent:** Informational; the reader wants to understand the payment architecture and recovery consequences before choosing or operating a recurring-payment gateway
- **Research completed:** 2026-07-20
- **Code inspected:** ArraySubs 1.8.11, ArraySubs Pro 1.1.2, and the in-repository Stripe bridge compatibility range described below
- **Regulatory posture:** General technical and regulatory education only. Jurisdiction-specific classification, mandate wording, exemptions, and notices require review by the merchant's payment provider and qualified adviser.
- **Scope boundary:** This guide should explain SCA, EMV 3-D Secure, on-session setup, off-session renewal attempts, merchant-initiated transactions, recovery, testing, and gateway ownership. It should link to the narrow Stripe setup recipe rather than repeat that recipe step by step.

## Executive research conclusion

The article's central answer should be that an SCA-ready subscription flow is not a promise that every renewal will be frictionless. The first checkout or stored-credential setup should create valid authority for future use and, where required, authenticate the customer while they are present. Later Stripe renewals can then be attempted off-session as merchant-initiated payments. An issuer can still request authentication, however. The system must preserve that renewal as an actionable pending payment, notify the customer, offer a safe return path, process signed webhooks, and reconcile the final provider state before retrying.

Do not use **SCA**, **3DS**, **challenge**, **recurring exemption**, and **MIT** as synonyms:

- **Strong Customer Authentication (SCA)** is a regulatory authentication standard based on two or more independent factors. The PSD2 definition names knowledge, possession, and inherence as the factor categories. See [Directive (EU) 2015/2366, Article 4(30)](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32015L2366).
- **EMV 3-D Secure (3DS)** is a card-not-present authentication protocol that exchanges transaction and risk data between the merchant side and the issuer side. It can support SCA, but a 3DS flow may be frictionless or may show a challenge. See [EMVCo's 3-D Secure overview](https://www.emvco.com/emv-technologies/3-d-secure/) and its description of [frictionless and challenge flows](https://www.emvco.com/dynamic/emv-3-d-secure-whitepaper-v2/introduction/).
- **A challenge** is an issuer/ACS decision to require more customer interaction. It is not guaranteed merely because a merchant requests 3DS, and it is not the only possible 3DS outcome. [EMVCo explains that the issuer's ACS can invoke a challenge based on risk or a regulatory requirement](https://www.emvco.com/dynamic/emv-3-d-secure-whitepaper-v2/challenge-flow/technical-features/).
- **On-session** means the customer is present and can respond. **Off-session** means the customer is absent when the payment is attempted.
- **Merchant-initiated transaction (MIT)** describes a payment initiated by a payee under a previously established agreement, without the payer actively initiating that particular transaction. The European Banking Authority has said such payee-initiated transactions are outside SCA when genuinely initiated without payer interaction under a standing agreement, while the mandate setup itself requires SCA. See [EBA Q&A 2018_4131](https://www.eba.europa.eu/single-rule-book-qa/qna/view/publicId/2018_4131) and [EBA Q&A 2019_4776](https://www.eba.europa.eu/single-rule-book-qa/qna/view/publicId/2019_4776).
- **Recurring-payment treatment under Article 14** is narrower: when a payer creates or amends a series of recurring transactions of the same amount and same payee, SCA applies to the creation, amendment, or first transaction, while later transactions in that qualifying series are treated differently. See [Commission Delegated Regulation (EU) 2018/389, Article 14](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32018R0389).

The article should explicitly say that classification depends on the actual payment arrangement and provider implementation. A merchant should not label all subscription renewals an “SCA exemption.” A properly initiated MIT is generally discussed as outside scope, while an exemption is a different legal and payment-network concept. The issuer can still reject an attempted payment or require the customer to come back on-session.

## Recommended 40–60 word direct answer

> SCA-ready subscription renewals begin with an authenticated, reusable payment method and clear authority for future charges. Later renewals can be attempted off-session, often as merchant-initiated transactions, but an issuer may still require 3D Secure. The store therefore needs a customer recovery link, reliable webhooks, pending-payment handling, and reconciliation before any retry.

This is 46 words. Keep ArraySubs out of the direct answer so that the answer remains independent and extractable. Introduce product behavior only after the conceptual model is established.

## Key takeaways box for the article

1. SCA is the authentication requirement; 3DS is a card authentication protocol that may help satisfy it.
2. A 3DS exchange can be frictionless. “3DS” does not always mean a modal or banking-app challenge.
3. Future off-session use must be established correctly while the customer is on-session, with appropriate permission and provider parameters.
4. MIT treatment and the same-amount recurring exemption are not interchangeable legal labels.
5. Issuers make the final authentication and authorization decisions; no plugin can guarantee that a renewal will avoid customer action.
6. ArraySubs Pro's Stripe bridge creates and confirms a new off-session PaymentIntent for each local renewal. It does not create a Stripe Billing subscription.
7. When Stripe returns `requires_action`, ArraySubs preserves the renewal as pending and sends the customer to the WooCommerce pay-for-order/Stripe confirmation flow.
8. PayPal Subscriptions and Paddle own their remote schedules and authentication behavior. ArraySubs waits for their webhooks instead of creating Stripe-style renewal charges.
9. Webhook health, customer recovery, grace-period accuracy, and provider-state reconciliation are as important as the initial checkout challenge.

## Terminology and copy-safe definitions

| Term | Precise working definition | Safe article language | Avoid |
|---|---|---|---|
| SCA | Authentication using at least two independent elements from knowledge, possession, and inherence, under the applicable regulatory framework | “SCA is an authentication standard; whether it applies depends on jurisdiction and transaction context.” | “SCA means a 3DS popup.” |
| EMV 3-D Secure / 3DS | A card-not-present authentication protocol that enables merchant/acquirer and issuer systems to exchange transaction, device, and authentication data | “3DS can support an SCA-compliant card flow.” | “3DS is SCA.” |
| Frictionless flow | A 3DS authentication result reached without an interactive customer challenge, based on risk and available data | “A 3DS flow can complete without a visible challenge.” | “No popup means 3DS was not used.” |
| Challenge flow | An issuer-directed interaction asking the cardholder for an additional step, such as a banking-app approval | “The issuer may require a challenge.” | “The plugin decides whether the bank challenges.” |
| On-session payment | Customer is actively participating and can complete authentication | “The initial checkout is normally the best moment to establish future-use permission and handle a challenge.” | “On-session guarantees approval.” |
| Off-session payment | Payment is attempted when the customer is not actively in checkout | “A renewal can be attempted off-session using a previously saved payment method and authority.” | “Off-session means exempt.” |
| Stored credential | Provider token/payment method representing payment details stored for later use | “Store tokens through the gateway; do not store raw card details in WordPress.” | “ArraySubs stores the card.” |
| MIT | Merchant/payee initiates a charge under an earlier agreement without the payer actively initiating that payment | “Properly established MITs may be outside SCA scope, but provider and network rules still apply.” | “Every recurring charge is automatically an MIT.” |
| Recurring-payment treatment | Article 14 treatment for a qualifying same-amount, same-payee series established/amended with SCA | “This is a narrower category than subscription billing in general.” | “Variable renewals always qualify for the recurring exemption.” |
| Soft decline / `authentication_required` | Issuer declines or defers a payment because customer authentication is needed | “Bring the customer back on-session to authenticate; do not treat it like an ordinary card decline.” | “Retry repeatedly until it works.” |
| `requires_action` | Stripe PaymentIntent state indicating another step is necessary before payment can complete | “Preserve the PaymentIntent/order context and present the required next action.” | “The payment failed permanently.” |
| Authorization | Issuer approves the payment transaction | “Authentication and authorization are distinct.” | “Successful 3DS guarantees the charge.” |

## SCA and 3DS: the conceptual model

### SCA is an outcome requirement, not a user-interface component

The article should first dismantle the common mental model that “SCA equals a 3DS screen.” SCA describes how the payer is authenticated. 3DS is a messaging and authentication framework available for card-not-present transactions. An issuer can complete a 3DS authentication without showing an interactive challenge, or it can request a challenge. A challenge may succeed while the subsequent authorization is still declined for a different reason, such as insufficient funds or a restricted card.

An article decision table can make this extractable:

| Authentication result | Authorization result | Operational meaning |
|---|---|---|
| Frictionless 3DS succeeds | Payment succeeds | Complete the order; retain webhook evidence and provider ID. |
| Challenge succeeds | Payment succeeds | Complete the order after server/webhook confirmation. |
| Challenge succeeds | Payment is declined | Treat as the provider's decline category; do not call it an SCA failure. |
| Challenge is abandoned or fails | Payment remains actionable/declined | Keep a recovery path and explain the customer action needed. |
| Off-session attempt returns `requires_action` | Not yet paid | Bring the customer on-session and continue the existing payment context. |
| Provider returns a hard decline | Not paid | Follow the retry/grace policy appropriate to the decline, not an authentication loop. |

### On-session setup should establish later-use authority

Stripe's SetupIntent documentation says a future-use setup should capture the customer's agreement to save and reuse the payment method, including how permission is obtained, the anticipated frequency, and how amounts are determined. It also explains that `usage=off_session` prepares the method for later off-session use and that subsequent payments are marked as merchant-initiated transactions. See [Stripe SetupIntents](https://docs.stripe.com/payments/setup-intents).

For a payment that also collects money now, a PaymentIntent can include `setup_future_usage=off_session`. Stripe says this helps optimize the method for future use and satisfy network-rule requirements; an on-session-only setup can be rejected when later used off-session. See [Stripe PaymentIntents](https://docs.stripe.com/payments/payment-intents) and [Stripe's save-and-reuse guide](https://docs.stripe.com/payments/save-and-reuse?client=react&platform=web&ui=elements).

Copy guardrail: do not promise that setting one parameter creates legally sufficient consent. The merchant's checkout disclosure, terms, cancellation model, amount/frequency explanation, PSP configuration, and jurisdiction all matter. Use wording such as “helps the gateway prepare and classify future use” rather than “makes the payment compliant.”

### A strong setup reduces friction; it does not eliminate issuer control

Stripe's SCA guidance says exemptions are not guaranteed because the issuer makes the final decision, and an issuer may still require authentication. Stripe's 3DS flow documentation likewise assigns the frictionless-versus-challenge decision to the issuer side. See [Stripe's SCA exemptions guide](https://docs.stripe.com/payments/3d-secure/strong-customer-authentication-exemptions?locale=en-GB), [Stripe's SCA overview](https://docs.stripe.com/strong-customer-authentication?locale=en-GB), and [Stripe's 3DS authentication flow](https://docs.stripe.com/payments/3d-secure/authentication-flow?locale=en-GB).

Recommended phrasing:

> Correct future-use setup gives the issuer better signals and a valid stored-credential context. It cannot guarantee approval or suppress an issuer-requested challenge.

## Regulatory distinctions that the article must preserve

### 1. MIT treatment versus an exemption

The EBA's published Q&A distinguishes a payee-initiated transaction based on a standing agreement from payer-initiated activity. When the payee truly initiates the later transaction without the payer's involvement, the transaction is not subject to SCA under the stated analysis. The EBA separately says SCA is required when the payer establishes the MIT mandate remotely. [EBA Q&A 2018_4131](https://www.eba.europa.eu/single-rule-book-qa/qna/view/publicId/2018_4131), [EBA Q&A 2019_4776](https://www.eba.europa.eu/single-rule-book-qa/qna/view/publicId/2019_4776).

This is better described as “outside scope when the conditions are met” than as an “MIT exemption.” The payment provider and acquiring stack still need to transmit the transaction correctly, and an issuer can still reject it or request customer authentication.

### 2. Article 14 recurring-payment treatment is narrower

Article 14 concerns a series with the same amount and same payee. SCA applies when the payer creates or amends the series or initiates the first transaction. That rule should not be generalized to variable usage charges, metered bills, prorations, mid-cycle plan changes, trial-to-paid transitions with changed terms, add-ons, taxes that alter the total, or other schedules without provider/legal confirmation. See [Commission Delegated Regulation (EU) 2018/389](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32018R0389).

### 3. Authentication and authorization remain separate

The payment can authenticate successfully and still fail authorization. The renewal engine must follow the provider's final state, not infer payment success from a completed challenge or browser redirect. Stripe's PaymentIntent state machine includes states such as `requires_action`, `processing`, `requires_payment_method`, and `succeeded`. See [Stripe PaymentIntent lifecycle](https://docs.stripe.com/payments/paymentintents/lifecycle) and the [confirm API](https://docs.stripe.com/api/payment_intents/confirm).

### 4. Scope is geographic and product-specific

Use European rules as the clearest model because the requested keyword is SCA, but state that SCA requirements, enforcement, card-network rules, and provider products differ by market. The [UK Financial Conduct Authority's SCA overview](https://www.fca.org.uk/firms/strong-customer-authentication) is an appropriate primary UK reference. The article should not present EU text as universal law.

### 5. Amount or mandate changes need qualified review

If price, billing frequency, merchant/payee identity, or the authority changes, do not assert that the original authentication remains sufficient. Article 14 explicitly addresses creation and amendment of a qualifying series. Variable amount MITs can still be valid in some provider arrangements if the authority and network indicators are correct, but this must be confirmed with the PSP/acquirer and counsel.

## Lifecycle model for a Stripe subscription renewal

Use this as the article's original, product-independent lifecycle diagram:

```text
Customer present
    |
    v
Checkout explains future charges and captures permission
    |
    v
PaymentIntent or SetupIntent prepares payment method for off-session use
    |
    +--> issuer requests 3DS challenge --> customer completes or abandons
    |
    v
Gateway stores a reusable token / mandate context
    |
    v
Renewal due; customer absent
    |
    v
Store creates and confirms an off-session payment
    |
    +--> succeeded ----------> paid renewal + lifecycle advances
    |
    +--> processing ---------> wait for signed webhook, then reconcile
    |
    +--> requires_action ----> pending renewal + email/pay link
    |                              |
    |                              v
    |                         customer returns on-session
    |                              |
    |                              v
    |                         issuer challenge / confirmation
    |                              |
    |                              v
    |                         webhook + reconciliation
    |
    +--> hard/temporary decline -> retry/grace policy by failure class
```

### Worked example for original analysis

Use a realistic but non-legal example:

1. A member buys a USD 29 monthly plan while present at checkout.
2. Checkout informs the member that the card will be stored with the payment provider and charged monthly until cancellation.
3. Stripe performs a challenge at signup and saves the payment method for off-session use.
4. On the next renewal, the ArraySubs scheduler creates a WooCommerce renewal order and ArraySubs Pro creates a separate Stripe PaymentIntent for USD 29 with `off_session=true` and `confirm=true`.
5. If it succeeds, the order is paid and the next renewal advances.
6. If Stripe returns `requires_action`, the order remains pending. The customer receives a verification link and completes the issuer step on the WooCommerce pay-for-order page.
7. If the customer does nothing, the normal store grace/on-hold/cancellation rules apply. Repeated blind off-session retries are not a substitute for authentication.

Label this as an explanatory example, not a compliance template.

## Exact ArraySubs implementation truth

### Test/code environment

- ArraySubs plugin header: **1.8.11** (`arraysubs/arraysubs.php`)
- ArraySubs Pro plugin header: **1.1.2** (`arraysubspro/arraysubspro.php`)
- ArraySubs Pro Stripe compatibility service requires the official WooCommerce Stripe Gateway plugin at **9.8.0 or newer** and reports **10.6.1** as the tested bridge version (`arraysubspro/src/Features/AutomaticPayments/Services/StripeAvailability.php`).
- Findings below are a first-party code inspection of this workspace, not an independent certification and not proof of a production Stripe account's settings.

### Product responsibility map

| Stage | Current owner in the Stripe path | What happens |
|---|---|---|
| Checkout UI and first Stripe payment | Official WooCommerce Stripe Gateway | Collects/authenticates card details and handles first-payment 3DS. |
| Future-use intent adjustment | ArraySubs Pro compatibility layer, through official Stripe hooks | Subscription checkout is marked for reusable off-session use. |
| Subscription schedule | ArraySubs core | Determines due renewal, creates WooCommerce renewal order, and runs lifecycle/grace behavior. |
| Stripe renewal charge | ArraySubs Pro Stripe delegate | Creates and confirms a new off-session PaymentIntent against the saved customer/payment method. |
| `requires_action` recovery | ArraySubs Pro + ArraySubs core + official Woo Stripe pay page | Stores action context, keeps order pending, emails a pay/verification link, and relies on Stripe confirmation/webhooks. |
| Success/failure finalization | Gateway delegate, signed webhooks, and ArraySubs renewal processor | Completes or fails the WooCommerce order, updates lifecycle, and schedules retry when appropriate. |

### Initial Stripe setup in code

`arraysubspro/src/Features/AutomaticPayments/Services/StripeSubscriptionCompatibility.php` hooks into the official WooCommerce Stripe extension instead of replacing its card form.

Observed behavior:

- For a logged-in ArraySubs subscription checkout, it forces the official Stripe gateway's reusable-payment-method behavior.
- It adds `setup_future_usage=off_session` to PaymentIntent data.
- It also applies an off-session future-use fallback to PaymentIntent/SetupIntent request data where appropriate.
- The compatibility callback returns early for users who are not logged in. The article should not assert that a guest subscription checkout is fully prepared for reuse without testing the actual account-creation/checkout policy. Include guest/account conversion in QA.

Safe product wording:

> ArraySubs Pro works with the official WooCommerce Stripe Gateway at checkout and marks eligible subscription payment methods for future off-session use. The official gateway continues to own card collection and initial 3DS.

Avoid:

- “ArraySubs captures or stores card numbers.”
- “ArraySubs replaces WooCommerce Stripe.”
- “Every guest checkout is automatically tokenized.”
- “The flag alone proves mandate consent.”

### Renewal PaymentIntent in code

`arraysubspro/src/Features/AutomaticPayments/Gateways/Stripe/StripeDelegate.php` implements the renewal charge. The current flow:

1. Confirms that the official WooCommerce Stripe gateway is available.
2. Reads the stored Stripe customer and payment-method token tied to the subscription/order context.
3. Builds a new PaymentIntent using the WooCommerce renewal order's total and currency.
4. Sends `customer`, `payment_method`, `off_session=true`, and `confirm=true`.
5. Adds ArraySubs metadata including renewal order, subscription, and site context.
6. For supported bank-debit types, carries the saved mandate where available.
7. Treats `succeeded` as paid.
8. Treats `processing` as pending and waits for provider/webhook resolution.
9. Sends `authentication_required`, `requires_action`, and `requires_confirmation` situations into the customer-action recovery path.

This architecture is important for the article: **ArraySubs schedules the subscription locally and creates a discrete Stripe PaymentIntent per renewal. It does not create a Stripe Billing Subscription.** The official WooCommerce Stripe documentation also explains that its token-based recurring model does not require Stripe Billing; use that only as background, not as a statement about WooCommerce Subscriptions ownership. See [WooCommerce Stripe: Stripe Billing](https://woocommerce.com/document/stripe/admin-experience/stripe-billing/).

### Capability truth for Stripe

The Stripe delegate currently advertises:

- automatic payments
- payment-method update
- card auto-update
- card-expiry notice
- SCA support
- a customer portal path
- mixed carts, multiple subscriptions, and different billing cycles

It does not advertise local pause/resume through the gateway. These are internal capability flags, not a guarantee that every Stripe account, country, payment method, or WooCommerce Stripe configuration supports every lifecycle combination. The article should present them as tested product contract areas and tell the reader to verify their exact setup.

### `requires_action` is pending, not a normal hard failure

In `StripeDelegate::buildRequiresActionResult()` and the associated recovery context:

- ArraySubs returns `status=requires_action` and `requires_action=true`.
- It stores the Stripe PaymentIntent ID and a required-action timestamp.
- It builds an action URL from the WooCommerce order's checkout payment URL with `wc-stripe-confirmation=1`.
- It writes a private payment warning/log and fires `arraysubs_renewal_requires_verification`.
- The same recovery context can also be recorded when the `payment_intent.requires_action` webhook arrives.

In `arraysubs/src/Features/RecurringBilling/Services/RenewalProcessor.php`, `manual_required`, `pending`, and `requires_action` results are deliberately preserved as pending instead of being routed through the normal hard-failure retry scheduler. The pending order is expected to receive customer action and/or later webhook resolution.

This detail should lead to a strong article point:

> An authentication-required renewal is not merely “another failed card attempt.” It is an unfinished payment that needs the customer to return on-session. Preserve its order and PaymentIntent context instead of creating uncontrolled new charges.

### Hard failures and retries

For ordinary failure results, the renewal processor records the failure, classifies it, fails the renewal order where appropriate, and schedules retry. The default retry policy in `arraysubs/src/functions/gateway-helpers.php` is three retries at daily intervals unless the gateway/configuration changes that behavior. Before a retry charge, the processor asks the gateway to reconcile/verify the existing provider state, which is a duplicate-charge defense.

The generic failure classifier recognizes `authentication_required`/`requires_action` as an authentication category and can describe it as a bank-required 3DS action. In the direct Stripe delegate path, however, `requires_action` is normally intercepted as pending before the generic hard-failure path. The article must not say “ArraySubs automatically retries every 3DS-required renewal three times.” It does not; the design waits for customer action.

### Verification email and recovery URL

`arraysubs/src/Features/Emails/Emails/RenewalRequiresVerificationEmail.php` defines the customer-facing renewal verification email. The template:

- identifies the renewal order and amount
- can display card brand/last four when present
- includes a “complete verification” CTA to the WooCommerce pay/Stripe confirmation URL
- explains that an unpaid order follows the normal grace-period process

The email is enabled by default through the email-helper default, subject to store configuration/hooks.

**Important implementation limitation to surface in internal review:** `format_auth_deadline()` currently computes `now + 3 days` and uses that value for both the authentication deadline and a grace-period display variable. The store's actual renewal lifecycle is configurable independently (`renewals.grace_days_before_on_hold` supports 0–30; `renewals.grace_days_before_cancel` supports 1–60). Therefore the article must not promise that the verification email's displayed date always equals the merchant's configured lifecycle deadline. Add this to launch QA and compliance handoff.

Suggested neutral public wording:

> Before launch, send a real test verification email and compare every deadline in the message with the configured on-hold and cancellation policy. Customer copy and subscription access rules must agree.

### Customer payment-method update

The customer portal calls the authenticated payment-method REST endpoint. The controller checks login and subscription ownership (or administrator permission). The coordinator allows updates for active, on-hold, and trial subscriptions, and blocks updates during a waiting-cancellation state.

For Stripe, `StripeDelegate` creates a Stripe Billing Portal session for the saved Stripe customer and redirects there. It also exposes display data such as card brand, last four, and expiry. That is safer than collecting raw card data in ArraySubs.

Do not overclaim synchronization. Updating the Stripe customer's default payment method and updating the exact token referenced by an existing local subscription are related but not automatically equivalent in every multi-subscription/account scenario. The Stripe webhook handler has payment-method update logic, but the article should recommend verifying the specific subscription's stored token/context and running a renewal test after an update.

Use this internal link when discussing that lifecycle: `/deals/arraysubs/use-cases/recipes/member-update-payment/`.

### WooCommerce pay-for-order and 3DS

WooCommerce's official Stripe documentation states that 3DS can be used at checkout and on the “Pay for Order” page. This supports the ArraySubs return URL design. See [WooCommerce Stripe: 3D Secure](https://woocommerce.com/document/stripe/customer-experience/3d-secure/). Its saved-payment documentation explains tokenized saved payment information. See [WooCommerce Stripe: Saved Payment Information](https://woocommerce.com/document/stripe/customer-experience/saved-payment-information/).

Be exact: a documentation statement about the official Stripe extension supports the hosted payment page capability; it is not proof that the staging account has processed a real issuer challenge. The article's test-environment section should label screenshots and tests accordingly.

## Payment state and operator response matrix

| Provider / engine state | Has money been confirmed? | ArraySubs handling | Customer action | Operator action |
|---|---:|---|---|---|
| Stripe `succeeded` | Yes | Complete renewal order and advance lifecycle | None | Reconcile order, PaymentIntent, and subscription IDs. |
| Stripe `processing` | Not yet final | Keep pending; await webhook/provider resolution | Usually none immediately | Monitor age, webhook delivery, and final provider state. Do not create a replacement charge merely because the browser stopped. |
| Stripe `requires_action` | No | Keep renewal pending; store action context and send verification path | Return on-session and complete issuer action | Verify email delivery, action URL, webhook, and eventual order transition. |
| Stripe `requires_confirmation` | No | Route into action/recovery context | May need return/confirmation | Inspect PaymentIntent `next_action` and official gateway logs. |
| Stripe `authentication_required` error | No | Authentication recovery rather than ordinary decline retry | Return on-session | Avoid blind retry loop; ensure customer link is available. |
| Temporary decline | No | Failure classification and configured retry/grace policy | Possibly update method | Reconcile before retry; monitor decline trend. |
| Permanent decline / invalid method | No | Failure path, customer update path, grace policy | Replace payment method | Explain exact action without exposing sensitive gateway details. |
| Signed success webhook after browser loss | Yes | Idempotently complete/reconcile | None | Ensure duplicate webhook cannot duplicate lifecycle side effects. |
| Missing or delayed webhook | Unknown locally | Pending/stale until provider verification | None initially | Compare provider dashboard and local order; repair endpoint and reconcile. |

## Stripe event and webhook evidence

The Stripe bridge's event map includes:

- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `payment_intent.requires_action`
- `setup_intent.succeeded`
- payment-method update events

The secondary webhook provisioner requests a broader set that includes PaymentIntent success/failure/action, invoice success/failure, charge success/refund/dispute, SetupIntent success, payment-method updates, and card-expiration-related events.

Stripe publishes these event types in its [event type reference](https://docs.stripe.com/api/events/types). Stripe advises monitoring payment status with webhooks rather than relying only on client/browser completion; see [verifying PaymentIntent status](https://docs.stripe.com/payments/payment-intents/verifying-status).

Webhook copy should emphasize:

- signature verification
- idempotency by provider event/transaction ID
- a recorded processed time
- association with the WooCommerce order and ArraySubs subscription
- out-of-order delivery tolerance
- no raw card data, CVC, client secrets, or full recovery URLs in general-purpose logs
- periodic reconciliation of stale pending renewals against the provider

Use the internal recipe `/deals/arraysubs/use-cases/recipes/gateway-health-monitor/` for the operational setup detail.

## Gateway Health implementation and screenshot evidence

`arraysubspro/src/Features/AutomaticPayments/REST/GatewayHealthController.php` returns registered gateway health such as:

- whether the gateway is enabled, available, configured, or in test mode
- active subscription count
- last webhook time
- webhook URLs and recent events
- gateway capability flags
- for Stripe: installed/minimum/tested official plugin version, official webhook configuration, ArraySubs secondary endpoint configuration/status, last delivery, and account charges/payouts eligibility

The current screenshot asset `web-content/marketing-materials/product-shots/current/30-stripe-gateway-health-details-original.png` shows a useful **negative state**: Stripe disabled, zero subscriptions, no last webhook, and both the official and secondary webhook checks shown as not configured. It is evidence that the UI exposes those checks; it is not evidence of a healthy Stripe installation.

Recommended caption:

> ArraySubs Gateway Logs surface official Stripe and secondary webhook configuration separately. This staging capture intentionally shows an unconfigured state; production readiness requires both the expected provider events and a recent successful delivery.

Suggested annotations:

1. “Official Woo Stripe webhook configuration” on the first configuration badge.
2. “ArraySubs secondary webhook configuration” on the second badge.
3. “Last webhook / delivery recency” on the last-webhook metric.

Do not crop away the “disabled,” “0 subscriptions,” or “not configured” context. That would make the screenshot misleading.

## PayPal boundary: provider-owned renewal and authentication

`arraysubspro/src/Features/AutomaticPayments/Gateways/PayPal/PayPalGateway.php` integrates the PayPal Subscriptions API. Its architecture differs from the Stripe path:

- PayPal owns the remote subscription schedule and checkout approval.
- ArraySubs does not create a fresh local PayPal charge on each due date.
- The renewal method confirms the remote PayPal subscription identity and returns a pending state while waiting for PayPal events.
- A completed PayPal sale webhook advances the local renewal.
- The adapter's `handlePaymentRequiresAction` is intentionally a no-op because PayPal owns authentication within its flow.
- Payment-method change is modeled as reauthorization, not as a local Stripe-style token swap. The present method only exposes a reauthorization mechanism and does not justify promising a complete one-click migration UX.
- The internal capability map sets `sca=false`. This means **ArraySubs does not own a Stripe-style SCA recovery contract for this adapter**. It does not mean PayPal never performs SCA or 3DS.

PayPal's primary subscriptions documentation lists webhook events including completed sales and subscription payment failures. See [PayPal Subscriptions webhooks](https://developer.paypal.com/subscriptions/webhooks).

Safe article comparison:

> With PayPal Subscriptions, approval, recurring collection, and any provider-required authentication remain inside PayPal's remote subscription system. ArraySubs mirrors lifecycle events through webhooks. Diagnose the PayPal agreement and webhook stream before applying Stripe-specific PaymentIntent advice.

## Paddle boundary: Merchant of Record/provider-owned renewal

`arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleGateway.php` treats Paddle as the Merchant of Record and remote subscription owner:

- Paddle Checkout/Paddle.js owns checkout.
- Paddle owns the recurring schedule and renewal charge.
- ArraySubs' renewal method returns pending and waits for Paddle's transaction webhook rather than initiating a local card charge.
- Paddle handles SCA/authentication inside its payment stack.
- Payment-method updates use a Paddle customer portal session.
- The adapter advertises `sca=false` because ArraySubs does not implement local SCA handling for Paddle.

Paddle says its checkout supports 3DS2, and its documentation describes subscription provisioning/state updates through webhooks. See [Paddle Billing Checkout](https://www.paddle.com/billing/checkout) and [Paddle subscription provisioning through webhooks](https://developer.paddle.com/build/subscriptions/provision-access-webhooks/). Paddle also publishes [sandbox checkout testing guidance](https://www.paddle.com/help/start/set-up-paddle/how-do-i-test-my-checkout-integration).

Safe article comparison:

> Paddle's hosted/Merchant-of-Record flow owns the checkout, renewal attempt, and authentication decision. ArraySubs consumes the remote transaction and subscription states. Operators should use Paddle's sandbox, portal, transaction state, and webhook diagnostics rather than expecting an ArraySubs-generated 3DS recovery PaymentIntent.

## Gateway architecture comparison table

| Question | Stripe through ArraySubs Pro | PayPal Subscriptions | Paddle Billing |
|---|---|---|---|
| Who owns the schedule? | ArraySubs local subscription engine | PayPal remote subscription | Paddle remote subscription |
| Who creates the renewal charge? | ArraySubs Pro creates a Stripe PaymentIntent | PayPal | Paddle |
| Who owns checkout authentication? | Official WooCommerce Stripe Gateway + Stripe/issuer | PayPal | Paddle |
| Who owns renewal authentication recovery? | ArraySubs preserves context and returns customer to official Woo Stripe pay flow | PayPal-hosted agreement/payment flow | Paddle-hosted checkout/portal/payment flow |
| Primary local confirmation mechanism | Stripe webhook + PaymentIntent reconciliation | PayPal subscription/payment webhooks | Paddle transaction/subscription webhooks |
| Is Stripe-style `requires_action` logic applicable? | Yes | No | No |
| Is a provider portal involved in payment updates? | Stripe Billing Portal session | Reauthorization/provider flow | Paddle customer portal |
| Key operational risk | Incorrect future-use setup, missing webhook, stale pending action, token mismatch | Remote agreement state or missing PayPal webhook | Remote transaction/subscription state or missing Paddle webhook |

The article should use this table to answer architecture questions without implying one gateway is universally superior. Stripe offers more local lifecycle control and therefore more local recovery responsibility. PayPal and Paddle reduce that specific local charge orchestration but shift diagnosis and policy to their remote systems.

## Failure and recovery model

### Classify before retrying

The article should distinguish at least five families:

1. **Authentication required:** The customer must return on-session. Repeating the same off-session call is not recovery.
2. **Temporary authorization decline:** Retry may be appropriate under provider advice and the store's dunning policy.
3. **Permanent/credential problem:** Customer needs to replace or correct the payment method.
4. **Processing/unknown:** Wait, consume webhooks, and reconcile before initiating anything new.
5. **Integration/operational failure:** Missing keys, disabled gateway, broken webhook, version mismatch, or mismatched provider/local IDs requires operator repair, not customer blame.

Stripe's decline-code reference explicitly describes `authentication_required` and advises bringing an off-session customer back to authenticate. See [Stripe decline codes](https://docs.stripe.com/declines/codes).

### Recovery UX requirements

A defensible customer journey should:

- say that the renewal needs verification, not that the customer necessarily has insufficient funds
- identify the subscription/order and amount without exposing full payment credentials
- provide a single, authenticated/appropriately secured action URL
- explain what happens to access while payment is pending
- state a deadline that matches the store's actual policy
- render on mobile and support banking-app return flows
- show the final order state after action
- offer a payment-method update option when authentication cannot be completed
- avoid repeatedly emailing after success
- route support to the relevant order/subscription/provider IDs

### Existing screenshot candidates

The article requirement is three to six real plugin screenshots. For this topic, use the following four current originals with honest captions and context-specific annotations:

#### 1. Stripe Gateway Health details

- File: `web-content/marketing-materials/product-shots/current/30-stripe-gateway-health-details-original.png`
- Use: Explain prelaunch configuration checks and webhook observability.
- Evidence status: Real ArraySubs admin capture, deliberately unconfigured Stripe state.
- Contextual variants: one full annotated version for the article; one tighter 16:9 crop for social/support reuse if needed.

#### 2. Customer pending renewal with Pay action

- File: `web-content/marketing-materials/product-shots/current/19-customer-pay-action-original.png`
- Use: Explain why an actionable pending renewal must remain visible to the customer.
- Suggested annotations: “Pay action,” “Pending payment,” and the renewal/order note.
- Limitation: This is a general/manual pending-payment state, not captured proof of an issuer 3DS challenge. Caption it as the local recovery surface that a gateway-specific action can use.

#### 3. Customer recovery and payment-method management

- File: `web-content/marketing-materials/product-shots/current/18-customer-recovery-actions-original.png`
- Use: Explain on-hold state, current payment method, and the “Manage payment methods” path.
- Suggested annotations: “Subscription status,” “Manage payment methods,” and “Next payment/payment method.”
- Limitation: The capture shows check payments, not Stripe. Use it to discuss lifecycle visibility, not Stripe token synchronization.

#### 4. Admin payment timeline and private notes

- File: `web-content/marketing-materials/product-shots/current/14-payment-timeline-original.png`
- Use: Explain how an operator follows renewal invoice, payment state, and notes in one local timeline.
- Suggested annotations: “Renewal invoice,” “Payment timeline,” and “Private subscription notes.”
- Limitation: This is generic lifecycle evidence, not a live 3DS event.

Do not fabricate an issuer challenge screenshot. A real 3DS modal is issuer-controlled and varies by test card, country, device, and ACS. If no clean sandbox capture is available, use a generated context diagram for the on-session/off-session decision flow and clearly label it as an explanatory illustration. Suggested visual contexts:

- desktop flowchart for the conceptual section
- mobile email-to-bank-to-order recovery sequence for the UX section
- operator “provider state vs local state” reconciliation diagram for diagnostics

These should be genuinely different compositions, not color variants of one generic graphic.

## Customer portal and payment-update caveats

The current customer screenshot shows a generic “Manage payment methods” surface. For Stripe, the actual delegate creates a Stripe Billing Portal session. The article should separate these layers:

1. ArraySubs verifies the logged-in user's ownership and whether the subscription is in an updatable lifecycle status.
2. ArraySubs asks the Stripe delegate for the update mechanism.
3. Stripe hosts the sensitive payment-method management interaction.
4. Local subscription/payment-token state should be verified after the update.
5. A test renewal should confirm that the intended method is actually used.

This is especially important when one Stripe customer has multiple saved methods or multiple local subscriptions. Avoid the simplistic claim “changing the default card automatically updates every subscription.”

## Full test matrix

### Test preparation

- Use gateway sandbox/test mode; never use real customer data or live charges for routine validation.
- Record plugin versions, WooCommerce version, official Stripe Gateway version, ArraySubs/Pro version, WordPress version, currency, country, and active payment-method configuration.
- Configure and verify both the official Woo Stripe endpoint and any ArraySubs secondary webhook endpoint expected by the current product architecture.
- Save provider event IDs, PaymentIntent/SetupIntent IDs, WooCommerce order IDs, ArraySubs subscription IDs, timestamps, and screenshots.
- Use a fresh customer per destructive test where cross-test stored credentials would obscure results.
- Verify email delivery to a controlled inbox and inspect both desktop and mobile links.

Stripe publishes test PaymentMethods for authentication behavior in its [testing guide](https://docs.stripe.com/testing?locale=en-GB&testing-method=payment-methods). Relevant examples include methods that always require authentication, require authentication during setup, are already prepared for off-session use, or require 3DS2. Stripe also documents test cards such as `4000 0000 0000 3220` for always-3DS behavior and `4000 0025 0000 3155` for an off-session authentication scenario when not prepared correctly. Use Stripe's current documentation as the source of truth because test behavior can change.

### Initial checkout and setup cases

| ID | Scenario | Expected evidence | Failure signal |
|---|---|---|---|
| SCA-01 | Ordinary card, paid initial checkout | Initial order paid; Stripe customer/payment method stored; future-use context present | Subscription exists without a reusable token/customer. |
| SCA-02 | Card requiring 3DS at checkout, customer completes | Challenge succeeds; order paid; reusable method saved | Browser says paid but webhook/order remains inconsistent. |
| SCA-03 | Customer abandons or fails checkout challenge | Order remains unpaid/actionable or fails cleanly; no active paid entitlement | Subscription grants paid access despite unpaid order. |
| SCA-04 | Free trial or zero-value initial period | SetupIntent/reusable setup is created and authenticated as required, despite no initial charge | Trial activates without a renewal-capable method when automatic payment is promised. |
| SCA-05 | Customer declines save/future terms where optional | Product respects the allowed business path or blocks automatic subscription clearly | Silent saving without disclosed authority. |
| SCA-06 | Logged-in subscription checkout | ArraySubs compatibility hook forces reusable/off-session setup through official Stripe | Missing `setup_future_usage`/token. |
| SCA-07 | Guest/account-creation checkout | Confirm actual account state and whether compatibility hook runs after login/account creation | Assuming support while callback still sees a guest. |
| SCA-08 | Mobile challenge and return | Banking app/browser round trip returns to correct order state | Lost session, duplicate checkout, or blank return page. |

### Renewal cases

| ID | Scenario | Expected evidence | Failure signal |
|---|---|---|---|
| SCA-09 | Correctly prepared off-session method | New renewal order and PaymentIntent; succeeds; IDs correlate; next renewal advances once | Duplicate order or duplicate advancement. |
| SCA-10 | Off-session method requires authentication | PaymentIntent becomes action-required; renewal remains pending; action context/email generated | Renewal marked permanently failed or repeatedly charged off-session. |
| SCA-11 | Customer completes verification | Existing payment/order context reaches success; webhook finalizes once | A second unrelated PaymentIntent is created without reason. |
| SCA-12 | Customer ignores verification | Renewal remains unpaid and follows configured grace/on-hold/cancel behavior | Access continues indefinitely or cancels earlier than customer messaging. |
| SCA-13 | Always-authenticate test method | Recovery experience works repeatedly and accurately | Error message calls it insufficient funds. |
| SCA-14 | Generic card decline | Correct non-SCA failure class and retry/update message | Authentication email sent for a hard decline. |
| SCA-15 | `processing` or delayed outcome | Local order waits; later webhook/reconciliation resolves | Immediate replacement charge causes a duplicate. |
| SCA-16 | Renewal amount changed | Provider accepts/classifies as configured; customer notice/authority reviewed | Article/business assumes same-amount treatment automatically. |
| SCA-17 | Currency or payee/account context changed | PSP/acquirer review completed; charge context is correct | Reusing authority across a materially different merchant context without review. |
| SCA-18 | Saved bank debit mandate | Delegate forwards supported saved mandate; asynchronous state handled | Applying card 3DS language to a bank debit. |

### Webhook, retry, and idempotency cases

| ID | Scenario | Expected evidence | Failure signal |
|---|---|---|---|
| SCA-19 | `payment_intent.succeeded` delivered twice | One order completion and one lifecycle advancement | Duplicate email, entitlement extension, or renewal schedule movement. |
| SCA-20 | `requires_action` webhook arrives before/after local response | Same pending recovery context remains coherent | Conflicting notes or duplicate PaymentIntent. |
| SCA-21 | Webhook delayed | Provider state can be reconciled; pending age is observable | Retry starts while original payment later succeeds. |
| SCA-22 | Webhook signature invalid | Event is rejected and logged without state mutation | Unsigned request alters subscription state. |
| SCA-23 | Endpoint disabled/misconfigured | Gateway Health shows clear failure; test event does not falsely pass | UI reports healthy without delivery evidence. |
| SCA-24 | Retry after temporary decline | Existing provider state verified before new charge; configured limits obeyed | Blind retry without reconciliation. |
| SCA-25 | Success arrives immediately before scheduled retry | Pre-retry reconciliation cancels/avoids duplicate charge | Two successful provider payments for one renewal. |

### Customer recovery and communication cases

| ID | Scenario | Expected evidence | Failure signal |
|---|---|---|---|
| SCA-26 | Verification email rendering | Correct order, amount, masked method, action, and support context | Raw token/client secret or wrong amount. |
| SCA-27 | Deadline accuracy | Email deadline agrees with configured on-hold/cancel policy | Hard-coded three days conflicts with store settings. |
| SCA-28 | Expired/already-used action link | Safe status page or helpful resolved/expired message | New charge without customer confirmation or confusing fatal error. |
| SCA-29 | Payment method updated in Stripe portal | Intended local subscription uses the intended method on a controlled renewal | Only account default changes while subscription retains old token. |
| SCA-30 | Multiple subscriptions on one Stripe customer | Update/recovery affects only the intended subscription unless explicitly global | Cross-subscription method drift. |
| SCA-31 | Waiting-cancellation subscription | Update attempt is blocked consistently and explained | Portal offers update that backend rejects opaquely. |
| SCA-32 | Accessibility and mobile | Keyboard/focus, screen-reader label, mobile challenge return, and email CTA work | Modal/redirect traps or unreadable error. |

### Remote-gateway boundary cases

| ID | Scenario | Expected evidence | Failure signal |
|---|---|---|---|
| SCA-33 | PayPal completed renewal | PayPal sale/subscription event correlates to local renewal; no local charge is created | ArraySubs scheduler attempts a second PayPal charge. |
| SCA-34 | PayPal payment failure | Remote agreement/webhook state drives local policy | Stripe-specific `requires_action` copy shown. |
| SCA-35 | Paddle completed transaction | Paddle transaction event completes local renewal once | Local scheduler charges card separately. |
| SCA-36 | Paddle past-due/authentication issue | Paddle state/portal guidance shown; ArraySubs consumes remote state | Promise that local ArraySubs 3DS email resolves Paddle. |

## Logs and evidence checklist

For each test or production incident, collect:

- local timestamp and site timezone
- subscription ID and renewal order ID
- gateway slug and mode (test/live)
- provider customer/agreement/subscription ID
- provider payment/transaction/PaymentIntent ID
- provider webhook event ID and event type
- local webhook processed timestamp
- previous and new local order/subscription states
- failure category, sanitized provider code, and customer-facing message
- recovery email event/time and action completion time
- retry action ID/time where relevant
- reconciliation result before retry

The current product uses an `arraysubs-gateway` logging source plus private subscription/order notes through its payment logging service. The article should show enough of the UI to teach correlation, but never publish customer personal data or secret-bearing URLs.

### Never log or screenshot

- full card number
- CVC
- raw API secret or webhook signing secret
- unredacted client secret
- reusable login/session cookies
- full payment-action URL if it contains a usable token
- customer email/address unless the controlled test account is clearly non-sensitive

## Operational metrics worth tracking

Do not invent universal targets. Recommend baselines and trends segmented by gateway, market, issuer country, card type, plan, renewal cohort, and initial setup version:

- first-payment authentication rate
- first-payment challenge completion rate
- off-session renewal authorization success rate
- authentication-required renewal rate
- recovery email delivery rate
- action-link visit rate
- authentication completion rate after visit
- recovered renewal amount and count
- median and percentile time to recovery
- stale `requires_action` and `processing` age
- temporary versus permanent decline mix
- webhook delivery success and last-delivery age
- provider-paid/local-unpaid reconciliation count
- duplicate-charge or duplicate-lifecycle incidents
- payment-method update completion and next-renewal success

Suggested formula block:

```text
Authentication recovery rate
= renewals paid after an authentication-required state
  / renewals that entered authentication-required state

Off-session renewal success rate
= renewals paid on the first off-session attempt
  / eligible off-session renewal attempts
```

State denominator exclusions explicitly (manual gateways, zero-value renewals, provider-owned remote schedules, test transactions, refunds, and canceled-before-due subscriptions as appropriate).

## Compliance and launch handoff

### Payment provider / acquirer

- Confirm how the integration marks credential-on-file, initial customer-initiated setup, subsequent MITs, recurring series, and unscheduled amounts.
- Confirm which payment methods and countries the selected gateway path supports.
- Review test-mode evidence and the production account's 3DS/radar/risk settings.
- Confirm recovery behavior for `authentication_required`, issuer soft decline, delayed methods, and amount changes.

### Qualified legal/compliance reviewer

- Determine applicable jurisdictions and whether the planned transaction classification is correct.
- Review consent/mandate copy, frequency and amount disclosure, cancellation terms, trial conversion, price-change notices, and proof retention.
- Review the difference between a same-amount recurring series and variable-amount MIT use.
- Confirm how access/grace/cancellation language aligns with consumer law and contract terms.

### Security/privacy

- Verify card data stays with the PCI-scoped payment provider/gateway.
- Review logs, screenshots, email links, provider IDs, retention, access controls, and support exports.
- Verify webhook signature validation and secret rotation.
- Threat-model action-link forwarding, expired links, replayed webhooks, and account takeover.

### Engineering/operations

- Test all payment state transitions, idempotency, delayed/out-of-order events, reconciliation, and retries.
- Verify official and secondary webhook configuration in test and live mode.
- Monitor stale pending actions and webhook age.
- Confirm exact token update behavior for multi-subscription customers.
- Confirm no second payment is created until the original attempt's state has been reconciled.

### Finance

- Reconcile provider payment, WooCommerce order, and ArraySubs subscription identifiers.
- Define treatment for paid-provider/unpaid-local and unpaid-provider/paid-local discrepancies.
- Define refund/dispute handling and revenue recognition during grace.

### Customer support / lifecycle marketing

- Review verification, decline, update-payment, grace, on-hold, and cancellation messages.
- Give agents a diagnostic decision tree that starts with provider state, not guesses.
- Ensure wording distinguishes “verification required” from “card declined.”
- Test email timing, duplicate suppression, mobile return, and the resolved-link experience.

## Suggested support decision tree

```text
Customer says renewal did not complete
    |
    v
Find subscription + renewal order + provider payment ID
    |
    +--> Provider says succeeded
    |        |
    |        +--> Local paid? yes: explain/close
    |        |
    |        +--> Local unpaid: replay/reconcile signed event; do not recharge
    |
    +--> Provider says requires_action / authentication_required
    |        |
    |        +--> Action URL valid? send verification path
    |        |
    |        +--> Link already resolved? reconcile before any new attempt
    |
    +--> Provider says processing
    |        |
    |        +--> inspect webhook age; wait/reconcile; do not duplicate
    |
    +--> Provider says declined / payment method invalid
    |        |
    |        +--> direct customer to provider-hosted update path
    |
    +--> No provider attempt found
             |
             +--> inspect scheduler, gateway availability, token, amount, logs
```

## Internal-link map and anchor recommendations

All required links should be natural and non-duplicative:

| Destination | Suggested anchor/context | Placement |
|---|---|---|
| `/deals/arraysubs/features/#payment-gateways` | “compare ArraySubs payment gateway capabilities” | After architecture comparison, not in the opening answer |
| `/deals/arraysubs/use-cases/recipes/stripe-automatic-billing-sca/` | “configure Stripe automatic billing and SCA in ArraySubs” | After the exact conceptual Stripe lifecycle; do not repeat the recipe |
| `/deals/arraysubs/use-cases/recipes/member-update-payment/` | “let members update a payment method” | Customer recovery/update section |
| `/deals/arraysubs/use-cases/recipes/gateway-health-monitor/` | “monitor gateway and webhook health” | Logs/operations section |
| A061 final URL | “automatic versus manual subscription gateway support” | Gateway ownership preface |
| A063 final URL | “how subscription payment tokens and card updates work” | Token/update caveat |
| A064 final URL | “subscription webhook events to monitor” | Webhook diagnostics |
| `/deals/arraysubs/pricing/` | “View Pro Pricing” | Once, after the reader has the complete architecture/recovery answer; optionally repeat a restrained text link at conclusion |

Until A061/A063/A064 final URLs are known, use editorial placeholders or resolve them from the WordPress content inventory before publishing. Do not invent slugs and leave broken links.

## External source ledger

### Standards and regulators

1. [Directive (EU) 2015/2366](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32015L2366) — primary definition of strong customer authentication and legal framework.
2. [Commission Delegated Regulation (EU) 2018/389](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32018R0389) — Article 14 recurring transaction treatment.
3. [EBA Q&A 2018_4131](https://www.eba.europa.eu/single-rule-book-qa/qna/view/publicId/2018_4131) — payee-initiated MIT analysis.
4. [EBA Q&A 2019_4776](https://www.eba.europa.eu/single-rule-book-qa/qna/view/publicId/2019_4776) — SCA at MIT mandate setup.
5. [FCA Strong Customer Authentication](https://www.fca.org.uk/firms/strong-customer-authentication) — primary UK regulator overview.
6. [EMVCo EMV 3-D Secure](https://www.emvco.com/emv-technologies/3-d-secure/) — protocol purpose.
7. [EMVCo 3DS whitepaper introduction](https://www.emvco.com/dynamic/emv-3-d-secure-whitepaper-v2/introduction/) — frictionless and challenge model.
8. [EMVCo challenge flow](https://www.emvco.com/dynamic/emv-3-d-secure-whitepaper-v2/challenge-flow/technical-features/) — issuer/ACS challenge decision.

### Stripe

1. [SetupIntents](https://docs.stripe.com/payments/setup-intents) — future-use setup, permission, off-session usage, mandate/MIT context.
2. [PaymentIntents](https://docs.stripe.com/payments/payment-intents) — `setup_future_usage` and stateful payment lifecycle.
3. [Save and reuse payment methods](https://docs.stripe.com/payments/save-and-reuse?client=react&platform=web&ui=elements) — on/off-session setup and authentication recovery.
4. [Confirm a PaymentIntent](https://docs.stripe.com/api/payment_intents/confirm) — `requires_action`/`next_action` API behavior.
5. [PaymentIntent lifecycle](https://docs.stripe.com/payments/paymentintents/lifecycle) — payment states.
6. [SCA exemptions](https://docs.stripe.com/payments/3d-secure/strong-customer-authentication-exemptions?locale=en-GB) — exemption requests and issuer control.
7. [SCA overview](https://docs.stripe.com/strong-customer-authentication?locale=en-GB) — authentication requirements and limitations.
8. [3DS authentication flow](https://docs.stripe.com/payments/3d-secure/authentication-flow?locale=en-GB) — issuer decision, frictionless/challenge, and test cards.
9. [Decline codes](https://docs.stripe.com/declines/codes) — `authentication_required` recovery guidance.
10. [Event types](https://docs.stripe.com/api/events/types) — webhook event names.
11. [Verify PaymentIntent status](https://docs.stripe.com/payments/payment-intents/verifying-status) — webhook-first confirmation.
12. [Testing](https://docs.stripe.com/testing?locale=en-GB&testing-method=payment-methods) — test PaymentMethods and authentication scenarios.

### WooCommerce

1. [Stripe 3D Secure customer experience](https://woocommerce.com/document/stripe/customer-experience/3d-secure/) — official extension support at checkout and pay-for-order.
2. [Stripe saved payment information](https://woocommerce.com/document/stripe/customer-experience/saved-payment-information/) — tokenized saved methods.
3. [Subscription payment gateways](https://woocommerce.com/document/subscriptions/payment-gateways/) — conceptual gateway capability matrix; do not imply ArraySubs is WooCommerce Subscriptions.
4. [Stripe Billing](https://woocommerce.com/document/stripe/admin-experience/stripe-billing/) — official extension's token-based recurring background.
5. [Stripe settings guide](https://woocommerce.com/document/stripe/setup-and-configuration/settings-guide/) — account/webhook setup background.

### PayPal and Paddle

1. [PayPal Subscriptions webhooks](https://developer.paypal.com/subscriptions/webhooks) — remote subscription/payment event model.
2. [Paddle Billing Checkout](https://www.paddle.com/billing/checkout) — hosted checkout and 3DS2 statement.
3. [Paddle subscription provisioning through webhooks](https://developer.paddle.com/build/subscriptions/provision-access-webhooks/) — remote subscription/webhook state model.
4. [Paddle sandbox checkout testing](https://www.paddle.com/help/start/set-up-paddle/how-do-i-test-my-checkout-integration) — test boundary.

Do not cite secondary marketing blogs for regulatory claims when these sources cover the point. Do not use Stripe Billing's subscription-specific recovery guides as if ArraySubs creates Stripe Billing subscriptions.

## Suggested article outline (long-form, 5,000–7,000 words)

### H1: SCA and 3D Secure for Subscription Renewals

1. **Direct answer (40–60 words)**
   - Use the recommended answer above.
   - Add visible published date, last verified date, author, and technical reviewer.

2. **Key takeaways**
   - Six to nine concise bullets.

3. **What do SCA, 3DS, on-session, and off-session actually mean?**
   - SCA factor definition.
   - 3DS protocol versus SCA outcome.
   - Frictionless versus challenge.
   - Authentication versus authorization.
   - Include terminology table.

4. **How should the first checkout prepare future renewals?**
   - Disclosure/permission.
   - PaymentIntent/SetupIntent future-use setup.
   - Initial challenge.
   - Trial/zero-value case.
   - Tokenization and PCI boundary.

5. **Are recurring renewals exempt from SCA?**
   - Explain MIT outside-scope analysis separately.
   - Explain Article 14 same-amount/same-payee treatment.
   - Issuer/acquirer final control.
   - Price change and variable amount caveat.
   - Jurisdictional/legal-review guardrail.

6. **What happens during an off-session Stripe renewal?**
   - Use product-independent lifecycle first.
   - Then a clearly labeled “How ArraySubs implements this with WooCommerce Stripe” section.
   - Explain local schedule, renewal order, discrete PaymentIntent, `off_session`, `confirm`, and webhook.
   - State no Stripe Billing Subscription.
   - Link to the narrow configuration recipe.

7. **What should happen when Stripe requires 3DS again?**
   - `requires_action` as pending/actionable.
   - Verification email/pay-for-order path.
   - Challenge then webhook confirmation.
   - Grace-policy consequences.
   - Include state/response matrix and customer screenshot.

8. **When should the system retry, wait, or ask for a new card?**
   - Authentication versus temporary decline versus hard decline versus processing versus integration failure.
   - Reconciliation-before-retry principle.
   - Include support decision tree.

9. **How do PayPal and Paddle differ from Stripe?**
   - Remote schedule/renewal ownership.
   - Provider-owned authentication.
   - Webhook-driven local lifecycle.
   - Explain why `sca=false` is a local capability boundary, not a claim that the provider never performs SCA.
   - Include architecture comparison table.

10. **What customer experience recovers an authentication-required renewal?**
    - Accurate message, amount, masked method, secure action.
    - Mobile/banking-app round trip.
    - Payment update.
    - Access/grace deadline accuracy.
    - Link member update recipe.

11. **What should operators see in logs and Gateway Health?**
    - Provider/local ID correlation.
    - Webhook recency/configuration.
    - Pending-state age and reconciliation.
    - Annotated negative-state Gateway Health screenshot.
    - Link gateway health and webhook articles.

12. **A complete SCA/3DS subscription test plan**
    - Initial, renewal, action, decline, delayed, duplicate webhook, update-method, remote-gateway cases.
    - Use a shorter public version of the detailed matrix while retaining downloadable/checklist value.

13. **Compliance and production handoff checklist**
    - PSP/acquirer, legal, security, engineering, finance, support.

14. **Where ArraySubs fits—and where it does not**
    - Good fit: WooCommerce merchant wants local subscription lifecycle and direct Stripe control with visible recovery/health.
    - Consider remote provider model: merchant wants PayPal/Paddle to own schedule/payment collection or needs MoR responsibilities.
    - Not enough by itself: business needs a compliance determination, unsupported country/method, or bespoke authorization/mandate rules.

15. **Conclusion and CTA**
    - Summarize architecture choice and recovery duty.
    - “View Pro Pricing” to `/deals/arraysubs/pricing/` only after the core answer.

16. **Methodology, test environment, and limitations**
    - Code versions, official sources, staging screenshot status, date verified.
    - No live-issuer certification.
    - General regulatory information only.

## Potential question headings / FAQ material

Use these only if they add material not already answered, or weave them into body headings:

- Does every subscription renewal need 3D Secure?
- Is 3D Secure the same as Strong Customer Authentication?
- Can a renewal use 3DS without showing the customer a challenge?
- What does Stripe `requires_action` mean for an off-session renewal?
- Should a store retry an authentication-required payment automatically?
- Does `setup_future_usage=off_session` guarantee future renewals?
- Does ArraySubs use Stripe Billing subscriptions?
- Who handles SCA for PayPal and Paddle renewals?
- What should happen to membership access while 3DS is incomplete?
- Which webhook events should a subscription store monitor?

Do not add FAQ schema merely because question headings are used. Visible content, current search guidance, and schema eligibility must agree.

## Suggested original visual/diagram briefs

### Visual 1: “One subscription, two sessions”

- **Context:** Definitions/initial setup.
- **Composition:** Split-screen timeline. Left: customer present at checkout, terms + PaymentIntent/SetupIntent + possible issuer challenge. Right: calendar renewal with customer absent, off-session attempt, three provider branches.
- **Style:** Technical editorial diagram; provider-neutral icons; no fake UI.
- **Labels:** On-session, authority/setup, reusable token, off-session, succeeded, processing, action required.
- **Alt text:** “Diagram showing a customer setting up a reusable payment method on-session, followed by an off-session renewal that succeeds, processes, or requires customer action.”

### Visual 2: “Authentication-required recovery on mobile”

- **Context:** Customer UX.
- **Composition:** Four phone frames: verification email, secure order-pay page, issuer/banking-app challenge, paid order confirmation.
- **Guardrail:** Clearly label as illustration. Do not imitate a real bank or use real account data.
- **Alt text:** “Illustrated mobile sequence from a renewal verification email through issuer authentication to a confirmed subscription payment.”

### Visual 3: “Local schedule versus provider-owned schedule”

- **Context:** Gateway comparison.
- **Composition:** Three columns. Stripe: ArraySubs schedule → PaymentIntent → Stripe webhook. PayPal: PayPal schedule → sale webhook → ArraySubs. Paddle: Paddle schedule/transaction → webhook → ArraySubs.
- **Alt text:** “Architecture comparison showing ArraySubs initiating Stripe renewals while PayPal and Paddle initiate their own remote renewals and notify ArraySubs by webhook.”

### Visual 4: “Never retry before reconciliation”

- **Context:** Operations.
- **Composition:** Pending renewal between local order database and provider dashboard; webhook missing; reconciliation query blocks duplicate charge.
- **Alt text:** “Diagram showing a pending local renewal reconciled with the payment provider before a retry to prevent duplicate charges.”

These four contexts are intentionally different. Pair them with three to four real plugin screenshots; do not fill the article with decorative card imagery.

## Product claim guardrails

### Claims supported by current code

- ArraySubs Pro integrates the official WooCommerce Stripe Gateway for checkout and first-payment handling.
- Eligible logged-in subscription checkout requests are marked for future off-session use.
- ArraySubs schedules Stripe renewals locally and creates a discrete off-session PaymentIntent.
- Stripe `requires_action` is preserved as a pending, customer-action state.
- A verification email/action URL routes to the WooCommerce pay-for-order/Stripe confirmation flow.
- Gateway Health exposes Stripe plugin version, account/setup, webhook configuration, and delivery details.
- PayPal and Paddle renewals are provider-owned and webhook-driven locally.
- Stripe payment-method updates use a provider-hosted portal session.
- Renewal retry includes provider-state reconciliation before another charge attempt.

### Claims that require qualification or must not be used

- **Do not say:** “ArraySubs guarantees SCA compliance.”
  - **Use:** “ArraySubs provides technical hooks and recovery states that can support an SCA-ready Stripe implementation; compliance depends on the full merchant/provider/legal setup.”
- **Do not say:** “All recurring payments are exempt.”
  - **Use:** Distinguish qualifying MIT and Article 14 recurring treatment.
- **Do not say:** “3DS always asks for a code.”
  - **Use:** Frictionless and challenge flows exist.
- **Do not say:** “An authenticated payment will be authorized.”
  - **Use:** Authentication and authorization are separate.
- **Do not say:** “ArraySubs uses Stripe Billing.”
  - **Use:** Local ArraySubs schedule plus separate Stripe PaymentIntent per renewal.
- **Do not say:** “PayPal/Paddle do not support SCA because capability is false.”
  - **Use:** ArraySubs delegates authentication to those providers and has no local Stripe-style SCA handler.
- **Do not say:** “Updating the Stripe default card updates every ArraySubs subscription.”
  - **Use:** Verify the exact subscription token/context and a controlled renewal.
- **Do not say:** “The email gives the store's configured grace deadline.”
  - **Use:** Test deadline copy against actual settings; current implementation has a fixed three-day formatter.
- **Do not say:** “Three retries occur for 3DS-required payments.”
  - **Use:** `requires_action` is pending; ordinary failures follow retry configuration.
- **Do not say:** “The staging screenshot proves webhooks work.”
  - **Use:** It proves the health UI exposes unconfigured checks.

## Technical reviewer checklist before publication

- [ ] Confirm the published ArraySubs and Pro versions still match or update the test-environment box.
- [ ] Confirm current official WooCommerce Stripe minimum/tested version in `StripeAvailability.php`.
- [ ] Re-read `StripeSubscriptionCompatibility.php` for login/checkout predicates.
- [ ] Re-read `StripeDelegate::processRenewal()` and requires-action helper for state names and action URL.
- [ ] Confirm `RenewalProcessor` still treats `requires_action` as pending.
- [ ] Confirm retry defaults and reconciliation logic.
- [ ] Compare verification email deadline with the two actual renewal grace settings.
- [ ] Run sandbox checkout, off-session success, off-session action, and duplicate-webhook tests.
- [ ] Confirm real Stripe Gateway Health screenshots are current and captions retain negative-state context.
- [ ] Confirm PayPal and Paddle still own remote renewal schedules.
- [ ] Confirm payment-method update behavior for a Stripe customer with multiple subscriptions.
- [ ] Resolve A061/A063/A064 final internal URLs.
- [ ] Check every external source link and visible “last verified” date.
- [ ] Obtain a qualified regulatory review for any jurisdiction-specific wording.

## Editorial quality notes

- The brief estimates 2,400–3,200 words, but the campaign instruction requests very long articles. A focused 5,000–7,000-word guide is justified if tables and test cases remain useful rather than repetitive.
- Mention ArraySubs features after the general education. The article should be credible even for a reader who does not buy the plugin.
- Include at least one explicit “ArraySubs is not the best fit” paragraph: for example, a merchant who needs a Merchant of Record, needs an unsupported payment method/country, or expects the provider to own the entire subscription schedule should evaluate Paddle or another provider-owned architecture.
- Prefer descriptive questions as H2s. Keep paragraphs short enough for technical scanning.
- Place primary-source links beside the exact claim, especially for regulation, Stripe states, 3DS behavior, and vendor boundaries.
- Label repository findings as “ArraySubs first-party code inspection” and screenshots as “staging capture” with the environment limitations.
- Use Article or TechArticle markup only when the visible byline, dates, reviewer, and content match it. Use the visible and structured breadcrumb path `Home / Articles / Payments & Compliance`; omit the article title from the UI and `BreadcrumbList`. Do not promise FAQ rich results.

## Final one-paragraph editorial thesis

The strongest version of A062 will not reduce SCA to a checkout setting. It will show that subscription payment reliability is a state-management discipline: establish future-use authority while the customer is present; submit the later charge with the correct provider context; let the issuer decide whether more authentication is needed; preserve actionable pending payments; return the customer safely; trust signed provider events; reconcile before retrying; and keep access, email, finance, and compliance policy synchronized. ArraySubs can make those Stripe states visible and recoverable, while PayPal and Paddle require a different provider-owned operating model.

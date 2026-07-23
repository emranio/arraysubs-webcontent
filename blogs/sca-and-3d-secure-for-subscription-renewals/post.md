---
title: "SCA and 3D Secure for Subscription Renewals"
meta_description: "Learn how SCA and 3D Secure affect subscription renewals, off-session payments, issuer challenges, Stripe recovery, webhooks, retries, and testing."
focus_keyword: "SCA 3D Secure subscription renewals"
published: "2026-01-15"
updated: "2026-07-02"
last_verified: "2026-07-02"
author: "Emran"
author_affiliation: "ArrayHash"
---

# SCA and 3D Secure for Subscription Renewals

SCA-ready subscription renewals begin with an authenticated, reusable payment method and clear authority for future charges. Later renewals can be attempted off-session, often as merchant-initiated transactions, but an issuer may still require 3D Secure. The store therefore needs a customer recovery link, reliable webhooks, pending-payment handling, and reconciliation before any retry.

That direct answer contains the important tension: good setup can reduce recurring-payment friction, but no WordPress plugin or payment gateway can guarantee that every future renewal will be approved without customer action. The issuer still controls authentication and authorization.

> **Key takeaways**
>
> - Strong Customer Authentication (SCA) is an authentication standard; EMV 3-D Secure (3DS) is a card-not-present authentication protocol that can support it.
> - A 3DS exchange can be frictionless. “3DS” does not always mean a code, modal, or banking-app challenge.
> - Future off-session use should be established while the customer is present, with appropriate recurring disclosure, permission, and provider parameters.
> - Merchant-initiated transaction treatment and the same-amount recurring rule are different legal/payment concepts; “all subscriptions are exempt” is inaccurate.
> - An issuer may request customer authentication on a later renewal even after a strong initial setup.
> - Current ArraySubs Pro Stripe renewals are locally scheduled and use a separate off-session PaymentIntent per WooCommerce renewal order—not Stripe Billing Subscriptions.
> - Stripe `requires_action` remains an actionable pending renewal. It is not blindly sent through the ordinary retry loop.
> - PayPal and Paddle own their remote renewal and authentication flows; ArraySubs consumes their provider events rather than applying Stripe’s local `requires_action` model.
> - Recovery links, webhook health, deadline accuracy, and reconciliation are part of SCA readiness, not cleanup after it.

This guide provides general technical and regulatory information, not jurisdiction-specific legal, payments-network, or compliance advice. It reflects an ArraySubs 1.8.11 and ArraySubs Pro 1.1.2 code review plus user-confirmed staging UI verified July 22, 2026. Provider rules, regulation, product behavior, and versions change.

## What do SCA and 3D Secure actually mean?

### Strong Customer Authentication is the standard

The EU’s PSD2 definition describes SCA as authentication using at least two independent elements drawn from:

- **knowledge:** something the customer knows;
- **possession:** something the customer possesses; and
- **inherence:** something the customer is.

The factors should be independent so that compromising one does not compromise the reliability of the others. The primary legal definition appears in [Directive (EU) 2015/2366, Article 4(30)](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32015L2366). The UK has its own retained/regulatory context; the [Financial Conduct Authority’s SCA overview](https://www.fca.org.uk/firms/strong-customer-authentication) is the appropriate starting point there.

SCA is not a WordPress setting and it is not a particular popup. It is a regulatory authentication standard applied according to the jurisdiction and transaction context.

### 3DS is a protocol

[EMVCo describes EMV 3-D Secure](https://www.emvco.com/emv-technologies/3-d-secure/) as a card-not-present authentication protocol that exchanges transaction, device, merchant, and risk information between the merchant/acquirer side and the issuer side. It can help an online card payment satisfy SCA requirements.

3DS can follow two broad paths:

- **Frictionless:** the issuer’s Access Control Server has enough data and confidence to authenticate without asking the cardholder for another visible step.
- **Challenge:** the issuer asks the cardholder for interaction, such as approving a banking-app notification or completing another factor.

The [EMVCo 3DS flow explanation](https://www.emvco.com/dynamic/emv-3-d-secure-whitepaper-v2/introduction/) separates these paths, and its [challenge-flow description](https://www.emvco.com/dynamic/emv-3-d-secure-whitepaper-v2/challenge-flow/technical-features/) assigns the challenge decision to the issuer side.

### Authentication and authorization are separate

A customer can authenticate successfully and still have the payment declined. The card can lack funds, be restricted, be reported lost, or fail another authorization check. Conversely, a transaction can move through a frictionless 3DS path and be authorized without a visible customer challenge.

| Authentication result | Authorization result | Operational meaning |
| --- | --- | --- |
| Frictionless 3DS succeeds | Payment succeeds | Complete the order after server/provider confirmation |
| Challenge succeeds | Payment succeeds | Complete after signed event/reconciliation; do not trust the browser alone |
| Challenge succeeds | Payment declines | Classify the authorization decline; do not call it a 3DS failure |
| Challenge is abandoned/fails | Not paid | Preserve a secure recovery path and explain the required action |
| Off-session attempt needs action | Not paid yet | Bring the customer on-session and continue the existing payment context |
| Provider returns hard decline | Not paid | Follow decline/update/grace policy, not an authentication loop |

### On-session and off-session describe customer presence

An **on-session** payment happens while the customer is actively participating. They can read the terms, enter a method, follow a redirect, receive an issuer challenge, and respond.

An **off-session** payment is attempted when the customer is absent. A monthly renewal at 2:00 AM is the obvious example. The merchant or provider uses a previously established payment context, but cannot assume the customer is available to approve a new challenge immediately.

![Editorial comparison of an on-session checkout with an active customer and an overnight off-session renewal with a saved method and action notification.](/blogs/sca-and-3d-secure-for-subscription-renewals/on-session-vs-off-session.png)

This is why initial checkout and future renewal are not the same technical event. For a broader gateway-level explanation, read [automatic versus manual subscription gateway support](/payments-and-compliance/automatic-vs-manual-gateway-support-for-subscriptions/).

## How should the first checkout prepare a future renewal?

The initial checkout or a dedicated setup flow should establish both a usable payment-method reference and the customer’s authority for later charges.

### Tell the customer what future use means

A merchant should disclose the recurring arrangement in language appropriate to its provider and applicable rules. That generally means the frequency, amount or how the amount is determined, when billing begins, cancellation terms, and the fact that the provider will save/reuse the payment method.

Do not treat a hidden gateway parameter as a substitute for customer-facing terms. A complete implementation includes commercial copy, consent evidence, gateway/provider configuration, network indicators, cancellation handling, and retention policy.

### Prepare the payment method for off-session use

Stripe’s [SetupIntent documentation](https://docs.stripe.com/payments/setup-intents) describes setting up a payment method for later use without an immediate charge. When a payment also occurs now, a PaymentIntent can include Stripe’s future-use setting for off-session payments to help prepare and classify later use. Stripe’s [save-and-reuse guide](https://docs.stripe.com/payments/save-and-reuse?client=react&platform=web&ui=elements) also emphasizes customer permission and the difference between on-session and off-session reuse.

Safe wording matters: the parameter helps the payment provider prepare the method and apply the correct context. It does not by itself prove that the merchant’s terms, evidence, or legal classification are sufficient.

### Authenticate while the customer is present when required

The first checkout is the best time to complete an issuer challenge. The customer is on the page, the transaction context is visible, and the issuer can bind authentication to the payment or future-use setup.

A zero-value trial needs special attention. If there is no initial charge, the gateway may need a SetupIntent-style path so the future automatic payment method is prepared before the customer disappears. Activating a “card-required trial” without a renewal-capable method creates a delayed failure, not a complete signup.

### Store a provider token, not raw card data

WooCommerce and its Stripe extension store provider token references and masked display data. ArraySubs should never receive or store the raw card number or CVC. Current ArraySubs Pro works with the official WooCommerce Stripe Gateway at checkout rather than replacing its sensitive card form.

![Annotated WooCommerce payment-provider row identifying the official Stripe extension and its account-setup action.](/blogs/sca-and-3d-secure-for-subscription-renewals/woocommerce-stripe-provider-verified.png)

Seeing Stripe in the provider list proves the extension is installed and available to configure. It does not prove that an account is connected, the right mode is active, reusable payment authority is captured, or either webhook path is healthy.

![Annotated Stripe connection screen separating the live account connection from the test-environment connection used before SCA testing.](/blogs/sca-and-3d-secure-for-subscription-renewals/stripe-account-connection-verified.png)

This staging capture shows the official Stripe connection surface. Treat live and test accounts as separate environments. Credentials, webhooks, customers, tokens, PaymentIntents, and test-card behavior must not be mixed between them.

Current ArraySubs Pro compatibility code marks eligible logged-in subscription checkout requests for reusable off-session use through official Woo Stripe hooks. Because the callback has logged-in predicates, guest checkout/account-creation behavior belongs in acceptance testing; it should not be assumed.

## Are recurring renewals exempt from SCA?

“Subscriptions are exempt from SCA” is too broad. Two distinct concepts are regularly collapsed.

### A properly established merchant-initiated transaction may be outside scope

The European Banking Authority’s published [Q&A 2018_4131](https://www.eba.europa.eu/single-rule-book-qa/qna/view/publicId/2018_4131) discusses payments initiated by the payee under a standing agreement, without the payer actively initiating that particular transaction. Under the stated analysis, a genuine merchant/payee-initiated transaction (MIT) is outside SCA. The separate [Q&A 2019_4776](https://www.eba.europa.eu/single-rule-book-qa/qna/view/publicId/2019_4776) says the mandate’s remote setup itself requires SCA.

“Outside scope when the conditions are met” is more accurate than “MIT exemption.” The provider/acquirer still needs to transmit the transaction and stored-credential indicators correctly. The issuer can still decline it or ask for the customer to return on-session.

### Same-amount recurring treatment is narrower

[Commission Delegated Regulation (EU) 2018/389, Article 14](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32018R0389) addresses a series of recurring transactions with the same amount and the same payee. SCA applies when the payer creates or amends that series or makes the first transaction, while later qualifying transactions are treated differently.

That does not automatically describe every subscription. Usage billing, prorations, taxes, shipping, add-ons, plan changes, trial conversion with changed terms, variable quantities, and price changes may alter the amount or authority. Confirm the real classification with the PSP/acquirer and qualified reviewer.

### An issuer still makes the transaction decision

Stripe’s [SCA exemptions guide](https://docs.stripe.com/payments/3d-secure/strong-customer-authentication-exemptions?locale=en-GB) explains that an exemption request is not guaranteed because the issuer makes the final decision. Better future-use setup supplies stronger information; it cannot force frictionless approval.

![Technical illustration of an issuer gate accepting multiple recurring-risk signals but routing one off-session renewal to a customer challenge.](/blogs/sca-and-3d-secure-for-subscription-renewals/issuer-exemption-or-challenge.png)

Use this rule in policy and support:

> **MIT, recurring treatment, an exemption request, and an issuer challenge are not interchangeable labels. Classify the real payment arrangement; never promise that “subscription” means “no 3DS.”**

## What happens during an off-session Stripe renewal?

Current ArraySubs Pro uses a site-scheduled Stripe architecture:

1. ArraySubs core owns the subscription’s local next-payment schedule.
2. Before/during the due cycle, it creates a linked WooCommerce renewal order.
3. The Stripe delegate resolves the saved Stripe customer and payment method from the subscription/order context.
4. It creates a new PaymentIntent for the renewal-order total and currency.
5. It confirms the intent with the saved context and off-session parameters.
6. It records ArraySubs subscription/order metadata for correlation.
7. It classifies the immediate state and listens for signed provider events.
8. The renewal lifecycle advances only on the intended paid result.

This is **not** a Stripe Billing Subscription or Stripe Invoice architecture. ArraySubs creates a discrete PaymentIntent for each locally scheduled renewal. Stripe Billing’s subscription schedules and Smart Retries do not own these renewal charges.

The exact implementation recipe is intentionally separate: [configure Stripe automatic billing and SCA in ArraySubs](/deals/arraysubs/use-cases/recipes/stripe-automatic-billing-sca/).

### Stripe payment states require different actions

![A luminous state machine branches one off-session PaymentIntent into succeeded, processing, customer-action, and failed recovery states.](/blogs/sca-and-3d-secure-for-subscription-renewals/payment-intent-state-machine.png)

| Stripe state/family | Is money confirmed? | Correct immediate response |
| --- | ---: | --- |
| `succeeded` | Yes | Complete/reconcile the order and advance the subscription once |
| `processing` | Not final | Keep pending; wait for webhook/provider resolution |
| `requires_action` | No | Preserve the order/intent and return the customer on-session |
| `requires_confirmation` | No | Inspect next action and route through the supported confirmation path |
| `authentication_required` | No | Treat as authentication recovery, not an ordinary decline loop |
| Temporary decline | No | Use bounded provider-appropriate retry after reconciliation |
| Invalid/permanent method | No | Ask the customer to update the payment method |

Stripe documents the stateful model in its [PaymentIntent lifecycle](https://docs.stripe.com/payments/paymentintents/lifecycle) and [confirm API](https://docs.stripe.com/api/payment_intents/confirm). A browser returning or closing does not override the server/provider state.

### A worked $29 renewal example

Consider an illustrative monthly membership:

1. A customer buys a $29 plan while present at checkout.
2. Checkout explains that the provider will save and charge the method monthly until cancellation.
3. The issuer requires a 3DS challenge at signup; the customer completes it.
4. One month later, ArraySubs creates a $29 WooCommerce renewal order.
5. ArraySubs Pro creates a separate $29 off-session Stripe PaymentIntent with the saved customer/method context.
6. If it succeeds, the order becomes paid and the next renewal date advances.
7. If it returns `requires_action`, the order remains pending and the customer receives a secure verification/payment route.
8. If the customer completes the issuer action, the existing payment/order context is reconciled to success.
9. If the customer does nothing, the store’s configured grace, on-hold, and cancellation policy applies.

The numbers are explanatory, not performance or compliance data.

## What should happen when Stripe requires 3DS again?

An off-session `requires_action` result means the renewal is not paid and the customer must return on-session. It is not the same as insufficient funds, a permanent card failure, or a final cancellation.

Current ArraySubs Pro behavior is designed around preserving the existing context:

- it returns a `requires_action` status;
- stores the PaymentIntent ID and action timestamp;
- keeps the Woo renewal order pending;
- builds an action URL from the secure WooCommerce pay-for-order path with Stripe confirmation context;
- logs/private-notes the payment state; and
- triggers a renewal-verification email path.

ArraySubs core deliberately keeps `manual_required`, `pending`, and `requires_action` out of the ordinary hard-failure retry branch. The customer and/or webhook should finish the existing attempt.

![Four-panel customer journey from a secure renewal notification to a trusted payment page, issuer authentication, and restored paid access.](/blogs/sca-and-3d-secure-for-subscription-renewals/customer-sca-recovery-journey.png)

The official WooCommerce Stripe documentation says [3D Secure can be used on the Pay for Order page](https://woocommerce.com/document/stripe/customer-experience/3d-secure/), which supports this return-path design. That documentation is evidence about the official gateway capability, not proof that this staging account has processed a live issuer challenge.

### The local Pay action remains important

![Annotated customer renewal order showing the Pay action and unpaid-renewal notice used as a customer-present fallback surface.](/blogs/sca-and-3d-secure-for-subscription-renewals/renewal-order-pay-action.png)

The screenshot shows a generic pending renewal recovery surface, not a captured issuer 3DS dialog. That distinction is intentional. The issuer controls the real challenge, which varies by card, device, country, and Access Control Server. The stable local obligation is the renewal order and its secure action route.

The customer message should say “verification required” when that is the provider state. It should not guess “insufficient funds.” Include the subscription/order, amount, masked method when appropriate, one safe action, the effect on access, and support context—never the client secret or full reusable action URL in logs.

## When should the store retry, wait, or request a new method?

The state decides the recovery tool.

### Authentication required: bring the customer on-session

Stripe’s [decline-code guidance](https://docs.stripe.com/declines/codes) describes `authentication_required` as a case where an off-session customer needs to return and authenticate. Repeating the same off-session request cannot create customer presence.

Preserve the original renewal order and PaymentIntent context. Send a secure action. When the customer finishes, accept the signed provider result and reconcile. If the link has already been completed, expired, or superseded, check provider state before creating anything new.

### Processing or unknown: wait and reconcile

An asynchronous `processing` state is not a failure. A delayed webhook is not proof that the payment failed. Operators should inspect the PaymentIntent, endpoint delivery, local event log, and pending age. Creating a replacement charge merely because the browser did not show success can duplicate collection.

### Temporary decline: use bounded retry

Temporary authorization issues may be appropriate for retry under the provider’s advice and the merchant’s dunning policy. Current ArraySubs core has a generic default of three daily retries for ordinary failures unless the gateway/configuration changes that behavior. Before another attempt, the renewal processor asks the gateway to verify/reconcile existing provider state—a vital duplicate-charge defense.

Do not translate that default into “3DS payments retry three times.” The direct Stripe `requires_action` path is preserved as pending and normally bypasses the ordinary hard-failure schedule.

### Permanent or invalid method: request an update

An expired, invalid, restricted, or otherwise unusable payment method needs customer action. Sending repeated decline emails without a working provider-hosted update route wastes the grace period.

![Annotated customer subscription view highlighting the On Hold state and Manage payment methods route used during renewal recovery.](/blogs/sca-and-3d-secure-for-subscription-renewals/customer-payment-method-update.png)

Current ArraySubs checks authentication and subscription ownership before opening a supported update mechanism. For Stripe, the delegate creates a Stripe Billing Portal session for the stored Stripe customer, keeping sensitive payment entry with Stripe.

Use the [member payment-method update recipe](/deals/arraysubs/use-cases/recipes/member-update-payment/) for the implementation flow. Then verify the exact subscription context. Changing a Stripe customer’s account default and changing the token/method actually referenced by one ArraySubs subscription are not automatically equivalent, especially when a customer owns multiple subscriptions.

### Integration failure: repair the system

Missing keys, an environment mismatch, disabled gateway, incompatible official Stripe version, unavailable adapter, broken webhook, wrong customer ID, or missing local token is an operator problem. Customer-facing copy should not blame the cardholder.

Find the infrastructure fault, preserve the one renewal obligation, check whether money already moved, repair or choose a safe manual route, and communicate accurately.

## What should happen to access while authentication is incomplete?

Payment state and access state are related but not identical. A `requires_action` order is unpaid, yet immediate cancellation can be unfair when the customer is actively completing issuer verification. Indefinite access is equally risky for a digital product or service.

ArraySubs core provides configurable grace, on-hold, and cancellation transitions. Merchants should align those settings with:

- expected verification and email-delivery time;
- mobile banking-app return behavior;
- timezone and weekend effects;
- fulfillment or license-revocation risk;
- customer contract language;
- consumer-law review; and
- support hours.

### Current deadline-copy limitation

The inspected renewal-verification email currently formats a date from “now plus three days.” The actual ArraySubs renewal lifecycle settings are independently configurable: active-grace and on-hold-before-cancel values can differ.

That means the displayed email deadline is not guaranteed to equal the merchant’s configured policy in the verified version. Before launch:

1. trigger a real sandbox authentication-required renewal;
2. inspect the email subject, amount, masked method, CTA, and dates;
3. compare every date to current grace/on-hold/cancellation settings;
4. test the link before, near, and after the intended deadline;
5. confirm access transitions at the promised time; and
6. fix the implementation or customer copy before production if they diverge.

Do not publish a generic “you have three days” promise unless the configured lifecycle and email output prove it.

## How do PayPal and Paddle handle SCA differently?

The ArraySubs Pro capability flag `sca=false` for PayPal and Paddle does **not** mean those providers never apply SCA or 3DS. It means ArraySubs does not own a local Stripe-style SCA recovery contract for those adapters.

### PayPal owns the subscription and authentication path

Current ArraySubs Pro uses PayPal’s remote Product, Plan, and Subscription model. PayPal owns approval, future collection, provider-side authentication, and its remote schedule. At the local due time, ArraySubs waits for the PayPal result rather than creating a fresh Stripe-like charge.

PayPal events such as completed subscription sales and payment failures drive local reconciliation; see the primary [PayPal Subscriptions webhook reference](https://developer.paypal.com/subscriptions/webhooks). When diagnosing a PayPal renewal, start with the remote agreement and event stream, not a local PaymentIntent or Stripe confirmation URL.

### Paddle owns checkout, remote renewal, and provider authentication

Paddle’s hosted Merchant-of-Record flow owns its checkout, Subscription, recurring Transaction, and payment/authentication behavior. ArraySubs waits for Paddle’s transaction/subscription events and maps the remote result into WooCommerce.

Paddle states that its hosted [Billing Checkout](https://www.paddle.com/billing/checkout) supports 3DS2. Operators should use Paddle’s sandbox, transaction state, customer portal, and signed webhook diagnostics. A local ArraySubs Stripe-verification email is not the Paddle recovery mechanism.

### Architecture comparison

| Question | Stripe through ArraySubs Pro | PayPal Subscriptions | Paddle Billing |
| --- | --- | --- | --- |
| Schedule owner | ArraySubs | PayPal | Paddle |
| Renewal charge creator | ArraySubs Pro creates PaymentIntent | PayPal | Paddle |
| Checkout authentication owner | Official Woo Stripe + Stripe/issuer | PayPal | Paddle |
| Renewal action recovery | Pending local order + official Stripe pay/confirmation flow | PayPal-hosted agreement/payment flow | Paddle-hosted checkout/portal flow |
| Local confirmation | Stripe webhook + PaymentIntent reconciliation | PayPal sale/subscription webhooks | Paddle transaction/subscription webhooks |
| Stripe `requires_action` logic applies | Yes | No | No |
| Method update surface | Stripe portal session | Reauthorization/provider flow | Paddle customer portal |

Stripe gives the WooCommerce store more local renewal control and therefore more local recovery responsibility. PayPal and Paddle move that responsibility into remote provider systems, but require equally disciplined webhook reconciliation and lifecycle visibility.

Review the current [ArraySubs payment gateway capabilities](/deals/arraysubs/features/#payment-gateways) only after choosing which schedule-owner model fits your business.

## Why webhook health is part of SCA readiness

A browser redirect or challenge completion is not reliable final payment evidence. The browser can close, lose connectivity, return before an asynchronous state finishes, or show an intermediate result. The server must consume authenticated provider events and reconcile the final PaymentIntent.

Stripe recommends monitoring PaymentIntent status through webhooks in its [status-verification guidance](https://docs.stripe.com/payments/payment-intents/verifying-status). Relevant current event families include PaymentIntent success, failure, and action-required, along with setup and payment-method events.

ArraySubs Pro’s Stripe architecture can involve two event surfaces: the official WooCommerce Stripe endpoint and an ArraySubs secondary endpoint. They have separate configuration and delivery evidence.

![Annotated Stripe Gateway Health details separating the official Woo Stripe webhook check from the ArraySubs secondary webhook check.](/blogs/sca-and-3d-secure-for-subscription-renewals/stripe-webhook-health-verified.png)

This confirmed staging capture intentionally shows Stripe disabled and both webhook checks unconfigured. It proves that Gateway Health exposes the checks; it does not represent a production-ready installation. A truthful production test requires the expected endpoints, current successful deliveries, and correctly processed events.

Use the [Gateway Health monitoring recipe](/deals/arraysubs/use-cases/recipes/gateway-health-monitor/) to establish the operating workflow.

### Webhook requirements

- Verify the signature against the raw request body.
- Identify events by provider event ID and prevent duplicate side effects.
- Associate provider event, PaymentIntent, renewal order, and ArraySubs subscription.
- Retain occurred and processed times.
- Tolerate delayed or out-of-order state changes.
- Reconcile stale pending renewals against Stripe before any retry.
- Record sanitized provider state and failure category.
- Never put raw secrets, client secrets, full action URLs, card numbers, CVC, or session cookies in general logs.

### Why reconciliation comes before retry

Suppose Stripe has already accepted a $29 PaymentIntent, but the success webhook is delayed. WooCommerce still shows a pending order. A timer that blindly creates another intent can collect $58 for one renewal.

The safe sequence is:

1. identify the existing provider payment reference;
2. retrieve or inspect its current state;
3. process/replay the signed success if appropriate;
4. idempotently complete the existing renewal order; and
5. create a new attempt only when the original is definitively unpaid and policy permits.

The principle applies beyond Stripe. For PayPal and Paddle, provider-owned remote transactions are even more important because the local scheduler is not the charge creator.

## A support decision tree for incomplete renewals

Start with provider truth, not the customer’s guess or the local order label alone.

1. **Find the correlation set.** Subscription ID, renewal order ID, gateway, provider payment/subscription ID, and relevant event.
2. **Provider says succeeded.** If local order is paid, explain/close. If local is unpaid, replay or reconcile the signed event—do not charge again.
3. **Provider says `requires_action` or authentication required.** Confirm the existing action URL is valid. Send the verification route. If already resolved, reconcile before another attempt.
4. **Provider says processing.** Inspect webhook age and provider state. Wait/reconcile unless the provider supplies a final failure.
5. **Provider says declined or method invalid.** Classify the decline and direct the customer to the supported update route.
6. **No provider attempt exists.** Inspect the scheduler, gateway availability, saved context, amount/currency, plugin version, environment, and logs.

Support wording should separate causes:

- “Your bank requires verification before this renewal can complete.”
- “The payment is still processing; we are checking the provider result before another attempt.”
- “The saved method can no longer be used. Please update it securely.”
- “We are repairing a payment connection issue; no additional charge should be attempted until reconciliation completes.”

Avoid “3DS failed” unless the provider evidence actually says the authentication failed. Avoid “card declined” when the state only asks for customer action.

## A complete SCA and 3DS subscription test plan

Use sandbox/test mode and synthetic customers. Record WordPress, WooCommerce, official Stripe Gateway, ArraySubs, and ArraySubs Pro versions; store/customer country; currency; checkout surface; active payment methods; endpoints; and provider test data.

![Isometric payments QA laboratory showing success, authentication, processing, decline, expiry, duplicate-event, update, and recovery scenarios.](/blogs/sca-and-3d-secure-for-subscription-renewals/sca-renewal-test-matrix.png)

### Initial checkout and setup

| Case | Expected evidence |
| --- | --- |
| Ordinary paid card checkout | Paid initial order, Stripe customer/method stored, future-use context present |
| Card requires 3DS at checkout | Challenge completes; order and provider event reconcile |
| Customer abandons challenge | No paid entitlement; order stays safely unpaid/actionable |
| Zero-value trial | Setup path creates a renewal-capable method even without an initial charge |
| Logged-in checkout | Future off-session setup runs through official Stripe hooks |
| Guest/account-creation checkout | Actual account lifecycle and stored context are verified; no assumption |
| Mobile challenge round trip | Banking-app/browser return reaches the correct order once |

Stripe publishes current test PaymentMethods and cards for authentication scenarios in its [testing guide](https://docs.stripe.com/testing?locale=en-GB&testing-method=payment-methods). Use that source of truth rather than copying old card numbers into permanent documentation.

### Renewal states

| Case | Expected evidence |
| --- | --- |
| Prepared off-session method succeeds | One renewal order, one PaymentIntent, one lifecycle advancement |
| Off-session method requires action | Pending renewal, stored context, verification email/action, no blind retry |
| Customer completes verification | Existing order/payment context reaches success once |
| Customer ignores verification | Configured grace/on-hold/cancel policy matches customer message |
| Authentication-required test method | Copy requests verification, not funds or generic decline |
| Generic decline | Non-SCA failure classification and appropriate retry/update route |
| Processing/delayed result | Local order waits; later webhook resolves without replacement charge |
| Changed amount/currency | PSP/acquirer and disclosure classification are reviewed, not assumed |

### Webhook and idempotency

- Deliver `payment_intent.succeeded` twice and prove the order/lifecycle advances once.
- Deliver action-required before and after the local response and preserve one recovery context.
- Delay the success event and prove reconciliation prevents a duplicate charge.
- Send an invalid signature and prove the request cannot mutate state.
- Break an endpoint and confirm Gateway Health shows failure rather than a false green state.
- Let success arrive immediately before a scheduled retry and prove pre-retry reconciliation cancels the duplicate attempt.

### Customer recovery and updates

- Inspect verification email on desktop and mobile.
- Compare every deadline in email to the configured access lifecycle.
- Open an expired/already-resolved action and confirm a safe status message.
- Update a method in the Stripe portal and verify the intended local subscription context.
- Repeat with multiple subscriptions under one Stripe customer.
- Confirm the waiting-cancellation state consistently blocks unsupported updates.
- Test keyboard navigation, focus, screen-reader labels, and banking-app return.

### PayPal and Paddle boundary tests

- Confirm a PayPal completed sale maps to one local renewal without a second local charge.
- Confirm PayPal failure copy and status originate from the remote agreement/event model.
- Confirm a Paddle recurring Transaction completes one local renewal.
- Confirm Paddle past-due/authentication states direct the customer through Paddle’s supported portal/flow, not Stripe-specific language.

## What evidence should operators retain?

For a controlled test or incident, retain:

- local timestamp and site timezone;
- subscription and renewal-order IDs;
- gateway slug and test/live mode;
- provider customer/agreement/subscription and payment/transaction IDs;
- provider event ID/type and local processed time;
- previous and resulting order/subscription state;
- sanitized provider code and customer-facing category;
- recovery-email timestamp and action-completion time;
- retry scheduled-action ID/time; and
- reconciliation result before another charge.

Mask or exclude sensitive data. Never retain a full card number, CVC, API secret, signing secret, usable client secret, login cookie, or unredacted token-bearing action URL in screenshots or routine support exports.

### Metrics worth trending

Do not use universal targets. Establish baselines segmented by gateway, market, issuer country, card type, plan, cohort, and setup version:

- first-payment authentication/challenge rate;
- challenge completion rate;
- first-attempt off-session success rate;
- authentication-required renewal rate;
- verification email delivery and action-link visit rate;
- recovery completion rate and time to recovery;
- age of stale action-required/processing renewals;
- temporary versus permanent decline mix;
- webhook delivery success and last-delivery age;
- provider-paid/local-unpaid reconciliation count;
- duplicate-payment or duplicate-lifecycle incidents; and
- method-update completion followed by next-renewal success.

Two useful definitions are:

> **Authentication recovery rate** = renewals paid after entering an authentication-required state ÷ renewals that entered that state.

> **First off-session success rate** = renewals paid on the first off-session attempt ÷ eligible off-session attempts.

Document denominator exclusions such as manual gateways, zero-value renewals, provider-owned PayPal/Paddle schedules, tests, refunds, and subscriptions cancelled before the due time.

## Compliance and production handoff checklist

### Payment provider or acquirer

- Confirm credential-on-file, initial setup, subsequent MIT, recurring-series, and variable-amount indicators.
- Confirm supported payment methods, countries, currencies, account capabilities, and risk settings.
- Review authentication-required, delayed, and amount-change behavior.
- Review sandbox evidence before live enablement.

### Legal/compliance reviewer

- Determine applicable jurisdictions and transaction classification.
- Review recurring consent/mandate copy, amount/frequency disclosure, cancellation, trials, and price-change notice.
- Separate same-amount recurring treatment from variable MIT authority.
- Align access/grace/cancellation promises with applicable law and the actual software settings.

### Security and privacy

- Confirm raw card data remains with the payment provider.
- Review logs, IDs, screenshots, email links, exports, retention, and access controls.
- Verify webhook signatures, secret rotation, and replay protection.
- Threat-model forwarded/expired action links and account takeover.

### Engineering and operations

- Test every payment-state transition and idempotency rule.
- Verify official and secondary endpoints in test and live environments.
- Monitor webhook age and stale pending actions.
- Verify method updates on the exact subscription.
- Reconcile provider state before any retry.

### Finance and support

- Reconcile provider payment, Woo order, and ArraySubs subscription.
- Define handling for paid-provider/unpaid-local and the reverse.
- Review verification, decline, grace, on-hold, update-method, and cancellation messages.
- Train agents to begin with provider state and identifiers, not guesswork.

## Where ArraySubs fits—and where it does not

ArraySubs is a strong fit when a WooCommerce merchant wants the local subscription engine to own Stripe scheduling, create a discrete renewal order/PaymentIntent, preserve action-required states, expose customer recovery, and monitor gateway/webhook health.

It is not a legal SCA determination or an issuer certification. ArraySubs may not be the best fit when:

- the required country or payment method is outside the tested gateway path;
- the merchant wants the provider to own the entire remote subscription schedule;
- a Merchant-of-Record model is required;
- bespoke mandates or variable-amount rules need a different billing platform;
- the business cannot operate webhook/reconciliation monitoring; or
- a live issuer certification or qualified legal opinion is being mistaken for plugin functionality.

PayPal or Paddle may better fit a provider-owned schedule, while Paddle’s MoR role needs its own product-eligibility and tax/operations review. A dedicated billing platform may be more appropriate for highly customized authorization and revenue-operations requirements.

## Frequently asked questions

### Is 3D Secure the same as SCA?

No. SCA is an authentication standard under the applicable regulatory framework. EMV 3DS is a card-not-present protocol that can supply risk data and support an SCA-compliant authentication. A 3DS flow may be frictionless or challenged.

### Does every subscription renewal need a 3DS challenge?

No. A correctly established off-session recurring/MIT payment may be processed without an interactive challenge, depending on its classification and issuer decision. But an issuer can still require the customer to return on-session.

### What does Stripe `requires_action` mean for a renewal?

The PaymentIntent is not paid and another step is necessary. Current ArraySubs preserves the renewal order and PaymentIntent context, keeps it pending, and exposes a customer verification/payment route. It should not be treated as an ordinary permanent decline.

### Should an authentication-required payment be retried automatically?

Not as an unchanged blind off-session loop. The customer must normally return on-session and complete the requested action. Reconcile the existing PaymentIntent before creating another payment attempt.

### Does Stripe future-use setup guarantee future renewals?

No. It helps Stripe prepare/classify the method. Customer authority, account/gateway configuration, network indicators, issuer behavior, available funds, supported method/country, webhooks, and integration state still determine the result.

### Does ArraySubs use Stripe Billing Subscriptions?

No in the current inspected architecture. ArraySubs owns the local schedule and ArraySubs Pro creates a separate off-session Stripe PaymentIntent for each WooCommerce renewal order.

### Who handles SCA for PayPal and Paddle renewals?

PayPal and Paddle own their remote subscription, checkout/payment, and provider authentication flows. ArraySubs consumes their signed lifecycle events. The adapters’ local `sca=false` capability means there is no ArraySubs-owned Stripe-style handler, not that those providers never use SCA or 3DS.

## Methodology, limitations, and update log

This article was written and fact-checked by Emran at ArrayHash. Verification during the latest update combined primary regulator, standards-body, Stripe, WooCommerce, PayPal, and Paddle documentation with a first-party review of ArraySubs 1.8.11, ArraySubs Pro 1.1.2, and the confirmed staging interface.

The staging pass verified the official Stripe provider and account-connection surfaces, ArraySubs’ Stripe capability display, and the separate official and secondary webhook checks. It did **not** connect a Stripe account, use a test card, create a SetupIntent or PaymentIntent, invoke 3D Secure, receive a provider-originated webhook, complete a recovery link, update a payment method, or execute a renewal. The screenshots intentionally show unconfigured negative states; they demonstrate what operators can inspect, not a healthy production environment or live issuer behavior.

Update history:

- **July 22, 2026:** Recaptured and strictly annotated three real Stripe/ArraySubs staging screenshots, recorded their full provenance and marker plans, added the provider-list distinction, mirrored accepted files byte-for-byte, and expanded the limitations disclosure.
- **July 2, 2026:** Updated the article’s regulatory, recovery, and testing guidance.
- **January 15, 2026:** Original publication.

Reverify after changes to ArraySubs Stripe scheduling, PaymentIntent state handling, verification URLs, retries, method updates, or webhook routing; after WooCommerce Stripe changes its tokenization, account setup, checkout, or webhook contracts; and whenever applicable SCA rules, EMV 3DS, Stripe test behavior, payment-method support, or issuer guidance changes.

An SCA-ready subscription system does not promise a frictionless future. It establishes authority while the customer is present, submits later charges with the correct provider context, lets the issuer decide whether more authentication is needed, preserves actionable pending payments, returns the customer safely, trusts signed events, reconciles before retry, and keeps access, email, finance, and compliance policy synchronized.

Review the [ArraySubs payment gateway feature set](/deals/arraysubs/features/#payment-gateways) and the implementation recipes above. If that local Stripe ownership model and the current Pro adapters match your acceptance matrix, [View Pro Pricing](/deals/arraysubs/pricing/).

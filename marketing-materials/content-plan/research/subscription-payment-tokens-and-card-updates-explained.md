# A063 research packet — Subscription Payment Tokens and Card Updates Explained

**Brief:** A063  
**Canonical slug:** `subscription-payment-tokens-and-card-updates-explained`  
**Focus keyword:** subscription payment tokens and card updates  
**Research completed:** 2026-07-20  
**Product source inspected:** ArraySubs 1.8.11, ArraySubs Pro 1.1.2, bundled WooCommerce core, WooCommerce Stripe Gateway, and the current `web-content` marketing data  
**Research status:** Ready for the main writer, with important implementation caveats that must remain visible in the article

## Executive answer for the opening

A subscription payment token is normally a gateway-scoped reference to a credential held in a processor vault; it is not the card number and is not inherently portable. WooCommerce may keep a customer-level token and safe descriptors, while a subscription must preserve the exact remote customer, payment method, mandate, or billing-agreement context needed for its next renewal. A card update succeeds only when that subscription-specific context is changed or the provider updates the same vaulted credential.

Suggested 52-word direct answer:

> A subscription payment token is a gateway-specific reference to a vaulted card or billing authorization, not a portable copy of the card. WooCommerce can store a customer token, but each subscription still needs the correct provider customer, payment-method, mandate, or agreement context. Card updates must reach that renewal context and then be proven with a test renewal.

The article's distinctive idea should be: **there are several related defaults, references, and descriptors, and changing one does not prove that the object used for the next renewal changed.**

## Research method and evidence labels

- **Primary documentation:** current WooCommerce, Stripe, PayPal, Paddle, PCI SSC, and EU legal sources, linked claim-adjacent below.
- **Verified implementation behavior:** static source inspection of the versions named above. These are first-party ArraySubs observations, not claims about every deployed version.
- **Recommendations:** operator architecture, audit, security, support, and testing guidance derived from the documented object models and inspected implementation.
- **Not performed:** no real card update, live renewal, account-updater event, PayPal reauthorization, or Paddle payment-method replacement was executed. Do not phrase the code review as an end-to-end success test.

## The durable mental model: eight different objects

The word “token” is often used for all of these, but they are not interchangeable.

| Layer | Example | Typical owner | What it proves | What it does **not** prove |
| --- | --- | --- | --- | --- |
| Card/account credential | PAN plus issuer account relationship | Issuer/cardholder | The underlying funding account exists | The merchant may store or reuse the PAN |
| Network token or updater relationship | Network-managed replacement credential | Card network/issuer/provider | An eligible credential may survive card replacement | Every issuer, country, card, or gateway participates |
| Provider-vault payment method | Stripe `pm_…`, Paddle saved method `paymtd_…`, PayPal vault token | Processor/provider | The provider can identify a stored payment method in a specific account context | The identifier works at a different provider or merchant account |
| Provider customer | Stripe `cus_…`, Paddle `ctm_…`, PayPal payer identity | Provider | Groups provider-side objects around a customer | The customer's default is necessarily the subscription's selected method |
| Remote recurring authorization | PayPal subscription/agreement ID, Paddle subscription ID, mandate | Provider | Future collection is authorized under a particular provider object | It is an editable card token or portable across processors |
| WooCommerce payment token | Local `WC_Payment_Token` row | WooCommerce/gateway extension | Maps a local user and gateway to a provider token and safe display metadata | The token is automatically copied into every subscription integration |
| ArraySubs subscription context | `_gateway_customer_id`, `_gateway_payment_method_id`, gateway-specific remote subscription IDs | ArraySubs | Tells ArraySubs which remote context to use or monitor for one subscription | The field has identical semantics for Stripe, PayPal, and Paddle |
| Safe descriptor | Brand, last four, expiry, wallet type | Store cache/UI | Helps a customer or agent recognize a method | The credential is valid, usable, current, or selected for renewal |

This model supports several important short answers:

1. A token can be syntactically present but unusable.
2. A card descriptor can be current while the renewal reference is stale.
3. A customer-level default can change while a subscription-specific reference remains unchanged.
4. A provider can update a credential without changing the local token string.
5. A “payment method” field can contain a remote subscription/agreement ID rather than a card token.

## How WooCommerce payment tokens actually work

WooCommerce's Payment Token API stores and manages gateway tokens for users. A base token has a gateway ID, token value, user ID, type, and default flag. Card-token metadata adds card type, last four digits, expiry month, and expiry year. WooCommerce documentation says customers can manage tokens from My Account and choose saved methods at checkout. It also warns developers that loading a token by ID does not itself prove ownership; the gateway must verify the token's user ID ([WooCommerce Payment Token API](https://developer.woocommerce.com/docs/features/payments/payment-token-api/)).

The bundled WooCommerce source confirms the storage split:

- `woocommerce_payment_tokens`: local token row, gateway ID, token string, user ID, type, default flag;
- `woocommerce_payment_tokenmeta`: token metadata such as last four and expiry;
- `WC_Payment_Tokens::get_customer_tokens()` can filter by user and gateway;
- `WC_Payment_Tokens::set_users_default()` changes the customer's local default;
- `WC_Payment_Token_CC` validates last four, card type, expiry month, and four-digit expiry year.

The key architectural point is that the local `token` field normally contains a provider-supplied opaque identifier. It is not a generic payment credential. Its meaning is defined by the gateway integration that created it.

### Customer default versus subscription reference

WooCommerce Subscriptions documentation explicitly separates customer account methods from subscription methods. It says WooCommerce stores saved methods on the customer account, while Subscriptions copies the chosen token to the subscription for future automatic renewals. That duplication exists because the two locations can fall out of sync ([WooCommerce: Manage Payment Methods — Subscriptions](https://woocommerce.com/document/subscriptions/customers-view/subscriber-payment-methods/)).

The same guide documents several behaviors that should shape A063:

- deleting a method used by an active subscription can break renewals;
- WooCommerce Subscriptions may block deletion unless another suitable token from the same gateway exists;
- making a new customer default can optionally update existing subscriptions, but only when the gateway supports the required advanced feature;
- a single-subscription “Change Payment Method” flow is separate from changing the general account default;
- payment-method change visibility depends on subscription status, automatic-renewal need, staging state, gateway support, and a future scheduled payment.

Do not copy those exact WooCommerce Subscriptions UI rules onto ArraySubs. Use them as the clearest first-party demonstration of why **account default** and **subscription renewal reference** are distinct.

### Failed-renewal payment is a third change path

WooCommerce's gateway integration guide explains that paying a failed renewal can also become the future recurring method—but only if the gateway integration copies the necessary metadata back to the original subscription. Otherwise future renewals keep failing ([WooCommerce subscription gateway integration guide](https://woocommerce.com/document/subscriptions/develop/payment-gateway-integration/)).

Use this as a strong general rule:

```text
new method added to account
≠ subscription context updated

failed renewal paid with a new method
≠ future renewal context updated
unless the integration persists the new remote references
```

## What ArraySubs stores for subscription-specific billing

ArraySubs Pro's `PaymentMetaNormalizer::getGatewayContext()` exposes these canonical local fields:

- `_payment_gateway`
- `_gateway_customer_id`
- `_gateway_payment_method_id`
- `_gateway_session_id`
- `_gateway_status`
- `_last_gateway_transaction_id`
- `_payment_method_brand`
- `_payment_method_last4`
- `_payment_method_expiry_month`
- `_payment_method_expiry_year`
- `_payment_method_type`

Those names form a useful normalized reporting layer, but the remote identifier semantics are gateway-specific:

| Gateway | `_gateway_customer_id` currently means | `_gateway_payment_method_id` currently means | Separate remote recurring ID | Who triggers collection? |
| --- | --- | --- | --- | --- |
| Stripe | Stripe Customer ID | Stripe PaymentMethod ID captured from the Woo Stripe order | No Stripe Subscription object; ArraySubs owns schedule | ArraySubs creates an off-session PaymentIntent with the stored IDs |
| PayPal | payer ID or email fallback | PayPal subscription ID | `_gateway_paypal_subscription_id` | PayPal owns recurring billing; ArraySubs awaits webhooks |
| Paddle | Paddle customer ID | Paddle subscription ID | `_gateway_paddle_subscription_id` | Paddle owns recurring billing; ArraySubs awaits webhooks |

This is a vital article point: `_gateway_payment_method_id` is normalized by name, not by universal data type. Support scripts and migration code must resolve the actual gateway before interpreting it.

ArraySubs also stores `_payment_method` and `_payment_method_title`, which identify/display the local WooCommerce method. Changing those labels is not a safe gateway migration. The admin subscription update controller can modify them and fires an audit note hook, but that operation does not create a Stripe PaymentMethod, PayPal agreement, Paddle subscription, or mandate.

### ArraySubs customer portal behavior

The free customer view shows a **Manage payment methods** link to WooCommerce My Account for active, on-hold, and trial subscriptions. That is a customer-account method screen; by itself it does not prove ArraySubs' subscription-specific gateway context changed.

ArraySubs Pro adds a gateway-specific **Update payment method** link when:

- the subscription is active, on hold, or in trial;
- it is not waiting for cancellation;
- the gateway resolves successfully; and
- the gateway advertises `payment_method_update`.

The REST route requires login and accepts either the subscription owner or a WooCommerce/options administrator. It delegates the update mechanism to the gateway and returns a hosted URL when one exists. This ownership and lifecycle gating is a verified source behavior, but no live update was completed for this packet.

## Customer-initiated update versus network account updater

These mechanisms solve different events.

| Mechanism | Trigger | Where sensitive entry happens | Does local ID necessarily change? | Merchant control | Main failure mode |
| --- | --- | --- | --- | --- | --- |
| Customer-hosted update | Customer intentionally adds/selects a method | Gateway/provider portal or hosted form | Often, but not always | Merchant launches and reconciles the flow | Portal default changes but subscription reference stays stale |
| Provider/network automatic update | Issuer replaces/reissues an eligible card | No customer form | Often no; same provider object may receive new descriptors | Merchant listens and refreshes caches | Issuer/network/card/country not eligible |
| PayPal wallet funding change | Customer edits the merchant's automatic-payment funding choice in PayPal | PayPal account | Agreement may remain the same | Mostly provider-owned | Store has little card-level evidence |
| Reauthorization/replacement agreement | Customer approves a new recurring authorization | Provider approval flow | Agreement/subscription ID changes | Merchant must migrate safely | Old and new collectors overlap or no replacement becomes active |

### Network updater boundaries

Stripe says it works with card networks and automatically attempts to update eligible saved cards after replacement. It also states that issuer participation is required, international support varies, and it is not possible to identify in advance which cards support automatic updates. Stripe exposes `payment_method.automatically_updated` for network updates and `payment_method.updated` for PaymentMethod API updates ([Stripe: How cards work](https://docs.stripe.com/payments/cards/overview)).

The article must therefore say:

- **ArraySubs does not operate a network account updater.**
- A gateway may update a vaulted method and emit an event.
- A successful updater result does not guarantee that every local descriptor/cache was refreshed.
- Lack of an updater event does not prove a card will fail.
- A printed expiry date alone is not a universal early-warning system.
- Do not run a speculative charge merely to “test” a card before the actual obligation.

PayPal separately tells consumers that eligible card details may be updated automatically and that automatic payments associated with the old card may be migrated to the updated card. That behavior belongs to PayPal and the customer's wallet, not to ArraySubs ([PayPal: update a debit or credit card](https://securepayments.paypal.com/uk/cshelp/article/how-do-i-update-my-debit-or-credit-card-on-paypal-help157)).

## Stripe: intended flow, correct behavior, and exact current sync caveats

### Intended capture and renewal model

ArraySubs Pro relies on the official WooCommerce Stripe Gateway for checkout. Its compatibility service forces reusable saving for ArraySubs subscription carts and requests `setup_future_usage=off_session` for PaymentIntents. This matches Stripe's recommendation to use a SetupIntent or a PaymentIntent with `setup_future_usage` so the method is optimized for future use ([Stripe Setup Intents](https://docs.stripe.com/payments/setup-intents), [Stripe attach PaymentMethod API](https://docs.stripe.com/api/payment_methods/attach)).

After checkout, `StripeOrderContextBridge` copies the official Woo Stripe order context to the ArraySubs subscription:

- Stripe Customer ID from `_stripe_customer_id`;
- Stripe PaymentMethod ID from `_stripe_source_id`;
- method type, brand, last four, expiry, and wallet descriptor;
- charge or intent reference.

At renewal, `StripeDelegate::processRenewalPayment()` creates and confirms an off-session PaymentIntent using the exact subscription's stored Customer and PaymentMethod IDs. Therefore, changing only the Stripe Customer's default payment method does **not** automatically change what ArraySubs will charge next.

### Current hosted update behavior

For an eligible ArraySubs subscription, the gateway creates a general Stripe Billing Portal session for the stored Customer and returns its URL. Stripe documents that its hosted customer portal can let customers update payment methods, and portal sessions are ephemeral: an unused session expires after five minutes and an active session expires within an hour of recent activity ([Stripe customer portal](https://docs.stripe.com/customer-management)).

Stripe's dedicated `payment_method_update` portal flow sets the new method as `customer.invoice_settings.default_payment_method` ([Stripe customer portal deep links](https://docs.stripe.com/customer-management/portal-deep-links)). The inspected ArraySubs code does **not** request that dedicated flow; it creates a general portal session with only `customer` and `return_url`.

Even if the customer successfully changes the Stripe Customer default, ArraySubs renewals continue to pass the subscription's stored `_gateway_payment_method_id`. The current code does not retrieve `invoice_settings.default_payment_method` after portal return and does not explicitly fan the new default out to all or a selected set of ArraySubs subscriptions.

### Exact webhook caveats that must be stated, not hidden

The source review found four material caveats:

1. **SetupIntent ID overwrite risk.** `StripeOrderContextBridge` correctly reads `payload.payment_method` from `setup_intent.succeeded` and retrieves its descriptors. Later, `StripeDelegate::handlePaymentMethodUpdated()` chooses `payload.id` before `payload.payment_method`. For a SetupIntent event, `payload.id` is `seti_…`, not `pm_…`, so the later handler can overwrite `_gateway_payment_method_id` with a SetupIntent ID. A future PaymentIntent cannot use that as a PaymentMethod.
2. **One-customer-to-one-subscription resolution.** If webhook metadata does not name a subscription, `PaymentMetaNormalizer::findSubscriptionByGatewayCustomer()` returns one matching ArraySubs subscription (`numberposts => 1`). A customer with several Stripe-backed subscriptions may have only the first matching local record refreshed.
3. **General portal default versus explicit renewal reference.** The portal may change the Stripe Customer default, while ArraySubs still charges the subscription's old stored PaymentMethod ID.
4. **Pre-expiry event mismatch.** The required event list includes `customer.source.expiring`, but Stripe says that event works only for legacy Card/Source integrations and does not occur for PaymentMethod API integrations ([Stripe event types](https://docs.stripe.com/api/events/types)). Current ArraySubs uses PaymentMethod IDs, so do not promise universal proactive expiry notices from this path.

There is also an event-version caveat: the required list contains both `payment_method.automatically_updated` and the older `payment_method.card_automatically_updated`; Stripe renamed the latter in API version 2020-08-27 ([Stripe changelog](https://docs.stripe.com/changelog/2020-08-27/renames-automatically-updated-event-type)). Treat webhook provisioning and API-version compatibility as a test requirement, not an assumed success.

### Stale WooCommerce Stripe token cleanup

ArraySubs Pro filters saved Stripe tokens during an ArraySubs subscription checkout. It asks the connected Stripe account whether each local PaymentMethod exists. If Stripe reports `resource_missing`, it deletes the stale Woo token and clears cached Stripe customer IDs. It also performs targeted cleanup when checkout raises a missing PaymentMethod error.

This is useful defensive behavior, but it proves another portability rule: a locally valid-looking `pm_…` can be absent in the currently connected Stripe account. Switching keys, modes, accounts, or copied databases can invalidate otherwise well-formed IDs.

### Safe Stripe wording

Use:

> ArraySubs Pro launches a Stripe-hosted portal for eligible subscriptions and listens for supported method-update events, but the current release needs explicit end-to-end verification that the chosen portal method becomes the exact PaymentMethod used by each intended subscription.

Do not use:

> Any card added in Stripe automatically updates all ArraySubs subscriptions.

Do not claim current Stripe pre-expiry notices are universal. The inspected PaymentMethod-based path does not receive Stripe's legacy `customer.source.expiring` event.

## PayPal: wallet funding source, subscription agreement, and current ArraySubs gap

PayPal's Subscription API creates a remote subscription under an approved plan. The API's update/revise operations focus on plan fields, quantity, shipping, and customer-approved plan changes; they do not expose a generic merchant API for replacing the payer's wallet funding source ([PayPal Subscriptions API](https://developer.paypal.com/docs/api/subscriptions/v1/)).

PayPal tells consumers that their general preferred payment method does not affect automatic payments. To change an automatic payment, the customer selects the specific merchant under PayPal's Subscriptions/Automatic Payments area and changes that merchant's payment method ([PayPal automatic-payment help](https://www.paypal.com/uk/cshelp/article/what-is-an-automatic-payment-and-how-do-i-update-or-cancel-one-help240), [PayPal preferred-method help](https://www.paypal.com/us/cshelp/article/what-payment-methods-can-i-use-with-paypal-help468)).

That means a PayPal recurring authorization is not a WooCommerce card token. The payer may change wallet funding inside PayPal while the merchant continues to reference the same PayPal subscription/agreement.

### Current ArraySubs PayPal behavior

Verified source observations:

- ArraySubs stores the PayPal subscription ID in both `_gateway_payment_method_id` and `_gateway_paypal_subscription_id`.
- It displays PayPal or safe card descriptors when PayPal exposes them.
- It advertises `payment_method_update=true`, but `customer_portal=false`, `card_auto_update=false`, and `card_expiry_notice=false`.
- `getPaymentMethodUpdateMechanism()` returns type `reauthorize`, an explanatory message, and an empty URL.
- The customer JavaScript can navigate only when the result contains `redirect_url` or `url`; the empty PayPal result therefore falls through to a generic error.
- No code was found that creates the promised replacement agreement, swaps it onto the local subscription, proves it active, and safely cancels the old agreement.
- The PayPal handler says card-update-style webhooks are not available and does no local payment-method refresh.

The current marketing pillar and member-update recipe overstate this path by describing a completed PayPal redirect/new-agreement workflow. For A063, source behavior should win. Phrase the limitation clearly rather than repeating the broader marketing claim.

Safe wording:

> PayPal customers can manage funding for eligible automatic payments inside PayPal, but the inspected ArraySubs Pro customer link does not yet complete a merchant-side replacement-agreement flow. Verify the deployed PayPal experience before promising a self-service migration.

If discussing recovery, note that PayPal owns retry/outstanding-balance behavior for its remote subscription. PayPal documents retries, thresholds, suspension, and outstanding-balance capture ([PayPal payment failures and balance recovery](https://developer.paypal.com/docs/multiparty/subscriptions/customize/payment-failure-retry/)). A local card edit is not the correct model.

## Paddle: subscription-owned method and current portal limitation

Paddle distinguishes a saved customer payment method from the method stored against a subscription. Its documentation says subscription payment methods are retained for renewals even when the customer did not opt to save the same method for future purchases. The subscription's method still appears in Paddle's customer portal ([Paddle saved payment methods](https://developer.paddle.com/build/checkout/saved-payment-methods/)).

Paddle supports temporary customer-portal sessions and per-subscription deep links. Passing `subscription_ids` can produce `update_subscription_payment_method` URLs; those authenticated links are temporary and must not be cached ([Paddle customer portal session API](https://developer.paddle.com/api-reference/customer-portals/create-customer-portal-session/), [Paddle portal integration](https://developer.paddle.com/build/customers/integrate-customer-portal/)). Paddle also documents an update-payment-details workflow for active and past-due subscriptions ([Paddle update payment details](https://developer.paddle.com/build/subscriptions/update-payment-details/)).

### Current ArraySubs Paddle behavior

- ArraySubs stores the Paddle subscription ID as the normalized “payment method ID” and in `_gateway_paddle_subscription_id`.
- It stores customer ID plus method type/brand/last four extracted from the initial transaction.
- The customer update route calls `POST /customers/{customer_id}/portal-sessions` **without** passing the Paddle subscription ID, then returns the general portal overview URL.
- It does not request Paddle's available subscription-specific `update_subscription_payment_method` deep link.
- `subscription.updated` is mapped to ArraySubs' payment-method-updated handler, but that handler syncs next date and status only; it does not update card descriptors or a Paddle payment-method entity.
- The current integration does not subscribe to or handle Paddle's newer `payment_method.saved` and `payment_method.deleted` events, which Paddle documents as the relevant saved-method lifecycle events ([Paddle `payment_method.saved`](https://developer.paddle.com/webhooks/payment-methods/payment-method-saved/)).
- The manual `syncFromGateway()` looks for `payment_method` or `default_payment_method` inside a Paddle subscription response. Current Paddle subscription documentation emphasizes the complete subscription entity but does not establish those fields as the canonical method object. Treat descriptor reconciliation as unproven until tested.

Safe wording:

> ArraySubs Pro can send an eligible Paddle customer to Paddle's hosted portal. The current release uses the portal overview rather than Paddle's subscription-specific update deep link, and its local descriptor refresh after an update should be verified rather than assumed.

## Expiry notices: useful descriptor, incomplete prediction

ArraySubs has a `CustomerCardExpiringEmail` that renders the stored last four, expiry, and My Account subscriptions URL. It is triggered by the `arraysubs_card_expiring` action. The Stripe adapter fires that action when its normalized card-expiring handler resolves a subscription.

However:

- no local recurring scan was found that checks every subscription's expiry date;
- the Stripe event currently selected for advance expiry is legacy-source-only;
- PayPal and Paddle declare `card_expiry_notice=false`;
- missing expiry metadata is treated as “not expired,” not “verified valid”;
- cached expiry can be stale after a provider/network update.

Therefore the article should distinguish:

```text
descriptor indicates an old expiry
= reason to inspect/update

provider decline says expired_card
= evidence for this attempted payment

provider/network update event
= evidence that the provider changed a stored method

none of the above alone
= proof that the exact next renewal will succeed
```

Link to the existing broad recovery article rather than reproducing its dunning steps: `/payment-recovery/expired-cards-and-subscription-recovery/`.

## Gateway switching and token portability

### Default assumption: no portability

A WooCommerce token's gateway ID and remote value are scoped to the integration that created them. A Stripe PaymentMethod ID cannot be sent to PayPal or Paddle. A PayPal subscription ID is not a card token. A Paddle subscription ID is not a Stripe PaymentMethod. Copying database rows changes references, not vault ownership or authorization.

Even within Stripe, account boundaries matter. Stripe's Connect documentation says cloned PaymentMethods are independent objects with unique IDs and are not kept in sync. For recurring payments, corresponding customers and cloned methods must be created and updated in each account ([Stripe: share payment methods for direct charges](https://docs.stripe.com/connect/direct-charges-multiple-accounts)). Stripe also documents a formal data-migration process with the existing processor and Stripe's migrations team for sensitive payment data ([Stripe data migrations overview](https://docs.stripe.com/get-started/data-migrations/overview)).

### Migration control framework

Before changing a subscription gateway, identify:

1. **Vault owner:** which provider holds the credential?
2. **Merchant/account scope:** test/live mode, legal entity, connected account, and merchant ID.
3. **Authorization:** does the existing mandate/agreement permit the new collector or require customer consent?
4. **Object mapping:** old customer, token/payment method, agreement/subscription, new equivalents.
5. **Collection owner:** which system is allowed to trigger the next renewal?
6. **Cutover point:** exact cohort and effective billing timestamp.
7. **Duplicate prevention:** prove the old scheduler/agreement cannot charge after the new collector takes ownership.
8. **Rollback:** preserve mappings and remote state until the first new renewal is reconciled.

Do not fully develop migration procedures here; A067 owns the dedicated migration intent. A063 should explain why tokens are not portable and point forward to that article when published.

### ArraySubs-specific warning

Editing `_payment_method` or `_payment_method_title`, or choosing another gateway label in the admin record, does not migrate remote context. Use the Gateway Health detach action only as a deliberate fallback to manual payment: its current code clears gateway IDs and descriptors and marks the subscription detached/manual. It does not transfer a token.

## Security, PCI, privacy, audit, and support

### What the site should and should not store

Recommended local data:

- opaque provider references needed to perform or reconcile billing;
- safe descriptors: brand, last four, expiry, payment type/wallet;
- provider event ID, event type, occurred/processed timestamps;
- subscription/order association;
- update actor/source and timestamp;
- test/live/account context;
- masked error code and remediation state.

Never collect or retain in WordPress, logs, support tickets, screenshots, or research notes:

- full PAN;
- CVC/CVV/CID;
- raw secrets, signing secrets, API keys, client secrets;
- unredacted webhook payloads containing unnecessary personal data;
- hosted portal/session URLs after use;
- full opaque payment IDs in broadly accessible logs when a masked reference is sufficient.

PCI SSC states that card verification codes cannot be stored after authorization, even if encrypted, and are not needed for card-on-file or recurring transactions ([PCI SSC FAQ 1280](https://www.pcisecuritystandards.org/faqs/1280/)). Tokenization can reduce exposure but does not eliminate PCI DSS responsibilities ([PCI DSS Tokenization Guidelines](https://www.pcisecuritystandards.org/documents/Tokenization_Guidelines_Info_Supplement.pdf)). Even SAQ A merchants with fully outsourced payment pages retain current e-commerce scanning obligations under PCI DSS v4.x ([PCI SSC FAQ 1604](https://www.pcisecuritystandards.org/faqs/1604/)). Avoid promising “PCI compliant because we use tokens.”

### Privacy boundary

An opaque token tied to a WordPress user and subscription is usually linkable data, not anonymous data. Treat it and its associated gateway/customer/event metadata as personal or pseudonymous operational data where applicable. GDPR Article 5 requires purpose limitation, data minimization, accuracy, storage limitation, and security; Article 25 requires data protection by design/default ([GDPR consolidated text](https://eur-lex.europa.eu/eli/reg/2016/679/2016-05-04/eng)).

Practical application:

- document why each stored identifier is necessary;
- restrict payment metadata and logs by capability;
- redact exports and screenshots;
- set event/log retention by operational/legal need, not indefinitely by default;
- include provider records in data-access/deletion analysis without deleting evidence required by financial law;
- separate customer-visible descriptors from administrator-only diagnostic IDs;
- rotate credentials and invalidate portal/session links rather than caching them.

This is operational guidance, not jurisdiction-specific legal advice.

### Audit record for a payment-method update

An auditable update should be reconstructable without exposing raw credentials.

| Field | Example | Why it matters |
| --- | --- | --- |
| Local subscription | `#1842` | Scope of the future renewal change |
| Gateway + mode/account | Stripe test, account fingerprint | Prevent cross-mode/account confusion |
| Old method fingerprint | masked ID + brand/last4 | Establish before state |
| New method fingerprint | masked ID + brand/last4 | Establish after state |
| Update mechanism | portal / updater event / reauthorization / failed-renewal payment | Explains consent and expected propagation |
| Provider event/request ID | masked event or request ID | Correlates support evidence |
| Occurred and processed time | UTC timestamps | Detects delay and ordering |
| Local actor/source | customer, admin, provider event | Supports authorization review |
| Affected subscriptions | explicit ID list | Prevents accidental “update all” assumptions |
| Verification result | sandbox renewal, failure code, or not yet tested | Separates completion from intent |

ArraySubs already writes payment logs, private subscription notes, gateway event records, and an update timestamp/source for some Stripe events. The article can mention those capabilities, but should not claim a universal immutable audit trail or complete multi-subscription fan-out.

### Support script

Support agents should ask for:

- subscription and renewal order IDs;
- gateway name and test/live context;
- safe descriptor only;
- whether the customer changed the general account default or the specific subscription method;
- hosted destination used and approximate time;
- provider error code/category;
- whether a successful remote charge already exists;
- most recent gateway/webhook health evidence.

They should never request full card details, CVC, raw token IDs in public channels, or screenshots with unredacted provider secrets.

## Gateway comparison table for the article

| Question | Stripe in current ArraySubs Pro | PayPal in current ArraySubs Pro | Paddle in current ArraySubs Pro | Manual gateway |
| --- | --- | --- | --- | --- |
| Renewal reference | Customer + PaymentMethod on ArraySubs subscription | Remote PayPal subscription/agreement | Remote Paddle subscription | No reusable automatic credential required |
| Who collects renewal? | ArraySubs initiates off-session PaymentIntent | PayPal | Paddle | Customer pays each renewal invoice |
| Customer update destination | General Stripe Billing Portal session | Current route returns reauthorization message but no URL | Paddle general customer portal overview | Customer chooses method while paying |
| Network/provider auto-update claim | Stripe may update eligible PaymentMethods; not universal | PayPal may manage eligible wallet/card updates | Paddle/provider manages hosted method state | Gateway-specific |
| Current local sync confidence | Needs end-to-end verification; SetupIntent overwrite and multi-subscription caveats | No completed replacement flow found | Status/date sync exists; method descriptor sync after portal update unproven | New payment is attached to that invoice, not automatically an auto-renew token |
| Expiry notice | Legacy event mismatch means no universal notice claim | Not supported locally | Not supported locally | Gateway-specific |
| Portable? | No; even cross-account moves need supported migration/cloning | No | No | Not applicable until a new authorization is created |

## Worked example: one customer, two subscriptions, three defaults

Use this original example in the article.

Customer Amira has:

- WooCommerce account default: Visa ending 4242;
- ArraySubs subscription #701: Stripe `pm_old`, Mastercard ending 4444;
- ArraySubs subscription #702: Stripe `pm_other`, Visa ending 4242;
- Stripe Customer default: `pm_new`, Visa ending 0005 after a portal visit.

```text
Woo default:            token row for Visa 4242
Stripe Customer default: pm_new / Visa 0005
Subscription #701:       _gateway_payment_method_id = pm_old
Subscription #702:       _gateway_payment_method_id = pm_other
```

If ArraySubs renews #701 by explicitly sending `pm_old`, the new Stripe Customer default is irrelevant. If a webhook resolves only one subscription by Customer ID, it may refresh #701 but not #702—or vice versa—depending on query result. The correct completion test is not “the portal showed success.” It is:

1. verify the intended subscription now references the intended provider method;
2. verify unintended subscriptions did or did not change according to the customer's choice;
3. run a sandbox renewal for each affected cohort;
4. verify one successful remote payment and one correct local renewal order;
5. verify the next billing date, access state, and failure/retry state.

This example is more useful than generic “tokens are secure” prose because it exposes the three-default problem.

## Diagnostic decision tree

```text
Customer says “I updated my card”
│
├─ Where?
│  ├─ WooCommerce My Account default
│  ├─ specific subscription update link
│  ├─ Stripe/Paddle hosted portal
│  └─ PayPal automatic-payment settings
│
├─ Which object changed at the provider?
│  ├─ same PaymentMethod descriptors updated
│  ├─ new PaymentMethod became customer default
│  ├─ new remote agreement/subscription created
│  └─ unknown / no provider evidence
│
├─ Which local subscription references changed?
│  ├─ intended subscription only
│  ├─ all opted-in subscriptions
│  ├─ one arbitrary subscription sharing a customer ID
│  └─ none
│
└─ Is there an unpaid renewal?
   ├─ yes → verify remote charge state before retrying exact order
   └─ no  → sandbox/test next off-session renewal path
```

## Testing matrix the article should include

### Minimum release test

- [ ] New subscription checkout stores the correct gateway, customer, method/agreement, and safe descriptors.
- [ ] Stored method is optimized/authorized for off-session use where the gateway requires it.
- [ ] A normal sandbox renewal charges exactly once and reconciles the local order.
- [ ] Customer changes one subscription's method; only intended subscriptions change.
- [ ] “Update all” is tested separately if the UI claims it.
- [ ] Customer changes only the general WooCommerce default; verify whether subscription context should remain unchanged.
- [ ] Provider/customer default changes; verify the exact ArraySubs renewal reference.
- [ ] Same customer owns multiple subscriptions using different methods.
- [ ] Same PaymentMethod is shared by multiple subscriptions and receives an automatic descriptor update.
- [ ] On-hold subscription can reach recovery; pending-cancel/canceled/expired records cannot open an update path.
- [ ] Paying a failed renewal with a new method updates the future renewal context only when intended.
- [ ] Update flow handles SCA/3DS or mandate confirmation.
- [ ] Webhook is delivered twice; side effects remain idempotent.
- [ ] Older update event arrives after a newer event; current state does not regress.
- [ ] Update succeeds remotely while the local callback/webhook is delayed.
- [ ] Renewal succeeds remotely while local webhook processing fails; operator reconciles without duplicate charge.
- [ ] Test/live Stripe modes and account switches reject stale IDs safely.
- [ ] Site clone/staging mode cannot run live renewals or reuse production portal links.
- [ ] Removing a saved method used by a subscription has a safe replacement or clear failure.
- [ ] Logs, notices, exports, and screenshots expose no full card/CVC/secret/session URL.

### Gateway-specific assertions

**Stripe**

- stored value starts with `pm_`, never `seti_`, before renewal;
- stored Customer and PaymentMethod belong to the active Stripe account/mode;
- portal update changes the exact subscription method, not merely Customer default;
- multiple subscriptions on one Customer are updated by explicit intended ID set;
- `payment_method.automatically_updated` refreshes every relevant descriptor cache;
- no reliance on `customer.source.expiring` for PaymentMethod-based cards;
- off-session renewal may still require customer action and has a recovery route.

**PayPal**

- buyer can change the merchant-specific automatic-payment funding source inside PayPal when PayPal allows it;
- ArraySubs customer link behavior is tested and accurately described;
- if a new agreement is required, replacement becomes active before old agreement cancellation;
- no overlapping collector or double billing;
- PayPal retry/outstanding-balance state is reconciled with local renewal orders.

**Paddle**

- portal session is generated just in time and never cached;
- subscription-specific update deep link is used if the UI claims a direct update;
- active versus past-due update behavior is tested;
- local descriptor refresh uses authoritative Paddle evidence;
- Paddle-owned recurring transaction is reconciled exactly once.

## ArraySubs features worth mentioning naturally

### Verified/useful

- Free core keeps manual renewal invoices compatible with WooCommerce gateways; no automatic reusable token is required for customer-paid invoices.
- Pro automatic gateways maintain subscription-specific gateway context.
- Stripe checkout integration requests reusable/off-session setup and uses the official WooCommerce Stripe Gateway.
- Eligible Pro subscriptions get a gateway-specific Update payment method link.
- Customer ownership and lifecycle checks protect the update REST route.
- Safe display supports brand, last four, expiry, wallet/type, and an Expired badge when metadata exists.
- Stripe/Paddle hosted portals keep sensitive input off the ArraySubs UI.
- Stripe automatic-update events can refresh local safe descriptors when a subscription is resolved correctly.
- Stripe missing-token cleanup removes some stale Woo token references during subscription checkout.
- Gateway Health provides connection/webhook context and event logs useful during diagnosis.
- Payment logs, subscription notes, retries, SCA recovery, and manual Pay actions can support recovery after a method change.
- Gateway detach can intentionally fall back to manual payment, but is not migration.

### Limits and gaps that must stay visible

- ArraySubs is not a network account updater.
- The local normalized “payment method ID” has different meanings by gateway.
- WooCommerce My Account defaults do not automatically prove ArraySubs subscription context changed.
- Stripe's current general portal integration and SetupIntent event handling have material sync risks.
- Stripe PaymentMethod-based integrations should not rely on the legacy source-expiring event.
- Stripe customer-ID fallback resolves only one subscription.
- PayPal's current ArraySubs update mechanism returns no usable URL and no replacement-agreement implementation was found.
- Paddle uses a general overview URL rather than the available subscription-specific update deep link.
- Paddle local card descriptor refresh after portal update is unproven.
- Marketing content currently overstates universal Stripe/PayPal/Paddle self-service updates; A063 must use source-grounded wording.
- Method update does not automatically pay an older failed renewal.
- Changing a local gateway label does not migrate a vault credential or remote agreement.

## Internal linking plan

Required links and natural anchors:

| Route | Suggested anchor | Placement |
| --- | --- | --- |
| `/deals/arraysubs/features/#payment-gateways` | “payment-gateway capabilities in ArraySubs” | After the direct conceptual model |
| `/deals/arraysubs/use-cases/recipes/member-update-payment/` | “member payment-method update recipe” | After broad update-model explanation; do not repeat setup steps |
| `/deals/arraysubs/use-cases/recipes/stripe-automatic-billing-sca/` | “Stripe automatic billing and SCA recipe” | Stripe future-use setup section |
| `/deals/arraysubs/use-cases/recipes/gateway-health-monitor/` | “Gateway Health monitoring recipe” | Audit/diagnosis section |
| `/deals/arraysubs/pricing/` | “view ArraySubs Pro pricing” | After the core answer and practical value, never in opening |
| `/payment-recovery/expired-cards-and-subscription-recovery/` | “expired-card recovery guide” | Expiry and failed-renewal distinction |
| `/payments-and-compliance/sca-and-3d-secure-for-subscription-renewals/` | “SCA and 3D Secure for renewals” | Stripe off-session setup/caveat |
| `/payments-and-compliance/subscription-webhooks-events-every-woocommerce-store-should-monitor/` | “subscription webhook monitoring guide” | Event ordering/idempotency paragraph if A064 is published before A063 finalization; otherwise omit until live |
| `/payments-and-compliance/best-payment-gateways-for-woocommerce-subscriptions/` | “compare subscription gateway architectures” | Gateway model table |
| `/payments-and-compliance/stripe-vs-paypal-vs-paddle-for-woocommerce-recurring-billing/` | “Stripe, PayPal, and Paddle billing models” | Provider comparison section |
| `/payments-and-compliance/stripe-recurring-payments-for-woocommerce-how-they-work-and-what-to-test/` | “Stripe recurring-payment test guide” | Stripe verification checklist |
| `/payments-and-compliance/paypal-recurring-payments-for-woocommerce-agreements-renewals-and-limits/` | “PayPal agreement limitations” | PayPal section |
| `/payments-and-compliance/paddle-merchant-of-record-for-woocommerce-subscriptions/` | “Paddle Merchant of Record architecture” | Paddle section |

Do not force both feature-hub duplicates from the brief into separate links; one contextual link to the payment-gateway anchor satisfies both commercial-pillar and feature-hub intent.

Cannibalization guardrails:

- A063 owns object model, token/reference semantics, provider update differences, portability boundaries, and verification framework.
- The member-update recipe owns click-by-click ArraySubs configuration.
- The expired-card article owns detailed failure recovery/dunning.
- A062 owns SCA mechanics.
- A064 owns webhook event operations.
- A067 owns migration execution.

## Screenshot and visual plan

The writer should use three to six fresh real plugin screenshots and follow the screenshot/annotation skills. Recommended evidence targets:

1. **Customer subscription detail with Payment Method plus Pro Card on File/Update payment method** — proves customer-level Manage methods and subscription-specific Update method are different links. Capture a safe test account only.
2. **Customer recovery actions on an on-hold subscription** — place beside “method update does not pay the failed renewal”; show Update method and Pay as distinct actions if the UI has both.
3. **Stripe Gateway Health expanded details** — use beside account/mode/webhook verification; annotate connection mode and webhook health, not secrets.
4. **WooCommerce Payment Methods admin screen** — use early to establish that enabling a gateway is not the same as proving automatic token update support.
5. **Stripe connection/settings screen** — use beside account-scoping and stale-token discussion; crop out any sensitive keys.
6. **Gateway Health overview** — use in operations checklist if it adds a distinct view rather than duplicating the Stripe detail.

Likely reusable clean originals already exist under `screenshots/live-ui/` as `18-customer-recovery-actions-original.png`, `28-payment-gateway-health-overview-original.png`, `29-woocommerce-payment-methods-original.png`, `30-stripe-gateway-health-details-original.png`, and `33-stripe-connect-settings-original.png`. The writer must inspect originals, capture anything missing, and create article-specific fresh annotations rather than reusing old annotated output blindly.

Context-specific generated image concepts—follow `$inner-blog-images` strictly and avoid fake UI:

1. **Vault ownership cutaway:** customer card → provider vault → opaque gateway token → Woo customer record → ArraySubs subscription reference. Technical editorial diagram, minimal labels.
2. **Three-default problem:** one customer with Woo default, provider customer default, and two subscription-specific references diverging. Use IDs as abstract colored tags, not real provider UI.
3. **Update mechanism split:** customer-hosted update, network updater, PayPal wallet funding change, and reauthorization paths converging on future renewal verification.
4. **Portability checkpoint:** provider/account boundaries shown as locked vault islands; supported migration/reauthorization bridge, not copied token strings.
5. **Verification workbench:** before/after subscription context, webhook/event evidence, sandbox renewal, and reconciliation proof.

Each visual should use a materially different composition: cutaway, object map, four-lane flow, boundary map, and test bench. No invented product dashboards, gateway logos, card numbers, unsupported metrics, or prose-heavy labels.

## Recommended long-form outline (5,000–6,500 substantive words)

### Opening: direct answer and key takeaways

- 40–60 word direct answer.
- Define token as a gateway-scoped vault reference.
- State that account default, provider default, and subscription reference can differ.
- State that ArraySubs is not a network account updater.
- CTA only after core value has been delivered.

### 1. What is a subscription payment token?

- Eight-object model.
- Woo token versus provider token versus agreement.
- Extractable “object/owner/proof/non-proof” table.
- Real Woo payment methods screenshot.

### 2. Why does a subscription need its own payment context?

- Customer account default versus future-renewal reference.
- Failed-renewal payment as a third path.
- Worked Amira/two-subscription/three-default example.
- ArraySubs normalized context table, with inconsistent remote-ID semantics called out.

### 3. What changes when a customer updates a card?

- Customer-hosted update.
- Network automatic update.
- PayPal wallet funding source.
- Replacement agreement/reauthorization.
- Separate “method ready” from “old renewal paid.”
- Customer portal/recovery screenshot.

### 4. How Stripe updates work in current ArraySubs

- official Woo Stripe checkout and off-session setup;
- explicit stored Customer/PaymentMethod used for renewals;
- general portal behavior;
- exact sync caveats, including `seti_` overwrite risk and one-subscription fallback;
- network updater event and expiry-event boundary;
- practical verification checklist.

### 5. How PayPal and Paddle differ

- PayPal remote subscription/agreement and buyer-owned wallet funding;
- current ArraySubs no-URL reauthorization gap;
- Paddle subscription-owned method and hosted portal;
- current overview URL versus available Paddle deep link;
- safe gateway comparison table.

### 6. Can tokens move to another gateway or account?

- default no;
- cross-provider impossibility;
- same-provider account/mode caveats;
- formal migration/reauthorization;
- link to dedicated migration content rather than over-expanding.

### 7. Security, privacy, audit, and support checklist

- hosted collection and PCI limits;
- tokenization does not equal automatic PCI compliance;
- GDPR/data minimization;
- audit record table;
- safe support script.

### 8. What should a store test before trusting card updates?

- minimum and gateway-specific matrices;
- one customer/multiple subscriptions;
- duplicate/out-of-order webhooks;
- test/live/site-clone boundary;
- proof definition.

### Conclusion

- Token location is less important than ownership, subscription reference, and verification.
- Three bullets maximum.
- Link member update recipe, Gateway Health, and pricing CTA.

### Useful FAQs

- Does WooCommerce store my customer's full card number?
- Does changing the default card update every subscription?
- Does a Stripe network update change the token ID?
- Can a PayPal subscription use the same card-update flow as Stripe?
- Can I copy payment tokens when changing gateways?
- Does updating a method pay an already failed renewal?
- What proves a payment-method update worked?

## Claim wording: approved versus prohibited

| Use this | Avoid this |
| --- | --- |
| “The gateway vaults the credential; WooCommerce stores an opaque gateway reference and safe descriptors.” | “WooCommerce stores the customer's card.” |
| “A customer default and a subscription renewal reference can differ.” | “Make Default always updates every subscription.” |
| “Stripe may automatically update eligible saved cards when issuer/network support exists.” | “Expired cards update automatically.” |
| “ArraySubs can process supported gateway update events.” | “ArraySubs provides a network account updater.” |
| “Current ArraySubs launches a Stripe-hosted portal, but the exact subscription reference must be verified.” | “A Stripe portal update automatically updates all ArraySubs subscriptions.” |
| “PayPal customers may manage merchant-specific automatic-payment funding in PayPal.” | “ArraySubs seamlessly swaps a PayPal card token.” |
| “Current ArraySubs launches Paddle's portal overview.” | “ArraySubs deep-links directly to the Paddle subscription update screen.” |
| “Migration needs a provider-supported transfer or customer reauthorization.” | “Copy the token database to switch gateways.” |
| “Tokenization may reduce exposure; validate your actual PCI obligations.” | “Tokens make the store PCI compliant.” |

## Primary source library

All current-behavior citations were checked on 2026-07-20. Use claim-adjacent links in the article; do not dump the entire bibliography into one source list.

### WooCommerce

- [WooCommerce Payment Token API](https://developer.woocommerce.com/docs/features/payments/payment-token-api/) — local token classes, gateway/user association, ownership check, checkout saving and retrieval.
- [WooCommerce Manage Payment Methods — Subscriptions](https://woocommerce.com/document/subscriptions/customers-view/subscriber-payment-methods/) — customer account token versus subscription copy, deletion alternatives, defaults, single-subscription changes.
- [WooCommerce Subscription Payment Methods & Gateways](https://woocommerce.com/document/subscriptions/payment-gateways/) — gateway-specific advanced payment-method-change capability and manual-renewal fallback.
- [WooCommerce Subscription Payment Gateway Integration Guide](https://woocommerce.com/document/subscriptions/develop/payment-gateway-integration/) — copying a failed-renewal method into future subscription context.
- [WooCommerce `WC_Payment_Tokens` code reference](https://woocommerce.github.io/code-reference/classes/WC-Payment-Tokens.html) — current class API.

### Stripe

- [Stripe Setup Intents](https://docs.stripe.com/payments/setup-intents) — saving/optimizing methods for future off-session use and consent.
- [Stripe Attach a PaymentMethod](https://docs.stripe.com/api/payment_methods/attach) — use SetupIntent/PaymentIntent with future usage; default method requires explicit customer property.
- [Stripe customer portal](https://docs.stripe.com/customer-management) — hosted updates, configuration, and ephemeral session lifetime.
- [Stripe customer portal deep links](https://docs.stripe.com/customer-management/portal-deep-links) — dedicated payment-method update flow and default-method effect.
- [Stripe card lifecycle](https://docs.stripe.com/payments/cards/overview) — automatic updates, participation limits, event types, new descriptors.
- [Stripe event types](https://docs.stripe.com/api/events/types) — `payment_method.updated`, `payment_method.automatically_updated`, and legacy-only `customer.source.expiring`.
- [Stripe automatic-update event rename](https://docs.stripe.com/changelog/2020-08-27/renames-automatically-updated-event-type) — legacy event name boundary.
- [Stripe Connect payment-method sharing](https://docs.stripe.com/connect/direct-charges-multiple-accounts) — cloned methods are independent and recurring copies require explicit sync.
- [Stripe data migration overview](https://docs.stripe.com/get-started/data-migrations/overview) — formal processor/account migration process.

### PayPal

- [PayPal Subscriptions API](https://developer.paypal.com/docs/api/subscriptions/v1/) — remote subscription object and supported update/revise fields.
- [PayPal automatic-payment help](https://www.paypal.com/uk/cshelp/article/what-is-an-automatic-payment-and-how-do-i-update-or-cancel-one-help240) — merchant-specific funding choice.
- [PayPal preferred payment method help](https://www.paypal.com/us/cshelp/article/what-payment-methods-can-i-use-with-paypal-help468) — general preference does not change automatic payments.
- [PayPal card update help](https://securepayments.paypal.com/uk/cshelp/article/how-do-i-update-my-debit-or-credit-card-on-paypal-help157) — eligible automatic card update and wallet behavior.
- [PayPal subscription webhooks](https://developer.paypal.com/docs/subscriptions/reference/webhooks/) — available recurring lifecycle events; no card-update-style subscription event listed.
- [PayPal failed-payment recovery](https://developer.paypal.com/docs/multiparty/subscriptions/customize/payment-failure-retry/) — provider retries, threshold, outstanding balance, suspension.

### Paddle

- [Paddle create customer portal session](https://developer.paddle.com/api-reference/customer-portals/create-customer-portal-session/) — temporary hosted links and per-subscription update deep links.
- [Paddle customer portal integration](https://developer.paddle.com/build/customers/integrate-customer-portal/) — do not cache, generate on demand, subscription IDs.
- [Paddle update payment details](https://developer.paddle.com/build/subscriptions/update-payment-details/) — active/past-due hosted update behavior.
- [Paddle saved payment methods](https://developer.paddle.com/build/checkout/saved-payment-methods/) — customer-saved method versus subscription-stored method.
- [Paddle saved-method API](https://developer.paddle.com/api-reference/payment-methods/) — provider objects can be retrieved/deleted but not created via API.
- [Paddle `payment_method.saved`](https://developer.paddle.com/webhooks/payment-methods/payment-method-saved/) — current saved-method event and object ID.
- [Paddle `subscription.updated`](https://developer.paddle.com/webhooks/subscriptions/subscription-updated/) — broad subscription-state event, not proof that it is a card-descriptor event.

### Security and privacy

- [PCI SSC FAQ 1280](https://www.pcisecuritystandards.org/faqs/1280/) — CVC/CVV storage forbidden after authorization, including recurring/card-on-file.
- [PCI DSS Tokenization Guidelines](https://www.pcisecuritystandards.org/documents/Tokenization_Guidelines_Info_Supplement.pdf) — tokenization may reduce scope but does not eliminate PCI compliance.
- [PCI SSC FAQ 1604](https://www.pcisecuritystandards.org/faqs/1604/) — current SAQ A e-commerce scanning obligations even when payment is outsourced.
- [EU GDPR consolidated text](https://eur-lex.europa.eu/eli/reg/2016/679/2016-05-04/eng) — purpose limitation, minimization, accuracy, storage limitation, security, and privacy by design.

## Final editorial warnings

1. Do not repeat the current marketing claim that PayPal self-service update is complete; the inspected code does not support it.
2. Do not say Stripe's portal automatically changes every ArraySubs renewal PaymentMethod; that is precisely the unproven sync boundary.
3. Do not claim `customer.source.expiring` covers current PaymentMethod-based cards.
4. Do not describe PayPal or Paddle remote subscription IDs as card tokens.
5. Do not imply `brand + last4 + expiry` proves validity.
6. Do not call a method update a recovered subscription until any unpaid renewal, local status, retry state, access, and next date are reconciled.
7. Do not turn the article into the member-update recipe, expired-card recovery guide, SCA guide, webhook guide, or migration guide; link those narrower intents.
8. Present implementation caveats as source-reviewed limitations of ArraySubs 1.8.11 / Pro 1.1.2 on 2026-07-20, not as timeless architecture.

## 2026-07-22 staging screenshot remediation plan and provenance

These captures were taken from the user-confirmed staging site at `http://localhost:10013` in the isolated `blog-remediation` browser session. ArraySubs Pro was temporarily active so the article could show the actual Pro gateway capabilities. The three clean originals were inspected twice before annotation. Existing article image files remain preserved; accepted annotations will be installed under new `-verified.png` filenames.

| Clean original | Source route and visible state | Article placement | Privacy and crop decision | Exact annotation queries |
| --- | --- | --- | --- | --- |
| `a063-woocommerce-payment-methods-original.png` | `/my-account/payment-methods/`; authenticated WooCommerce My Account screen showing an empty saved-method state | Replace the account-level screenshot beneath “The customer-account link and subscription context are separate” | No customer name, email, address, token, or card details appear in the content area. Crop to the page title, account navigation, and empty-state notice. | `Payment methods` — “The account-level saved-method area”; `No saved methods found.` — “No reusable method is stored for this account” |
| `a063-subscription-billing-context-original.png` | `/wp-admin/admin.php?page=arraysubs-mainadmin#/subscriptions`; active subscription detail showing its Billing Information card | Replace the provider-row screenshot beneath “Gateway presence does not make references interchangeable” because it directly proves that one subscription retains a specific renewal method | The full page contains test customer contact data, so only the Billing Information card is allowed in the crop. Exclude customer, address, order, timeline, and note panels. | `Billing Information` — “The subscription keeps its own billing context”; `Payment Method:` — “This value belongs to this subscription” |
| `a063-stripe-payment-method-health-original.png` | `/wp-admin/admin.php?page=arraysubs-mainadmin#/settings/gateways`; Stripe Gateway Health card expanded on a disabled/unconfigured staging gateway | Replace the old Stripe health screenshot in the auditable-update section | No customer data, provider secrets, live token IDs, or credentials are visible. Crop to the Stripe card and its capability/webhook context; retain the disabled/not-configured labels so the image cannot imply successful setup. | `Payment Method Update` — “ArraySubs reports this gateway capability”; `Card Auto Update` — “Provider-managed update support is surfaced”; `Not configured` — “Capability still requires working gateway setup” |

Annotation policy for all three: `#873EFF`, strict crop, three review passes, one to three sparse short labels, and no unresolved-query override. A screenshot is accepted only when the annotation tool reports every query resolved.

### Accepted annotation results

- `a063-subscription-billing-context-original/annotated.png`: 2/2 queries resolved, 0 unresolved, all three review passes completed. Installed byte-identically as `subscription-billing-context-verified.png` in both source and public article directories; SHA-256 `c677f85d2fb3b6c4386211e945366d1d99312db4a905f44d33fc60708c6305d6`.
- `a063-woocommerce-payment-methods-original/annotated.png`: 2/2 queries resolved, 0 unresolved, accepted on review pass 2/3. Installed byte-identically as `woocommerce-payment-methods-verified.png` in both source and public article directories; SHA-256 `122edc71688c871bb0c95f8fbf85ab61c28dd6e45bf1eeff44b90732ca8bf4fb`.
- `a063-stripe-payment-method-health-original/annotated.png`: 3/3 queries resolved, 0 unresolved, all three review passes completed. Installed byte-identically as `stripe-payment-method-health-verified.png` in both source and public article directories; SHA-256 `82c49a39a92de9858ff63cd66d0175b6e90a5ef56e2fdfea0572970bbca7ea61`.

The clean originals, intermediate annotation directories, and pre-existing article images were retained. No annotated result was manually retouched or visually reinterpreted after the tool’s review loop.

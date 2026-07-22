---
title: "Subscription Payment Tokens and Card Updates Explained"
meta_description: "Learn how WooCommerce subscription payment tokens, provider vaults, card updates, defaults, expiry, portability, and ArraySubs renewal context work."
focus_keyword: "subscription payment tokens and card updates"
published: "2026-05-07"
updated: "2026-06-18"
last_verified: "2026-07-22"
author: "Emran"
author_affiliation: "ArrayHash"
reviewer: "ArraySubs Engineering Team"
---

# Subscription Payment Tokens and Card Updates Explained

A subscription payment token is a gateway-specific reference to a vaulted card or billing authorization, not a portable copy of the card. WooCommerce can store a customer token, but each subscription still needs the correct provider customer, payment-method, mandate, or agreement context. Card updates must reach that renewal context and then be proven with a test renewal.

The important idea is not “the card was updated.” It is: **which object changed, in which provider account, for which subscription, and what exact reference will the next renewal use?** A WooCommerce default, a Stripe customer default, and an ArraySubs subscription reference can all point to different methods at the same time.

> **Key takeaways**
>
> - A token is normally an opaque provider reference; WooCommerce and ArraySubs should not store the raw card number or CVC.
> - Tokens are scoped to a gateway, merchant/provider account, and test/live environment. They are not generally portable.
> - A customer-account default and a subscription’s renewal method are separate references.
> - Updating a provider customer default does not prove that the ArraySubs subscription-specific payment method changed.
> - ArraySubs is not a card-network account updater. Stripe or another provider may update eligible vaulted cards when network/issuer support exists.
> - Current ArraySubs Pro Stripe portal and webhook paths need end-to-end verification for the exact subscription, especially for customers with multiple subscriptions.
> - Current PayPal and Paddle adapters store remote subscription/agreement IDs in a normalized “payment method” field; those values are not card tokens.
> - Updating a payment method does not automatically pay an older failed renewal or clear on-hold/retry state.
> - Gateway switching requires provider-supported migration or new customer authorization, not copied database rows.

This guide reflects a first-party code review of ArraySubs 1.8.11, ArraySubs Pro 1.1.2, WooCommerce core, and the official WooCommerce Stripe Gateway, plus user-confirmed staging UI reverified July 22, 2026. No live card update, network updater, or production renewal was performed for this article. Provider behavior and versions change.

## What is a subscription payment token?

The word “token” is used too loosely. A subscription stack can contain at least eight related objects:

| Layer | Example | Typical owner | What it proves | What it does not prove |
| --- | --- | --- | --- | --- |
| Card/account credential | PAN and issuer account | Issuer/cardholder | Funding account exists | Merchant may store or reuse the PAN |
| Network updater relationship | Network-managed replacement credential | Network/issuer/provider | Eligible credential may survive reissue | Every card/provider participates |
| Provider-vault method | Stripe PaymentMethod, Paddle saved method | Payment provider | Provider identifies a stored method in one account | Identifier works at another provider/account |
| Provider customer | Stripe Customer, Paddle Customer, PayPal payer | Provider | Groups provider objects | Customer default equals subscription selection |
| Recurring authorization | PayPal/Paddle subscription, mandate | Provider | Future collection is authorized for that object | It is a portable card token |
| WooCommerce token | Local WC payment-token row | WooCommerce/gateway | Maps a user/gateway to a provider reference | Every subscription uses it automatically |
| ArraySubs context | Gateway customer/method/subscription metadata | ArraySubs | Identifies remote context for one subscription | The fields mean the same thing for every gateway |
| Safe descriptor | Brand, last four, expiry, wallet type | Local cache/UI | Helps recognize the method | Credential is current, valid, or renewal-selected |

The payment credential normally stays in a provider vault. The local WordPress database keeps an opaque reference plus safe display metadata. That architecture reduces the need to handle raw card data, but tokenization alone does not make a site universally PCI compliant.

WooCommerce’s [Payment Token API](https://developer.woocommerce.com/docs/features/payments/payment-token-api/) defines user-owned, gateway-specific token objects with a token value, gateway ID, type, default flag, and card descriptors. It also warns implementers to verify user ownership; loading a token by database ID is not authorization.

![A payment credential becomes a provider-vault reference that WooCommerce and one subscription can use without storing the raw card.](/blogs/subscription-payment-tokens-and-card-updates-explained/payment-token-vault-flow.png)

### Gateway presence does not make references interchangeable

![Annotated ArraySubs Billing Information card showing that the current subscription retains its own payment-method context.](/blogs/subscription-payment-tokens-and-card-updates-explained/subscription-billing-context-verified.png)

This privacy-cropped staging screen proves that ArraySubs presents billing information—including the payment method—on the individual subscription record. It does not prove that the displayed method is automatically reusable, correctly vaulted, or portable. A Stripe PaymentMethod ID is meaningless to PayPal or Paddle. A PayPal subscription ID is not a card token. A Paddle subscription ID cannot be passed into a Stripe PaymentIntent.

## Why does a subscription need its own payment context?

A customer can save several methods and choose a general default. A subscription still needs a stable answer to “what should this exact renewal use?” Without a subscription-specific reference, changing a default could unexpectedly change every subscription, or no subscription, depending on gateway behavior.

WooCommerce’s [subscription payment-method documentation](https://woocommerce.com/document/subscriptions/customers-view/subscriber-payment-methods/) explains the separation in its own product: customer-account methods exist independently, while a chosen token is copied into the subscription for future renewals. ArraySubs is a separate system, but the object-model lesson applies.

### Three different defaults can coexist

Consider an illustrative customer, Amira:

- WooCommerce account default: Visa ending 4242;
- ArraySubs subscription #701: Stripe method `pm_old`, Mastercard ending 4444;
- ArraySubs subscription #702: Stripe method `pm_other`, Visa ending 4242; and
- Stripe Customer default after a portal visit: `pm_new`, Visa ending 0005.

> **Woo default:** Visa ending 4242  
> **Stripe customer default:** `pm_new`, Visa ending 0005  
> **Subscription #701:** `pm_old`, Mastercard ending 4444  
> **Subscription #702:** `pm_other`, Visa ending 4242

![Three separate payment defaults can coexist, while the subscription-specific method controls its renewal.](/blogs/subscription-payment-tokens-and-card-updates-explained/three-payment-defaults.png)

If ArraySubs renews #701 by explicitly sending `pm_old`, the new Stripe Customer default is irrelevant to that charge. The portal can truthfully show “default updated” while the next ArraySubs renewal still uses the old subscription reference.

The proof is not a success banner. The proof is:

1. the intended subscription stores the intended provider method;
2. unintended subscriptions changed—or did not change—according to the customer’s choice;
3. a sandbox renewal uses the intended method;
4. one provider payment maps to one correct Woo renewal order; and
5. subscription status, access, next date, and failure state reconcile.

### Paying a failed renewal is a third update path

A customer may pay a failed renewal with a new method. That proves the order was paid. It updates future renewals only if the gateway integration intentionally persists the new provider customer/method/agreement references back to the original subscription.

The [WooCommerce gateway integration guide](https://woocommerce.com/document/subscriptions/develop/payment-gateway-integration/) describes that separate implementation responsibility. Never assume “paid with new card” equals “future recurring method migrated.”

### How ArraySubs normalizes gateway context

Current ArraySubs Pro stores normalized fields for gateway, remote customer, remote “payment method,” session, status, last transaction, and safe brand/last-four/expiry/type descriptors.

The names are consistent; the semantics are not:

| Gateway | Remote customer field | Normalized payment-method field | Who collects renewal? |
| --- | --- | --- | --- |
| Stripe | Stripe Customer ID | Stripe PaymentMethod ID | ArraySubs creates off-session PaymentIntent |
| PayPal | Payer ID or email fallback | PayPal subscription ID | PayPal remote subscription |
| Paddle | Paddle Customer ID | Paddle subscription ID | Paddle remote subscription |

The normalized `_gateway_payment_method_id` is gateway-polymorphic. Support scripts must resolve the gateway before interpreting the value. A string in that field may identify a card-like Stripe method or an entire remote recurring agreement.

Changing only the local payment-method label/title does not create new remote authority. The same warning applies to an administrative “detach”: current Gateway Health detach clears local remote IDs/descriptors and falls back to manual behavior; it does not migrate a credential or cancel a provider-owned remote subscription.

## What happens when a customer updates a card?

Four mechanisms are regularly described as “card update,” but they solve different events.

| Mechanism | Trigger | Sensitive interaction | Does local ID change? | Primary risk |
| --- | --- | --- | --- | --- |
| Customer-hosted update | Customer intentionally adds/selects method | Provider-hosted portal/form | Often, not always | Provider default changes; subscription stays stale |
| Network/provider automatic update | Issuer replaces eligible card | No customer form | Often no | Participation varies; local descriptors stay stale |
| PayPal wallet funding change | Customer edits merchant automatic payment | PayPal account | Agreement may stay same | Store has little card-level evidence |
| Replacement agreement | Customer authorizes a new recurring object | Provider approval | Agreement ID changes | Old/new collectors overlap or gap |

### The customer-account link and subscription context are separate

![Annotated WooCommerce My Account payment-method screen showing the account-level saved-method area and its current empty state.](/blogs/subscription-payment-tokens-and-card-updates-explained/woocommerce-payment-methods-verified.png)

The staging account currently has no saved methods, which is a useful boundary: an account-level screen can be empty even while an ArraySubs subscription record displays its own payment-method label. The core customer view can send eligible active, on-hold, or trial subscriptions to this WooCommerce account-level screen. ArraySubs Pro can additionally expose a gateway-specific update route when the gateway advertises support and the subscription is not waiting for cancellation.

The [member payment-method update recipe](/deals/arraysubs/use-cases/recipes/member-update-payment/) owns the click-by-click setup. This article owns the verification question: what provider object and local subscription reference actually changed?

### A method update does not settle an unpaid renewal

If the subscription is on hold because a renewal order remains unpaid, changing a future method is only half the recovery. The operator/customer must still pay or reconcile that specific renewal order, clear the pending/failure/retry state, restore eligible access, and compute the next date from the correct billing anchor.

For authentication-required renewals, read [SCA and 3D Secure for subscription renewals](/deals/arraysubs/resources/payments-and-compliance/sca-and-3d-secure-for-subscription-renewals/). For expired-card dunning, use the [expired-card recovery guide](/deals/arraysubs/resources/payment-recovery/expired-cards-and-subscription-recovery/).

## What is a network account updater?

A card network/issuer/provider can sometimes refresh an eligible vaulted credential after a replacement, expiry change, or reissue. The customer may never visit the merchant’s portal, and the provider’s PaymentMethod identifier may remain the same while safe descriptors change.

Stripe says it automatically attempts updates for eligible saved cards and emits method-update events, but issuer participation and international support vary; it cannot tell a merchant in advance which cards will update. See Stripe’s primary [card lifecycle documentation](https://docs.stripe.com/payments/cards/overview).

Important boundaries:

- ArraySubs does not operate a card-network updater.
- A provider update is not guaranteed for every issuer, card, country, or method.
- A provider can update a vaulted method without changing the local token string.
- Local brand, last four, and expiry caches must still be refreshed from authoritative evidence.
- Missing updater evidence does not prove the card will fail.
- A speculative pre-renewal charge is not an appropriate “card test.”

PayPal may update eligible wallet card details or let the payer change the funding choice for a particular automatic payment. That behavior belongs to PayPal, not to ArraySubs.

![A provider can refresh card details while preserving the same vaulted token reference.](/blogs/subscription-payment-tokens-and-card-updates-explained/provider-network-card-update.png)

## How do Stripe card updates work in current ArraySubs?

### Initial capture and renewal reference

ArraySubs Pro relies on the official WooCommerce Stripe Gateway for checkout. Its compatibility code requests reusable off-session setup for eligible subscription carts. After payment, it copies the Stripe Customer and PaymentMethod from the official Woo order into the ArraySubs subscription, along with safe descriptors.

At renewal, the Stripe delegate creates an off-session PaymentIntent and explicitly passes the subscription’s stored Customer and PaymentMethod IDs. This is why the subscription reference is decisive.

The [Stripe automatic billing and SCA recipe](/deals/arraysubs/use-cases/recipes/stripe-automatic-billing-sca/) explains the setup. The [Stripe recurring-payment test guide](/deals/arraysubs/resources/payments-and-compliance/stripe-recurring-payments-for-woocommerce-how-they-work-and-what-to-test/) provides the larger architecture.

### Provider-account and mode scope matter

![Annotated Stripe connection screen highlighting that vaulted payment references belong to one connected provider account and environment.](/blogs/subscription-payment-tokens-and-card-updates-explained/stripe-vault-account-connection.png)

A valid-looking Stripe `pm_...` can be absent in the currently connected account. Test/live mode, connected account, merchant entity, keys, and copied database context matter. Current ArraySubs Pro performs useful targeted cleanup when Stripe reports a locally saved PaymentMethod is missing, but cleanup is evidence of a stale reference—not migration.

### Current portal behavior

For an eligible subscription, current ArraySubs Pro creates a general Stripe Billing Portal session using the stored Stripe Customer and a return URL. Stripe’s [customer portal documentation](https://docs.stripe.com/customer-management) describes hosted method management and short-lived sessions.

Stripe also offers a dedicated [payment-method update deep-link flow](https://docs.stripe.com/customer-management/portal-deep-links) that sets the customer invoice default. The inspected ArraySubs code does not request that dedicated flow; it opens the general portal.

Even when the customer changes the Stripe Customer default successfully, current ArraySubs renewal code still passes the subscription’s stored PaymentMethod. It does not retrieve the customer invoice default after return and fan it out to one or more subscriptions.

Safe product claim:

> ArraySubs Pro can open Stripe’s hosted portal and listen for supported update events, but the exact subscription PaymentMethod must be verified after the portal interaction and before trusting the next renewal.

### Current SetupIntent overwrite risk

The code review found a material event-ordering issue:

1. one handler correctly reads the PaymentMethod from a successful SetupIntent payload and stores the `pm_...` value;
2. a later generic update handler prefers the event object’s own ID before its `payment_method` field; and
3. for a SetupIntent event, that object ID starts with `seti_...`, not `pm_...`.

Depending on listener order, the later handler can overwrite the valid subscription PaymentMethod with a SetupIntent ID. A future Stripe PaymentIntent cannot use a SetupIntent ID as its `payment_method`.

Production guardrail: before every controlled renewal after an update, confirm the stored method is a PaymentMethod reference, belongs to the active Stripe account/customer, and matches the customer’s intended selection.

### One-customer fallback can update only one subscription

When an update event lacks explicit subscription metadata, the current fallback looks up one subscription by Stripe Customer ID. It limits the result to one. A customer with multiple Stripe subscriptions can therefore have only one local record refreshed, without proving which cohort the customer intended to change.

The fix is not “update all” by assumption. The product must define whether the action affects one subscription or an explicit selected set, carry those identifiers through the provider/update flow, and verify each record.

### Current expiry-event boundary

ArraySubs includes a customer card-expiring email. However, the Stripe event currently relied upon for advance expiry is `customer.source.expiring`. Stripe’s [event reference](https://docs.stripe.com/api/events/types) says that event is for legacy Card/Source integrations and does not fire for PaymentMethod API integrations.

Current ArraySubs uses PaymentMethod IDs. No universal local scanner was found that periodically examines every subscription expiry. Do not promise proactive expiry notifications for all Stripe cards in the verified version.

## How do PayPal and Paddle payment updates differ?

Stripe’s “customer plus PaymentMethod” model should not be projected onto provider-owned subscriptions.

### PayPal: change the automatic-payment funding choice inside PayPal

PayPal’s remote Subscription/Agreement is the recurring authorization. The customer’s general preferred PayPal method does not necessarily control that automatic payment. PayPal tells users to select the specific merchant/automatic payment and change its funding method in PayPal; see [PayPal automatic-payment help](https://www.paypal.com/uk/cshelp/article/what-is-an-automatic-payment-and-how-do-i-update-or-cancel-one-help240).

The merchant continues to reference the PayPal subscription/agreement, not a local card token. PayPal may change the funding source behind that agreement without giving the Woo store a portable card identifier.

Current ArraySubs Pro stores the PayPal subscription ID as both the provider-specific subscription reference and the normalized “payment method” field. It advertises a payment-method update capability, but the inspected customer update mechanism returns a reauthorization message with an empty URL. The portal JavaScript needs a redirect URL; without one, it falls through to a generic error.

No current code path was found that:

- creates a replacement PayPal agreement;
- obtains customer approval;
- proves the new agreement active;
- swaps the local subscription to it;
- stops the old agreement safely; and
- watches the next renewal for duplication/gap.

Use this source-grounded wording:

> PayPal customers may manage eligible automatic-payment funding inside PayPal, but the inspected ArraySubs Pro update link does not yet complete a merchant-side replacement-agreement flow. Verify the deployed experience before promising self-service reauthorization.

For the wider plan/agreement limitations, read [PayPal recurring payments for WooCommerce](/deals/arraysubs/resources/payments-and-compliance/paypal-recurring-payments-for-woocommerce-agreements-renewals-and-limits/).

### Paddle: subscription-owned method and hosted portal

Paddle distinguishes customer-saved methods from a method retained for a particular subscription. Its [saved payment-method documentation](https://developer.paddle.com/build/checkout/saved-payment-methods/) explains that a subscription can retain a method for renewals even when the customer did not opt to save that method for new purchases.

Paddle can generate temporary customer-portal sessions and subscription-specific `update_subscription_payment_method` links when subscription IDs are supplied. The provider warns that these links are temporary and should be generated on demand, not cached; see the [customer portal session API](https://developer.paddle.com/api-reference/customer-portals/create-customer-portal-session/).

Current ArraySubs Pro creates a Paddle customer portal session without passing the subscription ID and returns the general portal overview. It does not use the available subscription-specific update deep link. Its subscription-updated handler synchronizes dates/status but does not prove that safe method descriptors were refreshed.

Current implementation wording:

> ArraySubs Pro can send an eligible Paddle customer to Paddle’s hosted portal. The verified release opens the portal overview rather than the subscription-specific update route, and local method descriptor synchronization after an update remains an acceptance test.

See the [Paddle Merchant-of-Record architecture guide](/deals/arraysubs/resources/payments-and-compliance/paddle-merchant-of-record-for-woocommerce-subscriptions/) for the larger product, tax, refund, and reconciliation context.

### Provider comparison

| Question | Stripe | PayPal | Paddle | Manual gateway |
| --- | --- | --- | --- | --- |
| Renewal reference | Customer + PaymentMethod stored on subscription | Remote PayPal subscription/agreement | Remote Paddle subscription | No reusable automatic reference required |
| Collector | ArraySubs initiates PaymentIntent | PayPal | Paddle | Customer pays renewal order |
| Current update destination | General Stripe portal | Reauthorization message, no usable URL found | General Paddle portal overview | Customer chooses method while paying |
| Provider/network update | Stripe may update eligible methods | PayPal may manage eligible wallet/card changes | Provider-managed hosted state | Gateway-specific |
| Current local sync confidence | Must test exact subscription; event-order/multi-subscription risks | Completed replacement flow not found | Descriptor sync after portal unproven | Applies to that invoice, not automatic-renew context |
| Portable | No | No | No | Requires new automatic authorization later |

The broader [Stripe, PayPal, and Paddle comparison](/deals/arraysubs/resources/payments-and-compliance/stripe-vs-paypal-vs-paddle-for-woocommerce-recurring-billing/) helps choose the schedule-owner model before update UX is designed.

## What does an expiry date actually prove?

Brand, last four, expiry month/year, and wallet type are safe recognition aids. They are not payment authorization.

Use evidence levels carefully:

> **Cached expiry looks old:** reason to inspect or invite an update.  
> **Provider decline says expired card:** evidence for that payment attempt.  
> **Provider/network update event:** evidence that the provider changed a stored object.  
> **No event and future-looking date:** not proof that the next renewal will succeed.

Cards can be replaced early, account numbers can change, issuer participation can vary, and a provider/network updater can change descriptors while keeping the same opaque method ID.

The ArraySubs customer-expiry email can render stored last four and expiry when an appropriate action fires. But PayPal/Paddle declare no local expiry-notice capability, current Stripe advance-expiry wiring is legacy-source-specific, and missing expiry metadata is treated as “not expired”—not “verified valid.”

Build policy around provider evidence and renewal outcome, not a local date alone.

## Can payment tokens move to another gateway or account?

Default answer: no.

A gateway token is scoped to the vault that issued it. Copying a WordPress database row copies a reference, not the credential, provider account, customer permission, or recurring mandate.

![A token from one provider cannot be copied into another; the customer must authorize a new provider relationship.](/blogs/subscription-payment-tokens-and-card-updates-explained/payment-token-portability.png)

### Cross-provider copying is not migration

- Stripe PaymentMethods cannot be sent to PayPal or Paddle.
- PayPal subscription IDs are not Stripe tokens.
- Paddle subscription IDs are not card credentials.
- Changing `_payment_method` or the displayed gateway title does not create new provider objects.
- Paying one manual renewal through a different gateway does not automatically move future recurring billing.

### Same-provider accounts are still separate

Even within Stripe, test/live and account boundaries matter. Stripe’s [Connect payment-method sharing guide](https://docs.stripe.com/connect/direct-charges-multiple-accounts) says cloned PaymentMethods are independent objects with different IDs and are not automatically synchronized. Sensitive cross-processor/account moves use Stripe’s supported [data migration process](https://docs.stripe.com/get-started/data-migrations/overview), not merchant database copying.

### Migration control framework

Before changing a subscription collector, identify:

1. **Vault owner:** who holds the credential?
2. **Account scope:** which mode, merchant/legal entity, connected account, and keys?
3. **Authorization:** does the existing agreement permit the new collector, or is new consent required?
4. **Object map:** old customer, method, mandate/agreement and their new equivalents.
5. **Collection owner:** exactly one system allowed to trigger the next renewal.
6. **Cutover:** cohort and effective billing timestamp.
7. **Duplicate prevention:** proof that the old scheduler/agreement cannot collect after cutover.
8. **Rollback:** retained mappings and remote evidence until the first new renewal reconciles.

This article explains why portability is limited; a dedicated gateway-migration procedure should own execution.

## Security, privacy, and PCI boundaries

### What WordPress may need locally

- opaque provider references needed for renewal or reconciliation;
- safe brand, last-four, expiry, method, and wallet descriptors;
- provider event ID/type and occurred/processed times;
- subscription/order association;
- update actor/source/time;
- test/live/account context; and
- sanitized provider error category/remediation state.

### What should never be collected in normal WordPress operations

- full PAN;
- CVC/CVV/CID;
- API keys, signing secrets, or client secrets;
- usable hosted portal/session links after use;
- raw tokens in broad public support channels; and
- unredacted payloads/screenshots with unnecessary personal data.

PCI SSC states that card verification codes cannot be stored after authorization, including for recurring/card-on-file use ([PCI FAQ 1280](https://www.pcisecuritystandards.org/faqs/1280/)). Its [tokenization guidance](https://www.pcisecuritystandards.org/documents/Tokenization_Guidelines_Info_Supplement.pdf) explains that tokenization can reduce exposure but does not eliminate applicable PCI DSS responsibilities.

An opaque token connected to a user, subscription, gateway, and events is generally linkable operational data, not anonymous data. The [GDPR consolidated text](https://eur-lex.europa.eu/eli/reg/2016/679/2016-05-04/eng) establishes purpose limitation, minimization, accuracy, retention, security, and data-protection-by-design principles. Apply the relevant rules and qualified advice for your jurisdictions.

## What should an auditable update record contain?

An operator should reconstruct the change without seeing raw credentials.

| Field | Example | Purpose |
| --- | --- | --- |
| Subscription | local ID | Scope of future-renewal change |
| Gateway/mode/account | Stripe test + account fingerprint | Prevent cross-environment confusion |
| Old method fingerprint | masked ID + brand/last4 | Before state |
| New method fingerprint | masked ID + brand/last4 | After state |
| Mechanism | portal, updater event, reauthorization, failed-order pay | Consent/propagation model |
| Provider evidence | masked event/request | Correlation |
| Times | occurred + processed UTC | Delay/order analysis |
| Actor/source | customer, admin, provider event | Authorization review |
| Affected subscriptions | explicit ID list | Prevent “update all” assumption |
| Verification | sandbox renewal or not tested | Separate intention from proof |

ArraySubs already writes payment logs, private subscription notes, gateway event records, and update source/time for some Stripe events. That is useful evidence, but the current implementation should not be described as a universal immutable audit trail or reliable multi-subscription fan-out.

![Annotated Stripe Gateway Health detail showing payment-method update capabilities alongside the disabled and not-configured staging state.](/blogs/subscription-payment-tokens-and-card-updates-explained/stripe-payment-method-health-verified.png)

The staging capture shows a deliberately disabled/unconfigured state. It proves the UI exposes connection, subscription-count, and event/webhook checks; it does not prove token validity or production readiness. The [Gateway Health monitoring recipe](/deals/arraysubs/use-cases/recipes/gateway-health-monitor/) explains the operational setup.

### Five signatures of stale or mis-scoped payment context

**1. The provider portal shows the new card, but renewal uses the old one.** This usually means the provider customer default changed while the subscription still carries an explicit older method. Compare the subscription-stored reference with the PaymentIntent request, not the portal’s default label alone.

**2. The token has the right prefix but the provider says it does not exist.** A `pm_...` string can belong to another Stripe account or mode, or to an account that was replaced after a database copy. Verify account/mode ownership before treating the local value as valid.

**3. One subscription updates and another subscription under the same customer does not.** A customer-scoped webhook without explicit subscription metadata can be ambiguous. List every subscription sharing the provider customer, define the intended affected set, and inspect each local reference separately.

**4. Descriptors change but the reference does not.** This can be correct after a network/provider automatic update. The provider may retain the same vaulted object while replacing brand, last four, or expiry. Refresh safe descriptors without inventing a new token, then prove the next renewal.

**5. A method update succeeds but the subscription stays on hold.** The update prepared a future payment method; it did not settle the pending renewal order. Check whether the old order still needs customer payment, issuer authentication, provider reconciliation, or a controlled retry.

Each symptom demands a different response. Deleting and recreating tokens by guesswork can lose correlation evidence or make a provider-owned agreement harder to stop. Preserve the before state, find provider truth, repair the exact subscription mapping, and record the verification result.

## Support decision tree: “I updated my card”

### 1. Where did the customer update it?

- WooCommerce account default;
- the ArraySubs subscription-specific update link;
- Stripe or Paddle hosted portal; or
- PayPal’s merchant-specific automatic-payment settings.

### 2. What provider object changed?

- descriptors on the same provider method;
- a new method became the provider customer default;
- a new remote agreement/subscription was created; or
- no provider evidence exists.

### 3. What local subscription references changed?

- intended subscription only;
- an explicit “update all” set;
- one arbitrary subscription found by shared customer ID; or
- none.

### 4. Is a renewal already unpaid?

If yes, verify whether the provider already collected money, then settle/reconcile that exact order. If no, run a controlled sandbox renewal against the intended reference.

Support should request only subscription/order IDs, gateway/mode, safe descriptors, update destination/time, sanitized error category, and gateway/event evidence. Never ask for a full card number, CVC, raw token, secret, or unredacted portal URL.

## What should a store test before trusting payment updates?

![A payment-method change is complete only after the exact subscription, a controlled renewal, and both records reconcile.](/blogs/subscription-payment-tokens-and-card-updates-explained/payment-method-update-proof.png)

### Cross-gateway minimum matrix

- New subscription stores the correct gateway, remote customer, method/agreement, and safe descriptors.
- The method is prepared/authorized for off-session use where required.
- A normal sandbox renewal charges once and reconciles one order.
- Updating one subscription changes only the intended subscription.
- An “update all” choice is tested separately if the UI claims it.
- Changing only WooCommerce’s default has the documented effect—or none—on subscription context.
- Changing only the provider customer default is compared with the exact ArraySubs reference.
- One provider customer owns multiple subscriptions with different methods.
- One method shared by multiple subscriptions receives an automatic descriptor update.
- On-hold/trial states can reach supported recovery; waiting-cancel/cancelled/expired cannot open unsafe updates.
- Paying a failed renewal changes future context only when explicitly designed.
- SCA/mandate confirmation is handled when required.
- Duplicate and out-of-order update events remain idempotent/current.
- Remote update succeeds while local webhook is delayed.
- Remote renewal succeeds while local processing fails; reconciliation avoids a second charge.
- Test/live account switch and site clone reject stale IDs and live collection safely.
- Removing a method used by a subscription requires a safe replacement or clear warning.
- Logs/emails/screenshots contain no raw secrets or credentials.

### Stripe assertions

- Subscription-stored value is a `pm_...` PaymentMethod, never a `seti_...` SetupIntent.
- Customer and method belong to the active Stripe account/mode.
- Portal update changes the exact intended subscription reference, not only customer default.
- Multiple subscriptions use an explicit affected-ID set.
- Automatic-update event refreshes every relevant safe descriptor.
- No reliance on legacy source-expiring events for PaymentMethod cards.
- The next off-session renewal may still require SCA and has a safe action path.

### PayPal assertions

- The customer can change the merchant-specific funding source inside PayPal where allowed.
- The actual ArraySubs customer route matches product copy.
- A replacement agreement, if needed, becomes active before the old one stops.
- No overlap/double collection and no billing gap.
- Remote retry/outstanding balance reconciles to local orders.

### Paddle assertions

- Portal session is generated just in time and never cached.
- If the UI promises direct update, the subscription-specific deep link is used.
- Active and past-due subscription behavior is tested.
- Local descriptors refresh from authoritative Paddle evidence.
- The Paddle-owned recurring Transaction maps to one local renewal.

The correct completion statement is not “the portal opened.” It is “the intended subscription used the intended provider context on one controlled renewal, and every local/remote record reconciled.”

## When ArraySubs is—and is not—the right fit

ArraySubs is useful when you want WooCommerce-native subscription records, subscription-specific gateway metadata, customer ownership/lifecycle checks, hosted update routes for supported Pro gateways, Stripe off-session renewal control, gateway health, payment logs, and a robust manual Pay fallback.

It is not a network account updater, card-data vault, universal token migration service, or guarantee that every provider portal propagates to every subscription. It may not be the right fit when:

- a required gateway/country/method lacks the needed automatic update contract;
- the business requires automatic multi-account token portability;
- the provider must own all recurring billing and update UX with no local context;
- the team cannot test webhooks, multi-subscription propagation, and reconciliation; or
- the verified PayPal/Paddle limitations conflict with a promised self-service flow.

Use the [ArraySubs payment-gateway capabilities](/deals/arraysubs/features/#payment-gateways) as a starting point, then validate the source-grounded constraints in this guide.

## Verification scope, limitations, and update log

This article separates inspected behavior from assumptions. The source-level review covered ArraySubs 1.8.11, ArraySubs Pro 1.1.2, WooCommerce’s token model, and the official gateway documentation cited beside the relevant claims. On July 22, 2026, we reverified three visible surfaces on the user-confirmed staging site: the subscription Billing Information card, the WooCommerce My Account payment-method screen, and the expanded Stripe Gateway Health card. The screenshots are privacy-cropped annotations of those actual surfaces.

The staging Stripe gateway was disabled and its webhook checks were not configured. The account-level saved-method screen contained no reusable methods, and the inspected subscription used Direct bank transfer. We therefore did **not** enter card data, create a live or sandbox provider token, open a hosted update session, exercise a network account updater, fire an authentic provider webhook, or run a card-backed renewal. These captures verify interface structure and visible capabilities only; they do not prove a functioning Stripe, PayPal, or Paddle update path.

**Update log:** Published May 7, 2026; editorially updated June 18, 2026; staging UI and image provenance reverified July 22, 2026. Recheck the implementation and provider documentation after relevant ArraySubs, WooCommerce, gateway-extension, or provider API changes.

## Frequently asked questions

### Does WooCommerce store the customer’s full card number?

A well-designed tokenized gateway keeps card data in its provider vault. WooCommerce stores an opaque gateway reference and safe descriptors such as brand, last four, and expiry. Never assume every custom gateway follows the same scope; review the exact extension and PCI responsibilities.

### Does changing the default card update every subscription?

No general guarantee exists. A WooCommerce default, provider customer default, and subscription-specific reference can differ. The integration must intentionally update one subscription or an explicit set and prove the next renewal uses it.

### Does a Stripe network update change the PaymentMethod ID?

Not necessarily. Stripe can update eligible card details behind a stored PaymentMethod, so the ID may stay the same while descriptors change. Participation and outcome vary.

### Can PayPal use the same update flow as Stripe?

No. PayPal’s remote subscription/automatic-payment funding model is provider-owned. Current ArraySubs Pro does not implement a complete Stripe-style replacement agreement flow for PayPal.

### Can I copy tokens when changing gateways?

No. Cross-provider IDs are not portable. Use a provider-supported data migration where available or obtain new customer authorization, map objects, stop the old collector, and prove the first new renewal.

### Does updating a method pay an already failed renewal?

Not by itself. The pending/failed order still needs payment or reconciliation. Access, retry state, next date, and lifecycle status must also be repaired.

### What proves an update worked?

The intended subscription references the intended provider method/agreement, a controlled next renewal uses it once, the provider transaction and Woo order reconcile, and lifecycle/access/next-date state is correct.

## The rule to remember

A token is useful because it points to an authorized provider object. It is safe only within its owner/account scope, and it is operationally complete only when the subscription that will renew points to the correct object.

Open the [member payment-method update recipe](/deals/arraysubs/use-cases/recipes/member-update-payment/) for the product workflow, use Gateway Health and a sandbox renewal for proof, and compare the current Pro options. If the supported gateway model fits your requirements, [View Pro Pricing](/deals/arraysubs/pricing/).

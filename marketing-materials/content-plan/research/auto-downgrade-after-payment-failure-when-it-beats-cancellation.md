# Research brief: Auto-Downgrade After Payment Failure — When It Beats Cancellation

## Research record

- **Article:** A038 — Auto-Downgrade After Payment Failure: When It Beats Cancellation
- **Research date / last verified:** 2026-07-16
- **Focus keyword:** `auto downgrade after failed subscription payment`
- **Search intent:** Operators need to decide when a fallback plan preserves a valuable customer relationship better than cancellation, without granting costly service indefinitely or misrepresenting automatic billing.
- **Evidence scope:** A038 brief; publishing standard; ArraySubs 1.8.11 and Pro 1.1.2 plan-switching, overdue, email, gateway, and member-access source; current official WooCommerce, Stripe, PayPal, and Paddle documentation.
- **Test limitation:** Current implementation and UI were inspected. No live gateway-backed subscription was advanced through overdue cancellation into a fallback plan. Treat screenshots as interface evidence, not executed-lifecycle proof.

## 40–60-word direct answer

> Auto-downgrade can beat cancellation when a subscription has a genuinely useful lower or free tier, the reduced entitlement is inexpensive to serve, and customers can later reauthorize payment without losing their work. It is usually a poor fit for shipped goods, costly human services, regulated access, or products whose “free” state creates ongoing fulfillment risk.

This is 54 words. Explain immediately that ArraySubs does not downgrade after the first decline by default.

## Answer-first editorial thesis

An auto-downgrade is a **fallback entitlement decision after the recovery policy reaches a configured lifecycle boundary**. It is not a retry technique and it should not be triggered by every transient decline.

Use three gates:

1. **Eligibility:** is this customer/product suitable for a fallback?
2. **Entitlement safety:** can service be reduced without data loss, security risk, or expensive fulfillment?
3. **Recovery path:** can the customer later attach/authorize payment and return to a paid plan clearly?

## Key takeaways

- Keep retry and grace recovery before fallback downgrade; many declines are temporary.
- Define exactly which features, limits, roles, data, support, and fulfillment change.
- Preserve data needed for reactivation, but do not promise indefinite retention without policy/legal review.
- A fallback subscription may require a new payment method/authorization before automatic billing resumes.
- Compare retained engagement and later reactivation with cost-to-serve, abuse, support load, and paid-plan cannibalization.

## Verified primary sources

All web sources accessed 2026-07-16.

| Claim | Primary source | Editorial use |
| --- | --- | --- |
| WooCommerce distinguishes subscription statuses and documents access implications for active/on-hold/cancelled states. | [WooCommerce: Subscription statuses](https://woocommerce.com/document/subscriptions/statuses/) | Explain that downgrade must deliberately map status and entitlement. |
| WooCommerce failed-payment retry rules can change order and subscription status before a final outcome. | [WooCommerce: Failed-payment retry](https://woocommerce.com/document/subscriptions/failed-payment-retry/) | Place downgrade after recovery attempts rather than after one decline. |
| WooCommerce switching guidance treats switching as a product/price/billing transition with payment and proration considerations. | [WooCommerce: Switching guide](https://woocommerce.com/document/subscriptions/switching-guide/) | Distinguish voluntary paid switching from failure fallback. |
| Stripe subscription states and payment events require customer/payment-method recovery and webhook reconciliation. | [Stripe: Subscription overview](https://docs.stripe.com/billing/subscriptions/overview), [Stripe: Subscription webhooks](https://docs.stripe.com/billing/subscriptions/webhooks) | Support local/remote agreement cancellation before detaching automatic context. |
| PayPal and Paddle can own provider-side recovery/suspension behavior. | [PayPal: Payment failure retry](https://developer.paypal.com/docs/multiparty/subscriptions/customize/payment-failure-retry/), [Paddle: Payment recovery](https://developer.paddle.com/concepts/retain/payment-recovery-dunning/) | Warn against downgrading locally while a remote agreement continues collecting. |

## Current ArraySubs product truth

### Tier and placement caveat

Public ArraySubs feature/pricing material markets **Auto-Downgrade as a Pro capability**. The current handler is physically present in core plan-switching source and loaded by the plan-switching provider. File placement is architecture, not an entitlement promise. The article and CTA should follow the public tier statement: Pro, last verified 2026-07-16.

### Configured trigger options

The current general strategy values are:

- `on_expire`
- `on_cancel`
- `on_trial_expire`

The fallback target is stored per subscription product/variation in `_arraysubs_auto_downgrade_product`.

For a failed-payment story, `on_cancel` is the relevant path. It is eligible for an overdue on-hold cancellation/end-of-period context; **immediate cancellation is explicitly excluded**. The actual sequence is approximately:

```text
renewal fails
 → retries + active grace
 → on-hold grace
 → overdue cancellation boundary
 → configured fallback downgrade
```

Do not write “ArraySubs downgrades a customer as soon as a payment fails.”

### Target validation

Current code requires the target to be:

- a published subscription product,
- in stock,
- different from the source product.

It can reuse an already-active fallback subscription for the same customer instead of creating a duplicate.

### Transition behavior found in source

The handler can:

- cancel a stale unpaid renewal order;
- cancel the remote gateway subscription/agreement context where supported;
- reuse an existing active fallback or change the subscription product to the fallback;
- apply the fallback with no refund and no new charge;
- clear ended/failure metadata;
- detach automatic gateway metadata;
- set the subscription active and schedule the fallback renewal;
- send an auto-downgrade email and write audit/history evidence.

### Critical automatic-billing caveat

Because automatic gateway context is detached/cancelled during the fallback transition, the resulting fallback behaves as manual renewal until a new compatible payment method/authorization is attached. Do not imply that future paid fallback renewals will automatically charge the previous failed token.

### What the current feature does not verify

- No built-in customer-value/cohort/tenure eligibility rule was found.
- No verified usage-quota migration or arbitrary SaaS feature-flag mapping was found; access depends on the store's product/role/access systems.
- No built-in abuse-scoring or downgrade experiment engine was found.
- No guarantee was found that every third-party fulfillment/integration reverses or reduces service correctly.

These are merchant policy/integration responsibilities.

## Fit decision matrix

| Business/model | Fit | Why | Required guardrail |
| --- | --- | --- | --- |
| Freemium SaaS or digital tool | Strong | Customer can keep identity/data with limited usage. | Exact limits, data retention, reauthorization path, no paid feature leakage. |
| Tiered content/community | Conditional | A free role can preserve relationship. | Test role/access removal, cached content, downloads, and group permissions. |
| Online course/library | Conditional | Preview/library tier can remain useful. | Define completed-course access and downloaded-file policy. |
| Physical subscription box | Usually weak | “Free plan” does not naturally map to inventory/shipping. | Stop fulfillment before downgrade; avoid creating zero-price shipments. |
| Coaching, agency, or human service | Usually weak | Cost-to-serve remains high. | Remove booking/support entitlement and notify assigned staff. |
| Regulated or safety-critical service | Weak | Ambiguous access changes create risk. | Legal/compliance review and explicit termination path. |

## Eligibility and abuse framework

These are recommended merchant rules, not claimed native automation:

- Exclude fraud, chargeback, policy-violation, and abusive accounts.
- Require a valid fallback mapping and a tested entitlement difference.
- Decide whether customers with unpaid usage, shipped goods, or human-delivered work are eligible.
- Define a cooldown before another trial or promotional upgrade.
- Rate-limit repeated paid→fallback→trial loops.
- Preserve audit history and original product context.
- Test existing-fallback reuse so one customer does not accumulate duplicate subscriptions.
- Ensure a remote gateway agreement is not left collecting after local downgrade.

## Worked example and economics

Use a fictional $39/month analytics plan with a $0 read-only tier:

```text
expected value of fallback
= later reactivation value
 + retained referral/engagement value
 − infrastructure/support cost
 − paid-plan cannibalization
 − abuse/fraud cost
```

Show a 60-day cohort:

- eligible failed subscriptions;
- fallback transitions completed;
- customers still engaged;
- customers who reauthorized and returned to paid;
- incremental service/support cost;
- accidental paid-entitlement leakage.

Do not invent a winning percentage. Explain the decision threshold and let the merchant insert real numbers.

## Restoration and rollback checklist

- Confirm the renewal is genuinely unresolved and not merely awaiting webhook reconciliation.
- Confirm retry/grace policy is exhausted.
- Verify the fallback target, price, billing period, role/access, limits, shipping, tax, and email copy.
- Cancel/detach remote automatic billing idempotently and document the provider result.
- Verify stale unpaid renewal order handling and no duplicate charge.
- Verify source paid entitlements are removed and fallback entitlements are granted.
- Verify customer data is retained/removed exactly as policy promises.
- Explain that automatic billing may require new authorization.
- Provide a tested upgrade/reactivation path.
- Roll back manually if target mapping, entitlement migration, gateway cancellation, or audit evidence fails.

## Screenshot opportunities on mirror-help.arrayhash.com

Use numbered markers, test data, redaction, and a version/date caption.

1. **Plan-switching settings:** `/wp-admin/admin.php?page=arraysubs-mainadmin#/settings/plan-switching`; mark auto-downgrade timing and related switching policy.
2. **Product fallback target:** edit a subscription product → Linked Products tab; mark the Auto-downgrade target field and selected subscription product.
3. **General grace settings:** `/wp-admin/admin.php?page=arraysubs-mainadmin#/settings/general`; mark the two grace periods that precede `on_cancel` downgrade.
4. **Subscription detail:** `/wp-admin/admin.php?page=arraysubs-mainadmin#/subscriptions/detail/{id}`; mark source/target product, status, gateway, next date, and history.
5. **Activity Audits:** `/wp-admin/admin.php?page=arraysubs-mainadmin#/audits/activity-audits`; mark downgrade event and lifecycle evidence.
6. **Members Access:** `/wp-admin/admin.php?page=arraysubs-mainadmin#/members-access`; show the fallback entitlement/role difference without exposing customer data.
7. **Woo email settings:** open the ArraySubs auto-downgrade email and mark subject/heading/additional content.

## Varied non-chart visual ideas

- **Before/after product scene:** paid dashboard rich with controls transforms into a calm read-only fallback while customer data remains.
- **Entitlement suitcase:** customer carries profile/data into the fallback, while premium tools stay behind a gate.
- **Three-gate concept:** eligibility, entitlement safety, and recovery path as illustrated security gates.
- **Fulfillment contrast:** digital fallback works on one side; a physical box moving down a conveyor makes no sense on the other.
- **Gateway detachment concept:** Stripe/PayPal/Paddle agreement cord safely disconnects before fallback activation.
- **Customer journey storyboard:** failure → grace → fallback → later reauthorization → paid return, using people and interface scenes rather than metrics.

## Recommended long-form outline

1. Direct answer and definition.
2. Why downgrade is a final lifecycle policy, not a first-decline action.
3. Best-fit and poor-fit business models.
4. Entitlement, data, fulfillment, and communication design.
5. Current ArraySubs Pro trigger/target/transition behavior and caveats.
6. Eligibility and abuse controls.
7. Gateway detachment and manual-renewal caveat.
8. Worked economics, success metrics, and rollback.
9. Screenshot-backed observations, limitations, and CTA.

## Internal links

- `/deals/arraysubs/features/#subscription-operations`
- `/deals/arraysubs/use-cases/recipes/auto-downgrade-on-failed-payment/` for setup.
- Lenient/strict grace recipes for the preceding recovery window.
- A037 email playbook for downgrade messaging.
- A039 recovery checklist and A040 failure-code triage.
- A026 cancellation timing and A078 downgrade-vs-cancel when published.

## Claims to avoid

- “Auto-downgrade happens after one failed payment.”
- “The previous card will automatically bill the fallback plan.”
- “ArraySubs provides native customer-value eligibility or abuse scoring.”
- “Auto-downgrade is safe for every subscription product.”
- “Core file placement proves the feature is free.”
- Any invented retention, reactivation, or saved-MRR result.

## Refresh triggers

- Public tier/pricing or source-loading changes.
- Trigger strategy, fallback validation, remote gateway cancellation, or retry/grace changes.
- New entitlement, usage-limit, abuse-control, reauthorization, or analytics capability.
- Quarterly gateway and WooCommerce lifecycle review.

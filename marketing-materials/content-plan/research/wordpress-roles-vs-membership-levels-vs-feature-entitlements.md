# Research: WordPress Roles vs Membership Levels vs Feature Entitlements

## Research record

- Brief: `articles/051-wordpress-roles-vs-membership-levels-vs-feature-entitlements.md`
- Researched: 2026-07-16
- Intent: architecture/decision guidance
- Primary query: `WordPress roles vs membership levels`
- Product scope inspected: ArraySubs core `1.8.11` role mapping and access evaluator; ArraySubs Pro `1.1.2` feature entitlements
- Evidence: current core/Pro source, read-only live UI inspection, official WordPress/NIST/OWASP sources
- Caveat: source describes the current development workspace. Feature entitlements require the corresponding Pro feature and should not be presented as part of core.

## Direct answer for the opening

> WordPress roles answer “what can this account do across WordPress,” membership levels answer “what plan and lifecycle does this customer currently have,” and feature entitlements answer “which specific capability or limit is available.” Use subscriptions as the commercial source of truth, map roles only for interoperability, and evaluate fine-grained product access through explicit entitlements.

## Key takeaways

1. A role is a durable bundle of WordPress capabilities; it is not a billing status or membership ledger.
2. A membership level should derive from subscription product/variation plus current lifecycle state, rather than relying only on a copied role.
3. Entitlements are granular flags, values, or limits such as “analytics enabled” or “10 seats.”
4. ArraySubs can map active subscription conditions to WordPress roles and remove or keep them on lifecycle changes according to the rule.
5. ArraySubs Pro feature definitions support toggle, number, and text values with aggregation behavior for feature-based access conditions.

## Definitions grounded in standards and product behavior

### WordPress role

A role is a named collection of capabilities assigned to a WordPress user. WordPress authorization checks should use capabilities, not assumptions based on the display name of a role. Roles are useful when another plugin already understands `subscriber`, `customer`, or a custom role.

Examples: content editor, support agent, shop manager, member community role.

Security warning: never grant `administrator` or `shop_manager` as a customer membership benefit. They include powerful back-office capabilities. Use a custom least-privilege role when interoperability requires one.

### Membership level

A membership level is a commercial/access state such as Standard Monthly, Pro Annual, or Course Cohort. Its source of truth should include:

- subscription product or variation;
- current state such as active/trial versus on-hold/cancelled/expired;
- start/end/renewal dates where relevant;
- plan switches and overlapping subscriptions.

It is a business concept, not natively a WordPress authorization primitive.

### Feature entitlement

An entitlement is a specific permission or value granted by a qualifying product, subscription, or purchase. Examples:

- premium reports: on/off;
- team seats: numeric limit;
- support tier: text label;
- export access: on/off.

Entitlements make product packaging explicit and reduce the combinatorial role names that appear when every plan-feature combination becomes a role.

## Verified ArraySubs role mapping

The current Role Manager listens to subscription lifecycle and plan-switch activity, then synchronizes qualifying roles.

Observed behavior:

- active/trial subscriptions can grant roles through rule conditions;
- on-hold and pending behavior is configurable per mapping as keep or remove;
- cancelled/expired transitions remove roles granted by the mapping when appropriate;
- another active subscription that grants the same role prevents accidental removal;
- a fallback role can be added if the user would otherwise have no role;
- a rule can add and remove configured roles;
- plan switches trigger resynchronization.

Evidence:

- `arraysubs/src/Features/MembersAccess/Services/RoleManager.php`
- `arraysubs/src/Features/MembersAccess/Services/ConditionEvaluator.php`
- `arraysubs/src/Features/MembersAccess/resources/components/RoleMappingRulesTab.jsx`

Lifecycle warning: manual role changes and roles granted by other plugins can create ownership ambiguity. The article should recommend documenting which system owns each role and testing overlapping subscriptions before automating removal.

## Verified ArraySubs Pro feature entitlements

ArraySubs Pro’s inspected feature-management code stores enabled product/variation feature values in `_arraysubs_features`. Feature definitions support:

- toggle values;
- numeric values;
- text values;
- aggregation methods represented by `sum`, `max`, or `any` in the access evaluator.

The core condition evaluator can collect enabled feature values from active/trial subscriptions and purchased product IDs, then compare the aggregated result in a Pro feature-value condition. A variation can provide a plan-specific feature value.

Evidence:

- `arraysubspro/src/Features/FeatureManager/`
- Pro feature REST/controller and product integration source in that feature
- `arraysubs/src/Features/MembersAccess/Services/ConditionEvaluator.php`
- Member Access React condition builder components

Avoid saying all features are inherently subscription-only: the current evaluator also considers purchased product IDs. Explain the commercial model configured for each feature.

## Decision table

| Question | WordPress role | Membership level | Feature entitlement |
|---|---|---|---|
| Primary purpose | Site-wide capability/interoperability | Commercial plan and lifecycle | Fine-grained product capability/value |
| Source of truth | WordPress user-role assignment | Subscription/purchase record and status | Product/variation feature definition + qualifying ownership |
| Typical duration | Persistent until changed | Tied to billing/access lifecycle | Recomputed from qualifying products/state |
| Best example | Community forum can recognize `pro_member` | Pro Annual is active until period end | 25 exports/month or premium reports enabled |
| Main risk | Privilege escalation or stale role | Billing/access drift | Conflicting aggregation and unclear limits |
| Best authorization use | Capability check where WordPress/plugin expects it | Plan-level gating and lifecycle decisions | Specific feature/limit checks |

## Architecture recommendation

Use a three-layer model:

`subscription/purchase records → resolved membership level and entitlements → optional least-privilege WordPress role adapters`

This direction prevents a role from becoming the only proof of paid status. Roles become a compatibility output, not the billing source of truth.

### Example: Pro community and analytics

- Source: an active Pro subscription product.
- Membership level: Pro.
- Entitlements: analytics `true`, seats `10`, support tier `priority`.
- Role adapter: grant `pro_member` only because the forum plugin recognizes it.
- Never grant `shop_manager` to expose reports.

### Example: two overlapping subscriptions

If Course A and Course B both grant `student`, cancelling Course A must not remove the role while Course B remains active. The current ArraySubs role manager checks for another active qualifying subscription before removal. This is an important real-world example for the article.

## Recommended article outline

1. Direct answer and three definitions
2. Why billing status should not live only in a WordPress role
3. WordPress roles and capabilities
4. Membership levels and subscription lifecycle
5. Feature entitlements and aggregation
6. ArraySubs role mapping lifecycle behavior
7. Core versus Pro responsibility
8. Architecture patterns with concrete examples
9. Migration from “one role per plan”
10. Security and governance checklist
11. Not-fit cases and limitations
12. FAQ

## Migration checklist: one role per plan to layered access

1. Inventory all roles, capabilities, who grants them, and which plugins consume them.
2. Map each role use to either administration, third-party interoperability, membership level, or feature entitlement.
3. Move billing truth to subscription product/variation plus lifecycle state.
4. Define explicit feature keys and value types; document whether multiple products use sum, max, or any.
5. Keep only necessary custom member roles, with minimal capabilities.
6. Configure role mapping and on-hold/pending behavior.
7. Test active, trial, pending, on-hold, cancelled, expired, plan-switch, manual-role, and overlapping-subscription cases.
8. Reconcile stale roles before enabling automated removals.
9. Add an audit report/operational runbook for role drift.

## Security and governance checklist

- [ ] Access checks use capabilities or current membership/entitlement evaluation, not a role label alone.
- [ ] Customer plans never grant Administrator or Shop Manager.
- [ ] Every custom role has a documented owner and minimal capabilities.
- [ ] On-hold and pending behavior is an explicit business decision.
- [ ] Plan switch and cancel-at-period-end semantics are tested.
- [ ] Overlapping subscriptions that grant the same role are tested.
- [ ] Manual and third-party role assignment is not silently removed.
- [ ] Feature key, type, aggregation, default, and source products are documented.
- [ ] A disabled/missing feature fails safely.
- [ ] Support staff can diagnose source subscription versus derived role/entitlement.

## Official sources and claim map

- [WordPress Roles and Capabilities](https://developer.wordpress.org/apis/security/user-roles-and-capabilities/) — canonical definition and capability checks.
- [WordPress Plugin Handbook: Roles and Capabilities](https://developer.wordpress.org/plugins/users/roles-and-capabilities/) — plugin implementation context and least-privilege design.
- [NIST Role Based Access Control](https://csrc.nist.gov/Projects/Role-Based-Access-Control) — role-based authorization model; use for conceptual grounding, not to claim ArraySubs certification.
- [NIST SP 800-162: Attribute Based Access Control](https://csrc.nist.gov/pubs/sp/800/162/upd2/final) — access decisions based on subject, object, action, and environment attributes.
- [NIST ABAC project](https://csrc.nist.gov/projects/attribute-based-access-control) — supporting ABAC overview.
- [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html) — least privilege, deny by default, permission validation on every request, and authorization tests.

## Internal-link plan

Verify routes before publishing:

- Pillar: `/guides/woocommerce-memberships/`
- Feature: `/features/members-access/`
- Pro feature page: the actual Feature Manager/entitlements route if published
- Recipe: `/recipes/role-mapping/` or closest implemented role recipe
- Sibling A047: membership-site architecture
- Sibling A048: members-only products and catalogs
- Sibling A052: URL-based restrictions
- Sibling A054: AND/OR access rules

## Mirror screenshot opportunities

Primary route: `https://mirror-help.arrayhash.com/wp-admin/admin.php?page=arraysubs-mainadmin#/members-access`

The mirror currently shows a saved role-mapping example named **Pro Plan grants Pro Member role**. It references active subscription product ID 233, assigns Pro Member, keeps the role on hold, and uses Subscriber as fallback.

Capture plan:

1. Capture the rule card/editor without editing.
2. Annotate the active-subscription condition, granted role, on-hold behavior, and fallback role.
3. Crop any unrelated administrative detail.
4. If a Product Feature Manager screen has safe non-sensitive demo values, capture a second screenshot showing a toggle or number feature and mark its type/value. Otherwise use a code-grounded conceptual visual; do not create live data for illustration.

Suggested caption: “Role mapping is a lifecycle adapter: subscription eligibility grants a least-privilege WordPress role and defines what happens when billing state changes.”

## Varied visual concepts

1. **Real app screenshot:** annotated Pro Plan role mapping rule.
2. **Three-drawer concept:** account permissions, commercial plan, and feature entitlements in separate labeled drawers.
3. **Scene illustration:** a venue ticket proves plan access, a staff badge represents role, and wristband icons represent individual entitlements.
4. **Layered architecture shapes:** subscriptions at source, entitlements in the middle, role adapters at the edge.
5. **Product-card example:** Standard and Pro plans with feature chips; only the forum connector outputs a role.
6. **Lifecycle strip:** trial → active → on-hold → cancelled, showing plan/access state and optional role behavior without turning it into a numeric chart.

## Limitations and update triggers

- Roles remain useful for cross-plugin integration; the article should not frame them as obsolete.
- Feature entitlements are Pro behavior and must be labeled clearly.
- A numeric entitlement is not automatically usage metering; distinguish an entitlement value from consumption tracking.
- Name a product-architecture author and WordPress security reviewer, with publication and reviewed dates.
- Recheck when ArraySubs lifecycle states, Role Manager behavior, or Pro feature aggregation changes.


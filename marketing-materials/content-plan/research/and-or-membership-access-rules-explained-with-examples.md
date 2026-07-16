# Research: AND/OR Membership Access Rules Explained with Examples

## Research record

- Brief: `articles/054-and-or-membership-access-rules-explained-with-examples.md`
- Researched: 2026-07-16
- Intent: practical logic education and configuration reference
- Primary query: `membership access rules AND OR examples`
- Product scope inspected: ArraySubs core Member Access condition evaluator/UI `1.8.11`; ArraySubs Pro `1.1.2` for feature-value conditions
- Evidence: current PHP/React source, read-only mirror inspection, official NIST/OWASP/PHP/WordPress sources
- Caveat: the current UI supports a top-level operator plus one nested group level. The backend evaluator/sanitizer is recursive, but do not describe the visual builder as offering unlimited nesting.

## Direct answer for the opening

> In membership access rules, AND means every condition must pass, while OR means any condition can pass. Parentheses define which conditions are evaluated together: `A AND (B OR C)` requires A plus either B or C. ArraySubs supports a top-level ALL/ANY choice and one nested group level, which covers most practical access policies.

## Key takeaways

1. Write the access policy as a plain-language sentence before opening the rule builder.
2. AND narrows access; OR broadens it. Parentheses change the result and must be explicit.
3. ArraySubs short-circuits evaluation: AND stops on the first false condition; OR stops on the first true condition.
4. Multiple selected IDs within one condition usually mean “any selected item,” such as any listed role or subscription product.
5. An empty condition set evaluates as allowed in the current code; prepublish QA must catch accidental open rules.

## Verified condition-evaluator behavior

`ConditionEvaluator::evaluate()` recursively evaluates condition rows and group nodes.

- **AND:** every child must be true; it returns false on the first failure.
- **OR:** at least one child must be true; it returns true on the first success.
- **Unknown condition type:** false.
- **Empty rule/condition list:** true, meaning no conditions grant access.
- **Groups:** evaluate their child rules using the group’s own operator.
- **Schedule:** evaluated separately by the subsystem after/beside the condition expression; it is not another Boolean condition chip in the builder.

Evidence:

- `arraysubs/src/Features/MembersAccess/Services/ConditionEvaluator.php`
- Member Access REST rule sanitizer/defaults
- `arraysubs/src/Features/MembersAccess/resources/components/ConditionBuilder.jsx`
- `arraysubs/src/Features/MembersAccess/resources/components/ConditionGroup.jsx`
- `arraysubs/src/Features/MembersAccess/resources/components/ConditionRow.jsx`
- `arraysubs/src/Features/MembersAccess/resources/components/RestrictionRuleBuilder.jsx`

## Current visual-builder depth

The shared React builder offers:

- top-level **ALL** (AND) or **ANY** (OR);
- individual conditions;
- an added condition group with its own ALL/ANY operator;
- no further “Add Group” inside that nested group, because the `isNested` state prevents deeper UI nesting.

Thus the UI can express patterns such as:

- `A AND B`
- `A OR B OR C`
- `A AND (B OR C)`
- `A OR (B AND C)`

Do not promise arbitrary expressions like `A AND (B OR (C AND D))` through the current UI, even though backend data handling is recursive.

## Conditions available in the inspected shared builder

- lifetime spend comparison;
- purchased product;
- purchased variation;
- purchased from a taxonomy/category/tag;
- active subscription, optionally to selected products;
- subscription variation;
- feature-value condition when ArraySubs Pro Feature Manager is available;
- WordPress user role.

The evaluator also contains a `subscription_status` condition used by code/shortcode paths, but it is not in the current default shared visual-builder list. Keep the UI article grounded in what editors can actually select.

### Multi-select semantics inside one row

An important detail: a single condition with several selected items usually evaluates as an internal ANY.

- Has purchased Product A, B, or C → true after any selected purchase.
- Has active subscription to Product A or B → true after either selected product.
- User role Customer or Pro Member → true when roles intersect.

If the policy requires ownership of Product A **and** Product B, use two separate purchased-product conditions under top-level AND.

## Plain-language translation method

Use a three-step method in the article:

1. **Identify subjects and facts.** Example: active Academy subscriber; completed prerequisite purchase; Pro role.
2. **Write the sentence.** “Allow users who have an active Academy subscription and either purchased Course A or have the Instructor role.”
3. **Add parentheses.** `Active Academy AND (Purchased Course A OR Role Instructor)`.

Only then reproduce it in the builder.

## Truth tables

### Basic operators

| A | B | A AND B | A OR B |
|---|---|---|---|
| False | False | False | False |
| False | True | False | True |
| True | False | False | True |
| True | True | True | True |

### `A AND (B OR C)` example

Let:

- A = active Pro subscription;
- B = purchased Advanced Course;
- C = user has Instructor role.

| A | B | C | Result | Explanation |
|---|---|---|---|---|
| No | No | No | Deny | Required subscription missing |
| No | Yes | Yes | Deny | B/C cannot replace required A |
| Yes | No | No | Deny | Neither optional pathway passes |
| Yes | Yes | No | Allow | A and B pass |
| Yes | No | Yes | Allow | A and C pass |
| Yes | Yes | Yes | Allow | A and at least one grouped condition pass |

## Worked policies

### One of several plans may enter

Sentence: “Allow active Standard or Pro subscribers.”

Preferred implementation: one active-subscription condition selecting Standard and Pro, or two conditions under OR if the UI/analytics needs separate branches.

### Both base access and prerequisite required

Sentence: “Allow an active Academy subscriber who has purchased the prerequisite.”

Expression: `Active Academy AND Purchased Prerequisite`.

### Paid plan or staff override

Sentence: “Allow an active Pro subscriber or a support-team role.”

Expression: `Active Pro OR Role Support`.

Security caveat: the override role must be least privilege and controlled. Never use broad customer-editable attributes.

### Base plan plus either achievement or role

Sentence: “Allow active Pro members who purchased Certification or have the Instructor role.”

Expression: `Active Pro AND (Purchased Certification OR Role Instructor)`.

### Feature value plus subscription

Sentence: “Allow active Agency subscribers whose aggregated seat entitlement is at least 10.”

Expression: `Active Agency AND Feature seats >= 10`.

Label this as ArraySubs Pro feature behavior and clarify aggregation configuration.

## Precedence across multiple rules is subsystem-specific

Avoid the tempting but false statement that all Member Access rule lists use identical first-match logic:

- URL rules: first matching non-excluded pattern decides access.
- Shop rules: first rule matching the product scope decides.
- Discount/pricing systems can select/combine discounts according to their own logic.
- Content-type restrictions can evaluate multiple applicable rules differently; a deny from an applicable rule can still restrict the item.

The article’s Boolean examples should focus on conditions **inside one rule**, then explicitly link to the subsystem’s own precedence documentation.

## Recommended article outline

1. Direct answer: AND, OR, and parentheses
2. Boolean logic without jargon
3. How the ArraySubs condition builder maps ALL/ANY
4. One-level group capability and limitation
5. Multi-select ANY semantics inside one condition
6. Five worked membership policies
7. Truth tables for ambiguous policies
8. Schedules versus conditions
9. Empty rules, unknown conditions, and safe defaults
10. Multiple-rule precedence differs by subsystem
11. Testing and governance checklist
12. FAQ with short logic translations

## Original policy worksheet

Include this reusable template:

```text
Resource:
Who should always qualify?
Which facts are mandatory?
Which facts are alternatives?
Are any staff/admin overrides required?
What lifecycle states count as active?
What should happen when access fails?
Plain-language sentence:
Boolean expression with parentheses:
Expected test personas:
```

## Original test checklist

- [ ] Policy is approved in plain language before configuration.
- [ ] Each “and” and “or” is represented by the intended group/operator.
- [ ] Multi-selected IDs are not mistaken for AND semantics.
- [ ] No empty condition list unintentionally leaves access open.
- [ ] Unknown/deleted products, roles, feature keys, and variations fail safely.
- [ ] Active, trial, pending, on-hold, cancelled, expired, and switched plans are tested as applicable.
- [ ] Overlapping subscriptions and purchases are tested.
- [ ] Staff override uses a least-privilege role.
- [ ] Schedule boundaries are tested separately.
- [ ] Guest, nonqualifying user, each individual qualifying branch, all branches, and admin are covered.
- [ ] Overlapping rule precedence is tested in the actual subsystem.
- [ ] Cache is invalidated/varied after access changes.

## Official sources and claim map

- [NIST SP 800-162: Attribute Based Access Control](https://csrc.nist.gov/pubs/sp/800/162/upd2/final) — formal grounding for evaluating subject/object/action/environment attributes; do not imply product certification.
- [NIST Attribute Based Access Control](https://csrc.nist.gov/projects/attribute-based-access-control) — concise ABAC context.
- [NIST Role Based Access Control](https://csrc.nist.gov/Projects/Role-Based-Access-Control) — role-based model context for role conditions.
- [WordPress Roles and Capabilities](https://developer.wordpress.org/apis/security/user-roles-and-capabilities/) — source for WordPress role/capability meaning.
- [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html) — deny by default, validate on every request, least privilege, and test cases.
- [PHP operator precedence](https://www.php.net/manual/en/language.operators.precedence.php) — use solely to show why explicit parentheses are safer than relying on remembered precedence. ArraySubs evaluates structured groups rather than a user-entered PHP expression.

## Internal-link plan

Verify exact destinations:

- Feature: `/features/members-access/`
- Recipe: `/recipes/combined-conditions/`
- Recipe: `/recipes/url-prefix-lockdown/`
- Sibling A048: members-only products and catalogs
- Sibling A051: roles vs levels vs entitlements
- Sibling A052: URL patterns and precedence
- Sibling A053: partial content restriction

## Mirror screenshot opportunities

Useful route: `https://mirror-help.arrayhash.com/wp-admin/admin.php?page=arraysubs-mainadmin#/members-access/url-rules`

Capture plan without saving:

1. Open an existing safe URL rule or click **Add New Rule**.
2. Add a temporary/unsaved condition and **Add Group** only in local UI state.
3. Put two conditions in the group so the ALL/ANY distinction is visible.
4. Capture before navigating away; do not click Save.
5. Annotate top-level ALL/ANY, group boundary, nested ALL/ANY, condition rows, and denied action.

Alternative route: the Role Mapping rule **Pro Plan grants Pro Member role** can show a real active-subscription condition plus lifecycle outcome. Keep it as a distinct role-mapping screenshot, not proof of a saved nested group.

## Varied visual concepts

1. **Real app screenshot:** unsaved builder with top-level operator and one nested group, precisely marked.
2. **Checkpoint scene:** a traveler needs a valid ticket AND either a passport OR staff credential.
3. **Logic chips:** solid “required” chip plus a bracket holding two alternative chips.
4. **Door/key concept:** two keys in a required keyring versus two interchangeable keys.
5. **Truth-table tiles:** simple illustrated people/resources instead of a sterile spreadsheet.
6. **Policy-to-builder strip:** plain English sentence → parenthesized expression → UI grouping.

## Limitations, review, and update triggers

- The current visual builder is one nested group deep.
- Empty conditions are open, not deny-by-default, in the current evaluator; communicate this plainly.
- Feature-value conditions require Pro and feature configuration.
- Name a technical reviewer familiar with access-control logic and the specific Member Access subsystem.
- Include published/reviewed dates and update after evaluator, condition types, nesting, or subsystem precedence changes.
- Do not claim formal ABAC/RBAC compliance or certification.


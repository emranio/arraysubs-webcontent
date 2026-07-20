# Research: Preventing Shared Membership Accounts Without Punishing Families

## Research record

- Brief: `web-content/marketing-materials/content-plan/articles/055-preventing-shared-membership-accounts-without-punishing-families.md`
- Content ID: A055
- Researched and last verified: 2026-07-20
- Primary query: `prevent shared membership accounts`
- Secondary queries: `limit concurrent logins WordPress membership`, `membership account sharing policy`, `multi login prevention best practices`
- Intent: informational strategy guide at the consideration stage
- Product scope inspected: current local ArraySubs core and ArraySubs Pro source, current product metadata, recipes, current source UI, and existing QA records
- External evidence standard: official WordPress documentation/source, current standards and regulator guidance, official vendor policies, official WooCommerce documentation, and official search-platform guidance
- Recommended article length: 3,500-5,000 words. The brief estimates 2,200-3,000 words, but the user's requested long-form standard and the necessary policy, fairness, privacy, accessibility, implementation, and measurement sections justify a longer article.
- Critical product boundary: ArraySubs Pro Multi-Login Prevention limits concurrent WordPress sessions. It is not device fingerprinting, household/location verification, behavioral fraud scoring, a family-account system, a team-seat system, or DRM.
- Validation caveat: the latest QA progress record says the three-browser Multi-Login Prevention flow was **not executed end to end** in that run. A 2026-07-20 mirror check also found that the current `#/members-access/login-limit` URL falls back to Role Mapping and does not expose a Login Limit tab. Treat this as a test-environment/deployed-build limitation, not evidence that the source capability is absent.

## Direct answer for the opening

Use this 58-word answer inside the first 150 words:

> To prevent shared membership accounts without blocking legitimate households, limit concurrent sessions rather than every device ever used, set allowances by plan, publish the rule before purchase, and provide a fast recovery path. Give families and teams separate-account plans when identity, privacy, progress, or billing belongs to individuals, and review repeated patterns before penalizing anyone.

## Key takeaways

1. A concurrent-session cap deters casual simultaneous sharing with fewer privacy implications than persistent device or location tracking, but it does not prove who is using an account.
2. “One person” and “one session” are not the same promise. A legitimate member may use a phone, laptop, assistive device, shared family authenticator, or caregiver-assisted workflow.
3. Family and team access should usually mean one payer plus separate named accounts or seats, not one shared password with a larger cap.
4. ArraySubs Pro can apply a global per-user session cap, conditional limits, most-permissive matching, oldest-session eviction, optional administrator inclusion, and Login as User exclusions. It does not create family members, seats, device identities, appeals, or risk scores.
5. Enforcement should progress from clear terms and a proportionate limit to explanation, recovery, human review, and appeal. Do not suspend an account solely because an IP address, device count, or travel pattern looks unusual.

## Search landscape and differentiating opportunity

### Current SERP pattern observed on 2026-07-20

The result set for the target queries is dominated by narrow setup pages and blunt feature explanations:

- WooCommerce Memberships' FAQ explains that memberships are tied to user accounts and that the plugin does not itself manage logins or prevent multi-device use.
- WordPress.org plugin pages and membership-vendor help pages explain how to set a numeric concurrent-login cap, frequently with “block new login” or “log out the oldest session” behavior.
- Several results equate “device,” “IP address,” and “session,” even though they are not interchangeable.
- Most pages stop after configuration. They do not resolve family plans, team seats, disability/accessibility needs, caregiver access, travel, privacy, appeals, or false-positive measurement.

### Editorial gap A055 should own

A055 should answer the broader decision question: **how should a membership operator deter credential sharing without treating every multi-device or household use case as fraud?** It should provide:

- a precise session/device/location/risk-model comparison;
- a threat-versus-legitimate-use table;
- a family/team/accessibility fairness framework;
- a proportionate enforcement and redress ladder;
- a policy template and measurement scorecard;
- current, bounded ArraySubs behavior;
- links to the narrow ArraySubs recipes instead of duplicating their setup steps.

This angle is more extractable and defensible for search and answer engines than another “set the limit to one” tutorial.

## Definitions the article must establish

| Term | Operational meaning | What it does not prove |
| --- | --- | --- |
| Account | A WordPress user identity to which membership or subscription access is attached | That only one natural person knows the credentials |
| Session | A continuing authenticated state, usually represented by a browser cookie/session secret | A unique physical device or a unique person |
| Concurrent session | Two or more still-valid sessions for the same account at the same time | That those sessions are actively consuming content simultaneously |
| Device | A phone, tablet, computer, TV, kiosk, or other endpoint | A stable identity; browsers, profiles, private windows, cookie resets, and shared machines complicate counting |
| Location | A network or geographic inference, often based partly on IP address | A household, legal residence, family relationship, or intent |
| Risk signal | An observation that may justify a challenge or review | Proof of abuse by itself |
| Family plan | One commercial relationship that grants access to eligible family members | Permission to share one password unless the policy explicitly says so |
| Team plan | A billed group with defined seats, owners/managers, and named member accounts | An unlimited shared staff credential |

WordPress core stores session data that can include expiration, IP address, user agent, and login timestamp. ArraySubs' inspected enforcement code uses session validity/count and login time for eviction; it does **not** use the stored IP or user-agent fields to fingerprint devices or infer location.

## Threat and legitimate-use distinction

### Behaviors worth separating

| Observed pattern | Plausible legitimate explanation | Plausible abuse/security explanation | Proportionate first response |
| --- | --- | --- | --- |
| Laptop and phone both signed in | Normal personal use | Password shared with one other person | Allow within a published baseline; do not accuse |
| New browser after clearing cookies | Browser maintenance, privacy settings, incognito use | Attempt to create another active session | Count sessions consistently; explain which session is displaced |
| Rapid login from a new network | Travel, mobile network handoff, VPN, accessibility service | Stolen credentials or commercial sharing | Reauthenticate or notify where supported; avoid automatic fraud conclusion |
| Several simultaneous sessions over time | Household use, caregiver assistance, many work devices | One paid account serving several people | Offer a family/team route; review repeated evidence before sanctions |
| One account used sequentially by many people | Family or staff rotation | Deliberate sharing that evades a concurrency cap | A concurrency cap alone cannot detect this; solve through product/policy/account design |
| Shared phone receives authentication codes | Family phone or accessibility support | Multiple people controlling one account | Do not block the authenticator merely because several subscribers use the device; NIST explicitly recognizes shared family phones |
| Old session remains open on an unused machine | User forgot to log out | Session theft or unapproved access | Provide logout/session recovery; do not make support punitive |
| Different people need separate progress/history | Family course, media, or library membership | Shared credentials collapsing identity | Create separate member accounts or seats, not a bigger shared-login allowance |

### The four control models

| Model | What it measures | Advantages | Fairness/privacy risks | ArraySubs support |
| --- | --- | --- | --- | --- |
| Concurrent sessions | Number of active authenticated sessions | Simple, explainable, low additional data, directly enforceable in WordPress | Can displace legitimate old sessions; cannot distinguish people or detect sequential sharing | **Yes, Pro** |
| Registered devices | Persistent device identifiers | Can let customers name/remove devices | Cookie resets, browser profiles, shared machines, assistive technology, replacement devices, fingerprinting/privacy concerns | **No verified support** |
| Location/household | Address, IP, device, or activity-based household inference | Can align with a same-household commercial promise | Travel, VPNs, mobile networks, separated families, students, caregivers, and shared networks create false positives; more personal data | **No verified support** |
| Risk-based enforcement | Multiple signals, history, anomaly scoring, challenges | Can focus intervention on unusual behavior | Opaque scoring, bias, surveillance, appeal burden, additional security/privacy engineering | **No verified support** |

The article can describe all four models, but ArraySubs should appear only in the concurrent-session column. Do not imply that ArraySubs detects a physical device, person, household, location, VPN, or intent.

## Local-code observations: verified ArraySubs behavior

Everything in this section is based on the current local source and product data, not an external claim or a completed live test.

### Availability and enablement

- Multi-Login Prevention is an **ArraySubs Pro** module registered from `arraysubspro/src/Boot.php`.
- Enforcement runs only when `settings.toolkit.multi_login_prevention` is enabled.
- Core defaults are disabled, maximum sessions `1`, and administrators excluded.
- The settings REST sanitizer constrains the global maximum to `1-100`.
- Product metadata consistently labels the feature Pro-only.

### Effective-limit resolution

`SessionManager::getEffectiveMaxSessions()`:

1. Reads the global maximum from Toolkit settings.
2. Evaluates enabled Login Limit rules using the shared Members Access `ConditionEvaluator`.
3. If several rules match, chooses the **highest** maximum (most permissive wins).
4. Falls back to the global value when no rule matches.
5. Clamps every rule to a minimum of one session.

The current rule builder exposes conditions for lifetime spend, purchased product or variation, category/tag purchase, active subscription product, subscription variation, Feature Manager value, and WordPress role. Nested AND/OR groups are supported by the underlying evaluator/sanitizer. Login Limit rules do not expose a drip/schedule control.

Editorial implication: “plan-level override” is true, but the actual mechanism is broader conditional per-user rules. Use the easier plan/tier example first, then accurately say conditions can also use current supported membership/purchase/role/feature evidence.

### Enforcement behavior

- Enforcement hooks into `wp_login` after a successful login.
- The new login is already represented in the WordPress session store, so it **always succeeds**.
- Eligible sessions are sorted by stored login time, oldest first.
- Enough oldest sessions are destroyed to leave the effective maximum.
- Expired sessions are filtered out in the default user-meta store path.
- Sessions marked as Login as User impersonation sessions are neither counted nor destroyed.
- Administrators with `manage_options` are exempt unless “Apply to administrators” is enabled.

Safest article wording:

> When a successful login pushes an account over its configured ArraySubs Pro limit, the current login remains active and the oldest eligible WordPress session is invalidated.

Do not say the user can choose which session to keep. The inspected module does not provide that choice.

### Current source UI and navigation

The latest source differs from some older recipe and QA wording:

- Current `MenuConfig.php` exposes **ArraySubs → Member Access → Login Limit** at `#/members-access/login-limit` when the Pro module is present.
- Current `LoginLimitRulesTab.jsx` contains both the global enable/default/admin settings and conditional Login Limit rules.
- Current `ToolkitSettings.jsx` does not contain Multi-Login Prevention fields.
- Some marketing recipes and older QA files still say **Settings → Toolkit → Multi-Login Prevention**.
- On the live mirror checked 2026-07-20, navigating to the source route fell back to Role Mapping and the Login Limit tab was not exposed. This prevents a current mirror screenshot or browser verification; it does not negate the capability visible in current source/product metadata.

The writer should resolve the deployed-build/feature-visibility mismatch before publishing UI instructions. Do not turn the mirror fallback into a claim that Pro lacks Multi-Login Prevention, and do not publish a navigation path that readers cannot currently reach.

### Heartbeat and logout visibility caveat

The Pro hook registers a server-side WordPress Heartbeat response that can return `arraysubs_session_expired` when a request includes `arraysubs_session_check`. A repository-wide source search found the server receiver but no source-side client sender for that data key. Existing marketing copy safely says an evicted session becomes visible on its next page load; an older QA plan expects a heartbeat redirect but the current QA progress record says this three-browser flow was not executed.

Therefore:

- claim deterministic session invalidation after the newest login;
- show “refresh or make the next request” in the worked test;
- do not promise a specific 15-120-second redirect, cooldown, toast, warning, or live forced-logout experience without current mirror proof.

### Capabilities not found in the inspected implementation

Do **not** claim that ArraySubs currently provides:

- device fingerprinting, device IDs, trusted-device lists, or named-device management;
- IP, GPS, household, travel, VPN, or impossible-travel enforcement;
- user behavior analysis, fraud scores, or machine-learning risk detection;
- family subaccounts, child profiles, team members, team seats, invitations, or one-payer/many-account billing;
- a customer-facing active-session list or remote per-session logout control;
- warning notices before eviction, a choice of which session survives, or a built-in appeal workflow;
- a cooldown/throttling rule after eviction;
- proof that account sharing stopped;
- protection against sequential sharing, copied downloads, screen capture, or redistribution.

### Local files supporting the product claims

- `arraysubspro/src/Features/MultiLoginPrevention/Services/Hooks.php`
- `arraysubspro/src/Features/MultiLoginPrevention/Services/SessionManager.php`
- `arraysubspro/src/Features/MultiLoginPrevention/Services/SettingsExtender.php`
- `arraysubs/src/resources/pages/MembersAccess/LoginLimitRulesTab.jsx`
- `arraysubs/src/resources/pages/Settings/ToolkitSettings.jsx`
- `arraysubs/src/Features/MainAdmin/Services/MenuConfig.php`
- `arraysubs/src/Features/MainAdmin/REST/SettingsController.php`
- `arraysubs/src/functions/settings-helpers.php`
- `arraysubs/src/Features/MembersAccess/Services/ConditionEvaluator.php`
- `web-content/app/deals/arraysubs/features/_data.ts`
- `web-content/app/deals/arraysubs/use-cases/_recipes.ts`
- `web-content/app/deals/arraysubs/pricing/page.tsx`
- `qa/progress/kanban/tasks/109-stage-09-11-multi-login-prevention-pro-max-2.md`

## External claims: WordPress, security, privacy, and accessibility

This section deliberately separates external guidance from ArraySubs product behavior.

### WordPress session foundation

WordPress core's `WP_Session_Tokens` API manages session tokens per user, can retrieve sessions, validate a token, and destroy a specific, other, or all sessions. On creation, core session data can contain expiration, IP address, user agent, and login time. WordPress hashes the session token for storage.

Implications:

- a WordPress “session” is the right technical unit for ArraySubs' current feature;
- stored IP/user-agent fields do not require an operator to use them for anti-sharing decisions;
- session invalidation is an established WordPress capability, not device fingerprinting;
- different identity/session stores can be substituted through WordPress' session manager filter, so non-default stores need integration testing.

### Security principles

- NIST SP 800-63B-4 describes browser cookies as the predominant session-tracking mechanism and recommends a readily accessible logout mechanism.
- NIST also requires easy-to-find redress mechanisms for authentication complaints/problems in the contexts to which its requirements apply. Even where NIST is not legally binding, redress is a sound membership-operating principle.
- NIST explicitly notes that public-facing systems may encounter shared authenticators such as a family phone receiving one-time codes and says systems should not automatically prevent one device from being registered to multiple subscribers solely for that reason, while allowing controls against large-scale fraud.
- OWASP treats simultaneous logon policy as an application-design choice and recommends letting users inspect active sessions, receive concurrent-logon alerts, terminate sessions remotely, and review account activity. These are maturity recommendations, not current ArraySubs claims.
- The UK National Cyber Security Centre advises against password sharing because it increases compromise risk. This supports explaining that separate named accounts improve both security and accountability.

### Privacy principles

The ICO's current UK GDPR guidance says personal-data processing should be lawful, fair, and transparent; limited to a specified purpose; adequate, relevant, and limited to what is necessary; and retained no longer than needed. For an anti-sharing program, this supports:

- documenting the exact purpose before collecting more login/device/location data;
- choosing a session count when it meets the business purpose instead of collecting precise location or a persistent fingerprint “just in case”;
- disclosing what is measured, why, how decisions are made, and how long records are retained;
- reviewing/deleting data that no longer serves the purpose;
- considering adverse and unexpected effects, not just detection power.

This article must be framed as general operational information, not legal advice. Applicable privacy, employment, consumer, child-account, biometric, communications, and automated-decision rules vary by jurisdiction and implementation.

### Accessibility principles

WCAG 2.2 Success Criterion 3.3.8, Accessible Authentication (Minimum), is designed to reduce cognitive-function burdens during login. W3C explains that password managers, browser autofill, and copy/paste can help satisfy the requirement and that all steps of a multi-step authentication flow need an accessible path.

Operator implications:

- do not block paste or password-manager autofill in an attempt to deter sharing;
- avoid puzzles or forced transcription as the routine response to a session-limit event;
- make error, eviction, recovery, and appeal messages keyboard- and screen-reader-operable;
- preserve the member's return destination after reauthentication;
- provide a support route that does not depend on the inaccessible step that failed;
- allow reasonable caregiver or assistant workflows without forcing the customer to disclose disability details unnecessarily.

## Family, team, and assisted-access fairness

### Separate entitlement from shared credentials

Current official family/group systems illustrate a useful product principle:

- Apple recommends a unique Apple Account for each family member and shares purchases/subscriptions through Family Sharing, preserving private messages, history, preferences, and ownership boundaries.
- Spotify's official household subscription uses a payer plus sub-account holders, requires eligible family members at the same address, and may reverify the address.
- Netflix defines a household using IP address, device IDs, and account activity while stating that it does not use GPS for precise device location; it offers extra-member or separate-account paths for some non-household users.
- WooCommerce Teams for Memberships uses one owner for billing and maintenance while invited members have their own site accounts and membership benefits. Team size, pricing, roles, and seats are explicit.

These are examples, not universal policy templates. A small publisher should not copy Netflix's data model unless its promise, risk, privacy analysis, tooling, and support capacity justify it. The lower-data design for most ArraySubs operators is a proportionate concurrent-session rule plus separately entitled family/team accounts when group access is sold.

### Fairness table

| Customer context | Legitimate need | Unfair default | Better policy/product response | ArraySubs role |
| --- | --- | --- | --- | --- |
| Individual member | Phone plus laptop; occasional old session | One-session hard cap with no explanation | Publish a reasonable allowance or explain oldest-session replacement | Global limit can implement the allowance |
| Family | Different histories, devices, ages, homes, or privacy needs | One shared password or “same IP = family” | One payer plus separate named family accounts/profiles; define eligibility clearly | Session rules can cap each account, but ArraySubs does not create the family structure |
| Separated/co-parenting family | Children use the service across homes | Fixed-household/location block | Define whether the plan follows people, residence, payer, or child; offer documented exception/reverification | No location or household feature |
| Caregiver/assistant | Authorized help logging in or navigating content | Treat every second session as theft | Accessible delegated/support process, limited permissions where possible, human exception | A more permissive condition/role limit may reduce friction, but no delegation model exists |
| Disabled member | Assistive device, password manager, secondary communication device | Block autofill/paste or require inaccessible challenges | WCAG-aware authentication and recovery; do not collect disability status unless necessary | Session cap only; authentication accessibility belongs to the wider login stack |
| Team/company | Several staff need access under one budget | Shared department credential | Named seats, owner/manager roles, join/leave process, audit trail | Conditional per-plan limits are not a seat system |
| Classroom/library/community organization | Shared machines plus many individual users | One institutional password with unlimited access | Organization plan, named or managed users, kiosk/session policy | Needs account/seat architecture beyond Multi-Login Prevention |
| Traveler/student away from home | Legitimate remote access | Location mismatch treated as conclusive fraud | Reauthentication, notice, or support review; do not rely on one IP event | ArraySubs does not inspect location |

## The SHARE operator framework

Use this original framework as the article's extractable centerpiece.

| Step | Operator question | Required output | Failure to avoid |
| --- | --- | --- | --- |
| **S — Specify the unit sold** | Is the promise one named person, one household, a number of screens, a number of seats, or an organization? | One-sentence entitlement promise in checkout terms and account policy | Enforcing “one session” when the product was sold vaguely as “family access” |
| **H — Honor legitimate access** | Which devices, browsers, assistive tools, caregivers, travel, and shared-authenticator cases should work? | Normal-use scenarios and explicit exceptions | Treating inconvenience as proof the control works |
| **A — Apply the least intrusive control** | Can a concurrent-session limit meet the purpose before device/location tracking? | Chosen limit by product/plan, data map, retention rule, and customer message | Collecting fingerprint/location data because it might become useful |
| **R — Respond proportionately** | What happens at the first, repeated, and reviewed event? | Enforcement ladder, recovery, notice, human review, and appeal owner | Immediate suspension or accusation from one ambiguous signal |
| **E — Evaluate outcomes** | Is the control reducing abuse without raising support, churn, accessibility failures, or overturned appeals? | Metric definitions, review cadence, rollback threshold, and change log | Reporting “accounts blocked” as success without measuring false positives |

### How to select a session allowance

Do not publish a universal magic number. Use a decision record:

```text
effective allowance
= normal simultaneous personal use
+ documented accessibility/caregiver need
+ purchased family/team entitlement
- sessions replaced through normal expiry/logout
```

Then answer:

1. How many simultaneous endpoints does the product experience reasonably require?
2. Does the plan sell individual, household, screen, or seat access?
3. Does work continue across phone and computer at the same time?
4. Can the user view and end stale sessions?
5. What happens to unsaved work when an old session is evicted?
6. What is the fastest route to regain access?
7. Which customer groups are likely to be affected unevenly?
8. Is a higher tier a real added entitlement or merely a ransom to restore ordinary use?

ArraySubs' “highest matching rule wins” behavior is helpful for overlapping entitlements: if a member qualifies for an individual limit and a family/team-style higher limit, the more permissive cap wins. Make clear that this is session allowance resolution, not automatic seat provisioning.

## Product and policy architecture by offer type

| Offer | Identity model | Billing model | Suggested concurrent-session stance | Operational requirement |
| --- | --- | --- | --- | --- |
| Individual | One named account holder | One payer/account | Enough for documented normal use; deter unlimited simultaneous access | Clear oldest-session behavior and recovery |
| Family | Separate account/profile per eligible person | One organizer/payer | Per-person session limit after members are provisioned | Eligibility, invite/remove, child/privacy, household/relationship policy |
| Team | Named account per seat | Owner/company pays per team or seat | Per-user cap plus purchased seat count | Owner/manager roles, seat lifecycle, offboarding, auditability |
| Assisted access | Member plus authorized support mechanism | Member/organization pays | Exception or delegated permission rather than a shared master password | Accessible authorization, scope, revocation, and support |
| Institutional/kiosk | Managed identities or a defined shared endpoint | Organization contract | Session behavior designed for the deployment | Device/session cleanup, local logout, privacy between users |

If separate family/team identities are a core requirement, ArraySubs Multi-Login Prevention alone is not sufficient. The article should say so directly and describe a team/family membership extension or custom account-provisioning layer as the appropriate architecture.

## Membership account-sharing policy template

Offer a short template readers can adapt with counsel and customer support:

> **Who may use the plan:** [one named member / eligible household members / up to N named seats]. Each person who receives an individual seat should use their own account.
>
> **Concurrent access:** This plan allows up to [N] active sessions per account. When a successful login exceeds that allowance, [the oldest session is signed out / the new login is challenged / the member chooses a session].
>
> **Normal use:** You may use your account on your own supported devices and while traveling, subject to the concurrent limit. [Describe family, caregiver, workplace, classroom, or accessibility exceptions.]
>
> **Security:** Do not publish or sell credentials. If you do not recognize a login or are repeatedly signed out, reset the password and contact [support route].
>
> **Review and appeal:** We do not treat one session event as conclusive proof of misuse. If access is restricted, we will explain the reason and provide [review/appeal route and response target].
>
> **Data:** We use [session count and timestamps / precisely listed signals] for [purpose], retain them for [period], and explain rights/choices in [privacy notice].

Do not insert unsupported ArraySubs behavior into the template. For current ArraySubs, the supported bracket is “oldest session is signed out”; choice, challenges, device naming, and appeals require other systems or operations.

## Proportionate enforcement and redress ladder

1. **Set expectations before purchase.** State the access unit and concurrent allowance on the pricing/checkout page and in account terms.
2. **Prevent accidental sharing.** Encourage unique credentials, password managers, and named accounts. Do not disable paste/autofill.
3. **Explain a limit event.** Tell the user that an older session was ended, what the allowance is, and what to do if the login was not theirs. Current ArraySubs may need surrounding theme/account messaging for this experience.
4. **Offer self-recovery.** Password reset, logout-all, support, and return-to-content paths must remain accessible. A customer-facing active-session manager would be a useful future enhancement but is not verified now.
5. **Route legitimate group use.** Offer family, team, or extra-seat plans with separate identities where the business supports them.
6. **Review repeated patterns.** Use more than one ambiguous signal and document the evidence. Do not label a member fraudulent because of a VPN, travel, disability, shared family phone, or mobile IP change.
7. **Apply a proportionate restriction.** Prefer a temporary, explained control before cancellation when risk and law permit.
8. **Provide appeal/redress.** Make the route visible, accessible, staffed, and measured. Restore access promptly when a decision is overturned.
9. **Learn and roll back.** If support, churn, accessibility incidents, or overturned decisions rise, revise the limit or product design.

## Measurement plan without invented benchmarks

Publish definitions and the observation window; do not invent “typical sharing rates” or guaranteed recovered revenue.

### Core measures

- `limit-event account rate = accounts with at least one session eviction / active member accounts`
- `repeat-event rate = accounts with another eviction inside the defined window / accounts with a first eviction`
- `support-contact rate = support contacts from affected accounts / accounts with a limit event`
- `post-event cancellation rate = affected accounts cancelling inside the defined window / affected accounts`
- `appeal-overturn rate = restrictions reversed after review / reviewed restrictions`
- `family-or-team conversion rate = affected accounts purchasing a legitimate group plan / eligible affected accounts shown the offer`
- `security-recovery rate = affected accounts completing password reset or logout-all / affected accounts reporting an unrecognized login`

### Guardrails

- login completion and password-reset success;
- accessibility complaints and authentication failures;
- support response/resolution time;
- refunds, chargebacks, cancellations, and downgrade requests after events;
- retention by plan before and after policy changes;
- false-positive reports and appeal outcomes;
- known test-user pass rate across phone, laptop, incognito, travel/VPN, assistive technology, caregiver, administrator, and impersonation cases.

Do not collect disability, precise location, family relationship, or other sensitive data merely to segment an experiment. Use voluntary support feedback and privacy-reviewed aggregate measurement where possible.

## Worked scenarios for the article

### Independent paid publisher

Promise: one named reader, ordinary use on personal devices. Risk: one login circulated widely.

Policy: use a modest concurrent-session cap, newest-login continuity, an explanation/recovery page, and manual review of repeated support cases. Avoid device fingerprinting unless evidence shows the session cap is insufficient and a privacy/security review approves additional collection.

ArraySubs fit: good for the concurrent-session layer and a higher session allowance for a premium plan. Not sufficient for preventing copied articles or downloaded-file redistribution.

### Family learning membership

Promise: parent pays; several family members need separate progress and accessible logins.

Policy: provision a separate account/profile for each eligible member. Define household/family eligibility and co-parenting/travel exceptions. Apply a reasonable per-account session cap after identities exist.

ArraySubs fit: can cap the resulting WordPress accounts conditionally. It does not provision family members or share one subscription across linked subaccounts in the inspected module.

### Corporate course or association

Promise: an organization buys named seats; staff change over time.

Policy: owner/manager handles billing and invitations; every learner has an account; seat additions/removals and offboarding are auditable. Do not solve this by raising one shared credential to 20 sessions.

ArraySubs fit: per-plan/per-role limits can be one layer, but seat sales, invitations, team roles, and linked billing need a dedicated team-account architecture. WooCommerce Teams for Memberships is an official example of that operating model, not an ArraySubs feature claim.

## Recommended article structure for SEO and GEO

### Metadata

- H1: `Preventing Shared Membership Accounts Without Punishing Families`
- SEO title: `Prevent Shared Membership Accounts Fairly`
- Meta description: `Prevent shared membership accounts with session limits, family and team plans, accessible exceptions, privacy-aware enforcement, and a fair appeals process.`
- Focus keyword: `prevent shared membership accounts`
- Format: long-form strategy guide
- Visible publication and last-verified date: 2026-07-20
- Author: Emran, ArrayHash
- Technical reviewer: ArraySubs Engineering Team
- Add a general-information/no-legal-advice note beside the privacy/policy section.

### Outline

1. Direct answer (40-60 words)
2. Key takeaways
3. What counts as account sharing, and what can look similar?
4. What is the difference between a session, device, location, and risk signal?
5. Which anti-sharing model should a membership site use?
6. The SHARE framework
7. How should limits change for individual, family, team, and assisted access?
8. What ArraySubs Pro Multi-Login Prevention does
9. What ArraySubs does not detect or provide
10. A fair enforcement, recovery, and appeal ladder
11. A membership account-sharing policy template
12. Three worked membership scenarios
13. How to measure deterrence without rewarding false positives
14. Current implementation test checklist
15. When ArraySubs is not enough
16. FAQ
17. CTA after the reader has the complete answer

### Extractable answer blocks

Use short answers directly below these question headings:

- **Can WordPress prevent simultaneous logins?** Yes, through its per-user session-token system and an enforcement layer such as ArraySubs Pro; WordPress/WooCommerce membership access alone does not necessarily impose a concurrent limit.
- **Does a concurrent-session limit identify a device?** No. A session is authenticated browser state, not a stable physical-device identity.
- **Will a session cap stop all account sharing?** No. It deters simultaneous sharing but cannot detect sequential use or prevent copied content.
- **What is a fair limit for a family plan?** There is no universal number; the better design is usually separate eligible member accounts plus a documented per-account/session policy.
- **Does ArraySubs use device fingerprinting or GPS?** No such capability was found in the inspected current code or product data. It counts eligible WordPress sessions.
- **What happens when an ArraySubs limit is exceeded?** The successful new login remains active and the oldest eligible session is invalidated.

### GEO execution

- Keep the direct answer, ArraySubs, WordPress, WooCommerce, `WP_Session_Tokens`, WCAG 2.2, NIST SP 800-63B-4, and the SHARE framework within the first major sections.
- Put citations beside factual claims rather than collecting unsupported assertions at the end.
- Use the four-model table, fairness table, SHARE table, policy template, and formulas as extractable units.
- Clearly label local-code observations, current browser-test observations, external standards, examples from other vendors, and operator recommendations.
- Use `Article` or `TechArticle` plus `BreadcrumbList` only when metadata matches the visible article. Do not promise FAQ rich results or invent anti-sharing schema.
- Google says normal SEO rules apply to AI Overviews/AI Mode and no special AI markup is required. Important content should remain textual, crawlable, internally linked, and supported by useful images.
- Bing AI Performance can be used to monitor cited URLs and grounding queries. OpenAI says public pages need to be crawlable by OAI-SearchBot to be eligible for ChatGPT search discovery.
- Refresh after changes to WordPress session management, ArraySubs Multi-Login Prevention, the current UI route, the family/team product model, WCAG authentication guidance, privacy law/guidance, or major platform account-sharing policies.

## Internal-link plan

Keep the article at 6-8 contextual internal links. Use varied anchors and do not repeat the recipe's configuration walkthrough.

1. Early architecture context: `/deals/arraysubs/resources/membership-strategy/how-to-create-a-woocommerce-membership-site-architecture-before-configuration/` — anchor such as “membership architecture before configuration.”
2. Billing-versus-access distinction: `/deals/arraysubs/resources/membership-strategy/woocommerce-membership-vs-subscription-what-is-the-difference/` — anchor such as “separate subscription billing from membership access.”
3. Lifecycle/source-of-truth context: `/deals/arraysubs/resources/membership-strategy/woocommerce-subscriptions-and-memberships-together-the-complete-architecture/` — anchor such as “connect recurring billing to member entitlements.”
4. Product capability after the neutral framework: `/deals/arraysubs/features/#member-experience` — anchor such as “ArraySubs member experience features.”
5. Narrow global-cap setup: `/deals/arraysubs/use-cases/recipes/limit-concurrent-logins/` — anchor such as “configure the ArraySubs Pro concurrent-login limit.” This recipe owns step-by-step setup.
6. Per-tier example: `/deals/arraysubs/use-cases/recipes/session-limit-per-tier/` — anchor such as “set plan-specific session allowances.”
7. Conditional rule context, only if discussed: `/deals/arraysubs/use-cases/recipes/combined-conditions/` — anchor such as “combine membership eligibility conditions.”
8. Final commercial CTA: `/deals/arraysubs/pricing/` — “View Pro Pricing,” only after the complete answer and limitations.

Do not force the URL-prefix or inline-gating recipes into this article merely because they are cluster defaults; they do not materially help the account-sharing decision. If the publishing system requires one of those cluster links, place it only in a genuinely relevant sentence about protecting the underlying content, not the login policy.

## Screenshot opportunities in the real app

Use Vercel agent-browser on the live mirror and current session-isolated browser contexts. Do not rely on source alone for a screenshot claim.

Source route intended for verification:

`https://mirror-help.arrayhash.com/wp-admin/admin.php?page=arraysubs-mainadmin#/members-access/login-limit`

Current test-environment limitation: on 2026-07-20 this mirror route fell back to Role Mapping and did not show the Login Limit tab. The screenshot plan below is therefore contingent on deploying/enabling the matching build or using a safe local environment. Until then, use product screenshots only if they can be captured from the actual reachable UI; do not simulate them.

Capture plan:

1. **Global controls in current Login Limit UI:** crop the Multi-Login Prevention enable switch, default max sessions, administrator option, and the explanatory oldest-session text. This is the best first product screenshot.
2. **Conditional rule builder:** create or use a safe test rule showing `Has Active Subscription`, a test plan, and `Max Allowed Sessions`, then capture the complete IF/THEN relationship. Do not expose real customer names or IDs.
3. **Most-permissive resolution:** capture two safe rules or the UI explanation stating that the highest matching limit applies.
4. **Three-session browser proof:** with a dedicated test customer and limit 2, capture Browser 2 and Browser 3 still authenticated and Browser 1 logged out after refresh/next request. Record times and versions in the caption. Do not claim heartbeat timing unless observed.
5. **Administrator option:** screenshot only the setting/explanation; avoid deliberately evicting the working admin session during content capture.
6. **Pro boundary:** if safe, capture the absence of the Login Limit tab with Pro inactive in a disposable/local environment, not by disrupting the live mirror.
7. **Navigation discrepancy proof:** if the live deployed build still shows the controls under Settings → Toolkit rather than Member Access → Login Limit, use the live route and record the deployed version. Update article language to match what readers can actually see.

Screenshot hygiene:

- use test accounts and plans;
- crop cookies, nonces, emails, order/subscription IDs, and personal data;
- add concise alt text stating the operational takeaway;
- annotate only after preserving an unmodified source screenshot;
- record plugin version, site, role, browser context, and verification date.

## Varied inline-image concepts

Use context variations and one teaching objective per image. Mix live screenshots, flow charts, editorial scenes, and step art instead of repeating dashboard panels.

1. **Live app screenshot — “Global limit and exceptions”:** current Login Limit global controls. Objective: show that ArraySubs uses a session cap, administrator choice, and oldest-session behavior.
2. **Editorial balance scene — “Abuse versus normal use”:** one membership key at the center; on one side an organized resale/share network, on the other one legitimate member moving between phone, laptop, and assistive device. No labels beyond `Abuse`, `Normal use`, `Review`.
3. **Single flow chart — “Session, not device”:** `Successful login → Count valid sessions → Over limit? → Invalidate oldest → Keep current login`. Exact labels only; no device fingerprint icons.
4. **Comparison visual — “Four anti-sharing models”:** one horizontal progression of `Sessions`, `Devices`, `Location`, `Risk`, with increasing data collection indicated by a restrained arrow. Do not turn it into a card grid.
5. **Family editorial scene — “One payer, separate identities”:** one billing envelope branching to several distinct member keys/profiles, each retaining its own history. This should sit beside the family-plan section, not beside ArraySubs configuration.
6. **Team step art — “Buy seats, invite people, offboard safely”:** `Owner → Seats → Named accounts → Remove access`. Use as an architecture example and state that this is not current Multi-Login Prevention functionality.
7. **Enforcement ladder — “Explain before penalizing”:** a clean upward sequence `Terms → Limit → Explain → Recover → Review → Appeal`. No invented numbers.
8. **Live app screenshot — “Conditional plan allowance”:** a real Login Limit rule showing a premium/family test plan receiving a higher session allowance.
9. **Measurement loop — “Deterrence with guardrails”:** `Limit event → Recovery/support → Outcome → Policy review`, with `False positives` as a visible guardrail, not a fabricated chart.
10. **Accessibility scene — “Many tools, one member”:** one person using laptop, phone, password manager, and assistive input as a cohesive single scene. Objective: explain why device count is not person count.

Avoid unsupported percentages, “revenue recovered” charts, recognizable third-party logos, readable customer data, generic glowing dashboards, and any image that implies ArraySubs fingerprints devices.

## End-to-end operator checklist

### Promise and policy

- [ ] The unit sold is stated as person, household, screen, seat, or organization.
- [ ] Concurrent-session allowance is visible before purchase and in account terms.
- [ ] Family, team, travel, caregiver, and accessibility cases are defined.
- [ ] The policy distinguishes credential sharing, compromise, and ordinary multi-device use.
- [ ] Data purpose, signal list, retention, and privacy notice are reviewed.
- [ ] Recovery, complaint, and appeal routes are visible and accessible.

### ArraySubs configuration

- [ ] Pro is active and the current live location of Multi-Login Prevention is recorded.
- [ ] The global setting is enabled deliberately; the global fallback is recorded.
- [ ] Administrator inclusion is set deliberately.
- [ ] Each conditional Login Limit rule has a plain-language owner/purpose.
- [ ] Overlapping rules produce the intended highest limit.
- [ ] No rule is described as a device, IP, location, household, or fingerprint rule.
- [ ] The narrow recipe is linked instead of duplicated in the strategy article.

### Browser verification

- [ ] One session below the limit remains active.
- [ ] Exactly the allowed number of isolated browser sessions remain active.
- [ ] A new over-limit login succeeds.
- [ ] The oldest eligible session is unauthenticated on refresh/next request.
- [ ] Surviving sessions remain authenticated.
- [ ] Admin exemption/include behavior matches the setting.
- [ ] Login as User does not count toward or get evicted by the limit.
- [ ] Global fallback works for a user who matches no conditional rule.
- [ ] Several matching rules choose the highest allowance.
- [ ] Pro deactivation behavior is tested safely and stored rules are checked.
- [ ] Password reset, logout, My Account, payment recovery, checkout, and support remain reachable.
- [ ] Mobile, private browsing, cookie clearing, VPN/travel, shared authenticator, assistive technology, and caregiver cases are documented.
- [ ] No precise heartbeat/cooldown/message claim is published without observed evidence.

### Monitoring

- [ ] Event and guardrail formulas use documented denominators and windows.
- [ ] Support and appeal outcomes are reviewed alongside eviction counts.
- [ ] No sensitive fairness data is collected merely to improve a dashboard.
- [ ] Rollback thresholds and a policy owner are assigned.
- [ ] Changes are logged with date, reason, evidence, reviewer, and test results.

## Primary external sources and claim map

### WordPress and WooCommerce

- [WordPress `WP_Session_Tokens` source reference](https://developer.wordpress.org/reference/files/wp-includes/class-wp-session-tokens.php/) — per-user session management, retrieval, validation, and destruction methods.
- [WordPress `WP_Session_Tokens::create()`](https://developer.wordpress.org/reference/classes/wp_session_tokens/create/) — core session payload can include expiration, IP, user agent, and login time; token generation and storage path.
- [WooCommerce Memberships FAQ](https://woocommerce.com/document/woocommerce-memberships-faq/) — memberships attach to user accounts; WooCommerce Memberships does not itself manage the login process or prevent simultaneous logins.
- [WooCommerce Teams for Memberships](https://woocommerce.com/document/teams-woocommerce-memberships/) — one team owner manages billing/maintenance while members have accounts; team pricing, seats, roles, invitations, and subscription-linked lifecycle.

### Authentication and security

- [NIST SP 800-63B-4](https://pages.nist.gov/800-63-4/sp800-63b.html) — current authentication/session guidance; shared family authenticators, browser-cookie sessions, logout, privacy considerations, and redress requirements.
- [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html) — simultaneous-session policy as an application decision; recommendations for active-session visibility, alerts, remote termination, and account history.
- [UK NCSC password policy guidance](https://www.ncsc.gov.uk/collection/passwords/updating-your-approach) — shared work accounts introduce security and accountability risk; if unavoidable, shared access should be monitored and reviewed.

### Privacy and accessibility

- [ICO data minimisation guidance](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/data-minimisation/) — collect adequate, relevant data limited to what is necessary; periodically review and delete what is no longer needed.
- [ICO lawfulness, fairness, and transparency guidance](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/lawfulness-fairness-and-transparency/) — disclose processing and consider unjustified adverse or unexpected impact.
- [ICO storage limitation guidance](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/storage-limitation/) — retain personal data no longer than needed and justify retention.
- [W3C Understanding WCAG 2.2 SC 3.3.8](https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html) — accessible authentication, password-manager/autofill/copy-paste support, multi-step authentication, and cognitive-function-test constraints.
- [WCAG 2.2 Recommendation](https://www.w3.org/TR/WCAG22/) — normative accessibility standard and Success Criterion 3.3.8.

### Official account-sharing and family/team examples

- [Apple: each family member should have a unique Apple Account](https://support.apple.com/en-ie/109040) — separate identities with Family Sharing preserve privacy, preferences, and ownership.
- [Spotify Paid Subscription Terms](https://www.spotify.com/legal/paid-subscription-terms) — primary payer/sub-account structure, family/same-address eligibility, and address verification for household plans.
- [Netflix: What is a Netflix Household?](https://help.netflix.com/en/node/124925) — household policy example using IP address, device IDs, and account activity, with no GPS collection for precise device location.
- [Google family groups](https://support.google.com/accounts/answer/6317858?hl=en) — separate Google Accounts in a family group, membership limits, and retained individual content/account ownership.

### SEO/GEO publishing guidance

- [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features) — normal SEO practices apply to AI Overviews/AI Mode; no special AI markup is required; internal links, textual content, crawlability, images, and matching structured data matter.
- [Google: creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) — first-hand evidence, sourcing, expertise, and reader usefulness.
- [Bing: AI Performance in Webmaster Tools](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview) — cited URLs and grounding-query monitoring.
- [OpenAI: Publishers and Developers FAQ](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq) — OAI-SearchBot crawl eligibility and publisher controls for ChatGPT search.

## Limitations and review notes

- A concurrent-session limit is a deterrent and account-security control, not proof of revenue recovery or eliminated sharing.
- The article should not estimate sharing prevalence, conversion lift, churn reduction, or ROI without original methodology and data.
- The article should not use “screen,” “device,” “IP,” “location,” and “session” as synonyms.
- The article should not present Netflix, Spotify, Apple, Google, or WooCommerce policies as legal requirements or universal best practice; they are concrete product-design examples with different promises and data models.
- The current code/product/QA route discrepancy should be resolved with a real mirror screenshot before publication.
- The lack of completed three-browser QA in the inspected progress record must remain visible until a new test supplies evidence.
- Add a named technical reviewer, a visible test environment/version note, publication and last-verified dates, and a short update log.
- Reverify after any relevant ArraySubs/ArraySubs Pro release, WordPress session change, login/SSO integration, privacy-law/guidance change, WCAG update, or family/team product-policy change.
- Keep the strategy guide educational and independent. State plainly that ArraySubs is not the right standalone solution when the buyer needs linked family accounts, seat invitations, identity verification, device management, high-assurance fraud analytics, or DRM.

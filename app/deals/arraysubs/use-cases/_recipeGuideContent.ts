import type { Recipe } from "./_recipes";

export type RecipeScreenshot = {
  src: string;
  alt: string;
  title: string;
  caption: string;
};

export type GroupGuidance = {
  planning: string;
  operations: string;
};

export const GROUP_GUIDANCE: Record<string, GroupGuidance> = {
  "recurring-billing": {
    planning:
      "Recurring billing settings form one commercial promise. Price, interval, trial, fee, length, payment collection, and renewal recovery must tell the same story on the product page, at checkout, in reminder emails, and on every later invoice. A technically valid product can still create support problems when one of those surfaces describes a different commitment. Write down the offer in plain language first, then compare every configured field with that statement before publishing.",
    operations:
      "After launch, review a complete first-order and renewal cycle rather than treating checkout as the finish line. Confirm the initial total, next-payment date, stored payment method, renewal order, access status, shipping behavior where relevant, and customer emails. Short billing intervals make mistakes visible quickly, while annual plans can hide them for months, so keep a dated test subscription and a renewal checklist for every pricing shape you sell.",
  },
  "manage-subscriptions": {
    planning:
      "Administrative subscription work should be repeatable, attributable, and easy for another operator to audit. Decide which team roles may create, edit, export, refund, impersonate, or change lifecycle state before exposing those controls. Record why an exception was made, not only what button was pressed. That discipline matters because a correct status change can still be commercially wrong when it ignores the related order, access entitlement, credit balance, or next scheduled action.",
    operations:
      "Use a before-and-after routine for every manual intervention. Capture the subscription status, customer, product, next payment, related orders, notes, and scheduled actions before the change; then verify the same set afterward. Customer-facing access and email behavior should match the new state. For bulk work, test one representative record first, export a reference copy when appropriate, and keep destructive permissions limited to the smallest practical set of staff.",
  },
  "retention-coupons": {
    planning:
      "A retention offer is a pricing decision, not merely a percentage field. Define the customer problem it addresses, who is eligible, how long the benefit lasts, and what happens after it ends. The strongest offer is not automatically the best one: it must protect margin, avoid training customers to threaten cancellation, and remain understandable on invoices. Cancellation reasons, offer conditions, coupon duration, and customer-facing wording should all describe the same policy.",
    operations:
      "Measure exposure as well as acceptance. Track how many eligible customers saw the offer, accepted it, remained active through the discounted period, and stayed after normal pricing returned. Review saved revenue alongside discount cost and later churn. Test the cancellation path with an eligible customer, an ineligible customer, and a customer who declines the offer so that every branch reaches a clear, reversible result without trapping someone who genuinely wants to leave.",
  },
  "plan-switching-features": {
    planning:
      "Plan changes connect catalog structure, entitlement design, proration, fees, store credit, and customer self-service. Start with a simple relationship map showing which products can upgrade, downgrade, or crossgrade to which destinations. Then define what value should move with the customer: immediate access, deferred access, a prorated charge, a credit, or no financial adjustment. Avoid circular or ambiguous paths that make two plans appear simultaneously higher and lower than one another.",
    operations:
      "Test switching at several points in the billing cycle because boundary dates expose rounding and timing mistakes. Verify the order total, credit ledger, subscription product, next renewal, feature values, protected access, and customer confirmation after each path. Run the same checks from both the administrator workflow and customer portal when self-service is enabled. A switch is complete only when billing and entitlements agree on the destination plan.",
  },
  "member-restrictions": {
    planning:
      "Access rules are easier to maintain when each rule answers three questions: who qualifies, what is protected, and what a denied visitor sees. Keep the qualification logic as narrow as the business policy requires, and name rules so another administrator can understand them without opening every condition. When combining conditions, document whether all conditions must match or whether any one condition is enough; an unnoticed AND/OR choice can expose content or lock out valid members.",
    operations:
      "Always test access with separate administrator, eligible-member, ineligible-member, logged-out, expired, and grace-period sessions. Check the direct URL, archive or listing page, search result, download endpoint, and cached page where applicable. Confirm that the denial message gives a useful next step without revealing protected material. Retest after changing a product, role, feature value, URL structure, or caching layer because those dependencies can alter the effective audience.",
  },
  "membership-modules": {
    planning:
      "Member experience settings should reduce support effort while keeping account data understandable and safe. Decide which profile fields, portal actions, addresses, payment controls, menus, and emails members genuinely need. Use familiar labels and explain the consequence of each action before the member commits. A portal that exposes every possible control is not necessarily more useful; the best configuration reflects the actual service policy and removes dead ends.",
    operations:
      "Review the experience as a customer, not only from the administrator screen. Test a new member, an established active member, a paused or on-hold member, and a member without the relevant entitlement. Verify mobile layout, keyboard navigation, validation messages, saved values, confirmation emails, and the resulting subscription or account record. Whenever you change a portal field or menu item, also check the corresponding order, profile, and support workflow.",
  },
  "analytics-growth": {
    planning:
      "A report is useful only when its definition, date range, source events, and business decision are clear. Write down what each metric includes and excludes before using it as a target. For example, active subscriptions, recurring revenue, churn, trial conversion, coupon performance, gateway health, and scheduled-job status answer different questions. Comparing figures from different definitions can create a false trend even when each individual report is technically correct.",
    operations:
      "Build a regular review cadence with a stable date range and a small set of diagnostic follow-ups. Investigate unusual movement by checking the underlying subscriptions, orders, refunds, coupons, gateway events, audits, or scheduled actions. Separate reporting delays from genuine operational failures. Keep a short decision log so that later changes in conversion, churn, or revenue can be compared with the configuration change that may have caused them.",
  },
};

export const DEFAULT_GUIDANCE: GroupGuidance = {
  planning:
    "Treat this recipe as a complete operating policy rather than an isolated switch. Write down the intended customer experience, the administrator responsibility, and the expected record changes before entering values. That short policy makes it easier to compare the configuration with storefront copy, support instructions, and team expectations, and it gives future administrators a reason for each setting instead of an unexplained snapshot.",
  operations:
    "Verify the result with a representative account and keep a repeatable checklist. Inspect the visible interface and the resulting subscription, order, user, credit, access, email, or report state that the recipe is meant to affect. Recheck the workflow after related plugin settings, products, gateways, roles, or templates change, because a configuration can remain saved while its surrounding assumptions become outdated.",
};

function recipeSearchText(recipe: Recipe): string {
  return [
    recipe.slug,
    recipe.name,
    recipe.h1,
    recipe.intro,
    ...recipe.relatedFeatures,
    ...recipe.settings.flatMap((row) => [
      row.setting,
      row.value,
      row.where ?? "",
    ]),
  ]
    .join(" ")
    .toLowerCase();
}

function capture(
  file: string,
  title: string,
  detail: string,
): RecipeScreenshot {
  return {
    src: `/recipes/settings/${file}`,
    alt: `${title} on the ArraySubs staging site`,
    title,
    caption: `This staging capture ${detail}.`,
  };
}

const SCREENSHOTS = {
  generalOverview: capture(
    "general-subscription-settings.png",
    "General subscription settings",
    "orients you to the store-wide subscription, checkout, trial, recovery, and customer-action controls",
  ),
  generalMultiple: capture(
    "general-multiple-subscriptions.png",
    "Multiple-subscription policy",
    "shows the product and cart rules that decide whether customers may hold or purchase more than one subscription",
  ),
  generalTrialAccount: capture(
    "general-checkout-trials-account-mode-open.png",
    "Trial and checkout account controls",
    "opens the account-creation choice beside the trial and checkout policy fields",
  ),
  generalRenewal: capture(
    "general-renewal-sync-charge-open.png",
    "Renewal synchronization behavior",
    "opens the renewal synchronization charge behavior so the full-charge and prorated choices are visible",
  ),
  generalCustomerActions: capture(
    "general-customer-actions.png",
    "Customer subscription actions",
    "shows the cancellation, early-renewal, auto-renew, and related self-service controls lower on the General screen",
  ),
  toolkitOverview: capture(
    "admin-toolkit-settings.png",
    "Administrator toolkit",
    "shows the admin-bar, dashboard-access, login-page, and login-as-user configuration area",
  ),
  toolkitRedirect: capture(
    "toolkit-admin-redirect-open.png",
    "Administrator redirect options",
    "opens the dashboard redirect control used to define where restricted users land",
  ),
  toolkitRoles: capture(
    "toolkit-allowed-roles-open.png",
    "Administrator access roles",
    "shows the role selector and the neighboring administrator-access safeguards",
  ),
  refunds: capture(
    "refunds-settings-overview.png",
    "Subscription refund policy",
    "shows refund timing, gateway handling, and prorated-refund choices on one screen",
  ),
  skipRenewal: capture(
    "skip-renewal-controls-expanded.png",
    "Skip-renewal controls",
    "expands the skip feature to reveal cycle limits, cutoff timing, and the customer-facing toggle",
  ),
  pauseSubscription: capture(
    "pause-subscription-controls-expanded.png",
    "Pause-subscription controls",
    "expands pause settings to reveal duration, count, cooldown, reason, and content-access fields",
  ),
  pauseAccess: capture(
    "pause-content-access-open.png",
    "Paused content-access options",
    "opens the access dropdown so no access, limited access, and full access can be compared",
  ),
  productOverview: capture(
    "subscription-product-settings.png",
    "Subscription product data",
    "shows the Subscription product-data tab and its core recurring-product controls",
  ),
  productSchedule: capture(
    "product-subscription-interval-trial-fields.png",
    "Billing schedule and trial fields",
    "scrolls directly to billing period, interval, length, trial, fee, renewal-price, and shipping settings",
  ),
  productBillingPeriod: capture(
    "product-billing-period-open.png",
    "Billing-period choices",
    "opens the product billing-period menu with day, week, month, year, and lifetime choices",
  ),
  productFixedEnd: capture(
    "product-fixed-end-date-expanded.png",
    "Fixed end-date controls",
    "enables the nested end-date section to reveal annual cutoff, absolute date, and period-end behavior",
  ),
  productLinked: capture(
    "product-linked-products-plan-switching.png",
    "Linked plan-switching products",
    "shows the upgrade, downgrade, and related linked-product selectors on a real subscription product",
  ),
  productFeature: capture(
    "product-feature-manager-settings.png",
    "Product feature manager",
    "opens the product-level feature tab where plan entitlements are assigned",
  ),
  productFeatureModal: capture(
    "product-feature-row-expanded.png",
    "Feature repeater modal",
    "opens the Manage Features popup and adds a feature row with name, type, value, and enabled controls",
  ),
  checkoutSettings: capture(
    "checkout-builder-settings.png",
    "Checkout data settings",
    "shows how custom checkout fields are copied to orders, subscriptions, and renewal orders",
  ),
  checkoutEntry: capture(
    "checkout-builder-editor-entry.png",
    "Checkout Builder entry screen",
    "shows the builder status and the control used to open the visual editor",
  ),
  checkoutCanvas: capture(
    "checkout-builder-canvas.png",
    "Checkout Builder canvas",
    "shows the element palette, checkout steps, and current field layout inside the visual builder",
  ),
  checkoutDesign: capture(
    "checkout-builder-design-tab.png",
    "Checkout Builder design tab",
    "opens the Design tab with its color, layout, and step-navigation sections",
  ),
  checkoutFieldPanel: capture(
    "checkout-builder-field-settings-panel.png",
    "Checkout field settings panel",
    "opens a field editor with label, key, type, and nested billing-address field toggles",
  ),
  checkoutStep: capture(
    "checkout-builder-add-step-popup.png",
    "Multi-step checkout layout",
    "shows a newly added second checkout step so the step repeater and navigation are visible",
  ),
  retentionOverview: capture(
    "retention-flow-settings.png",
    "Retention Flow overview",
    "shows cancellation reasons and the discount, pause, downgrade, and contact-support offer areas",
  ),
  retentionReason: capture(
    "retention-reason-item-expanded.png",
    "Cancellation reason item",
    "expands a saved cancellation-reason accordion to reveal its label and slug fields",
  ),
  retentionReasonRepeater: capture(
    "retention-reason-repeater-new-item.png",
    "Cancellation reason repeater",
    "adds and opens a new reason row so the complete repeater workflow is visible",
  ),
  retentionDiscountReasons: capture(
    "retention-discount-reasons-open.png",
    "Retention discount targeting",
    "opens the discount-offer reason selector with every eligible cancellation reason visible",
  ),
  retentionPause: capture(
    "retention-pause-offer-expanded.png",
    "Retention pause offer",
    "expands the pause offer to show reasons, duration, title, and message controls",
  ),
  retentionContact: capture(
    "retention-contact-offer-expanded.png",
    "Contact-support retention offer",
    "expands the contact offer to show reason targeting, support URL, copy, and button fields",
  ),
  couponOverview: capture(
    "subscription-coupon-settings.png",
    "Subscription coupon controls",
    "shows the subscription toggle, duration, and renewal-cycle fields inside WooCommerce coupon data",
  ),
  couponDuration: capture(
    "coupon-recurring-duration-fields.png",
    "Recurring coupon duration",
    "shows a recurring renewal coupon with a three-cycle limit and initial-checkout counting",
  ),
  couponDurationOpen: capture(
    "coupon-duration-options-open.png",
    "Coupon duration options",
    "opens the one-time and recurring subscription discount choices",
  ),
  couponRestrictions: capture(
    "coupon-usage-restrictions.png",
    "Coupon usage restrictions",
    "opens the restriction tab with spend, product, category, email, and brand eligibility controls",
  ),
  couponLimits: capture(
    "coupon-usage-limits.png",
    "Coupon usage limits",
    "opens the limits tab with per-coupon, per-item, and per-user caps",
  ),
  planOverview: capture(
    "plan-switching-settings.png",
    "Plan Switching settings",
    "shows global switching direction, self-service, proration, fee, and auto-downgrade controls",
  ),
  planProration: capture(
    "plan-switching-proration-open.png",
    "Plan-switch proration options",
    "opens the proration behavior menu used for immediate and renewal-time switching",
  ),
  planRounding: capture(
    "plan-switching-rounding-open.png",
    "Plan-switch rounding method",
    "opens the rounding menu used when prorated charges or credits produce fractional values",
  ),
  planAutoDowngrade: capture(
    "plan-switching-auto-downgrade-open.png",
    "Automatic downgrade triggers",
    "opens the expiration, cancellation, and trial-expiry downgrade choices",
  ),
  featureSettings: capture(
    "feature-manager-display-settings.png",
    "Feature Manager settings",
    "shows feature display, usage, and aggregation controls at the global level",
  ),
  featureComparison: capture(
    "feature-manager-comparison-expanded.png",
    "Feature comparison option",
    "enables the comparison setting so the customer-facing plan comparison behavior is visible",
  ),
  storeCredit: capture(
    "store-credit-settings.png",
    "Store Credit settings",
    "shows renewal application, checkout use, expiration, and credit-purchase limits",
  ),
  memberAccessOverview: capture(
    "member-access-rules.png",
    "Member Access rule builder",
    "shows the condition, protected target, and denial-behavior structure shared by access rules",
  ),
  roleMapping: capture(
    "member-access-role-mapping-expanded.png",
    "Role-mapping rule",
    "expands an existing rule with product conditions, added roles, removed roles, and fallback behavior",
  ),
  accessNested: capture(
    "member-access-nested-condition-group.png",
    "Nested access conditions",
    "adds a nested condition group and exposes the ALL and ANY relationship controls",
  ),
  discountRule: capture(
    "member-discount-rule-expanded.png",
    "Member discount rule",
    "shows product scope, eligibility conditions, discount value, and free-shipping behavior",
  ),
  discountTypes: capture(
    "member-discount-condition-types-open.png",
    "Discount eligibility conditions",
    "opens the condition-type menu with purchase, subscription, feature, login, and role choices",
  ),
  discountNested: capture(
    "member-discount-nested-group.png",
    "Nested member-discount group",
    "adds a nested condition group above the discount action and free-shipping controls",
  ),
  shopRule: capture(
    "shop-access-rule-expanded.png",
    "Shop Access rule",
    "shows store scope, member eligibility, denial behavior, and the customer message",
  ),
  shopAction: capture(
    "shop-access-action-open.png",
    "Shop Access denial actions",
    "opens the choices for blocking purchase, returning a 404, or redirecting the visitor",
  ),
  shopScope: capture(
    "shop-access-scope-open.png",
    "Shop Access product scope",
    "opens the full-store, product, and category targeting choices",
  ),
  urlRule: capture(
    "url-rule-list-expanded.png",
    "URL access rules",
    "shows URL pattern, priority, exceptions, qualification, and denial action in the expanded rule list",
  ),
  urlMatch: capture(
    "url-rule-match-types-open.png",
    "URL match types",
    "opens starts-with, contains, exact-match, and regular-expression choices",
  ),
  urlPriority: capture(
    "url-rule-priority-actions.png",
    "URL rule priority and actions",
    "scrolls through multiple expanded URL rules so priority, exception, and response differences can be compared",
  ),
  cptRule: capture(
    "cpt-rule-taxonomy-expanded.png",
    "Post-type taxonomy rule",
    "shows taxonomy targeting, archive visibility, qualification, access response, and drip delay",
  ),
  cptScope: capture(
    "cpt-rule-scope-open.png",
    "Post-type protection scope",
    "opens entire-post-type, taxonomy, and specific-content targeting choices",
  ),
  cptArchive: capture(
    "cpt-rule-archive-behavior-open.png",
    "Protected archive behavior",
    "opens hide, lock-icon, and normal-listing behavior for protected content",
  ),
  downloadRule: capture(
    "download-rule-expanded.png",
    "Download access rule",
    "adds and opens a download rule with its file, condition, group, and drip controls",
  ),
  downloadFile: capture(
    "download-file-repeater-expanded.png",
    "Download file repeater",
    "adds a nested file row with display name, file picker, ordering, and removal controls",
  ),
  contentElementor: capture(
    "content-gate-elementor-tab.png",
    "Elementor content gating",
    "shows the supported Elementor gating workflow and its step-by-step guidance",
  ),
  contentShortcode: capture(
    "content-gate-shortcode-tab.png",
    "Shortcode content gating",
    "opens the shortcode section with supported syntax, setup steps, and examples",
  ),
  contentProgrammatic: capture(
    "content-gate-programmatic-tab.png",
    "Programmatic content gating",
    "opens the PHP integration section and its implementation examples",
  ),
  loginSettings: capture(
    "login-limit-settings.png",
    "Multi-login prevention",
    "shows the global session cap, administrator exception, and rule list",
  ),
  loginRule: capture(
    "login-limit-rule-expanded.png",
    "Login-limit rule",
    "adds an expanded rule with nested eligibility conditions and its per-rule session limit",
  ),
  profileOverview: capture(
    "profile-builder-overview.png",
    "Profile Builder overview",
    "shows the avatar and custom-profile-field modules before their nested settings are enabled",
  ),
  profileAvatar: capture(
    "profile-avatar-fields-expanded.png",
    "Avatar and profile-field controls",
    "enables both modules to reveal upload size, file types, and the custom-field repeater",
  ),
  profileFieldRepeater: capture(
    "profile-custom-field-repeater.png",
    "Custom profile-field repeater",
    "adds a custom field row with ordering, enable, expand, and delete controls",
  ),
  profileFieldDetails: capture(
    "profile-custom-field-details-expanded.png",
    "Custom profile-field details",
    "expands the nested row to reveal label, key, type, placeholder, help text, and required status",
  ),
  profileFieldTypes: capture(
    "profile-field-types-open.png",
    "Profile-field type options",
    "opens text, textarea, select, date, checkbox, and file-upload field types",
  ),
  myAccountOverview: capture(
    "my-account-builder-overview.png",
    "My Account menu builder",
    "shows the customer-account menu customization switch before the item repeater is enabled",
  ),
  myAccountRepeater: capture(
    "my-account-menu-repeater.png",
    "My Account menu repeater",
    "enables the builder to reveal draggable, disableable, expandable menu items and the custom-item action",
  ),
  myAccountItem: capture(
    "my-account-item-expanded.png",
    "My Account item details",
    "expands a menu item so its editable label appears within the ordered list",
  ),
  memberStyling: capture(
    "member-styling-rule-expanded.png",
    "Member Styling rule",
    "adds a rule with nested conditions, CSS classes, custom CSS, and delayed activation",
  ),
  cartInfo: capture(
    "cart-info-editor-overview.png",
    "Cart information editor",
    "shows controls for first-cycle, shipping-charge, and duration information in the cart",
  ),
  createSubscription: capture(
    "subscription-create-product-details.png",
    "Create-subscription form",
    "shows product selection, quantity, recurring price, cadence, length, fee, and trial controls",
  ),
  createBillingPeriod: capture(
    "subscription-create-billing-period-open.png",
    "Manual billing-period choices",
    "opens day, week, month, year, and lifetime options on the administrator creation form",
  ),
  createRenewalPrice: capture(
    "subscription-create-renewal-price-expanded.png",
    "Different renewal price",
    "enables the nested renewal-price and payment-threshold fields on the creation form",
  ),
  createAddresses: capture(
    "subscription-create-address-fields.png",
    "Subscription billing and shipping",
    "scrolls through the billing and shipping address fields before the subscription is created",
  ),
  emailList: capture(
    "subscription-email-list-expanded.png",
    "Subscription email notifications",
    "scrolls to the ArraySubs customer and administrator notifications registered in WooCommerce",
  ),
  emailTemplate: capture(
    "subscription-email-template-settings.png",
    "Subscription email template",
    "opens a notification with enable, subject, heading, placeholders, additional content, format, and template controls",
  ),
  reportsDirectory: capture(
    "reports-overview-dashboard.png",
    "Reports directory",
    "maps performance, retention, revenue, subscription, member, credit, audit, gateway, and job reports",
  ),
  reportsPerformance: capture(
    "reports-performance-dashboard.png",
    "Performance analytics dashboard",
    "opens the WooCommerce analytics surface used for recurring-revenue and subscription performance reporting",
  ),
  retentionAnalytics: capture(
    "retention-analytics-summary.png",
    "Retention analytics",
    "shows date and product filters, cancellation KPIs, reason and outcome charts, trends, and activity",
  ),
  auditLog: capture(
    "activity-audit-log.png",
    "Activity audit trail",
    "shows author, entity, date, and search filters above the subscription activity log",
  ),
  auditFilter: capture(
    "activity-audit-author-filter-open.png",
    "Audit author filter",
    "opens System, Admin, Customer, and Gateway author choices for tracing changes",
  ),
  gatewayHealth: capture(
    "gateway-health-settings.png",
    "Gateway health and webhook log",
    "shows gateway health cards, gateway and event filters, and recent webhook processing",
  ),
  scheduledJobs: capture(
    "scheduled-job-logs.png",
    "Scheduled-job monitor",
    "shows dated renewal and maintenance jobs with success status and execution details",
  ),
} as const;

type ScreenshotKey = keyof typeof SCREENSHOTS;

export function screenshotsForRecipe(recipe: Recipe): RecipeScreenshot[] {
  const text = recipeSearchText(recipe);
  const identity = [recipe.slug, recipe.name, recipe.h1]
    .join(" ")
    .toLowerCase()
    .replace(/[-_]/g, " ");
  const slugText = recipe.slug.replace(/[-_]/g, " ").toLowerCase();
  const keys: ScreenshotKey[] = [];
  const add = (...items: ScreenshotKey[]) => {
    for (const item of items) {
      if (!keys.includes(item)) keys.push(item);
    }
  };
  const prioritize = (...items: ScreenshotKey[]) => {
    for (const item of [...items].reverse()) {
      const existingIndex = keys.indexOf(item);
      if (existingIndex >= 0) keys.splice(existingIndex, 1);
      keys.unshift(item);
    }
  };

  if (
    /(multi subs|one subscription|one sub auto migrate|subscriptions only checkout)/.test(
      identity,
    )
  ) {
    prioritize("generalMultiple", "generalOverview", "generalCustomerActions");
  }

  if (
    /(coupon|promo code|welcome 15|half off 3 months|lifetime recurring 10|fixed amount first order|influencer recurring)/.test(
      identity,
    )
  ) {
    add(
      "couponOverview",
      "couponDuration",
      "couponDurationOpen",
      "couponRestrictions",
      "couponLimits",
    );
  }

  if (
    /(checkout builder|custom checkout|checkout field|multi step checkout)/.test(
      identity,
    )
  ) {
    add(
      "checkoutEntry",
      "checkoutCanvas",
      "checkoutFieldPanel",
      "checkoutDesign",
      "checkoutStep",
      "checkoutSettings",
    );
  }

  if (/(skip|pause)/.test(identity)) {
    add("skipRenewal", "pauseSubscription", "pauseAccess");
  }

  if (/(fixed|limited|lifetime|end date|number of cycles)/.test(slugText)) {
    add("productSchedule", "productFixedEnd", "productBillingPeriod");
  }

  if (
    /(trial|signup fee|sign up fee|billing period|billing interval|shipping)/.test(
      slugText,
    )
  ) {
    add(
      "productOverview",
      "productSchedule",
      "productBillingPeriod",
      "generalTrialAccount",
    );
  }

  if (
    /(different renewal price|intro pricing|price increase|loss leader)/.test(
      slugText,
    )
  ) {
    add("productSchedule", "createRenewalPrice", "productOverview");
  }

  if (
    /(feature manager|feature value|feature gated|plan feature|whats included|compare tiers|usage limits metering)/.test(
      identity,
    )
  ) {
    add(
      "featureSettings",
      "productFeature",
      "productFeatureModal",
      "featureComparison",
    );
  }

  if (
    /(plan switch|upgrade|downgrade|crossgrade|prorat|switch fee|linked products)/.test(
      identity,
    )
  ) {
    add(
      "productLinked",
      "planOverview",
      "planProration",
      "planAutoDowngrade",
      "planRounding",
    );
  }

  if (
    /(store credit|credit balance|credit purchase|credit history|wallet|prepaid credit|promo credit|credit bonus|auto apply credit)/.test(
      identity,
    )
  ) {
    add("storeCredit", "generalCustomerActions", "auditLog");
  }

  if (/(refund|prorated refund)/.test(identity)) {
    prioritize("refunds", "generalCustomerActions", "auditLog");
  }

  if (/(email|notification|reminder)/.test(identity)) {
    add("emailList", "emailTemplate", "auditLog", "scheduledJobs");
  }

  if (
    /(admin bar|wp admin|wordpress login|login as user|login as customer|toolkit|admin dashboard)/.test(
      identity,
    )
  ) {
    add("toolkitOverview", "toolkitRedirect", "toolkitRoles");
  }

  if (/(download)/.test(identity)) {
    add(
      "memberAccessOverview",
      "downloadRule",
      "downloadFile",
      "accessNested",
      "contentShortcode",
    );
  }

  if (/(url prefix|url regex|url rule|regex gating|lockdown)/.test(identity)) {
    add(
      "memberAccessOverview",
      "urlRule",
      "urlMatch",
      "urlPriority",
      "accessNested",
    );
  }

  if (
    /(paywall|category|specific pages|post type|archive teaser|drip course)/.test(
      identity,
    )
  ) {
    add(
      "memberAccessOverview",
      "cptRule",
      "cptScope",
      "cptArchive",
      "accessNested",
    );
  }

  if (/(catalog|hide products|shop access)/.test(identity)) {
    add(
      "memberAccessOverview",
      "shopRule",
      "shopScope",
      "shopAction",
      "accessNested",
    );
  }

  if (
    /(member pricing|cart discount|discount rule|spend-based)/.test(identity)
  ) {
    add(
      "memberAccessOverview",
      "discountRule",
      "discountTypes",
      "discountNested",
      "accessNested",
    );
  }

  if (/(role mapping|tiered roles)/.test(identity)) {
    add("memberAccessOverview", "roleMapping", "accessNested", "discountTypes");
  }

  if (/(shortcode|elementor|inline content|programmatic)/.test(identity)) {
    add(
      "contentElementor",
      "contentShortcode",
      "contentProgrammatic",
      "accessNested",
    );
  }

  if (
    /(login personalization|session limit|login limit|multi login|concurrent login)/.test(
      identity,
    )
  ) {
    add("loginSettings", "loginRule", "roleMapping", "accessNested");
  }

  if (/(custom profile|avatar|profile field|member 360)/.test(identity)) {
    add(
      "profileOverview",
      "profileAvatar",
      "profileFieldRepeater",
      "profileFieldDetails",
      "profileFieldTypes",
    );
  }

  if (/(my account|custom pages|account menu)/.test(identity)) {
    add(
      "myAccountOverview",
      "myAccountRepeater",
      "myAccountItem",
      "profileOverview",
    );
  }

  if (
    /(customer portal|self service|update payment|update shipping|auto renew)/.test(
      identity,
    )
  ) {
    add(
      "generalCustomerActions",
      "createSubscription",
      "createRenewalPrice",
      "createAddresses",
      "cartInfo",
    );
    prioritize(
      "generalCustomerActions",
      "createSubscription",
      "createRenewalPrice",
      "createAddresses",
      "cartInfo",
    );
  }

  if (/(gateway health|webhook|stripe|paypal|paddle)/.test(identity)) {
    add("gatewayHealth", "auditLog", "scheduledJobs", "reportsDirectory");
  }

  if (/(scheduled job|job monitor|renewal monitor)/.test(identity)) {
    add("scheduledJobs", "auditLog", "gatewayHealth", "reportsDirectory");
  }

  if (/(audit trail|activity audit)/.test(identity)) {
    add("auditLog", "auditFilter", "scheduledJobs", "gatewayHealth");
  }

  if (
    /(retention analytics|churn|cancellation reason|offer performance)/.test(
      slugText,
    )
  ) {
    add(
      "retentionAnalytics",
      "retentionOverview",
      "retentionReason",
      "retentionDiscountReasons",
    );
  }

  switch (recipe.group) {
    case "recurring-billing":
      add(
        "productOverview",
        "productSchedule",
        "generalOverview",
        "generalRenewal",
        "generalCustomerActions",
        "scheduledJobs",
      );
      break;
    case "retention-coupons":
      add(
        "retentionOverview",
        "retentionReason",
        "retentionReasonRepeater",
        "retentionDiscountReasons",
        "retentionPause",
        "retentionContact",
        "retentionAnalytics",
      );
      if (
        !/(coupon|welcome 15|half off|lifetime recurring|fixed amount|influencer recurring)/.test(
          identity,
        )
      ) {
        if (/pause/.test(identity)) {
          prioritize("retentionOverview", "retentionPause", "retentionReason");
        } else if (/contact support/.test(identity)) {
          prioritize(
            "retentionOverview",
            "retentionContact",
            "retentionReason",
          );
        } else if (/downgrade/.test(identity)) {
          prioritize("retentionOverview", "productLinked", "planAutoDowngrade");
        } else {
          prioritize(
            "retentionOverview",
            "retentionReason",
            "retentionDiscountReasons",
          );
        }
      }
      break;
    case "plan-switching-features":
      add(
        "productLinked",
        "planOverview",
        "planProration",
        "planAutoDowngrade",
        "planRounding",
        "storeCredit",
      );
      break;
    case "manage-subscriptions":
      add(
        "createSubscription",
        "createBillingPeriod",
        "createRenewalPrice",
        "createAddresses",
        "generalCustomerActions",
        "auditLog",
      );
      break;
    case "member-restrictions":
      add(
        "memberAccessOverview",
        "roleMapping",
        "accessNested",
        "contentElementor",
        "contentShortcode",
        "contentProgrammatic",
      );
      break;
    case "membership-modules":
      add(
        "profileOverview",
        "profileAvatar",
        "profileFieldDetails",
        "myAccountRepeater",
        "generalCustomerActions",
        "emailTemplate",
      );
      break;
    case "analytics-growth":
      add(
        "reportsDirectory",
        "reportsPerformance",
        "retentionAnalytics",
        "auditLog",
        "scheduledJobs",
        "gatewayHealth",
      );
      if (/scheduled job/.test(identity)) {
        prioritize(
          "scheduledJobs",
          "auditLog",
          "gatewayHealth",
          "reportsDirectory",
        );
      } else if (/gateway health/.test(identity)) {
        prioritize(
          "gatewayHealth",
          "auditLog",
          "scheduledJobs",
          "reportsDirectory",
        );
      } else if (/activity audit/.test(identity)) {
        prioritize("auditLog", "auditFilter", "scheduledJobs", "gatewayHealth");
      } else if (/retention analytics/.test(identity)) {
        prioritize(
          "retentionAnalytics",
          "reportsDirectory",
          "retentionOverview",
          "retentionReason",
        );
      } else if (!/coupon/.test(identity)) {
        prioritize("reportsDirectory", "reportsPerformance");
      }
      break;
    default:
      add("generalOverview", "productOverview", "auditLog");
  }

  add("generalOverview", "productOverview", "reportsDirectory");

  return keys.slice(0, 6).map((key) => SCREENSHOTS[key]);
}

export function uniqueLocations(recipe: Recipe): string[] {
  return Array.from(
    new Set(
      recipe.settings
        .map((row) => row.where)
        .filter((where): where is string => Boolean(where)),
    ),
  );
}

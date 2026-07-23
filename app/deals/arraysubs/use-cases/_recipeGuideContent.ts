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

export function screenshotForRecipe(recipe: Recipe): RecipeScreenshot {
  const text = recipeSearchText(recipe);
  const identity = [recipe.slug, recipe.name, recipe.h1]
    .join(" ")
    .toLowerCase();

  if (/(coupon|promo code|discount duration|renewal cycles)/.test(text)) {
    return {
      src: "/recipes/settings/subscription-coupon-settings.png",
      alt: "WooCommerce coupon settings with ArraySubs subscription duration and renewal-cycle controls",
      title: "Subscription coupon settings",
      caption:
        "The staging coupon editor shows the subscription toggle, recurring duration, and renewal-cycle controls used by coupon recipes.",
    };
  }

  if (recipe.group === "retention-coupons") {
    return {
      src: "/recipes/settings/retention-flow-settings.png",
      alt: "ArraySubs Retention Flow settings on the staging site",
      title: "Retention Flow settings",
      caption:
        "The staging Retention Flow screen shows cancellation reasons and the discount, pause, downgrade, and contact-support offer controls.",
    };
  }

  if (recipe.group === "analytics-growth") {
    return {
      src: "/recipes/settings/reports-dashboard.png",
      alt: "ArraySubs Reports directory on the staging site",
      title: "Reports and operational monitoring",
      caption:
        "The staging Reports directory maps performance, retention, revenue, audit, job, and gateway views in one place.",
    };
  }

  if (/(checkout builder|custom checkout|checkout field|multi-step checkout)/.test(text)) {
    return {
      src: "/recipes/settings/checkout-builder-settings.png",
      alt: "ArraySubs Checkout Builder settings on the staging site",
      title: "Checkout Builder settings",
      caption:
        "The staging settings screen shows how custom checkout data is copied to orders, subscriptions, and renewals.",
    };
  }

  if (/(email|notification|reminder)/.test(identity)) {
    return {
      src: "/recipes/settings/subscription-email-settings.png",
      alt: "ArraySubs subscription email notifications in WooCommerce settings",
      title: "Subscription email settings",
      caption:
        "The staging email screen lists the customer and administrator notifications registered by ArraySubs.",
    };
  }

  if (/(store credit|credit balance|credit purchase|credit history|wallet)/.test(text)) {
    return {
      src: "/recipes/settings/store-credit-settings.png",
      alt: "ArraySubs Store Credit settings on the staging site",
      title: "Store Credit settings",
      caption:
        "The staging Store Credit screen shows renewal application, checkout use, expiration, and credit-purchase controls.",
    };
  }

  if (
    /(plan switch|upgrade|downgrade|crossgrade|prorat|switch fee|linked products)/.test(
      text,
    )
  ) {
    return {
      src: "/recipes/settings/plan-switching-settings.png",
      alt: "ArraySubs Plan Switching settings on the staging site",
      title: "Plan Switching settings",
      caption:
        "The staging Plan Switching screen shows allowed paths, customer self-service, proration, fees, and auto-downgrade controls.",
    };
  }

  if (
    /(member access|content gate|restrict|gated|paywall|role mapping|download|shortcode|elementor|login limit|session limit|url prefix|regex)/.test(
      text,
    )
  ) {
    return {
      src: "/recipes/settings/member-access-rules.png",
      alt: "ArraySubs Member Access rule builder on the staging site",
      title: "Member Access rule builder",
      caption:
        "The staging rule builder shows the condition, target, and behavior structure used by access-control recipes.",
    };
  }

  if (
    /(profile|avatar|my account|customer portal|member 360|member insight|shipping address|payment method)/.test(
      text,
    )
  ) {
    return {
      src: "/recipes/settings/member-profile-settings.png",
      alt: "ArraySubs member profile settings on the staging site",
      title: "Member profile settings",
      caption:
        "The staging Profile Builder screen shows the member-avatar and custom-profile-field configuration area.",
    };
  }

  if (
    /(report|analytics|mrr|growth|leaderboard|retention insight|audit|scheduled job|gateway health|metric)/.test(
      text,
    )
  ) {
    return {
      src: "/recipes/settings/reports-dashboard.png",
      alt: "ArraySubs Reports directory on the staging site",
      title: "Reports and operational monitoring",
      caption:
        "The staging Reports directory maps performance, retention, revenue, audit, job, and gateway views in one place.",
    };
  }

  if (
    /(admin bar|wp-admin|wordpress login|login as user|login as customer|toolkit|admin dashboard)/.test(
      text,
    )
  ) {
    return {
      src: "/recipes/settings/admin-toolkit-settings.png",
      alt: "ArraySubs administrator toolkit settings on the staging site",
      title: "Administrator toolkit settings",
      caption:
        "The staging Toolkit screen contains admin-bar, dashboard-access, login-page, and login-as-user controls.",
    };
  }

  if (
    /(multiple subscriptions|grace period|renewal|customer action|automatic payment|trial payment method|mixed checkout)/.test(
      text,
    )
  ) {
    return {
      src: "/recipes/settings/general-subscription-settings.png",
      alt: "ArraySubs general subscription settings on the staging site",
      title: "General subscription settings",
      caption:
        "The staging General screen shows the store-wide subscription, checkout, trial, recovery, and customer-action controls.",
    };
  }

  if (recipe.group === "manage-subscriptions") {
    return {
      src: "/recipes/settings/admin-toolkit-settings.png",
      alt: "ArraySubs administrator toolkit settings on the staging site",
      title: "Administrator toolkit settings",
      caption:
        "The staging Toolkit screen is one of the central configuration surfaces for administrator and account workflows.",
    };
  }

  if (recipe.group === "member-restrictions") {
    return {
      src: "/recipes/settings/member-access-rules.png",
      alt: "ArraySubs Member Access rule builder on the staging site",
      title: "Member Access rule builder",
      caption:
        "The staging rule builder shows how ArraySubs combines eligibility conditions with protected targets and access behavior.",
    };
  }

  if (recipe.group === "membership-modules") {
    return {
      src: "/recipes/settings/member-profile-settings.png",
      alt: "ArraySubs member profile settings on the staging site",
      title: "Member profile settings",
      caption:
        "The staging Profile Builder is one of the member-experience settings surfaces used by these recipes.",
    };
  }

  return {
    src: "/recipes/settings/subscription-product-settings.png",
    alt: "ArraySubs subscription product settings on the staging site",
    title: "Subscription product settings",
    caption:
      "The staging product editor shows the recurring interval, length, trial, fee, and related subscription controls.",
  };
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

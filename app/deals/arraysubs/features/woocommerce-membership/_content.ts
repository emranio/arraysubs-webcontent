export const MEMBERSHIP_MODELS = [
  {
    label: "Free access",
    title: "A useful free tier",
    description:
      "Qualify people by account, role, purchase, or another access condition, then reserve paid value for the upgrade path.",
  },
  {
    label: "Recurring",
    title: "Monthly or annual",
    description:
      "Collect ongoing membership fees with simple or variable subscription products, trials, signup fees, and plan switching.",
  },
  {
    label: "Fixed length",
    title: "A defined term",
    description:
      "Run a set number of daily, weekly, monthly, or yearly billing cycles, then let the membership end automatically.",
  },
  {
    label: "Fixed date · Pro",
    title: "Cohorts and seasons",
    description:
      "End every membership on the same calendar date for annual clubs, school cohorts, licensing windows, or seasons.",
  },
  {
    label: "One payment",
    title: "Lifetime access",
    description:
      "Sell a lifetime deal that still participates in member access rules without generating renewal invoices.",
  },
] as const;

export const FREE_MEMBERSHIP_FEATURES = [
  "Simple and variable subscription products with manual renewal invoices",
  "Eight access condition types with nested AND/OR rule groups",
  "Page, post, custom post type, URL, shop, download, and partial-content restriction",
  "Content dripping, automatic member discounts, and WordPress role mapping",
  "Customer portal actions for cancel, pause, resume, skip, switch, and invoice payment",
  "Retention flow, lifecycle emails, subscription administration, exports, and notes",
] as const;

export const PRO_MEMBERSHIP_FEATURES = [
  "Automatic off-session renewals through Stripe, PayPal, and Paddle",
  "Per-plan feature entitlements and numeric allowance checks",
  "Fixed-date membership periods and customer-chosen subscription duration",
  "Concurrent-login limits with plan-level overrides",
  "Portal payment-method, auto-renew, and shipping-address updates",
  "Member Insight, automatic payment retry, auto-downgrade, and deeper analytics",
] as const;

export const FAQ_ITEMS = [
  {
    question: "What is a WooCommerce membership plugin?",
    answer:
      "A WooCommerce membership plugin turns a customer record, purchase, subscription, role, or other qualifying fact into access and benefits. It decides who can reach protected content, products, downloads, discounts, or member areas, and it keeps those decisions aligned as the membership changes state.",
  },
  {
    question: "Does WooCommerce include membership features by itself?",
    answer:
      "WooCommerce supplies products, checkout, orders, customers, and account pages, but it does not provide a complete membership rule engine in its core plugin. ArraySubs adds membership plans, access conditions, content and shop restrictions, dripping, protected downloads, role mapping, and member self-service around that WooCommerce foundation.",
  },
  {
    question:
      "Can I create recurring memberships without a separate subscription plugin?",
    answer:
      "Yes. ArraySubs creates simple and variable subscription products and connects their lifecycle directly to membership access. The free core supports renewal invoices that customers pay manually; ArraySubs Pro adds automatic off-session billing through Stripe, PayPal, and Paddle.",
  },
  {
    question: "Is ArraySubs membership access really free?",
    answer:
      "Yes. The free core includes eight access condition types, nested AND/OR groups, page and custom-post-type restriction, URL rules, partial-content gates, dripping, protected downloads, shop and product rules, member discounts, and role mapping. Pro adds feature-entitlement conditions and concurrent-login controls.",
  },
  {
    question:
      "Can I create free, paid, fixed-term, and lifetime membership tiers?",
    answer:
      "Yes. Use roles or other access conditions for free entry, subscription products for recurring or fixed-cycle access, and lifetime deals for one-payment access. ArraySubs Pro adds fixed-date plans for cohorts and annual membership windows, plus customer-chosen duration options.",
  },
  {
    question: "Can I restrict only part of a WordPress page?",
    answer:
      "Yes. Keep the public introduction and upgrade message visible, then gate only the premium section. ArraySubs supports partial restriction through its Gutenberg block, Elementor Container controls, and shortcodes, with a custom denial message or teaser for visitors who do not qualify.",
  },
  {
    question: "Does content restriction work with Gutenberg and Elementor?",
    answer:
      "Yes. Gutenberg has block-level ArraySubs restriction controls, and Elementor Containers get native access controls in the editor. Both use the same membership conditions as page, URL, download, discount, and shop rules, so the policy stays consistent across the site.",
  },
  {
    question:
      "Can products stay visible but be purchasable only by members?",
    answer:
      "Yes. A product can remain public for discovery while its purchase action is restricted to qualifying members. ArraySubs applies the rule beyond the product page, including add-to-cart, cart, checkout, and WooCommerce Store API flows, so a direct request cannot skip the access decision.",
  },
  {
    question: "Can I drip content and protect member downloads?",
    answer:
      "Yes. Release pages, custom post types, partial sections, and downloads by days since joining or on a fixed date. Qualifying files can appear in WooCommerce My Account and use verified delivery links; sensitive source files still need an appropriately private origin or server configuration.",
  },
  {
    question: "Can members pause, switch, or cancel from My Account?",
    answer:
      "Yes. The free customer portal can expose cancel with undo, reactivate, pause, resume, skip next renewal, plan switching, and pending-invoice payment. Store settings control which actions appear. Pro adds payment-method updates, an auto-renew toggle, and shipping-address changes.",
  },
  {
    question: "What happens to access when a membership payment fails?",
    answer:
      "ArraySubs can keep access active through a configured grace period while the customer receives a renewal path. Pro can retry supported automatic payments and move a member to a fallback plan when recovery fails. Your access policy should define exactly when grace ends and restrictions resume.",
  },
  {
    question: "How can I discourage membership account sharing?",
    answer:
      "ArraySubs Pro can limit concurrent sessions per account and apply plan-level overrides. Use the least restrictive policy that protects the offer, publish it before purchase, and provide a recovery path for legitimate households or customers who replace devices.",
  },
  {
    question:
      "What is the difference between a WooCommerce membership and a subscription?",
    answer:
      "A subscription is a billing and lifecycle agreement; a membership is an access entitlement. You can have either one without the other. ArraySubs connects them when recurring payment status should control content, products, discounts, downloads, or services, while still supporting one-time and lifetime membership models.",
  },
] as const;

import type { NextConfig } from "next";

type PermanentRedirect = {
  source: string;
  destination: string;
  statusCode: 301;
};

const permanentRedirect = (
  source: string,
  destination: string,
): PermanentRedirect => ({
  source,
  destination,
  statusCode: 301,
});

const legacyFeaturePillars = {
  "admin-bar-visibility": "profile-builder",
  "admin-dashboard-access": "profile-builder",
  "billing-and-renewals": "billing-renewals-and-refunds",
  "checkout-and-payments": "payment-gateways",
  coupons: "subscriptions-and-recurring-products",
  "easy-setup-wizard": "easy-setup",
  "gateway-health": "payment-gateways",
  "login-as-user": "profile-builder",
  "member-access": "member-access-control",
  "member-insight": "manage-subscriptions",
  "multi-login-prevention": "customer-portal",
  "redirect-product-page": "checkout-builder",
  "retention-analytics": "analytics",
  "retention-and-refunds": "retention-flow-builder",
  shortcodes: "profile-builder",
  "subscription-notes": "audits-and-logs",
  "subscription-products": "subscriptions-and-recurring-products",
  "subscription-shipping": "subscriptions-and-recurring-products",
  "wordpress-login-page": "profile-builder",
} as const;

const legacyFeatureRedirects = Object.entries(legacyFeaturePillars).flatMap(
  ([legacySlug, pillarSlug]) => [
    permanentRedirect(
      `/deals/arraysubs/features/${legacySlug}`,
      `/product/arraysubs/features/${pillarSlug}/`,
    ),
    permanentRedirect(
      `/product/arraysubs/features/${legacySlug}`,
      `/product/arraysubs/features/${pillarSlug}/`,
    ),
  ],
);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true,
  // Custom redirects run before Proxy. Disabling Next's priority slash rule
  // lets slashless legacy URLs go straight to their final destination; Proxy
  // restores the site's permanent trailing-slash policy for all other pages.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      // The former resources tree moved to the article archive, category
      // archives, and top-level article paths rather than under /product/.
      permanentRedirect(
        "/deals/arraysubs/resources/:category/:slug",
        "/:category/:slug/",
      ),
      permanentRedirect(
        "/product/arraysubs/resources/:category/:slug",
        "/:category/:slug/",
      ),
      permanentRedirect(
        "/deals/arraysubs/resources/:category",
        "/articles/:category/",
      ),
      permanentRedirect(
        "/product/arraysubs/resources/:category",
        "/articles/:category/",
      ),
      permanentRedirect("/deals/arraysubs/resources", "/articles/"),
      permanentRedirect("/product/arraysubs/resources", "/articles/"),

      // Checkout moved out of the product namespace before the main migration.
      permanentRedirect(
        "/deals/arraysubs/checkout/:planId",
        "/checkout/:planId/",
      ),
      permanentRedirect(
        "/product/arraysubs/checkout/:planId",
        "/checkout/:planId/",
      ),

      // Retired granular feature pages now consolidate into evergreen pillars.
      ...legacyFeatureRedirects,

      // Namespace redirects must precede the generic /deals/** migration rule.
      permanentRedirect("/deals", "/product/arraysubs/"),
      permanentRedirect("/deals/:path*", "/product/:path*/"),
      {
        source: "/arraysubs/compare/yith-membership",
        destination:
          "/product/arraysubs/alternatives/yith-woocommerce-membership/",
        statusCode: 301,
      },
      {
        source: "/arraysubs/features/payment-gateways",
        destination: "/product/arraysubs/features/payment-gateways/",
        statusCode: 301,
      },
      {
        source: "/arraysubs/changelog",
        destination: "/changelog/",
        statusCode: 301,
      },
      {
        source: "/arraysubs",
        destination: "/product/arraysubs/",
        statusCode: 301,
      },
      {
        source: "/pricing",
        destination: "/product/arraysubs/pricing/",
        statusCode: 301,
      },
      {
        source: "/refund-policy",
        destination: "/trust-center/refund-policy/",
        statusCode: 301,
      },
      {
        source: "/arraysubs/use-cases/service-businesses",
        destination: "/product/arraysubs/use-cases/service-businesses/",
        statusCode: 301,
      },
      {
        source: "/data-safety",
        destination: "/trust-center/data-safety/",
        statusCode: 301,
      },
    ];
  },
  images: {
    unoptimized: true,
  },
  sassOptions: {
    // Allow `@use "styles/mixins" as *;` from any SCSS module without long relative paths.
    silenceDeprecations: ["legacy-js-api"],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true,
  async redirects() {
    return [
      {
        source:
          "/deals/arraysubs/resources/membership-strategy/woocommerce-content-restriction-strategy/",
        destination:
          "/membership-strategy/woocommerce-content-restriction-strategy/",
        statusCode: 301,
      },
      {
        source:
          "/deals/arraysubs/resources/retention-and-churn/subscription-save-offers-compared-discount-pause-skip-or-downgrade/",
        destination:
          "/retention-and-churn/subscription-save-offers-compared-discount-pause-skip-or-downgrade/",
        statusCode: 301,
      },
      {
        source: "/arraysubs/compare/yith-membership/",
        destination:
          "/deals/arraysubs/alternatives/yith-woocommerce-membership/",
        statusCode: 301,
      },
      {
        source: "/arraysubs/features/payment-gateways/",
        destination: "/deals/arraysubs/features/payment-gateways/",
        statusCode: 301,
      },
      {
        source: "/arraysubs/changelog/",
        destination: "/changelog/",
        statusCode: 301,
      },
      {
        source: "/arraysubs/",
        destination: "/deals/arraysubs/",
        statusCode: 301,
      },
      {
        source: "/refund-policy/",
        destination: "/trust-center/refund-policy/",
        statusCode: 301,
      },
      {
        source: "/arraysubs/use-cases/service-businesses/",
        destination: "/deals/arraysubs/use-cases/service-businesses/",
        statusCode: 301,
      },
      {
        source: "/data-safety/",
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

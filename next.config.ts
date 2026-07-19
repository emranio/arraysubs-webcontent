import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true,
  async redirects() {
    return [
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

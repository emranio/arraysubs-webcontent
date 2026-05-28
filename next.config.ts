import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  sassOptions: {
    // Allow `@use "styles/mixins" as *;` from any SCSS module without long relative paths.
    silenceDeprecations: ["legacy-js-api"],
  },
};

export default nextConfig;

import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

export default function sitemap() {
  return [
    {
      url: siteConfig.siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}

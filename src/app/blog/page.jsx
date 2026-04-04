import { buildMetadata } from "@/lib/seo";
import BlogMainLayout from "@/layouts/blog/BlogMainLayout";

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Guides, tutorials, and news about WooCommerce subscriptions and memberships.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <BlogMainLayout>
      <h1>Blog</h1>
      <p>Blog index — coming soon.</p>
    </BlogMainLayout>
  );
}

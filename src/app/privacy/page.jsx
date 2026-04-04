import { buildMetadata, Schema } from "@/lib/seo";
import SchemaScript from "@/components/SchemaScript";
import DefaultLayout from "@/layouts/page/DefaultLayout";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "ArraySubs privacy policy — how we collect, use, and protect your data.",
  path: "/privacy",
  noIndex: true,
});

export default function PrivacyPage() {
  return (
    <DefaultLayout title="Privacy Policy" breadcrumbs={[{ label: "Privacy" }]}>
      <SchemaScript
        schema={Schema.breadcrumb([
          { name: "Home", url: "/" },
          { name: "Privacy Policy" },
        ])}
      />
      <p>Privacy policy content goes here.</p>
    </DefaultLayout>
  );
}

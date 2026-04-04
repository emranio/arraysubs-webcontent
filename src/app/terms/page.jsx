import { buildMetadata, Schema } from "@/lib/seo";
import SchemaScript from "@/components/SchemaScript";
import DefaultLayout from "@/layouts/page/DefaultLayout";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: "ArraySubs terms of service and usage conditions.",
  path: "/terms",
  noIndex: true,
});

export default function TermsPage() {
  return (
    <DefaultLayout title="Terms of Service" breadcrumbs={[{ label: "Terms" }]}>
      <SchemaScript
        schema={Schema.breadcrumb([
          { name: "Home", url: "/" },
          { name: "Terms of Service" },
        ])}
      />
      <p>Terms of service content goes here.</p>
    </DefaultLayout>
  );
}

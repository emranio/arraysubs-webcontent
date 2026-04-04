import { buildSchemaMarkup } from "@/lib/seo";

export default function SchemaScript({ schema }) {
  if (!schema) return null;
  const json = buildSchemaMarkup(schema);
  if (!json) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

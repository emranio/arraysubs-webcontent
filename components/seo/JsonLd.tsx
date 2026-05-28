/**
 * Renders a JSON-LD <script> for structured data (rich snippets, GEO/AEO).
 * Accepts a single schema object or an array (emits one script tag each).
 *
 *   <JsonLd data={[organizationSchema(), websiteSchema()]} />
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Structured data is generated server-side from trusted constants.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}

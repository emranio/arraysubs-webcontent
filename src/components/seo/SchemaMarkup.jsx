export default function SchemaMarkup({ schema }) {
  const schemas = Array.isArray(schema) ? schema : schema ? [schema] : [];

  if (!schemas.length) {
    return null;
  }

  return schemas.map((item, index) => (
    <script
      key={`schema-${index}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
    />
  ));
}

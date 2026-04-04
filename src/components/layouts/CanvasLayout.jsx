import SchemaMarkup from "@/components/seo/SchemaMarkup";

export default function CanvasLayout({ children, schema }) {
  return (
    <>
      <SchemaMarkup schema={schema} />
      <main id="main-content" className="layout layout--canvas">
        {children}
      </main>
    </>
  );
}

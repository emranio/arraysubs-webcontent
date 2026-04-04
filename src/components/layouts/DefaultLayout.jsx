import Link from "next/link";
import SchemaMarkup from "@/components/seo/SchemaMarkup";

export default function DefaultLayout({
  title,
  description,
  breadcrumbs = [],
  schema,
  children,
}) {
  const breadcrumbItems = [{ label: "Home", href: "/" }, ...breadcrumbs];

  return (
    <>
      <SchemaMarkup schema={schema} />

      <main id="main-content" className="layout layout--default">
        <section className="page-hero" aria-labelledby="page-title">
          <div className="site-shell">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <ol className="breadcrumbs__list">
                {breadcrumbItems.map((item, index) => (
                  <li
                    key={`${item.href || item.label}-${index}`}
                    className="breadcrumbs__item"
                  >
                    {item.href && index !== breadcrumbItems.length - 1 ? (
                      <Link href={item.href}>{item.label}</Link>
                    ) : (
                      <span aria-current="page">{item.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>

            <div className="page-hero__content">
              <h1 id="page-title" className="page-hero__title">
                {title}
              </h1>
              {description ? (
                <p className="page-hero__description">{description}</p>
              ) : null}
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="site-shell">{children}</div>
        </section>
      </main>
    </>
  );
}

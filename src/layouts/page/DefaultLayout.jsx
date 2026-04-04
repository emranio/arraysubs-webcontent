import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DefaultLayout({ title, breadcrumbs = [], children }) {
  return (
    <>
      <Header />
      <div className="layout-default__banner">
        <div className="layout-default__banner-inner">
          {breadcrumbs.length > 0 && (
            <nav aria-label="Breadcrumb">
              <ol className="layout-default__breadcrumb">
                <li>
                  <Link href="/">Home</Link>
                </li>
                {breadcrumbs.map((crumb, i) => (
                  <li key={i}>
                    {crumb.href ? (
                      <Link href={crumb.href}>{crumb.label}</Link>
                    ) : (
                      <span aria-current="page">{crumb.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          {title && <h1 className="layout-default__title">{title}</h1>}
        </div>
      </div>
      <main id="main-content" className="layout-default__body">
        {children}
      </main>
      <Footer />
    </>
  );
}

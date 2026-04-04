import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CategoryLayout({ title, children }) {
  return (
    <>
      <Header />
      <main id="main-content" className="layout-blog-category__body">
        {title && <h1 className="layout-blog-category__heading">{title}</h1>}
        {children}
      </main>
      <Footer />
    </>
  );
}

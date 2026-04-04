import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ArticleLayout({ children }) {
  return (
    <>
      <Header />
      <main id="main-content">
        <article className="layout-blog-article__body">{children}</article>
      </main>
      <Footer />
    </>
  );
}

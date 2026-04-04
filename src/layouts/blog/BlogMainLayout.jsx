import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function BlogMainLayout({ children }) {
  return (
    <>
      <Header />
      <main id="main-content" className="layout-blog-main__body">
        {children}
      </main>
      <Footer />
    </>
  );
}

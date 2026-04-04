import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CanvasLayout({ children }) {
  return (
    <>
      <Header />
      <main id="main-content" className="layout-canvas__body">
        {children}
      </main>
      <Footer />
    </>
  );
}

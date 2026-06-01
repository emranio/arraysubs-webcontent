import styles from "./500.module.css";

export default function Custom500() {
  return (
    <main className={styles.page}>
      <section className={styles.content}>
        <p className={styles.eyebrow}>Error</p>
        <h1 className={styles.title}>Something went wrong</h1>
        <p className={styles.copy}>
          The page could not load. Try again or return to the design system.
        </p>
        <a className={styles.link} href="/design-system/">
          Design System
        </a>
      </section>
    </main>
  );
}

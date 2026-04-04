import Link from "next/link";

export default function AnnouncementBar() {
  return (
    <div className="hp-announce">
      <span className="hp-announce__badge">Early Access</span>
      ArraySubs Pro is here — sign up now and get 4 months of Pro free.
      <Link href="/early-access/">Claim your free license &rarr;</Link>
    </div>
  );
}

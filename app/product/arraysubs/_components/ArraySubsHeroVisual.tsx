import {
  CreditCard,
  KeyRound,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";

const capabilities = [
  {
    label: "Recurring billing",
    icon: CreditCard,
    position: "top-[24%] left-0",
  },
  {
    label: "Member access",
    icon: KeyRound,
    position: "top-[40%] right-0",
  },
  {
    label: "Retention flows",
    icon: RefreshCcw,
    position: "bottom-[18%] left-0",
  },
] as const;

export function ArraySubsHeroVisual() {
  return (
    <figure className="relative mx-auto h-[11rem] w-full max-w-[32rem] overflow-hidden max-[23.999rem]:hidden sm:h-[16rem] md:h-[18rem] lg:h-[35rem] lg:overflow-visible">
      <div
        aria-hidden="true"
        className="absolute inset-y-2 left-1/2 w-[68%] -translate-x-1/2 rounded-2xl bg-dark sm:inset-y-5 lg:inset-y-0"
      />

      <div className="absolute inset-x-0 top-5 z-20 hidden text-center sm:top-8 sm:block lg:top-6">
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-normal text-on-dark-muted uppercase">
          <ShieldCheck className="size-4" aria-hidden="true" />
          One connected system
        </span>
      </div>

      <img
        src="/arraysubs-hero-engine.webp"
        alt="Subscription workflow connecting payments, member access, protected content, and retention"
        width="1024"
        height="1536"
        className="absolute inset-x-0 -top-5 z-10 mx-auto h-[13rem] w-auto object-contain sm:top-4 sm:h-[17rem] md:h-[19rem] lg:top-5 lg:h-[33rem]"
      />

      <div className="absolute inset-0 z-20 hidden lg:block" aria-hidden="true">
        {capabilities.map(({ label, icon: Icon, position }) => (
          <span
            key={label}
            className={`absolute ${position} inline-flex items-center gap-2 rounded-pill border border-border-strong bg-background px-4 py-2.5 text-sm font-semibold text-dark`}
          >
            <Icon className="size-4 text-primary" />
            {label}
          </span>
        ))}
      </div>

      <figcaption className="absolute inset-x-0 bottom-2 z-30 flex justify-center sm:bottom-5 lg:bottom-0">
        <span className="inline-flex items-center gap-2 rounded-pill border border-border-strong bg-highlight px-4 py-2.5 text-sm font-semibold text-dark">
          <span className="size-2 rounded-full bg-secondary" aria-hidden="true" />
          Built around WooCommerce
        </span>
      </figcaption>
    </figure>
  );
}

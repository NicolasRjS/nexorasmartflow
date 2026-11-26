import Link from "next/link";
import { useId, type ReactNode } from "react";
import { ConveyorBand } from "./ConveyorBand";

/** Navy hero used at the top of every inner page. Holds the page's single h1. */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  children?: ReactNode;
}) {
  return (
    <section className="on-dark relative overflow-hidden bg-navy text-white">
      <HeroGrid />
      <div className="container-x relative py-16 md:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold text-white md:text-5xl">{title}</h1>
        <p className="measure mt-5 text-lg text-white/85">{lead}</p>
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
      <ConveyorBand />
    </section>
  );
}

/** Faint rack lines behind dark heroes. Decorative only. */
export function HeroGrid() {
  const id = `grid-${useId().replace(/:/g, "")}`;
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]" aria-hidden="true">
      <defs>
        <pattern id={id} width="56" height="56" patternUnits="userSpaceOnUse">
          <path d="M56 0H0V56" fill="none" stroke="#35B7AA" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  id,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  id?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id} className="mt-2 text-3xl font-bold md:text-[2.15rem]">
        {title}
      </h2>
      <span className={`mt-4 block h-1 w-14 rounded-full bg-amber ${center ? "mx-auto" : ""}`} aria-hidden="true" />
      {lead && <p className={`mt-5 text-lg text-slate ${center ? "mx-auto measure" : "measure"}`}>{lead}</p>}
    </div>
  );
}

/** Dark call-to-action band that closes every page. */
export function CtaBand({
  title,
  text,
  primary,
  secondary,
}: {
  title: string;
  text: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="py-16 md:py-20" aria-labelledby="cta-title">
      <div className="container-x">
        <div className="on-dark relative overflow-hidden rounded-2xl bg-navy px-6 py-12 text-white md:px-12">
          <HeroGrid />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 id="cta-title" className="text-2xl font-bold text-white md:text-3xl">
                {title}
              </h2>
              <p className="mt-3 text-white/85">{text}</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link href={primary.href} className="btn btn-primary">
                {primary.label}
                <Arrow />
              </Link>
              {secondary && (
                <Link href={secondary.href} className="btn btn-outline-light">
                  {secondary.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Arrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Check({ className = "mt-1 h-5 w-5 shrink-0 text-deep" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="#E3F4F2" />
      <path
        d="M6 10.5l2.5 2.5L14 7.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Check />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

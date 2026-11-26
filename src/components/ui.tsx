import type { ReactNode } from "react";
import { titleCase } from "@/lib/titleCase";
import { Breadcrumbs } from "./nav/Breadcrumbs";

export type HeroTone = "navy" | "teal" | "light" | "mint" | "photo";

const toneClass: Record<HeroTone, string> = {
  navy: "on-dark bg-navy text-white",
  teal: "on-dark on-teal bg-deep text-white",
  light: "bg-white text-navy border-b border-line",
  mint: "bg-mint text-navy",
  photo: "on-dark bg-navy text-white",
};

/**
 * Hero at the top of every inner page: breadcrumb, the page's single h1 and, at most, its one call to
 * action. Each page picks its own tone so every section opens with a distinct look inside the palette.
 */
export function PageHero({
  title,
  lead,
  actions,
  aside,
  compact = false,
  tone = "navy",
  asideWide = false,
  backdrop,
}: {
  title: string;
  lead: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  /** Shorter hero for tool pages, so the tool starts near the top of the screen. */
  compact?: boolean;
  tone?: HeroTone;
  /** Give the aside (media) the larger column. */
  asideWide?: boolean;
  /** Decorative layer behind the content (photo, blueprint grid, stage bars). */
  backdrop?: ReactNode;
}) {
  const dark = tone === "navy" || tone === "teal" || tone === "photo";
  return (
    <section className={`relative overflow-hidden ${toneClass[tone]}`}>
      {backdrop ?? (tone === "navy" ? <RackLines /> : null)}
      <div
        className={`container-x relative grid gap-10 ${compact ? "py-9 md:py-12" : "py-12 md:py-16 lg:py-20"} ${
          aside
            ? asideWide
              ? "lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14"
              : "lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center"
            : ""
        }`}
      >
        <div>
          <Breadcrumbs dark={dark} />
          <h1
            className={`rise ${dark ? "text-white" : "text-navy"} ${
              compact ? "h-section max-w-[22ch] md:text-5xl" : asideWide ? "display-2 max-w-[18ch] lg:text-[3.1rem]" : "display-2 max-w-[16ch]"
            }`}
          >
            {titleCase(title)}
          </h1>
          <span className={`amber-rule rise rise-2 ${compact ? "mt-4" : "mt-6"}`} aria-hidden="true" />
          <div className={`lead rise rise-3 ${compact ? "mt-4" : "mt-6"}`}>{lead}</div>
          {actions && <div className="rise rise-4 mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">{actions}</div>}
        </div>
        {aside && <div className="rise rise-3 min-w-0">{aside}</div>}
      </div>
    </section>
  );
}

/** Blueprint grid for the planning tool's hero: a measuring surface, not decoration. */
export function BlueprintGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-60"
      style={{
        backgroundImage:
          "linear-gradient(rgb(255 255 255 / 0.07) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.07) 1px, transparent 1px), linear-gradient(rgb(255 255 255 / 0.04) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.04) 1px, transparent 1px)",
        backgroundSize: "96px 96px, 96px 96px, 24px 24px, 24px 24px",
        maskImage: "linear-gradient(90deg, transparent 0%, #000 45%)",
      }}
    />
  );
}

/** Rack silhouettes along the right edge of dark heroes, from the brand's warehouse floor plan. Decorative. */
export function RackLines() {
  return (
    <svg
      className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-[46%] opacity-[0.07] md:block"
      viewBox="0 0 400 400"
      preserveAspectRatio="xMaxYMid slice"
      aria-hidden="true"
    >
      {[40, 110, 180, 250, 320].map((x) => (
        <rect key={x} x={x} y="-20" width="38" height="440" rx="6" fill="#35B7AA" />
      ))}
    </svg>
  );
}

export function SectionHeading({
  title,
  lead,
  id,
  center = false,
  className = "",
}: {
  title: string;
  lead?: ReactNode;
  id?: string;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={`${center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}>
      <h2 id={id} className="h-section">
        {titleCase(title)}
      </h2>
      {lead && <div className={`lead mt-4 ${center ? "mx-auto" : ""}`}>{lead}</div>}
    </div>
  );
}

/** Deep-teal band that closes every page with the page's one call to action. */
export function CtaBand({ title, text, action }: { title: string; text: string; action: ReactNode }) {
  return (
    <section className="py-16 md:py-24" aria-labelledby="cta-title">
      <div className="container-x">
        <div className="on-dark on-teal cta-panel relative overflow-hidden rounded-3xl px-6 py-12 text-white md:px-14 md:py-16">
          <svg
            className="pointer-events-none absolute -right-10 -bottom-16 h-72 w-72 text-teal opacity-25 md:h-96 md:w-96"
            viewBox="0 0 300 300"
            aria-hidden="true"
          >
            <path d="M30 270V140h90v70h80V60h70" fill="none" stroke="currentColor" strokeWidth="22" strokeLinejoin="round" />
          </svg>
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2 id="cta-title" className="h-section text-white">
                {titleCase(title)}
              </h2>
              <p className="mt-4 max-w-[35em] text-lg text-white/90">{text}</p>
            </div>
            <div className="shrink-0">{action}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Arrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`arrow ${className}`} aria-hidden="true">
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

export function PlayIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 6.5v7l5.5-3.5z" fill="currentColor" />
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

export function CheckList({ items, className = "space-y-3" }: { items: string[]; className?: string }) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Check />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

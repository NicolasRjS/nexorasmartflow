"use client";

import { useEffect, useState } from "react";

type Item = { id: string; label: string; marker?: string };

/**
 * In-page navigation that highlights the section in view.
 * "rail": sticky side panel for wide screens. "bar": sticky horizontal bar for narrow screens.
 */
export function ScrollSpyNav({
  items,
  label,
  variant,
  allWidths = false,
}: {
  items: Item[];
  label: string;
  variant: "rail" | "bar";
  /** Bar only: keep the bar on wide screens too (pages without a side rail). */
  allWidths?: boolean;
}) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [items]);

  if (variant === "bar") {
    return (
      <nav
        aria-label={label}
        className={`sticky top-[4.5rem] z-30 border-b border-line bg-white/95 backdrop-blur ${
          allWidths ? "lg:top-20" : "-mx-5 sm:-mx-8 lg:hidden"
        }`}
      >
        <ul
          className={`flex gap-2 overflow-x-auto py-2.5 [scrollbar-width:none] ${allWidths ? "container-x" : "px-5 sm:px-8"}`}
        >
          {items.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="pill-link" aria-current={active === item.id ? "true" : undefined}>
                {item.marker && <span className="mr-1.5 opacity-70">{item.marker}</span>}
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <nav aria-label={label} className="sticky top-28 hidden lg:block">
      <p className="px-3 font-display text-sm font-semibold text-slate">On this page</p>
      <ul className="mt-3 space-y-1 border-l-2 border-line pl-2">
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="spy-link" aria-current={active === item.id ? "true" : undefined}>
              <span className="spy-dot" aria-hidden="true" />
              {item.marker && <span className="font-bold text-deep">{item.marker}</span>}
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

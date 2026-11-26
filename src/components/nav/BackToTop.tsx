"use client";

import { useEffect, useState } from "react";

/** Appears after scrolling down a screen and a half; returns to the top and moves focus to the page start. */
export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 1.5);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => {
        const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: calm ? "auto" : "smooth" });
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
      className={`tile-dark fixed right-4 bottom-20 z-30 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-4 font-display text-sm font-semibold transition-[transform,opacity] duration-300 hover:-translate-y-0.5 lg:right-6 lg:bottom-6 ${
        show ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
    >
      <svg viewBox="0 0 16 16" className="h-4 w-4 text-amber" aria-hidden="true">
        <path d="M8 13V3M4 7l4-4 4 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Back to top
    </button>
  );
}

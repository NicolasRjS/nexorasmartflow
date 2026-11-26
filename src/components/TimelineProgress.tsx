"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Wraps a vertical timeline and fills its rail as the reader scrolls through the stages. */
export function TimelineProgress({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const anchor = window.innerHeight * 0.55;
      const p = (anchor - rect.top) / Math.max(rect.height, 1);
      setProgress(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <span aria-hidden="true" className="absolute top-6 bottom-6 left-6 w-1 -translate-x-1/2 rounded-full bg-line" />
      <span
        aria-hidden="true"
        className="absolute top-6 bottom-6 left-6 w-1 origin-top -translate-x-1/2 rounded-full bg-gradient-to-b from-teal to-amber transition-transform duration-150"
        style={{ transform: `translateX(-50%) scaleY(${progress})` }}
      />
      {children}
    </div>
  );
}

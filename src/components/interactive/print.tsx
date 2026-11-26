"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";

const noop = () => () => {};

/**
 * Renders its children into a print-only root at the end of <body>. While
 * printRegion(id) runs, the print stylesheet hides everything except that root.
 */
export function PrintPortal({ id, children }: { id: string; children: ReactNode }) {
  // false while rendering on the server and during hydration, true afterwards.
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  if (!mounted) return null;
  return createPortal(
    <div className="print-root" id={id} aria-hidden="true">
      {children}
    </div>,
    document.body,
  );
}

/** Opens the browser's print dialog showing only the PrintPortal with this id. */
export function printRegion(id: string) {
  const html = document.documentElement;
  const target = document.getElementById(id);
  html.classList.add("printing-region");
  target?.setAttribute("data-active", "true");
  const cleanup = () => {
    html.classList.remove("printing-region");
    target?.removeAttribute("data-active");
    window.removeEventListener("afterprint", cleanup);
  };
  window.addEventListener("afterprint", cleanup);
  window.print();
  // Some browsers skip afterprint; never leave the page in print mode.
  window.setTimeout(cleanup, 1000);
}

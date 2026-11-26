"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { titleCase } from "@/lib/titleCase";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])';

/**
 * Accessible modal on top of the native <dialog>: traps focus, closes with Esc or the
 * visible Close button, locks page scroll and returns focus to the element that opened it.
 */
export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size = "md",
  tone = "light",
  headerExtra,
  className = "",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  tone?: "light" | "dark";
  headerExtra?: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      returnTo.current = document.activeElement as HTMLElement | null;
      dialog.showModal();
      document.documentElement.classList.add("modal-open");
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // Restore focus and scroll whenever the dialog closes, however it closed.
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const handleClose = () => {
      document.documentElement.classList.remove("modal-open");
      const target = returnTo.current;
      returnTo.current = null;
      if (target && document.contains(target)) target.focus();
      onClose();
    };
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  useEffect(() => () => document.documentElement.classList.remove("modal-open"), []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (e.key !== "Tab") return;
    const items = Array.from(ref.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []).filter(
      (el) => el.offsetParent !== null || el === document.activeElement,
    );
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === ref.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const width = { sm: "max-w-md", md: "max-w-xl", lg: "max-w-3xl", xl: "max-w-5xl" }[size];
  const dark = tone === "dark";

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      aria-describedby={description ? descId : undefined}
      onKeyDown={onKeyDown}
      onClick={(e) => {
        if (e.target === e.currentTarget) ref.current?.close();
      }}
      className={`modal m-auto max-h-[92dvh] w-[calc(100vw-1.5rem)] ${width} overflow-hidden rounded-2xl p-0 shadow-2xl shadow-navy/30 ${
        dark ? "on-dark bg-navy text-white" : "bg-white text-navy"
      } ${className}`}
    >
      {open && (
        <div className="flex max-h-[92dvh] flex-col">
          <div
            className={`flex items-start justify-between gap-4 border-b px-5 py-4 md:px-7 ${
              dark ? "border-white/10" : "border-line"
            }`}
          >
            <div className="min-w-0">
              <h2 id={titleId} className={`text-xl font-bold md:text-2xl ${dark ? "text-white" : ""}`}>
                {titleCase(title)}
              </h2>
              {description && (
                <p id={descId} className={`mt-1 text-[0.95rem] ${dark ? "text-white/80" : "text-slate"}`}>
                  {description}
                </p>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {headerExtra}
              <button
                type="button"
                onClick={() => ref.current?.close()}
                className={`btn-close ${dark ? "btn-close-dark" : ""}`}
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                  <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Close
              </button>
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 md:px-7 md:py-6">{children}</div>
        </div>
      )}
    </dialog>
  );
}

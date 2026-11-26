"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/content/site";
import { Logo } from "./Logo";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

export function SiteHeader() {
  const pathname = usePathname();
  // The menu is open only for the page where it was opened, so it closes on navigation.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenOn(null);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="container-x flex h-18 items-center justify-between gap-4 lg:h-20">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {nav.map((item) => {
              const active = isActive(pathname, item.href);
              const contact = item.href === "/contact";
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative flex min-h-11 items-center rounded-lg px-2 font-display text-[0.8125rem] font-medium whitespace-nowrap transition-colors xl:px-2.5 xl:text-[0.875rem] ${
                      contact
                        ? `ml-2 bg-deep px-3.5 text-white hover:bg-deep-dark active:bg-navy xl:px-4 ${active ? "ring-2 ring-amber ring-offset-2" : ""}`
                        : active
                          ? "text-deep"
                          : "text-navy hover:bg-surface hover:text-deep"
                    }`}
                  >
                    {item.label}
                    {active && !contact && (
                      <span className="absolute inset-x-2 bottom-0.5 h-[3px] rounded-full bg-amber" aria-hidden="true" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-line px-3.5 font-display text-sm font-semibold text-navy transition-colors hover:bg-surface active:bg-line lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpenOn(open ? null : pathname)}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Main"
        className={`max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line bg-white lg:hidden ${open ? "block" : "hidden"}`}
      >
        <ul className="container-x grid gap-1 py-4">
          {nav.map((item) => {
            const active = isActive(pathname, item.href);
            const contact = item.href === "/contact";
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-12 items-center justify-between rounded-lg px-4 font-display font-medium transition-colors ${
                    contact
                      ? "mt-2 bg-deep text-white hover:bg-deep-dark"
                      : active
                        ? "bg-mint text-navy"
                        : "text-navy hover:bg-surface"
                  }`}
                  onClick={() => setOpenOn(null)}
                >
                  {item.label}
                  {active && (
                    <span className={`h-2 w-2 rounded-full ${contact ? "bg-amber" : "bg-amber"}`} aria-hidden="true" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

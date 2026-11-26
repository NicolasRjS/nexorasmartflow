"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav } from "@/content/site";
import { Logo } from "./Logo";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

export function SiteHeader() {
  const pathname = usePathname();
  // The menu is open only for the page where it was opened, so it closes on navigation.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="container-x flex h-20 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative block rounded-md px-2.5 py-2 font-display text-[0.875rem] font-medium whitespace-nowrap transition-colors ${
                      active ? "text-deep" : "text-navy hover:text-deep"
                    } ${item.href === "/contact" ? "ml-2 bg-deep !text-white hover:bg-deep-dark" : ""}`}
                  >
                    {item.label}
                    {active && item.href !== "/contact" && (
                      <span className="absolute inset-x-2.5 -bottom-0.5 h-[3px] rounded-full bg-amber" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 items-center gap-2 rounded-md border border-line px-3 font-display text-sm font-semibold text-navy xl:hidden"
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
          Menu
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Main"
        className={`border-t border-line bg-white xl:hidden ${open ? "block" : "hidden"}`}
      >
        <ul className="container-x grid gap-1 py-4">
          {nav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-12 items-center rounded-md border-l-4 px-4 font-display font-medium ${
                    active ? "border-amber bg-mint text-deep" : "border-transparent text-navy hover:bg-surface"
                  }`}
                  onClick={() => setOpenOn(null)}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { findPage, pages } from "./pages";

/**
 * Closes every page with "where you are" and the previous and next pages in reading order,
 * so a visitor can move through the site without going back to the menu.
 */
export function PageJourney() {
  const pathname = usePathname();
  const page = findPage(pathname);
  if (!page) return null;

  const index = pages.findIndex((p) => p.href === pathname);
  const extra = index === -1;
  // Brochure & Video sits outside the main menu: it leads back to Home and on to Results.
  const prev = extra ? pages[0] : index > 0 ? pages[index - 1] : null;
  const next = extra ? pages[4] : index < pages.length - 1 ? pages[index + 1] : pages[0];
  const last = index === pages.length - 1;

  return (
    <nav aria-label="Page by page" className="border-t border-line bg-surface">
      <div className="container-x py-10 md:py-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-sm font-semibold text-slate">
            {extra ? `${page.label}: extra page` : `Page ${index + 1} of ${pages.length}: ${page.label}`}
          </p>
          <ol className="-mx-1.5 flex items-center" aria-label="Jump to a page">
            {pages.map((p, i) => {
              const current = p.href === pathname;
              return (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    aria-current={current ? "page" : undefined}
                    className="group grid h-10 w-10 place-items-center rounded-full"
                    title={p.label}
                  >
                    <span
                      className={`block h-2.5 rounded-full transition-[background-color,transform] ${
                        current
                          ? "w-7 bg-amber"
                          : i < index
                            ? "w-2.5 bg-deep group-hover:scale-125 group-hover:bg-navy"
                            : "w-2.5 bg-[#b9c7cf] group-hover:scale-125 group-hover:bg-slate"
                      }`}
                    />
                    <span className="sr-only">{p.label}</span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {prev ? (
            <Link href={prev.href} className="card lift group flex items-center gap-4 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-mint text-deep transition-transform group-hover:-translate-x-1">
                <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
                  <path d="M13 8H3M7 4L3 8l4 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span>
                <span className="block text-sm text-slate">Previous</span>
                <span className="block font-display text-lg font-semibold">{prev.label}</span>
                <span className="block text-sm text-slate">{prev.summary}</span>
              </span>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
          <Link href={next.href} className="card lift group flex items-center justify-end gap-4 p-5 text-right">
            <span>
              <span className="block text-sm text-slate">{last ? "Back to the start" : "Next"}</span>
              <span className="block font-display text-lg font-semibold">{next.label}</span>
              <span className="block text-sm text-slate">{next.summary}</span>
            </span>
            <span className="module-letter h-11 w-11 rounded-full transition-transform group-hover:translate-x-1">
              <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

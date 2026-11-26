"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { findPage } from "./pages";

/** "Home › Page" trail at the top of every inner page, so visitors always know where they are. */
export function Breadcrumbs({ dark = true }: { dark?: boolean }) {
  const pathname = usePathname();
  const page = findPage(pathname);
  if (!page || page.href === "/") return null;
  return (
    <nav aria-label="Breadcrumb" className="rise mb-5">
      <ol className={`flex flex-wrap items-center gap-2 font-display text-sm ${dark ? "text-white/85" : "text-slate"}`}>
        <li>
          <Link
            href="/"
            className={`inline-flex min-h-9 items-center gap-1.5 underline-offset-4 hover:underline ${
              dark ? "hover:text-white" : "hover:text-deep"
            }`}
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
              <path
                d="M2.5 7.5L8 3l5.5 4.5V13H10V9.5H6V13H2.5z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
            Home
          </Link>
        </li>
        <li aria-hidden="true">›</li>
        <li>
          <span aria-current="page" className={`font-semibold ${dark ? "text-white" : "text-navy"}`}>
            {page.label}
          </span>
        </li>
      </ol>
    </nav>
  );
}

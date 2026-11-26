import type { ReactNode } from "react";

/** External link: opens in a new tab and says so to screen readers. */
export function ExternalLink({
  href,
  children,
  className = "prose-link",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <svg viewBox="0 0 16 16" className="ml-1 inline h-3.5 w-3.5 align-baseline" aria-hidden="true">
        <path
          d="M6 3H3v10h10v-3M9 3h4v4M13 3L7 9"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

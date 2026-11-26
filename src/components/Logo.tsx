import Link from "next/link";

/** The Nexora app-icon mark: racks, a route through them, start dot and arrow. */
export function LogoMark({ className = "h-10 w-10", title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 300 300"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <rect width="300" height="300" rx="64" fill="#102C3B" />
      <g fill="#27526A">
        <rect x="63" y="51" width="37" height="189" rx="7" />
        <rect x="131" y="51" width="38" height="189" rx="7" />
        <rect x="200" y="51" width="37" height="189" rx="7" />
      </g>
      <path
        d="M46 232V137H127V200H196V85H234"
        fill="none"
        stroke="#35B7AA"
        strokeWidth="24"
        strokeLinejoin="round"
      />
      <polygon points="230,59 267,85 230,111" fill="#F4B544" />
      <circle cx="46" cy="240" r="22" fill="#F4B544" />
    </svg>
  );
}

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3 rounded-md"
      aria-label="Nexora Intralogistics Solutions, home"
    >
      <LogoMark className="h-11 w-11 shrink-0 transition-transform group-hover:scale-105" />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-xl font-bold tracking-[0.2em] ${dark ? "text-white" : "text-navy"}`}
        >
          NEXORA
        </span>
        <span
          className={`mt-1.5 font-display text-[0.6rem] font-medium tracking-[0.24em] ${dark ? "text-teal" : "text-deep"}`}
        >
          INTRALOGISTICS SOLUTIONS
        </span>
      </span>
    </Link>
  );
}

import { mailtoHref, site } from "@/content/site";

/** Honesty notice shown on every simulated result. */
export function DemoNotice({ subject, tone = "light" }: { subject?: string; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <p
      className={`demo-notice flex gap-3 rounded-xl border p-4 text-[0.95rem] ${
        dark ? "border-white/20 bg-white/5 text-white/90" : "border-line bg-surface text-navy"
      }`}
    >
      <svg viewBox="0 0 20 20" className={`mt-0.5 h-5 w-5 shrink-0 ${dark ? "text-teal" : "text-deep"}`} aria-hidden="true">
        <circle cx="10" cy="10" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10 9v5M10 6.2v.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span>
        <strong>Demo only:</strong> this course project does not send or store data. To reach us, email{" "}
        <a href={mailtoHref(subject)} className="prose-link break-all">
          {site.contactEmail}
        </a>
        .
      </span>
    </p>
  );
}

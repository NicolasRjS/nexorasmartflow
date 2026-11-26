import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, PageHero, SectionHeading } from "@/components/ui";
import { mailtoHref, offices, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Nexora Intralogistics Solutions by email. Tell us your peak volume, your WMS and your main bottleneck.",
};

const include = [
  "Your distribution center: size, location and what you ship",
  "Orders on your peak day and your operating hours",
  "The WMS you use today",
  "Your main bottleneck: picking, packing, dispatch or safety",
  "Your timeline, including peak seasons and blackout windows",
];

const emailBody = `Hello Nexora team,

Distribution center (size, location, products):
Orders on the peak day / operating hours:
Current WMS:
Main bottleneck:
Timeline and blackout windows:

Name, company and phone:
`;

const next = [
  { title: "We read your note", text: "An engineer reviews your numbers and replies by email." },
  { title: "We talk", text: "A short call to understand your floor, your WMS and your goals." },
  { title: "We audit", text: "An engineering audit on site turns your data into a design." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us where your floor slows down"
        lead="Email us your peak volume and your main bottleneck. We will reply with a first view of what SmartFlow 360 can do in your building."
      />

      <section className="py-16 md:py-24" aria-labelledby="email-title">
        <div className="container-x grid gap-10 lg:grid-cols-[1.15fr_1fr]">
          <div className="card p-7 md:p-10">
            <h2 id="email-title" className="text-2xl font-bold">
              Email our team
            </h2>
            <p className="mt-3 text-slate">
              The button opens your email app with a short template. Fill in what you know; we will ask about the rest.
            </p>
            <a href={mailtoHref("SmartFlow 360 inquiry", emailBody)} className="btn btn-deep mt-7 text-base">
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M3 7l9 6 9-6" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
              Write to us
            </a>
            <dl className="mt-8 space-y-4 border-t border-line pt-6">
              <div>
                <dt className="font-display text-sm font-semibold tracking-[0.12em] text-slate uppercase">Email</dt>
                <dd className="mt-1">
                  <a href={mailtoHref()} className="prose-link text-lg break-all">
                    {site.contactEmail}
                  </a>
                </dd>
              </div>
              {site.phone && (
                <div>
                  <dt className="font-display text-sm font-semibold tracking-[0.12em] text-slate uppercase">Phone</dt>
                  <dd className="mt-1">
                    <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="prose-link text-lg">
                      {site.phone}
                    </a>
                  </dd>
                </div>
              )}
              {offices.map((o) => (
                <div key={o.label}>
                  <dt className="font-display text-sm font-semibold tracking-[0.12em] text-slate uppercase">
                    {o.label}
                  </dt>
                  <dd className="mt-1">{o.address}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="text-xl font-semibold">What to include</h2>
            <ul className="mt-4 space-y-3">
              {include.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-sm bg-amber" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-xl border border-line bg-surface p-6">
              <h3 className="font-semibold">Not sure about your numbers?</h3>
              <p className="mt-2 text-slate">Get a first estimate of your peak-hour load in under a minute.</p>
              <Link href="/capacity-planner" className="prose-link mt-3 inline-flex items-center gap-1">
                Open the Capacity Planner <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-16 md:py-20" aria-labelledby="next-title">
        <div className="container-x">
          <SectionHeading id="next-title" eyebrow="What happens next" title="From first email to engineering audit" />
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {next.map((n, i) => (
              <li key={n.title} className="card p-6">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-navy font-display font-bold text-amber"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{n.title}</h3>
                <p className="mt-2 text-slate">{n.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10">
            Prefer to read first?{" "}
            <Link href="/results" className="prose-link">
              See verified results
            </Link>
            ,{" "}
            <Link href="/media" className="prose-link">
              watch our video and get the brochure
            </Link>
            , or{" "}
            <Link href="/" className="prose-link">
              return to the home page
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}

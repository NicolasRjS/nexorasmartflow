import type { Metadata } from "next";
import { titleCase } from "@/lib/titleCase";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { Arrow, PageHero, SectionHeading } from "@/components/ui";
import { nextSteps } from "@/content/data";
import { mailtoHref, offices, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Nexora Intralogistics Solutions. Tell us your peak volume, your WMS and your main bottleneck.",
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

export default function ContactPage() {
  return (
    <>
      <PageHero
        compact
        tone="navy"
        title="Tell us where your floor slows down"
        lead="Send us your peak volume and your main bottleneck. We reply with a first view of what SmartFlow 360 can do in your building."
      />

      <section className="py-12 md:py-16" aria-labelledby="form-title">
        <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-14">
          <div className="card p-6 md:p-10">
            <h2 id="form-title" className="text-2xl font-bold md:text-3xl">
              Send Us a Message
            </h2>
            <p className="mt-2 text-slate">Five fields, about a minute. Fill in what you know; we ask about the rest.</p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start" aria-label="Other ways to reach us">
            <div className="on-dark tile-dark rounded-3xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white">Prefer Email or Phone?</h2>
              <dl className="mt-5 space-y-4">
                <div>
                  <dt className="text-sm text-white/75">Email</dt>
                  <dd className="mt-0.5">
                    <a href={mailtoHref()} className="prose-link text-lg break-all">
                      {site.contactEmail}
                    </a>
                  </dd>
                </div>
                {site.phone && (
                  <div>
                    <dt className="text-sm text-white/75">Phone</dt>
                    <dd className="mt-0.5">
                      <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="prose-link text-lg">
                        {site.phone}
                      </a>
                    </dd>
                  </div>
                )}
                {offices.map((o) => (
                  <div key={o.label}>
                    <dt className="text-sm text-white/75">{o.label}</dt>
                    <dd className="mt-0.5">{o.address}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 flex flex-col gap-3 border-t border-white/15 pt-6">
                <a href={mailtoHref("SmartFlow 360 inquiry", emailBody)} className="btn btn-outline-light">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="M3 7l9 6 9-6" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  Open an Email Template
                </a>
                <div className="[&_.btn-outline]:border-white/60 [&_.btn-outline]:text-white [&_.btn-outline:hover]:bg-white/10 [&_[role=status]]:text-teal">
                  <CopyEmailButton />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold">What to Include</h2>
              <ul className="mt-4 space-y-3">
                {include.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-sm bg-amber" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-surface p-6">
              <h2 className="text-lg font-bold">Not Sure About Your Numbers?</h2>
              <p className="mt-2 text-slate">Get a first estimate of your peak-hour load in under a minute.</p>
              <Link href="/capacity-planner" className="arrow-link mt-3">
                Open the Capacity Planner
                <Arrow />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-surface py-16 md:py-20" aria-labelledby="next-title">
        <div className="container-x">
          <SectionHeading id="next-title" title="From first message to engineering audit" />
          <ol className="relative mt-10 grid gap-8 md:grid-cols-3">
            <span className="absolute top-5 right-[16%] left-[16%] hidden h-0.5 bg-line md:block" aria-hidden="true" />
            {nextSteps.map((n, i) => (
              <li key={n.title} className="relative">
                <span
                  className="node h-10 w-10"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <h3 className="mt-4 text-xl font-bold">{titleCase(n.title)}</h3>
                <p className="mt-2 text-slate">{n.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-12">
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

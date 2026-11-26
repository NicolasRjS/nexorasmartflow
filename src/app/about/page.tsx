import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "@/components/ExternalLink";
import { CtaBand, PageHero, SectionHeading } from "@/components/ui";
import { reasons, team } from "@/content/data";
import { externalResources, site } from "@/content/site";

export const metadata: Metadata = {
  title: "About & Team",
  description:
    "Nexora Intralogistics Solutions improves distribution-center throughput, picking efficiency, system visibility and safety. Meet the team behind SmartFlow 360.",
};

const focus = [
  { title: "Throughput", text: "More orders through the same building in the peak hour." },
  { title: "Picking efficiency", text: "Shorter routes and faster, confirmed picks." },
  { title: "System visibility", text: "Live KPIs and exceptions on top of your WMS." },
  { title: "Operational safety", text: "Clear separation of people and forklifts." },
];

const howWeWork = [
  {
    title: "We start from your data",
    text: "An engineering audit of your demand profile, bottlenecks and time studies comes before any design.",
  },
  {
    title: "We keep what works",
    text: "Your WMS, your building and your people stay. We add only what removes a constraint.",
  },
  {
    title: "We prove every step",
    text: "FAT, SAT, a pilot and a full-load test. You accept the system gate by gate.",
  },
  {
    title: "We stay after go-live",
    text: "Hypercare, a resident technician and 24/7 remote support keep the gains in place.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About & Team"
        title="We help distribution centers do more with the space they have"
        lead="Nexora Intralogistics Solutions is an intralogistics solution provider. We improve distribution-center throughput, picking efficiency, system visibility and operational safety, without replacing your building or your WMS."
      >
        <Link href="/media#video" className="btn btn-primary">
          Watch our institutional video
        </Link>
        <a href="#team" className="btn btn-outline-light">
          Meet the team
        </a>
      </PageHero>

      <section className="py-16 md:py-24" aria-labelledby="focus-title">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <SectionHeading
            id="focus-title"
            eyebrow="What we do"
            title="Four outcomes we are accountable for"
            lead={
              <>
                Our solution, {site.product}, is a targeted modernization of the distribution center you already run.{" "}
                <Link href="/smartflow-360" className="prose-link">
                  Explore SmartFlow 360
                </Link>
              </>
            }
          />
          <ul className="grid gap-4 sm:grid-cols-2">
            {focus.map((f) => (
              <li key={f.title} className="card p-6">
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-slate">{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-surface py-16 md:py-24" aria-labelledby="how-title">
        <div className="container-x">
          <SectionHeading id="how-title" eyebrow="How we work" title="Four principles behind every project" />
          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {howWeWork.map((h, i) => (
              <li key={h.title} className="rounded-xl border border-line bg-white p-6">
                <span className="font-display text-sm font-bold text-deep">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 text-lg font-semibold">{h.title}</h3>
                <p className="mt-2 text-slate">{h.text}</p>
              </li>
            ))}
          </ol>
          <div className="on-dark mt-10 rounded-xl bg-navy px-6 py-5 text-white md:px-8">
            <p className="font-display text-lg">
              <span className="font-semibold text-teal">Our promise:</span>{" "}
              {reasons.map((r) => r.title.toLowerCase()).join(", ").replace(/, ([^,]*)$/, " and $1")}.
            </p>
          </div>
        </div>
      </section>

      <section id="team" className="py-16 md:py-24" aria-labelledby="team-title">
        <div className="container-x">
          <SectionHeading
            id="team-title"
            eyebrow="Our team"
            title="The people who deliver SmartFlow 360"
            lead="One team owns your project from the engineering audit to long-term support."
          />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <li key={m.role} className="card flex flex-col p-6">
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-navy font-display text-lg font-bold text-amber"
                  aria-hidden="true"
                >
                  {site.showTeamNames ? m.initials : m.role.charAt(0)}
                </span>
                {site.showTeamNames ? (
                  <>
                    <h3 className="mt-4 text-lg font-semibold">{m.name}</h3>
                    <p className="font-display text-sm font-semibold text-deep">{m.role}</p>
                  </>
                ) : (
                  <h3 className="mt-4 text-lg font-semibold">{m.role}</h3>
                )}
                <p className="mt-3 text-[0.95rem] text-slate">{m.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="resources" className="bg-surface py-16 md:py-20" aria-labelledby="resources-title">
        <div className="container-x">
          <SectionHeading
            id="resources-title"
            eyebrow="Industry resources"
            title="Standards and references worth knowing"
            lead="Independent resources for anyone planning a distribution-center upgrade. Nexora is not affiliated with these organizations."
          />
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {externalResources.map((r) => (
              <li key={r.href} className="rounded-xl border border-line bg-white p-6">
                <ExternalLink href={r.href} className="prose-link font-display text-lg">
                  {r.label}
                </ExternalLink>
                <p className="mt-2 text-slate">{r.why}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Meet the team that will run your project."
        text="Tell us about your distribution center. The right specialist on our team will reply."
        primary={{ href: "/contact", label: "Contact the team" }}
        secondary={{ href: "/results", label: "See our results" }}
      />
    </>
  );
}

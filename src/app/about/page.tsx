import type { Metadata } from "next";
import { titleCase } from "@/lib/titleCase";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "@/components/ExternalLink";
import { ActionButton } from "@/components/interactive/DemoProvider";
import { Arrow, CtaBand, PageHero, PlayIcon, SectionHeading } from "@/components/ui";
import { reasons, team } from "@/content/data";
import { externalResources, media, site } from "@/content/site";

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

// One team, grouped by what each person owns on your project.
const groups = [
  { title: "Leadership and delivery", members: team.slice(0, 2) },
  { title: "Engineering", members: [team[5], ...team.slice(2, 5)] },
  { title: "Business case and customer success", members: team.slice(6) },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        tone="light"
        asideWide
        backdrop={<div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-[48%] bg-surface lg:block" />}
        title="We help distribution centers do more with the space they have"
        lead="Nexora Intralogistics Solutions is an intralogistics solution provider. We improve distribution-center throughput, picking efficiency, system visibility and operational safety, without replacing your building or your WMS."
        actions={
          <Link href="/contact" className="btn btn-primary btn-lg">
            Contact the Team
            <Arrow />
          </Link>
        }
        aside={
          <ActionButton
            action={{
              kind: "video",
              video: {
                title: "Nexora institutional video",
                description: `${media.videoLength} · our story, how every project runs and the results at three Peruvian operations.`,
                src: media.video,
                poster: media.videoPoster,
                captions: "/media/nexora-institutional-video.vtt",
              },
            }}
            className="raised group relative block aspect-video w-full cursor-pointer overflow-hidden rounded-3xl bg-navy-2 text-left lg:-mr-8 lg:w-[calc(100%+2rem)] xl:-mr-16 xl:w-[calc(100%+4rem)]"
            aria-label={`Play the Nexora institutional video (${media.videoLength})`}
          >
            <Image
              src={media.videoPoster}
              alt=""
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" aria-hidden="true" />
            <span className="absolute bottom-6 left-6 flex items-center gap-4 text-white md:bottom-8 md:left-8" aria-hidden="true">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-amber text-navy shadow-lg transition-transform group-hover:scale-105 md:h-20 md:w-20">
                <PlayIcon className="h-8 w-8 md:h-10 md:w-10" />
              </span>
              <span>
                <span className="block font-display text-xl font-semibold md:text-2xl">Our story in {media.videoLength}</span>
                <span className="block text-sm text-white/85">Founded in Lima in 2019</span>
              </span>
            </span>
          </ActionButton>
        }
      />

      <section className="py-16 md:py-24" aria-labelledby="focus-title">
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-start">
          <SectionHeading
            id="focus-title"
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
          <ul className="grid border-t-2 border-navy sm:grid-cols-2">
            {focus.map((f, i) => (
              <li
                key={f.title}
                className={`border-b border-line py-6 sm:px-6 ${i % 2 === 0 ? "sm:border-r sm:pl-0" : ""}`}
              >
                <h3 className="text-2xl font-bold">{titleCase(f.title)}</h3>
                <p className="mt-2 text-slate">{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-surface py-16 md:py-24" aria-labelledby="how-title">
        <div className="container-x">
          <SectionHeading id="how-title" title="Four principles behind every project" lead="In the order they show up in your project." />
          <ol className="relative mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <span className="absolute top-5 right-[12%] left-[12%] hidden h-0.5 bg-line lg:block" aria-hidden="true" />
            {howWeWork.map((h, i) => (
              <li key={h.title} className="relative">
                <span
                  className="node h-10 w-10"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <h3 className="mt-4 text-xl font-bold">{titleCase(h.title)}</h3>
                <p className="mt-2 text-slate">{h.text}</p>
              </li>
            ))}
          </ol>
          <p className="on-dark tile-dark mt-12 rounded-2xl px-6 py-5 font-display text-lg md:px-8">
            <span className="font-semibold text-amber">Our promise:</span> a plan {reasons[0].title.toLowerCase()}, {reasons[1].title.toLowerCase()} and {reasons[2].title.toLowerCase()}.
          </p>
        </div>
      </section>

      <section id="team" className="scroll-mt-28 py-16 md:py-24" aria-labelledby="team-title">
        <div className="container-x">
          <SectionHeading
            id="team-title"
            title="The people who deliver SmartFlow 360"
            lead="One team owns your project from the engineering audit to long-term support."
          />
          <div className="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-8">
            {groups.map((g) => (
              <section key={g.title} aria-labelledby={`team-${g.title}`}>
                <h3 id={`team-${g.title}`} className="border-b-2 border-navy pb-3 text-lg font-bold lg:flex lg:min-h-[4.5rem] lg:items-end">
                  {titleCase(g.title)}
                </h3>
                <ul className="divide-y divide-line">
                  {g.members.map((m) => (
                    <li key={m.role} className="flex gap-4 py-5">
                      <span
                        className="node h-12 w-12"
                        aria-hidden="true"
                      >
                        {site.showTeamNames ? m.initials : m.role.charAt(0)}
                      </span>
                      <div>
                        {site.showTeamNames ? (
                          <>
                            <p className="font-display text-lg leading-snug font-semibold">{m.name}</p>
                            <p className="font-display text-sm font-semibold text-deep">{m.role}</p>
                          </>
                        ) : (
                          <p className="font-display text-lg font-semibold">{m.role}</p>
                        )}
                        <p className="mt-1.5 text-[0.95rem] text-slate">{m.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section id="resources" className="bg-surface py-16 md:py-20" aria-labelledby="resources-title">
        <div className="container-x">
          <SectionHeading
            id="resources-title"
            title="Standards and references worth knowing"
            lead="Independent resources for anyone planning a distribution-center upgrade. Nexora is not affiliated with these organizations."
          />
          <ul className="mt-10 grid gap-x-10 md:grid-cols-2">
            {externalResources.map((r) => (
              <li key={r.href} className="border-t border-line py-5">
                <ExternalLink href={r.href} className="prose-link font-display text-lg">
                  {r.label}
                </ExternalLink>
                <p className="mt-1 text-slate">{r.why}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Meet the team that will run your project."
        text="Tell us about your distribution center. The right specialist on our team will reply."
        action={
          <Link href="/contact" className="btn btn-primary btn-lg">
            Contact the Team
            <Arrow />
          </Link>
        }
      />
    </>
  );
}

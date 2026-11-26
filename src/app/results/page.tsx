import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand, PageHero } from "@/components/ui";
import { customers } from "@/content/data";

export const metadata: Metadata = {
  title: "Results",
  description:
    "Verified results at three Nexora customers: Moda Andina Logistics, Pacífico Beauty and TecnoSur Distribución. KPI cards and project videos.",
};

export default function ResultsPage() {
  return (
    <>
      <PageHero
        eyebrow="Results"
        title="Proven results at customers already running Nexora"
        lead="Three distribution centers, three different bottlenecks. Each one kept its existing WMS and building, and every KPI below was verified at SAT and in load tests."
      />

      <nav aria-label="Customers on this page" className="border-b border-line bg-surface">
        <ul className="container-x flex flex-wrap gap-x-6 gap-y-2 py-4 text-sm">
          {customers.map((c) => (
            <li key={c.id}>
              <a href={`#${c.id}`} className="prose-link">
                {c.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="py-12 md:py-16">
        {customers.map((c, idx) => (
          <section
            key={c.id}
            id={c.id}
            aria-labelledby={`${c.id}-title`}
            className={idx % 2 === 1 ? "bg-surface py-14 md:py-20" : "py-14 md:py-20"}
          >
            <div className="container-x">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="eyebrow">
                    {c.sector} · {c.location}
                  </p>
                  <h2 id={`${c.id}-title`} className="mt-2 text-3xl font-bold">
                    {c.name}
                  </h2>
                  <p className="mt-2 text-lg">
                    <strong className="text-deep">Project:</strong> {c.project}
                  </p>
                  <p className="mt-1 text-slate">{c.facts} · existing WMS kept</p>
                </div>
                <div className="w-48 shrink-0 rounded-xl border border-line bg-white p-3 md:w-56">
                  <Image src={c.logo} alt={c.logoAlt} width={520} height={160} className="h-auto w-full" />
                </div>
              </div>

              <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-start">
                <ul className="grid gap-4" aria-label={`Verified results at ${c.name}`}>
                  {c.kpis.map((k) => (
                    <li key={k.label} className="card flex flex-wrap items-center justify-between gap-4 p-5">
                      <div>
                        <h3 className="font-display text-sm font-semibold tracking-[0.08em] text-slate uppercase">
                          {k.label}
                        </h3>
                        <p className="mt-1 font-display">
                          <span className="text-lg text-slate">
                            <span className="sr-only">Before: </span>
                            {k.before}
                          </span>
                          <span className="mx-2 text-slate" aria-hidden="true">
                            →
                          </span>
                          <span className="text-3xl font-bold text-navy">
                            <span className="sr-only">, after: </span>
                            {k.after}
                          </span>
                        </p>
                      </div>
                      <span className="chip text-base">
                        <span className="sr-only">Change: </span>
                        {k.change}
                      </span>
                    </li>
                  ))}
                </ul>

                <figure className="overflow-hidden rounded-2xl border border-line bg-white">
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    poster={c.poster}
                    width={1280}
                    height={720}
                    className="block aspect-video h-auto w-full bg-navy"
                    aria-label={`${c.name} project video: before, solution and verified results`}
                  >
                    <source src={c.video} type="video/mp4" />
                    <track kind="captions" src={c.video.replace(".mp4", ".vtt")} srcLang="en" label="English" />
                    Your browser does not play embedded video.{" "}
                    <a href={c.video} className="prose-link">
                      Download the {c.name} video (MP4)
                    </a>
                    .
                  </video>
                  <figcaption className="p-5">
                    <p className="font-display font-semibold">
                      {c.project} · 0:25 · before, solution and verified results
                    </p>
                    <p className="mt-2 text-[0.95rem] text-slate">{c.videoText}</p>
                  </figcaption>
                </figure>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="pb-4" aria-labelledby="common-title">
        <div className="container-x">
          <div className="rounded-2xl border border-line bg-mint p-8 md:p-10">
            <h2 id="common-title" className="text-2xl font-bold">
              What they have in common
            </h2>
            <p className="measure mt-3 text-lg">
              All three kept their existing WMS and building. Every KPI on this page was verified at SAT and in load
              tests. See how we run those{" "}
              <Link href="/implementation#acceptance" className="prose-link">
                acceptance gates
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Your distribution center could be the next result."
        text="Tell us which KPI matters most to you. We will show you which SmartFlow 360 modules move it."
        primary={{ href: "/contact", label: "Discuss your project" }}
        secondary={{ href: "/smartflow-360", label: "Explore SmartFlow 360" }}
      />
    </>
  );
}

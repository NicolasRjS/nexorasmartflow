import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ActionButton } from "@/components/interactive/DemoProvider";
import { KpiCompare } from "@/components/KpiCompare";
import { ScrollSpyNav } from "@/components/ScrollSpyNav";
import { Arrow, CtaBand, PageHero } from "@/components/ui";
import { customers } from "@/content/data";

export const metadata: Metadata = {
  title: "Results",
  description:
    "Verified results at three Nexora customers: Moda Andina Logistics, Pacífico Beauty and TecnoSur Distribución. KPI cards and project videos.",
};

const sections = [
  ...customers.map((c) => ({ id: c.id, label: c.name })),
  { id: "common", label: "What they have in common" },
];

export default function ResultsPage() {
  return (
    <>
      <PageHero
        title="Proven results at customers already running Nexora"
        lead="Three distribution centers, three different bottlenecks. Each one kept its existing WMS and building, and every KPI below was verified at SAT and in load tests."
        actions={
          <ActionButton action={{ kind: "demo" }} className="btn btn-primary btn-lg">
            Book a Demo
            <Arrow />
          </ActionButton>
        }
        tone="photo"
        backdrop={
          <div aria-hidden="true" className="absolute inset-0">
            <div className="absolute inset-0 grid grid-cols-3">
              {customers.map((c) => (
                <div key={c.id} className="relative">
                  <Image src={c.poster} alt="" fill sizes="33vw" className="scale-110 object-cover blur-[6px]" />
                </div>
              ))}
            </div>
            <div className="absolute inset-0 bg-navy/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/55" />
          </div>
        }
        aside={<KpiCompare />}
      />

      <ScrollSpyNav items={sections} label="Customers on this page" variant="bar" allWidths />

      {customers.map((c, idx) => (
        <section
          key={c.id}
          id={c.id}
          aria-labelledby={`${c.id}-title`}
          className={`scroll-mt-36 py-16 md:py-24 ${idx % 2 === 1 ? "bg-surface" : ""}`}
        >
          <div className="container-x">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-display font-semibold text-deep">
                  {c.sector} · {c.location}
                </p>
                <h2 id={`${c.id}-title`} className="h-section mt-2">
                  {c.name}
                </h2>
                <p className="mt-3 text-lg">
                  <strong>Project:</strong> {c.project}
                </p>
                <p className="mt-1 text-slate">{c.facts} · existing WMS kept</p>
              </div>
              <Image src={c.logo} alt={c.logoAlt} width={520} height={160} className="h-auto w-44 shrink-0 md:w-52" />
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:items-start">
              <figure className="overflow-hidden rounded-3xl bg-navy shadow-[0_24px_60px_-30px_rgb(16_44_59/0.6)]">
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
                <figcaption className="on-dark px-5 py-4 text-white/85 md:px-6">
                  <p className="font-display font-semibold text-white">
                    {c.project} · 0:25 · before, solution and verified results
                  </p>
                  <p className="mt-2 text-[0.95rem]">{c.videoText}</p>
                </figcaption>
              </figure>

              <div>
                <h3 className="font-display text-lg font-semibold">Verified Results</h3>
                <ul className="mt-3 divide-y divide-line border-y-2 border-navy" aria-label={`Verified results at ${c.name}`}>
                  {c.kpis.map((k) => (
                    <li key={k.label} className="py-5">
                      <p className="font-semibold">{k.label}</p>
                      <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
                        <p className="font-display">
                          <span className="text-xl text-slate">
                            <span className="sr-only">Before: </span>
                            {k.before}
                          </span>
                          <Arrow className="mx-2 inline h-4 w-4 text-slate" />
                          <span className="text-4xl font-bold text-navy">
                            <span className="sr-only">, after: </span>
                            {k.after}
                          </span>
                        </p>
                        <p className="font-display text-2xl font-bold text-deep">
                          <span className="sr-only">Change: </span>
                          {k.change}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section id="common" className="scroll-mt-36 pt-16 md:pt-24" aria-labelledby="common-title">
        <div className="container-x">
          <div className="on-dark tile-dark grid gap-6 rounded-3xl p-8 md:grid-cols-[1fr_1.4fr] md:items-center md:p-12">
            <h2 id="common-title" className="h-section text-white">
              What They Have in Common
            </h2>
            <p className="text-lg text-white/90">
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
        text="Tell us which KPI matters most to you. In a working session, we show you which SmartFlow 360 modules move it."
        action={
          <ActionButton action={{ kind: "demo" }} className="btn btn-primary btn-lg">
            Book a Demo
            <Arrow />
          </ActionButton>
        }
      />
    </>
  );
}

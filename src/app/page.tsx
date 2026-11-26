import Link from "next/link";
import { ConveyorBand } from "@/components/ConveyorBand";
import { HeroIllustration } from "@/components/HeroIllustration";
import { Arrow, CtaBand, HeroGrid, SectionHeading } from "@/components/ui";
import { modules, notIncluded, reasons } from "@/content/data";
import { site } from "@/content/site";

const highlights = [
  { value: "+73%", label: "peak orders per day", customer: "Moda Andina Logistics", href: "/results#moda-andina" },
  { value: "−55%", label: "walking per pick route", customer: "Moda Andina Logistics", href: "/results#moda-andina" },
  { value: "+9.5 pp", label: "same-day dispatch", customer: "Pacífico Beauty", href: "/results#pacifico-beauty" },
  { value: "−69%", label: "near-misses per year", customer: "TecnoSur Distribución", href: "/results#tecnosur" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="on-dark relative overflow-hidden bg-navy text-white">
        <HeroGrid />
        <div className="container-x relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="eyebrow">{site.product}</p>
            <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl lg:text-[3.4rem]">{site.headline}</h1>
            <p className="mt-4 font-display text-xl text-teal italic">{site.tagline}</p>
            <p className="measure mt-6 text-lg text-white/85">
              We modernize the distribution center you already run. SmartFlow 360 adds capacity, cuts walking and
              makes the floor safer, inside your existing building, with your existing WMS and within your budget.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/capacity-planner" className="btn btn-primary">
                Size your peak hour
                <Arrow />
              </Link>
              <Link href="/results" className="btn btn-outline-light">
                See verified results
              </Link>
            </div>
          </div>
          <div className="mx-auto w-full max-w-lg">
            <HeroIllustration />
          </div>
        </div>
        <ConveyorBand />
      </section>

      {/* Verified results strip */}
      <section aria-labelledby="results-strip" className="border-b border-line bg-surface">
        <div className="container-x py-12">
          <div className="flex flex-col justify-between gap-2 md:flex-row md:items-end">
            <h2 id="results-strip" className="text-xl font-semibold">
              Verified at our reference customers
            </h2>
            <Link href="/results" className="prose-link text-sm">
              See all results and videos
            </Link>
          </div>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((h) => (
              <li key={h.label}>
                <Link
                  href={h.href}
                  className="card group block h-full p-5 transition-shadow hover:shadow-lg hover:shadow-navy/5"
                >
                  <span className="block font-display text-4xl font-bold text-deep">{h.value}</span>
                  <span className="mt-1 block font-semibold">{h.label}</span>
                  <span className="mt-2 block text-sm text-slate group-hover:text-deep">{h.customer}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-slate">Every figure was verified at SAT and in load tests.</p>
        </div>
      </section>

      {/* Modules */}
      <section className="py-16 md:py-24" aria-labelledby="modules-title">
        <div className="container-x">
          <SectionHeading
            id="modules-title"
            eyebrow="Four modules, one integrated system"
            title="We fix the bottlenecks, not the whole building"
            lead="SmartFlow 360 combines four modules. We deploy the ones your floor needs and connect them to the WMS you already use."
          />
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {modules.map((m) => (
              <li key={m.id} className="card flex flex-col p-6">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy font-display text-lg font-bold text-amber"
                  aria-hidden="true"
                >
                  {m.letter}
                </span>
                <h3 className="mt-5 text-lg font-semibold">
                  <span className="sr-only">Module {m.letter}: </span>
                  {m.name}
                </h3>
                <p className="mt-2 text-slate">{m.summary}</p>
                <p className="mt-4 border-t border-line pt-4 text-[0.95rem]">
                  <strong className="text-deep">You get:</strong> {m.benefit}
                </p>
                <Link href={`/smartflow-360#${m.id}`} className="prose-link mt-auto pt-5 text-sm">
                  How {m.name} works<span className="sr-only"> (module {m.letter})</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Targeted modernization */}
      <section className="bg-surface py-16 md:py-20" aria-labelledby="targeted-title">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <SectionHeading
              id="targeted-title"
              eyebrow="A targeted modernization"
              title="More capacity within the building and budget you have"
              lead="Our value proposition is simple: more capacity, less walking and a safer floor. We get there without the cost and risk of a rebuild."
            />
          </div>
          <ul className="grid gap-4">
            {notIncluded.map((n) => (
              <li key={n.title} className="flex items-start gap-4 rounded-xl border border-line bg-white p-5">
                <svg viewBox="0 0 24 24" className="h-8 w-8 shrink-0" aria-hidden="true">
                  <circle cx="12" cy="12" r="11" fill="#102C3B" />
                  <path d="M8 8l8 8M16 8l-8 8" stroke="#F4B544" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
                <div>
                  <h3 className="text-lg font-semibold">{n.title}</h3>
                  <p className="mt-1 text-slate">{n.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Reasons */}
      <section className="py-16 md:py-24" aria-labelledby="reasons-title">
        <div className="container-x">
          <SectionHeading id="reasons-title" eyebrow="Why Nexora" title="Three reasons to choose Nexora" center />
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {reasons.map((r, i) => (
              <li key={r.title} className="card card-teal p-7">
                <span className="font-display text-5xl font-bold text-deep" aria-hidden="true">
                  0{i + 1}
                </span>
                <h3 className="mt-2 text-xl font-semibold">{r.title}</h3>
                <p className="mt-2 text-slate">{r.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-center">
            <Link href="/implementation" className="prose-link">
              See how we deliver and support every project
            </Link>
          </p>
        </div>
      </section>

      <CtaBand
        title="Tell us where your floor slows down."
        text="Send us your peak volume and your main bottleneck. We will reply with a first view of what SmartFlow 360 can do in your building."
        primary={{ href: "/contact", label: "Contact our team" }}
        secondary={{ href: "/capacity-planner", label: "Try the Capacity Planner" }}
      />
    </>
  );
}

import type { Metadata } from "next";
import { titleCase } from "@/lib/titleCase";
import Link from "next/link";
import { ActionButton } from "@/components/interactive/DemoProvider";
import { ScrollSpyNav } from "@/components/ScrollSpyNav";
import { TimelineProgress } from "@/components/TimelineProgress";
import { Arrow, CheckList, CtaBand, PageHero, SectionHeading } from "@/components/ui";
import { acceptanceGates, integrationTargets, securityControls, stages } from "@/content/data";

export const metadata: Metadata = {
  title: "Implementation & Support",
  description:
    "Six delivery stages, acceptance gates from FAT to final acceptance, WMS integration and security, training, a 24-month warranty and 90 days of hypercare.",
};

const support = [
  {
    value: "24",
    unit: "months",
    title: "Warranty",
    text: "Every SmartFlow 360 system is covered for 24 months.",
  },
  {
    value: "90",
    unit: "days",
    title: "Hypercare",
    text: "Close support after go-live, then a resident technician plus 24/7 remote support.",
  },
  {
    value: "40",
    unit: "hours",
    title: "Training per technician",
    text: "Hands-on training with an 85% pass mark, so your team runs and maintains the system.",
  },
];

const safety = [
  "Segregated routes for pedestrians and forklifts",
  "Protected crossings",
  "Emergency stops",
  "Controlled maintenance procedures",
  "Training for operators and technicians",
];

// Which acceptance gates close each delivery stage.
const gatesByStage: Record<number, string[]> = {
  1: [acceptanceGates[0]],
  3: [acceptanceGates[1]],
  4: [acceptanceGates[2]],
  5: acceptanceGates.slice(3),
};

const sections = [
  { id: "delivery", label: "Delivery stages" },
  { id: "acceptance", label: "Acceptance gates" },
  { id: "integration", label: "WMS integration and security" },
  { id: "safety", label: "Safety" },
  { id: "support", label: "Training, warranty and hypercare" },
];

const layers = [
  { title: "Your WMS", role: "System of record", items: "Orders · inventory · shipments", tone: "bg-white text-navy border-2 border-navy" },
  { title: "Nexora execution layer", role: "WES and middleware", items: "Queueing · retry · audit log", tone: "bg-navy text-white" },
  { title: "Floor and visibility", role: "Devices and dashboards", items: "Scanners · conveyors · pick-to-light · live KPIs", tone: "bg-deep text-white" },
];

export default function ImplementationPage() {
  return (
    <>
      <PageHero
        tone="mint"
        aside={<StageBars />}
        title="A plan that protects your operation"
        lead="We install around your peak and blackout periods, test at every gate, and stay with you after go-live. Your floor keeps shipping while it modernizes."
        actions={
          <ActionButton action={{ kind: "demo", topic: "planning" }} className="btn btn-primary btn-lg">
            Book a Planning Session
            <Arrow />
          </ActionButton>
        }
      />

      <ScrollSpyNav items={sections} label="Sections on this page" variant="bar" allWidths />

      {/* Delivery: sticky intro beside a vertical timeline with the gates pinned to their stages */}
      <section id="delivery" className="scroll-mt-36 py-16 md:py-24" aria-labelledby="delivery-title">
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div className="lg:sticky lg:top-40 lg:self-start">
            <SectionHeading
              id="delivery-title"
              title="Six stages from audit to handover"
              lead="Integration is tested in staging before any site work. Installation is phased and planned around your blackout windows."
            />
            <p className="mt-6 flex items-center gap-3 text-[0.95rem]">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber px-3 py-1 font-display text-sm font-bold text-navy">
                <GateIcon /> Gate
              </span>
              marks a test the system must pass before the next stage starts.
            </p>
            <p className="mt-3 text-sm text-slate">FAT: factory acceptance test. SAT: site acceptance test.</p>
          </div>

          <TimelineProgress>
          <ol className="relative">
            {stages.map((s, i) => (
              <li key={s.name} className="relative grid grid-cols-[3rem_1fr] gap-5 pb-10 last:pb-0">
                <span
                  className="node h-12 w-12 text-lg"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div className="pt-1.5">
                  <h3 className="text-xl font-bold md:text-2xl">
                    <span className="sr-only">Stage {i + 1}: </span>
                    {titleCase(s.name)}
                  </h3>
                  <p className="mt-2 text-slate">{s.text}</p>
                  {gatesByStage[i] && (
                    <ul className="mt-3 flex flex-wrap gap-2" aria-label="Acceptance gates in this stage">
                      {gatesByStage[i].map((g) => (
                        <li
                          key={g}
                          className="inline-flex items-center gap-1.5 rounded-full bg-amber px-3 py-1 font-display text-sm font-bold text-navy"
                        >
                          <GateIcon />
                          {g}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
          </TimelineProgress>
        </div>
      </section>

      {/* Acceptance gates as one connected track */}
      <section id="acceptance" className="on-dark scroll-mt-36 bg-navy py-16 text-white md:py-20" aria-labelledby="acceptance-title">
        <div className="container-x">
          <div className="max-w-3xl">
            <h2 id="acceptance-title" className="h-section text-white">
              Tested at Every Gate
            </h2>
            <p className="lead mt-4">You accept the system step by step. Each gate must pass before the next one starts.</p>
          </div>
          <ol className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
            <span className="absolute top-5 right-[8%] left-[8%] hidden h-0.5 bg-teal/50 lg:block" aria-hidden="true" />
            {acceptanceGates.map((g, i) => (
              <li key={g} className="relative flex items-center gap-4 lg:flex-col lg:items-center lg:text-center">
                <span className="node h-10 w-10">
                  {i + 1}
                </span>
                <span className="font-display text-lg leading-snug font-semibold text-white">{g}</span>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-white/80">
            Every result on our{" "}
            <Link href="/results" className="prose-link">
              Results page
            </Link>{" "}
            passed these gates.
          </p>
        </div>
      </section>

      {/* Integration: architecture, targets bento and security */}
      <section id="integration" className="scroll-mt-36 py-16 md:py-24" aria-labelledby="integration-title">
        <div className="container-x">
          <SectionHeading
            id="integration-title"
            title="Your WMS stays in charge"
            lead="Your existing WMS remains the system of record for orders, inventory and shipments. We add an execution (WES) and middleware layer that drives the floor and feeds live KPI dashboards."
          />

          <ol className="mt-12 grid items-stretch gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr]" aria-label="Integration architecture">
            {layers.map((l, i) => (
              <li key={l.title} className="contents">
                <div className={`rounded-2xl p-6 ${l.tone}`}>
                  <p className={`font-display text-sm font-semibold ${i === 0 ? "text-deep" : "text-teal"}`}>{l.role}</p>
                  <p className="mt-1 font-display text-xl font-bold">{l.title}</p>
                  <p className={`mt-3 ${i === 0 ? "text-slate" : "text-white/85"}`}>{l.items}</p>
                </div>
                {i < layers.length - 1 && (
                  <span className="flex items-center justify-center text-amber-dark" aria-hidden="true">
                    <svg viewBox="0 0 40 24" className="h-6 w-10 rotate-90 lg:rotate-0">
                      <path d="M4 12h32M10 6l-6 6 6 6M30 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </li>
            ))}
          </ol>

          <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
            <div>
              <h3 className="text-2xl font-bold">Design Targets</h3>
              <ul className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
                {integrationTargets.map((t, i) => (
                  <li
                    key={t.label}
                    className={`flex flex-col rounded-2xl p-5 ${
                      i === 0
                        ? "tile-dark col-span-2 justify-end md:row-span-2 md:p-7"
                        : `tile-soft ${i === integrationTargets.length - 1 ? "col-span-2 md:col-span-1" : ""}`
                    }`}
                  >
                    <span
                      className={`block font-display font-bold ${i === 0 ? "text-6xl text-amber md:text-7xl" : "text-3xl text-deep"}`}
                    >
                      {t.value}
                    </span>
                    <span className={`mt-1 block ${i === 0 ? "text-lg text-white/85" : "text-slate"}`}>{t.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-line p-6 md:p-7">
              <h3 className="text-2xl font-bold">Security Controls</h3>
              <div className="mt-5">
                <CheckList items={securityControls} />
              </div>
              <div className="mt-7 border-t border-line pt-6">
                <p className="font-display font-semibold">See the live floor view</p>
                <p className="text-sm text-slate">A preview of the KPI dashboard, with sample data.</p>
                <ActionButton action={{ kind: "dashboard" }} className="btn btn-deep mt-4">
                  View Sample Dashboard
                </ActionButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety */}
      <section id="safety" className="scroll-mt-36 bg-surface py-16 md:py-24" aria-labelledby="safety-title">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              id="safety-title"
              title="A safer floor is part of the design"
              lead="Safety is built into the layout, not added at the end."
            />
            <div className="mt-8 flex items-end gap-5">
              <p className="font-display text-6xl leading-none font-bold text-deep md:text-7xl">13 → 4</p>
              <p className="pb-1">
                near-misses per year at TecnoSur Distribución, after segregated routes.{" "}
                <Link href="/results#tecnosur" className="prose-link">
                  See the TecnoSur results
                </Link>
              </p>
            </div>
          </div>
          <div className="rounded-3xl bg-white p-6 md:p-8">
            <CheckList items={safety} className="space-y-4 text-lg" />
          </div>
        </div>
      </section>

      {/* Support: three commitments in one ruled row */}
      <section id="support" className="scroll-mt-36 py-16 md:py-24" aria-labelledby="support-title">
        <div className="container-x">
          <SectionHeading
            id="support-title"
            title="Training, warranty and hypercare"
            lead="Go-live is not the end of the project. We train your team, support the first months closely, and keep a technician on site."
          />
          <ul className="mt-12 grid border-t-2 border-navy md:grid-cols-3">
            {support.map((s, i) => (
              <li
                key={s.title}
                className={`py-8 md:px-8 ${i > 0 ? "border-t border-line md:border-t-0 md:border-l" : "md:pl-0"}`}
              >
                <p className="font-display">
                  <span className="text-6xl font-bold text-deep">{s.value}</span>{" "}
                  <span className="text-xl font-semibold text-slate">{s.unit}</span>
                </p>
                <h3 className="mt-3 text-xl font-bold">{titleCase(s.title)}</h3>
                <p className="mt-2 text-slate">{s.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Plan your modernization around your calendar."
        text="Tell us your peak seasons and blackout windows. We will show you how a phased installation fits them."
        action={
          <ActionButton action={{ kind: "demo", topic: "planning" }} className="btn btn-primary btn-lg">
            Book a Planning Session
            <Arrow />
          </ActionButton>
        }
      />
    </>
  );
}

function GateIcon() {
  return (
    <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
      <path d="M2.5 6.5l2.2 2.2L9.5 3.8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/** Schematic plan: six stages, overlapping where work runs in parallel, with gates at the end of each test stage. */
function StageBars() {
  const rows = [
    { label: "Audit and WMS spec", start: 0, span: 3, gate: false },
    { label: "Build and FAT", start: 2, span: 4, gate: true },
    { label: "Installation", start: 5, span: 3, gate: false },
    { label: "Commissioning and SAT", start: 7, span: 2, gate: true },
    { label: "Training and pilot", start: 8, span: 3, gate: true },
    { label: "Full load and handover", start: 10, span: 2, gate: true },
  ];
  return (
    <figure className="card p-5 md:p-6">
      <div
        role="img"
        aria-label="Schematic plan: six stages from audit to handover, overlapping where work runs in parallel, with acceptance gates after FAT, SAT, the pilot and the full-load test."
        className="space-y-2.5"
      >
        {rows.map((r, i) => (
          <div key={r.label} className="grid grid-cols-[8.5rem_1fr] items-center gap-3 sm:grid-cols-[10rem_1fr]">
            <span className="text-sm font-semibold">{r.label}</span>
            <span className="relative grid h-7 grid-cols-12 rounded-md bg-surface">
              <span
                className={`bar-grow relative rounded-md shadow-[inset_0_1px_0_rgb(255_255_255/0.25),0_4px_10px_-6px_rgb(16_44_59/0.6)] ${
                  i % 2 === 0 ? "bg-gradient-to-b from-[#1d4558] to-navy" : "bg-gradient-to-b from-[#1a7680] to-deep"
                }`}
                style={{ gridColumn: `${r.start + 1} / span ${r.span}`, animationDelay: `${0.25 + i * 0.12}s` }}
              >
                {r.gate && (
                  <span className="absolute top-1/2 -right-2 h-3.5 w-3.5 -translate-y-1/2 rotate-45 rounded-[3px] bg-amber shadow-sm ring-2 ring-white" />
                )}
              </span>
            </span>
          </div>
        ))}
      </div>
      <figcaption className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-3 text-sm text-slate">
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rotate-45 rounded-[2px] bg-amber" aria-hidden="true" /> Acceptance gate
        </span>
        <span>Schematic, not to scale</span>
      </figcaption>
    </figure>
  );
}

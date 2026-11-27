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

// Customer Service & Support: what the customer gets, response targets, then the detail on demand.
const supportOffer = [
  { title: "24/7 support", text: "Phone, email, ticket portal and secure remote diagnosis" },
  { title: "90-day hypercare", text: "At least 2 technicians on site per shift, 6 days a week" },
  { title: "Resident technician", text: "On site Monday to Saturday after hypercare, during the warranty" },
  { title: "24-month warranty", text: "Equipment, software and integration, from final acceptance" },
  { title: "Spare parts", text: "Critical spares on site and parts availability for 10 years" },
  { title: "Training", text: "40 hours per technician, 85% pass mark, available in Spanish" },
];

const responseLevels = [
  {
    level: "Critical",
    meaning: "Operation stopped or safety hazard",
    targets: ["Call answered in 15 min", "Remote response in 30 min", "On site in 4 h (2 h in campaigns)", "Restored in 8 h"],
    dot: "bg-before",
  },
  {
    level: "Major",
    meaning: "Capacity down more than 20%",
    targets: ["Remote response in 2 h", "On site in 8 h", "Restored in 24 h"],
    dot: "bg-amber",
  },
  {
    level: "Minor",
    meaning: "Small defect",
    targets: ["Response in 2 business days"],
    dot: "bg-teal",
  },
];

const supportDetail: { title: string; text?: string; steps?: string[]; plans?: { name: string; text: string }[] }[] = [
  {
    title: "Preventive maintenance",
    text: "Daily inspections, weekly alignment checks, monthly lubrication and safety tests, quarterly thermography and backup tests, and a full annual safety review. Work is scheduled outside operating peaks.",
  },
  {
    title: "Spare parts",
    text: "The on-site kit covers at least 95% of failures expected in the first 24 months. Other parts arrive in 5 business days (available in Peru) or 15 business days (imported).",
  },
  {
    title: "Escalation for critical events",
    steps: ["Resident team immediately", "On-call engineer at 1 hour", "Technical lead at 2 hours", "Project Director at 4 hours"],
  },
  {
    title: "Reports",
    text: "Live dashboards, a monthly report on availability and repair times, and a quarterly business review.",
  },
  {
    title: "After the warranty",
    plans: [
      { name: "Remote Care", text: "24/7 remote support and software updates" },
      { name: "Preventive Care", text: "Remote Care plus scheduled visits and spares replenishment" },
      { name: "Resident Care", text: "Preventive Care plus a resident technician" },
    ],
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
  { id: "support", label: "Customer service & support" },
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

      {/* Customer Service & Support: what you get and how fast we respond first; the detail opens on demand */}
      <section id="support" className="scroll-mt-36 py-16 md:py-24" aria-labelledby="support-title">
        <div className="container-x">
          <SectionHeading
            id="support-title"
            title="Customer Service & Support"
            lead="Go-live is not the end of the project. We stay with you, on site and remotely, with response times you can measure."
          />

          <h3 className="mt-12 text-2xl font-bold">{titleCase("What you get")}</h3>
          <ul className="mt-5 grid border-t-2 border-navy sm:grid-cols-2 lg:grid-cols-3">
            {supportOffer.map((s) => (
              <li key={s.title} className="border-b border-line py-5 sm:pr-6">
                <p className="font-display text-lg font-bold text-deep">{s.title}</p>
                <p className="mt-1 text-slate">{s.text}</p>
              </li>
            ))}
          </ul>

          <h3 className="mt-14 text-2xl font-bold">{titleCase("How fast we respond")}</h3>
          <ul className="mt-5 space-y-3">
            {responseLevels.map((r) => (
              <li key={r.level} className="tile-soft grid gap-4 rounded-2xl p-5 md:grid-cols-[14rem_1fr] md:items-center md:gap-8 md:p-6">
                <div>
                  <p className="flex items-center gap-2.5 font-display text-lg font-bold">
                    <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${r.dot}`} aria-hidden="true" />
                    {r.level}
                  </p>
                  <p className="mt-1 text-sm text-slate">{r.meaning}</p>
                </div>
                <ul className="flex flex-wrap gap-2" aria-label={`${r.level} response targets`}>
                  {r.targets.map((t) => (
                    <li key={t} className="rounded-full border border-line bg-white px-3 py-1.5 text-[0.95rem]">
                      {t}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-slate">Our targets for each level.</p>

          <div className="mt-14 border-t-2 border-navy">
            {supportDetail.map((d) => (
              <details key={d.title} className="group border-b border-line">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  {titleCase(d.title)}
                  <svg
                    viewBox="0 0 16 16"
                    className="h-4 w-4 shrink-0 text-deep transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  >
                    <path d="M3.5 6l4.5 4.5L12.5 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <div className="measure pb-6 text-slate">
                  {d.text && <p>{d.text}</p>}
                  {d.steps && (
                    <ol className="space-y-2">
                      {d.steps.map((step, i) => (
                        <li key={step} className="flex items-baseline gap-3">
                          <span className="font-display text-sm font-bold text-deep">{i + 1}</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  )}
                  {d.plans && (
                    <ul className="space-y-2">
                      {d.plans.map((plan) => (
                        <li key={plan.name}>
                          <strong className="font-display text-navy">{plan.name}:</strong> {plan.text}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </details>
            ))}
          </div>

          <p className="mt-10">
            <Link href="/contact" className="btn btn-deep">
              {titleCase("Talk to our support team")}
              <Arrow />
            </Link>
          </p>
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

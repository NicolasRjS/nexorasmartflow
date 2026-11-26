import type { Metadata } from "next";
import Link from "next/link";
import { CheckList, CtaBand, PageHero, SectionHeading } from "@/components/ui";
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

export default function ImplementationPage() {
  return (
    <>
      <PageHero
        eyebrow="Implementation & Support"
        title="A plan that protects your operation"
        lead="We install around your peak and blackout periods, test at every gate, and stay with you after go-live. Your floor keeps shipping while it modernizes."
      >
        <a href="#delivery" className="btn btn-primary">
          See the six stages
        </a>
        <a href="#support" className="btn btn-outline-light">
          Warranty and support
        </a>
      </PageHero>

      <nav aria-label="Sections on this page" className="border-b border-line bg-surface">
        <ul className="container-x flex flex-wrap gap-x-6 gap-y-2 py-4 text-sm">
          <li>
            <a href="#delivery" className="prose-link">
              Delivery stages
            </a>
          </li>
          <li>
            <a href="#acceptance" className="prose-link">
              Acceptance gates
            </a>
          </li>
          <li>
            <a href="#integration" className="prose-link">
              WMS integration and security
            </a>
          </li>
          <li>
            <a href="#safety" className="prose-link">
              Safety
            </a>
          </li>
          <li>
            <a href="#support" className="prose-link">
              Training, warranty and hypercare
            </a>
          </li>
        </ul>
      </nav>

      <section id="delivery" className="py-16 md:py-24" aria-labelledby="delivery-title">
        <div className="container-x">
          <SectionHeading
            id="delivery-title"
            eyebrow="Delivery approach"
            title="Six stages from audit to handover"
            lead="Integration is tested in staging before any site work. Installation is phased and planned around your blackout windows."
          />
          <ol className="relative mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {stages.map((s, i) => (
              <li key={s.name} className="card flex gap-4 p-6">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy font-display text-lg font-bold text-amber"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">
                    <span className="sr-only">Stage {i + 1}: </span>
                    {s.name}
                  </h3>
                  <p className="mt-2 text-slate">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="acceptance" className="on-dark bg-navy py-16 text-white md:py-20" aria-labelledby="acceptance-title">
        <div className="container-x">
          <p className="eyebrow">Acceptance</p>
          <h2 id="acceptance-title" className="mt-2 text-3xl font-bold text-white">
            Tested at every gate
          </h2>
          <p className="measure mt-4 text-white/85">
            You accept the system step by step. Each gate must pass before the next one starts.
          </p>
          <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {acceptanceGates.map((g, i) => (
              <li
                key={g}
                className="relative flex min-h-20 flex-col justify-center rounded-lg border border-teal/50 bg-navy-2 px-4 py-3"
              >
                <span className="font-display text-sm font-semibold text-teal">
                  Gate {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display font-semibold">{g}</span>
                {i < acceptanceGates.length - 1 && (
                  <svg
                    viewBox="0 0 16 16"
                    className="absolute top-1/2 -right-3 z-10 hidden h-4 w-4 -translate-y-1/2 text-amber lg:block"
                    aria-hidden="true"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="2.5" />
                  </svg>
                )}
              </li>
            ))}
          </ol>
          <p className="mt-8 text-sm text-white/75">
            FAT: factory acceptance test. SAT: site acceptance test.
          </p>
        </div>
      </section>

      <section id="integration" className="py-16 md:py-24" aria-labelledby="integration-title">
        <div className="container-x">
          <SectionHeading
            id="integration-title"
            eyebrow="WMS integration and security"
            title="Your WMS stays in charge"
            lead="Your existing WMS remains the system of record for orders, inventory and shipments. We add an execution (WES) and middleware layer that drives the floor and feeds live KPI dashboards."
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h3 className="text-xl font-semibold">Design targets</h3>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                {integrationTargets.map((t) => (
                  <li key={t.label} className="rounded-xl border border-line bg-surface p-5">
                    <span className="block font-display text-3xl font-bold text-deep">{t.value}</span>
                    <span className="mt-1 block text-slate">{t.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card h-fit p-6 md:p-7">
              <h3 className="text-xl font-semibold">Security controls</h3>
              <div className="mt-5">
                <CheckList items={securityControls} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="safety" className="bg-surface py-16 md:py-20" aria-labelledby="safety-title">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            id="safety-title"
            eyebrow="Safety"
            title="A safer floor is part of the design"
            lead={
              <>
                Safety is built into the layout, not added at the end. At TecnoSur Distribución, segregated routes cut
                near-misses from 13 to 4 per year.{" "}
                <Link href="/results#tecnosur" className="prose-link">
                  See the TecnoSur results
                </Link>
              </>
            }
          />
          <div className="card p-6 md:p-8">
            <CheckList items={safety} />
          </div>
        </div>
      </section>

      <section id="support" className="py-16 md:py-24" aria-labelledby="support-title">
        <div className="container-x">
          <SectionHeading
            id="support-title"
            eyebrow="After go-live"
            title="Training, warranty and hypercare"
            lead="Go-live is not the end of the project. We train your team, support the first months closely, and keep a technician on site."
          />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {support.map((s) => (
              <li key={s.title} className="card card-teal p-7">
                <p className="font-display">
                  <span className="text-5xl font-bold text-deep">{s.value}</span>{" "}
                  <span className="text-lg font-semibold text-slate">{s.unit}</span>
                </p>
                <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-slate">{s.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Plan your modernization around your calendar."
        text="Tell us your peak seasons and blackout windows. We will show you how a phased installation fits them."
        primary={{ href: "/contact", label: "Plan a project with us" }}
        secondary={{ href: "/results", label: "See verified results" }}
      />
    </>
  );
}

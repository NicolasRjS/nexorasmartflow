import type { Metadata } from "next";
import { titleCase } from "@/lib/titleCase";
import Image from "next/image";
import Link from "next/link";
import { FlowDiagram } from "@/components/FlowDiagram";
import { ModuleExplorer } from "@/components/ModuleExplorer";
import { ActionButton } from "@/components/interactive/DemoProvider";
import { PickRouteToggle } from "@/components/PickRouteToggle";
import { ScrollSpyNav } from "@/components/ScrollSpyNav";
import { Arrow, CheckList, CtaBand, PageHero, SectionHeading } from "@/components/ui";
import { modules, notIncluded } from "@/content/data";
import { media } from "@/content/site";

export const metadata: Metadata = {
  title: "SmartFlow 360",
  description:
    "Nexora SmartFlow 360 combines four modules: Smart Material Flow, Intelligent Picking, Digital Integration, and Safe & Scalable Operations.",
};

const sections = [
  ...modules.map((m) => ({ id: m.id, label: m.name, marker: m.letter })),
  { id: "material-flow", label: "Material flow" },
  { id: "scope", label: "What we do not do" },
];

const verified: Record<string, { href: string; text: string } | undefined> = {
  "module-a": { href: "/results#pacifico-beauty", text: "Same-day dispatch up to 98.5% at Pacífico Beauty" },
  "module-d": { href: "/results#tecnosur", text: "69% fewer near-misses at TecnoSur Distribución" },
};

export default function SmartFlowPage() {
  return (
    <>
      <PageHero
        title="Four modules. One integrated system."
        lead="SmartFlow 360 removes the bottlenecks in your distribution center: queues between stations, long pick routes, blind spots in your data and unsafe crossings. Each module targets one of them."
        actions={
          <>
            <ActionButton action={{ kind: "quote" }} className="btn btn-primary btn-lg">
              Request a Quote
              <Arrow />
            </ActionButton>
            <ActionButton action={{ kind: "brochure" }} className="arrow-link min-h-11 cursor-pointer">
              Print the One-Page Summary
            </ActionButton>
          </>
        }
        tone="light"
        aside={<ModuleExplorer />}
      />

      <div className="container-x grid gap-x-14 lg:grid-cols-[15rem_minmax(0,1fr)]">
        <div className="hidden pt-16 md:pt-24 lg:block">
          <ScrollSpyNav items={sections} label="Sections on this page" variant="rail" />
        </div>

        <div className="min-w-0">
          <ScrollSpyNav items={sections} label="Sections on this page" variant="bar" />

          <section className="pt-12 pb-4 md:pt-24" aria-labelledby="modules-title">
            <SectionHeading
              id="modules-title"
              title="What each module does, and what you get"
              lead="We start from your bottlenecks and deploy only the modules that remove them. Every module connects to the WMS you already run."
            />
          </section>

          {modules.map((m) => (
            <article
              key={m.id}
              id={m.id}
              aria-labelledby={`${m.id}-title`}
              className="scroll-mt-36 border-b border-line py-12 last-of-type:border-b-0 md:py-16 lg:scroll-mt-28"
            >
              <div className="flex items-start gap-5">
                <span className="module-letter h-16 w-16 text-3xl" aria-hidden="true">
                  {m.letter}
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-slate">
                    Module {m.letter} · removes {m.pain.toLowerCase()}
                  </p>
                  <h3 id={`${m.id}-title`} className="mt-1 text-3xl font-bold md:text-[2.1rem]">
                    {m.name}
                  </h3>
                </div>
              </div>

              <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                <div>
                  <p className="font-display text-xl leading-snug font-semibold text-deep md:text-2xl">{m.benefit}</p>
                  <p className="mt-4 text-lg text-slate">{m.summary}</p>
                </div>
                <div className="tile-soft rounded-2xl p-6">
                  <h4 className="font-display font-semibold">Key features</h4>
                  <div className="mt-4">
                    <CheckList items={m.features} />
                  </div>
                </div>
              </div>

              {verified[m.id] && (
                <p className="mt-6 text-[0.95rem]">
                  <span className="font-semibold">Verified result:</span>{" "}
                  <Link href={verified[m.id]!.href} className="prose-link">
                    {verified[m.id]!.text}
                  </Link>
                </p>
              )}

              {m.id === "module-b" && (
                <div className="mt-8">
                  <PickRouteToggle />
                </div>
              )}

              {m.id === "module-c" && (
                <div className="mt-8 flex flex-col gap-5 rounded-2xl border border-line p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-display text-lg font-semibold">See what the floor view looks like</p>
                    <p className="text-slate">
                      A preview with sample data. Design targets and security controls are on{" "}
                      <Link href="/implementation#integration" className="prose-link">
                        WMS integration and security
                      </Link>
                      .
                    </p>
                  </div>
                  <ActionButton action={{ kind: "dashboard" }} className="btn btn-deep shrink-0">
                    View Sample Dashboard
                  </ActionButton>
                </div>
              )}
            </article>
          ))}

        </div>
      </div>

      <div className="container-x">
      <section id="material-flow" className="scroll-mt-36 py-14 md:py-20 lg:scroll-mt-28" aria-labelledby="flow-title">
        <SectionHeading
          id="flow-title"
          title="Automated where it pays, assisted where people decide"
          lead="Every order moves through seven steps. We automate the repetitive moves, assist the steps that need judgment, and keep packing in skilled hands."
        />
        <div className="mt-10">
          <FlowDiagram />
        </div>
      </section>

      <section id="scope" className="scroll-mt-36 pb-6 lg:scroll-mt-28" aria-labelledby="scope-title">
        <SectionHeading
          id="scope-title"
          title="What we do not do"
          lead="SmartFlow 360 is a targeted modernization of the building you already have. Keeping the scope tight keeps cost and risk low."
        />
        <ul className="mt-10 grid gap-x-8 gap-y-6 border-t-2 border-navy pt-8 md:grid-cols-3">
          {notIncluded.map((n) => (
            <li key={n.title} className="flex gap-4">
              <svg viewBox="0 0 24 24" className="mt-1 h-7 w-7 shrink-0" aria-hidden="true">
                <circle cx="12" cy="12" r="11" fill="#102C3B" />
                <path d="M8.5 8.5l7 7M15.5 8.5l-7 7" stroke="#F4B544" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
              <div>
                <h3 className="text-xl font-bold">{titleCase(n.title)}</h3>
                <p className="mt-1 text-slate">{n.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-14 grid items-center gap-8 rounded-3xl bg-surface p-6 md:grid-cols-[14rem_1fr] md:p-8">
          <Image
            src="/media/brochure-page-1-thumb.jpg"
            alt="Cover panels of the Nexora SmartFlow 360 tri-fold brochure"
            width={720}
            height={556}
            className="h-auto w-full rounded-xl shadow-md"
          />
          <div>
            <h3 className="text-2xl font-bold">Take SmartFlow 360 to Your Next Meeting</h3>
            <p className="mt-2 text-slate">
              Print a One-Page Summary of the modules, the material flow and our verified results, or download the
              full tri-fold brochure.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
              <ActionButton action={{ kind: "brochure" }} className="btn btn-outline">
                Open the Print View
              </ActionButton>
              <a href={media.brochurePdf} download className="arrow-link">
                Download the Brochure (PDF, 1.3 MB)
              </a>
            </div>
          </div>
        </div>
      </section>
      </div>

      <CtaBand
        title="Get a quote for the modules your floor needs."
        text="Tell us your main bottleneck and the modules you are considering. We reply with the scope that fits and the next step."
        action={
          <ActionButton action={{ kind: "quote" }} className="btn btn-primary btn-lg">
            Request a Quote
            <Arrow />
          </ActionButton>
        }
      />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { FlowDiagram } from "@/components/FlowDiagram";
import { PickRouteToggle } from "@/components/PickRouteToggle";
import { CheckList, CtaBand, PageHero, SectionHeading } from "@/components/ui";
import { modules, notIncluded } from "@/content/data";

export const metadata: Metadata = {
  title: "SmartFlow 360",
  description:
    "Nexora SmartFlow 360 combines four modules: Smart Material Flow, Intelligent Picking, Digital Integration, and Safe & Scalable Operations.",
};

export default function SmartFlowPage() {
  return (
    <>
      <PageHero
        eyebrow="Nexora SmartFlow 360"
        title="Four modules. One integrated system."
        lead="SmartFlow 360 removes the bottlenecks in your distribution center: queues between stations, long pick routes, blind spots in your data and unsafe crossings. Each module targets one of them."
      >
        <a href="#modules" className="btn btn-primary">
          Explore the modules
        </a>
        <a href="#material-flow" className="btn btn-outline-light">
          See the material flow
        </a>
      </PageHero>

      {/* Module index */}
      <nav aria-label="Modules on this page" className="border-b border-line bg-surface">
        <ul className="container-x flex flex-wrap gap-x-6 gap-y-2 py-4 text-sm">
          {modules.map((m) => (
            <li key={m.id}>
              <a href={`#${m.id}`} className="prose-link">
                {m.letter}. {m.name}
              </a>
            </li>
          ))}
          <li>
            <a href="#material-flow" className="prose-link">
              Material flow
            </a>
          </li>
          <li>
            <a href="#scope" className="prose-link">
              What we do not do
            </a>
          </li>
        </ul>
      </nav>

      <section id="modules" className="py-16 md:py-24" aria-labelledby="modules-title">
        <div className="container-x">
          <SectionHeading
            id="modules-title"
            eyebrow="The modules"
            title="What each module does, and what you get"
            lead="We start from your bottlenecks and deploy only the modules that remove them. Every module connects to the WMS you already run."
          />

          <div className="mt-14 space-y-8">
            {modules.map((m) => (
              <article
                key={m.id}
                id={m.id}
                aria-labelledby={`${m.id}-title`}
                className="card grid gap-8 p-6 md:p-10 lg:grid-cols-[1fr_1.1fr]"
              >
                <div>
                  <div className="flex items-center gap-4">
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy font-display text-xl font-bold text-amber"
                      aria-hidden="true"
                    >
                      {m.letter}
                    </span>
                    <p className="eyebrow">Module {m.letter}</p>
                  </div>
                  <h3 id={`${m.id}-title`} className="mt-4 text-2xl font-bold">
                    {m.name}
                  </h3>
                  <p className="mt-3 text-lg text-slate">{m.summary}</p>
                  <p className="mt-5 rounded-lg bg-mint p-4">
                    <strong className="text-deep">You get:</strong> {m.benefit}
                  </p>
                </div>
                <div>
                  <h4 className="font-display text-sm font-semibold tracking-[0.14em] text-slate uppercase">
                    Key features
                  </h4>
                  <div className="mt-4">
                    <CheckList items={m.features} />
                  </div>
                  {m.id === "module-c" && (
                    <p className="mt-6 text-sm">
                      Design targets and security controls:{" "}
                      <Link href="/implementation#integration" className="prose-link">
                        WMS integration and security
                      </Link>
                    </p>
                  )}
                  {m.id === "module-d" && (
                    <p className="mt-6 text-sm">
                      Verified result:{" "}
                      <Link href="/results#tecnosur" className="prose-link">
                        69% fewer near-misses at TecnoSur Distribución
                      </Link>
                    </p>
                  )}
                  {m.id === "module-a" && (
                    <p className="mt-6 text-sm">
                      Verified result:{" "}
                      <Link href="/results#pacifico-beauty" className="prose-link">
                        same-day dispatch up to 98.5% at Pacífico Beauty
                      </Link>
                    </p>
                  )}
                </div>
                {m.id === "module-b" && (
                  <div className="lg:col-span-2">
                    <PickRouteToggle />
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="material-flow" className="bg-surface py-16 md:py-24" aria-labelledby="flow-title">
        <div className="container-x">
          <SectionHeading
            id="flow-title"
            eyebrow="Material flow"
            title="Automated where it pays, assisted where people decide"
            lead="Every order moves through seven steps. We automate the repetitive moves, assist the steps that need judgment, and keep packing in skilled hands."
          />
          <div className="mt-12">
            <FlowDiagram />
          </div>
        </div>
      </section>

      <section id="scope" className="py-16 md:py-24" aria-labelledby="scope-title">
        <div className="container-x">
          <SectionHeading
            id="scope-title"
            eyebrow="Scope"
            title="What we do not do"
            lead="SmartFlow 360 is a targeted modernization of the building you already have. Keeping the scope tight keeps cost and risk low."
          />
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {notIncluded.map((n) => (
              <li key={n.title} className="rounded-xl border border-line bg-surface p-6">
                <h3 className="text-lg font-semibold">{n.title}</h3>
                <p className="mt-2 text-slate">{n.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="How much capacity does your peak hour need?"
        text="Enter your peak-day volume and see the minimum pickers, packing stations and sortation lanes for your peak hour."
        primary={{ href: "/capacity-planner", label: "Open the Capacity Planner" }}
        secondary={{ href: "/contact", label: "Talk to an engineer" }}
      />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { CapacityPlanner } from "@/components/CapacityPlanner";
import { EstimateReviewButton } from "@/components/EstimateReviewButton";
import { Arrow, BlueprintGrid, CtaBand, PageHero, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Capacity Planner",
  description:
    "Estimate your peak-hour load and the minimum pickers, packing stations and sortation lanes your distribution center needs.",
};

const steps = [
  { title: "Average orders per hour", formula: "Orders on the peak day ÷ operating hours" },
  { title: "Peak orders per hour", formula: "Average orders per hour × peak-hour factor" },
  { title: "Peak units per hour", formula: "Peak orders per hour × units per order" },
];

const rates = [
  { value: "100", unit: "units per hour", stage: "per picker" },
  { value: "60", unit: "orders per hour", stage: "per packing station" },
  { value: "2,600", unit: "units per hour", stage: "per sortation lane, plus one spare lane" },
];

export default function CapacityPlannerPage() {
  return (
    <>
      <PageHero
        compact
        tone="teal"
        backdrop={<BlueprintGrid />}
        title="Size every stage for your peak hour"
        lead="Your distribution center is only as fast as its slowest stage in the busiest hour. Enter your peak day and see the minimum pickers, packing stations and sortation lanes you need."
      />

      <section className="py-10 md:py-14" aria-label="Calculator">
        <div className="container-x">
          <CapacityPlanner />
        </div>
      </section>

      <section className="bg-surface py-16 md:py-24" aria-labelledby="method-title">
        <div className="container-x">
          <SectionHeading
            id="method-title"
            title="How the estimate works"
            lead="We size each stage for the peak hour, not the daily average, because queues form in the busiest hour."
          />
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="relative rounded-2xl tile-soft p-6">
                <span className="font-display text-sm font-semibold text-deep">Step {i + 1}</span>
                <h3 className="mt-1 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 font-display text-slate">{s.formula}</p>
                {i < steps.length - 1 && (
                  <Arrow className="absolute top-1/2 -right-4 z-10 hidden h-5 w-5 -translate-y-1/2 text-deep md:block" />
                )}
              </li>
            ))}
          </ol>

          <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div>
              <h3 className="text-2xl font-bold">Planning Rates</h3>
              <ul className="mt-5 divide-y divide-line border-y border-line">
                {rates.map((r) => (
                  <li key={r.stage} className="flex items-baseline gap-4 py-4">
                    <span className="w-24 shrink-0 font-display text-3xl font-bold text-deep">{r.value}</span>
                    <span>
                      <span className="font-semibold">{r.unit}</span> {r.stage}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-slate">
                The spare lane provides N−1 redundancy: if any single lane stops, the others still carry the full peak.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">Design Headroom</h3>
              <p className="mt-4 text-lg">
                We add 15% headroom so the floor absorbs bad hours without queues. Larger volumes add modules, not a new
                building.
              </p>
              <p className="mt-4 text-slate">
                Planning rates are confirmed by time studies in our{" "}
                <Link href="/implementation#delivery" className="prose-link">
                  engineering audit
                </Link>
                , then proven in the full-load test before handover.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Turn this estimate into a design."
        text="Send your numbers to our engineers. They validate them against your floor plan and WMS data."
        action={<EstimateReviewButton />}
      />
    </>
  );
}

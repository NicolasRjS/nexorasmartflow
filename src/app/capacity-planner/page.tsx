import type { Metadata } from "next";
import Link from "next/link";
import { CapacityPlanner } from "@/components/CapacityPlanner";
import { CtaBand, PageHero, SectionHeading } from "@/components/ui";

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

export default function CapacityPlannerPage() {
  return (
    <>
      <PageHero
        eyebrow="Capacity Planner"
        title="Size every stage for your peak hour"
        lead="Your distribution center is only as fast as its slowest stage in the busiest hour. Enter your peak day and see the minimum pickers, packing stations and sortation lanes you need."
      />

      <section className="py-14 md:py-20" aria-label="Calculator">
        <div className="container-x">
          <CapacityPlanner />
        </div>
      </section>

      <section className="bg-surface py-16 md:py-20" aria-labelledby="method-title">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              id="method-title"
              eyebrow="Method"
              title="How the estimate works"
              lead="We size each stage for the peak hour, not the daily average, because queues form in the busiest hour."
            />
            <ol className="mt-8 space-y-4">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-4 rounded-xl border border-line bg-white p-5">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy font-display font-bold text-amber"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold">{s.title}</h3>
                    <p className="text-slate">{s.formula}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-lg font-semibold">Planning rates</h3>
              <ul className="mt-3 space-y-2 text-slate">
                <li>Pickers: 100 units per hour each</li>
                <li>Packing stations: 60 orders per hour each</li>
                <li>Sortation lanes: 2,600 units per hour each, plus one spare lane</li>
              </ul>
              <p className="mt-4 text-sm">
                The spare lane provides N−1 redundancy: if any single lane stops, the others still carry the full
                peak.
              </p>
            </div>
            <div className="card card-teal p-6">
              <h3 className="text-lg font-semibold">Design headroom and the reference design</h3>
              <p className="mt-3 text-slate">
                We add 15% headroom so the floor absorbs bad hours without queues. The SmartFlow 360 reference design
                for 25,000 orders per day uses 50 pickers, 40 packing stations and 3 sortation lanes. Larger volumes
                add modules; the building stays the same.
              </p>
              <p className="mt-4 text-sm">
                Planning rates are confirmed by time studies in our{" "}
                <Link href="/implementation#delivery" className="prose-link">
                  engineering audit
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Turn this estimate into a design."
        text="Send us your numbers. Our engineers will validate them against your floor plan and WMS data."
        primary={{ href: "/contact", label: "Request an engineering review" }}
        secondary={{ href: "/smartflow-360", label: "Explore SmartFlow 360" }}
      />
    </>
  );
}

"use client";

import Link from "next/link";
import { useQueryState } from "@/lib/useQueryState";

const VIEWS = ["before", "after"] as const;

const aisleX = [70, 150, 230, 310, 390, 470];

// Before: one picker walks every aisle, end to end (serpentine).
const beforeRoute =
  "M260 308 V292 H45 V30 H130 V280 H210 V30 H290 V280 H370 V30 H450 V280 H530 V30 H548 V292 H300 V308";
// After: fast movers slotted near packing; a short loop within one pick zone.
const afterRoute = "M258 308 V286 H210 V196 H290 V286 H302 V308";

export function PickRouteToggle({ headingLevel = "h4" }: { headingLevel?: "h3" | "h4" }) {
  const [view, setView] = useQueryState("route", VIEWS, "before");
  const before = view === "before";
  const Heading = headingLevel;

  return (
    <div className="rounded-3xl border border-line bg-white p-5 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Heading className="text-xl font-bold md:text-2xl">Shorter walks, same orders</Heading>
          <p className="mt-1 text-sm text-slate">Engineering estimate for a typical mixed-order route. Schematic, not to scale.</p>
        </div>
        <div className="segmented self-start" role="group" aria-label="Choose a view">
          {(["before", "after"] as const).map((v) => (
            <button key={v} type="button" aria-pressed={view === v} onClick={() => setView(v)} className="!min-h-11 !px-4">
              {v === "before" ? "Before" : "With SmartFlow 360"}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-center">
        <div className="relative">
          <svg
            viewBox="0 0 560 360"
            className="h-auto w-full rounded-2xl bg-surface"
            role="img"
            aria-label={
              before
                ? "Before: a mixed order sends the picker through every aisle, about 1.0 kilometer per route."
                : "With SmartFlow 360: fast movers sit closest to packing, so the route stays in one short zone, 0.5 kilometers or less."
            }
          >
            {/* Pick zones (after) */}
            {!before && (
              <g opacity="0.9">
                <rect x="20" y="24" width="160" height="256" fill="#E3F4F2" />
                <rect x="180" y="24" width="180" height="256" fill="#FDF3DE" />
                <rect x="360" y="24" width="180" height="256" fill="#E3F4F2" />
              </g>
            )}
            {/* Racks */}
            {aisleX.map((x) => (
              <g key={x}>
                <rect x={x} y="40" width="40" height="220" rx="5" fill="#CBD7DE" />
                {!before && <rect x={x} y="200" width="40" height="60" rx="5" fill="#F4B544" />}
              </g>
            ))}
            {/* Packing */}
            <rect x="200" y="306" width="160" height="44" rx="10" fill="#102C3B" />
            {/* Route */}
            <path
              key={view}
              className="route-draw"
              style={{ ["--len" as string]: before ? 3200 : 600 }}
              d={before ? beforeRoute : afterRoute}
              fill="none"
              stroke={before ? "#B8352A" : "#14636B"}
              strokeWidth="6"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
          {/* HTML label so it stays readable at every width */}
          <span
            className="pointer-events-none absolute bottom-[3.5%] left-1/2 -translate-x-1/2 font-display text-xs font-semibold text-white sm:text-sm"
            aria-hidden="true"
          >
            Packing
          </span>
        </div>

        <div aria-live="polite">
          <p className="font-display text-sm font-semibold text-slate">{before ? "Before" : "With SmartFlow 360"}</p>
          <p
            className={`mt-1 font-display text-5xl font-bold whitespace-nowrap md:text-6xl ${before ? "text-before" : "text-deep"}`}
          >
            {before ? "≈1.0 km" : "≤0.5 km"}
          </p>
          <p className="mt-1 font-semibold">per pick route</p>
          <p className="mt-4 text-slate">
            {before
              ? "A mixed order sends the picker through every aisle, end to end."
              : "ABC slotting puts the fastest movers closest to packing (amber), and zone picking keeps each route short."}
          </p>
          {!before && <p className="chip mt-4">Half the walking or less</p>}
        </div>
      </div>

      <p className="mt-6 border-t border-line pt-5 text-[0.95rem]">
        <strong>Verified in operation:</strong> at Moda Andina Logistics, pick routes fell from 1.1 km to 0.5 km (−55%).{" "}
        <Link href="/results#moda-andina" className="prose-link">
          See the Moda Andina results
        </Link>
      </p>
    </div>
  );
}

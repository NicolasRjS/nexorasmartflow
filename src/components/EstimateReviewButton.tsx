"use client";

import { calculate, FIELDS, validate, type Field } from "@/lib/capacity";
import { useDemo } from "./interactive/DemoProvider";
import { Arrow } from "./ui";

const fieldOrder: Field[] = ["orders", "hours", "factor", "unitsPerOrder"];

/**
 * Opens the engineering-review request with the estimate currently on the page.
 * The planner keeps its inputs in the URL, so this button reads them from there.
 */
export function EstimateReviewButton({ className = "btn btn-primary btn-lg" }: { className?: string }) {
  const open = useDemo();
  const onClick = () => {
    const params = new URLSearchParams(window.location.search);
    const raw = Object.fromEntries(
      fieldOrder.map((f) => [f, params.get(FIELDS[f].param) ?? String(FIELDS[f].default)]),
    ) as Record<Field, string>;
    const ok = fieldOrder.every((f) => !validate(f, raw[f]));
    if (!ok) {
      open({ kind: "quote" });
      return;
    }
    const inputs = {
      orders: Number(raw.orders),
      hours: Number(raw.hours),
      factor: Number(raw.factor),
      unitsPerOrder: Number(raw.unitsPerOrder),
    };
    const r = calculate(inputs);
    open({
      kind: "quote",
      estimate: {
        ...inputs,
        peakUnitsPerHour: r.peakUnitsPerHour,
        pickers: r.withHeadroom.pickers,
        packStations: r.withHeadroom.packStations,
        sortLanes: r.withHeadroom.sortLanes,
      },
    });
  };
  return (
    <button type="button" className={className} aria-haspopup="dialog" onClick={onClick}>
      Send This Estimate for Review
      <Arrow />
    </button>
  );
}

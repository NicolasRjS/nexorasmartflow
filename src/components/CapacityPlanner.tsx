"use client";

import { useState } from "react";
import { calculate, FIELDS, RATES, REFERENCE_DESIGN, validate, type Field } from "@/lib/capacity";

const fieldOrder: Field[] = ["orders", "hours", "factor", "unitsPerOrder"];

const defaults = Object.fromEntries(fieldOrder.map((f) => [f, String(FIELDS[f].default)])) as Record<Field, string>;

const fmt = (n: number, digits = 0) => n.toLocaleString("en-US", { maximumFractionDigits: digits });
// Rounds for display only; small values keep decimals so they never show as 0.
const nearest100 = (n: number) => (n >= 100 ? Math.round(n / 100) * 100 : n >= 10 ? Math.round(n) : Number(n.toFixed(2)));
const approx = (n: number) => (n >= 10 ? Math.round(n) : Number(n.toFixed(2)));

export function CapacityPlanner() {
  const [values, setValues] = useState<Record<Field, string>>(defaults);

  const errors = Object.fromEntries(fieldOrder.map((f) => [f, validate(f, values[f])])) as Record<
    Field,
    string | null
  >;
  const valid = fieldOrder.every((f) => !errors[f]);
  const result = valid
    ? calculate({
        orders: Number(values.orders),
        hours: Number(values.hours),
        factor: Number(values.factor),
        unitsPerOrder: Number(values.unitsPerOrder),
      })
    : null;

  const rows = result
    ? [
        {
          stage: "Pickers",
          rate: `${RATES.unitsPerPickerHour} units per hour each`,
          min: result.minimum.pickers,
          head: result.withHeadroom.pickers,
          ref: REFERENCE_DESIGN.pickers,
        },
        {
          stage: "Packing stations",
          rate: `${RATES.ordersPerPackStationHour} orders per hour each`,
          min: result.minimum.packStations,
          head: result.withHeadroom.packStations,
          ref: REFERENCE_DESIGN.packStations,
        },
        {
          stage: "Sortation lanes",
          rate: `${fmt(RATES.unitsPerSortLaneHour)} units per hour each, plus 1 spare lane (N−1)`,
          min: result.minimum.sortLanes,
          head: result.withHeadroom.sortLanes,
          ref: REFERENCE_DESIGN.sortLanes,
        },
      ]
    : [];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,22rem)_1fr]">
      {/* Inputs */}
      <form
        className="card h-fit p-6 md:p-7"
        onSubmit={(e) => e.preventDefault()}
        aria-labelledby="planner-inputs"
        noValidate
      >
        <h2 id="planner-inputs" className="text-xl font-semibold">
          Your peak day
        </h2>
        <p className="mt-1 text-sm text-slate">Results update as you type.</p>
        <div className="mt-6 space-y-5">
          {fieldOrder.map((f) => {
            const def = FIELDS[f];
            const err = errors[f];
            return (
              <div key={f}>
                <label htmlFor={`in-${f}`} className="block font-display text-sm font-semibold">
                  {def.label}
                </label>
                <p id={`help-${f}`} className="text-sm text-slate">
                  {def.help}
                </p>
                <input
                  id={`in-${f}`}
                  name={f}
                  type="number"
                  inputMode="decimal"
                  min={def.min}
                  max={def.max}
                  step={def.step}
                  value={values[f]}
                  onChange={(e) => setValues((v) => ({ ...v, [f]: e.target.value }))}
                  aria-invalid={err ? true : undefined}
                  aria-describedby={`help-${f}${err ? ` err-${f}` : ""}`}
                  className={`mt-2 block min-h-12 w-full rounded-lg border-2 bg-white px-4 font-display text-lg tabular-nums ${
                    err ? "border-before" : "border-line focus:border-deep"
                  }`}
                />
                {err && (
                  <p id={`err-${f}`} className="mt-1 text-sm font-semibold text-before">
                    {err}
                  </p>
                )}
              </div>
            );
          })}
        </div>
        <button type="button" onClick={() => setValues(defaults)} className="btn btn-outline mt-7 w-full">
          Reset to defaults
        </button>
      </form>

      {/* Results */}
      <section aria-labelledby="planner-results" className="min-w-0">
        <h2 id="planner-results" className="sr-only">
          Results
        </h2>
        <div aria-live="polite">
          {result ? (
            <>
              <dl className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-line bg-surface p-5">
                  <dt className="text-sm text-slate">Average orders per hour</dt>
                  <dd className="mt-1 font-display text-3xl font-bold tabular-nums">
                    {fmt(result.avgOrdersPerHour, result.avgOrdersPerHour < 10 ? 2 : 1)}
                  </dd>
                </div>
                <div className="rounded-xl border border-line bg-surface p-5">
                  <dt className="text-sm text-slate">Peak orders per hour</dt>
                  <dd className="mt-1 font-display text-3xl font-bold tabular-nums">
                    <span className="text-lg font-semibold text-slate">about </span>
                    {fmt(approx(result.peakOrdersPerHour), 2)}
                  </dd>
                </div>
                <div className="on-dark rounded-xl bg-navy p-5 text-white">
                  <dt className="text-sm text-white/80">Peak units per hour</dt>
                  <dd className="mt-1 font-display text-3xl font-bold text-amber tabular-nums">
                    <span className="text-lg font-semibold text-white/80">about </span>
                    {fmt(nearest100(result.peakUnitsPerHour), 2)}
                  </dd>
                </div>
              </dl>

              <h3 className="mt-10 text-xl font-semibold">Minimum capacity per stage at the peak hour</h3>
              {/* Small screens: one card per stage */}
              <ul className="mt-4 grid gap-3 sm:hidden">
                {rows.map((r) => {
                  const fits = r.head <= r.ref;
                  return (
                    <li key={r.stage} className="rounded-xl border border-line p-4">
                      <p className="font-display font-semibold">{r.stage}</p>
                      <p className="text-sm text-slate">{r.rate}</p>
                      <dl className="mt-3 grid grid-cols-3 gap-2 text-center">
                        <div className="rounded-lg bg-surface p-2">
                          <dt className="text-xs text-slate">Minimum</dt>
                          <dd className="font-display text-xl font-bold tabular-nums">{fmt(r.min)}</dd>
                        </div>
                        <div className="rounded-lg bg-mint p-2">
                          <dt className="text-xs text-deep">+15% headroom</dt>
                          <dd className="font-display text-xl font-bold text-deep tabular-nums">{fmt(r.head)}</dd>
                        </div>
                        <div className="rounded-lg bg-surface p-2">
                          <dt className="text-xs text-slate">Reference</dt>
                          <dd className="font-display text-xl font-bold tabular-nums">{fmt(r.ref)}</dd>
                        </div>
                      </dl>
                      <p className={`mt-2 text-sm font-bold ${fits ? "text-deep" : "text-navy"}`}>
                        {fits ? "Covered by the reference design" : `Add ${fmt(r.head - r.ref)} beyond the reference design`}
                      </p>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-2 text-xs text-slate sm:hidden">
                Reference design: {fmt(REFERENCE_DESIGN.ordersPerDay)} orders per day.
              </p>

              <div
                className="mt-4 hidden overflow-x-auto rounded-xl border border-line sm:block"
                role="region"
                aria-label="Capacity by stage"
                tabIndex={0}
              >
                <table className="w-full min-w-[40rem] border-collapse text-left">
                  <caption className="sr-only">
                    Minimum capacity, capacity with 15% design headroom, and the SmartFlow 360 reference design
                  </caption>
                  <thead className="bg-surface font-display text-sm">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-semibold">
                        Stage
                      </th>
                      <th scope="col" className="px-4 py-3 text-right font-semibold">
                        Minimum
                      </th>
                      <th scope="col" className="px-4 py-3 text-right font-semibold">
                        With 15% headroom
                      </th>
                      <th scope="col" className="px-4 py-3 text-right font-semibold">
                        Reference design
                        <span className="block text-xs font-normal text-slate">
                          {fmt(REFERENCE_DESIGN.ordersPerDay)} orders per day
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => {
                      const fits = r.head <= r.ref;
                      return (
                        <tr key={r.stage} className="border-t border-line align-top">
                          <th scope="row" className="px-4 py-4 font-normal">
                            <span className="block font-display font-semibold">{r.stage}</span>
                            <span className="block text-sm text-slate">{r.rate}</span>
                          </th>
                          <td className="px-4 py-4 text-right font-display text-2xl font-bold tabular-nums">
                            {fmt(r.min)}
                          </td>
                          <td className="px-4 py-4 text-right font-display text-2xl font-bold text-deep tabular-nums">
                            {fmt(r.head)}
                          </td>
                          <td className="px-4 py-4 text-right">
                            <span className="block font-display text-2xl font-bold tabular-nums">{fmt(r.ref)}</span>
                            <span
                              className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${
                                fits ? "bg-mint text-deep" : "bg-amber/30 text-navy"
                              }`}
                            >
                              {fits ? "Covered" : `Add ${fmt(r.head - r.ref)}`}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-line bg-surface p-8 text-center">
              <p className="font-display text-lg font-semibold">Results will appear here.</p>
              <p className="mt-1 text-slate">Correct the highlighted fields to see your estimate.</p>
            </div>
          )}
        </div>

        <p className="mt-6 rounded-lg border-l-4 border-amber bg-surface p-4 text-sm">
          <strong>Illustrative planning estimate.</strong> Final sizing requires time studies at each site.
        </p>
      </section>
    </div>
  );
}

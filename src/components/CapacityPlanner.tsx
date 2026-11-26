"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { site } from "@/content/site";
import { calculate, FIELDS, RATES, validate, type Field } from "@/lib/capacity";
import { useDemo } from "./interactive/DemoProvider";
import { PrintPortal, printRegion } from "./interactive/print";

const fieldOrder: Field[] = ["orders", "hours", "factor", "unitsPerOrder"];
const defaults = Object.fromEntries(fieldOrder.map((f) => [f, String(FIELDS[f].default)])) as Record<Field, string>;

const fmt = (n: number, digits = 0) => n.toLocaleString("en-US", { maximumFractionDigits: digits });
// Rounds for display only; small values keep decimals so they never show as 0.
const nearest100 = (n: number) => (n >= 100 ? Math.round(n / 100) * 100 : n >= 10 ? Math.round(n) : Number(n.toFixed(2)));
const approx = (n: number) => (n >= 10 ? Math.round(n) : Number(n.toFixed(2)));

const decimalsOf = (step: number) => (String(step).split(".")[1] ?? "").length;

// A shared estimate arrives in the URL (?orders=&hours=&factor=&units=). Read it as an external store.
type Partial4 = Partial<Record<Field, string>>;
const NONE: Partial4 = {};
let cachedSearch: string | null = null;
let cachedValues: Partial4 = NONE;
function readUrlValues(): Partial4 {
  const search = window.location.search;
  if (search !== cachedSearch) {
    cachedSearch = search;
    const params = new URLSearchParams(search);
    const found: Partial4 = {};
    fieldOrder.forEach((f) => {
      const v = params.get(FIELDS[f].param);
      if (v !== null) found[f] = v;
    });
    cachedValues = found;
  }
  return cachedValues;
}
const subscribeNoop = () => () => {};

type Stage = { key: string; stage: string; rate: string; min: number; head: number; capacity: number };

export function CapacityPlanner() {
  const urlValues = useSyncExternalStore(subscribeNoop, readUrlValues, () => NONE);
  const [edits, setEdits] = useState<Record<Field, string> | null>(null);
  const values = edits ?? { ...defaults, ...urlValues };
  const setValues = (update: (v: Record<Field, string>) => Record<Field, string>) => setEdits(update(values));
  const [copyStatus, setCopyStatus] = useState<"" | "copied" | "failed">("");
  const [undo, setUndo] = useState<Record<Field, string> | null>(null);
  const [announce, setAnnounce] = useState("");
  const [showBar, setShowBar] = useState(false);
  const openDemo = useDemo();
  const resultsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const errors = Object.fromEntries(fieldOrder.map((f) => [f, validate(f, values[f])])) as Record<Field, string | null>;
  const valid = fieldOrder.every((f) => !errors[f]);
  const inputs = valid
    ? {
        orders: Number(values.orders),
        hours: Number(values.hours),
        factor: Number(values.factor),
        unitsPerOrder: Number(values.unitsPerOrder),
      }
    : null;
  const result = useMemo(() => (inputs ? calculate(inputs) : null), [inputs?.orders, inputs?.hours, inputs?.factor, inputs?.unitsPerOrder]); // eslint-disable-line react-hooks/exhaustive-deps

  // Keep the URL in sync so the estimate can be shared, and announce the new answer politely.
  useEffect(() => {
    if (!result || !inputs) return;
    const params = new URLSearchParams();
    fieldOrder.forEach((f) => params.set(FIELDS[f].param, values[f].trim()));
    window.history.replaceState(window.history.state, "", `${window.location.pathname}?${params.toString()}`);
    const t = window.setTimeout(
      () =>
        setAnnounce(
          `Estimate updated: ${fmt(result.withHeadroom.pickers)} pickers, ${fmt(result.withHeadroom.packStations)} packing stations and ${fmt(result.withHeadroom.sortLanes)} sortation lanes, with 15% headroom.`,
        ),
      700,
    );
    return () => window.clearTimeout(t);
  }, [result]); // eslint-disable-line react-hooks/exhaustive-deps

  // Mobile: show a summary bar while the answer is off screen.
  useEffect(() => {
    const section = sectionRef.current;
    const answer = resultsRef.current;
    if (!section || !answer) return;
    let sectionIn = false;
    let answerIn = true;
    const update = () => setShowBar(sectionIn && !answerIn);
    const o1 = new IntersectionObserver(([e]) => {
      sectionIn = e.isIntersecting;
      update();
    });
    const o2 = new IntersectionObserver(([e]) => {
      answerIn = e.isIntersecting;
      update();
    });
    o1.observe(section);
    o2.observe(answer);
    return () => {
      o1.disconnect();
      o2.disconnect();
    };
  }, []);

  const step = (f: Field, dir: 1 | -1) => {
    const def = FIELDS[f];
    const current = Number(values[f]);
    const base = Number.isFinite(current) && values[f].trim() !== "" ? current : def.default;
    const next = Math.min(def.max, Math.max(def.min, base + dir * def.step));
    setValues((v) => ({ ...v, [f]: String(Number(next.toFixed(decimalsOf(def.step)))) }));
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
    window.setTimeout(() => setCopyStatus(""), 3000);
  };

  const stages: Stage[] = result
    ? [
        {
          key: "pickers",
          stage: "Pickers",
          rate: `${RATES.unitsPerPickerHour} units per hour each`,
          min: result.minimum.pickers,
          head: result.withHeadroom.pickers,
          capacity: result.capacity.pickers,
        },
        {
          key: "packStations",
          stage: "Packing stations",
          rate: `${RATES.ordersPerPackStationHour} orders per hour each`,
          min: result.minimum.packStations,
          head: result.withHeadroom.packStations,
          capacity: result.capacity.packStations,
        },
        {
          key: "sortLanes",
          stage: "Sortation lanes",
          rate: `${fmt(RATES.unitsPerSortLaneHour)} units per hour each, plus 1 spare lane`,
          min: result.minimum.sortLanes,
          head: result.withHeadroom.sortLanes,
          capacity: result.capacity.sortLanes,
        },
      ]
    : [];

  const chartMax = result ? Math.max(result.peakUnitsPerHour, ...stages.map((s) => s.capacity)) * 1.08 : 1;

  return (
    <div ref={sectionRef} className="grid gap-8 lg:grid-cols-[minmax(0,21rem)_minmax(0,1fr)] lg:gap-10">
      {/* Inputs */}
      <form
        className="card h-fit p-6 md:p-7 lg:sticky lg:top-28"
        onSubmit={(e) => e.preventDefault()}
        aria-labelledby="planner-inputs"
        noValidate
      >
        <h2 id="planner-inputs" className="text-xl font-bold">
          Your Peak Day
        </h2>
        <p className="mt-1 text-sm text-slate">The estimate updates as you type.</p>
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
                <div className="mt-2 flex items-stretch gap-2">
                  <button
                    type="button"
                    className="stepper"
                    onClick={() => step(f, -1)}
                    aria-label={`Decrease ${def.label.toLowerCase()}`}
                    disabled={Number(values[f]) <= def.min}
                  >
                    <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
                      <path d="M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                  <input
                    id={`in-${f}`}
                    name={f}
                    type="text"
                    inputMode={def.integer ? "numeric" : "decimal"}
                    autoComplete="off"
                    spellCheck={false}
                    value={values[f]}
                    onChange={(e) => setValues((v) => ({ ...v, [f]: e.target.value }))}
                    aria-invalid={err ? true : undefined}
                    aria-describedby={`help-${f}${err ? ` err-${f}` : ""}`}
                    className="field min-w-0 flex-1 text-center font-display text-lg tabular-nums"
                  />
                  <button
                    type="button"
                    className="stepper"
                    onClick={() => step(f, 1)}
                    aria-label={`Increase ${def.label.toLowerCase()}`}
                    disabled={Number(values[f]) >= def.max}
                  >
                    <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
                      <path d="M3 8h10M8 3v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
                {err && (
                  <p id={`err-${f}`} className="field-error">
                    {err}
                  </p>
                )}
              </div>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => {
            setUndo(values);
            setEdits(defaults);
            window.setTimeout(() => setUndo(null), 8000);
          }}
          className="arrow-link mt-6 min-h-11 cursor-pointer text-sm disabled:cursor-not-allowed disabled:no-underline disabled:opacity-50"
          disabled={fieldOrder.every((f) => values[f] === defaults[f])}
        >
          Reset to the Example Values
        </button>
        <p role="status" className="text-sm">
          {undo && (
            <>
              Example values restored.{" "}
              <button
                type="button"
                className="prose-link min-h-11 cursor-pointer"
                onClick={() => {
                  setEdits(undo);
                  setUndo(null);
                }}
              >
                Undo
              </button>
            </>
          )}
        </p>
      </form>

      {/* Results */}
      <section aria-labelledby="planner-results" className="min-w-0">
        <p className="sr-only" aria-live="polite">
          {announce}
        </p>
        <div ref={resultsRef} id="estimate" className="scroll-mt-28">
          <h2 id="planner-results" className="text-2xl font-bold md:text-3xl">
            Minimum Capacity for Your Peak Hour
          </h2>
          <p className="mt-1 text-slate">Each stage sized with 15% design headroom. The bare minimum is shown below each figure.</p>

          {result ? (
            <>
              <dl className="mt-6 grid gap-3 sm:grid-cols-3">
                {stages.map((s) => (
                  <div key={s.key} className="on-dark tile-dark flex flex-col rounded-2xl p-5">
                    <dt className="font-display font-semibold text-white">{s.stage}</dt>
                    <dd className="mt-2 font-display text-5xl leading-none font-bold text-amber md:text-6xl">{fmt(s.head)}</dd>
                    <dd className="mt-3 text-sm text-white/80">Minimum without headroom: {fmt(s.min)}</dd>
                    <dd className="mt-auto pt-3 text-xs text-white/70">{s.rate}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-5 rounded-xl bg-surface px-4 py-3 text-[0.95rem]">
                Your peak hour: <strong>{fmt(result.avgOrdersPerHour, result.avgOrdersPerHour < 10 ? 2 : 1)}</strong> average
                orders per hour, about <strong>{fmt(approx(result.peakOrdersPerHour), 2)}</strong> orders and about{" "}
                <strong>{fmt(nearest100(result.peakUnitsPerHour), 2)}</strong> units in the busiest hour.
              </p>

              <figure className="card mt-8 p-5 md:p-6">
                <figcaption>
                  <span className="block font-display text-lg font-semibold">Capacity per stage against the peak hour</span>
                  <span className="block text-sm text-slate">
                    Units per hour at the sizes above. Sortation is shown with one lane down, so it still covers the peak.
                  </span>
                </figcaption>
                <div className="relative mt-8" aria-hidden="true">
                  <div
                    className="absolute top-0 bottom-0 z-10 w-0.5 bg-amber-dark"
                    style={{ left: `calc(8.5rem + (100% - 8.5rem) * ${result.peakUnitsPerHour / chartMax})` }}
                  >
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 rounded bg-white px-1 text-xs font-semibold whitespace-nowrap">
                      Peak {fmt(nearest100(result.peakUnitsPerHour))}
                    </span>
                  </div>
                  <ul className="space-y-4 pt-3">
                    {stages.map((s) => (
                      <li key={s.key} className="flex items-center gap-3">
                        <span className="w-[8.5rem] shrink-0 pr-2 text-sm font-semibold">{s.stage}</span>
                        <span className="relative h-6 flex-1">
                          <span
                            className="bar-grow absolute inset-y-0 left-0 rounded-r bg-gradient-to-b from-[#1a7680] to-deep shadow-[inset_0_1px_0_rgb(255_255_255/0.25)]"
                            style={{ width: `${(s.capacity / chartMax) * 100}%` }}
                          />
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2 ml-[8.5rem] flex justify-between border-t border-line pt-1 text-xs text-slate tabular-nums">
                    <span>0</span>
                    <span>{fmt(nearest100(chartMax / 2))}</span>
                    <span>{fmt(nearest100(chartMax))} units/h</span>
                  </div>
                </div>
                <div className="sr-only">
                  <table>
                    <caption>
                      Capacity per stage in units per hour, against a peak of {fmt(nearest100(result.peakUnitsPerHour))} units per
                      hour
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">Stage</th>
                        <th scope="col">Units per hour</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stages.map((s) => (
                        <tr key={s.key}>
                          <th scope="row">{s.stage}</th>
                          <td>{fmt(nearest100(s.capacity))}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate">
                  {stages.map((s) => (
                    <li key={s.key}>
                      {s.stage}: <span className="font-semibold text-navy tabular-nums">{fmt(nearest100(s.capacity))}</span> units/h
                    </li>
                  ))}
                </ul>
              </figure>

              <div className="mt-8 flex flex-col gap-4 rounded-2xl bg-mint p-5 md:flex-row md:items-center md:justify-between md:p-6">
                <div>
                  <p className="font-display text-lg font-semibold">Turn this estimate into a design</p>
                  <p className="text-[0.95rem]">Our engineers validate it against your floor plan and WMS data.</p>
                </div>
                <button
                  type="button"
                  className="btn btn-primary shrink-0"
                  aria-haspopup="dialog"
                  onClick={() =>
                    openDemo({
                      kind: "quote",
                      estimate: {
                        ...inputs!,
                        peakUnitsPerHour: result.peakUnitsPerHour,
                        pickers: result.withHeadroom.pickers,
                        packStations: result.withHeadroom.packStations,
                        sortLanes: result.withHeadroom.sortLanes,
                      },
                    })
                  }
                >
                  Send This Estimate for Review
                </button>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button type="button" className="btn btn-outline" onClick={() => printRegion("print-estimate")}>
                  <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                    <path d="M5 8V3h10v5M5 14H3V8h14v6h-2M6 12h8v5H6z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                  </svg>
                  Print This Estimate
                </button>
                <button type="button" className="btn btn-outline" onClick={copyLink}>
                  <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                    <path d="M8 12l4-4M7 9.5L5.2 11.3a2.8 2.8 0 004 4L11 13.5M13 10.5l1.8-1.8a2.8 2.8 0 00-4-4L9 6.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                  </svg>
                  Copy a Link to This Estimate
                </button>
                <span role="status" className="text-sm font-semibold text-deep">
                  {copyStatus === "copied" && "Link copied. Anyone with it sees these numbers."}
                  {copyStatus === "failed" && "Copy failed. The link is in your address bar."}
                </span>
              </div>

              <PrintPortal id="print-estimate">
                <EstimateSheet values={values} stages={stages} result={result} />
              </PrintPortal>
            </>
          ) : (
            <div className="mt-6 rounded-2xl border-2 border-dashed border-line bg-surface p-8 text-center">
              <p className="font-display text-lg font-semibold">Your estimate will appear here.</p>
              <p className="mt-1 text-slate">Correct the highlighted fields to see it.</p>
            </div>
          )}

          <p className="mt-6 flex gap-3 rounded-xl border border-amber bg-amber/10 p-4 text-sm">
            <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 text-navy" aria-hidden="true">
              <circle cx="10" cy="10" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="M10 9v5M10 6.2v.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span>
              <strong>Illustrative planning estimate.</strong> Final sizing requires time studies at each site.
            </span>
          </p>
        </div>
      </section>

      {/* Mobile summary while the answer is off screen */}
      {result && (
        <div
          className={`fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-navy px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] text-white shadow-[0_-12px_30px_-18px_rgb(16_44_59/0.6)] transition-transform duration-300 lg:hidden ${
            showBar ? "translate-y-0" : "pointer-events-none translate-y-full"
          }`}
          aria-hidden={!showBar}
        >
          <div className="mx-auto flex max-w-xl items-center justify-between gap-3">
            <p className="font-display text-sm">
              <span className="font-bold text-amber">{fmt(result.withHeadroom.pickers)}</span> pickers ·{" "}
              <span className="font-bold text-amber">{fmt(result.withHeadroom.packStations)}</span> stations ·{" "}
              <span className="font-bold text-amber">{fmt(result.withHeadroom.sortLanes)}</span> lanes
            </p>
            <a href="#estimate" className="btn btn-primary min-h-10 px-4 text-sm" tabIndex={showBar ? 0 : -1}>
              See Estimate
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function EstimateSheet({
  values,
  stages,
  result,
}: {
  values: Record<Field, string>;
  stages: Stage[];
  result: ReturnType<typeof calculate>;
}) {
  return (
    <article className="sheet mx-auto bg-white p-8 text-navy">
      <header className="flex items-center gap-4 border-b-2 border-amber pb-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/logo/nexora-lockup-light.png" alt="Nexora Intralogistics Solutions" width={640} height={130} className="h-9 w-auto" />
        <p className="ml-auto text-sm font-semibold">Capacity Planner · peak-hour estimate</p>
      </header>
      <h2 className="mt-6 text-2xl font-bold">Your Peak Day</h2>
      <ul className="mt-2 grid grid-cols-2 gap-1 text-sm">
        {fieldOrder.map((f) => (
          <li key={f}>
            {FIELDS[f].label}: <strong>{values[f]}</strong>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm">
        Peak hour: about {fmt(approx(result.peakOrdersPerHour), 2)} orders and about {fmt(nearest100(result.peakUnitsPerHour), 2)} units.
      </p>
      <table className="mt-6 w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b-2 border-navy">
            <th className="py-2">Stage</th>
            <th className="py-2 text-right">Minimum</th>
            <th className="py-2 text-right">With 15% headroom</th>
            <th className="py-2 text-right">Capacity (units/h)</th>
          </tr>
        </thead>
        <tbody>
          {stages.map((s) => (
            <tr key={s.key} className="border-b border-line">
              <td className="py-2">
                <strong>{s.stage}</strong>
                <br />
                <span className="text-xs">{s.rate}</span>
              </td>
              <td className="py-2 text-right">{fmt(s.min)}</td>
              <td className="py-2 text-right font-bold">{fmt(s.head)}</td>
              <td className="py-2 text-right">{fmt(nearest100(s.capacity))}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-6 text-sm">
        Illustrative planning estimate. Final sizing requires time studies at each site. Sortation includes one spare lane
        (N−1).
      </p>
      <p className="mt-4 text-xs">
        {site.url}/capacity-planner · Nexora Intralogistics Solutions is a fictional company created for the SIE 415/515
        course at the University of Arizona.
      </p>
    </article>
  );
}

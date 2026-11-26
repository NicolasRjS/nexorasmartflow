"use client";

import { useState } from "react";
import { Modal } from "./Modal";

// Invented values for illustration only. Labelled "Sample data" wherever they appear.
const HOURS = [
  { h: "06:00", v: 820 },
  { h: "07:00", v: 1240 },
  { h: "08:00", v: 1510 },
  { h: "09:00", v: 1690 },
  { h: "10:00", v: 1820 },
  { h: "11:00", v: 1960 },
  { h: "12:00", v: 1580 },
  { h: "13:00", v: 1450 },
  { h: "14:00", v: 1730 },
  { h: "15:00", v: 1880 },
  { h: "16:00", v: 1640 },
  { h: "17:00", v: 1320 },
  { h: "18:00", v: 1090 },
  { h: "19:00", v: 860 },
  { h: "20:00", v: 640 },
  { h: "21:00", v: 410 },
];
const MAX = 2000;
const PEAK = HOURS.reduce((a, b) => (b.v > a.v ? b : a));

const tiles = [
  { label: "Orders released today", value: "9,840", note: "Sample data" },
  { label: "Units picked, peak hour", value: PEAK.v.toLocaleString("en-US"), note: `At ${PEAK.h}` },
  { label: "WMS messages within 5 s", value: "99.4%", note: "Design target: 99%" },
  { label: "Open exceptions", value: "3", note: "1 needs action" },
];

const stages = [
  { name: "Picking", value: 86 },
  { name: "Packing", value: 91 },
  { name: "Sortation", value: 64 },
];

const exceptions = [
  { level: "action", label: "Needs action", text: "Short pick on tote 4471, zone B. Replenishment task sent." },
  { level: "info", label: "Handled", text: "Oversize item routed to the manual lane and scanned." },
  { level: "info", label: "Handled", text: "Sortation lane 2 paused 3 minutes; lanes 1 and 3 carried the load." },
];

export function SampleDashboardDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Sample KPI dashboard"
      description="A preview of the live floor view that Digital Integration adds on top of your WMS. Every number below is invented."
      size="xl"
      headerExtra={<span className="sample-badge">Sample data</span>}
    >
      <Dashboard />
    </Modal>
  );
}

function Dashboard() {
  const [view, setView] = useState<"chart" | "table">("chart");
  return (
    <div className="space-y-6">
      <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {tiles.map((t) => (
          <div key={t.label} className="rounded-xl border border-line p-4">
            <dt className="text-sm text-slate">{t.label}</dt>
            <dd className="mt-1 font-display text-3xl font-semibold">{t.value}</dd>
            <dd className="text-xs text-slate">{t.note}</dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <section aria-labelledby="dash-chart" className="rounded-xl border border-line p-4 md:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 id="dash-chart" className="font-display text-base font-semibold">
                Units Picked per Hour
              </h3>
              <p className="text-sm text-slate">Sample shift, 06:00 to 22:00. Peak hour highlighted.</p>
            </div>
            <div className="segmented" role="group" aria-label="Show the hourly data as">
              {(["chart", "table"] as const).map((v) => (
                <button key={v} type="button" aria-pressed={view === v} onClick={() => setView(v)}>
                  {v === "chart" ? "Chart" : "Table"}
                </button>
              ))}
            </div>
          </div>

          {view === "chart" ? (
            <div className="mt-5" aria-hidden="true">
              <div className="relative h-48">
                {[0, 1000, 2000].map((t) => (
                  <div key={t} className="absolute inset-x-0 border-t border-line" style={{ bottom: `${(t / MAX) * 100}%` }}>
                    <span className="absolute -top-2.5 left-0 bg-white pr-1 text-[0.7rem] text-slate tabular-nums">
                      {t.toLocaleString("en-US")}
                    </span>
                  </div>
                ))}
                <div className="absolute inset-y-0 right-0 left-10 flex items-end gap-[2px]">
                  {HOURS.map((d) => {
                    const peak = d === PEAK;
                    return (
                      <div key={d.h} className="group relative flex h-full flex-1 items-end justify-center">
                        <div
                          className={`w-full max-w-6 rounded-t ${peak ? "bg-deep" : "bg-[#A9C4C9] group-hover:bg-[#7FA6AD]"}`}
                          style={{ height: `${(d.v / MAX) * 100}%` }}
                        />
                        <span className="pointer-events-none absolute bottom-full z-10 mb-1 hidden rounded-md bg-navy px-2 py-1 text-xs whitespace-nowrap text-white group-hover:block">
                          {d.h}: {d.v.toLocaleString("en-US")} units
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-2 ml-10 flex justify-between text-[0.7rem] text-slate tabular-nums">
                <span>06:00</span>
                <span>14:00</span>
                <span>21:00</span>
              </div>
            </div>
          ) : null}
          {/* The table is always available to assistive technology; sighted users can switch to it. */}
          <div className={view === "table" ? "mt-4 max-h-56 overflow-y-auto" : "sr-only"}>
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Units picked per hour, sample data</caption>
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="py-1.5 font-semibold">
                    Hour
                  </th>
                  <th scope="col" className="py-1.5 text-right font-semibold">
                    Units picked
                  </th>
                </tr>
              </thead>
              <tbody>
                {HOURS.map((d) => (
                  <tr key={d.h} className="border-b border-line/60">
                    <td className="py-1.5 tabular-nums">{d.h}</td>
                    <td className="py-1.5 text-right tabular-nums">{d.v.toLocaleString("en-US")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="space-y-6">
          <section aria-labelledby="dash-util" className="rounded-xl border border-line p-4 md:p-5">
            <h3 id="dash-util" className="font-display text-base font-semibold">
              Stage Utilization at the Peak Hour
            </h3>
            <ul className="mt-3 space-y-3">
              {stages.map((s) => (
                <li key={s.name}>
                  <div className="flex justify-between text-sm">
                    <span>{s.name}</span>
                    <span className="font-semibold tabular-nums">{s.value}%</span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-mint">
                    <div className="h-2 rounded-full bg-deep" style={{ width: `${s.value}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="dash-link" className="rounded-xl border border-line p-4 md:p-5">
            <h3 id="dash-link" className="font-display text-base font-semibold">
              WMS Link
            </h3>
            <p className="mt-2 flex items-center gap-2 text-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-deep" aria-hidden="true" />
              Online. Store-and-forward queue empty.
            </p>
          </section>
        </div>
      </div>

      <section aria-labelledby="dash-exc">
        <h3 id="dash-exc" className="font-display text-base font-semibold">
          Exceptions
        </h3>
        <ul className="mt-2 divide-y divide-line rounded-xl border border-line">
          {exceptions.map((x) => (
            <li key={x.text} className="flex items-start gap-3 p-3 text-sm">
              <span
                className={`mt-0.5 inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-bold ${
                  x.level === "action" ? "bg-amber/25 text-navy" : "bg-mint text-deep"
                }`}
              >
                <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
                  {x.level === "action" ? (
                    <path d="M6 1.5L11 10.5H1z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  ) : (
                    <path d="M2.5 6.5l2.2 2.2L9.5 3.8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  )}
                </svg>
                {x.label}
              </span>
              <span>{x.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <p className="text-sm text-slate">
        Sample data: this preview has no live connection and shows no real customer. The design targets come from our
        WMS integration specification.
      </p>
    </div>
  );
}

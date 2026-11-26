"use client";

import { customers } from "@/content/data";
import { useQueryState } from "@/lib/useQueryState";

const ids = customers.map((c) => c.id);

const num = (s: string) => Number(s.replace(/[^\d.]/g, "")) * (/k$/i.test(s) ? 1000 : 1);

/**
 * Pick a customer and compare its three verified KPIs before and after SmartFlow 360.
 * Bars are scaled per KPI, so each pair reads on its own.
 */
export function KpiCompare() {
  const [id, setId] = useQueryState("customer", ids, ids[0]);
  const active = ids.indexOf(id);
  const c = customers[active];

  return (
    <div className="rounded-3xl border border-white/15 bg-navy-3/80 p-5 shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_30px_60px_-30px_rgb(0_0_0/0.7)] backdrop-blur md:p-6">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Choose a customer">
        {customers.map((cu, i) => (
          <button
            key={cu.id}
            type="button"
            aria-pressed={active === i}
            onClick={() => setId(cu.id)}
            className={`min-h-10 cursor-pointer rounded-full px-3.5 font-display text-sm font-semibold transition-colors ${
              active === i ? "bg-amber text-navy" : "border border-white/25 text-white hover:bg-white/10"
            }`}
          >
            {cu.name.split(" ")[0]}
          </button>
        ))}
      </div>
      <p className="mt-4 font-display text-lg font-semibold text-white">{c.name}</p>
      <p className="text-sm text-white/75">
        {c.project} · {c.location}
      </p>
      <ul className="mt-4 space-y-4" aria-live="polite">
        {c.kpis.map((k) => {
          const b = num(k.before);
          const a = num(k.after);
          const max = Math.max(a, b);
          return (
            <li key={`${c.id}-${k.label}`}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-sm text-white/85">{k.label}</span>
                <span className="font-display text-xl font-bold text-amber">{k.change}</span>
              </div>
              <div className="mt-1.5 space-y-1" aria-hidden="true">
                <div className="flex items-center gap-2">
                  <span className="w-12 text-xs text-white/70">Before</span>
                  <span className="h-2.5 flex-1 rounded-full bg-white/10">
                    <span className="bar-grow block h-2.5 rounded-full bg-[#7d93a3]" style={{ width: `${(b / max) * 100}%` }} />
                  </span>
                  <span className="w-14 text-right text-xs text-white/80 tabular-nums">{k.before}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-12 text-xs text-white/70">After</span>
                  <span className="h-2.5 flex-1 rounded-full bg-white/10">
                    <span className="bar-grow block h-2.5 rounded-full bg-teal" style={{ width: `${(a / max) * 100}%` }} />
                  </span>
                  <span className="w-14 text-right text-xs font-semibold text-white tabular-nums">{k.after}</span>
                </div>
              </div>
              <span className="sr-only">
                Before {k.before}, after {k.after}, change {k.change}.
              </span>
            </li>
          );
        })}
      </ul>
      <a href={`#${c.id}`} className="arrow-link mt-5 text-sm">
        Watch the {c.name} clip
      </a>
    </div>
  );
}

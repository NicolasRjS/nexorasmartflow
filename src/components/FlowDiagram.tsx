import { flowSteps, type FlowMode } from "@/content/data";

const tone: Record<FlowMode, string> = {
  Automated: "border-navy bg-navy text-white",
  Assisted: "border-deep bg-mint text-navy",
  Manual: "border-amber bg-white text-navy",
};

const badge: Record<FlowMode, string> = {
  Automated: "bg-teal text-navy",
  Assisted: "bg-deep text-white",
  Manual: "bg-amber text-navy",
};

const PICK = 1; // Picking
const PACK = 4; // Packing

/** Material flow in seven steps. HTML, not SVG, so the labels stay readable at every width. */
export function FlowDiagram() {
  return (
    <figure className="rounded-3xl border border-line bg-white p-5 md:p-8">
      {/* Wide screens: one row, with the oversize lane drawn underneath. */}
      <div className="hidden lg:block">
        <ol className="grid grid-cols-7 gap-4" aria-label="Material flow steps">
          {flowSteps.map((s, i) => (
            <li key={s.name} className="relative">
              <div className={`flex h-36 flex-col justify-between rounded-2xl border-2 p-3.5 ${tone[s.mode]}`}>
                <span className="font-display text-sm opacity-80 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-base leading-snug font-semibold">{s.name}</span>
                <span className={`self-start rounded-full px-2.5 py-0.5 font-display text-xs font-bold ${badge[s.mode]}`}>
                  {s.mode}
                </span>
              </div>
              {i < flowSteps.length - 1 && (
                <svg
                  viewBox="0 0 16 16"
                  className="absolute top-1/2 -right-4 z-10 h-4 w-4 -translate-y-1/2 text-deep"
                  aria-hidden="true"
                >
                  <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </li>
          ))}
        </ol>
        <div className="grid grid-cols-7 gap-4" aria-hidden="true">
          <div
            className="relative h-14 rounded-b-2xl border-x-[3px] border-b-[3px] border-dashed border-amber-dark"
            style={{ gridColumn: `${PICK + 1} / ${PACK + 2}`, marginInline: "calc((100% - 3rem) / 8)" }}
          >
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white px-3 font-display text-sm font-semibold whitespace-nowrap">
              Oversize lane · about 5% of units · manual, WMS-directed, scanned
            </span>
          </div>
        </div>
      </div>

      {/* Narrow screens: one column. */}
      <ol className="space-y-2 lg:hidden" aria-label="Material flow steps">
        {flowSteps.map((s, i) => (
          <li key={s.name}>
            <div className={`flex items-center gap-3 rounded-2xl border-2 px-4 py-3 ${tone[s.mode]}`}>
              <span className="font-display text-sm opacity-80 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1 font-display font-semibold">{s.name}</span>
              <span className={`rounded-full px-2.5 py-0.5 font-display text-xs font-bold ${badge[s.mode]}`}>{s.mode}</span>
            </div>
            {(i === PICK || i === PACK) && (
              <p className="mt-1 ml-4 flex items-center gap-2 text-sm font-semibold text-navy">
                <span className="h-0 w-6 border-t-[3px] border-dashed border-amber-dark" aria-hidden="true" />
                {i === PICK ? "Oversize lane leaves here" : "Oversize lane rejoins here"}
              </p>
            )}
          </li>
        ))}
      </ol>

      <figcaption className="mt-8 grid gap-4 border-t border-line pt-5 text-sm md:grid-cols-[auto_1fr] md:gap-8">
        <ul className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Legend">
          <li className="flex items-center gap-2">
            <span className="h-4 w-4 rounded bg-navy" aria-hidden="true" /> Automated
          </li>
          <li className="flex items-center gap-2">
            <span className="h-4 w-4 rounded border-2 border-deep bg-mint" aria-hidden="true" /> Assisted
          </li>
          <li className="flex items-center gap-2">
            <span className="h-4 w-4 rounded border-2 border-amber bg-white" aria-hidden="true" /> Manual
          </li>
        </ul>
        <p className="text-slate">
          About 5% of units (over 30 kg or larger than 60 × 40 × 40 cm) follow a separate manual lane: directed by the
          WMS, scanned, and kept off the conveyor.
        </p>
      </figcaption>
    </figure>
  );
}

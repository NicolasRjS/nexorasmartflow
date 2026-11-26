import { flowSteps, type FlowMode } from "@/content/data";

const styles: Record<FlowMode, { fill: string; stroke: string; text: string; badge: string; badgeText: string }> = {
  Automated: { fill: "#102C3B", stroke: "#102C3B", text: "#FFFFFF", badge: "#35B7AA", badgeText: "#102C3B" },
  Assisted: { fill: "#E3F4F2", stroke: "#14636B", text: "#102C3B", badge: "#14636B", badgeText: "#FFFFFF" },
  Manual: { fill: "#FFFFFF", stroke: "#F4B544", text: "#102C3B", badge: "#F4B544", badgeText: "#102C3B" },
};

const splitName = (name: string) => (name.includes(" & ") ? name.replace(" & ", " &\n").split("\n") : [name]);

const description =
  "Material flow in SmartFlow 360: order release (automated), picking (assisted), scanning (automated), conveyor and sortation (automated), packing (manual), staging (assisted) and dispatch (assisted). About 5% of units follow a separate manual oversize lane from picking to packing that bypasses the conveyor.";

function StepBox({ x, y, w, h, i }: { x: number; y: number; w: number; h: number; i: number }) {
  const step = flowSteps[i];
  const s = styles[step.mode];
  const lines = splitName(step.name);
  const font = "var(--font-poppins), sans-serif";
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="12" fill={s.fill} stroke={s.stroke} strokeWidth="2" />
      <text x={x + 14} y={y + 22} fill={s.text} fontFamily={font} fontSize="12" opacity="0.8">
        {String(i + 1).padStart(2, "0")}
      </text>
      {lines.map((line, li) => (
        <text
          key={line}
          x={x + w / 2}
          y={y + h / 2 - (lines.length - 1) * 9 + li * 18 + 2}
          textAnchor="middle"
          fill={s.text}
          fontFamily={font}
          fontSize="15"
          fontWeight="600"
        >
          {line}
        </text>
      ))}
      <rect x={x + w / 2 - 42} y={y + h - 26} width="84" height="18" rx="9" fill={s.badge} />
      <text
        x={x + w / 2}
        y={y + h - 13}
        textAnchor="middle"
        fill={s.badgeText}
        fontFamily={font}
        fontSize="10"
        fontWeight="700"
        letterSpacing="1"
      >
        {step.mode.toUpperCase()}
      </text>
    </g>
  );
}

export function FlowDiagram() {
  // Desktop: one row. Mobile: one column.
  const W = 132;
  const H = 104;
  const gap = 24;
  const mW = 230;
  const mH = 76;
  const mGap = 26;

  return (
    <figure className="rounded-2xl border border-line bg-white p-4 md:p-8">
      <svg viewBox="0 0 1112 290" className="hidden h-auto w-full md:block" role="img" aria-label={description}>
        <defs>
          <marker id="flow-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0L10 5L0 10z" fill="#14636B" />
          </marker>
        </defs>
        {flowSteps.map((_, i) => {
          const x = 8 + i * (W + gap);
          return (
            <g key={i}>
              <StepBox x={x} y={30} w={W} h={H} i={i} />
              {i < flowSteps.length - 1 && (
                <line
                  x1={x + W + 2}
                  y1={30 + H / 2}
                  x2={x + W + gap - 3}
                  y2={30 + H / 2}
                  stroke="#14636B"
                  strokeWidth="2.5"
                  markerEnd="url(#flow-arrow)"
                />
              )}
            </g>
          );
        })}
        {/* Oversize lane: picking -> packing, bypassing scanning and conveyor */}
        <path
          d={`M${8 + 1 * (W + gap) + W / 2} ${30 + H} V214 H${8 + 4 * (W + gap) + W / 2} V${30 + H + 6}`}
          fill="none"
          stroke="#E0A02E"
          strokeWidth="3"
          strokeDasharray="8 6"
          markerEnd="url(#flow-arrow)"
        />
        <text
          x={8 + 2.5 * (W + gap) + W / 2}
          y="244"
          textAnchor="middle"
          fill="#102C3B"
          fontFamily="var(--font-poppins), sans-serif"
          fontSize="14"
          fontWeight="600"
        >
          Oversize lane · about 5% of units · manual, WMS-directed, scanned
        </text>
      </svg>

      <svg viewBox="0 0 340 740" className="mx-auto h-auto w-full max-w-sm md:hidden" role="img" aria-label={description}>
        <defs>
          <marker id="flow-arrow-m" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0L10 5L0 10z" fill="#14636B" />
          </marker>
        </defs>
        {flowSteps.map((_, i) => {
          const y = 8 + i * (mH + mGap);
          return (
            <g key={i}>
              <StepBox x={10} y={y} w={mW} h={mH} i={i} />
              {i < flowSteps.length - 1 && (
                <line
                  x1={10 + mW / 2}
                  y1={y + mH + 2}
                  x2={10 + mW / 2}
                  y2={y + mH + mGap - 3}
                  stroke="#14636B"
                  strokeWidth="2.5"
                  markerEnd="url(#flow-arrow-m)"
                />
              )}
            </g>
          );
        })}
        <path
          d={`M${10 + mW} ${8 + 1 * (mH + mGap) + mH / 2} H300 V${8 + 4 * (mH + mGap) + mH / 2} H${10 + mW + 6}`}
          fill="none"
          stroke="#E0A02E"
          strokeWidth="3"
          strokeDasharray="8 6"
          markerEnd="url(#flow-arrow-m)"
        />
        <text
          x="318"
          y={8 + 2.5 * (mH + mGap) + mH / 2}
          textAnchor="middle"
          fill="#102C3B"
          fontFamily="var(--font-poppins), sans-serif"
          fontSize="13"
          fontWeight="600"
          transform={`rotate(90 318 ${8 + 2.5 * (mH + mGap) + mH / 2})`}
        >
          Oversize lane
        </text>
      </svg>

      <figcaption className="mt-6 grid gap-4 border-t border-line pt-5 text-sm md:grid-cols-[auto_1fr] md:gap-8">
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
          About 5% of units (over 30 kg or larger than 60 × 40 × 40 cm) follow a separate manual lane: directed by
          the WMS, scanned, and kept off the conveyor.
        </p>
      </figcaption>
    </figure>
  );
}

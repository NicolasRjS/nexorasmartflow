import { useId } from "react";

/** Brand motif: alternating teal and amber parcels riding on a conveyor. Decorative only. */
export function ConveyorBand({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <svg className="block h-8 w-[calc(100%+64px)]" preserveAspectRatio="none">
        <defs>
          <pattern id={`parcels-${id}`} width="64" height="32" patternUnits="userSpaceOnUse">
            <rect x="8" y="5" width="16" height="16" rx="3" fill="#35B7AA" />
            <rect x="40" y="5" width="16" height="16" rx="3" fill="#F4B544" />
          </pattern>
        </defs>
        <g className="conveyor-track">
          <rect x="0" y="0" width="100%" height="22" fill={`url(#parcels-${id})`} />
        </g>
        <rect x="0" y="23" width="100%" height="3" fill="#14636B" />
        <rect x="0" y="28" width="100%" height="2" fill="#14636B" opacity="0.6" />
      </svg>
    </div>
  );
}

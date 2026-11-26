/** Original hero graphic: a short guided pick route through racks, feeding a conveyor to packing. */
export function HeroIllustration() {
  const racks = [60, 150, 240, 330, 420];
  return (
    <svg
      viewBox="0 0 540 440"
      className="h-auto w-full"
      role="img"
      aria-label="Illustration: a short, guided pick route through warehouse racks, feeding a conveyor that carries parcels to packing"
    >
      <defs>
        <pattern id="hero-parcels" width="56" height="24" patternUnits="userSpaceOnUse">
          <rect x="6" y="2" width="18" height="18" rx="3" fill="#35B7AA" />
          <rect x="34" y="2" width="18" height="18" rx="3" fill="#F4B544" />
        </pattern>
        <clipPath id="belt-clip">
          <rect x="20" y="368" width="400" height="24" />
        </clipPath>
      </defs>

      {/* Floor panel */}
      <rect x="0" y="0" width="540" height="440" rx="28" fill="#1A3C4E" />

      {/* Racks with fast movers (amber) slotted closest to packing */}
      {racks.map((x, i) => (
        <g key={x}>
          <rect x={x} y="40" width="54" height="290" rx="8" fill="#27526A" />
          {[0, 1, 2, 3, 4, 5].map((s) => (
            <rect key={s} x={x + 6} y={52 + s * 46} width="42" height="2" fill="#35B7AA" opacity="0.25" />
          ))}
          <rect x={x + 6} y={250 - i * 6} width="42" height={70 + i * 6} rx="4" fill="#F4B544" opacity="0.85" />
        </g>
      ))}

      {/* Guided route */}
      <path
        d="M36 352V236H132V296H222V150H312V262H392V120H470"
        fill="none"
        stroke="#35B7AA"
        strokeWidth="14"
        strokeLinejoin="round"
      />
      <polygon points="466,98 500,120 466,142" fill="#F4B544" />
      <circle cx="36" cy="360" r="18" fill="#F4B544" />

      {/* Conveyor to packing */}
      <g clipPath="url(#belt-clip)">
        <g className="conveyor-track">
          <rect x="20" y="368" width="480" height="24" fill="url(#hero-parcels)" />
        </g>
      </g>
      <rect x="20" y="392" width="400" height="5" rx="2" fill="#35B7AA" opacity="0.6" />
      <rect x="20" y="401" width="400" height="3" rx="1.5" fill="#35B7AA" opacity="0.3" />

      <rect x="430" y="350" width="90" height="64" rx="10" fill="#102C3B" stroke="#35B7AA" strokeWidth="2" />
      <text
        x="475"
        y="388"
        textAnchor="middle"
        fill="#FFFFFF"
        fontFamily="var(--font-poppins), sans-serif"
        fontSize="14"
        fontWeight="600"
        letterSpacing="1.5"
      >
        PACKING
      </text>
    </svg>
  );
}

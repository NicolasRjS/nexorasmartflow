// Capacity planning math for the Capacity Planner page.
// Planning rates come from the SmartFlow 360 engineering basis.

export const RATES = {
  unitsPerPickerHour: 100,
  ordersPerPackStationHour: 60,
  unitsPerSortLaneHour: 2600,
  headroom: 0.15,
} as const;

export const REFERENCE_DESIGN = {
  ordersPerDay: 25000,
  pickers: 50,
  packStations: 40,
  sortLanes: 3,
} as const;

export type Field = "orders" | "hours" | "factor" | "unitsPerOrder";

export const FIELDS: Record<
  Field,
  { label: string; help: string; min: number; max: number; step: number; default: number; integer?: boolean }
> = {
  orders: {
    label: "Orders on the peak day",
    help: "Total orders shipped on your busiest day.",
    min: 1,
    max: 500000,
    step: 100,
    default: 25000,
    integer: true,
  },
  hours: {
    label: "Operating hours",
    help: "Hours the floor runs on that day (1 to 24).",
    min: 1,
    max: 24,
    step: 0.5,
    default: 16,
  },
  factor: {
    label: "Peak-hour factor",
    help: "Busiest hour divided by the average hour (1.0 to 3.0).",
    min: 1,
    max: 3,
    step: 0.05,
    default: 1.3,
  },
  unitsPerOrder: {
    label: "Units per order",
    help: "Average items picked per order (0.1 to 50).",
    min: 0.1,
    max: 50,
    step: 0.1,
    default: 2.1,
  },
};

export type Inputs = Record<Field, number>;

/** Returns an error message for a raw input value, or null if valid. */
export function validate(field: Field, raw: string): string | null {
  const f = FIELDS[field];
  if (raw.trim() === "") return "Enter a value.";
  const n = Number(raw);
  if (!Number.isFinite(n)) return "Enter a number.";
  if (f.integer && !Number.isInteger(n)) return "Enter a whole number.";
  if (n < f.min || n > f.max) {
    return `Enter a value from ${f.min.toLocaleString("en-US")} to ${f.max.toLocaleString("en-US")}.`;
  }
  return null;
}

export function calculate({ orders, hours, factor, unitsPerOrder }: Inputs) {
  const avgOrdersPerHour = orders / hours;
  const peakOrdersPerHour = avgOrdersPerHour * factor;
  const peakUnitsPerHour = peakOrdersPerHour * unitsPerOrder;

  const size = (load: number) => ({
    pickers: ceil((peakUnitsPerHour * load) / RATES.unitsPerPickerHour),
    packStations: ceil((peakOrdersPerHour * load) / RATES.ordersPerPackStationHour),
    // One extra lane keeps full capacity if any single lane is down (N-1).
    sortLanes: ceil((peakUnitsPerHour * load) / RATES.unitsPerSortLaneHour) + 1,
  });

  return {
    avgOrdersPerHour,
    peakOrdersPerHour,
    peakUnitsPerHour,
    minimum: size(1),
    withHeadroom: size(1 + RATES.headroom),
  };
}

// Tolerates floating-point noise such as 42.000000001.
const ceil = (x: number) => Math.ceil(x - 1e-9);

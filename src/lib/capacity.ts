// Capacity planning math for the Capacity Planner page.
// Planning rates come from the SmartFlow 360 engineering basis; the default inputs are a neutral example.

export const RATES = {
  unitsPerPickerHour: 100,
  ordersPerPackStationHour: 60,
  unitsPerSortLaneHour: 2600,
  headroom: 0.15,
} as const;

export type Field = "orders" | "hours" | "factor" | "unitsPerOrder";

export const FIELDS: Record<
  Field,
  {
    label: string;
    help: string;
    min: number;
    max: number;
    step: number;
    default: number;
    integer?: boolean;
    unit?: string;
    param: string;
  }
> = {
  orders: {
    label: "Orders on the peak day",
    help: "Total orders shipped on your busiest day. Digits only, for example 12000.",
    min: 1,
    max: 500000,
    step: 100,
    default: 12000,
    integer: true,
    unit: "orders",
    param: "orders",
  },
  hours: {
    label: "Operating hours",
    help: "Hours the floor runs on that day (1 to 24).",
    min: 1,
    max: 24,
    step: 0.5,
    default: 16,
    unit: "h",
    param: "hours",
  },
  factor: {
    label: "Peak-hour factor",
    help: "Busiest hour divided by the average hour (1.0 to 3.0).",
    min: 1,
    max: 3,
    step: 0.05,
    default: 1.3,
    unit: "×",
    param: "factor",
  },
  unitsPerOrder: {
    label: "Units per order",
    help: "Average items picked per order (0.1 to 50).",
    min: 0.1,
    max: 50,
    step: 0.1,
    default: 2,
    unit: "units",
    param: "units",
  },
};

export type Inputs = Record<Field, number>;

/** Returns an error message for a raw input value, or null if valid. */
export function validate(field: Field, raw: string): string | null {
  const f = FIELDS[field];
  const value = raw.trim();
  if (value === "") return "Enter a value.";
  if (f.integer && /^\d{1,3}([.,\s]\d{3})+$/.test(value)) {
    return `Remove the thousands separator: type ${value.replace(/[.,\s]/g, "")}.`;
  }
  if (!f.integer && /^\d+,\d+$/.test(value)) return `Use a point for decimals: ${value.replace(",", ".")}.`;
  const n = Number(value);
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

  const withHeadroom = size(1 + RATES.headroom);

  // Capacity each stage provides at the headroom size, in units per hour (sortation with one lane down).
  const capacity = {
    pickers: withHeadroom.pickers * RATES.unitsPerPickerHour,
    packStations: withHeadroom.packStations * RATES.ordersPerPackStationHour * unitsPerOrder,
    sortLanes: (withHeadroom.sortLanes - 1) * RATES.unitsPerSortLaneHour,
  };

  return {
    avgOrdersPerHour,
    peakOrdersPerHour,
    peakUnitsPerHour,
    minimum: size(1),
    withHeadroom,
    capacity,
  };
}

// Tolerates floating-point noise such as 42.000000001.
const ceil = (x: number) => Math.ceil(x - 1e-9);

"use client";

import { customers, flowSteps, modules, bottlenecks } from "@/content/data";
import { site } from "@/content/site";
import { Modal } from "./Modal";
import { PrintPortal, printRegion } from "./print";

const support = [
  { value: "24 months", label: "warranty" },
  { value: "90 days", label: "hypercare after go-live" },
  { value: "40 h", label: "training per technician" },
  { value: "24/7", label: "remote support and a resident technician" },
];

const PrintIcon = () => (
  <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
    <path d="M5 8V3h10v5M5 14H3V8h14v6h-2M6 12h8v5H6z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
  </svg>
);

export function BrochurePrintDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="SmartFlow 360 at a glance"
      description="A one-page, print-friendly summary of SmartFlow 360."
      size="xl"
      headerExtra={
        <button type="button" className="btn btn-primary hidden min-h-11 px-4 text-sm sm:inline-flex" onClick={() => printRegion("print-brochure")}>
          <PrintIcon />
          Print or Save as PDF
        </button>
      }
    >
      <button type="button" className="btn btn-primary mb-5 w-full sm:hidden" onClick={() => printRegion("print-brochure")}>
        <PrintIcon />
        Print or Save as PDF
      </button>
      <div className="rounded-xl bg-surface p-2 md:p-4">
        <BrochureSheet />
      </div>
      {open && (
        <PrintPortal id="print-brochure">
          <BrochureSheet />
        </PrintPortal>
      )}
    </Modal>
  );
}

/** One-page brochure. Designed for US Letter; reflows to one column on narrow screens. */
export function BrochureSheet() {
  return (
    <article className="sheet mx-auto max-w-[816px] overflow-hidden bg-white text-navy shadow-sm">
      <header className="sheet-band on-dark bg-navy px-7 py-6 text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/logo/nexora-lockup-dark.png" alt="Nexora Intralogistics Solutions" width={640} height={130} className="h-10 w-auto" />
        <h2 className="mt-5 text-[1.9rem] leading-tight font-bold text-white">{site.headline}</h2>
        <p className="mt-1 font-display text-teal italic">{site.tagline}</p>
        <p className="mt-3 max-w-[60ch] text-[0.95rem] text-white/85">
          SmartFlow 360 adds capacity, cuts walking and makes the floor safer, inside the building you already have and
          with the WMS you already run.
        </p>
      </header>

      <div className="grid gap-x-7 gap-y-5 px-7 py-6 sm:grid-cols-2">
        <section>
          <h3 className="sheet-h">The Problem: Four Bottlenecks</h3>
          <ol className="mt-2 space-y-1.5 text-[0.85rem]">
            {bottlenecks.map((b, i) => (
              <li key={b.title} className="flex gap-2">
                <span className="font-display font-bold text-deep">{i + 1}</span>
                <span>
                  <strong>{b.title}.</strong> {b.text}
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h3 className="sheet-h">The Solution: Four Modules, One System</h3>
          <ul className="mt-2 space-y-1.5 text-[0.85rem]">
            {modules.map((m) => (
              <li key={m.id} className="flex gap-2">
                <span className="font-display font-bold text-deep">{m.letter}</span>
                <span>
                  <strong>{m.name}.</strong> {m.benefit}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="sm:col-span-2">
          <h3 className="sheet-h">How It Works: Automation Only Where It Pays</h3>
          <ol className="mt-2 flex flex-wrap gap-1.5 text-[0.78rem]">
            {flowSteps.map((s) => (
              <li
                key={s.name}
                className={`rounded-md border px-2 py-1 ${
                  s.mode === "Automated"
                    ? "border-navy bg-navy text-white"
                    : s.mode === "Assisted"
                      ? "border-deep bg-mint"
                      : "border-amber bg-white"
                }`}
              >
                <span className="font-display font-semibold">{s.name}</span> · {s.mode.toLowerCase()}
              </li>
            ))}
          </ol>
          <p className="mt-1.5 text-[0.78rem] text-slate">
            About 5% of units (over 30 kg or larger than 60 × 40 × 40 cm) follow a manual lane, directed by the WMS and
            still scanned.
          </p>
        </section>

        <section className="sm:col-span-2">
          <h3 className="sheet-h">Proof: Verified at Three Peruvian Operations</h3>
          <div className="mt-2 grid gap-3 sm:grid-cols-3">
            {customers.map((c) => (
              <div key={c.id} className="rounded-lg border border-line p-3">
                <p className="font-display text-[0.85rem] font-semibold">{c.name}</p>
                <p className="text-[0.72rem] text-slate">{c.project}</p>
                <ul className="mt-1.5 space-y-0.5 text-[0.75rem]">
                  {c.kpis.map((k) => (
                    <li key={k.label} className="flex justify-between gap-2">
                      <span>{k.label}</span>
                      <span className="font-semibold whitespace-nowrap">{k.change}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-1.5 text-[0.75rem] text-slate">
            Every customer kept its WMS and building. Every KPI was verified at SAT and in load tests.
          </p>
        </section>

        <section>
          <h3 className="sheet-h">Support That Stays</h3>
          <dl className="mt-2 grid grid-cols-2 gap-2 text-[0.78rem]">
            {support.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-base font-bold text-deep">{s.value}</dt>
                <dd>{s.label}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h3 className="sheet-h">Talk to Us</h3>
          <ul className="mt-2 space-y-0.5 text-[0.85rem]">
            <li>{site.contactEmail}</li>
            {site.phone && <li>{site.phone}</li>}
            <li>{site.location}</li>
            <li className="font-semibold">{site.url.replace("https://", "")}</li>
          </ul>
        </section>
      </div>

      <footer className="border-t border-line px-7 py-3 text-[0.7rem] text-slate">
        Nexora Intralogistics Solutions is a fictional company created for the SIE 415/515 course at the University of
        Arizona.
      </footer>
    </article>
  );
}

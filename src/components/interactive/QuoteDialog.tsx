"use client";

import { useEffect, useId, useRef, useState } from "react";
import { bottlenecks, modules, nextSteps } from "@/content/data";
import { mailtoHref } from "@/content/site";
import { DemoNotice } from "./DemoNotice";
import { Modal } from "./Modal";
import { Spinner } from "./Spinner";

export type EstimateSummary = {
  orders: number;
  hours: number;
  factor: number;
  unitsPerOrder: number;
  peakUnitsPerHour: number;
  pickers: number;
  packStations: number;
  sortLanes: number;
};

const fmt = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 2 });
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Values = { name: string; company: string; email: string; bottleneck: string; modules: string[]; message: string };
type Errors = Partial<Record<keyof Values, string>>;

function validate(v: Values, needsModules: boolean): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Enter your name.";
  if (v.company.trim().length < 2) e.company = "Enter your company.";
  if (!v.email.trim()) e.email = "Enter your work email.";
  else if (!EMAIL.test(v.email.trim())) e.email = "Enter an email address like name@company.com.";
  if (!v.bottleneck) e.bottleneck = "Choose your main bottleneck.";
  if (needsModules && v.modules.length === 0) e.modules = "Choose at least one module.";
  return e;
}

export function QuoteDialog({
  open,
  estimate,
  onClose,
}: {
  open: boolean;
  estimate?: EstimateSummary;
  onClose: () => void;
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={estimate ? "Request an engineering review" : "Request a quote"}
      description={
        estimate
          ? "Send your estimate to our engineers. They validate it against your floor plan and WMS data."
          : "Tell us about your floor in under a minute. We reply with the modules that fit and the next step."
      }
      size="lg"
    >
      <QuoteForm estimate={estimate} />
    </Modal>
  );
}

function QuoteForm({ estimate }: { estimate?: EstimateSummary }) {
  const uid = useId();
  const [values, setValues] = useState<Values>({
    name: "",
    company: "",
    email: "",
    bottleneck: "",
    modules: [],
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const needsModules = !estimate;

  useEffect(() => () => window.clearTimeout(timer.current), []);
  useEffect(() => {
    if (status === "done") resultRef.current?.focus();
  }, [status]);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (submitted) setErrors(validate(next, needsModules));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const found = validate(values, needsModules);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus();
      return;
    }
    setStatus("loading");
    timer.current = window.setTimeout(() => setStatus("done"), 1300);
  };

  const errorCount = Object.keys(errors).length;
  const id = (f: string) => `${uid}-${f}`;
  const describe = (f: keyof Values, help?: boolean) =>
    [help ? id(`${f}-help`) : "", errors[f] ? id(`${f}-err`) : ""].filter(Boolean).join(" ") || undefined;

  if (status === "done") {
    const picked = modules.filter((m) => values.modules.includes(m.id));
    const firstName = values.name.trim().split(/\s+/)[0];
    return (
      <div ref={resultRef} tabIndex={-1} className="space-y-6 focus:outline-none" aria-live="polite">
        <div>
          <p className="font-display text-xl font-bold">Simulation complete, {firstName}</p>
          <p className="mt-1 text-slate">
            Nothing was sent. In a real engagement, this is what your request would start.
          </p>
        </div>

        <dl className="grid gap-3 rounded-xl border border-line p-5 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-slate">Main bottleneck</dt>
            <dd className="font-display font-semibold">{values.bottleneck}</dd>
          </div>
          {estimate ? (
            <div>
              <dt className="text-sm text-slate">Estimate to validate</dt>
              <dd className="font-display font-semibold">
                {fmt(estimate.pickers)} pickers · {fmt(estimate.packStations)} packing stations · {fmt(estimate.sortLanes)} lanes
              </dd>
            </div>
          ) : (
            <div>
              <dt className="text-sm text-slate">Modules to scope</dt>
              <dd className="font-display font-semibold">{picked.map((m) => `${m.letter}. ${m.name}`).join(", ")}</dd>
            </div>
          )}
        </dl>

        {picked.length > 0 && (
          <ul className="space-y-2">
            {picked.map((m) => (
              <li key={m.id} className="flex gap-3">
                <span className="module-letter h-8 w-8 text-sm" aria-hidden="true">
                  {m.letter}
                </span>
                <span>
                  <strong>{m.name}:</strong> {m.benefit}
                </span>
              </li>
            ))}
          </ul>
        )}

        <ol className="grid gap-3 sm:grid-cols-3">
          {nextSteps.map((s, i) => (
            <li key={s.title} className="rounded-xl bg-surface p-4">
              <span className="font-display text-sm font-semibold text-deep">Step {i + 1}</span>
              <p className="font-display font-semibold">{s.title}</p>
              <p className="text-sm text-slate">{s.text}</p>
            </li>
          ))}
        </ol>

        <DemoNotice subject={estimate ? "Engineering review request" : "SmartFlow 360 quote request"} />
        <div className="flex flex-wrap gap-3">
          <a
            href={mailtoHref(estimate ? "Engineering review request" : "SmartFlow 360 quote request")}
            className="btn btn-deep"
          >
            Email Us Instead
          </a>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => {
              setValues({ name: "", company: "", email: "", bottleneck: "", modules: [], message: "" });
              setErrors({});
              setSubmitted(false);
              setStatus("idle");
            }}
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5" aria-busy={status === "loading"}>
      {estimate && (
        <div className="rounded-xl border border-line bg-surface p-4">
          <p className="font-display text-sm font-semibold text-deep">Your estimate (from the Capacity Planner)</p>
          <p className="mt-1 text-[0.95rem]">
            {fmt(estimate.orders)} orders on the peak day · {fmt(estimate.hours)} h · peak-hour factor {fmt(estimate.factor)} ·{" "}
            {fmt(estimate.unitsPerOrder)} units per order
          </p>
          <p className="mt-1 font-display font-semibold">
            About {fmt(Math.round(estimate.peakUnitsPerHour))} units per peak hour: {fmt(estimate.pickers)} pickers,{" "}
            {fmt(estimate.packStations)} packing stations, {fmt(estimate.sortLanes)} sortation lanes with 15% headroom
          </p>
        </div>
      )}

      <p className="text-sm text-slate">All fields are required unless marked optional.</p>
      <div aria-live="polite" className="sr-only">
        {submitted && errorCount > 0 ? `${errorCount} ${errorCount === 1 ? "field needs" : "fields need"} attention.` : ""}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={id("name")} label="Full name" error={errors.name} errorId={id("name-err")}>
          <input
            id={id("name")}
            data-field="name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describe("name")}
            className="field"
          />
        </Field>
        <Field id={id("company")} label="Company" error={errors.company} errorId={id("company-err")}>
          <input
            id={id("company")}
            data-field="company"
            name="company"
            autoComplete="organization"
            value={values.company}
            onChange={(e) => set("company", e.target.value)}
            aria-invalid={errors.company ? true : undefined}
            aria-describedby={describe("company")}
            className="field"
          />
        </Field>
        <Field id={id("email")} label="Work email" error={errors.email} errorId={id("email-err")}>
          <input
            id={id("email")}
            data-field="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describe("email")}
            className="field"
          />
        </Field>
        <Field id={id("bottleneck")} label="Main bottleneck" error={errors.bottleneck} errorId={id("bottleneck-err")}>
          <select
            id={id("bottleneck")}
            data-field="bottleneck"
            name="bottleneck"
            value={values.bottleneck}
            onChange={(e) => set("bottleneck", e.target.value)}
            aria-invalid={errors.bottleneck ? true : undefined}
            aria-describedby={describe("bottleneck")}
            className="field"
          >
            <option value="">Choose one</option>
            {bottlenecks.map((b) => (
              <option key={b.title}>{b.title}</option>
            ))}
            <option>Not sure yet</option>
          </select>
        </Field>
      </div>

      {needsModules && (
        <fieldset aria-describedby={errors.modules ? id("modules-err") : undefined}>
          <legend className="font-display text-sm font-semibold">Modules you want quoted</legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {modules.map((m, i) => (
              <label key={m.id} className="choice">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  data-field={i === 0 ? "modules" : undefined}
                  checked={values.modules.includes(m.id)}
                  onChange={(e) =>
                    set("modules", e.target.checked ? [...values.modules, m.id] : values.modules.filter((x) => x !== m.id))
                  }
                />
                <span className="choice-box gap-3">
                  <span className="module-letter h-7 w-7 text-sm" aria-hidden="true">
                    {m.letter}
                  </span>
                  {m.name}
                </span>
              </label>
            ))}
          </div>
          {errors.modules && (
            <p id={id("modules-err")} className="field-error">
              {errors.modules}
            </p>
          )}
        </fieldset>
      )}

      <Field id={id("message")} label="Anything else (optional)">
        <textarea
          autoComplete="off"
          id={id("message")}
          name="message"
          rows={3}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          className="field min-h-24 py-3"
          placeholder="Peak seasons, blackout windows, your WMS…"
        />
      </Field>

      <div className="flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate">Demo only: nothing you type here is sent or stored.</p>
        <button type="submit" className="btn btn-primary shrink-0" disabled={status === "loading"}>
          {status === "loading" ? (
            <>
              <Spinner /> Preparing your summary…
            </>
          ) : estimate ? (
            "Send for review"
          ) : (
            "Request my quote"
          )}
        </button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  errorId,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  errorId?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-display text-sm font-semibold">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && (
        <p id={errorId} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}

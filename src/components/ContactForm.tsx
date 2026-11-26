"use client";

import { useEffect, useId, useRef, useState } from "react";
import { nextSteps } from "@/content/data";
import { DemoNotice } from "./interactive/DemoNotice";
import { Spinner } from "./interactive/Spinner";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TOPICS = ["A demo of SmartFlow 360", "A quote for one or more modules", "A review of my capacity estimate", "Something else"];

type Values = { name: string; company: string; email: string; topic: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;
const empty: Values = { name: "", company: "", email: "", topic: "", message: "" };

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Enter your name.";
  if (v.company.trim().length < 2) e.company = "Enter your company.";
  if (!v.email.trim()) e.email = "Enter your work email.";
  else if (!EMAIL.test(v.email.trim())) e.email = "Enter an email address like name@company.com.";
  if (!v.topic) e.topic = "Choose what you need.";
  if (v.message.trim().length < 20) e.message = "Tell us a little more (at least 20 characters).";
  return e;
}

/** Simulated contact form: validates, shows a loading state and ends on a result panel. Nothing is sent or stored. */
export function ContactForm() {
  const uid = useId();
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);
  useEffect(() => {
    if (status === "done") resultRef.current?.focus();
  }, [status]);

  const set = (key: keyof Values, value: string) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (submitted) setErrors(validate(next));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const found = validate(values);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("loading");
    timer.current = window.setTimeout(() => setStatus("done"), 1300);
  };

  const id = (f: string) => `${uid}-${f}`;
  const errorCount = Object.keys(errors).length;

  if (status === "done") {
    return (
      <div ref={resultRef} tabIndex={-1} className="space-y-6 focus:outline-none" aria-live="polite">
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-mint text-deep" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="h-6 w-6">
              <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div>
            <p className="font-display text-2xl font-bold">Simulation complete, {values.name.trim().split(/\s+/)[0]}</p>
            <p className="mt-1 text-slate">
              Your message about “{values.topic.toLowerCase()}” was not sent anywhere. Here is what would happen next with
              a real company.
            </p>
          </div>
        </div>
        <ol className="grid gap-3 sm:grid-cols-3">
          {nextSteps.map((s, i) => (
            <li key={s.title} className="rounded-xl bg-surface p-4">
              <span className="font-display text-sm font-semibold text-deep">Step {i + 1}</span>
              <p className="font-display font-semibold">{s.title}</p>
              <p className="text-sm text-slate">{s.text}</p>
            </li>
          ))}
        </ol>
        <DemoNotice subject="SmartFlow 360 inquiry" />
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => {
            setValues(empty);
            setErrors({});
            setSubmitted(false);
            setStatus("idle");
          }}
        >
          Write Another Message
        </button>
      </div>
    );
  }

  const describe = (f: keyof Values, help = false) =>
    [help ? id(`${f}-help`) : "", errors[f] ? id(`${f}-err`) : ""].filter(Boolean).join(" ") || undefined;

  const err = (f: keyof Values) =>
    errors[f] ? (
      <p id={id(`${f}-err`)} className="field-error">
        {errors[f]}
      </p>
    ) : null;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5" aria-busy={status === "loading"}>
      <div aria-live="polite" className="sr-only">
        {submitted && errorCount > 0 ? `${errorCount} ${errorCount === 1 ? "field needs" : "fields need"} attention.` : ""}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={id("name")} className="block font-display text-sm font-semibold">
            Full name
          </label>
          <input
            id={id("name")}
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describe("name")}
            className="field mt-1.5"
          />
          {err("name")}
        </div>
        <div>
          <label htmlFor={id("company")} className="block font-display text-sm font-semibold">
            Company
          </label>
          <input
            id={id("company")}
            name="company"
            autoComplete="organization"
            value={values.company}
            onChange={(e) => set("company", e.target.value)}
            aria-invalid={errors.company ? true : undefined}
            aria-describedby={describe("company")}
            className="field mt-1.5"
          />
          {err("company")}
        </div>
      </div>
      <div>
        <label htmlFor={id("email")} className="block font-display text-sm font-semibold">
          Work email
        </label>
        <input
          id={id("email")}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          value={values.email}
          onChange={(e) => set("email", e.target.value)}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={describe("email")}
          className="field mt-1.5"
        />
        {err("email")}
      </div>
      <div>
        <label htmlFor={id("topic")} className="block font-display text-sm font-semibold">
          What do you need?
        </label>
        <select
          id={id("topic")}
          name="topic"
          value={values.topic}
          onChange={(e) => set("topic", e.target.value)}
          aria-invalid={errors.topic ? true : undefined}
          aria-describedby={describe("topic")}
          className="field mt-1.5"
        >
          <option value="">Choose one</option>
          {TOPICS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        {err("topic")}
      </div>
      <div>
        <label htmlFor={id("message")} className="block font-display text-sm font-semibold">
          Your floor and your main bottleneck
        </label>
        <p id={id("message-help")} className="text-sm text-slate">
          Peak orders per day, your WMS, and where orders get stuck.
        </p>
        <textarea
          autoComplete="off"
          id={id("message")}
          name="message"
          rows={5}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describe("message", true)}
          className="field mt-1.5 min-h-32 py-3"
        />
        {err("message")}
      </div>
      <div className="flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate">Demo only: nothing you type here is sent or stored.</p>
        <button type="submit" className="btn btn-primary btn-lg shrink-0" disabled={status === "loading"}>
          {status === "loading" ? (
            <>
              <Spinner /> Checking your message…
            </>
          ) : (
            "Send message"
          )}
        </button>
      </div>
    </form>
  );
}

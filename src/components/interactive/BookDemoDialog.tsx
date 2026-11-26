"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { mailtoHref } from "@/content/site";
import { DemoNotice } from "./DemoNotice";
import { Modal } from "./Modal";
import { Spinner } from "./Spinner";

const SLOTS = ["09:00", "11:30", "15:00", "16:30"] as const;
const FORMATS = ["Video call", "At our Lima office"] as const;

/** The next five working days, starting tomorrow. */
function nextWorkingDays(count = 5) {
  const days: Date[] = [];
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  while (days.length < count) {
    d.setDate(d.getDate() + 1);
    const dow = d.getDay();
    if (dow !== 0 && dow !== 6) days.push(new Date(d));
  }
  return days;
}

// A fixed pattern of taken slots so the calendar looks plausible.
const isTaken = (day: number, slot: number) => (day * 3 + slot * 2) % 5 === 0;

const dayLabel = (d: Date) => d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

export function BookDemoDialog({
  open,
  topic,
  onClose,
}: {
  open: boolean;
  topic: "demo" | "planning";
  onClose: () => void;
}) {
  const title = topic === "planning" ? "Book a Planning Session" : "Book a Demo";
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      description={
        topic === "planning"
          ? "Pick a time to walk through a phased plan around your peak seasons and blackout windows."
          : "Pick a time for a walkthrough of SmartFlow 360 with our engineers."
      }
      size="lg"
    >
      <SlotPicker topic={title} />
    </Modal>
  );
}

function SlotPicker({ topic }: { topic: string }) {
  const days = useMemo(() => nextWorkingDays(), []);
  const [day, setDay] = useState<number | null>(null);
  const [slot, setSlot] = useState<number | null>(null);
  const [format, setFormat] = useState<number>(0);
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [tried, setTried] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);
  useEffect(() => {
    if (status === "done") resultRef.current?.focus();
  }, [status]);

  const ready = day !== null && slot !== null;
  const summary = ready ? `${dayLabel(days[day])} at ${SLOTS[slot]} (Lima time), ${FORMATS[format].toLowerCase()}` : "";

  const confirm = () => {
    setTried(true);
    if (!ready) return;
    setStatus("loading");
    timer.current = window.setTimeout(() => setStatus("done"), 1100);
  };

  if (status === "done") {
    return (
      <div ref={resultRef} tabIndex={-1} className="space-y-5 focus:outline-none" aria-live="polite">
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-mint text-deep" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="h-6 w-6">
              <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div>
            <p className="font-display text-xl font-bold">Simulation complete</p>
            <p className="mt-1">
              You picked <strong>{summary}</strong>. No meeting has been booked and no one has been notified.
            </p>
          </div>
        </div>
        <DemoNotice subject={`${topic}: ${summary}`} />
        <div className="flex flex-wrap gap-3">
          <a href={mailtoHref(`${topic}: ${summary}`)} className="btn btn-deep">
            Request This Slot by Email
          </a>
          <button type="button" className="btn btn-outline" onClick={() => setStatus("idle")}>
            Choose Another Slot
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        confirm();
      }}
      className="space-y-7"
      aria-busy={status === "loading"}
    >
      <fieldset>
        <legend className="font-display font-semibold">1. Choose a day</legend>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
          {days.map((d, i) => (
            <label key={d.toISOString()} className="choice">
              <input
                type="radio"
                name="day"
                className="sr-only"
                checked={day === i}
                onChange={() => {
                  setDay(i);
                  if (slot !== null && isTaken(i, slot)) setSlot(null);
                }}
              />
              <span className="choice-box flex-col !items-start">
                <span className="text-sm text-slate">{d.toLocaleDateString("en-US", { weekday: "short" })}</span>
                <span className="font-display text-lg font-bold">
                  {d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset disabled={day === null}>
        <legend className="font-display font-semibold">2. Choose a time (Lima, GMT−5)</legend>
        {day === null && <p className="mt-1 text-sm text-slate">Pick a day first to see open times.</p>}
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {SLOTS.map((s, i) => {
            const taken = day !== null && isTaken(day, i);
            return (
              <label key={s} className="choice">
                <input
                  type="radio"
                  name="slot"
                  className="sr-only"
                  checked={slot === i}
                  disabled={taken || day === null}
                  onChange={() => setSlot(i)}
                />
                <span className="choice-box justify-between">
                  <span className="font-display font-semibold tabular-nums">{s}</span>
                  {taken && <span className="text-xs text-slate">Taken</span>}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="font-display font-semibold">3. Format</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {FORMATS.map((f, i) => (
            <label key={f} className="choice">
              <input type="radio" name="format" className="sr-only" checked={format === i} onChange={() => setFormat(i)} />
              <span className="choice-box">{f}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className={`text-sm ${tried && !ready ? "font-semibold text-before" : "text-slate"}`} aria-live="polite">
          {ready
            ? `Selected: ${summary}.`
            : tried
              ? day === null
                ? "Pick a day first, then a time."
                : "Pick a time to continue."
              : "Select a day and a time to continue."}
        </p>
        <button type="submit" className="btn btn-primary shrink-0" disabled={status === "loading"}>
          {status === "loading" ? (
            <>
              <Spinner /> Checking the calendar…
            </>
          ) : (
            "Confirm This Slot"
          )}
        </button>
      </div>
    </form>
  );
}

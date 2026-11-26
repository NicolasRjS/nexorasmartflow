"use client";

import { modules } from "@/content/data";
import { useQueryState } from "@/lib/useQueryState";
import { Arrow } from "./ui";

const letters = modules.map((m) => m.letter.toLowerCase());

const tones = [
  "from-[#1b7a83] to-[#0f4f56] text-white",
  "from-[#4cc6ba] to-[#2b9e92] text-navy",
  "from-[#7a889c] to-[#526075] text-white",
  "from-[#f8c565] to-[#eba734] text-navy",
];

/**
 * The four modules around one hub, as in the proposal deck. Pick a module to see the bottleneck it
 * removes and what you get, then jump to its full section.
 */
export function ModuleExplorer() {
  const [letter, setLetter] = useQueryState("module", letters, letters[0]);
  const active = letters.indexOf(letter);
  const m = modules[active];

  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="relative grid grid-cols-2 gap-3" role="group" aria-label="Choose a module">
        {modules.map((mod, i) => {
          const on = active === i;
          return (
            <button
              key={mod.id}
              type="button"
              aria-pressed={on}
              onClick={() => setLetter(letters[i])}
              className={`flex min-h-32 cursor-pointer flex-col rounded-2xl bg-gradient-to-br p-4 text-left transition-[transform,box-shadow,opacity] duration-300 md:min-h-36 md:p-5 ${tones[i]} ${
                i >= 2 ? "justify-end" : ""
              } ${i % 2 === 1 ? "items-end text-right" : ""} ${
                on
                  ? "scale-[1.02] opacity-100 shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_22px_40px_-18px_rgb(16_44_59/0.65)] ring-4 ring-navy/80"
                  : "opacity-85 shadow-[inset_0_1px_0_rgb(255_255_255/0.3),0_10px_20px_-14px_rgb(16_44_59/0.5)] hover:opacity-100"
              }`}
            >
              <span className="font-display text-3xl leading-none font-bold">{mod.letter}</span>
              <span className="mt-2 block max-w-[9rem] font-display text-[0.95rem] leading-snug font-semibold">
                {mod.name}
              </span>
            </button>
          );
        })}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-navy bg-white text-center font-display text-xs leading-tight font-bold text-navy shadow-[0_10px_24px_-8px_rgb(16_44_59/0.6)] md:h-24 md:w-24 md:text-sm"
        >
          SmartFlow
          <br />
          360
        </div>
      </div>

      <div className="card mt-4 p-5" aria-live="polite">
        <p className="text-sm text-slate">
          <span className="line-through decoration-before/60 decoration-2">{m.pain}</span>
          <span aria-hidden="true"> → </span>
          <span className="font-semibold text-deep">removed by Module {m.letter}</span>
        </p>
        <p className="mt-1 font-display text-lg leading-snug font-semibold">{m.benefit}</p>
        <a href={`#${m.id}`} className="arrow-link mt-3 text-sm">
          Read Module {m.letter}: {m.name}
          <Arrow className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}

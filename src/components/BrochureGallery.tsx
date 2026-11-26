"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const pages = [
  {
    thumb: "/media/brochure-page-1-thumb.jpg",
    full: "/media/brochure-page-1.jpg",
    title: "Outside",
    caption: "The problem, contact details and cover",
    alt: "Outside of the Nexora SmartFlow 360 tri-fold brochure: the four distribution-center bottlenecks, contact details with a QR code to the website, and the cover with the tagline Smarter Flow. Stronger Performance.",
  },
  {
    thumb: "/media/brochure-page-2-thumb.jpg",
    full: "/media/brochure-page-2.jpg",
    title: "Inside",
    caption: "The solution, how it works and the results",
    alt: "Inside of the Nexora SmartFlow 360 tri-fold brochure: the four modules, the automated, assisted and manual material flow, a before and after pick route, design targets, acceptance gates and support.",
  },
];

/** Brochure thumbnails that open a larger view in a native dialog. */
export function BrochureGallery() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [current, setCurrent] = useState(0);
  const page = pages[current];

  const open = (i: number) => {
    setCurrent(i);
    dialogRef.current?.showModal();
  };

  return (
    <>
      <ul className="grid gap-6 md:grid-cols-2">
        {pages.map((p, i) => (
          <li key={p.full}>
            <a
              href={p.full}
              onClick={(e) => {
                e.preventDefault();
                open(i);
              }}
              className="group block overflow-hidden rounded-xl border border-line bg-white transition-shadow hover:shadow-lg hover:shadow-navy/10"
            >
              <Image
                src={p.thumb}
                alt={p.alt}
                width={720}
                height={556}
                className="h-auto w-full transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <span className="flex items-center justify-between gap-3 border-t border-line px-5 py-4">
                <span>
                  <span className="block font-display font-semibold">{p.title}</span>
                  <span className="block text-sm text-slate">{p.caption}</span>
                </span>
                <span className="shrink-0 font-display text-sm font-semibold text-deep group-hover:underline">
                  Enlarge<span className="sr-only"> the {p.title.toLowerCase()} of the brochure</span>
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={`Brochure, ${page.title.toLowerCase()}`}
        className="on-dark m-auto max-h-[95vh] w-[min(96vw,1400px)] overflow-auto rounded-xl bg-navy p-0 text-white backdrop:bg-navy/80"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogRef.current?.close();
        }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 bg-navy px-4 py-3">
          <p className="font-display font-semibold">
            Brochure · {page.title} ({current + 1} of {pages.length})
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              className="min-h-11 rounded-md border border-white/40 px-4 font-display text-sm font-semibold hover:bg-white/10"
              onClick={() => setCurrent((c) => (c + 1) % pages.length)}
            >
              {current === 0 ? "Inside" : "Outside"}
            </button>
            <button
              type="button"
              autoFocus
              className="min-h-11 rounded-md bg-amber px-4 font-display text-sm font-semibold text-navy hover:bg-amber-dark"
              onClick={() => dialogRef.current?.close()}
            >
              Close
            </button>
          </div>
        </div>
        <Image key={page.full} src={page.full} alt={page.alt} width={1800} height={1390} loading="eager" sizes="96vw" className="h-auto w-full" />
      </dialog>
    </>
  );
}

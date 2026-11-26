"use client";

import Image from "next/image";
import { useState } from "react";
import { Modal } from "./interactive/Modal";

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

/** Brochure thumbnails that open a larger view in an accessible modal. */
export function BrochureGallery() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const page = pages[current];
  const other = pages[(current + 1) % pages.length];

  return (
    <>
      <ul className="grid gap-6 md:grid-cols-2">
        {pages.map((p, i) => (
          <li key={p.full}>
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={() => {
                setCurrent(i);
                setOpen(true);
              }}
              className="group block w-full cursor-pointer overflow-hidden rounded-2xl border border-line bg-white text-left transition-shadow hover:shadow-[0_18px_40px_-24px_rgb(16_44_59/0.45)]"
            >
              <span className="block overflow-hidden">
                <Image
                  src={p.thumb}
                  alt={p.alt}
                  width={720}
                  height={556}
                  className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </span>
              <span className="flex items-center justify-between gap-3 border-t border-line px-5 py-4">
                <span>
                  <span className="block font-display font-semibold">{p.title}</span>
                  <span className="block text-sm text-slate">{p.caption}</span>
                </span>
                <span className="inline-flex shrink-0 items-center gap-1.5 font-display text-sm font-semibold text-deep underline decoration-2 underline-offset-4 group-hover:decoration-amber">
                  <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
                    <path d="M7 3H3v4M9 13h4V9M3 3l4.5 4.5M13 13L8.5 8.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  Enlarge<span className="sr-only"> the {p.title.toLowerCase()} of the brochure</span>
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={`Brochure · ${page.title}`}
        description={`${page.caption} (${current + 1} of ${pages.length})`}
        size="xl"
        tone="dark"
        headerExtra={
          <button
            type="button"
            className="btn-close btn-close-dark"
            onClick={() => setCurrent((c) => (c + 1) % pages.length)}
          >
            Show the {other.title}
          </button>
        }
      >
        <Image
          key={page.full}
          src={page.full}
          alt={page.alt}
          width={1800}
          height={1390}
          loading="eager"
          sizes="96vw"
          className="h-auto w-full rounded-lg"
        />
      </Modal>
    </>
  );
}

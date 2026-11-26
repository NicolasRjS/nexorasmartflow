"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const POSTER = "/media/hero/racks-wide-poster.jpg";
const LOOP = "/media/hero/racks-wide.mp4";
const QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * Full-bleed, decorative warehouse footage behind the home hero: a muted loop of about
 * 570 KB over a poster image, under a navy overlay that keeps every line of text above
 * WCAG AA. It plays only on screens 768 px and wider without reduced motion; otherwise
 * the poster stays. A visible control pauses it (WCAG 2.2.2).
 */
export function HeroBackground() {
  const canPlay = useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false);
  const [paused, setPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (paused) v.pause();
    else v.play().catch(() => setPaused(true));
  }, [paused, canPlay]);

  return (
    <>
      <div aria-hidden="true" className="absolute inset-0">
        <Image src={POSTER} alt="" fill priority sizes="100vw" className="object-cover object-right" />
        {canPlay && (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover object-right"
            src={LOOP}
            poster={POSTER}
            muted
            loop
            autoPlay
            playsInline
            preload="none"
            disablePictureInPicture
            tabIndex={-1}
          />
        )}
        {/* Overlay: near-solid navy behind the text, lighter on the right where only footage shows. */}
        <div className="absolute inset-0 bg-navy/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/40 max-md:via-navy/88 max-md:to-navy/80" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy to-transparent" />
      </div>

      {canPlay && (
        <button
          type="button"
          className="icon-btn absolute top-4 right-4 z-20 md:top-6 md:right-6"
          onClick={() => setPaused((p) => !p)}
        >
          {paused ? (
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
              <path d="M4 2.5v11l9-5.5z" fill="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
              <path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" fill="currentColor" />
            </svg>
          )}
          {paused ? "Play background video" : "Pause background video"}
        </button>
      )}
    </>
  );
}

/** The brand route drawn over the footage, ending at the proof card. Decorative. */
export function HeroRoute({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 480" className={className} aria-hidden="true">
      <path
        className="route-draw"
        style={{ ["--len" as string]: 1100 }}
        d="M44 430V300H150V372H246V170H350"
        fill="none"
        stroke="#35B7AA"
        strokeWidth="14"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx="44" cy="436" r="15" fill="#F4B544" />
      <polygon points="346,146 384,170 346,194" fill="#F4B544" />
    </svg>
  );
}

"use client";

import { useRef, useState } from "react";
import { media } from "@/content/site";

type Chapter = { time: string; seconds: number; title: string; text?: string };

/**
 * The institutional video with a chapter list. Each chapter button jumps the player
 * to that moment and starts playback; the chapter that is playing is highlighted.
 */
export function ChapterVideo({
  chapters,
  showText = false,
  heading,
  note,
}: {
  chapters: Chapter[];
  showText?: boolean;
  heading?: React.ReactNode;
  note?: React.ReactNode;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [current, setCurrent] = useState(-1);

  const seek = (c: Chapter, i: number) => {
    const v = ref.current;
    if (!v) return;
    v.currentTime = c.seconds;
    setCurrent(i);
    v.play().catch(() => {});
  };

  const onTime = () => {
    const t = ref.current?.currentTime ?? 0;
    let idx = -1;
    chapters.forEach((c, i) => {
      if (t >= c.seconds - 0.25) idx = i;
    });
    if (idx !== current) setCurrent(idx);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:items-start">
      <figure className="overflow-hidden rounded-2xl bg-navy shadow-[0_24px_60px_-28px_rgb(16_44_59/0.55)] lg:sticky lg:top-28">
        <video
          ref={ref}
          controls
          playsInline
          preload="metadata"
          poster={media.videoPoster}
          width={1280}
          height={720}
          className="block aspect-video h-auto w-full bg-navy"
          aria-label="Nexora institutional video"
          onTimeUpdate={onTime}
        >
          <source src={media.video} type="video/mp4" />
          <track kind="captions" src="/media/nexora-institutional-video.vtt" srcLang="en" label="English" />
          Your browser does not play embedded video.{" "}
          <a href={media.video} className="prose-link">
            Download the Nexora institutional video (MP4)
          </a>
          .
        </video>
        <figcaption className="on-dark flex flex-wrap items-center justify-between gap-2 px-5 py-3 text-sm text-white/80">
          <span>
            <span className="font-display font-semibold text-white">Nexora institutional video</span> · {media.videoLength}
          </span>
          <span>On-screen text with background music · captions available</span>
        </figcaption>
      </figure>

      <div>
        {heading}
        <ol className={`${heading ? "mt-6" : ""} space-y-1.5`} aria-label="Video chapters">
          {chapters.map((c, i) => {
            const active = current === i;
            return (
              <li key={c.time}>
                <button
                  type="button"
                  onClick={() => seek(c, i)}
                  aria-current={active ? "true" : undefined}
                  className={`group flex w-full cursor-pointer gap-4 rounded-xl border px-4 py-3 text-left transition-colors ${
                    active ? "border-deep bg-mint" : "border-transparent hover:border-line hover:bg-surface"
                  }`}
                >
                  <span
                    className={`mt-0.5 inline-flex h-7 min-w-14 shrink-0 items-center justify-center gap-1 rounded-full font-display text-sm font-semibold tabular-nums transition-colors ${
                      active ? "bg-deep text-white" : "bg-navy text-white group-hover:bg-deep"
                    }`}
                  >
                    <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" aria-hidden="true">
                      <path d="M2 1.5v7l6-3.5z" fill="currentColor" />
                    </svg>
                    {c.time}
                  </span>
                  <span>
                    <span className="block font-display font-semibold">
                      <span className="sr-only">Play from {c.time}: </span>
                      {c.title}
                    </span>
                    {showText && c.text && <span className="mt-0.5 block text-[0.95rem] text-slate">{c.text}</span>}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        {note}
      </div>
    </div>
  );
}

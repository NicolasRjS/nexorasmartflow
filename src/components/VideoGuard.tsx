"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Videos with sound. The muted, looping hero background is left alone. */
function soundVideos(root: ParentNode = document) {
  return Array.from(root.querySelectorAll<HTMLVideoElement>("video")).filter((v) => !v.muted && !v.loop);
}

function pauseAll(root?: ParentNode, except?: HTMLVideoElement) {
  soundVideos(root).forEach((v) => {
    if (v !== except && !v.paused) v.pause();
  });
}

/**
 * Keeps video playback under control across the site:
 * - only one video with sound plays at a time;
 * - changing section, closing a dialog, clicking outside the playing video or
 *   leaving the tab pauses it, so no audio keeps going in the background.
 */
export function VideoGuard() {
  const pathname = usePathname();

  // New section: stop anything still playing.
  useEffect(() => {
    pauseAll();
  }, [pathname]);

  useEffect(() => {
    const onPlay = (e: Event) => {
      const v = e.target;
      if (v instanceof HTMLVideoElement && !v.muted && !v.loop) pauseAll(document, v);
    };

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      soundVideos().forEach((v) => {
        if (!v.paused && !(target && v.contains(target)) && target !== v) v.pause();
      });
    };

    // <dialog> "close" does not bubble, but capture listeners still see it.
    const onDialogClose = (e: Event) => {
      if (e.target instanceof HTMLDialogElement) pauseAll(e.target);
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") pauseAll();
    };

    const onPageHide = () => pauseAll();

    document.addEventListener("play", onPlay, true);
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("close", onDialogClose, true);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onPageHide);
    return () => {
      document.removeEventListener("play", onPlay, true);
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("close", onDialogClose, true);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onPageHide);
    };
  }, []);

  return null;
}

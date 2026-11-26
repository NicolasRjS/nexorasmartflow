"use client";

import { Modal } from "./Modal";

export type VideoInfo = {
  title: string;
  description?: string;
  src: string;
  poster: string;
  captions: string;
  startAt?: number;
};

/** Plays a clip with sound and controls in a lightbox. Opened only by a click, so autoplay with sound is allowed. */
export function VideoDialog({ open, video, onClose }: { open: boolean; video: VideoInfo | null; onClose: () => void }) {
  return (
    <Modal
      open={open && !!video}
      onClose={onClose}
      title={video?.title ?? "Video"}
      description={video?.description}
      size="xl"
      tone="dark"
    >
      {video && (
        <video
          key={video.src}
          controls
          autoPlay
          playsInline
          preload="metadata"
          poster={video.poster}
          width={1280}
          height={720}
          className="block aspect-video h-auto w-full rounded-xl bg-black"
          aria-label={video.title}
          onLoadedMetadata={(e) => {
            if (video.startAt) e.currentTarget.currentTime = video.startAt;
          }}
        >
          <source src={video.src} type="video/mp4" />
          <track kind="captions" src={video.captions} srcLang="en" label="English" />
          Your browser does not play embedded video.{" "}
          <a href={video.src} className="prose-link">
            Download the video (MP4)
          </a>
          .
        </video>
      )}
    </Modal>
  );
}

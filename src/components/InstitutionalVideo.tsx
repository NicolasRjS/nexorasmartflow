import { media } from "@/content/site";

export function InstitutionalVideo({ caption = true }: { caption?: boolean }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-white shadow-xl shadow-navy/5">
      <video
        controls
        playsInline
        preload="metadata"
        poster={media.videoPoster}
        width={1280}
        height={720}
        className="block aspect-video h-auto w-full bg-navy"
        aria-label="Nexora institutional video"
      >
        <source src={media.video} type="video/mp4" />
        <track kind="captions" src="/media/nexora-institutional-video.vtt" srcLang="en" label="English" />
        Your browser does not play embedded video.{" "}
        <a href={media.video} className="prose-link">
          Download the Nexora institutional video (MP4)
        </a>
        .
      </video>
      {caption && (
        <figcaption className="px-5 py-4 text-sm text-slate">
          <span className="font-display font-semibold text-navy">Nexora institutional video</span> ·{" "}
          {media.videoLength} · on-screen text with background music
        </figcaption>
      )}
    </figure>
  );
}

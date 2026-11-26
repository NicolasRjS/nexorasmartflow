import Image from "next/image";
import { titleCase } from "@/lib/titleCase";
import Link from "next/link";
import { ChapterVideo } from "@/components/ChapterVideo";
import { HeroBackground, HeroRoute } from "@/components/HeroMedia";
import { ActionButton } from "@/components/interactive/DemoProvider";
import { PickRouteToggle } from "@/components/PickRouteToggle";
import { Arrow, CtaBand, PlayIcon, SectionHeading } from "@/components/ui";
import { customers, modules, notIncluded, reasons, videoScenes } from "@/content/data";
import { media, site } from "@/content/site";

const highlights = [
  { value: "+73%", label: "peak orders per day", customer: "Moda Andina Logistics", href: "/results#moda-andina" },
  { value: "−55%", label: "walking per pick route", customer: "Moda Andina Logistics", href: "/results#moda-andina" },
  { value: "+9.5 pp", label: "same-day dispatch", customer: "Pacífico Beauty", href: "/results#pacifico-beauty" },
  { value: "−69%", label: "near-misses per year", customer: "TecnoSur Distribución", href: "/results#tecnosur" },
];

const homeChapters = videoScenes.filter((s) => ["0:10", "0:24", "1:25", "1:42", "2:10"].includes(s.time));

const institutionalVideo = {
  title: "Nexora institutional video",
  description: `${media.videoLength} · who we are, how every project runs and the results at three Peruvian operations.`,
  src: media.video,
  poster: media.videoPoster,
  captions: "/media/nexora-institutional-video.vtt",
};

export default function Home() {
  return (
    <>
      {/* Hero: headline and the page's one call to action, beside our own warehouse footage. */}
      <section className="on-dark relative overflow-hidden bg-navy text-white">
        <HeroBackground />
        <div className="container-x relative grid gap-10 pt-14 pb-14 md:min-h-[38rem] md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:items-center md:pt-20 lg:min-h-[42rem] lg:pb-20">
          <div>
            <p className="rise flex items-center gap-3 font-display text-[0.95rem] font-semibold text-white/90">
              <span className="h-1 w-8 rounded-full bg-amber" aria-hidden="true" />
              {site.tagline}
            </p>
            <h1 className="display-1 rise rise-2 mt-6 text-white">
              Modernizing Fulfillment. <span className="text-teal">Unlocking Growth.</span>
            </h1>
            <p className="lead rise rise-3 mt-6">
              We modernize the distribution center you already run. SmartFlow 360 adds capacity, cuts walking and makes
              the floor safer, inside your existing building, with your existing WMS and within your budget.
            </p>
            <div className="rise rise-4 mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <ActionButton action={{ kind: "demo" }} className="btn btn-primary btn-lg">
                Book a Demo
                <Arrow />
              </ActionButton>
              <ActionButton
                action={{ kind: "video", video: institutionalVideo }}
                className="arrow-link min-h-11 cursor-pointer text-[1rem]"
              >
                <PlayIcon />
                Watch the {media.videoLength} film
              </ActionButton>
            </div>
          </div>

          <div className="relative hidden h-full min-h-[26rem] md:block">
            <HeroRoute className="rise rise-3 absolute inset-0 h-full w-full" />
            <Link
              href="/results#moda-andina"
              className="raised group absolute right-0 bottom-6 flex max-w-xs items-center justify-between gap-4 rounded-2xl bg-white p-4 text-navy transition-transform hover:-translate-y-1"
            >
              <span>
                <span className="block font-display text-3xl font-bold text-deep">1.1 → 0.5 km</span>
                <span className="block text-sm">per pick route at Moda Andina Logistics</span>
              </span>
              <Arrow className="h-5 w-5 shrink-0 text-deep transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Verified results strip */}
        <div className="relative border-t border-white/10 bg-navy-3/90 backdrop-blur">
          <div className="container-x">
            <h2 className="sr-only">Verified at Our Reference Customers</h2>
            <ul className="grid grid-cols-2 lg:grid-cols-4">
              {highlights.map((h, i) => (
                <li
                  key={h.label}
                  className={`border-white/10 ${i % 2 === 1 ? "border-l" : ""} ${i >= 2 ? "border-t lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
                >
                  <Link href={h.href} className="group flex h-full flex-col px-4 py-6 transition-colors hover:bg-white/5 md:px-6 md:py-8">
                    <span className="font-display text-[2rem] leading-none font-bold text-amber md:text-[2.6rem]">
                      {h.value}
                    </span>
                    <span className="mt-2 font-semibold text-white">{h.label}</span>
                    <span className="mt-1 flex items-center gap-1.5 text-sm text-teal">
                      {h.customer}
                      <Arrow className="h-3.5 w-3.5 opacity-0 transition-[transform,opacity] group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="border-t border-white/10 py-4 text-sm text-white/75">
              Every figure was verified in the site acceptance test (SAT) and in load tests.{" "}
              <Link href="/results" className="prose-link">
                See all results and videos
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Bottlenecks to modules: split screen with a sticky intro */}
      <section className="py-16 md:py-24" aria-labelledby="modules-title">
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              id="modules-title"
              title="We fix the bottlenecks, not the whole building"
              lead="SmartFlow 360 combines four modules. We deploy the ones your floor needs and connect them to the WMS you already use."
            />
            <div className="mt-10 rounded-2xl bg-surface p-6 md:p-7">
              <h3 className="text-xl font-bold">More Capacity Within the Building and Budget You Have</h3>
              <p className="mt-2 text-slate">
                Our value proposition is simple: more capacity, less walking and a safer floor. We get there without the
                cost and risk of a rebuild.
              </p>
              <ul className="mt-5 space-y-3">
                {notIncluded.map((n) => (
                  <li key={n.title} className="flex items-start gap-3">
                    <svg viewBox="0 0 24 24" className="mt-0.5 h-6 w-6 shrink-0" aria-hidden="true">
                      <circle cx="12" cy="12" r="11" fill="#102C3B" />
                      <path d="M8.5 8.5l7 7M15.5 8.5l-7 7" stroke="#F4B544" strokeWidth="2.2" strokeLinecap="round" />
                    </svg>
                    <span>
                      <strong className="font-display">{n.title}.</strong> <span className="text-slate">{n.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ol className="space-y-4" aria-label="Bottlenecks and the module that removes each one">
            {modules.map((m) => (
              <li key={m.id}>
                <Link
                  href={`/smartflow-360#${m.id}`}
                  className="card lift group grid gap-4 p-6 hover:border-deep sm:grid-cols-[auto_1fr] md:p-7"
                >
                  <span className="module-letter h-14 w-14 text-2xl" aria-hidden="true">
                    {m.letter}
                  </span>
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate">
                      <span className="line-through decoration-before/60 decoration-2">{m.pain}</span>
                      <Arrow className="h-3.5 w-3.5 text-slate" />
                      <span className="font-semibold text-deep">removed by Module {m.letter}</span>
                    </span>
                    <span className="mt-1 block font-display text-2xl font-bold">{m.name}</span>
                    <span className="mt-2 block text-slate">{m.summary}</span>
                    <span className="mt-3 block">
                      <strong className="text-deep">You get:</strong> {m.benefit}
                    </span>
                    <span className="mt-4 inline-flex items-center gap-2 font-display text-sm font-semibold text-deep underline decoration-2 underline-offset-4 group-hover:decoration-amber">
                      How {m.name} works
                      <Arrow className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Pick-route interaction, reused from Module B as the page's peak moment */}
      <section className="bg-surface py-16 md:py-24" aria-labelledby="walk-title">
        <div className="container-x">
          <SectionHeading
            id="walk-title"
            title="Half the walking, the same orders"
            lead="Switch the view to see how ABC slotting and zone picking shorten a typical mixed-order route."
          />
          <div className="mt-10">
            <PickRouteToggle headingLevel="h3" />
          </div>
        </div>
      </section>

      {/* Institutional video with chapters */}
      <section id="institutional-video" className="py-16 md:py-24" aria-labelledby="video-title">
        <div className="container-x">
          <ChapterVideo
            chapters={homeChapters}
            heading={
              <SectionHeading
                id="video-title"
                title="See Nexora in two and a half minutes"
                lead="Who we are, how every project runs and the results at three Peruvian operations. Pick a chapter to jump straight to it."
              />
            }
            note={
              <p className="mt-6">
                <Link href="/media#video" className="arrow-link">
                  Read every scene of the video
                  <Arrow />
                </Link>
              </p>
            }
          />
        </div>
      </section>

      {/* Customer clips: teasers that play in a lightbox; the full results live on /results */}
      <section className="on-dark bg-navy py-16 text-white md:py-24" aria-labelledby="clips-title">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              id="clips-title"
              title="See it running at three operations"
              lead="Each 25-second clip shows the floor before, the Nexora solution and the results verified at SAT."
            />
            <Link href="/results" className="arrow-link shrink-0">
              Compare every result
              <Arrow />
            </Link>
          </div>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {customers.map((c) => (
              <li key={c.id} className="flex flex-col">
                <ActionButton
                  action={{
                    kind: "video",
                    video: {
                      title: `${c.name}: ${c.project}`,
                      description: c.videoText,
                      src: c.video,
                      poster: c.poster,
                      captions: c.video.replace(".mp4", ".vtt"),
                    },
                  }}
                  className="group relative block aspect-video w-full cursor-pointer overflow-hidden rounded-2xl bg-navy-2"
                  aria-label={`Play the ${c.name} clip (0:25)`}
                >
                  <Image
                    src={c.poster}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <span className="absolute inset-0 bg-navy/25 transition-colors group-hover:bg-navy/10" aria-hidden="true" />
                  <span
                    className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-amber px-4 py-2 font-display text-sm font-semibold text-navy shadow-lg"
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 12 12" className="h-3 w-3">
                      <path d="M3 1.5v9l7.5-4.5z" fill="currentColor" />
                    </svg>
                    Play · 0:25
                  </span>
                </ActionButton>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-display text-lg font-semibold text-white">{c.name}</p>
                    <p className="text-sm text-white/75">
                      {c.project} · {c.location}
                    </p>
                  </div>
                  <p className="shrink-0 text-right">
                    <span className="block font-display text-2xl font-bold text-amber">{c.kpis[0].change}</span>
                    <span className="block text-xs text-white/75">{c.kpis[0].label.toLowerCase()}</span>
                  </p>
                </div>
                <Link href={`/results#${c.id}`} className="prose-link mt-3 text-sm">
                  Full {c.name} results
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Reasons */}
      <section className="py-16 md:py-24" aria-labelledby="reasons-title">
        <div className="container-x">
          <SectionHeading id="reasons-title" title="Three reasons to choose Nexora" />
          <ul className="mt-10 grid border-t-2 border-navy md:grid-cols-3">
            {reasons.map((r, i) => (
              <li
                key={r.title}
                className={`py-7 md:px-7 md:py-9 ${i > 0 ? "border-t border-line md:border-t-0 md:border-l" : ""} ${i === 0 ? "md:pl-0" : ""}`}
              >
                <h3 className="text-2xl font-bold">{titleCase(r.title)}</h3>
                <p className="mt-3 text-slate">{r.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6">
            <Link href="/implementation" className="arrow-link">
              See how we deliver and support every project
              <Arrow />
            </Link>
          </p>
        </div>
      </section>

      <CtaBand
        title="See SmartFlow 360 on your floor."
        text="Book a working session with our engineers. Bring your peak volume and your main bottleneck; we bring a first view of what SmartFlow 360 can do in your building."
        action={
          <ActionButton action={{ kind: "demo" }} className="btn btn-primary btn-lg">
            Book a Demo
            <Arrow />
          </ActionButton>
        }
      />
    </>
  );
}

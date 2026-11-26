import type { Metadata } from "next";
import Link from "next/link";
import { BrochureGallery } from "@/components/BrochureGallery";
import { InstitutionalVideo } from "@/components/InstitutionalVideo";
import { CtaBand, PageHero, SectionHeading } from "@/components/ui";
import { media } from "@/content/site";

export const metadata: Metadata = {
  title: "Brochure & Video",
  description:
    "Watch the Nexora institutional video and download the SmartFlow 360 tri-fold brochure.",
};

const scenes = [
  { time: "0:00", title: "Smarter Flow. Stronger Performance.", text: "Intralogistics engineering from Lima, Peru." },
  {
    time: "0:10",
    title: "Our story",
    text: "Four engineers with one idea: move more without moving out. Founded in Lima in 2019, first integration in 2021, SmartFlow 360 in 2023, first full building in 2024 and the Arequipa office in 2025.",
  },
  {
    time: "0:24",
    title: "What we do",
    text: "Engineering, not an equipment catalogue: we measure, design, integrate and sustain.",
  },
  {
    time: "0:36",
    title: "Five service lines",
    text: "Flow Diagnosis, Layout Engineering, Systems Integration, Supply and Installation, and Service and Hypercare.",
  },
  {
    time: "0:54",
    title: "One company, one platform",
    text: "Nexora is the masterbrand; SmartFlow 360 is the platform every project runs on, with four modules: Diagnose, Pick, Sort and Care.",
  },
  {
    time: "1:07",
    title: "Five project stages",
    text: "Diagnose, Design, Build and FAT, Install and SAT, and Hypercare.",
  },
  {
    time: "1:25",
    title: "Where we work",
    text: "Two offices, Lima and Arequipa, with projects live in Lima, Callao and Arequipa.",
  },
  {
    time: "1:42",
    title: "Before and after",
    text: "Verified results at Moda Andina Logistics, Pacífico Beauty and TecnoSur Distribución.",
  },
  {
    time: "2:10",
    title: "Why operations teams choose Nexora",
    text: "Your WMS stays, and every result is verified at SAT and in 16-hour load tests.",
  },
  { time: "2:24", title: "Start with a free flow diagnosis", text: "Two weeks on your floor. One report. No commitment." },
];

export default function MediaPage() {
  return (
    <>
      <PageHero
        eyebrow="Brochure & Video"
        title="Nexora at a glance"
        lead="Watch our institutional video and read the SmartFlow 360 brochure. Both show who we are, how SmartFlow 360 works and how we verify results."
      >
        <a href="#video" className="btn btn-primary">
          Watch the video
        </a>
        <a href="#brochure" className="btn btn-outline-light">
          View the brochure
        </a>
      </PageHero>

      <section id="video" className="py-16 md:py-24" aria-labelledby="video-title">
        <div className="container-x">
          <SectionHeading
            id="video-title"
            eyebrow="Institutional video"
            title="Who we are, in two and a half minutes"
            lead="Our story, our service lines, how every project runs and the results at three Peruvian operations."
          />
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-start">
            <InstitutionalVideo />
            <div>
              <h3 className="text-xl font-semibold">What the video shows</h3>
              <p className="mt-1 text-sm text-slate">The video has no narration. This is its on-screen content.</p>
              <ol className="mt-5 space-y-4 border-l-2 border-line pl-5">
                {scenes.map((s) => (
                  <li key={s.time} className="relative">
                    <span
                      className="absolute top-2 -left-[1.6rem] h-2.5 w-2.5 rounded-full bg-amber"
                      aria-hidden="true"
                    />
                    <p className="font-display text-sm font-semibold">
                      <span className="text-deep tabular-nums">{s.time}</span> · {s.title}
                    </p>
                    <p className="text-[0.95rem] text-slate">{s.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section id="brochure" className="bg-surface py-16 md:py-24" aria-labelledby="brochure-title">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              id="brochure-title"
              eyebrow="Tri-fold brochure"
              title="SmartFlow 360 brochure"
              lead="The problem we solve, the four modules, how the material flow works, our design targets and the support that stays after go-live. Select a page to enlarge it."
            />
            <div className="flex shrink-0 flex-wrap gap-3">
              <a href={media.brochurePdf} download className="btn btn-deep">
                <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
                  <path
                    d="M10 3v10M6 9l4 4 4-4M4 16h12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Download PDF (1.3 MB)
              </a>
              <a href={media.brochurePdf} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                Open PDF<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
          <div className="mt-10">
            <BrochureGallery />
          </div>
          <p className="mt-8 text-sm text-slate">
            The brochure figures are SmartFlow 360 design targets, verified at acceptance testing. For results already
            achieved at our customers, see{" "}
            <Link href="/results" className="prose-link">
              Results
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBand
        title="Start with a free flow diagnosis."
        text="Two weeks on your floor. One report. No commitment."
        primary={{ href: "/contact", label: "Request a flow diagnosis" }}
        secondary={{ href: "/smartflow-360", label: "Explore SmartFlow 360" }}
      />
    </>
  );
}

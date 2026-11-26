import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BrochureGallery } from "@/components/BrochureGallery";
import { ChapterVideo } from "@/components/ChapterVideo";
import { ActionButton } from "@/components/interactive/DemoProvider";
import { CtaBand, PageHero, SectionHeading } from "@/components/ui";
import { videoScenes } from "@/content/data";
import { media } from "@/content/site";

export const metadata: Metadata = {
  title: "Brochure & Video",
  description: "Watch the Nexora institutional video and download the SmartFlow 360 tri-fold brochure.",
};

const DownloadIcon = () => (
  <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
    <path d="M10 3v10M6 9l4 4 4-4M4 16h12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function MediaPage() {
  return (
    <>
      <PageHero
        aside={
          <div aria-hidden="true" className="relative mx-auto hidden h-72 w-full max-w-md sm:block lg:h-80">
            <Image
              src="/media/brochure-page-2-thumb.jpg"
              alt=""
              width={720}
              height={556}
              className="absolute top-6 right-0 w-[78%] rotate-[5deg] rounded-md shadow-[0_30px_50px_-20px_rgb(0_0_0/0.7)] ring-1 ring-white/10"
            />
            <Image
              src="/media/brochure-page-1-thumb.jpg"
              alt=""
              width={720}
              height={556}
              className="absolute top-0 left-0 w-[78%] -rotate-[4deg] rounded-md shadow-[0_30px_50px_-18px_rgb(0_0_0/0.75)] ring-1 ring-white/10"
            />
          </div>
        }
        title="Nexora at a glance"
        lead="Watch our institutional video and read the SmartFlow 360 brochure. Both show who we are, how SmartFlow 360 works and how we verify results."
        actions={
          <>
            <a href={media.brochurePdf} download className="btn btn-primary btn-lg">
              <DownloadIcon />
              Download the Brochure (PDF, 1.3 MB)
            </a>
            <ActionButton action={{ kind: "brochure" }} className="arrow-link min-h-11 cursor-pointer">
              Print a One-Page Summary
            </ActionButton>
          </>
        }
      />

      <section id="video" className="scroll-mt-28 py-16 md:py-24" aria-labelledby="video-title">
        <div className="container-x">
          <ChapterVideo
            chapters={videoScenes}
            showText
            heading={
              <SectionHeading
                id="video-title"
                title="Who we are, in two and a half minutes"
                lead="The video has no narration. Here is its on-screen content; select a scene to play it from there."
              />
            }
            note={
              <p className="mt-6 rounded-xl bg-surface p-4 text-sm text-slate">
                The film uses short working names for the platform (Diagnose, Pick, Sort and Care) and groups the delivery
                into five stages. This website follows our proposal:{" "}
                <Link href="/smartflow-360" className="prose-link">
                  four modules
                </Link>{" "}
                and{" "}
                <Link href="/implementation#delivery" className="prose-link">
                  six delivery stages
                </Link>
                .
              </p>
            }
          />
        </div>
      </section>

      <section id="brochure" className="scroll-mt-28 bg-surface py-16 md:py-24" aria-labelledby="brochure-title">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              id="brochure-title"
              title="SmartFlow 360 brochure"
              lead="The problem we solve, the four modules, how the material flow works, our design targets and the support that stays after go-live. Select a page to enlarge it."
            />
            <a href={media.brochurePdf} target="_blank" rel="noopener noreferrer" className="arrow-link shrink-0">
              Open the PDF<span className="sr-only"> (opens in a new tab)</span>
            </a>
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
        title="Take SmartFlow 360 to your next meeting."
        text="Download the full tri-fold brochure to share with your operations and procurement teams."
        action={
          <a href={media.brochurePdf} download className="btn btn-primary btn-lg">
            <DownloadIcon />
            Download the Brochure
          </a>
        }
      />
    </>
  );
}

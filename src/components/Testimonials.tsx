import Link from "next/link";
import type { Testimonial } from "@/content/data";
import { SectionHeading } from "./ui";

/** Customer comment cards: star rating, quote and customer name. Content comes from `testimonials` in data.ts. */
export function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <section className="py-16 md:py-24" aria-labelledby="testimonials-title">
      <div className="container-x">
        <SectionHeading
          id="testimonials-title"
          title="What our customers say"
          lead={
            <p className="text-base text-slate italic">
              Illustrative comments from fictional customers, created for an academic project.
            </p>
          }
        />
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {items.map((t) => (
            <li key={t.customer} className="flex">
              <figure className="card flex w-full flex-col p-6 md:p-7">
                <Stars rating={t.rating} />
                <blockquote className="mt-4 flex-1 text-lg">
                  <p>“{t.comment}”</p>
                </blockquote>
                <figcaption className="mt-5 border-t border-line pt-4 font-display font-semibold">
                  {t.customerId ? (
                    <Link href={`/results#${t.customerId}`} className="hover:text-deep hover:underline">
                      {t.customer}
                    </Link>
                  ) : (
                    t.customer
                  )}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Stars({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <p className="flex gap-1" role="img" aria-label={`Rated ${rating} out of ${max}`}>
      {Array.from({ length: max }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={`h-5 w-5 ${i < rating ? "text-amber" : "text-line"}`} aria-hidden="true">
          <path
            d="M10 1.8l2.5 5.2 5.7.8-4.1 4 1 5.7L10 14.8l-5.1 2.7 1-5.7-4.1-4 5.7-.8z"
            fill="currentColor"
          />
        </svg>
      ))}
    </p>
  );
}

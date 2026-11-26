import Link from "next/link";
import { externalResources, mailtoHref, nav, site } from "@/content/site";
import { ConveyorBand } from "./ConveyorBand";
import { ExternalLink } from "./ExternalLink";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="on-dark bg-navy text-white/85">
      <ConveyorBand className="bg-navy pt-2" />
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr]">
        <div>
          <Logo dark />
          <p className="mt-5 font-display text-teal italic">{site.tagline}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/75">
            Targeted modernization of existing distribution centers: more capacity, less walking and a safer
            floor.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-display text-sm font-semibold tracking-[0.14em] text-white uppercase">Pages</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="underline-offset-4 hover:text-white hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-sm font-semibold tracking-[0.14em] text-white uppercase">
            Industry resources
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {externalResources.map((r) => (
              <li key={r.href}>
                <ExternalLink href={r.href} className="underline-offset-4 hover:text-white hover:underline">
                  {r.label}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold tracking-[0.14em] text-white uppercase">Contact</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={mailtoHref()} className="prose-link break-all">
                {site.contactEmail}
              </a>
            </li>
            {site.phone && (
              <li>
                <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="prose-link">
                  {site.phone}
                </a>
              </li>
            )}
            {site.location && <li>{site.location}</li>}
          </ul>
          <Link href="/contact" className="btn btn-primary mt-6 text-sm">
            Start a conversation
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-white/70 md:flex-row md:justify-between">
          <p>© 2026 {site.name}. All rights reserved.</p>
          <p>
            Nexora and its reference customers are fictional, created for SIE 415/515 Technical Sales and Marketing,
            University of Arizona.
          </p>
        </div>
      </div>
    </footer>
  );
}

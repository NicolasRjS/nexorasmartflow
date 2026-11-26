import Link from "next/link";
import { externalResources, mailtoHref, nav, secondaryNav, site } from "@/content/site";
import { ConveyorBand } from "./ConveyorBand";
import { ExternalLink } from "./ExternalLink";
import { Logo } from "./Logo";

const footLink = "inline-flex min-h-9 items-center underline-offset-4 transition-colors hover:text-white hover:underline";

export function SiteFooter() {
  return (
    <footer className="on-dark bg-navy text-white/85">
      <ConveyorBand className="bg-navy pt-2" />
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr]">
        <div>
          <Logo dark />
          <p className="mt-5 font-display text-lg text-teal italic">{site.tagline}</p>
          <p className="mt-3 max-w-xs text-sm text-white/80">
            Targeted modernization of existing distribution centers: more capacity, less walking and a safer floor.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-display text-base font-semibold text-white">Pages</h2>
          <ul className="mt-3 text-sm">
            {[...nav, ...secondaryNav].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={footLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-base font-semibold text-white">Industry Resources</h2>
          <ul className="mt-3 text-sm">
            {externalResources.map((r) => (
              <li key={r.href}>
                <ExternalLink href={r.href} className={footLink}>
                  {r.label}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-base font-semibold text-white">Contact</h2>
          <ul className="mt-3 space-y-1 text-sm">
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
            {site.location && <li className="pt-1">{site.location}</li>}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-sm text-white/75 lg:flex-row lg:justify-between lg:gap-10">
          <p className="shrink-0">© 2026 {site.name}</p>
          <p className="max-w-[46em] lg:text-right">
            Nexora Intralogistics Solutions is a fictional company created for the SIE 415/515 course at the University of
            Arizona. Forms and demos on this site are simulations; no data is collected. Its reference customers are
            fictional too.
          </p>
        </div>
      </div>
    </footer>
  );
}

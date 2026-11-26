import Image from "next/image";
import Link from "next/link";

const LOCKUP_LIGHT = "/images/logo/nexora-lockup-light.png"; // for light backgrounds
const LOCKUP_DARK = "/images/logo/nexora-lockup-dark.png"; // for navy backgrounds
const MARK = "/images/logo/nexora-mark-square.png";

/** The Nexora app-icon mark (racks, a route through them, start dot and arrow) on its navy square. */
export function LogoMark({ className = "h-10 w-10", alt = "" }: { className?: string; alt?: string }) {
  return <Image src={MARK} alt={alt} width={512} height={512} className={className} />;
}

/** Full logo lockup linking home. `dark` picks the variant made for navy backgrounds. */
export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="group flex shrink-0 items-center rounded-md" aria-label="Nexora Intralogistics Solutions, home">
      <Image
        src={dark ? LOCKUP_DARK : LOCKUP_LIGHT}
        alt=""
        width={640}
        height={130}
        priority={!dark}
        className="h-8 w-auto transition-transform duration-200 group-hover:scale-[1.02] sm:h-10"
      />
    </Link>
  );
}

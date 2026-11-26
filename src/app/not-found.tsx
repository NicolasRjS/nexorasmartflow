import Link from "next/link";
import { nav } from "@/content/site";

export default function NotFound() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-x max-w-2xl text-center">
        <p className="font-display text-lg font-semibold text-deep">Error 404</p>
        <h1 className="display-2 mt-3">This Page Took a Wrong Turn</h1>
        <p className="lead mx-auto mt-5">
          The page you are looking for does not exist or has moved. Choose a page below to continue.
        </p>
        <Link href="/" className="btn btn-primary btn-lg mt-9">
          Return to the Home Page
        </Link>
        <ul className="mt-10 flex flex-wrap justify-center gap-2">
          {nav.slice(1).map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="pill-link">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

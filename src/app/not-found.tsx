import Link from "next/link";
import { nav } from "@/content/site";

export default function NotFound() {
  return (
    <section className="py-24">
      <div className="container-x max-w-2xl text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-3 text-4xl font-bold">This page took a wrong turn</h1>
        <p className="mt-4 text-lg text-slate">
          The page you are looking for does not exist or has moved. Choose a page below to continue.
        </p>
        <Link href="/" className="btn btn-deep mt-8">
          Return to the home page
        </Link>
        <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {nav.slice(1).map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="prose-link">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

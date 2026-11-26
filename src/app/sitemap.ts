import type { MetadataRoute } from "next";
import { nav, secondaryNav, site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [...nav, ...secondaryNav].map((item) => ({ url: `${site.url}${item.href === "/" ? "" : item.href}` }));
}

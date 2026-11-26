import { nav, secondaryNav } from "@/content/site";

export type PageInfo = { href: string; label: string; summary: string };

// The seven main pages in reading order, with a one-line summary for the page-to-page navigation.
const summaries: Record<string, string> = {
  "/": "Our promise, verified results and the institutional video",
  "/smartflow-360": "The four modules, the material flow and our scope",
  "/capacity-planner": "Size pickers, packing stations and lanes for your peak hour",
  "/implementation": "Six stages, acceptance gates, integration and support",
  "/results": "Before and after at three operations, with project videos",
  "/about": "What we do, how we work and the team",
  "/contact": "Send us a message or reach us by email and phone",
  "/media": "The institutional video and the tri-fold brochure",
};

export const pages: PageInfo[] = nav.map((n) => ({ ...n, summary: summaries[n.href] }));
export const allPages: PageInfo[] = [...pages, ...secondaryNav.map((n) => ({ ...n, summary: summaries[n.href] }))];

export function findPage(pathname: string) {
  return allPages.find((p) => p.href === pathname);
}

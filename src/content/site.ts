// Site-wide settings. Edit this file to change contact details and display flags.

export const site = {
  name: "Nexora Intralogistics Solutions",
  shortName: "Nexora",
  product: "Nexora SmartFlow 360",
  tagline: "Smarter Flow. Stronger Performance.",
  headline: "Modernizing Fulfillment. Unlocking Growth.",
  url: "https://nexorasmartflow.vercel.app",

  contactEmail: "contacto@nexorasmartflow.pe" as string,
  // Optional. Leave empty ("") to hide.
  phone: "+51 1 612 8400" as string,
  location: "Lima · Arequipa, Peru" as string,

  // true: show full names on About & Team. false: show roles only.
  showTeamNames: true,

  description:
    "Nexora Intralogistics Solutions modernizes existing distribution centers. SmartFlow 360 adds capacity, cuts walking and makes the floor safer, inside your building and with your WMS.",
} as const;

// Same details as the printed brochure.
export const offices = [
  { label: "Lima (head office)", address: "Av. Javier Prado Este 4200, Of. 1203, Surco, Lima" },
  { label: "Arequipa (field office)", address: "Parque Industrial Río Seco, Cerro Colorado, Arequipa" },
] as const;

// Pages linked from the footer and from page content, outside the main navigation.
export const secondaryNav = [{ href: "/media", label: "Brochure & Video" }] as const;

export const media = {
  video: "/media/nexora-institutional-video.mp4",
  videoPoster: "/media/nexora-institutional-video-poster.jpg",
  videoLength: "2:33",
  brochurePdf: "/media/nexora-smartflow-360-brochure.pdf",
} as const;

export const mailtoHref = (subject = "SmartFlow 360 inquiry", body?: string) => {
  const params = new URLSearchParams({ subject });
  if (body) params.set("body", body);
  // URLSearchParams encodes spaces as "+", which some mail clients show literally.
  return `mailto:${site.contactEmail}?${params.toString().replace(/\+/g, "%20")}`;
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/smartflow-360", label: "SmartFlow 360" },
  { href: "/capacity-planner", label: "Capacity Planner" },
  { href: "/implementation", label: "Implementation & Support" },
  { href: "/results", label: "Results" },
  { href: "/about", label: "About & Team" },
  { href: "/contact", label: "Contact" },
] as const;

export const externalResources = [
  {
    href: "https://www.gs1.org/standards/barcodes",
    label: "GS1 barcode standards",
    why: "The global standards behind the barcodes our scanning and sortation read.",
  },
  {
    href: "https://www.mhi.org/",
    label: "MHI",
    why: "The material handling and supply chain industry association.",
  },
  {
    href: "https://www.osha.gov/powered-industrial-trucks",
    label: "OSHA: powered industrial trucks",
    why: "Forklift safety guidance that informs our pedestrian and forklift segregation.",
  },
  {
    href: "https://sie.engineering.arizona.edu/",
    label: "University of Arizona SIE",
    why: "Department of Systems and Industrial Engineering, where this project was developed.",
  },
] as const;

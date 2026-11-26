// Company content. Every figure here comes from the Nexora SmartFlow 360 proposal deck.

export type Module = {
  id: string;
  letter: string;
  name: string;
  summary: string;
  benefit: string;
  features: string[];
};

export const modules: Module[] = [
  {
    id: "module-a",
    letter: "A",
    name: "Smart Material Flow",
    summary: "Modular conveyors, scanning, induction and sortation.",
    benefit: "Smoother order flow and fewer queues between picking, packing and dispatch.",
    features: [
      "Modular conveyors sized to your floor plan",
      "Automatic scanning and routing of every unit",
      "Even induction into packing",
      "Sortation lanes that stage orders by carrier route",
    ],
  },
  {
    id: "module-b",
    letter: "B",
    name: "Intelligent Picking",
    summary: "ABC slotting, zone and batch picking, selective pick-to-light.",
    benefit: "Far less walking per pick route, so each picker completes more orders.",
    features: [
      "ABC slotting: the fastest movers sit closest to packing",
      "Zone and batch picking to shorten every route",
      "Selective pick-to-light with confirmation in under half a second",
    ],
  },
  {
    id: "module-c",
    letter: "C",
    name: "Digital Integration",
    summary: "Your WMS stays in charge; we add execution, middleware and live KPIs.",
    benefit: "Real-time visibility of the floor without replacing the system you already trust.",
    features: [
      "Your existing WMS remains the system of record",
      "Execution (WES) and middleware layer with queueing, retry and audit log",
      "Live KPI dashboards and exception management",
    ],
  },
  {
    id: "module-d",
    letter: "D",
    name: "Safe & Scalable Operations",
    summary: "Segregated routes, protected crossings, training and modular growth.",
    benefit: "A safer floor today and room to grow tomorrow.",
    features: [
      "Segregation of pedestrians and forklifts",
      "Protected crossings and emergency stops",
      "Operator and technician training",
      "Controlled maintenance and modular expansion",
    ],
  },
];

export const reasons = [
  {
    title: "Built around your needs",
    text: "Your bottlenecks, your WMS, your building. We design for the floor you already run.",
  },
  {
    title: "Lower implementation risk",
    text: "A plan that respects your peak and blackout periods, tested at every gate.",
  },
  {
    title: "Long-term value",
    text: "Modular growth, ready to scale when your volume does.",
  },
];

export const notIncluded = [
  { title: "No replacement WMS", text: "Your WMS stays the system of record." },
  { title: "No new building", text: "No warehouse replacement or relocation." },
  { title: "No end-to-end robotics", text: "Automation only where it removes a bottleneck." },
];

export type FlowMode = "Automated" | "Assisted" | "Manual";

export const flowSteps: { name: string; mode: FlowMode }[] = [
  { name: "Order release", mode: "Automated" },
  { name: "Picking", mode: "Assisted" },
  { name: "Scanning", mode: "Automated" },
  { name: "Conveyor & sortation", mode: "Automated" },
  { name: "Packing", mode: "Manual" },
  { name: "Staging", mode: "Assisted" },
  { name: "Dispatch", mode: "Assisted" },
];

export const stages = [
  {
    name: "Engineering audit and WMS specification",
    text: "We study your demand profile, bottlenecks and WMS, then fix the design and interface specification.",
  },
  {
    name: "Procurement, manufacturing and FAT",
    text: "Equipment is built and proven in a factory acceptance test before it ships. Integration is tested in staging before any site work.",
  },
  {
    name: "Installation",
    text: "Phased installation, planned around your blackout windows so daily operations continue.",
  },
  {
    name: "Commissioning and SAT",
    text: "Every function is commissioned on site and verified in the site acceptance test.",
  },
  {
    name: "Training and pilot",
    text: "Your team is trained and certified, then runs a four-week pilot with live orders.",
  },
  {
    name: "Full-load verification and handover",
    text: "A full-load test and accuracy verification confirm the targets before final acceptance.",
  },
];

export const acceptanceGates = [
  "FAT",
  "SAT",
  "Four-week pilot",
  "Full-load test",
  "Accuracy verification",
  "Final acceptance",
];

export const integrationTargets = [
  { value: "99%", label: "of messages delivered within 5 seconds" },
  { value: "0", label: "lost or duplicated messages" },
  { value: "30 min", label: "store-and-forward during a link failure" },
  { value: "150%", label: "of peak message volume: interface sizing" },
  { value: "≥ 99.9%", label: "inventory location accuracy" },
  { value: "≥ 99.5%", label: "availability per month" },
];

export const securityControls = [
  "REST over HTTPS with TLS 1.2 or higher",
  "Role-based access",
  "Multi-factor authentication for remote administrators",
  "VPN-only remote support",
  "Audit log",
  "Source-code escrow",
];

export type Kpi = {
  label: string;
  before: string;
  after: string;
  change: string;
};

export type Customer = {
  id: string;
  name: string;
  sector: string;
  location: string;
  project: string;
  facts: string;
  logo: string;
  logoAlt: string;
  video: string;
  poster: string;
  videoText: string;
  kpis: Kpi[];
};

export const customers: Customer[] = [
  {
    id: "moda-andina",
    name: "Moda Andina Logistics",
    sector: "Apparel and footwear 3PL",
    location: "Lima",
    project: "Pick-to-light and zoning",
    facts: "14,000 m² distribution center · live 2024",
    logo: "/images/customers/moda-andina.png",
    logoAlt: "Moda Andina Logistics logo: golden mountains on a burgundy square",
    video: "/videos/moda-andina.mp4",
    poster: "/images/posters/moda-andina.jpg",
    videoText:
      "Before: a mixed order sent each picker through every aisle, about 1.1 km per route. With ABC slotting, zoning and pick-to-light, the route drops to about 0.5 km and peak capacity rises from 10,500 to 18,200 orders per day.",
    kpis: [
      { label: "Peak orders per day", before: "10.5k", after: "18.2k", change: "+73%" },
      { label: "Pick route", before: "1.1 km", after: "0.5 km", change: "−55%" },
      { label: "Order accuracy", before: "98.9%", after: "99.8%", change: "+0.9 pp" },
    ],
  },
  {
    id: "pacifico-beauty",
    name: "Pacífico Beauty",
    sector: "Beauty and personal care",
    location: "Callao",
    project: "Conveyor and sortation line",
    facts: "11,500 m² distribution center · 3 sortation lanes · live 2025",
    logo: "/images/customers/pacifico-beauty.png",
    logoAlt: "Pacífico Beauty Fulfillment logo: a pink drop over blue waves",
    video: "/videos/pacifico-beauty.mp4",
    poster: "/images/posters/pacifico-beauty.jpg",
    videoText:
      "Before: finished orders piled up between packing and staging, and 11% missed the 3 p.m. cut-off. A three-lane sortation line now routes parcels by carrier, and same-day dispatch reaches 98.5%.",
    kpis: [
      { label: "Same-day dispatch", before: "89%", after: "98.5%", change: "+9.5 pp" },
      { label: "Order accuracy", before: "98.7%", after: "99.7%", change: "+1.0 pp" },
      { label: "Labor hours per 1,000 orders", before: "46", after: "33", change: "−28%" },
    ],
  },
  {
    id: "tecnosur",
    name: "TecnoSur Distribución",
    sector: "Consumer electronics",
    location: "Arequipa",
    project: "Segregated routes and serial capture",
    facts: "9,000 m² distribution center · forklift and pedestrian split · live 2025",
    logo: "/images/customers/tecnosur.png",
    logoAlt: "TecnoSur Distribución logo: a blue hexagon with a connected node symbol",
    video: "/videos/tecnosur.mp4",
    poster: "/images/posters/tecnosur.jpg",
    videoText:
      "Before: forklifts and pedestrians shared one crossing, with 13 near-misses in a year. A dedicated walkway and a serial-capture gate cut near-misses to 4 and dock turnaround from 96 to 52 minutes.",
    kpis: [
      { label: "Near-misses per year", before: "13", after: "4", change: "−69%" },
      { label: "Dock turnaround", before: "96 min", after: "52 min", change: "−46%" },
      { label: "Error returns", before: "3.1%", after: "1.3%", change: "−58%" },
    ],
  },
];

export const team = [
  {
    initials: "WR",
    name: "Walter Nicolas Rojas Saravia",
    role: "Team Leader, Project Director",
    text: "Owns the contract, the client relationship and delivery accountability.",
  },
  {
    initials: "CP",
    name: "Carlos Bryan Pereda Montes",
    role: "Project Manager (PMO)",
    text: "Master schedule, FAT and SAT milestones, budget control and blackout-window planning.",
  },
  {
    initials: "MV",
    name: "Mathews Yarley Vargas Alvarado",
    role: "Solutions Architect",
    text: "Designs SmartFlow 360 end to end; owns KPI targets and acceptance criteria.",
  },
  {
    initials: "JC",
    name: "Juan Pablo Cabanillas Huaman",
    role: "Systems and WMS Integration Lead",
    text: "WES and middleware, WMS interfaces, cybersecurity and capacity sizing.",
  },
  {
    initials: "CM",
    name: "Carlos Jose Morante",
    role: "Process and Flow Engineer",
    text: "Slotting, zoning, pick-to-light, conveyor and sortation design.",
  },
  {
    initials: "AR",
    name: "Anyelina Judith Rivera Rubio",
    role: "Operations Analyst",
    text: "Baseline diagnosis: demand profile, bottlenecks, time studies and data validation.",
  },
  {
    initials: "AG",
    name: "Alison Nicole Garcia Leon",
    role: "Business Case and Risk Manager",
    text: "Business case, risk register and contract terms.",
  },
  {
    initials: "FS",
    name: "Fernando Alonso Surco Cora",
    role: "Commercial and Customer Success Lead",
    text: "Customer requirements, training, hypercare and long-term partnership.",
  },
];

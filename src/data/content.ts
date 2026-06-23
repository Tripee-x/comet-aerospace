/* =====================================================================
   COMET AEROSPACE — CONTENT
   All copy is high-level and conceptual. No operational defense detail:
   no range, payload, propulsion, guidance, targeting, or deployment data.
   ===================================================================== */

export const BRAND = {
  name: "Comet Aerospace",
  short: "COMET",
  tagline: "Precision aerospace systems for sovereign innovation.",
  founder: "Abhishek Nand",
  role: "Co-founder, Comet Aerospace",
  email: "contact@cometaerospace.example",
  phone: "+91 90000 00000",
  location: "Mumbai, Maharashtra, India",
};

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "Services", to: "/services" },
  { label: "Contact Us", to: "/contact" },
];

/** Hero phase text — revealed in stages while the hero is pinned. */
export const HERO_PHASES = [
  {
    id: "boot",
    tag: "SYS // INITIALIZE",
    title: "COMET AEROSPACE",
    sub: "Calibrating optics. Establishing telemetry link.",
  },
  {
    id: "approach",
    tag: "PHASE 01 // APPROACH",
    title: "Precision aerospace systems for sovereign innovation.",
    sub: "A concept platform, rendered as a study in form and intent.",
  },
  {
    id: "flyby",
    tag: "PHASE 02 // PROFILE",
    title: "Built for precision. Designed for resilience.",
    sub: "Chrome geometry, plasma signature, deliberate restraint.",
  },
  {
    id: "orbit",
    tag: "PHASE 03 // SURVEY",
    title: "Every surface answers to the mission.",
    sub: "Structural intent mapped across the airframe.",
  },
  {
    id: "mission",
    tag: "PHASE 04 // DOCTRINE",
    title:
      "We help aerospace and defense-tech builders turn complex product ideas into clear, credible, investor-ready systems.",
    sub: "Strategy first. Spectacle second.",
  },
  {
    id: "capability",
    tag: "PHASE 05 // CAPABILITY",
    title: "Three disciplines, one trajectory.",
    sub: "Strategy, systems thinking, and mission-ready design.",
  },
  {
    id: "pullback",
    tag: "PHASE 06 // STANDBY",
    title: "A silhouette against the grid.",
    sub: "The platform holds. The story is ready.",
  },
  {
    id: "exit",
    tag: "PHASE 07 // RELEASE",
    title: "Explore Systems.",
    sub: "Continue into the program brief.",
  },
] as const;

export const HUD_LABELS = [
  { id: "nose", label: "FORE / OPTICS", value: "NODE A1" },
  { id: "mid", label: "STRUCTURE / SPINE", value: "NODE B4" },
  { id: "fin", label: "AERO / STABILIZE", value: "NODE C2" },
  { id: "aft", label: "AFT / SIGNATURE", value: "NODE D7" },
];

export const CAPABILITIES = [
  {
    no: "01",
    title: "Aerospace Product Strategy",
    body: "We shape the trajectory of an aerospace concept from first principle to credible roadmap, so the program reads as inevitable rather than speculative.",
    tag: "STRATEGY",
  },
  {
    no: "02",
    title: "Defense Systems Thinking",
    body: "We frame complex platforms as coherent systems, aligning capability narrative with the realities of stakeholders, timelines, and trust.",
    tag: "SYSTEMS",
  },
  {
    no: "03",
    title: "Mission-Ready Product Design",
    body: "We translate ambition into precise, presentable form, the kind of clarity that survives an engineering review and a boardroom in the same week.",
    tag: "DESIGN",
  },
];

export const PURPOSE = {
  eyebrow: "WHO WE ARE",
  title: "A studio for the hardest product stories in aerospace.",
  body: "Comet Aerospace is a concept and strategy practice. We work alongside aerospace companies and defense-technology founders to give difficult, high-stakes ideas a form that is clear, credible, and ready to be understood by the people who fund and build them.",
  stats: [
    { k: "Concept platforms", v: "End to end" },
    { k: "Focus", v: "Strategy + form" },
    { k: "Posture", v: "Non-operational" },
  ],
};

export const MISSION = {
  eyebrow: "MISSION",
  quote:
    "We help aerospace and defense-tech builders turn complex product ideas into clear, credible, investor-ready systems.",
  sub: "Conceptual by design. We work at the level of intent, narrative, and architecture, never operational specification.",
};

/** Products — conceptual only. No specs, range, payload, propulsion, guidance. */
export const PRODUCTS = [
  {
    no: "P-01",
    name: "Surface-to-Surface Aerospace System",
    kicker: "Concept Platform",
    summary:
      "A conceptual study in long-form ground architecture, explored purely as product narrative, form language, and system framing.",
    desc: "We treat this platform as a storytelling and design exercise: how a complex ground-based aerospace concept should look, read, and be reasoned about by investors and partners. The work stays at the level of intent and presentation.",
    tags: ["Concept Platform", "Strategic Architecture", "Investor-Ready"],
    accent: "magenta",
  },
  {
    no: "P-02",
    name: "Surface-to-Water Strategic System",
    kicker: "Strategic Architecture",
    summary:
      "An abstract maritime-domain concept framed around resilience, posture, and clarity of program story.",
    desc: "A high-level architecture study of how a strategic surface-to-water concept can be communicated with precision. We focus on the credibility of the narrative and the discipline of the visual system, nothing operational.",
    tags: ["Strategic Architecture", "Defense Readiness", "Concept Platform"],
    accent: "purple",
  },
  {
    no: "P-03",
    name: "Surface-to-Air Defense Concept",
    kicker: "Defense Readiness",
    summary:
      "A conceptual air-domain defense study expressed through form, posture, and program framing.",
    desc: "We render the idea of an air-domain defense concept as a premium, legible product story. The deliverable is clarity and confidence in how the concept is positioned, presented entirely without operational detail.",
    tags: ["Defense Readiness", "Strategic Architecture", "Investor-Ready"],
    accent: "cyan",
  },
];

export const SERVICES = [
  {
    no: "01",
    title: "Aerospace product strategy",
    body: "We define the product trajectory for aerospace concepts, from positioning and narrative to the roadmap that makes a program legible to investors and partners.",
  },
  {
    no: "02",
    title: "Defense startup consulting",
    body: "We advise defense-technology founders on how to frame, sequence, and present their concepts with the credibility that early-stage programs demand.",
  },
  {
    no: "03",
    title: "Product architecture advisory",
    body: "We structure complex platforms as coherent systems, clarifying how the parts relate so the whole reads as deliberate engineering, not assembly.",
  },
  {
    no: "04",
    title: "Investor-grade product storytelling",
    body: "We build the narrative spine and visual language that lets a technical aerospace concept land with conviction in a funding conversation.",
  },
  {
    no: "05",
    title: "Prototype experience design",
    body: "We design the experience around a concept, the interfaces, demonstrations, and touchpoints that let stakeholders feel the product before it is built.",
  },
  {
    no: "06",
    title: "Strategic positioning for aerospace products",
    body: "We sharpen where an aerospace product stands in its landscape, so the concept owns a clear, defensible, and memorable position.",
  },
];

export const FOUNDER = {
  eyebrow: "FOUNDER NOTE",
  name: BRAND.founder,
  role: BRAND.role,
  quote:
    "Aerospace deserves storytelling as precise as its engineering. We build the clarity that lets serious concepts be taken seriously.",
  body: "Comet Aerospace exists for the moment a hard idea needs to become a credible program. Our work is conceptual, strategic, and unapologetically high-craft, and it stops exactly where operational detail would begin.",
};

export const INQUIRY_TYPES = [
  "Aerospace product strategy",
  "Defense startup consulting",
  "Product architecture advisory",
  "Investor-grade storytelling",
  "Partnership inquiry",
  "Other",
];

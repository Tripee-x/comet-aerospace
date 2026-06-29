/* =====================================================================
   COMET AEROSPACE — CONTENT
   Sourced from the company pitch deck. Comet builds indigenous solid rocket
   motors. Figures shown (range, CEP, flight-test numbers) are the company's
   own published, investor-facing marketing figures.
   ===================================================================== */

export const BRAND = {
  name: "Comet Aerospace",
  short: "COMET",
  tagline: "We build India's solid rocket motors. In-house.",
  founder: "Abhishek Nand",
  role: "Co-founder, Comet Aerospace",
  email: "contact@cometaerospace.example",
  phone: "+91 90000 00000",
  location: "Mumbai, Maharashtra, India",
};

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "Capability", to: "/services" },
  { label: "Contact Us", to: "/contact" },
];

/** Hero launch-sequence beats, synced to the scroll-scrub footage.
 *  Tells the real company story: why now → what we build → flight-proven. */
export const LAUNCH_SEQUENCE = [
  {
    id: "why",
    code: "01 // WHY NOW",
    title: "The character of conflict changed.",
    body: "Cheap mass, autonomy, and layered air defence now decide engagements once owned by legacy platforms.",
  },
  {
    id: "build",
    code: "02 // WHAT WE BUILD",
    title: "Solid rocket motors. In-house.",
    body: "One vertically integrated team owning the whole propulsion stack, from propellant chemistry to nozzle.",
  },
  {
    id: "flown",
    code: "03 // FLIGHT-PROVEN",
    title: "One motor, already flown in 2026.",
    body: "Interceptor motor launch test, 15 March 2026: 1 km altitude, 2.4 km range. Successful.",
  },
  {
    id: "roadmap",
    code: "04 // THE ROADMAP",
    title: "Three products, one propulsion core.",
    body: "RATO thrusters, a surface-to-surface precision strike, and a surface-to-air interceptor.",
  },
  {
    id: "owned",
    code: "05 // OWNED BY INDIA",
    title: "Indigenous by mandate, not by slogan.",
    body: "Built for a market where listed items are illegal to import and indigenous IP is rewarded.",
  },
] as const;

export const CAPABILITIES = [
  {
    no: "01",
    title: "Propellant & Grain",
    body: "Solid propellant chemistry and grain geometry tuned per mission, the energy source designed in-house from first principles.",
    tag: "CHEMISTRY",
  },
  {
    no: "02",
    title: "Casing, Throat & Nozzle",
    body: "Motor casing, throat, and nozzle engineered together for thrust and weight, so the structure answers to the burn.",
    tag: "STRUCTURE",
  },
  {
    no: "03",
    title: "Thrust & Flight Control",
    body: "Stabilization and guidance that put energy on target, proven on a live-fire flight test, not a slide.",
    tag: "CONTROL",
  },
];

export const PURPOSE = {
  eyebrow: "WHAT WE BUILD",
  title: "From propellant chemistry to a flight-proven motor.",
  body: "Comet Aerospace designs and builds solid rocket motors in-house. One vertically integrated team owns the whole propulsion stack, propellant and grain, casing and nozzle, thrust and flight control, and the live-fire testing that proves it.",
  stats: [
    { k: "Flight test", v: "Mar 2026" },
    { k: "Stack", v: "Owned end to end" },
    { k: "Stage", v: "Pre-seed" },
  ],
};

export const MISSION = {
  eyebrow: "WHY NOW",
  quote:
    "Mass, affordability, and layered defence now decide engagements. We build the indigenous propulsion that lets India field them at home.",
  sub: "A ₹50,000 drone can defeat a ₹50 crore system. Survivability demands stacked detect-track-intercept layers, built on motors made here.",
};

/** Products — three products on one propulsion core. Figures are the
 *  company's own published marketing figures from the deck. */
export const PRODUCTS = [
  {
    no: "01",
    name: "RATO Thrusters",
    kicker: "Prototype",
    summary:
      "Rocket-Assisted Takeoff. Strap-on solid boosters that lift heavy-payload drones off short or unprepared runways.",
    desc: "Extra thrust at the exact moment it matters: a short-duration, high-thrust solid rocket motor that gets heavy UAVs airborne from places a runway never reaches.",
    tags: ["Solid Rocket Motor", "Heavy-Drone Takeoff", "Prototype"],
    accent: "cyan",
  },
  {
    no: "02",
    name: "Surface-to-Surface",
    kicker: "In development",
    summary:
      "A precision-strike missile delivering sub-5-metre accuracy out to 10 kilometres.",
    desc: "Tactical reach with the cost profile of an indigenous, volume-built motor: 10 km operational range, circular error probable under 5 metres, on a solid rocket motor designed in-house.",
    tags: ["10 km Range", "CEP < 5 m", "In Development"],
    accent: "magenta",
  },
  {
    no: "03",
    name: "Surface-to-Air",
    kicker: "On the roadmap",
    summary:
      "A guided interceptor motor for short-range, layered air defence.",
    desc: "Drones, loitering munitions, and low-flying threats. It builds directly on our surface-to-surface motor and the flight-test program already underway, the same propulsion core, extended to the air-defence mission.",
    tags: ["Interceptor", "Layered Defence", "Prospective"],
    accent: "purple",
  },
];

/** "Capability" page items — the propulsion stack and the program around it. */
export const SERVICES = [
  {
    no: "01",
    title: "Solid propellant chemistry",
    body: "We formulate the propellant ourselves, tuning the energy source to the mission rather than buying a fixed off-the-shelf grain.",
  },
  {
    no: "02",
    title: "Grain geometry design",
    body: "Grain geometry is shaped per mission to set the burn profile, short and high-thrust for takeoff, sustained for range.",
  },
  {
    no: "03",
    title: "Casing, throat & nozzle",
    body: "Motor casing, throat, and nozzle are engineered together for thrust and weight, the structure that contains the burn.",
  },
  {
    no: "04",
    title: "Thrust & flight control",
    body: "Stabilization and basic flight control put the energy on target, validated on hardware in live flight.",
  },
  {
    no: "05",
    title: "Live-fire flight testing",
    body: "We fly what we build. One interceptor motor has already flown, reaching 1 km altitude and 2.4 km range in March 2026.",
  },
  {
    no: "06",
    title: "Indigenous, volume-built motors",
    body: "Designed and manufactured in India for a market where the listed items are illegal to import and indigenous IP is rewarded.",
  },
];

export const FOUNDER = {
  eyebrow: "FOUNDER NOTE",
  name: BRAND.founder,
  role: BRAND.role,
  quote:
    "The character of conflict changed, and we felt it firsthand. The answer is propulsion that India owns end to end.",
  body: "Comet Aerospace exists to build that propulsion. We own the whole stack, from propellant chemistry to a motor that has already flown, so the hard part of layered defence is made here, at a cost that scales.",
};

export const INQUIRY_TYPES = [
  "Propulsion / motor inquiry",
  "RATO thrusters",
  "Surface-to-surface program",
  "Air-defence roadmap",
  "Investment / pre-seed",
  "Partnership inquiry",
  "Other",
];

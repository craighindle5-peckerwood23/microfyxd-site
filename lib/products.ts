export type Product = {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  price: string;
  category: string;
  href: string;
  features?: string[];
  includes?: string[];
};

export const products: Product[] = [
  {
    id: "grievance-sheet",
    name: "Grievance Report Sheet",
    description: "A clean, structured template for workplace or housing grievances.",
    longDescription:
      "A professional, legally‑structured grievance report sheet designed for workplace, housing, ADA, and program‑related issues. Built for clarity, accuracy, and documentation strength.",
    price: "$5",
    category: "legal",
    href: "/tools/grievance",
    features: [
      "Incident summary section",
      "Timeline breakdown",
      "Witness & evidence fields",
      "Policy violation references",
      "Requested resolution section",
    ],
    includes: ["1x Grievance Report Sheet (PDF)", "Editable version coming soon"],
  },

  {
    id: "grievance-bundle-10",
    name: "10‑Sheet Grievance Bundle",
    description: "A discounted pack of 10 professional grievance sheets.",
    longDescription:
      "A high‑value bundle of 10 grievance sheets for repeated documentation needs. Ideal for ongoing disputes, housing issues, or workplace patterns.",
    price: "$20",
    category: "bundles",
    href: "/tools/bundles",
    includes: ["10x Grievance Sheets", "Bonus: Incident Checklist"],
  },

  {
    id: "guide-discipline",
    name: "Limit Breaker Guide: Discipline",
    description: "A doctrine‑style guide for building discipline.",
    longDescription:
      "A structured, actionable doctrine card designed to help you build discipline, consistency, and long‑term momentum.",
    price: "$7",
    category: "guides",
    href: "/tools/guides",
    features: [
      "Daily discipline framework",
      "Behavioral triggers",
      "Momentum stacking",
      "Accountability structure",
    ],
  },

  {
    id: "reference-ada",
    name: "Quick Reference: ADA Rights",
    description: "One‑page ADA rights sheet for hotels, programs, and housing.",
    longDescription:
      "A fast‑access ADA rights sheet designed for real‑world situations involving hotels, programs, housing, and public access.",
    price: "$3",
    category: "reference",
    href: "/tools/reference",
    includes: ["ADA Rights Sheet", "Staff question script", "Legal citations"],
  },

  {
    id: "productivity-pack",
    name: "3‑Subject Productivity Pack",
    description: "Discipline + Focus + Time Management doctrine cards.",
    longDescription:
      "A powerful 3‑guide bundle designed to upgrade your productivity, focus, and time management.",
    price: "$15",
    category: "bundles",
    href: "/tools/bundles",
    includes: ["Discipline Guide", "Focus Guide", "Time Management Guide"],
  },
];
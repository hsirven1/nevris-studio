import type { Project } from "./types";

/**
 * Homepage project content.
 *
 * - `featured: true` + `world: "fanstories" | "juno" | "lere" | "ops"` → custom project-world treatment
 * - `featured: false` or `world: "index"` → Working Index row (scalable; no homepage redesign)
 */
export const projects: Project[] = [
  {
    id: "fanstories",
    slug: "fanstories",
    name: "FanStories",
    kind: "CUSTOMER EXPERIENCE / PERSONALIZATION",
    positioning:
      "Turning customer data into stories people actually want to share.",
    summary:
      "FanStories transforms activity and behavioral data into personalized recaps, milestones, and visual stories designed to feel engaging rather than analytical.",
    featured: true,
    world: "fanstories",
    website: "https://fanstories.co",
    actions: [
      {
        label: "View FanStories ↗",
        href: "https://fanstories.co",
        interactive: true,
      },
      {
        label: "View fitness experience ↗",
        href: "https://fitness.fanstories.co",
        interactive: true,
      },
    ],
  },
  {
    id: "lere",
    slug: "lere",
    name: "Grand Angle Photo Festival",
    kind: "MOBILE / COMPUTER VISION / CULTURE",
    positioning: "An immersive festival companion, in your pocket.",
    summary:
      "A native festival companion with programme, map, and artwork recognition — point the camera at a photograph and discover the work behind it.",
    featured: true,
    world: "lere",
    website: "https://grandanglelere.com/",
    actions: [
      {
        label: "Festival site ↗",
        href: "https://grandanglelere.com/",
        interactive: true,
      },
      {
        label: "App Store ↗",
        href: "https://apps.apple.com/us/app/grand-angle-l%C3%A9r%C3%A9/id6755940658",
        interactive: true,
      },
    ],
  },
  {
    id: "juno",
    slug: "juno",
    name: "Juno",
    kind: "AI COMPANION / CONSUMER PRODUCT / RETIREMENT",
    positioning: "Building an AI companion for life after work.",
    summary:
      "Juno helps people navigate retirement with personalized guidance, reflective journeys, contextual AI support, and relevant local opportunities.\n\nThe experience is designed to feel calm, warm, and easy to use, turning broad intentions into practical next steps.",
    featured: true,
    world: "juno",
    website: "https://retirement-companion.vercel.app/home",
    actions: [
      {
        label: "View Juno ↗",
        href: "https://retirement-companion.vercel.app/home",
        interactive: true,
      },
    ],
  },
  {
    id: "ops",
    slug: "ai-executive-assistant",
    name: "Rook AI",
    kind: "AI OPERATIONS / EXECUTIVE ASSISTANT",
    positioning: "An AI executive assistant for complex operations.",
    summary:
      "Rook brings together signals from email, spreadsheets and operational systems, surfaces what needs attention, and recommends clear next steps with the human still in control.",
    featured: true,
    world: "ops",
    website: "https://toy-program-dashboard.vercel.app/",
    actions: [
      {
        label: "View Rook AI ↗",
        href: "https://toy-program-dashboard.vercel.app/",
        interactive: true,
      },
    ],
  },

  /*
  Example Working Index entry — uncomment to add without homepage redesign:
  {
    id: "northline",
    slug: "northline",
    name: "Northline",
    kind: "CLIENT / PLATFORM",
    positioning: "One-line product positioning.",
    summary: "Operations tooling for a distributed team.",
    featured: false,
    world: "index",
  },
  */
];

export const featuredProjects = projects.filter((p) => p.featured);

export const indexProjects = projects.filter(
  (p) => p.world === "index" || !p.featured,
);

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

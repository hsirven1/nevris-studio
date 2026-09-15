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
      "Turning customer data into personalized stories worth sharing.",
    summary:
      "FanStories turns activity data into shareable stories, milestones, and visual recaps that feel engaging rather than analytical.",
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
    positioning: "Festival app connecting visitors to the work around them.",
    summary:
      "The app combines programme, map, exhibition details, and camera-based artwork recognition in one simple mobile experience.",
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
    positioning: "AI companion for navigating life after work.",
    summary:
      "Juno combines personalized guidance, mentor support, local opportunities, and practical next steps to make retirement easier to navigate.",
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
    positioning: "AI assistant for complex operational decisions.",
    summary:
      "Rook pulls signals from email, spreadsheets, and operational systems into one place, then surfaces priorities and recommends next steps for human review.",
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

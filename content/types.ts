export type DotTone = "live" | "lavender" | "ink" | "light";

export type MediaSlot = {
  label: string;
  aspect?: string;
};

/** Featured worlds get custom visual treatments; index is the scalable default. */
export type ProjectWorld = "fanstories" | "juno" | "lere" | "ops" | "index";

export type ProjectAction = {
  label: string;
  href: string;
  interactive?: boolean;
};

export type ShowcaseRow = {
  id: string;
  title: string;
  source: string;
  format: string;
  highlighted?: boolean;
};

export type Project = {
  id: string;
  slug: string;
  name: string;
  kind: string;
  positioning: string;
  summary: string;
  featured: boolean;
  world: ProjectWorld;
  website?: string;
  media?: MediaSlot[];
  actions?: ProjectAction[];
  /** FanStories world — story preview table rows */
  showcaseRows?: ShowcaseRow[];
};

export type Experiment = {
  id: string;
  name: string;
  description: string;
  date: string;
  note?: string;
  link?: string;
  /** Full-bleed lavender band row */
  highlight?: boolean;
  unlisted?: boolean;
};

import type { Experiment } from "./types";

export const experiments: Experiment[] = [
  {
    id: "inbox-cartographer",
    name: "Inbox Cartographer",
    description: "Maps a mailbox into projects, not folders",
    date: "AUG 2026",
    note: "Parses thread structure and surfaces project candidates with ownership hints.",
  },
  {
    id: "meeting-residue",
    name: "Meeting Residue",
    description: "Turns a call into commitments with owners",
    date: "JUL 2026",
    highlight: true,
    note: "Transcript → commitment graph. Owners assigned from calendar context.",
  },
  {
    id: "tactile-cursor",
    name: "Tactile Cursor",
    description: "Pointer that reports what it can do",
    date: "JUN 2026",
    note: "Cursor chrome that exposes affordances before click.",
  },
  {
    id: "ambient-standup",
    name: "Ambient Standup",
    description: "A team status page nobody has to write",
    date: "MAY 2026",
    note: "Aggregates PR, calendar, and chat signals into a quiet daily board.",
  },
  {
    id: "slow-search",
    name: "Slow Search",
    description: "Retrieval that shows its reasoning first",
    date: "MAR 2026",
    note: "Deliberately slow RAG UI that narrates ranking before results.",
  },
];

export const labMeta = {
  intro:
    "Smaller experiments, agents and prototypes that don't warrant a case study. Some become products. Most stay here.",
};

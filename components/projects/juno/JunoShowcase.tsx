"use client";

import { JunoStill } from "@/components/projects/juno/JunoFrames";
import { ProjectMediaReveal } from "@/components/projects/ProjectMediaReveal";

/** High-res stills — native pixel ratios, never cropped. */
const MEDIA = {
  home: {
    src: "/work/juno/stills/home_hq.png",
    width: 2612,
    height: 1488,
    alt: "Juno home — mentor chat and weekly to-dos",
  },
  mentorChat: {
    src: "/work/juno/stills/chat_hq.png",
    width: 1066,
    height: 922,
    alt: "Mentor conversation — preparing your next call",
  },
  insight: {
    src: "/work/juno/stills/assessment_hq.png",
    width: 2530,
    height: 1200,
    alt: "Juno assessment — what stands out about you",
  },
} as const;

function SecondaryScreens() {
  return (
    <div className="flex flex-col gap-4 md:gap-5">
      <JunoStill {...MEDIA.insight} />
      <JunoStill
        {...MEDIA.mentorChat}
        className="mx-auto w-[min(100%,26rem)]"
      />
    </div>
  );
}

/**
 * Juno — home dashboard hero; assessment + mentor behind See more.
 */
export function JunoShowcase() {
  return (
    <ProjectMediaReveal
      tone="juno"
      className="mx-auto w-[min(100%,46rem)] xl:w-[min(100%,50rem)]"
      primary={<JunoStill {...MEDIA.home} chrome priority />}
      secondary={<SecondaryScreens />}
    />
  );
}

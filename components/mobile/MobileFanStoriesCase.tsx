"use client";

import type { Project } from "@/content/types";
import { MobileProjectExplore } from "@/components/mobile/MobileProjectExplore";
import {
  PhoneStill,
  PhoneVideo,
} from "@/components/projects/fanstories/PhoneMedia";

const STILLS = {
  fitpulse: "/work/fanstories/stills/fitpulse_hq.png",
  food: "/work/fanstories/stills/food_hq.png",
  sports: "/work/fanstories/stills/sports_hq.png",
} as const;

function ProjectLinks({ project }: { project: Project }) {
  if (!project.actions?.length) return null;
  return (
    <div className="mt-8 flex flex-col gap-3">
      {project.actions.map((action) =>
        action.interactive ? (
          <a
            key={action.label}
            href={action.href}
            className="project-link text-[15px]"
            {...(action.href.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {action.label}
          </a>
        ) : (
          <span key={action.label} className="project-link-muted">
            {action.label}
          </span>
        ),
      )}
    </div>
  );
}

/**
 * Mobile-only FanStories case — compact preview + progressive media.
 */
export function MobileFanStoriesCase({ project }: { project: Project }) {
  return (
    <section
      aria-label={project.name}
      className="relative overflow-x-clip bg-ground px-5 pt-14 pb-16 text-ink"
    >
      <h3 className="m-0 text-[2.5rem] leading-[0.95] font-bold tracking-[-0.04em]">
        {project.name}
      </h3>
      <p className="mt-4 mb-0 max-w-[28ch] text-[1.375rem] leading-[1.25] font-medium tracking-[-0.02em]">
        {project.positioning}
      </p>

      <div className="mt-8 mx-auto w-[min(52%,11.5rem)]">
        <PhoneStill
          src={STILLS.sports}
          alt="FC Nordic 2026 fan recap — L'Ultras"
          sizes="42vw"
          priority
        />
      </div>

      <p className="mt-7 mb-0 max-w-[36ch] text-[17px] leading-[1.5] text-ink/75">
        {project.summary}
      </p>

      <MobileProjectExplore>
        <div className="flex flex-col gap-6">
          <div className="mx-auto w-[min(58%,13rem)]">
            <PhoneVideo
              src="/work/fanstories/videos/primary.mp4"
              poster={STILLS.fitpulse}
              alt="FanStories personalized recap sequence"
              className="w-full"
              sizes="58vw"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <PhoneStill
              src={STILLS.fitpulse}
              alt="FitPulse activity recap"
              sizes="42vw"
            />
            <PhoneStill
              src={STILLS.food}
              alt="FreshPlate favorite dish"
              sizes="42vw"
            />
          </div>
          <ProjectLinks project={project} />
        </div>
      </MobileProjectExplore>
    </section>
  );
}

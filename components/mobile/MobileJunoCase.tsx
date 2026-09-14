"use client";

import type { Project } from "@/content/types";
import { MobileProjectExplore } from "@/components/mobile/MobileProjectExplore";
import { JunoStill } from "@/components/projects/juno/JunoFrames";

const MEDIA = {
  home: {
    src: "/work/juno/stills/home_hq.png",
    width: 2612,
    height: 1488,
    alt: "Juno home — mentor chat and weekly to-dos",
  },
  insight: {
    src: "/work/juno/stills/assessment_hq.png",
    width: 2530,
    height: 1200,
    alt: "Juno assessment — what stands out about you",
  },
  mentorChat: {
    src: "/work/juno/stills/chat_hq.png",
    width: 1066,
    height: 922,
    alt: "Mentor conversation — preparing your next call",
  },
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
            className="project-link text-[15px] text-juno-ink"
            {...(action.href.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {action.label}
          </a>
        ) : (
          <span key={action.label} className="project-link-muted text-juno-meta">
            {action.label}
          </span>
        ),
      )}
    </div>
  );
}

/**
 * Mobile-only Juno case — hero still first, supporting screens on explore.
 */
export function MobileJunoCase({ project }: { project: Project }) {
  const shortCopy =
    project.summary.split(/\n\n+/)[0] ?? project.summary;

  return (
    <section
      aria-label={project.name}
      className="relative overflow-x-clip bg-juno-bg px-5 pt-14 pb-16 text-juno-ink"
    >
      <h3 className="m-0 font-serif text-[2.65rem] leading-[0.95] font-normal tracking-[-0.02em]">
        {project.name}
      </h3>
      <p className="mt-4 mb-0 max-w-[28ch] font-serif text-[1.4rem] leading-[1.25] font-normal tracking-[-0.015em]">
        {project.positioning}
      </p>

      <div className="mt-8 max-h-[58vh] overflow-hidden">
        <JunoStill {...MEDIA.home} chrome priority />
      </div>

      <p className="mt-7 mb-0 max-w-[36ch] text-[17px] leading-[1.5] text-juno-ink/75">
        {shortCopy}
      </p>

      <MobileProjectExplore tone="juno">
        <div className="flex flex-col gap-5">
          <div className="max-h-[48vh] overflow-hidden">
            <JunoStill {...MEDIA.insight} />
          </div>
          <div className="mx-auto w-[min(100%,18rem)] max-h-[48vh] overflow-hidden">
            <JunoStill {...MEDIA.mentorChat} />
          </div>
          <ProjectLinks project={project} />
        </div>
      </MobileProjectExplore>
    </section>
  );
}

"use client";

import type { Project } from "@/content/types";
import { FanStoriesShowcase } from "@/components/projects/fanstories/FanStoriesShowcase";
import { ProjectLink } from "@/components/projects/ProjectLink";
import { ProjectTextPanel } from "@/components/projects/ProjectTextPanel";

function ProjectLinks({ project }: { project: Project }) {
  if (!project.actions?.length) return null;
  return (
    <div className="mt-8 flex flex-col gap-3">
      {project.actions.slice(0, 2).map((action) =>
        action.interactive ? (
          <ProjectLink
            key={action.label}
            href={action.href}
            className="text-[15px]"
          >
            {action.label}
          </ProjectLink>
        ) : (
          <ProjectLink
            key={action.label}
            href={action.href}
            muted
          >
            {action.label}
          </ProjectLink>
        ),
      )}
    </div>
  );
}

/**
 * Mobile FanStories — copy plane + shared media reveal.
 */
export function MobileFanStoriesCase({ project }: { project: Project }) {
  return (
    <section
      aria-label={project.name}
      className="relative overflow-x-clip bg-juno-bg px-5 pt-14 pb-16 text-ink"
    >
      <div className="relative z-10">
        <ProjectTextPanel toneClass="bg-peach/48" variant="mobile" className="mr-8">
          <h3 className="m-0 text-[2.5rem] leading-[0.95] font-bold tracking-[-0.04em]">
            {project.name}
          </h3>
          <p className="mt-4 mb-0 max-w-[28ch] text-[1.375rem] leading-[1.25] font-medium tracking-[-0.02em]">
            {project.positioning}
          </p>
          <p className="mt-5 mb-0 max-w-[36ch] text-[17px] leading-[1.5] text-ink/75">
            {project.summary}
          </p>
          <ProjectLinks project={project} />
        </ProjectTextPanel>

        <div className="mt-16">
          <FanStoriesShowcase />
        </div>
      </div>
    </section>
  );
}

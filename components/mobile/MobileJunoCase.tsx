"use client";

import type { Project } from "@/content/types";
import { JunoShowcase } from "@/components/projects/juno/JunoShowcase";
import { ProjectLink } from "@/components/projects/ProjectLink";
import { ProjectSectionPlane } from "@/components/projects/ProjectSectionPlane";

function ProjectLinks({ project }: { project: Project }) {
  if (!project.actions?.length) return null;
  return (
    <div className="mt-8 flex flex-col gap-3">
      {project.actions.map((action) =>
        action.interactive ? (
          <ProjectLink
            key={action.label}
            href={action.href}
            className="text-[15px] text-juno-ink"
          >
            {action.label}
          </ProjectLink>
        ) : (
          <ProjectLink
            key={action.label}
            href={action.href}
            muted
            className="text-juno-meta"
          >
            {action.label}
          </ProjectLink>
        ),
      )}
    </div>
  );
}

/**
 * Mobile Juno — shared media reveal.
 */
export function MobileJunoCase({ project }: { project: Project }) {
  const shortCopy = project.summary.split(/\n\n+/)[0] ?? project.summary;

  return (
    <section
      aria-label={project.name}
      className="relative overflow-x-clip bg-juno-bg px-5 pt-14 pb-16 text-juno-ink"
    >
      <ProjectSectionPlane
        side="left"
        toneClass="bg-juno-coral/28"
        size="mobile"
      />

      <div className="relative z-10">
        <h3 className="m-0 font-serif text-[2.65rem] leading-[0.95] font-normal tracking-[-0.02em]">
          {project.name}
        </h3>
        <p className="mt-4 mb-0 max-w-[28ch] font-serif text-[1.4rem] leading-[1.25] font-normal tracking-[-0.015em]">
          {project.positioning}
        </p>
        <p className="mt-5 mb-0 max-w-[36ch] text-[17px] leading-[1.5] text-juno-ink/75">
          {shortCopy}
        </p>
        <ProjectLinks project={project} />

        <div className="mt-10">
          <JunoShowcase />
        </div>
      </div>
    </section>
  );
}

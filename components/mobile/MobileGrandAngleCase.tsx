"use client";

import type { Project } from "@/content/types";
import { GrandAngleShowcase } from "@/components/projects/grand-angle/GrandAngleShowcase";
import { ProjectSectionPlane } from "@/components/projects/ProjectSectionPlane";

function ProjectLinks({ project }: { project: Project }) {
  if (!project.actions?.length) return null;
  return (
    <div className="mt-8 flex flex-col gap-3">
      {project.actions.map((action) =>
        action.interactive ? (
          <a
            key={action.label}
            href={action.href}
            className="project-link text-[15px] text-studio-text"
            {...(action.href.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {action.label}
          </a>
        ) : (
          <span key={action.label} className="project-link-muted text-studio-meta">
            {action.label}
          </span>
        ),
      )}
    </div>
  );
}

/**
 * Mobile Grand Angle — dark section + shared media reveal.
 */
export function MobileGrandAngleCase({ project }: { project: Project }) {
  return (
    <section
      aria-label={project.name}
      className="relative overflow-x-clip bg-studio-bg px-5 pt-14 pb-16 text-studio-text"
    >
      <ProjectSectionPlane
        side="left"
        toneClass="bg-[rgba(24,120,184,0.42)]"
        size="mobile"
      />

      <div className="relative z-10">
        <h3 className="m-0 max-w-[14ch] text-[2.35rem] leading-[0.95] font-bold tracking-[-0.04em]">
          {project.name}
        </h3>
        <p className="mt-4 mb-0 max-w-[28ch] text-[1.375rem] leading-[1.25] font-medium tracking-[-0.02em] text-studio-text/90">
          {project.positioning}
        </p>
        <p className="mt-5 mb-0 max-w-[36ch] text-[17px] leading-[1.5] text-studio-body">
          {project.summary}
        </p>
        <ProjectLinks project={project} />

        <div className="mt-10">
          <GrandAngleShowcase />
        </div>
      </div>
    </section>
  );
}

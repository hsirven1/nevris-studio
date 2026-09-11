"use client";

import type { Project } from "@/content/types";
import { OpsAtmosphere } from "@/components/atmosphere/OpsAtmosphere";
import { ProjectTransition } from "@/components/motion/ProjectTransition";
import { OpsShowcase } from "@/components/projects/ops/OpsShowcase";

export function ProjectWorldOps({ project }: { project: Project }) {
  return (
    <ProjectTransition kind="frames">
      <section
        id={project.slug}
        aria-label={project.name}
        className="relative overflow-x-clip border-t border-ink/15 bg-ground pt-[56px] pb-[64px] pl-[var(--work-gutter)] pr-[clamp(1.5rem,calc(var(--work-gutter)*0.72),var(--work-gutter))] text-ink md:pt-[68px] md:pb-[80px]"
      >
        <OpsAtmosphere />

        <div className="relative z-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.48fr)] lg:gap-12 xl:gap-14">
          <div className="lg:sticky lg:top-[7rem] lg:max-w-[38rem]">
            <h3 className="type-ops-title m-0 font-bold">
              {project.name}
            </h3>

            <p className="project-statement project-copy-statement">
              {project.positioning}
            </p>

            <p className="project-description project-copy-description">
              {project.summary}
            </p>

            {project.actions && project.actions.length > 0 && (
              <div className="project-links project-copy-links">
                {project.actions.map((action) =>
                  action.interactive ? (
                    <a
                      key={action.label}
                      href={action.href}
                      className="project-link"
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
            )}
          </div>

          <div className="min-w-0">
            <OpsShowcase />
          </div>
        </div>
      </section>
    </ProjectTransition>
  );
}

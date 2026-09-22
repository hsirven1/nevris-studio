"use client";

import type { Project } from "@/content/types";
import { MobileRookCase } from "@/components/mobile/MobileRookCase";
import { ProjectSectionPlane } from "@/components/projects/ProjectSectionPlane";
import { ProjectTransition } from "@/components/motion/ProjectTransition";
import { OpsShowcase } from "@/components/projects/ops/OpsShowcase";

export function ProjectWorldOps({ project }: { project: Project }) {
  return (
    <div id={project.slug}>
      <div className="md:hidden">
        <MobileRookCase project={project} />
      </div>

      <div className="hidden md:block">
        <ProjectTransition kind="frames">
          <section
            aria-label={project.name}
            className="relative overflow-x-clip bg-studio-bg text-studio-text"
          >
            <ProjectSectionPlane
              side="left"
              toneClass="bg-[rgba(24,120,184,0.42)]"
              className="md:w-[min(50%,38rem)] lg:w-[min(48%,40rem)]"
            />

            <div className="relative z-10 grid grid-cols-1 items-start gap-10 pt-[56px] pb-[64px] pl-[var(--work-gutter)] pr-[clamp(1.5rem,calc(var(--work-gutter)*0.72),var(--work-gutter))] md:pt-[68px] md:pb-[80px] lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.48fr)] lg:gap-12 xl:gap-14">
              <div className="lg:sticky lg:top-[7rem] lg:max-w-[36rem]">
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
      </div>
    </div>
  );
}

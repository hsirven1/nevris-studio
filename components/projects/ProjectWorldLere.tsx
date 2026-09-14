"use client";

import type { Project } from "@/content/types";
import { LereAtmosphere } from "@/components/atmosphere/LereAtmosphere";
import { MobileGrandAngleCase } from "@/components/mobile/MobileGrandAngleCase";
import { GrandAngleShowcase } from "@/components/projects/grand-angle/GrandAngleShowcase";
import { ProjectTransition } from "@/components/motion/ProjectTransition";

export function ProjectWorldLere({ project }: { project: Project }) {
  return (
    <div id={project.slug}>
      <div className="md:hidden">
        <MobileGrandAngleCase project={project} />
      </div>

      <div className="hidden md:block">
        <ProjectTransition kind="crop">
          <section
            aria-label={project.name}
            className="relative overflow-x-clip bg-lere-bg text-lere-text"
          >
            <LereAtmosphere />

            <div className="relative z-10 pt-[56px] pb-[64px] pl-[var(--work-gutter)] pr-[clamp(1.5rem,calc(var(--work-gutter)*0.72),var(--work-gutter))] md:pb-[80px]">
              <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.28fr)] lg:gap-14 xl:gap-16">
                <div className="lg:sticky lg:top-[7rem] lg:max-w-[38rem]">
                  <h3 className="type-lere-title m-0 font-bold">
                    {project.name}
                  </h3>

                  <p className="project-statement project-copy-statement">
                    {project.positioning}
                  </p>

                  <p className="project-description project-copy-description">
                    {project.summary}
                  </p>

                  <div className="project-links project-copy-links">
                    {project.actions?.map((action) =>
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
                </div>

                <div className="min-w-0 lg:pt-1">
                  <GrandAngleShowcase />
                </div>
              </div>
            </div>
          </section>
        </ProjectTransition>
      </div>
    </div>
  );
}

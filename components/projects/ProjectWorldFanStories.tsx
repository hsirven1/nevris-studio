"use client";

import type { Project } from "@/content/types";
import { MobileFanStoriesCase } from "@/components/mobile/MobileFanStoriesCase";
import { FanStoriesShowcase } from "@/components/projects/fanstories/FanStoriesShowcase";
import { ProjectLink } from "@/components/projects/ProjectLink";
import { ProjectSectionPlane } from "@/components/projects/ProjectSectionPlane";
import { ProjectTransition } from "@/components/motion/ProjectTransition";

export function ProjectWorldFanStories({ project }: { project: Project }) {
  return (
    <div id={project.slug}>
      <div className="md:hidden">
        <MobileFanStoriesCase project={project} />
      </div>

      <div className="hidden md:block">
        <ProjectTransition kind="frames" className="relative">
          <section
            aria-label={project.name}
            className="relative overflow-x-clip bg-ground text-ink"
          >
            <ProjectSectionPlane side="left" toneClass="bg-peach/48" />

            <div className="relative z-10 grid grid-cols-1 items-center gap-10 pt-[56px] pb-[72px] pl-[var(--work-gutter)] pr-[clamp(1.5rem,calc(var(--work-gutter)*0.72),var(--work-gutter))] md:pb-[88px] lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.38fr)] lg:gap-12 xl:gap-16">
              <div className="max-w-[34rem] lg:sticky lg:top-[7rem]">
                <h3 className="type-wilder-title m-0 font-bold">
                  {project.name}
                </h3>

                <p className="project-statement project-copy-statement">
                  {project.positioning}
                </p>

                <p className="project-description project-copy-description">
                  {project.summary}
                </p>

                <div className="project-links project-copy-links">
                  {project.actions?.slice(0, 2).map((action) =>
                    action.interactive ? (
                      <ProjectLink key={action.label} href={action.href}>
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
              </div>

              <div className="flex min-w-0 justify-center">
                <FanStoriesShowcase />
              </div>
            </div>
          </section>
        </ProjectTransition>
      </div>
    </div>
  );
}

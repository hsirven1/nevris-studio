"use client";

import type { Project } from "@/content/types";
import { FanStoriesAtmosphere } from "@/components/atmosphere/FanStoriesAtmosphere";
import { MobileFanStoriesCase } from "@/components/mobile/MobileFanStoriesCase";
import { FanStoriesShowcase } from "@/components/projects/fanstories/FanStoriesShowcase";
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
            className="relative overflow-x-clip bg-ground pt-[56px] pb-[72px] pl-[var(--work-gutter)] pr-[clamp(1.5rem,calc(var(--work-gutter)*0.72),var(--work-gutter))] text-ink md:pb-[88px]"
          >
            <FanStoriesAtmosphere />

            <div className="relative z-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.35fr)] lg:gap-12 xl:gap-16">
              <div className="lg:sticky lg:top-[7rem] lg:max-w-[38rem]">
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

              <div className="min-w-0 lg:pt-2">
                <FanStoriesShowcase />
              </div>
            </div>
          </section>
        </ProjectTransition>
      </div>
    </div>
  );
}

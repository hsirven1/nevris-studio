"use client";

import type { Project } from "@/content/types";
import { MobileJunoCase } from "@/components/mobile/MobileJunoCase";
import { JunoShowcase } from "@/components/projects/juno/JunoShowcase";
import { ProjectSectionPlane } from "@/components/projects/ProjectSectionPlane";
import { ProjectTransition } from "@/components/motion/ProjectTransition";

export function ProjectWorldJuno({ project }: { project: Project }) {
  const paragraphs = project.summary.split(/\n\n+/).filter(Boolean);

  return (
    <div id={project.slug}>
      <div className="md:hidden">
        <MobileJunoCase project={project} />
      </div>

      <div className="hidden md:block">
        <ProjectTransition kind="wipe">
          <section
            aria-label={project.name}
            className="relative overflow-x-clip bg-juno-bg text-juno-ink"
          >
            <ProjectSectionPlane side="left" toneClass="bg-juno-coral/28" />

            <div className="relative z-10 grid grid-cols-1 items-start gap-10 pt-[64px] pb-[72px] pl-[var(--work-gutter)] pr-[clamp(1.5rem,calc(var(--work-gutter)*0.72),var(--work-gutter))] md:pt-[76px] md:pb-[88px] lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.42fr)] lg:gap-12 xl:gap-16">
              <div className="lg:sticky lg:top-[7rem] lg:max-w-[38rem]">
                <h3 className="type-juno-title m-0 font-serif font-normal tracking-[-0.02em]">
                  {project.name}
                </h3>

                <p className="project-statement project-copy-statement font-serif font-normal">
                  {project.positioning}
                </p>

                {paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="project-description project-copy-description"
                  >
                    {paragraph}
                  </p>
                ))}

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

              <div className="min-w-0 lg:pt-1">
                <JunoShowcase />
              </div>
            </div>
          </section>
        </ProjectTransition>
      </div>
    </div>
  );
}

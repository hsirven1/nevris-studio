"use client";

import type { Project } from "@/content/types";
import { JunoAtmosphere } from "@/components/atmosphere/JunoAtmosphere";
import { JunoShowcase } from "@/components/projects/juno/JunoShowcase";
import { ProjectTransition } from "@/components/motion/ProjectTransition";

export function ProjectWorldJuno({ project }: { project: Project }) {
  const paragraphs = project.summary.split(/\n\n+/).filter(Boolean);

  return (
    <ProjectTransition kind="wipe">
      <section
        id={project.slug}
        aria-label={project.name}
        className="relative overflow-x-clip bg-juno-bg pt-[64px] pb-[72px] pl-[var(--work-gutter)] pr-[clamp(1.5rem,calc(var(--work-gutter)*0.72),var(--work-gutter))] text-juno-ink md:pt-[76px] md:pb-[88px]"
      >
        <JunoAtmosphere />

        <div className="relative z-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.42fr)] lg:gap-12 xl:gap-16">
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
  );
}

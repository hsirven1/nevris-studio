import type { Project } from "@/content/types";

/**
 * Scalable Working Index rows for non-featured projects.
 * Add entries in content/projects.ts with featured: false and world: "index".
 */
export function ProjectIndexEntry({ project }: { project: Project }) {
  return (
    <article className="gutter-x border-b border-rule py-[18px] transition-colors hover:bg-accent-cool-pale">
      <div className="grid grid-cols-1 items-center gap-2 lg:grid-cols-[1fr_220px_180px] lg:gap-0">
        <div className="type-lab-row font-semibold">{project.name}</div>
        <div className="hidden text-[15px] text-ink-60 lg:block">
          {project.summary}
        </div>
        <div className="font-label text-[11px] tracking-[0.1em] text-ink-45 uppercase lg:text-right">
          {project.kind}
        </div>
        <p className="col-span-full text-[15px] leading-[1.5] text-ink-60 lg:hidden">
          {project.summary}
        </p>
      </div>
    </article>
  );
}

export function WorkingIndex({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  return (
    <section aria-label="Working index" className="border-t border-ink bg-ground">
      {projects.map((project) => (
        <ProjectIndexEntry key={project.id} project={project} />
      ))}
    </section>
  );
}

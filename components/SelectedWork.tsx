import { featuredProjects, indexProjects } from "@/content/projects";
import { ProjectWorldFanStories } from "@/components/projects/ProjectWorldFanStories";
import { ProjectWorldJuno } from "@/components/projects/ProjectWorldJuno";
import { ProjectWorldLere } from "@/components/projects/ProjectWorldLere";
import { ProjectWorldOps } from "@/components/projects/ProjectWorldOps";
import { WorkingIndex } from "@/components/projects/WorkingIndex";
import type { Project } from "@/content/types";

function FeaturedWorld({ project }: { project: Project }) {
  switch (project.world) {
    case "fanstories":
      return <ProjectWorldFanStories project={project} />;
    case "juno":
      return <ProjectWorldJuno project={project} />;
    case "lere":
      return <ProjectWorldLere project={project} />;
    case "ops":
      return <ProjectWorldOps project={project} />;
    default:
      return null;
  }
}

export function SelectedWork() {
  const featured = featuredProjects.filter((p) => p.world !== "index");

  return (
    <>
      {featured.map((project) => (
        <FeaturedWorld key={project.id} project={project} />
      ))}
      <WorkingIndex projects={indexProjects} />
    </>
  );
}

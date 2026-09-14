"use client";

import type { Project } from "@/content/types";
import { MobileProjectExplore } from "@/components/mobile/MobileProjectExplore";
import { MobileStill } from "@/components/mobile/MobileVisual";
import { OpsWorkflowVideo } from "@/components/projects/ops/OpsWorkflowVideo";
import { ProductImage } from "@/components/projects/media/ProductImage";

const MEDIA = {
  dashboard: "/work/ai-executive-assistant/stills/dashboard.png",
  actions: "/work/ai-executive-assistant/stills/actions.png",
  actionDetail: "/work/ai-executive-assistant/stills/action-detail.png",
} as const;

function ProjectLinks({ project }: { project: Project }) {
  if (!project.actions?.length) return null;
  return (
    <div className="mt-8 flex flex-col gap-3">
      {project.actions.map((action) =>
        action.interactive ? (
          <a
            key={action.label}
            href={action.href}
            className="project-link text-[15px]"
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
  );
}

/**
 * Mobile-only Rook AI case — dashboard preview, video + actions on explore.
 */
export function MobileRookCase({ project }: { project: Project }) {
  return (
    <section
      aria-label={project.name}
      className="relative overflow-x-clip border-t border-ink/15 bg-ground px-5 pt-14 pb-16 text-ink"
    >
      <h3 className="m-0 text-[2.5rem] leading-[0.95] font-bold tracking-[-0.035em]">
        {project.name}
      </h3>
      <p className="mt-4 mb-0 max-w-[28ch] text-[1.375rem] leading-[1.25] font-medium tracking-[-0.02em]">
        {project.positioning}
      </p>

      <div className="mt-8 overflow-hidden rounded-[0.85rem] bg-[#f4f3f0] shadow-[0_14px_36px_-16px_rgba(17,17,16,0.28)] ring-1 ring-ink/10">
        <div className="relative max-h-[58vh] w-full overflow-hidden">
          <ProductImage
            src={MEDIA.dashboard}
            alt="Rook AI executive dashboard"
            width={2906}
            height={1628}
            priority
            className="block h-auto max-h-[58vh] w-full object-contain object-top"
          />
        </div>
      </div>

      <p className="mt-7 mb-0 max-w-[36ch] text-[17px] leading-[1.5] text-ink/75">
        {project.summary}
      </p>

      <MobileProjectExplore>
        <div className="flex flex-col gap-6">
          <MobileStill
            src={MEDIA.actions}
            alt="Rook AI Actions queue"
            width={1024}
            height={551}
            maxHeightClass="max-h-[48vh]"
          />
          <MobileStill
            src={MEDIA.actionDetail}
            alt="Rook AI action detail"
            width={1024}
            height={525}
            maxHeightClass="max-h-[48vh]"
          />
          <div className="w-full">
            <OpsWorkflowVideo />
          </div>
          <ProjectLinks project={project} />
        </div>
      </MobileProjectExplore>
    </section>
  );
}

"use client";

import { OpsScreen } from "@/components/projects/ops/OpsScreen";
import { OpsWorkflowVideo } from "@/components/projects/ops/OpsWorkflowVideo";
import { ProjectMediaReveal } from "@/components/projects/ProjectMediaReveal";

const MEDIA = {
  dashboard: "/work/ai-executive-assistant/stills/dashboard.png",
  actions: "/work/ai-executive-assistant/stills/actions.png",
  actionDetail: "/work/ai-executive-assistant/stills/action-detail.png",
} as const;

function SecondaryScreens() {
  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      <OpsScreen
        src={MEDIA.dashboard}
        alt="Rook AI executive dashboard — milestones, activity, and portfolio timeline"
        sizes="(max-width: 1024px) 92vw, min(1024px, 900px)"
        className="w-full max-w-[1024px]"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        <OpsScreen
          src={MEDIA.actions}
          alt="Rook AI Actions queue"
          sizes="(max-width: 640px) 92vw, 480px"
          aspectClass="aspect-[1024/551]"
          className="w-full"
        />
        <OpsScreen
          src={MEDIA.actionDetail}
          alt="Rook AI action detail"
          sizes="(max-width: 640px) 92vw, 480px"
          aspectClass="aspect-[1024/525]"
          className="w-full"
        />
      </div>
    </div>
  );
}

/**
 * Rook — workflow video hero; supporting screens behind See more.
 */
export function OpsShowcase() {
  return (
    <ProjectMediaReveal
      tone="dark"
      primary={<OpsWorkflowVideo />}
      secondary={<SecondaryScreens />}
    />
  );
}

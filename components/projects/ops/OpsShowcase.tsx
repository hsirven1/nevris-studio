import { OpsScreen } from "@/components/projects/ops/OpsScreen";
import { OpsWorkflowVideo } from "@/components/projects/ops/OpsWorkflowVideo";

const MEDIA = {
  dashboard: "/work/ai-executive-assistant/stills/dashboard.png",
} as const;

/**
 * Right-column media: Actions workflow video first, then dashboard overview.
 */
export function OpsShowcase() {
  return (
    <div className="relative flex flex-col gap-5 sm:gap-6">
      <div
        className="pointer-events-none absolute top-[-4%] right-[-2%] h-[48%] w-[62%] rounded-[40%] bg-[radial-gradient(ellipse_at_center,rgba(148,168,186,0.2),transparent_72%)] blur-3xl max-md:opacity-60"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-[8%] left-[6%] h-[36%] w-[52%] rounded-[40%] bg-[radial-gradient(ellipse_at_center,rgba(201,182,247,0.14),transparent_70%)] blur-3xl max-md:hidden"
        aria-hidden
      />

      <p className="relative z-[1] m-0 max-w-[36rem] text-[15px] leading-[1.45] text-ink-60 md:text-[16px]">
        Rook turns operational signals into reviewed, actionable next steps.
      </p>

      <div className="relative z-[1]">
        <OpsWorkflowVideo />
      </div>

      <div className="relative z-[1]">
        <OpsScreen
          src={MEDIA.dashboard}
          alt="Rook AI executive dashboard — milestones, activity, and portfolio timeline"
          sizes="(max-width: 1024px) 92vw, min(1024px, 900px)"
          priority
          className="w-full max-w-[1024px]"
        />
      </div>
    </div>
  );
}

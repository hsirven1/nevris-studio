import { JunoStill } from "@/components/projects/juno/JunoFrames";

/** High-res stills — native pixel ratios, never cropped. */
const MEDIA = {
  home: {
    src: "/work/juno/stills/home_hq.png",
    width: 2612,
    height: 1488,
    alt: "Juno home — mentor chat and weekly to-dos",
  },
  mentorChat: {
    src: "/work/juno/stills/chat_hq.png",
    width: 1066,
    height: 922,
    alt: "Mentor conversation — preparing your next call",
  },
  insight: {
    src: "/work/juno/stills/assessment_hq.png",
    width: 2530,
    height: 1200,
    alt: "Juno assessment — what stands out about you",
  },
} as const;

/**
 * Editorial product collage:
 * large hero on top; two larger supporting cards overlap in front with subtle tilt.
 */
export function JunoShowcase() {
  return (
    <div className="relative">
      {/* Mobile / tablet — stacked, full frames, no tilt or overlap */}
      <div className="flex flex-col gap-5 lg:hidden">
        <JunoStill {...MEDIA.home} chrome priority />
        <JunoStill {...MEDIA.insight} />
        <JunoStill
          {...MEDIA.mentorChat}
          className="mx-auto w-[min(100%,24rem)]"
        />
      </div>

      {/* Desktop — hero + larger supports overlapping in front */}
      <div className="relative hidden overflow-visible lg:block">
        <div
          className="pointer-events-none absolute top-[4%] left-[8%] h-[52%] w-[72%] rounded-[45%] bg-[radial-gradient(ellipse_at_center,rgba(232,93,76,0.15),transparent_70%)] blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute right-[4%] bottom-[8%] h-[42%] w-[48%] rounded-[40%] bg-[radial-gradient(ellipse_at_center,rgba(168,196,214,0.26),transparent_72%)] blur-3xl"
          aria-hidden
        />

        <div className="relative mx-auto w-[min(100%,50rem)] overflow-visible pb-3 xl:w-[min(100%,54rem)]">
          {/* 1. Hero — primary focus, slightly inset so supports can read larger */}
          <div className="relative z-10 mx-auto w-[86%] xl:w-[84%]">
            <JunoStill {...MEDIA.home} chrome priority />
          </div>

          {/* 2. Supports — larger, in front, moderate overlap + subtle opposite tilt */}
          <div className="relative z-20 -mt-8 flex items-start justify-between gap-4 px-0.5 xl:-mt-10 xl:gap-5">
            <div className="w-[52%] origin-top -rotate-[5deg] xl:w-[51%]">
              <JunoStill {...MEDIA.insight} />
            </div>
            <div className="w-[44%] origin-top rotate-[5deg] xl:w-[43%]">
              <JunoStill {...MEDIA.mentorChat} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { ChapterBanner } from "@/components/ChapterBanner";
import { site } from "@/content/site";

type MarkProps = { className?: string };

/** Crop marks around a solid point — framing the problem */
function MarkDirection({ className = "" }: MarkProps) {
  return (
    <svg viewBox="0 0 96 96" fill="none" className={className} aria-hidden>
      <path
        d="M8 32V8H32M64 8H88V32M88 64V88H64M32 88H8V64"
        stroke="currentColor"
        strokeWidth="9"
        strokeLinecap="square"
      />
      <circle cx="48" cy="48" r="11" fill="currentColor" />
    </svg>
  );
}

/** One stem splitting in two — a single, deliberate branch */
function MarkBranch({ className = "" }: MarkProps) {
  return (
    <svg viewBox="0 0 96 96" fill="none" className={className} aria-hidden>
      <path
        d="M48 90V56M48 56C48 40 36 32 20 24M48 56C48 40 60 32 76 24"
        stroke="currentColor"
        strokeWidth="9"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <circle cx="17" cy="19" r="13" fill="currentColor" />
      <circle cx="79" cy="19" r="13" fill="currentColor" />
    </svg>
  );
}

/** Forward wedge with trailing bars — motion, not an arrow icon */
function MarkMotion({ className = "" }: MarkProps) {
  return (
    <svg viewBox="0 0 96 96" fill="none" className={className} aria-hidden>
      <path d="M44 14L90 48L44 82V14Z" fill="currentColor" />
      <path
        d="M6 30H30M14 48H32M6 66H30"
        stroke="currentColor"
        strokeWidth="9"
        strokeLinecap="square"
      />
    </svg>
  );
}

const cards = {
  shape: { Mark: MarkDirection, color: "text-peach" },
  ai: { Mark: MarkBranch, color: "text-sky" },
  speed: { Mark: MarkMotion, color: "text-juno-coral" },
} as const;

/**
 * Chapter title + what the studio does — three editorial poster cards.
 */
export function HowWeWork() {
  const { howWeWork } = site;

  return (
    <section
      id="studio"
      aria-label={howWeWork.label}
      className="relative z-[5] overflow-x-clip bg-ground text-ink"
    >
      <ChapterBanner title={howWeWork.label} />
      <div
        className="h-5 bg-ground md:h-[clamp(1.5rem,4vh,2.5rem)]"
        aria-hidden
      />

      <div className="gutter-x relative z-10 pb-14 md:pb-[clamp(4rem,10vh,6rem)]">
        <h3 className="font-display m-0 text-[1.35rem] leading-[1.2] font-bold tracking-[-0.025em] text-ink md:text-[clamp(1.45rem,2.4vw,1.85rem)] md:leading-[1.15]">
          {howWeWork.headline}
        </h3>

        <ul className="mt-8 mb-0 grid list-none grid-cols-1 gap-4 p-0 md:mt-12 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6">
          {howWeWork.principles.map((principle) => {
            const card = cards[principle.id as keyof typeof cards];
            const Mark = card?.Mark;

            return (
              <li
                key={principle.id}
                className="flex min-w-0 flex-col rounded-[0.65rem] border-[1.75px] border-ink bg-transparent p-6 pb-8 md:p-8 md:pb-12 lg:p-9 lg:pb-14"
              >
                {Mark ? (
                  <Mark
                    className={`size-[5rem] shrink-0 md:size-[7rem] lg:size-[7.5rem] ${card.color}`}
                  />
                ) : null}

                <div className="mt-9 md:mt-20 lg:mt-24">
                  <h4 className="font-display m-0 max-w-[12ch] text-[2rem] leading-[0.98] font-extrabold tracking-[-0.04em] text-ink md:text-[2.25rem] lg:text-[clamp(2.1rem,2.6vw,2.6rem)]">
                    {principle.title}
                  </h4>
                  <p className="mt-4 mb-0 max-w-[30ch] text-[18px] leading-[1.5] text-ink/75 md:mt-5 md:text-[19px]">
                    {principle.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

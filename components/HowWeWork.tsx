"use client";

import { ChapterBanner } from "@/components/ChapterBanner";
import { site } from "@/content/site";

type IconProps = { className?: string };

/** Framing crosshair — product direction / planning */
function IconShape({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden
    >
      <rect
        x="6.25"
        y="6.25"
        width="19.5"
        height="19.5"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.85"
      />
      <path
        d="M16 3.75V11M16 21V28.25M3.75 16H11M21 16H28.25"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Branching nodes + spark — AI as structure, not mascot */
function IconAi({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden
    >
      <circle cx="16" cy="8.5" r="2.5" stroke="currentColor" strokeWidth="1.85" />
      <circle cx="7.5" cy="22.5" r="2.5" stroke="currentColor" strokeWidth="1.85" />
      <circle cx="24.5" cy="22.5" r="2.5" stroke="currentColor" strokeWidth="1.85" />
      <path
        d="M16 11V16.25M16 16.25L9.15 20.35M16 16.25L22.85 20.35"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.25 6.5V11M24 8.75H28.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Forward chevrons + motion trail — speed without hype */
function IconSpeed({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M4 11H11.25M4 16H8.25M4 21H11.25"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
      />
      <path
        d="M13 8.5L22.25 16L13 23.5"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.25 8.5L28.5 16L19.25 23.5"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const icons = {
  shape: IconShape,
  ai: IconAi,
  speed: IconSpeed,
} as const;

/** Accent only on graphic details — yellow / blue / coral */
const accents = {
  shape: {
    icon: "text-peach",
    frame: "border-peach",
    rule: "bg-peach",
  },
  ai: {
    icon: "text-slate",
    frame: "border-slate",
    rule: "bg-slate",
  },
  speed: {
    icon: "text-juno-coral",
    frame: "border-juno-coral",
    rule: "bg-juno-coral",
  },
} as const;

/**
 * Chapter title + studio strengths — editorial bordered cards.
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
        <h3 className="font-display m-0 max-w-none text-[1.35rem] leading-[1.2] font-bold tracking-[-0.025em] text-ink whitespace-nowrap md:text-[clamp(1.45rem,2.4vw,1.85rem)] md:leading-[1.15]">
          {howWeWork.headline}
        </h3>

        <ul className="mt-10 mb-0 grid list-none grid-cols-1 gap-5 p-0 md:mt-14 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-7">
          {howWeWork.principles.map((principle) => {
            const Icon = icons[principle.id as keyof typeof icons];
            const accent = accents[principle.id as keyof typeof accents];

            return (
              <li
                key={principle.id}
                className="relative flex min-w-0 flex-col border-[1.75px] border-ink bg-transparent p-7 md:p-8 lg:p-9 rounded-[0.65rem]"
              >
                <span
                  className={`absolute top-0 left-7 right-7 h-[2.5px] md:left-8 md:right-8 lg:left-9 lg:right-9 ${accent?.rule ?? "bg-ink"}`}
                  aria-hidden
                />

                <div
                  className={`mb-6 flex size-[4.5rem] items-center justify-center border-[1.75px] md:mb-7 md:size-[5rem] ${accent?.frame ?? "border-ink"}`}
                >
                  {Icon ? (
                    <Icon
                      className={`size-11 md:size-[3.25rem] ${accent?.icon ?? "text-ink"}`}
                    />
                  ) : null}
                </div>

                <h4 className="m-0 text-[1.35rem] leading-[1.12] font-extrabold tracking-[-0.025em] text-ink md:text-[1.5rem]">
                  {principle.title}
                </h4>

                <span
                  className={`mt-3.5 mb-0 block h-[2.5px] w-10 ${accent?.rule ?? "bg-ink"}`}
                  aria-hidden
                />

                <p className="mt-4 mb-0 text-[17px] leading-[1.55] text-ink/75 md:mt-5 md:text-[18px] md:leading-[1.58]">
                  {principle.body}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

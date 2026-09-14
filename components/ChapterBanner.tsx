"use client";

import {
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 12"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M2 2.5 L10 9.5 L18 2.5"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ScrollCue({ reduce }: { reduce: boolean | null }) {
  if (reduce) {
    return (
      <div
        className="pointer-events-none flex flex-col items-center gap-[1px] text-lavender/70"
        aria-hidden
      >
        <ChevronDown className="h-3.5 w-5 opacity-90" />
        <ChevronDown className="h-3.5 w-5 opacity-70" />
        <ChevronDown className="h-3.5 w-5 opacity-50" />
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none flex flex-col items-center gap-[1px] text-lavender"
      aria-hidden
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block"
          animate={{
            y: [0, 4, 0],
            opacity: [0.45, 0.78, 0.45],
          }}
          transition={{
            duration: 2.1,
            ease: "easeInOut",
            repeat: Infinity,
            delay: i * 0.2,
          }}
        >
          <ChevronDown className="h-3.5 w-5" />
        </motion.span>
      ))}
    </div>
  );
}

type ChapterBannerProps = {
  title: string;
  /** Show lavender scroll chevrons beside the title. Default true. */
  showCue?: boolean;
};

/**
 * Full-bleed black chapter band — shared by Discover our work / How we work.
 */
export function ChapterBanner({ title, showCue = true }: ChapterBannerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const play = Boolean(reduce) || inView;

  return (
    <div ref={ref} className="relative overflow-hidden bg-ink text-ground">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute bottom-[-35%] left-[-4%] h-[145%] w-px origin-bottom-left -rotate-[28deg] bg-lavender/30 md:left-[-2%] md:h-[160%] md:bg-lavender/25" />
        <div className="absolute top-[-40%] right-[6%] h-[175%] w-px origin-top-right -rotate-[33deg] bg-ground/20 md:right-[8%] md:bg-ground/18" />
      </div>

      <div className="gutter-x relative z-10 py-8 md:py-[clamp(2.75rem,6vh,4rem)]">
        <div className="flex items-center gap-5 pl-1 md:gap-10 md:pl-5 lg:gap-12">
          <motion.h2
            className="type-work-intro m-0 max-w-[16ch] font-bold tracking-[-0.04em] text-ground"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.65, ease }}
          >
            {title}
          </motion.h2>

          {showCue ? (
            <motion.div
              className="mt-1 shrink-0 self-center md:mt-2"
              initial={reduce ? false : { opacity: 0 }}
              animate={play ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.28, ease }}
            >
              <ScrollCue reduce={reduce} />
            </motion.div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

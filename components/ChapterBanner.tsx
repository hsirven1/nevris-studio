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
        className="pointer-events-none flex h-[0.95em] flex-col items-center justify-center gap-0 text-cyan/85 md:h-auto md:gap-[1px]"
        aria-hidden
      >
        <ChevronDown className="h-[0.28em] w-[0.72em] opacity-95 md:h-3.5 md:w-5 md:opacity-90" />
        <ChevronDown className="h-[0.28em] w-[0.72em] opacity-75 md:h-3.5 md:w-5 md:opacity-70" />
        <ChevronDown className="h-[0.28em] w-[0.72em] opacity-55 md:h-3.5 md:w-5 md:opacity-50" />
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none flex h-[0.95em] flex-col items-center justify-center gap-0 text-cyan md:h-auto md:gap-[1px]"
      aria-hidden
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block leading-none"
          animate={{
            y: [0, 2.5, 0],
            opacity: [0.45, 0.9, 0.45],
          }}
          transition={{
            duration: 2.1,
            ease: "easeInOut",
            repeat: Infinity,
            delay: i * 0.2,
          }}
        >
          <ChevronDown className="h-[0.28em] w-[0.72em] md:h-3.5 md:w-5" />
        </motion.span>
      ))}
    </div>
  );
}

type ChapterBannerProps = {
  title: string;
  /** Show accent scroll chevrons beside the title. Default true. */
  showCue?: boolean;
};

/**
 * Editorial chapter title — tight ink slab under the type, not a padded box.
 * Chevrons are capped to text height on mobile so they don’t inflate the strip.
 */
export function ChapterBanner({ title, showCue = true }: ChapterBannerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const play = Boolean(reduce) || inView;

  return (
    <div ref={ref} className="relative bg-ground">
      <div className="gutter-x relative z-10 py-7 md:py-[clamp(2.25rem,5.5vh,3.75rem)]">
        <motion.div
          className="inline-flex max-w-full items-center gap-2 bg-ink py-[0.02em] pr-[0.36em] pl-[0.18em] md:items-end md:gap-3.5 md:pt-[0.03em] md:pr-[0.55em] md:pb-[0.18em] md:pl-[0.24em]"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.65, ease }}
        >
          <h2 className="type-work-intro m-0 leading-[0.88] text-ground md:leading-[0.9]">
            {title}
          </h2>

          {showCue ? (
            <motion.div
              className="shrink-0 self-center md:mb-[0.08em] md:self-end"
              initial={reduce ? false : { opacity: 0 }}
              animate={play ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease }}
            >
              <ScrollCue reduce={reduce} />
            </motion.div>
          ) : null}
        </motion.div>
      </div>
    </div>
  );
}

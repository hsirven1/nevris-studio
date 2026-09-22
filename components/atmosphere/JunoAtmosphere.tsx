"use client";

import { AmbientDrift } from "@/components/motion/ambient";
import { useProjectProgress } from "@/components/motion/ProjectTransition";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";

/**
 * Juno — Nevris brand planes (clay / blue / yellow) as quiet square blocks.
 */
export function JunoAtmosphere() {
  const reduce = useReducedMotion();
  const progress = useProjectProgress();
  const fallback = useMotionValue(1);
  const p = progress ?? fallback;

  const planeX = useTransform(p, [0, 1], ["-6%", "5%"]);
  const warmX = useTransform(p, [0, 1], ["10%", "-3%"]);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <AmbientDrift
        amplitude={12}
        duration={28}
        className="absolute -top-[18%] -left-[12%] h-[72%] w-[50%] max-md:h-[58%] max-md:w-[62%]"
      >
        <motion.div
          className="h-full w-full rounded-[1.75rem] bg-[rgba(217,92,74,0.48)] max-md:opacity-55"
          style={reduce ? undefined : { x: planeX }}
        />
      </AmbientDrift>

      <AmbientDrift
        amplitude={10}
        duration={26}
        delay={1.2}
        className="absolute top-[8%] right-[-12%] h-[56%] w-[44%] max-md:hidden"
      >
        <motion.div
          className="h-full w-full rounded-[1.75rem] bg-[rgba(109,140,166,0.45)]"
          style={reduce ? undefined : { x: warmX }}
        />
      </AmbientDrift>

      <AmbientDrift
        amplitude={8}
        duration={32}
        delay={0.6}
        className="absolute bottom-[-8%] left-[28%] h-[40%] w-[36%] max-md:hidden"
      >
        <div className="h-full w-full rounded-[1.75rem] bg-[rgba(244,196,106,0.48)]" />
      </AmbientDrift>

      <AmbientDrift amplitude={6} duration={34} className="absolute inset-0">
        <svg
          className="h-full w-full text-juno-ink"
          viewBox="0 0 1440 720"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M-20 520 C 180 440, 320 600, 520 540 S 860 400, 1080 480 S 1360 600, 1520 520"
            stroke="currentColor"
            strokeOpacity="0.1"
            strokeWidth="1.3"
          />
        </svg>
      </AmbientDrift>
    </div>
  );
}

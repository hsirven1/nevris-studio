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
 * FanStories — peach + light panel planes as square, axis-aligned blocks.
 */
export function FanStoriesAtmosphere() {
  const reduce = useReducedMotion();
  const progress = useProjectProgress();
  const fallback = useMotionValue(1);
  const p = progress ?? fallback;

  const planeX = useTransform(p, [0, 1], ["4%", "-3%"]);
  const coolX = useTransform(p, [0, 1], ["-4%", "3%"]);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {/* Pale brand mass — frames the product column */}
      <AmbientDrift
        amplitude={12}
        duration={26}
        className="absolute top-[6%] right-[-10%] h-[68%] w-[52%] max-md:right-[-16%] max-md:h-[58%] max-md:w-[64%]"
      >
        <motion.div
          className="h-full w-full rounded-none bg-[rgba(255,192,103,0.28)] max-md:opacity-70"
          style={reduce ? undefined : { x: planeX }}
        />
      </AmbientDrift>

      {/* Light neutral plane — softens the text side */}
      <AmbientDrift
        amplitude={9}
        duration={30}
        delay={1.1}
        className="absolute top-[22%] left-[-8%] h-[44%] w-[36%] max-md:hidden"
      >
        <motion.div
          className="h-full w-full rounded-none bg-[rgba(255,255,255,0.42)]"
          style={reduce ? undefined : { x: coolX }}
        />
      </AmbientDrift>

      {/* Quiet sport accent — square, not a soft blob */}
      <AmbientDrift
        amplitude={7}
        duration={32}
        delay={0.5}
        className="absolute bottom-[-6%] right-[18%] h-[34%] w-[30%] max-md:hidden"
      >
        <div className="h-full w-full rounded-none bg-[rgba(147,224,60,0.14)]" />
      </AmbientDrift>

      <AmbientDrift amplitude={5} duration={34} className="absolute inset-0">
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 720"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M40 210 H 320"
            stroke="rgba(17,17,16,0.12)"
            strokeWidth="1.25"
          />
          <path
            d="M-20 560 C 220 500, 380 620, 600 560 S 980 460, 1220 540 S 1400 600, 1520 540"
            stroke="rgba(17,17,16,0.08)"
            strokeWidth="1.2"
          />
        </svg>
      </AmbientDrift>
    </div>
  );
}

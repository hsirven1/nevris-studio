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
 * Rook — Nevris brand planes (blue / warm neutral / yellow).
 */
export function OpsAtmosphere() {
  const reduce = useReducedMotion();
  const progress = useProjectProgress();
  const fallback = useMotionValue(1);
  const p = progress ?? fallback;

  const planeX = useTransform(p, [0, 1], ["3%", "-2%"]);
  const coolX = useTransform(p, [0, 1], ["-3%", "2%"]);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {/* Cool slate plane — frames the product flow */}
      <AmbientDrift
        amplitude={10}
        duration={28}
        className="absolute top-[-8%] right-[-8%] h-[58%] w-[46%] max-md:right-[-14%] max-md:w-[58%]"
      >
        <motion.div
          className="h-full w-full rounded-[1.75rem] bg-[rgba(109,140,166,0.48)] max-md:opacity-90"
          style={reduce ? undefined : { x: planeX }}
        />
      </AmbientDrift>

      {/* Soft panel block — structured, left of visuals */}
      <AmbientDrift
        amplitude={8}
        duration={30}
        delay={1}
        className="absolute top-[36%] left-[-6%] h-[42%] w-[32%] max-md:hidden"
      >
        <motion.div
          className="h-full w-full rounded-[1.75rem] bg-[rgba(245,241,234,0.92)]"
          style={reduce ? undefined : { x: coolX }}
        />
      </AmbientDrift>

      {/* Quiet yellow — warm balance */}
      <AmbientDrift
        amplitude={6}
        duration={32}
        delay={0.6}
        className="absolute right-[22%] bottom-[-8%] h-[36%] w-[28%] max-md:hidden"
      >
        <div className="h-full w-full rounded-[1.75rem] bg-[rgba(244,196,106,0.46)]" />
      </AmbientDrift>

      {/* Geometric alignment — one horizontal + one vertical hairline */}
      <AmbientDrift amplitude={4} duration={34} className="absolute inset-0">
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 720"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M48 148 H 280"
            stroke="rgba(17,17,16,0.12)"
            strokeWidth="1.15"
          />
          <path
            d="M1180 80 V 260"
            stroke="rgba(17,17,16,0.08)"
            strokeWidth="1.1"
          />
        </svg>
      </AmbientDrift>
    </div>
  );
}

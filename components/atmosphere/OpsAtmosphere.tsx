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
 * AI Executive Assistant — cooler, more geometric, still Juno-family soft.
 * Slightly sharper radii; restrained slate / cool gray / quiet lavender.
 */
export function OpsAtmosphere() {
  const reduce = useReducedMotion();
  const progress = useProjectProgress();
  const fallback = useMotionValue(1);
  const p = progress ?? fallback;

  const planeX = useTransform(p, [0, 1], ["3%", "-2%"]);
  const planeRotate = useTransform(p, [0, 1], [1, 3]);
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
          className="h-full w-full rounded-[1.35rem] bg-[rgba(148,168,186,0.22)] max-md:opacity-70"
          style={
            reduce
              ? undefined
              : {
                  x: planeX,
                  rotate: planeRotate,
                }
          }
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
          className="h-full w-full rounded-[1.35rem] bg-[rgba(228,226,220,0.75)]"
          style={reduce ? undefined : { x: coolX }}
        />
      </AmbientDrift>

      {/* Quiet lavender — AI-forward without glow cliché */}
      <AmbientDrift
        amplitude={6}
        duration={32}
        delay={0.6}
        className="absolute right-[22%] bottom-[-8%] h-[36%] w-[28%] max-md:hidden"
      >
        <div className="h-full w-full rounded-[1.25rem] bg-[rgba(201,182,247,0.16)]" />
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

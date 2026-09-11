"use client";

import {
  PhoneStill,
  PhoneVideo,
} from "@/components/projects/fanstories/PhoneMedia";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, useSyncExternalStore } from "react";

const STILLS = {
  fitpulse: "/work/fanstories/stills/fitpulse_hq.png",
  food: "/work/fanstories/stills/food_hq.png",
  sports: "/work/fanstories/stills/sports_hq.png",
  videoPoster: "/work/fanstories/stills/fitpulse_hq.png",
} as const;

function subscribeLg(onChange: () => void) {
  const mq = window.matchMedia("(min-width: 1024px)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getLgSnapshot() {
  return window.matchMedia("(min-width: 1024px)").matches;
}

/**
 * Video center; fitness left, plate behind (readable), sports right.
 */
export function FanStoriesShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const isLg = useSyncExternalStore(subscribeLg, getLgSnapshot, () => false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], [16, -20]);
  const leftY = useTransform(scrollYProgress, [0, 1], [22, -12]);
  const rightY = useTransform(scrollYProgress, [0, 1], [28, -16]);
  const supportY = useTransform(scrollYProgress, [0, 1], [10, -22]);

  const video = (
    <PhoneVideo
      src="/work/fanstories/videos/primary.mp4"
      poster={STILLS.videoPoster}
      alt="FanStories personalized recap sequence"
      className="w-full"
      sizes={isLg ? "320px" : "68vw"}
    />
  );

  return (
    <div ref={ref} className="relative w-full">
      {!isLg ? (
        <div className="flex flex-col gap-4">
          <div className="mx-auto w-[min(68%,19rem)]">{video}</div>
          <div className="grid grid-cols-2 gap-3 px-1">
            <PhoneStill
              src={STILLS.fitpulse}
              alt="FitPulse activity recap"
              sizes="(max-width: 1023px) 40vw, 220px"
            />
            <PhoneStill
              src={STILLS.food}
              alt="FreshPlate favorite dish"
              sizes="(max-width: 1023px) 40vw, 220px"
            />
          </div>
          <PhoneStill
            src={STILLS.sports}
            alt="FC Nordic 2026 fan recap — L'Ultras"
            className="mx-auto w-[min(48%,13.5rem)]"
            sizes="(max-width: 1023px) 48vw, 200px"
          />
        </div>
      ) : (
        <div className="relative mx-auto h-[min(64vh,34rem)] w-full max-w-[42rem]">
          <div
            className="pointer-events-none absolute top-[8%] left-[12%] h-[70%] w-[76%] rounded-[45%] bg-[radial-gradient(ellipse_at_center,rgba(201,182,247,0.28),transparent_72%)] blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute right-[4%] bottom-[0%] h-[42%] w-[48%] rounded-[40%] bg-[radial-gradient(ellipse_at_center,rgba(147,224,60,0.1),transparent_70%)] blur-3xl"
            aria-hidden
          />

          {/* 1 — Fitness, left */}
          <motion.div
            className="absolute top-[4%] left-[0%] z-[2] w-[28%] -rotate-[5deg]"
            style={reduce ? undefined : { y: leftY }}
          >
            <PhoneStill
              src={STILLS.fitpulse}
              alt="FitPulse activity recap"
              sizes="240px"
            />
          </motion.div>

          {/* 3 — Sports, right */}
          <motion.div
            className="absolute top-[6%] right-[0%] z-[2] w-[28%] rotate-[5deg]"
            style={reduce ? undefined : { y: rightY }}
          >
            <PhoneStill
              src={STILLS.sports}
              alt="FC Nordic 2026 fan recap — L'Ultras"
              sizes="240px"
            />
          </motion.div>

          {/* 2 — Plate, behind video but clearly spaced / readable */}
          <motion.div
            className="absolute top-[38%] left-[8%] z-[3] w-[32%] origin-top -rotate-[3deg]"
            style={reduce ? undefined : { y: supportY }}
          >
            <PhoneStill
              src={STILLS.food}
              alt="FreshPlate favorite dish"
              sizes="260px"
            />
          </motion.div>

          {/* Center — main video */}
          <motion.div
            className="absolute top-[0%] left-[34%] z-[5] w-[40%]"
            style={reduce ? undefined : { y: videoY }}
          >
            {video}
          </motion.div>
        </div>
      )}
    </div>
  );
}

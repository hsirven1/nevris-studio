"use client";

import { DeviceStill, DeviceVideo } from "@/components/projects/grand-angle/DeviceFrame";
import { ProductImage } from "@/components/projects/media/ProductImage";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const MEDIA = {
  exhibition: "/work/grand-angle/photos/exhibition.jpeg",
  scan: "/work/grand-angle/videos/scan.MP4",
} as const;

const STILLS = {
  home: "/work/grand-angle/stills/home.png",
  exhibitions: "/work/grand-angle/stills/exhibitions.jpg",
  map: "/work/grand-angle/stills/map.png",
  scanResult: "/work/grand-angle/stills/artwork-photos.png",
} as const;

function subscribeLg(onChange: () => void) {
  const mq = window.matchMedia("(min-width: 1024px)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getLgSnapshot() {
  return window.matchMedia("(min-width: 1024px)").matches;
}

const captionClass =
  "mt-3.5 mb-0 whitespace-nowrap font-serif text-[18px] leading-none font-normal italic tracking-[-0.015em] text-lere-text/50 md:mt-4 md:text-[20px] lg:text-[21px]";

/**
 * Two composed moments: scan + companion — caption attached to each visual.
 */
export function GrandAngleShowcase() {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const isLg = useSyncExternalStore(subscribeLg, getLgSnapshot, () => false);
  const [hasExhibition, setHasExhibition] = useState(false);

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [36, -36]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [28, -20]);

  useEffect(() => {
    let cancelled = false;
    const img = new window.Image();
    img.onload = () => {
      if (!cancelled) setHasExhibition(true);
    };
    img.onerror = () => {
      if (!cancelled) setHasExhibition(false);
    };
    img.src = MEDIA.exhibition;
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex flex-col gap-12 lg:gap-14">
      {/* Moment 1 — artwork scanning */}
      <div ref={stageRef} className="w-full">
        <div className="relative overflow-visible rounded-[0.15rem] border border-lere-rule">
          <div className="absolute inset-0 overflow-hidden bg-[#0f1214]">
            {hasExhibition ? (
              <motion.div
                className="absolute inset-0"
                style={reduce ? undefined : { y: photoY }}
              >
                <ProductImage
                  src={MEDIA.exhibition}
                  alt="Grand Angle Photo Festival exhibition"
                  fill
                  sizes="(max-width: 1024px) 100vw, min(1100px, 70vw)"
                  priority
                  className="object-cover object-center"
                />
              </motion.div>
            ) : (
              <div className="absolute inset-0 bg-[linear-gradient(135deg,#1a1f22,#101417_55%,#1c2226)]" />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-black/30" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15" />
          </div>

          <div className="relative z-10 flex justify-end px-[5%] pt-10 pb-10 sm:px-[9%] sm:pt-12 sm:pb-12 lg:px-[11%]">
            <motion.div
              className="w-[min(46%,14.5rem)] rotate-[2.5deg] sm:w-[min(36%,15.25rem)] lg:w-[14.75rem]"
              style={reduce ? undefined : { y: phoneY }}
            >
              <DeviceVideo
                src={MEDIA.scan}
                alt="Artwork scanning — point the camera at a photograph on display"
              />
            </motion.div>
          </div>
        </div>

        <p className={captionClass}>
          Scan an artwork. Discover the story behind it.
        </p>
      </div>

      {/* Moment 2 — festival companion (full width of column) */}
      <div className="w-full">
        {!isLg ? (
          <div className="mx-auto grid max-w-[20rem] grid-cols-2 gap-2.5">
            <DeviceStill
              src={STILLS.home}
              alt="Festival home — overview and scanner entry"
              sizes="(max-width: 1023px) 45vw, 280px"
            />
            <DeviceStill
              src={STILLS.exhibitions}
              alt="Exhibitions list"
              sizes="(max-width: 1023px) 45vw, 280px"
            />
            <DeviceStill
              src={STILLS.map}
              alt="Festival map"
              sizes="(max-width: 1023px) 45vw, 280px"
            />
            <DeviceStill
              src={STILLS.scanResult}
              alt="Exhibition photos — In Memoria"
              sizes="(max-width: 1023px) 45vw, 280px"
            />
          </div>
        ) : (
          <div className="relative flex w-full items-end justify-between gap-3 overflow-visible pt-1 pb-0.5 xl:gap-4">
            <div
              className="pointer-events-none absolute top-[8%] left-[6%] h-[78%] w-[80%] rounded-[45%] bg-[radial-gradient(ellipse_at_center,rgba(120,145,160,0.18),transparent_70%)] blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute right-[4%] bottom-[4%] h-[50%] w-[44%] rounded-[40%] bg-[radial-gradient(ellipse_at_center,rgba(176,148,118,0.14),transparent_72%)] blur-3xl"
              aria-hidden
            />
            <div className="relative z-[1] w-[23%] shrink-0 origin-bottom -rotate-[5deg]">
              <DeviceStill
                src={STILLS.home}
                alt="Festival home — overview and scanner entry"
                sizes="280px"
              />
            </div>
            <div className="relative z-[3] w-[26%] shrink-0 origin-bottom">
              <DeviceStill
                src={STILLS.exhibitions}
                alt="Exhibitions list"
                sizes="300px"
                priority
              />
            </div>
            <div className="relative z-[2] w-[23%] shrink-0 origin-bottom rotate-[3.5deg]">
              <DeviceStill
                src={STILLS.map}
                alt="Festival map"
                sizes="280px"
              />
            </div>
            <div className="relative z-[1] w-[23%] shrink-0 origin-bottom rotate-[6deg]">
              <DeviceStill
                src={STILLS.scanResult}
                alt="Exhibition photos — In Memoria"
                sizes="280px"
              />
            </div>
          </div>
        )}

        <p className={captionClass}>
          Everything you need for the festival, in one app.
        </p>
      </div>
    </div>
  );
}

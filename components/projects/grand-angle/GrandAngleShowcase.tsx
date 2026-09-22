"use client";

import { DeviceStill, DeviceVideo } from "@/components/projects/grand-angle/DeviceFrame";
import { ProductImage } from "@/components/projects/media/ProductImage";
import { ProjectMediaReveal } from "@/components/projects/ProjectMediaReveal";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

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

const captionClass =
  "mt-3.5 mb-0 font-serif text-[18px] leading-none font-normal italic tracking-[-0.015em] text-studio-text/50 md:mt-4 md:text-[20px]";

function ScanHero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [hasExhibition, setHasExhibition] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "end start"],
  });
  // Desktop-only parallax — mobile translate exposed the #111110 letterbox.
  const photoY = useTransform(scrollYProgress, [0, 1], [36, -36]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [28, -20]);
  const parallaxOn = !reduce && !isMobile;

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
    <div ref={stageRef} className="w-full">
      <div className="relative overflow-visible rounded-[0.15rem] border border-white/10">
        <div className="absolute inset-0 overflow-hidden bg-[#111110] md:bg-[#111110]">
          {hasExhibition ? (
            <motion.div
              className="absolute inset-0"
              style={parallaxOn ? { y: photoY } : undefined}
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
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
        </div>

        <div className="relative z-10 flex justify-end px-[5%] pt-10 pb-10 sm:px-[9%] sm:pt-12 sm:pb-12 lg:px-[11%]">
          <motion.div
            className="w-[min(46%,14.5rem)] sm:w-[min(36%,15.25rem)] lg:w-[14.75rem]"
            style={parallaxOn ? { y: phoneY } : undefined}
          >
            <DeviceVideo
              src={MEDIA.scan}
              alt="Artwork scanning — point the camera at a photograph on display"
              showIsland={false}
            />
          </motion.div>
        </div>
      </div>

      <p className={captionClass}>
        Scan an artwork. Discover the story behind it.
      </p>
    </div>
  );
}

function CompanionScreens() {
  return (
    <div className="w-full">
      <div className="mx-auto grid max-w-[22rem] grid-cols-2 gap-2.5 lg:max-w-none lg:grid-cols-4 lg:gap-3">
        <DeviceStill
          src={STILLS.home}
          alt="Festival home — overview and scanner entry"
          sizes="(max-width: 1023px) 45vw, 220px"
          showIsland={false}
        />
        <DeviceStill
          src={STILLS.exhibitions}
          alt="Exhibitions list"
          sizes="(max-width: 1023px) 45vw, 220px"
          showIsland={false}
        />
        <DeviceStill
          src={STILLS.map}
          alt="Festival map"
          sizes="(max-width: 1023px) 45vw, 220px"
          showIsland={false}
        />
        <DeviceStill
          src={STILLS.scanResult}
          alt="Exhibition photos — In Memoria"
          sizes="(max-width: 1023px) 45vw, 220px"
          showIsland={false}
        />
      </div>
      <p className={captionClass}>
        Everything you need for the festival, in one app.
      </p>
    </div>
  );
}

/**
 * Grand Angle — scan composition hero; app screens behind See more.
 */
export function GrandAngleShowcase() {
  return (
    <ProjectMediaReveal
      tone="dark"
      primary={<ScanHero />}
      secondary={<CompanionScreens />}
    />
  );
}

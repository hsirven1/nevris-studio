"use client";

import { ProductImage } from "@/components/projects/media/ProductImage";
import { ProjectMediaReveal } from "@/components/projects/ProjectMediaReveal";
import { useEffect, useRef, useState } from "react";

const VIDEO = {
  src: "/work/fanstories/videos/primary.mp4",
  poster: "/work/fanstories/stills/fitpulse_hq.png",
  alt: "FanStories personalized recap sequence",
} as const;

const STILLS = [
  {
    src: "/work/fanstories/stills/fitpulse_hq.png",
    alt: "FitPulse activity recap",
    caption: "Fitness",
  },
  {
    src: "/work/fanstories/stills/sports_hq.png",
    alt: "FC Nordic 2026 fan recap",
    caption: "Sports",
  },
  {
    src: "/work/fanstories/stills/food_hq.png",
    alt: "FreshPlate favorite dish",
    caption: "Food",
  },
] as const;

/**
 * Showcase video — full original frame, no crop / zoom.
 * Native asset ratio: 864×1370.
 */
function ShowcaseVideo({ className = "" }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "120px", threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || failed) return;
    if (inView) {
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView, failed]);

  return (
    <div ref={hostRef} className={className}>
      <div className="screenshot-frame relative isolate overflow-hidden rounded-[1.25rem] shadow-[0_18px_44px_-22px_rgba(17,17,16,0.3),0_6px_16px_-10px_rgba(17,17,16,0.14)] ring-1 ring-ink/10">
        <div className="relative aspect-[864/1370] w-full">
          {failed ? (
            // Poster fallback when video cannot play
            <img
              src={VIDEO.poster}
              alt={VIDEO.alt}
              className="absolute inset-0 h-full w-full object-contain object-center"
            />
          ) : (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-contain object-center"
              poster={VIDEO.poster}
              muted
              playsInline
              loop
              autoPlay
              preload="metadata"
              controls={false}
              aria-label={VIDEO.alt}
              onError={() => setFailed(true)}
            >
              <source src={VIDEO.src} type="video/mp4" />
            </video>
          )}
        </div>
      </div>
    </div>
  );
}

function SecondaryStills() {
  return (
    <ul className="m-0 grid list-none grid-cols-3 gap-2.5 p-0 md:gap-3">
      {STILLS.map((still) => (
        <li key={still.src} className="min-w-0">
          <div className="screenshot-frame relative aspect-[864/1370] overflow-hidden rounded-[0.85rem] ring-1 ring-ink/10">
            <ProductImage
              src={still.src}
              alt={still.alt}
              fill
              sizes="120px"
              className="object-cover object-top"
            />
          </div>
          <p className="mt-2 mb-0 font-label text-[10px] tracking-[0.12em] text-ink/45 uppercase">
            {still.caption}
          </p>
        </li>
      ))}
    </ul>
  );
}

/**
 * FanStories media — video hero, stills behind See more.
 */
export function FanStoriesShowcase() {
  return (
    <ProjectMediaReveal
      className="mx-auto w-full max-w-[20rem] lg:max-w-[22rem] xl:max-w-[23.5rem]"
      tone="light"
      primary={<ShowcaseVideo className="w-full" />}
      secondary={<SecondaryStills />}
    />
  );
}

export { ShowcaseVideo };

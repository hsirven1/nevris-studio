"use client";

import { ProductImage } from "@/components/projects/media/ProductImage";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

type DeviceFrameProps = {
  className?: string;
  children: ReactNode;
  showIsland?: boolean;
};

/**
 * Minimal smartphone contour — thin bezel, rounded corners, optional island.
 * Outer wrapper must NOT be clipped by parents.
 */
export function DeviceFrame({
  className = "",
  children,
  showIsland = true,
}: DeviceFrameProps) {
  return (
    <div
      className={`screenshot-frame relative isolate aspect-[9/19.5] w-full overflow-hidden rounded-[1.75rem] bg-[#0a0a0a] p-[0.35rem] ring-1 ring-white/12 ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[1.4rem] bg-black">
        {showIsland && (
          <div
            className="pointer-events-none absolute top-[0.5rem] left-1/2 z-20 h-[1.05rem] w-[30%] -translate-x-1/2 rounded-full bg-black"
            aria-hidden
          />
        )}
        {children}
      </div>
    </div>
  );
}

export function DeviceStill({
  src,
  alt,
  className,
  sizes = "280px",
  priority,
  showIsland = true,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  showIsland?: boolean;
}) {
  return (
    <div className={className}>
      <DeviceFrame showIsland={showIsland}>
        <ProductImage
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
        />
      </DeviceFrame>
    </div>
  );
}

export function DeviceVideo({
  src,
  className,
  alt,
  showIsland = true,
}: {
  src: string;
  className?: string;
  alt: string;
  showIsland?: boolean;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [inView, setInView] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "140px", threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || failed) return;
    if (reduce) {
      video.pause();
      return;
    }
    if (inView) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [inView, failed, reduce]);

  return (
    <div ref={hostRef} className={className}>
      <DeviceFrame showIsland={showIsland}>
        {!failed ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover object-top"
            muted
            playsInline
            loop
            autoPlay={!reduce}
            preload="metadata"
            controls={false}
            aria-label={alt}
            onError={() => setFailed(true)}
          >
            <source src={src} type="video/mp4" />
          </video>
        ) : (
          <div className="absolute inset-0 bg-[#161a1c]" />
        )}
      </DeviceFrame>
    </div>
  );
}

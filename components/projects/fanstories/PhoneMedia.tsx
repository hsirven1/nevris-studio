"use client";

import { ProductImage } from "@/components/projects/media/ProductImage";
import { useEffect, useRef, useState } from "react";

const PHONE_ASPECT = "aspect-[432/685]";

type PhoneShellProps = {
  className?: string;
  children: React.ReactNode;
  label?: string;
};

export function PhoneShell({ className = "", children, label }: PhoneShellProps) {
  return (
    <figure
      className={`screenshot-frame relative overflow-hidden rounded-[1.35rem] bg-ink ring-1 ring-ink/15 ${PHONE_ASPECT} ${className}`}
    >
      {children}
      {label ? (
        <figcaption className="pointer-events-none absolute top-3 left-3 z-10 font-mono text-[9px] tracking-[0.16em] text-white/70 uppercase mix-blend-difference">
          {label}
        </figcaption>
      ) : null}
    </figure>
  );
}

/** Crop via object-cover inside the frame — do not enlarge with negative inset. */
function StillCrop({
  src,
  alt,
  sizes,
  priority,
  decorative,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  decorative?: boolean;
}) {
  return (
    <ProductImage
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className="object-cover object-top"
      aria-hidden={decorative || undefined}
    />
  );
}

type PhoneStillProps = {
  src: string;
  alt: string;
  className?: string;
  label?: string;
  priority?: boolean;
  sizes?: string;
};

export function PhoneStill({
  src,
  alt,
  className,
  label,
  priority,
  sizes = "(max-width: 1024px) 70vw, 280px",
}: PhoneStillProps) {
  return (
    <PhoneShell className={className} label={label}>
      <StillCrop src={src} alt={alt} sizes={sizes} priority={priority} />
    </PhoneShell>
  );
}

type PhoneVideoProps = {
  src: string;
  poster: string;
  alt: string;
  className?: string;
  label?: string;
  sizes?: string;
};

/**
 * Autoplay muted loop when the file exists; otherwise falls back to poster still.
 * Uses preload=metadata and IntersectionObserver so offscreen media stays quiet.
 */
export function PhoneVideo({
  src,
  poster,
  alt,
  className,
  label,
  sizes = "(max-width: 1024px) 85vw, 340px",
}: PhoneVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "120px", threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || failed) return;
    if (inView) {
      void video.play().catch(() => {
        /* autoplay may be blocked; poster still shows */
      });
    } else {
      video.pause();
    }
  }, [inView, failed]);

  if (failed) {
    return (
      <PhoneStill
        src={poster}
        alt={alt}
        className={className}
        label={label}
        sizes={sizes}
      />
    );
  }

  return (
    <div ref={hostRef} className={className}>
      <PhoneShell label={label}>
        <StillCrop src={poster} alt="" sizes={sizes} decorative />
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover object-top bg-ink"
          poster={poster}
          muted
          playsInline
          loop
          autoPlay
          preload="metadata"
          controls={false}
          aria-label={alt}
          onError={() => setFailed(true)}
        >
          <source src={src} type="video/mp4" />
        </video>
      </PhoneShell>
    </div>
  );
}

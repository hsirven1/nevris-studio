"use client";

import { ProductImage } from "@/components/projects/media/ProductImage";
import { useEffect, useRef, useState } from "react";

/** Flat supporting stills — phone screenshots, slightly less tall. */
const STILL_ASPECT = "aspect-[432/685]";
/** Hero device — true iPhone portrait (≈9:19.5). */
const DEVICE_ASPECT = "aspect-[9/19.5]";

type PhoneShellProps = {
  className?: string;
  children: React.ReactNode;
  label?: string;
  /** Clean iPhone contour for the hero video — thin bezel + Dynamic Island. */
  variant?: "flat" | "device";
};

export function PhoneShell({
  className = "",
  children,
  label,
  variant = "flat",
}: PhoneShellProps) {
  if (variant === "device") {
    return (
      <figure
        className={`screenshot-frame relative isolate overflow-hidden rounded-[2rem] bg-[#0a0a0a] p-[0.38rem] shadow-[0_24px_52px_-22px_rgba(17,17,16,0.4),0_10px_20px_-12px_rgba(17,17,16,0.2)] ring-1 ring-black/40 ${DEVICE_ASPECT} ${className}`}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[1.55rem] bg-[#050505]">
          {/* Dynamic Island */}
          <div
            className="pointer-events-none absolute top-[0.55rem] left-1/2 z-30 h-[1.15rem] w-[32%] -translate-x-1/2 rounded-full bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
            aria-hidden
          />
          {/* Soft side highlight — thin phone edge read */}
          <div
            className="pointer-events-none absolute inset-y-[8%] left-0 z-20 w-px bg-white/10"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-[8%] right-0 z-20 w-px bg-white/5"
            aria-hidden
          />
          {children}
          {label ? (
            <figcaption className="pointer-events-none absolute top-3 left-3 z-10 font-label text-[9px] tracking-[0.16em] text-white/70 uppercase mix-blend-difference">
              {label}
            </figcaption>
          ) : null}
        </div>
      </figure>
    );
  }

  return (
    <figure
      className={`screenshot-frame relative overflow-hidden rounded-[1.35rem] bg-ink ring-1 ring-ink/15 ${STILL_ASPECT} ${className}`}
    >
      {children}
      {label ? (
        <figcaption className="pointer-events-none absolute top-3 left-3 z-10 font-label text-[9px] tracking-[0.16em] text-white/70 uppercase mix-blend-difference">
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
  fit = "cover",
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  decorative?: boolean;
  fit?: "cover" | "contain";
}) {
  return (
    <ProductImage
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={
        fit === "contain"
          ? "object-contain object-center"
          : "object-cover object-top"
      }
      aria-hidden={decorative || undefined}
    />
  );
}

type PhoneStillProps = {
  src: string;
  alt: string;
  className?: string;
  label?: string;
  caption?: string;
  priority?: boolean;
  sizes?: string;
  variant?: "flat" | "device";
};

export function PhoneStill({
  src,
  alt,
  className,
  label,
  caption,
  priority,
  sizes = "(max-width: 1024px) 70vw, 280px",
  variant = "flat",
}: PhoneStillProps) {
  const contain = variant === "device";

  return (
    <div className={className}>
      <PhoneShell label={label} variant={variant}>
        {contain ? (
          <div className="absolute inset-0 bg-black">
            <StillCrop
              src={src}
              alt={alt}
              sizes={sizes}
              priority={priority}
              fit="contain"
            />
          </div>
        ) : (
          <StillCrop src={src} alt={alt} sizes={sizes} priority={priority} />
        )}
      </PhoneShell>
      {caption ? (
        <p className="mt-2 mb-0 font-label text-[10px] tracking-[0.14em] text-ink/45 uppercase md:text-[11px]">
          {caption}
        </p>
      ) : null}
    </div>
  );
}

type PhoneVideoProps = {
  src: string;
  poster: string;
  alt: string;
  className?: string;
  label?: string;
  sizes?: string;
  variant?: "flat" | "device";
};

/**
 * Autoplay muted loop in an iPhone-style frame.
 * Device variant: full media visible (object-contain) with black letterboxing.
 */
export function PhoneVideo({
  src,
  poster,
  alt,
  className,
  label,
  sizes = "(max-width: 1024px) 85vw, 340px",
  variant = "device",
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
        variant={variant}
      />
    );
  }

  const isDevice = variant === "device";

  return (
    <div ref={hostRef} className={className}>
      <PhoneShell label={label} variant={variant}>
        {isDevice ? (
          /* Full media visible — never cropped; black bars letterbox as needed */
          <div className="absolute inset-0 overflow-hidden rounded-[1.55rem] bg-black">
            <StillCrop
              src={poster}
              alt=""
              sizes={sizes}
              decorative
              fit="contain"
            />
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-contain object-center bg-transparent"
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
          </div>
        ) : (
          <>
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
          </>
        )}
      </PhoneShell>
    </div>
  );
}

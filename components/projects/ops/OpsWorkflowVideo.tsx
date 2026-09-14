"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const VIDEO_SRC =
  "/work/ai-executive-assistant/videos/actions-workflow.mp4";
const POSTER_SRC =
  "/work/ai-executive-assistant/stills/actions-workflow-poster.jpg";

/**
 * Actions workflow demo — first media in the Rook showcase column.
 */
export function OpsWorkflowVideo() {
  const hostRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [inView, setInView] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) =>
        setInView(entry.isIntersecting && entry.intersectionRatio >= 0.2),
      { rootMargin: "80px", threshold: [0, 0.2, 0.45] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || failed) return;

    if (reduce) {
      video.pause();
      setPlaying(false);
      return;
    }

    if (inView) {
      void video
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    } else {
      video.pause();
      setPlaying(false);
    }
  }, [inView, failed, reduce]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video || failed) return;
    if (video.paused) {
      void video.play().then(() => setPlaying(true)).catch(() => undefined);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <div
      ref={hostRef}
      className="group relative overflow-hidden rounded-[0.85rem] bg-[#f4f3f0] shadow-[0_18px_44px_-22px_rgba(17,17,16,0.26),0_4px_14px_-8px_rgba(17,17,16,0.1)] ring-1 ring-ink/10"
    >
      {failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={POSTER_SRC}
          alt="Rook AI Actions workflow"
          className="block h-auto w-full"
          width={2350}
          height={712}
        />
      ) : (
        <video
          ref={videoRef}
          className="block h-auto w-full bg-[#f4f3f0]"
          poster={POSTER_SRC}
          muted
          playsInline
          loop
          preload="metadata"
          controls={false}
          aria-label="Rook AI Actions workflow — issue detected to action taken"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => setFailed(true)}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      )}

      {!failed && (
        <button
          type="button"
          onClick={togglePlayback}
          className={`absolute right-3 bottom-3 flex size-9 items-center justify-center rounded-full bg-ink/70 text-white transition-opacity duration-200 hover:bg-ink/85 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
            playing
              ? "opacity-100 md:opacity-0 md:group-hover:opacity-100"
              : "opacity-100"
          }`}
          aria-label={playing ? "Pause workflow video" : "Play workflow video"}
        >
          {playing ? (
            <span className="flex gap-0.5" aria-hidden>
              <span className="h-3 w-[3px] rounded-[1px] bg-current" />
              <span className="h-3 w-[3px] rounded-[1px] bg-current" />
            </span>
          ) : (
            <span
              className="ml-0.5 border-y-[5px] border-l-[8px] border-y-transparent border-l-current"
              aria-hidden
            />
          )}
        </button>
      )}
    </div>
  );
}

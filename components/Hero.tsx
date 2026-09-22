"use client";

import { HeroRibbon } from "@/components/ribbon/HeroRibbon";

/**
 * Layered hero scene:
 * sculpture upper-center + centered statement below, lightly integrated.
 */
export function Hero() {
  return (
    <section
      className="relative z-[1] min-h-0 flex-1 overflow-visible"
      aria-label="Hero"
    >
      {/* Visual scene — object sits above the type */}
      <div className="pointer-events-none absolute inset-x-[-4%] top-[-6%] bottom-[4%] z-[1] overflow-visible max-md:inset-x-[-2%] max-md:top-[-3%] max-md:bottom-[8%]">
        <HeroRibbon />
      </div>

      {/* Headline — under the shape; passes touches through except on the type itself */}
      <div className="pointer-events-none relative z-[2] flex h-full min-h-[20rem] flex-col items-center justify-end pb-[clamp(1.25rem,4vh,2.25rem)] md:min-h-0 md:pb-[clamp(1.5rem,5vh,2.75rem)]">
        <div className="inline-flex -translate-y-[clamp(3.25rem,11vh,6.75rem)] flex-col items-stretch">
          <h1 className="type-hero-statement pointer-events-auto m-0 whitespace-nowrap text-center text-ink [text-shadow:0_0_28px_var(--color-ground),0_0_10px_var(--color-ground)]">
            From <span className="italic">strategy</span> to{" "}
            <span className="inline-block bg-accent px-[0.14em] pt-[0.02em] pb-[0.08em] text-ink [text-shadow:none]">
              product.
            </span>
          </h1>
          {/* Thin rule — sits with the line, extends just past the type */}
          <div
            className="mx-[-0.55em] mt-[0.42em] h-px bg-ink/18 md:mt-[0.48em]"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}

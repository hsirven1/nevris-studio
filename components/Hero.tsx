"use client";

import { HeroRibbon } from "@/components/ribbon/HeroRibbon";

export function Hero() {
  return (
    <section
      className="relative flex min-h-0 flex-1 flex-col justify-start overflow-x-clip pt-10 pb-16 md:pt-[72px] md:pb-[clamp(4rem,12vh,8rem)]"
      aria-label="Hero"
    >
      <HeroRibbon />

      {/* ~52–55% of desktop hero — room for “intelligent products” on one line */}
      <div className="relative z-10 gutter-x w-full lg:w-[55%] lg:max-w-[52rem]">
        <h1 className="type-hero m-0 font-extrabold [text-shadow:0_0_24px_var(--color-ground),0_0_8px_var(--color-ground)]">
          <span className="block">Building</span>
          <span className="block min-[1366px]:whitespace-nowrap">
            <span className="marker">intelligent</span> products
          </span>
          <span className="block min-[1366px]:whitespace-nowrap">
            that feel simple.
          </span>
        </h1>
      </div>
    </section>
  );
}

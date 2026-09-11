"use client";

import { site } from "@/content/site";
import { HeroRibbon } from "@/components/ribbon/HeroRibbon";

export function Hero() {
  const { hero } = site;

  return (
    <section className="relative overflow-x-clip pb-[56px] pt-[72px]" aria-label="Hero">
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

        <p className="mt-[34px] m-0 max-w-[42ch] text-[19px] leading-[1.5] text-ink [text-shadow:0_0_18px_var(--color-ground)] sm:text-[20px] md:text-[21px] md:leading-[1.5] lg:text-[22px]">
          {hero.body}
        </p>
      </div>
    </section>
  );
}

"use client";

import { ChapterBanner } from "@/components/ChapterBanner";
import { site } from "@/content/site";

/**
 * Chapter banner + studio principles — same band language as Discover our work.
 */
export function HowWeWork() {
  const { howWeWork } = site;

  return (
    <section
      id="studio"
      aria-label={howWeWork.label}
      className="relative z-[5] overflow-x-clip bg-ground text-ink"
    >
      <ChapterBanner title={howWeWork.label} />
      <div className="h-[clamp(2rem,5vh,3.25rem)] bg-ground" aria-hidden />

      <div className="gutter-x relative z-10 pb-[clamp(3.25rem,8vh,5rem)] md:pb-[clamp(3.75rem,9vh,5.5rem)]">
        <h3 className="m-0 max-w-[16ch] text-[clamp(1.85rem,3.8vw,2.75rem)] leading-[1.08] font-bold tracking-[-0.035em] text-ink md:max-w-[18ch]">
          {howWeWork.headline}
        </h3>

        <ol className="mt-[clamp(2rem,5vh,3rem)] mb-0 grid list-none grid-cols-1 gap-10 p-0 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-12 xl:gap-x-16">
          {howWeWork.principles.map((principle) => (
            <li key={principle.id} className="min-w-0">
              <p className="m-0 font-mono text-[clamp(2.75rem,5vw,4rem)] leading-none tracking-[-0.05em] text-lavender/55">
                {principle.id}
              </p>
              <h4 className="mt-3 mb-0 max-w-[18ch] text-[15px] leading-[1.25] font-bold tracking-[0.04em] text-ink uppercase md:mt-4 md:text-[16px]">
                {principle.title}
              </h4>
              <p className="mt-3 mb-0 max-w-[32ch] text-[15px] leading-[1.5] text-ink/70 md:text-[16px]">
                {principle.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

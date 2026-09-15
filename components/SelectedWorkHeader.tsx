"use client";

import { ChapterBanner } from "@/components/ChapterBanner";
import { site } from "@/content/site";

/**
 * Editorial chapter title into featured work.
 */
export function SelectedWorkHeader() {
  return (
    <section
      id="work"
      aria-label={site.selectedWork.title}
      className="relative z-[5] overflow-x-clip bg-ground"
    >
      <ChapterBanner title={site.selectedWork.title} />
      <div
        className="h-3 bg-ground md:h-[clamp(1.25rem,3.5vh,2.25rem)]"
        aria-hidden
      />
    </section>
  );
}

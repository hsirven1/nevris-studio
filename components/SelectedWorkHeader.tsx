"use client";

import { ChapterBanner } from "@/components/ChapterBanner";
import { site } from "@/content/site";

/**
 * Black chapter band — hard break into featured work.
 */
export function SelectedWorkHeader() {
  return (
    <section
      id="work"
      aria-label={site.selectedWork.title}
      className="relative z-[5] overflow-x-clip bg-ground"
    >
      <ChapterBanner title={site.selectedWork.title} />
      <div className="h-[clamp(2rem,5vh,3.25rem)] bg-ground" aria-hidden />
    </section>
  );
}

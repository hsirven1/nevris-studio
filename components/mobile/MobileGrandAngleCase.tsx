"use client";

import type { Project } from "@/content/types";
import { MobileProjectExplore } from "@/components/mobile/MobileProjectExplore";
import {
  DeviceStill,
  DeviceVideo,
} from "@/components/projects/grand-angle/DeviceFrame";
import { ProductImage } from "@/components/projects/media/ProductImage";

const MEDIA = {
  exhibition: "/work/grand-angle/photos/exhibition.jpeg",
  scan: "/work/grand-angle/videos/scan.MP4",
  home: "/work/grand-angle/stills/home.png",
  exhibitions: "/work/grand-angle/stills/exhibitions.jpg",
  map: "/work/grand-angle/stills/map.png",
  scanResult: "/work/grand-angle/stills/artwork-photos.png",
} as const;

const captionClass =
  "mt-3 mb-0 font-serif text-[16px] leading-[1.3] font-normal italic tracking-[-0.01em] text-lere-text/55";

function ProjectLinks({ project }: { project: Project }) {
  if (!project.actions?.length) return null;
  return (
    <div className="mt-8 flex flex-col gap-3">
      {project.actions.map((action) =>
        action.interactive ? (
          <a
            key={action.label}
            href={action.href}
            className="project-link text-[15px] text-lere-text"
            {...(action.href.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {action.label}
          </a>
        ) : (
          <span key={action.label} className="project-link-muted text-lere-meta">
            {action.label}
          </span>
        ),
      )}
    </div>
  );
}

/**
 * Mobile-only Grand Angle case — preview first, scanner + app screens on explore.
 */
export function MobileGrandAngleCase({ project }: { project: Project }) {
  return (
    <section
      aria-label={project.name}
      className="relative overflow-x-clip bg-lere-bg px-5 pt-14 pb-16 text-lere-text"
    >
      <h3 className="m-0 max-w-[14ch] text-[2.35rem] leading-[0.95] font-bold tracking-[-0.04em]">
        {project.name}
      </h3>
      <p className="mt-4 mb-0 max-w-[28ch] text-[1.375rem] leading-[1.25] font-medium tracking-[-0.02em] text-lere-text/90">
        {project.positioning}
      </p>

      <div className="relative mt-8 overflow-hidden rounded-[0.2rem] border border-lere-rule">
        <div className="relative aspect-[4/5] max-h-[58vh] w-full bg-[#0f1214]">
          <ProductImage
            src={MEDIA.exhibition}
            alt="Grand Angle Photo Festival exhibition"
            fill
            sizes="92vw"
            priority
            className="object-cover object-center"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
          <div className="absolute right-[8%] bottom-[8%] w-[38%] max-w-[8.5rem] rotate-[2deg]">
            <DeviceStill
              src={MEDIA.exhibitions}
              alt="Exhibitions list"
              sizes="38vw"
              showIsland={false}
            />
          </div>
        </div>
      </div>

      <p className="mt-7 mb-0 max-w-[36ch] text-[17px] leading-[1.5] text-lere-text/70">
        {project.summary}
      </p>

      <MobileProjectExplore tone="lere">
        <div className="flex flex-col gap-10">
          <div>
            <div className="mx-auto w-[min(48%,11rem)]">
              <DeviceVideo
                src={MEDIA.scan}
                alt="Artwork scanning — point the camera at a photograph on display"
                showIsland={false}
              />
            </div>
            <p className={captionClass}>
              Scan an artwork. Discover the story behind it.
            </p>
          </div>

          <div>
            <div className="mx-auto grid max-w-[20rem] grid-cols-2 gap-2.5">
              <DeviceStill
                src={MEDIA.home}
                alt="Festival home"
                sizes="42vw"
                showIsland={false}
              />
              <DeviceStill
                src={MEDIA.exhibitions}
                alt="Exhibitions list"
                sizes="42vw"
                showIsland={false}
              />
              <DeviceStill
                src={MEDIA.map}
                alt="Festival map"
                sizes="42vw"
                showIsland={false}
              />
              <DeviceStill
                src={MEDIA.scanResult}
                alt="Exhibition photos"
                sizes="42vw"
                showIsland={false}
              />
            </div>
            <p className={captionClass}>
              Everything you need for the festival, in one app.
            </p>
          </div>

          <ProjectLinks project={project} />
        </div>
      </MobileProjectExplore>
    </section>
  );
}

"use client";

import { useContact } from "@/components/ContactProvider";
import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

type SectionId = "work" | "studio" | "contact";

const items: { id: SectionId; label: string }[] = [
  { id: "work", label: "Our work" },
  { id: "studio", label: "What we bring" },
  { id: "contact", label: "Contact" },
];

/**
 * Mobile-only floating bottom destinations — same family as desktop capsule.
 */
export function MobileBottomNav() {
  const reduce = useReducedMotion();
  const { openContact } = useContact();
  const [active, setActive] = useState<SectionId | null>("work");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0]?.target.id as SectionId | undefined;
        if (top) setActive(top);
      },
      {
        rootMargin: "-18% 0px -42% 0px",
        threshold: [0.08, 0.2, 0.35, 0.5],
      },
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const go = (item: (typeof items)[number]) => {
    const el = document.getElementById(item.id);
    if (el) {
      el.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
      return;
    }
    if (item.id === "contact") openContact();
  };

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex justify-center px-4 md:hidden"
      style={{ paddingBottom: "max(14px, env(safe-area-inset-bottom))" }}
    >
      <nav
        aria-label="Mobile sections"
        className="pointer-events-auto mb-1 flex w-full max-w-[26rem] items-center gap-0.5 rounded-full border border-ink bg-[color-mix(in_srgb,var(--ground)_92%,white)] py-1.5 pr-1.5 pl-1.5 shadow-[0_12px_36px_rgba(17,17,16,0.16)] backdrop-blur-md"
      >
        {items.map((item) => {
          const isActive = active === item.id;
          const isContact = item.id === "contact";
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => go(item)}
              className={`min-w-0 flex-1 rounded-full px-2.5 py-2.5 text-center font-label text-[12px] font-medium tracking-[0.1em] uppercase transition-colors ${
                isContact
                  ? "bg-ink text-ground hover:bg-ink/90"
                  : isActive
                    ? "bg-peach/35 text-ink"
                    : "bg-transparent text-ink/75 hover:text-ink"
              }`}
              aria-current={isActive ? "true" : undefined}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

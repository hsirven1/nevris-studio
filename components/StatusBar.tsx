"use client";

import Image from "next/image";
import Link from "next/link";
import { useContact } from "@/components/ContactProvider";
import { site } from "@/content/site";
import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

function CapsuleLinks() {
  const { openContact } = useContact();

  return (
    <>
      {site.nav.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="nav-link whitespace-nowrap px-4 py-2.5 sm:px-5 sm:py-3 md:px-6 md:py-3.5"
        >
          {item.label}
        </a>
      ))}
      <button
        type="button"
        onClick={openContact}
        className="nav-contact cursor-pointer rounded-full border-0 bg-ink px-5 py-2.5 whitespace-nowrap sm:px-6 sm:py-3 md:px-7 md:py-3.5"
      >
        Contact
      </button>
    </>
  );
}

const capsuleClass =
  "font-label flex w-max shrink-0 items-center gap-1.5 rounded-full border border-ink py-2 pr-2 pl-2.5 text-[13px] font-medium tracking-[0.14em] uppercase md:text-[15px] md:tracking-[0.15em] lg:text-[16px]";

/**
 * Desktop-only fixed capsule — must render outside page stacking contexts
 * so it never disappears under Discover / work sections.
 */
export function DesktopNavCapsule() {
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const chrome = scrolled
    ? "bg-[color-mix(in_srgb,var(--ground)_88%,white)] shadow-[0_10px_28px_rgba(17,17,16,0.14)] backdrop-blur-md"
    : "bg-ground shadow-[0_8px_30px_rgba(17,17,16,0.14)]";

  const scale =
    reduce || !scrolled
      ? "scale-100"
      : "origin-top-right scale-[0.93]";

  return (
    <nav
      aria-label="Primary"
      className={`${capsuleClass} ${chrome} ${scale} pointer-events-auto fixed top-7 right-7 z-[70] hidden transition-[transform,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:flex`}
    >
      <CapsuleLinks />
    </nav>
  );
}

/** Hero header — logo stays in place; desktop nav is rendered separately. */
export function StatusBar() {
  return (
    <header className="relative z-[5] bg-transparent">
      <div className="gutter-x flex items-center justify-between gap-4 py-5 md:gap-6 md:py-[34px]">
        <Link
          href="/"
          className="inline-flex shrink-0 flex-col items-start no-underline"
          aria-label="Nevris Studio home"
        >
          <Image
            src="/brand/nevris-header.png"
            alt="Nevris"
            width={512}
            height={153}
            priority
            unoptimized
            className="h-[2.85rem] w-auto md:h-[4rem] lg:h-[4.5rem]"
          />
          <span className="font-label mt-[7px] text-[11px] leading-none font-medium tracking-[0.2em] text-ink uppercase md:mt-[9px] md:text-[14px] md:tracking-[0.22em] lg:text-[15px]">
            Product Studio
          </span>
        </Link>

        {/* Spacer mirrors capsule size so the hero header stays balanced */}
        <div
          aria-hidden
          className={`${capsuleClass} pointer-events-none invisible hidden bg-ground md:flex`}
        >
          <CapsuleLinks />
        </div>
      </div>
    </header>
  );
}

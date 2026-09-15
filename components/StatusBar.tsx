"use client";

import Image from "next/image";
import Link from "next/link";
import { useContact } from "@/components/ContactProvider";
import { site } from "@/content/site";

const capsuleChrome =
  "header-nav flex shrink-0 items-center rounded-full border border-ink bg-ground font-mono font-medium uppercase shadow-[0_8px_30px_rgba(17,17,16,0.14)]";

function CapsuleLinks() {
  const { openContact } = useContact();

  return (
    <>
      {site.nav.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="nav-link whitespace-nowrap px-4 py-2.5 sm:px-5 sm:py-3"
        >
          {item.label}
        </a>
      ))}
      <button
        type="button"
        onClick={openContact}
        className="nav-contact cursor-pointer rounded-full border-0 bg-ink px-5 py-2.5 whitespace-nowrap sm:px-6 sm:py-3"
      >
        Contact
      </button>
    </>
  );
}

export function StatusBar() {
  return (
    <header className="relative z-[5] bg-transparent">
      <div className="gutter-x flex items-center justify-between gap-4 py-5 md:gap-6 md:py-[34px]">
        <Link
          href="/"
          className="inline-flex shrink-0 flex-col items-start no-underline"
          aria-label="Nevris Studio home"
        >
          {/* unoptimized: Next image optimizer was returning empty for this asset */}
          <Image
            src="/brand/nevris-header.png"
            alt="Nevris"
            width={512}
            height={153}
            priority
            unoptimized
            className="h-[2.85rem] w-auto md:h-[4rem] lg:h-[4.5rem]"
          />
          <span className="mt-[7px] font-mono text-[11px] leading-none font-medium tracking-[0.2em] text-ink uppercase md:mt-[9px] md:text-[14px] md:tracking-[0.24em] lg:text-[15px]">
            Product Studio
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className={`${capsuleChrome} hidden gap-1 py-[7px] pr-[7px] pl-2 text-[12px] tracking-[0.12em] md:flex md:text-[13px]`}
        >
          <CapsuleLinks />
        </nav>
      </div>
    </header>
  );
}

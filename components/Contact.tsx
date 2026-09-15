"use client";

import { useContact } from "@/components/ContactProvider";
import { site } from "@/content/site";

export function Contact() {
  const { contact, email } = site;
  const { openContact } = useContact();

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="border-t border-ink/15 bg-ground"
    >
      <div className="gutter-x flex flex-col items-start py-16 md:items-center md:py-[clamp(4rem,10vh,6.5rem)] md:text-center">
        <p className="m-0 font-mono text-[11px] tracking-[0.16em] text-ink-45 uppercase md:text-[12px]">
          {contact.eyebrow}
        </p>
        <h2 className="type-contact mt-3 mb-0 max-w-[12ch] text-ink md:max-w-none">
          {contact.title}
        </h2>

        <a
          href={`mailto:${email}`}
          className="mt-5 text-[16px] tracking-[-0.01em] text-ink/70 transition-colors hover:text-ink md:hidden"
        >
          {email}
        </a>

        <button
          type="button"
          onClick={openContact}
          className="mt-6 rounded-full bg-ink px-7 py-3.5 font-mono text-[12px] tracking-[0.14em] text-ground uppercase transition-colors hover:bg-accent md:mt-[clamp(1.75rem,4vh,2.5rem)] sm:px-8 sm:text-[13px]"
        >
          {contact.cta}
        </button>
      </div>
    </section>
  );
}

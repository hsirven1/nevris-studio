"use client";

import { useEffect, useId, useRef, useState } from "react";
import { site } from "@/content/site";

type ContactModalProps = {
  open: boolean;
  onClose: () => void;
};

export function ContactModal({ open, onClose }: ContactModalProps) {
  const titleId = useId();
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) {
      setSent(false);
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => firstFieldRef.current?.focus(), 40);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const company = String(data.get("company") || "").trim();
    const building = String(data.get("building") || "").trim();

    const lines = [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company / project: ${company}` : null,
      "",
      "What are you building?",
      building,
    ].filter((line) => line !== null);

    const subject = encodeURIComponent(
      company ? `Project inquiry — ${company}` : "Project inquiry",
    );
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  const fieldClass =
    "mt-2 w-full rounded-[10px] border border-ink/15 bg-ground px-3.5 py-3 text-[15px] text-ink outline-none transition-[border-color,box-shadow] placeholder:text-ink/35 focus:border-ink/40 focus:shadow-[0_0_0_3px_rgba(201,182,247,0.35)]";

  const labelClass =
    "block font-mono text-[11px] tracking-[0.12em] text-ink-45 uppercase";

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center p-0 md:items-center md:p-6"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-ink/45 backdrop-blur-[2px]"
        aria-label="Close contact form"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-[1] flex max-h-[min(96dvh,44rem)] w-full max-w-[34rem] flex-col overflow-hidden rounded-t-[1.25rem] border border-ink/10 bg-[#f7f6f2] shadow-[0_28px_80px_-28px_rgba(17,17,16,0.55)] md:max-h-[min(92vh,44rem)] md:rounded-[1.25rem]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-ink/10 px-6 pt-6 pb-4 sm:px-7">
          <div>
            <p className="m-0 font-mono text-[11px] tracking-[0.14em] text-ink-45 uppercase">
              Project inquiry
            </p>
            <h3
              id={titleId}
              className="mt-2 mb-0 text-[24px] leading-[1.15] font-bold tracking-[-0.03em] text-ink sm:text-[28px]"
            >
              Tell us what you’re building
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink/60 transition-colors hover:border-ink/30 hover:text-ink"
            aria-label="Close"
          >
            <span className="text-[18px] leading-none" aria-hidden>
              ×
            </span>
          </button>
        </div>

        {sent ? (
          <div className="px-6 py-10 sm:px-7">
            <p className="m-0 text-[18px] font-medium tracking-[-0.015em] text-ink">
              Opening your email client…
            </p>
            <p className="mt-2 mb-0 text-[15px] leading-[1.5] text-ink/65">
              If nothing opens, write us at{" "}
              <a
                href={`mailto:${site.email}`}
                className="underline decoration-ink/25 underline-offset-4 hover:text-ink"
              >
                {site.email}
              </a>
              .
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 rounded-full border border-ink px-5 py-2.5 font-mono text-[12px] tracking-[0.12em] text-ink uppercase transition-colors hover:bg-ink hover:text-ground"
            >
              Close
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5 sm:px-7 sm:py-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="inquiry-name" className={labelClass}>
                    Name
                  </label>
                  <input
                    ref={firstFieldRef}
                    id="inquiry-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor="inquiry-email" className={labelClass}>
                    Email
                  </label>
                  <input
                    id="inquiry-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={fieldClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="inquiry-company" className={labelClass}>
                  Company / project
                </label>
                <input
                  id="inquiry-company"
                  name="company"
                  type="text"
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="inquiry-building" className={labelClass}>
                  What are you building?
                </label>
                <textarea
                  id="inquiry-building"
                  name="building"
                  required
                  rows={4}
                  className={`${fieldClass} resize-y min-h-[7rem]`}
                  placeholder="A short note is enough."
                />
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-ink/10 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full px-4 py-2.5 font-mono text-[12px] tracking-[0.12em] text-ink/55 uppercase transition-colors hover:text-ink"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-full bg-ink px-6 py-3 font-mono text-[12px] tracking-[0.12em] text-ground uppercase transition-colors hover:bg-ink/90"
              >
                Send project inquiry
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

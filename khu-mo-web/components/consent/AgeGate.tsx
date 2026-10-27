"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { BrandMark } from "@/components/layout/BrandMark";
import { confirmAge, useAgeVerified } from "@/lib/consent";
import { getDictionary, type Locale } from "@/lib/i18n";
import { SITE_ROOT_ID } from "@/lib/init-script";
import { siteConfig } from "@/lib/site-config";

const LEAVE_URL = "https://www.google.com";

type AgeGateProps = {
  locale: Locale;
};

export function AgeGate({ locale }: AgeGateProps) {
  const t = getDictionary(locale);
  const verified = useAgeVerified();
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const root = document.getElementById(SITE_ROOT_ID);
    if (verified || !root) {
      return;
    }
    root.inert = true;
    confirmRef.current?.focus();
    return () => {
      root.inert = false;
    };
  }, [verified]);

  if (verified) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      aria-describedby="age-gate-body"
      className="age-gate fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-navy-deep px-5 py-10 text-ivory"
    >
      <Image
        src={siteConfig.story.image}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/85 to-navy-deep" aria-hidden />

      <div className="relative w-full max-w-md text-center">
        <BrandMark className="mx-auto w-48 text-ivory md:w-56" />
        <span className="mx-auto mt-8 block h-px w-16 bg-gold" aria-hidden />
        <h2 id="age-gate-title" className="mt-8 text-[1.75rem] font-bold leading-tight md:text-4xl">
          {t.ageGate.title}
        </h2>
        <p id="age-gate-body" className="mt-4 text-base leading-7 text-ivory/85">
          {t.ageGate.body}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            ref={confirmRef}
            type="button"
            onClick={confirmAge}
            className="inline-flex min-h-12 items-center justify-center rounded-sm bg-gold px-6 text-[15px] font-semibold text-navy-deep transition hover:bg-[#cba867] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ivory focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep"
          >
            {t.ageGate.confirm}
          </button>
          <a
            href={LEAVE_URL}
            rel="noopener"
            className="inline-flex min-h-12 items-center justify-center rounded-sm border border-ivory/40 px-6 text-[15px] font-semibold text-ivory transition hover:bg-ivory/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ivory"
          >
            {t.ageGate.leave}
          </a>
        </div>
        <p className="mt-8 text-sm leading-6 text-ivory/70">{t.ageGate.note}</p>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { useSiteUI } from "@/components/providers/SiteUIProvider";
import { Button } from "@/components/ui/Button";
import { getDictionary, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

const { poster, videoSrc } = siteConfig.visit;

type VisitProps = {
  locale: Locale;
};

export function Visit({ locale }: VisitProps) {
  const t = getDictionary(locale);
  const { openEnquiry } = useSiteUI();
  const [autoPlay, setAutoPlay] = useState(false);

  useEffect(() => {
    setAutoPlay(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <section
      id="visit"
      aria-labelledby="visit-title"
      className="relative isolate flex min-h-[85svh] items-end overflow-hidden bg-charcoal text-mineral-white"
    >
      <div className="absolute inset-0 -z-10">
        {videoSrc ? (
          <video
            key={String(autoPlay)}
            className="size-full object-cover"
            src={videoSrc}
            poster={poster}
            autoPlay={autoPlay}
            muted
            loop
            playsInline
            controls={!autoPlay}
            preload="metadata"
            aria-label={t.visit.videoLabel}
          />
        ) : (
          <Image
            src={poster}
            alt={t.visit.videoLabel}
            fill
            sizes="100vw"
            className="object-cover motion-safe:animate-[ken-burns_24s_ease-in-out_infinite_alternate]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/55 to-charcoal/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-charcoal/25 to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 pb-16 pt-32 md:px-10 md:pb-24">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">{t.visit.eyebrow}</p>
        <h2 id="visit-title" className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight md:text-6xl">
          {t.visit.title}
        </h2>
        <p className="mt-5 max-w-xl text-base leading-7 text-mineral-white/85 md:text-lg">
          {t.visit.body}
        </p>
        <Button
          variant="light"
          className="mt-8"
          aria-haspopup="dialog"
          onClick={() => openEnquiry({ interest: "visit" })}
        >
          <CalendarDays className="size-4" aria-hidden />
          {t.visit.cta}
        </Button>
      </div>
    </section>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useSiteUI } from "@/components/providers/SiteUIProvider";
import { buttonStyles } from "@/components/ui/Button";
import { getDictionary, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const { slides, intervalMs } = siteConfig.hero;

type HeroBannerProps = {
  locale: Locale;
};

export function HeroBanner({ locale }: HeroBannerProps) {
  const t = getDictionary(locale);
  const { setHeroTone } = useSiteUI();
  // `epochs` counts activations per slide so only the incoming slide restarts its zoom.
  const [{ active, epochs }, setState] = useState(() => ({
    active: 0,
    epochs: slides.map(() => 0),
  }));
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);

  const show = useCallback((target: (current: number) => number) => {
    setState((state) => {
      const next = (target(state.active) + slides.length) % slides.length;
      if (next === state.active) {
        return state;
      }
      return {
        active: next,
        epochs: state.epochs.map((epoch, index) => (index === next ? epoch + 1 : epoch)),
      };
    });
  }, []);
  const go = useCallback((delta: number) => show((current) => current + delta), [show]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPlaying(false);
    }
  }, []);

  useEffect(() => {
    if (!playing || hovered || slides.length < 2) {
      return;
    }
    const timer = window.setTimeout(() => go(1), intervalMs);
    return () => window.clearTimeout(timer);
  }, [active, playing, hovered, go]);

  const tone = slides[active].logoTone;
  useEffect(() => {
    setHeroTone(tone);
  }, [tone, setHeroTone]);
  useEffect(() => () => setHeroTone(null), [setHeroTone]);

  const isLight = tone === "light";
  const controlClass = cn(
    "inline-flex size-10 items-center justify-center rounded-full border backdrop-blur-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
    isLight
      ? "border-ivory/40 bg-navy-deep/25 text-ivory hover:bg-navy-deep/45"
      : "border-navy/30 bg-ivory/40 text-navy hover:bg-ivory/60",
  );

  return (
    <section
      id="top"
      aria-roledescription="carousel"
      aria-label={t.hero.label}
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-navy-deep"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {slides.map((slide, index) => {
        const current = index === active;
        const copy = t.hero.slides[slide.key];
        return (
          <div
            key={slide.key}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} / ${slides.length}: ${copy.title}`}
            aria-hidden={!current}
            className={cn(
              "absolute inset-0 transition-opacity duration-[1400ms] ease-in-out",
              current ? "opacity-100" : "opacity-0",
            )}
          >
            <div
              key={epochs[index]}
              className="absolute inset-0 motion-safe:animate-[ken-burns_9s_ease-out_forwards]"
            >
              <Image
                src={slide.image}
                alt={copy.title}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        );
      })}

      {/* Scrims keep the top bar, caption and logo legible in the tone of the current slide. */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 transition-opacity duration-1000",
          isLight ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-navy-deep/60 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-navy-deep/65 via-navy-deep/20 to-transparent md:w-2/3" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-deep/65 to-transparent" />
      </div>
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 transition-opacity duration-1000",
          isLight ? "opacity-0" : "opacity-100",
        )}
      >
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ivory/70 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-ivory/80 via-ivory/30 to-transparent md:w-2/3" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ivory/65 to-transparent" />
      </div>

      <div className="relative mx-auto flex h-full max-w-7xl flex-col px-5 pt-24 md:px-10 md:pt-32">
        <div className="grid" aria-live={playing ? "off" : "polite"}>
          {slides.map((slide, index) => {
            const copy = t.hero.slides[slide.key];
            const current = index === active;
            return (
              <div
                key={slide.key}
                aria-hidden={!current}
                className={cn(
                  "col-start-1 row-start-1 max-w-xl transition-all duration-700",
                  current ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
                  isLight ? "text-ivory" : "text-navy",
                )}
              >
                <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em]">
                  <span className="h-px w-8 bg-gold" aria-hidden />
                  {copy.eyebrow}
                </p>
                <h2 className="mt-4 text-[2rem] font-bold leading-[1.15] sm:text-[2.375rem] lg:text-5xl xl:text-[3.5rem]">
                  {copy.title}
                </h2>
                <p className="mt-4 text-base leading-7 opacity-90 md:text-lg">{copy.description}</p>
                <Link
                  href={`/${locale}${slide.href}`}
                  tabIndex={current ? undefined : -1}
                  className={buttonStyles(isLight ? "light" : "primary", "mt-7")}
                >
                  {copy.cta}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-6 right-5 flex items-center gap-2 md:bottom-10 md:right-10">
        <button type="button" aria-label={t.hero.previous} onClick={() => go(-1)} className={controlClass}>
          <ChevronLeft className="size-5" aria-hidden />
        </button>
        <button
          type="button"
          aria-label={playing ? t.hero.pause : t.hero.play}
          onClick={() => setPlaying((value) => !value)}
          className={controlClass}
        >
          {playing ? <Pause className="size-4" aria-hidden /> : <Play className="size-4" aria-hidden />}
        </button>
        <button type="button" aria-label={t.hero.next} onClick={() => go(1)} className={controlClass}>
          <ChevronRight className="size-5" aria-hidden />
        </button>
      </div>

      <div className="absolute bottom-7 left-5 flex items-center gap-2 md:bottom-11 md:left-10">
        {slides.map((slide, index) => (
          <button
            key={slide.key}
            type="button"
            aria-label={t.hero.goTo.replace("{n}", String(index + 1))}
            aria-current={index === active ? "true" : undefined}
            onClick={() => show(() => index)}
            className="group flex h-8 items-center focus-visible:outline-none"
          >
            <span
              className={cn(
                "block h-0.5 rounded-full transition-all duration-500 group-focus-visible:ring-2 group-focus-visible:ring-gold",
                index === active ? "w-10" : "w-5 opacity-50 group-hover:opacity-80",
                isLight ? "bg-ivory" : "bg-navy",
              )}
            />
          </button>
        ))}
      </div>

      <a
        href="#product-lines"
        aria-label={t.hero.scrollHint}
        className={cn(
          "absolute bottom-2 left-1/2 hidden -translate-x-1/2 rounded-full p-1 transition md:block",
          isLight ? "text-ivory/80" : "text-navy/70",
        )}
      >
        <ChevronDown className="size-5 motion-safe:animate-bounce" aria-hidden />
      </a>
    </section>
  );
}

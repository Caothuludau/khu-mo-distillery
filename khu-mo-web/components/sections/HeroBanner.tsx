"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useSiteUI } from "@/components/providers/SiteUIProvider";
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
    "inline-flex size-10 items-center justify-center rounded-full border backdrop-blur-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
    isLight
      ? "border-mineral-white/40 bg-charcoal/20 text-mineral-white hover:bg-charcoal/40"
      : "border-charcoal/30 bg-white/30 text-charcoal hover:bg-white/50",
  );

  return (
    <section
      id="top"
      aria-roledescription="carousel"
      aria-label={t.hero.label}
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-charcoal"
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
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-charcoal/55 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-charcoal/55 via-charcoal/15 to-transparent md:w-2/3" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-charcoal/60 to-transparent" />
      </div>
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 transition-opacity duration-1000",
          isLight ? "opacity-0" : "opacity-100",
        )}
      >
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/60 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-white/65 via-white/20 to-transparent md:w-2/3" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white/55 to-transparent" />
      </div>

      <div className="relative mx-auto flex h-full max-w-7xl flex-col px-5 pt-28 md:px-10 md:pt-0">
        <div className="md:my-auto md:pb-[18svh]" aria-live={playing ? "off" : "polite"}>
          {slides.map((slide, index) => {
            const copy = t.hero.slides[slide.key];
            const current = index === active;
            return (
              <div
                key={slide.key}
                aria-hidden={!current}
                className={cn(
                  "max-w-md transition-all duration-700",
                  current ? "translate-y-0 opacity-100" : "pointer-events-none absolute translate-y-3 opacity-0",
                  isLight ? "text-mineral-white" : "text-charcoal",
                )}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.28em] opacity-80">
                  {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                  {copy.title}
                </h2>
                <p className="mt-3 text-base leading-7 opacity-90 md:text-lg">{copy.description}</p>
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
                "block h-0.5 rounded-full transition-all duration-500 group-focus-visible:ring-2 group-focus-visible:ring-accent",
                index === active ? "w-10" : "w-5 opacity-50 group-hover:opacity-80",
                isLight ? "bg-mineral-white" : "bg-charcoal",
              )}
            />
          </button>
        ))}
      </div>

      <a
        href="#discover"
        aria-label={t.hero.scrollHint}
        className={cn(
          "absolute bottom-2 left-1/2 hidden -translate-x-1/2 rounded-full p-1 transition md:block",
          isLight ? "text-mineral-white/80" : "text-charcoal/70",
        )}
      >
        <ChevronDown className="size-5 motion-safe:animate-bounce" aria-hidden />
      </a>
    </section>
  );
}

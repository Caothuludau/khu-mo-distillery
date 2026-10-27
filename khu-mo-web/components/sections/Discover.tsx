"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useSiteUI } from "@/components/providers/SiteUIProvider";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { getDictionary, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { toggleWishlist, useWishlist } from "@/lib/wishlist";

const products = siteConfig.product.items;
const count = products.length;
/** Three copies of the list let the track slide past either end and then jump back unnoticed. */
const track = [...products, ...products, ...products];

function useVisibleCount() {
  const [visible, setVisible] = useState(3);
  useEffect(() => {
    const queries = [window.matchMedia("(min-width: 1024px)"), window.matchMedia("(min-width: 640px)")];
    const update = () => setVisible(queries[0].matches ? 3 : queries[1].matches ? 2 : 1);
    update();
    queries.forEach((query) => query.addEventListener("change", update));
    return () => queries.forEach((query) => query.removeEventListener("change", update));
  }, []);
  return visible;
}

type DiscoverProps = {
  locale: Locale;
};

export function Discover({ locale }: DiscoverProps) {
  const t = getDictionary(locale);
  const { openEnquiry, focusedProduct } = useSiteUI();
  const wishlist = useWishlist();
  const visible = useVisibleCount();
  const [index, setIndex] = useState(count);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    if (!focusedProduct) {
      return;
    }
    const position = products.findIndex((product) => product.key === focusedProduct.key);
    if (position >= 0) {
      setAnimate(true);
      setIndex(count + position);
    }
  }, [focusedProduct]);

  useEffect(() => {
    if (animate) {
      return;
    }
    const frame = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(frame);
  }, [animate]);

  function step(delta: number) {
    setAnimate(true);
    setIndex((current) => Math.min(Math.max(current + delta, 0), track.length - visible));
  }

  function onTransitionEnd(event: React.TransitionEvent<HTMLUListElement>) {
    if (event.target !== event.currentTarget) {
      return;
    }
    if (index >= 2 * count || index < count) {
      setAnimate(false);
      setIndex(((index % count) + count) % count + count);
    }
  }

  const controls = (
    <div className="flex gap-2">
      <button
        type="button"
        aria-label={t.discover.previous}
        onClick={() => step(-1)}
        className="inline-flex size-11 items-center justify-center rounded-full border border-line transition hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <ChevronLeft className="size-5" aria-hidden />
      </button>
      <button
        type="button"
        aria-label={t.discover.next}
        onClick={() => step(1)}
        className="inline-flex size-11 items-center justify-center rounded-full border border-line transition hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <ChevronRight className="size-5" aria-hidden />
      </button>
    </div>
  );

  return (
    <Section
      id="discover"
      eyebrow={t.discover.eyebrow}
      title={t.discover.title}
      actions={controls}
      aria-roledescription="carousel"
    >
      <div className="-mx-2 overflow-hidden">
        <ul
          className={cn(
            "flex [--visible:1] sm:[--visible:2] lg:[--visible:3]",
            animate && "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
          )}
          style={{ transform: `translateX(calc(-100% * ${index} / var(--visible)))` }}
          onTransitionEnd={onTransitionEnd}
        >
          {track.map(({ key, image }, position) => {
            const item = t.discover.items[key];
            const inView = position >= index && position < index + visible;
            const saved = wishlist.includes(key);
            return (
              <li
                key={`${key}-${position}`}
                aria-hidden={!inView}
                inert={!inView}
                className="w-[calc(100%/var(--visible))] shrink-0 px-2"
              >
                <article
                  tabIndex={0}
                  aria-label={item.name}
                  className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Image
                    src={image}
                    alt={item.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-700 ease-out group-focus-within:scale-105 group-focus-within:blur-[3px] group-hover:scale-105 group-hover:blur-[3px]"
                  />

                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-charcoal/85 via-charcoal/45 to-charcoal/10 pointer-events-none p-6 text-mineral-white opacity-0 transition duration-500 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100">
                    <p className="translate-y-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold transition duration-500 group-focus-within:translate-y-0 group-hover:translate-y-0">
                      {t.discover.categories[item.category]}
                    </p>
                    <h3 className="mt-2 translate-y-2 text-2xl font-semibold transition duration-500 group-focus-within:translate-y-0 group-hover:translate-y-0">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-mineral-white/85">{item.blurb}</p>
                    <Button
                      variant="light"
                      className="mt-5 self-start"
                      onClick={() => openEnquiry({ interest: "product", productKey: key })}
                    >
                      {t.discover.enquire}
                    </Button>
                  </div>

                  <button
                    type="button"
                    aria-pressed={saved}
                    aria-label={`${saved ? t.discover.removeFromWishlist : t.discover.addToWishlist}: ${item.name}`}
                    title={saved ? t.discover.removeFromWishlist : t.discover.addToWishlist}
                    onClick={() => toggleWishlist(key)}
                    className="absolute right-3 top-3 inline-flex size-10 items-center justify-center rounded-full bg-charcoal/25 text-mineral-white backdrop-blur-sm transition hover:bg-charcoal/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mineral-white"
                  >
                    <Heart className={cn("size-5", saved && "fill-current text-gold")} aria-hidden />
                  </button>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}

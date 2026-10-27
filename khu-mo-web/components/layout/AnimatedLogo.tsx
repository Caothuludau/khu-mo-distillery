"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BrandMark } from "@/components/layout/BrandMark";
import { useSiteUI } from "@/components/providers/SiteUIProvider";
import { getDictionary, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const TOPBAR_HEIGHT_PX = 64;
const DOCKED_LOGO_HEIGHT_PX = 40;
/** Gap between the large logo and the bottom of the hero, as a fraction of the viewport height. */
const BOTTOM_GAP_RATIO = 0.1;

type AnimatedLogoProps = {
  locale: Locale;
};

/**
 * Large logo resting at the bottom-centre of the full-screen hero. As the hero scrolls away it
 * glides up and shrinks until it docks in the centre of the top bar.
 */
export function AnimatedLogo({ locale }: AnimatedLogoProps) {
  const t = getDictionary(locale);
  const ref = useRef<HTMLAnchorElement>(null);
  const { heroTone } = useSiteUI();
  const [docked, setDocked] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const viewportHeight = window.innerHeight;
      const range = Math.max(viewportHeight - TOPBAR_HEIGHT_PX, 1);
      const progress = Math.min(Math.max(window.scrollY / range, 0), 1);
      const eased = progress * progress * (3 - 2 * progress);

      const largeHeight = element.offsetHeight;
      const endScale = Math.min(DOCKED_LOGO_HEIGHT_PX / largeHeight, 1);
      const startY = viewportHeight * (1 - BOTTOM_GAP_RATIO) - largeHeight;
      const endY = (TOPBAR_HEIGHT_PX - DOCKED_LOGO_HEIGHT_PX) / 2;

      const y = startY + (endY - startY) * progress;
      const scale = 1 + (endScale - 1) * eased;
      element.style.transform = `translate3d(-50%, ${y}px, 0) scale(${scale})`;
      setDocked(progress >= 1);
    };
    const schedule = () => {
      if (!frame) {
        frame = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const tone = heroTone ?? "light";

  return (
    <Link
      ref={ref}
      href={`/${locale}`}
      aria-label={t.nav.home}
      className="fixed left-1/2 top-0 z-[45] w-[min(55vw,450px)] origin-top rounded-sm will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      // Matches the scripted start position so the logo is placed correctly before hydration.
      style={{ transform: `translate3d(-50%, calc(${(1 - BOTTOM_GAP_RATIO) * 100}svh - 100%), 0)` }}
    >
      <span
        className={cn(
          "block transition-[color,filter] duration-700",
          docked
            ? "text-foreground"
            : tone === "light"
              ? "text-mineral-white drop-shadow-[0_2px_18px_rgb(0_0_0/0.45)]"
              : "text-charcoal drop-shadow-[0_2px_18px_rgb(255_255_255/0.55)]",
        )}
      >
        <BrandMark className="w-full" />
      </span>
    </Link>
  );
}

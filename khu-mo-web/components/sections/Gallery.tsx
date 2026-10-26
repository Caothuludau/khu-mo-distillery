import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { getDictionary, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type GalleryProps = {
  locale: Locale;
};

export function Gallery({ locale }: GalleryProps) {
  const t = getDictionary(locale);

  return (
    <Section id="gallery" eyebrow={t.gallery.eyebrow} title={t.gallery.title}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {siteConfig.gallery.items.map(({ key, image, fit }, index) => {
          const featured = index === 0;
          return (
            <figure
              key={key}
              className={cn(
                "relative h-64 overflow-hidden rounded border border-mineral-white/15 bg-gradient-to-br from-iron-gray to-charcoal lg:h-72",
                featured && "sm:col-span-2",
              )}
            >
              <Image
                src={image}
                alt={t.gallery.captions[key]}
                fill
                sizes={
                  featured
                    ? "(min-width: 1024px) 66vw, 100vw"
                    : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                }
                className={fit === "contain" ? "object-contain px-8 pb-16 pt-8" : "object-cover"}
              />
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 text-sm font-medium uppercase tracking-[0.12em] text-mineral-white">
                {t.gallery.captions[key]}
              </figcaption>
            </figure>
          );
        })}
      </div>
    </Section>
  );
}

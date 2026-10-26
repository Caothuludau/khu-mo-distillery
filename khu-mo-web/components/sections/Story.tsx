import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { getDictionary, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

type StoryProps = {
  locale: Locale;
};

export function Story({ locale }: StoryProps) {
  const t = getDictionary(locale);

  return (
    <Section id="story" eyebrow={t.story.eyebrow} title={t.story.title}>
      <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-5">
          <p className="text-base leading-7 text-mineral-white/85 md:text-lg">{t.story.body}</p>
          <div className="relative aspect-[16/10] overflow-hidden rounded border border-mineral-white/15">
            <Image
              src={siteConfig.story.image}
              alt={t.story.imageAlt}
              fill
              sizes="(min-width: 768px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        <ul className="space-y-3">
          {t.story.pillars.map((item) => (
            <li
              key={item}
              className="rounded border border-mineral-white/15 bg-iron-gray/35 px-4 py-3 text-sm leading-6 text-mineral-white/90"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

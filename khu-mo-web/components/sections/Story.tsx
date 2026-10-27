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
    <Section id="story" eyebrow={t.story.eyebrow} title={t.story.title} className="bg-surface-muted">
      <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:gap-14">
        <div className="space-y-6">
          <p className="text-base leading-8 text-muted md:text-lg">{t.story.body}</p>
          <div className="relative aspect-[16/10] overflow-hidden rounded-sm">
            <Image
              src={siteConfig.story.image}
              alt={t.story.imageAlt}
              fill
              sizes="(min-width: 768px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        <ul className="divide-y divide-line self-center border-y border-line">
          {t.story.pillars.map((item) => {
            const [title, ...rest] = item.split(":");
            return (
              <li key={item} className="py-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{title}</p>
                <p className="mt-2 text-sm leading-6 text-foreground">{rest.join(":").trim()}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}

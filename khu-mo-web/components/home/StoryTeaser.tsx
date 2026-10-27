import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonStyles } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { getDictionary, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

type StoryTeaserProps = {
  locale: Locale;
};

/** Brand band in Mine Navy with the distillery photo. */
export function StoryTeaser({ locale }: StoryTeaserProps) {
  const t = getDictionary(locale);
  return (
    <section className="bg-navy py-12 text-ivory md:py-16">
      <Container className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
          <Image
            src={siteConfig.story.image}
            alt={t.story.imageAlt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
          <span className="absolute inset-3 rounded-sm border border-gold/50" aria-hidden />
        </div>
        <div>
          <Eyebrow className="text-gold">{t.home.storyEyebrow}</Eyebrow>
          <h2 className="mt-3 text-[1.75rem] font-bold leading-tight md:text-4xl">{t.home.storyTitle}</h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-ivory/85 md:text-[17px]">{t.home.storyBody}</p>
          <ul className="mt-6 space-y-3">
            {t.story.values.map((value) => (
              <li key={value.title} className="border-l-2 border-gold pl-4">
                <p className="font-semibold">{value.title}</p>
                <p className="text-[15px] leading-6 text-ivory/75">{value.detail}</p>
              </li>
            ))}
          </ul>
          <Link href={`/${locale}/story`} className={buttonStyles("light", "mt-8")}>
            {t.home.storyCta}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </Container>
    </section>
  );
}

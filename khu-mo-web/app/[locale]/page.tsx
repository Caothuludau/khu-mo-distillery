import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { BuyTeaser } from "@/components/home/BuyTeaser";
import { HeroBanner } from "@/components/home/HeroBanner";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { ProductLines } from "@/components/home/ProductLines";
import { StoryTeaser } from "@/components/home/StoryTeaser";
import { buttonStyles } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { getDictionary, isLocale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocaleHomePage({ params }: LocalePageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const t = getDictionary(locale);

  return (
    <main>
      <h1 className="sr-only">{t.meta.title}</h1>
      <HeroBanner locale={locale} />
      <ProductLines locale={locale} />
      <StoryTeaser locale={locale} />
      <Section
        id="quality"
        eyebrow={t.home.qualityEyebrow}
        title={t.home.qualityTitle}
        intro={t.home.qualityIntro}
        actions={
          <Link href={`/${locale}/story#process`} className={buttonStyles("secondary")}>
            {t.home.qualityCta}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        }
      >
        <div className="relative mb-6 hidden aspect-[16/5] overflow-hidden rounded-sm md:block">
          <Image
            src={siteConfig.process.image}
            alt={t.story.processImageAlt}
            fill
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="object-cover object-[50%_60%]"
          />
        </div>
        <ProcessSteps locale={locale} />
      </Section>
      <div className="border-t border-line" />
      <BuyTeaser locale={locale} />
    </main>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Newspaper } from "lucide-react";
import { EnquiryButton } from "@/components/forms/EnquiryButton";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { getDictionary, getLocaleAlternates, isLocale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

type StoryPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }
  const t = getDictionary(locale);
  return {
    title: t.story.title,
    description: t.story.intro,
    alternates: getLocaleAlternates(locale, "/story"),
  };
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const t = getDictionary(locale);
  const s = t.story;

  return (
    <main>
      <PageHero
        title={s.title}
        intro={s.intro}
        breadcrumbLabel={t.common.breadcrumb}
        breadcrumb={[{ label: t.common.home, href: `/${locale}` }, { label: t.nav.story }]}
      />

      <Section id="brand" eyebrow={s.storyEyebrow} title={s.storyTitle}>
        <div className="grid gap-10 md:grid-cols-2 md:gap-14">
          <div className="space-y-5">
            {s.storyBody.map((paragraph) => (
              <p key={paragraph} className="max-w-prose text-base leading-8 md:text-[17px]">
                {paragraph}
              </p>
            ))}
            <ul className="space-y-3 pt-2">
              {s.values.map((value) => (
                <li key={value.title} className="border-l-2 border-gold pl-4">
                  <p className="font-semibold text-heading">{value.title}</p>
                  <p className="text-[15px] leading-6 text-muted">{value.detail}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm md:aspect-auto">
            <Image src={siteConfig.story.image} alt={s.imageAlt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </Section>

      <Section
        id="process"
        eyebrow={s.processEyebrow}
        title={s.processTitle}
        intro={s.processIntro}
        className="bg-surface-muted"
      >
        <ProcessSteps locale={locale} />
        <div className="mt-8 flex flex-col gap-5 rounded-sm bg-navy p-6 text-ivory md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <h3 className="text-xl font-semibold">{s.visitTitle}</h3>
            <p className="mt-2 text-[15px] leading-6 text-ivory/80">{s.visitBody}</p>
          </div>
          <EnquiryButton interest="visit" variant="light" className="shrink-0">
            {s.visitCta}
          </EnquiryButton>
        </div>
      </Section>

      <Section id="news" eyebrow={s.newsEyebrow} title={s.newsTitle}>
        <EmptyState icon={Newspaper} body={s.newsEmpty} />
      </Section>
    </main>
  );
}

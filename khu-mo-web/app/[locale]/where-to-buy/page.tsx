import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, MapPin, Navigation, Phone, Store, Truck } from "lucide-react";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Badge } from "@/components/ui/Badge";
import { buttonStyles } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { getDictionary, getLocaleAlternates, isLocale } from "@/lib/i18n";
import { siteConfig, toMapsHref, toTelHref } from "@/lib/site-config";

type WhereToBuyPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: WhereToBuyPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }
  const t = getDictionary(locale);
  return {
    title: t.whereToBuy.title,
    description: t.whereToBuy.intro,
    alternates: getLocaleAlternates(locale, "/where-to-buy"),
  };
}

export default async function WhereToBuyPage({ params }: WhereToBuyPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const t = getDictionary(locale);
  const w = t.whereToBuy;
  const { salesPoints, company } = siteConfig;

  return (
    <main>
      <PageHero
        title={w.title}
        intro={w.intro}
        breadcrumbLabel={t.common.breadcrumb}
        breadcrumb={[{ label: t.common.home, href: `/${locale}` }, { label: w.title }]}
      />

      <Section id="points" title={w.pointsTitle}>
        {salesPoints.length ? (
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {salesPoints.map((point) => (
              <li key={point.name + point.address} className="flex flex-col rounded-sm border border-line bg-surface p-6">
                <Badge className="self-start">{w.pointTypes[point.type]}</Badge>
                <h3 className="mt-3 text-xl font-semibold text-heading">{point.name}</h3>
                <dl className="mt-4 space-y-3 text-[15px] leading-6">
                  <div className="flex gap-3">
                    <dt>
                      <MapPin className="mt-0.5 size-5 text-highlight" aria-hidden />
                      <span className="sr-only">{w.address}</span>
                    </dt>
                    <dd>{point.address}</dd>
                  </div>
                  {point.phone ? (
                    <div className="flex gap-3">
                      <dt>
                        <Phone className="mt-0.5 size-5 text-highlight" aria-hidden />
                        <span className="sr-only">{w.phone}</span>
                      </dt>
                      <dd>
                        <a href={toTelHref(point.phone)} className="font-semibold text-heading underline-offset-4 hover:underline">
                          {point.phone}
                        </a>
                      </dd>
                    </div>
                  ) : null}
                  {point.hours ? (
                    <div className="flex gap-3">
                      <dt>
                        <Clock className="mt-0.5 size-5 text-highlight" aria-hidden />
                        <span className="sr-only">{w.hours}</span>
                      </dt>
                      <dd>{point.hours}</dd>
                    </div>
                  ) : null}
                </dl>
                <a
                  href={toMapsHref(point.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonStyles("secondary", "mt-6 self-start")}
                >
                  <Navigation className="size-4" aria-hidden />
                  {w.directions}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState icon={Store} body={w.pointsEmpty} />
        )}
      </Section>

      <Section id="delivery" title={w.deliveryTitle} className="bg-surface-muted">
        <div className="flex max-w-3xl gap-4">
          <Truck className="mt-1 size-6 shrink-0 text-highlight" aria-hidden />
          <div className="space-y-4">
            {w.deliveryBody.map((paragraph) => (
              <p key={paragraph} className="text-base leading-7 md:text-[17px]">
                {paragraph}
              </p>
            ))}
            <Link
              href={`/${locale}/legal/shipping`}
              className="inline-flex min-h-11 items-center text-[15px] font-semibold text-heading underline underline-offset-4"
            >
              {w.deliveryPolicy}
            </Link>
          </div>
        </div>
      </Section>

      <Section id="order" title={w.orderTitle} intro={w.orderIntro}>
        <div className="grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-14">
          <div className="max-w-2xl">
            <EnquiryForm locale={locale} idPrefix="order" initialInterest="purchase" />
          </div>
          {company.phone ? (
            <aside className="h-fit rounded-sm bg-navy p-6 text-ivory">
              <p className="text-[15px] text-ivory/80">{w.callUs}</p>
              <a href={toTelHref(company.phone)} className="mt-2 inline-flex items-center gap-2 text-2xl font-bold">
                <Phone className="size-5 text-gold" aria-hidden />
                {company.phone}
              </a>
            </aside>
          ) : null}
        </div>
      </Section>
    </main>
  );
}

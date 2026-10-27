import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { getDictionary, getLocaleAlternates, isLocale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

type PartnersPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PartnersPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }
  const t = getDictionary(locale);
  return {
    title: t.partners.title,
    description: t.partners.intro,
    alternates: getLocaleAlternates(locale, "/partners"),
  };
}

export default async function PartnersPage({ params }: PartnersPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const t = getDictionary(locale);
  const p = t.partners;
  const { company } = siteConfig;

  const companyFacts = [
    { label: p.companyName, value: company.name },
    { label: p.companyAddress, value: company.address },
    { label: p.companyTaxCode, value: company.taxCode },
    { label: p.companyPhone, value: company.phone },
    { label: p.companyEmail, value: company.email },
  ];

  return (
    <main>
      <PageHero
        title={p.title}
        intro={p.intro}
        breadcrumbLabel={t.common.breadcrumb}
        breadcrumb={[{ label: t.common.home, href: `/${locale}` }, { label: p.title }]}
      />

      <Section id="company" title={p.companyTitle}>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="max-w-prose text-base leading-7 md:text-[17px]">{p.companyBody}</p>
            <Link
              href={`/${locale}/products`}
              className="mt-4 inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-heading underline-offset-4 hover:underline"
            >
              {p.viewCatalogue}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <dl className="divide-y divide-line border-y border-line">
            {companyFacts.map((fact) => (
              <div key={fact.label} className="grid grid-cols-[8rem_1fr] gap-4 py-3 sm:grid-cols-[10rem_1fr]">
                <dt className="text-[15px] text-muted">{fact.label}</dt>
                <dd className={fact.value ? "text-[15px] font-semibold" : "text-[15px] italic text-muted"}>
                  {fact.value ?? t.common.updating}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section id="distribution" title={p.distributionTitle} intro={p.distributionBody} className="bg-surface-muted">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <ul className="space-y-4">
            {p.offers.map((offer) => (
              <li key={offer} className="flex gap-3 text-base leading-7">
                <Check className="mt-1 size-5 shrink-0 text-highlight" aria-hidden />
                {offer}
              </li>
            ))}
          </ul>
          <div>
            <h3 className="text-xl font-semibold text-heading">{p.stepsTitle}</h3>
            <ol className="mt-5 space-y-5">
              {p.steps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-heading">{step.title}</p>
                    <p className="text-[15px] leading-6 text-muted">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section id="partner-form" title={p.formTitle} intro={p.formIntro}>
        <div className="max-w-2xl">
          <EnquiryForm locale={locale} idPrefix="partner" initialInterest="partner" lockInterest />
        </div>
      </Section>
    </main>
  );
}
